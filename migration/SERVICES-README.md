# Services + products migration (from WordPress export, 2026-10-27)
17 published pages: 13 services (B2B lead generation, list building, digital marketing, appointment setting, sales facilitation,
outbound SDR, finance & accounting, AI SEO, AEO, GEO, omnichannel, lead-generation-services-v1, guaranteed-sales-qualified-leads)
+ /products/ hub + InfoJoy, Buyer Intent, Web Traffic Revealer.
Source: Rank Math title/description/robots/focus keyword + rendered Elementor content from the export (no scraping).
Re-run: pip install lxml; python scripts/migrate-services-xml.py <export.xml> --out .
Images: node scripts/fetch-wp-images.mjs  (reads migration/services-images.csv list; saves to public/wp-content)
Redirects: src/content/redirects.ts built from the Rank Math CSV (active rows only).

## Products section (added 2026-10-29)
- `python3 scripts/polish-products.py` cleans the 4 product entries (hard <br> wraps, orphan text, duplicate headings, old WP links -> new routes, alt text, hub rebuilt). Re-runnable.
- Images: `node scripts/fetch-wp-images.mjs migration/products-images.csv` (run where marketjoy.com is reachable). Until then pages hotlink marketjoy.com via `wp-images.ts`; **that fallback stops working once marketjoy.com points at the new site**, so download them before DNS cutover.
- SEO: head() in `src/routes/$.tsx` adds og:image fallback (+alt, updated_time), Service JSON-LD per product, CollectionPage JSON-LD on /products/, FAQPage from each page's own accordion. Short names/serviceType live in `PRODUCT_META` (`src/content/services/loader.ts`).
- Tests: `src/test/products.test.ts` (links resolve, markup clean, SEO fields, sitemap + image-list coverage).
