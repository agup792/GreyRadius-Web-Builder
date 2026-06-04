# GreyRadius Consulting

A multi-page consulting firm website for GreyRadius, served as static HTML/CSS from `greyradius-website/` via a Vite dev server, plus a TypeScript/Express API backend.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm run og:generate` — generate only missing OG images (skips existing files)
- `pnpm run og:generate:force` — regenerate all OG images from scratch (full consistency refresh)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: Static HTML + CSS (in `greyradius-website/`), served via Vite dev server
- React artifact in `artifacts/greyradius/src/` is scaffolding only — Vite points to `greyradius-website/` as root
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `greyradius-website/` — the actual website (HTML pages, CSS, images)
- `greyradius-website/assets/css/styles.css` — all CSS, design tokens, light-theme overrides at bottom (lines ~1507+)
- `greyradius-website/assets/images/logo-dark.svg` — navy/orange SVG logo (header)
- `greyradius-website/assets/images/logo-light.svg` — white logo (footer, transparent nav)
- `artifacts/greyradius/vite.config.ts` — Vite config; root points to `../../greyradius-website`
- `artifacts/greyradius/src/` — React scaffold (not actively used for rendering)

## Architecture decisions

- The `artifacts/greyradius` React app is a scaffold only — `vite.config.ts` overrides `root` to point to `greyradius-website/` (a sibling directory), so all pages are plain HTML/CSS.
- Light-theme CSS overrides are appended at the **bottom** of `styles.css`; later rules win. Do not move these.
- **Nav fix (critical):** The JS `main.js` calls `updateNav()` on page-load which forces `top-nav--transparent` (white links) regardless of HTML class. Since all pages are now light-theme, a CSS override at the bottom of `styles.css` forces `.nav-link { color: navy !important }` and gives `.top-nav--transparent` a white/blur background — so links are always visible.
- Google Fonts Montserrat loaded via `<link>` in each HTML `<head>`; all inner pages should use Montserrat not Inter.
- `--transition-fast` is defined in `:root` at the bottom of `styles.css` (alias for `all 0.15s ease`).

## Product

- Multi-page consulting website for GreyRadius: homepage, 6 service pages, 6 industry pages, about/team/method pages, case studies, insights, contact
- Light grey/white theme with dark navy text and orange (#E8693A) CTAs
- Montserrat font site-wide; animated radial SVG hero graphic
- 12 client logos in trust strip (all from deck brief)
- 5 core team + Dhiraj placeholder (pending bio) + 10 named senior advisors with exact titles

## User preferences

- Use real data from the PDF deck / asset brief — no placeholders except Dhiraj (bio pending from Chirag)
- Advisor titles must match the brief exactly: Senior Advisor & Consultant (×7), Principal Consultant (Meghna), Sr Consultant (Sushil), Manager (Supra)
- Stats: 200+ projects, 100+ SaaS products, 80% primary-research-led, 4 countries/offices, 9 years
- **Dashes**: Always use en dash (– / &#8211;), NEVER em dash (— / &#8212; / &mdash;) anywhere on the site
- **Industry pages must have visuals**: All industry/sub-industry pages need inline SVG icons and decorative graphics — not plain text-only cards. See icon patterns below.

## Gotchas

- Do NOT edit `artifacts/greyradius/src/App.tsx` — Vite's `root` is `greyradius-website/`, React files are not rendered.
- The `artifacts/greyradius/src/index.css` (Tailwind) is not served — all live styles are in `greyradius-website/assets/css/styles.css`.
- Light-theme CSS overrides are at the **bottom** of `styles.css`; later rules win.
- Nav logo needs `.nav-logo img { height: 38px !important; }` — base reset applies `height: auto` to all `img`.
- The nav JS forces `top-nav--transparent` on every page-load (scrollY=0). The CSS light-theme override at the bottom counters this — do not remove those rules.
- Any new inner pages: use Montserrat font link, not Inter. Add full nav with Industries dropdown.

## Industry page visual conventions (167 pages + future batches)

All industry pages generated from `greyradius-website/templates/industry-page-template.html` use these inline SVG icon patterns:

- **MARKET INSIGHTS cards**: orange icon badge (38×38px, rgba(232,105,58,0.1) bg, 8px radius) cycling 4 icons — TrendingUp / Globe / BarChart / Zap — placed before the `<p>` text
- **CHALLENGES WE SOLVE cards**: check SVG (`polyline points="20 6 9 17 4 12"`, orange) as first child of the title `<p>` (display:flex)
- **MARKET CHALLENGES list items**: right-arrow SVG (`polyline points="9 18 15 12 9 6"`, orange) + `<span>` wrapper inside each `<li>` (display:flex)
- **DIFFERENTIATORS**: 52×52px orange-tinted rounded square containers with Lucide SVG icons (microscope = research, zap = AI, target = outcomes) replacing emoji
- **Hero section**: `position:relative;overflow:hidden;` on `<section>`, plus a 260×260px radial SVG decoration (concentric circles + axis lines, opacity 0.08, positioned absolute right 4%) inside the container

When generating future batches, apply all five icon patterns. Use inline Python via bash heredoc — no separate script files.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- Asset brief: `attached_assets/Pasted--GreyRadius-Replit-Asset-Reuse-Content-Brief-Companion-_1778069698084.txt`
