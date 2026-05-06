# Replit Prompt — Build the GreyRadius Consulting Website

**Use this prompt with Replit Agent or hand it to a Replit-based developer. The deliverable is a static HTML/CSS/JS website that will be migrated into WordPress. Build for clean migration.**

---

## YOUR ROLE

You are building the new website for **GreyRadius Consulting** — a boutique strategy and growth advisory firm based in Dubai, Delhi, Singapore, and Brussels. The current website (greyradius.com) is being fully replaced. You will deliver a clean, modern, semantic, fast, accessible website that can be migrated into a WordPress theme.

**Important:** Your output must be a folder of static HTML/CSS/JS files (no React/Next.js build process). A WordPress developer will take your output and convert it into either a Gutenberg-block theme, a Bricks/Elementor template, or a Hello-Theme child template. Build accordingly.

---

## PROJECT CONTEXT

### About GreyRadius

Founded 2017 in Dubai by Chirag Bansal and Anshuman Kumar. Now four partners (Chirag, Anshuman, Dhiraj, Pijush) plus a senior team and 10 advisors across Delhi, Dubai, Singapore, Brussels. 200+ projects delivered. 100+ tech products. Boutique scale by design.

GreyRadius is **repositioning** the firm in 2026 around three pillars and six output-led service offerings. This website embodies that repositioning. The buyer is a **founder, CXO, family-business CEO, or government department head** in India, GCC, or Southeast Asia — sophisticated, fast-reading, comparing GreyRadius against Big-4, AI platforms, and other boutiques.

### The Three Pillars (every page must reinforce these)

1. **Primary research as the input.** 80% of insights come from real interviews, surveys, and fieldwork — not desk research. Every claim carries a name and a date.
2. **AI-augmented delivery as the velocity layer.** GreyRadius uses AI internally (Claude, ChatGPT, Perplexity, AlphaSense, Apollo, Otter.ai) to compress timelines and reduce cost. Same-quality answer in 4 weeks vs 12.
3. **Execution as the output.** Five of the six service offerings include execution — entity setup, signed partners, pipeline run, round closed, AI pilot delivered. Billed on outputs, not hours.

### The Six Offerings

| # | Offering | Duration | Price (USD) |
|---|---|---|---|
| 1 | Opportunity Assessment | 2-3 weeks | 8-40k |
| 2 | Feasibility & TEV | 4 weeks | 25-150k |
| 3 | Market Entry Execution | 6 months | 80-300k+ |
| 4 | GTM Execution-as-a-Service | 90+ days | 35-180k + outcomes |
| 5 | Pitchbook & Fundraising | 7-90 days | 3-25k + success fee |
| 6 | AI Consulting & Transformation | 4 weeks - 6 months | 30-200k+ |

### The Tagline (locked)

**"Strategy you can execute. Outcomes within reach."**

Sub-positioning: *"We don't just advise — we build and execute with you."*

---

## DESIGN SYSTEM (LOCKED)

### Brand Colours

```css
--color-navy-deep:    #0F1F3F;   /* Primary background, hero, footer */
--color-navy:         #1F3864;   /* Headings, primary buttons */
--color-navy-mid:     #2D4A7C;   /* Secondary surfaces, hover states */
--color-steel-blue:   #5B7CA8;   /* Tertiary accents, lines, dividers */
--color-orange:       #E8554A;   /* CTA buttons, key callouts, accents (use sparingly — 5% of page) */
--color-orange-soft:  #FFE0DD;   /* CTA hover backgrounds, pull-quote backgrounds */
--color-white:        #FFFFFF;   /* Primary background for content sections */
--color-off-white:    #F8F9FB;   /* Section background alternation */
--color-text-dark:    #0F1F3F;   /* Body text on light backgrounds */
--color-text-light:   #FFFFFF;   /* Body text on dark backgrounds */
--color-text-muted:   #5B6E8C;   /* Captions, metadata */
--color-border:       #E5EAF1;   /* Card borders, table borders */
```

### Typography

- **Primary font (sans-serif):** Inter — use weights 400, 500, 600, 700, 800. Load from Google Fonts.
- **Display font (for hero headlines):** Inter Display or Inter Tight — use weight 700 or 800 for hero, 600 for secondary headlines.
- **Optional serif accent (for pull quotes):** Tiempos Headline or Playfair Display — use sparingly, only for editorial pull quotes.

```css
--font-display:   'Inter Tight', 'Inter', system-ui, sans-serif;  /* hero, h1 */
--font-heading:   'Inter', system-ui, sans-serif;                  /* h2, h3 */
--font-body:      'Inter', system-ui, sans-serif;                  /* body */
--font-mono:      'JetBrains Mono', monospace;                     /* code blocks if any */

/* Type scale */
--text-hero:      clamp(2.5rem, 5vw, 4.5rem);    /* hero headlines, line-height 1.05 */
--text-h1:        clamp(2rem, 3.5vw, 3rem);      /* line-height 1.15 */
--text-h2:        clamp(1.5rem, 2.5vw, 2.25rem); /* line-height 1.2 */
--text-h3:        1.5rem;                         /* line-height 1.3 */
--text-h4:        1.25rem;                        /* line-height 1.35 */
--text-body:      1.0625rem;                      /* 17px, line-height 1.65 */
--text-small:     0.9375rem;                      /* 15px, line-height 1.55 */
--text-caption:   0.8125rem;                      /* 13px, uppercase, tracking 0.05em */
```

### Spacing & Layout

