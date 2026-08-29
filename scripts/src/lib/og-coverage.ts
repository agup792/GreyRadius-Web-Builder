import { readdirSync, readFileSync, existsSync } from "fs";
import { resolve, relative } from "path";

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
export const EXCLUSIONS = new Set<string>([]);

/**
 * Top-level insight pages intentionally outside the generated social-card
 * workflow. This includes the Insights hub and legacy/editorial pages whose
 * images are maintained with their source content.
 *
 * New top-level insight articles must not be added here. Give them an
 * individual image entry in both generate-og-images.ts and add-og-images.ts.
 */
export const INSIGHT_OG_EXCLUSIONS = new Set<string>([
  "insights/index.html",
  "insights/b2b-saas-pricing-india.html",
  "insights/bis-certification-india-foreign-products.html",
  "insights/fdi-routes-india-explained.html",
  "insights/gtm-strategy-emerging-markets.html",
  "insights/gulf-market-entry-mistakes.html",
  "insights/how-japanese-korean-brands-win-india.html",
  "insights/how-to-enter-india-market.html",
  "insights/import-duty-gst-india-new-entrants.html",
  "insights/india-distributor-evaluation-framework.html",
  "insights/india-distributor-margins-economics-benchmarks.html",
  "insights/neurotechnology-india-research-to-market.html",
  "insights/primary-market-research-emerging-markets.html",
  "insights/vision-2030-foreign-companies-market-entry.html",
]);

export function extractPageFiles(scriptPath: string): Set<string> {
  const src = readFileSync(scriptPath, "utf-8");
  const files = new Set<string>();
  for (const m of src.matchAll(/file:\s*"([^"]+\.html)"/g)) {
    files.add(m[1]);
  }
  return files;
}

function extractOgImagePages(scriptPath: string): Map<string, string> {
  const src = readFileSync(scriptPath, "utf-8");
  const pages = new Map<string, string>();
  for (const m of src.matchAll(
    /file:\s*"([^"]+\.html)"\s*,\s*ogImage:\s*"([^"]+)"/g
  )) {
    pages.set(m[1], m[2]);
  }
  return pages;
}

function extractGeneratedFilenames(scriptPath: string): Set<string> {
  const src = readFileSync(scriptPath, "utf-8");
  const filenames = new Set<string>();
  for (const m of src.matchAll(/filename:\s*"([^"]+\.png)"/g)) {
    filenames.add(m[1]);
  }
  return filenames;
}

function filenameFromOgImage(ogImage: string): string | undefined {
  return ogImage.match(/\/([^/]+)$/)?.[1];
}

