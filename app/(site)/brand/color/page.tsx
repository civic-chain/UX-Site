import type { Metadata } from "next";

import { DocHeader, DocSection, Swatch } from "../_components/doc-kit";
import { paletteGroups } from "../content";

export const metadata: Metadata = {
  title: "Color — CivicChain Brand",
  description:
    "CivicChain color docs: token ramps, structural defaults, and live resolved values.",
};

export default function BrandColorPage() {
  return (
    <main className="section-flow pb-16 lg:pb-24">
      <DocHeader
        id="color-hero"
        eyebrow="Color"
        title="Palette tokens."
        lede="Use named ramp steps and opacity utilities. Do not create one-off color tokens for a single tint. Resolved values below come from app/styles/tokens.css."
      />

      <DocSection
        id="color-ramps"
        title="Ramps and defaults"
        note="Flat palette: apply ramp steps directly (bg-blue-900, text-slate-500). A tint is that step with opacity at the use site, for example bg-blue-900/14 or border-blue-900/30, never its own token. Blue, green, and red are CivicChain hues sampled from the brand boards, not Tailwind stock; only background, foreground, border, and ring remain structural defaults."
      >
        <div className="grid gap-10">
          {paletteGroups.map((group) => (
            <div key={group.title} className="grid gap-6">
              <div className="grid gap-2">
                <p className="captions text-slate-500">
                  {group.title}
                </p>
                <p className="max-w-2xl body-sm text-slate-500">{group.note}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {group.swatches.map((swatch) => (
                  <Swatch
                    key={swatch.token}
                    name={swatch.name}
                    token={swatch.token}
                    className={swatch.bg}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </DocSection>
    </main>
  );
}