```css
--max-width:      1280px;   /* Main content max width */
--max-width-narrow: 960px;  /* Article body content */
--padding-section-y: clamp(4rem, 8vw, 8rem);   /* Vertical padding between sections */
--padding-page-x:   clamp(1.5rem, 5vw, 4rem);  /* Horizontal page padding */
--gap-grid:         clamp(1.5rem, 3vw, 3rem);  /* Grid gap */
--radius-sm:        6px;
--radius-md:        12px;
--radius-lg:        24px;
--shadow-card:      0 4px 16px rgba(15, 31, 63, 0.08);
--shadow-card-hover: 0 8px 32px rgba(15, 31, 63, 0.16);
```

### Visual Identity

- **Logo:** Use the existing GreyRadius logo (radial circle mark). Place it top-left on every page. Provide both light (white logo on navy) and dark (navy logo on white) variants. If logo files aren't provided, create a placeholder using a circular SVG with two concentric radii suggesting the "radius" theme.
- **Hero motif:** Animated radial graphic with 6 orbital points pulsing into a central "decision" anchor. Each orbital point represents one of the six offerings. Keep the animation subtle (3-4 second cycle, gentle pulse).
- **Section rhythm:** Alternate dark navy → off-white → dark navy → white. Hero, three-pillar, GR Method, final CTA are dark navy. Stat strip, six offerings, proof, about strip, industries are white or off-white. This creates visual cadence.

### Iconography

- **Library:** Use **Lucide Icons** (lucide.dev) for consistency. Stroke width 1.5px. Use sparingly — one icon per section maximum.
- Icon size: 24px standard, 32px for feature blocks, 48px for big offering cards.
- Colour: Match the section's text colour. Orange accent only on hover or active states.

### Illustrations

Every page needs at least one custom illustration. Use this approach:

1. **Hero illustrations:** Custom SVG. For the homepage, use the animated radial graphic described above. For service pages, use abstract geometric illustrations (circles, lines, dots) in navy + orange — NOT photography of people in offices.
2. **Section illustrations:** Use **unDraw.co** or **storyset.com** for free customisable SVG illustrations. Re-colour them to use only navy + orange + steel blue. Avoid the default purple/teal palette.
3. **Photography (use sparingly):** Only for the team page (real partner headshots) and case study pages (real client environments where permitted). Otherwise avoid stock photography of "person at laptop" — it makes the site look generic.
4. **Process diagrams:** For the GR Method (Listen → Decide → Ship), build custom SVG flowcharts inline in the HTML — not as raster images. This keeps them sharp and editable.

If you can use AI image generation, generate abstract geometric illustrations matching the brand palette. If not, use unDraw with custom colour overrides.

### Component Library to Build

Build these as reusable HTML+CSS components (the WordPress dev will convert each to a Gutenberg block or page-builder template):

1. **Top navigation** — sticky, transparent over hero, solid white below
2. **Hero block** — full-width, 90vh max
3. **Trust strip** — horizontal logo row, mono-toned logos
4. **Stat strip** — 4-5 stat blocks with big numbers
5. **Pillar block** — three-column grid with icon + heading + body
6. **Offering card** — large card with offering name, descriptor, CTA
7. **Method flow** — six-step horizontal flow with icons
8. **Case study card** — image left, content right (or vice versa)
9. **Pricing table** — three-column tier comparison
10. **FAQ accordion** — single-expand, navy expand icon
11. **Pull quote** — large serif quote with attribution
12. **CTA block** — full-width navy with white text + orange button
13. **Footer** — four-column grid, dark navy
14. **Insight card** — image top, category tag, title, excerpt, author byline
15. **Comparison table** — three-column boutique-vs-Big4-vs-DIY

---

## TECHNICAL REQUIREMENTS

### Stack

- **HTML5** — semantic, accessible
- **TailwindCSS** — utility-first CSS via CDN (for prototyping; the WP dev will compile or move to a custom stylesheet)
- **AlpineJS** — for lightweight interactivity (mobile menu, FAQ accordion, tab toggles). Don't use React or Vue.
- **Vanilla JS** — for any custom behaviour (animations, lazy load)
- **Lottie** — optional, for the hero radial animation only. Otherwise use CSS animations.
- **No build step required.** All HTML, CSS, JS should run with a simple `python -m http.server` or Live Server.

### File Structure

```
greyradius-website/
├── index.html                              (Home)
├── about/
│   ├── index.html                          (About hub)
│   ├── team.html
│   ├── method.html
│   └── why-greyradius.html
├── services/
│   ├── index.html                          (Services hub)
│   ├── opportunity-assessment.html
│   ├── feasibility-and-tev.html
│   ├── market-entry-execution.html
│   ├── gtm-execution-as-a-service.html
│   ├── pitchbook-and-fundraising.html
│   └── ai-consulting-and-transformation.html
├── industries/
│   ├── index.html
│   ├── technology.html
│   ├── bfsi.html
│   ├── energy-and-chemicals.html
│   ├── cpg-fmcg-retail.html
│   ├── healthcare-and-life-sciences.html
│   └── investment-banks-and-pe.html
├── case-studies/
│   ├── index.html
│   └── [12 case-study slugs].html
├── insights/
│   ├── index.html
│   └── [6 launch articles].html
├── contact.html
├── careers.html
├── legal/
│   ├── privacy.html
│   └── terms.html
├── assets/
│   ├── css/
│   │   └── styles.css                      (custom CSS overrides)
│   ├── js/
│   │   ├── main.js
│   │   └── alpine.min.js
│   ├── images/
│   │   ├── logo-light.svg
│   │   ├── logo-dark.svg
│   │   ├── hero-radial.svg
│   │   ├── illustrations/
│   │   ├── icons/
│   │   ├── partners/
│   │   ├── case-studies/
│   │   └── insights/
│   └── fonts/                              (or use Google Fonts CDN)
└── README.md                                (build + WP migration instructions)
```

### Performance Targets

- Page load < 2 seconds (use lazy-loaded images, deferred JS)
- First Contentful Paint < 1.5s
- Lighthouse score 90+ on mobile and desktop
- All images in WebP format with PNG/JPG fallback
- Critical CSS inlined for above-the-fold