export function findHtmlFiles(dir: string, base = dir): string[] {
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

/**
 * Asserts that every HTML file under greyradius-website/ is covered by both
 * add-og-meta.ts and add-og-images.ts (unless excluded).
 *
 * Call this at the top of any OG script to get a clear error message instead
 * of silently processing a partial page set.
 *
 * @param metaPages  Set of files already known to the calling script when it
 *                   is add-og-meta.ts. If omitted the pages are parsed from
 *                   the source file on disk.
 * @param imagePages Same for add-og-images.ts.
 */
export function assertOgCoverage(opts?: {
  metaPages?: Set<string>;
  imagePages?: Set<string>;
}): void {
  const scriptsDir = resolve(import.meta.dirname ?? new URL(".", import.meta.url).pathname, "..");
  const root = resolve(scriptsDir, "../../greyradius-website");

  const metaPages =
    opts?.metaPages ?? extractPageFiles(resolve(scriptsDir, "add-og-meta.ts"));
  const imagePages =
    opts?.imagePages ?? extractPageFiles(resolve(scriptsDir, "add-og-images.ts"));

  const htmlFiles = findHtmlFiles(root);

  let missingCount = 0;

  for (const file of htmlFiles) {
    if (EXCLUSIONS.has(file)) continue;

    const content = readFileSync(resolve(root, file), "utf-8");
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

  console.log(`✓ OG coverage OK — all ${htmlFiles.length} HTML files are covered.`);
}

/**
 * Ensures every managed top-level insight article has its own generated social
 * card. This prevents a newly added article from silently inheriting
 * og-insights.png or another fallback when only its HTML page is added.
 *
 * Newsletter pages use a separate publishing workflow under
 * insights/newsletters/. The Insights hub and legacy pages outside this
 * generated-card workflow are listed in INSIGHT_OG_EXCLUSIONS.
 */
export function assertInsightOgCoverage(): void {
  const scriptsDir = resolve(import.meta.dirname ?? new URL(".", import.meta.url).pathname, "..");
  const root = resolve(scriptsDir, "../../greyradius-website");
  const insightsDir = resolve(root, "insights");
  const imagePages = extractOgImagePages(resolve(scriptsDir, "add-og-images.ts"));
  const generatedFilenames = extractGeneratedFilenames(
    resolve(scriptsDir, "generate-og-images.ts")
  );
  const usedImages = new Map<string, string>();
  let errorCount = 0;
  let checkedCount = 0;

  for (const entry of readdirSync(insightsDir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".html")) continue;

    const file = `insights/${entry.name}`;
    if (INSIGHT_OG_EXCLUSIONS.has(file)) continue;

    checkedCount++;
    const ogImage = imagePages.get(file);
    if (!ogImage) {
      console.error(`  ✗ ${file} is missing from add-og-images.ts`);
      errorCount++;
      continue;
    }

    const filename = filenameFromOgImage(ogImage);
    if (!filename) {
      console.error(`  ✗ ${file} has an invalid og:image value: "${ogImage}"`);
      errorCount++;
      continue;
    }

    if (filename === "og-insights.png" || filename === "og-generic.png") {
      console.error(`  ✗ ${file} uses fallback social card "${filename}"`);
      errorCount++;
      continue;
    }

    if (!generatedFilenames.has(filename)) {
      console.error(
        `  ✗ ${file} uses "${filename}", which is missing from generate-og-images.ts`
      );
      errorCount++;
      continue;
    }

    const existingPage = usedImages.get(filename);
    if (existingPage) {
      console.error(`  ✗ ${file} shares "${filename}" with ${existingPage}`);
      errorCount++;
      continue;
    }

    usedImages.set(filename, file);
  }

  if (errorCount > 0) {
    console.error(
      `\n✗ ${errorCount} managed insight article(s) need individual generated social cards.` +
        `\n  → Add each page to scripts/src/generate-og-images.ts and scripts/src/add-og-images.ts` +
        `\n  → Do not use og-insights.png or og-generic.png for insight articles.\n`
    );
    process.exit(1);
  }

  console.log(
    `✓ Insight OG coverage OK — ${checkedCount} managed insight articles use unique generated cards.`
  );
}

/**
 * Converts an og-preview.html PAGES path to a relative HTML file path.
 *
 * Rules:
 *   /                         → index.html
 *   /about/                   → about/index.html
 *   /contact                  → contact.html
 *   /services/market-entry    → services/market-entry.html
 */
function pagePathToHtmlFile(path: string): string {
  if (path === "/") return "index.html";
  const stripped = path.startsWith("/") ? path.slice(1) : path;
  if (stripped.endsWith("/")) return stripped + "index.html";
  return stripped + ".html";
}

/**
 * Asserts that every page listed in og-preview.html PAGES has an og:image
 * tag in its HTML file that points to an image generated by
 * generate-og-images.ts.
 *
 * This keeps the two lists in sync: adding a page to og-preview.html PAGES
 * without a corresponding entry in generate-og-images.ts will fail the check.
 *
 * Pages that include  <!-- og-image-exclude -->  are skipped (they
 * intentionally use a generic fallback not tracked in generate-og-images.ts).
 */
export function assertOgImageSync(): void {
  const scriptsDir = resolve(import.meta.dirname ?? new URL(".", import.meta.url).pathname, "..");
  const root = resolve(scriptsDir, "../../greyradius-website");
  const ogPreviewPath = resolve(root, "og-preview.html");
  const generateScriptPath = resolve(scriptsDir, "generate-og-images.ts");

  if (!existsSync(ogPreviewPath)) {
    console.error(`✗ og-preview.html not found at ${ogPreviewPath}`);
    process.exit(1);
  }
  if (!existsSync(generateScriptPath)) {
    console.error(`✗ generate-og-images.ts not found at ${generateScriptPath}`);
    process.exit(1);
  }

  // 1. Extract page paths from og-preview.html PAGES array.
  //    Match:  { path: '/some/path', ...
  const previewSrc = readFileSync(ogPreviewPath, "utf-8");
  const pagePaths: string[] = [];
  for (const m of previewSrc.matchAll(/\{\s*path:\s*'([^']+)'/g)) {
    pagePaths.push(m[1]);
  }

  if (pagePaths.length === 0) {
    console.error("✗ No page paths found in og-preview.html — check the PAGES array format.");
    process.exit(1);
  }

  // 2. Extract OG image filenames from generate-og-images.ts pages array.
  //    Match:  filename: "og-something.png"
  const generateSrc = readFileSync(generateScriptPath, "utf-8");
  const generatedFilenames = new Set<string>();
  for (const m of generateSrc.matchAll(/filename:\s*"([^"]+\.png)"/g)) {
    generatedFilenames.add(m[1]);
  }

  if (generatedFilenames.size === 0) {
    console.error("✗ No filenames found in generate-og-images.ts — check the pages array format.");
    process.exit(1);
  }

  // 3. For each page path, resolve the HTML file and check its og:image.
  let errorCount = 0;
  const coveredFilenames = new Set<string>();

  for (const path of pagePaths) {
    const htmlFile = pagePathToHtmlFile(path);
    const htmlPath = resolve(root, htmlFile);

    if (!existsSync(htmlPath)) {
      console.error(`  ✗ ${path}  →  ${htmlFile}  (HTML file not found on disk)`);
      errorCount++;
      continue;
    }

    const html = readFileSync(htmlPath, "utf-8");

    if (html.includes("<!-- og-image-exclude -->")) continue;

    // Extract filename from og:image — handles both relative (/assets/images/og-X.png)
    // and absolute (https://greyradius.com/assets/images/og-X.png) URLs.
    const ogMatch = html.match(
      /<meta\s+property="og:image"\s+content="[^"]*\/([^"/]+\.png)"/
    );

    if (!ogMatch) {
      console.error(
        `  ✗ ${path}  →  ${htmlFile}  (no og:image tag found)`
      );
      errorCount++;
      continue;
    }

    const filename = ogMatch[1];
    coveredFilenames.add(filename);

    if (!generatedFilenames.has(filename)) {
      console.error(
        `  ✗ ${path}  →  og:image "${filename}" is not in generate-og-images.ts`
      );
      console.error(
        `      → Add a { filename: "${filename}", ... } entry to scripts/src/generate-og-images.ts`
      );
      errorCount++;
    }
  }

  // 4. Warn about filenames in generate-og-images.ts not referenced by any page
  //    in og-preview.html (potential orphans — informational only, not a hard fail).
  const unreferenced = [...generatedFilenames].filter(
    (f) => f !== "og-generic.png" && !coveredFilenames.has(f)
  );
  if (unreferenced.length > 0) {
    console.warn(
      `\n  ⚠ ${unreferenced.length} OG image(s) in generate-og-images.ts not referenced by any page in og-preview.html:`
    );
    for (const f of unreferenced) {
      console.warn(`      ${f}`);
    }
    console.warn(
      `  (These may be used by pages not listed in og-preview.html, or may be orphaned.)\n`
    );
  }

  if (errorCount > 0) {
    console.error(
      `\n✗ ${errorCount} page(s) in og-preview.html are out of sync with generate-og-images.ts.` +
        `\n  → For each error above, either:` +
        `\n      a) Add the missing og:image entry to scripts/src/generate-og-images.ts, or` +
        `\n      b) Add  <!-- og-image-exclude -->  to the HTML file to opt it out.\n`
    );
    process.exit(1);
  }

  console.log(
    `✓ OG image sync OK — all ${pagePaths.length} pages in og-preview.html reference generated images.`
  );
}
