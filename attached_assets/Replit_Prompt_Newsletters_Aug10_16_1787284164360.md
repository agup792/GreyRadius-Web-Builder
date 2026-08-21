# Replit prompt — 4 weekly newsletters (10–16 August 2026 issues)

This prompt assumes Replit has access to the actual GreyRadius website codebase. Paste everything below into Replit's Agent as one message.

---

I have four weekly-intelligence newsletter issues, each a fully self-contained HTML file (own inline CSS, own Google Fonts import, own filter/JS — they do NOT use the main site's stylesheet, and that's intentional; each newsletter brand has its own visual identity). Do not restyle or refactor these files. Your job is only to publish them and wire them into each newsletter's archive.

The four files (attached in this session):
1. `The_Charged_Weekly_EV_Battery_Intelligence_Aug10_16_2026.html` — EV & Battery Intelligence
2. `The_Stack_Weekly_Infrastructure_Brief_Aug10_16_2026.html` — Data Centre / Cloud Infrastructure Brief
3. `The_Wafer_Weekly_Semiconductor_Intelligence_Aug10_16_2026.html` — Semiconductor Intelligence
4. `The_Signal_GreyRadius_AI_Briefing_Aug10_16_2026.html` — Enterprise AI Briefing

### Task 1 — Publish each issue as a page
For each file, find where previous issues of that same newsletter live in the repo (e.g. `/newsletters/the-charged/`, `/newsletters/the-stack/`, etc., or wherever the pattern already is — if this is the first issue of a newsletter being published on-site, create the folder structure to match how case studies/insights are organized). Use this slug pattern unless the repo already has a different convention:
- `/newsletters/the-charged/2026-08-10.html`
- `/newsletters/the-stack/2026-08-10.html`
- `/newsletters/the-wafer/2026-08-10.html`
- `/newsletters/the-signal/2026-08-10.html`

Drop each file in as-is — do not touch the inline `<style>` or `<script>` blocks.

### Task 2 — Register in the archive/index
Add each new issue to its newsletter's archive/listing page (or the general newsletters index if each brand doesn't have its own yet) so it's discoverable and appears above/before earlier issues in reverse-chronological order.

### Task 3 — Verify outbound links
Every file already links out to `greyradius.com` and `greyradius.com/contact.html` for its CTA buttons, plus external source citations (Reuters, company newsrooms, etc. — leave those as-is, they're the reporting sources). Confirm those two internal links resolve correctly once the pages are live on the actual domain, and that the "Book a Free Strategy Call" / "Visit Our Website" / "Explore Our Website" buttons all point to the right internal pages.

### Notes for Replit
- I already fixed two issues before sending: The Stack's footer previously said "3–9 August 2026" while the rest of the issue said "10–16 August 2026" — corrected to 10–16 throughout. The Charged previously linked to `www.greyradius.com` while the other three newsletters use `greyradius.com` (no www) — standardized to match.
- These are news/intelligence round-ups, not case studies or blog posts — no SEO keyword work needed on these; the content is time-stamped market intelligence, not evergreen search content.
- If the repo doesn't yet have a newsletters section at all, tell me before scaffolding a new top-level nav item — I'd rather decide navigation placement than have it added automatically.
