import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

// The one label chip. Color is `tone`, structure is `variant` (a filled chip or
// a flat inline label), and `size` is the box — never a one-off class at the
// call site. Absorbs the old FeaturePill: a leading `icon` and the flat mode
// live here now.
export type BadgeTone =
  | "inherit"
  | "neutral"
  | "blue"
  | "sky"
  | "gold"
  | "sage"
  | "ink"
  | "invert";

const badgeVariants = cva(
  "inline-flex items-center gap-2 captions",
  {
    variants: {
      variant: {
        filled: "rounded-2xl border",
        flat: "",
      },
      size: {
        sm: "px-2 py-1",
        md: "px-3 py-1",
        lg: "px-4 py-2",
      },
    },
    compoundVariants: [
      // Flat is a bare inline label — no chrome, no padding box.
      { variant: "flat", class: "px-0 py-0" },
    ],
    defaultVariants: {
      variant: "filled",
      size: "md",
    },
  },
);

// Filled: tonal chip (border + fill + text). Flat: in-family text only.
const filledTone: Record<BadgeTone, string> = {
  inherit: "border-current/25 bg-current/10 text-current",
  neutral: "border-border bg-cream-200 text-slate-500",
  blue: "border-blue-300 bg-blue-200 text-blue-900",
  sky: "border-blue-700/12 bg-blue-100 text-blue-700",
  gold: "border-gold-800/45 bg-cream-50 text-gold-600",
  sage: "border-green-900/12 bg-green-100 text-green-900",
  ink: "border-blue-900/15 bg-cream-50 text-blue-900",
  invert: "border-transparent bg-foreground text-background",
};

// Flat tints only the leading glyph; the label inherits the surrounding text.
const flatIconTone: Record<BadgeTone, string> = {
  inherit: "text-current",
  neutral: "text-slate-500",
  blue: "text-blue-900",
  sky: "text-blue-900",
  gold: "text-gold-600",
  sage: "text-green-600",
  ink: "text-blue-700",
  invert: "text-foreground",
};

function Badge({
  className,
  variant,
  size,
  tone = "inherit",
  icon,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    tone?: BadgeTone;
    /** Optional leading glyph by name. */
    icon?: IconName;
  }) {
  const isFlat = variant === "flat";

  return (
    <span
      className={cn(
        badgeVariants({ variant, size }),
        // Filled paints the whole chip; flat keeps the label in the inherited
        // text color and tints only the glyph.
        isFlat ? "text-current/80" : filledTone[tone],
        className,
      )}
      {...props}
    >
      {icon ? (
        <span aria-hidden className={cn("inline-flex shrink-0", isFlat && flatIconTone[tone])}>
          <Icon name={icon} size="xs" />
        </span>
      ) : null}
      {children}
    </span>
  );
}

export { Badge };
