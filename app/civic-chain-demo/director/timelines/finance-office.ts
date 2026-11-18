import type { Timeline } from "./_schema";

// 30-minute finance office track — presenter-driven, manual advance
// Tyler Munis feed defaults to Connected (see h-connector beat)
export const financeOffice: Timeline = {
  id: "finance-office-30m",
  audience: "finance",
  lengthTarget: "30m",
  seed: 3001,
  beats: [
    {
      id: "fo-1",
      label: "Overview — Account Position",
      section: "overview",
      advance: "manual",
      durationMs: 180_000,
      narration:
        "This is your cash reality. $8.42M in the Municipal Treasury Account — 70% allocated, 30% available. Six anomaly flags waiting in the queue.",
      events: [
        { atMs: 0, type: "SET_SECTION", section: "overview" },
        {
          atMs: 500,
          type: "CAPTION",
          text: "Town of Any Town, ME · FY2026 · $8.42M MTA",
        },
      ],
    },
    {
      id: "fo-2",
      label: "Budget Analytics — General Fund",
      section: "budget",
      advance: "manual",
      durationMs: 180_000,
      narration:
        "Your exact mental model — appropriation table, fund toggle, and it keeps encumbrances live. Switch to General Fund: $9.6M appropriated, $7.1M spent.",
      events: [
        { atMs: 0, type: "SET_SECTION", section: "budget" },
        {
          atMs: 800,
          type: "CAPTION",
          text: "General Fund · $9.6M appropriated · $7.1M actual",
        },
      ],
    },
    {
      id: "fo-3",
      label: "Anomaly Center — the catch",
      section: "anomalies",
      advance: "manual",
      durationMs: 240_000,
      narration:
        "The things you find by luck in November — we surface them in March. Route 1 Diner on a library card. Irving Oil duplicate within 48 hours.",
      events: [
        { atMs: 0, type: "SET_SECTION", section: "anomalies" },
        {
          atMs: 600,
          type: "ANOMALY_RAISE",
          flag: {
            id: "FO-A1",
            vendor: "Route 1 Diner",
            kind: "Suspicious MCC",
            detail: "MCC 5812 (restaurant) on library card — requires review",
            tone: "pending",
            dept: "Public Library",
          },
        },
        {
          atMs: 2_000,
          type: "ANOMALY_RAISE",
          flag: {
            id: "FO-A2",
            vendor: "Irving Oil, Bath ME",
            kind: "Duplicate Payment",
            detail: "Identical amount + memo within 48 h",
            tone: "spike",
            dept: "Public Works",
          },
        },
        { atMs: 2_400, type: "KPI_TWEEN", id: "activeFlags", to: 8, ms: 500 },
        {
          atMs: 3_000,
          type: "CAPTION",
          text: "Both flagged automatically — no manual review needed",
        },
      ],
    },
    {
      id: "fo-4",
      label: "Ledger — proof layer",
      section: "ledger",
      advance: "manual",
      durationMs: 120_000,
      narration:
        "Here's the proof layer — mention it, don't dwell. Every payment carries a ledger fingerprint.",
      events: [
        { atMs: 0, type: "SET_SECTION", section: "ledger" },
        { atMs: 800, type: "VERIFY_RUN", txId: "TX-480102" },
        {
          atMs: 1_500,
          type: "CAPTION",
          text: "VERIFIED — the record matches its anchor",
        },
      ],
    },
    {
      id: "fo-5",
      label: "Contracts — ceiling drift",
      section: "contracts",
      advance: "manual",
      durationMs: 180_000,
      narration:
        "Where small-town books actually drift. Sealant Materials is at 94% — Near Ceiling. This is where you catch it before month-end surprises.",
      events: [
        { atMs: 0, type: "SET_SECTION", section: "contracts" },
        { atMs: 600, type: "CONTRACT_BURN", id: "CON-2025-035", toPct: 94 },
        {
          atMs: 1_200,
          type: "CAPTION",
          text: "CON-2025-035 · Sealant Materials · 94% of ceiling",
        },
      ],
    },
    {
      id: "fo-6",
      label: "Administration — warrant close",
      section: "admin",
      advance: "manual",
      durationMs: 180_000,
      narration:
        "The warrant-close ritual, digitized. March closes now — 44 records, signed by Dana Whitfield, anchored to the public ledger.",
      events: [
        { atMs: 0, type: "SET_SECTION", section: "admin" },
        { atMs: 800, type: "ANCHOR_CLOSE", period: "Mar 2026" },
        {
          atMs: 1_600,
          type: "CAPTION",
          text: "Mar 2026 sealed · 44 records · Dana Whitfield",
        },
      ],
    },
    {
      id: "fo-7",
      label: "Roadmap honesty beat",
      section: "admin",
      advance: "manual",
      durationMs: 60_000,
      narration:
        "One thing to name: ERP reconciliation tie-out to Munis is on the roadmap. We show the feed status, not the reconciliation — that's Phase 2.",
      events: [
        {
          atMs: 0,
          type: "CAPTION",
          text: "ROADMAP · ERP reconciliation tie-out — Phase 2",
        },
      ],
    },
  ],
};
