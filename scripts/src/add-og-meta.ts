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
  // ─── Auto-generated coverage entries (fix-og-coverage.ts) ─────────────────────
  {
    file: "business-setup-consultants-uae.html",
    ogTitle: "Business Setup Consultants in UAE | GreyRadius",
    ogDescription: "UAE business setup guided by market entry strategy: entity choice, licensing, free zone vs mainland, partner identification and first-customer acquisition run end to end.",
  },
  {
    file: "industries/agritech/africa-agritech-market-entry.html",
    ogTitle: "Africa Agritech Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps agritech companies entering Africa with market entry strategy, farmer demand validation, distribution partner identification, and fundraising across Nigeria, Kenya, Ethiopia, and Ghana.",
  },
  {
    file: "industries/agritech/agritech-southeast-asia.html",
    ogTitle: "Agritech Southeast Asia Market Entry | GreyRadius Consulting",
    ogDescription: "GreyRadius helps agritech companies entering Southeast Asia with market entry strategy, farmer demand validation, distribution partner identification, and fundraising.",
  },
  {
    file: "industries/agritech/ethiopia-market-entry.html",
    ogTitle: "Ethiopia Market Entry Strategy & Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Ethiopia with market entry strategy, regulatory mapping, GTM execution, and partner identification across FMCG, manufacturing, agritech, and financial services.",
  },
  {
    file: "industries/agritech/gulf-agritech-entry.html",
    ogTitle: "Gulf Agritech &amp; Food Security Technology Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps companies with agritech market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/agritech/gulf-food-security.html",
    ogTitle: "Gulf Food Security &amp; Agricultural Technology Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps food security technology companies, precision agriculture businesses, and food system innovators enter Gulf markets with market entry strategy, government programme identification, and partner identification.",
  },
  {
    file: "industries/agritech/india-agritech-deep-dive.html",
    ogTitle: "India Agritech Deep Dive Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps agritech companies enter India with deep market entry strategy, PM-KUSUM and Agri Stack access, state government programme mapping, farmer demand validation, and fundraising.",
  },
  {
    file: "industries/agritech/india-agritech-entry.html",
    ogTitle: "India Agritech Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with agritech market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/agritech/rwanda-market-entry.html",
    ogTitle: "Rwanda Market Entry Strategy & Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Rwanda with market entry strategy, regulatory mapping, GTM execution, and partner identification across technology, FMCG, financial services, and agritech.",
  },
  {
    file: "industries/agritech/tanzania-market-entry.html",
    ogTitle: "Tanzania Market Entry Strategy & Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Tanzania with market entry strategy, regulatory mapping, GTM execution, and partner identification across FMCG, agritech, mining, and financial services.",
  },
  {
    file: "industries/agritech/vertical-farming.html",
    ogTitle: "Vertical Farming &amp; Indoor Agriculture Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps vertical farming companies, indoor agriculture businesses, and controlled environment agriculture providers with market entry strategy, feasibility studies, and fundraising.",
  },
  {
    file: "industries/ai-ml-platforms/ai-agents-market-entry.html",
    ogTitle: "AI Agents Market Entry Strategy | Agentic AI Consulting | GreyRadius",
    ogDescription: "GreyRadius helps AI agent companies, agentic AI platform providers, and autonomous AI solution developers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/ai-ml-platforms/digital-twin.html",
    ogTitle: "Digital Twin Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps digital twin platform companies, simulation technology providers, and industrial AI companies with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/ai-ml-platforms/generative-ai-market-entry.html",
    ogTitle: "Generative AI Market Entry Strategy | Business Consulting | GreyRadius",
    ogDescription: "GreyRadius helps generative AI companies, LLM platform providers, and AI product startups with market entry strategy, GTM execution, feasibility studies, and fundraising – grounded in enterprise buyer primary research.",
  },
  {
    file: "industries/ai-ml-platforms/gulf-ai-platform-enterprise.html",
    ogTitle: "Gulf Enterprise Ai Platform Market Entry Strategy| GreyRadius",
    ogDescription: "GreyRadius helps companies with ai ml platforms market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/ai-ml-platforms/india-ai-platform-enterprise.html",
    ogTitle: "India Enterprise Ai Platform Market Entry Strategy| GreyRadius",
    ogDescription: "GreyRadius helps companies with ai ml platforms market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/ai-ml-platforms/quantum-computing-market-entry.html",
    ogTitle: "Quantum Computing Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps quantum computing companies, quantum software developers, and quantum technology providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/beauty-personal-care/africa-beauty-market-entry.html",
    ogTitle: "Africa Beauty &amp; Personal Care Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps international beauty and personal care companies enter Africa with market entry strategy, NAFDAC and SAHPRA regulatory mapping, modern trade distribution, and consumer demand validation.",
  },
  {
    file: "industries/beauty-personal-care/beauty-personal-care-gcc.html",
    ogTitle: "Beauty and personal care consulting GCC | Market entry | GreyRadius",
    ogDescription: "GreyRadius advises beauty brands on GCC entry - Saudi and UAE market sizing, halal and fragrance-led positioning, distributor vs direct channel design, SFDA compliance and launch execution.",
  },
  {
    file: "industries/beauty-personal-care/beauty-personal-care-india.html",
    ogTitle: "Beauty and personal care consulting India | Brand entry strategy | GreyRadius",
    ogDescription: "GreyRadius advises beauty and personal care brands on India - market sizing, channel strategy across e-commerce and offline, regulatory pathway, manufacturing and market entry execution.",
  },
  {
    file: "industries/beauty-personal-care/beauty-personal-care-southeast-asia.html",
    ogTitle: "Beauty and personal care consulting Southeast Asia | Entry strategy | GreyRadius",
    ogDescription: "GreyRadius advises beauty brands on Southeast Asia - country prioritisation, TikTok-led social commerce strategy, halal positioning for Indonesia and Malaysia, and market entry execution.",
  },
  {
    file: "industries/beauty-personal-care/halal-cosmetics.html",
    ogTitle: "Halal Beauty &amp; Cosmetics Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps halal cosmetics brands, halal personal care companies, and certified beauty businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/bfsi/capital-markets.html",
    ogTitle: "Capital Markets Consulting | Market Entry &amp; GTM | GreyRadius",
    ogDescription: "GreyRadius helps capital markets technology companies, securities trading platforms, and investment banking technology businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/bfsi/embedded-finance.html",
    ogTitle: "Embedded Finance &amp; Banking-as-a-Service Consulting | GreyRadius",
    ogDescription: "GreyRadius helps embedded finance companies, BaaS providers, and financial API businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/bfsi/fintech-payments.html",
    ogTitle: "Fintech &amp; Payments Consulting | Market Entry, GTM &amp; Feasibility | GreyRadius",
    ogDescription: "GreyRadius helps fintech companies, payments platforms, and digital banking ventures with market entry strategy, GTM execution, feasibility studies, and fundraising – grounded in primary research.",
  },
  {
    file: "industries/bfsi/india-bfsi-digital-transformation.html",
    ogTitle: "India Bfsi Digital Transformation Technology Market Entry| GreyRadius",
    ogDescription: "GreyRadius helps companies with bfsi market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/bfsi/india-gulf-financial-services.html",
    ogTitle: "India &amp; Gulf Financial Services Combined Entry | GreyRadius",
    ogDescription: "GreyRadius helps financial services companies develop combined India and Gulf market entry strategies, identifying synergies between two of the world&#x27;s most significant emerging market financial services opportunities.",
  },
  {
    file: "industries/bfsi/insurtech.html",
    ogTitle: "Insurtech &amp; Insurance Market Entry | GTM &amp; Feasibility | GreyRadius",
    ogDescription: "GreyRadius helps insurtech companies, digital insurance platforms, and takaful providers with market entry strategy, GTM execution, regulatory pathway mapping, and fundraising.",
  },
  {
    file: "industries/bfsi/wealthtech.html",
    ogTitle: "Wealthtech &amp; Wealth Management Consulting | Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps wealthtech companies, digital wealth platforms, and private banking technology businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/carbon-markets/africa-carbon-markets-entry.html",
    ogTitle: "Africa Carbon Markets &amp; Climate Finance Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps carbon market companies enter Africa with voluntary project origination strategy, article 6 bilateral agreement advisory, AfDB climate finance access, and GTM planning.",
  },
  {
    file: "industries/carbon-markets/africa-climate-tech.html",
    ogTitle: "Africa Climate Technology Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps climate technology companies enter Africa with market entry strategy, carbon credit programme access, government climate finance identification, and partner identification.",
  },
  {
    file: "industries/carbon-markets/carbon-capture.html",
    ogTitle: "Carbon Capture &amp; Storage Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps carbon capture companies, CCS project developers, and CCUS technology businesses with market entry strategy, feasibility studies, and fundraising.",
  },
  {
    file: "industries/carbon-markets/carbon-credits-market-entry.html",
    ogTitle: "Carbon Credits &amp; Carbon Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps carbon credit developers, voluntary carbon market participants, and carbon technology companies with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/carbon-markets/circular-economy.html",
    ogTitle: "Circular Economy &amp; Waste Technology Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps circular economy companies, waste technology providers, and recycling businesses with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/carbon-markets/climate-fintech.html",
    ogTitle: "Climate Fintech &amp; Green Finance Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps climate fintech companies, green finance platforms, and sustainable investment businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/carbon-markets/esg-reporting.html",
    ogTitle: "ESG Reporting &amp; Sustainability Consulting | Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps ESG software companies, sustainability consulting firms, and green finance advisors with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/carbon-markets/gulf-carbon-markets-entry.html",
    ogTitle: "Gulf Carbon Markets &amp; Climate Finance Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps carbon market and climate finance companies enter Gulf markets with CBUAE green finance advisory, Saudi Net Zero programme access, and climate tech GTM strategy.",
  },
  {
    file: "industries/carbon-markets/gulf-sustainability-financing.html",
    ogTitle: "Gulf Sustainability Financing &amp; Green Finance Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps green finance companies, sustainability financing platforms, and ESG capital markets businesses enter Gulf markets with market entry strategy, regulatory mapping, and partner identification.",
  },
  {
    file: "industries/carbon-markets/india-carbon-markets-deep-dive.html",
    ogTitle: "India Carbon Markets Deep Dive | GreyRadius Consulting",
    ogDescription: "GreyRadius helps carbon market companies, ESG platforms, and climate finance businesses access India's carbon credit infrastructure with deep market entry strategy, BEE programme access, and BRSR compliance mapping.",
  },
  {
    file: "industries/carbon-markets/india-carbon-markets-entry.html",
    ogTitle: "India Carbon Markets And Climate Tech Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with carbon markets market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/carbon-markets/india-climate-tech.html",
    ogTitle: "India Climate Tech &amp; Carbon Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps climate technology companies enter India with market entry strategy, carbon credit market access, BRSR compliance opportunity, government programme identification, and fundraising.",
  },
  {
    file: "industries/carbon-markets/southeast-asia-carbon-markets-entry.html",
    ogTitle: "Southeast Asia carbon markets and voluntary carbon credit market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with carbon markets market entry – regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/carbon-markets/southeast-asia-climate-tech.html",
    ogTitle: "Southeast Asia Climate Technology Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps climate technology companies enter Southeast Asia with market entry strategy, carbon credit programme access, government climate finance identification, and partner identification across Indonesia, Vietnam, and Thailand.",
  },
  {
    file: "industries/corporate-learning/africa-corporate-learning.html",
    ogTitle: "Africa Corporate Learning &amp; L&amp;D Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps corporate learning and L&amp;D companies enter Africa with enterprise buyer research, government skills programme access, mobile-first content strategy, and GTM planning across Nigeria, South Africa, and Kenya.",
  },
  {
    file: "industries/corporate-learning/edtech-upskilling.html",
    ogTitle: "Adult Upskilling &amp; Professional Learning Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps adult upskilling platforms, professional certification companies, and workforce reskilling businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/corporate-learning/gulf-corporate-learning.html",
    ogTitle: "Gulf Corporate Learning &amp; L&amp;D Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps corporate learning and L&amp;D companies enter Gulf markets with Saudisation workforce development access, enterprise buyer research, government programme identification, and GTM strategy.",
  },
  {
    file: "industries/corporate-learning/india-corporate-learning.html",
    ogTitle: "India Corporate Learning &amp; L&amp;D Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps corporate learning and L&amp;D companies enter India with enterprise buyer research, NSDC partnership access, vernacular content strategy, and GTM planning.",
  },
  {
    file: "industries/corporate-learning/southeast-asia-corporate-learning.html",
    ogTitle: "Southeast Asia Corporate Learning Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps corporate learning companies enter Southeast Asia with Singapore SkillsFuture SSG mapping, Indonesia Kartu Prakerja advisory, Malaysia HRDF PSMB accreditation, and GTM strategy.",
  },
  {
    file: "industries/cpg-fmcg-retail/africa-fmcg-distribution.html",
    ogTitle: "Africa FMCG Distribution Strategy for International Brands | GreyRadius",
    ogDescription: "GreyRadius builds Africa FMCG distribution strategy for international consumer brands across Nigeria, Kenya, and South Africa – covering informal trade, modern trade, and mobile commerce distribution.",
  },
  {
    file: "industries/cpg-fmcg-retail/africa-fmcg-market-entry.html",
    ogTitle: "Africa FMCG Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps international FMCG brands enter Africa with market entry strategy, consumer research, distributor identification, and regulatory mapping across Nigeria, Kenya, Ghana, and South Africa.",
  },
  {
    file: "industries/cpg-fmcg-retail/beauty-personal-care.html",
    ogTitle: "Beauty &amp; Personal Care Consulting | Market Entry &amp; GTM | GreyRadius",
    ogDescription: "GreyRadius helps beauty brands, personal care companies, and cosmetics manufacturers with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/cpg-fmcg-retail/cambodia-market-entry.html",
    ogTitle: "Cambodia Market Entry Strategy & Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Cambodia with market entry strategy, regulatory mapping, GTM execution, and partner identification across FMCG, manufacturing, technology, and tourism.",
  },
  {
    file: "industries/cpg-fmcg-retail/colombia-market-entry.html",
    ogTitle: "Colombia Market Entry Strategy & Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Colombia with market entry strategy, INVIMA regulatory mapping, GTM execution, and partner identification across FMCG, technology, financial services, and manufacturing.",
  },
  {
    file: "industries/cpg-fmcg-retail/direct-to-consumer.html",
    ogTitle: "Direct-to-Consumer Brand Consulting | Market Entry &amp; GTM | GreyRadius",
    ogDescription: "GreyRadius helps DTC brands, D2C e-commerce businesses, and direct consumer companies with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/cpg-fmcg-retail/egypt-market-entry.html",
    ogTitle: "Egypt Market Entry Strategy & Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Egypt with market entry strategy, regulatory mapping, GTM execution, and partner identification across FMCG, technology, financial services, and manufacturing.",
  },
  {
    file: "industries/cpg-fmcg-retail/food-beverage.html",
    ogTitle: "Food &amp; Beverage Market Entry Consulting | GreyRadius",
    ogDescription: "GreyRadius helps food and beverage brands, F&amp;B manufacturers, and restaurant chains with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/cpg-fmcg-retail/franchise-market-entry.html",
    ogTitle: "Franchise Market Entry &amp; Expansion Consulting | GreyRadius",
    ogDescription: "GreyRadius helps franchise companies, master franchise operators, and franchise technology businesses with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/cpg-fmcg-retail/gulf-fmcg-market-entry.html",
    ogTitle: "Gulf FMCG &amp; Consumer Goods Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps international FMCG brands and consumer goods companies enter Gulf markets with market entry strategy, distributor identification, GTM execution, and fundraising.",
  },
  {
    file: "industries/cpg-fmcg-retail/gulf-retail-market-entry.html",
    ogTitle: "Gulf Retail Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps international retail brands and retail technology companies enter Gulf markets with market entry strategy, distributor identification, regulatory mapping, and GTM execution.",
  },
  {
    file: "industries/cpg-fmcg-retail/halal-food.html",
    ogTitle: "Halal Food &amp; Beverage Consulting | Market Entry, GTM &amp; Feasibility | GreyRadius",
    ogDescription: "GreyRadius helps halal food companies, FMCG brands, and food manufacturers with halal market entry strategy, GTM execution, feasibility studies, and fundraising – grounded in primary consumer research.",
  },
  {
    file: "industries/cpg-fmcg-retail/health-supplements.html",
    ogTitle: "Health Supplements &amp; Nutraceuticals Consulting | Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps health supplement brands, nutraceutical companies, and functional food businesses with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/cpg-fmcg-retail/india-d2c-market-entry.html",
    ogTitle: "India D2C Brand Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international D2C brands enter India with market entry strategy, social commerce GTM, regulatory mapping, and fundraising support.",
  },
  {
    file: "industries/cpg-fmcg-retail/india-fmcg-distribution.html",
    ogTitle: "India FMCG Distribution Strategy for International Brands | GreyRadius",
    ogDescription: "GreyRadius builds India FMCG distribution strategy for international consumer brands – covering modern trade, general trade, e-commerce, and quick commerce distribution with primary research from distributors and retailers.",
  },
  {
    file: "industries/cpg-fmcg-retail/india-gulf-fmcg-combined.html",
    ogTitle: "India &amp; Gulf FMCG Combined Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps FMCG companies develop combined India and Gulf market entry strategies, identifying synergies between the two most commercially significant emerging market FMCG opportunities.",
  },
  {
    file: "industries/cpg-fmcg-retail/india-gulf-india-combined.html",
    ogTitle: "India Market Re-Entry &amp; Growth Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international companies that have previously entered India revisit and accelerate their India market strategy with demand re-assessment, channel optimisation, and growth acceleration support.",
  },
  {
    file: "industries/cpg-fmcg-retail/indonesia-market-entry.html",
    ogTitle: "Indonesia Market Entry Strategy &amp; Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Indonesia with market entry strategy, BPOM regulatory mapping, GTM execution, and partner identification across FMCG, technology, financial services, and manufacturing.",
  },
  {
    file: "industries/cpg-fmcg-retail/luxury-goods.html",
    ogTitle: "Luxury Goods Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps luxury brands, premium goods companies, and high-end retail businesses with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/cpg-fmcg-retail/malaysia-market-entry.html",
    ogTitle: "Malaysia Market Entry Strategy & Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Malaysia with market entry strategy, JAKIM halal and regulatory mapping, GTM execution, and partner identification across FMCG, technology, financial services, and manufacturing.",
  },
  {
    file: "industries/cpg-fmcg-retail/modest-fashion.html",
    ogTitle: "Modest Fashion Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps modest fashion brands, Islamic clothing companies, and Muslim apparel businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/cpg-fmcg-retail/morocco-market-entry.html",
    ogTitle: "Morocco Market Entry Strategy & Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Morocco with market entry strategy, regulatory mapping, GTM execution, and partner identification across FMCG, manufacturing, technology, and financial services.",
  },
  {
    file: "industries/cpg-fmcg-retail/myanmar-market-entry.html",
    ogTitle: "Myanmar Market Entry Strategy & Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies assess Myanmar market entry risk and opportunity with market assessment, regulatory mapping, and partner identification for FMCG, manufacturing, and financial services.",
  },
  {
    file: "industries/cpg-fmcg-retail/nigeria-market-entry.html",
    ogTitle: "Nigeria Market Entry Strategy &amp; Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Nigeria with market entry strategy, NAFDAC regulatory mapping, GTM execution, and partner identification across FMCG, technology, financial services, and healthcare.",
  },
  {
    file: "industries/cpg-fmcg-retail/pakistan-market-entry.html",
    ogTitle: "Pakistan Market Entry Strategy & Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Pakistan with market entry strategy, DRAP regulatory mapping, GTM execution, and partner identification across FMCG, technology, and financial services.",
  },
  {
    file: "industries/cpg-fmcg-retail/pet-economy.html",
    ogTitle: "Pet Economy &amp; Pet Care Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps pet food brands, pet care companies, and pet tech businesses with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/cpg-fmcg-retail/philippines-market-entry.html",
    ogTitle: "Philippines Market Entry Strategy & Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter the Philippines with market entry strategy, FDA regulatory mapping, GTM execution, and partner identification across FMCG, technology, financial services, and BPO.",
  },
  {
    file: "industries/cpg-fmcg-retail/south-africa-market-entry.html",
    ogTitle: "South Africa Market Entry Strategy & Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter South Africa with market entry strategy, regulatory mapping, GTM execution, and partner identification across FMCG, technology, financial services, and manufacturing.",
  },
  {
    file: "industries/cpg-fmcg-retail/southeast-asia-fmcg-entry.html",
    ogTitle: "Southeast Asia FMCG Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps FMCG brands and consumer goods companies enter Southeast Asian markets with market entry strategy, distributor identification, GTM execution, and fundraising.",
  },
  {
    file: "industries/cpg-fmcg-retail/southeast-asia-retail-market-entry.html",
    ogTitle: "Southeast Asia Retail Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps retail brands and retail technology companies enter Southeast Asia with market entry strategy, consumer research, platform identification, and distributor identification.",
  },
  {
    file: "industries/cpg-fmcg-retail/uzbekistan-market-entry.html",
    ogTitle: "Uzbekistan Market Entry Strategy & Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Uzbekistan with market entry strategy, regulatory mapping, GTM execution, and partner identification across FMCG, manufacturing, technology, and financial services.",
  },
  {
    file: "industries/cybersecurity/africa-cybersecurity-market-entry.html",
    ogTitle: "Africa Cybersecurity Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps cybersecurity companies enter Africa with market entry strategy, regulatory mapping, enterprise buyer identification, and partner identification across Nigeria, Kenya, South Africa, and Egypt.",
  },
  {
    file: "industries/cybersecurity/cybersecurity-gcc.html",
    ogTitle: "Cybersecurity market consulting GCC | Saudi and UAE entry | GreyRadius",
    ogDescription: "GreyRadius advises cybersecurity vendors on GCC market entry - NCA and UAE compliance-driven demand, sovereign requirements, local partner strategy, licensing and GTM execution.",
  },
  {
    file: "industries/cybersecurity/cybersecurity-services-india.html",
    ogTitle: "Cybersecurity market consulting India | Entry and GTM strategy | GreyRadius",
    ogDescription: "GreyRadius advises cybersecurity vendors and investors on India - market sizing, CERT-In and DPDP-driven demand, channel strategy, GCC delivery models and market entry execution.",
  },
  {
    file: "industries/cybersecurity/cybersecurity-southeast-asia.html",
    ogTitle: "Cybersecurity market consulting Southeast Asia | GTM strategy | GreyRadius",
    ogDescription: "GreyRadius advises cybersecurity vendors on Southeast Asia - country prioritisation, regulatory demand mapping across Singapore, Indonesia, Vietnam and Thailand, channel design and GTM execution.",
  },
  {
    file: "industries/data-centers/africa-data-centre.html",
    ogTitle: "Africa Data Centre Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps data centre operators enter Africa with market entry strategy, POPIA and NDPR data sovereignty mapping, power partner identification, and enterprise demand validation.",
  },
  {
    file: "industries/data-centers/data-centers-gcc.html",
    ogTitle: "Data centre consulting GCC | AI infrastructure strategy | GreyRadius",
    ogDescription: "GreyRadius advises data centre operators, investors and suppliers on the GCC - Saudi and UAE AI infrastructure demand, sovereign partnerships, power and cooling feasibility, and market entry.",
  },
  {
    file: "industries/data-centers/data-centers-india.html",
    ogTitle: "Data centre consulting India | Feasibility and market entry | GreyRadius",
    ogDescription: "GreyRadius advises data centre operators, investors and suppliers on India - capacity feasibility, land and power strategy, state incentives, AI-ready design economics and market entry execution.",
  },
  {
    file: "industries/data-centers/data-centers-southeast-asia.html",
    ogTitle: "Data centre consulting Southeast Asia | Market entry and TEV | GreyRadius",
    ogDescription: "GreyRadius advises data centre operators, investors and suppliers on Southeast Asia - Johor, Batam and Vietnam siting feasibility, Singapore constraints, hyperscaler demand and market entry.",
  },
  {
    file: "industries/data-centers/hyperscale-data-center.html",
    ogTitle: "Hyperscale Data Center Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps hyperscale data center developers, cloud campus operators, and digital infrastructure companies with market entry strategy, site feasibility, and fundraising.",
  },
  {
    file: "industries/defence-aerospace/defence-aerospace-gcc.html",
    ogTitle: "Defence and aerospace consulting GCC | Localisation strategy | GreyRadius",
    ogDescription: "GreyRadius advises defence and aerospace firms on GCC market entry - Saudi Vision 2030 localisation, UAE Edge ecosystem partnerships, offset programmes and industrial participation strategy.",
  },
  {
    file: "industries/defence-aerospace/defence-manufacturing-india.html",
    ogTitle: "Defence manufacturing consulting India | Market entry and TEV | GreyRadius",
    ogDescription: "GreyRadius helps defence and aerospace firms enter India&#39;s defence manufacturing market - opportunity assessment, TEV studies, offset strategy, JV partner screening and GTM execution.",
  },
  {
    file: "industries/defence-aerospace/mro-aerospace-southeast-asia.html",
    ogTitle: "Aerospace MRO consulting Southeast Asia | Market entry | GreyRadius",
    ogDescription: "GreyRadius helps MRO providers, lessors and component firms enter Southeast Asia&#39;s aerospace maintenance market - Singapore hub strategy, capacity feasibility, airline partnerships and GTM execution.",
  },
  {
    file: "industries/diagnostics/africa-diagnostics-pathology-entry.html",
    ogTitle: "Africa diagnostics and pathology technology market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with diagnostics market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/diagnostics/digital-diagnostics.html",
    ogTitle: "Digital Diagnostics &amp; AI Pathology Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps digital diagnostics companies, AI pathology platforms, and medical imaging AI providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/diagnostics/gulf-diagnostics-pathology-entry.html",
    ogTitle: "Gulf diagnostics and pathology technology market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with diagnostics market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/diagnostics/india-diagnostics-pathology-entry.html",
    ogTitle: "India Diagnostics And Pathology Technology Market Entry| GreyRadius",
    ogDescription: "GreyRadius helps companies with diagnostics market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/diagnostics/medtech-diagnostics-ai.html",
    ogTitle: "AI-Powered Diagnostics &amp; Pathology Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps AI diagnostics companies, computational pathology businesses, and medical AI platform providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/diagnostics/southeast-asia-diagnostics-entry.html",
    ogTitle: "Southeast Asia diagnostics and medical technology market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with diagnostics market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/drones/africa-drones-technology-entry.html",
    ogTitle: "Africa drone and UAV technology market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with drones market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/drones/agricultural-drones.html",
    ogTitle: "Agricultural Drone Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps agricultural drone companies, precision farming UAV businesses, and agri-drone service providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/drones/commercial-drone-market-entry.html",
    ogTitle: "Commercial Drone Market Entry Strategy | UAV Consulting | GreyRadius",
    ogDescription: "GreyRadius helps commercial drone companies, UAV manufacturers, and drone service providers with market entry strategy, GTM execution, regulatory pathway mapping, and fundraising.",
  },
  {
    file: "industries/drones/gulf-drones-technology-entry.html",
    ogTitle: "Gulf drone and UAV technology market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with drones market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/drones/india-drones-technology-entry.html",
    ogTitle: "India Drone Technology Market Entry Strategy| GreyRadius",
    ogDescription: "GreyRadius helps companies with drones market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/drones/southeast-asia-drones-technology-entry.html",
    ogTitle: "Southeast Asia drone and UAV technology market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with drones market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/ecommerce-tech/b2b-marketplace.html",
    ogTitle: "B2B Marketplace Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps B2B marketplace companies, procurement platform businesses, and trade marketplace operators with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/ecommerce-tech/cross-border-ecommerce.html",
    ogTitle: "Cross-Border E-Commerce Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps cross-border e-commerce companies, international marketplace businesses, and e-commerce logistics providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/ecommerce-tech/gulf-ecommerce-tech-entry.html",
    ogTitle: "Gulf Ecommerce Technology Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with ecommerce tech market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/ecommerce-tech/india-b2b-marketplace.html",
    ogTitle: "India B2B Marketplace &amp; Industrial E-Commerce | GreyRadius",
    ogDescription: "GreyRadius helps B2B marketplace companies and industrial e-commerce businesses enter India with market entry strategy, supplier demand validation, enterprise buyer research, and fundraising support.",
  },
  {
    file: "industries/ecommerce-tech/india-ecommerce-market-entry.html",
    ogTitle: "India E-Commerce Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international e-commerce businesses enter India with market entry strategy, platform selection, regulatory mapping, logistics partner identification, and fundraising.",
  },
  {
    file: "industries/ecommerce-tech/india-ecommerce-tech-entry.html",
    ogTitle: "India Ecommerce Technology Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with ecommerce tech market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/ecommerce-tech/social-commerce.html",
    ogTitle: "Social Commerce Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps social commerce platforms, live shopping companies, and social selling technology providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/ecommerce-tech/southeast-asia-ecommerce-entry.html",
    ogTitle: "Southeast Asia E-Commerce Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps e-commerce companies enter Southeast Asia with market entry strategy, platform identification, logistics partner selection, and regulatory mapping across Indonesia, Vietnam, and Thailand.",
  },
  {
    file: "industries/education-and-edtech.html",
    ogTitle: "Education &amp; EdTech Consulting | Market Entry, GTM and B2G | GreyRadius",
    ogDescription: "Education and edtech consulting across India, the Gulf and Southeast Asia - market entry, GTM strategy, school-level field research, government education programmes and enrollment growth.",
  },
  {
    file: "industries/education-edtech/africa-edtech-market-entry.html",
    ogTitle: "Africa EdTech Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps EdTech companies enter Africa with market entry strategy, Ministry of Education programme access, school system GTM, regulatory mapping, and fundraising across Nigeria, Kenya, and South Africa.",
  },
  {
    file: "industries/education-edtech/africa-edtech-platform-entry.html",
    ogTitle: "Africa edtech and digital learning platform market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with education edtech market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/education-edtech/corporate-learning.html",
    ogTitle: "Corporate Learning &amp; L&amp;D Consulting | Market Entry &amp; GTM | GreyRadius",
    ogDescription: "GreyRadius helps corporate learning platforms, L&amp;D technology companies, and workforce training providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/education-edtech/gulf-edtech-platform-entry.html",
    ogTitle: "Gulf edtech and digital learning platform market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with education edtech market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/education-edtech/gulf-education-market-entry.html",
    ogTitle: "Gulf Education Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international education companies enter Gulf markets with market entry strategy, MoE regulatory mapping, school and university GTM, and partner identification.",
  },
  {
    file: "industries/education-edtech/higher-education.html",
    ogTitle: "Higher Education Consulting | Market Entry &amp; GTM | GreyRadius",
    ogDescription: "GreyRadius helps higher education institutions, university technology platforms, and EdTech companies serving universities with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/education-edtech/india-edtech-market-entry.html",
    ogTitle: "India EdTech Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps international EdTech companies enter India with market entry strategy, school system GTM, regulatory mapping, and fundraising support.",
  },
  {
    file: "industries/education-edtech/india-edtech-platform-entry.html",
    ogTitle: "India Edtech Platform Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with education edtech market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/education-edtech/india-gulf-education-combined.html",
    ogTitle: "India &amp; Gulf Education Combined Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps education companies develop combined India and Gulf market entry strategies, identifying synergies between two of the world&#x27;s most significant emerging market education opportunities.",
  },
  {
    file: "industries/education-edtech/k12-edtech.html",
    ogTitle: "K-12 Edtech Consulting | Market Entry, GTM &amp; Feasibility | GreyRadius",
    ogDescription: "GreyRadius helps K-12 edtech companies and learning platform providers with market entry strategy, school acquisition GTM, feasibility studies, and fundraising.",
  },
  {
    file: "industries/education-edtech/southeast-asia-edtech-platform-entry.html",
    ogTitle: "Southeast Asia edtech and digital learning platform market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with education edtech market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/electric-vehicles/africa-electric-vehicle-entry.html",
    ogTitle: "Africa Electric Vehicle Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with electric vehicles market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/electric-vehicles/autonomous-vehicles.html",
    ogTitle: "Autonomous Vehicle Market Entry Strategy | AV Consulting | GreyRadius",
    ogDescription: "GreyRadius helps autonomous vehicle companies, self-driving technology providers, and robotaxi operators with market entry strategy, regulatory pathway mapping, GTM execution, and fundraising.",
  },
  {
    file: "industries/electric-vehicles/ev-battery-market-entry.html",
    ogTitle: "EV Battery Market Entry Strategy | Battery Consulting | GreyRadius",
    ogDescription: "GreyRadius helps EV battery manufacturers, cell suppliers, BMS companies, and battery materials firms with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/electric-vehicles/ev-two-three-wheeler.html",
    ogTitle: "EV Two &amp; Three Wheeler Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps electric scooter companies, e-rickshaw manufacturers, and two-wheeler EV businesses with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/electric-vehicles/evtol-urban-air-mobility.html",
    ogTitle: "eVTOL &amp; Urban Air Mobility Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps eVTOL manufacturers, vertiport operators, and UAM platform providers with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/electric-vehicles/gulf-smart-mobility.html",
    ogTitle: "Gulf Smart Mobility &amp; Urban Transport Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps smart mobility companies, autonomous vehicle technology businesses, and urban transport technology providers enter Gulf markets with market entry strategy, government programme identification, and partner identification.",
  },
  {
    file: "industries/electric-vehicles/india-electric-vehicle-entry.html",
    ogTitle: "India Electric Vehicle Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with electric vehicles market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/electric-vehicles/india-electric-vehicle-market.html",
    ogTitle: "India Electric Vehicle Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps EV technology companies, battery businesses, and electric mobility companies enter India with market entry strategy, FAME and PLI programme access, regulatory mapping, and partner identification.",
  },
  {
    file: "industries/electric-vehicles/india-mobility-market-entry.html",
    ogTitle: "India Mobility &amp; Transportation Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps mobility technology companies, ride-hailing businesses, and transportation technology providers enter India with market entry strategy, regulatory mapping, and partner identification.",
  },
  {
    file: "industries/electric-vehicles/telematics-fleet-tech.html",
    ogTitle: "Telematics &amp; Fleet Technology Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps telematics companies, fleet management technology businesses, and vehicle tracking providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/embedded-finance/bnpl-embedded-finance.html",
    ogTitle: "BNPL &amp; Embedded Finance Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps BNPL companies, embedded finance platforms, and lending technology providers with market entry strategy, GTM execution, regulatory mapping, and fundraising.",
  },
  {
    file: "industries/embedded-finance/gulf-embedded-finance.html",
    ogTitle: "Gulf Embedded Finance Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps embedded finance companies enter Gulf markets with CBUAE Open Finance mapping, DFSA regulatory pathway, bank partner identification, and GTM strategy.",
  },
  {
    file: "industries/embedded-finance/india-embedded-finance.html",
    ogTitle: "India Embedded Finance Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps embedded finance companies enter India with RBI regulatory mapping, Account Aggregator integration, bank partner identification, and GTM strategy.",
  },
  {
    file: "industries/energy-chemicals/biofuels-saf.html",
    ogTitle: "Sustainable Aviation Fuel &amp; Biofuels Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps sustainable aviation fuel producers, biofuel companies, and alternative fuel businesses with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/energy-chemicals/cleantech.html",
    ogTitle: "Cleantech Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps cleantech companies, green technology businesses, and environmental technology providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/energy-chemicals/energy-storage.html",
    ogTitle: "Energy Storage &amp; Battery System Consulting | Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps battery energy storage companies, BESS developers, and energy storage technology providers with market entry strategy, feasibility studies, GTM execution, and fundraising.",
  },
  {
    file: "industries/energy-chemicals/iran-market-entry-assessment.html",
    ogTitle: "Iran Market Entry Risk Assessment | GreyRadius Consulting",
    ogDescription: "GreyRadius helps companies assess Iran market entry risk with sanctions compliance mapping, political risk assessment, and strategic positioning for when market conditions change.",
  },
  {
    file: "industries/energy-chemicals/nuclear-smr.html",
    ogTitle: "Small Modular Reactor &amp; Nuclear Energy Consulting | GreyRadius",
    ogDescription: "GreyRadius helps nuclear energy companies, SMR developers, and advanced nuclear technology businesses with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/energy-chemicals/oil-gas.html",
    ogTitle: "Oil &amp; Gas Consulting | Market Entry, GTM &amp; Feasibility | GreyRadius",
    ogDescription: "GreyRadius helps oil and gas technology companies, energy service businesses, and oilfield services providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/energy-chemicals/oman-market-entry.html",
    ogTitle: "Oman Market Entry Strategy & Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Oman with market entry strategy, regulatory mapping, GTM execution, and partner identification across energy, manufacturing, logistics, tourism, and FMCG.",
  },
  {
    file: "industries/energy-chemicals/qatar-market-entry.html",
    ogTitle: "Qatar Market Entry Strategy & Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Qatar with market entry strategy, regulatory mapping, GTM execution, and partner identification across energy, technology, FMCG, and financial services.",
  },
  {
    file: "industries/energy-chemicals/renewable-energy.html",
    ogTitle: "Renewable Energy &amp; Solar Consulting | Market Entry &amp; Feasibility | GreyRadius",
    ogDescription: "GreyRadius helps solar developers, renewable energy companies, and clean energy technology providers with market entry strategy, feasibility studies, GTM execution, and fundraising.",
  },
  {
    file: "industries/energy-chemicals/smart-grids.html",
    ogTitle: "Smart Grid &amp; Utility Technology Consulting | Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps smart grid companies, utility technology providers, and energy management businesses with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/energy-chemicals/water-technology.html",
    ogTitle: "Water Technology Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps water technology companies, desalination businesses, and water treatment providers with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/energy-storage/africa-energy-storage-entry.html",
    ogTitle: "Africa energy storage and off-grid battery market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with energy storage market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/energy-storage/battery-as-a-service.html",
    ogTitle: "Battery-as-a-Service Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps Battery-as-a-Service companies, energy storage subscription businesses, and battery leasing operators with market entry strategy and fundraising.",
  },
  {
    file: "industries/energy-storage/battery-recycling.html",
    ogTitle: "Battery Recycling &amp; Second Life Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps battery recycling companies, second life battery businesses, and battery materials recovery firms with market entry strategy, feasibility studies, and fundraising.",
  },
  {
    file: "industries/energy-storage/gulf-energy-storage-entry.html",
    ogTitle: "Gulf energy storage and battery technology market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with energy storage market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/energy-storage/india-energy-storage-entry.html",
    ogTitle: "India Energy Storage Market Entry Strategy| GreyRadius",
    ogDescription: "GreyRadius helps companies with energy storage market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/energy-storage/india-renewable-energy-storage.html",
    ogTitle: "India Renewable Energy Storage Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps energy storage companies enter India with market entry strategy, PLI programme access, regulatory mapping, government programme identification, and partner identification.",
  },
  {
    file: "industries/energy-storage/southeast-asia-energy-storage-entry.html",
    ogTitle: "Southeast Asia energy storage and grid battery market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with energy storage market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/enterprise-saas/africa-b2b-saas-enterprise-entry.html",
    ogTitle: "Africa B2B SaaS enterprise market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with enterprise saas market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/enterprise-saas/b2b-saas-emerging-markets.html",
    ogTitle: "B2B SaaS for Emerging Markets – Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps B2B SaaS companies entering Southeast Asia, South Asia, and Gulf markets with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/enterprise-saas/govtech.html",
    ogTitle: "GovTech &amp; Government Technology Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps government technology companies, civic tech businesses, and public sector software providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/enterprise-saas/gulf-b2b-saas-enterprise-entry.html",
    ogTitle: "Gulf B2B SaaS Enterprise Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps international B2B SaaS companies enter Gulf markets with enterprise buyer mapping, NCA data residency advisory, SI partner identification, and Vision 2030 programme access.",
  },
  {
    file: "industries/enterprise-saas/gulf-b2b-services.html",
    ogTitle: "Gulf B2B Professional Services Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps international B2B professional services firms enter Gulf markets with market entry strategy, government programme mapping, regulatory requirements, and local partner identification.",
  },
  {
    file: "industries/enterprise-saas/india-b2b-saas-enterprise-gtm.html",
    ogTitle: "India B2B SaaS enterprise GTM and market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with enterprise saas market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/enterprise-saas/india-b2b-saas-pricing.html",
    ogTitle: "India B2B SaaS Pricing Strategy for International Software Companies | GreyRadius",
    ogDescription: "GreyRadius builds India B2B SaaS pricing strategy for international software companies – covering enterprise pricing, SME pricing, localisation, and competitive positioning through primary research with Indian enterprise buyers.",
  },
  {
    file: "industries/enterprise-saas/india-b2b-saas-vertical.html",
    ogTitle: "India Vertical SaaS Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps vertical SaaS companies enter India with market entry strategy, sector-specific enterprise buyer research, channel partner identification, and fundraising support.",
  },
  {
    file: "industries/enterprise-saas/india-saas-market-entry.html",
    ogTitle: "India SaaS Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps SaaS companies enter India with market entry strategy, pricing adaptation, enterprise buyer research, channel partner identification, and fundraising support.",
  },
  {
    file: "industries/enterprise-saas/legaltech.html",
    ogTitle: "LegalTech Market Entry Strategy | Legal Technology Consulting | GreyRadius",
    ogDescription: "GreyRadius helps legaltech companies, legal AI platforms, and law practice technology businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/enterprise-saas/southeast-asia-b2b-saas-enterprise.html",
    ogTitle: "Southeast Asia B2B SaaS enterprise market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with enterprise saas market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/enterprise-saas/southeast-asia-enterprise-saas.html",
    ogTitle: "Southeast Asia Enterprise SaaS Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps enterprise SaaS companies enter Southeast Asia with market entry strategy, pricing adaptation, enterprise buyer research, and channel partner identification across Singapore, Indonesia, and Vietnam.",
  },
  {
    file: "industries/fintech-payments/africa-agrifintech-market-entry.html",
    ogTitle: "Africa Agricultural Fintech Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps agricultural fintech companies enter Africa with market entry strategy, farmer financial demand validation, mobile money integration, and distribution partner identification.",
  },
  {
    file: "industries/fintech-payments/africa-digital-payments.html",
    ogTitle: "Africa Digital Payments Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps digital payment companies enter Africa with market entry strategy, central bank regulatory mapping, mobile money integration, merchant acquisition strategy, and partner identification.",
  },
  {
    file: "industries/fintech-payments/africa-fintech-market-entry.html",
    ogTitle: "Africa Fintech Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps fintech companies entering Africa with market entry strategy, regulatory mapping, mobile money integration, and partner identification across Nigeria, Kenya, Ghana, and South Africa.",
  },
  {
    file: "industries/fintech-payments/africa-fintech-mobile-money.html",
    ogTitle: "Africa Fintech &amp; Mobile Money Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps international fintech companies enter Africa with M-Pesa and MTN Mobile Money partnership mapping, CBN and CBK regulatory advisory, and GTM strategy across Nigeria, Kenya, and South Africa.",
  },
  {
    file: "industries/fintech-payments/africa-payment-infrastructure.html",
    ogTitle: "Africa Payment Infrastructure Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps payment infrastructure companies, switching technology businesses, and cross-border payment providers enter Africa with market entry strategy, central bank regulatory mapping, and partner identification.",
  },
  {
    file: "industries/fintech-payments/agrifintech.html",
    ogTitle: "Agricultural Fintech &amp; Farmer Finance Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps agricultural fintech companies, farmer finance platforms, and rural credit businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/fintech-payments/digital-payments-infrastructure.html",
    ogTitle: "Digital Payments Infrastructure Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps digital payments infrastructure companies, payment switch providers, and payment network businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/fintech-payments/ed-fintech.html",
    ogTitle: "Education Fintech &amp; Student Finance Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps education fintech companies, student loan platforms, and school fee financing businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/fintech-payments/ghana-market-entry.html",
    ogTitle: "Ghana Market Entry Strategy & Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Ghana with market entry strategy, FDA regulatory mapping, GTM execution, and partner identification across FMCG, fintech, technology, and manufacturing.",
  },
  {
    file: "industries/fintech-payments/gulf-fintech-market-entry.html",
    ogTitle: "Gulf Fintech Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps fintech companies enter Gulf markets with market entry strategy, CBUAE and SAMA regulatory mapping, GTM execution, and partner identification across payments, lending, and wealthtech.",
  },
  {
    file: "industries/fintech-payments/gulf-open-banking-fintech.html",
    ogTitle: "Gulf Open Banking &amp; Fintech Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps fintech companies enter Gulf markets with CBUAE Open Finance mapping, SAMA Open Banking Lab access, DFSA ITL licence pathway, and UAE bank API partner identification.",
  },
  {
    file: "industries/fintech-payments/india-fintech-b2b.html",
    ogTitle: "India B2B Fintech &amp; Treasury Technology Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps B2B fintech companies, treasury technology businesses, and enterprise financial software providers enter India with market entry strategy, RBI regulatory mapping, enterprise buyer research, and partner identification.",
  },
  {
    file: "industries/fintech-payments/india-fintech-infrastructure.html",
    ogTitle: "India Fintech Infrastructure Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps fintech infrastructure companies, payment technology businesses, and B2B financial services providers enter India with market entry strategy, RBI regulatory mapping, and partner identification.",
  },
  {
    file: "industries/fintech-payments/india-fintech-lending.html",
    ogTitle: "India Fintech Lending Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps fintech lending companies enter India with market entry strategy, RBI NBFC regulatory mapping, alternative credit scoring strategy, and distribution partner identification.",
  },
  {
    file: "industries/fintech-payments/india-fintech-market-entry.html",
    ogTitle: "India Fintech Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps international fintech companies enter India with market entry strategy, regulatory pathway mapping, GTM execution, and partner identification across UPI, lending, insurance, and wealth management.",
  },
  {
    file: "industries/fintech-payments/india-upi-fintech-market-entry.html",
    ogTitle: "India UPI &amp; Fintech Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international fintech companies enter India with RBI PA licence mapping, NPCI sponsor bank identification, co-lending partner search, and India unit economics modelling.",
  },
  {
    file: "industries/fintech-payments/india-wealth-management.html",
    ogTitle: "India Wealth Management &amp; Private Banking Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps wealth management companies, private banks, and investment platform businesses enter India with market entry strategy, SEBI regulatory mapping, HNI demand validation, and distribution partner identification.",
  },
  {
    file: "industries/fintech-payments/kenya-market-entry.html",
    ogTitle: "Kenya Market Entry Strategy &amp; Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Kenya with market entry strategy, regulatory mapping, GTM execution, and partner identification across fintech, FMCG, technology, healthcare, and agritech.",
  },
  {
    file: "industries/fintech-payments/neobank-market-entry.html",
    ogTitle: "Neobank Market Entry Strategy | Digital Banking Consulting | GreyRadius",
    ogDescription: "GreyRadius helps neobanks, digital banks, and challenger banks with market entry strategy, regulatory pathway mapping, GTM execution, and fundraising.",
  },
  {
    file: "industries/fintech-payments/open-banking.html",
    ogTitle: "Open Banking Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps open banking companies, API banking platforms, and financial data aggregators with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/fintech-payments/regtech.html",
    ogTitle: "RegTech Market Entry Strategy | Regulatory Technology Consulting | GreyRadius",
    ogDescription: "GreyRadius helps regtech companies, compliance technology providers, and regulatory automation businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/fintech-payments/remittance-cross-border.html",
    ogTitle: "Remittance &amp; Cross-Border Payments Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps remittance companies, cross-border payment platforms, and money transfer businesses with market entry strategy, GTM execution, regulatory mapping, and fundraising.",
  },
  {
    file: "industries/fintech-payments/senegal-market-entry.html",
    ogTitle: "Senegal Market Entry Strategy & Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Senegal with market entry strategy, regulatory mapping, GTM execution, and partner identification across FMCG, fintech, technology, and energy.",
  },
  {
    file: "industries/fintech-payments/southeast-asia-fintech-entry.html",
    ogTitle: "Southeast Asia Fintech Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps fintech companies enter Southeast Asia with market entry strategy, central bank regulatory mapping, mobile money integration, and partner identification across Indonesia, Vietnam, Philippines, and Thailand.",
  },
  {
    file: "industries/fintech-payments/southeast-asia-fintech-payments.html",
    ogTitle: "Southeast Asia fintech and payments market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with fintech payments market entry – regulatory mapping, partner identification, GTM strategy, and commercial execution.",
  },
  {
    file: "industries/food-beverage/africa-food-beverage.html",
    ogTitle: "Africa Food &amp; Beverage Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international food and beverage companies enter Africa with NAFDAC and KEBS regulatory mapping, modern trade distribution, and consumer demand validation across Nigeria, South Africa, and Kenya.",
  },
  {
    file: "industries/food-beverage/gulf-food-beverage-market-entry.html",
    ogTitle: "Gulf Food &amp; Beverage Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international food and beverage companies enter Gulf markets with market entry strategy, SFDA and ESMA regulatory mapping, halal certification, and retail distribution strategy.",
  },
  {
    file: "industries/food-beverage/india-food-beverage-market-entry.html",
    ogTitle: "India Food &amp; Beverage Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international food and beverage companies enter India with market entry strategy, FSSAI regulatory mapping, modern trade distribution, and consumer demand validation.",
  },
  {
    file: "industries/food-beverage/india-food-tech.html",
    ogTitle: "India Food Technology Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps food technology companies enter India with FSSAI novel food regulatory mapping, alternative protein demand research, B2B pilot partner identification, and GTM strategy.",
  },
  {
    file: "industries/food-beverage/plant-based-food.html",
    ogTitle: "Plant-Based Food Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps plant-based food brands, alternative protein companies, and vegan food businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/food-beverage/precision-fermentation.html",
    ogTitle: "Precision Fermentation Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps precision fermentation companies, alternative dairy businesses, and bio-based food ingredient producers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/food-beverage/southeast-asia-food-beverage.html",
    ogTitle: "Southeast Asia Food &amp; Beverage Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps international food and beverage companies enter Southeast Asia with Indonesia BPJPH halal certification, BPOM regulatory mapping, and modern trade distribution strategy.",
  },
  {
    file: "industries/foodtech/alternative-protein-southeast-asia.html",
    ogTitle: "Alternative protein consulting Southeast Asia | GreyRadius",
    ogDescription: "GreyRadius advises alternative protein companies and investors on Southeast Asia - Singapore&#39;s novel food regime, plant-based and cultivated markets, manufacturing strategy and market entry.",
  },
  {
    file: "industries/foodtech/foodtech-cloud-kitchens-india.html",
    ogTitle: "Foodtech consulting India | Cloud kitchens and food brands | GreyRadius",
    ogDescription: "GreyRadius advises food brands, cloud kitchen operators and investors on India - delivery platform economics, kitchen network feasibility, brand portfolio strategy and commercial diligence.",
  },
  {
    file: "industries/foodtech/foodtech-gcc.html",
    ogTitle: "Foodtech consulting GCC | F&amp;B brand and investor strategy | GreyRadius",
    ogDescription: "GreyRadius advises F&amp;B brands, cloud kitchen operators and investors on the GCC - delivery platform economics, franchise vs owned models, Saudi expansion and food security initiatives.",
  },
  {
    file: "industries/freight-cargo/gulf-freight-cargo.html",
    ogTitle: "Gulf Freight &amp; Cargo Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international freight and cargo companies enter Gulf markets with market entry strategy, GACA and customs regulatory mapping, logistics hub access, and GTM planning.",
  },
  {
    file: "industries/freight-cargo/india-freight-cargo.html",
    ogTitle: "India Freight &amp; Cargo Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international freight and cargo companies enter India with market entry strategy, DPIIT and customs regulatory mapping, logistics partner identification, and GTM planning.",
  },
  {
    file: "industries/freight-cargo/port-logistics-parks.html",
    ogTitle: "Logistics Parks &amp; Industrial Real Estate Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps logistics park developers, industrial real estate companies, and warehousing businesses with market entry strategy, feasibility studies, and fundraising.",
  },
  {
    file: "industries/freight-cargo/port-maritime.html",
    ogTitle: "Port &amp; Maritime Logistics Consulting | Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps port operators, maritime logistics companies, and shipping technology businesses with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/gaming-esports/gaming-esports-gcc.html",
    ogTitle: "Gaming and esports consulting GCC | Saudi strategy | GreyRadius",
    ogDescription: "GreyRadius advises gaming companies and investors on the GCC - Saudi gaming strategy and Savvy ecosystem, UAE hub setup, esports economics, sovereign partnerships and market entry.",
  },
  {
    file: "industries/gaming-esports/gaming-esports-india.html",
    ogTitle: "Gaming market consulting India | Entry and growth strategy | GreyRadius",
    ogDescription: "GreyRadius advises gaming publishers, platforms and investors on India - market sizing, monetisation reality, RMG regulation, publishing partnerships and market entry execution.",
  },
  {
    file: "industries/gaming-esports/gaming-southeast-asia.html",
    ogTitle: "Gaming market consulting Southeast Asia | Publisher strategy | GreyRadius",
    ogDescription: "GreyRadius advises game publishers, platforms and investors on Southeast Asia - country prioritisation, monetisation benchmarks, local publishing partnerships and market entry execution.",
  },
  {
    file: "industries/gaming/africa-gaming.html",
    ogTitle: "Africa Gaming Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps gaming companies enter Africa with market entry strategy, Nigeria NLRC and South Africa NGB regulatory mapping, mobile money payment integration, and publisher identification.",
  },
  {
    file: "industries/gaming/online-gaming-igaming.html",
    ogTitle: "Online Gaming &amp; iGaming Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps online gaming companies, iGaming platforms, and sports betting businesses with market entry strategy, GTM execution, regulatory pathway mapping, and fundraising.",
  },
  {
    file: "industries/geographies/africa-consumer-research.html",
    ogTitle: "Africa Consumer Research &amp; Market Validation | GreyRadius",
    ogDescription: "GreyRadius conducts Africa consumer research and market validation for international companies across Nigeria, Kenya, South Africa, Ghana, and Ethiopia – primary research with African consumers, distributors, and retail partners.",
  },
  {
    file: "industries/geographies/africa-market-entry.html",
    ogTitle: "Africa Market Entry Strategy &amp; Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Africa with market entry strategy, regulatory mapping, distribution partner identification, GTM execution, and fundraising across Nigeria, Kenya, South Africa, Egypt, and Ethiopia.",
  },
  {
    file: "industries/geographies/gulf-africa-market-gateway.html",
    ogTitle: "Gulf-Africa Market Gateway Strategy| GreyRadius",
    ogDescription: "GreyRadius helps companies with geographies market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/geographies/gulf-enterprise-buyer-guide.html",
    ogTitle: "Gulf Enterprise Buyer Guide for International Companies | GreyRadius",
    ogDescription: "GreyRadius maps Gulf enterprise technology buyer behaviour, procurement processes, and decision-maker profiles for international companies entering UAE and Saudi Arabia enterprise markets.",
  },
  {
    file: "industries/geographies/gulf-localisation-strategy.html",
    ogTitle: "Gulf Localisation &amp; ICV Strategy for International Companies | GreyRadius",
    ogDescription: "GreyRadius builds Gulf localisation and ICV strategy for international companies entering UAE and Saudi Arabia – covering In-Country Value compliance, Arabic adaptation, and local partner identification.",
  },
  {
    file: "industries/geographies/gulf-market-entry.html",
    ogTitle: "Gulf Market Entry Strategy &amp; Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter the Gulf with market entry strategy, Vision 2030 programme access, ICV regulatory mapping, enterprise buyer identification, and GTM execution across UAE and Saudi Arabia.",
  },
  {
    file: "industries/geographies/gulf-vision-2030-opportunities.html",
    ogTitle: "Vision 2030 Commercial Opportunities for International Companies | GreyRadius",
    ogDescription: "GreyRadius maps Vision 2030 commercial opportunities for international companies across healthcare, technology, tourism, entertainment, and manufacturing – with programme access strategy and procurement contact identification.",
  },
  {
    file: "industries/geographies/india-africa-market-gateway.html",
    ogTitle: "India-Africa Market Gateway Strategy| GreyRadius",
    ogDescription: "GreyRadius helps companies with geographies market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/geographies/india-enterprise-buyer-guide.html",
    ogTitle: "India Enterprise Buyer Guide for International Technology Companies | GreyRadius",
    ogDescription: "GreyRadius maps Indian enterprise technology buyer behaviour, procurement processes, and decision-maker profiles for international SaaS, AI, and enterprise software companies entering India.",
  },
  {
    file: "industries/geographies/india-market-entry.html",
    ogTitle: "India Market Entry Strategy &amp; Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter India with market entry strategy, regulatory mapping, distribution partner identification, GTM execution, and fundraising across all sectors.",
  },
  {
    file: "industries/geographies/india-regulatory-guide.html",
    ogTitle: "India Regulatory Guide for International Companies | GreyRadius",
    ogDescription: "GreyRadius maps India's regulatory landscape for international companies across FSSAI, CDSCO, IRDAI, RBI, MeitY, and sector-specific licensing – with timeline, cost, and compliance strategy from primary research.",
  },
  {
    file: "industries/geographies/southeast-asia-enterprise-buyer-guide.html",
    ogTitle: "Southeast Asia Enterprise Buyer Guide for International Technology Companies | GreyRadius",
    ogDescription: "GreyRadius maps Southeast Asian enterprise technology buyer behaviour, procurement processes, and decision-maker profiles for international SaaS, AI, and enterprise software companies entering ASEAN markets.",
  },
  {
    file: "industries/geographies/southeast-asia-market-entry.html",
    ogTitle: "Southeast Asia Market Entry Strategy &amp; Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Southeast Asia with market entry strategy, regulatory mapping, distribution partner identification, GTM execution, and fundraising across Indonesia, Vietnam, Thailand, and Singapore.",
  },
  {
    file: "industries/global-capability-centers/gcc-scaling-transformation-india.html",
    ogTitle: "GCC scaling and transformation consulting India | GreyRadius",
    ogDescription: "GreyRadius helps companies scale and transform existing India capability centers - charter expansion, AI transformation, cost benchmarking, location additions and turnaround of underperforming centers.",
  },
  {
    file: "industries/global-capability-centers/gcc-setup-india.html",
    ogTitle: "GCC setup consulting India | Global capability center strategy | GreyRadius",
    ogDescription: "GreyRadius advises companies on setting up global capability centers in India - location strategy, entity and operating model, talent economics, BOT vs DIY decisions and execution.",
  },
  {
    file: "industries/green-hydrogen/africa-green-hydrogen-entry.html",
    ogTitle: "Africa green hydrogen and clean energy export market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with green hydrogen market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/green-hydrogen/green-hydrogen-market-entry.html",
    ogTitle: "Green Hydrogen Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps green hydrogen producers, electrolyser manufacturers, and hydrogen technology companies with market entry strategy, feasibility studies, GTM execution, and fundraising.",
  },
  {
    file: "industries/green-hydrogen/gulf-green-hydrogen-entry.html",
    ogTitle: "Gulf green hydrogen and clean energy market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with green hydrogen market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/green-hydrogen/hydrogen-fuel-cell.html",
    ogTitle: "Hydrogen Fuel Cell Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps hydrogen fuel cell companies, FCEV manufacturers, and hydrogen mobility businesses with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/green-hydrogen/hydrogen-infrastructure.html",
    ogTitle: "Hydrogen Infrastructure &amp; Distribution Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps hydrogen infrastructure companies, H2 distribution businesses, and hydrogen storage technology providers with market entry strategy, feasibility studies, and fundraising.",
  },
  {
    file: "industries/green-hydrogen/india-green-hydrogen-entry.html",
    ogTitle: "India Green Hydrogen Market Entry Strategy| GreyRadius",
    ogDescription: "GreyRadius helps companies with green hydrogen market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/green-hydrogen/southeast-asia-green-hydrogen-entry.html",
    ogTitle: "Southeast Asia green hydrogen and fuel cell technology market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with green hydrogen market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/health-supplements/africa-health-supplements-entry.html",
    ogTitle: "Africa health supplements and consumer health market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with health supplements market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/health-supplements/functional-food.html",
    ogTitle: "Functional Food &amp; Beverage Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps functional food brands, fortified beverage companies, and health food businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/health-supplements/gulf-health-supplements-entry.html",
    ogTitle: "Gulf health supplements and nutraceuticals market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with health supplements market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/health-supplements/india-consumer-health.html",
    ogTitle: "India Consumer Health &amp; OTC Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps international consumer health brands, OTC pharmaceutical companies, and health supplement businesses enter India with market entry strategy, CDSCO regulatory mapping, and distributor identification.",
  },
  {
    file: "industries/health-supplements/india-health-supplements-entry.html",
    ogTitle: "India Health Supplements Market Entry Strategy| GreyRadius",
    ogDescription: "GreyRadius helps companies with health supplements market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/health-supplements/personalised-nutrition.html",
    ogTitle: "Personalised Nutrition Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps personalised nutrition companies, nutrigenomics businesses, and custom diet platforms with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/health-supplements/southeast-asia-health-supplements-entry.html",
    ogTitle: "Southeast Asia health supplements and nutraceuticals market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with health supplements market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/healthcare-life-sciences/africa-healthcare-market-entry.html",
    ogTitle: "Africa Healthcare Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps healthcare companies entering Africa with market entry strategy, regulatory mapping, hospital GTM, and partner identification across Nigeria, Kenya, South Africa, and Egypt.",
  },
  {
    file: "industries/healthcare-life-sciences/diagnostics.html",
    ogTitle: "Diagnostics &amp; Pathology Market Entry | GreyRadius Consulting",
    ogDescription: "GreyRadius helps diagnostics companies, pathology lab operators, and diagnostic equipment manufacturers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/healthcare-life-sciences/genomics-precision-medicine.html",
    ogTitle: "Genomics &amp; Precision Medicine Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps genomics companies, precision medicine businesses, and genetic testing providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/healthcare-life-sciences/gulf-healthcare-investment.html",
    ogTitle: "Gulf Healthcare Investment &amp; Hospital Development | GreyRadius",
    ogDescription: "GreyRadius helps healthcare investors, hospital developers, and healthcare real estate companies enter Gulf markets with market entry strategy, regulatory mapping, investment feasibility, and partner identification.",
  },
  {
    file: "industries/healthcare-life-sciences/gulf-healthcare-market-entry.html",
    ogTitle: "Gulf Healthcare Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps international healthcare companies enter Gulf markets with market entry strategy, MOH regulatory mapping, hospital GTM, and partner identification across UAE and Saudi Arabia.",
  },
  {
    file: "industries/healthcare-life-sciences/gulf-silver-economy.html",
    ogTitle: "Gulf Silver Economy &amp; Senior Care Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps senior care companies, healthy ageing technology businesses, and silver economy platforms enter Gulf markets with market entry strategy, regulatory mapping, and partner identification.",
  },
  {
    file: "industries/healthcare-life-sciences/healthtech.html",
    ogTitle: "Healthtech &amp; Digital Health Consulting | Market Entry &amp; GTM | GreyRadius",
    ogDescription: "GreyRadius helps healthtech companies, digital health platforms, and telemedicine providers with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/healthcare-life-sciences/india-genomics-market-entry.html",
    ogTitle: "India Genomics &amp; Precision Medicine Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps genomics companies, precision medicine businesses, and genetic testing platforms enter India with market entry strategy, ICMR regulatory mapping, hospital partner identification, and fundraising.",
  },
  {
    file: "industries/healthcare-life-sciences/india-healthcare-infrastructure.html",
    ogTitle: "India Healthcare Infrastructure Investment | GreyRadius",
    ogDescription: "GreyRadius helps healthcare infrastructure investors and operators enter India with market entry strategy, NMC regulatory mapping, partner identification, and fundraising for hospital and diagnostic investment.",
  },
  {
    file: "industries/healthcare-life-sciences/longevity-biotech.html",
    ogTitle: "Longevity Biotech &amp; Anti-Ageing Consulting | Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps longevity biotech companies, anti-ageing therapeutics businesses, and healthspan technology providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/healthcare-life-sciences/medical-devices.html",
    ogTitle: "Medical Device Market Entry &amp; GTM Strategy | GreyRadius",
    ogDescription: "GreyRadius helps medical device companies and MedTech startups with market entry strategy, regulatory pathway mapping, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/healthcare-life-sciences/neurotechnology.html",
    ogTitle: "Neurotechnology Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps neurotechnology companies, brain-computer interface businesses, and neural monitoring technology providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/healthcare-life-sciences/pharma.html",
    ogTitle: "Pharmaceutical Market Entry &amp; GTM Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps pharmaceutical companies, generic drug manufacturers, and biotech firms with market entry strategy, GTM execution, regulatory pathway mapping, and fundraising.",
  },
  {
    file: "industries/healthcare-life-sciences/silver-economy.html",
    ogTitle: "Silver Economy &amp; Eldercare Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps eldercare companies, senior living operators, and ageing population technology providers with market entry strategy, feasibility studies, and fundraising.",
  },
  {
    file: "industries/healthtech/africa-healthtech-market-entry.html",
    ogTitle: "Africa Healthtech Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps healthtech companies enter Africa with market entry strategy, regulatory mapping, hospital GTM, and partner identification across Nigeria, Kenya, South Africa, and Egypt.",
  },
  {
    file: "industries/healthtech/femtech-market-entry.html",
    ogTitle: "Femtech Market Entry Strategy | Women's Health Consulting | GreyRadius",
    ogDescription: "GreyRadius helps femtech companies and women's health technology platforms with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/healthtech/gulf-healthcare-data.html",
    ogTitle: "Gulf Health Data &amp; Clinical Analytics Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps health data analytics companies, clinical intelligence platforms, and population health management businesses enter Gulf markets with market entry strategy, MOH data access, and hospital partner identification.",
  },
  {
    file: "industries/healthtech/gulf-healthcare-technology.html",
    ogTitle: "Gulf Healthcare Technology Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps healthcare technology companies enter Gulf markets with market entry strategy, MOH regulatory mapping, hospital GTM, and partner identification across UAE and Saudi Arabia.",
  },
  {
    file: "industries/healthtech/gulf-healthtech-enterprise-gtm.html",
    ogTitle: "Gulf digital health and enterprise healthtech market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with healthtech market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/healthtech/gulf-medtech-market-entry.html",
    ogTitle: "Gulf Medical Device &amp; MedTech Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps medical device and medtech companies enter Gulf markets with market entry strategy, SFDA and DHA regulatory mapping, hospital procurement research, and distributor identification.",
  },
  {
    file: "industries/healthtech/healthcare-ai-platforms.html",
    ogTitle: "Healthcare AI Platform Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps healthcare AI platform companies, clinical AI businesses, and medical AI solution providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/healthtech/india-digital-health-platform.html",
    ogTitle: "India Digital Health Platform Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps digital health platform companies enter India with market entry strategy, ABDM integration pathway, telemedicine regulatory mapping, consumer demand validation, and partner identification.",
  },
  {
    file: "industries/healthtech/india-healthtech-market-entry.html",
    ogTitle: "India Healthtech Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps international healthtech companies enter India with market entry strategy, CDSCO regulatory mapping, hospital system GTM, and fundraising support.",
  },
  {
    file: "industries/healthtech/longevity-health.html",
    ogTitle: "Longevity &amp; Preventive Health Consulting | Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps longevity technology companies, preventive health platforms, and healthy ageing businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/healthtech/southeast-asia-healthcare-technology.html",
    ogTitle: "Southeast Asia Healthcare Technology Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps healthcare technology companies enter Southeast Asia with market entry strategy, regulatory mapping, hospital GTM, and partner identification across Indonesia, Vietnam, Thailand, and Philippines.",
  },
  {
    file: "industries/healthtech/southeast-asia-healthtech-entry.html",
    ogTitle: "Southeast Asia Healthtech Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps healthtech companies entering Southeast Asia with market entry strategy, hospital system GTM, regulatory mapping, and fundraising across Indonesia, Vietnam, Thailand, and Philippines.",
  },
  {
    file: "industries/healthtech/southeast-asia-healthtech-scale.html",
    ogTitle: "Southeast Asia Healthtech Scale &amp; Expansion | GreyRadius",
    ogDescription: "GreyRadius helps healthtech companies that have launched in one Southeast Asian market scale across ASEAN with multi-market expansion strategy, regulatory pathway per market, and regional partnership development.",
  },
  {
    file: "industries/higher-education/africa-higher-education.html",
    ogTitle: "Africa Higher Education Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international higher education institutions enter Africa with SAQA, NUC, and KNQA regulatory mapping, African student demand research, and partnership identification.",
  },
  {
    file: "industries/higher-education/gulf-higher-education.html",
    ogTitle: "Gulf Higher Education Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international higher education institutions enter Gulf markets with MOHESR and CAA regulatory mapping, student demand research, and partnership university identification.",
  },
  {
    file: "industries/higher-education/india-higher-education.html",
    ogTitle: "India Higher Education Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international higher education institutions enter India with UGC regulatory mapping, Indian student demand research, partnership university identification, and GTM strategy.",
  },
  {
    file: "industries/higher-education/islamic-education.html",
    ogTitle: "Islamic Education &amp; EdTech Market Entry | GreyRadius Consulting",
    ogDescription: "GreyRadius helps Islamic education institutions, Islamic EdTech companies, and Quran learning platform businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/higher-education/southeast-asia-higher-education.html",
    ogTitle: "Southeast Asia Higher Education Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps international higher education institutions enter Southeast Asia with Singapore CPE regulatory mapping, Malaysia MOHE MQA accreditation advisory, and partnership identification.",
  },
  {
    file: "industries/hospitality-tourism/gulf-hospitality-market-entry.html",
    ogTitle: "Gulf Hospitality &amp; Tourism Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps international hospitality brands, hotel technology companies, and tourism businesses enter Gulf markets with market entry strategy, regulatory mapping, partner identification, and fundraising.",
  },
  {
    file: "industries/hospitality-tourism/gulf-hospitality-tech-entry.html",
    ogTitle: "Gulf Hospitality Technology Market Entry Strategy| GreyRadius",
    ogDescription: "GreyRadius helps companies with hospitality tourism market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/hospitality-tourism/gulf-market-entry.html",
    ogTitle: "Gulf &amp; Middle East Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Gulf markets with market entry strategy, regulatory pathway mapping, GTM execution, and partner identification across UAE, Saudi Arabia, Qatar, and other GCC markets.",
  },
  {
    file: "industries/hospitality-tourism/gulf-tourism-technology.html",
    ogTitle: "Gulf Tourism Technology Market Entry | GreyRadius Consulting",
    ogDescription: "GreyRadius helps tourism technology companies, travel tech businesses, and destination management platforms enter Gulf markets with market entry strategy, regulatory mapping, and partner identification.",
  },
  {
    file: "industries/hospitality-tourism/halal-tourism.html",
    ogTitle: "Halal Tourism Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps halal tourism operators, Muslim-friendly hotels, and Islamic travel platforms with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/hospitality-tourism/hotels-resorts.html",
    ogTitle: "Hotels &amp; Resorts Consulting | Feasibility, Market Entry &amp; GTM | GreyRadius",
    ogDescription: "GreyRadius helps hotel groups, resort developers, and hospitality investors with feasibility studies, market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/hospitality-tourism/india-hospitality-tech-entry.html",
    ogTitle: "India Hospitality Technology Market Entry Strategy| GreyRadius",
    ogDescription: "GreyRadius helps companies with hospitality tourism market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/hospitality-tourism/medical-tourism.html",
    ogTitle: "Medical Tourism Market Entry &amp; GTM Strategy | GreyRadius",
    ogDescription: "GreyRadius helps medical tourism operators, wellness tourism companies, and international patient programmes with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/hospitality-tourism/saudi-arabia-market-entry.html",
    ogTitle: "Saudi Arabia Market Entry Strategy &amp; Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Saudi Arabia with market entry strategy, SFDA and SASO regulatory mapping, Saudisation compliance, ICV strategy, GTM execution, and partner identification.",
  },
  {
    file: "industries/hospitality-tourism/sports-wellness.html",
    ogTitle: "Sports &amp; Wellness Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps sports technology companies, wellness businesses, and fitness platform operators with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/hospitality-tourism/thailand-market-entry.html",
    ogTitle: "Thailand Market Entry Strategy &amp; Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Thailand with market entry strategy, FDA and BOI regulatory mapping, GTM execution, and partner identification across FMCG, healthcare, technology, tourism, and manufacturing.",
  },
  {
    file: "industries/hospitality-tourism/uae-market-entry.html",
    ogTitle: "UAE Market Entry Strategy &amp; Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter the UAE with market entry strategy, DHA and MOHAP regulatory mapping, free zone versus mainland structure, GTM execution, and partner identification.",
  },
  {
    file: "industries/hrtech/africa-hrtech.html",
    ogTitle: "Africa HRtech Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps HRtech companies enter Africa with market entry strategy, SARS payroll compliance mapping, BBBEE administration gap assessment, and enterprise buyer identification across South Africa and Nigeria.",
  },
  {
    file: "industries/hrtech/gig-economy-platforms.html",
    ogTitle: "Gig Economy Platform Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps gig economy platforms, freelance marketplaces, and on-demand workforce companies with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/hrtech/gulf-hrtech-market-entry.html",
    ogTitle: "Gulf HRtech Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps HRtech companies enter Gulf markets with market entry strategy, Emiratisation and Saudisation compliance mapping, enterprise buyer research, and partner identification.",
  },
  {
    file: "industries/hrtech/india-hrtech-market-entry.html",
    ogTitle: "India HRtech Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps HRtech companies enter India with market entry strategy, enterprise buyer research, HRIS integration strategy, and channel partner identification.",
  },
  {
    file: "industries/hrtech/southeast-asia-hrtech.html",
    ogTitle: "Southeast Asia HRtech Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps HRtech companies enter Southeast Asia with Indonesia Manpower Law compliance mapping, Singapore MOM regulatory pathway, and enterprise buyer identification.",
  },
  {
    file: "industries/industrials-manufacturing-and-infrastructure.html",
    ogTitle: "Industrials, Manufacturing &amp; Infrastructure Consulting | GreyRadius",
    ogDescription: "Plant feasibility and TEV, turnkey setup consulting, industrial market entry, capex fundraising and supply chain build-out - consulting for builders of physical businesses across India, the Gulf and Africa.",
  },
  {
    file: "industries/insurtech/africa-insurance-market-entry.html",
    ogTitle: "Africa Insurance &amp; Insurtech Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps insurance companies and insurtech businesses enter Africa with market entry strategy, IRA and NAICOM regulatory mapping, mobile insurance integration, and partner identification across Nigeria, Kenya, and South Africa.",
  },
  {
    file: "industries/insurtech/digital-health-insurance.html",
    ogTitle: "Digital Health Insurance Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps digital health insurance companies, health insurtech platforms, and corporate health benefit providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/insurtech/gulf-health-insurance-market.html",
    ogTitle: "Gulf Health Insurance Market Entry | GreyRadius Consulting",
    ogDescription: "GreyRadius helps international health insurance companies, health insurtech businesses, and managed care organisations enter Gulf markets with market entry strategy, CCHI and DHA regulatory mapping, and partner identification.",
  },
  {
    file: "industries/insurtech/gulf-insurtech-entry.html",
    ogTitle: "Gulf Insurtech Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with insurtech market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/insurtech/india-insurance-market-entry.html",
    ogTitle: "India Insurance Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international insurance companies and insurtech businesses enter India with market entry strategy, IRDAI regulatory mapping, distribution partner identification, and fundraising support.",
  },
  {
    file: "industries/insurtech/india-insurtech-digital-entry.html",
    ogTitle: "India Digital Insurance Technology Market Entry| GreyRadius",
    ogDescription: "GreyRadius helps companies with insurtech market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/insurtech/india-insurtech-market-entry.html",
    ogTitle: "India Insurtech Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international insurtech companies enter India with IRDAI licence mapping, insurance distribution partner identification, embedded insurance strategy, and GTM execution.",
  },
  {
    file: "industries/insurtech/insurtech-agriculture.html",
    ogTitle: "Agricultural Insurance &amp; Agri-Insurtech Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps agricultural insurance companies, crop insurance technology businesses, and parametric insurance providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/insurtech/insurtech-embedded.html",
    ogTitle: "Embedded Insurance Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps embedded insurance companies, API insurance providers, and insurance-as-a-service businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/insurtech/southeast-asia-insurance-entry.html",
    ogTitle: "Southeast Asia Insurance &amp; Insurtech Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps insurance companies and insurtech businesses enter Southeast Asia with market entry strategy, OJK and BSP regulatory mapping, distribution partner identification, and fundraising across Indonesia, Philippines, and Thailand.",
  },
  {
    file: "industries/islamic-finance/gulf-islamic-banking.html",
    ogTitle: "Gulf Islamic Banking &amp; Finance Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps Islamic finance companies, Shariah-compliant fintech businesses, and Islamic banking technology providers enter Gulf markets with market entry strategy, regulatory mapping, and partner identification.",
  },
  {
    file: "industries/islamic-finance/gulf-islamic-finance-entry.html",
    ogTitle: "Gulf Islamic finance and Sharia-compliant banking market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with islamic finance market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/islamic-finance/india-islamic-finance-entry.html",
    ogTitle: "India Islamic Finance And Halal Economy Market Entry| GreyRadius",
    ogDescription: "GreyRadius helps companies with islamic finance market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/islamic-finance/india-islamic-finance.html",
    ogTitle: "India Islamic Finance &amp; Halal Investment Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps Islamic finance companies, Shariah-compliant investment platforms, and halal financial services businesses enter India with market entry strategy, regulatory mapping, and partner identification.",
  },
  {
    file: "industries/islamic-finance/islamic-economy-platforms.html",
    ogTitle: "Islamic Economy Platform Market Entry | GreyRadius Consulting",
    ogDescription: "GreyRadius helps Islamic economy platforms, halal marketplace businesses, and Muslim lifestyle technology companies with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/islamic-finance/islamic-fintech-market-entry.html",
    ogTitle: "Islamic Fintech Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps Islamic fintech companies, Shariah-compliant payment platforms, and Islamic digital banking ventures with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/islamic-finance/southeast-asia-islamic-finance-entry.html",
    ogTitle: "Southeast Asia Islamic finance and Sharia-compliant financial services market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with islamic finance market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/last-mile-delivery/africa-last-mile.html",
    ogTitle: "Africa Last Mile Delivery Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps last mile delivery companies enter Africa with e-commerce logistics demand research, Jumia and Takealot ecosystem mapping, mobile money integration strategy, and GTM planning.",
  },
  {
    file: "industries/last-mile-delivery/food-delivery-platform.html",
    ogTitle: "Food Delivery Platform Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps food delivery platforms, restaurant tech companies, and meal delivery businesses with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/last-mile-delivery/gulf-last-mile.html",
    ogTitle: "Gulf Last Mile Delivery Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international last mile delivery companies enter Gulf markets with e-commerce logistics demand research, Aramex and DP World ecosystem mapping, and GTM strategy.",
  },
  {
    file: "industries/last-mile-delivery/india-last-mile.html",
    ogTitle: "India Last Mile Delivery Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international last mile delivery and logistics companies enter India with market entry strategy, e-commerce logistics demand research, delivery partner identification, and GTM planning.",
  },
  {
    file: "industries/last-mile-delivery/reverse-logistics.html",
    ogTitle: "Reverse Logistics &amp; Returns Management Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps reverse logistics companies, returns management platforms, and recommerce businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/logistics-supply-chain/africa-logistics-market-entry.html",
    ogTitle: "Africa Logistics Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps logistics companies enter Africa with market entry strategy, regulatory mapping, and partner identification across Nigeria, Kenya, South Africa, and Ethiopia.",
  },
  {
    file: "industries/logistics-supply-chain/africa-logistics-supply-chain-entry.html",
    ogTitle: "Africa logistics and supply chain technology market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with logistics supply chain market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/logistics-supply-chain/africa-market-entry.html",
    ogTitle: "Africa Market Entry Strategy &amp; Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter African markets with market entry strategy, regulatory mapping, GTM execution, and partner identification across Sub-Saharan Africa and North Africa.",
  },
  {
    file: "industries/logistics-supply-chain/cold-chain.html",
    ogTitle: "Cold Chain Logistics Consulting | Market Entry &amp; GTM | GreyRadius",
    ogDescription: "GreyRadius helps cold chain logistics companies, temperature-controlled warehouse operators, and food logistics providers with market entry strategy, feasibility studies, and GTM execution.",
  },
  {
    file: "industries/logistics-supply-chain/freight-cargo.html",
    ogTitle: "Freight &amp; Cargo Consulting | Market Entry &amp; GTM | GreyRadius",
    ogDescription: "GreyRadius helps freight forwarding companies, cargo operators, and shipping businesses with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/logistics-supply-chain/gulf-logistics-automation.html",
    ogTitle: "Gulf Logistics Automation &amp; Warehouse Technology Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps logistics automation companies, warehouse technology businesses, and supply chain robotics providers enter Gulf markets with market entry strategy, government programme identification, and partner identification.",
  },
  {
    file: "industries/logistics-supply-chain/gulf-logistics-market-entry.html",
    ogTitle: "Gulf Logistics Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps international logistics companies enter Gulf markets with market entry strategy, regulatory mapping, free zone identification, and partner identification across UAE, Saudi Arabia, and Oman.",
  },
  {
    file: "industries/logistics-supply-chain/gulf-logistics-supply-chain.html",
    ogTitle: "Gulf Logistics &amp; Supply Chain Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps international logistics companies enter Gulf markets with JAFZA and NMDP access, ICV compliance strategy, cold chain certification, and 3PL partner identification.",
  },
  {
    file: "industries/logistics-supply-chain/india-logistics-market-entry.html",
    ogTitle: "India Logistics Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps international logistics companies, 3PL providers, and supply chain technology businesses enter India with market entry strategy, regulatory mapping, and partner identification.",
  },
  {
    file: "industries/logistics-supply-chain/india-logistics-supply-chain-entry.html",
    ogTitle: "India logistics and supply chain technology market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with logistics supply chain market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/logistics-supply-chain/india-supply-chain-resilience.html",
    ogTitle: "India Supply Chain Resilience &amp; Diversification Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international companies develop India supply chain diversification and China-plus-one manufacturing strategies with market entry support, supplier identification, and investment facilitation.",
  },
  {
    file: "industries/logistics-supply-chain/last-mile-delivery.html",
    ogTitle: "Last Mile Delivery &amp; Quick Commerce Consulting | GreyRadius",
    ogDescription: "GreyRadius helps last mile delivery companies, quick commerce platforms, and logistics technology providers with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/logistics-supply-chain/southeast-asia-logistics-supply-chain.html",
    ogTitle: "Southeast Asia logistics and supply chain technology market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with logistics supply chain market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/logistics-supply-chain/southeast-asia-logistics-technology.html",
    ogTitle: "Southeast Asia Logistics Technology Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps logistics technology companies enter Southeast Asia with market entry strategy, enterprise shipper research, regulatory mapping, and partner identification across Indonesia, Vietnam, and Thailand.",
  },
  {
    file: "industries/logistics-supply-chain/southeast-asia-market-entry.html",
    ogTitle: "Southeast Asia Market Entry Strategy &amp; Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Southeast Asian markets with market entry strategy, regulatory mapping, GTM execution, partner identification, and fundraising support across ASEAN.",
  },
  {
    file: "industries/logistics-supply-chain/supply-chain-tech.html",
    ogTitle: "Supply Chain Technology Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps supply chain technology companies, TMS providers, and WMS businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/manufacturing-industrials/3d-printing-manufacturing.html",
    ogTitle: "3D Printing &amp; Additive Manufacturing Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps 3D printing companies, additive manufacturing businesses, and advanced manufacturing technology providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/manufacturing-industrials/advanced-materials.html",
    ogTitle: "Advanced Materials Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps advanced materials companies, composite manufacturers, and novel material businesses with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/manufacturing-industrials/aerospace-defense.html",
    ogTitle: "Aerospace &amp; Defense Consulting | Market Entry &amp; GTM | GreyRadius",
    ogDescription: "GreyRadius helps aerospace companies, defense technology businesses, and aviation suppliers with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/manufacturing-industrials/africa-manufacturing-industrial-entry.html",
    ogTitle: "Africa manufacturing and industrial technology market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with manufacturing industrials market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/manufacturing-industrials/africa-manufacturing-market-entry.html",
    ogTitle: "Africa Manufacturing Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international manufacturers enter Africa with market entry strategy, regulatory mapping, industrial zone identification, and local partner identification across Nigeria, Ethiopia, Kenya, and South Africa.",
  },
  {
    file: "industries/manufacturing-industrials/agritech.html",
    ogTitle: "Agritech &amp; Smart Farming Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps agritech companies, precision agriculture providers, and farm technology businesses with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/manufacturing-industrials/bangladesh-market-entry.html",
    ogTitle: "Bangladesh Market Entry Strategy & Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Bangladesh with market entry strategy, BFSA regulatory mapping, GTM execution, and partner identification across FMCG, manufacturing, financial services, and technology.",
  },
  {
    file: "industries/manufacturing-industrials/electric-vehicles.html",
    ogTitle: "Electric Vehicle Consulting | Market Entry, GTM &amp; Feasibility | GreyRadius",
    ogDescription: "GreyRadius helps EV manufacturers, charging infrastructure companies, and EV technology startups with market entry strategy, feasibility studies, GTM execution, and fundraising – grounded in primary research.",
  },
  {
    file: "industries/manufacturing-industrials/gulf-advanced-manufacturing-entry.html",
    ogTitle: "Gulf advanced manufacturing and industrial technology market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with manufacturing industrials market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/manufacturing-industrials/india-advanced-manufacturing-entry.html",
    ogTitle: "India Advanced Manufacturing Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with manufacturing industrials market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/manufacturing-industrials/india-coastal-infrastructure.html",
    ogTitle: "India Coastal &amp; Port Infrastructure Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps coastal infrastructure companies, port technology businesses, and maritime service providers enter India with market entry strategy, Sagarmala programme access, regulatory mapping, and partner identification.",
  },
  {
    file: "industries/manufacturing-industrials/india-manufacturing-market-entry.html",
    ogTitle: "India Manufacturing Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international manufacturing companies enter India with PLI scheme access, market entry strategy, supplier identification, regulatory pathway, and fundraising support.",
  },
  {
    file: "industries/manufacturing-industrials/india-manufacturing-technology.html",
    ogTitle: "India Manufacturing Technology Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps manufacturing technology companies enter India with market entry strategy, PLI sector mapping, enterprise buyer research, and channel partner identification.",
  },
  {
    file: "industries/manufacturing-industrials/india-market-entry.html",
    ogTitle: "India Market Entry Strategy &amp; Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter the Indian market with market entry strategy, regulatory pathway mapping, GTM execution, partner identification, and fundraising support.",
  },
  {
    file: "industries/manufacturing-industrials/robotics-automation.html",
    ogTitle: "Robotics &amp; Industrial Automation Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps robotics companies, industrial automation providers, and cobot manufacturers with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/manufacturing-industrials/satellite-connectivity.html",
    ogTitle: "Satellite Connectivity Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps satellite internet companies, LEO constellation operators, and satellite service providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/manufacturing-industrials/smart-manufacturing.html",
    ogTitle: "Smart Manufacturing &amp; Industry 4.0 Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps smart manufacturing companies, Industry 4.0 technology providers, and IIoT platform businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/manufacturing-industrials/southeast-asia-manufacturing-entry.html",
    ogTitle: "Southeast Asia manufacturing and industrial technology market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with manufacturing industrials market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/manufacturing-industrials/southeast-asia-manufacturing-technology.html",
    ogTitle: "Southeast Asia Manufacturing Technology Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps manufacturing technology companies enter Southeast Asia with market entry strategy, enterprise buyer research, regulatory mapping, and channel partner identification across Vietnam, Indonesia, and Thailand.",
  },
  {
    file: "industries/manufacturing-industrials/space-tech-market-entry.html",
    ogTitle: "Space Technology Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps space technology companies, satellite operators, and new space ventures with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/manufacturing-industrials/sri-lanka-market-entry.html",
    ogTitle: "Sri Lanka Market Entry Strategy & Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Sri Lanka with market entry strategy, regulatory mapping, GTM execution, and partner identification across manufacturing, FMCG, technology, and tourism.",
  },
  {
    file: "industries/manufacturing-industrials/sustainable-packaging.html",
    ogTitle: "Sustainable Packaging Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps sustainable packaging companies, eco-packaging brands, and biodegradable material businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/manufacturing-industrials/synthetic-biology.html",
    ogTitle: "Synthetic Biology Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps synthetic biology companies, bio-manufacturing businesses, and industrial biotechnology firms with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/manufacturing-industrials/vietnam-market-entry.html",
    ogTitle: "Vietnam Market Entry Strategy &amp; Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Vietnam with market entry strategy, regulatory pathway mapping, GTM execution, and partner identification across manufacturing, FMCG, technology, and services.",
  },
  {
    file: "industries/media-entertainment/creator-economy.html",
    ogTitle: "Creator Economy Consulting | Market Entry &amp; GTM | GreyRadius",
    ogDescription: "GreyRadius helps creator economy platforms, influencer marketing companies, and creator monetisation businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/media-entertainment/gaming.html",
    ogTitle: "Gaming Market Entry &amp; GTM Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps game studios, gaming platforms, and esports companies with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/media-entertainment/gulf-media-entertainment-entry.html",
    ogTitle: "Gulf Media Entertainment Technology Market Entry| GreyRadius",
    ogDescription: "GreyRadius helps companies with media entertainment market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/media-entertainment/india-creator-economy.html",
    ogTitle: "India Creator Economy Market Entry | GreyRadius Consulting",
    ogDescription: "GreyRadius helps creator economy platforms, influencer technology companies, and content monetisation businesses enter India with market entry strategy, regulatory mapping, and GTM execution.",
  },
  {
    file: "industries/media-entertainment/india-media-entertainment-entry.html",
    ogTitle: "India Media Entertainment Technology Market Entry| GreyRadius",
    ogDescription: "GreyRadius helps companies with media entertainment market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/media-entertainment/india-media-entertainment.html",
    ogTitle: "India Media &amp; Entertainment Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps international media companies, streaming platforms, gaming businesses, and entertainment technology providers enter India with market entry strategy, regulatory mapping, and GTM execution.",
  },
  {
    file: "industries/media-entertainment/sports-tech.html",
    ogTitle: "Sports Technology Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps sports technology companies, esports businesses, and sports performance platform providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/media-entertainment/streaming-ott.html",
    ogTitle: "Streaming &amp; OTT Platform Consulting | Market Entry &amp; GTM | GreyRadius",
    ogDescription: "GreyRadius helps streaming platforms, OTT operators, and video content companies with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/medical-devices/africa-medical-devices-market-entry.html",
    ogTitle: "Africa Medical Devices Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international medical device companies enter Africa with market entry strategy, NAFDAC and SAHPRA regulatory mapping, hospital distributor identification, and GTM execution.",
  },
  {
    file: "industries/medical-devices/gulf-medical-devices.html",
    ogTitle: "Gulf Medical Devices Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international medical device companies enter Gulf markets with SFDA regulatory mapping, hospital distributor identification, KOL strategy, and GTM planning.",
  },
  {
    file: "industries/medical-devices/hospital-market-entry.html",
    ogTitle: "Hospital &amp; Healthcare Provider Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps hospital groups, healthcare operators, and clinic chains with market entry strategy, feasibility studies, GTM execution, and fundraising for new geography expansion.",
  },
  {
    file: "industries/medical-devices/india-medical-devices-market-entry.html",
    ogTitle: "India Medical Devices Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international medical device companies enter India with CDSCO regulatory mapping, hospital tender strategy, distributor identification, and GTM execution.",
  },
  {
    file: "industries/medical-devices/medtech-wearables.html",
    ogTitle: "MedTech Wearables &amp; Remote Monitoring Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps medical wearable companies, remote patient monitoring businesses, and health wearable providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/medical-devices/southeast-asia-medical-devices.html",
    ogTitle: "Southeast Asia Medical Devices Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps international medical device companies enter Southeast Asia with Singapore HSA regulatory mapping, Indonesia BPOM device registration, hospital distributor identification, and GTM strategy.",
  },
  {
    file: "industries/mental-health-tech/gulf-mental-health.html",
    ogTitle: "Gulf Mental Health Technology Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps mental health technology companies enter Gulf markets with market entry strategy, MOH regulatory mapping, employer wellness demand research, and GTM planning.",
  },
  {
    file: "industries/mental-health-tech/india-mental-health.html",
    ogTitle: "India Mental Health Technology Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps mental health technology companies enter India with market entry strategy, MOHFW regulatory mapping, corporate wellness demand research, and GTM planning.",
  },
  {
    file: "industries/mental-health-tech/mental-health-corporate.html",
    ogTitle: "Corporate Mental Health &amp; Workplace Wellness Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps corporate mental health platforms, employee assistance programme providers, and workplace wellness companies with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/mental-health-tech/mental-health-market-entry.html",
    ogTitle: "Mental Health Technology Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps mental health technology companies, digital therapy platforms, and mental wellness providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/mining-metals/critical-minerals-india.html",
    ogTitle: "Critical minerals consulting India | Strategy and TEV | GreyRadius",
    ogDescription: "GreyRadius advises miners, processors and investors on India&#39;s critical minerals push - lithium, rare earths and battery minerals policy, auction strategy, processing feasibility and partnerships.",
  },
  {
    file: "industries/mining-metals/metals-diversification-gcc.html",
    ogTitle: "Metals and mining consulting GCC | Diversification strategy | GreyRadius",
    ogDescription: "GreyRadius advises metals companies and investors on GCC opportunities - Saudi mining sector opening, Ma&#39;aden ecosystem, aluminium and steel positions, green metals and sovereign partnerships.",
  },
  {
    file: "industries/mining-metals/mining-metals-africa.html",
    ogTitle: "Mining and metals consulting Africa | Entry and diligence | GreyRadius",
    ogDescription: "GreyRadius advises miners, offtakers and investors on African mining - critical minerals belts, country risk assessment, local partnership structuring, beneficiation mandates and commercial diligence.",
  },
  {
    file: "industries/pharma/africa-pharma-market-entry.html",
    ogTitle: "Africa Pharmaceutical Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international pharmaceutical companies enter Africa with market entry strategy, NAFDAC and SAHPRA regulatory mapping, distributor identification, and GTM execution across Nigeria, South Africa, Kenya, and Ghana.",
  },
  {
    file: "industries/pharma/gulf-pharma-market-entry.html",
    ogTitle: "Gulf Pharmaceutical Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international pharmaceutical companies enter Gulf markets with SFDA regulatory mapping, hospital formulary strategy, distributor identification, and GTM execution.",
  },
  {
    file: "industries/pharma/halal-pharma.html",
    ogTitle: "Halal Pharmaceuticals &amp; Medicine Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps halal pharmaceutical companies, Shariah-compliant medicine businesses, and halal supplement manufacturers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/pharma/india-pharma-market-entry.html",
    ogTitle: "India Pharmaceutical Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international pharmaceutical companies enter India with market entry strategy, CDSCO regulatory mapping, distribution partner identification, and market access strategy.",
  },
  {
    file: "industries/pharma/pharma-distribution.html",
    ogTitle: "Pharmaceutical Distribution Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps pharmaceutical distribution companies, medicine supply chain businesses, and pharma logistics providers with market entry strategy, GTM execution, and feasibility studies.",
  },
  {
    file: "industries/pharma/southeast-asia-pharma.html",
    ogTitle: "Southeast Asia Pharmaceutical Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps pharmaceutical companies enter Southeast Asia with Indonesia BPOM regulatory mapping, Singapore HSA advisory, pharmaceutical distributor identification, and GTM strategy.",
  },
  {
    file: "industries/proptech/africa-proptech-entry.html",
    ogTitle: "Africa proptech and real estate technology market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with proptech market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/proptech/africa-real-estate-market-entry.html",
    ogTitle: "Africa Real Estate &amp; PropTech Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps real estate companies and PropTech businesses enter Africa with market entry strategy, regulatory mapping, demand validation, and partner identification across Nigeria, Kenya, South Africa, and Egypt.",
  },
  {
    file: "industries/proptech/gulf-construction-market-entry.html",
    ogTitle: "Gulf Construction Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international construction companies, building material suppliers, and construction technology businesses enter Gulf markets with market entry strategy, regulatory mapping, and partner identification.",
  },
  {
    file: "industries/proptech/gulf-proptech-real-estate.html",
    ogTitle: "Gulf PropTech &amp; Real Estate Technology Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps international PropTech companies enter Gulf markets with RERA Dubai compliance mapping, NHC Saudi partnership access, smart building demand research, and enterprise developer GTM.",
  },
  {
    file: "industries/proptech/gulf-real-estate-market-entry.html",
    ogTitle: "Gulf Real Estate Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps real estate developers, PropTech companies, and real estate service businesses enter Gulf markets with market entry strategy, RERA regulatory mapping, and partner identification.",
  },
  {
    file: "industries/proptech/india-proptech-entry.html",
    ogTitle: "India Proptech Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with proptech market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/proptech/india-proptech-market-entry.html",
    ogTitle: "India PropTech Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps PropTech companies enter India with market entry strategy, developer and agency buyer research, channel partner identification, RERA mapping, and fundraising support.",
  },
  {
    file: "industries/proptech/india-real-estate-market-entry.html",
    ogTitle: "India Real Estate Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps international real estate developers, PropTech companies, and real estate service businesses enter India with market entry strategy, RERA regulatory mapping, and partner identification.",
  },
  {
    file: "industries/proptech/proptech-construction.html",
    ogTitle: "Construction Technology Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps construction technology companies, contech businesses, and BIM software providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/proptech/southeast-asia-proptech-entry.html",
    ogTitle: "Southeast Asia proptech and real estate technology market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with proptech market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/quick-commerce/quick-commerce-gcc.html",
    ogTitle: "Quick commerce consulting GCC | Brand channel strategy | GreyRadius",
    ogDescription: "GreyRadius advises brands, platforms and investors on GCC quick commerce - Careem, Talabat and Noon channel strategy, dark store economics, brand listing and market entry.",
  },
  {
    file: "industries/quick-commerce/quick-commerce-india.html",
    ogTitle: "Quick commerce consulting India | Brand and investor strategy | GreyRadius",
    ogDescription: "GreyRadius advises brands, platforms and investors on India&#39;s quick commerce channel - dark store economics, brand channel strategy, category expansion and commercial diligence.",
  },
  {
    file: "industries/rare-earth-metals/africa-rare-earth.html",
    ogTitle: "Africa Critical Minerals &amp; Rare Earth Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps critical mineral and rare earth companies enter Africa with market entry strategy, DRC, Zambia, and South Africa regulatory mapping, offtake partner identification, and investment strategy.",
  },
  {
    file: "industries/rare-earth-metals/gulf-rare-earth.html",
    ogTitle: "Gulf Critical Minerals &amp; Rare Earth Strategy | GreyRadius",
    ogDescription: "GreyRadius helps critical mineral companies access Gulf sovereign capital with PIF and Mubadala investment mapping, co-investment structure design, and strategic demand validation.",
  },
  {
    file: "industries/rare-earth-metals/india-rare-earth.html",
    ogTitle: "India Critical Minerals &amp; Rare Earth Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps critical mineral and rare earth companies enter India with market entry strategy, MMDR Act regulatory mapping, IREL partnership access, and investment strategy.",
  },
  {
    file: "industries/rare-earth-metals/rare-earth-supply-chain.html",
    ogTitle: "Rare Earth &amp; Critical Minerals Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps rare earth mining companies, critical mineral processors, and mineral supply chain businesses with market entry strategy, feasibility studies, and fundraising.",
  },
  {
    file: "industries/rare-earth-metals/southeast-asia-rare-earth.html",
    ogTitle: "Southeast Asia Critical Minerals &amp; Rare Earth Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps critical mineral and rare earth companies enter Southeast Asia with Indonesia nickel regulatory mapping, Vietnam rare earth access, and regional supply chain strategy.",
  },
  {
    file: "industries/real-estate-and-infrastructure.html",
    ogTitle: "Real Estate and Infrastructure Consulting | GreyRadius",
    ogDescription: "Market entry, feasibility, GTM execution, and fundraising advisory for real estate developers, infrastructure companies, and proptech firms across the Gulf and wider region.",
  },
  {
    file: "industries/real-estate-infrastructure/data-centers.html",
    ogTitle: "Data Center Consulting | Market Entry, Feasibility &amp; GTM | GreyRadius",
    ogDescription: "GreyRadius helps data center developers, colocation operators, and hyperscale companies with market entry strategy, site feasibility studies, GTM execution, and fundraising.",
  },
  {
    file: "industries/real-estate-infrastructure/proptech.html",
    ogTitle: "Proptech Consulting | Market Entry, GTM &amp; Feasibility | GreyRadius",
    ogDescription: "GreyRadius helps proptech companies, smart building solution providers, and real estate technology startups with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/real-estate-infrastructure/reit-consulting.html",
    ogTitle: "REIT &amp; Real Estate Fund Consulting | Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps REIT managers, real estate fund operators, and property investment companies with market entry strategy, feasibility studies, regulatory pathway mapping, and fundraising.",
  },
  {
    file: "industries/real-estate-infrastructure/smart-city-consulting.html",
    ogTitle: "Smart City Technology Consulting | Market Entry &amp; GTM | GreyRadius",
    ogDescription: "GreyRadius helps smart city technology companies, urban tech providers, and city platform developers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/reit-consulting/digital-infrastructure-reit.html",
    ogTitle: "Digital Infrastructure REIT &amp; Fund Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps digital infrastructure REIT managers and data centre fund operators with market entry strategy, investor identification, and fundraising.",
  },
  {
    file: "industries/reit-consulting/gulf-reit-real-estate-funds.html",
    ogTitle: "Gulf REIT and real estate investment fund advisory and market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with reit consulting market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/reit-consulting/india-reit-real-estate-funds.html",
    ogTitle: "India Reit And Real Estate Fund Market Entry| GreyRadius",
    ogDescription: "GreyRadius helps companies with reit consulting market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/reit-consulting/real-estate-tokenisation.html",
    ogTitle: "Real Estate Tokenisation &amp; Digital Asset Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps real estate tokenisation companies, property digital asset platforms, and blockchain real estate businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/renewable-energy/africa-energy-market-entry.html",
    ogTitle: "Africa Energy &amp; Off-Grid Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps energy companies enter Africa with market entry strategy, regulatory mapping, DFI programme identification, and partner identification for solar, off-grid, and clean energy investment.",
  },
  {
    file: "industries/renewable-energy/africa-renewable-energy-entry.html",
    ogTitle: "Africa Renewable Energy Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with renewable energy market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/renewable-energy/africa-solar-energy-scale.html",
    ogTitle: "Africa Utility-Scale Solar Energy Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps utility-scale solar companies enter Africa with market entry strategy, IPP licensing, DFI programme identification, PPA framework access, and project developer partner identification.",
  },
  {
    file: "industries/renewable-energy/community-solar.html",
    ogTitle: "Community Solar &amp; Distributed Energy Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps community solar developers, distributed energy companies, and virtual power plant operators with market entry strategy, feasibility studies, and fundraising.",
  },
  {
    file: "industries/renewable-energy/gulf-energy-transition.html",
    ogTitle: "Gulf Energy Transition Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps clean energy and energy transition companies enter Gulf markets with market entry strategy, NOC partnership identification, government programme access, and fundraising.",
  },
  {
    file: "industries/renewable-energy/gulf-renewable-energy-entry.html",
    ogTitle: "Gulf Renewable Energy Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with renewable energy market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/renewable-energy/india-energy-market-entry.html",
    ogTitle: "India Energy & Cleantech Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps energy and cleantech companies enter India with market entry strategy, regulatory mapping, government programme identification, and partner identification across solar, wind, storage, and EV.",
  },
  {
    file: "industries/renewable-energy/india-gulf-energy-combined.html",
    ogTitle: "India &amp; Gulf Energy Combined Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps energy companies develop combined India and Gulf market entry strategies, identifying synergies between India&#x27;s renewable scale and Gulf&#x27;s clean energy transformation procurement.",
  },
  {
    file: "industries/renewable-energy/india-renewable-energy-entry.html",
    ogTitle: "India renewable energy technology and market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with renewable energy market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/renewable-energy/india-renewable-hydrogen.html",
    ogTitle: "India Green Hydrogen Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps green hydrogen companies enter India with market entry strategy, National Green Hydrogen Mission access, regulatory mapping, and partner identification for electrolyser, fuel cell, and hydrogen storage businesses.",
  },
  {
    file: "industries/renewable-energy/offshore-wind-market-entry.html",
    ogTitle: "Offshore Wind Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps offshore wind developers, wind turbine manufacturers, and offshore energy companies with market entry strategy, feasibility studies, GTM execution, and fundraising.",
  },
  {
    file: "industries/renewable-energy/southeast-asia-renewable-energy-entry.html",
    ogTitle: "Southeast Asia renewable energy and cleantech market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with renewable energy market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/residential-development/affordable-housing.html",
    ogTitle: "Affordable Housing Market Entry &amp; Consulting | GreyRadius",
    ogDescription: "GreyRadius helps affordable housing developers, social housing companies, and workforce housing investors with market entry strategy, feasibility studies, and fundraising.",
  },
  {
    file: "industries/residential-development/africa-residential-development.html",
    ogTitle: "Africa Residential Real Estate Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps international residential developers enter Africa with market entry strategy, regulatory mapping across Nigeria, Kenya, Ghana, and South Africa, and affordable housing demand validation.",
  },
  {
    file: "industries/residential-development/gulf-residential-development.html",
    ogTitle: "Gulf Residential Real Estate Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps international residential developers enter Gulf markets with RERA Dubai and Abu Dhabi regulatory mapping, investor demand research, and development partner identification.",
  },
  {
    file: "industries/residential-development/india-residential-development.html",
    ogTitle: "India Residential Real Estate Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps international residential developers enter India with market entry strategy, RERA regulatory mapping, land partner identification, and demand validation across India's fastest-growing urban markets.",
  },
  {
    file: "industries/robotics-automation/industrial-robotics-india.html",
    ogTitle: "Industrial robotics consulting India | Market entry and GTM | GreyRadius",
    ogDescription: "GreyRadius advises robotics vendors, integrators and investors on India - automation demand across automotive, electronics and pharma, channel strategy, localisation and market entry.",
  },
  {
    file: "industries/robotics-automation/robotics-automation-gcc.html",
    ogTitle: "Robotics and automation consulting GCC | Market entry | GreyRadius",
    ogDescription: "GreyRadius advises robotics and automation firms on the GCC - Saudi industrial automation demand, logistics and construction robotics, sovereign programmes and market entry strategy.",
  },
  {
    file: "industries/robotics-automation/warehouse-automation-southeast-asia.html",
    ogTitle: "Warehouse automation consulting Southeast Asia | GreyRadius",
    ogDescription: "GreyRadius advises automation vendors, 3PLs and investors on Southeast Asia - e-commerce fulfilment demand, AMR and ASRS adoption, country prioritisation and market entry strategy.",
  },
  {
    file: "industries/satellite-connectivity/africa-satellite-connectivity-entry.html",
    ogTitle: "Africa satellite connectivity and rural internet market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with satellite connectivity market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/satellite-connectivity/gulf-satellite-connectivity-entry.html",
    ogTitle: "Gulf satellite connectivity and space technology market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with satellite connectivity market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/satellite-connectivity/india-satellite-connectivity-entry.html",
    ogTitle: "India Satellite Connectivity Market Entry Strategy| GreyRadius",
    ogDescription: "GreyRadius helps companies with satellite connectivity market entry — strategy, regulatory mapping, partner identification, and GTM execution.",
  },
  {
    file: "industries/satellite-connectivity/india-space-tech.html",
    ogTitle: "India Space Technology Market Entry | GreyRadius Consulting",
    ogDescription: "GreyRadius helps space technology companies enter India with market entry strategy, IN-SPACe regulatory mapping, ISRO partnership access, and fundraising support.",
  },
  {
    file: "industries/satellite-connectivity/nano-satellite.html",
    ogTitle: "Nanosatellite &amp; Small Satellite Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps nanosatellite companies, small satellite manufacturers, and CubeSat technology businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/satellite-connectivity/southeast-asia-satellite-connectivity-entry.html",
    ogTitle: "Southeast Asia satellite connectivity and maritime technology market entry strategy | GreyRadius",
    ogDescription: "GreyRadius helps companies with satellite connectivity market entry – regulatory mapping, partner identification, and GTM strategy.",
  },
  {
    file: "industries/semiconductors/gulf-semiconductor-market-entry.html",
    ogTitle: "Gulf Semiconductor Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps semiconductor companies enter Gulf markets with market entry strategy, NEOM technology programme access, Saudi and UAE semiconductor investment programme identification, and partner identification.",
  },
  {
    file: "industries/semiconductors/india-semiconductor-market-entry.html",
    ogTitle: "India Semiconductor Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps semiconductor companies enter India with market entry strategy, ISM DLI programme access, OEM demand validation, fab ecosystem mapping, and partner identification.",
  },
  {
    file: "industries/semiconductors/osat-atmp-southeast-asia.html",
    ogTitle: "OSAT and ATMP consulting Southeast Asia | Expansion strategy | GreyRadius",
    ogDescription: "GreyRadius advises OSAT, ATMP and packaging ecosystem firms on Southeast Asia strategy - Malaysia and Vietnam expansion feasibility, customer diversification, incentive capture and market entry execution.",
  },
  {
    file: "industries/semiconductors/semiconductor-fab-consulting.html",
    ogTitle: "Semiconductor Fab &amp; Foundry Consulting | Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps semiconductor companies, chip manufacturers, and electronics businesses with market entry strategy, feasibility studies, supply chain advisory, and fundraising.",
  },
  {
    file: "industries/semiconductors/semiconductor-fab-ecosystem-india.html",
    ogTitle: "Semiconductor consulting India | Fab ecosystem entry and TEV | GreyRadius",
    ogDescription: "GreyRadius advises semiconductor equipment, materials and services firms entering India&#39;s fab and OSAT ecosystem - India Semiconductor Mission incentives, feasibility studies, partner screening and GTM.",
  },
  {
    file: "industries/semiconductors/semiconductor-supply-chain-gcc.html",
    ogTitle: "Semiconductor strategy consulting GCC | Saudi and UAE entry | GreyRadius",
    ogDescription: "GreyRadius advises semiconductor firms and investors on GCC opportunities - Saudi and UAE semiconductor ambitions, AI infrastructure demand, incentive programmes and market entry feasibility.",
  },
  {
    file: "industries/semiconductors/southeast-asia-semiconductor.html",
    ogTitle: "Southeast Asia Semiconductor Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps semiconductor companies enter Southeast Asia with market entry strategy, back-end manufacturing ecosystem mapping, export control compliance, and OEM partner identification.",
  },
  {
    file: "industries/technology/africa-mobile-internet.html",
    ogTitle: "Africa Mobile Internet &amp; Connectivity Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps mobile internet companies, connectivity technology businesses, and digital infrastructure providers enter Africa with market entry strategy, regulatory mapping, and partner identification.",
  },
  {
    file: "industries/technology/africa-technology-market-entry.html",
    ogTitle: "Africa Technology Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps technology companies enter Africa with market entry strategy, regulatory mapping, GTM execution, and partner identification across Nigeria, Kenya, South Africa, and Egypt.",
  },
  {
    file: "industries/technology/cloud-infrastructure.html",
    ogTitle: "Cloud Infrastructure &amp; Services Market Entry | GreyRadius Consulting",
    ogDescription: "GreyRadius helps cloud infrastructure companies, IaaS providers, and managed cloud services firms with market entry strategy, GTM execution, feasibility studies, and fundraising.",
  },
  {
    file: "industries/technology/cybersecurity.html",
    ogTitle: "Cybersecurity Market Entry &amp; GTM Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps cybersecurity companies, security technology providers, and MSSP firms with market entry strategy, GTM execution, feasibility studies, and fundraising – grounded in enterprise buyer research.",
  },
  {
    file: "industries/technology/data-analytics.html",
    ogTitle: "Data &amp; Analytics Consulting | Market Entry &amp; GTM | GreyRadius",
    ogDescription: "GreyRadius helps data analytics companies, BI platform providers, and data infrastructure businesses with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/technology/gulf-ai-market-entry.html",
    ogTitle: "Gulf AI & Artificial Intelligence Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps AI companies enter Gulf markets with market entry strategy, government programme identification, enterprise buyer research, and partner identification across UAE and Saudi Arabia.",
  },
  {
    file: "industries/technology/gulf-ai-national-strategy.html",
    ogTitle: "Gulf National AI Strategy &amp; Government AI Advisory | GreyRadius",
    ogDescription: "GreyRadius helps AI strategy consultancies, national AI programme advisories, and government AI implementation companies access Gulf national AI strategy mandates with market entry strategy and government relationship development.",
  },
  {
    file: "industries/technology/gulf-data-centres.html",
    ogTitle: "Gulf Data Centre &amp; Cloud Infrastructure Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps data centre operators, cloud providers, and digital infrastructure companies enter Gulf markets with market entry strategy, regulatory mapping, government programme access, and partner identification.",
  },
  {
    file: "industries/technology/gulf-enterprise-ai-deployment.html",
    ogTitle: "Gulf Enterprise AI Deployment Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps enterprise AI companies deploy in Gulf markets with AI deployment strategy, enterprise buyer identification, Arabic AI adaptation, and government programme access.",
  },
  {
    file: "industries/technology/gulf-smart-infrastructure.html",
    ogTitle: "Gulf Smart Infrastructure Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps smart infrastructure technology companies enter Gulf markets with market entry strategy, government programme identification, regulatory mapping, and partner identification.",
  },
  {
    file: "industries/technology/gulf-technology-market-entry.html",
    ogTitle: "Gulf Technology Market Entry Strategy | GreyRadius Consulting",
    ogDescription: "GreyRadius helps international technology companies enter Gulf markets with market entry strategy, regulatory mapping, government programme identification, GTM execution, and partner identification.",
  },
  {
    file: "industries/technology/gulf-water-technology.html",
    ogTitle: "Gulf Water Technology &amp; Desalination Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps water technology companies, desalination businesses, and water management technology providers enter Gulf markets with market entry strategy, regulatory mapping, and partner identification.",
  },
  {
    file: "industries/technology/hrtech.html",
    ogTitle: "HR Technology &amp; Workforce Platform Consulting | Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps HR technology companies, HRMS providers, and workforce management platforms with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/technology/india-deep-tech-market-entry.html",
    ogTitle: "India Deep Tech &amp; Advanced Technology Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps deep technology companies – quantum computing, advanced materials, robotics, and photonics – enter India with market entry strategy, government programme identification, and academic partner mapping.",
  },
  {
    file: "industries/technology/india-defence-technology.html",
    ogTitle: "India Defence Technology &amp; Aerospace Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps international defence technology companies and aerospace businesses enter India with market entry strategy, DRDO partnership access, defence FDI pathway, and Make in India defence programme identification.",
  },
  {
    file: "industries/technology/india-gulf-technology-entry.html",
    ogTitle: "India & Gulf Technology Combined Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps technology companies develop combined India and Gulf market entry strategies, identifying synergies between the two most commercially significant emerging market technology opportunities.",
  },
  {
    file: "industries/technology/india-iot-smart-city.html",
    ogTitle: "India IoT &amp; Smart City Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps IoT companies, smart city technology providers, and connected infrastructure businesses enter India with market entry strategy, government programme identification, and partner identification.",
  },
  {
    file: "industries/technology/india-semiconductor-design.html",
    ogTitle: "India Semiconductor Design &amp; Fabless Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps fabless semiconductor companies and chip design businesses enter India with market entry strategy, India Semiconductor Mission access, talent ecosystem mapping, and OEM partner identification.",
  },
  {
    file: "industries/technology/india-telecom-market-entry.html",
    ogTitle: "India Telecom &amp; Connectivity Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps international telecom companies, network equipment vendors, and connectivity technology businesses enter India with market entry strategy, DoT regulatory mapping, and partner identification.",
  },
  {
    file: "industries/technology/india-urban-infrastructure.html",
    ogTitle: "India Urban Infrastructure &amp; Smart Cities Market Entry | GreyRadius",
    ogDescription: "GreyRadius helps urban infrastructure technology companies enter India with market entry strategy, Smart Cities Mission programme access, AMRUT programme identification, and urban local body procurement mapping.",
  },
  {
    file: "industries/technology/singapore-market-entry.html",
    ogTitle: "Singapore Market Entry Strategy &amp; Consulting | GreyRadius",
    ogDescription: "GreyRadius helps international companies enter Singapore with market entry strategy, MAS and MOH regulatory mapping, GTM execution, and partner identification across technology, financial services, healthcare, and FMCG.",
  },
  {
    file: "industries/technology/smart-home.html",
    ogTitle: "Smart Home &amp; Consumer IoT Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps smart home technology companies, connected device businesses, and consumer IoT platform providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/technology/southeast-asia-govtech.html",
    ogTitle: "Southeast Asia GovTech Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps government technology companies enter Southeast Asia with market entry strategy, government programme identification, regulatory mapping, and partner identification across Indonesia, Vietnam, and Philippines.",
  },
  {
    file: "industries/telecom-5g/5g-enterprise-india.html",
    ogTitle: "5G and enterprise connectivity consulting India | GreyRadius",
    ogDescription: "GreyRadius advises telecom vendors, enterprises and investors on India&#39;s 5G and enterprise connectivity market - private networks, FWA growth, vendor strategy and market entry.",
  },
  {
    file: "industries/telecom-5g/5g-private-networks-southeast-asia.html",
    ogTitle: "5G and private networks consulting Southeast Asia | GreyRadius",
    ogDescription: "GreyRadius advises telecom vendors and enterprises on Southeast Asia 5G - private network demand in manufacturing and ports, country regulatory frameworks, channel strategy and market entry.",
  },
  {
    file: "industries/telecom-5g/telecom-infrastructure-africa.html",
    ogTitle: "Telecom infrastructure consulting Africa | Market entry | GreyRadius",
    ogDescription: "GreyRadius advises telecom vendors, tower companies and investors on Africa - connectivity infrastructure demand, fibre and tower economics, mobile money adjacency and market entry strategy.",
  },
  {
    file: "industries/water-wastewater/desalination-water-gcc.html",
    ogTitle: "Desalination and water consulting GCC | Market strategy | GreyRadius",
    ogDescription: "GreyRadius advises water technology firms, developers and investors on the GCC - desalination IWP pipelines, reuse mandates, Saudi and UAE procurement structures and market entry.",
  },
  {
    file: "industries/water-wastewater/water-infrastructure-africa.html",
    ogTitle: "Water infrastructure consulting Africa | Market strategy | GreyRadius",
    ogDescription: "GreyRadius advises water technology firms, developers and investors on Africa - urban utility demand, DFI-funded programmes, decentralised treatment models and market entry strategy.",
  },
  {
    file: "industries/water-wastewater/water-wastewater-treatment-india.html",
    ogTitle: "Water and wastewater consulting India | Market entry and TEV | GreyRadius",
    ogDescription: "GreyRadius advises water technology firms, EPCs and investors on India - municipal and industrial treatment demand, Jal Jeevan and AMRUT programmes, PPP models and market entry.",
  },
  {
    file: "industries/wealthtech/africa-wealthtech.html",
    ogTitle: "Africa Wealthtech Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps wealthtech companies enter Africa with FSCA FSP licence mapping, Nigeria SEC registration advisory, HNI demand validation, and distribution partner identification.",
  },
  {
    file: "industries/wealthtech/wealthtech-gcc.html",
    ogTitle: "Wealthtech consulting GCC | DIFC and ADGM strategy | GreyRadius",
    ogDescription: "GreyRadius advises wealth platforms, managers and investors on the GCC - DIFC and ADGM licensing, expat and HNI segments, digital wealth adoption and market entry execution.",
  },
  {
    file: "industries/wealthtech/wealthtech-india.html",
    ogTitle: "Wealthtech consulting India | Market entry and growth | GreyRadius",
    ogDescription: "GreyRadius advises wealthtech platforms, asset managers and investors on India - demat and MF growth, SEBI regulatory pathway, distribution economics and market entry execution.",
  },
  {
    file: "industries/wealthtech/wealthtech-robo-advisor.html",
    ogTitle: "Wealthtech &amp; Robo-Advisor Market Entry Strategy | GreyRadius",
    ogDescription: "GreyRadius helps wealthtech companies, robo-advisor platforms, and digital wealth management providers with market entry strategy, GTM execution, and fundraising.",
  },
  {
    file: "industries/wealthtech/wealthtech-southeast-asia.html",
    ogTitle: "Wealthtech consulting Southeast Asia | Platform strategy | GreyRadius",
    ogDescription: "GreyRadius advises wealth platforms and asset managers on Southeast Asia - Singapore hub strategy, Indonesia and Vietnam retail investing growth, licensing pathways and market entry.",
  },
  {
    file: "insights/b2b-saas-pricing-india.html",
    ogTitle: "B2B SaaS Pricing for India: Why Discounting Is Not a Strategy | GreyRadius Consulting",
    ogDescription: "A flat percentage off your US list price is not an India pricing model. It is a placeholder for the segment definition, value metric, and price architecture that a real India go-to-market requires.",
  },
  {
    file: "insights/gtm-strategy-emerging-markets.html",
    ogTitle: "GTM Strategy for Emerging Markets: India, Gulf and Africa | GreyRadius Consulting",
    ogDescription: "A Western GTM playbook imported unchanged into India, the Gulf or Africa fails in four predictable ways. Channel dependency, affordability-led pricing, regulatory sequencing, and trust dynamics all work differently.",
  },
  {
    file: "insights/gulf-market-entry-mistakes.html",
    ogTitle: "What the Biggest Mistakes in Gulf Market Entry Have in Common | GreyRadius Consulting",
    ogDescription: "Five structural errors, one root cause, and a self-diagnostic before you commit budget to a UAE, Saudi Arabia, or wider GCC market entry.",
  },
  {
    file: "insights/how-to-enter-india-market.html",
    ogTitle: "How to Enter the Indian Market &#8211; 12-Week Roadmap for Foreign Companies | GreyRadius",
    ogDescription: "A 12-week India market entry roadmap covering entry mode, FDI rules, FSSAI, CDSCO, RBI approvals and operational setup for foreign companies. GreyRadius Consulting.",
  },
  {
    file: "insights/india-distributor-evaluation-framework.html",
    ogTitle: "How to Find and Evaluate Distributors in India: A Framework for FMCG and Consumer Goods Companies | GreyRadius Consulting",
    ogDescription: "India's distributor landscape is fragmented, opaque, and consequential. This framework covers the four sourcing channels, six evaluation criteria, and three red flags that determine whether your India distribution bet pays off.",
  },
  {
    file: "insights/newsletters/charged/abb-gridserve-ev-india-pli-july13-19-2026/index.html",
    ogTitle: "Charged | ABB Advantics, GRIDSERVE, India PLI, California EV | GreyRadius | July 13&#8211;19, 2026",
    ogDescription: "Weekly EV and battery intelligence: ABB acquires SiC specialist Advantics, GRIDSERVE UK flagship station, India 10GWh PLI tender, California MyFirstEV rebate.",
  },
  {
    file: "insights/newsletters/charged/afdb-gotion-catl-spain-ev-july20-26-2026/index.html",
    ogTitle: "Charged Issue 007: AfDB ];13.9M Gotion Morocco, CATL 42% Profit Growth and Spain EV Incentives | GreyRadius",
    ogDescription: "African Development Bank approves ];13.9M for Gotion&#8217;s Morocco battery gigafactory, CATL reports 42% first-half profit growth, Spain launches $455.7M Auto+ EV incentive programme. July 20&#8211;26, 2026.",
  },
  {
    file: "insights/newsletters/charged/commercial-ev-electrification-battery-trends-june-2026/index.html",
    ogTitle: "Commercial EV Electrification, Battery Trends and Robotaxi Policy &#8211; Charged June 2026 | GreyRadius",
    ogDescription: "China heavy-truck EV target, GM battery chemistry shift, Uber-Nuro-Lucid robotaxi and UK EV transition &#8211; GreyRadius weekly EV intelligence, June 2026.",
  },
  {
    file: "insights/newsletters/charged/commercial-ev-electrification-july6-12-2026/index.html",
    ogTitle: "Charged | EV Sales, Eviny&#8211;Mer Merger, CATL 8C Battery | GreyRadius EV Intelligence | 6&#8211;12 July 2026",
    ogDescription: "Weekly EV and battery intelligence from GreyRadius: global June EV sales 2 million, Eviny-Mer Northern Europe charging merger, CATL 8C commercial vehicle battery, Grab Vietnam expansion, Delhi 300 electric buses.",
  },
  {
    file: "insights/newsletters/charged/gm-saic-evgo-byd-brazil-ev-aug3-9-2026/index.html",
    ogTitle: "The Charged",
    ogDescription: "GreyRadius Consulting — Gm Saic Evgo Byd Brazil Ev Aug3 9 2026.",
  },
  {
    file: "insights/newsletters/charged/index.html",
    ogTitle: "Charged &#8211; Weekly EV &amp; Battery Intelligence | GreyRadius",
    ogDescription: "Archive of Charged by GreyRadius &#8211; weekly EV and battery intelligence covering commercial electrification, battery technology and mobility policy. Every Thursday.",
  },
  {
    file: "insights/newsletters/charged/nio-xpeng-rivian-renault-byd-ev-jul27-aug2-2026/index.html",
    ogTitle: "The Charged",
    ogDescription: "GreyRadius Consulting — Nio Xpeng Rivian Renault Byd Ev Jul27 Aug2 2026.",
  },
  {
    file: "insights/newsletters/charged/sodium-ion-batteries-v2g-charging-june-2026/index.html",
    ogTitle: "Sodium-Ion Batteries, V2G Charging and EV Market Strategy &#8211; Charged June 2026 | GreyRadius",
    ogDescription: "Tata Motors' FY31 growth plan, CATL's sodium-ion storage launch, Nissan-Valeo and VW-Elli V2G offers, PowerCo's nanotube supplier deal, and Polestar's US restrictions &#8211; GreyRadius weekly EV intelligence, June 2026.",
  },
  {
    file: "insights/newsletters/charged/tesla-byd-q2-ev-deliveries-storage-july-2026/index.html",
    ogTitle: "Charged | Tesla and BYD Q2 deliveries, EV storage, battery trends | GreyRadius EV intelligence | June 29 - July 5, 2026",
    ogDescription: "Weekly EV and battery intelligence from GreyRadius: Tesla 480,000+ Q2 deliveries and 13.5 GWh storage deployment, Rivian raised guidance, BYD 403,472 June NEV sales with record overseas volumes, charging and energy systems signals.",
  },
  {
    file: "insights/newsletters/index.html",
    ogTitle: "GreyRadius Newsletters &#8211; Weekly Market Intelligence",
    ogDescription: "Four weekly newsletters from GreyRadius covering AI adoption, EV markets, data centres, and semiconductors. Expert-led intelligence published every Thursday.",
  },
  {
    file: "insights/newsletters/the-signal/anthropic-eu-gigafactory-scale-ai-meta-blackrock-jul27-aug2-2026/index.html",
    ogTitle: "The Signal",
    ogDescription: "GreyRadius Consulting — Anthropic Eu Gigafactory Scale Ai Meta Blackrock Jul27 Aug2 2026.",
  },
  {
    file: "insights/newsletters/the-signal/enterprise-ai-agentic-chips-july13-19-2026/index.html",
    ogTitle: "The Signal | AI Agents, Chiplets, Gold Eagle | GreyRadius Enterprise AI | July 13&#8211;19, 2026",
    ogDescription: "Weekly enterprise AI intelligence: Shanghai AI cooperation body, Cadence AuraStack, White House GOLD EAGLE cyber, TYLsemi $43M chiplet funding.",
  },
  {
    file: "insights/newsletters/the-signal/enterprise-ai-deployment-compute-financing-july-2026/index.html",
    ogTitle: "The Signal | Enterprise AI deployment, compute financing, sovereign AI | GreyRadius AI intelligence | June 29 - July 5, 2026",
    ogDescription: "Weekly enterprise AI intelligence from GreyRadius: Microsoft $2.5B Frontier Company launch, HCLTech ];.14B AI services deal, NVIDIA compute financing models, UN AI governance panel, Anthropic Claude Sonnet 5 and sovereign AI deployment.",
  },
  {
    file: "insights/newsletters/the-signal/enterprise-ai-gpt56-july6-12-2026/index.html",
    ogTitle: "The Signal | GPT-5.6, ITU AI Governance, Micron $250B | GreyRadius Enterprise AI | July 6&#8211;12, 2026",
    ogDescription: "Weekly enterprise AI intelligence from GreyRadius: OpenAI GPT-5.6 launch, ITU AI agents focus group, Micron $250B US semiconductor commitment, OpenAI GPT-Live real-time voice models.",
  },
  {
    file: "insights/newsletters/the-signal/enterprise-ai-infrastructure-cyber-defense-june-2026/index.html",
    ogTitle: "Enterprise AI Infrastructure and Cyber Defense &#8211; The Signal, June 2026 | GreyRadius",
    ogDescription: "IBM and OpenAI's Daybreak cyber partnership, OpenAI-Broadcom's inference chip, Microsoft's 2 GW Pecos datacenter, NVIDIA's 35 European AI HPC systems, and Oracle Health's platform expansion &#8211; GreyRadius weekly enterprise AI intelligence, June 2026.",
  },
  {
    file: "insights/newsletters/the-signal/index.html",
    ogTitle: "The Signal &#8211; Weekly Enterprise AI Intelligence | GreyRadius",
    ogDescription: "Archive of The Signal by GreyRadius &#8211; weekly enterprise AI intelligence covering adoption, funding, infrastructure and policy across India, Gulf and Southeast Asia. Every Thursday.",
  },
  {
    file: "insights/newsletters/the-signal/india-ai-investment-sovereign-infrastructure-june-2026/index.html",
    ogTitle: "India AI Investment, Sovereign Infrastructure and Enterprise Controls &#8211; The Signal June 2026 | GreyRadius",
    ogDescription: "Sarvam $234M Series B, HUMAIN MoU, China AI IPO policy, OpenAI enterprise controls and G7 frontier AI &#8211; GreyRadius weekly AI intelligence, June 2026.",
  },
  {
    file: "insights/newsletters/the-signal/nvidia-sk-amd-helios-intel-ai-july20-26-2026/index.html",
    ogTitle: "The Signal Issue 006: NVIDIA&#8211;SK Group $500B+, AMD Helios and Intel AI Revenue | GreyRadius",
    ogDescription: "NVIDIA&#8211;SK Group announce $500B+ AI infrastructure partnership, AMD launches Helios rack-scale platform, Intel reports 59% growth in Data Center &amp; AI. July 20&#8211;26, 2026.",
  },
  {
    file: "insights/newsletters/the-signal/openai-astra-amd-microsoft-india-aug3-9-2026/index.html",
    ogTitle: "The Signal",
    ogDescription: "GreyRadius Consulting — Openai Astra Amd Microsoft India Aug3 9 2026.",
  },
  {
    file: "insights/newsletters/the-stack/ai-data-centre-meta-alberta-july6-12-2026/index.html",
    ogTitle: "The Stack | Meta C];3B Alberta, UK Cloud Oversight, MasTec ];.65B | GreyRadius Infrastructure | July 6&#8211;12, 2026",
    ogDescription: "Weekly infrastructure intelligence from GreyRadius: Meta C];3 billion 1GW Alberta AI data centre, UK designates AWS/Microsoft/Google/Oracle as Critical Third Parties, MasTec acquires Superior Group for US];.65 billion.",
  },
  {
    file: "insights/newsletters/the-stack/ai-data-centre-power-investment-consolidation-july-2026/index.html",
    ogTitle: "The Stack | AI data centre power investments: Bloom-Brookfield $25B, Digital Realty, National Grid | GreyRadius | June 29 - July 5, 2026",
    ogDescription: "Weekly AI infrastructure intelligence from GreyRadius: Bloom Energy-Brookfield $25B AI power partnership, Digital Realty $3.5B Northern Virginia hyperscale deal, National Grid ];.75B Joulent stake, Xlinks 1.5GW UK AI campus, European permitting risk.",
  },
  {
    file: "insights/newsletters/the-stack/ai-power-infrastructure-hyperscale-investment-june-2026/index.html",
    ogTitle: "AI Power Infrastructure and Hyperscale Investment &#8211; The Stack, Issue 004 | GreyRadius",
    ogDescription: "Bloom Energy-Brookfield's $25B AI power partnership, Digital Realty's $3.5B Northern Virginia acquisition, National Grid's ];.75B Joulent stake, Xlinks's 1.5GW Devon campus, and a 150MW Germany permitting fight &#8211; GreyRadius weekly infrastructure intelligence, June 29-July 5, 2026.",
  },
  {
    file: "insights/newsletters/the-stack/amazon-schneider-meta-israel-orange-google-jul27-aug2-2026/index.html",
    ogTitle: "The Stack",
    ogDescription: "GreyRadius Consulting — Amazon Schneider Meta Israel Orange Google Jul27 Aug2 2026.",
  },
  {
    file: "insights/newsletters/the-stack/aws-india-hcltech-data-centre-july13-19-2026/index.html",
    ogTitle: "The Stack | AWS India, HCLTech DC, SpaceX Pentagon AI | GreyRadius Infrastructure | July 13&#8211;19, 2026",
    ogDescription: "Weekly infrastructure intelligence: AWS Telangana expansion, STT GDC Jaipur 6MW, HCLTech $364M data centre, SpaceX Pentagon AI compute talks.",
  },
  {
    file: "insights/newsletters/the-stack/hcltech-odisha-digital-realty-google-georgia-july20-26-2026/index.html",
    ogTitle: "The Stack Issue 005: HCLTech Odisha Sovereign AI, Digital Realty Record Backlog and Google Georgia | GreyRadius",
    ogDescription: "HCLTech and Sarvam announce &#8377;142.57B sovereign AI data centre in Odisha, Digital Realty raises 2026 outlook, Google named sole operator of 8M sq ft Georgia campus. July 20&#8211;26, 2026.",
  },
  {
    file: "insights/newsletters/the-stack/index.html",
    ogTitle: "The Stack &#8211; Weekly Data Centre &amp; AI Infrastructure Intelligence | GreyRadius",
    ogDescription: "Archive of The Stack by GreyRadius &#8211; weekly data centre, cloud infrastructure and AI power intelligence covering hyperscale investment, energy partnerships and digital sovereignty. Every Thursday.",
  },
  {
    file: "insights/newsletters/the-stack/indosat-zankore-microsoft-india-coreweve-indonesia-aug3-9-2026/index.html",
    ogTitle: "The Stack",
    ogDescription: "GreyRadius Consulting — Indosat Zankore Microsoft India Coreweve Indonesia Aug3 9 2026.",
  },
  {
    file: "insights/newsletters/the-wafer/global-fabs-osat-ai-memory-investment-june-2026/index.html",
    ogTitle: "Global Fabs, OSAT and AI Memory Investment &#8211; The Wafer, Issue 001 | GreyRadius",
    ogDescription: "CG Semi's OSAT commissioning in Sanand, Infineon's &#8364;5B Dresden Smart Power Fab, Micron-GM's automotive memory agreement, and Samsung/SK Hynix's 800 trillion won AI-chip mega-project &#8211; GreyRadius weekly semiconductor intelligence, June 29-July 5, 2026.",
  },
  {
    file: "insights/newsletters/the-wafer/index.html",
    ogTitle: "The Wafer &#8211; Weekly Semiconductor Intelligence | GreyRadius",
    ogDescription: "Archive of The Wafer by GreyRadius &#8211; weekly semiconductor intelligence covering fabs, OSAT, chip design ecosystems and global supply chain policy. Every Thursday.",
  },
  {
    file: "insights/newsletters/the-wafer/india-osat-europe-fabs-ai-memory-korea-july-2026/index.html",
    ogTitle: "The Wafer | India OSAT, Dresden power fab, Korea AI memory | GreyRadius semiconductor intelligence | June 29 - July 5, 2026",
    ogDescription: "Weekly semiconductor manufacturing intelligence from GreyRadius: CG Semi OSAT commissioned in Sanand, Infineon opens EUR 5B Dresden Smart Power Fab, Micron-GM automotive memory agreement, South Korea 800T won AI-chip and HBM mega-project.",
  },
  {
    file: "insights/newsletters/the-wafer/ionq-samsung-sk-hynix-lam-research-jul27-aug2-2026/index.html",
    ogTitle: "The Wafer",
    ogDescription: "GreyRadius Consulting — Ionq Samsung Sk Hynix Lam Research Jul27 Aug2 2026.",
  },
  {
    file: "insights/newsletters/the-wafer/samsung-broadcom-amkor-nvidia-intel-packaging-july20-26-2026/index.html",
    ogTitle: "The Wafer Issue 004: Samsung&#8211;Broadcom $200B+, Amkor&#8211;NVIDIA ];.5B and Intel Glass Packaging | GreyRadius",
    ogDescription: "Samsung and Broadcom expand strategic collaboration to $200B+ through 2030, Amkor and NVIDIA sign ];.5B advanced-packaging agreement, Intel and Lens Technology collaborate on glass-based packaging. July 20&#8211;26, 2026.",
  },
  {
    file: "insights/newsletters/the-wafer/sk-hynix-micron-july6-12-2026/index.html",
    ogTitle: "The Wafer | SK hynix Nasdaq ADR, Micron $250B, CXMT IPO | GreyRadius Semiconductors | July 6&#8211;12, 2026",
    ogDescription: "Weekly semiconductor intelligence from GreyRadius: SK hynix raises US$26.5B via Nasdaq ADR listing, Micron expands US commitment beyond $250B through 2035, CXMT launches 29.5B yuan STAR Market IPO, Micron-Ford supply agreement.",
  },
  {
    file: "insights/newsletters/the-wafer/skhynix-terafab-samsung-nand-aug3-9-2026/index.html",
    ogTitle: "The Wafer",
    ogDescription: "GreyRadius Consulting — Skhynix Terafab Samsung Nand Aug3 9 2026.",
  },
  {
    file: "insights/newsletters/the-wafer/tsmc-micron-intel-ireland-july13-19-2026/index.html",
    ogTitle: "The Wafer | TSMC $265B US, Micron Automotive, Intel Ireland | GreyRadius Semiconductor | July 13&#8211;19, 2026",
    ogDescription: "Weekly semiconductor intelligence: TSMC raises US investment to $265B, Micron $22B automotive supply deals, Intel €5B Ireland, ASML €43-45B guidance.",
  },
  {
    file: "insights/vision-2030-foreign-companies-market-entry.html",
    ogTitle: "Vision 2030 Saudi Arabia: Which Sectors Foreign Companies Can Access | GreyRadius Consulting",
    ogDescription: "A practical guide to Vision 2030 procurement for foreign companies: ICV scoring, sector accessibility matrix, and realistic procurement timelines across 7 high-value sectors.",
  },
  {
    file: "market-entry/distributor-search-channel-partners.html",
    ogTitle: "Distributor Search &amp; Channel Partner Selection | India, Gulf, SEA | GreyRadius",
    ogDescription: "Find and sign the right distributors - capability-led screening, term negotiation with benchmarks, and governance that keeps partners performing. India, Gulf and Southeast Asia coverage.",
  },
  {
    file: "market-entry/government-b2g-market-entry.html",
    ogTitle: "Government &amp; B2G Market Entry | India and Gulf Public Sector | GreyRadius",
    ogDescription: "Win government business in India and the Gulf - programme mapping, proposal-grade delivery frameworks, consortium design and localisation compliance. Proven on state-scale programmes.",
  },
  {
    file: "market-entry/index.html",
    ogTitle: "Market Entry Consulting | India, Gulf, Southeast Asia, North America | GreyRadius",
    ogDescription: "Decision-stage market entry guides for India, Gulf, Southeast Asia and North America - evidence-led, execution-first consulting with fixed fees.",
  },
  {
    file: "market-entry/india-consumer-fmcg-market-entry.html",
    ogTitle: "India FMCG &amp; Consumer Market Entry Consultants | GreyRadius",
    ogDescription: "Enter India&#x27;s consumer market with distributor-capability-led execution - quick commerce strategy, metro-first rollout, channel economics. First revenue in 90-120 days, proven across CPG mandates.",
  },
  {
    file: "market-entry/india-manufacturing-market-entry.html",
    ogTitle: "India Manufacturing Market Entry Consultants | PLI &amp; Supply Chain Diversification | GreyRadius",
    ogDescription: "Enter Indian manufacturing with a bankable plan - PLI incentive capture, plant siting, acquisition vs greenfield TEV, and execution through to first production. Fixed-fee, 30+ expert interviews per mandate.",
  },
  {
    file: "market-entry/india-technology-saas-market-entry.html",
    ogTitle: "India Technology &amp; SaaS Market Entry | GCC Setup &amp; GTM | GreyRadius",
    ogDescription: "Enter India&#x27;s technology market - enterprise SaaS GTM, pricing localisation, capability center setup and partner ecosystems. Execution-first entries grounded in buyer interviews.",
  },
  {
    file: "market-entry/indonesia-market-entry.html",
    ogTitle: "Indonesia Market Entry Consultants | 270M Consumer Market | GreyRadius",
    ogDescription: "Enter Indonesia with structure - halal certification pathways, local partner architecture, licensing reality and channel economics for the region&#x27;s largest consumer and digital economy.",
  },
  {
    file: "market-entry/market-entry-cost.html",
    ogTitle: "What Market Entry Costs - Honest Breakdown | GreyRadius",
    ogDescription: "What entering India, the Gulf or Southeast Asia actually costs - strategy, entity, compliance, team and channel build, with timelines and the failure costs nobody publishes. Fixed-fee consulting.",
  },
  {
    file: "market-entry/market-entry-via-acquisition.html",
    ogTitle: "Market Entry via Acquisition | Buy vs Build TEV | GreyRadius",
    ogDescription: "Enter markets by buying operating businesses - acquisition TEV, technical and commercial diligence, order-book validation and integration planning. Buy-side discipline for cross-border entries.",
  },
  {
    file: "market-entry/north-america-entry-for-india-asia-companies.html",
    ogTitle: "US &amp; North America Market Entry for Indian and Asian Companies | GreyRadius",
    ogDescription: "Enter the US and Canada from India or Asia - vertical prioritisation, buyer-interview-led GTM, pricing for enterprise credibility and execution support. Proven on technology and healthcare entries.",
  },
  {
    file: "market-entry/saudi-arabia-market-entry.html",
    ogTitle: "Saudi Arabia Market Entry Consultants | Vision 2030 &amp; RHQ | GreyRadius",
    ogDescription: "Enter Saudi Arabia with structure - Vision 2030 programme mapping, RHQ compliance, localisation scoring, national champion partnerships and execution from our Gulf base.",
  },
  {
    file: "market-entry/southeast-asia-manufacturing-entry.html",
    ogTitle: "Southeast Asia Manufacturing Entry | Vietnam, Malaysia, Thailand | GreyRadius",
    ogDescription: "Site and enter Southeast Asian manufacturing - Vietnam, Malaysia, Thailand, Indonesia contested honestly on labour, incentives, supplier depth and execution reality. From our Singapore office.",
  },
  {
    file: "market-entry/uae-market-entry.html",
    ogTitle: "UAE Market Entry Consultants | Strategy Before Setup | GreyRadius",
    ogDescription: "Enter the UAE with demand validated before the licence is printed - free zone vs mainland structuring, distributor architecture, field research depth and GTM execution from our Dubai office.",
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
