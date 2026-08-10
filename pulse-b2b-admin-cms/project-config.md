# Project config — fill once per client

Agents: if this file is empty or still contains placeholders, ask the user or read `docs/pems.md` before scaffolding.

## Identity

| Field | Value |
|---|---|
| Client / project name | United Farmer and Industry Co LTD |
| Legal / display name | UFI Co., LTD |
| Primary domain | https://uficoltd.com |
| Admin seed email | sales@uficoltd.com (`ADMIN_EMAIL` / `ADMIN_PASSWORD`) |
| Product domain (1 line) | Premium wholesale refined sugar (Thailand) |

## Brand tokens

| Semantic role | CSS variable in this project | Tailwind / utility class |
|---|---|---|
| Token prefix | `brand` | |
| Primary | `--brand-color-primary` (`#0ba22e`) | `bg-brand-primary` / `text-brand-primary` |
| Primary hover | `--brand-color-primary-hover` (`#088a26`) | `bg-brand-primary-hover` |
| Secondary / accent | `--brand-color-secondary` (`#273647`) | `border-brand-secondary` |
| Background | `--brand-color-bg` | `bg-brand-bg` |
| Surface | `--brand-color-surface` | `bg-brand-surface` |
| Text | `--brand-color-text` | `text-brand-text` |
| Muted | `--brand-color-text-muted` | `text-brand-muted` |
| Border | `--brand-color-border` | `border-brand-border` |
| Error | `--brand-color-error` | `text-brand-error` |
| Success | `--brand-color-success` | `text-brand-success` |
| Radius md | `--brand-radius-md` | `rounded-[var(--brand-radius-md)]` |
| Container width | `--brand-container` | `max-w-[var(--brand-container)]` |
| Display font | `--font-display` (Inter) | `font-display` |

**Rule:** Admin classes must use **this table**, not another client’s prefix.

## Modules

Mark each: `on` | `off` | `later`

### Core (required)

| Module | Status |
|---|---|
| Login + session gate | on |
| Dashboard | on |
| Users / roles (seed admin at minimum) | on |

### Sales

| Module | Status | Notes |
|---|---|---|
| Quotes / RFQ | on | Product enquiry form → QuoteRequest |
| Inquiries / contact | on | Contact form → Inquiry |
| Dealers | on | Admin queue; no public form in v1 |
| Distributors | on | Admin queue; no public form in v1 |

### CMS

| Module | Status | Notes |
|---|---|---|
| Products (+ specs / packaging / images) | on | Seeded from content/products.json |
| Categories | on | Implicit via products; seeded from categories.json |
| Certifications | later | |
| Site pages (fixed slugs) | on | Seeded from content/pages.json |
| Media library (dedicated) | later | URL attach is enough for v1 |

## Stack assumptions

| Layer | Expected default | This project |
|---|---|---|
| Framework | Next.js App Router | Next.js 16 (`src/app`) |
| DB | Prisma (SQLite local / Postgres prod) | Prisma + SQLite local |
| Auth | Auth.js credentials → `/admin/login` | Auth.js (next-auth v5) |
| Styling | Tailwind + CSS variables | Tailwind v4 + brand tokens |
| Mutations | Server Actions | Server Actions |
| Email (optional) | Resend or existing mailer | Resend (existing) |
| Media (optional) | Supabase Storage or URL-only | URL-only |

## Out of scope for v1 (unless user insists)

Inventory, freight, analytics, newsletter, global search, MFA/SSO, custom RBAC UI, rich blog CMS, Certifications UI, public dealer/distributor forms.
