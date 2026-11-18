"use client";

import type { ComponentProps } from "react";

import { Tabs } from "@/components/ui/tabs";
import type { TabItem } from "@/components/ui/tabs";

import { PropPlayground } from "./prop-playground";
import type { PlaygroundControl } from "./prop-playground";

type TabsVariant = ComponentProps<typeof Tabs>["variant"];
type TabsSize = ComponentProps<typeof Tabs>["size"];
type TabsTone = ComponentProps<typeof Tabs>["tone"];
type TabsOrientation = NonNullable<ComponentProps<typeof Tabs>["orientation"]>;
type TabsIconMode = "off" | "on";
type TabsPlaygroundProps = {
  variant: NonNullable<TabsVariant>;
  size: NonNullable<TabsSize>;
  tone: TabsTone;
  orientation: TabsOrientation;
  icons: TabsIconMode;
};

// Each item can carry an `icon` name; the `icons` control toggles whether the
// preview passes them, so the same item list shows both shapes.
const ITEMS: TabItem[] = [
  { id: "record", label: "Record", icon: "record", content: "Shared data source; use when all parties need the same state." },
  { id: "proof", label: "Proof", icon: "trust", content: "Verification layer; use when evidence must travel with the entry." },
  { id: "spend", label: "Spend", icon: "payment", content: "Payment view; use when amount, status, and source need one line." },
];

const CONTROLS = [
  {
    prop: "variant",
    options: [
      { label: "filled", value: "filled" },
      { label: "underline", value: "underline" },
      { label: "segmented", value: "segmented" },
      { label: "card", value: "card" },
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
    prop: "orientation",
    options: [
      { label: "horizontal", value: "horizontal" },
      { label: "vertical", value: "vertical" },
    ],
  },
  {
    prop: "icons",
    options: [
      { label: "off", value: "off" },
      { label: "on", value: "on" },
    ],
  },
] satisfies readonly PlaygroundControl<TabsPlaygroundProps>[];

const INITIAL: TabsPlaygroundProps = {
  variant: "filled",
  size: "md",
  tone: undefined,
  orientation: "horizontal",
  icons: "off",
};

export function TabsPlayground() {
  return (
    <PropPlayground
      controls={CONTROLS}
      initial={INITIAL}
      preview={(props) => {
        const withIcons = props.icons === "on";
        const items = withIcons
          ? ITEMS
          : ITEMS.map((item) => ({
              id: item.id,
              label: item.label,
              content: item.content,
            }));
        return (
          <div className="w-full">
            <Tabs
              aria-label="Tabs preview"
              variant={props.variant}
              size={props.size}
              tone={props.tone}
              orientation={props.orientation}
              items={items}
            />
          </div>
        );
      }}
      code={(props) => {
        const parts = [
          `variant="${String(props.variant)}"`,
          `size="${String(props.size)}"`,
        ];
        if (props.tone) parts.push(`tone="${String(props.tone)}"`);
        if (props.orientation !== "horizontal") {
          parts.push(`orientation="${String(props.orientation)}"`);
        }
        const itemsVar = props.icons === "on" ? "itemsWithIcons" : "items";
        return `<Tabs ${parts.join(" ")} items={${itemsVar}} />`;
      }}
    />
  );
}
