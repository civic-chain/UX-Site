"use client";

import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { iconNames, type IconName } from "@/components/ui/icon";

import { PropPlayground } from "./prop-playground";
import type { PlaygroundControl } from "./prop-playground";

type ButtonVariant = ComponentProps<typeof Button>["variant"];
type ButtonSize = ComponentProps<typeof Button>["size"];
type ButtonTone = ComponentProps<typeof Button>["tone"];
type ButtonIconPosition = NonNullable<ComponentProps<typeof Button>["iconPosition"]>;
type ButtonFullWidth = NonNullable<ComponentProps<typeof Button>["fullWidth"]>;
type ButtonChildrenMode = "shown" | "hidden";
type ButtonPlaygroundProps = {
  variant: NonNullable<ButtonVariant>;
  size: NonNullable<ButtonSize>;
  tone: ButtonTone;
  icon: IconName | undefined;
  iconPosition: ButtonIconPosition;
  fullWidth: ButtonFullWidth;
  children: ButtonChildrenMode;
};

const CONTROLS = [
  {
    prop: "variant",
    options: [
      { label: "filled", value: "filled" },
      { label: "soft", value: "soft" },
      { label: "outline", value: "outline" },
      { label: "ghost", value: "ghost" },
      { label: "underline", value: "underline" },
    ],
  },
  {
    prop: "size",
    options: [
      { label: "sm", value: "sm" },
      { label: "md", value: "md" },
      { label: "lg", value: "lg" },
      { label: "xl", value: "xl" },
      { label: "2xl", value: "2xl" },
    ],
  },
  {
    prop: "tone",
    options: [
      { label: "none", value: undefined },
      { label: "cream", value: "cream", chipTone: "cream" },
      { label: "sky", value: "sky", chipTone: "sky" },
      { label: "gold", value: "gold", chipTone: "gold" },
      { label: "sage", value: "sage", chipTone: "sage" },
      { label: "slate", value: "slate", chipTone: "slate" },
      { label: "ink", value: "ink", chipTone: "ink" },
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
  {
    prop: "iconPosition",
    options: [
      { label: "trailing", value: "trailing" },
      { label: "leading", value: "leading" },
    ],
  },
  {
    prop: "fullWidth",
    options: [
      { label: "false", value: false },
      { label: "true", value: true },
    ],
  },
  {
    // The label is children; omit it (with an icon set) for an icon-only button.
    prop: "children",
    options: [
      { label: "text", value: "shown" },
      { label: "icon only", value: "hidden" },
    ],
  },
] satisfies readonly PlaygroundControl<ButtonPlaygroundProps>[];

const INITIAL: ButtonPlaygroundProps = {
  variant: "filled",
  size: "md",
  tone: undefined,
  icon: undefined,
  iconPosition: "trailing",
  fullWidth: false,
  children: "shown",
};

export function ButtonPlayground() {
  return (
    <PropPlayground
      controls={CONTROLS}
      initial={INITIAL}
      preview={(props) => {
        const showText = props.children !== "hidden";
        return (
          <Button
            variant={props.variant}
            size={props.size}
            tone={props.tone}
            icon={props.icon}
            iconPosition={props.iconPosition}
            fullWidth={props.fullWidth}
            aria-label={showText ? undefined : "Button"}
          >
            {showText ? "Button" : null}
          </Button>
        );
      }}
      code={(props) => {
        const showText = props.children !== "hidden";
        const parts = [
          `variant="${String(props.variant)}"`,
          `size="${String(props.size)}"`,
        ];
        if (props.tone) parts.push(`tone="${String(props.tone)}"`);
        if (props.icon) {
          parts.push(`icon="${String(props.icon)}"`);
          if (props.iconPosition !== "trailing") {
            parts.push(`iconPosition="${String(props.iconPosition)}"`);
          }
        }
        if (props.fullWidth) parts.push("fullWidth");
        if (!showText) parts.push(`aria-label="Button"`);
        const attrs = parts.join(" ");
        return showText ? `<Button ${attrs}>Button</Button>` : `<Button ${attrs} />`;
      }}
    />
  );
}
