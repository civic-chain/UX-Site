# Codebase Audit

Date: 2026-04-21 17:47 (+05)

> Historical snapshot. This audit was captured against the pre-cleanup 2026-04-21 tree. The live repo has since retired `/reference`, collapsed `/lab` into a compatibility redirect, and routes landing ownership through `lib/landing/payload.ts`, `lib/variants/default.ts`, and `components/landing/landing-from-manifest.tsx`.

## Scope

- Audit basis: current dirty worktree in `cwd=/Users/triton/Documents/GitHub/civicchain`
- Strategic canon: `_ops/1-NORTH-STAR.md`, `_ops/2-RATIONALE.md`, `_ops/3-CURRENT-STRATEGY.md`, `_ops/learnings.md`
- Direction canon: `_docs/direction/expression.md`, `_docs/direction/frontend-system.md`, `_docs/direction/app-interface-principles.md`
- Repo-specific audit rules: `AGENTS.md`, `.codex/skills/civicchain-audit/SKILL.md`, `.codex/skills/civicchain-design-layering/SKILL.md`, `.codex/skills/civicchain-handoff/SKILL.md`

## BLOCKER

- `app/[slug]/page.tsx:29-35`, cross-ref `tests/visual/navigation.spec.ts:111-122`
  Rule: preview/public surfaces must stay separate from the internal lab; sandbox is an internal studio zone, not a client-facing vitrine.
  Observed: the public preview routes (`/demo`, `/pitch`, `/roadmap`, `/contact`) render an `Open design lab` action to `/lab`, and the navigation suite explicitly verifies that this path works.
  Expected: client-facing preview routes should stop at public destinations and must not expose `/lab`.

## MAJOR

- `components/landing/landing-from-manifest.tsx`, cross-ref `lib/variants/default.ts`
  Rule: section order and presence should live in the ordered composition contract, not in page-local special cases.
  Observed: `landingSectionOrder` drives the main map, but one extra image-only section is injected only around the numbers block and is not represented in the order list.
  Expected: every renderable section and its ordering should be expressed in the content/composition layer so multi-landing and reordering stay cheap and legible.

- `scripts/check-design-system-usage.mjs:8-19`, `components/interface/interface-shell.tsx:149-150`, `components/interface/interface-shell.tsx:203-204`, `components/interface/admin-console.tsx:87-90`, `components/interface/status-badge.tsx:7`
  Rule: product-facing routes should extend one shared typography and spacing system, and automated checks should catch drift back into one-off styling.
  Observed: the usage checker explicitly excludes `components/interface/`, while current interface surfaces already contain raw `text-sm`, `text-xs`, `text-[11px]`, and `tracking-[...]` utilities.
  Expected: interface routes should either pass the same shared checker or have an explicit interface-scoped checker with equivalent coverage.

## MINOR

- `components/landing/sections/hero/default.tsx`, `components/landing/sections/howItWorks/default.tsx`, `components/landing/sections/trust/default.tsx`, `components/landing/sections/cta/default.tsx`, cross-ref `lib/landing/payload.ts`
  Rule: user-visible media and labels should stay in payload or a clearly shared primitive, not drift back into section JSX.
  Observed: `hero.logoSrc` exists in the payload, but the hero logo is still hardcoded in JSX; additional visible labels and media details such as `Lifecycle pair`, `Shared record proof`, and the CTA illustration asset/alt also live directly inside section markup.
  Expected: JSX should stay compositional while payload remains authoritative for editable content and media.

- `lib/landing/payload.ts`
  Rule: content changes should stay cheap and avoid copy-paste inside the payload layer.
  Observed: the same primary/secondary CTA pair is duplicated in both `trust` and `cta`.
  Expected: a shared payload source or an explicit reason for divergence, so one copy/link change does not require two manual edits.

- `app/styles/patterns.css:16-26`
  Rule: patterns own layout only and should describe live runtime patterns, not dead or typography-bearing leftovers.
  Observed: `workflow-card-chip` and `workflow-scenario` remain in the patterns layer, but there are no current runtime hits for either class; `workflow-scenario` also sets `font-size` and `line-height`, which is typography, not layout.
  Expected: live pattern classes only, and no typography decisions inside the patterns layer.

## CHECK

- `npm run lint` passed.
  This includes ESLint, `scripts/check-design-system-policy.mjs`, and `scripts/check-design-system-usage.mjs`.

- Targeted design-system grep sweep found:
  `text-*` matches: 4
  `tracking-[...]` matches: 3
  `leading-*` matches: 0
  raw hex matches: 0
  inline `font-size:` matches: 0
  Notes: the actionable matches were concentrated in `components/interface/**`; the token-backed shadow utility hits on landing surfaces were already allowed by policy.

- Browser truth passed on a high-signal Playwright pack:
  `PLAYWRIGHT_PORT=3000 PLAYWRIGHT_REUSE_SERVER=true npx playwright test tests/visual/sections.spec.ts tests/visual/navigation.spec.ts tests/visual/hierarchy.spec.ts tests/visual/interface-routes.spec.ts tests/visual/responsive.spec.ts tests/visual/contrast.spec.ts tests/visual/reduced-motion.spec.ts tests/visual/skill-guardrails.spec.ts`
  Result: `350 passed (3.2m)`.

- Public landing content architecture is mostly holding:
  `app/page.tsx` stays thin, landing content remains centralized in `lib/landing/payload.ts`, and preview-route payload remains centralized in `lib/route-previews/content.ts`.

## Residual Risks

- Audit basis is the current dirty worktree, not a committed baseline. `git status --short` shows strategy files and audited frontend files still in flight.
- The Playwright pass was high-signal, not exhaustive. I did not run the full visual suite, remote parity audit, or deployment-state verification.
- `/lab` no longer behaves like a real comparison sandbox; it is currently a thin legacy shell. That weakens our ability to verify the intended internal sandbox contract beyond navigation boundaries.

