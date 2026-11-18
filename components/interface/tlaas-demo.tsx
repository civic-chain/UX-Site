"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

import { PasswordGate } from "./demo-auth-shell";
import { InterfaceIcon, InterfaceMark } from "./interface-icons";

// ── Types ─────────────────────────────────────────────────────────────────────

type OrgId = "government" | "healthcare" | "enterprise";

interface Category {
  name: string;
  budget: number;
  spent: number;
}

interface Transaction {
  id: string;
  counterparty: string;
  amount: number;
  category: string;
  method: string;
  batch: string;
  date: string;
  hasRedaction: boolean;
  hash: string;
}

interface OrgConfig {
  id: OrgId;
  name: string;
  subtitle: string;
  repayVertical: string;
  complianceOverlay: string;
  color: string;
  visibilityMode: "public" | "permissioned" | "private";
  budget: number;
  chainLength: number;
  lastAnchorLabel: string;
  ledgerTxHash: string;
  categoryLabel: string;
  vendorLabel: string;
  batchLabel: string;
  monthlySpend: number[];
  categories: Category[];
  transactions: Transaction[];
  description: string;
}

// ── Org data ──────────────────────────────────────────────────────────────────

const ORGS: OrgConfig[] = [
  {
    id: "government",
    name: "Gray, Maine",
    subtitle: "Town of Gray · Municipal Government",
    repayVertical: "REPAY Government Vertical",
    complianceOverlay: "FOIA / State Open Records",
    color: "var(--workspace-info)",
    visibilityMode: "public",
    budget: 2_400_000,
    chainLength: 1842,
    lastAnchorLabel: "4 hours ago",
    ledgerTxHash: "a3f72e91b1c4d8e5f9a3f72e9",
    categoryLabel: "Department",
    vendorLabel: "Vendor",
    batchLabel: "Warrant",
    description: "Public spending dashboard. All transactions are public record under Maine's FOIA. Citizens, journalists, and auditors can verify every dollar.",
    monthlySpend: [180_000, 380_000, 610_000, 980_000, 1_280_000],
    categories: [
      { name: "Public Works", budget: 800_000, spent: 520_000 },
      { name: "Administration", budget: 400_000, spent: 285_000 },
      { name: "Information Technology", budget: 250_000, spent: 198_000 },
      { name: "Parks & Recreation", budget: 300_000, spent: 187_000 },
      { name: "Public Safety", budget: 650_000, spent: 90_000 },
    ],
    transactions: [
      { id: "g5", counterparty: "Tyler Technologies", amount: 18_000, category: "Information Technology", method: "ACH", batch: "W-2026-032", date: "May 8", hasRedaction: false, hash: "a3f72e91b1c4d8e5" },
      { id: "g4", counterparty: "Green Valley Tree Service", amount: 6_750, category: "Parks & Recreation", method: "ACH", batch: "W-2026-032", date: "May 7", hasRedaction: false, hash: "b2e81d90c3f5a7e4" },
      { id: "g2", counterparty: "Northeast Office Supply", amount: 3_840, category: "Administration", method: "Virtual Card", batch: "W-2026-031", date: "May 5", hasRedaction: false, hash: "c1d79e82b4f6c9d3" },
      { id: "g1", counterparty: "Granite State Paving Co.", amount: 48_200, category: "Public Works", method: "ACH", batch: "W-2026-031", date: "May 3", hasRedaction: false, hash: "d0e68f71c5e7b8c2" },
      { id: "g3", counterparty: "EMPLOYEE REIMBURSEMENT", amount: 127, category: "Administration", method: "Check", batch: "W-2026-031", date: "May 1", hasRedaction: true, hash: "e9f57a60d6d8a7b1" },
    ],
  },
  {
    id: "healthcare",
    name: "St. Mary's Health System",
    subtitle: "Regional Health Network · AP Audit Dashboard",
    repayVertical: "REPAY Healthcare Vertical",
    complianceOverlay: "HIPAA / No PHI Ingest",
    color: "var(--workspace-success)",
    visibilityMode: "permissioned",
    budget: 8_500_000,
    chainLength: 487,
    lastAnchorLabel: "1 hour ago",
    ledgerTxHash: "f8e47b59c5e9a6c0d7f8e47b5",
    categoryLabel: "Cost Center",
    vendorLabel: "Provider / Supplier",
    batchLabel: "Payment Run",
    description: "Permissioned AP audit dashboard. Compliance teams and CMS auditors access payment records with JWT auth. PHI guard active. No patient data ever ingested.",
    monthlySpend: [520_000, 1_180_000, 1_840_000, 2_590_000, 3_260_000],
    categories: [
      { name: "Clinical Supplies", budget: 3_200_000, spent: 1_480_000 },
      { name: "Staffing", budget: 2_800_000, spent: 1_290_000 },
      { name: "Equipment Lease", budget: 1_500_000, spent: 412_000 },
      { name: "Administrative", budget: 1_000_000, spent: 78_000 },
    ],
    transactions: [
      { id: "h3", counterparty: "AMN Healthcare Staffing", amount: 89_200, category: "Staffing", method: "ACH", batch: "PAY-2026-0442", date: "May 9", hasRedaction: false, hash: "f8e47b59c5e9a6c0" },
      { id: "h4", counterparty: "EMPLOYEE REIMBURSEMENT", amount: 340, category: "Administrative", method: "Check", batch: "PAY-2026-0442", date: "May 8", hasRedaction: true, hash: "a7d36c48b4d8b5f9" },
      { id: "h1", counterparty: "Medline Industries", amount: 124_500, category: "Clinical Supplies", method: "ACH", batch: "PAY-2026-0441", date: "May 5", hasRedaction: false, hash: "b6c25d37a3c7a4e8" },
      { id: "h2", counterparty: "Siemens Healthineers", amount: 45_000, category: "Equipment Lease", method: "ACH", batch: "PAY-2026-0441", date: "May 3", hasRedaction: false, hash: "c5b14e26b2d6c3d7" },
    ],
  },
  {
    id: "enterprise",
    name: "Acme Corp",
    subtitle: "Enterprise AP Automation · Payment Ledger",
    repayVertical: "REPAY B2B / AP Vertical",
    complianceOverlay: "SOX / GLBA",
    color: "var(--workspace-warning)",
    visibilityMode: "private",
    budget: 12_000_000,
    chainLength: 923,
    lastAnchorLabel: "2 hours ago",
    ledgerTxHash: "d4a03f15e1b5d2e9c4a03f15e",
    categoryLabel: "GL Code",
    vendorLabel: "Supplier",
    batchLabel: "Payment Run",
    description: "Private AP ledger. Internal finance team and board audit access only via org API key. SOX-grade tamper evidence on every transaction. No third-party audit overhead.",
    monthlySpend: [820_000, 1_740_000, 2_950_000, 4_680_000, 6_140_000],
    categories: [
      { name: "Technology", budget: 3_800_000, spent: 2_100_000 },
      { name: "Professional Services", budget: 2_500_000, spent: 1_840_000 },
      { name: "Software Subscriptions", budget: 3_900_000, spent: 1_310_000 },
      { name: "Operations", budget: 1_800_000, spent: 890_000 },
    ],
    transactions: [
      { id: "e4", counterparty: "Salesforce Inc.", amount: 156_000, category: "Software Subscriptions", method: "ACH", batch: "AP-Q1-2026-019", date: "May 10", hasRedaction: false, hash: "d4a03f15e1b5d2e9" },
      { id: "e3", counterparty: "Grainger Industrial", amount: 12_700, category: "Operations", method: "Virtual Card", batch: "AP-Q1-2026-019", date: "May 8", hasRedaction: false, hash: "e3f92e04f0c4c1f8" },
      { id: "e2", counterparty: "Deloitte LLP", amount: 250_000, category: "Professional Services", method: "ACH", batch: "AP-Q1-2026-018", date: "May 5", hasRedaction: false, hash: "f2e81d93e9b3b0e7" },
      { id: "e1", counterparty: "AWS Cloud Services", amount: 38_400, category: "Technology", method: "Virtual Card", batch: "AP-Q1-2026-018", date: "May 2", hasRedaction: false, hash: "a1d70c82d8a2a9d6" },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtAmount(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function fmtShort(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}k`;
  return `$${n}`;
}

function pctOf(n: number, total: number): number {
  return Math.min(100, Math.round((n / total) * 100));
}

// ── Burndown chart (inline SVG, no library) ───────────────────────────────────

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CURRENT_MONTH_IDX = 4;

const COLOR_BG: Record<string, string> = {
  "var(--workspace-info)":    "bg-[color:var(--workspace-info)]",
  "var(--workspace-success)": "bg-[color:var(--workspace-success)]",
  "var(--workspace-warning)": "bg-[color:var(--workspace-warning)]",
};
const COLOR_TOKEN: Record<string, string> = {
  "var(--workspace-info)":    "border-[color:var(--workspace-info)] text-[color:var(--workspace-info)]",
  "var(--workspace-success)": "border-[color:var(--workspace-success)] text-[color:var(--workspace-success)]",
  "var(--workspace-warning)": "border-[color:var(--workspace-warning)] text-[color:var(--workspace-warning)]",
};

function BurndownChart({ monthlySpend, budget, color }: { monthlySpend: number[]; budget: number; color: string }) {
  const W = 560;
  const H = 190;
  const PAD = { top: 14, right: 52, bottom: 30, left: 58 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const xOf = (i: number) => PAD.left + (i / 11) * plotW;
  const yOf = (v: number) => PAD.top + plotH * (1 - Math.min(v, budget) / budget);

  const spendPts = monthlySpend.map((v, i) => `${xOf(i).toFixed(1)},${yOf(v).toFixed(1)}`);
  const spendPath = `M ${spendPts.join(" L ")}`;

  const areaPath = [
    spendPath,
    `L ${xOf(CURRENT_MONTH_IDX).toFixed(1)},${(PAD.top + plotH).toFixed(1)}`,
    `L ${xOf(0).toFixed(1)},${(PAD.top + plotH).toFixed(1)} Z`,
  ].join(" ");

  const lastSpend = monthlySpend[CURRENT_MONTH_IDX];
  const projectedDec = (lastSpend / (CURRENT_MONTH_IDX + 1)) * 12;
  const projPath = `M ${xOf(CURRENT_MONTH_IDX).toFixed(1)},${yOf(lastSpend).toFixed(1)} L ${xOf(11).toFixed(1)},${yOf(Math.min(projectedDec, budget)).toFixed(1)}`;

  const budgetY = yOf(budget);
  const yTicks = [0, 0.25, 0.5, 0.75, 1.0].map((f) => budget * f);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" height={184}>
      {yTicks.map((v) => (
        <line key={v}
          x1={PAD.left} y1={yOf(v)} x2={W - PAD.right} y2={yOf(v)}
          stroke="var(--workspace-border)" strokeWidth={1}
        />
      ))}

      <line
        x1={PAD.left} y1={budgetY} x2={W - PAD.right} y2={budgetY}
        stroke="var(--workspace-danger)" strokeWidth={1.5} strokeDasharray="5 4"
      />
      <text x={W - PAD.right + 4} y={budgetY + 4}
        fontSize={9} fill="var(--workspace-danger)" fontFamily="var(--font-sans)"
      >Budget</text>

      <path d={areaPath} fill={color} opacity={0.07} />

      <path d={projPath}
        fill="none" stroke={color} strokeWidth={1.5} strokeDasharray="4 3" opacity={0.35}
      />

      <path d={spendPath}
        fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
      />

      {monthlySpend.map((v, i) => (
        <circle key={i} cx={xOf(i)} cy={yOf(v)} r={i === CURRENT_MONTH_IDX ? 4.5 : 3.5}
          fill={color}
        />
      ))}

      <line
        x1={xOf(CURRENT_MONTH_IDX)} y1={PAD.top}
        x2={xOf(CURRENT_MONTH_IDX)} y2={PAD.top + plotH}
        stroke={color} strokeWidth={1} strokeDasharray="3 3" opacity={0.25}
      />

      {MONTHS.map((m, i) => (
        <text key={m} x={xOf(i)} y={H - 6}
          textAnchor="middle"
          fontSize={9} fill="var(--muted-foreground)" fontFamily="var(--font-sans)" opacity={i <= CURRENT_MONTH_IDX ? 1 : 0.38}
        >{m}</text>
      ))}

      {yTicks.filter((_, i) => i > 0).map((v) => (
        <text key={v} x={PAD.left - 5} y={yOf(v) + 3.5}
          textAnchor="end"
          fontSize={9} fill="var(--muted-foreground)" fontFamily="var(--font-sans)"
        >{fmtShort(v)}</text>
      ))}
    </svg>
  );
}

// ── Category budget bar ───────────────────────────────────────────────────────

function CategoryBar({ name, budget, spent, color }: { name: string; budget: number; spent: number; color: string }) {
  const pct = pctOf(spent, budget);
  const isWarning = pct >= 80;

  return (
    <div className="grid gap-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <p className="type-caption font-medium text-[color:var(--foreground)]">{name}</p>
        <div className="flex items-baseline gap-1.5 shrink-0">
          <p className="type-caption font-semibold text-[color:var(--foreground)]">{fmtShort(spent)}</p>
          <p className="type-caption text-[color:var(--muted-foreground)]">/ {fmtShort(budget)}</p>
          <p className={cn("type-caption font-medium", isWarning ? "text-[color:var(--workspace-warning)]" : "text-[color:var(--muted-foreground)]")}>
            {pct}%
          </p>
        </div>
      </div>
      <Progress
        value={pct}
        className="h-2 bg-[color:var(--workspace-muted)]"
        indicatorClassName={cn("transition-all duration-500", isWarning ? "bg-[color:var(--workspace-warning)]" : (COLOR_BG[color] ?? "bg-[color:var(--workspace-info)]"))}
      />
    </div>
  );
}

// ── Org picker ────────────────────────────────────────────────────────────────

function OrgPickerScreen({ onSelect }: { onSelect: (id: OrgId) => void }) {
  const visibilityLabel: Record<OrgConfig["visibilityMode"], string> = {
    public: "Public · no auth required",
    permissioned: "Permissioned · JWT auth",
    private: "Private · org API key",
  };

  return (
    <div data-workspace-root>
      <div className="workspace-shell">
        <div className="mx-auto grid w-full max-w-[1100px] gap-6 px-4 py-10 lg:px-6">
          <div className="flex items-center gap-3">
            <InterfaceMark />
            <div className="grid gap-0.5">
              <p className="type-title-sm text-[color:var(--foreground)]">TLaaS — Transparency Layer as a Service</p>
              <p className="type-caption text-[color:var(--muted-foreground)]">Powered by CivicChain · REPAY Partnership Demo</p>
            </div>
          </div>

          <div className="grid gap-2">
            <p className="type-body-sm font-semibold text-[color:var(--foreground)]">Select an organization to view their dashboard</p>
            <p className="type-caption text-[color:var(--muted-foreground)]">Each org reflects a different REPAY vertical and compliance requirement.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {ORGS.map((org) => {
              const ytdPct = pctOf(org.monthlySpend[CURRENT_MONTH_IDX], org.budget);
              return (
                <Button
                  key={org.id}
                  variant="ghost"
                  onClick={() => onSelect(org.id)}
                  className="radius-workspace-card group h-auto w-full flex-col items-stretch overflow-hidden border border-[color:var(--workspace-border)] bg-[color:var(--workspace-panel)] p-0 text-left transition-colors hover:border-[color:var(--workspace-info)] hover:bg-[color:var(--workspace-info-bg)]"
                >
                  <div className={cn("-mt-px h-[5px]", COLOR_BG[org.color] ?? "bg-[color:var(--workspace-info)]")} />
                  <div className="p-5">
                    <div className="grid gap-3">
                      <div>
                        <p className="type-body-sm font-semibold text-[color:var(--foreground)]">{org.name}</p>
                        <p className="type-caption text-[color:var(--muted-foreground)] mt-0.5">{org.subtitle}</p>
                      </div>
                      <p className="type-caption text-[color:var(--muted-foreground)]">{org.description}</p>
                      <div className="grid gap-1.5">
                        {[
                          { label: "REPAY Vertical", val: org.repayVertical },
                          { label: "Compliance", val: org.complianceOverlay },
                          { label: "Access", val: visibilityLabel[org.visibilityMode] },
                          { label: "Annual Budget", val: fmtShort(org.budget) },
                          { label: "YTD Spent", val: `${fmtShort(org.monthlySpend[CURRENT_MONTH_IDX])} (${ytdPct}%)` },
                        ].map(({ label, val }) => (
                          <div key={label} className="flex items-start justify-between gap-2">
                            <p className="type-caption text-[color:var(--muted-foreground)] shrink-0">{label}</p>
                            <p className="type-caption font-medium text-[color:var(--foreground)] text-right">{val}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <p className="type-caption opacity-0 group-hover:opacity-100 transition-opacity text-[color:var(--workspace-info)]">
                          View dashboard →
                        </p>
                        <span className="type-caption rounded-full border border-[color:var(--workspace-border)] bg-[color:var(--workspace-surface)] px-2 py-0.5 text-[color:var(--muted-foreground)]">
                          {org.chainLength.toLocaleString()} records
                        </span>
                      </div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

function Dashboard({ org, onBack, onSignOut }: { org: OrgConfig; onBack: () => void; onSignOut: () => void }) {
  const [expandedTxId, setExpandedTxId] = useState<string | null>(null);

  const ytdSpend = org.monthlySpend[CURRENT_MONTH_IDX];
  const remaining = org.budget - ytdSpend;
  const ytdPct = pctOf(ytdSpend, org.budget);
  const projectedAnnual = (ytdSpend / (CURRENT_MONTH_IDX + 1)) * 12;
  const projectedPct = pctOf(projectedAnnual, org.budget);

  const visibilityBadge: Record<OrgConfig["visibilityMode"], { label: string; color: string }> = {
    public: { label: "Public", color: "var(--workspace-success)" },
    permissioned: { label: "Permissioned", color: "var(--workspace-info)" },
    private: { label: "Private", color: "var(--workspace-warning)" },
  };
  const badge = visibilityBadge[org.visibilityMode];

  return (
    <div data-workspace-root>
      <div className="workspace-shell">
        <div className="mx-auto grid w-full max-w-[1440px] gap-4 px-4 py-4 lg:px-6">

          {/* Header */}
          <header className="workspace-panel-strong workspace-header flex min-h-[var(--workspace-header-height)] flex-wrap items-center justify-between gap-4 bg-[color:var(--workspace-nav-bg-strong)] px-5 py-4 sm:px-6">
            <div className="flex items-center gap-4">
              <InterfaceMark />
              <div className="grid gap-0.5">
                <div className="flex items-center gap-2">
                  <p className="type-title-sm text-[color:var(--foreground)]">{org.name}</p>
                  <span className={cn("type-caption rounded-full border px-2 py-0.5 font-medium", COLOR_TOKEN[badge.color] ?? "border-[color:var(--workspace-info)] text-[color:var(--workspace-info)]")}>
                    {badge.label}
                  </span>
                </div>
                <p className="type-caption text-[color:var(--muted-foreground)]">{org.subtitle} · {org.complianceOverlay}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="size-2 shrink-0 rounded-full bg-[color:var(--workspace-success)]" />
                <p className="type-caption text-[color:var(--muted-foreground)]">Chain healthy · Anchored {org.lastAnchorLabel}</p>
              </div>
              <Button variant="outline" onClick={onBack}>
                <InterfaceIcon name="back" data-icon="inline-start" size={18} />
                All Orgs
              </Button>
              <Button variant="outline" onClick={onSignOut}>
                <InterfaceIcon name="lock" data-icon="inline-start" size={18} />
                Sign Out
              </Button>
            </div>
          </header>

          {/* Stat cards */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "YTD Spend",
                value: fmtShort(ytdSpend),
                sub: `${ytdPct}% of ${fmtShort(org.budget)} annual budget`,
                icon: "trend" as const,
              },
              {
                label: "Budget Remaining",
                value: fmtShort(remaining),
                sub: `${100 - ytdPct}% remaining · FY 2026`,
                icon: "data" as const,
              },
              {
                label: "Projected Annual",
                value: fmtShort(projectedAnnual),
                sub: `${projectedPct}% of budget at current pace`,
                icon: "clock" as const,
              },
              {
                label: "Chain Records",
                value: org.chainLength.toLocaleString(),
                sub: `Anchored to the Public Ledger · ${org.lastAnchorLabel}`,
                icon: "shield" as const,
              },
            ].map(({ label, value, sub, icon }) => (
              <div key={label} className="radius-workspace-card border border-[color:var(--workspace-border)] bg-[color:var(--workspace-panel)] p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="type-caption text-[color:var(--muted-foreground)]">{label}</p>
                  <InterfaceIcon name={icon} size={14} className="shrink-0 text-[color:var(--muted-foreground)]" />
                </div>
                <p className="type-title text-[color:var(--foreground)]">{value}</p>
                <p className="type-caption text-[color:var(--muted-foreground)] mt-0.5">{sub}</p>
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">

            {/* Left: charts */}
            <div className="grid gap-4">

              {/* Burndown chart */}
              <div className="radius-workspace-card border border-[color:var(--workspace-border)] bg-[color:var(--workspace-panel)] p-4">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                  <div>
                    <p className="type-body-sm font-semibold text-[color:var(--foreground)]">Budget Burndown — FY 2026</p>
                    <p className="type-caption text-[color:var(--muted-foreground)]">Cumulative spend vs annual budget · Jan–May actuals · Jun–Dec projected</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className={cn("size-2 shrink-0 rounded-full", COLOR_BG[org.color] ?? "bg-[color:var(--workspace-info)]")} />
                      <p className="type-caption text-[color:var(--muted-foreground)]">Actual spend</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={cn("size-2 shrink-0 rounded-full opacity-35", COLOR_BG[org.color] ?? "bg-[color:var(--workspace-info)]")} />
                      <p className="type-caption text-[color:var(--muted-foreground)]">Projected</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="size-2 shrink-0 rounded-full bg-[color:var(--workspace-danger)]" />
                      <p className="type-caption text-[color:var(--muted-foreground)]">Budget ceiling</p>
                    </div>
                  </div>
                </div>
                <BurndownChart monthlySpend={org.monthlySpend} budget={org.budget} color={org.color} />
                <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-[color:var(--workspace-border)] pt-3">
                  {[
                    { label: "Jan–May actual", val: fmtShort(ytdSpend) },
                    { label: "Monthly avg", val: fmtShort(ytdSpend / (CURRENT_MONTH_IDX + 1)) },
                    { label: "Projected year-end", val: fmtShort(projectedAnnual) },
                    { label: "Projected vs budget", val: projectedPct > 100 ? `${projectedPct - 100}% over` : `${100 - projectedPct}% under` },
                  ].map(({ label, val }) => (
                    <div key={label}>
                      <p className="type-caption text-[color:var(--muted-foreground)]">{label}</p>
                      <p className="type-caption font-semibold text-[color:var(--foreground)]">{val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category budget bars */}
              <div className="radius-workspace-card border border-[color:var(--workspace-border)] bg-[color:var(--workspace-panel)] p-4">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div>
                    <p className="type-body-sm font-semibold text-[color:var(--foreground)]">Spend by {org.categoryLabel}</p>
                    <p className="type-caption text-[color:var(--muted-foreground)]">Budget vs actual YTD · warnings at 80% consumed</p>
                  </div>
                  <p className="type-caption text-[color:var(--muted-foreground)]">Total budget: {fmtShort(org.budget)}</p>
                </div>
                <div className="grid gap-4">
                  {org.categories.map((cat) => (
                    <CategoryBar key={cat.name} name={cat.name} budget={cat.budget} spent={cat.spent} color={org.color} />
                  ))}
                </div>
                <div className="mt-4 border-t border-[color:var(--workspace-border)] pt-3">
                  <div className="flex items-center justify-between">
                    <p className="type-caption text-[color:var(--muted-foreground)]">Total allocated</p>
                    <p className="type-caption font-semibold text-[color:var(--foreground)]">
                      {fmtShort(org.categories.reduce((s, c) => s + c.spent, 0))} / {fmtShort(org.categories.reduce((s, c) => s + c.budget, 0))}
                    </p>
                  </div>
                </div>
              </div>

              {/* Transaction table */}
              <div className="radius-workspace-card overflow-hidden border border-[color:var(--workspace-border)] bg-[color:var(--workspace-panel)]">
                <div className="border-b border-[color:var(--workspace-border)] px-4 py-3">
                  <p className="type-body-sm font-semibold text-[color:var(--foreground)]">Recent Transactions</p>
                  <p className="type-caption text-[color:var(--muted-foreground)]">Sanitized · hash-chained · anchored to the Public Ledger</p>
                </div>
                <div className="divide-y divide-[color:var(--workspace-border)]">
                  {org.transactions.map((tx) => {
                    const isExpanded = expandedTxId === tx.id;
                    return (
                      <div key={tx.id}>
                        <Button
                          variant="ghost"
                          onClick={() => setExpandedTxId(isExpanded ? null : tx.id)}
                          className="w-full h-auto px-4 py-3 text-left rounded-none transition-colors hover:bg-[color:var(--workspace-surface)]"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="grid min-w-0 gap-0.5">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="type-body-sm font-semibold text-[color:var(--foreground)] truncate">{tx.counterparty}</p>
                                {tx.hasRedaction && (
                                  <span className="type-caption shrink-0 rounded-full border border-[color:var(--workspace-warning-edge)] bg-[color:var(--workspace-warning-bg)] px-1.5 py-0.5 text-[color:var(--workspace-warning)]">
                                    redacted
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-x-3 gap-y-0">
                                <p className="type-caption text-[color:var(--muted-foreground)]">{org.categoryLabel}: {tx.category}</p>
                                <p className="type-caption text-[color:var(--muted-foreground)]">{tx.method}</p>
                                <p className="type-caption text-[color:var(--muted-foreground)]">{org.batchLabel}: {tx.batch}</p>
                                <p className="type-caption text-[color:var(--muted-foreground)]">{tx.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <p className="type-body-sm font-semibold text-[color:var(--foreground)]">{fmtAmount(tx.amount)}</p>
                              <InterfaceIcon name={isExpanded ? "back" : "next"} size={13} className="rotate-90 text-[color:var(--muted-foreground)]" />
                            </div>
                          </div>
                        </Button>

                        {isExpanded && (
                          <div className="border-t border-[color:var(--workspace-border)] bg-[color:var(--workspace-surface)] px-4 py-3">
                            <div className="grid gap-2 sm:grid-cols-2">
                              <div>
                                <p className="type-caption font-semibold text-[color:var(--foreground)] mb-1.5">Record fields (sanitized)</p>
                                <div className="grid gap-1">
                                  {[
                                    { f: org.vendorLabel, v: tx.counterparty },
                                    { f: "Amount", v: fmtAmount(tx.amount) },
                                    { f: org.categoryLabel, v: tx.category },
                                    { f: "Payment method", v: tx.method },
                                    { f: org.batchLabel, v: tx.batch },
                                    { f: "Date", v: tx.date },
                                  ].map(({ f, v }) => (
                                    <div key={f} className="flex items-baseline justify-between gap-2">
                                      <p className="type-caption text-[color:var(--muted-foreground)]">{f}</p>
                                      <p className="type-caption font-medium text-[color:var(--foreground)]">{v}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="type-caption font-semibold text-[color:var(--foreground)] mb-1.5">Chain proof</p>
                                <div className="grid gap-1.5">
                                  <div className="flex items-start gap-1.5">
                                    <InterfaceIcon name="shield" size={12} className="mt-px shrink-0 text-[color:var(--workspace-success)]" />
                                    <div>
                                      <p className="type-caption text-[color:var(--muted-foreground)]">SHA-256 hash</p>
                                      <p className="type-caption font-mono text-[color:var(--workspace-success)]">{tx.hash}…</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-1.5">
                                    <InterfaceIcon name="check" size={12} className="mt-px shrink-0 text-[color:var(--workspace-success)]" />
                                    <div>
                                      <p className="type-caption text-[color:var(--muted-foreground)]">Ledger anchor</p>
                                      <p className="type-caption font-mono text-[color:var(--workspace-info)]">{org.ledgerTxHash}…</p>
                                    </div>
                                  </div>
                                  <p className="type-caption text-[color:var(--muted-foreground)]">
                                    Verifiable at Ledger Explorer without trusting CivicChain.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: chain + compliance */}
            <div className="grid gap-3 lg:sticky lg:top-4">

              {/* Chain status */}
              <div className="radius-workspace-card border border-[color:var(--workspace-border)] bg-[color:var(--workspace-panel)]">
                <div className="h-1 rounded-t-[inherit] bg-[color:var(--workspace-success)]" />
                <div className="border-b border-[color:var(--workspace-border)] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="size-2 shrink-0 rounded-full bg-[color:var(--workspace-success)]" />
                    <p className="type-body-sm font-semibold text-[color:var(--foreground)]">Chain Healthy</p>
                  </div>
                </div>
                <div className="grid divide-y divide-[color:var(--workspace-border)] px-4">
                  {[
                    { label: "Total records", val: org.chainLength.toLocaleString() },
                    { label: "Last anchor", val: org.lastAnchorLabel },
                    { label: "Network", val: "Public Ledger" },
                    { label: "Finality", val: "5 seconds" },
                    { label: "Cost per anchor", val: "$0.0000016" },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex items-center justify-between py-2">
                      <p className="type-caption text-[color:var(--muted-foreground)]">{label}</p>
                      <p className="type-caption font-medium text-[color:var(--foreground)]">{val}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[color:var(--workspace-border)] px-4 py-3">
                  <p className="type-caption text-[color:var(--muted-foreground)] mb-0.5">Latest batch tx</p>
                  <p className="type-caption font-mono text-[color:var(--workspace-success)]">{org.ledgerTxHash}…</p>
                </div>
              </div>

              {/* Compliance */}
              <div className="radius-workspace-card border border-[color:var(--workspace-border)] bg-[color:var(--workspace-panel)]">
                <div className="border-b border-[color:var(--workspace-border)] px-4 py-3">
                  <p className="type-body-sm font-semibold text-[color:var(--foreground)]">Compliance</p>
                </div>
                <div className="grid divide-y divide-[color:var(--workspace-border)] px-4">
                  {[
                    { label: "Overlay", val: org.complianceOverlay },
                    { label: "REPAY vertical", val: org.repayVertical },
                    { label: "Visibility", val: org.visibilityMode },
                    { label: "PHI guard", val: org.id === "healthcare" ? "Active" : "N/A" },
                    { label: "Audit export", val: "PDF / CSV" },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex items-center justify-between py-2">
                      <p className="type-caption text-[color:var(--muted-foreground)]">{label}</p>
                      <p className={[
                        "type-caption font-medium",
                        label === "PHI guard" && val === "Active" ? "text-[color:var(--workspace-success)]" : "text-[color:var(--foreground)]",
                      ].join(" ")}>{val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hash verifier */}
              <div className="radius-workspace-control border border-[color:var(--workspace-border)] bg-[color:var(--workspace-surface)] px-3 py-2.5">
                <p className="type-caption font-semibold text-[color:var(--foreground)] mb-1">Verify any record</p>
                <p className="type-caption text-[color:var(--muted-foreground)] mb-2">Paste a SHA-256 hash to confirm it is anchored on the Public Ledger and unchanged.</p>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="SHA-256 hash…"
                    readOnly
                    className="radius-workspace-control type-caption h-auto border-[color:var(--workspace-border)] bg-[color:var(--workspace-panel)] px-2.5 py-1.5 text-[color:var(--muted-foreground)]"
                  />
                  <Button variant="outline" className="h-[2.125rem] shrink-0 px-3" disabled>
                    Verify
                  </Button>
                </div>
                <p className="type-caption text-[color:var(--muted-foreground)] mt-1.5 opacity-60">Live in production build</p>
              </div>

              {/* REPAY integration note */}
              <div className="radius-workspace-control border border-[color:var(--workspace-border)] bg-[color:var(--workspace-surface)] px-3 py-2.5">
                <p className="type-caption font-semibold text-[color:var(--foreground)] mb-1">Powered by REPAY</p>
                <p className="type-caption text-[color:var(--muted-foreground)]">
                  Payments run on {org.repayVertical}. TLaaS receives events via REPAY webhook, applies {org.complianceOverlay} sanitizer rules, and anchors every batch to the Public Ledger. No changes required to the existing REPAY integration.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ── Page root ─────────────────────────────────────────────────────────────────

export function TLaaSDemoPage() {
  const [selectedOrg, setSelectedOrg] = useState<OrgId | null>(null);

  const org = selectedOrg ? ORGS.find((o) => o.id === selectedOrg)! : null;

  return (
    <PasswordGate password="repay2026" label="TLaaS Demo">
      {({ onSignOut }) =>
        org ? (
          <Dashboard org={org} onBack={() => setSelectedOrg(null)} onSignOut={onSignOut} />
        ) : (
          <OrgPickerScreen onSelect={setSelectedOrg} />
        )
      }
    </PasswordGate>
  );
}
