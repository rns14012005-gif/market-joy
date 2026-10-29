import index from "./index.json";

export type IndustryIndexItem = {
  slug: string;
  path: string;
  title: string;
  parent: string | null;
  description: string | null;
  ogImage: string | null;
};

export type IndustryEntry = {
  slug: string;
  path: string;
  sourceUrl: string;
  title: string;
  parent: string | null;
  seo: {
    title: string | null;
    description: string | null;
    canonical: string | null;
    robots: string | null;
    ogType: string | null;
    ogImage: string | null;
    ogImageAlt: string | null;
    twitterCard: string | null;
    published: string | null;
    modified: string | null;
    focusKeyword: string | null;
  };
  faqs: { q: string; a: string }[];
  jsonLd: Record<string, unknown>[];
  html: string;
};

export const INDUSTRIES_INDEX = index as unknown as readonly IndustryIndexItem[];

const modules = import.meta.glob<{ default: IndustryEntry }>("./entries/*.json");

const norm = (p: string) => "/" + p.replace(/^\/+|\/+$/g, "") + "/";

/** Old URL path (e.g. "/industries/utilities-lead-generation") -> entry, or null. */
export async function loadIndustryByPath(p: string): Promise<IndustryEntry | null> {
  const item = INDUSTRIES_INDEX.find((i) => i.path === norm(p));
  if (!item) return null;
  const load = modules[`./entries/${item.slug}.json`];
  return load ? (await load()).default : null;
}

export const isIndustryPath = (p: string) => INDUSTRIES_INDEX.some((i) => i.path === norm(p));
