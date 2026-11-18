"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";

const PASSWORD = "present2026";

const TRACKS = [
  {
    id: "hero",
    label: "Hero Loop",
    persona: "Lobby / Flyby",
    duration: "60 s · autoplay",
    color: "blue" as const,
    desc:
      "Full lifecycle in 60 seconds — payment lands, anomaly flagged, on-chain verify, tamper proof, contract burn, period anchor. Runs on loop. Best for unattended screens or a quick live flyby.",
    beats: ["Payment posted", "Flag raised", "Verify", "Tamper", "Contract burn", "Anchor close"],
  },
  {
    id: "finance",
    label: "Finance Office",
    persona: "Finance Director / CFO",
    duration: "30 min · manual",
    color: "gold" as const,
    desc:
      "Walks through budget health, vendor spend anomalies, ledger verification, contract utilization, and period close. Includes a roadmap-honesty beat for credibility.",
    beats: ["Budget overview", "Anomaly triage", "Ledger verify", "Contract burn", "Anchor close", "Roadmap Q&A"],
  },
  {
    id: "auditor",
    label: "Auditor Track",
    persona: "State Auditor / Comptroller",
    duration: "15 min · manual",
    color: "slate" as const,
    desc:
      "Opens directly on on-chain verification and tamper detection. Walks through anomaly flags with evidence, then sealed period close with Stellar anchor hash.",
    beats: ["On-chain verify", "Tamper detection", "Anomaly evidence", "Connector feeds", "Anchor proof"],
  },
  {
    id: "leadership",
    label: "Leadership",
    persona: "Mayor / Town Manager / Board",
    duration: "10 min · manual",
    color: "green" as const,
    desc:
      "Plain-language overview — what the platform does, why it matters, what it costs. No technical depth. Designed for a room of non-technical decision-makers.",
    beats: ["Overview", "Anomaly example", "Proof demo", "Decision ask"],
  },
] as const;

const TRACK_STYLES = {
  blue: {
    card: "border-blue-900/20 bg-blue-950/5 hover:border-blue-900/35 hover:bg-blue-950/10",
    badge: "bg-blue-900/10 text-blue-900 border border-blue-900/20",
    btn: "bg-blue-900 text-cream-50 hover:bg-blue-800",
    dot: "bg-blue-700",
  },
  gold: {
    card: "border-gold-400/30 bg-gold-50/40 hover:border-gold-500/50 hover:bg-gold-50/70",
    badge: "bg-gold-100 text-gold-800 border border-gold-300/60",
    btn: "bg-gold-600 text-white hover:bg-gold-700",
    dot: "bg-gold-500",
  },
  slate: {
    card: "border-slate-300/40 bg-slate-50/30 hover:border-slate-400/50 hover:bg-slate-50/60",
    badge: "bg-slate-100 text-slate-700 border border-slate-300/50",
    btn: "bg-slate-700 text-white hover:bg-slate-800",
    dot: "bg-slate-500",
  },
  green: {
    card: "border-emerald-700/20 bg-emerald-50/20 hover:border-emerald-700/30 hover:bg-emerald-50/40",
    badge: "bg-emerald-50 text-emerald-800 border border-emerald-200/70",
    btn: "bg-emerald-700 text-white hover:bg-emerald-800",
    dot: "bg-emerald-600",
  },
};

function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (value.trim() === PASSWORD) {
      onUnlock();
    } else {
      setError("Incorrect access code.");
      setValue("");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream-100 px-6 py-16">
      <div className="w-full max-w-sm">
        <Link
          href="/civic-chain-demo"
          className="mb-8 block text-sm text-slate-500 transition-opacity hover:opacity-70"
        >
          ← Demo Console
        </Link>

        <div className="rounded-2xl border-2 border-b-8 border-blue-900/15 border-b-blue-900/40 bg-white p-8 shadow-sm">
          <div className="mb-6 flex flex-col items-center gap-3 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/civic-logo-hero.svg"
              alt="CivicChain"
              className="h-12 w-12 opacity-80"
            />
            <div>
              <h1 className="text-lg font-semibold text-foreground">Demo Presenter</h1>
              <p className="mt-1 text-sm text-slate-500">Enter your access code to continue.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-3">
            <input
              type="password"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError("");
              }}
              placeholder="Access code"
              autoFocus
              autoComplete="current-password"
              className="w-full rounded-lg border border-slate-200 bg-cream-50 px-4 py-2.5 text-center text-sm tracking-widest text-foreground placeholder:tracking-normal placeholder:text-slate-400 focus:border-blue-900/40 focus:outline-none focus:ring-2 focus:ring-blue-900/10"
            />
            {error && (
              <p className="text-center text-xs text-red-600">{error}</p>
            )}
            <button
              type="submit"
              className="rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-semibold text-cream-50 transition-colors hover:bg-blue-800 active:scale-[0.98]"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export function PresenterLaunch() {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) return <Gate onUnlock={() => setUnlocked(true)} />;

  return (
    <main className="min-h-screen bg-cream-100 px-6 py-12">
      <div className="mx-auto max-w-4xl">

        <div className="mb-10 flex items-start justify-between gap-4">
          <div>
            <Link
              href="/civic-chain-demo"
              className="mb-3 block text-sm text-slate-500 transition-opacity hover:opacity-70"
            >
              ← Demo Console
            </Link>
            <h1 className="text-2xl font-semibold text-foreground">Choose your track.</h1>
            <p className="mt-1 text-sm text-slate-500">
              Select the audience, then click Launch. Use Space / → to advance beats.
            </p>
          </div>
          <div className="hidden rounded-lg border border-slate-200 bg-white/60 px-4 py-2.5 text-xs text-slate-500 sm:block">
            <span className="font-mono">Space / →</span> advance &nbsp;·&nbsp;
            <span className="font-mono">←</span> rewind &nbsp;·&nbsp;
            <span className="font-mono">Esc</span> panic
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {TRACKS.map((track) => {
            const s = TRACK_STYLES[track.color];
            return (
              <div
                key={track.id}
                className={`rounded-2xl border-2 p-6 transition-colors ${s.card}`}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.badge}`}>
                      {track.persona}
                    </span>
                    <h2 className="mt-2 text-base font-semibold text-foreground">{track.label}</h2>
                    <p className="text-xs text-slate-500">{track.duration}</p>
                  </div>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-slate-600">{track.desc}</p>

                <ul className="mb-5 grid gap-1">
                  {track.beats.map((beat) => (
                    <li key={beat} className="flex items-center gap-2 text-xs text-slate-500">
                      <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${s.dot}`} />
                      {beat}
                    </li>
                  ))}
                </ul>

                <a
                  href={`/civic-chain-demo/live?audience=${track.id}`}
                  className={`block w-full rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition-colors active:scale-[0.98] ${s.btn}`}
                >
                  Launch {track.label} →
                </a>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          Presenter HUD appears in the bottom-right corner. Press <span className="font-mono">H</span> to toggle it.
        </p>

      </div>
    </main>
  );
}
