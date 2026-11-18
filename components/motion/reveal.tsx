"use client";

import { useRef, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

import { EASE_SOFT, gsap, ScrollTrigger, useGSAP } from "./gsap";

const reduceMotionQuery = "(prefers-reduced-motion: reduce)";

const getReducedMotionSnapshot = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia(reduceMotionQuery).matches;

const getReducedMotionServerSnapshot = () => false;

const subscribeReducedMotion = (onStoreChange: () => void) => {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => {};
  }

  const media = window.matchMedia(reduceMotionQuery);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
};

/**
 * Hydration-safe reduced-motion state. The server renders full static
 * content; GSAP only mutates after the client can read the media query.
 */
export function useMountedReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

type RevealProps = {
  children: ReactNode;
  /** Seconds before the reveal starts once in view. */
  delay?: number;
  /** Rise distance in px (transform only). */
  y?: number;
  className?: string;
};

/**
 * One-shot in-view rise + fade. Content renders statically first, then GSAP
 * performs the entrance when the element earns it in the viewport.
 */
export function Reveal({ children, delay = 0, y = 18, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useMountedReducedMotion();

  useGSAP(
    () => {
      const node = ref.current;
      if (!node || reduced) return;

      const tween = gsap.fromTo(
        node,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.42,
          delay,
          ease: EASE_SOFT,
          paused: true,
          immediateRender: false,
          clearProps: "opacity,visibility,transform",
        },
      );

      ScrollTrigger.create({
        trigger: node,
        start: "top 85%",
        once: true,
        onEnter: () => tween.play(0),
      });
    },
    { scope: ref, dependencies: [delay, y, reduced], revertOnUpdate: true },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

type RevealListProps = {
  children: ReactNode[];
  /** Seconds between siblings. */
  stagger?: number;
  /** Seconds before the first child. */
  delay?: number;
  y?: number;
  className?: string;
  itemClassName?: string;
};

/** Staggered Reveal for sibling cards / chips / steps. */
export function RevealList({
  children,
  stagger = 0.08,
  delay = 0,
  y = 18,
  className,
  itemClassName,
}: RevealListProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <Reveal
          key={index}
          delay={delay + index * stagger}
          y={y}
          className={itemClassName}
        >
          {child}
        </Reveal>
      ))}
    </div>
  );
}
