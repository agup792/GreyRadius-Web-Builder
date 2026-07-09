# GreyRadius - final deployment prompt (SEO fixes + redirects)

You are working on the GreyRadius static HTML site. Execute every task below in order. Paste the verification output for each task before moving to the next. Do not touch anything not listed here.

---

## TASK 1 - Fix broken internal link

Run: grep -rl "pitchbook-investor-interviews" .
Remove or repoint every link to /insights/pitchbook-investor-interviews.html (the page does not exist). Point them to /insights/ unless a better target is obvious from context.

Verify: grep -rl "pitchbook-investor-interviews" . returns nothing.

---

## TASK 2 - Create 90 redirect stub pages

Replit static hosting cannot serve real 301s. Create stub pages at each OLD path below that Google treats as permanent redirects.

File placement rule: every old path becomes a directory index file.
  /contact/  ->  create /contact/index.html
  /business-planning-consulting  (no trailing slash)  ->  create /business-planning-consulting/index.html
  /blogs/retail-product-launch-strategies/feed/  ->  create /blogs/retail-product-launch-strategies/feed/index.html

Stub template - use EXACTLY this, replacing {TARGET} with the full target URL:

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Page moved - GreyRadius Consulting</title>
<meta http-equiv="refresh" content="0;url={TARGET}">
<link rel="canonical" href="{TARGET}">
<meta name="robots" content="noindex">
</head>
<body>
<p>This page has moved. If you are not redirected automatically, visit <a href="{TARGET}">{TARGET}</a>.</p>
</body>
</html>

REDIRECT LIST (old path -> target URL):

