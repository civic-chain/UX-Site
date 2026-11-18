"use client";

import { useEffect, useRef } from "react";

// Sprite sheet: 6 cols × 2 rows, each cell 72×72 (rendered from 285×285 source)
// background-size: 432×144px
//   Row 0 cols 0–2 : walking  (3 frames, 0.4s)
//   Row 0 cols 3–5 : sitting  (3 frames, 4s)
//   Row 1 cols 0–3 : barking  (4 frames)
//   Row 1 col  5   : rest frame

const W = 72;
const H = 72;
const SPEED = 2.5;
const SKIP = new Set(["BUTTON", "A", "INPUT", "SELECT", "TEXTAREA", "LABEL"]);

export function LunaCompanion() {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elRef.current) return;
    const el = elRef.current as HTMLDivElement;

    // Inject keyframes — mirrors the original _() function
    const styleTag = document.createElement("style");
    styleTag.textContent = [
      "@keyframes luna-walking{from{background-position:0px 0px}to{background-position:-216px 0px}}",
      "@keyframes luna-sitting{from{background-position:-216px 0px}to{background-position:-432px 0px}}",
    ].join("\n");
    document.head.appendChild(styleTag);

    // --- state (mirrors original globals) ---
    let px = 80;
    let py = window.innerHeight - H - 24;
    let tx: number | null = null;
    let ty: number | null = null;
    let moving = false;
    let raf: number | null = null;

    el.style.left = px + "px";
    el.style.top  = py + "px";

    // playAnim — mirrors W() + the force-reflow pattern from the original
    function playAnim(name: string, dur: string, steps: number, loop: boolean) {
      el.style.animation = "none";
      void el.offsetHeight; // force reflow so re-triggering same anim works
      el.style.animation = `luna-${name} ${dur} steps(${steps}) ${loop ? "infinite" : "1"} forwards`;
    }

    // showRest — mirrors U() exactly
    function showRest() {
      el.style.animation = "none";
      el.style.backgroundPosition = "-360px -72px";
    }

    // mirrors the original animationend listener: if not walking, go to rest
    el.addEventListener("animationend", () => {
      if (!moving) showRest();
    });

    // movement tick — mirrors j()
    function tick() {
      if (tx === null || ty === null) { raf = null; return; }
      const dx = tx - px;
      const dy = ty - py;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < SPEED) {
        px = tx; py = ty;
        el.style.left = px + "px";
        el.style.top  = py + "px";
        tx = null; ty = null;
        moving = false;
        playAnim("sitting", "4s", 3, false);
        raf = null;
        return;
      }
      const t = SPEED / dist;
      px += dx * t;
      py += dy * t;
      el.style.left = px + "px";
      el.style.top  = py + "px";
      raf = requestAnimationFrame(tick);
    }

    // click handler — mirrors J() without grid pathfinding
    function onClick(e: MouseEvent) {
      if (SKIP.has((e.target as HTMLElement).tagName)) return;
      const cx = e.clientX - W / 2;
      const cy = e.clientY - H / 2;
      const dx = cx - px;
      // flip sprite for direction
      el.className = Math.abs(dx) > 4 && dx < 0
        ? "luna-companion luna-flip"
        : "luna-companion";
      tx = cx; ty = cy;
      moving = true;
      playAnim("walking", "0.4s", 3, true);
      if (raf === null) raf = requestAnimationFrame(tick);
    }

    showRest(); // start in rest pose
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("click", onClick);
      if (raf !== null) cancelAnimationFrame(raf);
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <div
      ref={elRef}
      className="luna-companion"
      style={{
        position: "fixed",
        width: W,
        height: H,
        backgroundImage: "url('/luna/luna-sprite.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "432px 144px",
        imageRendering: "pixelated",
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "left, top",
      }}
      aria-hidden="true"
    />
  );
}
