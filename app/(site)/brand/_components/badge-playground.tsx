"use client";

import type { ComponentProps } from "react";

import { Badge } from "@/components/ui/badge";
import { iconNames, type IconName } from "@/components/ui/icon";

import { PropPlayground } from "./prop-playground";
import type { PlaygroundControl } from "./prop-playground";

type BadgeTone = ComponentProps<typeof Badge>["tone"];
type BadgeVariant = ComponentProps<typeof Badge>["variant"];
type BadgeSize = ComponentProps<typeof Badge>["size"];
type BadgePlaygroundProps = {
  tone: NonNullable<BadgeTone>;
  variant: NonNullable<BadgeVariant>;
  size: NonNullable<BadgeSize>;
  icon: IconName | undefined;
};

const CONTROLS = [
  {
    prop: "tone",
    options: [
      { label: "inherit", value: "inherit" },
      { label: "neutral", value: "neutral" },
      { label: "blue", value: "blue" },
      { label: "sky", value: "sky", chipTone: "sky" },
      { label: "gold", value: "gold", chipTone: "gold" },
      { label: "sage", value: "sage", chipTone: "sage" },
      { label: "ink", value: "ink", chipTone: "ink" },
      { label: "invert", value: "invert" },
    ],
  },
  {
    prop: "variant",
    options: [
      { label: "filled", value: "filled" },
      { label: "flat", value: "flat" },
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
    prop: "icon",
    kind: "select",
    options: [
      { label: "none", value: undefined },
      ...iconNames.map((name) => ({ label: name, value: name })),
    ],
  },
] satisfies readonly PlaygroundControl<BadgePlaygroundProps>[];

const INITIAL: BadgePlaygroundProps = {
  tone: "inherit",
  variant: "filled",
  size: "md",
  icon: undefined,
};

export function BadgePlayground() {
  return (
    <PropPlayground
      controls={CONTROLS}
      initial={INITIAL}
      preview={(props) => (
        <Badge
          tone={props.tone}
          variant={props.variant}
          size={props.size}
          icon={props.icon}
        >
          Badge
        </Badge>
      )}
      code={(props) => {
        const parts = [
          `tone="${String(props.tone)}"`,
          `variant="${String(props.variant)}"`,
          `size="${String(props.size)}"`,
        ];
        if (props.icon) parts.push(`icon="${String(props.icon)}"`);
        return `<Badge ${parts.join(" ")}>Badge</Badge>`;
      }}
    />
  );
}
