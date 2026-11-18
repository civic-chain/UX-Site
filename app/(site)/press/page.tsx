import type { Metadata } from "next";
import Image from "next/image";

import { AccentRule } from "@/components/ui/accent-rule";
import { AccentUnderline } from "@/components/ui/accent-underline";
import { Badge } from "@/components/ui/badge";
import { BrandRasterImage } from "@/components/ui/brand-raster-image";
import { Button } from "@/components/ui/button";
import {
  Expandable,
  ExpandableBody,
  ExpandableScope,
  ExpandableToggle,
} from "@/components/ui/expandable";
import { HeadlineDot } from "@/components/ui/headline-dot";
import { IconChip } from "@/components/ui/icon-chip";
import { StepBadge } from "@/components/ui/step-badge";
import { SurfaceCard } from "@/components/ui/surface-card";

import { CopyButton } from "./_copy-button";
import { MoneyFlowDiagram } from "./_money-flow-diagram";
import {
  AS_OF,
  brandAssets,
  boilerplate,
  cryptoFaqs,
  factSheet,
  footerNote,
  hero,
  howItWorks,
  KIT_HREF,
  leadership,
  PRESS_EMAIL,
  repayFootnote,
  storyAngles,
  usageRules,
} from "./content";

const MAILTO = `mailto:${PRESS_EMAIL}?subject=Press%20inquiry`;

export const metadata: Metadata = {
  title: "Press & Media | Civic-Chain",
  description:
    "Civic-Chain helps towns pay vendors faster, control contract spending, and show residents where every dollar went. Boilerplate, fact sheet, leadership and brand assets.",
  alternates: { canonical: "/press" },
  openGraph: {
    title: "Press & Media | Civic-Chain",
    description:
      "Boilerplate, fact sheet, leadership and downloadable brand assets for Civic-Chain.",
    url: "/press",
    images: [{ url: "/brand/civic-chain-social-preview.webp" }],
  },
};

// FAQPage structured data built from the same copy rendered below (AI answer
// engines can lift these Q&A pairs directly).
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: cryptoFaqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid gap-3">
      <p className="captions text-slate-500">{eyebrow}</p>
      <h2 className="max-w-2xl h3">
        {title}
        <HeadlineDot />
      </h2>
      <AccentUnderline className="mt-1" />
      {children}
    </div>
  );
}

