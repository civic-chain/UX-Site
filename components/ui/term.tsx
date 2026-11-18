"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";

import { cn } from "@/lib/utils";

// A word with a dotted underline that explains itself. Hover or keyboard focus
// opens it on desktop, a tap opens it on phones (a tooltip alone would never
// open on touch), Esc or a tap outside closes it. The words and definitions
// are copy, so they live with the pages (app/(site)/_glossary.tsx); this file
// only owns the behavior and the look.
//
// Inside a card that is one big stretched link, the trigger sits above the
// link layer (relative z-10), so tapping the word opens the note instead of
// following the card's link.
export function Term({
  label,
  definition,
  children,
  className,
}: {
  label: string;
  definition: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Mouse only: touch and pen go through the normal tap-to-toggle path.
  const hoverOpen = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hoverClose = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };
  React.useEffect(() => () => clearTimeout(closeTimer.current), []);

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger
        type="button"
        onPointerEnter={hoverOpen}
        onPointerLeave={hoverClose}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className={cn(
          "relative z-10 inline cursor-help rounded-sm bg-transparent p-0 align-baseline font-[inherit] text-current underline decoration-current/60 decoration-dotted decoration-[1.5px] underline-offset-[3px] hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className,
        )}
      >
        {children ?? label}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side="top"
          align="center"
          sideOffset={8}
          collisionPadding={12}
          // Opening on hover must not pull keyboard focus into the note.
          onOpenAutoFocus={(event) => event.preventDefault()}
          onPointerEnter={hoverOpen}
          onPointerLeave={hoverClose}
          className="z-50 w-72 rounded-xl border border-cream-300 bg-cream-50 p-4 text-blue-900 shadow-md data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 motion-reduce:animate-none"
        >
          <p className="captions text-gold-600">{label}</p>
          <p className="mt-1 body-sm">{definition}</p>
          <PopoverPrimitive.Arrow className="fill-cream-50 stroke-cream-300" width={14} height={7} />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
