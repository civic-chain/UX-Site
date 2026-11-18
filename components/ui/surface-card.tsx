import type { ComponentProps } from "react";

import { Card } from "@/components/ui/card";
import type {
  SurfaceDensity,
  SurfaceMaterial,
  SurfaceTone,
} from "@/lib/design-system-types";
import { cn } from "@/lib/utils";

// No shadow — depth comes from a hairline border one ramp step darker than the
// surface's own fill (cream uses a visible warm step; its literal +1 is invisible).
const surfaceToneClasses = {
  cream: "border border-cream-300 bg-cream-50 text-blue-900",
  sky: "border border-blue-300 bg-blue-200 text-blue-700",
  gold: "border border-gold-500 bg-gold-300 text-gold-800",
  slate: "border border-slate-700 bg-slate-500 text-cream-50",
  sage: "border border-green-500 bg-green-300 text-green-900",
  ink: "border border-blue-900 bg-blue-700 text-cream-50",
} as const;

const surfaceMaterialClasses: Record<SurfaceMaterial, string> = {
  "old-paper": "surface-material surface-material-old-paper",
  banknote: "surface-material surface-material-banknote",
  blueprint: "surface-material surface-material-blueprint",
  notebook: "surface-material surface-material-notebook",
};

const surfaceDensityClasses: Record<SurfaceDensity, string> = {
  none: "",
  standard: "p-5 lg:p-6",
  roomy: "p-7 lg:p-10",
};

type SurfaceCardProps = ComponentProps<typeof Card> & {
  tone?: SurfaceTone;
  material?: SurfaceMaterial;
  density?: SurfaceDensity;
  interactive?: boolean;
};

export function SurfaceCard({
  tone = "cream",
  material,
  density = "none",
  interactive = false,
  className,
  ...props
}: SurfaceCardProps) {
  return (
    <Card
      className={cn(
        "surface-card",
        interactive &&
          "cursor-pointer transition-transform duration-[400ms] ease-out hover:-translate-y-1 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        surfaceToneClasses[tone],
        // Publish the control color contract so nested filled controls inherit
        // this surface's tone unless they override it.
        `ctl-tone-${tone}`,
        material && surfaceMaterialClasses[material],
        surfaceDensityClasses[density],
        className,
      )}
      {...props}
    />
  );
}
