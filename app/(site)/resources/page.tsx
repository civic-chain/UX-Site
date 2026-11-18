import type { Metadata } from "next";
import Link from "next/link";

import { AccentUnderline } from "@/components/ui/accent-underline";
import { Badge } from "@/components/ui/badge";
import { HeadlineDot } from "@/components/ui/headline-dot";
import { SurfaceCard } from "@/components/ui/surface-card";

import { articles } from "./_articles-meta";

export const metadata: Metadata = {
  title: "Resources | Civic-Chain",
  description:
    "Research, analysis, and explainers on municipal finance, procurement, and public spending transparency.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesIndexPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <header className="mb-12 grid gap-3">
        <h1 className="h3 text-foreground">
          Resources<HeadlineDot />
        </h1>
        <AccentUnderline className="mt-1" />
        <p className="body text-slate-500 max-w-lg mt-2">
          Research, analysis, and explainers on municipal finance, procurement, and public spending transparency.
        </p>
      </header>

      <div className="grid gap-4">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/resources/${article.slug}`}
            className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <SurfaceCard
              tone="cream"
              interactive
              className="border-2 border-b-8 border-gold-200 border-b-gold-300 p-6 grid gap-3"
            >
              <Badge tone="gold" className="justify-self-start">
                {article.category} · {article.date}
              </Badge>
              <p className="body-xl text-foreground">{article.title}</p>
              <p className="body-sm text-current/75">{article.lede}</p>
            </SurfaceCard>
          </Link>
        ))}
      </div>

      <div className="mt-12 border-t border-gold-800/20 pt-8">
        <p className="body-sm text-slate-500">
          Questions?{" "}
          <a
            href="/contact"
            className="text-gold-600 underline underline-offset-2 hover:opacity-75 transition-opacity"
          >
            Get in touch
          </a>
        </p>
      </div>
    </main>
  );
}
