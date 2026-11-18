"use client";

import { useRef } from "react";

import { EASE_SOFT, gsap, ScrollTrigger, useGSAP } from "./gsap";
import { useMountedReducedMotion } from "./reveal";

type CountUpProps = {
  /** Final value, e.g. 52958. */
  value: number;
  prefix?: string;
  suffix?: string;
  /** Animation length in seconds. */
  duration?: number;
  /** Seconds to wait after entering view. */
  delay?: number;
  className?: string;
};

function formatValue(value: number) {
  return Math.round(value).toLocaleString("en-US");
}

/**
 * In-view count-up number. Runs once; reduced motion (and no-JS readers
 * via SSR markup) see the final value immediately.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 0.9,
  delay = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useMountedReducedMotion();
  const finalText = `${prefix}${formatValue(value)}${suffix}`;

  useGSAP(
    () => {
      const node = ref.current;
      if (!node) return;

      node.textContent = finalText;
      if (reduced) return;

      const counter = { value: 0 };
      const tween = gsap.to(counter, {
        value,
        duration,
        delay,
        ease: EASE_SOFT,
        paused: true,
        onStart: () => {
          node.textContent = `${prefix}${formatValue(0)}${suffix}`;
        },
        onUpdate: () => {
          node.textContent = `${prefix}${formatValue(counter.value)}${suffix}`;
        },
      });

      ScrollTrigger.create({
        trigger: node,
        start: "top 80%",
        once: true,
        onEnter: () => tween.play(0),
      });
    },
    {
      scope: ref,
      dependencies: [delay, duration, finalText, prefix, reduced, suffix, value],
      revertOnUpdate: true,
    },
  );

  return (
    <span ref={ref} className={className}>
      {finalText}
    </span>
  );
}
