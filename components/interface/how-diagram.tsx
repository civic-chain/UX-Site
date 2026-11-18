"use client";

import { useEffect, useRef } from "react";

// ── Animation helpers ──────────────────────────────────────────────────────────

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

const EASE = "cubic-bezier(0.33, 1, 0.68, 1)";

async function growArrowH(line: HTMLElement, dot: HTMLElement) {
  line.style.transition = "none";
  dot.style.transition = "none";
  line.style.transformOrigin = "0% 50%";
  line.style.transform = "scaleX(0)";
  line.style.opacity = "0";
  dot.style.transform = "translateX(0px)";
  dot.style.opacity = "0";
  void line.offsetWidth;
  line.style.transition = `transform 0.8s ${EASE}, opacity 0.15s`;
  dot.style.transition = `transform 0.8s ${EASE}, opacity 0.15s`;
  line.style.transform = "scaleX(1)";
  line.style.opacity = "1";
  dot.style.transform = "translateX(71px)";
  dot.style.opacity = "1";
  await sleep(800);
}

async function fadeArrowH(line: HTMLElement, dot: HTMLElement) {
  line.style.transition = "opacity 0.35s";
  dot.style.transition = "opacity 0.35s";
  line.style.opacity = "0";
  dot.style.opacity = "0";
  await sleep(350);
  line.style.transition = "none";
  dot.style.transition = "none";
  line.style.transform = "scaleX(0)";
  dot.style.transform = "translateX(0px)";
}

async function growArrowV(line: HTMLElement, dot: HTMLElement) {
  line.style.transition = "none";
  dot.style.transition = "none";
  line.style.transformOrigin = "50% 0%";
  line.style.transform = "scaleY(0)";
  line.style.opacity = "0";
  dot.style.transform = "translateY(0px)";
  dot.style.opacity = "0";
  void line.offsetWidth;
  line.style.transition = `transform 0.8s ${EASE}, opacity 0.15s`;
  dot.style.transition = `transform 0.8s ${EASE}, opacity 0.15s`;
  line.style.transform = "scaleY(1)";
  line.style.opacity = "1";
  dot.style.transform = "translateY(29px)";
  dot.style.opacity = "1";
  await sleep(800);
}

async function fadeArrowV(line: HTMLElement, dot: HTMLElement) {
  line.style.transition = "opacity 0.35s";
  dot.style.transition = "opacity 0.35s";
  line.style.opacity = "0";
  dot.style.opacity = "0";
  await sleep(350);
  line.style.transition = "none";
  dot.style.transition = "none";
  line.style.transform = "scaleY(0)";
  dot.style.transform = "translateY(0px)";
}

