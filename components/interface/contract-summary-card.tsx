import type { ContractSnapshot } from "@/lib/interface-types";
import { Progress } from "@/components/ui/progress";

import { StatusBadge } from "./status-badge";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function ContractSummaryCard({
  contract,
  variant = "default",
}: {
  contract: ContractSnapshot;
  variant?: "default" | "public-ledger";
}) {
  const isPublicLedger = variant === "public-ledger";
  const spent = contract.cardPoolAllocated - contract.cardPoolBalance;
  const spentPct = contract.cardPoolAllocated > 0
    ? Math.round((spent / contract.cardPoolAllocated) * 100)
    : 0;
  const summaryMetrics = [
    { label: "Contract Total", value: formatCurrency(contract.total) },
    { label: "Card Pool Balance", value: formatCurrency(contract.cardPoolBalance) },
    ...(isPublicLedger
      ? [
        {
          label: "Reserve Hold",
          value: contract.reserve != null ? formatCurrency(contract.reserve) : "—",
        },
      ]
      : [
        {
          label: "Residual",
          value: contract.residual != null ? formatCurrency(contract.residual) : "—",
        },
        {
          label: "Reserve Hold",
          value: contract.reserve != null ? formatCurrency(contract.reserve) : "—",
        },
      ]),
  ];

  return (
    <article className={isPublicLedger ? "workspace-panel grid gap-4 p-5" : "workspace-panel grid gap-5 p-5 sm:p-6"}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="grid gap-1.5">
          <p className="type-label text-[color:var(--muted-foreground)]">{contract.crn}</p>
          <h3 className="type-title text-[color:var(--foreground)]">{contract.title}</h3>
          {contract.vendor ? (
            <p className="type-body-sm text-[color:var(--muted-foreground)]">{contract.vendor}</p>
          ) : null}
        </div>
        <StatusBadge tone={contract.statusTone}>{contract.status}</StatusBadge>
      </div>

      <div className={isPublicLedger ? "grid gap-3 sm:grid-cols-3" : "grid gap-3 sm:grid-cols-2 xl:grid-cols-4"}>
        {summaryMetrics.map((metric) => (
          <div
            key={metric.label}
            className={isPublicLedger
              ? "grid gap-1 border-t border-[color:var(--workspace-border)] pt-3 first:border-t-0 first:pt-0 sm:border-t-0 sm:pt-0"
              : "radius-workspace-control grid gap-1.5 bg-[color:var(--workspace-surface-strong)] p-4"}
          >
            <p className="type-caption text-[color:var(--muted-foreground)]">{metric.label}</p>
            <p className="type-title text-[color:var(--foreground)]">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className={isPublicLedger
        ? "grid gap-2 border-t border-[color:var(--workspace-border)] pt-4"
        : "radius-workspace-control grid gap-2 border border-[color:var(--workspace-border)] bg-[color:var(--workspace-surface)] p-4"}>
        <div className="flex items-center justify-between gap-3">
          <p className="type-caption text-[color:var(--muted-foreground)]">Card Pool Usage</p>
          <p className="type-caption text-[color:var(--foreground)]">{spentPct}% spent</p>
        </div>
        <Progress
          value={Math.min(spentPct, 100)}
          className="bg-[color:var(--workspace-separator-bg)]"
          indicatorClassName="bg-[color:var(--accent)]"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="type-body-sm text-[color:var(--muted-foreground)]">
            {formatCurrency(spent)} used of {formatCurrency(contract.cardPoolAllocated)} allocated
          </p>
          {contract.lastTransaction ? (
            <p className="type-caption text-[color:var(--muted-foreground)]">{contract.lastTransaction}</p>
          ) : null}
        </div>
      </div>

      {contract.sarHash || contract.burnRate ? (
        <div className={isPublicLedger ? "flex flex-wrap gap-2" : "flex flex-wrap gap-3"}>
          {contract.sarHash ? (
            <StatusBadge tone="info">SAR {contract.sarHash}</StatusBadge>
          ) : null}
          {contract.burnRate ? (
            <StatusBadge tone={contract.statusTone === "warning" ? "warning" : "success"}>
              {contract.burnRate}
            </StatusBadge>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
