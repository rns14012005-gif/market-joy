# Migration report (2026-10-28)
Counts (source -> converted): case studies 39->39, industry news 12->12, press release 1->1, JoyPedia 153->153, testimonials 38->38. FAQs: 8 published, 43 questions pending (no answer text in any export).
Fixed in this pass: 13 images dropped from case studies (images wrapped in headings) restored; image fallback to marketjoy.com for all migrated images; testimonials shown on /client-reviews/; FAQ data file + dedupe; /what-our-clients-say/ 301; sitemap-content.xml.
Open: copy 229 images (node scripts/fetch-wp-images.mjs), supply FAQ answers, SEO fields (not in exports), run npm install/build/test (not possible in the sandbox).
Re-run checks: python3 scripts/validate-migration.py <export folder>
