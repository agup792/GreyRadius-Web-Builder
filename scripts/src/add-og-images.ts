import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { assertOgCoverage } from "./lib/og-coverage.js";

const ROOT = resolve(process.cwd(), "../greyradius-website");

type PageDef = {
  file: string;
  ogImage: string;
};

const pages: PageDef[] = [
  { file: "index.html",                                      ogImage: "/assets/images/og-homepage.png" },
  { file: "careers.html",                                    ogImage: "/assets/images/og-careers.png" },
  { file: "og-preview.html",                                 ogImage: "/assets/images/og-generic.png" },
  { file: "legal/privacy.html",                              ogImage: "/assets/images/og-privacy.png" },
  { file: "legal/terms.html",                                ogImage: "/assets/images/og-terms.png" },

  { file: "services/index.html",                             ogImage: "/assets/images/og-services.png" },
  { file: "services/opportunity-assessment.html",            ogImage: "/assets/images/og-svc-opportunity.png" },
  { file: "services/feasibility-and-tev.html",              ogImage: "/assets/images/og-svc-feasibility.png" },
  { file: "services/market-entry-execution.html",           ogImage: "/assets/images/og-svc-market-entry.png" },
  { file: "services/gtm-execution-as-a-service.html",       ogImage: "/assets/images/og-svc-gtm.png" },
  { file: "services/pitchbook-and-fundraising.html",        ogImage: "/assets/images/og-svc-pitchbook.png" },
  { file: "services/ai-consulting-and-transformation.html", ogImage: "/assets/images/og-svc-ai.png" },

  { file: "industries/index.html",                          ogImage: "/assets/images/og-industries.png" },
  { file: "industries/bfsi.html",                           ogImage: "/assets/images/og-ind-bfsi.png" },
  { file: "industries/cpg-fmcg-retail.html",                ogImage: "/assets/images/og-ind-cpg.png" },
  { file: "industries/energy-and-chemicals.html",           ogImage: "/assets/images/og-ind-energy.png" },
  { file: "industries/healthcare-and-life-sciences.html",   ogImage: "/assets/images/og-ind-healthcare.png" },
  { file: "industries/investment-banks-and-pe.html",        ogImage: "/assets/images/og-ind-investment.png" },
  { file: "industries/technology.html",                     ogImage: "/assets/images/og-ind-technology.png" },

  { file: "about/index.html",                               ogImage: "/assets/images/og-about.png" },
  { file: "about/team.html",                                ogImage: "/assets/images/og-about.png" },
  { file: "about/method.html",                              ogImage: "/assets/images/og-about.png" },
  { file: "about/why-greyradius.html",                      ogImage: "/assets/images/og-about.png" },

  { file: "contact.html",                                   ogImage: "/assets/images/og-contact.png" },

  { file: "case-studies/index.html",                        ogImage: "/assets/images/og-case-studies.png" },
  { file: "case-studies/agri-chemical-gtm.html",            ogImage: "/assets/images/og-cs-agri-chemical.png" },
  { file: "case-studies/alloy-metals-sea-expansion.html",   ogImage: "/assets/images/og-cs-alloy-metals.png" },
  { file: "case-studies/coal-mining-enclosed-transport.html", ogImage: "/assets/images/og-cs-coal-mining.png" },
  { file: "case-studies/drone-startup-gtm.html",            ogImage: "/assets/images/og-cs-drone-startup.png" },
  { file: "case-studies/elearning-gcc-expansion.html",      ogImage: "/assets/images/og-cs-elearning.png" },
  { file: "case-studies/eye-care-pharma-market-entry.html", ogImage: "/assets/images/og-cs-eye-care.png" },
  { file: "case-studies/hospital-chain-canada.html",        ogImage: "/assets/images/og-cs-hospital-canada.png" },
  { file: "case-studies/nativfresh-cpg-gtm.html",           ogImage: "/assets/images/og-cs-nativfresh.png" },
  { file: "case-studies/oncology-abstracts.html",           ogImage: "/assets/images/og-cs-oncology.png" },
  { file: "case-studies/retail-market-entry.html",          ogImage: "/assets/images/og-cs-retail-market.png" },
  { file: "case-studies/saas-product-market-fit.html",      ogImage: "/assets/images/og-cs-saas-pmf.png" },
  { file: "case-studies/trinetra-gtm.html",                 ogImage: "/assets/images/og-cs-trinetra.png" },

  { file: "insights/index.html",                            ogImage: "/assets/images/og-insights.png" },
  { file: "insights/winning-in-saturated-markets.html",     ogImage: "/assets/images/og-ins-saturated-markets.png" },
  { file: "insights/ai-hype-to-business-results.html",              ogImage: "/assets/images/og-insights.png" },
  { file: "insights/consultants-vs-inhouse-strategy-team.html",     ogImage: "/assets/images/og-insights.png" },
  { file: "insights/cost-transformation-not-cost-cutting.html",     ogImage: "/assets/images/og-insights.png" },
  { file: "insights/elearning-retention-gtm-strategy.html",         ogImage: "/assets/images/og-insights.png" },
  { file: "insights/gcc-renewable-energy-market-entry.html",        ogImage: "/assets/images/og-insights.png" },
  { file: "insights/healthcare-ai-operational-readiness.html",      ogImage: "/assets/images/og-insights.png" },
  { file: "insights/india-drone-sector-market-entry.html",          ogImage: "/assets/images/og-insights.png" },
  { file: "insights/market-expansion-strategy-failures.html",       ogImage: "/assets/images/og-insights.png" },
  { file: "insights/msme-execution-systems-productivity.html",      ogImage: "/assets/images/og-insights.png" },
  { file: "insights/pharma-clinical-trial-decision-intelligence.html", ogImage: "/assets/images/og-insights.png" },
  { file: "insights/plg-vs-slg-which-gtm-model-fits.html",          ogImage: "/assets/images/og-insights.png" },
  { file: "insights/retail-expansion-market-understanding.html",    ogImage: "/assets/images/og-insights.png" },
  { file: "insights/saas-growth-customer-intelligence.html",        ogImage: "/assets/images/og-insights.png" },
  { file: "insights/saas-international-expansion-model.html",       ogImage: "/assets/images/og-insights.png" },
  { file: "insights/standard-of-care-benchmarking-healthcare.html", ogImage: "/assets/images/og-insights.png" },
  { file: "insights/supply-chain-resilience-board-strategy.html",   ogImage: "/assets/images/og-insights.png" },
  { file: "insights/uae-consumer-goods-market-entry.html",          ogImage: "/assets/images/og-insights.png" },
];

