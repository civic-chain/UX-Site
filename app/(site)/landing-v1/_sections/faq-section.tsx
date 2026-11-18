/* eslint-disable @next/next/no-img-element -- Transparent foreground WebP decoration must render without the next/image fill wrapper. */
import { AccentUnderline } from "@/components/ui/accent-underline";
import { Badge } from "@/components/ui/badge";
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

type FaqItem = {
  icon: IconName;
  chipTone: SurfaceTone;
  tone: SurfaceTone;
  question: string;
  answer: string;
};

const faqContent = {
  eyebrow: "FAQ",
  title: "Quick answers",
  body:
    "The end of the page should close calmly. These answers are here to remove friction, not to restart the story.",
  illustrationSrc: "/landing/faq-courthouse-trees.webp",
  illustrationAlt: "",
  items: [
    {
      icon: "admin",
      chipTone: "gold",
      tone: "cream",
      question: "Who is Civic-Chain built for?",
      answer:
        "Any entity that manages shared contractor spend. That includes small towns, mid-size cities, counties, school districts, HOAs, and other public or quasi-public bodies. The contract workflow is the same regardless of size: open the work, control the spend, confirm completion, and keep the record visible.",
    },
    {
      icon: "maine",
      chipTone: "sky",
      tone: "sky",
      question: "Why start with smaller municipalities?",
      answer:
        "Because smaller towns often carry meaningful contractor spend with lean teams, fragmented workflows, and strong accountability pressure. The pain is concentrated enough to make the product story clear.",
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
      icon: "vote",
      chipTone: "sage",
      tone: "sage",
      question: "Is public input required for every contract?",
      answer:
        "No. Public input is a layer that can support the broader contract process where appropriate. It is not the default mechanism for every municipality and every contract.",
    },
    {
      icon: "payment",
      chipTone: "gold",
      tone: "cream",
      question: "Why does contractor payment clarity matter?",
      answer:
        "Because uncertainty around payment timing, approvals, and spend rules creates friction on both sides of the transaction. Cleaner payment workflow can improve both operations and trust.",
    },
  ],
} as const satisfies {
  eyebrow: string;
  title: string;
  body: string;
  illustrationSrc: string;
  illustrationAlt: string;
  items: readonly FaqItem[];
};

export function FaqSection({ className }: { className?: string }) {
  return (
    <section id="faq" className={cn("section-shell pb-16 lg:pb-24", className)}>
      <div className="mx-auto max-page">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1fr] lg:gap-16">
          <div
            data-testid="section-heading"
            className="relative grid gap-6 lg:gap-7"
          >
            <div>
              <Badge tone="gold">{faqContent.eyebrow}</Badge>
            </div>
            <div data-testid="section-heading-copy-stack" className="grid gap-3">
              <h2 className="max-w-xs h3">
                {faqContent.title}
                <HeadlineDot />
              </h2>
              <AccentUnderline className="mt-1" />
              <p className="mt-2 max-w-xs body text-slate-500">
                {faqContent.body}
              </p>
            </div>

            <div className="mt-4 hidden lg:block">
              <DotMatrix rows={4} cols={6} className="w-24" />
            </div>

            <div className="mt-8 hidden lg:block">
              <img
                src={faqContent.illustrationSrc}
                alt={faqContent.illustrationAlt}
                width={1510}
                height={746}
                aria-hidden="true"
                className="h-auto w-full max-w-md object-contain opacity-35"
              />
            </div>
          </div>

          <ExpandableScope className="grid gap-3 lg:gap-4">
            {faqContent.items.map((item, index) => (
              <Expandable
                key={item.question}
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
                      {item.answer}
                    </p>
                  </ExpandableBody>
                </div>
              </Expandable>
            ))}
          </ExpandableScope>
        </div>
      </div>
    </section>
  );
}
