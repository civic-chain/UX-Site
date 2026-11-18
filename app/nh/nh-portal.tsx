"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { SurfaceCard } from "@/components/ui/surface-card";
import { cn } from "@/lib/utils";

import {
  FAQ_GROUPS,
  GLOSSARY,
  LEVERS,
  LIMITS,
  MYTHS,
  PLATFORM_TIERS,
  ROI_PRESETS,
  SPEND_CATEGORIES,
  STEPS,
} from "./nh-content";

const usd = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export function NhPortal() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PortalHeader />
      <Hero />
      <main className="mx-auto grid max-w-[var(--page-max)] gap-[var(--section-gap)] px-6 py-[var(--section-gap)]">
        <WhatIsIt />
        <HowItWorks />
        <StartLocal />
        <RoiCalculator />
        <MythsVsFacts />
        <Faq />
        <Limits />
        <SeeItLive />
        <Glossary />
        <GetInvolved />
      </main>
      <PortalFooter />
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────

function PortalHeader() {
  const links = [
    { label: "How it works", href: "#how" },
    { label: "What you'd save", href: "#savings" },
    { label: "Questions", href: "#faq" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 px-6 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-[var(--page-max)] flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Image src="/brand/civic-logo-w-text-horizontal.svg" alt="Civic-Chain" width={310} height={64} priority className="h-7 w-auto" />
          <span className="hidden h-6 w-px bg-border sm:block" />
          <span className="hidden type-label-compact text-slate-500 sm:inline">for New Hampshire</span>
        </div>
        <nav className="flex flex-wrap items-center gap-1">
          {links.map((l) => (
            <Button key={l.href} asChild variant="ghost" size="sm"><Link href={l.href}>{l.label}</Link></Button>
          ))}
          <Button asChild variant="outline" size="sm"><Link href="#get-involved">Get involved</Link></Button>
        </nav>
      </div>
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="border-b border-border bg-cream-50">
      <div className="mx-auto grid max-w-[var(--page-max)] gap-6 px-6 py-[var(--section-gap)]">
        <Badge tone="sky" icon="maine" className="w-fit">A plain-English guide for Granite Staters</Badge>
        <h1 className="type-display max-w-3xl">See where your tax dollars actually go.</h1>
        <p className="type-body-lg max-w-2xl text-slate-500">
          Civic-Chain is a public, tamper-proof record of how your town and school district spend money, so you can
          check the books yourself, instead of taking anyone's word for it. <strong className="text-blue-900">It is not cryptocurrency.</strong>
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="filled" size="lg" icon="funding" iconPosition="leading"><Link href="#savings">What could it save your town?</Link></Button>
          <Button asChild variant="outline" size="lg" icon="conversation" iconPosition="leading"><Link href="#faq">Read the honest FAQ</Link></Button>
        </div>
        <Link href="#savings" className="flex w-fit flex-wrap items-baseline gap-x-3 gap-y-1 rounded-2xl border border-green-500 bg-green-100 px-5 py-4 text-green-900 transition-transform hover:-translate-y-0.5">
          <span className="type-title-sm tabular-nums">≈ $26,000 a year</span>
          <span className="type-body-sm text-green-900/90">back to a mid-size NH town, roughly 7% of its outside-contract budget, in an illustrative modeled example.</span>
          <span className="type-label-compact text-blue-700">See how it's estimated →</span>
        </Link>
      </div>
    </section>
  );
}

// ── What is it ─────────────────────────────────────────────────────────────────

function Section({ id, eyebrow, title, intro, children }: { id?: string; eyebrow: string; title: string; intro?: string; children?: React.ReactNode }) {
  return (
    <section id={id} className="grid gap-6 scroll-mt-24">
      <div className="grid gap-2">
        <span className="type-label text-blue-700">{eyebrow}</span>
        <h2 className="type-title max-w-3xl">{title}</h2>
        {intro && <p className="type-body-lg max-w-2xl text-slate-500">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

function WhatIsIt() {
  return (
    <Section
      eyebrow="The idea in one minute"
      title="A receipt for government spending that no one can secretly change."
      intro="Every contract, bid, and payment gets recorded once and sealed. You don't have to trust an official, a vendor, or a party, you can open the record and verify it yourself. That's the whole product."
    >
      <div className="flex flex-wrap gap-3">
        <Badge tone="sage" icon="check-circle">No coins to buy or trade</Badge>
        <Badge tone="sage" icon="check-circle">Dollars stay in the town's own bank</Badge>
        <Badge tone="sage" icon="check-circle">Public can read &amp; verify</Badge>
        <Badge tone="sage" icon="check-circle">Bank- &amp; federal-grade security</Badge>
        <Badge tone="sage" icon="check-circle">Designed to meet the federal GENIUS Act</Badge>
      </div>
    </Section>
  );
}

// ── How it works ────────────────────────────────────────────────────────────────

function HowItWorks() {
  return (
    <Section id="how" eyebrow="How it works" title="Three steps, no jargon.">
      <div className="grid gap-4 md:grid-cols-3">
        {STEPS.map((s) => (
          <SurfaceCard key={s.title} density="standard" className="grid content-start gap-2">
            <Icon name={s.icon} size="lg" className="text-blue-700" />
            <p className="type-heading-sm">{s.title}</p>
            <p className="type-body-sm text-slate-500">{s.body}</p>
          </SurfaceCard>
        ))}
      </div>
    </Section>
  );
}

// ── Start local ─────────────────────────────────────────────────────────────────

function StartLocal() {
  return (
    <Section
      eyebrow="Start local"
      title="In New Hampshire, this is where your property taxes really go."
      intro="Most of your bill isn't salaries, it's outside contracts for services. It's also the hardest spending to see. That's exactly where Civic-Chain starts: schools and town budgets."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {SPEND_CATEGORIES.map((c) => (
          <SurfaceCard key={c.heading} tone="sky" density="standard" className="grid content-start gap-2">
            <Icon name={c.icon} size="lg" className="text-blue-700" />
            <p className="type-heading-sm">{c.heading}</p>
            <p className="type-body-sm text-blue-700/90">{c.items}</p>
          </SurfaceCard>
        ))}
      </div>
    </Section>
  );
}

// ── ROI calculator ──────────────────────────────────────────────────────────────

function RoiCalculator() {
  const [budget, setBudget] = useState(385000);
  const [tierId, setTierId] = useState("community");
  const [pcts, setPcts] = useState<Record<string, number>>(() => Object.fromEntries(LEVERS.map((l) => [l.id, l.defaultPct])));
  const [showMethod, setShowMethod] = useState(false);

  const fee = PLATFORM_TIERS.find((t) => t.id === tierId)?.fee ?? 8400;
  const grossPct = useMemo(() => Object.values(pcts).reduce((a, b) => a + b, 0), [pcts]);
  const gross = (budget * grossPct) / 100;
  const net = gross - fee;
  const netPct = budget > 0 ? (net / budget) * 100 : 0;
  const paybackMonths = gross > 0 ? Math.max(0.2, fee / (gross / 12)) : 0;

  const applyPreset = (b: number, tier: string) => {
    setBudget(b);
    setTierId(tier);
  };

  return (
    <Section
      id="savings"
      eyebrow="What you'd save"
      title="Roughly what could it return to your town or school district?"
      intro="Set your numbers below. This is an illustrative, modeled estimate, a rough order of magnitude, not a promise, built from Civic-Chain's published assumptions. Adjust any slider you think is off."
    >
      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        {/* Inputs */}
        <SurfaceCard density="standard" className="grid content-start gap-4">
          <div className="flex flex-wrap gap-2">
            {ROI_PRESETS.map((p) => (
              <Button key={p.id} size="sm" variant={budget === p.budget ? "filled" : "outline"} onClick={() => applyPreset(p.budget, p.tier)}>{p.label}</Button>
            ))}
          </div>

          <label className="grid gap-1">
            <span className="type-label-compact text-slate-500">Annual contracted-services budget (money paid out to outside vendors)</span>
            <div className="flex items-center gap-2">
              <span className="type-title-sm">{usd(budget)}</span>
            </div>
            <input type="range" min={100000} max={5000000} step={50000} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="accent-blue-900" />
          </label>

          <div className="grid gap-3">
            {LEVERS.map((l) => (
              <label key={l.id} className="grid gap-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="type-label-compact">{l.label}</span>
                  <span className="type-label-compact tabular-nums text-blue-700">{pcts[l.id].toFixed(1)}% · {usd((budget * pcts[l.id]) / 100)}</span>
                </div>
                <input type="range" min={l.min} max={l.max} step={0.1} value={pcts[l.id]} onChange={(e) => setPcts((s) => ({ ...s, [l.id]: Number(e.target.value) }))} className="accent-blue-900" />
                <span className="type-label-compact text-slate-400">{l.help}</span>
              </label>
            ))}
          </div>

          <label className="grid gap-1">
            <span className="type-label-compact text-slate-500">Civic-Chain platform fee (tier)</span>
            <div className="flex flex-wrap gap-2">
              {PLATFORM_TIERS.map((t) => (
                <Button key={t.id} size="sm" variant={tierId === t.id ? "filled" : "outline"} onClick={() => setTierId(t.id)}>{t.label} · {usd(t.fee)}</Button>
              ))}
            </div>
            <span className="type-label-compact text-slate-400">
              {PLATFORM_TIERS.find((t) => t.id === tierId)?.note}. These are illustrative starting points, not a quote. Real pricing is negotiated per town and sized to what you turn on, and the smallest towns can start with a low or pass-through fee (no upfront cost).
            </span>
          </label>
        </SurfaceCard>

        {/* Output */}
        <div className="grid content-start gap-4">
          <SurfaceCard tone="sage" density="roomy" className="grid gap-3">
            <Badge tone="invert" className="w-fit border-gold-500 bg-gold-300 text-gold-800">Illustrative estimate, not a guarantee</Badge>
            <div>
              <p className="type-label-compact text-green-900/80">Estimated net annual savings</p>
              <p className="type-display leading-none text-green-900">{usd(Math.max(0, net))}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><p className="type-label-compact text-green-900/80">≈ % of services budget</p><p className="type-title-sm tabular-nums text-green-900">{netPct.toFixed(1)}%</p></div>
              <div><p className="type-label-compact text-green-900/80">Payback on platform fee</p><p className="type-title-sm tabular-nums text-green-900">{paybackMonths < 12 ? `${paybackMonths.toFixed(1)} mo` : `${(paybackMonths / 12).toFixed(1)} yr`}</p></div>
            </div>
            <p className="type-caption text-green-900/80">Gross savings {usd(gross)} − platform fee {usd(fee)}. Savings come mostly from lower vendor bid premiums and less manual admin, not from moving money faster.</p>
          </SurfaceCard>

          <SurfaceCard density="standard" className="grid gap-2">
            <button type="button" onClick={() => setShowMethod((v) => !v)} className="flex items-center gap-1 type-label-compact text-blue-700">
              <Icon name={showMethod ? "chevron-up" : "chevron-down"} size="xs" />
              How this is calculated (and why it's a range)
            </button>
            {showMethod && (
              <div className="grid gap-2 type-caption text-slate-500">
                <p>Each slider is a recoverable saving expressed as a share of your contracted-services budget. They add up to a gross figure; the platform fee is subtracted for the net.</p>
                <p>Defaults are anchored to a fictional modeled NH town (about 4,200 residents, $385K services budget, ~8.9% gross). These are <strong>modeled estimates, not observed results</strong>.</p>
                <p>Deliberately excluded: any card-interchange or interest income. That's Civic-Chain's revenue, not your town's savings, mixing them would inflate the number.</p>
              </div>
            )}
          </SurfaceCard>
        </div>
      </div>
    </Section>
  );
}

// ── Myths vs facts ──────────────────────────────────────────────────────────────

function MythsVsFacts() {
  return (
    <Section eyebrow="Clearing the air" title="Myths vs. facts">
      <div className="grid gap-3 md:grid-cols-2">
        {MYTHS.map((m) => (
          <SurfaceCard key={m.myth} density="standard" className="grid gap-2">
            <p className="flex items-start gap-2 type-body-sm text-red-600"><Icon name="close" size="sm" className="mt-0.5 shrink-0" /><span><strong>Myth:</strong> {m.myth}</span></p>
            <p className="flex items-start gap-2 type-body-sm text-green-900"><Icon name="check-circle" size="sm" className="mt-0.5 shrink-0 text-green-600" /><span><strong>Fact:</strong> {m.fact}</span></p>
          </SurfaceCard>
        ))}
      </div>
    </Section>
  );
}

// ── FAQ ──────────────────────────────────────────────────────────────────────────

function Faq() {
  const [open, setOpen] = useState<string | null>("0-0");
  return (
    <Section id="faq" eyebrow="Straight answers" title="Questions & pushback, answered honestly.">
      <div className="grid gap-6">
        {FAQ_GROUPS.map((group, gi) => (
          <div key={group.title} className="grid gap-2">
            <h3 className="flex items-center gap-2 type-heading-sm">
              <Icon name={group.icon} size="sm" className="text-blue-700" />
              {group.title}
            </h3>
            <div className="grid gap-2">
              {group.items.map((item, ii) => {
                const key = `${gi}-${ii}`;
                const isOpen = open === key;
                return (
                  <SurfaceCard key={key} density="none" className="overflow-hidden">
                    <button type="button" onClick={() => setOpen(isOpen ? null : key)} className="flex w-full items-center justify-between gap-3 p-4 text-left">
                      <span className="type-body-bold">{item.q}</span>
                      <Icon name={isOpen ? "chevron-up" : "chevron-down"} size="sm" className="shrink-0 text-blue-700" />
                    </button>
                    {isOpen && <p className="px-4 pb-4 type-body-sm text-slate-500">{item.a}</p>}
                  </SurfaceCard>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ── Honest limits ─────────────────────────────────────────────────────────────────

function Limits() {
  return (
    <Section eyebrow="Being straight with you" title="What Civic-Chain can't do.">
      <SurfaceCard tone="gold" density="roomy" className="grid gap-3">
        {LIMITS.map((l) => (
          <p key={l} className="flex items-start gap-2 type-body-sm"><Icon name="flash" size="sm" className="mt-0.5 shrink-0 text-gold-600" />{l}</p>
        ))}
        <p className="type-caption text-gold-800/80">We list the limits on purpose. A tool that promises everything deserves your suspicion; one that's honest about its edges is one you can actually check.</p>
      </SurfaceCard>
    </Section>
  );
}

// ── See it live ───────────────────────────────────────────────────────────────────

function SeeItLive() {
  return (
    <Section eyebrow="Don't take our word for it" title="See it working.">
      <SurfaceCard density="standard" interactive className="grid max-w-xl content-start gap-2">
        <Link href="/civic-chain-demo" className="grid gap-2 focus-visible:outline-none">
          <Icon name="layout-template" size="lg" className="text-blue-700" />
          <p className="type-heading-sm">The municipal dashboard</p>
          <p className="type-body-sm text-slate-500">A full town budget, contracts, and a public ledger you can click through, then check any record against its seal to confirm it hasn't been changed.</p>
          <span className="flex items-center gap-1 type-label-compact text-blue-700">Open demo <Icon name="arrow-right" size="xs" /></span>
        </Link>
      </SurfaceCard>
    </Section>
  );
}

// ── Glossary ───────────────────────────────────────────────────────────────────────

function Glossary() {
  return (
    <Section eyebrow="Plain-English glossary" title="The five words that matter.">
      <div className="grid gap-3 sm:grid-cols-2">
        {GLOSSARY.map((g) => (
          <div key={g.term} className="rounded-2xl border border-border bg-cream-50 p-4">
            <p className="type-body-bold text-blue-900">{g.term}</p>
            <p className="type-body-sm text-slate-500">{g.def}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ── Get involved ─────────────────────────────────────────────────────────────────────

function GetInvolved() {
  return (
    <Section id="get-involved" eyebrow="Bring it to your town" title="Want this for your town or school district?">
      <SurfaceCard tone="ink" density="roomy" className="grid gap-4">
        <p className="type-body-lg max-w-2xl">Ask your select board, school board, or town manager to take a look at a no-cost transparency pilot.</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="filled" size="lg" tone="cream" icon="send" iconPosition="leading"><Link href="/contact">Contact Civic-Chain</Link></Button>
          <Button asChild variant="outline" size="lg"><Link href="#savings">Estimate your town's savings</Link></Button>
        </div>
      </SurfaceCard>
    </Section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────────

function PortalFooter() {
  return (
    <footer className="border-t border-border bg-cream-50 px-6 py-10">
      <div className="mx-auto grid max-w-[var(--page-max)] gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Image src="/brand/civic-logo-w-text-horizontal.svg" alt="Civic-Chain" width={310} height={64} className="h-6 w-auto" />
          <Button asChild variant="ghost" size="sm" icon="arrow-left" iconPosition="leading"><Link href="/">Civic-Chain home</Link></Button>
        </div>
        <p className="type-caption text-slate-500">
          The savings figures on this page are illustrative, modeled estimates, not guarantees or observed results. Civic-Chain is a spending-transparency and payment-record platform; it is not cryptocurrency and involves no investment product.
        </p>
        <p className="type-label-compact text-slate-400">
          This page is shared for public education and is non-partisan in content.
        </p>
      </div>
    </footer>
  );
}