/case-studies/how-greyradius-helped-a-saas-company-bridge-the-gap-between-strategy-and-execution/  ->  https://greyradius.com/case-studies/saas-execution-first-gtm.html
/blogs/growth-strategy-consulting-saturated-markets/  ->  https://greyradius.com/insights/winning-in-saturated-markets.html
/case-studies/how-greyradius-designed-a-data-driven-retail-market-entry-strategy-for-a-new-consumer-brand/  ->  https://greyradius.com/case-studies/retail-market-entry.html
/product-market-fit-assessment/  ->  https://greyradius.com/services/opportunity-assessment.html
/case-studies/how-greyradius-designed-and-executed-a-go-to-market-strategy-for-a-drone-startup/  ->  https://greyradius.com/case-studies/drone-startup-gtm.html
/blogs/bridging-the-productivity-gap-in-msmes-a-practical-execution-first-framework/  ->  https://greyradius.com/insights/msme-execution-systems-productivity.html
/strategy-growth-and-transformation/data-driven-gtm-acceleration-how-greyradius-enabled-strategic-market-expansion-for-a-leading-fintech/  ->  https://greyradius.com/case-studies/
/business-launch-consulting/  ->  https://greyradius.com/services/market-entry-execution.html
/go-to-market-consulting/  ->  https://greyradius.com/services/gtm-execution-as-a-service.html
/business-valuation-services/  ->  https://greyradius.com/services/pitchbook-and-fundraising.html
/blogs/business-management-consultant-cost-transformation/  ->  https://greyradius.com/insights/cost-transformation-not-cost-cutting.html
/blogs/business-management-consultants-benefits/  ->  https://greyradius.com/insights/consultants-vs-inhouse-strategy-team.html
/category/case-studies/  ->  https://greyradius.com/case-studies/
/business-valuation-fundraising-consulting/  ->  https://greyradius.com/services/pitchbook-and-fundraising.html
/case-studies/how-greyradius-enabled-a-saas-startup-to-find-product-market-fit-in-a-competitive-landscape/  ->  https://greyradius.com/case-studies/saas-product-market-fit.html
/market-opportunity-assessment-services/  ->  https://greyradius.com/services/opportunity-assessment.html
/blogs/go-to-market-agency-ai-strategy/  ->  https://greyradius.com/insights/ai-hype-to-business-results.html
/contact/  ->  https://greyradius.com/contact.html
/blogs/edtech-market-intelligence/  ->  https://greyradius.com/insights/elearning-retention-gtm-strategy.html
/category/business-planning-and-launch/  ->  https://greyradius.com/services/
/business-planning-consulting/  ->  https://greyradius.com/services/feasibility-and-tev.html
/our-vision/  ->  https://greyradius.com/about/why-greyradius.html
/product-development-consulting/  ->  https://greyradius.com/services/
/case-studies/project-to-build-a-plastic-recycling-operation-in-the-uae/  ->  https://greyradius.com/case-studies/ewaste-recycling-startup.html
/blogs/product-led-growth-vs-sales-led-growth-which-go-to-market-strategy-will-dominate-in-2026/  ->  https://greyradius.com/insights/plg-vs-slg-which-gtm-model-fits.html
/testimonials/  ->  https://greyradius.com/case-studies/
/strategy-growth-and-transformation/data‑driven-gtm-acceleration-how-greyradius-enabled-strategic-market-expansion-for-a-leading-fintech/  ->  https://greyradius.com/case-studies/
/case-studies/how-greyradius-consulting-designed-a-competitive-market-entry-strategy-for-eye-care-pharmaceuticals/  ->  https://greyradius.com/case-studies/eye-care-pharma-market-entry.html
/blogs/building-resilient-go-to-market-strategies-amidst-market-uncertainty-with-greyradius-consulting/  ->  https://greyradius.com/insights/market-expansion-strategy-failures.html
/market-entry-consulting/  ->  https://greyradius.com/services/market-entry-execution.html
/about/team/  ->  https://greyradius.com/about/team.html
/category/blogs/  ->  https://greyradius.com/insights/
/our-team/  ->  https://greyradius.com/about/team.html
/blogs/entering-the-gcc-renewable-energy-market-opportunities-regulations-and-risk-mitigation-strategies/  ->  https://greyradius.com/insights/gcc-renewable-energy-market-entry.html
/blogs/retail-product-launch-strategies/  ->  https://greyradius.com/insights/retail-expansion-market-understanding.html
/blogs/why-defining-the-right-benchmark-shapes-better-decisions-standard-of-care-soc/  ->  https://greyradius.com/insights/standard-of-care-benchmarking-healthcare.html
/business-model-design-consulting/  ->  https://greyradius.com/services/feasibility-and-tev.html
/strategy-growth-transformation-consulting/  ->  https://greyradius.com/services/
/product-launch-consulting/  ->  https://greyradius.com/services/gtm-execution-as-a-service.html
/blogs/  ->  https://greyradius.com/insights/
/blogs/retail-market-entry-strategy/  ->  https://greyradius.com/insights/retail-expansion-market-understanding.html
/blogs/business-setup-operational-execution-for-drone-companies-in-india-a-complete-guide-by-greyradius-consulting/  ->  https://greyradius.com/insights/india-drone-sector-market-entry.html
/blogs/how-to-build-a-market-entry-strategy-for-saas-companies-that-drives-sustainable-growth/  ->  https://greyradius.com/insights/saas-international-expansion-model.html
/investor-pitch-deck-services/  ->  https://greyradius.com/services/pitchbook-and-fundraising.html
/strategy-growth-and-transformation/scaling-enterprise-integration-how-greyradius-built-a-north-american-gtm-strategy-for-trintera/  ->  https://greyradius.com/case-studies/trinetra-gtm.html
/case-studies/case-study-nativfresh/  ->  https://greyradius.com/case-studies/nativfresh-cpg-gtm.html
/blogs/resilient-supply-chain-management-consulting/  ->  https://greyradius.com/insights/supply-chain-resilience-board-strategy.html
/category/case-studies/page/2/  ->  https://greyradius.com/case-studies/
/case-studies/market-entry-strategy-for-a-us-hospital-chain-expanding-into-canada/  ->  https://greyradius.com/case-studies/hospital-chain-canada.html
/strategy-growth-and-transformation/healing-experience-boosting-performance-how-greyradius-drove-50-point-nps-gains-and-20-sales-uplift-for-a-leading-hospital-network/  ->  https://greyradius.com/case-studies/
/case-studies/structuring-oncology-clinical-trial-abstracts-into-reliable-analysis-ready-evidence/  ->  https://greyradius.com/case-studies/oncology-abstracts.html
/case-studies/how-greyradius-designed-a-market-entry-strategy-for-a-uae-based-e-learning-platforms-gcc-expansion/  ->  https://greyradius.com/case-studies/elearning-gcc-expansion.html
/case-studies/greenfield-project-to-help-in-establishing-an-e-waste-recycling-ecosystem-for-an-india-firm/  ->  https://greyradius.com/case-studies/ewaste-recycling-startup.html
/case-studies/how-greyradius-transformed-coal-mining-material-handling-through-enclosed-transport-solutions/  ->  https://greyradius.com/case-studies/coal-mining-enclosed-transport.html
/case-studies/retail-market-entry-strategy/  ->  https://greyradius.com/case-studies/retail-market-entry.html
/retail-market-entry-strategy/retail-market-entry-strategy/  ->  https://greyradius.com/insights/retail-expansion-market-understanding.html
/case-studies/transforming-citizen-experience-for-a-uae-government-housing-authority/  ->  https://greyradius.com/case-studies/uae-government-housing-cx.html
/blogs/digital-and-ai-transformation-in-healthcare-what-health-systems-can-do-and-learn-from-other-industries/feed/  ->  https://greyradius.com/insights/healthcare-ai-operational-readiness.html
/case-studies/business-feasibility-market-entry-strategy-for-the-european-eye-drop-market/  ->  https://greyradius.com/case-studies/ophthalmology-pharma-gcc-market-entry.html
/how-to-make-better-business-decisions/  ->  https://greyradius.com/insights/
/how-gcc-region-companies-can-overcome-international-marketing-challenges-with-gap-analysis/  ->  https://greyradius.com/insights/gulf-market-entry-mistakes.html
/blogs/from-volume-to-value-how-hospital-business-models-are-transforming/  ->  https://greyradius.com/insights/healthcare-ai-operational-readiness.html
/customer-journey-mapping-services/  ->  https://greyradius.com/services/
/blogs/essential-market-entry-strategies-for-cxos/  ->  https://greyradius.com/insights/market-expansion-strategy-failures.html
/blogs/identifying-high-growth-opportunities-in-the-uaes-consumer-goods-market/  ->  https://greyradius.com/insights/uae-consumer-goods-market-entry.html
/case-studies/international-expansion-strategy-in-south-east-asia-how-an-alloy-ferro-metals-player-choose-the-right-market/  ->  https://greyradius.com/case-studies/alloy-ferro-metals-sea-expansion.html
/category/strategy-growth-and-transformation/  ->  https://greyradius.com/services/
/category/cx-journey-and-enhancement/  ->  https://greyradius.com/case-studies/
/blogs/do-you-need-management-consultants/  ->  https://greyradius.com/insights/consultants-vs-inhouse-strategy-team.html
/fundraising-consulting/  ->  https://greyradius.com/services/pitchbook-and-fundraising.html
/case-studies/transforming-citizen-experience-for-a-uae-government-housing-authority/feed/  ->  https://greyradius.com/case-studies/uae-government-housing-cx.html
/terms-and-conditions/  ->  https://greyradius.com/legal/terms.html
/blogs/retail-market-entry-strategy/feed/  ->  https://greyradius.com/insights/retail-expansion-market-understanding.html
/blogs/digital-and-ai-transformation-in-healthcare-what-health-systems-can-do-and-learn-from-other-industries/  ->  https://greyradius.com/insights/healthcare-ai-operational-readiness.html
/privacy-policy-2/  ->  https://greyradius.com/legal/privacy.html
/cx-journey-and-enhancement/transforming-housing-experience-how-greyradius-drove-90-customer-happiness-with-ai-driven-contractor-transparency/  ->  https://greyradius.com/case-studies/uae-government-housing-cx.html
/business-planning-and-launch/  ->  https://greyradius.com/services/
/blogs/entering-the-gcc-renewable-energy-market-opportunities-regulations-and-risk-mitigation-strategies/feed/  ->  https://greyradius.com/insights/gcc-renewable-energy-market-entry.html
/case-studies/how-greyradius-enabled-a-saas-startup-to-find-product-market-fit-in-a-competitive-landscape/feed/  ->  https://greyradius.com/case-studies/saas-product-market-fit.html
/blogs/why-and-how-customer-experiments-and-journey-assessment-drive-growth-in-technology-and-software-companies/  ->  https://greyradius.com/insights/saas-growth-customer-intelligence.html
/blogs/go-to-market-strategy-for-e-learning-companies-scaling-growth-in-a-competitive-market/  ->  https://greyradius.com/insights/elearning-retention-gtm-strategy.html
/strategy-growth-and-transformation/unlocking-innovation-in-steel-construction-how-greyradius-delivered-5x-faster-market-insights-and-saved-6000-work-hours/  ->  https://greyradius.com/case-studies/
/business-model-design-consulting  ->  https://greyradius.com/services/feasibility-and-tev.html
/business-planning-consulting  ->  https://greyradius.com/services/feasibility-and-tev.html
/strategy-growth-and-transformation/accelerating-gcc-expansion-how-greyradius-delivered-a-data‑driven-gtm-strategy-for-a-uae-fintech-leader/  ->  https://greyradius.com/case-studies/
/business-planning-and-launch/from-zero-to-drone-powerhouse-how-greyradius-launched-a-multi‑stream-uav-business-in-under-12-months/  ->  https://greyradius.com/case-studies/drone-startup-gtm.html
/blogs/redesigning-business-models-for-a-post-ai-economy/  ->  https://greyradius.com/insights/ai-hype-to-business-results.html
/cx-journey-and-enhancement/transforming-housing-experience-how-greyradius-drove-90-customer-happiness-with-ai-driven-contractor-transparency/feed/  ->  https://greyradius.com/case-studies/uae-government-housing-cx.html
/blogs/from-volume-to-value-how-hospital-business-models-are-transforming/feed/  ->  https://greyradius.com/insights/healthcare-ai-operational-readiness.html
/blogs/essential-market-entry-strategies-for-cxos/feed/  ->  https://greyradius.com/insights/market-expansion-strategy-failures.html

