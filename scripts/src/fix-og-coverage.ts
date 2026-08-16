/**
 * fix-og-coverage.ts
 *
 * One-shot script that processes all HTML files under greyradius-website/
 * that are not yet covered by add-og-meta.ts or add-og-images.ts.
 *
 * For each uncovered file it does ONE of:
 *   a) Adds <!-- og-exclude --> (for noindex / feed / category / template / 404 pages)
 *   b) Collects title + description to append to add-og-meta.ts and add-og-images.ts
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { resolve, relative } from "path";
import { extractPageFiles, findHtmlFiles } from "./lib/og-coverage.js";

const ROOT = resolve(process.cwd(), "../greyradius-website");
const SCRIPTS_DIR = resolve(process.cwd(), "src");

// ── 1. Load the existing active page lists ──────────────────────────────────
const metaPages = extractPageFiles(resolve(SCRIPTS_DIR, "add-og-meta.ts"));
const imagePages = extractPageFiles(resolve(SCRIPTS_DIR, "add-og-images.ts"));
const activeFiles = new Set([...metaPages, ...imagePages]);

// ── 2. Find all HTML files ───────────────────────────────────────────────────
const allFiles = findHtmlFiles(ROOT);

// ── 3. Bucket each uncovered file ────────────────────────────────────────────
const toExclude: string[] = [];
const toLive: Array<{ file: string; title: string; description: string }> = [];

function isExcludable(relpath: string, content: string): boolean {
  // Already tagged
  if (content.includes("<!-- og-exclude -->")) return true;
  // Feed pages (WordPress)
  if (relpath.includes("/feed/")) return true;
  // WordPress category archives
  if (relpath.startsWith("category/")) return true;
  // Template dev files
  if (relpath.startsWith("templates/")) return true;
  // 404 page
  if (relpath === "404.html") return true;
  // Has noindex robots meta
  if (/\bnoindex\b/i.test(content.match(/<meta[^>]+name=["']robots["'][^>]*>/i)?.[0] ?? "")) return true;
  if (/\bnoindex\b/i.test(content.match(/<meta[^>]+content=["'][^"']*noindex/i)?.[0] ?? "")) return true;
  return false;
}

function extractMeta(relpath: string, content: string): { title: string; description: string } {
  // Prefer existing og:title / og:description if already present
  const ogTitle = content.match(/property="og:title"\s+content="([^"]+)"/)?.[1]
    ?? content.match(/property='og:title'\s+content='([^']+)'/)?.[1];
  const ogDesc = content.match(/property="og:description"\s+content="([^"]+)"/)?.[1]
    ?? content.match(/property='og:description'\s+content='([^']+)'/)?.[1];

  if (ogTitle && ogDesc) return { title: ogTitle, description: ogDesc };

  // Fall back to <title> and <meta name="description">
  const rawTitle = content.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() ?? "";
  const htmlTitle = rawTitle
    ? rawTitle.replace(/\s*[|–—-]\s*GreyRadius.*$/i, "").trim()
    : slugToTitle(relpath);

  const metaDesc = content.match(/<meta\s+name="description"\s+content="([^"]+)"/i)?.[1]?.trim()
    ?? content.match(/<meta\s+content="([^"]+)"\s+name="description"/i)?.[1]?.trim()
    ?? "";

  const title = (ogTitle ?? htmlTitle) || slugToTitle(relpath);
  const description = (ogDesc ?? metaDesc) || `GreyRadius Consulting — ${slugToTitle(relpath)}.`;

  return { title, description };
}

function slugToTitle(relpath: string): string {
  const base = relpath.replace(/\/?index\.html$/, "").replace(/\.html$/, "").split("/").pop() ?? "";
  return base.replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

let alreadyTagged = 0;
let excluded = 0;
let live = 0;
let skipped = 0;

for (const file of allFiles) {
  if (activeFiles.has(file)) { skipped++; continue; }

  const fullPath = resolve(ROOT, file);
  const content = readFileSync(fullPath, "utf-8");

  if (content.includes("<!-- og-exclude -->")) { alreadyTagged++; continue; }

  if (isExcludable(file, content)) {
    toExclude.push(file);
  } else {
    const meta = extractMeta(file, content);
    toLive.push({ file, ...meta });
  }
}

console.log(`\nActive (skipped):    ${skipped}`);
console.log(`Already tagged:      ${alreadyTagged}`);
console.log(`Will tag og-exclude: ${toExclude.length}`);
console.log(`Will add to scripts: ${toLive.length}`);

// ── 4. Add <!-- og-exclude --> to non-live files ─────────────────────────────
for (const file of toExclude) {
  const fullPath = resolve(ROOT, file);
  const content = readFileSync(fullPath, "utf-8");
  writeFileSync(fullPath, "<!-- og-exclude -->\n" + content, "utf-8");
}
console.log(`\n✓ Tagged ${toExclude.length} files with <!-- og-exclude -->`);

// ── 5. Build new entries for add-og-meta.ts and add-og-images.ts ─────────────
if (toLive.length === 0) {
  console.log("✓ No live pages to add — OG scripts are up to date.");
  process.exit(0);
}

// Group live entries by directory prefix for a readable block
const metaEntries = toLive
  .map(({ file, title, description }) => {
    const escapedTitle = title.replace(/"/g, '\\"');
    const escapedDesc = description.replace(/"/g, '\\"');
    return `  {\n    file: "${file}",\n    ogTitle: "${escapedTitle}",\n    ogDescription: "${escapedDesc}",\n  },`;
  })
  .join("\n");

const imageEntries = toLive
  .map(({ file }) => {
    const pad = Math.max(0, 60 - file.length);
    return `  { file: "${file}",${" ".repeat(pad)} ogImage: "/assets/images/og-generic.png" },`;
  })
  .join("\n");

// ── Append to add-og-meta.ts before the closing ]; ────────────────────────────
const metaScriptPath = resolve(SCRIPTS_DIR, "add-og-meta.ts");
let metaSrc = readFileSync(metaScriptPath, "utf-8");
// Insert before the closing ]; of the pages array
metaSrc = metaSrc.replace(
  /(\n\s*\/\/ ─+ Legal[^\]]*\n\s*\{[^\}]+\},\s*\n\s*\{[^\}]+\},\s*\n\s*\/\/ ─+ OG Preview[^\]]*\n\s*\{[^\}]+\},\s*\n\];)/s,
  (match) => match // don't touch existing entries
);

// Find the last }; in the pages array and insert before ];
metaSrc = metaSrc.replace(
  /^(\];)/m,
  `  // ─── Auto-generated coverage entries (fix-og-coverage.ts) ─────────────────────\n${metaEntries}\n$1`
);
writeFileSync(metaScriptPath, metaSrc, "utf-8");
console.log(`✓ Appended ${toLive.length} entries to add-og-meta.ts`);

// ── Append to add-og-images.ts before the closing ]; ─────────────────────────
const imageScriptPath = resolve(SCRIPTS_DIR, "add-og-images.ts");
let imageSrc = readFileSync(imageScriptPath, "utf-8");
imageSrc = imageSrc.replace(
  /^(\];)/m,
  `  // ─── Auto-generated coverage entries (fix-og-coverage.ts) ─────────────────────\n${imageEntries}\n$1`
);
writeFileSync(imageScriptPath, imageSrc, "utf-8");
console.log(`✓ Appended ${toLive.length} entries to add-og-images.ts`);

console.log("\nDone. Run `pnpm -w run og:check` to verify coverage.");
