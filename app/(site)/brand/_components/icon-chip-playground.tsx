"use client";

import type { ComponentProps } from "react";

import { IconChip } from "@/components/ui/icon-chip";
import { iconNames, type IconName } from "@/components/ui/icon";

import { PropPlayground } from "./prop-playground";
import type { PlaygroundControl } from "./prop-playground";

type IconChipTone = ComponentProps<typeof IconChip>["tone"];
type IconChipVariant = ComponentProps<typeof IconChip>["variant"];
type IconChipSize = ComponentProps<typeof IconChip>["size"];
type IconChipWeight = ComponentProps<typeof IconChip>["weight"];
type IconChipPlaygroundProps = {
  name: IconName;
  variant: NonNullable<IconChipVariant>;
  tone: NonNullable<IconChipTone>;
  size: NonNullable<IconChipSize>;
  weight: NonNullable<IconChipWeight>;
};

const CONTROLS = [
  {
    prop: "variant",
    options: [
      { label: "plain", value: "plain" },
      { label: "tile", value: "tile" },
    ],
  },
  {
    prop: "tone",
    options: [
      { label: "inherit", value: "inherit" },
      { label: "neutral", value: "neutral" },
      { label: "cream", value: "cream", chipTone: "cream" },
      { label: "sky", value: "sky", chipTone: "sky" },
      { label: "gold", value: "gold", chipTone: "gold" },
      { label: "gold-soft", value: "gold-soft" },
      { label: "sage", value: "sage", chipTone: "sage" },
      { label: "slate", value: "slate", chipTone: "slate" },
      { label: "ink", value: "ink", chipTone: "ink" },
    ],
  },
  {
    prop: "size",
    options: [
      { label: "sm", value: "sm" },
      { label: "md", value: "md" },
      { label: "lg", value: "lg" },
    ],
  },
  {
    prop: "weight",
    options: [
      { label: "light", value: "light" },
      { label: "regular", value: "regular" },
      { label: "bold", value: "bold" },
    ],
  },
  {
    prop: "name",
    kind: "select",
    options: iconNames.map((name) => ({ label: name, value: name })),
  },
] satisfies readonly PlaygroundControl<IconChipPlaygroundProps>[];

const INITIAL: IconChipPlaygroundProps = {
  variant: "tile",
  tone: "inherit",
  size: "md",
  weight: "regular",
  name: "record",
};

export function IconChipPlayground() {
  return (
    <PropPlayground
      controls={CONTROLS}
      initial={INITIAL}
      preview={(props) => (
        <IconChip
          name={props.name}
          variant={props.variant}
          tone={props.tone}
          size={props.size}
          weight={props.weight}
        />
      )}
      code={(props) =>
        `<IconChip name="${String(props.name)}" variant="${String(props.variant)}" tone="${String(props.tone)}" size="${String(props.size)}" weight="${String(props.weight)}" />`
      }
    />
  );
}