Rules:
- Do NOT add any stub URL to sitemap.xml.
- Do NOT create stubs for anything else (wp-content, feeds not listed above, wildcard URLs must keep returning 404).
- Where a target page does not exist yet, flag it instead of creating the stub.

Verify:
grep -rl 'http-equiv="refresh"' . | wc -l   (expect 90)
grep -rL "noindex" $(grep -rl 'http-equiv="refresh"' .) | wc -l   (expect 0)
grep -c "refresh" sitemap.xml   (expect 0)

---

## TASK 3 - Deduplicate case-study slugs

These pairs appear to be the same case study under two slugs. For each pair, KEEP the first slug, and convert the second file into a redirect stub (same template as Task 2) pointing to the first. Update every internal link pointing at the removed slug. Remove the removed slug from sitemap.xml.

CONFIRMED duplicates - execute directly:
  KEEP /case-studies/drone-startup-gtm.html          STUB /case-studies/drone-startup-gtm-execution.html
  KEEP /case-studies/saas-product-market-fit.html    STUB /case-studies/b2b-saas-product-market-fit.html
  KEEP /case-studies/hospital-chain-canada.html      STUB /case-studies/us-hospital-chain-canada-market-entry.html
  KEEP /case-studies/oncology-abstracts.html         STUB /case-studies/oncology-clinical-trial-intelligence.html
  KEEP /case-studies/elearning-gcc-expansion.html    STUB /case-studies/edtech-gcc-market-entry.html
  KEEP /case-studies/alloy-ferro-metals-sea-expansion.html  STUB /case-studies/alloy-metals-sea-expansion.html
  KEEP /case-studies/trinetra-gtm.html               STUB /case-studies/enterprise-integration-gtm-north-america.html
  KEEP /case-studies/agri-chemical-gtm.html          STUB /case-studies/agri-chemical-commercialisation.html

