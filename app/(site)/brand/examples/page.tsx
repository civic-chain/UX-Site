import type { Metadata } from "next";

import { AccentRule } from "@/components/ui/accent-rule";
import { Badge } from "@/components/ui/badge";
import { BrandRasterImage } from "@/components/ui/brand-raster-image";
import { Button } from "@/components/ui/button";
import { HeadlineDot } from "@/components/ui/headline-dot";
import { Icon } from "@/components/ui/icon";
import { IconChip } from "@/components/ui/icon-chip";
import { StepBadge } from "@/components/ui/step-badge";
import { SurfaceCard } from "@/components/ui/surface-card";

import { DocHeader, DocSection, Specimen } from "../_components/doc-kit";

export const metadata: Metadata = {
  title: "Examples — CivicChain Brand",
  description:
    "CivicChain composition examples showing how shared components combine inside colored cards.",
};

const walletSteps = [
  { label: "Requested", date: "May 2", done: true },
  { label: "Approved", date: "May 4", done: true },
  { label: "Payout", date: "Pending", done: false },
] as const;

const componentGapNotes = [
  {
    title: "Local stepper",
    use: "Vendor wallet status uses a route-local rail.",
    decision: "Promote only if the same approval/payout rail appears on a real page.",
  },
  {
    title: "Proof banner",
    use: "The slim banner is a composed headline, icon, rule, and scene wash.",
    decision: "Document here first; do not add a Banner primitive from one specimen.",
  },
  {
    title: "Scene wash",
    use: "Black-and-white civic illustrations sit behind content as quiet evidence.",
    decision: "Use BrandRasterImage with low opacity and multiply blend; no new image wrapper yet.",
  },
] as const;

function QuoteAssurancePanel() {
  return (
    <SurfaceCard
      data-testid="brand-example-quote"
      tone="cream"
      material="old-paper"
      density="roomy"
      className="relative grid min-h-80 w-full min-w-0 overflow-hidden shadow-md"
    >
      <div className="relative grid h-full content-between gap-8">
        <BrandRasterImage
          src="/design-assets/stamps/stamp-town-seal-04.webp"
          alt=""
          width={1308}
          height={1308}
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 hidden size-48 opacity-5 lg:block"
        />

        <div className="flex flex-wrap items-center gap-4">
          <Badge tone="gold" size="lg">
            D
          </Badge>
          <p className="body-lg text-gold-600">Quote / assurance panel</p>
        </div>

        <div className="grid gap-7 sm:grid-cols-[auto_minmax(0,1fr)] lg:max-w-4xl">
          <span
            aria-hidden
            className="hidden w-px bg-gold-600/65 sm:row-span-2 sm:block"
          />
          <div className="flex gap-5">
            <span aria-hidden className="h2 -mt-3 text-current/15">
              &ldquo;
            </span>
            <h2 className="h2 max-w-4xl">
              <span className="block">The record is clear</span>
              <span className="block">
                before the question arrives
                <HeadlineDot />
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <IconChip name="building" tone="gold-soft" variant="tile" size="lg" />
              <span className="body-xl text-current/70">Town manager</span>
            </div>
            <span aria-hidden className="hidden h-12 w-px bg-current/15 sm:block" />
            <Button type="button" size="lg" icon="arrow-right">
              View proof
            </Button>
            <Button type="button" variant="outline" size="lg" icon="link" iconPosition="leading">
              Share link
            </Button>
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
}

function WalletStep({
  label,
  date,
  done,
  index,
}: {
  label: string;
  date: string;
  done: boolean;
  index: number;
}) {
  return (
    <li className="relative z-10 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 sm:grid-cols-1 sm:justify-items-start">
      <StepBadge tone={done ? "sky" : "neutral"}>
        {done ? <Icon name="check" size="xs" /> : index + 1}
      </StepBadge>
      <span className="grid gap-1">
        <span className="body-sm sm:body-lg">{label}</span>
        <span className="body-xs text-current/70 sm:body-sm">{date}</span>
      </span>
    </li>
  );
}

function VendorWalletPanel() {
  return (
    <SurfaceCard
      data-testid="brand-example-wallet"
      tone="sky"
      density="roomy"
      className="w-full min-w-0 shadow-md"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_auto_minmax(17rem,0.65fr)] lg:items-stretch">
        <div className="grid gap-8">
          <div className="grid gap-5 sm:grid-cols-[9rem_1fr] sm:items-start">
            <IconChip name="vendor" tone="sky" variant="tile" size="lg" className="size-28" />
            <div className="grid gap-4">
              <div className="grid gap-2">
                <p className="body-lg text-current/70">Vendor wallet</p>
                <h2 className="h3">Northline Works</h2>
              </div>
              <div className="grid gap-1">
                <p className="body-xl text-current/75">Invoice amount</p>
                <p className="h2 tracking-metric">$4,800</p>
              </div>
            </div>
          </div>

          <ol className="relative grid gap-4 before:hidden before:absolute before:left-4 before:right-4 before:top-4 before:h-px before:bg-current/45 sm:grid-cols-3 sm:before:block">
            {walletSteps.map((step, index) => (
              <WalletStep key={step.label} {...step} index={index} />
            ))}
          </ol>
        </div>

        <span
          aria-hidden
          className="hidden border-l border-dashed border-current/20 lg:block"
        />

        <div className="grid content-center gap-5 border-t border-dashed border-current/20 pt-8 lg:border-t-0 lg:pt-0">
          <div className="grid justify-items-center gap-4 text-center">
            <IconChip name="trust" tone="sage" variant="tile" size="lg" className="size-28" />
            <p className="h4 text-green-900">Proof attached</p>
          </div>
          <Button type="button" size="xl" icon="send" iconPosition="leading" fullWidth>
            Send payout
          </Button>
        </div>
      </div>
    </SurfaceCard>
  );
}

