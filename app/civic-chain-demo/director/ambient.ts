"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Dispatch } from "react";
import type { OverlayAction } from "./store";
import { mulberry32 } from "./rng";

// Ambient rows that cycle in the Ledger Explorer — a fixed ring of 8 plausible entries
const AMBIENT_LEDGER_RING = [
  { txId: "TX-AMB-001", vendor: "Central Maine Power", category: "Utilities", dept: "General Government & Administration", amount: 840 },
  { txId: "TX-AMB-002", vendor: "NAPA Auto Parts", category: "Equipment", dept: "Public Works", amount: 127 },
  { txId: "TX-AMB-003", vendor: "Irving Oil, Bath ME", category: "Fuel", dept: "Police Department", amount: 312 },
  { txId: "TX-AMB-004", vendor: "W.B. Mason", category: "Supplies", dept: "General Government & Administration", amount: 89 },
  { txId: "TX-AMB-005", vendor: "Dead River Company", category: "Fuel", dept: "Fire & Rescue / EMS", amount: 498 },
  { txId: "TX-AMB-006", vendor: "Galls LLC", category: "Public Safety Supplies", dept: "Police Department", amount: 220 },
  { txId: "TX-AMB-007", vendor: "Bound Tree Medical", category: "Public Safety Supplies", dept: "Fire & Rescue / EMS", amount: 175 },
  { txId: "TX-AMB-008", vendor: "BSN Sports", category: "Supplies", dept: "Parks & Recreation", amount: 310 },
] as const;

// Ambient anomalies pool — cycles, never invents
const AMBIENT_ANOMALY_POOL = [
  { id: "AMB-AX-1", kind: "Spend Spike", vendor: "Axon Enterprise", dept: "Police Department", detail: "6× 90-day median", tone: "spike" as const },
  { id: "AMB-CR-1", kind: "Duplicate Payment", vendor: "Bound Tree Medical", dept: "Fire & Rescue / EMS", detail: "Identical amount within 48 h", tone: "spike" as const },
] as const;

const AMBIENT_TICK_MS = 6_000;
const AMBIENT_MAX_DRIFT_KPI = 40_000;   // ytd actual drifts at most this much
const AMBIENT_MAX_FLAGS = 8;

export function useAmbientEngine(
  seed: number,
  dispatch: Dispatch<OverlayAction>,
  paused: boolean,
  suppressAmbient: boolean,
) {
  const rng = useRef(mulberry32(seed));
  const ledgerIdx = useRef(0);
  const anomalyIdx = useRef(0);
  const kpiDrift = useRef(0);
  const activeFlags = useRef(6);
  const tickRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stop = useCallback(() => {
    if (tickRef.current !== null) {
      clearTimeout(tickRef.current);
      tickRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    if (paused || suppressAmbient) return;
    const r = rng.current();

    // ~33% chance: append a ledger row
    if (r < 0.33) {
      const row = AMBIENT_LEDGER_RING[ledgerIdx.current % AMBIENT_LEDGER_RING.length];
      ledgerIdx.current += 1;
      const rowId = `TX-AMB-${ledgerIdx.current}-${Date.now()}`;
      dispatch({
        type: "APPEND_LEDGER",
        row: {
          id: rowId,
          date: new Date().toISOString().split("T")[0],
          vendor: row.vendor,
          category: row.category,
          dept: row.dept,
          amount: row.amount,
          anchor: "pending",
          anomaly: null,
          mcc: 4900,
          sha256: `amb-${ledgerIdx.current}`,
          fingerprint: `amb-${ledgerIdx.current}`,
          ledgerTx: `AMB${ledgerIdx.current.toString(16).toUpperCase()}`,
          block: 1_246_000 + ledgerIdx.current,
          ts: `${new Date().toISOString().split("T")[0]}T14:00:00Z`,
        },
      });
    }

    // ~15% chance: nudge ytd KPI (bounded)
    if (r > 0.70 && kpiDrift.current < AMBIENT_MAX_DRIFT_KPI) {
      const nudge = Math.floor(rng.current() * 800 + 200);
      kpiDrift.current += nudge;
      dispatch({ type: "SET_KPI", id: "actual", value: 8_549_000 + kpiDrift.current });
    }

    // ~10% chance: raise an anomaly from pool (if below cap)
    if (r > 0.90 && activeFlags.current < AMBIENT_MAX_FLAGS) {
      const anomaly = AMBIENT_ANOMALY_POOL[anomalyIdx.current % AMBIENT_ANOMALY_POOL.length];
      anomalyIdx.current += 1;
      activeFlags.current += 1;
      dispatch({ type: "APPEND_ANOMALY", item: { ...anomaly, id: `${anomaly.id}-${Date.now()}` } });
      dispatch({ type: "SET_KPI", id: "activeFlags", value: activeFlags.current });
    }
  }, [dispatch, paused, suppressAmbient]);

  useEffect(() => {
    const schedule = () => {
      const jitter = Math.floor(rng.current() * 2000);
      tickRef.current = setTimeout(() => {
        tick();
        schedule();
      }, AMBIENT_TICK_MS + jitter);
    };
    schedule();
    return stop;
  }, [tick, stop]);

  // Reset ambient counters when seed changes (restart)
  useEffect(() => {
    rng.current = mulberry32(seed);
    ledgerIdx.current = 0;
    anomalyIdx.current = 0;
    kpiDrift.current = 0;
    activeFlags.current = 6;
  }, [seed]);
}
