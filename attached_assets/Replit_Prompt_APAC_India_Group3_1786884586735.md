# Replit prompt - APAC-India Group 3 (3 landing pages + 2 insight articles)

I am attaching apac_india_group3.json. Build exactly from the JSON using the IDENTICAL template, section order and styling as Groups 1 and 2. Use hyphens, never em dashes. No client, consulting firm or lender names.

## TASK 1 - Three landing pages (type "landing")

Same 11-section order as Groups 1-2, reusing the SAME shared 6-phase framework block and 3-tier engagement cards from the earlier pages (each page's method_intro as the italic lead line). Preserve the phrase "engagement snapshot" wherever it appears in proof cards. Head: meta_title, meta_description, canonical, og tags, Service + FAQPage JSON-LD.

## TASK 2 - Two insight articles (type "insight")

Same article template as the earlier insights: h1, tag chips, h2+body sections, CTA band from cta_line, 2-item FAQ with FAQPage JSON-LD, Article JSON-LD in head.

## TASK 3 - Integration (completes the corridor architecture)

1. Add all 5 URLs to sitemap.xml.
2. /market-entry/india-market-entry-for-apac-companies.html is the CORRIDOR HUB: give it an additional "Choose your corridor" card row linking the Japan, Korea and Singapore pages, and a "Sector playbooks" row linking beauty, edtech, F&B and industrial-medical pages.
3. On the Japan, Korea and Singapore corridor pages, add the APAC hub to their "Other corridors" row.
4. Add the two new sector playbooks (F&B, industrial-medical) to the "India entry - by origin and by decision" group on /market-entry/index.html, plus the APAC hub as its lead card.
5. Add both articles to the /insights/ listing. The FDI article links /market-entry/india-entry-route-options.html inline (as its cta suggests); the Japanese-Korean brands article links the Japan and Korea corridor pages inline.
6. Do not touch main navigation.

## VERIFICATION - paste output

ls market-entry/india-market-entry-for-apac-companies.html market-entry/india-entry-food-beverage-brands.html market-entry/india-entry-industrial-medical-equipment.html insights/fdi-routes-india-explained.html insights/how-japanese-korean-brands-win-india.html
grep -c "apac-companies\|food-beverage-brands\|industrial-medical-equipment\|fdi-routes-india\|japanese-korean-brands-win" sitemap.xml   (expect 5)
grep -rn "Cactus\|Ventuno\|Artec\|CRIF\|NITCON\|Secant\|IREDA\|Pearson" market-entry/india-market-entry-for-apac-companies.html market-entry/india-entry-food-beverage-brands.html market-entry/india-entry-industrial-medical-equipment.html insights/fdi-routes-india-explained.html insights/how-japanese-korean-brands-win-india.html   (expect nothing)
grep -c "Choose your corridor" market-entry/india-market-entry-for-apac-companies.html   (expect 1)
grep -L "business-diagnostic.html" market-entry/india-market-entry-for-apac-companies.html market-entry/india-entry-food-beverage-brands.html market-entry/india-entry-industrial-medical-equipment.html   (expect empty)
No em dashes anywhere in the 5 new files.

FINAL CORRIDOR CHECK (after this group, the full 15-page India corridor is live):
ls market-entry/ | wc -l   (expect 28: 13 original series + 15 corridor additions... adjust if hub counts differ - paste the actual listing)