function ProofHeroPanel() {
  return (
    <SurfaceCard
      data-testid="brand-example-proof-hero"
      tone="cream"
      material="old-paper"
      className="w-full min-w-0 overflow-hidden shadow-md"
    >
      <div className="grid gap-8 p-5 sm:p-6 lg:grid-cols-[minmax(20rem,0.95fr)_minmax(22rem,1fr)_minmax(18rem,0.82fr)] lg:items-center lg:gap-6 lg:p-6">
        <div className="relative min-h-72 overflow-hidden">
          <BrandRasterImage
            src="/design-assets/scenes-colored/colored-random-small-town-courthouse-landscape.webp"
            alt=""
            width={1445}
            height={1089}
            aria-hidden
            className="absolute inset-0 h-full w-full object-contain object-left-bottom opacity-70"
          />
        </div>

        <div className="grid gap-7">
          <div className="grid gap-4">
            <h2 className="h2 max-w-lg">
              <span className="block">Every dollar</span>
              <span className="block">
                has a trail
                <HeadlineDot />
              </span>
            </h2>
            <AccentRule sides="left" className="w-20 text-gold-600" />
            <p className="body-lg text-current/70">
              Approved, spent, and proven in one open record.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button type="button" size="lg" icon="arrow-right">
              View public proof
            </Button>
            <Button type="button" variant="outline" size="lg" icon="arrow-right">
              Request demo
            </Button>
          </div>
        </div>

        <div className="grid gap-5">
          <SurfaceCard tone="sage" density="standard" className="max-w-sm shadow-sm">
            <div className="flex gap-3">
              <IconChip name="trust" tone="sage" variant="tile" size="md" />
              <div className="grid gap-2">
                <h3 className="body-bold">Audit ready</h3>
                <p className="body-xs text-current/75">
                  Records are complete, verifiable, and ready for independent review.
                </p>
              </div>
            </div>
          </SurfaceCard>

          <SurfaceCard tone="sky" density="standard" className="max-w-sm shadow-sm">
            <div className="flex gap-3">
              <IconChip name="record" tone="sky" variant="tile" size="md" />
              <div className="grid gap-2">
                <h3 className="body-bold">Open record</h3>
                <p className="body-xs text-current/75">
                  Everyone can see what was approved, what was paid, and what was done.
                </p>
              </div>
            </div>
          </SurfaceCard>
        </div>
      </div>
    </SurfaceCard>
  );
}

