---
name: Batch industry page generator pattern
description: How to generate GreyRadius industry sub-pages from JSON data using inline Python bash heredoc.
---

## Pattern

- Source JSON saved to `greyradius-website/data/industry-pages-batch{N}.json`
- Pages written to `greyradius-website/industries/{parent}/{slug}.html`
- Generator runs as inline Python via bash heredoc — NO separate script files
- All pages are 465 lines (consistent template)

## 5 required icon patterns (must apply to every page)

1. **MARKET INSIGHTS cards** — orange 38×38px badge, cycling 4 icons (TrendingUp/Globe/BarChart/Zap)
2. **CWS cards** — check SVG (`polyline points="20 6 9 17 4 12"`) before heading text (display:flex)
3. **MARKET CHALLENGES list** — right-arrow SVG (`polyline points="9 18 15 12 9 6"`) + `<span>` in each `<li>`
4. **DIFFERENTIATORS** — 52×52px orange-tinted containers with Lucide SVGs (microscope/zap/target)
5. **Hero radial decoration** — 260×260px absolute-positioned concentric-circles SVG (position:relative on section)

## En dash rule

Always replace `—` (em dash U+2014) with `–` (en dash U+2013) or `&#8211;`. Do a post-generation replace pass.

## PARENT_LABELS map

enterprise-saas, fintech-payments, cpg-fmcg-retail, education-edtech, healthcare-life-sciences, proptech, logistics-supply-chain, renewable-energy, technology, cybersecurity, ecommerce-tech

## HubSpot

Form ID: `8fb2e137-9ca1-4c6e-8152-63225d37d47a` Portal: `21337745`
Script: `https://js.hsforms.net/forms/embed/21337745.js` (deferred in `<head>`)
Embed div: `<div class="hs-form-frame" data-region="na1" data-form-id="8fb2e137-9ca1-4c6e-8152-63225d37d47a" data-portal-id="21337745"></div>`

**Why:** Multiple batches follow same pattern; recording prevents re-derivation each session.
**How to apply:** For any new batch, load JSON, run Python generator inline, update sitemap.
