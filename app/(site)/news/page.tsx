import type { Metadata } from "next";
import Link from "next/link";

import { AccentUnderline } from "@/components/ui/accent-underline";
import { Badge } from "@/components/ui/badge";
import { BrandRasterImage } from "@/components/ui/brand-raster-image";
import { HeadlineDot } from "@/components/ui/headline-dot";
import { SurfaceCard } from "@/components/ui/surface-card";

import { posts } from "./_articles-meta";
import { flyers, interviews } from "./_media";

export const metadata: Metadata = {
  title: "News & Media | Civic-Chain",
  description:
    "Press releases, flyers, and interviews featuring Civic-Chain and its work modernizing municipal spending.",
  alternates: { canonical: "/news" },
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="captions text-slate-500">{children}</h2>;
}

export default function NewsMediaPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <header className="mb-12 grid gap-3">
        <h1 className="h3 text-foreground">
          News &amp; Media<HeadlineDot />
        </h1>
        <AccentUnderline className="mt-1" />
        <p className="mt-2 max-w-lg body text-slate-500">
          Press releases, flyers, and interviews featuring Civic-Chain.
        </p>
      </header>

      <div className="grid gap-14">
        {posts.length > 0 && (
          <section className="grid gap-4">
            <SectionHeading>Press releases</SectionHeading>
            <div className="grid gap-4">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/news/${post.slug}`}
                  className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <SurfaceCard
                    tone="cream"
                    interactive
                    className="grid gap-3 border-2 border-b-8 border-gold-200 border-b-gold-300 p-6"
                  >
                    <Badge tone="gold" className="justify-self-start">
                      {post.category} · {post.date}
                    </Badge>
                    <p className="body-xl text-foreground">{post.title}</p>
                    <p className="body-sm text-current/75">{post.lede}</p>
                  </SurfaceCard>
                </Link>
              ))}
            </div>
          </section>
        )}

        {flyers.length > 0 && (
          <section className="grid gap-4">
            <SectionHeading>Flyers</SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {flyers.map((flyer) => (
                <a
                  key={flyer.title}
                  href={flyer.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/flyer block"
                >
                  <SurfaceCard
                    tone="cream"
                    className="overflow-hidden border border-gold-200 transition-shadow group-hover/flyer:shadow-lg"
                  >
                    <BrandRasterImage
                      src={flyer.src}
                      alt={flyer.alt}
                      width={flyer.width}
                      height={flyer.height}
                      loading="lazy"
                      sizes="(min-width: 1024px) 20rem, 100vw"
                      className="h-auto w-full object-contain"
                    />
                    <p className="p-4 body-sm text-current/80">{flyer.title}</p>
                  </SurfaceCard>
                </a>
              ))}
            </div>
          </section>
        )}

        {interviews.length > 0 && (
          <section className="grid gap-4">
            <SectionHeading>Interviews</SectionHeading>
            <ul className="grid gap-3">
              {interviews.map((interview) => (
                <li key={interview.title}>
                  <a
                    href={interview.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-baseline justify-between gap-4 rounded-xl border border-blue-700/12 bg-cream-50 p-4 transition-colors hover:bg-current/5"
                  >
                    <span className="grid gap-1">
                      <span className="body-bold text-current">{interview.title}</span>
                      <span className="captions text-current/58">{interview.outlet}</span>
                    </span>
                    {interview.date ? (
                      <span className="captions text-current/58 shrink-0">{interview.date}</span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
