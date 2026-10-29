import { useRef, useState } from "react";
import { ArrowRight, Calendar, ChevronRight } from "lucide-react";
import GatewayFlow from "@/components/ui/gateway-flow";
import { Navbar } from "@/components/home/Navbar";
import { Reveal } from "@/components/home/Reveal";
import { FinalCta, Footer } from "@/components/home/Sections";
import { useWpImageFallback, wpImgOnError } from "@/lib/wp-images";
import { CPT, CPT_META, type CptEntry, type CptIndexItem, type CptType } from "@/content/cpt";

const PER_PAGE = 12;

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export function Hero({
  eyebrow,
  title,
  sub,
  date,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  sub?: string | undefined;
  date?: string | undefined;
  crumbs: { label: string; href?: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-navy-foreground">
      <div className="absolute inset-0 -z-20">
        <GatewayFlow className="h-full w-full" density={0.6} />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_25%_50%,rgb(15_32_64/0.8),transparent_65%),radial-gradient(ellipse_at_center,transparent_40%,rgb(15_32_64/0.85)_100%)]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:py-20">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-1 text-xs text-navy-foreground/70"
        >
          <a href="/" className="hover:text-gold">
            Home
          </a>
          {crumbs.map((c) => (
            <span key={c.label} className="inline-flex items-center gap-1">
              <ChevronRight className="h-3 w-3" />
              {c.href ? (
                <a href={c.href} className="hover:text-gold">
                  {c.label}
                </a>
              ) : (
                <span className="line-clamp-1 max-w-[16rem] text-navy-foreground sm:max-w-md">
                  {c.label}
                </span>
              )}
            </span>
          ))}
        </nav>
        <Reveal from="left">
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <Reveal
          from="left"
          delay={80}
          as="h1"
          className="mt-4 max-w-4xl text-[1.75rem] font-extrabold leading-[1.15] min-[400px]:text-3xl sm:text-4xl lg:text-[2.75rem]"
        >
          {title}
        </Reveal>
        {sub && (
          <Reveal
            from="left"
            delay={160}
            className="mt-5 max-w-2xl text-base text-navy-foreground/85 sm:text-lg"
          >
            {sub}
          </Reveal>
        )}
        {date && (
          <Reveal
            from="left"
            delay={160}
            className="mt-5 flex items-center gap-1.5 text-sm text-navy-foreground/85"
          >
            <Calendar className="h-4 w-4 text-gold" />
            <time dateTime={date}>{fmt(date)}</time>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function Card({ item, index }: { item: CptIndexItem; index: number }) {
  return (
    <Reveal from="up" delay={(index % 3) * 90} className="h-full">
      <a href={item.path} className="card-glow flex h-full flex-col overflow-hidden">
        {item.featuredImage && (
          <div className="aspect-[16/9] overflow-hidden bg-muted">
            <img
              src={item.featuredImage.src}
              alt={item.featuredImage.alt || item.title}
              loading="lazy"
              decoding="async"
              onError={wpImgOnError}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <time dateTime={item.date} className="text-xs font-medium text-muted-foreground">
            {fmt(item.date)}
          </time>
          <h3 className="mt-3 line-clamp-3 text-lg font-bold">{item.title}</h3>
          <p className="mt-3 line-clamp-3 flex-1 text-sm text-muted-foreground">{item.excerpt}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue">
            Read More <ArrowRight className="arrow h-4 w-4" />
          </span>
        </div>
      </a>
    </Reveal>
  );
}

/* ---------- listing: /case-studies, /industry-news, /press-release ---------- */
export function ContentListing({ type }: { type: CptType }) {
  const meta = CPT_META[type];
  const items = CPT[type].index;
  const [shown, setShown] = useState(PER_PAGE);
  return (
    <>
      <Navbar />
      <main>
        <Hero eyebrow="Resources" title={meta.label} sub={meta.sub} crumbs={[{ label: meta.label }]} />
        <section className="section-y">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid cols-3 gap-5 sm:gap-6">
              {items.slice(0, shown).map((it, i) => (
                <Card key={it.slug} item={it} index={i} />
              ))}
            </div>
            {shown < items.length && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setShown((n) => n + PER_PAGE)}
                  className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy"
                >
                  Load more
                </button>
              </div>
            )}
          </div>
        </section>
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

/* ---------- entry: /case-studies/<slug>, /industry-news/<slug>, /press-release/<slug> ---------- */
export function ContentEntryPage({ type, entry }: { type: CptType; entry: CptEntry }) {
  const meta = CPT_META[type];
  const more = CPT[type].index.filter((i) => i.slug !== entry.slug).slice(0, 3);
  // Some bodies already open with the featured image; don't show it twice.
  const showFeatured = entry.featuredImage && !entry.html.includes(entry.featuredImage.src);
  const bodyRef = useRef<HTMLElement>(null);
  useWpImageFallback(bodyRef, entry.slug);
  return (
    <>
      <Navbar />
      <main>
        <Hero
          eyebrow={meta.label}
          title={entry.title}
          date={entry.date}
          crumbs={[{ label: meta.label, href: `${meta.base}/` }, { label: entry.title }]}
        />
        <section className="section-y">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            {showFeatured && entry.featuredImage && (
              <img
                src={entry.featuredImage.src}
                alt={entry.featuredImage.alt || entry.title}
                decoding="async"
                onError={wpImgOnError}
                className="mb-8 aspect-[16/9] w-full rounded-2xl bg-muted object-cover shadow-card"
              />
            )}
            <article
              ref={bodyRef}
              className="article-body"
              // Content comes from our own WordPress export and was sanitised at migration time.
              dangerouslySetInnerHTML={{ __html: entry.html }}
            />
          </div>
        </section>
        {more.length > 0 && (
          <section className="section-y bg-muted/40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <h2 className="mb-6 text-2xl font-extrabold">More {meta.label}</h2>
              <div className="grid cols-3 gap-5 sm:gap-6">
                {more.map((it, i) => (
                  <Card key={it.slug} item={it} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
