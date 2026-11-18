import type { SurfaceTone } from "@/lib/design-system-types";
import { cn } from "@/lib/utils";

import { Icon, type IconName, type IconSize, type IconWeight } from "./icon";

// One icon component, two modes. `plain` is the bare glyph; `tile` wraps it in
// a tonal plaque. Tone is the colored dimension; size drives both the box and
// the glyph, so stroke rides with size automatically. Pass weight to override
// stroke for quiet/loud contexts (civic-design: quiet = thin line, loud impact
// = heavier).
type IconChipTone = SurfaceTone | "neutral" | "gold-soft" | "inherit";
type IconChipVariant = "plain" | "tile";
type IconChipSize = "sm" | "md" | "lg";

const boxSize: Record<IconChipSize, string> = {
  sm: "size-8",
  md: "size-11",
  lg: "size-16",
};

const glyphSize: Record<IconChipSize, IconSize> = {
  sm: "xs",
  md: "sm",
  lg: "lg",
};

const toneSurface: Record<IconChipTone, string> = {
  inherit: "border-current/25 bg-current/10",
  cream: "border-gold-800/40 bg-cream-100",
  sky: "border-blue-900/45 bg-blue-200",
  gold: "border-gold-800/45 bg-gold-300",
  "gold-soft": "border-gold-800/20 bg-gold-100",
  sage: "border-green-900/45 bg-green-200",
  slate: "border-cream-50/45 bg-slate-400",
  ink: "border-blue-900/20 bg-cream-50",
  neutral: "border-border bg-cream-100",
};

const toneText: Record<IconChipTone, string> = {
  inherit: "text-current",
  cream: "text-gold-800",
  sky: "text-blue-900",
  gold: "text-gold-800",
  "gold-soft": "text-gold-800",
  sage: "text-green-900",
  slate: "text-cream-50",
  ink: "text-blue-700",
  neutral: "text-foreground",
};

type IconChipProps = {
  name: IconName;
  tone?: IconChipTone;
  variant?: IconChipVariant;
  size?: IconChipSize;
  weight?: IconWeight;
  label?: string;
  className?: string;
};

export function IconChip({
  name,
  tone = "inherit",
  variant = "tile",
  size = "md",
  weight,
  label,
  className,
}: IconChipProps) {
  if (variant === "plain") {
    return (
      <Icon
        name={name}
        size={glyphSize[size]}
        weight={weight}
        label={label}
        className={cn(toneText[tone], className)}
      />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        boxSize[size],
        "rounded-2xl border",
        toneSurface[tone],
        toneText[tone],
        className,
      )}
    >
      <Icon name={name} size={glyphSize[size]} weight={weight} label={label} />
    </span>
  );
}
