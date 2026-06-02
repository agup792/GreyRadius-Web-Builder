---
name: SEO batch page generation
description: How SEO content pages are built, where they live, and the generator script for future batches.
---

## Pattern

SEO content pages live at `greyradius-website/industries/{parent}/{slug}.html` (two levels deep).
Asset paths from these pages use `../../` prefix for all links (CSS, JS, images, nav, footer).

## Generator

`scripts/generate-seo-pages.py` — all page data embedded as Python lists. Run with `python3 scripts/generate-seo-pages.py`.
- `PAGES` = Batch 1 (15 pages)
- `BATCH1B_PAGES` = Batch 1B (19 pages)
- `BATCH2_PAGES` = Batch 2 (21 pages)
- `main()` processes `PAGES + BATCH1B_PAGES + BATCH2_PAGES` — idempotent, safe to re-run.
- For new batches: add `BATCH3_PAGES = [...]` before `def main()`, extend the `all_pages` concat in `main()`.

## Page Structure (all pages)

Sections in order: hero, POV/market-timing, 4 insight cards, 4 market challenges (navy bg), 6 challenges-we-solve cards, 6 service-angle cards (mapped to the 6 service URLs in order), differentiators (3 fixed items + 4 stats), placeholder case study, FAQ accordion (details/summary), newsletter form, diagnostic nudge, CTA block, HubSpot meeting embed.

## JSON-LD schemas per page

Organization + Service + FAQPage + BreadcrumbList — all in one `<script type="application/ld+json">` array.

## Totals as of Batch 2

55 pages total. Sitemap has 122 `<url>` entries, 62 pointing to `industries/` pages.
Tier 2 → sitemap priority 0.8, Tier 3 → 0.7.

## Adding future batches

1. Extract JSON from DOCX: find array start line, parse up to closing `]`
2. Add `BATCH_N_PAGES = [...]` block before `def main()` in the generator
3. Extend `all_pages = PAGES + BATCH1B_PAGES + BATCH2_PAGES + BATCH_N_PAGES` in `main()`
4. Run `python3 scripts/generate-seo-pages.py`
5. Update sitemap: Tier 2 = 0.8, Tier 3 = 0.7

**Why:** Each batch re-runs the full generator (idempotent) — no risk of partial state.