### Accessibility

- WCAG 2.1 AA compliance
- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`)
- ARIA labels on all interactive elements
- Keyboard navigation works on all interactive elements
- Skip-to-content link for screen readers
- `alt` text on every image (descriptive, not "image of...")
- Colour contrast 4.5:1 minimum for body text, 3:1 for large text

### SEO

- Each page has unique `<title>` and `<meta name="description">`
- Canonical URLs
- Schema.org markup: Organization on every page; Service on service pages; BlogPosting on insight pages; BreadcrumbList everywhere
- XML sitemap (sitemap.xml) auto-generated
- robots.txt
- Open Graph and Twitter Card meta tags on every page
- Heading hierarchy strict (one H1 per page, then H2, H3 in order)

### Mobile-first

- Breakpoints: 640px, 768px, 1024px, 1280px
- Mobile menu uses hamburger toggle (AlpineJS) — slides in from right
- Hero collapses to single column with smaller type
- Tables become stacked cards on mobile
- All touch targets minimum 44x44px

---

## PAGE-BY-PAGE BRIEF

I'll provide complete copy for the homepage, About hub, GR Method, Why GreyRadius, all six service pages, and one industry page as the template. The remaining 5 industry pages and 12 case-study pages and 6 insight pages follow the same patterns — replicate the template structure with content variations.

---

### 1. HOMEPAGE — `/index.html`

**Page meta:**
- Title: `GreyRadius Consulting — Strategy you can execute. Outcomes within reach.`
- Description: `Boutique strategy and growth consulting grounded in real primary research, accelerated by AI, delivered as measurable outcomes. India · GCC · Southeast Asia.`
- OG image: hero-radial graphic

**Sections in order:**

#### 1.1 Sticky Top Navigation
- Left: GreyRadius logo (links to `/`)
- Center: Services dropdown (6 offerings) | Industries dropdown (6 industries) | Case Studies | Insights | About dropdown (Hub, Team, Method, Why GR)
- Right: "Book a 30-min call" button (orange, prominent)
- Mobile: Hamburger menu, slide-in from right

#### 1.2 Hero — Full-width navy, 90vh

**Layout:** Two columns desktop. Left column 50% with text. Right column 50% with animated radial graphic.

**Left column content:**
```
[H1] Strategy you can execute.
     Outcomes within reach.

[Sub-headline] We don't just advise — we build and execute with you.
Boutique consulting grounded in real primary research, accelerated by
AI, delivered as measurable outcomes. For founders, CXOs, and
family-business leaders across India, GCC, and Southeast Asia.

[Primary CTA button — orange] Book a 30-min discovery call →
[Secondary CTA — text link with arrow] See how we work →
```

**Right column content:**
- Animated SVG: A central circle (the "decision anchor") with 6 orbital points around it — each pulsing gently. Each orbital point can be labelled with offering name on hover. Orbits move slowly clockwise. Background is subtly gradient navy → navy-deep.

**Visual notes:**
- Hero background: deep navy with subtle gradient
- Headline: white, font-display, 700 weight, line-height 1.05
- Sub-head: light grey (rgba(255,255,255,0.8)), 1.125rem
- CTA primary button: orange background, white text, 16px padding, 8px radius
- Slight texture on background — not flat

#### 1.3 Trust Strip — White, 80px tall

```
[Centered caption] Trusted by founders, CXOs, and government leaders across four continents.
[Logo row] Saal · Alef Education · Abu Dhabi Capital Group · MBRHE · Tata Motors · DED UAE · Native Fresh · ADNH Catering · Pansari · High Commission of India
```

**Visual notes:** Logos in a horizontal scroll on mobile. Mono-toned (grey) logos, hover reveals colour. Logo height fixed at 40px.

#### 1.4 Stat Strip — Off-white, 5-block grid

```
[Stat 1]  200+  projects delivered
[Stat 2]  100+  SaaS & tech products
[Stat 3]  80%   primary-research-led
[Stat 4]  4     countries · 4 offices
[Stat 5]  9     years of practice
```

**Visual notes:** Big numbers in navy, font-display, 3.5rem, 800 weight. Caption below in muted text. Grid of 5 columns desktop, 2 columns tablet, 1 column mobile. Vertical dividers between cells (1px steel-blue).

#### 1.5 Three Pillars — White, 3-column

**Section heading:**
```
[H2] What makes us different.
[Sub-text] Three things every engagement carries. Always.
```

**Three columns:**

```
[Column 1 — Icon: search / loupe]
Primary research — the input
Every claim in every deliverable comes from a real conversation.
Expert interviews, customer surveys, fieldwork. Not desk research.
80% of our insights come from primary sources.

[Column 2 — Icon: target / output]
Execution — the output
We don't stop at the deck. Five of our six offerings include
execution — entity setup, signed partners, pipeline run, round
closed, AI pilot delivered. Billed on outputs, not hours.

