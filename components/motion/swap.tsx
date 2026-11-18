"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

import { EASE_SOFT, gsap, useGSAP } from "./gsap";
import { useMountedReducedMotion } from "./reveal";

type SwapContentProps = {
  /** Changing this key animates the new children in. */
  activeKey: string | number;
  children: ReactNode;
  className?: string;
  /** Rise distance for the incoming content. */
  y?: number;
};

/**
 * Content-swap container for role promises, tab panels, and kinetic text.
 * Give the wrapper a min-height at the call site so swaps do not shift layout.
 */
export function SwapContent({
  activeKey,
  children,
  className,
  y = 8,
}: SwapContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useMountedReducedMotion();

  useGSAP(
    () => {
      const node = ref.current;
      if (!node || reduced) return;

      gsap.fromTo(
        node,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.22,
          ease: EASE_SOFT,
          clearProps: "opacity,visibility,transform",
        },
      );
    },
    { scope: ref, dependencies: [activeKey, reduced, y], revertOnUpdate: true },
  );

  return (
    <div className={className}>
      <div ref={ref} key={activeKey}>
        {children}
      </div>
    </div>
  );
}
