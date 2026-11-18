"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Badge, type BadgeTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Icon, type IconName } from "@/components/ui/icon";
import { Progress } from "@/components/ui/progress";
import { SurfaceCard } from "@/components/ui/surface-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import {
  GRID_A107_POLYGON,
  JURISDICTION,
  SATISFACTION_DIMENSIONS,
  SIGNERS,
  seedTargets,
  type BudgetLink,
  type Target,
  type VerificationClass,
} from "./trl-data";
import {
  ConsortiumLedger,
  targetAnchorPayload,
  type AnchorRecord,
  type VerifyOutcome,
} from "./trl-anchor";
import { computeComposite } from "./trl-scoring";

// ── Roles (personas, §5) ─────────────────────────────────────────────────────

type Role = "mayor" | "auditor" | "citizen";
const ROLES: Array<{ id: Role; label: string; sub: string; icon: IconName }> = [
  { id: "mayor", label: "District Mayor", sub: "Scorecard & risk", icon: "admin" },
  { id: "auditor", label: "Municipal Auditor", sub: "Hashes & signers", icon: "trust" },
  { id: "citizen", label: "Public Citizen", sub: "Plain progress", icon: "citizen" },
];

// ── Presentational helpers ───────────────────────────────────────────────────

const VCLASS: Record<VerificationClass, { label: string; tone: BadgeTone; icon: IconName; tip: string }> = {
  machine: {
    label: "Sourced · ledger-anchored",
    tone: "sky",
    icon: "metric",
    tip: "Machine-objective: the number comes straight from an authenticated system of record — not typed in by an official — and its hash is on the ledger.",
  },
  "multi-attested": {
    label: "Verified by signers",
    tone: "sage",
    icon: "trust",
    tip: "Multi-attested: two or more accountable roles (e.g. grid worker + bureau + inspector) have each signed. Their signatures are on the ledger.",
  },
  "single-attested": {
    label: "Signed by role",
    tone: "gold",
    icon: "check-circle",
    tip: "Single-attested: one accountable role has signed for this claim.",
  },
  "self-reported": {
    label: "Unverified — self-reported",
    tone: "neutral",
    icon: "flash",
    tip: "Self-reported: an unverified claim by the responsible party. Never shown as green until an independent signer or system confirms it.",
  },
  "citizen-rated": {
    label: "Resident satisfaction",
    tone: "blue",
    icon: "vote",
    tip: "Citizen-rated: an aggregate of geo-verified resident votes. A bounded input — it never proves votes were freely or representatively cast.",
  },
};

function Tip({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent><span className="type-caption">{text}</span></TooltipContent>
    </Tooltip>
  );
}

function StatusPill({ status }: { status: Target["status"] }) {
  const map: Record<Target["status"], BadgeTone> = {
    VERIFIED: "sage",
    MET: "sage",
    IN_PROGRESS: "gold",
    PENDING: "neutral",
    MISSED: "neutral",
    DISPUTED: "neutral",
  };
  const isMissed = status === "MISSED";
  return (
    <Badge size="sm" tone={map[status]} className={cn("type-label-compact", isMissed && "border-red-400 bg-red-100 text-red-600")}>
      {status.replace("_", " ")}
    </Badge>
  );
}

function Mono({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("font-mono text-[0.72rem] leading-relaxed break-all", className)}>{children}</span>;
}

// ── Geometry ──────────────────────────────────────────────────────────────────

function pointInPolygon([x, y]: [number, number], poly: Array<[number, number]>): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
const CENTROID: [number, number] = [
  GRID_A107_POLYGON.reduce((s, p) => s + p[0], 0) / GRID_A107_POLYGON.length,
  GRID_A107_POLYGON.reduce((s, p) => s + p[1], 0) / GRID_A107_POLYGON.length,
];
function confidenceAt(pt: [number, number]): number {
  const d = Math.hypot(pt[0] - CENTROID[0], pt[1] - CENTROID[1]);
  return Math.max(0, Math.min(1, 1 - d / 55));
}

// ── Event log ─────────────────────────────────────────────────────────────────

type LogKind = "anchor" | "verify" | "mismatch" | "attest" | "veto" | "revise" | "vote" | "reset";
type LogEntry = { id: number; kind: LogKind; text: string; at: string };
const LOG_ICON: Record<LogKind, IconName> = {
  anchor: "link",
  verify: "trust",
  mismatch: "flash",
  attest: "check-circle",
  veto: "flash",
  revise: "note",
  vote: "vote",
  reset: "compass",
};

type Modal =
  | { type: "effort"; targetId: string }
  | { type: "inspect"; targetId: string }
  | { type: "cascade"; targetId: string }
  | { type: "vote"; targetId: string }
  | { type: "revise"; targetId: string }
  | null;

// Performance read: how an effort is tracking, from achievement + status.
function readPerformance(t: Target): { label: string; tone: BadgeTone; className?: string } {
  if (t.status === "MISSED") return { label: "Missed", tone: "neutral", className: "border-red-400 bg-red-100 text-red-600" };
  if (t.status === "VERIFIED" || t.status === "MET") return { label: "On track · verified", tone: "sage" };
  if (t.achievement >= 95) return { label: "On track", tone: "sage" };
  if (t.achievement >= 82) return { label: "Slightly behind", tone: "gold" };
  return { label: "At risk", tone: "neutral", className: "border-red-400 bg-red-100 text-red-600" };
}

// Deterministic progress-over-time ramp ending at the current achievement, so
// the detail view can show a plausible trend without extra seed data.
function progressTrend(t: Target): number[] {
  const end = t.achievement;
  const start = Math.max(35, end - 26);
  const seed = t.id.length;
  return Array.from({ length: 6 }, (_, i) => {
    const base = start + ((end - start) * i) / 5;
    const wobble = i === 0 || i === 5 ? 0 : Math.sin(seed + i) * 2.5;
    return Math.round(Math.max(0, Math.min(100, base + wobble)));
  });
}

// Budget helper: released is derived from live achievement vs the threshold.
function budgetReleased(t: Target): boolean {
  return Boolean(t.budget) && t.achievement >= (t.budget as BudgetLink).releaseAt;
}