[Column 3 — Icon: zap / lightning bolt]
AI-augmented delivery — the velocity layer
We use AI internally to compress timelines and reduce cost. Faster
delivery at boutique pricing, without compromising the human work
that actually matters. Same answer in 4 weeks. Not 12.
```

**Visual notes:** Three cards with icon at top, heading in navy, body in dark text. Each card has a subtle hover effect (lift + shadow). Icons use Lucide (search, target, zap) at 32px stroke 1.5.

#### 1.6 Six Offerings — Navy, horizontal cards

**Section heading:**
```
[H2 — white] Six offerings. One method.
[Sub-text] From the first question to the closed funding round, we
have a fixed-fee, output-defined engagement built for it.
```

**Six cards in 3-column × 2-row grid:**

Card 1: **Opportunity Assessment**
- Icon: compass
- Tagline: Should you play in this market?
- Descriptor: From 15-25 expert and customer interviews to a Go / Defer / Kill recommendation in 2-3 weeks.
- CTA link: Learn more →

Card 2: **Feasibility & TEV**
- Icon: check-circle
- Tagline: Is this play bankable?
- Descriptor: Primary-validated demand, AI-built financial model, board-ready pack in 4 weeks.
- CTA link: Learn more →

Card 3: **Market Entry Execution**
- Icon: map
- Tagline: Land the entity. Sign the partners. Get the first customer.
- Descriptor: Live operating entity, signed channel agreements, first 3-5 hires, first paid pilot in 6 months. Output-billed.
- CTA link: Learn more →

Card 4: **GTM Execution-as-a-Service**
- Icon: trending-up
- Tagline: We don't advise on GTM. We run the first 90 days.
- Descriptor: ICP-grounded pipeline that we run, not advise on. Outcome-tied billing.
- CTA link: Learn more →

Card 5: **Pitchbook & Fundraising**
- Icon: rocket
- Tagline: From slides to closed round.
- Descriptor: Investor-ready pack in 7 days. Round closed in 90.
- CTA link: Learn more →

Card 6: **AI Consulting & Transformation**
- Icon: cpu
- Tagline: AI strategy that ships. Not a deck about transformation.
- Descriptor: Identify, prioritise, pilot, and scale AI in your business. First AI use case live in 90-180 days.
- CTA link: Learn more →

**Visual notes:** Cards have a navy-mid background. White text. Orange accent on hover. Icons in orange. CTA arrow animates right on hover.

Below the grid:
```
[Centered button — orange] Compare all six offerings →
```

#### 1.7 Featured Insight — White

**Layout:** Two columns. Left 60% image. Right 40% text.

```
[Caption] LATEST INSIGHT
[H3] Why pitchbook clients close faster when the deck is built on investor interviews
[Excerpt] In the last 18 months we ran 540 interviews on Series A
fundraising engagements. Here's the pattern in the rounds that
closed in 90 days vs the ones that took nine months.
[Byline] Dhiraj — Partner, Fundraising Practice
[CTA link] Read the full insight →
```

**Visual notes:** Image is an editorial-style illustration (use unDraw "data report" or similar, recolored to navy palette).

#### 1.8 GR Method — Navy

**Section heading (white):**
```
[H2] How we work.
[Sub-text] Same six steps across every offering.
```

**Six-step horizontal flow:**
```
[Step 1 — Icon: clipboard]    Scope
[Step 2 — Icon: ear]           Listen
[Step 3 — Icon: lightbulb]     Decide
[Step 4 — Icon: hammer]        Build
[Step 5 — Icon: ship]          Deliver
[Step 6 — Icon: gauge]         Measure
```

Below each step: one-line descriptor.

**Pull quote (centered below the flow, large serif):**
```
"Listen first. Decide together. Then we ship it."
```

**CTA at bottom:** `See the full GR Method →` (text link, white)

**Visual notes:** Animate the 6 steps in sequence on scroll-into-view. Each icon pulses briefly. Connected by a thin orange line that draws across as the animation triggers.

#### 1.9 Proof — Three Case Studies — White

**Section heading:**
```
[H2] Outcomes, not adjectives.
[Sub-text] Three from the last 24 months.
```

**Three case-study cards in a horizontal row:**

Card 1:
```
[Image — illustration of edtech / education theme]
[Tag] Edtech SaaS · UAE + Indonesia
[H3] 180,000+ students adopted in 6 months
[Stats] 340+ interviews · USD 500M IPO · 3 new features launched
[CTA link] Read case study →
```

Card 2:
```
[Image — illustration of industrial / aluminium theme]
[Tag] Industrials · UAE → Eastern Europe
[H3] 2.3x revenue growth in 12 months
[Stats] 35+ expert interviews · 6 months pilot saved · New market
[CTA link] Read case study →
```

Card 3:
```
[Image — illustration of food/CPG theme]
[Tag] FMCG · KSA expansion
[H3] 2x sales acceleration locally
[Stats] ICP-validated · 2 strategic partnerships · New office
[CTA link] Read case study →
```

**CTA below:** `See all 12 case studies →`

#### 1.10 About Strip — Navy

**Two-column layout:**

Left:
```
[H2 — white] Boutique. By design.

GreyRadius was founded in 2017 to do what we couldn't do inside
larger firms — sit close to the founder, close to the customer,
close to the data. Eight years later we're four partners and a
small team across Delhi, Dubai, Singapore, and Brussels. We've
delivered 200+ projects.

If you want a Big-3 brand on your invoice, we're not your firm.
If you want the partner who runs your engagement to also run the
discovery call, the workshop, the interviews, and the negotiation
— we are.

[CTA link] Meet the team →
```

Right:
- 4 partner photos in a 2x2 grid with names below: Chirag Bansal · Anshuman Kumar · Dhiraj · Pijush Sinha
- Photos circular, 120px diameter

#### 1.11 Industries Strip — Off-white, 6 icon tiles

**Section heading:**
```
[H2] Sectors we know cold.
```

**Six tiles in a row:**
1. Technology (icon: monitor)
2. BFSI (icon: bank/landmark)
3. Energy & Chemicals (icon: zap)
4. CPG / FMCG / Retail (icon: shopping-bag)
5. Healthcare & Life Sciences (icon: stethoscope)
6. IB & PE (icon: briefcase)

Each tile clickable, links to industry page.

**Sub-text below:** *Plus selective work in B2G and government advisory across India and the GCC.*

#### 1.12 Final CTA — Navy

**Centered, large:**
```
[H2 — white] Ready to talk about a real engagement?

[Sub-text] 30 minutes. No deck. No pitch. We'll ask three questions,
you'll ask three, and we'll both know whether there's something here.

