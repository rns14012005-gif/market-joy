const envUrl = (import.meta as { env?: Record<string, string | undefined> }).env?.["VITE_SITE_URL"];

export const SITE_URL = (envUrl ?? "https://marketjoy.com").replace(/\/+$/, "");
export const SITE_NAME = "MarketJoy";
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

/** "/services/x" or "services/x/" -> "https://site/services/x/" ("/" stays the site root). */
export const absUrl = (path: string) => {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `${SITE_URL}/${clean}/` : `${SITE_URL}/`;
};

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  canonicalPath?: string;
};

export function seo({ title, description, path, image, type = "website", canonicalPath }: SeoInput) {
  const url = absUrl(path);
  const canonical = canonicalPath ? absUrl(canonicalPath) : url;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: type },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(image
        ? [
            { property: "og:image", content: image },
            { name: "twitter:image", content: image },
          ]
        : []),
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}

/** One <script type="application/ld+json"> entry for TanStack's head(). */
export const jsonLd = (data: Record<string, unknown>) => ({
  type: "application/ld+json",
  children: JSON.stringify(data).replace(/</g, "\\u003c"),
});

export const faqSchema = (items: readonly { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const breadcrumbSchema = (crumbs: readonly { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: c.url,
  })),
});

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MarketJoy, Inc.",
  url: SITE_URL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  email: "hello@marketjoy.com",
  telephone: "+1-484-638-6389",
  address: {
    "@type": "PostalAddress",
    streetAddress: "186 N Palafox Street",
    addressLocality: "Pensacola",
    addressRegion: "FL",
    postalCode: "32502",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.linkedin.com/company/marketjoy-inc./",
    "https://www.youtube.com/@MarketJoy",
    "https://www.facebook.com/marketjoy",
  ],
};

export const blogPostingSchema = (p: {
  title: string;
  description: string;
  path: string;
  image: string;
  date: string;
  author: string;
  category: string;
  tags: readonly string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: p.title,
  description: p.description,
  image: [p.image],
  datePublished: p.date,
  author: { "@type": "Person", name: p.author },
  articleSection: p.category,
  ...(p.tags.length ? { keywords: p.tags.join(", ") } : {}),
  mainEntityOfPage: { "@type": "WebPage", "@id": absUrl(p.path) },
  publisher: {
    "@type": "Organization",
    name: "MarketJoy, Inc.",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-touch-icon.png` },
  },
});
