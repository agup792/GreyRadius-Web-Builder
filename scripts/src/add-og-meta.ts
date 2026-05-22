import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { assertOgCoverage } from "./lib/og-coverage.js";

const ROOT = resolve(process.cwd(), "../greyradius-website");

type PageDef = {
  file: string;
  ogTitle: string;
  ogDescription: string;
};

const pages: PageDef[] = [
  // ─── Homepage ───────────────────────────────────────────────────────────────
  {
    file: "index.html",
    ogTitle: "GreyRadius Consulting — Strategy you can execute. Outcomes within reach.",
    ogDescription: "Boutique strategy and growth consulting grounded in real primary research, accelerated by AI, delivered as measurable outcomes.",
  },

  // ─── Services ────────────────────────────────────────────────────────────────
  {
    file: "services/index.html",
    ogTitle: "Services — Six output-led offerings | GreyRadius Consulting",
    ogDescription: "Six output-led service offerings: Opportunity Assessment, Feasibility & TEV, Market Entry Execution, GTM Execution-as-a-Service, Pitchbook & Fundraising, and AI Consulting. One method. Real outcomes.",
  },
  {
    file: "services/opportunity-assessment.html",
    ogTitle: "Opportunity Assessment — Should you play in this market? | GreyRadius",
    ogDescription: "Primary-research-led market sizing, competitive analysis, and go/no-go recommendation. Know before you commit capital.",
  },
  {
    file: "services/feasibility-and-tev.html",
    ogTitle: "Feasibility & TEV — Is this play bankable? | GreyRadius",
    ogDescription: "Technical and economic viability studies that answer the one question investors and boards care about: is this play bankable? Four weeks. Fixed fee.",
  },
  {
    file: "services/market-entry-execution.html",
    ogTitle: "Market Entry Execution — Land. Sign. Get the first customer. | GreyRadius",
    ogDescription: "End-to-end market entry execution: entity setup, partner identification, first-customer acquisition. Month-by-month milestones with contractual outputs.",
  },
  {
    file: "services/gtm-execution-as-a-service.html",
    ogTitle: "GTM Execution-as-a-Service — We run the first 90 days | GreyRadius",
    ogDescription: "GreyRadius doesn't advise on go-to-market — we run it. Pipeline building, ICP refinement, and commercial execution for the first 90 days.",
  },
  {
    file: "services/pitchbook-and-fundraising.html",
    ogTitle: "Pitchbook & Fundraising — From slides to closed round | GreyRadius",
    ogDescription: "Investor-grade pitchbooks, financial models, and fundraising advisory. From deck to closed round in 90 days.",
  },
  {
    file: "services/ai-consulting-and-transformation.html",
    ogTitle: "AI Consulting & Transformation — Strategy that ships | GreyRadius",
    ogDescription: "AI strategy that ships. Use-case prioritisation, build-vs-buy roadmaps, and hands-on implementation support — not transformation decks.",
  },

  // ─── Industries ──────────────────────────────────────────────────────────────
  {
    file: "industries/index.html",
    ogTitle: "Industries — GreyRadius Consulting",
    ogDescription: "Deep sector expertise across Technology, BFSI, Energy & Chemicals, CPG/FMCG/Retail, Healthcare & Life Sciences, and Investment Banking & PE.",
  },
  {
    file: "industries/bfsi.html",
    ogTitle: "BFSI — Banking, Financial Services & Insurance | GreyRadius",
    ogDescription: "Strategy and commercial advisory for financial services firms navigating the most significant industry restructuring in a generation.",
  },
  {
    file: "industries/cpg-fmcg-retail.html",
    ogTitle: "CPG / FMCG / Retail — GreyRadius Consulting",
    ogDescription: "Consumer brand strategy, GTM execution, and market entry for CPG, FMCG, and retail clients across India, GCC, and South-East Asia.",
  },
  {
    file: "industries/energy-and-chemicals.html",
    ogTitle: "Energy & Chemicals — GreyRadius Consulting",
    ogDescription: "Market entry, feasibility, and industrial strategy for energy and chemicals clients navigating transition and expansion.",
  },
  {
    file: "industries/healthcare-and-life-sciences.html",
    ogTitle: "Healthcare & Life Sciences — GreyRadius Consulting",
    ogDescription: "Healthcare strategy where regulatory context determines everything. Market entry, clinical evidence, and commercial strategy for pharma, medtech, and hospital clients.",
  },
  {
    file: "industries/investment-banks-and-pe.html",
    ogTitle: "Investment Banking & Private Equity — GreyRadius Consulting",
    ogDescription: "Primary research for investment decisions that can't afford to be wrong. Commercial due diligence, market sizing, and sector deep-dives for IB and PE clients.",
  },
  {
    file: "industries/technology.html",
    ogTitle: "Technology — GreyRadius Consulting",
    ogDescription: "Helping tech products find their market. GTM strategy, product-market fit, and international expansion for SaaS, enterprise software, and technology services firms.",
  },

  // ─── About ───────────────────────────────────────────────────────────────────
  {
    file: "about/index.html",
    ogTitle: "About GreyRadius Consulting",
    ogDescription: "Founded 2017. Four partners across Delhi, Dubai, Singapore, Brussels. 200+ projects delivered.",
  },
  {
    file: "about/team.html",
    ogTitle: "The Team — GreyRadius Consulting",
    ogDescription: "Meet the GreyRadius Consulting team — 5 partners and 10 senior advisors across India, UAE, Singapore and Belgium.",
  },
  {
    file: "about/method.html",
    ogTitle: "The GR Method — How GreyRadius works",
    ogDescription: "Same six steps across every engagement. The first three earn the credibility. The last three deliver the outcome.",
  },
  {
    file: "about/why-greyradius.html",
    ogTitle: "Why GreyRadius — Boutique vs Big-4 vs DIY",
    ogDescription: "Three things you won't get from Big-4. Three things you won't get from a freelancer or AI tool. GreyRadius sits in the middle — where the work that matters gets done.",
  },

  // ─── Contact / Careers ───────────────────────────────────────────────────────
  {
    file: "contact.html",
    ogTitle: "Contact GreyRadius — Book a 30-min discovery call",
    ogDescription: "Book a 30-minute discovery call with a GreyRadius partner. Delhi · Dubai · Singapore · Brussels. hello@greyradius.com",
  },
  {
    file: "careers.html",
    ogTitle: "Careers — GreyRadius Consulting",
    ogDescription: "We hire from time to time. Senior consultants with strategy, research, or fundraising advisory experience. Boutique with founder access.",
  },

  // ─── Case Studies ─────────────────────────────────────────────────────────────
  {
    file: "case-studies/index.html",
    ogTitle: "Case Studies — GreyRadius Consulting",
    ogDescription: "12 engagements. Real primary research. Real outcomes. Real numbers.",
  },
  {
    file: "case-studies/agri-chemical-gtm.html",
    ogTitle: "Agri Chemical GTM & Product Development — GreyRadius Case Study",
    ogDescription: "How GreyRadius ran primary research across the full agricultural value chain to help a leading agri-chemical company accelerate product development and go-to-market.",
  },
  {
    file: "case-studies/alloy-metals-sea-expansion.html",
    ogTitle: "Alloy & Ferro Metals South-East Asia Expansion — GreyRadius Case Study",
    ogDescription: "Six candidate markets screened down to one optimal location for an alloy and ferro metals manufacturer expanding into South-East Asia. Strategy through to deployment.",
  },
  {
    file: "case-studies/coal-mining-enclosed-transport.html",
    ogTitle: "Coal Mining Material Handling Transformation — GreyRadius Case Study",
    ogDescription: "Execution-focused transformation of a coal mining material handling system — quantifying losses, improving efficiency, and securing regulatory compliance ahead of deadline.",
  },
  {
    file: "case-studies/drone-startup-gtm.html",
    ogTitle: "GTM Strategy for a Drone Startup — GreyRadius Case Study",
    ogDescription: "How GreyRadius helped a drone services startup move from broad market interest to focused ICP, faster conversion cycles, and pilot-to-commercial pathways that actually closed.",
  },
  {
    file: "case-studies/elearning-gcc-expansion.html",
    ogTitle: "UAE E-Learning Platform GCC Expansion Strategy — GreyRadius Case Study",
    ogDescription: "A structured five-workstream market entry strategy helped a UAE-based e-learning platform prioritise GCC markets and build a rollout sequence grounded in primary buyer research.",
  },
  {
    file: "case-studies/eye-care-pharma-market-entry.html",
    ogTitle: "Eye Care Pharmaceuticals Market Entry Strategy — GreyRadius Case Study",
    ogDescription: "Competitive market entry strategy for an eye care pharma company — five structural barriers addressed, margins protected, and a growth roadmap built from primary research.",
  },
  {
    file: "case-studies/hospital-chain-canada.html",
    ogTitle: "US Hospital Chain Canada Market Entry — GreyRadius Case Study",
    ogDescription: "Market entry strategy for a US hospital chain expanding into Canada — two compliant entry models, a board-ready financial case, and capital risk avoided.",
  },
  {
    file: "case-studies/nativfresh-cpg-gtm.html",
    ogTitle: "NativFresh CPG GTM Strategy — GreyRadius Case Study",
    ogDescription: "Data-led go-to-market for NativFresh, a Bengaluru fresh foods brand — consumer-validated GTM, 18-month expansion roadmap, and launch without guesswork.",
  },
  {
    file: "case-studies/oncology-abstracts.html",
    ogTitle: "Oncology Clinical Trial Abstracts — GreyRadius Case Study",
    ogDescription: "100+ oncology clinical trial abstracts standardised and structured for cross-trial analysis — from published data to analysis-ready evidence for commercial and regulatory use.",
  },
  {
    file: "case-studies/retail-market-entry.html",
    ogTitle: "Retail Market Entry Strategy for a New Consumer Brand — GreyRadius Case Study",
    ogDescription: "Data-driven retail market entry strategy for a new consumer brand — real market insights, phased entry planning, and protected margins from launch.",
  },
  {
    file: "case-studies/saas-product-market-fit.html",
    ogTitle: "SaaS Startup Finds Product-Market Fit — GreyRadius Case Study",
    ogDescription: "How GreyRadius helped a feature-heavy SaaS startup find product-market fit by identifying their highest-converting segment and rebuilding go-to-market around outcomes instead of features.",
  },
  {
    file: "case-studies/trinetra-gtm.html",
    ogTitle: "Trinetra North American GTM Strategy — GreyRadius Case Study",
    ogDescription: "How GreyRadius built a North American GTM strategy for Trinetra — a Canadian enterprise integration IT firm — defining their ICP, entry markets, and scalable pipeline.",
  },

  // ─── Insights ─────────────────────────────────────────────────────────────────
  {
    file: "insights/index.html",
    ogTitle: "Insights — GreyRadius Consulting",
    ogDescription: "Research findings, market patterns, and practitioner perspective. No AI-generated filler — just what we learned from the interviews.",
  },
  {
    file: "insights/ai-hype-to-business-results.html",
    ogTitle: "Turning AI Hype Into Business Results — GreyRadius Insights",
    ogDescription: "Most AI investments stall — not because the technology fails, but because the organisation does. The gap between deploying AI and embedding it into how value gets created is where most implementations quietly die.",
  },
  {
    file: "insights/consultants-vs-inhouse-strategy-team.html",
    ogTitle: "Business Management Consultants vs In-House Strategy Team — GreyRadius Insights",
    ogDescription: "The consultants vs in-house debate is mostly a false choice. The smartest companies aren't choosing between the two — they're running a hybrid. Here is when each model earns its place.",
  },
  {
    file: "insights/cost-transformation-not-cost-cutting.html",
    ogTitle: "Cost Transformation Beyond Cost Cutting — GreyRadius Insights",
    ogDescription: "Cost cutting reduces resources. Cost transformation changes how work gets done. Most restructuring programmes do the first. The ones that build lasting competitive advantage do the second.",
  },
  {
    file: "insights/elearning-retention-gtm-strategy.html",
    ogTitle: "Most E-Learning Companies Do Not Have a Growth Problem. They Have a Retention Problem. — GreyRadius Insights",
    ogDescription: "The e-learning market is expanding rapidly, but sustainable growth is becoming harder to achieve. The issue is almost never acquisition — it is what happens to learners after they join.",
  },
  {
    file: "insights/gcc-renewable-energy-market-entry.html",
    ogTitle: "The GCC Renewable Energy Opportunity Is Bigger Than Most Companies Realize — GreyRadius Insights",
    ogDescription: "The GCC renewable energy market is attracting global attention for the right reasons. What most international entrants underestimate is what actually determines success once they're inside.",
  },
  {
    file: "insights/healthcare-ai-operational-readiness.html",
    ogTitle: "Healthcare's AI Problem Is Not Technology Adoption. It Is Operational Readiness. — GreyRadius Insights",
    ogDescription: "Healthcare organisations are investing heavily in AI. Many transformation initiatives still struggle to create scalable impact. The gap is not innovation — it is execution integration.",
  },
  {
    file: "insights/india-drone-sector-market-entry.html",
    ogTitle: "India's Drone Opportunity Is Growing Faster Than Most Companies Can Operationally Handle — GreyRadius Insights",
    ogDescription: "India's drone sector is entering a phase of commercial acceleration. The demand is there. The regulatory intent is positive. What breaks most drone businesses is not market access — it is operational and commercial infrastructure that doesn't scale.",
  },
  {
    file: "insights/market-expansion-strategy-failures.html",
    ogTitle: "Most Market Expansion Strategies Fail Before the Company Even Enters the Market — GreyRadius Insights",
    ogDescription: "Market expansion failures are not usually caused by poor execution. They are caused by flawed assumptions made before any execution began. Here is where those assumptions typically form — and how to test them first.",
  },
  {
    file: "insights/msme-execution-systems-productivity.html",
    ogTitle: "Most MSMEs Do Not Have a Capability Problem. They Have an Execution Problem. — GreyRadius Insights",
    ogDescription: "MSMEs are investing more in growth than ever. Yet productivity gaps keep widening. The issue is not resources or ambition — it is the absence of structured operating systems that convert effort into consistent outcomes.",
  },
  {
    file: "insights/pharma-clinical-trial-decision-intelligence.html",
    ogTitle: "Pharma's Biggest Data Problem Is Not Data Availability. It Is Decision Intelligence. — GreyRadius Insights",
    ogDescription: "Pharmaceutical companies are generating more clinical data than ever. Trial timelines are still inefficient. The data exists. The problem is that most of it never reaches strategic decision-makers in a form they can act on.",
  },
  {
    file: "insights/plg-vs-slg-which-gtm-model-fits.html",
    ogTitle: "Product-Led Growth vs Sales-Led Growth: Which Model Actually Fits Your Stage — GreyRadius Insights",
    ogDescription: "The PLG vs SLG debate occupies more strategic planning time than it deserves. The companies growing consistently aren't choosing between the two — they're building systems where product usage informs sales timing.",
  },
  {
    file: "insights/retail-expansion-market-understanding.html",
    ogTitle: "Retail Expansion Fails When Growth Moves Faster Than Market Understanding — GreyRadius Insights",
    ogDescription: "Most retail expansion problems are diagnosed too late. By the time leadership acts, capital is deployed and the expansion model is already under pressure. Here's what to look for earlier.",
  },
  {
    file: "insights/saas-growth-customer-intelligence.html",
    ogTitle: "Most SaaS Growth Problems Are Not Acquisition Problems. They Are Customer Understanding Problems. — GreyRadius Insights",
    ogDescription: "When SaaS pipeline conversion drops or retention softens, the immediate response is usually tactical — more spend, adjusted messaging, optimised pricing. In most cases, the underlying problem is different.",
  },
  {
    file: "insights/saas-international-expansion-model.html",
    ogTitle: "Global SaaS Expansion Fails Quietly Long Before Revenue Slows Down — GreyRadius Insights",
    ogDescription: "Most SaaS companies don't recognise international expansion problems until the commercial damage is already done. This is what the early warning signals actually look like.",
  },
  {
    file: "insights/standard-of-care-benchmarking-healthcare.html",
    ogTitle: "Why Defining the Right Benchmark Shapes Better Decisions: Standard of Care — GreyRadius Insights",
    ogDescription: "In healthcare strategy, the benchmark you choose determines the conclusions you reach. Most organisations benchmark against industry averages. The ones making smarter decisions benchmark differently.",
  },
  {
    file: "insights/supply-chain-resilience-board-strategy.html",
    ogTitle: "Why Supply Chain Resilience Is Now a Board-Level Strategy Problem — GreyRadius Insights",
    ogDescription: "The pandemic, the Suez Canal, the Red Sea — three events, three causes, one consistent finding: the companies that absorbed the shock were the ones that had built resilience before they needed it.",
  },
  {
    file: "insights/uae-consumer-goods-market-entry.html",
    ogTitle: "The UAE Consumer Goods Market Is Growing. But Growth Is Becoming Harder to Capture Predictably. — GreyRadius Insights",
    ogDescription: "The UAE consumer goods market is attracting global brands, regional distributors, and expansion-focused investors. What most companies underestimate is what it actually takes to sustain growth after the launch.",
  },
  {
    file: "insights/winning-in-saturated-markets.html",
    ogTitle: "Winning in Saturated Markets — GreyRadius Insights",
    ogDescription: "Every percentage point of market share in a saturated market is taken from someone else. The playbooks that worked in an expanding market stop working. The companies that keep winning do something fundamentally different.",
  },

  // ─── Legal ────────────────────────────────────────────────────────────────────
  {
    file: "legal/privacy.html",
    ogTitle: "Privacy Policy — GreyRadius Consulting",
    ogDescription: "Privacy Policy for GreyRadius Consulting. How we collect, use, and protect your personal data.",
  },
  {
    file: "legal/terms.html",
    ogTitle: "Terms of Use — GreyRadius Consulting",
    ogDescription: "Terms of Use for greyradius.com and GreyRadius Consulting services.",
  },

  // ─── OG Preview ───────────────────────────────────────────────────────────────
  {
    file: "og-preview.html",
    ogTitle: "OG Preview — GreyRadius Social Card Inspector",
    ogDescription: "Social card preview page for GreyRadius Consulting — inspect og:title, og:description, and og:image tags across all pages.",
  },
];

