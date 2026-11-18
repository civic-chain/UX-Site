import type { Metadata } from "next";
import Link from "next/link";

import { legalFootnote, partners } from "@/app/(site)/partners/content";
import { PartnerLogo } from "@/app/(site)/partners/partner-logo";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { AccentUnderline } from "@/components/ui/accent-underline";
import { BrandRasterImage } from "@/components/ui/brand-raster-image";
import { Button } from "@/components/ui/button";
import { HeadlineDot } from "@/components/ui/headline-dot";
import { Icon, type IconName } from "@/components/ui/icon";
import { IconChip } from "@/components/ui/icon-chip";
import { SurfaceCard } from "@/components/ui/surface-card";
import type { SurfaceTone } from "@/lib/design-system-types";

// Standalone mobile landing. Lives at /m as its own files so the desktop site
// is never touched; phones are forwarded here by a one-line guard on the home
// page. noindex + canonical to "/" keeps it from splitting search signals.
export const metadata: Metadata = {
  title: "Civic-Chain",
  description:
    "One place where your town's spending is always current and anyone can see it. Works with the system you already use. Nothing to replace.",
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
};

// Desktop visitors who somehow land on /m go back to the full site. Keyed off
// the same 640px breakpoint as the home-page guard, so the two never loop.
const DESKTOP_GUARD =
  "if(window.matchMedia&&window.matchMedia('(min-width:640px)').matches){location.replace('/')}";

type Stat = {
  value: string;
  label: string;
  icon: IconName;
  tone: Extract<SurfaceTone, "gold" | "sage">;
};

const stats: readonly Stat[] = [
  {
    value: "$208B",
    label: "lost to late payments in U.S. construction in a single year",
    icon: "payment",
    tone: "gold",
  },
  {
    value: "4 sec",
    label: "to settle a vendor payment, vs 1–3 days on ACH",
    icon: "flash",
    tone: "sage",
  },
];

type HelpCard = {
  headline: string;
  body: string;
  icon: IconName;
  tone: SurfaceTone;
  chipTone: SurfaceTone;
};

// Claim-disciplined benefits drawn from _docs/facts (fraud "impossible to
// conceal", tamper-evident anchoring, efficiency over the paper stack, float
// yield on held balances).
const helpCards: readonly HelpCard[] = [
  {
    headline: "Fraud becomes obvious",
    body: "Only registered, vetted vendors get paid, and every payment lands on the public record.",
    icon: "search",
    tone: "gold",
    chipTone: "gold",
  },
  {
    headline: "Tamper-evident record",
    body: "Contracts and payments are anchored on a public ledger any resident can verify.",
    icon: "record",
    tone: "sage",
    chipTone: "sage",
  },
  {
    headline: "Saves towns money",
    body: "One efficient workflow replaces the delays and waste that quietly inflate project costs.",
    icon: "flash",
    tone: "sky",
    chipTone: "sky",
  },
  {
    headline: "Revenue, not taxes",
    body: "Funds held during a project can earn stablecoin yield, designed to meet the federal GENIUS Act, with no new taxes for residents.",
    icon: "funding",
    tone: "cream",
    chipTone: "gold",
  },
] as const;

const faqs: readonly { q: string; a: string }[] = [
  {
    q: "Is this cryptocurrency?",
    a: "No. Civic-Chain doesn't buy, sell, or speculate on any coin. It uses secure digital record-keeping behind the scenes, the way a card uses a payment network you never see, and every dollar stays in U.S. dollars.",
  },
  {
    q: "Can it be hacked? Is my data public?",
    a: "It's built to bank and federal grade security standards. The public record shows contracts and payments, who got paid, how much, and for what, never residents' personal data.",
  },
  {
    q: "Who is it for?",
    a: "Any entity that manages shared contractor spend: towns, cities, counties, school districts, HOAs, and other public or quasi-public bodies.",
  },
];

