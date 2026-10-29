# Industries migration (from WordPress export, 2026-10-26)
34 published pages: /industries/ (hub, noindex), 14 top-level industries, 7 manufacturing + 5 chemical sub-pages,
/construction-lead-generation/ + 6 sub-pages.
Source: Rank Math title/description/robots + rendered Elementor content from the export (no scraping).
Re-run: pip install lxml; python scripts/migrate-industries-xml.py <export.xml> --out .
Images: node scripts/fetch-industry-images.mjs  (reads migration/industries-images.csv, saves to public/wp-content)
Report: migration/industries-report.json (per-page SEO, FAQs, images, dropped items, internal links)
scripts/migrate-industries.mjs is the older live-site scraper; the XML script supersedes it.
