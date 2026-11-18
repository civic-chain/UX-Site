import type { Metadata } from "next";
import Link from "next/link";

import { AccentUnderline } from "@/components/ui/accent-underline";
import { Badge } from "@/components/ui/badge";

import {
  aboutCivicChain,
  aboutRepay,
  body,
  contact,
  footnote,
  meta,
} from "./content";

export const metadata: Metadata = {
  title: `${meta.title} | Civic-Chain`,
  description: meta.lede,
  alternates: { canonical: "/news/repay-civic-chain-strategic-partnership" },
};

export default function RepayPartnershipPost() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <div className="mb-8">
        <Link
          href="/news"
          className="captions text-gold-600 transition-opacity hover:opacity-75"
        >
          ← News &amp; Media
        </Link>
      </div>

      <header className="mb-12 grid gap-4">
        <Badge tone="gold" className="justify-self-start">
          {meta.category} · {meta.date}
        </Badge>
        <h1 className="h3 text-foreground">{meta.title}</h1>
        <AccentUnderline className="mt-1" />
        <p className="mt-2 max-w-lg body-lg text-slate-500">{meta.lede}</p>
      </header>

      <div className="grid gap-4 body text-foreground/85">
        <p>
          <span className="font-semibold text-foreground">
            {meta.dateline}, {meta.date},{" "}
          </span>
          {body[0]}
        </p>
        {body.slice(1).map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-12 grid gap-6">
        <section className="grid gap-2">
          <h2 className="body-xl text-foreground">About Civic-Chain</h2>
          <p className="body-sm text-current/80">{aboutCivicChain}</p>
        </section>
        <section className="grid gap-2">
          <h2 className="body-xl text-foreground">About REPAY</h2>
          <p className="body-sm text-current/80">{aboutRepay}</p>
        </section>
      </div>

      <div className="mt-10 border-t border-gold-800/20 pt-8">
        <div className="grid gap-1">
          <p className="captions text-slate-500">{contact.label}</p>
          <p className="body-sm text-foreground">{contact.name}</p>
          <a
            href={`mailto:${contact.email}`}
            className="body-sm font-semibold text-gold-600 underline underline-offset-2 transition-opacity hover:opacity-75"
          >
            {contact.email}
          </a>
        </div>
      </div>

      <footer className="mt-12 border-t border-gold-800/20 pt-8">
        <p className="body-xs text-slate-500">{footnote}</p>
      </footer>
    </main>
  );
}
