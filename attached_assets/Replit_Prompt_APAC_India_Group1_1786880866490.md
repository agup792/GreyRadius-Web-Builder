# Replit prompt - APAC-India Group 1 (3 landing pages + 2 insight articles)

I am attaching apac_india_group1.json with complete content. Build exactly from the JSON. Use hyphens, never em dashes. No client, consulting firm or lender names anywhere (verification below enforces this).

## TASK 1 - Three landing pages (type "landing")

Create each at its "path", using the same template and styling as the existing /market-entry/ pages. Section order:

1. HERO: kicker "Market Entry - India", h1, sub, 3 stat pills, dual CTA - primary "Get a free expert assessment" -> /business-diagnostic.html, secondary "Talk to a partner" -> /contact.html.
2. WHO THIS IS FOR: 3 cards from who_this_is_for.
3. WHY NOW: heading from why_now.heading, points as styled cards or list.
4. INLINE CTA BAND: "30 minutes with a partner beats 30 tabs of research." + primary CTA.
5. FRAMEWORK: render the shared top-level shared_framework as a numbered 6-step block (heading from its heading field), preceded by the page's method_intro as an italic lead line.
6. TIERS: render shared_tiers as 3 cards (name, duration, text) under its heading.
7. REGULATORY: heading and text from the page's regulatory object, in a highlighted box.
8. PROOF: heading "Engagement experience - anonymised", cards from proof (tag label + text). Note: cards tagged "engagement snapshot" must keep that phrase - they are live engagements without results claims.
9. TRANSPARENCY: heading "What it costs and how long it takes", transparency text in a highlight box.
10. FAQ: 5 Q&As + matching FAQPage JSON-LD.
11. CLOSING CTA: heading "Ready to plan the India entry properly?", both CTAs.

Head per page: meta_title, meta_description, canonical (base + path), og tags, Service JSON-LD + the FAQPage JSON-LD.

## TASK 2 - Two insight articles (type "insight")

Create each at its "path" using the existing /insights/ article template (same as other insight pages). Structure: h1, tag chips from tags, then each sections entry as h2 + body paragraphs, then a CTA band using cta_line with the primary CTA button, then the 2-item FAQ with FAQPage JSON-LD. Head: meta_title, meta_description, canonical, og tags, Article JSON-LD (publisher GreyRadius Consulting, datePublished today).

## TASK 3 - Integration

1. Add all 5 URLs to sitemap.xml.
2. Add the 3 landing pages to /market-entry/index.html card grid (new group heading "India entry - by origin and by decision").
3. Add the 2 articles to the /insights/ listing page following its card pattern.
4. Cross-links: from /market-entry/india-market-entry-for-japanese-companies.html link the distribution-partner and route-options pages in a "Continue" row (and vice versa among the three). From both insight articles the CTA band links /business-diagnostic.html; add one inline text link each to /market-entry/india-distribution-partner-development.html.
5. On /insights/how-to-enter-india-market.html add one contextual link to /market-entry/india-entry-route-options.html.
6. Do not touch main navigation.

## VERIFICATION - paste output

ls market-entry/india-market-entry-for-japanese-companies.html market-entry/india-distribution-partner-development.html market-entry/india-entry-route-options.html insights/bis-certification-india-foreign-products.html insights/india-distributor-margins-economics-benchmarks.html
grep -c "group1\|india-market-entry-for-japanese\|india-distribution-partner-development\|india-entry-route-options\|bis-certification-india\|india-distributor-margins" sitemap.xml   (expect 5)
grep -rn "Cactus\|Ventuno\|Artec\|CRIF\|NITCON\|Secant\|IREDA\|Pearson" market-entry/ insights/bis-certification-india-foreign-products.html insights/india-distributor-margins-economics-benchmarks.html   (expect nothing)
grep -c "engagement snapshot" market-entry/india-market-entry-for-japanese-companies.html   (expect 2 or more)
grep -L "business-diagnostic.html" market-entry/india-*.html   (expect empty)
No em dashes anywhere in the 5 new files.
