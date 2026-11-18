import type { Timeline } from "./_schema";

// 60-second autoplay loop — lobby display and 5-min flyby background
export const heroLifecycle: Timeline = {
  id: "hero-lifecycle-loop",
  audience: "hero",
  lengthTarget: "loop",
  seed: 1776,
  beats: [
    {
      id: "h1",
      label: "A payment lands",
      section: "ledger",
      advance: "auto",
      durationMs: 10_000,
      narration: "A vendor just got paid. Watch what happens.",
      events: [
        { atMs: 0, type: "SET_SECTION", section: "ledger" },
        {
          atMs: 600,
          type: "LEDGER_APPEND",
          row: {
            id: "TX-480210",
            vendor: "Coastal Road Services",
            category: "Road Services",
            dept: "Public Works",
            amount: 26_300,
          },
        },
        {
          atMs: 1_200,
          type: "CAPTION",
          text: "Payment posted — Coastal Road Services, $26,300",
        },
      ],
    },
    {
      id: "h2",
      label: "The system catches it",
      section: "anomalies",
      advance: "auto",
      durationMs: 10_000,
      narration: "In real time, the platform flags it — 8.2× the 90-day median.",
      events: [
        { atMs: 300, type: "SET_SECTION", section: "anomalies" },
        {
          atMs: 800,
          type: "ANOMALY_RAISE",
          flag: {
            id: "F7",
            vendor: "Coastal Road Services",
            kind: "Spend Spike",
            detail: "8.2× 90-day median for Road Services",
            tone: "spike",
            dept: "Public Works",
            week: "W13",
          },
        },
        { atMs: 1_200, type: "KPI_TWEEN", id: "activeFlags", to: 7, ms: 400 },
        {
          atMs: 1_600,
          type: "CAPTION",
          text: "Flagged automatically — no one had to go looking",
        },
      ],
    },
    {
      id: "h3",
      label: "Anyone can prove it",
      section: "ledger",
      advance: "auto",
      durationMs: 10_000,
      narration: "And anyone can prove the record is real — here's the integrity check.",
      events: [
        { atMs: 300, type: "SET_SECTION", section: "ledger" },
        { atMs: 900, type: "VERIFY_RUN", txId: "TX-480210" },
        {
          atMs: 1_400,
          type: "CAPTION",
          text: "VERIFIED — fingerprints match the anchor",
        },
      ],
    },
    {
      id: "h4",
      label: "…and prove when it is not",
      section: "ledger",
      advance: "auto",
      durationMs: 9_000,
      narration: "Change one cent, and it fails loudly.",
      events: [
        { atMs: 300, type: "TAMPER_RUN", txId: "TX-480210" },
        {
          atMs: 1_200,
          type: "CAPTION",
          text: "MISMATCH — the tampered record cannot pass",
        },
      ],
    },
    {
      id: "h5",
      label: "Tied to its contract",
      section: "contracts",
      advance: "auto",
      durationMs: 11_000,
      narration: "Every dollar ties back to the contract it came from.",
      events: [
        { atMs: 300, type: "SET_SECTION", section: "contracts" },
        {
          atMs: 800,
          type: "CONTRACT_PAYMENT",
          id: "CON-2026-014",
          row: { id: "TX-480210", amount: 26_300 },
          proofHash: "9F31C2A7",
        },
        { atMs: 1_300, type: "CONTRACT_BURN", id: "CON-2026-014", toPct: 88 },
        {
          atMs: 1_800,
          type: "CAPTION",
          text: "Posted to its contract with an on-chain proof hash",
        },
      ],
    },
    {
      id: "h6",
      label: "Sealed at month close",
      section: "admin",
      advance: "auto",
      durationMs: 10_000,
      narration:
        "At month close, it's sealed on a public ledger. Sixty seconds, start to finish.",
      events: [
        { atMs: 300, type: "SET_SECTION", section: "admin" },
        { atMs: 900, type: "ANCHOR_CLOSE", period: "Mar 2026" },
        {
          atMs: 1_500,
          type: "CAPTION",
          text: "Close of period anchored — immutable from here",
        },
        { atMs: 8_000, type: "CLEAR_FOCUS" },
      ],
    },
  ],
};
