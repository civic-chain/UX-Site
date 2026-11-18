"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";

import { SurfaceCard } from "@/components/ui/surface-card";
import type { SurfaceTone } from "@/lib/design-system-types";
import { cn } from "@/lib/utils";

/**
 * Expandable — one click-to-reveal primitive, shared by the
 * workflow-tool cards and the FAQ accordion.
 *
 * Behaviour is driven entirely by three data-attributes on the
 * wrapper (`data-expandable`, `data-open`, `data-expandable-group`)
 * plus CSS in `app/styles/primitives.css`. The component handles
 * state, keyboard (Enter/Space), ARIA, and — when wrapped in an
 * `<ExpandableScope>` — single-open accordion behaviour.
 */

type ExpandableGroup = "multi" | "single";

type ScopeContextValue = {
  register: (id: string, close: () => void) => () => void;
  notifyOpen: (id: string) => void;
};

const ScopeContext = createContext<ScopeContextValue | null>(null);

// ── <ExpandableScope> ─────────────────────────────────────────
// Wraps a set of sibling Expandables that should behave as an
// accordion (one open at a time). Only `group="single"` items
// are affected; `group="multi"` items inside a scope toggle
// independently.

type ExpandableScopeProps = {
  children: ReactNode;
  className?: string;
};

export function ExpandableScope({ children, className }: ExpandableScopeProps) {
  const closersRef = useRef(new Map<string, () => void>());

  const value = useMemo<ScopeContextValue>(
    () => ({
      register(id, close) {
        closersRef.current.set(id, close);
        return () => {
          closersRef.current.delete(id);
        };
      },
      notifyOpen(openedId) {
        closersRef.current.forEach((close, id) => {
          if (id !== openedId) {
            close();
          }
        });
      },
    }),
    [],
  );

  return (
    <ScopeContext.Provider value={value}>
      <div data-expandable-scope="" className={className}>
        {children}
      </div>
    </ScopeContext.Provider>
  );
}

// ── <Expandable> ──────────────────────────────────────────────
// Renders a SurfaceCard that toggles open state on click / Enter
// / Space. Delegates all animation to CSS via data-attributes.
//
// Accessibility contract:
// - role="button" + aria-expanded on the wrapper
// - aria-controls pairs the wrapper with the ExpandableBody it owns
// - tabIndex=0 + Enter/Space keyboard activation
// - Clicks and key presses originating on interactive descendants
//   (anchors, buttons, form controls) do not toggle the card.

// Context pair so <ExpandableBody> can pick up the id <Expandable>
// promised through aria-controls without extra prop plumbing.
const BodyIdContext = createContext<string | null>(null);

const INTERACTIVE_DESCENDANT_SELECTOR =
  'a, button, input, select, textarea, [role="button"]:not([data-expandable]), [role="link"], [role="menuitem"], [contenteditable="true"]';

type ExpandableProps = Omit<ComponentProps<typeof SurfaceCard>, "onClick"> & {
  tone?: SurfaceTone;
  group?: ExpandableGroup;
  defaultOpen?: boolean;
  children: ReactNode;
};

export function Expandable({
  tone = "cream",
  group = "multi",
  defaultOpen = false,
  className,
  children,
  ...props
}: ExpandableProps) {
  const [open, setOpen] = useState(defaultOpen);
  const scope = useContext(ScopeContext);
  const reactId = useId();
  const bodyId = `${reactId}-body`;

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  // Register with the surrounding scope when in single-open mode
  // so the scope can close us when a sibling opens.
  useEffect(() => {
    if (group !== "single" || !scope) {
      return undefined;
    }
    return scope.register(reactId, close);
  }, [group, scope, reactId, close]);

  const toggle = useCallback(() => {
    const next = !open;
    if (next && group === "single" && scope) {
      scope.notifyOpen(reactId);
    }
    setOpen(next);
  }, [group, open, scope, reactId]);

  // Guard: don't toggle when the click started inside an interactive
  // descendant (link, button, input...). Keeps the "click card to
  // toggle" UX from hijacking nested affordances.
  const originatedFromInteractive = useCallback(
    (target: EventTarget | null, currentTarget: EventTarget) => {
      if (!(target instanceof Element) || target === currentTarget) {
        return false;
      }
      const interactive = target.closest(INTERACTIVE_DESCENDANT_SELECTOR);
      if (!interactive) return false;
      // Make sure the interactive element is inside THIS expandable,
      // not a wrapping one (nested expandables are not supported but
      // the guard stays robust).
      return currentTarget instanceof Node && currentTarget.contains(interactive);
    },
    [],
  );

  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (originatedFromInteractive(event.target, event.currentTarget)) {
        return;
      }
      toggle();
    },
    [originatedFromInteractive, toggle],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.target !== event.currentTarget) {
        // Let interactive descendants handle their own keys.
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    },
    [toggle],
  );

  return (
    <SurfaceCard
      tone={tone}
      data-expandable=""
      data-open={open ? "true" : "false"}
      data-expandable-group={group}
      aria-expanded={open}
      aria-controls={bodyId}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "select-none",
        "focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      <BodyIdContext.Provider value={bodyId}>{children}</BodyIdContext.Provider>
    </SurfaceCard>
  );
}

// ── <ExpandableBody> ──────────────────────────────────────────
// Renders the grid-rows-0fr container that fades in when the
// parent Expandable is open. The double wrapper is load-bearing:
// CSS animates grid-template-rows on `.expandable-body`, while
// `.inner` hides overflow and owns the opacity + translate-y
// transition.

type ExpandableBodyProps = {
  children: ReactNode;
  className?: string;
};

export function ExpandableBody({ children, className }: ExpandableBodyProps) {
  const bodyId = useContext(BodyIdContext);
  return (
    <div className="expandable-body" id={bodyId ?? undefined}>
      <div className={cn("inner", className)}>{children}</div>
    </div>
  );
}

// ── <ExpandableToggle> ────────────────────────────────────────
// The round + icon used as the FAQ collapse indicator. Rotates to
// × when the parent is open (CSS-driven).

type ExpandableToggleProps = {
  className?: string;
};

export function ExpandableToggle({ className }: ExpandableToggleProps) {
  return (
    <span aria-hidden="true" className={cn("expandable-toggle", className)}>
      <svg viewBox="0 0 24 24">
        <path d="M12 5v14M5 12h14" />
      </svg>
    </span>
  );
}
