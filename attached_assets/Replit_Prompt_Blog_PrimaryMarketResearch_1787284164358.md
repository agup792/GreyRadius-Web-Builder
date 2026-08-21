# Replit prompt — Primary Market Research (Emerging Markets) blog

This prompt assumes Replit has access to the actual GreyRadius website codebase, not a blank project. Paste everything below into Replit's Agent as one message.

---

I'm working in the GreyRadius website codebase. Find an existing published blog/insight page (e.g. the B2B SaaS India pricing article, or the nearest equivalent under `blog/` or `insights/` in this repo) and use it as the exact structural and CSS template — same tag row, same H1/subhead treatment, same numbered-section layout, same "GreyRadius Insight" callout-box style, same FAQ accordion, same closing "GreyRadius Perspective" + soft-CTA block. Duplicate that page's structure into a new file and drop in the content below. Do not invent new styles or components.

Add the new page to the blog/insights index and sitemap the same way other articles are registered.

### Page metadata
- Filename/slug: `insights/primary-market-research-emerging-markets.html`
- Page title: "Primary Market Research vs Secondary Research in Emerging Markets – GreyRadius"
- Meta description: "Why primary market research — not analyst reports — is the decision-validation mechanism that determines whether an emerging-market entry succeeds. GreyRadius's 30-plus interview methodology explained."
- Breadcrumb: Home › Insights › Market Entry Research

### Tag row
Market Entry Research · Primary Research Methodology · Emerging Markets

### H1
Primary Market Research vs Secondary Research: Why the Distinction Changes Everything

### Body content
Use the full Markdown file `Primary_Market_Research_Emerging_Markets_GreyRadius_Blog.md` (attached/in this session's outputs) as the source copy, in order, section by section. It already contains the keyword-infused version with:
- Bolded key-phrase treatment on: **primary market research in emerging markets**, **market entry research firm**, **primary vs secondary research consulting**, **market research methodology in India**, **buyer willingness-to-pay research**, **primary market research services** — map these bold spans to whatever the template uses for emphasis (bold, or a highlighted-term style if the site has one).
- A "GreyRadius finding" case example (Vietnam manufacturing) — style this as the site's usual "GreyRadius Insight" callout box if the template has one, otherwise keep as a standard body section with a subhead.
- A closing section ("The distinction changes everything") that should map to the site's "GreyRadius Perspective" closing pattern.
- A working CTA link already fixed to `[Speak with GreyRadius](https://www.greyradius.com/contact.html)` — render as the site's standard CTA button, not an inline text link, if the template uses a button here.
- A four-question FAQ block at the end — map directly to the site's FAQ accordion component.

### Notes for Replit
- This is long-form (approx. 1,600 words) — preserve all section breaks and the numbered "01–05 commissioning" list under "How to commission primary market research correctly."
- British spelling, direct/numbers-forward tone, no "leverage/robust/comprehensive/synergy" — matches the source file as written.
- Do not compress or summarize sections; use the full copy as provided.
- After building, do a visual check against the reference blog page for consistent heading hierarchy, callout-box styling, and FAQ accordion behaviour.
