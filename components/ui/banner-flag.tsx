import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const bannerFlagVariants = cva(
  "flex items-start gap-3 border-l-4 px-4 py-3 [&>[data-banner-icon]]:mt-px [&>[data-banner-icon]]:shrink-0",
  {
    variants: {
      variant: {
        neutral: [
          "border-l-[color:var(--control-border-strong)] bg-[color:var(--control-surface)]",
          "[&>[data-banner-icon]]:text-[color:var(--muted-foreground)]",
        ],
        info: [
          "border-l-[color:var(--workspace-info)] bg-[color:var(--workspace-info-bg)]",
          "[&>[data-banner-icon]]:text-[color:var(--workspace-info)]",
        ],
        success: [
          "border-l-[color:var(--workspace-success)] bg-[color:var(--workspace-success-bg)]",
          "[&>[data-banner-icon]]:text-[color:var(--workspace-success)]",
        ],
        warning: [
          "border-l-[color:var(--workspace-warning)] bg-[color:var(--workspace-warning-bg)]",
          "[&>[data-banner-icon]]:text-[color:var(--workspace-warning)]",
        ],
        danger: [
          "border-l-[color:var(--workspace-danger)] bg-[color:var(--workspace-danger-bg)]",
          "[&>[data-banner-icon]]:text-[color:var(--workspace-danger)]",
        ],
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

interface BannerFlagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerFlagVariants> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

function BannerFlag({
  className,
  variant,
  icon,
  title,
  description,
  action,
  ...props
}: BannerFlagProps) {
  return (
    <div
      role="status"
      className={cn(bannerFlagVariants({ variant }), className)}
      {...props}
    >
      {icon && <span data-banner-icon="">{icon}</span>}
      <div className="min-w-0 flex-1">
        <p className="type-body-sm font-semibold leading-snug text-[color:var(--foreground)]">
          {title}
        </p>
        {description && (
          <p className="type-caption mt-0.5 text-[color:var(--muted-foreground)]">
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-0.5 shrink-0">{action}</div>}
    </div>
  );
}

export { BannerFlag };
