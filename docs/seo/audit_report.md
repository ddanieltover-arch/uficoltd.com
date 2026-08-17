# SEO / GEO pre-optimization audit — uficoltd.com

**Date:** 2026-08-17  
**Method:** Repository crawl (not a live Screaming Frog / Lighthouse run). Live CWV and GSC coverage should be captured after deploy.

## Site profile

| Field | Value |
|---|---|
| Brand | United Farmer and Industry Co LTD (UFI Co., LTD) |
| Domain | https://uficoltd.com |
| Niche | B2B wholesale refined sugar export (Thailand origin) |
| Language | English only |
| Stack | Next.js 16 App Router, Prisma, Pulse admin CMS |
| Conversion | Contact form + product RFQ (no public prices / checkout) |

## Crawl inventory (codebase)

See `keyword_map.csv` for keyword assignment. Indexable public URLs before this work:

| URL | Page type | Title (before) | Description (before) | Canonical | Schema | Notes |
|---|---|---|---|---|---|---|
| `/` | Homepage | Root default | Tagline only | Missing | None | H1 “Refined Sugars / Pure, Premium” |
| `/shop` | Catalogue | Inherits home | Inherits home | Missing | None | Client-side filter only |
| `/about-us` | About | About Us | Thailand supplier | Missing | None | CMS body still named Interwest / Hua Mak |
| `/contact-us` | Contact | Contact Us | Present | Missing | None | Strong NAP |
| `/manufacturing-process` | Service | Title only | Missing | Missing | None | Long WP-migrated copy |
| `/purchasing-procedures` | Service | Title only | Missing | Missing | None | |
| `/quality-standard` | Service | Title only | Missing | Missing | None | |
| `/product/[slug]` | Product | Product name | Excerpt | Missing | None | OG image only |
| `/product-category/[slug]` | Category | Category name | Thin count string | Missing | None | |
| `/sitemap.xml` | Technical | — | — | — | — | lastModified always `new Date()` |
| `/robots.txt` | Technical | — | — | — | — | Blocks `/admin`; no AI bot rules |
| `/admin/*` | Admin | Per-page noindex | — | — | — | Layout-level noindex missing |
| `/faq` | Gap | — | — | — | — | Not present |
| `/glossary` | Gap | — | — | — | — | Not present |
| `/insights` | Gap | — | — | — | — | Blog out of CMS v1 scope |

## Flags

- Duplicate product: `/product/icumsa-100-150-sugar` and `/product/icumsa-100-150-sugar-2` (same title).
- Entity conflict: About CMS vs footer NAP (Interwest / Bang Kapi vs UFI / Khonkaen).
- All public routes `force-dynamic` — weaker caching than ISR.
- No JSON-LD, no `alternates.canonical`, no GA4 / GSC verification.
- No `llms.txt`. AI crawlers not explicitly allowed.
- WordPress-era 301s already exist (`/cart`, `/checkout`, numeric slugs).

## Core Web Vitals

Baseline not measured in this pass (no Lighthouse CI against production). In-repo levers: `next/font` Inter already self-hosted; hero images use `priority`; ISR/revalidate will replace blanket `force-dynamic` on public pages.

## Indexability baseline

Google Search Console and GA4 were not connected. Sitemap exists at `/sitemap.xml` but was not known to be submitted.
