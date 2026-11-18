import type { InterfaceMetric } from "@/lib/interface-types";
import { cn } from "@/lib/utils";

export function StatCard({
  className,
  metric,
}: {
  className?: string;
  metric: InterfaceMetric;
}) {
  return (
    <div
      className={cn(
        "workspace-panel p-4",
        className,
      )}
    >
      <p className="type-caption text-[color:var(--muted-foreground)] mb-2">{metric.label}</p>
      <p className="type-title text-[color:var(--foreground)] tabular-nums">{metric.value ?? "—"}</p>
      {metric.detail ? (
        <p className="type-caption text-[color:var(--muted-foreground)] mt-0.5">{metric.detail}</p>
      ) : null}
    </div>
  );
}