function glow(el: HTMLElement | null, on: boolean) {
  if (!el) return;
  el.style.transition = "box-shadow 0.5s, border-color 0.5s";
  if (on) {
    el.style.boxShadow =
      "0 0 0 1.5px var(--accent), 0 10px 28px rgba(201,154,78,0.2)";
    el.style.borderColor = "transparent";
  } else {
    el.style.boxShadow = "";
    el.style.borderColor = "";
  }
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function AccountCard({
  label,
  currency,
  amount,
  settled = false,
  dimmed = false,
  cardRef,
}: {
  label: string;
  currency: string;
  amount: string;
  settled?: boolean;
  dimmed?: boolean;
  cardRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={cardRef}
      className={[
        "rounded-xl border p-4 grid gap-3",
        dimmed
          ? "border-white/10 bg-white/[0.04]"
          : "border-white/20 bg-white/[0.09]",
      ].join(" ")}
    >
      {settled && (
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[color:var(--accent)] px-2.5 py-0.5">
          <span className="size-1.5 rounded-full bg-[color:var(--accent-foreground)]" />
          <span className="type-caption font-semibold text-[color:var(--accent-foreground)]">
            Settled
          </span>
        </span>
      )}
      <div className="flex size-8 items-center justify-center rounded-lg bg-white/10">
        <div className="size-3.5 rounded-sm bg-white/40" />
      </div>
      <div className="grid gap-0.5">
        <p className="type-caption text-white/60">{label}</p>
        <p className="type-caption font-mono text-white/35">{currency}</p>
        <p className="type-body-sm font-mono font-semibold text-white">{amount}</p>
      </div>
    </div>
  );
}

function ArrowH({
  lineRef,
  dotRef,
}: {
  lineRef: React.RefObject<HTMLDivElement | null>;
  dotRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="hidden shrink-0 items-center justify-center px-3 lg:flex">
      <div className="relative h-[1.5px] w-[74px]">
        <div className="absolute inset-0 bg-white/15" />
        <div
          ref={lineRef}
          className="absolute inset-0"
          style={{
            background: "var(--accent)",
            opacity: 0,
            transform: "scaleX(0)",
            transformOrigin: "0% 50%",
          }}
        />
        <div
          ref={dotRef}
          style={{
            position: "absolute",
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "var(--accent)",
            top: "calc(50% - 3.5px)",
            left: -3,
            opacity: 0,
          }}
        />
      </div>
    </div>
  );
}

function ArrowV({
  lineRef,
  dotRef,
}: {
  lineRef: React.RefObject<HTMLDivElement | null>;
  dotRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="flex justify-center py-3 lg:hidden">
      <div className="relative h-8 w-[1.5px]">
        <div className="absolute inset-0 bg-white/15" />
        <div
          ref={lineRef}
          className="absolute inset-0"
          style={{
            background: "var(--accent)",
            opacity: 0,
            transform: "scaleY(0)",
            transformOrigin: "50% 0%",
          }}
        />
        <div
          ref={dotRef}
          style={{
            position: "absolute",
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "var(--accent)",
            left: "calc(50% - 3.5px)",
            top: -3,
            opacity: 0,
          }}
        />
      </div>
    </div>
  );
}

// ── Legend data ────────────────────────────────────────────────────────────────

const legend = [
  { label: "Vendor KYB" },
  { label: "USD = Stablecoin" },
  { label: "Compliance checks" },
  { label: "One public ledger" },
] as const;

// ── Main export ────────────────────────────────────────────────────────────────

export function HowDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const fiatCardRef = useRef<HTMLDivElement>(null);
  const stablecoinCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const dot1Ref = useRef<HTMLDivElement>(null);
  const line1VRef = useRef<HTMLDivElement>(null);
  const dot1VRef = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const dot2Ref = useRef<HTMLDivElement>(null);
  const line2VRef = useRef<HTMLDivElement>(null);
  const dot2VRef = useRef<HTMLDivElement>(null);
  const convRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const el = containerRef.current;
      if (!el) return;

      await new Promise<void>((resolve) => {
        const obs = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              obs.disconnect();
              resolve();
            }
          },
          { threshold: 0.2 }
        );
        obs.observe(el);
      });

      while (!cancelled) {
        const l1 = line1Ref.current;
        const d1 = dot1Ref.current;
        const l1v = line1VRef.current;
        const d1v = dot1VRef.current;
        const l2 = line2Ref.current;
        const d2 = dot2Ref.current;
        const l2v = line2VRef.current;
        const d2v = dot2VRef.current;
        if (!l1 || !d1 || !l1v || !d1v || !l2 || !d2 || !l2v || !d2v) break;

        // 1. Left card glows
        glow(leftCardRef.current, true);
        await sleep(1200);
        if (cancelled) break;

        // 2. Arrow 1 grows (H and V run in parallel)
        await Promise.all([growArrowH(l1, d1), growArrowV(l1v, d1v)]);
        glow(leftCardRef.current, false);
        if (cancelled) break;

        // 3. Fiat card glows
        glow(fiatCardRef.current, true);
        await sleep(800);
        await Promise.all([fadeArrowH(l1, d1), fadeArrowV(l1v, d1v)]);
        if (cancelled) break;

        // 4. Conversion icon spins, fiat dims
        glow(fiatCardRef.current, false);
        const conv = convRef.current;
        if (conv) {
          rotationRef.current += 360;
          conv.style.transition = `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)`;
          conv.style.transform = `rotate(${rotationRef.current}deg)`;
        }
        await sleep(600);
        if (cancelled) break;

        // 5. Stablecoin card glows
        glow(stablecoinCardRef.current, true);
        await sleep(800);
        if (cancelled) break;

        // 6. Arrow 2 grows
        await Promise.all([growArrowH(l2, d2), growArrowV(l2v, d2v)]);
        glow(stablecoinCardRef.current, false);
        if (cancelled) break;

        // 7. Right card glows (settled)
        glow(rightCardRef.current, true);
        await sleep(800);
        await Promise.all([fadeArrowH(l2, d2), fadeArrowV(l2v, d2v)]);
        if (cancelled) break;

        // 8. Hold then reset
        await sleep(1600);
        glow(rightCardRef.current, false);
        await sleep(400);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden rounded-2xl bg-[color:var(--foreground)]">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-2.5">
          <span className="size-5 rounded-full bg-[color:var(--accent)]" aria-hidden="true" />
          <span className="type-label tracking-widest text-white/60">CIVIC-CHAIN</span>
        </div>
        <span className="type-caption font-medium text-emerald-400">• Live</span>
      </div>

      {/* Flow */}
      <div className="p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start">

          {/* Pay-in */}
          <div className="flex-1 grid gap-3">
            <p className="type-caption font-semibold uppercase tracking-wider text-white/40">
              Pay-in
            </p>
            <AccountCard
              label="Town treasury account"
              currency="USD"
              amount="$244,000.00"
              cardRef={leftCardRef}
            />
          </div>

          <ArrowH lineRef={line1Ref} dotRef={dot1Ref} />
          <ArrowV lineRef={line1VRef} dotRef={dot1VRef} />

          {/* Civic-Chain center */}
          <div className="flex-1 grid gap-2">
            <p className="type-caption font-semibold uppercase tracking-wider text-white/40">
              Civic-Chain
            </p>
            <AccountCard
              label="Fiat internal account"
              currency="USD"
              amount="$0.00"
              dimmed
              cardRef={fiatCardRef}
            />
            <div className="flex items-center gap-3 py-1">
              <span className="h-px flex-1 bg-white/10" />
              <div
                ref={convRef}
                className="type-label font-mono text-white/35"
                style={{ display: "inline-block" }}
              >
                USD ↕ USDC
              </div>
              <span className="h-px flex-1 bg-white/10" />
            </div>
            <AccountCard
              label="Stablecoin internal account"
              currency="USDC"
              amount="14,874.00"
              cardRef={stablecoinCardRef}
            />
          </div>

          <ArrowH lineRef={line2Ref} dotRef={dot2Ref} />
          <ArrowV lineRef={line2VRef} dotRef={dot2VRef} />

          {/* Payout */}
          <div className="flex-1 grid gap-3">
            <p className="type-caption font-semibold uppercase tracking-wider text-white/40">
              Payout
            </p>
            <AccountCard
              label="Waste Management LLC"
              currency="USDC"
              amount="1,500.00"
              settled
              cardRef={rightCardRef}
            />
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6">
          {legend.map(({ label }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[color:var(--accent)] opacity-70" />
              <span className="type-caption text-white/50">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
