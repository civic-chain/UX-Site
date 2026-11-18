import type { Metadata } from "next";

import { BrandRasterImage } from "@/components/ui/brand-raster-image";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { IconChip } from "@/components/ui/icon-chip";
import { SurfaceCard } from "@/components/ui/surface-card";
import { cn } from "@/lib/utils";

import { DocHeader, DocSection, Specimen } from "../_components/doc-kit";
import { SurfaceCardPlayground } from "../_components/surface-card-playground";
import { ResolvedTokenValue } from "../_components/token-value";
import { surfaceMaterialGuides, toneTokens } from "../content";

export const metadata: Metadata = {
  title: "Surface — CivicChain Brand",
  description:
    "CivicChain surface docs: SurfaceCard tones, material overlays, image behavior, density, and page backgrounds.",
};

function tokenNameFromVar(value: string) {
  return value.replace(/^var\((--[^)]+)\)$/, "$1");
}

const surfaceDensityOptions = ["none", "standard", "roomy"] as const;

type ImageCompositionMode = "bottom-bleed" | "inline" | "texture" | "stamp";

const imageCompositionExamples = [
  {
    mode: "bottom-bleed",
    name: "Bottom bleed scene",
    api: "bg-scenes-wide · contain · multiply · 50% opacity",
    note: "Use wide background scenes as a quiet wash. They can sit at the bottom and bleed to the edge, but the image must remain uncropped.",
  },
  {
    mode: "inline",
    name: "Inline centered scene",
    api: "scenes-colored · normal flow · object-contain",
    note: "Use transparent colored scenes directly. No backing panel, outline, padding frame, crop, or aspect-ratio distortion.",
  },
  {
    mode: "texture",
    name: "Texture only",
    api: "bg-textures · overlay · tinted surface",
    note: "Use texture as a semi-transparent material overlay on a colored surface. No separate image element.",
  },
  {
    mode: "stamp",
    name: "Absolute stamp",
    api: "absolute decoration · no layout space",
    note: "Use when the card should lay out like plain content, with a small proof mark floating as background evidence.",
  },
] as const satisfies readonly {
  mode: ImageCompositionMode;
  name: string;
  api: string;
  note: string;
}[];

function DensityLadderContent() {
  return (
    <div className="grid h-full content-between gap-4">
      <div className="grid gap-2">
        <p className="captions text-current/55">SurfaceCard</p>
        <h3 className="body-bold">Approved repair record</h3>
      </div>
      <p className="body-sm text-current/75">
        Same tone and content. Only density changes the card inset.
      </p>
    </div>
  );
}

