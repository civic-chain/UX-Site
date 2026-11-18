import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type StepBadgeVariant = "rounded" | "square";
type StepBadgeTone = "inherit" | "neutral" | "gold" | "sky" | "sage" | "ghost" | "ink";
type StepBadgeSize = "md" | "lg" | "xl";

const variantClasses: Record<StepBadgeVariant, string> = {
  rounded: "rounded-2xl",
  square: "rounded-xl",
};

const sizeClasses: Record<StepBadgeSize, string> = {
  md: "size-9",
  lg: "size-12",
  xl: "size-14 body",
};

// `inherit` follows the surrounding surface (the card ink) so a step number
// recolors with its SurfaceCard tone; the named tones are explicit overrides.
const toneClasses: Record<StepBadgeTone, string> = {
  inherit:
    "border-current/30 bg-current/10 text-current",
  neutral:
    "border-border bg-cream-100 text-foreground",
  gold:
    "border-gold-800/45 bg-cream-50 text-gold-600",
  sky:
    "border-blue-900/45 bg-blue-100 text-blue-900",
  sage:
    "border-green-900/45 bg-green-100 text-green-600",
  ghost:
    "border-transparent bg-transparent text-foreground",
  ink: "border-blue-900/20 bg-cream-50 text-blue-900",
};

type StepBadgeProps = {
  children: ReactNode;
  variant?: StepBadgeVariant;
  tone?: StepBadgeTone;
  size?: StepBadgeSize;
  className?: string;
};

export function StepBadge({
  children,
  variant = "rounded",
  tone = "inherit",
  size = "md",
  className,
}: StepBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center border captions",
        variantClasses[variant],
        sizeClasses[size],
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
