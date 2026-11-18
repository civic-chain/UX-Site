"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Dispatch } from "react";
import type { Timeline, Beat } from "./timelines/_schema";
import type { DemoEvent } from "./events";
import type { OverlayAction, OverlayState } from "./store";
import { buildLedgerRow } from "./events";
import { INITIAL_OVERLAY } from "./store";

export type DirectorState = {
  beatIndex: number;
  paused: boolean;
  freeExplore: boolean;
  hudVisible: boolean;
  elapsedMs: number;
  suppressAmbient: boolean;
};

const SUPPRESS_EVENTS = new Set(["VERIFY_RUN", "TAMPER_RUN", "ANOMALY_RAISE", "ANCHOR_CLOSE"]);

function applyEvent(
  event: DemoEvent,
  dispatch: Dispatch<OverlayAction>,
) {
  switch (event.type) {
    case "SET_SECTION":
      dispatch({ type: "SET_SECTION", section: event.section });
      break;

    case "KPI_TWEEN":
      dispatch({ type: "SET_KPI", id: event.id as keyof OverlayState["kpiOverrides"], value: event.to });
      break;

    case "LEDGER_APPEND":
      dispatch({ type: "APPEND_LEDGER", row: buildLedgerRow(event.row) });
      break;

    case "ANOMALY_RAISE":
      dispatch({ type: "APPEND_ANOMALY", item: event.flag });
      dispatch({ type: "SET_KPI", id: "activeFlags", value: 7 });
      break;

    case "CONTRACT_BURN":
      // toPct in the event is 0-100; store expects 0-1 float
      dispatch({ type: "SET_CONTRACT_BURN", id: event.id, pct: event.toPct / 100 });
      break;

    case "CONTRACT_PAYMENT":
      // Treat as a ledger append to the relevant contract vendor
      if (event.row.id && event.row.amount !== undefined) {
        dispatch({
          type: "APPEND_LEDGER",
          row: buildLedgerRow({
            id: event.row.id,
            vendor: "",
            amount: event.row.amount,
          }),
        });
      }
      break;

    case "FEED_STATUS":
      dispatch({ type: "SET_CONNECTOR", name: event.connector, status: event.status });
      break;

    case "VERIFY_RUN":
      dispatch({ type: "SET_SECTION", section: "ledger" });
      dispatch({ type: "SET_PENDING_VERIFY", txId: event.txId, tamper: false });
      break;

    case "TAMPER_RUN":
      dispatch({ type: "SET_SECTION", section: "ledger" });
      dispatch({ type: "SET_PENDING_VERIFY", txId: event.txId, tamper: true });
      break;

    case "ANCHOR_CLOSE":
      dispatch({
        type: "APPEND_ANCHOR",
        row: {
          monthKey: event.period,
          closedAt: new Date().toISOString().split("T")[0],
          closedBy: "Dana Whitfield",
          records: 44,
          stellarTx: `DEMO${Date.now().toString(16).toUpperCase().slice(-10)}`,
        },
      });
      break;

    case "CAPTION":
      dispatch({ type: "PUSH_CAPTION", text: event.text });
      break;

    case "SPOTLIGHT":
      dispatch({ type: "SET_SPOTLIGHT", selector: event.selector, label: event.label });
      break;

    case "CLEAR_FOCUS":
      dispatch({ type: "CLEAR_FOCUS" });
      break;

    default:
      break;
  }
}

