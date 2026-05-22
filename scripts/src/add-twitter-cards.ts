import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(process.cwd(), "../greyradius-website");

// All pages — ordered to match the og pipeline (add-og-meta.ts covers the
// authoritative list; add-og-images.ts covers og:image for a subset).
const files: string[] = [
  "index.html",

  "services/index.html",
  "services/opportunity-assessment.html",
  "services/feasibility-and-tev.html",
  "services/market-entry-execution.html",
  "services/gtm-execution-as-a-service.html",
  "services/pitchbook-and-fundraising.html",
  "services/ai-consulting-and-transformation.html",

  "industries/index.html",
  "industries/bfsi.html",
  "industries/cpg-fmcg-retail.html",
  "industries/energy-and-chemicals.html",
  "industries/healthcare-and-life-sciences.html",
  "industries/investment-banks-and-pe.html",
  "industries/technology.html",

  "about/index.html",
  "about/team.html",
  "about/method.html",
  "about/why-greyradius.html",

  "contact.html",
  "careers.html",

  "case-studies/index.html",
  "case-studies/agri-chemical-gtm.html",
  "case-studies/alloy-metals-sea-expansion.html",
  "case-studies/coal-mining-enclosed-transport.html",
  "case-studies/drone-startup-gtm.html",
  "case-studies/elearning-gcc-expansion.html",
  "case-studies/eye-care-pharma-market-entry.html",
  "case-studies/hospital-chain-canada.html",
  "case-studies/nativfresh-cpg-gtm.html",
  "case-studies/oncology-abstracts.html",
  "case-studies/retail-market-entry.html",
  "case-studies/saas-product-market-fit.html",
  "case-studies/trinetra-gtm.html",

  "insights/index.html",
  "insights/ai-hype-to-business-results.html",
  "insights/consultants-vs-inhouse-strategy-team.html",
  "insights/cost-transformation-not-cost-cutting.html",
  "insights/elearning-retention-gtm-strategy.html",
  "insights/gcc-renewable-energy-market-entry.html",
  "insights/healthcare-ai-operational-readiness.html",
  "insights/india-drone-sector-market-entry.html",
  "insights/market-expansion-strategy-failures.html",
  "insights/msme-execution-systems-productivity.html",
  "insights/pharma-clinical-trial-decision-intelligence.html",
  "insights/plg-vs-slg-which-gtm-model-fits.html",
  "insights/retail-expansion-market-understanding.html",
  "insights/saas-growth-customer-intelligence.html",
  "insights/saas-international-expansion-model.html",
  "insights/standard-of-care-benchmarking-healthcare.html",
  "insights/supply-chain-resilience-board-strategy.html",
  "insights/uae-consumer-goods-market-entry.html",
  "insights/winning-in-saturated-markets.html",

  "legal/privacy.html",
  "legal/terms.html",

  "og-preview.html",
];

function extract(html: string, property: string): string | null {
  const m = html.match(new RegExp(`property="${property}" content="([^"]+)"`));
  return m ? m[1] : null;
}

function extractName(html: string, name: string): string | null {
  const m = html.match(new RegExp(`name="${name}" content="([^"]+)"`));
  return m ? m[1] : null;
}

const FALLBACK_IMAGE = "/assets/images/og-homepage.png";

function buildBlock(title: string, desc: string, image: string | null): string {
  const resolvedImage = image ?? FALLBACK_IMAGE;
  return [
    `  <meta name="twitter:card" content="summary_large_image">`,
    `  <meta name="twitter:title" content="${title}">`,
    `  <meta name="twitter:description" content="${desc}">`,
    `  <meta name="twitter:image" content="${resolvedImage}">`,
  ].join("\n");
}

function hasTwitterTags(html: string): boolean {
  return html.includes('name="twitter:card"');
}

function removeExistingTwitterTags(html: string): string {
  // Remove all twitter: meta tags so we can replace them cleanly as a block
  return html.replace(/\n?[ \t]*<meta name="twitter:[^"]*"[^>]*>/g, "");
}

let updated = 0;
let skipped = 0;

for (const file of files) {
  const path = resolve(ROOT, file);
  let html = readFileSync(path, "utf-8");

  const ogTitle = extract(html, "og:title");
  const ogDesc = extract(html, "og:description");
  const ogImage = extract(html, "og:image");

  if (!ogTitle || !ogDesc) {
    console.log(`  WARN (no og:title/description found): ${file}`);
    continue;
  }

  // Check if existing twitter tags are already correct
  if (hasTwitterTags(html)) {
    const twCard = extractName(html, "twitter:card");
    const twTitle = extractName(html, "twitter:title");
    const twDesc = extractName(html, "twitter:description");
    const twImage = extractName(html, "twitter:image");

    const resolvedImage = ogImage ?? FALLBACK_IMAGE;
    const correct =
      twCard === "summary_large_image" &&
      twTitle === ogTitle &&
      twDesc === ogDesc &&
      twImage === resolvedImage;

    if (correct) {
      console.log(`  SKIP (already correct): ${file}`);
      skipped++;
      continue;
    }

    // Remove existing twitter tags so we can inject a clean block
    html = removeExistingTwitterTags(html);
  }

  const block = buildBlock(ogTitle, ogDesc, ogImage);

  // Insert after og:image if present, otherwise after og:description, otherwise before </head>
  if (ogImage && html.includes('property="og:image"')) {
    html = html.replace(
      /(<meta property="og:image"[^>]*>)/,
      `$1\n${block}`
    );
  } else if (html.includes('property="og:description"')) {
    html = html.replace(
      /(<meta property="og:description"[^>]*>)/,
      `$1\n${block}`
    );
  } else {
    html = html.replace("</head>", `${block}\n</head>`);
  }

  writeFileSync(path, html, "utf-8");
  console.log(`  ✓ ${file}`);
  updated++;
}

console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}`);
