import type { Metadata } from "next";
import type { ComponentProps } from "react";

import { Badge, type BadgeTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { IconChip } from "@/components/ui/icon-chip";
import { SurfaceCard } from "@/components/ui/surface-card";

import { DocHeader, DocSection, Specimen } from "../_components/doc-kit";

export const metadata: Metadata = {
  title: "Rules - CivicChain Brand",
  description:
    "CivicChain design rules: decision order, intent map, color and composition laws, and the live surface-control contract.",
};

const decisionSteps = [
  {
    step: "01",
    title: "Name the message",
    body: "Ask what the section or card must say first: a loud number, a role, a quiet reassurance, or dense proof.",
  },
  {
    step: "02",
    title: "Choose the intent",
    body: "Intent decides the surface, density, type contrast, and where color is allowed to get loud.",
  },
  {
    step: "03",
    title: "Apply the law",
    body: "Use the color, composition, radius, and component contracts below. If the frame stops reading as CivicChain, return to the message.",
  },
] as const;

const intentRules = [
  {
    intent: "Loud accent",
    title: "One number or claim",
    body: "Give it air. Keep the surface light; let the large serif number, a small chip, or the CTA carry the deep color.",
    color: "Light surface, dark small accents",
    avoid: "A fully saturated hero card for a big claim.",
    tone: "sky",
    badgeTone: "sky",
    chipTone: "sky",
  },
  {
    intent: "Role or explanation",
    title: "How a part works",
    body: "Use a light tonal surface and in-family accents. The card should explain without becoming the main event.",
    color: "Soft tone, tonal accents",
    avoid: "Treating hue as status or stuffing several color families into one card.",
    tone: "sage",
    badgeTone: "sage",
    chipTone: "sage",
  },
  {
    intent: "Quiet reassurance",
    title: "Support, FAQ, context",
    body: "Stay warm and quiet. Use the softest surface, a thin rule, and small labels that do not compete with the answer.",
    color: "Cream base, warm small details",
    avoid: "A dark or high-contrast reassurance block.",
    tone: "cream",
    badgeTone: "gold",
    chipTone: "gold-soft",
  },
  {
    intent: "Dense data",
    title: "Metrics, matrix, graph",
    body: "Move toward cream or near-white. Color belongs inside the data - numbers, bars, checks, and small labels.",
    color: "Near-white field, data accents",
    avoid: "Colored-on-colored data or hero spacing around a table.",
    tone: "cream",
    badgeTone: "blue",
    chipTone: "neutral",
  },
] as const satisfies readonly {
  intent: string;
  title: string;
  body: string;
  color: string;
  avoid: string;
  tone: ComponentProps<typeof SurfaceCard>["tone"];
  badgeTone: BadgeTone;
  chipTone: ComponentProps<typeof IconChip>["tone"];
}[];

const paletteRules = [
  {
    title: "Blue and cream anchor the brand",
    body: "Civic blue is the ink voice: text, headings, and primary action. Warm cream is the main page material.",
  },
  {
    title: "Editorial tones create rhythm",
    body: "Cream, gold, sage, and dusty sky alternate for pace. Hue does not mean good, bad, forecast, or fact.",
  },
  {
    title: "No new color without a source",
    body: "The approved ramps come from the reference boards and code. Neon, false coral, sterile white, and dark crypto glow are outside the brand.",
  },
  {
    title: "Colored text stays in family",
    body: "On a colored card, body and secondary text use the deep tone of that family, not generic gray.",
  },
] as const;

const colorLaws = [
  {
    title: "Lightness grows with area",
    body: "Large surfaces are the lightest step. Small elements - number, icon plaque, tag, button - can hold darker color.",
  },
  {
    title: "One family per card",
    body: "Icon plaque, number, accent, tag, and button share one family so the card reads as one object.",
  },
  {
    title: "Nesting stops at two levels",
    body: "A colored card may hold only white or near-white content cards. A third nested level is never colored.",
  },
  {
    title: "One dark moment per page",
    body: "Ink or slate is a rare accent, not the spine. Depth comes from warmth, borders, and soft shadow.",
  },
] as const;

const compositionRules = [
  {
    title: "Masses before details",
    body: "Check the whole frame first: anchor, counterweight, empty space, and density. A polished card can still break the screen.",
  },
  {
    title: "Proof UI has an order",
    body: "Quiet source or badge, large serif number, short sans label, thin rule, small source note. The source never shouts over the number.",
  },
  {
    title: "Register contrast beats medium loudness",
    body: "Large serif states the thesis or number; small sans serves navigation, labels, sources, and explanation.",
  },
  {
    title: "Headings stay short",
    body: "A second phrase belongs in the subheading. The heading should be caught in one glance.",
  },
  {
    title: "Accents are colored",
    body: "Arrows, dividers, underlines, and dots use the family accent. Gray accents read unfinished.",
  },
  {
    title: "Spend the detail budget once",
    body: "If a card already has an icon plaque, number, chips, and a source, do not add another decorative control.",
  },
] as const;

const spacingRules = [
  {
    level: "Between sections",
    rule: "Generous air",
    body: "Big zones need breathing room so the editorial anchor can lead.",
  },
  {
    level: "Between cards",
    rule: "Even working gap",
    body: "Cards compare cleanly when the grid gap is regular and predictable.",
  },
  {
    level: "Inside cards",
    rule: "Compact proof rhythm",
    body: "Labels, numbers, notes, and controls sit closer than page sections.",
  },
  {
    level: "Inside data",
    rule: "Dense but readable",
    body: "Tables and charts are tighter, with readable labels, rows, and rules.",
  },
] as const;

const ownerLayers = [
  {
    layer: "Brand law",
    holds: "Intent, feeling, color laws, composition, proof hierarchy, and component contracts.",
    owner: "2civic-design + reference/",
  },
  {
    layer: "Runtime values",
    holds: "Resolved tokens, surface classes, variants, and policy allowlists.",
    owner: "app/styles/* + components/ui/* + lib/design-policy.ts",
  },
  {
    layer: "Docs surface",
    holds: "Short handoff rules and specimens for the live design system.",
    owner: "app/(site)/brand/**",
  },
  {
    layer: "Pages",
    holds: "Route-owned assembly until real reuse earns a shared component.",
    owner: "app/(site)/**",
  },
] as const;

function SurfaceKit({
  tone,
  name,
  chipTone,
  badgeTone,
  detailTone,
}: {
  tone: ComponentProps<typeof SurfaceCard>["tone"];
  name: string;
  chipTone: ComponentProps<typeof IconChip>["tone"];
  badgeTone: ComponentProps<typeof Badge>["tone"];
  detailTone: BadgeTone;
}) {
  return (
    <SurfaceCard tone={tone} className="grid min-h-full gap-5 p-5 lg:p-6">
      <div className="flex items-center justify-between gap-3">
        <IconChip name="record" size="lg" tone={chipTone} />
        <Badge tone={badgeTone}>Status</Badge>
      </div>
      <h3 className="h4">{name}</h3>
      <div className="mt-auto flex flex-wrap items-center gap-3">
        <Button>
          Action
          <Icon name="arrow-right" size="xs" />
        </Button>
        <Badge tone={detailTone} icon="approvals">
          Detail
        </Badge>
      </div>
    </SurfaceCard>
  );
}

export default function BrandRulesPage() {
  return (
    <main className="section-flow pb-16 lg:pb-24">
      <DocHeader
        id="rules-hero"
        eyebrow="Rules"
        title="Start with intent."
        lede="CivicChain rules are not a token recipe. First decide what the section or card must say, then choose the intent, then let color, density, type, radius, and controls follow the law."
      />

      <DocSection
        id="rules-layers"
        title="Decision order"
        note="This is the first move before adding a component, variant, tone, or new combination."
      >
        <ol className="grid gap-4 lg:grid-cols-3">
          {decisionSteps.map((item) => (
            <li key={item.step} className="grid gap-3 rounded-2xl border border-border bg-cream-50 p-5 lg:p-6">
              <span className="captions text-gold-600">{item.step}</span>
              <h3 className="h4">{item.title}</h3>
              <p className="body-sm text-slate-500">{item.body}</p>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocSection
        id="rules-palette"
        title="Intent chooses color"
        note="Tone is rhythm and area control, not a semantic legend. State lives in words, labels, icons, and data."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {intentRules.map((rule) => (
            <SurfaceCard key={rule.intent} tone={rule.tone} className="grid gap-5 p-5 lg:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Badge tone={rule.badgeTone}>{rule.intent}</Badge>
                <IconChip name="record" tone={rule.chipTone} size="md" />
              </div>
              <div className="grid gap-2">
                <h3 className="h4">{rule.title}</h3>
                <p className="body-sm text-current/80">{rule.body}</p>
              </div>
              <div className="mt-auto grid gap-1 border-t border-current/20 pt-4">
                <p className="body-sm font-medium">{rule.color}</p>
                <p className="body-xs text-current/70">Do not: {rule.avoid}</p>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </DocSection>

      <DocSection
        id="rules-composition"
        title="Color and composition laws"
        note="These are the rules from the design authority. Code, docs, and page-local experiments bend toward them, not the other way around."
      >
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid gap-4">
            {paletteRules.map((rule) => (
              <div key={rule.title} className="grid gap-2 rounded-2xl border border-border bg-cream-50 p-5">
                <h3 className="body-bold">{rule.title}</h3>
                <p className="body-sm text-slate-500">{rule.body}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[...colorLaws, ...compositionRules].map((rule) => (
              <div key={rule.title} className="grid gap-2 rounded-2xl border border-border bg-cream-50 p-5">
                <h3 className="body-bold">{rule.title}</h3>
                <p className="body-sm text-slate-500">{rule.body}</p>
              </div>
            ))}
          </div>
        </div>
      </DocSection>

      <DocSection
        id="rules-radius"
        title="Radius decreases inward"
        note="Pair the nesting law with radius. Outer surfaces can be generous; inner objects round less. The approved ceiling is rounded-2xl."
      >
        <SurfaceCard tone="gold" className="p-5 lg:p-6">
          <div className="grid gap-4 rounded-xl border border-gold-800/20 bg-cream-50 p-4 text-blue-900 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="grid gap-2">
              <Badge tone="gold">Nested example</Badge>
              <h3 className="h4">Large outside, quieter inside</h3>
              <p className="body-sm text-slate-500">
                Colored parent, near-white child, smaller radius. Never add a third colored layer.
              </p>
            </div>
            <IconChip name="approvals" tone="gold-soft" size="lg" />
          </div>
        </SurfaceCard>
      </DocSection>

      <DocSection
        id="rules-spacing"
        title="Spacing is a ladder"
        note="Do not use one distance everywhere. The page gets calmer when air, card gaps, proof rhythm, and data density each sit at their own level."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {spacingRules.map((rule) => (
            <div key={rule.level} className="grid gap-3 rounded-2xl border border-border bg-cream-50 p-5">
              <Badge tone="gold">{rule.level}</Badge>
              <div className="grid gap-1">
                <h3 className="body-bold">{rule.rule}</h3>
                <p className="body-sm text-slate-500">{rule.body}</p>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection
        id="rules-padding"
        title="Padding stays symmetrical"
        note="Cards use a balanced all-side inset; compact labels and controls use balanced horizontal and vertical padding. Sibling space is a gap, not one-sided padding."
      >
        <Specimen
          name="Approved inset pattern"
          api="p-5 lg:p-6 · p-7 lg:p-10 · px-4 py-2"
          note="Use the existing spacing scale. Do not invent one-off half-steps, single-side padding fixes, or arbitrary radius values for rhythm."
        >
          <SurfaceCard tone="cream" className="grid gap-4 p-5 lg:p-6">
            <div className="rounded-xl border border-dashed border-blue-900/20 p-4">
              <p className="body-sm text-slate-500">Standard card inset</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge tone="gold" size="lg">
                Balanced label
              </Badge>
              <Button variant="outline">Balanced control</Button>
            </div>
          </SurfaceCard>
        </Specimen>
      </DocSection>

      <DocSection
        id="rules-surface-contract"
        title="Color rides the surface"
        note="Interactive controls take their color from the surface they sit on. A SurfaceCard publishes --ctl-accent, --ctl-on-accent, --ctl-soft, and --ctl-ink; Button and Tabs read them."
      >
        <Specimen
          name="Surface kits"
          api="SurfaceCard tone -> Button inherits"
          stage="plain"
          note="Each kit sets only tone on the card; the Button takes its color from the surface - no buttonTone, no raw classes. Ink shows the same contract on a dark surface: light labels and a filled CTA that separates from the card."
        >
          <div className="grid w-full gap-4 sm:grid-cols-2">
            <SurfaceKit tone="cream" name="Cream" chipTone="gold-soft" badgeTone="gold" detailTone="gold" />
            <SurfaceKit tone="sky" name="Sky" chipTone="sky" badgeTone="sky" detailTone="sky" />
            <SurfaceKit tone="sage" name="Sage" chipTone="sage" badgeTone="sage" detailTone="sage" />
            <SurfaceKit tone="ink" name="Ink" chipTone="ink" badgeTone="ink" detailTone="ink" />
          </div>
        </Specimen>
        <p className="mt-4 body-sm text-slate-500">
          Badge and IconChip are labels, not controls. They keep their own family
          palette and stay outside the --ctl-* contract by design.
        </p>
      </DocSection>

      <DocSection
        id="rules-variant"
        title="Hierarchy rides variant"
        note="Emphasis comes from variant: filled for the primary action, outline, ghost, or underline for quieter ones. Color comes from the surface."
      >
        <Specimen name="One surface, four emphases" api="variant: filled · outline · ghost · underline">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="underline">Underline</Button>
        </Specimen>
        <p className="mt-4 body-sm text-slate-500">
          Do not clone a control with one-off classes. A new control look belongs
          in the component variant owner.
        </p>
      </DocSection>

      <DocSection
        title="Owner route"
        note="The page documents the live system; it is not a second source of truth. When law and code diverge, update the correct owner."
      >
        <ol className="grid gap-4">
          {ownerLayers.map((layer, index) => (
            <li
              key={layer.layer}
              className="grid gap-2 rounded-2xl border border-border bg-cream-50 p-5 lg:p-6 sm:grid-cols-[10rem_1fr] sm:items-baseline"
            >
              <div className="flex items-baseline gap-3">
                <span className="captions text-slate-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="body-bold">{layer.layer}</span>
              </div>
              <div className="grid gap-2">
                <p className="body-sm text-current/80">{layer.holds}</p>
                <code className="body-xs text-slate-500">{layer.owner}</code>
              </div>
            </li>
          ))}
        </ol>
      </DocSection>
    </main>
  );
}
