"use client";

import { useReducer, useRef, useEffect, useState, type ReactNode } from "react";

import {
  OverlayContext,
  overlayReducer,
  INITIAL_OVERLAY,
  type OverlayState,
} from "./store";
import { useDirector } from "./director";
import { useAmbientEngine } from "./ambient";
import { PresenterOverlay } from "./ui/PresenterOverlay";
import { Caption } from "./ui/Caption";
import { Spotlight } from "./ui/Spotlight";

import { TIMELINE_REGISTRY, AUDIENCE_DEFAULTS } from "./timelines/index";
import type { Timeline } from "./timelines/_schema";

// ── inner — only mounts when ?present=1 ───────────────────────────────────
function PresentingLayer({
  timeline,
  dispatch,
  state,
  snapshotRef,
}: {
  timeline: Timeline;
  dispatch: React.Dispatch<Parameters<typeof overlayReducer>[1]>;
  state: OverlayState;
  snapshotRef: React.MutableRefObject<OverlayState>;
}) {
  const director = useDirector(timeline, dispatch, snapshotRef);

  useAmbientEngine(
    timeline.seed,
    dispatch,
    director.ds.paused,
    director.ds.suppressAmbient || director.ds.freeExplore,
  );

  const caption = state.captions[state.captions.length - 1] ?? null;

  return (
    <>
      <PresenterOverlay
        ds={director.ds}
        currentBeat={director.currentBeat}
        nextBeat={director.nextBeat}
        timelineName={timeline.id}
        advance={director.advance}
        rewind={director.rewind}
        restart={director.restart}
        panic={director.panic}
        togglePause={director.togglePause}
        toggleFreeExplore={director.toggleFreeExplore}
        toggleHud={director.toggleHud}
      />
      <Caption text={caption} />
      <Spotlight selector={state.spotlight?.selector ?? null} label={state.spotlight?.label} />
    </>
  );
}

// ── root provider ──────────────────────────────────────────────────────────
// alwaysPresenting: pass true from a dedicated presenter route so the layer
// mounts immediately without any query-param detection.
export function DemoProvider({
  children,
  alwaysPresenting = false,
}: {
  children: ReactNode;
  alwaysPresenting?: boolean;
}) {
  // Unset until the URL has been read. Starting on the hero default meant its
  // first beat ran (and posted its payment) before ?audience= switched tracks,
  // so every other timeline opened on the wrong page with a stray ledger row.
  const [timelineId, setTimelineId] = useState<string | null>(null);

  // Read ?audience= / ?track= from the URL after mount.
  // useSearchParams() is unreliable with static export — the pre-built HTML
  // ships with empty params so the hook sees nothing on first render.
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const track = sp.get("track") ?? "";
    const audience = sp.get("audience") ?? "";
    const id = track || AUDIENCE_DEFAULTS[audience] || AUDIENCE_DEFAULTS["hero"];
    setTimelineId(id);
  }, []);

  const timeline = timelineId === null ? null : TIMELINE_REGISTRY[timelineId] ?? Object.values(TIMELINE_REGISTRY)[0];

  const [state, dispatch] = useReducer(overlayReducer, INITIAL_OVERLAY);
  const snapshotRef = useRef<OverlayState>(INITIAL_OVERLAY);

  return (
    <OverlayContext.Provider value={{ state, dispatch }}>
      {children}
      {alwaysPresenting && timeline ? (
        <PresentingLayer
          timeline={timeline}
          dispatch={dispatch}
          state={state}
          snapshotRef={snapshotRef}
        />
      ) : null}
    </OverlayContext.Provider>
  );
}
