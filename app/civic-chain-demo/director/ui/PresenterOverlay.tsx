"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import type { Beat } from "../timelines/_schema";
import type { DirectorState } from "../director";

type PresenterOverlayProps = {
  ds: DirectorState;
  currentBeat: Beat | undefined;
  nextBeat: Beat | undefined;
  timelineName: string;
  advance: () => void;
  rewind: () => void;
  restart: () => void;
  panic: () => void;
  togglePause: () => void;
  toggleFreeExplore: () => void;
  toggleHud: () => void;
};

function fmt(ms: number) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export function PresenterOverlay({
  ds,
  currentBeat,
  nextBeat,
  timelineName,
  advance,
  rewind,
  restart,
  panic,
  togglePause,
  toggleFreeExplore,
  toggleHud,
}: PresenterOverlayProps) {
  // ── hotkeys ────────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;

      switch (event.key) {
        case " ":
        case "ArrowRight":
          event.preventDefault();
          advance();
          break;
        case "ArrowLeft":
          event.preventDefault();
          rewind();
          break;
        case "p":
        case "P":
          togglePause();
          break;
        case "r":
        case "R":
          restart();
          break;
        case "f":
        case "F":
          toggleFreeExplore();
          break;
        case "h":
        case "H":
          toggleHud();
          break;
        case "Escape":
          panic();
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [advance, rewind, restart, panic, togglePause, toggleFreeExplore, toggleHud]);

  if (!ds.hudVisible) {
    return (
      <button
        type="button"
        onClick={toggleHud}
        aria-label="Show presenter HUD"
        className="fixed bottom-4 right-4 z-[9999] size-7 rounded-full border border-blue-900/20 bg-blue-950/80 text-cream-50/60 text-[11px] font-mono shadow backdrop-blur-sm hover:text-cream-50"
      >
        H
      </button>
    );
  }

  const remaining = currentBeat ? Math.max(0, currentBeat.durationMs - ds.elapsedMs) : 0;
  const progress = currentBeat ? Math.min(1, ds.elapsedMs / currentBeat.durationMs) : 0;

  return (
    <div
      role="complementary"
      aria-label="Presenter HUD"
      className="fixed bottom-4 right-4 z-[9999] w-80 overflow-hidden rounded-xl border border-blue-900/30 bg-blue-950/92 shadow-2xl backdrop-blur-md"
    >
      {/* progress bar */}
      <div className="h-0.5 bg-blue-900/40">
        <div
          className="h-full bg-gold-400 transition-all duration-1000"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="p-4">
        {/* header */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="captions text-cream-50/50">{timelineName}</span>
          <div className="flex items-center gap-1.5">
            {ds.freeExplore ? (
              <span className="rounded-sm bg-gold-400/20 px-1.5 py-0.5 captions font-semibold text-gold-300">FREE</span>
            ) : null}
            {ds.paused ? (
              <span className="rounded-sm bg-blue-700/40 px-1.5 py-0.5 captions font-semibold text-blue-300">PAUSED</span>
            ) : null}
            <button type="button" onClick={toggleHud} className="captions text-cream-50/30 hover:text-cream-50" aria-label="Hide HUD">H</button>
          </div>
        </div>

        {/* current beat */}
        <div className="mb-3 rounded-lg border border-blue-800/50 bg-blue-900/40 p-3">
          <p className="captions text-gold-300/80">{currentBeat?.label ?? "—"}</p>
          <p className="mt-1 body-sm font-medium text-cream-50 leading-snug">
            {currentBeat?.narration ?? "No beat active"}
          </p>
          <div className={cn(
            "mt-2 flex items-center justify-between",
            "captions text-cream-50/40",
          )}>
            <span>{fmt(ds.elapsedMs)}</span>
            {currentBeat?.advance === "auto" ? (
              <span className="text-cream-50/30">auto · −{fmt(remaining)}</span>
            ) : (
              <span className="text-cream-50/30">manual → Space</span>
            )}
          </div>
        </div>

        {/* next beat */}
        {nextBeat ? (
          <div className="mb-3 rounded-lg border border-blue-900/30 bg-blue-950/40 p-2.5">
            <p className="captions text-cream-50/30">Next →</p>
            <p className="captions font-medium text-cream-50/60">{nextBeat.label}</p>
          </div>
        ) : null}

        {/* transport */}
        <div className="flex items-center gap-1">
          <HudBtn onClick={rewind} aria-label="Previous beat">←</HudBtn>
          <HudBtn onClick={togglePause} aria-label={ds.paused ? "Resume" : "Pause"}>
            {ds.paused ? "▶" : "‖"}
          </HudBtn>
          <HudBtn onClick={advance} aria-label="Next beat" className="flex-1 bg-gold-400/10 text-gold-300 hover:bg-gold-400/20">
            Space / →
          </HudBtn>
          <HudBtn onClick={restart} aria-label="Restart">R</HudBtn>
          <HudBtn onClick={panic} aria-label="Panic reset" className="text-red-400 hover:bg-red-900/30">
            Esc
          </HudBtn>
        </div>

        {/* key legend */}
        <p className="mt-2 captions text-cream-50/25 text-center">F free-explore · H hide · Esc panic</p>
      </div>
    </div>
  );
}

function HudBtn({
  children,
  onClick,
  className,
  "aria-label": ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  "aria-label": string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "flex min-w-8 items-center justify-center rounded-md px-2 py-1.5",
        "captions font-medium text-cream-50/60 transition-colors",
        "bg-blue-900/40 hover:bg-blue-800/60 hover:text-cream-50",
        className,
      )}
    >
      {children}
    </button>
  );
}
