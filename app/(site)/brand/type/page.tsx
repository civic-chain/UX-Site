import type { Metadata } from "next";

import { cn } from "@/lib/utils";

import { DocHeader, DocSection } from "../_components/doc-kit";
import { ResolvedTokenValue } from "../_components/token-value";
import { typeFamilies, typeScale } from "../content";

export const metadata: Metadata = {
  title: "Type — CivicChain Brand",
  description:
    "CivicChain type docs: semantic utilities, Tailwind source sizes, and usage rules.",
};

export default function BrandTypePage() {
  return (
    <main className="section-flow pb-16 lg:pb-24">
      <DocHeader
        id="type-hero"
        eyebrow="Type"
        title="Typography tokens."
        lede="Use semantic text utilities for family, Tailwind source size, line-height, tracking, and default color. Use local weight or approved palette utilities only when the context needs emphasis or contrast."
      />

      <DocSection
        id="type-families"
        title="Typefaces"
        note="Do not set font family at the call site. Pick the semantic utility; it already selects the family."
      >
        <div className="grid gap-6 lg:gap-4 lg:grid-cols-2">
          {typeFamilies.map((family) => (
            <div
              key={family.label}
              className="grid gap-6 rounded-2xl border border-border bg-cream-50 p-5 lg:p-6"
            >
              <div className="grid gap-2">
                <p className="captions text-slate-500">
                  {family.label}
                </p>
                <p className="body-bold">{family.family}</p>
              </div>
              <p className={family.className}>{family.sample}</p>
              <div className="grid gap-2">
                <p className="body-sm text-slate-500">{family.role}</p>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <code className="body-xs text-slate-500">{family.utility}</code>
                  <ResolvedTokenValue tokenName={family.token} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection
        id="type-scale"
        title="Approved tokens"
        note="Use these class names in JSX, not raw text-* sizes. Each utility owns its size, Tailwind default line-height, family, tracking, and default color; responsive switches stay semantic, for example body lg:body-lg. captions is uppercase by default with letter-spacing; the other utilities are not."
      >
        <div className="rounded-2xl border border-border bg-cream-50">
          <ul className="grid p-7 lg:p-10">
            {typeScale.map((step, index) => {
              return (
                <li
                  key={step.name}
                  className={cn(
                    "grid gap-5 py-6 lg:grid-cols-[minmax(0,14rem)_minmax(0,18rem)_minmax(0,1fr)] lg:items-baseline lg:gap-8",
                    index > 0 && "border-t border-blue-900/12",
                  )}
                >
                  <div className="grid gap-2">
                    <span className="body-bold">{step.name}</span>
                    <p className="body-sm text-slate-500">{step.role}</p>
                  </div>
                  <dl className="grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-1 body-xs text-slate-500">
                    <dt>Tailwind</dt>
                    <dd>{step.sourceSize}</dd>
                    <dt>Font</dt>
                    <dd>{step.font}</dd>
                    <dt>Line-height</dt>
                    <dd>{step.lineHeight}</dd>
                    <dt>Tracking</dt>
                    <dd>{step.tracking}</dd>
                    <dt>Weight</dt>
                    <dd>{step.weight}</dd>
                    <dt>Default color</dt>
                    <dd>{step.defaultColor}</dd>
                  </dl>
                  <div className="min-w-0">
                    <p data-testid={`type-sample-${step.name}`} className={step.name}>
                      {step.sample}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </DocSection>
    </main>
  );
}
