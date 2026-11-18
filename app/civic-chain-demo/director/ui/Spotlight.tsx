"use client";

import { useEffect, useRef } from "react";

type SpotlightProps = {
  selector: string | null;
  label?: string;
};

export function Spotlight({ selector, label }: SpotlightProps) {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selector || !ringRef.current) return;

    const target = document.querySelector(selector);
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const ring = ringRef.current;
    ring.style.top = `${rect.top + window.scrollY - 4}px`;
    ring.style.left = `${rect.left + window.scrollX - 4}px`;
    ring.style.width = `${rect.width + 8}px`;
    ring.style.height = `${rect.height + 8}px`;
    ring.style.opacity = "1";
  }, [selector]);

  if (!selector) return null;

  return (
    <>
      {/* dim overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9990] bg-blue-950/50 transition-opacity duration-300"
      />
      {/* focus ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none absolute z-[9995] rounded-lg ring-2 ring-gold-400 ring-offset-2 transition-all duration-300"
        style={{ opacity: 0 }}
      />
      {/* label */}
      {label ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed bottom-24 left-1/2 z-[9999] -translate-x-1/2 rounded-md bg-gold-400 px-3 py-1"
        >
          <p className="captions font-semibold text-blue-950">{label}</p>
        </div>
      ) : null}
    </>
  );
}
