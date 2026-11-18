import type { Metadata } from "next";
import Image from "next/image";

import { AccentRule } from "@/components/ui/accent-rule";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeadlineDot } from "@/components/ui/headline-dot";
import { Icon } from "@/components/ui/icon";
import { IconChip } from "@/components/ui/icon-chip";
import { StatusChip } from "@/components/ui/status-chip";
import { SurfaceCard } from "@/components/ui/surface-card";
import { SystemIcon } from "@/components/ui/system-icon";

import {
  contactEmail,
  intro,
  ledger,
  library,
  libraryIntro,
  posture,
  postureIntro,
  railIntro,
  rails,
  requestCta,
} from "./content";

export const metadata: Metadata = {
  title: "Trust Center | Civic-Chain",
  description:
    "Civic-Chain's Trust Center: security, data handling, regulatory status, and the review documents a town's procurement team needs, stated honestly.",
  alternates: { canonical: "/trust" },
};

function TrustIllustration() {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-gold-200">
      <Image
        src="/images/trust-community.jpg"
        alt="Watercolor illustration of five townspeople gathered around a map on a terrace, with a domed statehouse and a river valley behind them."
        width={1536}
        height={1024}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="h-auto w-full"
      />
    </div>
  );
}

function LedgerList({
  label,
  status,
  items,
}: {
  label: string;
  status: "anchored" | "redacted";
  items: readonly string[];
}) {
  return (
    <SurfaceCard tone="cream" className="grid content-start gap-4 p-5 lg:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="captions text-current/55">{label}</p>
        <StatusChip status={status} />
      </div>
      <ul className="grid gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 body-sm text-current/80">
            <Icon
              name={status === "anchored" ? "check-circle" : "record"}
              className="mt-0.5 shrink-0 text-gold-600"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </SurfaceCard>
  );
}

export default function TrustPage() {
  return (
    <main className="section-flow gap-10 pb-16 lg:gap-14 lg:pb-24">
      {/* Hero. */}
      <section id="trust-hero" className="section-shell pt-10 lg:pt-14">
        <div className="mx-auto grid max-page gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="grid gap-6">
            <div>
              <Badge tone="gold">Trust Center</Badge>
            </div>
            <div className="grid gap-4">
              <h1 className="max-w-3xl h3 lg:h2">
                Trust, in one place<HeadlineDot />
              </h1>
              <p className="max-w-[62ch] body-lg text-slate-500">{intro}</p>
            </div>
          </div>
          <TrustIllustration />
        </div>
      </section>

      {/* Two rails: money on one, record on the other. Each card owns one family;
          the texture under each ties to its meaning (banknote, blueprint). */}
      <section id="trust-rails" className="section-shell">
        <div className="mx-auto grid max-page gap-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="grid gap-3">
              <p className="captions text-gold-600">{railIntro.eyebrow}</p>
              <h2 className="max-w-2xl h4 lg:h3">
                {railIntro.title}
                <HeadlineDot />
              </h2>
              <p className="max-w-[60ch] body-lg text-slate-500">{railIntro.lede}</p>
            </div>
            <TrustIllustration />
          </div>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
            {rails.map((rail) => (
              <SurfaceCard
                key={rail.id}
                tone={rail.tone}
                material={rail.material}
                density="roomy"
                className="grid h-full content-start gap-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <IconChip name={rail.icon} tone={rail.iconTone} variant="tile" size="lg" />
                  <span className="captions text-current/55">{rail.eyebrow}</span>
                </div>
                <div className="grid gap-2">
                  <h3 className="h4">{rail.title}</h3>
                  <span aria-hidden="true" className="h-px w-16 bg-current/30" />
                </div>
                <div className="grid gap-3 body-sm text-current/80">
                  {rail.paragraphs.map((paragraph, i) => (
                    <p key={i} className="max-w-[60ch]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </section>

      {/* On-chain vs sealed: colored paper card holds two near-white inner cards. */}
      <section id="trust-ledger" className="section-shell">
        <div className="mx-auto max-page">
          <SurfaceCard tone="cream" material="old-paper" density="roomy" className="grid gap-7">
            <div className="grid gap-3">
              <p className="captions text-gold-600">{ledger.eyebrow}</p>
              <h2 className="max-w-2xl h4 lg:h3">
                {ledger.title}
                <HeadlineDot />
              </h2>
              <p className="max-w-[64ch] body text-current/75">{ledger.lede}</p>
            </div>
            <div className="grid gap-5 lg:grid-cols-2 lg:items-start">
              <LedgerList
                label={ledger.anchored.label}
                status={ledger.anchored.status}
                items={ledger.anchored.items}
              />
              <LedgerList
                label={ledger.sealed.label}
                status={ledger.sealed.status}
                items={ledger.sealed.items}
              />
            </div>
          </SurfaceCard>
        </div>
      </section>

      {/* Posture: dense status cards go on the lightest surface, color in accents. */}
      <section id="trust-posture" className="section-shell">
        <div className="mx-auto grid max-page gap-6">
          <div className="grid gap-3">
            <p className="captions text-gold-600">{postureIntro.eyebrow}</p>
            <h2 className="max-w-2xl h4 lg:h3">
              {postureIntro.title}
              <HeadlineDot />
            </h2>
            <p className="max-w-[60ch] body-lg text-slate-500">{postureIntro.lede}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:items-stretch">
            {posture.map((item) => (
              <SurfaceCard
                key={item.id}
                tone="cream"
                className="grid h-full content-start gap-4 border-2 border-b-8 border-gold-200 border-b-gold-300 p-6 lg:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <IconChip name={item.icon} tone="gold-soft" variant="tile" size="md" />
                  <Badge tone="gold">{item.badge}</Badge>
                </div>
                <h3 className="h4">{item.title}</h3>
                <p className="max-w-[60ch] body-sm text-current/80">{item.body}</p>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </section>

      {/* Document library: descriptive cards, one request path. No dead links. */}
      <section id="trust-library" className="section-shell">
        <div className="mx-auto grid max-page gap-6">
          <div className="grid gap-3">
            <p className="captions text-gold-600">{libraryIntro.eyebrow}</p>
            <h2 className="max-w-2xl h4 lg:h3">
              {libraryIntro.title}
              <HeadlineDot />
            </h2>
            <p className="max-w-[60ch] body-lg text-slate-500">{libraryIntro.lede}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
            {library.map((item) => (
              <SurfaceCard
                key={item.id}
                tone="cream"
                className="grid h-full content-start gap-3 p-5 lg:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <IconChip name="note" tone="gold-soft" variant="tile" size="sm" />
                  <Badge tone={item.availability === "Under NDA" ? "neutral" : "gold"}>
                    {item.availability}
                  </Badge>
                </div>
                <h3 className="body-bold">{item.title}</h3>
                <p className="body-sm text-current/75">{item.description}</p>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA. */}
      <section id="trust-request" className="section-shell">
        <div className="mx-auto max-page">
          <SurfaceCard tone="sky" density="roomy" className="grid gap-5">
            <div className="grid gap-2">
              <h2 className="max-w-xl h4">
                {requestCta.title}
                <HeadlineDot />
              </h2>
              <p className="max-w-[60ch] body-lg text-current/80">{requestCta.body}</p>
            </div>
            <div>
              <Button asChild size="lg">
                <a href={`mailto:${contactEmail}`}>
                  <span>{contactEmail}</span>
                  <SystemIcon name="arrow-right" size="xs" />
                </a>
              </Button>
            </div>
            <AccentRule className="mt-1" />
          </SurfaceCard>
        </div>
      </section>
    </main>
  );
}