VERIFY-FIRST pairs - diff the two files. If they describe the same client engagement, apply the same keep/stub pattern; if they are genuinely different projects, leave both and report:
  /case-studies/eye-care-pharma-market-entry.html  vs  /case-studies/ophthalmology-pharma-gcc-market-entry.html
  /case-studies/retail-market-entry.html           vs  /case-studies/uae-retail-market-entry.html
  /case-studies/nativfresh-cpg-gtm.html            vs  /case-studies/fresh-foods-cpg-bengaluru-gtm.html
  /case-studies/coal-mining-enclosed-transport.html vs /case-studies/coal-mining-conveyor-feasibility.html

Verify: for each stubbed slug: grep -rl "the-removed-slug" . returns only the stub file itself and nothing in sitemap.xml.

---

## TASK 4 - Reconcile sitemap.xml against actual files

Run: find industries -name "*.html" | wc -l   and   grep -c "industries" sitemap.xml
Every industry page file must have exactly one sitemap entry with base https://greyradius.com. Add missing entries, remove entries with no file. Report the before/after counts.

Also confirm: no Replit URLs anywhere in sitemap.xml, and every canonical tag on hub pages matches its sitemap URL exactly (including trailing slash).

---

## TASK 5 - Outstanding pre-launch fixes (previously reported, still open)

