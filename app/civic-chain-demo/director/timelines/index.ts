import type { Timeline } from "./_schema";
import { heroLifecycle } from "./hero-lifecycle";
import { financeOffice } from "./finance-office";
import { auditor } from "./auditor";
import { leadership } from "./leadership";

export { heroLifecycle, financeOffice, auditor, leadership };

export const TIMELINES: Timeline[] = [
  heroLifecycle,
  financeOffice,
  auditor,
  leadership,
];

export const TIMELINE_REGISTRY: Record<string, Timeline> = Object.fromEntries(
  TIMELINES.map((t) => [t.id, t]),
);

export const AUDIENCE_DEFAULTS: Record<string, string> = {
  hero: "hero-lifecycle-loop",
  finance: "finance-office-30m",
  auditor: "auditor-15m",
  leadership: "leadership-10m",
};
