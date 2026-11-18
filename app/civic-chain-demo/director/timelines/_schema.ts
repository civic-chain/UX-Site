import type { DemoRoute } from "../../demo-types";
import type { TimedEvent } from "../events";

export type Audience =
  | "finance"
  | "leadership"
  | "auditor"
  | "procurement"
  | "records"
  | "it"
  | "hero";

export type LengthTarget = "5m" | "15m" | "30m" | "60m" | "loop";

export interface Beat {
  id: string;
  label: string;
  section: DemoRoute;
  narration: string;
  durationMs: number;
  advance: "manual" | "auto";
  events: TimedEvent[];
}

export interface Timeline {
  id: string;
  audience: Audience;
  lengthTarget: LengthTarget;
  seed: number;
  beats: Beat[];
}
