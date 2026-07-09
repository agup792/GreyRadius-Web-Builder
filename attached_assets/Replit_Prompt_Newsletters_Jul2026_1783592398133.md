# Replit prompt - deploy 4 newsletter issues (June 29 - July 5, 2026)

I am attaching 4 complete, self-contained HTML files. Deploy them exactly as provided - do not restyle, do not edit content, do not touch the embedded CSS or filter script.

## TASK 1 - Place the files

Each file becomes a directory index at its canonical path (filename prefix tells you the newsletter):

1. the-signal_enterprise-ai-deployment-compute-financing-july-2026.html
   -> /insights/newsletters/the-signal/enterprise-ai-deployment-compute-financing-july-2026/index.html
2. charged_tesla-byd-q2-ev-deliveries-storage-july-2026.html
   -> /insights/newsletters/charged/tesla-byd-q2-ev-deliveries-storage-july-2026/index.html
3. the-stack_ai-data-centre-power-investment-consolidation-july-2026.html
   -> /insights/newsletters/the-stack/ai-data-centre-power-investment-consolidation-july-2026/index.html
4. the-wafer_india-osat-europe-fabs-ai-memory-korea-july-2026.html
   -> /insights/newsletters/the-wafer/india-osat-europe-fabs-ai-memory-korea-july-2026/index.html

Each file already contains its own canonical tag matching these URLs, OG tags, meta description and Article JSON-LD. Verify the canonical inside each file matches the placed path exactly.

## TASK 2 - Update hub and archive pages

1. /insights/newsletters/index.html - add each new issue as the latest issue card for its newsletter, following the existing card pattern.
2. Each newsletter's own hub page (/insights/newsletters/the-signal/, /charged/, /the-stack/, /the-wafer/) - add the new issue at the top of its issue list. Issue titles to display:
   - The Signal - Issue 004: Enterprise AI deployment, compute financing and sovereign AI (June 29 - July 5, 2026)
   - Charged - Issue 002: Tesla and BYD Q2 deliveries, EV storage and battery trends (June 29 - July 5, 2026)
   - The Stack - Issue 004: AI data centre power investments and hyperscale consolidation (June 29 - July 5, 2026)
   - The Wafer - Issue 002: India OSAT, Dresden power fab and Korea AI memory (June 29 - July 5, 2026)

## TASK 3 - Sitemap

Append the 4 canonical URLs to sitemap.xml with lastmod 2026-07-05:
https://greyradius.com/insights/newsletters/the-signal/enterprise-ai-deployment-compute-financing-july-2026/
https://greyradius.com/insights/newsletters/charged/tesla-byd-q2-ev-deliveries-storage-july-2026/
https://greyradius.com/insights/newsletters/the-stack/ai-data-centre-power-investment-consolidation-july-2026/
https://greyradius.com/insights/newsletters/the-wafer/india-osat-europe-fabs-ai-memory-korea-july-2026/

## VERIFICATION - run and paste output

for u in the-signal/enterprise-ai-deployment-compute-financing-july-2026 charged/tesla-byd-q2-ev-deliveries-storage-july-2026 the-stack/ai-data-centre-power-investment-consolidation-july-2026 the-wafer/india-osat-europe-fabs-ai-memory-korea-july-2026; do ls "insights/newsletters/$u/index.html"; done
grep -c "july-2026" sitemap.xml   (expect 4 or more)
grep -l "application/ld+json" insights/newsletters/*/enterprise-ai* insights/newsletters/*/tesla-byd* insights/newsletters/*/ai-data-centre* insights/newsletters/*/india-osat*/index.html
grep -rl "data:image" insights/newsletters/ (expect nothing)

## RULES
- Do not modify the attached files beyond placing them.
- Do not add Replit URLs anywhere.
- Contact email anywhere: sales@greyradius.com only.
