# JoyPedia migration (WordPress -> React)

Source: `joypedia.json` from `cpt-export.zip` (WP REST fields: id, date, modified, slug, link, title, content, featured_media, acf).

## Re-run
```
pip install beautifulsoup4
python scripts/migrate-joypedia.py path/to/joypedia.json --out .
python scripts/verify-joypedia.py  path/to/joypedia.json
```

## Counts (verified, not assumed)
| Source records | Converted | Elementor pages | Plain-HTML stubs | Failed |
|---|---|---|---|---|
| 153 | 153 | 144 | 9 | 0 |

Text check: for all 153 records, converted text equals source text minus only the intentional drops below.

## Intentionally dropped (all counted in report.json)
- 288 `posts` widgets (+ their "Latest Blogs" / "Latest Case Studies" headings): dynamic WP related-post cards. All 576 images in the export live inside these cards; the article bodies contain no images.
- 144 first headings identical to the page title (the page hero already shows it as the H1).
- 135 "CTA"/"CTA:" label headings (editor labels). The paragraph that follows is kept and rendered as a call-out block.
- 2 exact consecutive repeated paragraphs (source typo): `sales-enablement`, `retention-rate`.
- Word/Elementor wrapper markup (SCXW spans, data-* attributes, icon SVGs). Headings, paragraphs, lists, links, bold/italic are kept.

## SEO
| Field | In export? | Status |
|---|---|---|
| Slug | yes | preserved 153/153 |
| Original URL (`link`) | yes | preserved; `url-map.csv` maps each old URL to the identical new path |
| Canonical | no | site generates `https://marketjoy.com/joypedia/<slug>/`, which equals the original permalink (not read from the export) |
| SEO title | no | NOT in export. Page title = post title + " \| MarketJoy" |
| Meta description | no | NOT in export. Derived from the first body sentence (flagged `seo.*: null` in each entry) - review/replace |
| Robots / noindex | no | not in export; site default applies |
| Image alt text | n/a | no article images in export |
| Redirects | no | none in export; none needed while paths are identical |
| Published/modified dates | yes | kept in data, not displayed (all are 2026 - likely a re-import date, not the original publish date) |

## Open items
1. Title collisions (not deleted, slugs kept): `competitive-analysis` (stub) vs `competitive-analysis-2` (full); `cross-selling` vs `cross-selling-2` (stub vs full); `value-proposition` vs `value-proposition-2` (two full, differing versions). Decide which is canonical and whether to 301 / noindex the other.
2. 9 records are short plain-HTML stubs (e.g. price-elasticity, product-market-fit, pipeline-coverage).
3. 13 body links point to blog posts not in this export; they stay as absolute marketjoy.com URLs until blogs are migrated. 11 more are a HubSpot meeting link (external, opens in new tab).
