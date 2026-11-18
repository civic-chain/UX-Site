"use client";

import { useId, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import type { IconName } from "@/components/ui/icon";
import type { SurfaceTone } from "@/lib/design-system-types";
import { cn } from "@/lib/utils";

export type TabItem = {
  id: string;
  label: ReactNode;
  content: ReactNode;
  /** Optional leading glyph by name; decorative, so the tab name stays the label. */
  icon?: IconName;
};

export type TabsVariant = "filled" | "underline" | "segmented" | "card";
export type TabsSize = "sm" | "md" | "lg" | "xl" | "2xl";

type ButtonVariant = "filled" | "ghost" | "outline" | "underline";

// The one tab set. Each trigger is a Button; the variant maps selected and
// unselected triggers to a fixed Button variant, `size` rides through to the
// trigger Button size, and `tone` recolors the selected trigger — so no tab is
// ever styled at the call site. Behavior (roving focus, arrow keys, aria wiring)
// lives here; there is no GSAP and no call-site className for the triggers.
const tabsVariants: Record<
  TabsVariant,
  { list: string; triggerVariant: (selected: boolean) => ButtonVariant }
> = {
  filled: {
    list: "flex flex-wrap gap-2",
    triggerVariant: (selected) => (selected ? "filled" : "ghost"),
  },
  underline: {
    list: "flex flex-wrap gap-1",
    triggerVariant: () => "underline",
  },
  segmented: {
    // The rail is its own cream surface, so it publishes the cream contract:
    // unselected ghost triggers stay dark on the rail even inside a dark
    // SurfaceCard (where the ambient --ctl-ink flips light).
    list: "inline-flex flex-wrap gap-1 rounded-2xl border border-border bg-cream-50 ctl-tone-cream p-1",
    triggerVariant: (selected) => (selected ? "filled" : "ghost"),
  },
  card: {
    list: "flex flex-wrap gap-3",
    triggerVariant: (selected) => (selected ? "outline" : "ghost"),
  },
};

type TabsProps = {
  items: TabItem[];
  variant?: TabsVariant;
  size?: TabsSize;
  /** Recolors the selected trigger into an in-family tone. */
  tone?: SurfaceTone;
  /** Controlled active id (optional). */
  activeId?: string;
  defaultId?: string;
  onChange?: (id: string) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
  "aria-label"?: string;
};

export function Tabs({
  items,
  variant = "filled",
  size = "md",
  tone,
  activeId,
  defaultId,
  onChange,
  orientation = "horizontal",
  className,
  "aria-label": ariaLabel,
}: TabsProps) {
  const baseId = useId();
  const [internalActive, setInternalActive] = useState(
    defaultId ?? items[0]?.id ?? "",
  );
  const active = activeId ?? internalActive;
  const activeItem = items.find((item) => item.id === active) ?? items[0];
  const config = tabsVariants[variant];

  const tabId = (id: string) => `${baseId}-tab-${id}`;
  const panelId = (id: string) => `${baseId}-panel-${id}`;

  function select(id: string) {
    if (activeId == null) setInternalActive(id);
    onChange?.(id);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, focusedId: string) {
    const nextKeys = ["ArrowRight", "ArrowDown"];
    const prevKeys = ["ArrowLeft", "ArrowUp"];
    if (![...nextKeys, ...prevKeys, "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const index = items.findIndex((item) => item.id === focusedId);
    let next = index;
    if (nextKeys.includes(event.key)) next = (index + 1) % items.length;
    if (prevKeys.includes(event.key)) next = (index - 1 + items.length) % items.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = items.length - 1;
    const nextId = items[next]?.id;
    if (nextId) {
      select(nextId);
      document.getElementById(tabId(nextId))?.focus();
    }
  }

  return (
    <div
      className={cn(
        orientation === "vertical" && "sm:grid sm:grid-cols-[8rem_1fr] sm:items-start sm:gap-5",
        className,
      )}
    >
      <div
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation={orientation}
        className={cn(config.list, orientation === "vertical" && "sm:flex-col")}
      >
        {items.map((item) => {
          const selected = item.id === active;
          return (
            <Button
              key={item.id}
              id={tabId(item.id)}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId(item.id)}
              tabIndex={selected ? 0 : -1}
              variant={config.triggerVariant(selected)}
              size={size}
              active={variant === "underline" ? selected : undefined}
              tone={selected ? tone : undefined}
              icon={item.icon}
              iconPosition="leading"
              onKeyDown={(event) => onKeyDown(event, item.id)}
              onClick={() => select(item.id)}
            >
              {item.label}
            </Button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={panelId(activeItem?.id ?? "none")}
        aria-labelledby={tabId(activeItem?.id ?? "none")}
        className="mt-4 body-sm text-current/70"
      >
        {activeItem?.content}
      </div>
    </div>
  );
}
