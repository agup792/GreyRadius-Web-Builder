# Replit prompt - APAC-India Group 2 (4 landing pages + 1 insight article)

I am attaching apac_india_group2.json. Build exactly from the JSON, using the IDENTICAL template, section order and styling you used for Group 1 (the three /market-entry/ India pages and two insight articles you just built). Use hyphens, never em dashes. No client, consulting firm or lender names.

## TASK 1 - Four landing pages (type "landing")

Same 11-section order as Group 1: hero (kicker "Market Entry - India", dual CTA to /business-diagnostic.html and /contact.html) > who this is for > why now > inline CTA band > the SAME shared 6-phase framework block used in Group 1 (copy it from the Group 1 pages; each page's method_intro renders as the italic lead line) > the SAME 3-tier engagement cards > regulatory highlight box > proof cards (preserve the phrase "engagement snapshot" wherever it appears) > transparency box > 5-question FAQ with FAQPage JSON-LD > closing dual CTA. Head: meta_title, meta_description, canonical, og tags, Service + FAQPage JSON-LD.

## TASK 2 - One insight article (type "insight")

Same article template as the Group 1 insights: h1, tag chips, sections as h2+body, CTA band from cta_line, 2-item FAQ with FAQPage JSON-LD, Article JSON-LD in head.

## TASK 3 - Integration

1. Add all 5 URLs to sitemap.xml.
2. Add the 4 landing pages to the "India entry - by origin and by decision" group on /market-entry/index.html.
3. Add the article to the /insights/ listing.
4. Cross-links: Japan, Korea and Singapore corridor pages link each other in a "Other corridors" row; both sector playbooks (beauty, edtech) link /market-entry/india-distribution-partner-development.html and their corridor pages; the duty/GST article links /market-entry/india-entry-route-options.html inline and the BIS article in a "Related" row.
5. hreflang readiness: on the Japan and Korea corridor pages ONLY, add a self-referencing hreflang link tag (rel alternate, hreflang en, href = the page's canonical URL). Do not create ja/ko pages yet - this reserves the structure for language variants later.
6. Do not touch main navigation.

## VERIFICATION - paste output

ls market-entry/india-market-entry-for-korean-companies.html market-entry/india-market-entry-for-singapore-companies.html market-entry/india-entry-beauty-personal-care-brands.html market-entry/india-entry-edtech-stem-education.html insights/import-duty-gst-india-new-entrants.html
grep -c "korean-companies\|singapore-companies\|beauty-personal-care-brands\|edtech-stem-education\|import-duty-gst-india" sitemap.xml   (expect 5)
grep -rn "Cactus\|Ventuno\|Artec\|CRIF\|NITCON\|Secant\|IREDA\|Pearson" market-entry/india-market-entry-for-korean-companies.html market-entry/india-market-entry-for-singapore-companies.html market-entry/india-entry-beauty-personal-care-brands.html market-entry/india-entry-edtech-stem-education.html insights/import-duty-gst-india-new-entrants.html   (expect nothing)
grep -c "hreflang" market-entry/india-market-entry-for-japanese-companies.html market-entry/india-market-entry-for-korean-companies.html   (expect 1 each)
grep -c "Business assessment" market-entry/india-market-entry-for-korean-companies.html   (expect 1 or more - shared framework present)
grep -L "business-diagnostic.html" market-entry/india-*.html market-entry/india-entry-*.html   (expect empty)
No em dashes anywhere in the 5 new files.
