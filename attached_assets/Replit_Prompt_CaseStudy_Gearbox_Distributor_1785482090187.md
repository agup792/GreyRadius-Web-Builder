# Replit prompt — Gearbox Distributor case study + Market Entry service page update

This prompt assumes Replit has access to the actual GreyRadius website codebase (the repo behind greyradius.com), not a blank project. Paste everything below into Replit's Agent as one message. It has two tasks — do both.

---

I'm working in the GreyRadius website codebase. I need two things done, using the site's existing templates and CSS — do not invent new styles or components; reuse what already exists.

## TASK 1 — New case study page

Find the existing case study page `case-studies/coal-mining-conveyor-feasibility.html` (or the equivalent file in this repo) and use it as the exact structural and CSS template — same section order, same classes, same hero stat-chip layout, same numbered-approach block style, same outcome-card grid, same "Key outputs," "Project Snapshots," "GreyRadius Field Insight," and closing-CTA blocks. Duplicate that page's structure into a new file for this case study and replace all copy with the content below. Do not restyle anything — if a section in the template doesn't have an obvious equivalent in my content, keep the template's visual pattern and adapt the copy to fit it.

Add the new page to the case studies index/listing and to the sitemap the same way other case studies are registered.

### Page metadata
- Filename/slug: `case-studies/gearbox-distributor-india-market-entry.html`
- Page title: "Gearbox Manufacturer India Market Entry & Distributor Selection – GreyRadius Case Study"
- Meta description: "How GreyRadius ran geography mapping, sales channel assessment, distributor due diligence and margin negotiation to appoint 4 distribution partners for an international gearbox manufacturer entering India."
- Breadcrumb: Home › Case Studies › Gearbox Manufacturer · Distributor Selection

### Tag row (above H1, same style as other case studies' tag row)
Market Entry Execution · Opportunity Assessment · Industrials & Manufacturing · India · Mining Equipment

### H1
Distributor Selection & Channel Strategy for an International Gearbox Manufacturer's India Entry

### Lede (one paragraph under H1)
An international gearbox manufacturer serving the mining equipment sector had decided to enter India — but had no distribution presence, no reliable way to rank where demand actually existed, and no framework for telling a distributor willing to sign from a distributor able to perform.

### Hero stat chips (4, same style as the coal mining page's "3 Conveyor routes evaluated / ₹800 Cr Capex modelled / 18 mo Implementation plan / 2 Preferred vendors shortlisted")
- `8` — States assessed
- `50` — Distributors evaluated
- `4` — Distributors appointed
- `4-5 mo` — Engagement duration

### Hero image
Placeholder image slot, same dimensions/treatment as the coal mining page's hero image. Alt text: "GreyRadius team conducting distributor due diligence for an international gearbox manufacturer's India market entry." I will supply the real photo — leave a clearly marked placeholder (e.g. a light grey box with alt text visible) if no image is dropped in.

### Section: The Situation
**Subhead:** A distribution network that had to work in geographies the client had never operated in.

Paragraph 1: An international gearbox manufacturer serving mining equipment OEMs and end-users had decided to enter India, but had no distribution presence and no reliable way to determine where real demand existed or who could actually sell and service its products on the ground.

Paragraph 2: The mining equipment sector in India is regionally fragmented. Demand clusters around specific mining belts and industrial corridors, and the distributors capable of serving them vary widely in technical capability, existing OEM relationships, warehousing and after-sales service infrastructure. Getting this wrong meant either signing a distributor who couldn't convert access into revenue, or losing years to a partnership that would eventually need to be unwound.

Paragraph 3: GreyRadius was engaged to run the full distributor selection process — geography and opportunity mapping, sales channel assessment, distributor search and due diligence, commercial negotiation, and final appointment — to give the client a defensible, ranked path into the market instead of an open call for interested resellers.

### Section: Engagement at a Glance (key/value table, same style as other case studies)
- Client — International gearbox manufacturer (mining equipment segment)
- Service — Market Entry Execution · Opportunity Assessment
- Geography — India — 8 priority states assessed
- Deliverables — Geography ranking, channel assessment, distributor shortlist, negotiated appointments