function ProofBannerPanel() {
  return (
    <SurfaceCard
      data-testid="brand-example-banner"
      tone="cream"
      material="old-paper"
      className="min-h-44 w-full min-w-0 overflow-hidden shadow-md"
    >
      <div className="relative grid min-h-40 place-items-center overflow-hidden px-5 py-6 sm:min-h-44 sm:px-8 sm:py-8 lg:px-14">
        <BrandRasterImage
          src="/design-assets/bg-scenes-wide/scene-wide-main-street-civic-02.webp"
          alt=""
          width={1984}
          height={936}
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 hidden h-full w-1/3 object-contain object-left-bottom opacity-15 lg:block"
        />
        <BrandRasterImage
          src="/design-assets/bg-scenes-wide/scene-wide-roadwork-lane-04.webp"
          alt=""
          width={2014}
          height={962}
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 hidden h-full w-1/3 object-contain object-right-bottom opacity-10 lg:block"
        />

        <div className="relative z-10 grid justify-items-center gap-3 text-center sm:gap-4">
          <div className="grid items-center gap-4 sm:grid-cols-[auto_auto_minmax(0,1fr)] sm:gap-5 sm:text-left">
            <IconChip name="record" tone="sky" variant="tile" size="lg" className="size-16 sm:size-24" />
            <span aria-hidden className="hidden h-24 w-px bg-gold-600/70 sm:block" />
            <h2 className="h4 max-w-4xl sm:h3 lg:h2">
              Public proof <em className="border-b-2 border-gold-600/70 font-normal italic text-current/55">without</em> extra work
              <HeadlineDot />
            </h2>
          </div>
          <AccentRule className="w-44 text-gold-600" />
        </div>
      </div>
    </SurfaceCard>
  );
}

export default function BrandExamplesPage() {
  return (
    <main className="section-flow pb-16 lg:pb-24">
      <DocHeader
        id="examples-hero"
        eyebrow="Examples"
        title="Component combinations."
        lede="Use these specimens when an agent needs to combine SurfaceCard, Button, Badge, IconChip, text hierarchy, and quiet civic imagery inside colored cards. They are composition examples, not new component APIs."
      />

      <DocSection
        id="examples-cards"
        title="Four card patterns"
        note="Black-and-white civic illustrations are intentionally low-opacity and multiply-blended. Color comes from SurfaceCard tone and component props, not one-off raw palette classes."
      >
        <div className="grid gap-8">
          <Specimen
            name="Quote assurance panel"
            api="SurfaceCard cream / Button inherits / Badge + IconChip"
            stage="plain"
            note="Use when a short quote or assurance line is the hero. The stamp is background evidence, not content."
          >
            <QuoteAssurancePanel />
          </Specimen>

          <Specimen
            name="Vendor wallet"
            api="SurfaceCard sky / local status rail / Button inherits"
            stage="plain"
            note="Use when the card explains payment readiness. The rail is local until a second real workflow needs it."
          >
            <VendorWalletPanel />
          </Specimen>

          <Specimen
            name="Public proof hero"
            api="SurfaceCard cream / nested proof cards"
            stage="plain"
            note="Use for a broad editorial card: one civic scene, one large serif claim, and smaller proof objects."
          >
            <ProofHeroPanel />
          </Specimen>

          <Specimen
            name="Slim proof banner"
            api="SurfaceCard cream / IconChip / AccentRule"
            stage="plain"
            note="Use as a narrow transition or section cap. The line art stays behind the text and never competes with it."
          >
            <ProofBannerPanel />
          </Specimen>
        </div>
      </DocSection>

      <DocSection
        id="examples-gaps"
        title="Component gap read"
        note="Nothing here requires a new shared primitive yet. Promote only when a real second consumer repeats the same behavior, density, and semantics."
      >
        <div className="grid gap-6 lg:gap-4 sm:grid-cols-2">
          {componentGapNotes.map((item) => (
            <SurfaceCard key={item.title} tone="cream" density="standard" className="grid gap-2">
              <Badge tone="ink" variant="flat" icon="layers">
                Candidate pattern
              </Badge>
              <h3 className="body-xl">{item.title}</h3>
              <p className="body-sm text-current/75">{item.use}</p>
              <p className="body-xs text-current/55">{item.decision}</p>
            </SurfaceCard>
          ))}
        </div>
      </DocSection>
    </main>
  );
}