[Primary CTA — orange] Book a 30-min discovery call
[Secondary CTA — white outline] Email a partner directly →
```

#### 1.13 Footer — Deep navy

**Four columns:**

```
[Col 1 — OFFERINGS]                  [Col 2 — INDUSTRIES]
Opportunity Assessment               Technology
Feasibility & TEV                    BFSI
Market Entry Execution               Energy & Chemicals
GTM Execution-as-a-Service           CPG / FMCG / Retail
Pitchbook & Fundraising              Healthcare & LSHC
AI Consulting & Transformation       IB & PE

[Col 3 — COMPANY]                    [Col 4 — CONTACT]
About                                India: Delhi
Team                                 UAE: Dubai
The GR Method                        Singapore
Why GreyRadius                       Belgium: Brussels
Case Studies                         hello@greyradius.com
Insights                             LinkedIn →
Careers
```

**Bottom strip:**
```
GreyRadius logo (small) · "Strategy you can execute. Outcomes within reach."
© 2026 GreyRadius Consulting · Privacy · Terms
```

---

### 2. ABOUT HUB — `/about/index.html`

**Page meta:**
- Title: `About GreyRadius — Boutique strategy and growth consulting`
- Description: `Founded 2017. Four partners across Delhi, Dubai, Singapore, Brussels. 200+ projects delivered.`

**Sections:**

#### 2.1 Hero — Navy

```
[H1 — white] Boutique. By design.

[Sub-head] We didn't set out to build the biggest consulting firm.
We set out to build the one our founders, CXOs, and government
clients actually wanted to work with — small enough to stay close,
deep enough to ship real outcomes.
```

**Visual:** Geometric illustration in orange + navy on the right (custom SVG: overlapping circles forming a "radius" pattern).

#### 2.2 The Story — White

Two-column narrative as written in the master plan. Use a thin steel-blue vertical line on the left as a margin accent.

#### 2.3 Where We Work — Off-white

Map illustration with 4 pins:
- Delhi, India — India SME, family-business strategy, fundraise advisory
- Dubai, UAE — GCC strategy, government advisory, market entry
- Singapore — Southeast Asia expansion, fundraising
- Brussels, Belgium — European entry and selective engagements

**Visual:** Stylised world map (SVG outline only, no detailed countries) with orange pin markers on the four cities. Click each pin to expand a card with location-specific copy.

#### 2.4 What We Stand For — Navy

Four-block grid:
- Output over advice
- Primary research over desk research
- AI-augmented over manual
- Boutique over scale

Each block: icon + heading + 2-line body.

#### 2.5 Timeline — White

Horizontal timeline visual with 6 nodes:
- 2017 Founded in Dubai
- 2019 First India office (Delhi)
- 2021 Singapore office opens
- 2022 Brussels office; selective European
- 2024 150 projects milestone
- 2026 Repositioned around six output-led offerings

**Visual:** Horizontal navy line with orange dots at each year. Year above the dot, milestone below.

#### 2.6 Press & Recognition — Off-white

Logo grid of any press mentions, awards, partnerships. If none, omit this section.

#### 2.7 Final CTA — Navy

`[Meet the team →] [See the GR Method →] [Read our case studies →]`

---

### 3. THE GR METHOD — `/about/method.html`

**Page meta:**
- Title: `The GR Method — How GreyRadius Consulting works`
- Description: `Listen → Decide → Ship. The six steps in every GreyRadius engagement.`

#### 3.1 Hero — Navy

```
[H1 — white] How we work.

[Sub-head] The same six steps across every engagement. The first
three earn the credibility. The last three deliver the outcome.
```

**Visual:** Custom SVG flowchart of the 6 steps, animating in sequence on page load.

#### 3.2 Six Steps — Long-form, alternating navy/white sections

Each of the 6 steps gets its own full-width section. Pattern:

**Step 1 — Scope (Navy)**
- Left: Step number large (1), step name (Scope), one-line tagline
- Right: Body copy describing what happens, what's produced, why it matters
- Bottom: Pull quote or stat

**Step 2 — Listen (White) — Most detailed step**

Sub-sections:
- The interviews (with bullet list of types: buyers, ex-employees, channel partners, regulators, sector experts, AI operators)
- The surveys (B2B panels, consumer panels, NPS, brand-tracking, win-loss, message-testing)
- The fieldwork (mystery shopping, site visits, distribution audits, user shadowing)

**Visual:** Three-column grid of "interview types" with icons.

**Step 3 — Decide (Navy)**
**Step 4 — Build (White)**
**Step 5 — Deliver (Navy)**
**Step 6 — Measure (White)**

(Use copy from master plan)

#### 3.3 Three Non-Negotiables — Off-white

Three callout cards:
1. Primary research is never skipped — minimum 10 conversations
2. Every engagement has a quantified, output-defined deliverable
3. Every key claim carries a primary-source citation (name + date)

#### 3.4 How AI Fits In — Navy

```
[H2 — white] How AI fits in.

We use AI internally — across every engagement — to compress
timelines and reduce cost. Specifically:
```

Two-column list of AI tools:
- Claude / ChatGPT — synthesis, draft writing, structured analysis
- Perplexity — desk research efficiency
- AlphaSense / Tegus / GLG — expert network access
- Excel Copilot — financial modelling
- Apollo + Clay — outreach automation
- Otter.ai / Fireflies — interview transcription
- Crunchbase + PitchBook — deal benchmarking

Below: *What AI doesn't replace: the interviews themselves, the synthesis to a decision, the execution muscle, the partner-led delivery.*

CTA: `Read the GR AI Delivery Playbook →`

#### 3.5 The Shorthand — Off-white, big serif

Large pull-quote-style:
> "Listen first. Decide together. Then we ship it."

#### 3.6 Final CTA — Navy

`Book a 30-min discovery call`

---

### 4. WHY GREYRADIUS — `/about/why-greyradius.html`

**Page meta:**
- Title: `Why GreyRadius — Boutique vs Big-4 vs DIY`
- Description: `Three things you won't get from Big-4. Three things you won't get from a freelancer or AI tool.`

#### 4.1 Hero — Navy

```
[H1 — white] Why GreyRadius.

