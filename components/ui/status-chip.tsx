import { cn } from "@/lib/utils";

type StatusChipStatus = "anchored" | "redacted" | "pending" | "active" | "expiring";

const STATUS_CLASS: Record<StatusChipStatus, string> = {
  anchored: "border-[color:var(--workspace-success-edge)] bg-[color:var(--workspace-success-bg)] text-[color:var(--workspace-success)]",
  active:   "border-[color:var(--workspace-success-edge)] bg-[color:var(--workspace-success-bg)] text-[color:var(--workspace-success)]",
  redacted: "border-[color:var(--workspace-warning-edge)] bg-[color:var(--workspace-warning-bg)] text-[color:var(--workspace-warning)]",
  expiring: "border-[color:var(--workspace-warning-edge)] bg-[color:var(--workspace-warning-bg)] text-[color:var(--workspace-warning)]",
  pending:  "border-[color:var(--workspace-border)] bg-[color:var(--workspace-surface)] text-[color:var(--muted-foreground)]",
};

const STATUS_LABEL: Record<StatusChipStatus, string> = {
  anchored: "Anchored",
  active:   "Active",
  redacted: "Redacted",
  expiring: "Expiring",
  pending:  "Pending",
};

export function StatusChip({
  status,
  className,
}: {
  status: StatusChipStatus;
  className?: string;
}) {
  return (
    <span className={cn("type-caption rounded border px-2 py-0.5", STATUS_CLASS[status], className)}>
      {STATUS_LABEL[status]}
    </span>
  );
}
