"use client";

import type { ComponentProps } from "react";

import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { IconChip } from "@/components/ui/icon-chip";
import { SurfaceCard } from "@/components/ui/surface-card";
import { Tabs, type TabItem } from "@/components/ui/tabs";

import { PropPlayground } from "./prop-playground";
import type { PlaygroundControl } from "./prop-playground";

type SurfaceCardTone = ComponentProps<typeof SurfaceCard>["tone"];
type SurfaceCardMaterial = ComponentProps<typeof SurfaceCard>["material"];
type SurfaceCardDensity = ComponentProps<typeof SurfaceCard>["density"];

type SurfaceCardPlaygroundProps = {
  tone: NonNullable<SurfaceCardTone>;
  material: SurfaceCardMaterial;
  density: NonNullable<SurfaceCardDensity>;
  interactive: boolean;
};

const CONTROLS = [
  {
    prop: "tone",
    options: [
      { label: "cream", value: "cream", chipTone: "cream" },
      { label: "sky", value: "sky", chipTone: "sky" },
      { label: "gold", value: "gold", chipTone: "gold" },
      { label: "sage", value: "sage", chipTone: "sage" },
      { label: "slate", value: "slate", chipTone: "slate" },
      { label: "ink", value: "ink", chipTone: "ink" },
    ],
  },
  {
    prop: "material",
    options: [
      { label: "none", value: undefined },
      { label: "old-paper", value: "old-paper", chipTone: "cream" },
      { label: "banknote", value: "banknote", chipTone: "gold" },
      { label: "blueprint", value: "blueprint", chipTone: "sky" },
      { label: "notebook", value: "notebook", chipTone: "sage" },
    ],
  },
  {
    prop: "density",
    options: [
      { label: "none", value: "none" },
      { label: "standard", value: "standard" },
      { label: "roomy", value: "roomy" },
    ],
  },
  {
    prop: "interactive",
    options: [
      { label: "false", value: false },
      { label: "true", value: true },
    ],
  },
] satisfies readonly PlaygroundControl<SurfaceCardPlaygroundProps>[];

const INITIAL: SurfaceCardPlaygroundProps = {
  tone: "gold",
  material: "banknote",
  density: "roomy",
  interactive: false,
};

const SURFACE_CARD_TABS: TabItem[] = [
  {
    id: "record",
    label: "Record",
    icon: "record",
    content: "Inherited tab text follows the surrounding SurfaceCard tone.",
  },
  {
    id: "proof",
    label: "Proof",
    icon: "check-circle",
    content: "Selected tabs use currentColor unless a tone is passed directly.",
  },
  {
    id: "spend",
    label: "Spend",
    icon: "payments",
    content: "The material layer stays visual; component props still own intent.",
  },
];

export function SurfaceCardPlayground() {
  return (
    <PropPlayground
      controls={CONTROLS}
      initial={INITIAL}
      preview={(props) => (
        <SurfaceCard
          tone={props.tone}
          material={props.material}
          density={props.density}
          interactive={props.interactive}
          data-testid="surface-card-playground-preview"
          className="grid min-h-72 w-full max-w-xl"
        >
          <div className="grid h-full content-between gap-6">
            <div className="flex items-start justify-between gap-4">
              <div className="grid gap-2">
                <p className="captions text-current/55">SurfaceCard</p>
                <h3 className="h4">Approved, spent, proven.</h3>
              </div>
              <span data-testid="surface-card-playground-iconchip">
                <IconChip name="payments" size="md" />
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Badge
                icon="check-circle"
                data-testid="surface-card-playground-badge-inherit"
              >
                Inherits
              </Badge>
              <Badge
                tone="gold"
                icon="award"
                data-testid="surface-card-playground-badge-override"
              >
                Gold override
              </Badge>
              <span
                className="inline-flex items-center gap-2 body-sm"
                data-testid="surface-card-playground-icon"
              >
                <Icon name="bank" size="sm" />
                Icon inherits
              </span>
            </div>

            <div data-testid="surface-card-playground-tabs">
              <Tabs
                aria-label="SurfaceCard composed preview"
                items={SURFACE_CARD_TABS}
                variant="underline"
                size="sm"
              />
            </div>

            <div className="grid gap-2">
              <p className="body-sm text-current/75">
                Tone paints the card first. Material overlays texture through the
                approved blend layer.
              </p>
              <p className="body-xs text-current/55">
                Content stays caller-owned; the surface only carries the visual
                material.
              </p>
            </div>
          </div>
        </SurfaceCard>
      )}
      code={(props) => {
        const parts = [`tone="${String(props.tone)}"`];
        if (props.material) parts.push(`material="${String(props.material)}"`);
        if (props.density !== "none") {
          parts.push(`density="${String(props.density)}"`);
        }
        if (props.interactive) parts.push("interactive");

        return `<SurfaceCard ${parts.join(" ")}>\n  {children}\n</SurfaceCard>`;
      }}
    />
  );
}
