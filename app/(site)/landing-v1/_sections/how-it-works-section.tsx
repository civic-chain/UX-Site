import Image from "next/image";

import { RevealList } from "@/components/motion";
import { AccentUnderline } from "@/components/ui/accent-underline";
import { BrandRasterImage } from "@/components/ui/brand-raster-image";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { HeadlineDot } from "@/components/ui/headline-dot";
import type { IconName } from "@/components/ui/icon";
import { IconChip } from "@/components/ui/icon-chip";
import { StepBadge } from "@/components/ui/step-badge";
import { SurfaceCard } from "@/components/ui/surface-card";
import type { SurfaceTone } from "@/lib/design-system-types";
import { cn } from "@/lib/utils";

type StepTone = "cream" | "sky" | "sage";
type WorkflowStep = {
  number: string;
  label: string;
  title: string;
  body: string;
  stages: readonly { label: string; icon: IconName }[];
  icon: IconName;
  tone: StepTone;
  chipTone: SurfaceTone;
  badgeTone: BadgeTone;
  artworkSrc: string;
  artworkAlt: string;
};

const howItWorksContent = {
  eyebrow: "How It Works",
  title: "From request to payout",
  body:
    "Civic-Chain turns a fragmented process into a shared contract workflow. Each step below pairs two stages that stay connected inside the same contract record.",
  logoSrc: "/brand/civic-logo-w-text-horizontal.svg",
  logoAlt: "Civic-Chain",
  steps: [
    {
      number: "01",
      label: "Step one",
      title: "Open the work and keep the starting record clear",
      body:
        "The town publishes the request and can document public input where appropriate without letting that layer take over the whole process.",
      stages: [
        { label: "Publish request", icon: "announce" },
        { label: "Document input", icon: "note" },
      ],
      icon: "project",
      tone: "cream",
      chipTone: "gold",
      badgeTone: "gold",
      artworkSrc: "/landing/request-desk.webp",
      artworkAlt: "Request desk illustration with documents and a lamp.",
    },
    {
      number: "02",
      label: "Step two",
      title: "Move from award to controlled spend",
      body:
        "Once a vendor is chosen, the contract record, spend rules, and payment readiness stay tied to the same workflow instead of being handled ad hoc.",
      stages: [
        { label: "Record award", icon: "award" },
        { label: "Control spend", icon: "paid" },
      ],
      icon: "trust",
      tone: "sky",
      chipTone: "sky",
      badgeTone: "sky",
      artworkSrc: "/landing/controlled-spend-clipboard-coins.webp",
      artworkAlt: "Clipboard with contract record and stacked coins illustration.",
    },
    {
      number: "03",
      label: "Step three",
      title: "Confirm the work and authorize payout",
      body:
        "Completed work is confirmed before payout moves forward, leaving a readable record of what happened, who approved it, and how funds moved.",
      stages: [
        { label: "Confirm work", icon: "completed" },
        { label: "Authorize payout", icon: "payment" },
      ],
      icon: "approvals",
      tone: "sage",
      chipTone: "sage",
      badgeTone: "sage",
      artworkSrc: "/landing/confirmation-ledger-courthouse.webp",
      artworkAlt: "Open ledger with checkmark in front of a courthouse illustration.",
    },
  ],
} as const satisfies {
  eyebrow: string;
  title: string;
  body: string;
  logoSrc: string;
  logoAlt: string;
  steps: readonly WorkflowStep[];
};

export function HowItWorksSection({ className }: { className?: string }) {
  return (
    <section
      id="how-it-works"
      className={cn("section-shell", className)}
    >
      <div className="mx-auto max-page">
        <div className="grid gap-6 lg:gap-7">
          <div data-testid="section-heading" className="grid gap-6 lg:gap-7">
            <div>
              <Badge tone="gold">{howItWorksContent.eyebrow}</Badge>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src={howItWorksContent.logoSrc}
                alt={howItWorksContent.logoAlt}
                width={387}
                height={80}
                className="h-auto w-32 sm:w-36"
              />
            </div>
            <div data-testid="section-heading-copy-stack" className="grid gap-3">
              <h2 className="max-w-3xl h3">
                {howItWorksContent.title}
                <HeadlineDot />
              </h2>
              <AccentUnderline className="mt-1" />
              <p className="mt-2 max-w-2xl body-lg text-slate-500">
                {howItWorksContent.body}
              </p>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute left-7 top-0 bottom-0 w-px border-l border-dashed border-current/15"
            />

            <RevealList className="flex flex-col gap-8 lg:gap-10" stagger={0.08}>
              {howItWorksContent.steps.map((step, index) => {
                return (
                  <div
                    key={step.title}
                    data-testid={`step-card-${index}`}
                    className="relative flex gap-6 lg:gap-8"
                  >
                    <div className="relative z-10 flex shrink-0 flex-col items-center pt-4">
                      <StepBadge
                        variant="rounded"
                        tone="ghost"
                        size="xl"
                        className="bg-background"
                      >
                        {step.number}
                      </StepBadge>
                    </div>

                    <SurfaceCard
                      tone={step.tone}
                      className="relative flex-1 overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[1.4fr_1fr] lg:gap-8 lg:p-10">
                        <div className="grid gap-7">
                          <div className="flex items-center gap-3">
                            <IconChip name={step.icon} tone={step.chipTone} variant="tile" size="md" />
                            <span className="captions">
                              {step.label}
                            </span>
                          </div>

                          <div className="grid gap-3">
                            <h3 className="max-w-md h4">
                              {step.title}
                            </h3>
                            <AccentUnderline width="sm" />
                            <p className="max-w-md body text-current/80">
                              {step.body}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-3">
                            {step.stages.map((stage) => (
                              <Badge
                                key={stage.label}
                                tone={step.badgeTone}
                                icon={stage.icon}
                              >
                                {stage.label}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="relative h-56 lg:h-72">
                          <BrandRasterImage
                            src={step.artworkSrc}
                            alt={step.artworkAlt}
                            fill
                            sizes="(min-width: 1024px) 36vw, 95vw"
                            className="object-contain object-right-bottom"
                          />
                        </div>
                      </div>
                    </SurfaceCard>
                  </div>
                );
              })}
            </RevealList>
          </div>
        </div>
      </div>
    </section>
  );
}
