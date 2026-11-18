import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "type-workspace-badge inline-flex min-h-8 items-center gap-2 rounded-full border px-3 py-1.5",
  {
    variants: {
      tone: {
        neutral:
          "border-[color:var(--workspace-border)] bg-[color:var(--workspace-muted)] text-[color:var(--foreground)]",
        info:
          "border-[color:var(--workspace-info-edge)] bg-[color:var(--workspace-info-bg)] text-[color:var(--workspace-info)]",
        success:
          "border-[color:var(--workspace-success-edge)] bg-[color:var(--workspace-success-bg)] text-[color:var(--workspace-success)]",
        warning:
          "border-[color:var(--workspace-warning-edge)] bg-[color:var(--workspace-warning-bg)] text-[color:var(--workspace-warning)]",
        danger:
          "border-[color:var(--workspace-danger-edge)] bg-[color:var(--workspace-danger-bg)] text-[color:var(--workspace-danger)]",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

type StatusBadgeProps = VariantProps<typeof statusBadgeVariants> & {
  className?: string;
  children: ReactNode;
};

export function StatusBadge({
  className,
  tone,
  children,
}: StatusBadgeProps) {
  return <span className={cn(statusBadgeVariants({ tone }), className)}>{children}</span>;
}