### Section: The Challenge (3 sub-cards, same style as "Route uncertainty / Multi-ministry regulatory complexity / Vendor selection without a framework")

**Card 1 — Geography wasn't a single market**
Mining equipment demand in India doesn't distribute evenly — it clusters around specific mining belts, industrial corridors and capex cycles. Without a structured way to rank geographies by actual opportunity, the client risked spreading distribution effort across markets that couldn't support it.

**Card 2 — Channel structure wasn't obvious**
Direct sales, a single national distributor, or a multi-regional distributor model would each work differently depending on the geography's buying behaviour, deal sizes and service expectations — and the wrong channel choice locks in for years.

**Card 3 — Distributor capability is invisible from the outside**
Willingness to carry a product line says nothing about a distributor's technical service capacity, existing OEM relationships, warehousing footprint, or credibility with mining end-customers — the factors that actually predict whether a distributor converts access into revenue.

### Section: The GreyRadius Approach (numbered 01–05, same style as the coal mining page's numbered approach)

**01 — Geography & Opportunity Mapping**
Assessed 8 priority states across India against mining-sector demand drivers — installed equipment base, capex cycles, and existing competitive penetration — to produce a market attractiveness ranking used to prioritise distribution focus.

**02 — Sales Channel Assessment**
Evaluated direct, distributor-led and hybrid channel models against each priority state's buying behaviour and deal structure, to recommend the right channel model state by state rather than applying one structure everywhere.

**03 — Distributor Search & Due Diligence**
Identified and screened 50 key distributor candidates across the 8 priority states, running structured interviews on technical service capability, existing OEM lines carried, warehousing and after-sales infrastructure, and standing with mining end-customers.

**04 — Commercial Evaluation & Margin Negotiation**
Benchmarked pricing and margin structures across shortlisted candidates and negotiated commercial terms — margins, territory exclusivity, minimum volume commitments — with the final contenders in each state.

**05 — Final Selection & Launch Sequencing**
Appointed 4 distributors across the highest-ranked states over a 4-5 month engagement, with channel-wise go-to-market recommendations for each and a launch sequence phased to market readiness rather than a simultaneous national rollout.

*(If the template has a pull-quote slot after one of the numbered steps, like the coal mining page does, leave it as a placeholder marked `[Client quote — insert before publishing]` rather than inventing one.)*

### Section: The Outcome (4 metric cards, same style as coal mining page's outcome grid)
- **States** — 8 ranked — Full market attractiveness ranking across mining-equipment demand centres
- **Distributors** — 50 screened — Structured due diligence on technical, commercial and service criteria
- **Appointed** — 4 — Across the highest-ranked states, with negotiated commercial terms
- **Timeline** — 4-5 mo — End-to-end engagement from geography mapping to distributor appointment

### Section: Key Outputs From This Engagement (4 items, same style as coal mining page)
- **Geography & opportunity ranking** — Market attractiveness scoring across all 8 assessed states with demand-driver rationale.
- **Sales channel assessment** — Recommended channel model (direct / distributor / hybrid) by state.
- **Distributor due-diligence scorecards** — Structured evaluation of all 50 screened candidates on technical, commercial and service criteria.
- **Commercial terms & launch sequence** — Negotiated margin/territory terms for appointed distributors and a phased go-to-market rollout plan.

### Section: Project Snapshots (4-image gallery, same style/grid as coal mining page)
Use 4 placeholder image slots with these alt texts (I will drop in real photos):
1. "Geography and opportunity mapping workshop"
2. "Distributor site visit and technical capability assessment"
3. "Structured due-diligence interview with a distributor candidate"
4. "Commercial terms and margin negotiation session"

### Section: GreyRadius Field Insight (callout box, same style as coal mining page's field insight)
"Distributor willingness to sign is the easiest signal to get and the least predictive one. The distributors worth appointing are rarely the first ones to say yes — they're the ones with existing OEM relationships and service infrastructure, and they negotiate hardest on margin because they know what the relationship is actually worth."

