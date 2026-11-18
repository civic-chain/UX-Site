import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type DetailGridItem = {
  id: string;
  label: ReactNode;
  value: ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
};

export function DetailCard({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "radius-workspace-card grid gap-3 border border-[color:var(--workspace-border)] bg-[color:var(--workspace-panel)] p-4",
        className,
      )}
      {...props}
    />
  );
}

export function DetailGrid({
  className,
  columnsClassName = "sm:grid-cols-2",
  itemClassName,
  items,
}: {
  className?: string;
  columnsClassName?: string;
  itemClassName?: string;
  items: readonly DetailGridItem[];
}) {
  return (
    <div className={cn("grid gap-3", columnsClassName, className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "radius-workspace-control grid gap-1 bg-[color:var(--workspace-surface)] p-4",
            itemClassName,
            item.className,
          )}
        >
          <p className={cn("type-caption text-[color:var(--muted-foreground)]", item.labelClassName)}>
            {item.label}
          </p>
          <div className={cn("type-body-sm text-[color:var(--foreground)]", item.valueClassName)}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}