export default function MobileLandingPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: DESKTOP_GUARD }} />

      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <SiteHeader />

        <main className="mx-auto grid w-full max-w-md gap-12 px-5 pb-14 pt-6">
          {/* Hero — compact: image, headline, one line, one action. */}
          <section className="grid gap-4">
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl">
              <BrandRasterImage
                src="/landing/hero-civic-scene-with-board-text-canonical-cutout.webp"
                alt="People at a public procurement record board in front of a courthouse, an open civic ledger scene."
                fill
                priority
                loading="eager"
                sizes="100vw"
                className="object-contain object-center"
              />
            </div>
            <h1 className="grid gap-1 h3">
              <span>Every dollar</span>
              <span>
                on the record
                <HeadlineDot />
              </span>
            </h1>
            <AccentUnderline />
            <p className="body text-slate-500">
              One place where your town&apos;s spending is always current and
              anyone can see it. Works with the system you already use. Nothing
              to replace.
            </p>
            <Button asChild size="xl" fullWidth className="min-h-14">
              <a href="mailto:info@civic-chain.com">Contact us</a>
            </Button>
            <p className="captions text-slate-500">
              Public spending, visible without a login
            </p>
          </section>

          {/* Proof — two hard numbers + a one-line summary. */}
          <section className="grid gap-4">
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <SurfaceCard key={stat.value} tone={stat.tone}>
                  <div className="flex flex-col gap-3 p-5">
                    <IconChip
                      name={stat.icon}
                      tone={stat.tone}
                      variant="tile"
                      size="md"
                    />
                    <p className="h3 tracking-metric">{stat.value}</p>
                    <p className="body-sm text-current/80">{stat.label}</p>
                  </div>
                </SurfaceCard>
              ))}
            </div>
            <AccentUnderline />
            <p className="body text-slate-500">
              Contracts in one place. Payments in seconds. Records visible
              without a request.
            </p>
          </section>

          {/* Four benefit cards, up front. */}
          <section className="grid gap-5">
            <div className="grid gap-2">
              <h2 className="h4">
                How Civic-Chain helps
                <HeadlineDot />
              </h2>
              <AccentUnderline />
              <p className="body-sm text-slate-500">
                Less fraud, less waste, and a public record anyone can check.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {helpCards.map((card) => (
                <SurfaceCard key={card.headline} tone={card.tone}>
                  <div className="flex h-full flex-col gap-3 p-4">
                    <IconChip
                      name={card.icon}
                      tone={card.chipTone}
                      variant="tile"
                      size="md"
                    />
                    <h3 className="body-bold">{card.headline}</h3>
                    <p className="body-sm text-current/80">{card.body}</p>
                  </div>
                </SurfaceCard>
              ))}
            </div>
          </section>

          {/* Trust — who it's built on + the top objections, answered. */}
          <section className="grid gap-5">
            <div className="grid gap-3 border-t border-gold-800/15 pt-6">
              <p className="captions text-slate-500">Built on</p>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                {partners.map((partner) => (
                  <Link
                    key={partner.id}
                    href="/partners"
                    aria-label={`${partner.name} — see how Civic-Chain works with our payment partners`}
                    className="inline-flex items-center rounded transition-opacity hover:opacity-70"
                  >
                    <PartnerLogo
                      name={partner.name}
                      src={partner.logoSrc}
                      width={partner.logoWidth}
                      height={partner.logoHeight}
                      boxClassName="max-h-7 max-w-[150px]"
                    />
                  </Link>
                ))}
              </div>
              <p className="body-xs text-slate-500">{legalFootnote}</p>
            </div>

            <div className="grid gap-3">
              <h2 className="h4">
                Quick answers
                <HeadlineDot />
              </h2>
              <AccentUnderline />
              <div className="grid gap-2">
                {faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="group rounded-2xl border border-gold-800/15 bg-cream-50 p-4"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 body-bold [&::-webkit-details-marker]:hidden">
                      <span>{faq.q}</span>
                      <Icon
                        name="chevron-down"
                        size="sm"
                        className="shrink-0 text-gold-800 transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <p className="mt-3 body-sm text-slate-600">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* Closing CTA. */}
          <SurfaceCard tone="sky">
            <div className="grid gap-4 p-6 text-center">
              <h2 className="h4">
                See it in your town
                <HeadlineDot />
              </h2>
              <p className="body-sm text-current/80">
                Talk through the workflow with the team directly.
              </p>
              <Button asChild size="xl" fullWidth className="min-h-14">
                <a href="mailto:info@civic-chain.com">Contact us</a>
              </Button>
            </div>
          </SurfaceCard>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