const ogImageTag = (src: string) =>
  `  <meta property="og:image" content="${src}">`;

assertOgCoverage({ imagePages: new Set(pages.map((p) => p.file)) });

let updated = 0;
let replaced = 0;
let skipped = 0;

for (const { file, ogImage } of pages) {
  const path = resolve(ROOT, file);
  let html = readFileSync(path, "utf-8");

  const tag = ogImageTag(ogImage);

  if (html.includes('property="og:image"')) {
    const existing = html.match(/property="og:image" content="([^"]+)"/)?.[1];
    if (existing === ogImage) {
      console.log(`  SKIP (already correct): ${file}`);
      skipped++;
      continue;
    }
    html = html.replace(
      /<meta property="og:image"[^>]*>/,
      tag.trim()
    );
    writeFileSync(path, html, "utf-8");
    console.log(`  ↻ ${file}  →  ${ogImage}`);
    replaced++;
    continue;
  }

  if (html.includes('property="og:description"')) {
    html = html.replace(
      /(<meta property="og:description"[^>]*>)/,
      `$1\n${tag}`
    );
  } else if (html.includes('property="og:title"')) {
    html = html.replace(
      /(<meta property="og:title"[^>]*>)/,
      `$1\n${tag}`
    );
  } else {
    html = html.replace("</head>", `${tag}\n</head>`);
  }

  writeFileSync(path, html, "utf-8");
  console.log(`  ✓ ${file}`);
  updated++;
}

console.log(`\nDone. Added: ${updated}, Replaced: ${replaced}, Skipped: ${skipped}`);