## Verdict

`NEEDS-FIX`

The repo is not failing as a browser experience right now: lint is green, the targeted Playwright pack is fully green, and the public landing still reads as one coherent surface. The problem is architectural and strategic alignment, not immediate runtime breakage.

The most important issue is a true strategy violation: public preview routes currently expose the internal lab. After that, the main debt is structural: section composition is not fully canonical, and interface routes are partially outside automated typography/system guardrails. Those should be fixed before calling the codebase aligned with the current `_ops` bet.

## Criteria Generator Contract

This is the hard follow-up contract generated from the audit findings and `_ops` strategy. Use it as the acceptance bar for the fix pass, not as a loose checklist.

### Original task

> Let's add at the end of this file, so we do not forget, using the criteria-generation skill, what needs to be done and in what form and quality based on that skill.

### Understood intent

This audit should end not only with findings, but with a hard downstream repair contract. The next implementation counts as high quality only if it closes the strategic violations, does not blur the content lock, and provides verifiable evidence instead of "visually seems better."

### Context anchors

- `_ops/1-NORTH-STAR.md`: landing should remain premium, easy to edit, and safe for handoff; content must not be silently rewritten.
- `_ops/3-CURRENT-STRATEGY.md`: sandbox remains an internal zone, flexibility lives in the content layer, multi-landing lives through composition, and code must stay handoff-oriented.
- `_docs/comments/2026-04-21_17-47_codebase-audit.md`: this audit has already captured the concrete drift points that define follow-up scope.

### Assumptions (not verified with user)

- Follow-up work should repair the current worktree, not redefine strategy in `_ops`.
- Fixes may change code, tests, and checker coverage, but must not unilaterally rewrite landing copy beyond the already identified structural/content-boundary issues.

### Acceptance criteria

#### Must (blocks completion)

- [ ] Public preview routes (`/demo`, `/pitch`, `/roadmap`, `/contact`) no longer lead to internal studio/reference surfaces (`/lab`, `/design-system`, `/reference`) and do not advertise them from client-facing flow - **Evidence**: diff in `app/[slug]/page.tsx` and updated navigation assertions no longer expect `Open design lab`
  **Anchored in**: `_ops/3-CURRENT-STRATEGY.md` core strategic lines item 3; `_ops/3-CURRENT-STRATEGY.md` Anti-goals

- [ ] Landing composition is fully expressed through the content/composition contract: every actually rendered section/interstitial is declared in the canonical ordering surface, without page-local special-case insertion - **Evidence**: `components/landing/landing-page.tsx` no longer contains conditional insertion for `sectionId === "numbers"`; order is defined by the manifest/order/config layer
  **Anchored in**: `_ops/1-NORTH-STAR.md` acceptance criteria; `_ops/3-CURRENT-STRATEGY.md` core strategic lines items 2 and 4

- [ ] Interface routes return under enforceable shared-system guardrails: either the existing usage checker covers `components/interface/**`, or an explicit interface-scoped checker with equivalent strictness is introduced, and current raw typography/tracking drift hits are fixed - **Evidence**: automated check covers interface surfaces; repo sweep across `components/interface/**` shows no unresolved `text-*`, `text-[11px]`, `tracking-[...]`
  **Anchored in**: `_ops/3-CURRENT-STRATEGY.md` core strategic lines items 1 and 6; `_docs/direction/app-interface-principles.md` Core intent, What agents should not do, What ready for scale looks like

- [ ] Payload/shared primitive layer is again the authoritative source for user-visible media/labels touched by the audit, and the duplicated CTA pair has one source of truth or an explicit locally documented reason for divergence - **Evidence**: hardcoded logo/asset/label drift is removed from the recorded section files or moved into shared primitive/payload; CTA pair no longer requires two manual edits without explanation
  **Anchored in**: `_ops/1-NORTH-STAR.md` acceptance criteria; `_ops/3-CURRENT-STRATEGY.md` core strategic lines items 2, 5, and 6

#### Must not (anti-patterns)

- [ ] Do not close the lab-boundary finding cosmetically by hiding the link only on one viewport, renaming the lab CTA, or leaving the internal route accessible from preview/public surfaces under another label - **Why this would be bypassed**: wording changes formally, but the `internal vs client-facing` strategic boundary remains broken

- [ ] Do not "fix" the interface guardrail gap only by expanding an allowlist/ignore list without actually returning interface surface decisions to the shared system or adding a new checking loop - **Why this would be bypassed**: the checker becomes green, but drift becomes invisible instead of being fixed

### Verification protocol

1. `npm run lint`
   Expected: ESLint, design-system policy, and design-system usage checks all pass with the new checker scope or equivalent interface-scoped coverage in place.

2. `PLAYWRIGHT_PORT=3000 PLAYWRIGHT_REUSE_SERVER=true npx playwright test tests/visual/sections.spec.ts tests/visual/navigation.spec.ts tests/visual/hierarchy.spec.ts tests/visual/interface-routes.spec.ts tests/visual/responsive.spec.ts tests/visual/contrast.spec.ts tests/visual/reduced-motion.spec.ts tests/visual/skill-guardrails.spec.ts`
   Expected: the same high-signal browser truth pack stays green after the fixes.

3. `rg -n 'Open design lab|href="/lab"|text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)|tracking-\[' app components lib --glob '!app/lab/page.tsx' --glob '!app/reference/page.tsx'`
   Expected: no preview/public route hit exposes `/lab`, and any remaining raw type/tracking hits are either zero or confined to explicitly approved/internal-only surfaces.
