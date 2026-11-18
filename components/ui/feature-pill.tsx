import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type FeaturePillTone = "neutral" | "gold" | "dusty" | "sage";
type FeaturePillVariant = "filled" | "flat";

const filledToneClasses: Record<FeaturePillTone, string> = {
  neutral:
    "border-[color:var(--border)] bg-[color:var(--paper-neutral)] text-[color:var(--muted-foreground)]",
  gold:
    "border-[color:var(--edge-gold-whisper)] bg-[color:var(--paper-gold)] text-[color:var(--tone-gold-foreground)]",
  dusty:
    "border-[color:var(--edge-dusty-whisper)] bg-[color:var(--paper-dusty)] text-[color:var(--tone-dusty-foreground)]",
  sage:
    "border-[color:var(--edge-sage-whisper)] bg-[color:var(--paper-sage)] text-[color:var(--tone-sage-foreground)]",
};

const flatToneIconColor: Record<FeaturePillTone, string> = {
  neutral: "text-[color:var(--muted-foreground)]",
  gold: "text-[color:var(--deep-gold-medium)]",
  dusty: "text-[color:var(--accent)]",
  sage: "text-[color:var(--deep-sage-strong)]",
};

type FeaturePillProps = {
  children: ReactNode;
  icon?: ReactNode;
  tone?: FeaturePillTone;
  variant?: FeaturePillVariant;
  className?: string;
};

export function FeaturePill({
  children,
  icon,
  tone = "neutral",
  variant = "filled",
  className,
}: FeaturePillProps) {
  if (variant === "flat") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-inline-tight type-label-compact text-current/80",
          className,
        )}
      >
        {icon ? (
          <span
            aria-hidden="true"
            className={cn(
              "inline-flex shrink-0 [&_svg]:size-4",
              flatToneIconColor[tone],
            )}
          >
            {icon}
          </span>
        ) : null}
        <span className="leading-tight">{children}</span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-inline-tight radius-full border pad-pill-sm type-label",
        filledToneClasses[tone],
        className,
      )}
    >
      {icon ? (
        <span aria-hidden="true" className="inline-flex shrink-0 [&_svg]:size-3">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </span>
  );
}
