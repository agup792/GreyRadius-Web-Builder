import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(process.cwd(), "../greyradius-website");

type PageDef = {
  file: string;
  ogImage: string;
};

const pages: PageDef[] = [
  { file: "services/index.html",                          ogImage: "/assets/images/og-services.png" },
  { file: "services/opportunity-assessment.html",         ogImage: "/assets/images/og-services.png" },
  { file: "services/feasibility-and-tev.html",           ogImage: "/assets/images/og-services.png" },
  { file: "services/market-entry-execution.html",        ogImage: "/assets/images/og-services.png" },
  { file: "services/gtm-execution-as-a-service.html",    ogImage: "/assets/images/og-services.png" },
  { file: "services/pitchbook-and-fundraising.html",     ogImage: "/assets/images/og-services.png" },
  { file: "services/ai-consulting-and-transformation.html", ogImage: "/assets/images/og-services.png" },

  { file: "industries/index.html",                       ogImage: "/assets/images/og-industries.png" },
  { file: "industries/bfsi.html",                        ogImage: "/assets/images/og-industries.png" },
  { file: "industries/cpg-fmcg-retail.html",             ogImage: "/assets/images/og-industries.png" },
  { file: "industries/energy-and-chemicals.html",        ogImage: "/assets/images/og-industries.png" },
  { file: "industries/healthcare-and-life-sciences.html",ogImage: "/assets/images/og-industries.png" },
  { file: "industries/investment-banks-and-pe.html",     ogImage: "/assets/images/og-industries.png" },
  { file: "industries/technology.html",                  ogImage: "/assets/images/og-industries.png" },

  { file: "about/index.html",                            ogImage: "/assets/images/og-about.png" },
  { file: "about/team.html",                             ogImage: "/assets/images/og-about.png" },
  { file: "about/method.html",                           ogImage: "/assets/images/og-about.png" },
  { file: "about/why-greyradius.html",                   ogImage: "/assets/images/og-about.png" },

  { file: "contact.html",                                ogImage: "/assets/images/og-contact.png" },

  { file: "case-studies/index.html",                     ogImage: "/assets/images/og-case-studies.png" },
  { file: "case-studies/agri-chemical-gtm.html",         ogImage: "/assets/images/og-case-studies.png" },
  { file: "case-studies/alloy-metals-sea-expansion.html",ogImage: "/assets/images/og-case-studies.png" },
  { file: "case-studies/coal-mining-enclosed-transport.html", ogImage: "/assets/images/og-case-studies.png" },
  { file: "case-studies/drone-startup-gtm.html",         ogImage: "/assets/images/og-case-studies.png" },
  { file: "case-studies/elearning-gcc-expansion.html",   ogImage: "/assets/images/og-case-studies.png" },
  { file: "case-studies/eye-care-pharma-market-entry.html", ogImage: "/assets/images/og-case-studies.png" },
  { file: "case-studies/hospital-chain-canada.html",     ogImage: "/assets/images/og-case-studies.png" },
  { file: "case-studies/nativfresh-cpg-gtm.html",        ogImage: "/assets/images/og-case-studies.png" },
  { file: "case-studies/oncology-abstracts.html",        ogImage: "/assets/images/og-case-studies.png" },
  { file: "case-studies/retail-market-entry.html",       ogImage: "/assets/images/og-case-studies.png" },
  { file: "case-studies/saas-product-market-fit.html",   ogImage: "/assets/images/og-case-studies.png" },
  { file: "case-studies/trinetra-gtm.html",              ogImage: "/assets/images/og-case-studies.png" },

  { file: "insights/index.html",                         ogImage: "/assets/images/og-insights.png" },
  { file: "insights/ai-hype-to-results.html",            ogImage: "/assets/images/og-insights.png" },
  { file: "insights/consultants-vs-inhouse.html",        ogImage: "/assets/images/og-insights.png" },
  { file: "insights/cost-transformation.html",           ogImage: "/assets/images/og-insights.png" },
  { file: "insights/resilient-supply-chain.html",        ogImage: "/assets/images/og-insights.png" },
  { file: "insights/what-management-consultants-do.html",ogImage: "/assets/images/og-insights.png" },
  { file: "insights/winning-saturated-markets.html",     ogImage: "/assets/images/og-insights.png" },
];

const ogImageTag = (src: string) =>
  `  <meta property="og:image" content="${src}">`;

let updated = 0;
let skipped = 0;

for (const { file, ogImage } of pages) {
  const path = resolve(ROOT, file);
  let html = readFileSync(path, "utf-8");

  if (html.includes('property="og:image"')) {
    console.log(`  SKIP (already has og:image): ${file}`);
    skipped++;
    continue;
  }

  const tag = ogImageTag(ogImage);

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

console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}`);