export function useDirector(
  timeline: Timeline,
  dispatch: Dispatch<OverlayAction>,
  snapshotRef: React.MutableRefObject<OverlayState>,
) {
  const [ds, setDs] = useState<DirectorState>({
    beatIndex: 0,
    paused: false,
    freeExplore: false,
    hudVisible: true,
    elapsedMs: 0,
    suppressAmbient: false,
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const eventTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const elapsedTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (elapsedTimer.current) clearInterval(elapsedTimer.current);
    for (const t of eventTimers.current) clearTimeout(t);
    eventTimers.current = [];
  }, []);

  const applyBeat = useCallback(
    (beat: Beat) => {
      const hasSuppressor = beat.events.some((ev) => SUPPRESS_EVENTS.has(ev.type));
      setDs((prev) => ({ ...prev, suppressAmbient: hasSuppressor }));

      for (const ev of beat.events) {
        if (ev.type === "WAIT") continue;
        const t = setTimeout(() => applyEvent(ev, dispatch), ev.atMs);
        eventTimers.current.push(t);
      }

      if (beat.advance === "auto") {
        timerRef.current = setTimeout(() => {
          advance();
        }, beat.durationMs);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );

  const advance = useCallback(() => {
    setDs((prev) => {
      const next = prev.beatIndex + 1;
      const loops = next >= timeline.beats.length;
      const nextIdx = loops ? 0 : next;

      if (loops) {
        // loop — restore overlay to snapshot baseline
        dispatch({ type: "RESET", state: snapshotRef.current });
      }

      clearTimers();
      const beat = timeline.beats[nextIdx];
      if (beat) applyBeat(beat);

      return {
        ...prev,
        beatIndex: nextIdx,
        elapsedMs: 0,
        suppressAmbient: false,
      };
    });
  }, [applyBeat, clearTimers, dispatch, snapshotRef, timeline.beats]);

  const rewind = useCallback(() => {
    setDs((prev) => {
      const nextIdx = Math.max(0, prev.beatIndex - 1);
      clearTimers();
      dispatch({ type: "RESET", state: snapshotRef.current });
      const beat = timeline.beats[nextIdx];
      if (beat) applyBeat(beat);
      return { ...prev, beatIndex: nextIdx, elapsedMs: 0, suppressAmbient: false };
    });
  }, [applyBeat, clearTimers, dispatch, snapshotRef, timeline.beats]);

  const restart = useCallback(() => {
    clearTimers();
    dispatch({ type: "RESET", state: snapshotRef.current });
    setDs({
      beatIndex: 0,
      paused: false,
      freeExplore: false,
      hudVisible: true,
      elapsedMs: 0,
      suppressAmbient: false,
    });
    const beat = timeline.beats[0];
    if (beat) applyBeat(beat);
  }, [applyBeat, clearTimers, dispatch, snapshotRef, timeline.beats]);

  const panic = useCallback(() => {
    clearTimers();
    dispatch({ type: "RESET", state: snapshotRef.current });
    dispatch({ type: "SET_SECTION", section: "overview" });
    dispatch({ type: "CLEAR_FOCUS" });
    setDs({
      beatIndex: 0,
      paused: false,
      freeExplore: false,
      hudVisible: true,
      elapsedMs: 0,
      suppressAmbient: false,
    });
  }, [clearTimers, dispatch, snapshotRef]);

  const togglePause = useCallback(() => {
    setDs((prev) => ({ ...prev, paused: !prev.paused }));
  }, []);

  const toggleFreeExplore = useCallback(() => {
    setDs((prev) => ({ ...prev, freeExplore: !prev.freeExplore }));
  }, []);

  const toggleHud = useCallback(() => {
    setDs((prev) => ({ ...prev, hudVisible: !prev.hudVisible }));
  }, []);

  const jumpToAudience = useCallback((trackId: string) => {
    clearTimers();
    dispatch({ type: "RESET", state: snapshotRef.current });
    setDs((prev) => ({
      ...prev,
      beatIndex: 0,
      elapsedMs: 0,
      suppressAmbient: false,
    }));
    const beat = timeline.beats.find((b) => b.id.startsWith(trackId)) ?? timeline.beats[0];
    if (beat) applyBeat(beat);
  }, [applyBeat, clearTimers, dispatch, snapshotRef, timeline.beats]);

  // Boot — apply first beat on mount
  useEffect(() => {
    const beat = timeline.beats[0];
    if (beat) applyBeat(beat);
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Elapsed ticker
  useEffect(() => {
    if (ds.paused) return;
    elapsedTimer.current = setInterval(() => {
      setDs((prev) => ({ ...prev, elapsedMs: prev.elapsedMs + 1000 }));
    }, 1000);
    return () => {
      if (elapsedTimer.current) clearInterval(elapsedTimer.current);
    };
  }, [ds.paused]);

  const currentBeat: Beat | undefined = timeline.beats[ds.beatIndex];
  const nextBeat: Beat | undefined = timeline.beats[ds.beatIndex + 1];

  return {
    ds,
    currentBeat,
    nextBeat,
    advance,
    rewind,
    restart,
    panic,
    togglePause,
    toggleFreeExplore,
    toggleHud,
    jumpToAudience,
  };
}
