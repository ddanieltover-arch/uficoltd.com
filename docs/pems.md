# Pulse Engineering Memory System — UFI Co., LTD

## Project profile

| Field | Value |
|---|---|
| Client | United Farmer and Industry Co LTD (UFI Co., LTD) |
| Domain | https://uficoltd.com |
| Product | Premium wholesale refined sugar export (Thailand) |
| Repo | uficoltd-web |

## Technology profile

- Next.js 16 App Router (`src/app`)
- React 19, TypeScript, Tailwind v4
- Prisma + **Postgres** (`DATABASE_URL`) — required on Vercel (no SQLite)
- Auth.js (credentials) for `/admin` — needs `AUTH_SECRET` + `AUTH_URL` on Vercel
- Resend for public contact / enquiry email
- Brand token prefix: `brand` (green primary `#0ba22e`, navy secondary `#273647`)

## Design profile

- Marketing site: green/navy brand, Inter, atmospheric gradients
- Admin: dense ops UI using semantic `brand-*` tokens (primary, surface, muted, border, etc.)
- Never use `tg-*` or other client palettes

## Admin CMS (enabled)

| Module | Status |
|---|---|
| Login + session gate | on |
| Dashboard | on |
| Quotes | on |
| Inquiries | on |
| Products | on |
| Dealers | off |
| Distributors | off |
| Site pages | on |
| Insights (lean articles) | on |
| Certifications | later |

Seed admin: `ADMIN_EMAIL` (default / configured `sales@uficoltd.com`) / `ADMIN_PASSWORD` (default `ChangeMeNow!UFI` — change in production).

Setup: copy `.env.example` → `.env`, then `pnpm db:setup` (or `npm run db:setup`). Login at `/admin/login`.

## Architecture notes

- Layers: `app/admin` → `components/admin` → `actions/admin*` → `services` → Prisma
- Roles: SUPER_ADMIN, ADMIN, EDITOR, SALES_MANAGER, READ_ONLY
- Public contact → Inquiry; product enquiry → QuoteRequest; both still send Resend email
- Storefront products/categories/pages/insights read from Prisma after seed (JSON fallback when `DATABASE_URL` is unset)
- Public SEO: `src/lib/seo.ts` metadata helper, JSON-LD in `src/lib/schema.ts`, `/faq` `/glossary` `/insights`, `public/llms.txt`
- Related links: every public template mounts `RelatedLinks` from `src/config/related-links.ts` (5–7 keyword internal links + 2 authority outbound)
- Analytics: optional `NEXT_PUBLIC_GA_MEASUREMENT_ID` and `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`

## Active work

- Pulse B2B Admin CMS v1 scaffolded per `pulse-b2b-admin-cms`
- Public catalogue falls back to `content/*.json` when `DATABASE_URL` is unset (Vercel build-safe). Admin CMS still needs a durable hosted DB in production (not SQLite on serverless).
- SEO + GEO pass (2026-08): unique metadata/canonicals, schema, Insights CMS, FAQ/glossary, GA4 hooks. Off-site GBP/GSC DNS remains a manual checklist in `docs/seo/offsite_checklist.md`.
