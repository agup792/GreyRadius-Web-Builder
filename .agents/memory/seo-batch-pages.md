---
name: SEO batch page generation
description: How SEO content pages are built, where they live, and the generator script for future batches.
---

## Pattern

SEO content pages live at `greyradius-website/industries/{parent}/{slug}.html` (two levels deep).
Asset paths from these pages use `../../` prefix for all links (CSS, JS, images, nav, footer).

## Generator

`scripts/generate-seo-pages.py` — embed JSON page data directly, run with `python3 scripts/generate-seo-pages.py`.
Contains the full HTML template with all sections. Reuse for Batch 2 by appending new page objects to the PAGES list.

## Page Structure (all 15 Batch 1 pages)

Sections in order: hero, POV/market-timing, 4 insight cards, 4 market challenges (navy bg), 6 challenges-we-solve cards, 6 service-angle cards (mapped to the 6 service URLs in order), differentiators (3 fixed items + 4 stats), placeholder case study, FAQ accordion (details/summary), newsletter form, diagnostic nudge, CTA block, HubSpot meeting embed.

## JSON-LD schemas per page

Organization + Service + FAQPage + BreadcrumbList — all in one `<script type="application/ld+json">` array.

## Batch 1 summary

15 pages generated (13 Tier 3 + 2 Tier 2). Tier 2 → sitemap priority 0.8, Tier 3 → 0.7.
Parent directories: ai-ml-platforms, electric-vehicles, green-hydrogen, carbon-markets,
real-estate-infrastructure, drones, semiconductors, rare-earth-metals, fintech-payments,
islamic-finance, healthtech, cpg-fmcg-retail.

**Why:** Batch 2 will add 40 more pages same pattern — reuse this generator.
**How to apply:** For Batch 2, clear PAGES list, add new JSON objects, re-run script.
