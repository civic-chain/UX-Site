import Link from "next/link";

import { plainTerms, withTerms } from "@/app/(site)/_glossary";
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
import type { IconName } from "@/components/ui/icon";
import { IconChip } from "@/components/ui/icon-chip";
import { StepBadge } from "@/components/ui/step-badge";
import { SurfaceCard } from "@/components/ui/surface-card";
import { SystemIcon } from "@/components/ui/system-icon";
import type { SurfaceTone } from "@/lib/design-system-types";

// One layout for the pages each hero badge links to (/residents, /vendors).
// The copy lives with each route in its content.ts; this file only owns the
// order and the look. Copy strings may mark glossary words as [[id|text]].
export type AudienceContent = {
  slug: string;
  badge: { label: string; icon: IconName };
  title: string;
  lede: string;
  art: { src: string; alt: string };
  benefits: {
    title: string;
    items: readonly {
      icon: IconName;
      tone: SurfaceTone;
      chipTone: SurfaceTone;
      title: string;
      body: string;
    }[];
  };
  steps: { title: string; items: readonly { title: string; body: string }[] };
  // Planned, not shipped: shown in its own labeled box so the page never
  // presents roadmap features as available today.
  comingNext?: {
    body: string;
    items: readonly { icon: IconName; title: string; body: string }[];
  };
  faq: readonly { question: string; answer: string }[];
  // Whether the first FAQ card opens on load. Defaults to true; set false to
  // land the page with every FAQ card collapsed.
  faqStartOpen?: boolean;
  cta: { title: string; body: string; href: string };
};

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="grid content-start gap-3">
      <h2 className="max-w-xl h3">
        {title}
        <HeadlineDot />
      </h2>
      <AccentUnderline className="mt-1" />
    </div>
  );
}

export function AudiencePage({ content }: { content: AudienceContent }) {
  const { slug } = content;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: plainTerms(item.answer) },
    })),
  };

  return (
    <main className="section-flow gap-16 pb-16 lg:gap-24 lg:pb-24">
      <section id={`${slug}-hero`} className="section-shell pt-8 lg:pt-12">
        <div className="mx-auto grid max-page items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="grid gap-6">
            <Badge tone="gold" icon={content.badge.icon} className="justify-self-start">
              {content.badge.label}
            </Badge>
            <div className="grid gap-3">
              <h1 className="max-w-xl h3 lg:h2">
                {content.title}
                <HeadlineDot />
              </h1>
              <AccentUnderline className="mt-1" />
              <p className="mt-2 max-w-xl body-lg text-slate-500">
                {withTerms(content.lede)}
              </p>
            </div>
          </div>
          <div className="relative aspect-square w-full max-w-sm justify-self-center lg:max-w-xl lg:justify-self-end">
            <BrandRasterImage
              src={content.art.src}
              alt={content.art.alt}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 24rem"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <section id={`${slug}-benefits`} className="section-shell">
        <div className="mx-auto grid max-page gap-8">
          <SectionHeading title={content.benefits.title} />
          <div className="grid gap-4 lg:grid-cols-3">
            {content.benefits.items.map((item) => (
              <SurfaceCard key={item.title} tone={item.tone} density="roomy">
                <div className="grid content-start gap-5">
                  <IconChip name={item.icon} tone={item.chipTone} variant="tile" size="lg" />
                  <div className="grid gap-2">
                    <h3 className="h4">{item.title}</h3>
                    <p className="body text-current/80">{withTerms(item.body)}</p>
                  </div>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </section>

      <section id={`${slug}-steps`} className="section-shell">
        <div className="mx-auto grid max-page gap-8">
          <SectionHeading title={content.steps.title} />
          <SurfaceCard tone="cream" density="roomy">
            <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {content.steps.items.map((step, index) => (
                <li key={step.title} className="grid content-start gap-3">
                  <StepBadge tone="gold" size="lg">
                    {String(index + 1).padStart(2, "0")}
                  </StepBadge>
                  <h3 className="mt-1 body-bold">{step.title}</h3>
                  <p className="body text-current/80">{withTerms(step.body)}</p>
                </li>
              ))}
            </ol>
          </SurfaceCard>
        </div>
      </section>

      {content.comingNext ? (
        <section id={`${slug}-coming-next`} className="section-shell">
          <div className="mx-auto max-page">
            <SurfaceCard tone="cream" density="roomy" className="border-2 border-dashed">
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="grid content-start gap-3">
                  <Badge tone="sky" className="justify-self-start">
                    Coming next
                  </Badge>
                  <p className="body text-current/80">{content.comingNext.body}</p>
                </div>
                <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
                  {content.comingNext.items.map((item) => (
                    <li key={item.title} className="flex gap-4">
                      <IconChip name={item.icon} tone="gold" variant="tile" size="sm" />
                      <div className="grid content-start gap-1">
                        <h3 className="body-bold">{item.title}</h3>
                        <p className="body text-current/80">{withTerms(item.body)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </SurfaceCard>
          </div>
        </section>
      ) : null}

      <section id={`${slug}-faq`} className="section-shell">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <div className="mx-auto grid max-page gap-8 lg:grid-cols-3 lg:gap-12">
          <SectionHeading title="Questions" />
          <ExpandableScope className="grid gap-3 lg:col-span-2 lg:gap-4">
            {content.faq.map((item, index) => (
              <Expandable
                key={item.question}
                tone={index % 2 === 0 ? "cream" : "sky"}
                group="single"
                defaultOpen={(content.faqStartOpen ?? true) && index === 0}
              >
                <div className="grid gap-3 p-5 lg:p-6">
                  <div className="faq-card-head">
                    <h3 className="max-w-lg h4">{item.question}</h3>
                    <ExpandableToggle className="faq-toggle" />
                  </div>
                  <ExpandableBody>
                    <p className="max-w-prose body text-current/80">
                      {withTerms(item.answer)}
                    </p>
                  </ExpandableBody>
                </div>
              </Expandable>
            ))}
          </ExpandableScope>
        </div>
      </section>

      <section id={`${slug}-cta`} className="section-shell">
        <div className="mx-auto max-w-5xl">
          <SurfaceCard tone="sky" material="blueprint" density="roomy" className="text-center">
            <div className="mx-auto grid max-w-2xl justify-items-center gap-6">
              <div className="grid gap-3">
                <h2 className="h4">
                  {content.cta.title}
                  {/* A question keeps its own mark instead of the brand dot. */}
                  {content.cta.title.endsWith("?") ? null : <HeadlineDot />}
                </h2>
                <p className="body text-current/75">{content.cta.body}</p>
              </div>
              <Button asChild size="lg">
                <Link href={content.cta.href}>
                  <span>Contact us</span>
                  <SystemIcon name="arrow-right" size="xs" />
                </Link>
              </Button>
            </div>
          </SurfaceCard>
        </div>
      </section>
    </main>
  );
}
