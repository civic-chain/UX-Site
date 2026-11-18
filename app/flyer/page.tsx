import type { Metadata } from "next";

import { PrintButton } from "./print-button";

export const metadata: Metadata = {
  title: "CivicChain — TLaaS Service Tiers",
  robots: { index: false, follow: false },
};

const TIERS = [
  {
    number: "01",
    name: "Transparency\nPilot",
    price: "$5,000",
    period: "/ yr",
    audience: "Any size",
    audienceNote: "Below most bid thresholds",
    accentClass: "bg-gold-500",
    badgeClass: "bg-gold-100 text-gold-800 border border-gold-300",
    checkClass: "text-gold-600",
    cardClass: "border-gold-200",
    topBarClass: "bg-gold-500",
    features: [
      "Public real-time spending dashboard",
      "Budget vs. spend by department",
      "Bank data ingestion via read-only API or CSV",
      "SHA-256 blockchain anchoring on every record",
      "Departmental budget overview",
      "Email support (Mon–Fri ET)",
      "Full data export at term end",
    ],
    highlight: "No IT team required. Go live in 2–4 weeks.",
    inheritNote: null,
  },
  {
    number: "02",
    name: "Community",
    price: "$8,400–$15K",
    period: "/ yr",
    audience: "Under 2,500 residents",
    audienceNote: "Sized to procurement budget",
    accentClass: "bg-green-600",
    badgeClass: "bg-green-100 text-green-900 border border-green-300",
    checkClass: "text-green-600",
    cardClass: "border-green-200",
    topBarClass: "bg-green-600",
    features: [
      "Digital RFP + proposal engine with CRN routing",
      "Smart Contract Records (SARs) anchored on a public blockchain",
      "Blockchain-settled vendor payments, same-day",
      "Board voting portal (web-based)",
      "Public contract ledger, any resident, no login",
      "Admin console for municipal staff",
    ],
    highlight: null,
    inheritNote: "Everything in Transparency Pilot, plus:",
  },
  {
    number: "03",
    name: "Professional",
    price: "$25K–$50K",
    period: "/ yr",
    audience: "2,500–25,000 residents",
    audienceNote: "Sized to contract volume",
    accentClass: "bg-blue-700",
    badgeClass: "bg-blue-100 text-blue-900 border border-blue-300",
    checkClass: "text-blue-700",
    cardClass: "border-blue-200",
    topBarClass: "bg-blue-700",
    features: [
      "Phone Tap Payments via Apple Pay and Google Pay",
      "MCC-locked vendor cards (spend enforced at tap)",
      "Mobile citizen voting with GPS geolocation",
      "Real-time spend dashboard with alerts",
      "Named account manager",
      "99.9% uptime SLA + 24/7 emergency line",
    ],
    highlight: null,
    inheritNote: "Everything in Community, plus:",
  },
  {
    number: "04",
    name: "Enterprise",
    price: "$75K–$240K",
    period: "/ yr",
    audience: "25,000+ residents · Counties",
    audienceNote: "Custom scope-based pricing",
    accentClass: "bg-slate-700",
    badgeClass: "bg-slate-100 text-slate-700 border border-slate-300",
    checkClass: "text-slate-700",
    cardClass: "border-slate-300",
    topBarClass: "bg-slate-700",
    features: [
      "ERP integration with existing municipal systems",
      "Multi-department + multi-site management",
      "County administrator dashboard",
      "Cross-municipality vendor marketplace",
      "White-label deployment option",
      "Dedicated implementation engagement",
    ],
    highlight: null,
    inheritNote: "Everything in Professional, plus:",
  },
] as const;

const STATS = [
  { value: "462%", label: "ROI, small town case study", note: "modeled" },
  { value: "< 4 wks", label: "Pilot tier go-live", note: "from signing" },
  { value: "$0", label: "FOIA cost to residents", note: "public by default" },
] as const;