1. /about/index.html - canonical must be https://greyradius.com/about/ (currently points to homepage).
2. /about/index.html - fix nav links (currently /about/services/, /about/industries/, /about/about/ - must be root-relative /services/, /industries/, /about/).
3. /industries/index.html - canonical must be https://greyradius.com/industries/
4. /insights/index.html - canonical must be https://greyradius.com/insights/
5. Homepage stat block - replace old stats (20+ years, 1M+ hours) with: 200+ projects | 30+ expert interviews per mandate | 4 offices | 9 years of practice

Verify:
grep "canonical" about/index.html industries/index.html insights/index.html
grep -o "/about/services/\|/about/industries/\|/about/about/" about/index.html | wc -l   (expect 0)
grep -o "200+ projects" index.html

---

## TASK 6 - Batch 26 deployment

Execute the build prompt in Section 2 of GreyRadius_Batch26_Build.docx (40 new industry pages, 14 new parent directories, JSON in Section 3 / batch26_full.json). Run its verification commands and paste output. Append the 40 URLs to sitemap.xml as part of Task 4's final state.

---

## GLOBAL RULES (apply to every task)
- Canonical domain: https://greyradius.com - never a Replit URL in any canonical, OG tag or sitemap entry.
- Contact email anywhere: sales@greyradius.com only.
- Service names: Opportunity Assessment, Feasibility & TEV, Market Entry Execution, GTM Execution-as-a-Service, Pitchbook & Fundraising, AI Consulting & Transformation - exact match, no variants.
- Do not edit shared-looking templates blind - each directory has separate templates. Name the exact file you change.

FINAL CHECK - run after all tasks:
grep -rl "replit.dev" . --include="*.html" | wc -l   (expect 0)
grep -rl "hello@greyradius.com" . --include="*.html" | wc -l   (expect 0)
