# MarketJoy CPT migration (case studies, industry news, press release, testimonials)

Source: cpt-export.zip JSON files + marketjoy_WordPress_2026-10-27.xml (for featured-image URLs/alt text and testimonial quotes).
Re-run:
```
pip install beautifulsoup4
python scripts/migrate-cpt.py --src <folder with the json files> --xml <wp export.xml> --public public/wp-content --out .
python scripts/verify-cpt.py  --src <same folder> --root . --project .
```

## Counts (verified against the source files)
| Type | Source | Converted | Failed |
|---|---|---|---|
| Case studies | 39 | 39 (8 Elementor, 31 plain-HTML) | 0 |
| Industry news | 12 | 12 | 0 |
| Press releases | 1 (file is one object, not a list) | 1 | 0 |
| Testimonials | 38 | 38 | 0 (35 with quote recovered, 3 name only) |

## Intentionally dropped (counted in migration/*/report.json)
Dynamic "related posts"/news-list widgets (posts, shortcode), rating stars, dividers, post-info, hero badge buttons ("Case Study" / "Success Story"), first heading identical to the page title (the page hero shows it as H1). Elementor/Word wrapper markup, SVG, inline styles.

## SEO
| Field | In export? | Status |
|---|---|---|
| Slug | yes | preserved (all) |
| Original URL | yes | preserved; migration/url-map-all-cpt.csv, same path on the new site |
| SEO title / meta description | NO | not in the CPT JSON; seo.* = null, page title = title + " | MarketJoy", description = first body sentence (derived) |
| Canonical / robots | NO | not in export |
| Featured image alt | partly | from XML attachments: 10/39 case studies, 9/12 news, 1/1 press have alt |
| Body image alt | partly | 159 empty alts in case-study bodies, 3 in news (source has none) |
| Redirects | no | none needed while paths are identical |

## Open items
1. Copy 237 images from the old site into public/wp-content (migration/images-needed.csv). 1 is already there.
2. Testimonials: 3 have no quote anywhere in the export (Brielle Jenner, Jennifer Williams, Jeff Lipton). "Sean Cotter" exists twice (sean-cotter, sean-cotter-2) with the same quote. Not wired into /client-reviews yet.
3. One case-study link goes to /what-our-clients-say/, which is not a known route.
4. Done in this merged project: src/routes/$.tsx now has the JoyPedia and case-study/news/press branches; CSS appended to src/styles.css.
5. FAQs: no FAQ JSON in the export; not migrated here.
6. Not run: npm install / build / vitest (no network in this environment). Only a syntax check of the new TS/TSX was done.
