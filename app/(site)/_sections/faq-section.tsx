import { AccentUnderline } from "@/components/ui/accent-underline";
import { BrandRasterImage } from "@/components/ui/brand-raster-image";
import { DotMatrix } from "@/components/ui/dot-matrix";
import {
  Expandable,
  ExpandableBody,
  ExpandableScope,
  ExpandableToggle,
} from "@/components/ui/expandable";
import { HeadlineDot } from "@/components/ui/headline-dot";
import type { IconName } from "@/components/ui/icon";
import { IconChip } from "@/components/ui/icon-chip";
import type { SurfaceTone } from "@/lib/design-system-types";
import { cn } from "@/lib/utils";
import { plainTerms, withTerms } from "@/app/(site)/_glossary";

type FaqItem = {
  icon: IconName;
  chipTone: SurfaceTone;
  tone: SurfaceTone;
  question: string;
  answer: string;
};

const faqContent = {
  title: "Quick answers",
  body: "",
  illustrationSrc: "/landing/v2-town-hall-line-art.webp",
  illustrationAlt: "Faint town hall line-art decoration.",
  items: [
    {
      icon: "admin",
      chipTone: "gold",
      tone: "cream",
      question: "Who is Civic-Chain built for?",
      answer:
        "Any entity that manages shared contractor spend. That includes small towns, mid-size cities, counties, school districts, HOAs, and other public or quasi-public bodies. The contract work is the same regardless of size: open the work, control the spend, confirm completion, and keep the record visible.",
    },
    {
      icon: "maine",
      chipTone: "sky",
      tone: "sky",
      question: "Why start with smaller municipalities?",
      answer:
        "Smaller towns often carry meaningful contractor spend with lean teams, fragmented workflows and strong accountability pressure. Civic-Chain is a force multiplier for small teams.",
    },
    {
      icon: "trust",
      chipTone: "gold",
      tone: "cream",
      question: "Is Civic-Chain primarily a blockchain company?",
      answer:
        "No. It should be understood first as a municipal contracting and accountability platform. The underlying record architecture matters because it strengthens trust, but it is not the first thing a public visitor needs to understand.",
    },
    {
      icon: "check-circle",
      chipTone: "sky",
      tone: "sky",
      question: "Is this crypto?",
      // [[id|text]] marks a glossary word (app/(site)/_glossary.tsx): shown as
      // a dotted-underline note on the page, plain text in the JSON-LD.
      answer:
        "No. Towns pay in U.S. dollars and vendors are paid in U.S. dollars. When the money moves between them as a [[stablecoin|digital dollar]], Civic-Chain is designed to meet the federal [[genius-act|GENIUS Act]], the 2025 law that sets the rules for dollar-backed digital payments. Nothing about it is speculative.",
    },
    {
      icon: "vote",
      chipTone: "sage",
      tone: "sage",
      question: "What is the value of public consensus?",
      answer:
        "Your citizens are your greatest asset. Offering the opportunity to give feedback before the selectboard's decision ensures alignment of all people!",
    },
    {
      icon: "payment",
      chipTone: "gold",
      tone: "cream",
      question: "Why does contractor payment clarity matter?",
      answer:
        "Because uncertainty around payment timing, approvals, and spend rules creates friction on both sides of the transaction. Cleaner payment workflow improves trust and lowers cost.",
    },
  ],
} as const satisfies {
  title: string;
  body: string;
  illustrationSrc: string;
  illustrationAlt: string;
  items: readonly FaqItem[];
};

// FAQPage structured data, generated from the same copy rendered below so the
// two never drift. Lets AI answer engines / AI Overviews extract these Q&A
// pairs directly instead of inferring them from the DOM.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqContent.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: plainTerms(item.answer) },
  })),
};

export function FaqSection({
  className,
  mobileLimit,
}: {
  className?: string;
  mobileLimit?: number;
}) {
  return (
    <section id="faq" className={cn("section-shell pb-16 lg:pb-24", className)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-page">
        <div className="grid gap-10 xl:grid-cols-[0.78fr_1fr] xl:gap-16">
          <div
            data-testid="section-heading"
            className="relative grid gap-6 lg:gap-7"
          >
            <div data-testid="section-heading-copy-stack" className="grid gap-3">
              <h2 className="max-w-xs h3">
                {faqContent.title}
                <HeadlineDot />
              </h2>
              <AccentUnderline className="mt-1" />
            </div>

            <div className="mt-4 hidden lg:block">
              <DotMatrix rows={4} cols={6} className="w-24" />
            </div>

            <div className="relative hidden h-80 w-full max-w-xl overflow-hidden lg:block">
              <BrandRasterImage
                src={faqContent.illustrationSrc}
                alt={faqContent.illustrationAlt}
                fill
                sizes="28vw"
                className="object-contain object-left-bottom opacity-50"
              />
            </div>
          </div>

          <ExpandableScope className="grid gap-3 lg:gap-4">
            {faqContent.items.map((item, index) => (
              <div
                key={item.question}
                className={cn(
                  mobileLimit !== undefined && index >= mobileLimit
                    ? "hidden sm:block"
                    : "",
                )}
              >
              <Expandable
                tone={item.tone}
                group="single"
                defaultOpen={index === 0}
                data-testid={`faq-item-${index}`}
              >
                <div className="grid gap-3 p-5 lg:p-6">
                  <div className="faq-card-head">
                    <div className="flex flex-1 items-center gap-3">
                      <IconChip name={item.icon} tone={item.chipTone} variant="tile" size="md" />
                      <h3 className="max-w-lg h4">
                        {item.question}
                      </h3>
                    </div>
                    <ExpandableToggle className="faq-toggle" />
                  </div>
                  <ExpandableBody>
                    <p className="max-w-[72ch] body text-current/80">
                      {withTerms(item.answer)}
                    </p>
                  </ExpandableBody>
                </div>
              </Expandable>
              </div>
            ))}
          </ExpandableScope>
        </div>
      </div>
    </section>
  );
}
