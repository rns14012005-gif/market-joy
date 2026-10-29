import { useRef } from "react";
import { Navbar } from "@/components/home/Navbar";
import { FinalCta, Footer } from "@/components/home/Sections";
import { Hero } from "@/components/pages/ContentPages";
import { useWpImageFallback } from "@/lib/wp-images";
import { INDUSTRIES_INDEX, type IndustryEntry } from "@/content/industries/loader";

export function IndustryEntryPage({ entry }: { entry: IndustryEntry }) {
  const bodyRef = useRef<HTMLElement>(null);
  useWpImageFallback(bodyRef, entry.slug);
  const parentItem = entry.parent ? INDUSTRIES_INDEX.find((i) => i.path === entry.parent) : undefined;
  const crumbs =
    entry.path === "/industries/"
      ? [{ label: entry.title }]
      : [
          { label: "Industries", href: "/industries/" },
          ...(parentItem ? [{ label: parentItem.title, href: parentItem.path }] : []),
          { label: entry.title },
        ];
  const children = INDUSTRIES_INDEX.filter((i) => i.parent === entry.path);
  return (
    <>
      <Navbar />
      <main>
        <Hero eyebrow="Industries we serve" title={entry.title} crumbs={crumbs} />
        <section className="section-y">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <article
              ref={bodyRef}
              className="article-body"
              // Sanitised at migration time by scripts/migrate-industries.mjs.
              dangerouslySetInnerHTML={{ __html: entry.html }}
            />
            {children.length > 0 && (
              <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                {children.map((c) => (
                  <li key={c.slug}>
                    <a href={c.path} className="card-glow block p-4 font-semibold">
                      {c.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
