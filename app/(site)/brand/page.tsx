import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SystemIcon } from "@/components/ui/system-icon";

import { AssetDownloadControls } from "./_components/asset-download-controls";
import { DocHeader, DocSection } from "./_components/doc-kit";
import { logos, pageIndex } from "./content";

export const metadata: Metadata = {
  title: "Brand — CivicChain",
  description:
    "Technical CivicChain design-system docs: live tokens, components, rules, and asset downloads.",
};

const logoSlugs: Record<string, string> = {
  "Hero variant": "civic-chain-hero",
  "Icon mark": "civic-chain-icon",
  Wordmark: "civic-chain-wordmark",
};

const logoSizes: Record<string, { width: number; height: number; className: string }> = {
  "/brand/civic-chain-logo.svg": { width: 73, height: 91, className: "max-h-24" },
  "/brand/civic-logo-hero.svg": { width: 387, height: 162, className: "max-h-24" },
  "/brand/civic-logo-w-text-horizontal.svg": { width: 568, height: 91, className: "max-h-16" },
};

const layeredModel = [
  { layer: "Values", body: "Brand color, type families, motion, layout vars, and project additions exposed through Tailwind theme." },
  { layer: "Primitives", body: "Semantic type, base chrome, max-width helpers, and motion hooks; spacing, radius, and shadow use Tailwind utilities." },
  { layer: "Patterns", body: "Repeated compositions: surfaces, controls, materials, and section rhythm." },
  { layer: "Components", body: "Reusable UI pieces with public props and variants." },
  { layer: "Pages", body: "Route-owned assembly that stays local until reuse is real." },
] as const;

const ownerMap = [
  { owner: "values", path: "app/styles/tokens.css" },
  { owner: "utilities", path: "app/styles/primitives.css" },
  { owner: "compositions", path: "app/styles/patterns.css" },
  { owner: "components", path: "components/ui/" },
  { owner: "guardrails", path: "lib/design-policy.ts" },
] as const;

export default function BrandOverviewPage() {
  return (
    <main className="section-flow pb-16 lg:pb-24">
      <DocHeader
        id="overview-hero"
        eyebrow="Design-system docs"
        title="Civic-Chain design system."
        lede="Use this section to inspect current tokens, components, page patterns, and exportable logo assets. Specimens render live code; captions annotate usage. Treat this as usage documentation, not public sales copy."
      />

      <DocSection
        id="overview-logos"
        title="Logos"
        note="Source SVGs live in public/brand and are protected. Download buttons generate working PNG/JPG exports in the browser; do not edit the source assets from this page."
      >
        <div className="grid gap-8">
          {logos.map((logo) => {
            const size = logoSizes[logo.src];
            const slug = logoSlugs[logo.label] ?? logo.label.toLowerCase();

            return (
              <div
                key={logo.src}
                className="grid gap-5 lg:grid-cols-[minmax(0,18rem)_1fr] lg:items-center lg:gap-8"
              >
                <div className="grid min-h-32 place-items-center rounded-2xl border border-dashed border-blue-900/20 bg-cream-50 p-6">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={size.width}
                    height={size.height}
                    className={`h-auto w-auto max-w-full ${size.className}`}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="body-bold">{logo.label}</span>
                    <code className="body-xs text-slate-500">{logo.src}</code>
                  </div>
                  <AssetDownloadControls
                    asset={{ label: logo.label, slug, src: logo.src }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </DocSection>

      <DocSection
        id="overview-model"
        title="Layered model"
        note="Read downward: values -> primitives -> patterns -> components -> pages. Change the owner layer, not a copy of its output."
      >
        <div className="grid gap-6 lg:gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <ol className="grid gap-6">
            {layeredModel.map((item, index) => (
              <li
                key={item.layer}
                className="grid gap-2 rounded-2xl border border-border bg-cream-50 p-5 sm:grid-cols-[8rem_1fr] sm:items-baseline"
              >
                <div className="flex items-baseline gap-3">
                  <span className="captions text-slate-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="body-bold">{item.layer}</span>
                </div>
                <p className="body-sm text-slate-500">{item.body}</p>
              </li>
            ))}
          </ol>

          <div className="grid content-start gap-2 rounded-2xl border border-border bg-cream-50 p-5">
            <h2 className="body-bold">Where truth lives</h2>
            <ul className="grid gap-2">
              {ownerMap.map((item) => (
                <li
                  key={item.path}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
                >
                  <span className="body-sm text-slate-500">{item.owner}</span>
                  <code className="body-xs text-slate-500">{item.path}</code>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection
        id="overview-index"
        title="Docs index"
        note="Start with the page that owns the decision you are making. Element pages show available primitives; Rules explains intent, combination constraints, and owner route."
      >
        <div className="grid gap-6 lg:gap-4 sm:grid-cols-2">
          {pageIndex.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group grid gap-2 rounded-2xl border border-border bg-cream-50 p-5 transition-colors hover:border-blue-900/25 hover:bg-cream-200"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="body-bold">{item.label}</span>
                <SystemIcon
                  name="arrow-right"
                  size="xs"
                  className="text-slate-500 transition-transform group-hover:translate-x-0.5"
                />
              </div>
              <p className="body-sm text-slate-500">{item.body}</p>
            </Link>
          ))}
        </div>
      </DocSection>
    </main>
  );
}