[Sub-head] Three things you won't get from a Big-4. Three things
you won't get from a freelancer or an AI tool. We sit in the
middle — and the middle is where the work that matters actually
gets done.
```

#### 4.2 What You Won't Get From a Big-4 — White

Three blocks:
- Partner-led delivery
- Boutique pricing
- Decision-ready answers, not deck-ready ones

(Use copy from master plan)

#### 4.3 What You Won't Get From a Freelancer or AI Tool — Off-white

Three blocks:
- Primary research at scale
- Multi-disciplinary execution
- Accountability you can put on a P&L

#### 4.4 Three Pillars Deep Dive — Navy

Each pillar gets its own full block with icon + heading + 200-word narrative.

#### 4.5 Comparison Table — White

```
                     GR        Big-4      Freelancer/AI
Time to deliver      Fast      Slow       Variable
Price                $-$$      $$$$       $-$$
Partner involvement  Always    Rarely     N/A
Primary research     Always    Sometimes  Rarely
Execution            5/6 SKUs  Strategy-only  Discrete
Accountability       Outputs   Hourly     Hourly
AI velocity          Internal  Adopting   Replaceable
```

**Visual notes:** Highlight the GR column with navy background and white text. Other columns muted.

#### 4.6 Final CTA — Navy

---

### 5. SERVICES HUB — `/services/index.html`

**Page meta:**
- Title: `Services — Six output-led offerings | GreyRadius Consulting`
- Description: `Opportunity Assessment · Feasibility & TEV · Market Entry Execution · GTM-XaaS · Pitchbook & Fundraising · AI Consulting & Transformation`

#### 5.1 Hero — Navy

```
[H1 — white] Six offerings. One method.

