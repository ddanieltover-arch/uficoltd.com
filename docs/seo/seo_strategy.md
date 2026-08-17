# SEO + GEO strategy — UFI Co., LTD

## Objective

Make uficoltd.com the cited English-language source for **Thailand-origin wholesale refined sugar**: grade selection (ICUMSA), export process, and RFQ conversion.

## Positioning

UFI is a manufacturer/exporter in Khonkaen, not a consumer grocery brand. Copy, titles, and schema must speak to importers, food manufacturers, and distributors. Do not compete on retail recipes.

## Pillar–cluster model

- **Pillar:** Homepage + `/shop` (commercial)
- **Trust pillars:** `/about-us`, `/quality-standard`, `/manufacturing-process`, `/purchasing-procedures`
- **GEO pillars:** `/faq`, `/glossary`, `/insights`
- **Clusters:** product pages (one primary grade keyword each) and insight articles

## Technical principles

- One canonical per URL; no fake product prices or review stars
- AI crawlers allowed; `llms.txt` at root
- ISR with `revalidatePath` on CMS writes
- English-only; no hreflang until a real locale exists

## Content cadence

Cornerstone Insights (6) ship with this implementation. The 90-day calendar in `content_calendar.csv` is the publishing backlog — two pieces per week is the target after launch, edited in `/admin/insights`.

## Off-site

GBP, citations, and outreach are not in the repo. Follow `offsite_checklist.md`.
