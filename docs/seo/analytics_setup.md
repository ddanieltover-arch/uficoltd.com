# Analytics and Search Console setup

## Environment variables

Set in Vercel (Production + Preview) and local `.env`:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=token-from-gsc
```

Restart the app after changing env vars. Do not commit real IDs.

## Google Analytics 4

1. Create a GA4 property for https://uficoltd.com
2. Copy the Measurement ID (`G-…`) into `NEXT_PUBLIC_GA_MEASUREMENT_ID`
3. The site loads gtag with `lazyOnload` via `src/components/seo/GoogleAnalytics.tsx`
4. Successful contact and product enquiry forms fire `generate_lead` (`src/lib/analytics.ts`)
5. In GA4 Admin → Events, mark `generate_lead` as a conversion
6. Enable enhanced measurement (scroll, outbound clicks) in the web data stream
7. Link GA4 to Google Search Console when both are verified

## Google Search Console

1. Add a **Domain** property for `uficoltd.com` (DNS TXT) or URL-prefix with the HTML tag
2. If using the HTML tag, paste the content token into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
3. Submit `https://uficoltd.com/sitemap.xml`
4. Confirm `robots.txt` allows Googlebot and lists the sitemap
5. Monitor Coverage, Experience (CWV), and Enhancements after Insights/FAQ schema is live

## What this repo does not do

- DNS TXT records
- BigQuery export
- Looker Studio dashboards (see `kpis_dashboard.md` for metrics to wire)
