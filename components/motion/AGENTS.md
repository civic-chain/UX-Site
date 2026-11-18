# components/motion

GSAP motion adapters for public landing and brand experiences. Current
high-motion consumers include `/` and `/brand` examples.
This is the only layer allowed to import `gsap`, `@gsap/react`, or
`gsap/ScrollTrigger`, and the only layer allowed to bind the `style` prop
(`lib/design-policy.ts` allowlists this directory).

Rules:

- Section files consume these primitives; they never import GSAP directly or
  use `style={...}` themselves.
- Register GSAP plugins only through `components/motion/gsap.ts`; do not
  register plugins inside route sections.
- Every primitive respects `prefers-reduced-motion`: full content renders
  statically; nothing stays hidden.
- Visual styling stays at the call site; primitives own transform/opacity
  timing only.
- Interactive primitives here own their keyboard and aria wiring; raw
  `<button>` is allowed in this directory for that reason.
- Tabs are a UI primitive (`components/ui/tabs.tsx`), built from `Button`, not a
  motion adapter. Motion here is animation-only (`Reveal`, `CountUp`,
  `SwapContent`); do not rebuild a tab/disclosure control in this folder.
- One-shot, in-view, non-looping by default. No parallax, no ambient loops.
  A named demo scene on the active `/` surface may loop *while in view* if it
  carries the argument, but it must pause off-screen (ScrollTrigger) and settle
  statically under reduced motion.
- New primitive only when a second page needs it; page-specific scenes live in
  the route's `_sections/`, composed from these adapters.
- There is currently **no** page-specific GSAP engine in this folder.
  `use-record-flow.ts` used to be a named exception for the home page scene; it
  was deleted when `/` and `/how` moved to the shared static animation at
  `public/how-diagram.html`. Do not add another page-specific engine here
  without explicit user scope: stop and choose a route-local shape or a real
  shared primitive first.