export function TrlConsole() {
  const ledgerRef = useRef<ConsortiumLedger | null>(null);
  if (ledgerRef.current === null) ledgerRef.current = new ConsortiumLedger();
  const ledger = ledgerRef.current;

  const [role, setRole] = useState<Role>("mayor");
  const [targets, setTargets] = useState<Target[]>(() => seedTargets());
  const [anchors, setAnchors] = useState<Record<string, AnchorRecord>>({});
  const [tampered, setTampered] = useState<Record<string, boolean>>({});
  const [alarmId, setAlarmId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [modal, setModal] = useState<Modal>(null);
  const [log, setLog] = useState<LogEntry[]>([]);
  const logId = useRef(0);

  const pushLog = useCallback((kind: LogKind, text: string) => {
    logId.current += 1;
    setLog((l) => [{ id: logId.current, kind, text, at: new Date().toLocaleTimeString() }, ...l].slice(0, 40));
  }, []);

  const anchorAll = useCallback(
    async (seed: Target[]) => {
      const next: Record<string, AnchorRecord> = {};
      for (const t of seed) {
        next[t.id] = await ledger.anchor("target", t.id, targetAnchorPayload(t));
        if (t.satisfaction) next[t.satisfaction.pollId] = await ledger.anchor("satisfaction_result", t.satisfaction.pollId, t.satisfaction);
      }
      return next;
    },
    [ledger],
  );

  useEffect(() => {
    let alive = true;
    (async () => {
      const next = await anchorAll(seedTargets());
      if (!alive) return;
      setAnchors(next);
      setReady(true);
      pushLog("anchor", `${Object.keys(next).length} baselines anchored to the consortium ledger`);
    })();
    return () => {
      alive = false;
    };
  }, [anchorAll, pushLog]);

  const tamperedCount = useMemo(() => Object.values(tampered).filter(Boolean).length, [tampered]);
  const composite = useMemo(() => computeComposite(targets), [targets]);
  const byId = useCallback((id: string) => targets.find((t) => t.id === id)!, [targets]);

  const reanchor = useCallback(
    async (t: Target) => {
      const rec = await ledger.anchor("target", t.id, targetAnchorPayload(t));
      setAnchors((a) => ({ ...a, [t.id]: rec }));
      setTampered((m) => ({ ...m, [t.id]: false }));
      return rec;
    },
    [ledger],
  );

  const updateTarget = useCallback((id: string, patch: Partial<Target>) => {
    setTargets((ts) => ts.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }, []);

  const attestHeating = useCallback(async () => {
    const t = byId("binlan-heating-2026");
    const attestations = (t.attestations ?? []).map((a) =>
      a.signer === "housing_bureau" && !a.signedAt ? { ...a, signedAt: new Date().toISOString() } : a,
    );
    const quorumMet = attestations.every((a) => a.signedAt);
    const milestones = (t.milestones ?? []).map((m) => (m.label.includes("sign-off") ? { ...m, done: quorumMet } : m));
    const updated: Target = {
      ...t,
      attestations,
      milestones,
      verificationClass: quorumMet ? "multi-attested" : t.verificationClass,
      status: quorumMet ? "VERIFIED" : t.status,
      achievement: quorumMet ? 100 : t.achievement,
      actualValue: quorumMet ? "Repairs complete — bureau verified" : t.actualValue,
    };
    updateTarget(t.id, updated);
    await reanchor(updated);
    pushLog("attest", "Housing Bureau signed — 2-of-2 quorum met, heating VERIFIED; ¥5.0M disbursement now releasable (external), re-anchored");
  }, [byId, updateTarget, reanchor, pushLog]);

  const toggleVeto = useCallback(async () => {
    const t = byId("binlan-safety-2026");
    const nowMissed = t.status !== "MISSED";
    const updated: Target = {
      ...t,
      status: nowMissed ? "MISSED" : "MET",
      achievement: nowMissed ? 0 : 100,
      actualValue: nowMissed ? "1 major incident recorded" : "0 incidents",
    };
    updateTarget(t.id, updated);
    await reanchor(updated);
    pushLog("veto", nowMissed ? "Safety (一票否决) set MISSED — composite capped, veto_triggered flagged" : "Safety restored to MET — veto cleared");
  }, [byId, updateTarget, reanchor, pushLog]);

  const tamper = useCallback(
    (id: string) => {
      const t = byId(id);
      updateTarget(id, {
        achievement: Math.max(0, Math.min(100, t.achievement + 6)),
        actualValue: t.actualValue.match(/\d/) ? t.actualValue.replace(/\d+(\.\d+)?/, (m) => String(Math.round(Number(m) * 1.1))) : `${t.actualValue} (edited)`,
      });
      setTampered((m) => ({ ...m, [id]: true }));
      pushLog("mismatch", `Back-end row for ${id} edited directly — ledger NOT updated. Click Verify.`);
    },
    [byId, updateTarget, pushLog],
  );

  // Presenter hero: a scripted, dramatic alteration for the live security story.
  const simulateAlteration = useCallback(() => {
    const t = byId("binlan-eco-2026");
    updateTarget(t.id, { actualValue: "95% fleet · −12% PM2.5", achievement: 95 });
    setTampered((m) => ({ ...m, [t.id]: true }));
    setAlarmId(t.id);
    pushLog("mismatch", "⚡ Unauthorized edit: Ecological KPI raised 84% → 95% directly in the database. Ledger hash NOT updated — composite invalidated.");
    setTimeout(() => setAlarmId(null), 2400);
  }, [byId, updateTarget, pushLog]);

  const resetDemo = useCallback(async () => {
    const seed = seedTargets();
    setTargets(seed);
    setTampered({});
    setAlarmId(null);
    const next = await anchorAll(seed);
    setAnchors(next);
    pushLog("reset", "Demo reset — baselines re-anchored, integrity restored");
  }, [anchorAll, pushLog]);

  return (
    <TooltipProvider delayDuration={120}>
      <div className="min-h-screen bg-background text-foreground">
        <TrlHeader
          ready={ready}
          anchorsCount={ledger.size}
          role={role}
          onRole={setRole}
          onSimulate={simulateAlteration}
          onReset={resetDemo}
        />

        <main className="mx-auto grid max-w-[var(--page-max)] gap-6 px-6 py-8 lg:grid-cols-[1fr_320px]">
          <div className="grid gap-6">
            <CompositePanel composite={composite} tamperedCount={tamperedCount} role={role} anchorsCount={ledger.size} />
            {role !== "citizen" && <VerificationLegend />}

            <section className="grid gap-4">
              <h2 className="type-heading-sm">Responsibility targets · {targets.length}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {targets.map((t) => (
                  <TargetCard
                    key={t.id}
                    target={t}
                    role={role}
                    anchor={anchors[t.id]}
                    tampered={Boolean(tampered[t.id])}
                    alarm={alarmId === t.id}
                    onOpenEffort={() => setModal({ type: "effort", targetId: t.id })}
                    onInspect={() => setModal({ type: "inspect", targetId: t.id })}
                    onVote={t.satisfaction ? () => setModal({ type: "vote", targetId: t.id }) : undefined}
                    onAttest={t.id === "binlan-heating-2026" ? attestHeating : undefined}
                    onRevise={t.id === "binlan-eldercare-2026" ? () => setModal({ type: "revise", targetId: t.id }) : undefined}
                    onVeto={t.id === "binlan-safety-2026" ? toggleVeto : undefined}
                    onTamper={() => tamper(t.id)}
                  />
                ))}
              </div>
            </section>
          </div>

          <EventLog log={log} />
        </main>

        {modal?.type === "effort" && (
          <EffortDetailModal
            target={byId(modal.targetId)}
            composite={composite}
            ledger={ledger}
            anchor={anchors[modal.targetId]}
            onClose={() => setModal(null)}
            onOpenVote={byId(modal.targetId).satisfaction ? () => setModal({ type: "vote", targetId: modal.targetId }) : undefined}
            onOpenCascade={byId(modal.targetId).cascade ? () => setModal({ type: "cascade", targetId: modal.targetId }) : undefined}
          />
        )}
        {modal?.type === "inspect" && (
          <InspectModal
            target={byId(modal.targetId)}
            ledger={ledger}
            anchor={anchors[modal.targetId]}
            onClose={() => setModal(null)}
            onResult={(o) => pushLog(o.match ? "verify" : "mismatch", o.match ? `Verified ${modal.targetId} — hash matches ledger` : `MISMATCH on ${modal.targetId} — served record ≠ anchored hash`)}
          />
        )}
        {modal?.type === "cascade" && <CascadeModal target={byId(modal.targetId)} onClose={() => setModal(null)} />}
        {modal?.type === "vote" && (
          <VoteModal
            target={byId(modal.targetId)}
            onClose={() => setModal(null)}
            onCast={async (scores) => {
              const t = byId(modal.targetId);
              const sat = t.satisfaction!;
              const n = sat.nValid + 1;
              const meanScores = { ...sat.meanScores };
              for (const d of sat.dimensions) meanScores[d] = Number(((sat.meanScores[d] * sat.nValid + scores[d]) / n).toFixed(2));
              const dist = { ...sat.confidenceDistribution, "0.85–1.00": (sat.confidenceDistribution["0.85–1.00"] ?? 0) + 1 };
              const updatedSat = { ...sat, nValid: n, meanScores, confidenceDistribution: dist };
              updateTarget(t.id, { satisfaction: updatedSat });
              const rec = await ledger.anchor("satisfaction_result", sat.pollId, updatedSat);
              setAnchors((a) => ({ ...a, [sat.pollId]: rec }));
              pushLog("vote", `Ballot accepted (secret) — grid ${sat.gridId} aggregate now n=${n}, re-anchored`);
            }}
          />
        )}
        {modal?.type === "revise" && (
          <ReviseModal
            target={byId(modal.targetId)}
            onClose={() => setModal(null)}
            onRevise={async (to) => {
              const t = byId(modal.targetId);
              const entry = { field: "Deadline", from: "Q4 2026", to, by: "eval_office" as const, at: new Date().toISOString() };
              const updated: Target = { ...t, title: t.title.replace(/by Q4/, `by ${to}`), revisions: [...(t.revisions ?? []), entry] };
              updateTarget(t.id, updated);
              await reanchor(updated);
              pushLog("revise", `Elder-care deadline revised Q4 2026 → ${to} by Evaluation Office — versioned + anchored`);
              setModal(null);
            }}
          />
        )}
      </div>
    </TooltipProvider>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────

function TrlHeader({
  ready,
  anchorsCount,
  role,
  onRole,
  onSimulate,
  onReset,
}: {
  ready: boolean;
  anchorsCount: number;
  role: Role;
  onRole: (r: Role) => void;
  onSimulate: () => void;
  onReset: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 px-6 py-4 backdrop-blur">
      <div className="mx-auto grid max-w-[var(--page-max)] gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image src="/brand/civic-logo-w-text-horizontal.svg" alt="Civic-Chain" width={310} height={64} priority className="h-7 w-auto sm:h-8" />
            <span className="hidden h-8 w-px bg-border sm:block" />
            <div>
              <p className="type-title-sm">Target Responsibility Ledger</p>
              <p className="type-caption text-slate-500">{JURISDICTION.name} 滨兰区 · {JURISDICTION.municipality} · {JURISDICTION.period}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="filled" size="sm" icon="flash" iconPosition="leading" onClick={onSimulate} className="ctl-tone-slate border border-red-400 bg-red-600 text-cream-50">
              Simulate data alteration
            </Button>
            <Button variant="outline" size="sm" icon="compass" iconPosition="leading" onClick={onReset}>Reset</Button>
            <Button asChild variant="ghost" size="sm" icon="arrow-left" iconPosition="leading"><Link href="/">Civic-Chain</Link></Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex overflow-hidden rounded-2xl border border-border">
            {ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => onRole(r.id)}
                className={cn("flex items-center gap-2 px-3 py-2 transition-colors", role === r.id ? "bg-blue-900 text-cream-50" : "bg-cream-50 text-slate-500 hover:bg-cream-200")}
              >
                <Icon name={r.icon} size="xs" />
                <span className="type-label-compact">{r.label}</span>
                <span className="type-label-compact hidden opacity-70 sm:inline">· {r.sub}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Badge size="sm" tone="sky" icon="link" className="type-label-compact">{ready ? `Consortium ledger · ${anchorsCount} anchors` : "Anchoring baselines…"}</Badge>
            <Badge size="sm" tone="neutral" className="type-label-compact">SHA-256 · no token · no value</Badge>
          </div>
        </div>
      </div>
    </header>
  );
}

// ── Composite panel ───────────────────────────────────────────────────────────

function CompositePanel({
  composite,
  tamperedCount,
  role,
  anchorsCount,
}: {
  composite: ReturnType<typeof computeComposite>;
  tamperedCount: number;
  role: Role;
  anchorsCount: number;
}) {
  const compromised = tamperedCount > 0;
  return (
    <SurfaceCard tone="ink" density="roomy" className="grid gap-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="type-label-compact opacity-80">Period-end composite (provisional)</p>
          <p className={cn("type-display leading-none", compromised && "text-red-400 line-through decoration-2")}>
            {composite.composite}<span className="type-title-sm opacity-70">/100</span>
          </p>
        </div>
        {compromised ? (
          <Badge tone="invert" icon="flash" className="border-red-400 bg-red-600 text-cream-50">Composite unverifiable — {tamperedCount} record(s) fail hash check</Badge>
        ) : composite.vetoTriggered ? (
          <Badge tone="invert" icon="flash" className="border-red-400 bg-red-600 text-cream-50">一票否决 veto_triggered — capped from {composite.rawComposite}</Badge>
        ) : (
          <Badge tone="sage" icon="check-circle">No veto — weighted blend of {composite.breakdown.length} targets</Badge>
        )}
      </div>

      {compromised && (
        <p className="type-caption text-red-400">A back-end record was altered without re-anchoring. Every card re-hashes on Verify; until it matches the ledger the score can’t be trusted. Use <strong>Reset</strong> to restore.</p>
      )}

      {role === "auditor" && !compromised && (
        <p className="type-caption opacity-80">{anchorsCount} records anchored · each contribution below is achievement × weight ÷ Σweights.</p>
      )}

      <div className="grid gap-2">
        {composite.breakdown.map((b) => (
          <div key={b.id} className="grid grid-cols-[1fr_auto] items-center gap-3">
            <div className="min-w-0">
              <p className="type-caption truncate opacity-90">{b.title}</p>
              <Progress value={b.achievement} className="mt-1 bg-cream-50/20" indicatorClassName="bg-cream-50" />
            </div>
            {role === "citizen" ? (
              <span className="type-label-compact tabular-nums opacity-80">{b.achievement}%</span>
            ) : (
              <span className="type-label-compact tabular-nums opacity-80">w {b.weight.toFixed(2)} · {b.achievement}</span>
            )}
          </div>
        ))}
      </div>
    </SurfaceCard>
  );
}

function VerificationLegend() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="type-label-compact text-slate-500">Verification classes:</span>
      {(Object.keys(VCLASS) as VerificationClass[]).map((k) => (
        <Tip key={k} text={VCLASS[k].tip}>
          <Badge size="sm" tone={VCLASS[k].tone} icon={VCLASS[k].icon} className="type-label-compact cursor-help">{VCLASS[k].label}</Badge>
        </Tip>
      ))}
    </div>
  );
}

// ── Target card ────────────────────────────────────────────────────────────────

function TargetCard({
  target: t,
  role,
  anchor,
  tampered,
  alarm,
  onOpenEffort,
  onInspect,
  onVote,
  onAttest,
  onRevise,
  onVeto,
  onTamper,
}: {
  target: Target;
  role: Role;
  anchor?: AnchorRecord;
  tampered: boolean;
  alarm: boolean;
  onOpenEffort: () => void;
  onInspect: () => void;
  onVote?: () => void;
  onAttest?: () => void;
  onRevise?: () => void;
  onVeto?: () => void;
  onTamper: () => void;
}) {
  const [open, setOpen] = useState(false);
  const vc = VCLASS[t.verificationClass];
  const isCitizen = role === "citizen";
  const isAuditor = role === "auditor";
  const milestonesDone = t.milestones?.filter((m) => m.done).length ?? 0;

  return (
    <SurfaceCard
      density="standard"
      className={cn("grid content-start gap-3 transition-shadow", tampered && "border-red-400", alarm && "shadow-lg ring-2 ring-red-400")}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="type-label-compact text-slate-500">
            {t.family} · {t.familyEn}
            {t.veto && (
              <Tip text="一票否决 (single-veto): if this target is MISSED it caps or zeroes the whole composite, regardless of every other result.">
                <span className="cursor-help text-red-600"> · 一票否决</span>
              </Tip>
            )}
          </p>
          <p className="mt-1 flex items-start gap-1">
            <button type="button" onClick={onOpenEffort} className="type-heading-sm text-left hover:underline focus-visible:outline-none focus-visible:underline">
              {isCitizen ? t.plain : t.title}
            </button>
            <Tip text={t.measures}>
              <span className="mt-0.5 shrink-0 cursor-help type-label-compact text-slate-400">ⓘ</span>
            </Tip>
          </p>
          <p className="mt-1 type-caption text-slate-500">{isCitizen ? t.title : t.plain}</p>
        </div>
        <StatusPill status={t.status} />
      </div>

      {!isCitizen && (
        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-cream-100 p-3 type-caption">
          <div><p className="text-slate-500">Target</p><p className="font-medium">{t.targetValue}</p></div>
          <div><p className="text-slate-500">Actual</p><p className={cn("font-medium", tampered && "text-red-600")}>{t.actualValue}</p></div>
          <div>
            <Tip text="Weight = this target's share of the period-end composite. Higher weight moves the final grade more.">
              <p className="cursor-help text-slate-500">Weight ⓘ</p>
            </Tip>
            <p className="font-medium">{t.weight.toFixed(2)}</p>
          </div>
        </div>
      )}

      <div className="grid gap-1">
        <div className="flex items-center justify-between">
          <span className="type-label-compact text-slate-500">{isCitizen ? "Progress" : "Achievement"}</span>
          <span className="type-label-compact tabular-nums">{t.achievement}%</span>
        </div>
        <Progress value={t.achievement} indicatorClassName={t.status === "MISSED" ? "bg-red-600" : t.achievement >= 90 ? "bg-green-600" : "bg-blue-900"} />
      </div>

      {t.budget && <BudgetLine target={t} />}

      {t.milestones && (
        <Tip text="Milestones are the signed, accountable checkpoints that make up this target. It only reaches VERIFIED when the required signers have signed each one.">
          <div className="flex cursor-help items-center gap-2 type-caption text-slate-500">
            <Icon name="approvals" size="xs" />
            <span>Milestones ⓘ</span>
            <span className="font-medium text-blue-900">{milestonesDone}/{t.milestones.length} signed</span>
          </div>
        </Tip>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <Tip text={tampered ? "This record no longer matches its anchored hash. Click to inspect and verify." : vc.tip}>
          <button type="button" onClick={onInspect} className="focus-visible:outline-none">
            <Badge tone={tampered ? "neutral" : vc.tone} icon={vc.icon} className={cn("cursor-pointer", tampered && "border-red-400 bg-red-100 text-red-600")}>
              {tampered ? "Unverified — click to verify" : isCitizen ? "How this is verified" : vc.label}
            </Badge>
          </button>
        </Tip>
      </div>

      {isAuditor && anchor && (
        <div className="rounded-2xl bg-cream-100 p-2 type-label-compact text-slate-500">
          <Mono>{anchor.sha256.slice(0, 24)}… · {anchor.txRef} · {anchor.blockRef}</Mono>
        </div>
      )}

      {/* Expandable details */}
      <button type="button" onClick={() => setOpen((v) => !v)} className="flex items-center gap-1 type-label-compact text-blue-700 focus-visible:outline-none">
        <Icon name={open ? "chevron-up" : "chevron-down"} size="xs" />
        {open ? "Hide details" : "Details"}
      </button>

      {open && (
        <div className="grid gap-3 rounded-2xl border border-border bg-cream-100 p-3">
          <DetailRow icon="search" label="What it measures">{t.measures}</DetailRow>
          <DetailRow icon="announce" label="Why it matters">{t.why}</DetailRow>
          <DetailRow icon="record" label="Responsible">{t.responsibleOfficial} · {t.responsibleUnit}</DetailRow>
          <DetailRow icon="metric" label="Data source (oracle)">{t.sourceRef}</DetailRow>
          {t.milestones && (
            <div className="grid gap-1">
              <span className="type-label-compact text-slate-500">Milestones</span>
              {t.milestones.map((m, i) => (
                <div key={i} className="flex items-center gap-2 type-caption">
                  <Icon name={m.done ? "check-circle" : "chevron-right"} size="xs" className={m.done ? "text-green-600" : "text-slate-400"} />
                  <span className={m.done ? "" : "text-slate-500"}>{m.label}</span>
                </div>
              ))}
            </div>
          )}
          {t.attestations && (
            <div className="grid gap-1">
              <span className="type-label-compact text-slate-500">Signers</span>
              {t.attestations.map((a, i) => (
                <div key={i} className="flex items-center gap-2 type-caption">
                  <Icon name={a.signedAt ? "check-circle" : "chevron-right"} size="xs" className={a.signedAt ? "text-green-600" : "text-slate-400"} />
                  <span>{SIGNERS[a.signer].label} ({SIGNERS[a.signer].role}) — {a.signedAt ? "signed" : "pending"}</span>
                </div>
              ))}
            </div>
          )}
          {t.budget && (
            <DetailRow icon="funding" label="Budget-execution (by reference)">
              {t.budget.amount} · {t.budget.purpose}. {t.budget.treasuryRef}. The TRL verifies the KPI and points at this external disbursement — it moves no money.
            </DetailRow>
          )}
        </div>
      )}

      <p className="type-caption text-slate-500">
        <Icon name="metric" size="xs" className="mr-1 align-[-2px]" />
        {isCitizen ? `Source: ${t.source}` : t.sourceRef}
      </p>

      <div className="mt-1 flex flex-wrap items-center gap-2 border-t border-border pt-3">
        <Button size="sm" variant="soft" icon="chevron-right" onClick={onOpenEffort}>View effort</Button>
        {onVote && <Button size="sm" variant="ghost" icon="vote" iconPosition="leading" onClick={onVote}>{isCitizen ? "Rate this service" : "Resident vote"}</Button>}
        {!isCitizen && onAttest && t.status !== "VERIFIED" && <Button size="sm" variant="ghost" icon="check-circle" iconPosition="leading" onClick={onAttest}>Attest</Button>}
        {!isCitizen && onRevise && <Button size="sm" variant="ghost" icon="note" iconPosition="leading" onClick={onRevise}>Revise</Button>}
        {!isCitizen && onVeto && <Button size="sm" variant="ghost" icon="flash" iconPosition="leading" onClick={onVeto}>{t.status === "MISSED" ? "Restore MET" : "Set MISSED"}</Button>}
        {!isCitizen && <Button size="sm" variant="ghost" icon="flash" iconPosition="leading" onClick={onTamper} className="ml-auto text-red-600">Tamper</Button>}
      </div>

      {t.revisions?.length ? (
        <div className="rounded-2xl border border-gold-500 bg-gold-100/60 p-3 type-caption text-gold-800">
          {t.revisions.map((r, i) => (
            <p key={i}><strong>{r.field} revised:</strong> {r.from} → {r.to} · {SIGNERS[r.by].label} · {new Date(r.at).toLocaleString()}</p>
          ))}
        </div>
      ) : null}
    </SurfaceCard>
  );
}

function DetailRow({ icon, label, children }: { icon: IconName; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2">
      <Icon name={icon} size="xs" className="mt-0.5 shrink-0 text-blue-700" />
      <div className="min-w-0">
        <p className="type-label-compact text-slate-500">{label}</p>
        <p className="type-caption">{children}</p>
      </div>
    </div>
  );
}

function BudgetLine({ target: t }: { target: Target }) {
  const b = t.budget!;
  const released = budgetReleased(t);
  return (
    <Tip text="Budget-execution KPI. The TRL verifies progress and references an external treasury disbursement by id — it never moves, holds, or settles money.">
      <div className={cn("flex cursor-help items-center gap-2 rounded-2xl border p-2 type-caption", released ? "border-green-500 bg-green-100 text-green-900" : "border-gold-500 bg-gold-100/60 text-gold-800")}>
        <Icon name={released ? "check-circle" : "paymentTiming"} size="sm" />
        <span>
          <strong>{b.amount}</strong> {b.purpose} —{" "}
          {released ? "release condition met (external treasury)" : `disbursement locked · releases at ${b.releaseAt}%`}
          <span className="opacity-70"> · referenced only, no money moves here</span>
        </span>
      </div>
    </Tip>
  );
}

// ── Event log rail ─────────────────────────────────────────────────────────────

function EventLog({ log }: { log: LogEntry[] }) {
  return (
    <aside className="grid content-start gap-3">
      <SurfaceCard tone="cream" density="standard" className="sticky top-40 grid gap-3">
        <h2 className="type-label-compact text-slate-500">Ledger activity</h2>
        {log.length === 0 && <p className="type-caption text-slate-500">Actions you take will anchor here.</p>}
        <ul className="grid max-h-[70vh] gap-2 overflow-auto">
          {log.map((e) => (
            <li key={e.id} className={cn("flex gap-2 rounded-2xl p-2", e.kind === "mismatch" && "bg-red-100")}>
              <Icon name={LOG_ICON[e.kind]} size="xs" className={cn("mt-0.5 shrink-0", e.kind === "mismatch" ? "text-red-600" : e.kind === "verify" ? "text-green-600" : "text-blue-900")} />
              <div className="min-w-0">
                <p className={cn("type-caption", e.kind === "mismatch" && "font-medium text-red-600")}>{e.text}</p>
                <p className="type-label-compact text-slate-400">{e.at}</p>
              </div>
            </li>
          ))}
        </ul>
      </SurfaceCard>
    </aside>
  );
}

// ── Effort detail (commitment → progress → performance drill-down) ─────────────

function Sparkline({ data }: { data: number[] }) {
  const w = 100;
  const h = 28;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / 100) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-8 w-full">
      <polyline points={pts} fill="none" stroke="var(--blue-700)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <circle cx={w} cy={h - (data[data.length - 1] / 100) * h} r="1.8" fill="var(--blue-900)" />
    </svg>
  );
}

function StatTile({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl bg-cream-100 p-3">
      <p className="type-label-compact text-slate-500">{label}</p>
      <p className="type-title-sm tabular-nums">{value}</p>
      {hint && <p className="type-label-compact text-slate-400">{hint}</p>}
    </div>
  );
}

function Section({ icon, title, children }: { icon: IconName; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-2">
      <h3 className="flex items-center gap-2 type-label-compact text-slate-500">
        <Icon name={icon} size="xs" className="text-blue-700" />
        {title}
      </h3>
      {children}
    </section>
  );
}

function EffortDetailModal({
  target: t,
  composite,
  ledger,
  anchor,
  onClose,
  onOpenVote,
  onOpenCascade,
}: {
  target: Target;
  composite: ReturnType<typeof computeComposite>;
  ledger: ConsortiumLedger;
  anchor?: AnchorRecord;
  onClose: () => void;
  onOpenVote?: () => void;
  onOpenCascade?: () => void;
}) {
  const [verify, setVerify] = useState<VerifyOutcome | null>(null);
  const [verifying, setVerifying] = useState(false);
  const perf = readPerformance(t);
  const vc = VCLASS[t.verificationClass];
  const contribution = composite.breakdown.find((b) => b.id === t.id)?.contribution ?? 0;
  const trend = progressTrend(t);

  const runVerify = async () => {
    if (!anchor) return;
    setVerifying(true);
    const o = await ledger.verify(anchor.anchorId, targetAnchorPayload(t));
    setVerify(o);
    setVerifying(false);
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[86vh] max-w-2xl overflow-auto">
        <DialogHeader>
          <p className="type-label-compact text-slate-500">{t.family} · {t.familyEn}{t.veto && <span className="text-red-600"> · 一票否决</span>}</p>
          <DialogTitle>{t.title}</DialogTitle>
        </DialogHeader>
        <p className="type-body-sm text-slate-500">{t.plain}</p>

        <div className="flex flex-wrap items-center gap-2">
          <StatusPill status={t.status} />
          <Badge size="sm" tone={perf.tone} className={cn("type-label-compact", perf.className)}>{perf.label}</Badge>
          <Tip text={vc.tip}><Badge size="sm" tone={vc.tone} icon={vc.icon} className="type-label-compact cursor-help">{vc.label}</Badge></Tip>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <StatTile label="Achievement" value={`${t.achievement}%`} hint={`target ${t.targetValue}`} />
          <StatTile label="Weight" value={t.weight.toFixed(2)} hint={t.veto ? "veto (weight 0)" : "of composite"} />
          <StatTile label="Score contribution" value={t.weight > 0 ? `${contribution.toFixed(1)} pts` : "veto only"} hint={`of ${composite.composite}/100`} />
        </div>

        <Section icon="record" title="Commitment — the anchored pledge">
          <div className="grid gap-1 rounded-2xl border border-border bg-cream-50 p-3 type-caption">
            <p><span className="text-slate-500">Responsible unit:</span> {t.responsibleUnit}</p>
            <p><span className="text-slate-500">Named official:</span> {t.responsibleOfficial}</p>
            <p><span className="text-slate-500">Period:</span> {JURISDICTION.period} · <span className="text-slate-500">Type:</span> {t.hard ? "hard (binding)" : "soft"}{t.veto ? " · 一票否决 veto" : ""}</p>
            <p><span className="text-slate-500">Pledged target:</span> {t.targetValue}</p>
            <p className="text-slate-400">The original pledge is anchored the moment it is set, so any later revision is a logged, attributed event — the baseline is permanently recoverable.</p>
          </div>
        </Section>

        <Section icon="metric" title="Progress">
          <div className="rounded-2xl border border-border bg-cream-50 p-3">
            <div className="flex items-center justify-between">
              <span className="type-caption text-slate-500">Trend (period to date)</span>
              <span className="type-caption tabular-nums">{t.actualValue} / {t.targetValue}</span>
            </div>
            <Sparkline data={trend} />
            <Progress value={t.achievement} className="mt-2" indicatorClassName={t.status === "MISSED" ? "bg-red-600" : t.achievement >= 90 ? "bg-green-600" : "bg-blue-900"} />
          </div>
          {t.milestones && (
            <div className="grid gap-1 rounded-2xl border border-border bg-cream-50 p-3">
              <span className="type-label-compact text-slate-500">Milestones — signed checkpoints</span>
              {t.milestones.map((m, i) => (
                <div key={i} className="flex items-center gap-2 type-caption">
                  <Icon name={m.done ? "check-circle" : "chevron-right"} size="xs" className={m.done ? "text-green-600" : "text-slate-400"} />
                  <span className={m.done ? "" : "text-slate-500"}>{m.label}</span>
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {onOpenCascade && <Button size="sm" variant="outline" icon="layers" iconPosition="leading" onClick={onOpenCascade}>Open cascade ({t.cascade?.length} grids)</Button>}
            {onOpenVote && <Button size="sm" variant="outline" icon="vote" iconPosition="leading" onClick={onOpenVote}>Resident satisfaction</Button>}
          </div>
        </Section>

        <Section icon="metric" title="Performance">
          <p className="type-caption">
            {perf.label === "At risk" || t.status === "MISSED"
              ? "Behind the pledged target and dragging on the composite — flagged for evaluator attention."
              : perf.label === "Slightly behind"
                ? "Close to target but not yet there; on the current trend it can still land in-period."
                : "Meeting or ahead of the pledged target."}
            {" "}
            {t.weight > 0 ? `Contributes ${contribution.toFixed(1)} of the ${composite.composite}-point composite (achievement × weight ÷ Σweights).` : "Carries no weight, but as a 一票否决 target a miss can cap the entire composite."}
          </p>
        </Section>

        <Section icon={vc.icon} title="Provenance & verification">
          <div className="grid gap-1 rounded-2xl border border-blue-300 bg-blue-100/50 p-3 type-caption">
            <p><span className="text-blue-700">Data source (oracle):</span> {t.sourceRef}</p>
            {t.attestations && t.attestations.map((a, i) => (
              <p key={i} className="flex items-center gap-2">
                <Icon name={a.signedAt ? "check-circle" : "chevron-right"} size="xs" className={a.signedAt ? "text-green-600" : "text-slate-400"} />
                {SIGNERS[a.signer].label} ({SIGNERS[a.signer].role}) — {a.signedAt ? "signed" : "pending"}
              </p>
            ))}
            {anchor && <p><span className="text-blue-700">Latest anchor:</span> <Mono>{anchor.sha256.slice(0, 20)}… · {anchor.txRef} · {anchor.blockRef}</Mono></p>}
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="soft" icon="trust" iconPosition="leading" onClick={runVerify} disabled={verifying}>{verifying ? "Verifying…" : "Verify against ledger"}</Button>
            {verify && (
              <span className={cn("flex items-center gap-1 type-caption", verify.match ? "text-green-900" : "text-red-600")}>
                <Icon name={verify.match ? "check-circle" : "flash"} size="sm" />
                {verify.match ? "Match — authentic" : "MISMATCH — altered after anchoring"}
              </span>
            )}
          </div>
        </Section>

        {t.budget && (
          <Section icon="funding" title="Budget-execution (by reference)">
            <div className={cn("rounded-2xl border p-3 type-caption", budgetReleased(t) ? "border-green-500 bg-green-100 text-green-900" : "border-gold-500 bg-gold-100/60 text-gold-800")}>
              <p><strong>{t.budget.amount}</strong> — {t.budget.purpose}. {budgetReleased(t) ? "Release condition met." : `Locked; releases at ${t.budget.releaseAt}% achievement.`}</p>
              <p className="mt-1 opacity-80">{t.budget.treasuryRef}. The TRL verifies the KPI and references this external disbursement — it moves, holds, and settles no money.</p>
            </div>
          </Section>
        )}

        {t.revisions?.length ? (
          <Section icon="note" title="Revision history">
            <div className="rounded-2xl border border-gold-500 bg-gold-100/60 p-3 type-caption text-gold-800">
              {t.revisions.map((r, i) => (
                <p key={i}><strong>{r.field}:</strong> {r.from} → {r.to} · {SIGNERS[r.by].label} · {new Date(r.at).toLocaleString()}</p>
              ))}
            </div>
          </Section>
        ) : null}

        <div className="flex justify-end"><Button variant="soft" size="sm" onClick={onClose}>Close</Button></div>
      </DialogContent>
    </Dialog>
  );
}

// ── Inspect / verify modal (oracle source + hash verification) ─────────────────

function InspectModal({
  target,
  ledger,
  anchor,
  onClose,
  onResult,
}: {
  target: Target;
  ledger: ConsortiumLedger;
  anchor?: AnchorRecord;
  onClose: () => void;
  onResult: (o: VerifyOutcome) => void;
}) {
  const [outcome, setOutcome] = useState<VerifyOutcome | null>(null);
  useEffect(() => {
    let alive = true;
    if (!anchor) return;
    ledger.verify(anchor.anchorId, targetAnchorPayload(target)).then((o) => {
      if (!alive) return;
      setOutcome(o);
      onResult(o);
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchor?.anchorId]);

  const vc = VCLASS[target.verificationClass];
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>Record inspector · {target.family}</DialogTitle></DialogHeader>

        <div className="grid gap-2 rounded-2xl border border-blue-300 bg-blue-100/50 p-3">
          <div className="flex items-center gap-2"><Icon name={vc.icon} size="sm" className="text-blue-700" /><p className="type-label-compact text-blue-700">Data source (oracle)</p></div>
          <p className="type-body-sm">{target.sourceRef}</p>
          <p className="type-caption text-slate-500">{vc.tip}</p>
        </div>

        <p className="type-caption text-slate-500">The browser re-hashes the record it was served and compares it to the hash on the consortium ledger. No trust in this server — the proof is the match.</p>
        {!outcome ? (
          <p className="type-caption">Recomputing SHA-256…</p>
        ) : (
          <div className="grid gap-3">
            <div className={cn("flex items-center gap-2 rounded-2xl border p-3", outcome.match ? "border-green-500 bg-green-100 text-green-900" : "border-red-400 bg-red-100 text-red-600")}>
              <Icon name={outcome.match ? "check-circle" : "flash"} size="md" />
              <p className="type-heading-sm">{outcome.match ? "Match — record is authentic" : "MISMATCH — record was altered after anchoring"}</p>
            </div>
            <Field label="Anchored hash (ledger)"><Mono>{outcome.expected}</Mono></Field>
            <Field label="Recomputed hash (served record)"><Mono className={cn(!outcome.match && "text-red-600")}>{outcome.recomputed}</Mono></Field>
            <Field label="Ledger reference"><Mono>{outcome.record?.txRef} · {outcome.record?.blockRef} · {outcome.record ? new Date(outcome.record.anchoredAt).toLocaleString() : ""}</Mono></Field>
            <Field label="Canonical payload (hashed)">
              <pre className="max-h-40 overflow-auto rounded-2xl bg-cream-100 p-3 font-mono text-[0.7rem] leading-relaxed">{JSON.stringify(targetAnchorPayload(target), null, 2)}</pre>
            </Field>
          </div>
        )}
        <div className="flex justify-end"><Button variant="soft" size="sm" onClick={onClose}>Close</Button></div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1">
      <span className="type-label-compact text-slate-500">{label}</span>
      {children}
    </div>
  );
}

// ── Cascade + satisfaction detail ──────────────────────────────────────────────

function CascadeModal({ target, onClose }: { target: Target; onClose: () => void }) {
  const sat = target.satisfaction;
  const maxDist = Math.max(...Object.values(sat?.confidenceDistribution ?? { x: 1 }));
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader><DialogTitle>Target cascade · {target.family}</DialogTitle></DialogHeader>
        <p className="type-caption text-slate-500">Each level is independently anchored and linked upward — the whole chain of who-promised-what is provable.</p>
        <div className="grid gap-2">
          <div className="rounded-2xl border border-blue-300 bg-blue-100 p-3">
            <p className="type-label-compact text-blue-700">District · {target.responsibleUnit}</p>
            <p className="type-body-sm">{target.metric}: {target.actualValue} / {target.targetValue}</p>
          </div>
          <div className="grid gap-2 pl-4">
            {target.cascade?.map((c) => (
              <div key={c.id} className="rounded-2xl border border-border bg-cream-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="type-label-compact text-slate-500">{c.level} {c.id} · {c.official}</p>
                  <Badge size="sm" tone="sky" icon="link" className="type-label-compact">anchored → parent</Badge>
                </div>
                <p className="type-body-sm">{c.unit}</p>
                <p className="type-caption text-slate-500">{c.metric}: {c.actual} / {c.target} · achievement {c.achievement}%</p>
              </div>
            ))}
          </div>
        </div>

        {sat && (
          <div className="grid gap-2 rounded-2xl border border-blue-300 bg-blue-100/50 p-3">
            <div className="flex items-center justify-between">
              <p className="type-label-compact text-blue-700">Resident satisfaction · grid {sat.gridId} (aggregate only)</p>
              <Badge size="sm" tone="blue" icon="vote" className="type-label-compact">n = {sat.nValid} valid</Badge>
            </div>
            <div className="flex flex-wrap gap-4">
              {sat.dimensions.map((d) => (
                <div key={d}><p className="type-label-compact capitalize text-slate-500">{d}</p><p className="type-title-sm tabular-nums">{sat.meanScores[d].toFixed(2)}</p></div>
              ))}
            </div>
            <p className="type-label-compact text-slate-500">Confidence distribution (individual votes never shown)</p>
            <div className="grid gap-1">
              {Object.entries(sat.confidenceDistribution).map(([bucket, n]) => (
                <div key={bucket} className="grid grid-cols-[5rem_1fr_2rem] items-center gap-2">
                  <span className="type-label-compact tabular-nums text-slate-500">{bucket}</span>
                  <div className="h-2 rounded-2xl bg-blue-900/15"><div className="h-full rounded-2xl bg-blue-700" style={{ width: `${(n / maxDist) * 100}%` }} /></div>
                  <span className="type-label-compact tabular-nums">{n}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-end"><Button variant="soft" size="sm" onClick={onClose}>Close</Button></div>
      </DialogContent>
    </Dialog>
  );
}

// ── Geo satisfaction voting ─────────────────────────────────────────────────────

const SCALE_LABELS: Record<number, string> = { 1: "Very dissatisfied", 2: "Dissatisfied", 3: "Neutral", 4: "Satisfied", 5: "Very satisfied" };
type VoteStep = "context" | "geo" | "rate" | "receipt";

function VoteModal({ target, onClose, onCast }: { target: Target; onClose: () => void; onCast: (scores: Record<string, number>) => Promise<void> }) {
  const sat = target.satisfaction!;
  const [step, setStep] = useState<VoteStep>("context");
  const [pin, setPin] = useState<[number, number] | null>(null);
  const [scores, setScores] = useState<Record<string, number>>(() => Object.fromEntries(sat.dimensions.map((d) => [d, 4])));
  const [comment, setComment] = useState("");
  const [busy, setBusy] = useState(false);

  const inside = pin ? pointInPolygon(pin, GRID_A107_POLYGON) : false;
  const confidence = pin ? confidenceAt(pin) : 0;
  const eligible = inside && confidence >= 0.6;
  const polyPoints = GRID_A107_POLYGON.map((p) => p.join(",")).join(" ");

  const place = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPin([((e.clientX - rect.left) / rect.width) * 100, ((e.clientY - rect.top) / rect.height) * 100]);
  };

  const steps: VoteStep[] = ["context", "geo", "rate", "receipt"];
  const stepIndex = steps.indexOf(step);
  const maxDist = Math.max(...Object.values(sat.confidenceDistribution));

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[88vh] max-w-lg overflow-auto">
        <DialogHeader>
          <p className="type-label-compact text-slate-500">Resident satisfaction · {sat.window}</p>
          <DialogTitle>Rate this service — grid {sat.gridId}</DialogTitle>
        </DialogHeader>

        {/* step indicator */}
        <div className="flex items-center gap-1">
          {steps.map((s, i) => (
            <div key={s} className={cn("h-1.5 flex-1 rounded-2xl", i <= stepIndex ? "bg-blue-700" : "bg-blue-900/15")} />
          ))}
        </div>

        {step === "context" && (
          <div className="grid gap-3">
            <p className="type-body-sm">You are rating: <strong>{target.family} — {target.familyEn}</strong>.</p>
            <p className="type-caption text-slate-500">{target.plain}</p>
            <div className="grid gap-2 rounded-2xl border border-border bg-cream-50 p-3 type-caption">
              <p className="type-label-compact text-slate-500">How this poll protects you</p>
              <GuaranteeRow icon="maine">Only residents inside grid {sat.gridId}’s boundary can vote (GPS + confidence ≥ 0.6).</GuaranteeRow>
              <GuaranteeRow icon="trust">Secret ballot — your individual scores are never shown or anchored, only the aggregate.</GuaranteeRow>
              <GuaranteeRow icon="citizen">One vote per resident per period; you stay pseudonymous and unlinkable.</GuaranteeRow>
              <GuaranteeRow icon="flash">Satisfaction is a bounded input (§11) — it never proves votes were freely cast, and it can’t retaliate against you.</GuaranteeRow>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
              <Button variant="filled" size="sm" icon="maine" iconPosition="leading" onClick={() => setStep("geo")}>Verify my location</Button>
            </div>
          </div>
        )}

        {step === "geo" && (
          <div className="grid gap-3">
            <p className="type-caption text-slate-500">Drop a GPS pin where you live. Eligibility = inside grid {sat.gridId} + confidence ≥ 0.6. Try a spot outside the dashed boundary to see it rejected.</p>
            <svg viewBox="0 0 100 100" onClick={place} className="aspect-square w-full cursor-crosshair rounded-2xl border border-border bg-cream-100">
              <defs><pattern id="vgrid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10 0H0V10" fill="none" stroke="var(--blue-900)" strokeOpacity="0.06" strokeWidth="0.4" /></pattern></defs>
              <rect width="100" height="100" fill="url(#vgrid)" />
              <polygon points={polyPoints} fill="var(--blue-700)" fillOpacity="0.1" stroke="var(--blue-700)" strokeWidth="0.8" strokeDasharray="2 1.5" />
              <text x={CENTROID[0]} y={CENTROID[1]} fontSize="4" textAnchor="middle" fill="var(--blue-700)" opacity="0.7">Grid {sat.gridId}</text>
              {pin && (
                <g>
                  <circle cx={pin[0]} cy={pin[1]} r="6" fill="none" stroke={eligible ? "var(--green-600)" : "var(--red-600)"} strokeWidth="0.6" opacity="0.5" />
                  <circle cx={pin[0]} cy={pin[1]} r="2.2" fill={eligible ? "var(--green-600)" : "var(--red-600)"} />
                </g>
              )}
            </svg>
            {pin ? (
              <div className={cn("flex items-center gap-2 rounded-2xl border p-2 type-caption", eligible ? "border-green-500 bg-green-100 text-green-900" : "border-red-400 bg-red-100 text-red-600")}>
                <Icon name={eligible ? "check-circle" : "close"} size="sm" />
                {inside ? `Inside boundary · confidence ${confidence.toFixed(2)}${eligible ? " · eligible to vote" : " · below 0.6 threshold, down-weighted"}` : "Outside grid boundary — ineligible, ballot would be rejected"}
              </div>
            ) : (
              <p className="type-caption text-slate-500">Click the map to drop your pin.</p>
            )}
            <div className="flex justify-between gap-2">
              <Button variant="ghost" size="sm" icon="arrow-left" iconPosition="leading" onClick={() => setStep("context")}>Back</Button>
              <Button variant="filled" size="sm" disabled={!eligible} onClick={() => setStep("rate")}>Continue to rating</Button>
            </div>
          </div>
        )}

        {step === "rate" && (
          <div className="grid gap-3">
            <p className="type-caption text-slate-500">Rate each dimension 1–5. Your individual answers are secret; only the grid aggregate is published and anchored.</p>
            <div className="grid gap-3">
              {sat.dimensions.map((d) => (
                <div key={d} className="grid gap-1">
                  <div className="flex items-center justify-between">
                    <span className="type-label-compact capitalize">{d}</span>
                    <span className="type-caption text-blue-700">{SCALE_LABELS[scores[d]]}</span>
                  </div>
                  <input type="range" min={1} max={5} step={1} value={scores[d]} onChange={(e) => setScores((s) => ({ ...s, [d]: Number(e.target.value) }))} className="accent-blue-900" />
                </div>
              ))}
            </div>
            <div className="grid gap-1">
              <label className="type-label-compact text-slate-500">Optional comment (kept off-chain — never anchored, never public)</label>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={2} placeholder="e.g. the response was quick but the follow-up call never came" className="rounded-2xl border border-border bg-cream-50 p-2 type-caption" />
            </div>
            <div className="flex justify-between gap-2">
              <Button variant="ghost" size="sm" icon="arrow-left" iconPosition="leading" onClick={() => setStep("geo")}>Back</Button>
              <Button
                variant="filled"
                size="sm"
                icon="vote"
                iconPosition="leading"
                disabled={busy}
                onClick={async () => {
                  setBusy(true);
                  await onCast(scores);
                  setBusy(false);
                  setStep("receipt");
                }}
              >
                {busy ? "Casting…" : "Cast secret ballot"}
              </Button>
            </div>
          </div>
        )}

        {step === "receipt" && (
          <div className="grid gap-3">
            <div className="flex items-center gap-2 rounded-2xl border border-green-500 bg-green-100 p-3 text-green-900">
              <Icon name="check-circle" size="md" />
              <div>
                <p className="type-heading-sm">Ballot recorded — secret</p>
                <p className="type-caption">Your individual scores{comment ? " and comment" : ""} are not stored on the ledger. The grid aggregate was recomputed and re-anchored.</p>
              </div>
            </div>
            <div className="grid gap-2 rounded-2xl border border-blue-300 bg-blue-100/50 p-3">
              <div className="flex items-center justify-between">
                <p className="type-label-compact text-blue-700">Grid {sat.gridId} aggregate (public)</p>
                <Badge size="sm" tone="blue" icon="vote" className="type-label-compact">n = {sat.nValid} valid</Badge>
              </div>
              <div className="flex flex-wrap gap-4">
                {sat.dimensions.map((d) => (
                  <div key={d}><p className="type-label-compact capitalize text-slate-500">{d}</p><p className="type-title-sm tabular-nums">{sat.meanScores[d].toFixed(2)}</p></div>
                ))}
              </div>
              <p className="type-label-compact text-slate-500">Confidence distribution</p>
              <div className="grid gap-1">
                {Object.entries(sat.confidenceDistribution).map(([bucket, n]) => (
                  <div key={bucket} className="grid grid-cols-[5rem_1fr_2rem] items-center gap-2">
                    <span className="type-label-compact tabular-nums text-slate-500">{bucket}</span>
                    <div className="h-2 rounded-2xl bg-blue-900/15"><div className="h-full rounded-2xl bg-blue-700" style={{ width: `${(n / maxDist) * 100}%` }} /></div>
                    <span className="type-label-compact tabular-nums">{n}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="type-caption text-slate-500"><strong>What was anchored:</strong> the poll method (boundary, dimensions, window, eligibility) and this aggregate result — so the process and the number are tamper-evident. <strong>What was not:</strong> any individual vote.</p>
            <div className="flex justify-end"><Button variant="soft" size="sm" onClick={onClose}>Done</Button></div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function GuaranteeRow({ icon, children }: { icon: IconName; children: React.ReactNode }) {
  return (
    <div className="flex gap-2">
      <Icon name={icon} size="xs" className="mt-0.5 shrink-0 text-blue-700" />
      <span>{children}</span>
    </div>
  );
}

// ── Revise modal ────────────────────────────────────────────────────────────────

function ReviseModal({ target, onClose, onRevise }: { target: Target; onClose: () => void; onRevise: (to: string) => Promise<void> }) {
  const [to, setTo] = useState("Q1 2027");
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Revise deadline (logged, never silent)</DialogTitle></DialogHeader>
        <p className="type-caption text-slate-500">A revision is a signed, versioned, anchored action by the Evaluation Office. The original stays provable; the card shows both, attributed and timestamped.</p>
        <Field label="Target"><p className="type-body-sm">{target.title}</p></Field>
        <Field label="New deadline">
          <div className="flex gap-2">
            {["Q1 2027", "Q2 2027"].map((opt) => (
              <Button key={opt} size="sm" variant={to === opt ? "filled" : "outline"} onClick={() => setTo(opt)}>{opt}</Button>
            ))}
          </div>
        </Field>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="filled" size="sm" icon="note" iconPosition="leading" onClick={() => onRevise(to)}>Sign &amp; anchor revision</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
