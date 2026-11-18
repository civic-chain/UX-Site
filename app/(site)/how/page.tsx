import Link from "next/link";

import { AccentRule } from "@/components/ui/accent-rule";
import { AccentUnderline } from "@/components/ui/accent-underline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeadlineDot } from "@/components/ui/headline-dot";
import type { IconName } from "@/components/ui/icon";
import { IconChip } from "@/components/ui/icon-chip";
import { SurfaceCard } from "@/components/ui/surface-card";
import type { SurfaceTone } from "@/lib/design-system-types";

// ── Content ────────────────────────────────────────────────────────────────────

const steps = [
  {
    n: "01",
    heading: "Town posts a contract",
    body: "The town manager creates a solicitation — project scope, budget ceiling, and payment split — and it goes live on the public ledger instantly. No mailing lists. No paper packets.",
  },
  {
    n: "02",
    heading: "Vendor wins and gets a card",
    body: "The winning vendor receives a virtual card loaded with 80% of the contract value the same day the award is made. The card is MCC-locked: it can only be spent at approved merchant categories. It declines everywhere else.",
  },
  {
    n: "03",
    heading: "USD converts to stablecoin",
    body: "Municipal funds enter as USD. Inside Civic-Chain, they convert to a digital dollar pegged 1:1 to USD. This is the payment rail — the mechanism that enables same-day settlement without traditional banking delays.",
  },
  {
    n: "04",
    heading: "Work happens, spending is tracked",
    body: "Every card tap is logged automatically: merchant, amount, category, timestamp. The town manager sees it in real time. No invoices. No reconciliation. Unauthorized spending is structurally impossible.",
  },
  {
    n: "05",
    heading: "Work is complete, residual is released",
    body: "The vendor submits a completion record. The town approves it. The remaining 20% settles in seconds. The hold-back is the accountability mechanism — enforced by structure, not policy.",
  },
  {
    n: "06",
    heading: "Everything anchors to the public ledger",
    body: "Every transaction receives a SHA-256 hash written to a public blockchain. Any resident can verify it independently. No FOIA request. No phone call to town hall. The record cannot be altered.",
  },
] as const;

const pillars: {
  tone: SurfaceTone;
  icon: IconName;
  heading: string;
  body: string;
}[] = [
  {
    tone: "cream",
    icon: "trust",
    heading: "Pre-blockchain compliance",
    body: "Vendor identity, MCC authorization, and OFAC screening run before a payment touches the ledger. Compliance is enforced at the gate, not audited after the fact.",
  },
  {
    tone: "gold",
    icon: "flash",
    heading: "Cryptographic audit chain",
    body: "A SHA-256 hash ties every transaction to the contract that authorized it. Alter one record and every downstream hash breaks. The chain is the audit.",
  },
  {
    tone: "sage",
    icon: "payment",
    heading: "Reserve fund mechanics",
    body: "20% of every contract is held until work is verified complete. The reserve is a structural accountability mechanism — it cannot be bypassed by any administrator.",
  },
  {
    tone: "sky",
    icon: "paymentTiming",
    heading: "Tri-tier settlement",
    body: "Card pool at award. Real-time authorization on every spend. Residual release on completion. Three distinct settlement tiers, one integrated ledger record per event.",
  },
];

// ── Page ───────────────────────────────────────────────────────────────────────

