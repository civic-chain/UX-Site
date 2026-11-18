"use client";

import { useState, type KeyboardEvent } from "react";

import styles from "./how-it-works-timeline.module.css";

import { AccentUnderline } from "@/components/ui/accent-underline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeadlineDot } from "@/components/ui/headline-dot";
import { StepBadge } from "@/components/ui/step-badge";
import { SurfaceCard } from "@/components/ui/surface-card";
import type { SurfaceTone } from "@/lib/design-system-types";
import { cn } from "@/lib/utils";

type HowItWorksFeature = {
  step: string;
  tone: SurfaceTone;
  frontLabel: string;
  frontHeadline: string;
  frontStat: string;
  frontSource: string;
  frontBody: string;
  backLabel: string;
  backHeadline: string;
  backBody: string;
  backResult: string;
  demoHref?: string;
};

const features: readonly HowItWorksFeature[] = [
  {
    step: "01",
    tone: "cream",
    frontLabel: "Compliance & Reporting",
    frontHeadline: "Reports, reconciliations, FOIA and audits take up valuable staff time",
    frontStat: "Average FOIA response time: 23 days, when agencies comply at all.",
    frontSource: "FOIA Project, 2023",
    frontBody:
      "Finance staff spend dozens of hours per report cycle manually compiling data that already exists in siloed systems. Audits are retrospective. Compliance is a second full-time job.",
    backLabel: "TLaaS",
    backHeadline: "Transaction Ledger as a Service",
    backBody:
      "Every transaction self-records to a live, cryptographically verified public ledger. FOIA requests become a shareable link. Monthly compliance reports auto-generate from the same data running daily operations, with no extraction, no manual formatting, no wait.",
    backResult: "Staff hours for reporting → 0",
    demoHref: "civic-chain-tlaas-demo.html",
  },
  {
    step: "02",
    tone: "gold",
    frontLabel: "Payment Processing",
    frontHeadline:
      "Payment processors are extracting revenue that belongs to taxpayers",
    frontStat:
      "Interchange fees average 1.8–2.8% on government card spend, over $160B processed annually.",
    frontSource: "Nilson Report, 2023",
    frontBody:
      "For a municipality processing $10M in contract payments annually, that’s up to $280,000 handed to card networks. Not to roads. Not to services. Not to anyone the town voted for.",
    backLabel: "Stablecoin Sandwich",
    backHeadline: "The fee dissolves between two dollar signs",
    backBody:
      "Funds enter as USD. Inside Civic-Chain, they route on a stablecoin rail, eliminating interchange entirely. On the other side, they exit as USD. Dollar in, stablecoin through, dollar out. Processing cost drops by up to 95%.",
    backResult: "Interchange fees so low the product pays for itself",
  },
  {
    step: "03",
    tone: "sage",
    frontLabel: "Fraud Prevention",
    frontHeadline:
      "No structural check on whether work happened at the contracted location",
    frontStat:
      "Procurement fraud costs U.S. municipalities an estimated $30B annually.",
    frontSource: "ACFE Report to the Nations, 2022",
    frontBody:
      "Audit-based fraud detection is retrospective: it catches problems months or years after the damage is done. By then, the vendor is gone and the money is spent.",
    backLabel: "Geo-Verification",
    backHeadline: "Work that didn’t happen in the right place doesn’t get paid",
    backBody:
      "Every vendor card transaction is GPS-stamped against the contract’s approved work site. A transaction outside the geo-fence doesn’t just flag; it declines at the point of sale, in real time. Real-time geo-locking replaces retroactive auditing entirely.",
    backResult: "Geographic fraud → Structurally impossible",
  },
  {
    step: "04",
    tone: "sky",
    frontLabel: "Capital Finance",
    frontHeadline:
      "Bond compliance tracked across spreadsheets, emails, and institutional memory",
    frontStat:
      "Municipal bond market: $4 trillion outstanding. Covenant violations routinely discovered months late.",
    frontSource: "MSRB Market Statistics, 2023",
    frontBody:
      "Drawdown schedules, covenant monitoring, investor reporting, and arbitrage rebate calculations are manually maintained by finance staff. One mismanaged variable creates material liability.",
    backLabel: "Bond Management",
    backHeadline: "The covenant enforces itself",
    backBody:
      "Bond terms are encoded as smart contract rules. Drawdown limits hold automatically. Covenants are tracked in real time against live ledger data. Investor reporting generates from the same source as daily operations. The compliance layer runs without human intervention.",
    backResult: "Covenant tracking → Automated",
  },
  {
    step: "05",
    tone: "cream",
    frontLabel: "Revenue Collection",
    frontHeadline:
      "Excise taxes on fuel, materials, and goods flow through paperwork and leak from it",
    frontStat:
      "State and local governments lose an estimated 15–20% of excise revenue to reporting gaps and noncompliance.",
    frontSource: "Tax Foundation, 2023",
    frontBody:
      "Vendors file declarations manually. Audits are infrequent. There’s no mechanism at the point of transaction to ensure the tax is collected at all, only after-the-fact enforcement.",
    backLabel: "Excise Automation",
    backHeadline: "The tax is collected before the transaction clears",
    backBody:
      "Excise logic is embedded directly in the payment layer. When a vendor card is used at a qualifying merchant category (fuel, construction materials, tobacco), the applicable excise amount calculates and holds automatically at the moment of purchase. No filings. No gaps. No enforcement required.",
    backResult: "Collection point → The transaction itself",
  },
] as const;