export default function FlyerPage() {
  return (
    <div className="min-h-screen bg-cream-100 font-sans">

      {/* ── Print button — hidden on print ── */}
      <div className="no-print flex justify-end px-6 pt-4 pb-2">
        <PrintButton />
      </div>

      {/* ── Flyer container ── */}
      <div className="mx-auto max-w-4xl px-4 pb-8 print:max-w-none print:px-0 print:pb-0">

        {/* ── Header ── */}
        <header className="bg-blue-900 px-8 py-7 print:px-10 print:py-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
            <div className="flex flex-col gap-5">
              {/* Logo */}
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/civic-chain-logo.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-10 w-10 opacity-90"
                  style={{ filter: "brightness(0) invert(1) sepia(1) saturate(0.6) hue-rotate(5deg)" }}
                />
                <span className="font-display text-xl tracking-wide text-cream-50">
                  Civic-Chain
                </span>
              </div>
              {/* Headline */}
              <div className="grid gap-2">
                <h1 className="font-display text-3xl leading-tight text-cream-50 sm:text-4xl">
                  Municipal Transparency,
                  <br />
                  as a Service.
                </h1>
                <div className="h-0.5 w-16 bg-gold-500" />
                <p className="mt-1 max-w-lg text-sm leading-relaxed text-blue-200">
                  From public ledger visibility to phone-tap vendor payments. Four service tiers built to move at your town's pace, with no disruption to existing systems.
                </p>
              </div>
            </div>
            {/* Right column — QR placeholder / contact block */}
            <div className="flex-none rounded border border-blue-700/50 bg-blue-800/40 px-5 py-4 text-right text-sm text-blue-200">
              <div className="mb-2 font-display text-base text-gold-300">Get started</div>
              <div className="text-cream-50">civic-chain.com</div>
              <div className="mt-1 text-blue-300">info@civic-chain.com</div>
              <div className="mt-3 text-xs text-blue-400">Civic-Chain LLC · Maine</div>
            </div>
          </div>
        </header>

        {/* ── Stats strip ── */}
        <div className="bg-gold-100 border-y-2 border-gold-300 px-8 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap">
            {STATS.map((stat, i) => (
              <div
                key={stat.value}
                className={`flex flex-1 flex-col items-center gap-0.5 text-center ${
                  i < STATS.length - 1
                    ? "border-r border-gold-300 pr-4 sm:pr-8"
                    : ""
                }`}
              >
                <span className="font-display text-2xl text-blue-900">{stat.value}</span>
                <span className="text-xs font-semibold text-gold-800 uppercase tracking-wide">{stat.label}</span>
                <span className="text-xs text-gold-600 italic">{stat.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tiers ── */}
        <main className="bg-cream-50 px-8 py-8 print:px-10">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl text-blue-900">Four tiers. One path forward.</h2>
              <p className="mt-1 text-sm text-slate-500">
                Start with transparency. Add procurement, payments, and governance at your own pace.
              </p>
            </div>
            <div className="hidden text-xs text-slate-400 sm:block">
              All tiers · flat annual SaaS · no per-transaction charges
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((tier) => (
              <div
                key={tier.number}
                className={`flex flex-col rounded-xl border-2 ${tier.cardClass} bg-white overflow-hidden`}
              >
                {/* Top accent bar */}
                <div className={`h-1.5 w-full ${tier.topBarClass}`} />

                <div className="flex flex-1 flex-col gap-4 p-5">
                  {/* Tier number + badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                      {tier.number}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${tier.badgeClass}`}>
                      {tier.audience}
                    </span>
                  </div>

                  {/* Name + price */}
                  <div className="grid gap-1">
                    <h3 className="font-display text-xl leading-snug text-blue-900 whitespace-pre-line">
                      {tier.name}
                    </h3>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-lg font-bold text-foreground">{tier.price}</span>
                      <span className="text-xs text-slate-500">{tier.period}</span>
                    </div>
                    <span className="text-xs italic text-slate-400">{tier.audienceNote}</span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-cream-300" />

                  {/* Inherit note */}
                  {tier.inheritNote && (
                    <p className="text-xs font-semibold text-slate-500">{tier.inheritNote}</p>
                  )}

                  {/* Feature list */}
                  <ul className="flex flex-1 flex-col gap-2">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <svg
                          className={`mt-0.5 h-3.5 w-3.5 flex-none ${tier.checkClass}`}
                          viewBox="0 0 14 14"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M2.5 7.5l3 3 6-6"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-xs leading-relaxed text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Highlight note */}
                  {tier.highlight && (
                    <p className="mt-auto rounded-lg bg-gold-100 px-3 py-2 text-xs font-semibold text-gold-800">
                      {tier.highlight}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Adoption flow strip ── */}
          <div className="mt-6 rounded-xl border border-blue-900/10 bg-blue-900/4 px-6 py-4">
            <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-0">
              {[
                { step: "Sign pilot agreement", sub: "Day 1 · No IT required" },
                { step: "Kickoff + setup call", sub: "Within 5 business days" },
                { step: "Connect bank data", sub: "Read-only API or CSV" },
                { step: "Dashboard goes live", sub: "Week 2–4 from signing" },
              ].map((item, i, arr) => (
                <div key={item.step} className="flex flex-1 items-center gap-0 min-w-0">
                  <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                    <span className="text-xs font-semibold text-blue-900 truncate">{item.step}</span>
                    <span className="text-xs text-slate-500">{item.sub}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <svg className="mx-3 h-4 w-4 flex-none text-gold-500" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M4 8h8M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* ── Footer ── */}
        <footer className="bg-blue-900 px-8 py-5 print:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-6 text-sm">
                <a href="https://civic-chain.com" className="text-cream-50 hover:text-gold-300 transition-colors">
                  civic-chain.com
                </a>
                <a href="https://civic-chain.com/contact" className="text-blue-300 hover:text-gold-300 transition-colors">
                  civic-chain.com/contact
                </a>
              </div>
              <p className="text-xs text-blue-500 max-w-xl leading-relaxed">
                Pricing is indicative. Final fees are set in a signed Statement of Work. ROI and savings figures are modeled estimates based on publicly available salary and fee data.
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-blue-400 uppercase tracking-widest">Civic-Chain LLC</div>
              <div className="text-xs text-blue-500">Maine · 2026</div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
