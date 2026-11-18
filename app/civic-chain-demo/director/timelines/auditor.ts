import type { Timeline } from "./_schema";

// 15–20 minute auditor track — lead with on-chain, presenter-driven
export const auditor: Timeline = {
  id: "auditor-15m",
  audience: "auditor",
  lengthTarget: "15m",
  seed: 4040,
  beats: [
    {
      id: "au-1",
      label: "Ledger — control test",
      section: "ledger",
      advance: "manual",
      durationMs: 180_000,
      narration:
        "A control test you run yourself. Verify TX-480102 — the fingerprint matches. Now enable tamper mode — change one cent. It fails. That's your ITPGc evidence.",
      events: [
        { atMs: 0, type: "SET_SECTION", section: "ledger" },
        { atMs: 800, type: "VERIFY_RUN", txId: "TX-480102" },
        {
          atMs: 1_500,
          type: "CAPTION",
          text: "VERIFIED · TX-480102 · fingerprints match",
        },
        { atMs: 6_000, type: "TAMPER_RUN", txId: "TX-480102" },
        {
          atMs: 7_000,
          type: "CAPTION",
          text: "MISMATCH · tampered record cannot pass",
        },
      ],
    },
    {
      id: "au-2",
      label: "Administration — anchor history",
      section: "admin",
      advance: "manual",
      durationMs: 120_000,
      narration:
        "Months sealed, by whom, with a hash. This is your close-of-period evidence — date, signer, record count, ledger transaction.",
      events: [
        { atMs: 0, type: "SET_SECTION", section: "admin" },
        {
          atMs: 600,
          type: "CAPTION",
          text: "Close-of-period evidence · Nov 2025 – Feb 2026",
        },
      ],
    },
    {
      id: "au-3",
      label: "Contracts — per-payment proof hash",
      section: "contracts",
      advance: "manual",
      durationMs: 150_000,
      narration:
        "Trace a sample to immutable support. CON-2025-035 Sealant Materials — each payment in the trail has a proof hash. Pull the hash, run the verify, done.",
      events: [
        { atMs: 0, type: "SET_SECTION", section: "contracts" },
        {
          atMs: 500,
          type: "CAPTION",
          text: "CON-2025-035 · per-payment proof hashes",
        },
      ],
    },
    {
      id: "au-4",
      label: "Anomaly Center — operating effectiveness",
      section: "anomalies",
      advance: "manual",
      durationMs: 120_000,
      narration:
        "Test it for operating effectiveness. Six flags — two spend spikes, two duplicates, one outlier, one suspicious MCC. All automatically detected, none required a tip.",
      events: [
        { atMs: 0, type: "SET_SECTION", section: "anomalies" },
        {
          atMs: 600,
          type: "CAPTION",
          text: "Exception monitoring · 6 flags · 0 manual tips required",
        },
      ],
    },
    {
      id: "au-5",
      label: "Administration — segregation of duties",
      section: "admin",
      advance: "manual",
      durationMs: 120_000,
      narration:
        "Segregation of duties, on screen. Two administrators, two finance roles, external auditor at viewer level. Role changes are signed and logged.",
      events: [
        { atMs: 0, type: "SET_SECTION", section: "admin" },
        {
          atMs: 500,
          type: "CAPTION",
          text: "Users & Roles · 8 members · external auditor at Viewer",
        },
      ],
    },
    {
      id: "au-6",
      label: "Query Terminal — pull a sample",
      section: "query",
      advance: "manual",
      durationMs: 90_000,
      narration:
        "Pull and document a sample in 42 milliseconds. Top-5 vendors by spend — export to CSV, attach to workpapers.",
      events: [
        { atMs: 0, type: "SET_SECTION", section: "query" },
        { atMs: 700, type: "QUERY_RUN", promptId: "top-5-vendors" },
        {
          atMs: 1_200,
          type: "CAPTION",
          text: "Top-5 vendors · 42 ms · CSV export ready",
        },
      ],
    },
  ],
};