function SurfaceImageCard({ mode }: { mode: ImageCompositionMode }) {
  const hasBottomBleed = mode === "bottom-bleed";
  const hasInlineImage = mode === "inline";
  const hasStamp = mode === "stamp";
  const hasTextureOnly = mode === "texture";

  return (
    <SurfaceCard
      tone={hasTextureOnly ? "gold" : "cream"}
      material={hasTextureOnly ? "banknote" : undefined}
      className={cn(
        "relative flex min-h-96 w-full flex-col overflow-hidden border-2 border-b-8 border-gold-200 border-b-gold-300 shadow-sm",
        hasBottomBleed && "min-h-full",
      )}
    >
      <div
        className={cn(
          "relative z-10 flex min-h-full flex-col gap-7 p-6 sm:p-7 lg:p-8",
        )}
      >
        <div className="relative z-10 grid gap-6">
          <IconChip name="email" tone="sage" variant="tile" size="lg" />
          <div className="grid gap-2">
            <h3 className="h3 max-w-md">Reach the team directly.</h3>
            <span aria-hidden="true" className="h-px w-20 bg-gold-600" />
            <p className="max-w-md body text-current/68">
              Direct, private, and reviewable.
            </p>
          </div>
        </div>

        <Button
          type="button"
          size="lg"
          fullWidth
          icon="email"
          iconPosition="leading"
          className="relative z-10 max-w-full whitespace-normal break-all text-center sm:min-w-72 sm:break-normal"
        >
          info@civic-chain.com
        </Button>

        {hasInlineImage ? (
          <BrandRasterImage
            src="/design-assets/scenes-colored/colored-random-small-town-courthouse-landscape.webp"
            alt=""
            width={1445}
            height={1089}
            aria-hidden
            className="mx-auto h-auto w-full max-w-sm object-contain opacity-90"
          />
        ) : null}

        <p className="relative z-10 inline-flex items-center gap-2 body-sm text-current/58">
          <Icon name="trust" />
          <span>Direct, private, and reviewable.</span>
        </p>

        {hasBottomBleed ? (
          <div
            aria-hidden="true"
            data-asset-spacer="bottom-scene"
            className="h-64 shrink-0 sm:h-72"
          />
        ) : null}

        {hasStamp ? (
          <BrandRasterImage
            src="/design-assets/stamps/stamp-town-seal-04.webp"
            alt=""
            width={1308}
            height={1308}
            aria-hidden
            className="pointer-events-none absolute right-6 top-8 z-0 size-36 rotate-[-8deg] opacity-10 sm:right-8 sm:top-10 sm:size-44"
          />
        ) : null}
      </div>

      {hasBottomBleed ? (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-green-100/80 to-transparent opacity-80 lg:h-80"
          />
          <BrandRasterImage
            src="/design-assets/bg-scenes-wide/scene-wide-town-hall-campus-01.webp"
            alt=""
            width={1957}
            height={1019}
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -bottom-2 h-64 w-full object-contain object-bottom opacity-50 sm:h-72"
          />
        </>
      ) : null}

    </SurfaceCard>
  );
}

