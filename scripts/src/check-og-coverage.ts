import { readdirSync, readFileSync } from "fs";
import { resolve, relative } from "path";

const ROOT = resolve(process.cwd(), "../greyradius-website");
const SCRIPTS_SRC = resolve(process.cwd(), "src");

/**
 * Pages that intentionally don't need a full OG image tag.
 * They still appear in add-og-meta.ts (title + description) but are
 * deliberately absent from add-og-images.ts because they rely on the
 * site-default social card or are utility/legal pages where an individual
 * image adds no value.
 *
 * Paths are relative to greyradius-website/.
 *
 * Alternatively, add  <!-- og-exclude -->  anywhere in the HTML file
 * to opt that specific page out without editing this list.
 */
const EXCLUSIONS = new Set<string>([
  "index.html",          // uses site-default OG image
  "careers.html",        // no dedicated OG image needed
  "og-preview.html",     // internal tool page
  "legal/privacy.html",  // legal utility page
  "legal/terms.html",    // legal utility page
]);

function extractPageFiles(scriptPath: string): Set<string> {
  const src = readFileSync(scriptPath, "utf-8");
  const files = new Set<string>();
  for (const m of src.matchAll(/file:\s*"([^"]+\.html)"/g)) {
    files.add(m[1]);
  }
  return files;
}

function findHtmlFiles(dir: string, base = dir): string[] {
  const result: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...findHtmlFiles(full, base));
    } else if (entry.name.endsWith(".html")) {
      result.push(relative(base, full).replaceAll("\\", "/"));
    }
  }
  return result.sort();
}

const metaPages = extractPageFiles(resolve(SCRIPTS_SRC, "add-og-meta.ts"));
const imagePages = extractPageFiles(resolve(SCRIPTS_SRC, "add-og-images.ts"));

const htmlFiles = findHtmlFiles(ROOT);

let missingCount = 0;

for (const file of htmlFiles) {
  if (EXCLUSIONS.has(file)) continue;

  const content = readFileSync(resolve(ROOT, file), "utf-8");
  if (content.includes("<!-- og-exclude -->")) continue;

  const missingMeta = !metaPages.has(file);
  const missingImage = !imagePages.has(file);

  if (missingMeta || missingImage) {
    const gaps: string[] = [];
    if (missingMeta) gaps.push("og:title/description (add-og-meta.ts)");
    if (missingImage) gaps.push("og:image (add-og-images.ts)");
    console.error(`  ✗ ${file}`);
    for (const g of gaps) {
      console.error(`      missing from: ${g}`);
    }
    missingCount++;
  }
}

if (missingCount > 0) {
  console.error(
    `\n✗ ${missingCount} HTML file(s) have no entry in the OG scripts.` +
      `\n  → Add them to scripts/src/add-og-meta.ts and/or scripts/src/add-og-images.ts` +
      `\n  → Or add  <!-- og-exclude -->  inside the HTML file to opt it out.\n`
  );
  process.exit(1);
}

console.log(`✓ All ${htmlFiles.length} HTML files are covered by OG scripts.`);
