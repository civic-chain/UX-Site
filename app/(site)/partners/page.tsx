import type { Metadata } from "next";

import { AccentRule } from "@/components/ui/accent-rule";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeadlineDot } from "@/components/ui/headline-dot";
import { SurfaceCard } from "@/components/ui/surface-card";
import { SystemIcon } from "@/components/ui/system-icon";

import { intro, legalFootnote, partners, partnerWithUs } from "./content";
import { PartnerLogo } from "./partner-logo";

export const metadata: Metadata = {
  title: "Partners | Civic-Chain",
  description:
    "Civic-Chain's payment partners: Modern Treasury for payment operations and settlement, and REPAY for accounts payable automation and card payments.",
  alternates: { canonical: "/partners" },
};

export default function PartnersPage() {
  return (
    <main className="section-flow gap-10 pb-16 lg:gap-12 lg:pb-24">
      <section id="partners-hero" className="section-shell pt-10 lg:pt-14">
        <div className="mx-auto grid max-page gap-6">
          <div>
            <Badge tone="gold">Partners</Badge>
          </div>
          <div className="grid gap-4">
            <h1 className="max-w-3xl h3 lg:h2">
              Partners<HeadlineDot />
            </h1>
            <p className="max-w-[60ch] body-lg text-slate-500">{intro}</p>
          </div>
        </div>
      </section>

      <section id="partner-cards" className="section-shell">
        <div className="mx-auto grid max-page gap-6 lg:grid-cols-2 lg:items-stretch">
          {partners.map((partner) => (
            <SurfaceCard
              key={partner.id}
              tone="cream"
              className="grid h-full content-start gap-5 border-2 border-b-8 border-gold-200 border-b-gold-300 p-6 lg:p-8"
            >
              <div className="flex h-11 items-center">
                <PartnerLogo
                  name={partner.name}
                  src={partner.logoSrc}
                  width={partner.logoWidth}
                  height={partner.logoHeight}
                />
              </div>
              <div className="grid gap-1">
                <h3 className="h4">{partner.name}</h3>
                {/* Styled uppercase, but the text stays sentence case so screen
                    readers pronounce the role normally. */}
                <p className="captions text-gold-600">{partner.roleLabel}</p>
              </div>
              <div className="grid gap-3 body-sm text-current/80">
                {partner.paragraphs.map((paragraph, i) => (
                  <p key={i} className="max-w-[70ch]">
                    {paragraph}
                  </p>
                ))}
              </div>
              <a
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="captions justify-self-start text-gold-600 underline underline-offset-2 transition-opacity hover:opacity-75"
              >
                Visit {partner.name}
              </a>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section id="partners-footnote" className="section-shell">
        <div className="mx-auto max-page">
          <p className="body-xs text-slate-500">{legalFootnote}</p>
        </div>
      </section>

      <section id="partner-with-us" className="section-shell">
        <div className="mx-auto max-page">
          <SurfaceCard tone="sky" className="grid gap-5 p-8 lg:p-10">
            <div className="grid gap-2">
              <h2 className="max-w-xl h4">
                {partnerWithUs.title}
                <HeadlineDot />
              </h2>
              <p className="max-w-[60ch] body-lg text-current/80">
                {partnerWithUs.body}
              </p>
            </div>
            <div>
              <Button asChild size="lg">
                <a href={`mailto:${partnerWithUs.email}`}>
                  <span>{partnerWithUs.email}</span>
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
