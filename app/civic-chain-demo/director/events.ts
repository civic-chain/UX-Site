import type { DemoRoute, Transaction } from "../demo-types";
import type { DirectorAnomaly } from "./store";

// ── event vocabulary ───────────────────────────────────────────────────────
export type DemoEvent =
  | { type: "SET_SECTION"; section: DemoRoute }
  | { type: "KPI_TWEEN"; id: string; to: number; ms: number }
  | { type: "LEDGER_APPEND"; row: Partial<Transaction> & { id: string; vendor: string; amount: number } }
  | { type: "ANOMALY_RAISE"; flag: DirectorAnomaly }
  | { type: "CONTRACT_BURN"; id: string; toPct: number }
  | { type: "CONTRACT_PAYMENT"; id: string; row: { id?: string; amount?: number }; proofHash: string }
  | { type: "DONUT_SHIFT"; chartId: string; deltas: Record<string, number> }
  | { type: "FEED_STATUS"; connector: string; status: "Connected" | "Error" }
  | { type: "VERIFY_RUN"; txId: string }
  | { type: "TAMPER_RUN"; txId: string }
  | { type: "ANCHOR_CLOSE"; period: string }
  | { type: "QUERY_RUN"; promptId: string }
  | { type: "SPOTLIGHT"; selector: string; label?: string }
  | { type: "CAPTION"; text: string }
  | { type: "CLEAR_FOCUS" }
  | { type: "WAIT"; ms: number };

export type TimedEvent = DemoEvent & { atMs: number };

// ── synthetic transaction builder ──────────────────────────────────────────
let syntheticIdx = 480_200;
export function buildLedgerRow(
  partial: Partial<Transaction> & { id: string; vendor: string; amount: number },
): Transaction {
  const idx = syntheticIdx++;
  const now = new Date().toISOString().split("T")[0];
  return {
    id: partial.id,
    date: partial.date ?? now,
    vendor: partial.vendor,
    category: partial.category ?? "Services",
    dept: partial.dept ?? "General Government & Administration",
    amount: partial.amount,
    anchor: "pending",
    anomaly: partial.anomaly ?? null,
    mcc: partial.mcc ?? 1711,
    sha256: `synthetic-${idx}`,
    fingerprint: `synth-${partial.id.slice(-8)}-${idx}`,
    ledgerTx: `SYN${idx.toString(16).toUpperCase()}`,
    block: 1_245_000 + idx,
    ts: `${partial.date ?? now}T14:00:00Z`,
  };
}