export default function PressPage() {
  return (
    <main className="section-flow gap-14 pb-16 lg:gap-20 lg:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1 — Hero: wide civic wash + old-paper texture under the mark */}
      <section id="press-hero" className="section-shell pt-8 lg:pt-10">
        <div className="mx-auto max-page">
          <SurfaceCard
            tone="cream"
            material="old-paper"
            className="relative overflow-hidden"
          >
            {/* Wide civic wash fills the whole band as a faint backdrop; the
                content flows from the top and overlaps it. */}
            {/* !absolute: the .surface-material > * rule forces position:relative
                on direct children, which would drop the wash into the flow and
                push the content down. Keep it a true background layer. */}
            <BrandRasterImage
              src="/design-assets/bg-scenes-wide/scene-wide-town-hall-campus-01.webp"
              alt=""
              aria-hidden
              width={2048}
              height={966}
              priority
              className="pointer-events-none !absolute inset-0 h-full w-full object-cover object-[center_35%] opacity-[0.12]"
            />
            {/* Cream scrim: keeps the large surface light and the text legible
                while the wash still reads behind the content. */}
            <span
              aria-hidden
              className="pointer-events-none !absolute inset-0 bg-gradient-to-br from-cream-50/80 via-cream-50/40 to-transparent"
            />
            <div className="relative z-10 grid gap-6 p-8 sm:p-12 lg:p-14">
              <Image
                src="/brand/civic-logo-hero.svg"
                alt="Civic-Chain"
                width={320}
                height={72}
                priority
                className="h-auto w-40 sm:w-52"
              />
              <div className="grid gap-5">
                <Badge tone="gold" className="justify-self-start">
                  {hero.eyebrow}
                </Badge>
                <h1 className="max-w-3xl h2 lg:h1">
                  {hero.headlineLead}{" "}
                  <em className="font-normal italic text-gold-600">
                    {hero.headlineAccent}
                  </em>
                </h1>
                <p className="max-w-2xl body-lg text-slate-500">{hero.subhead}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button asChild variant="filled" size="lg" icon="arrow-right">
                  <a href={KIT_HREF} download>
                    Download press kit (.zip)
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={MAILTO}>Contact press</a>
                </Button>
              </div>
            </div>
          </SurfaceCard>
        </div>
      </section>

      {/* 2 — About / boilerplate */}
      <section id="boilerplate" className="section-shell">
        <div className="mx-auto grid max-page gap-7">
          <SectionHeading
            eyebrow="About Civic-Chain"
            title="Boilerplate, ready to paste"
          >
            <p className="max-w-2xl body text-slate-500">
              Use these verbatim in press releases and partner announcements.
            </p>
          </SectionHeading>
          <div className="grid gap-5 lg:grid-cols-2">
            {[
              { label: "Short · about 50 words", text: boilerplate.short },
              { label: "Long · about 100 words", text: boilerplate.long },
            ].map((item) => (
              <SurfaceCard
                key={item.label}
                tone="cream"
                density="roomy"
                className="relative grid content-start gap-4 overflow-hidden border-2 border-b-8 border-gold-200 border-b-gold-300"
              >
                <BrandRasterImage
                  src="/design-assets/stamps/stamp-public-record-03.webp"
                  alt=""
                  aria-hidden
                  width={160}
                  height={160}
                  className="pointer-events-none absolute -right-4 -top-4 w-24 opacity-10"
                />
                <Badge tone="gold" variant="flat">
                  {item.label}
                </Badge>
                <p className="body text-current/85">{item.text}</p>
                <div className="justify-self-start pt-1">
                  <CopyButton value={item.text} label="Copy text" />
                </div>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Fact sheet */}
      <section id="fact-sheet" className="section-shell">
        <div className="mx-auto grid max-page gap-7">
          <SectionHeading eyebrow="Fact sheet" title="The essentials">
            <p className="captions text-slate-500">As of {AS_OF}</p>
          </SectionHeading>
          <SurfaceCard tone="cream" material="old-paper" density="roomy">
            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-[200px_1fr]">
              {factSheet.map((row) => (
                <div
                  key={row.field}
                  className="grid gap-1 border-b border-gold-200/60 pb-4 last:border-0 last:pb-0 sm:col-span-2 sm:grid-cols-subgrid sm:items-baseline"
                >
                  <dt className="captions text-current/58">{row.field}</dt>
                  <dd className="body text-current/85">{row.value}</dd>
                </div>
              ))}
            </dl>
          </SurfaceCard>
          <p className="body-sm text-slate-500">
            The full fact sheet is included in the{" "}
            <a href={KIT_HREF} download className="text-blue-700 underline underline-offset-4">
              press kit (.zip)
            </a>
            .
          </p>
        </div>
      </section>

      {/* 4 — How it works */}
      <section id="how-it-works" className="section-shell">
        <div className="mx-auto grid max-page gap-8">
          <SectionHeading eyebrow="How it works" title={howItWorks.heading} />
          <div className="grid gap-5 lg:grid-cols-3">
            {howItWorks.steps.map((step, i) => {
              const tone = (["sky", "cream", "sage"] as const)[i];
              return (
                <SurfaceCard key={step.title} tone={tone} density="roomy" className="grid content-start gap-4">
                  <div className="flex items-center justify-between">
                    <IconChip name={step.icon} tone={step.chipTone} variant="tile" size="md" />
                    <StepBadge size="md">{i + 1}</StepBadge>
                  </div>
                  <h3 className="h4">{step.title}</h3>
                  <p className="body-sm text-current/80">{step.body}</p>
                </SurfaceCard>
              );
            })}
          </div>
          <SurfaceCard tone="cream" density="roomy" className="grid gap-5">
            <MoneyFlowDiagram className="h-auto w-full" />
            <AccentRule className="text-gold-600" />
            <p className="body-sm text-slate-500">{howItWorks.caption}</p>
          </SurfaceCard>
        </div>
      </section>

      {/* 5 — Is this crypto? */}
      <section id="is-this-crypto" className="section-shell">
        <div className="mx-auto grid max-page gap-7">
          <SectionHeading eyebrow="Straight answers" title="Is this crypto?" />
          <ExpandableScope className="grid gap-3 lg:gap-4">
            {cryptoFaqs.map((item, index) => (
              <Expandable key={item.question} tone={item.tone} group="single" defaultOpen={index === 0}>
                <div className="grid gap-3 p-5 lg:p-6">
                  <div className="faq-card-head">
                    <div className="flex flex-1 items-center gap-3">
                      <IconChip name={item.icon} tone={item.chipTone} variant="tile" size="md" />
                      <h3 className="max-w-lg h4">{item.question}</h3>
                    </div>
                    <ExpandableToggle className="faq-toggle" />
                  </div>
                  <ExpandableBody>
                    <p className="max-w-[72ch] body text-current/80">{item.answer}</p>
                  </ExpandableBody>
                </div>
              </Expandable>
            ))}
          </ExpandableScope>
        </div>
      </section>

      {/* 6 — Story angles */}
      <section id="story-angles" className="section-shell">
        <div className="mx-auto grid max-page gap-7">
          <SectionHeading eyebrow="Story angles" title="Ideas for reporters and producers">
            <p className="max-w-2xl body text-slate-500">
              Contact us for data, demos or an interview.
            </p>
          </SectionHeading>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {storyAngles.map((angle, i) => (
              <SurfaceCard key={angle.title} tone="cream" density="roomy" className="grid content-start gap-3">
                <StepBadge tone="gold" size="md">
                  {i + 1}
                </StepBadge>
                <h3 className="body-bold text-foreground">{angle.title}</h3>
                <p className="body-sm text-current/75">{angle.body}</p>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Leadership */}
      <section id="leadership" className="section-shell">
        <div className="mx-auto grid max-page gap-7">
          <SectionHeading eyebrow="Leadership" title="Who to talk to" />
          <div className="grid gap-5 lg:grid-cols-3 lg:items-stretch">
            {leadership.map((member) => (
              <a
                key={member.name}
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className="block h-full group/card"
              >
                <SurfaceCard
                  tone={member.tone}
                  className="relative h-full overflow-hidden border-2 border-b-8 border-gold-200 border-b-gold-300 transition-shadow group-hover/card:shadow-lg"
                >
                  <div className="relative z-10 grid h-full content-start gap-4 p-6 pb-40 lg:pb-44">
                    <div className="flex size-12 items-center justify-center rounded-2xl border border-current/30 bg-current/10">
                      <span className="captions">{member.initials}</span>
                    </div>
                    <div className="grid gap-1">
                      <h3 className="h4">{member.name}</h3>
                      <span aria-hidden="true" className="my-1 h-px w-full bg-gold-600" />
                      <p className="captions text-current/58">{member.title}</p>
                    </div>
                    <p className="body-sm text-current/75">{member.bio}</p>
                    <div className="grid gap-2">
                      <p className="captions text-current/58">Track record</p>
                      <ul className="grid gap-1.5 body-sm text-current/75">
                        {member.highlights.map((item) => (
                          <li
                            key={item}
                            className="relative pl-4 before:absolute before:left-0 before:top-[0.5em] before:size-1.5 before:rounded-full before:bg-gold-600/70"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid gap-1 pt-1">
                      <p className="captions text-current/58">Press topics</p>
                      <p className="body-sm text-current/75">{member.topics}</p>
                    </div>
                    <span className="captions text-current/58">View LinkedIn ↗</span>
                  </div>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-green-100/80 to-transparent opacity-80 lg:h-44"
                  />
                  <BrandRasterImage
                    src={member.art}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    width={member.artWidth}
                    height={member.artHeight}
                    className="pointer-events-none absolute inset-x-0 -bottom-2 h-40 w-full object-contain object-bottom opacity-50 lg:h-44"
                  />
                </SurfaceCard>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — Brand assets */}
      <section id="brand-assets" className="section-shell">
        <div className="mx-auto grid max-page gap-7">
          <SectionHeading eyebrow="Brand assets" title="Logos and imagery">
            <p className="max-w-2xl body text-slate-500">
              Download the full kit, or grab a single file. Please follow the usage rules below.
            </p>
          </SectionHeading>

          <div className="flex flex-wrap items-center gap-4">
            <Button asChild variant="filled" size="lg" icon="arrow-right">
              <a href={KIT_HREF} download>
                Download everything (.zip)
              </a>
            </Button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {brandAssets.map((asset) => (
              <SurfaceCard key={asset.title} tone="cream" density="roomy" className="grid content-between gap-4">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <IconChip name="swatch" tone="gold" variant="tile" size="sm" />
                    <Badge tone="gold" variant="flat">
                      {asset.format}
                    </Badge>
                  </div>
                  <h3 className="body-bold text-foreground">{asset.title}</h3>
                  <p className="body-xs text-current/70">{asset.note}</p>
                </div>
                <div className="justify-self-start">
                  <Button asChild variant="soft" size="sm" icon="arrow-right">
                    <a href={asset.href} download>
                      Download
                    </a>
                  </Button>
                </div>
              </SurfaceCard>
            ))}
          </div>

          <SurfaceCard tone="cream" material="notebook" density="roomy" className="grid gap-3">
            <p className="captions text-current/58">Usage rules</p>
            <ul className="grid gap-2 body-sm text-current/75">
              {usageRules.map((rule) => (
                <li
                  key={rule}
                  className="relative pl-4 before:absolute before:left-0 before:top-[0.6em] before:size-1.5 before:rounded-full before:bg-gold-600/70"
                >
                  {rule}
                </li>
              ))}
            </ul>
          </SurfaceCard>
        </div>
      </section>

      {/* 9 — Press contact */}
      <section id="press-contact" className="section-shell">
        <div className="mx-auto max-page">
          <SurfaceCard tone="sky" density="roomy" className="relative overflow-hidden">
            <BrandRasterImage
              src="/landing/cta-courthouse-trees-planter.webp"
              alt=""
              aria-hidden
              width={1200}
              height={800}
              className="pointer-events-none absolute -right-6 bottom-0 hidden h-full w-1/3 object-contain object-right-bottom opacity-20 lg:block"
            />
            <div className="relative z-10 grid gap-5">
              <h2 className="max-w-md h3">
                Media inquiries<HeadlineDot />
              </h2>
              <p className="max-w-xl body-lg text-current/80">
                We reply within one business day. For demos and interviews, include your
                outlet and deadline.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button asChild size="lg">
                  <a href={MAILTO}>{PRESS_EMAIL}</a>
                </Button>
              </div>
              <AccentRule sigil={<IconChip name="trust" tone="cream" variant="tile" size="sm" />} className="mt-1" />
            </div>
          </SurfaceCard>
        </div>
      </section>

      {/* 10 — Footer note + REPAY legal footnote (verbatim) */}
      <section id="press-footnote" className="section-shell">
        <div className="mx-auto grid max-page gap-2">
          <p className="body-xs text-slate-500">{footerNote}</p>
          <p className="body-xs text-slate-500">{repayFootnote}</p>
        </div>
      </section>
    </main>
  );
}