function buildTitleTag(title: string): string {
  return `  <meta property="og:title" content="${title}">`;
}

function buildDescTag(desc: string): string {
  return `  <meta property="og:description" content="${desc}">`;
}

assertOgCoverage({ metaPages: new Set(pages.map((p) => p.file)) });

let added = 0;
let replaced = 0;
let skipped = 0;

for (const { file, ogTitle, ogDescription } of pages) {
  const path = resolve(ROOT, file);
  let html = readFileSync(path, "utf-8");

  const hasTitle = html.includes('property="og:title"');
  const hasDesc = html.includes('property="og:description"');

  const existingTitle = html.match(/property="og:title" content="([^"]+)"/)?.[1];
  const existingDesc = html.match(/property="og:description" content="([^"]+)"/)?.[1];

  if (existingTitle === ogTitle && existingDesc === ogDescription) {
    console.log(`  SKIP (already correct): ${file}`);
    skipped++;
    continue;
  }

  if (hasTitle) {
    html = html.replace(
      /<meta property="og:title"[^>]*>/,
      buildTitleTag(ogTitle).trim()
    );
    replaced++;
  }

  if (hasDesc) {
    html = html.replace(
      /<meta property="og:description"[^>]*>/,
      buildDescTag(ogDescription).trim()
    );
    if (!hasTitle) replaced++;
  }

  if (!hasTitle && !hasDesc) {
    const block = `${buildTitleTag(ogTitle)}\n${buildDescTag(ogDescription)}`;
    html = html.replace("</head>", `${block}\n</head>`);
    added++;
  } else if (!hasTitle) {
    html = html.replace(
      /<meta property="og:description"[^>]*>/,
      `${buildDescTag(ogDescription).trim()}\n  ${buildTitleTag(ogTitle).trim()}`
    );
  } else if (!hasDesc) {
    html = html.replace(
      /<meta property="og:title"[^>]*>/,
      `${buildTitleTag(ogTitle).trim()}\n  ${buildDescTag(ogDescription).trim()}`
    );
  }

  writeFileSync(path, html, "utf-8");
  console.log(`  ✓ ${file}`);
}

console.log(`\nDone. Added both: ${added}, Updated/replaced: ${replaced}, Skipped: ${skipped}`);