export default function BrandSurfacePage() {
  return (
    <main className="section-flow pb-16 lg:pb-24">
      <DocHeader
        id="surface-hero"
        eyebrow="Surface"
        title="Surfaces and backgrounds."
        lede="SurfaceCard paints the tone first, then optional material texture overlays it. Hue is rhythm; material is meaning; density controls the card inset."
      />

      <DocSection
        id="surface-card"
        title="SurfaceCard"
        note="Use tone for color, material for texture, and density for inset. The card surface owns chrome only; content stays caller-owned."
      >
        <SurfaceCardPlayground />
      </DocSection>

      <DocSection
        id="surface-image-compositions"
        title="Image behavior in cards"
        note="Use BrandRasterImage for civic art, then choose whether the image is background wash, inline content, material texture, or a floating proof mark. Do not add a new SurfaceCard prop for a one-off composition."
      >
        <div className="grid items-start gap-8 lg:grid-cols-2">
          {imageCompositionExamples.map((item) => (
            <Specimen
              key={item.mode}
              name={item.name}
              api={item.api}
              note={item.note}
              stage="plain"
            >
              <SurfaceImageCard mode={item.mode} />
            </Specimen>
          ))}
        </div>
      </DocSection>

      <DocSection
        id="surface-tones"
        title="Card tones"
        note="Use tone = cream, sky, gold, sage, slate, or ink. Each tone pairs a background with a readable foreground."
      >
        <div className="grid gap-6 lg:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {toneTokens.map((item) => (
            <SurfaceCard
              key={item.name}
              tone={item.tone}
              className="grid min-h-40 content-between gap-6 p-5 lg:p-6"
            >
              <p className="body-bold">{item.name}</p>
              <div className="grid gap-2">
                <p className="captions text-current/55">
                  Background
                </p>
                <ResolvedTokenValue tokenName={tokenNameFromVar(item.bg)} />
                <p className="captions text-current/55">
                  Foreground
                </p>
                <ResolvedTokenValue tokenName={tokenNameFromVar(item.fg)} />
              </div>
            </SurfaceCard>
          ))}
        </div>
      </DocSection>

      <DocSection
        id="surface-materials"
        title="Card materials"
        note="Use material for reusable semantic texture. Tone still owns color; the texture is an overlay, not a second palette."
      >
        <div className="grid gap-6 lg:gap-4 lg:grid-cols-2">
          {surfaceMaterialGuides.map((item) => (
            <SurfaceCard
              key={item.material}
              tone={item.tone}
              material={item.material}
              density={item.density}
              className="grid min-h-72"
            >
              <div className="grid h-full content-between gap-6">
                <div className="grid gap-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="h4">{item.label}</h3>
                    <code className="body-xs text-current/55">
                      {`material="${item.material}"`}
                    </code>
                  </div>
                  <p className="captions text-current/55">{item.role}</p>
                </div>
                <div className="grid gap-6">
                  <p className="body-sm text-current/75">{item.use}</p>
                  <p className="body-xs text-current/55">{item.avoid}</p>
                </div>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </DocSection>

      <DocSection
        id="surface-density"
        title="Density ladder"
        note="Use density for inset only. Keep tone and content the same when comparing spacing."
      >
        <Specimen
          name="SurfaceCard density"
          api="none · standard · roomy"
          stage="paper"
          note="Use standard for normal cards and roomy for the broad editorial inset."
        >
          <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {surfaceDensityOptions.map((density) => (
              <div key={density} className="grid gap-2">
                <code className="body-xs text-slate-500">
                  {`density="${density}"`}
                </code>
                <SurfaceCard
                  tone="sky"
                  density={density}
                  className="grid min-h-52"
                >
                  <DensityLadderContent />
                </SurfaceCard>
              </div>
            ))}
          </div>
        </Specimen>
      </DocSection>

      <DocSection
        id="surface-interactive"
        title="Interactive affordance"
        note="Use interactive only when the whole card is a real link or button. The prop adds hover lift and the focus-ring style; caller owns semantics."
      >
        <Specimen
          name="SurfaceCard interactive"
          api="interactive"
          hint="Hover for lift"
          stage="paper"
          note="This is the card-level hover affordance. Do not use it for static information cards."
        >
          <SurfaceCard
            tone="gold"
            material="banknote"
            density="roomy"
            interactive
            className="grid min-h-56 w-full max-w-md"
          >
            <div className="grid h-full content-between gap-6">
              <div className="grid gap-2">
                <p className="captions text-current/55">Interactive card</p>
                <h3 className="h4">Review funding record</h3>
              </div>
              <p className="body-sm text-current/75">
                Hover lift signals that the whole surface can be opened.
              </p>
            </div>
          </SurfaceCard>
        </Specimen>
      </DocSection>

      <DocSection
        id="surface-backgrounds"
        title="Page backgrounds"
        note="Page-level treatments only. Do not wrap sections in extra cards to fake a background."
      >
        <div className="grid gap-6 lg:gap-4 sm:grid-cols-2">
          <figure className="grid gap-2">
            <div className="h-44 rounded-2xl border border-border bg-background" />
            <figcaption className="grid gap-2">
              <span className="body-bold">Paper</span>
              <p className="body-sm text-slate-500">
                Default page surface: warm off-white, not pure white.
              </p>
              <code className="body-xs text-slate-500">background → cream-100</code>
            </figcaption>
          </figure>

          <figure className="grid gap-2">
            <div className="relative h-44 overflow-hidden rounded-2xl border border-border bg-cream-50">
              <div
                aria-hidden
                className="landing-grid-overlay pointer-events-none absolute inset-0"
              />
            </div>
            <figcaption className="grid gap-2">
              <span className="body-bold">Civic grid</span>
              <p className="body-sm text-slate-500">
                Decorative grid overlay used sparingly behind hero or specimen stages.
                Keep it subtle enough not to compete with content.
              </p>
              <code className="body-xs text-slate-500">landing-grid-overlay</code>
            </figcaption>
          </figure>
        </div>
      </DocSection>
    </main>
  );
}
