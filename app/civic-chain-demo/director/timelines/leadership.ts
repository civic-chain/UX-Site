import type { Timeline } from "./_schema";

// 5–10 minute leadership track — three numbers + trust link
export const leadership: Timeline = {
  id: "leadership-10m",
  audience: "leadership",
  lengthTarget: "5m",
  seed: 2020,
  beats: [
    {
      id: "ldr-1",
      label: "Overview — three numbers",
      section: "overview",
      advance: "manual",
      durationMs: 120_000,
      narration:
        "Three numbers: $11.5M appropriated, $8.5M spent, 74% utilized. Six flags caught automatically. No manual review triggered any of them.",
      events: [
        { atMs: 0, type: "SET_SECTION", section: "overview" },
        {
          atMs: 500,
          type: "CAPTION",
          text: "FY2026 · $11.5M budget · 74% utilized · 6 flags",
        },
      ],
    },
    {
      id: "ldr-2",
      label: "Departments — the 'why'",
      section: "dept",
      advance: "manual",
      durationMs: 120_000,
      narration:
        "The 'why' behind the 3 at-risk. Road Improvement Program is 100% — a crack-seal contract blew past ceiling. Waterfront Reconstruction is on track at 67%.",
      events: [
        { atMs: 0, type: "SET_SECTION", section: "dept" },
        {
          atMs: 600,
          type: "CAPTION",
          text: "Road Improvement Program · 100% · ceiling breach",
        },
      ],
    },
    {
      id: "ldr-3",
      label: "Anomaly — risk insurance",
      section: "anomalies",
      advance: "manual",
      durationMs: 90_000,
      narration:
        "One flag as risk insurance. Axon Enterprise — 6× the 90-day median for body-cam equipment. Caught automatically. Here's the paper trail.",
      events: [
        { atMs: 0, type: "SET_SECTION", section: "anomalies" },
        {
          atMs: 500,
          type: "CAPTION",
          text: "Axon Enterprise · 6× 90-day median · auto-flagged",
        },
      ],
    },
    {
      id: "ldr-4",
      label: "Ledger — the trust link",
      section: "ledger",
      advance: "manual",
      durationMs: 90_000,
      narration:
        "The trust link: anyone can verify any payment record against a public ledger. This is what makes the numbers defensible in a room full of skeptics.",
      events: [
        { atMs: 0, type: "SET_SECTION", section: "ledger" },
        { atMs: 700, type: "VERIFY_RUN", txId: "TX-480102" },
        {
          atMs: 1_400,
          type: "CAPTION",
          text: "VERIFIED · public proof · anyone can check",
        },
      ],
    },
  ],
};
