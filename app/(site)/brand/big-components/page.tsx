import type { Metadata } from "next";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

import { DocHeader, DocSection, Specimen } from "../_components/doc-kit";

export const metadata: Metadata = {
  title: "Big components — CivicChain Brand",
  description:
    "CivicChain shell docs: SiteHeader and SiteFooter rendered as live specimens.",
};

export default function BrandBigComponentsPage() {
  return (
    <main className="section-flow pb-16 lg:pb-24">
      <DocHeader
        id="big-hero"
        eyebrow="Big components"
        title="Shared shell."
        lede="Large composed pieces that belong to components/site. Current shell is SiteHeader plus SiteFooter; add new entries only after a second real page needs the composition."
      />

      <DocSection
        id="big-shell"
        title="Site shell"
        note="Shell rules: the (site) layout mounts these once; they stay static, hold no client state, and use stable id anchors. Demo ids prevent duplicate-id collisions on this page."
      >
        <div className="grid gap-10">
          <Specimen
            name="SiteHeader"
            api="components/site"
            stage="frame"
            hint="Hover nav links"
            note="Logo links home. Main nav links About us, How It Works, and Demo. Email stays in footer and contact CTAs."
          >
            <SiteHeader id="demo-site-header" />
          </Specimen>

          <Specimen
            name="SiteFooter"
            api="components/site"
            stage="frame"
            note="Footer owns legal line and route links. Keep links aligned with live routes."
          >
            <SiteFooter id="demo-site-footer" />
          </Specimen>

          <div className="grid gap-2 rounded-2xl border border-border bg-cream-50 p-5">
            <h2 className="body-bold">Header and footer links</h2>
            <ul className="grid gap-2 body-sm text-slate-500">
              <li>
                <code className="body-xs text-slate-500">/about</code>
                {", "}
                <code className="body-xs text-slate-500">
                  /how-it-works
                </code>
                {", and "}
                <code className="body-xs text-slate-500">/civic-chain-demo</code>
                {" "}are the live route links in the main nav.
              </li>
              <li>
                Footer links stay compact:{" "}
                <code className="body-xs text-slate-500">/about</code>
                {" and "}
                <code className="body-xs text-slate-500">
                  mailto:info@civic-chain.com
                </code>
                .
              </li>
              <li>
                <code className="body-xs text-slate-500">/pitch</code>
                {" "}is excluded from the footer.
              </li>
            </ul>
          </div>
        </div>
      </DocSection>
    </main>
  );
}
