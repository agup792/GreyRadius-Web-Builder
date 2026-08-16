# Final pass - SEO, site-wide linking, CTA and interlink audit for the /market-entry/ series

Run this AFTER Groups 1, 2 and 3 are deployed. Scope: every page under /market-entry/ (the original 12 + hub + the 15 India-corridor additions) and the 5 new India insight articles. Use hyphens, never em dashes. Paste verification output per task.

## TASK 1 - SEO keyword enablement audit

For every page in scope, verify and fix:
1. Title tag under 60 characters where possible, leading with the page's primary keyword phrase (the h1's core query - e.g. "India Market Entry for Japanese Companies", "How to Enter the Indian Market", "Sell Beauty Products in India"). Meta description 140-160 characters containing the primary keyword naturally.
2. Exactly one h1 per page; h2s phrased as question or keyword variants where the JSON content allows (do not rewrite body copy - only heading tags if any section headings were flattened to styled divs; convert them to proper h2/h3).
3. Every page has: canonical tag, og:title/description/url, and BOTH Service and FAQPage JSON-LD (Article JSON-LD for the 5 insight pages instead of Service). Report any page missing any element, then fix.
4. Add an image alt attribute to every img on these pages that lacks one, describing the image with the page topic (e.g. "India market entry roadmap for Japanese companies").
5. Add a BreadcrumbList JSON-LD to every /market-entry/ page: Home > Market Entry > [page h1].

## TASK 2 - Site-wide presence (link these pages FROM the rest of the site)

Make each edit in the named file only:
1. services/market-entry-execution.html: ensure the "Market entry guides" row links /market-entry/ hub, the APAC corridor hub, india-distribution-partner-development, and market-entry-cost.
2. index.html (homepage): in the sectors or services area, add ONE text link "India market entry guides" pointing to /market-entry/india-market-entry-for-apac-companies.html. No other homepage changes.
3. industries/education-and-edtech.html: link /market-entry/india-entry-edtech-stem-education.html in its coverage grid.
4. industries/cpg-fmcg-retail.html: link /market-entry/india-entry-food-beverage-brands.html and /market-entry/india-consumer-fmcg-market-entry.html in a "Guides" row.
5. industries/industrials-manufacturing-and-infrastructure.html: link /market-entry/india-manufacturing-market-entry.html and /market-entry/india-entry-industrial-medical-equipment.html.
6. insights/how-to-enter-india-market.html: ensure links exist to india-entry-route-options and the APAC corridor hub.
7. Footer: in the Company or Offerings column of the MAIN templates only (homepage, service pages, sector hubs - NOT the 490+ programmatic industry pages), add one link "Market entry guides" pointing to /market-entry/.

## TASK 3 - CTA coverage

Every page in scope must contain, at minimum: the primary CTA button "Get a free expert assessment" linking /business-diagnostic.html appearing at least twice (hero/top and closing), and one "Talk to a partner" linking /contact.html. For the 5 insight articles: at least one CTA band with the primary button. Report any page below this threshold, then fix by adding the standard CTA band before the final section.

## TASK 4 - Corridor interlinking (every page links its neighbours)

Ensure these link rows exist (add where missing, following the existing "Continue" / "Other corridors" pattern):
1. Corridor pages (Japan, Korea, Singapore, APAC hub): each links the other three + india-distribution-partner-development + india-entry-route-options.
2. Sector playbooks: beauty links Japan + Korea corridors, distribution-partner page, and the distributor-margins article; edtech links Japan corridor, distribution-partner page, and the BIS article; F&B links Korea + APAC hub, distribution-partner page, and the import-duty-gst article; industrial-medical links Japan + APAC hub, distribution-partner page, and the BIS article.
3. The 5 insight articles each link at least 2 /market-entry/ pages inline or in a Related row: BIS article links edtech playbook + Japan corridor; distributor-margins links distribution-partner + india-consumer-fmcg; import-duty-gst links route-options + F&B playbook; FDI-routes links route-options + APAC hub; japanese-korean-brands links Japan + Korea corridors.
4. india-market-entry-cost and india-entry-route-options: each links the APAC hub and the distribution-partner page.
5. /market-entry/index.html: contains every page in the series exactly once, grouped: "By market and motive" (original 12) and "India entry - by origin and by decision" (corridor 15).

## VERIFICATION - paste all output

1. for f in market-entry/*.html; do echo "$f: $(grep -c 'business-diagnostic.html' $f)"; done   (every count at least 2; index.html may be 1)
2. grep -L "BreadcrumbList" market-entry/*.html   (expect empty)
3. grep -L "FAQPage" market-entry/india-*.html market-entry/india-entry-*.html   (expect empty)
4. grep -c "market-entry/" index.html services/market-entry-execution.html industries/cpg-fmcg-retail.html industries/education-and-edtech.html industries/industrials-manufacturing-and-infrastructure.html   (each at least 1)
5. Orphan check: for every /market-entry/ page, confirm at least 2 other pages in scope link to it - list any page with fewer than 2 inbound links, then fix by adding it to relevant Related rows.
6. grep -rn "Cactus\|Ventuno\|Artec\|CRIF\|NITCON\|Secant\|IREDA" market-entry/   (expect nothing)
7. Confirm no em dashes were introduced anywhere.

## RULES
- Do not rewrite body copy - this is a structural pass: tags, links, schema, CTAs.
- Do not touch the 490+ programmatic industry subdirectory pages.
- Canonical domain https://greyradius.com everywhere; sales@greyradius.com only.
