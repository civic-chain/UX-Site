import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { Icon, type IconName, type IconSize } from "@/components/ui/icon";
import type { SurfaceTone } from "@/lib/design-system-types";
import { cn } from "@/lib/utils";

// The one button. Every look is a prop — variant, size, tone, icon, fullWidth —
// never a one-off class at the call site. Radius lives per variant and never
// exceeds rounded-2xl; underline is square with a bottom accent. Horizontal
// padding and text size ride with `size`. A new look is a new variant here, not
// styling a button somewhere else.
const buttonVariants = cva(
  "group/button inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium outline-none transition-all duration-[var(--dur-fast)] ease-[var(--ease-soft)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 [&_svg]:pointer-events-none [&_svg]:size-4 shrink-0",
  {
    variants: {
      variant: {
        filled:
          "rounded-2xl btn-filled shadow-md hover:shadow-lg active:shadow-md hover:-translate-y-0.5 hover:scale-[1.01] active:translate-y-0 active:scale-[0.985]",
        soft:
          "rounded-2xl btn-soft shadow-sm hover:-translate-y-px hover:shadow-sm active:translate-y-0 active:scale-[0.985]",
        outline:
          "rounded-2xl border btn-outline hover:-translate-y-px hover:shadow-sm active:translate-y-0 active:scale-[0.985] active:shadow-none",
        ghost: "rounded-2xl btn-ghost active:scale-[0.985]",
        // Text button with a bottom accent. Standalone ("Read more") and the
        // trigger of underline tabs. The `active` prop toggles the accent so the
        // geometry never shifts between states.
        underline: "rounded-none border-b-2 btn-quiet",
      },
      size: {
        sm: "h-9 px-4 captions",
        md: "h-11 px-5 body-sm",
        lg: "h-12 px-6 body",
        // Giant CTA — one rung above lg for hero moments.
        xl: "h-14 px-8 body-lg",
        "2xl": "h-16 px-10 body-xl",
      },
      fullWidth: {
        true: "w-full",
      },
      // Pressed/selected state — used by Tabs for the underline variant; the
      // look per variant is defined in compoundVariants below.
      active: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Underline stays a tight text accent at every size (padding from `size`
      // would make it read like a filled button).
      { variant: "underline", class: "px-2" },
      {
        variant: "underline",
        active: false,
        class: "btn-quiet-dim",
      },
    ],
    defaultVariants: {
      variant: "filled",
      size: "md",
    },
  },
);

// Color is the surface contract, not a per-variant tone map. Every variant
// reads --ctl-* through its .btn-* class (patterns.css): filled paints the
// surface's filled pair; soft/outline use the saturated accent on a light fill;
// ghost/underline ride --ctl-ink directly on the surface. The surrounding
// SurfaceCard publishes the contract; an explicit `tone` republishes it locally
// (ctl-tone-* below).

// Glyph size rides with the button size so stroke weight stays balanced.
const iconGlyphSize: Record<NonNullable<VariantProps<typeof buttonVariants>["size"]>, IconSize> = {
  sm: "xs",
  md: "sm",
  lg: "sm",
  xl: "md",
  "2xl": "lg",
};

function Button({
  className,
  variant,
  size,
  tone,
  fullWidth,
  active,
  icon,
  iconPosition = "trailing",
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    tone?: SurfaceTone;
    /** Leading/trailing glyph by name. Omit text children for an icon-only button. */
    icon?: IconName;
    iconPosition?: "leading" | "trailing";
}) {
  const Comp = asChild ? Slot : "button";

  // An explicit tone republishes the contract locally for any variant; without
  // it, the button inherits the surrounding surface's contract.
  const toneClass = tone ? `ctl-tone-${tone}` : undefined;

  // asChild hands rendering to the consumer's element (Slot needs one child),
  // so we never inject a glyph there.
  const hasChildren = React.Children.count(children) > 0;
  const glyphMotion =
    hasChildren && iconPosition === "trailing"
      ? "transition-all duration-[var(--dur-fast)] ease-[var(--ease-soft)] group-hover/button:translate-x-0.5 group-active/button:translate-x-0 motion-reduce:transition-none motion-reduce:group-hover/button:translate-x-0"
      : undefined;
  const glyph =
    !asChild && icon ? (
      <Icon name={icon} size={iconGlyphSize[size ?? "md"]} className={glyphMotion} />
    ) : null;
  const iconOnly = !asChild && Boolean(icon) && !hasChildren;

  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size, fullWidth, active }),
        toneClass,
        variant === "underline" &&
          (active === false ? "button-border-transparent" : "button-border-current"),
        // Icon-only collapses to a square; padding override wins via twMerge.
        iconOnly && "aspect-square px-0",
        className,
      )}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {iconPosition === "leading" ? glyph : null}
          {children}
          {iconPosition === "trailing" ? glyph : null}
        </>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