[Sub-head] From the first question to the closed funding round —
boutique consulting built on real primary research, accelerated
by AI, delivered as measurable outcomes.
```

#### 5.2 The Six Offerings Grid — White

3-column × 2-row grid of large offering cards. Each card includes:
- Icon
- Offering name
- Tagline
- Bullet list of 3 outputs
- Duration
- Price band
- "Learn more" button

#### 5.3 Compare All Six — Off-white

Comparison table:

| | Duration | Price | Output | Best for |
|---|---|---|---|---|
| Opportunity Assessment | 2-3 weeks | USD 8-40k | Go/Defer/Kill | Pre-decision |
| Feasibility & TEV | 4 weeks | USD 25-150k | Bankable model | Bank-ready |
| Market Entry Execution | 6 months | USD 80-300k+ | Live entity | Going to market |
| GTM-XaaS | 90+ days | USD 35-180k+ | Pipeline + outcomes | Scaling |
| Pitchbook & Fundraising | 7-90 days | USD 3-25k+ | Closed round | Raising capital |
| AI Consulting & Transformation | 4 weeks - 6 months | USD 30-200k+ | Live AI pilot | AI strategy |

#### 5.4 Featured Case Studies — Navy

Three cards.

#### 5.5 Final CTA

---

### 6. SERVICE DETAIL TEMPLATE — applies to all 6 service pages

**Sections in order (same on every service page; content varies):**

1. **Hero (Navy)** — Headline (offering-specific question), sub-head, hero stat, primary CTA
2. **The Buyer's Question (White)** — One paragraph quoting the buyer's question
3. **What You Get (Off-white)** — Bullet list of named output deliverables
4. **The Primary Research Behind It (White)** — Interview type breakdown infographic
5. **Distinctive Section (varies per offering)** — see below
6. **The GR Method Applied (Navy)** — 6-step horizontal flow customised to this offering
7. **Featured Case Study (White)** — One named case + linked
8. **Pricing & Timeline (Off-white)** — Three-column pricing table
9. **Where AI Accelerates (White)** — 4-bullet list
10. **Comparison: Boutique vs Big-4 vs DIY (Off-white)** — 3-column table
11. **FAQ (White, accordion)** — 5-6 questions
12. **Related Resources (Off-white)** — Linked case studies, insights, next offering
13. **Final CTA (Navy)**

**Distinctive section per offering:**
- Opportunity Assessment: 3-tier pricing visible + decision matrix visual
- Feasibility & TEV: 15-item Bankability Checklist (downloadable PDF)
- Market Entry Execution: Month-by-month milestone breakdown (4 quarters)
- GTM-XaaS: Outcome-pricing calculator (interactive AlpineJS widget)
- Pitchbook & Fundraising: Sample pitchbook gallery (anonymised slides) + Closed deals showcase
- AI Consulting & Transformation: Four sub-offering breakdown + "Why we're not McKinsey QuantumBlack" callout

**For full copy of each service page, refer to the master content document.**

---

### 7. INDUSTRY DETAIL TEMPLATE — applies to all 6 industry pages

**Sections:**

1. **Hero (Navy)** — Industry name + how we deliver in this industry
2. **Industry narrative (White)** — 300-word industry POV in 2026
3. **Named clients (Off-white)** — Logo grid of clients in this industry
4. **How we deliver our 6 offerings in this industry (Navy)** — 6-row table
5. **Industry case studies (White)** — 3-5 cards
6. **Industry insights (Off-white)** — 3-5 linked articles
7. **Final CTA (Navy)**

**Industry-specific content:**

| Industry | Hero angle |
|---|---|
| Technology | Cross-sectional SaaS + tech product strategy |
| BFSI | Vision 2030 financial services + India consolidation |
| Energy & Chemicals | Decarbonisation + Saudi PIF entities |
| CPG/FMCG/Retail | India SME + GCC retail + Quick Commerce |
| Healthcare & LSHC | Pharma research + GCC government health entities |
| IB & PE | Deal advisory + portfolio support |

---

### 8. CASE STUDY TEMPLATE — applies to all 12 case studies

**Sections:**

1. **Hero (Navy)** — Client name (anonymised if needed) + industry + geography + one-line outcome
2. **Stats strip (Off-white)** — 3-5 outcome metrics
3. **Key Objectives (White)** — 4 bullet objectives
4. **Approach: Internal Stakeholder Alignment (White)** — How we worked with client teams
5. **Approach: External Research (Off-white, infographic)** — Interview counts + survey n + types
6. **Impact & Results (Navy)** — 3-5 specific outcome numbers
7. **Pull quote (White, large serif)** — Named buyer testimonial if permitted
8. **Related offerings + case studies (Off-white)**
9. **Final CTA (Navy)**

**Phase 1 case study list:**
1. Edtech SaaS — UAE + Indonesia (340+ interviews, $500M IPO)
2. Aluminium Refining — UAE → Eastern Europe (2.3x revenue)
3. Performance Food — KSA (2x sales acceleration)
4. UPro — Series A fundraise
5. ShineOn — Cleaning Services GCC (full pitchbook + funding)
6. Fujairah Bunkering — TEV + JV
7. Edtech GCC — Market entry + funding
8. Pharma Portfolio Intelligence (Abbott / GSK)
9. ADCG — Sub-sector opportunity assessment
10. SaaS GTM (Procol / Trinetra)
11. AI initiative (anonymised) — AI Opportunity Assessment + pilot
12. Vision 2030 entity (anonymised) — Government AI strategy

---

### 9. INSIGHTS HUB — `/insights/index.html`

**Sections:**

1. Hero — "Insights from the GreyRadius team."
2. Featured article (large card)
3. Recent articles (3-column grid)
4. Categories filter sidebar (Market Entry, Fundraising, AI in Consulting, Primary Research, GTM Execution, Brand)
5. Newsletter signup (small block)

---

### 10. INSIGHT ARTICLE TEMPLATE

**Sections:**

1. Hero — Title + author byline + date + category
2. Lead paragraph
3. Article body with H2/H3 subheads
4. Pull quote at 60% scroll
5. Author bio block
6. Related articles (3 cards)
7. CTA (Book discovery call)

---

### 11. CONTACT — `/contact.html`

**Sections:**

1. Hero — "Let's talk."
2. Four location cards (India, UAE, Singapore, Belgium) with address, phone, email, partner name for each
3. Contact form (Name, Email, Phone optional, Company, "What are you exploring?", Geography)
4. Calendly embed for a 30-min call
5. Office hours strip

---

### 12. CAREERS — `/careers.html`

Light page. "We hire from time to time. If you're a senior consultant with 5+ years in [strategy / market research / fundraising advisory] and want to work in a boutique with founder access, email us at careers@greyradius.com."

---

### 13. LEGAL — `/legal/privacy.html` and `/legal/terms.html`

Boilerplate privacy and terms — placeholder text fine; will be reviewed by counsel.

---

## ILLUSTRATION & VISUAL DELIVERABLES

For every page, ensure:

1. **One hero illustration or animation** — custom SVG matching brand palette
2. **One section illustration** per major content section (use unDraw or AI-generated, recoloured to navy + orange)
3. **Process diagrams** as inline SVG (not raster)
4. **Icons** from Lucide library, consistent stroke and size

**Specific illustrations to create:**

- Homepage hero — Animated radial graphic (6 orbital points around central anchor)
- About page hero — Geometric "radius" illustration (overlapping circles)
- About locations — Stylised world map with 4 pins
- About timeline — Horizontal year-by-year flow with dots
- GR Method hero — Six-step animated flowchart
- Each service page hero — Abstract geometric illustration suggesting the offering's theme:
  - Opportunity Assessment: a compass / decision diamond
  - Feasibility & TEV: a financial graph / sturdy column
  - Market Entry Execution: a map with a flag
  - GTM-XaaS: a rocket / pipeline visual
  - Pitchbook & Fundraising: a deck of slides ascending
  - AI Consulting: a neural-network-style mesh
- Each industry page hero — Industry-specific geometric icon scaled large
- Each case study — Industry-specific abstract illustration
- Insights articles — Editorial-style header illustration

**Use a consistent illustration grammar:** thin lines, navy + orange + steel-blue, geometric shapes (circles, lines, dots), no human figures, no stock photography.

---

## WORDPRESS MIGRATION INSTRUCTIONS

The output of this Replit build will be migrated into WordPress. Build with these constraints:

### Migration approach (recommended)

**Option A — Bricks Builder or Elementor**

1. Take the static HTML output and rebuild each page in Bricks/Elementor using the same components.
2. Map each Replit section to a Bricks/Elementor section.
3. Reuse the CSS classes — both builders accept custom CSS.

**Option B — Gutenberg block theme (FSE)**

1. Convert each section into a custom block pattern.
2. Use the WordPress Site Editor to assemble pages from patterns.
3. Reuse the CSS as theme.json design tokens.

**Option C — Custom theme**

1. WordPress developer takes the HTML/CSS and builds a custom theme.
2. Each page template becomes a `.php` file (page-home.php, single-service.php, etc.).
3. Service offerings become a custom post type (`service`).
4. Industries become a custom post type (`industry`).
5. Case studies become a custom post type (`case_study`).
6. Insights stay as standard `post` with custom categories.

### To make migration smoother

1. **Keep CSS classes semantic and BEM-style** — `.hero-block`, `.offering-card`, `.method-step`. WordPress devs reuse these directly.
2. **Avoid framework-specific patterns** — don't use React state, don't use Vue directives, don't use complex Tailwind class compositions that won't transfer cleanly.
3. **Use AlpineJS for interactivity** — it works inside Bricks/Elementor too.
4. **Externalise images and assets** — keep `/assets/images/` portable.
5. **Use semantic HTML** — `<article>`, `<section>`, `<aside>` migrate cleanly to Gutenberg.
6. **Provide a README.md** with: file structure, key classes, AlpineJS components used, and migration notes.

### Custom post type schema (for the WordPress dev to set up)

```
Service
- title
- offering_name (string)
- duration (string)
- price_band (string)
- hero_question (text)
- buyer_question (text)
- what_you_get (repeater of bullets)
- primary_research_breakdown (repeater)
- distinctive_section_html (rich text)
- pricing_tiers (repeater of tier name, price, duration, scope)
- ai_acceleration (repeater of bullets)
- comparison_table (table)
- faq (repeater of question + answer)
- related_case_studies (post relationship)
- featured_image
- seo_title, seo_description

