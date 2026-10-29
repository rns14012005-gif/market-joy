import { BLOG_INDEX } from "./index";
import type { BlogPost, BlogSummary } from "./types";

export { BLOG_INDEX };
export type { BlogPost, BlogSummary };

export const BLOG_PER_PAGE = 12;

// One lazy chunk per article, so the listing never ships every article body.
const loaders = import.meta.glob("./posts/*.json", { import: "default" }) as Record<
  string,
  () => Promise<BlogPost>
>;

export async function loadPost(slug: string): Promise<BlogPost | null> {
  const load = loaders[`./posts/${slug}.json`];
  return load ? await load() : null;
}

const bySlug = new Map(BLOG_INDEX.map((p) => [p.slug, p]));
export const findSummary = (slug: string): BlogSummary | undefined => bySlug.get(slug);

export const relatedOf = (post: BlogSummary): BlogSummary[] =>
  post.related.map((s) => bySlug.get(s)).filter((p): p is BlogSummary => !!p);

/** "2025-03-04" -> "Mar 4, 2025" (UTC, so server and browser always agree). */
export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

export const blogPath = (slug: string) => `/blog/${slug}/`;
