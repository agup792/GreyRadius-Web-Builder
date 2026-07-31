# Replit prompt - build 12 market entry landing pages

I am attaching market_entry_pages.json containing complete content for 12 conversion-focused landing pages. Build them exactly from the JSON. Use hyphens, never em dashes. No client, lender or consulting firm names anywhere.

## TASK 1 - Create the pages

Create directory /market-entry/ and one HTML page per JSON entry at its "path". Use the site's standard header, navigation and footer. Page body follows this section order, styled consistently with the service pages:

1. HERO: kicker "Market Entry", h1, sub paragraph, 3 stat pills, dual CTA - primary button "Get a free expert assessment" linking /business-diagnostic.html, secondary link "Talk to a partner" linking /contact.html.
2. WHO THIS IS FOR: heading "Who this is for", 3 cards from who_this_is_for (title bold, text below).
3. TREND SIGNALS: heading "Signals we are tracking", 3 cards from trend_signals (tag as a small label, text below).
4. PROOF: heading "Proof from our mandates - anonymised", cards from proof array (tag as label, text below).
5. INLINE CTA BAND: one-line band "30 minutes with a partner beats 30 tabs of research." with the primary CTA button again.
6. METHODOLOGY: render the SHARED top-level methodology_8phase object as a numbered 8-step vertical block (heading from its "heading" field), preceded by this page's method_intro as an italic lead line. Same 8 phases on every page; only method_intro differs.
7. DELIVERABLES: heading "What you walk away with", the 6 deliverables as a two-column checklist with check marks (use a styled span or ::before, not unicode bullets in text).
8. ROADMAP: heading "How the engagement runs", 4 numbered steps from roadmap (step, title, text).
9. MISTAKES: heading "Mistakes this engagement exists to prevent", 3 rows from mistakes (mistake bold, why below).
10. TRANSPARENCY: heading "What it costs and how long it takes", the transparency paragraph in a highlighted box.
11. FAQ: heading "Frequently asked questions", 5 Q&As from faq array, plus a FAQPage JSON-LD block matching them exactly.
12. CLOSING CTA: heading "Ready to test the market before the market tests you?", both CTAs.

Head per page: meta_title as title, meta_description, canonical https://greyradius.com + path, matching og tags, Service JSON-LD (provider GreyRadius Consulting) plus the FAQPage JSON-LD from section 7.

## TASK 2 - Hub page

Create /market-entry/index.html: h1 "Market entry consulting - by market, by motive", intro paragraph "Decision-stage guides for leaders who already know they want in - and need the evidence, structure and execution partner to do it right.", card grid linking all 12 pages (use each page's h1 and first stat pill), same dual CTA at bottom. Canonical https://greyradius.com/market-entry/. Title "Market Entry Consulting | India, Gulf, Southeast Asia, North America | GreyRadius".

## TASK 3 - Integration

1. Add all 13 URLs (12 pages + hub) to sitemap.xml with https://greyradius.com base.
2. On services/market-entry-execution.html, add a "Market entry guides" link row linking the hub and 4 pages: india-manufacturing, saudi-arabia, uae, market-entry-cost.
3. On industries/geographies/india-market-entry.html, industries/geographies/gulf-market-entry.html and industries/geographies/southeast-asia-market-entry.html, add one contextual link each to the corresponding new /market-entry/ page (these three files only - do not touch other industry pages).
4. Do NOT add these pages to the main navigation dropdowns.

## VERIFICATION - paste output

ls market-entry/ | wc -l   (expect 13)
grep -c "market-entry/" sitemap.xml   (expect 13)
grep -L "business-diagnostic.html" market-entry/*.html   (expect empty - every page carries the primary CTA)
grep -rn "IREDA\|CRIF\|NITCON\|Secant\|Pearson\|Man Industries\|Crescendo\|Square Port\|Xlinks\|NativFresh" market-entry/ (expect only NativFresh nowhere - all should return nothing)
grep -c "application/ld+json" market-entry/india-manufacturing-market-entry.html   (expect 2)
grep -c "Business assessment workshop" market-entry/*.html | grep -c ":1$"   (expect 13 - the shared 8-phase methodology renders on every page including the hub or 12 if hub omits it)
No em dash characters anywhere in market-entry/.