Industry
- title
- industry_name (string)
- hero_angle (text)
- narrative (rich text)
- named_clients (repeater of client name + logo)
- offering_in_industry (repeater of offering + how it shows up)
- related_case_studies (post relationship)
- related_insights (post relationship)
- featured_image

Case Study
- title
- client_name (string, anonymised if needed)
- industry (taxonomy)
- geography (taxonomy)
- offerings_used (taxonomy / multi-select)
- hero_outcome (text)
- stats (repeater of metric + value)
- key_objectives (repeater)
- internal_alignment (rich text)
- external_research (repeater of research type + count)
- impact_results (repeater of outcome + metric)
- pull_quote (text + attribution)
- featured_image
```

### Plugins to install on WordPress

- **Yoast SEO** or **Rank Math** — for SEO
- **WP Rocket** — for caching/performance
- **Smush** or **ShortPixel** — for image optimisation
- **Advanced Custom Fields PRO** — for the custom fields above
- **WP Forms** or **Gravity Forms** — for the contact form
- **WPML** or **Polylang** — only if multi-language is needed (probably not)

---

## DELIVERABLES CHECKLIST

When the Replit build is complete, deliver:

1. ✅ Full file structure as specified
2. ✅ All 35 pages built and functional
3. ✅ Mobile-responsive across all breakpoints
4. ✅ Tested in Chrome, Safari, Firefox, mobile Safari
5. ✅ Lighthouse scores 90+ for Performance, Accessibility, SEO, Best Practices
6. ✅ All forms submit to a placeholder endpoint (the WP dev will wire to the real backend)
7. ✅ All AlpineJS interactions working (mobile menu, FAQ accordion, tabs)
8. ✅ Hero radial animation working (or fallback static SVG)
9. ✅ All copy as specified above
10. ✅ All illustrations created (custom SVG or unDraw recoloured)
11. ✅ All icons consistent (Lucide library)
12. ✅ XML sitemap generated
13. ✅ Schema.org markup on all relevant pages
14. ✅ Open Graph + Twitter Card meta tags
15. ✅ README.md with build instructions + WordPress migration notes
16. ✅ Zipped deliverable ready to hand to WordPress developer

---

## BUILDING ORDER (suggested)

1. **Day 1-2:** Set up project structure, build design system (colours, typography, components in a `/styleguide.html` page)
2. **Day 3-5:** Build homepage end-to-end as the master template. All other pages reuse its components.
3. **Day 6-8:** Build About hub, Team, GR Method, Why GreyRadius
4. **Day 9-12:** Build Services hub + 6 service pages
5. **Day 13-15:** Build Industries hub + 6 industry pages
6. **Day 16-18:** Build Case studies hub + 12 case study pages (or 6 fully + 6 stubs)
7. **Day 19-20:** Build Insights hub + 6 launch articles
8. **Day 21:** Build Contact, Careers, Legal pages
9. **Day 22-23:** Mobile QA, accessibility QA, performance optimisation
10. **Day 24-25:** Final polish, illustration finalisation, README, deliverable handoff

Total estimated build time: 25 working days for a single developer; 12-15 days for a 2-person team.

---

## QUESTIONS BEFORE BUILDING

If the Replit Agent or developer has questions, the answers are:

- **Logo files:** If not provided, create a placeholder using two concentric SVG circles with a small dot at the center — labelled "GreyRadius" in Inter Tight 700.
- **Partner photos:** If not provided, use placeholder silhouette avatars; mark for replacement.
- **Client logos:** Use grey monochrome placeholders if real logos aren't provided. Mark for replacement.
- **Real case-study numbers:** All numbers in this brief are real and from GreyRadius's portfolio. Use them as written.
- **Pricing display:** Display all 3-tier pricing as written. The team has chosen transparent pricing as a positioning move.
- **Form backend:** Use a placeholder endpoint (e.g., `/api/contact`). The WordPress dev will wire to real CRM integration.
- **Animations:** Keep them subtle. No spinning text, no flying elements. Just gentle fade-ins on scroll, gentle pulse on key CTAs.
- **Geographic personalisation:** Build the site as one universal version. The geo-aware nav (India/UAE/SG/BE) can be added in Phase 2 — for now, the contact page handles geographic split.

---

## CONTEXT CONTACTS

For any clarification:
- **Programme lead:** Chirag Bansal (chiragbansal@greyradius.com)
- **Workstream owner:** Dhiraj
- **Brand voice questions:** Refer to the GreyRadius Voice Guide section above
- **Service offering questions:** Refer to the Six Offerings section above

---

## END OF PROMPT

This is a complete, self-contained brief. Build the Replit project from this document. When done, deliver a zipped folder of static HTML/CSS/JS that the WordPress developer can migrate.

Build with care. The buyer is sophisticated. The work has to read as boutique — not generic.