const statToneClasses: Record<SurfaceTone, string> = {
  cream: "border-blue-700/35 bg-cream-200/85 text-blue-900",
  gold: "border-gold-800/30 bg-gold-100/70 text-gold-800",
  sage: "border-green-900/25 bg-green-100/75 text-green-900",
  sky: "border-blue-700/25 bg-blue-100/75 text-blue-900",
  slate: "border-cream-50/30 bg-cream-50/10 text-cream-50",
  ink: "border-cream-50/30 bg-cream-50/10 text-cream-50",
};

export function HowItWorksTimeline() {
  return (
    <section id="how-it-works-cards" className="section-shell">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10">
          {features.map((feature) => (
            <HowItWorksCard key={feature.step} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksCard({ feature }: { feature: HowItWorksFeature }) {
  const [hovered, setHovered] = useState(false);
  const [locked, setLocked] = useState(false);
  const flipped = hovered || locked;

  function toggleLocked() {
    setLocked((current) => {
      const next = !current;
      if (!next) {
        setHovered(false);
      }
      return next;
    });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    event.preventDefault();
    toggleLocked();
  }

  return (
    <article className="grid grid-cols-[2rem_minmax(0,1fr)] gap-6 md:grid-cols-[2.5rem_minmax(0,1fr)] md:gap-8">
      <div className="relative flex justify-center">
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-blue-900/15"
        />
        <span
          aria-hidden="true"
          className="relative mt-8 size-3.5 rounded-2xl bg-gold-300 ring-4 ring-background"
        />
      </div>

      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${feature.frontLabel} — click to reveal solution`}
        className={cn(
          styles["flip-wrap"],
          "cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
        onMouseEnter={() => {
          if (!locked) {
            setHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (!locked) {
            setHovered(false);
          }
        }}
        onClick={toggleLocked}
        onKeyDown={handleKeyDown}
      >
        <div
          className={cn(
            styles["flip-inner"],
            flipped && styles["flip-inner-flipped"],
          )}
        >
          <SurfaceCard
            tone={feature.tone}
            className={cn(
              styles["flip-face"],
              "flex min-h-96 flex-col justify-between p-7 shadow-[0_20px_40px_-10px_var(--border)] lg:p-9",
            )}
          >
            <div className="grid gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <StepBadge tone="gold" size="lg">
                  {feature.step}
                </StepBadge>
                <Badge
                  tone="gold"
                  size="lg"
                  className="body-sm normal-case tracking-normal"
                >
                  {feature.frontLabel}
                </Badge>
              </div>

              <h2 className="max-w-4xl h4">
                {feature.frontHeadline}
                <HeadlineDot />
              </h2>

              <div
                className={cn(
                  "rounded-xl border-l-4 px-5 py-4",
                  statToneClasses[feature.tone],
                )}
              >
                <p className="body-bold text-current">{feature.frontStat}</p>
                <p className="mt-1 body-sm text-current/65">
                  {feature.frontSource}
                </p>
              </div>

              <p className="max-w-5xl body text-current/72">
                {feature.frontBody}
              </p>
            </div>

            <div className="mt-8 flex sm:mt-0">
              <span className="inline-flex w-fit items-center rounded-2xl bg-blue-900 px-5 py-3 captions text-cream-50 shadow-md sm:hidden">
                Tap to Reveal
              </span>
              <span className="hidden captions text-slate-500 sm:inline">
                Hover or tap to reveal the fix →
              </span>
            </div>
          </SurfaceCard>

          <SurfaceCard
            tone="slate"
            className={cn(
              styles["flip-face"],
              styles["flip-face-back"],
              "flex min-h-96 flex-col justify-between p-7 shadow-[0_20px_40px_-10px_var(--border)] lg:p-9",
            )}
          >
            <div className="grid gap-6">
              <Badge
                tone="gold"
                size="lg"
                className="w-fit body-sm normal-case tracking-normal"
              >
                {feature.backLabel}
              </Badge>
              <div className="grid gap-4">
                <h2 className="max-w-4xl h4">
                  {feature.backHeadline}
                  <HeadlineDot />
                </h2>
                <AccentUnderline width="sm" />
                <p className="max-w-5xl body text-current/88">
                  {feature.backBody}
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-xl border border-current/25 bg-current/10 px-5 py-4">
                <p className="body-bold text-gold-300">{feature.backResult}</p>
              </div>
              {feature.demoHref ? (
                <Button
                  asChild
                  variant="filled"
                  size="sm"
                  className="w-fit"
                >
                  <a
                    href="/civic-chain-demo"
                    onClick={(event) => event.stopPropagation()}
                  >
                    → Try the TLaaS Demo
                  </a>
                </Button>
              ) : null}
            </div>
          </SurfaceCard>
        </div>
      </div>
    </article>
  );
}