export default function HowPage() {
  return (
    <main className="section-flow gap-8 pb-16 lg:gap-9 lg:pb-24">

      {/* Hero */}
      <section id="how-hero" className="section-shell pt-8 lg:pt-10">
        <div className="mx-auto max-page grid gap-8">
          <div className="grid stack-section-heading">
            <div>
              <Badge tone="gold">The Mechanism</Badge>
            </div>
            <div className="grid stack-heading-copy">
              <h1 className="max-w-4xl type-display">
                How the money moves
                <HeadlineDot />
              </h1>
              <AccentUnderline className="mt-1" />
              <p className="max-w-2xl type-body-lg text-[color:var(--muted-foreground)]">
                Municipal funds enter as USD. They move on a public blockchain rail as a digital dollar pegged 1:1 to USD. Vendors are paid in minutes. Every transaction is permanently on the record.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Record-flow animation (public/how-diagram.html). The frame is fixed
          height with scrolling off, so these numbers must stay above the
          animation's real content height at every width.

          Measured content height vs the IFRAME's own width, transitions off:
            232px -> 1753px    (280px viewport, about the narrowest phone)
            272px -> 1713px
            327px -> 1696px
            640px -> 1676px    (last width in the stacked layout)
            641px -> 1317px    (rail goes side by side)
           1007px -> 1317px
           1073px -> 1335px    (peak of the wide band, not the widest case)
           1233px -> 1291px
          Height is not monotonic with width, so the wide value is set from the
          1335px peak rather than from the widest measurement.

          The breakpoint is min-[705px], not sm:, because the animation's media
          query keys off the IFRAME width while a Tailwind breakpoint keys off
          the VIEWPORT. .section-shell adds 32px of padding per side in this
          band, so at a 704px viewport the iframe is still only 640px wide and
          therefore still in its tall layout. Switching at sm: (640px) would
          apply the short height while the tall layout was live and clip about
          326px on small tablets. 705px is the first viewport where the iframe
          exceeds 640px. Re-derive if .section-shell padding changes. */}
      <section id="how-diagram" className="section-shell">
        <div className="mx-auto max-page">
          <iframe
            src="/how-diagram.html"
            title="Civic-Chain record flow animation"
            className="h-[1800px] w-full rounded-2xl border-0 min-[705px]:h-[1400px]"
            scrolling="no"
          />
        </div>
      </section>

      {/* Step-by-step */}
      <section id="how-steps" className="section-shell">
        <div className="mx-auto max-page grid gap-8">
          <div className="grid stack-section-heading">
            <div>
              <Badge tone="gold">Step by step</Badge>
            </div>
            <div className="grid stack-heading-copy">
              <h2 className="max-w-md type-heading">
                A contract, start to finish
                <HeadlineDot />
              </h2>
              <AccentUnderline className="mt-1" />
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
            {steps.map(({ n, heading, body }) => (
              <div key={n} className="flex gap-4">
                <span className="mt-0.5 shrink-0 font-mono type-label text-[color:var(--accent)]">
                  {n}
                </span>
                <div className="grid gap-1.5 border-l border-[color:var(--border)] pl-4">
                  <p className="type-body-sm font-semibold text-[color:var(--foreground)]">
                    {heading}
                  </p>
                  <p className="type-body-sm text-[color:var(--muted-foreground)]">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patent-derived architecture pillars */}
      <section id="how-architecture" className="section-shell">
        <div className="mx-auto max-page grid gap-8">
          <div className="grid stack-section-heading">
            <div>
              <Badge tone="gold">Architecture</Badge>
            </div>
            <div className="grid stack-heading-copy">
              <h2 className="max-w-xl type-heading">
                Built on a patented compliance layer
                <HeadlineDot />
              </h2>
              <AccentUnderline className="mt-1" />
              <p className="max-w-xl type-body-lg text-[color:var(--muted-foreground)]">
                The payment architecture draws from a patent originally developed for state government excise tax collection. Every mechanic below was designed to meet government-grade compliance requirements.
              </p>
            </div>
          </div>

          <div className="grid bento-gap lg:grid-cols-4">
            {pillars.map(({ tone, icon, heading, body }) => (
              <SurfaceCard key={heading} tone={tone} className="h-full">
                <div className="grid h-full gap-4 pad-card">
                  <IconChip name={icon} tone={tone} size="md" />
                  <div className="grid gap-1.5">
                    <p className="type-body-sm font-semibold text-current">{heading}</p>
                    <p className="type-body-sm text-current/70">{body}</p>
                  </div>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="how-cta" className="section-shell -mt-4">
        <div className="mx-auto max-w-4xl lg:max-w-3xl">
          <AccentRule
            sigil={
              <span className="type-label text-[color:var(--muted-foreground)]">
                Every dollar on the record.
              </span>
            }
          />
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/contact">Contact us</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/about">Meet the team</Link>
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
}
