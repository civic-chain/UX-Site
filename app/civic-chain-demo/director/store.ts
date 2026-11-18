"use client";

import { createContext, useContext, type Dispatch } from "react";
import type { ClosedPeriod, DemoRoute, Transaction, Tone } from "../demo-types";

// ── anomaly shape used by the Director ─────────────────────────────────────
export type DirectorAnomaly = {
  id: string;
  kind: string;
  vendor: string;
  dept: string;
  detail: string;
  tone: Tone;
  week?: string;
};

// ── the full overlay state ─────────────────────────────────────────────────
export type OverlayState = {
  // navigation — null = free-explore, non-null = Director is driving
  presenterScreen: DemoRoute | null;

  // KPI number overrides (undefined = use static baseline)
  kpiOverrides: Partial<Record<
    "actual" | "encumbered" | "remaining" | "utilized" | "activeFlags" | "mtaBalance",
    number
  >>;

  // live-injected data additions
  extraAnomalies: DirectorAnomaly[];
  extraLedgerRows: Transaction[];

  // contract burn % overrides: id → pct (0-1 float, matching the existing util scale)
  contractBurns: Record<string, number>;

  // connector status overrides: name → display status
  connectorStatus: Record<string, "Connected" | "Error" | "Syncing">;

  // extra anchor-history rows prepended to the governance panel
  extraAnchorRows: ClosedPeriod[];

  // pending verify/tamper — LedgerVerificationPanel picks this up
  pendingVerify: { txId: string; tamper: boolean } | null;

  // presentation chrome
  captions: string[];
  spotlight: { selector: string; label?: string } | null;
};

export const INITIAL_OVERLAY: OverlayState = {
  presenterScreen: null,
  kpiOverrides: {},
  extraAnomalies: [],
  extraLedgerRows: [],
  contractBurns: {},
  connectorStatus: {},
  extraAnchorRows: [],
  pendingVerify: null,
  captions: [],
  spotlight: null,
};

// ── actions ────────────────────────────────────────────────────────────────
export type OverlayAction =
  | { type: "SET_SECTION"; section: DemoRoute }
  | { type: "SET_KPI"; id: keyof OverlayState["kpiOverrides"]; value: number }
  | { type: "APPEND_ANOMALY"; item: DirectorAnomaly }
  | { type: "APPEND_LEDGER"; row: Transaction }
  | { type: "SET_CONTRACT_BURN"; id: string; pct: number }
  | { type: "SET_CONNECTOR"; name: string; status: "Connected" | "Error" | "Syncing" }
  | { type: "APPEND_ANCHOR"; row: ClosedPeriod }
  | { type: "SET_PENDING_VERIFY"; txId: string; tamper: boolean }
  | { type: "CLEAR_PENDING_VERIFY" }
  | { type: "PUSH_CAPTION"; text: string }
  | { type: "SET_SPOTLIGHT"; selector: string; label?: string }
  | { type: "CLEAR_FOCUS" }
  | { type: "RESET"; state: OverlayState };

export function overlayReducer(
  state: OverlayState,
  action: OverlayAction,
): OverlayState {
  switch (action.type) {
    case "SET_SECTION":
      return { ...state, presenterScreen: action.section };
    case "SET_KPI":
      return {
        ...state,
        kpiOverrides: { ...state.kpiOverrides, [action.id]: action.value },
      };
    case "APPEND_ANOMALY":
      return { ...state, extraAnomalies: [...state.extraAnomalies, action.item] };
    case "APPEND_LEDGER":
      return { ...state, extraLedgerRows: [action.row, ...state.extraLedgerRows] };
    case "SET_CONTRACT_BURN":
      return {
        ...state,
        contractBurns: { ...state.contractBurns, [action.id]: action.pct },
      };
    case "SET_CONNECTOR":
      return {
        ...state,
        connectorStatus: { ...state.connectorStatus, [action.name]: action.status },
      };
    case "APPEND_ANCHOR":
      return {
        ...state,
        extraAnchorRows: [action.row, ...state.extraAnchorRows],
      };
    case "SET_PENDING_VERIFY":
      return { ...state, pendingVerify: { txId: action.txId, tamper: action.tamper } };
    case "CLEAR_PENDING_VERIFY":
      return { ...state, pendingVerify: null };
    case "PUSH_CAPTION":
      return { ...state, captions: [action.text] };
    case "SET_SPOTLIGHT":
      return { ...state, spotlight: { selector: action.selector, label: action.label } };
    case "CLEAR_FOCUS":
      return { ...state, spotlight: null, captions: [] };
    case "RESET":
      return action.state;
    default:
      return state;
  }
}

// ── context ────────────────────────────────────────────────────────────────
type OverlayCtx = {
  state: OverlayState;
  dispatch: Dispatch<OverlayAction>;
};

export const OverlayContext = createContext<OverlayCtx>({
  state: INITIAL_OVERLAY,
  dispatch: () => undefined,
});

export function useDemoOverlay() {
  return useContext(OverlayContext).state;
}

export function useDemoDispatch() {
  return useContext(OverlayContext).dispatch;
}