### Closing CTA section (same style as coal mining page's closing)
Heading: "Evaluating distribution partners for an India or regional market entry?"
Body: "We bring the same rigour to channel and distributor selection that we bring to market entry strategy — opportunity mapping, structured due diligence, and negotiated terms in one integrated engagement."
Buttons: "Get in touch" (links to /contact.html) · "Back to case studies →" (links to /case-studies/index.html)

### Related links (footer of page, same style as coal mining page's "Related")
- Market Entry Execution → /services/market-entry-execution.html
- Industrials & Manufacturing → /industries/industrials-manufacturing-and-infrastructure.html
- (link to one or two other existing case studies if the template requires a minimum count)

---

## TASK 2 — Enhance the Market Entry Execution service page

Open `services/market-entry-execution.html`. Make these additions without changing the page's existing structure, milestones, or FAQ answers that are unrelated to distributor/channel work:

1. **Capability 03 ("Channel & Partner Enablement")** — currently reads: "Build distributor, reseller, alliance, and ecosystem partnerships." Expand the description (keep the same heading and numbering) to:
   "Build distributor, reseller, alliance, and ecosystem partnerships — including geography and opportunity mapping to rank where demand actually exists, structured distributor due diligence, and margin/territory negotiation with final candidates before appointment."

2. **Case Study spotlight section** — this section currently features the CPG Bengaluru launch case study. Do not remove that one. Add this gearbox case study as a second case study card in the same section/carousel, using this content (same card style/format as the existing one):
   - Heading line: "Industrial manufacturer. First-time India entry. 4 distributors appointed across 8 priority states."
   - Body: "An international gearbox manufacturer entering the Indian mining equipment market engaged GreyRadius to map priority states, assess the right channel model, run distributor due diligence, and negotiate commercial terms — resulting in 4 distributors appointed across the highest-ranked markets in 4-5 months."
   - Stat chips: `8` states assessed · `50` distributors evaluated · `4` distributors appointed
   - Industry: Industrials & Manufacturing · Mining Equipment
   - Entry market: India (multi-state distributor rollout)
   - Offering: Market Entry Execution · Opportunity Assessment
   - Link: "Read case study →" → /case-studies/gearbox-distributor-india-market-entry.html

3. **FAQ — add one new question** (in the existing FAQ accordion, same style as the others):
   **Q: How do you evaluate and select distribution partners in a new market?**
   **A:** We start by ranking candidate geographies on real demand — installed base, capex cycles, and competitive intensity — rather than treating every region as equal. Within priority geographies, we assess whether direct sales, a distributor model, or a hybrid channel fits local buying behaviour, then run structured due diligence on distributor candidates covering technical capability, existing OEM relationships, service infrastructure, and standing with end customers. Commercial terms — margins, territory exclusivity, volume commitments — are negotiated with the shortlisted finalists before appointment. See our [gearbox manufacturer distributor selection case study](/case-studies/gearbox-distributor-india-market-entry.html) for how this ran in practice.

4. **"Evaluating India distribution options?" link** — the page already links to `/insights/india-distributor-evaluation-framework.html`. Keep that link, and also add a second inline link near it or in the new FAQ answer pointing to the new case study page, so both the framework article and the proof-point case study are reachable from this service page.

Do not touch the month-by-month milestone timeline (M1–2, M3–4, M5–6), pricing/output-billing language, or any other FAQ answers — only the four additions above.

---

## Notes for both tasks
- All numbers (8 states, 50 distributors, 4 appointed, 4-5 month engagement) are real — use them as given, do not alter.
- All new images are placeholders until real photos are supplied — use the same placeholder treatment (dimensions, alt text, grey box or similar) the existing template uses when an image slot needs filling.
- The client quote is still a placeholder (`[Client quote — insert before publishing]`) — do not invent one.
- Match British spelling and existing site tone (direct, numbers-forward, no "leverage/robust/comprehensive/synergy").
- After both tasks, do a visual check: the new case study page should be indistinguishable in structure/styling from `coal-mining-conveyor-feasibility.html`, just with different copy and placeholder numbers/images.
