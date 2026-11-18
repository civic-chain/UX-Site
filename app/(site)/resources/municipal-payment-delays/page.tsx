import Link from "next/link";

import { AccentUnderline } from "@/components/ui/accent-underline";
import { Badge } from "@/components/ui/badge";
import { SurfaceCard } from "@/components/ui/surface-card";

import { footer, meta, sections } from "./content";
import { PasswordGate } from "./password-gate";

export const metadata = {
  title: `${meta.title} | Civic-Chain`,
  description: meta.lede,
  robots: {
    index: false,
    follow: false,
  },
};

export default function MunicipalPaymentDelaysArticlePage() {
  return (
    <PasswordGate password="6942069">
      <main className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
        <div className="mb-8">
          <Link
            href="/resources"
            className="captions text-gold-600 transition-opacity hover:opacity-75"
          >
            ← Resources
          </Link>
        </div>

        <header className="mb-12 grid gap-4">
          <Badge tone="gold" className="justify-self-start">
            {meta.category} · {meta.date}
          </Badge>
          <h2 className="h3 text-foreground max-w-xl">
            {meta.title}
          </h2>
          <AccentUnderline className="mt-1" />
          <p className="body-lg text-slate-500 max-w-lg mt-2">
            {meta.lede}
          </p>
        </header>

        <div className="grid gap-8 body text-foreground/85">
          {sections.map((section, index) => {
            if (section.kind === "prose") {
              return (
                <section key={index} className="grid gap-4">
                  <h2 className="body-xl text-foreground">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph, p) => (
                    <p key={p}>{paragraph}</p>
                  ))}
                </section>
              );
            }

            if (section.kind === "paper-callout") {
              return (
                <SurfaceCard
                  key={index}
                  tone="gold"
                  className="grid gap-2 border-2 border-b-8 border-gold-500 border-b-gold-800 px-6 py-5"
                >
                  <p className="body-bold">
                    {section.title}
                  </p>
                  <p className="body-sm text-current/80">
                    {section.body}
                  </p>
                </SurfaceCard>
              );
            }

            return (
              <SurfaceCard
                key={index}
                tone="sky"
                className="grid gap-3 border-2 border-b-8 border-blue-300 border-b-blue-700 px-6 py-5"
              >
                <p className="body-bold">
                  {section.title}
                </p>
                <div className="grid gap-2">
                  {section.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5"
                    >
                      <span className="body-sm text-current/75">
                        {row.label}
                      </span>
                      <span className="body-sm font-semibold">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-1 body-xs text-current/60">
                  {section.footnote}
                </p>
              </SurfaceCard>
            );
          })}
        </div>

        <footer className="mt-14 border-t border-gold-800/20 pt-8 grid gap-3">
          <p className="body-sm text-slate-500">
            {footer.body}
          </p>
          <a
            href={footer.email.href}
            className="body-sm font-semibold text-gold-600 underline underline-offset-2 hover:opacity-75 transition-opacity"
          >
            {footer.email.label}
          </a>
        </footer>
      </main>
    </PasswordGate>
  );
}
