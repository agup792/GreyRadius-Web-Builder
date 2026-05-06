# GreyRadius Consulting

A multi-page consulting firm website for GreyRadius, served as static HTML/CSS from `greyradius-website/` via a Vite dev server, plus a TypeScript/Express API backend.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
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
- `greyradius-website/assets/css/styles.css` — all CSS, design tokens, light-theme overrides at bottom
- `greyradius-website/assets/images/logo-dark.svg` — navy/orange SVG logo (used in header)
- `greyradius-website/assets/images/logo.png` — PNG logo (from attached_assets, used in footer)
- `artifacts/greyradius/vite.config.ts` — Vite config; root points to `../../greyradius-website`
- `artifacts/greyradius/src/` — React scaffold (not actively used for rendering)

## Architecture decisions

- The `artifacts/greyradius` React app is a scaffold only — `vite.config.ts` overrides `root` to point to `greyradius-website/` (a sibling directory), so all pages are plain HTML/CSS.
- Light-theme CSS overrides are appended at the bottom of `styles.css` rather than changing base rules, keeping the original dark-theme code intact for reference.
- Google Fonts Montserrat is loaded via `<link>` in each HTML file's `<head>`; font variables in `:root` map to Montserrat.
- The nav uses `top-nav--solid` (white background) now that the hero is light; the original `top-nav--transparent` dark variant still exists in CSS for potential re-use.

## Product

- Multi-page consulting website for GreyRadius: homepage, 6 service pages, 6 industry pages, about/team/method pages, case studies, insights, contact
- Light grey/white theme with dark navy text and orange (#E8693A) CTAs
- Montserrat font site-wide; animated radial SVG hero graphic

## User preferences

_Populate as you build._

## Gotchas

- Do NOT edit `artifacts/greyradius/src/App.tsx` to add content — Vite's `root` is `greyradius-website/`, so React files are not rendered.
- The `artifacts/greyradius/src/index.css` (Tailwind) is not served — all live styles are in `greyradius-website/assets/css/styles.css`.
- Light-theme CSS overrides are at the **bottom** of `styles.css`; later rules win.
- The nav logo needs `.nav-logo img { height: 38px !important; }` because the base reset applies `height: auto` to all `img` elements.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
