---
description: "Product roadmap (Releases 1-4), the v1.0/Tier claim boundary, and how releases map to funding stages."
depends-on:
  - "[[_docs/facts/product]]"
  - "[[_docs/facts/CivicChain_Product_Guide_2026]]"
  - "[[_docs/facts/whitepaper]]"
  - "[[_docs/facts/evidence/payment-cost-savings]]"
  - "[[_docs/business/3-model/09-go-to-market]]"
  - "[[_docs/business/3-model/08-financial-projections]]"
---

# 12 — Roadmap and stages

## Claim Boundary

- Claim status: mixed — see inline labels. Funding-stage and ARR figures are white-paper ambition, not the current public claim boundary.
- Source note: [[_docs/facts/product]] (What v1.0 actually ships; Technology; Market context); [[_docs/facts/CivicChain_Product_Guide_2026]] (source-only tier/module packaging); [[_docs/facts/whitepaper]] §10 Product Roadmap (761-809), §13.4 Four-Phase Go-to-Market (1080-1123); [[_docs/facts/evidence/payment-cost-savings]] (Phase 0 measurement standard); [[09-go-to-market]] (stage/GTM motion); [[08-financial-projections]] (ARR forecast owner)

This document holds two different decompositions of the same arc and keeps them
separate on purpose:

1. **Product releases (Release 1-4)** — the engineering build sequence from the
   white paper, measured in months.
2. **Company stages (Seed → Series A/B/C)** — the funding-and-market
   decomposition, measured in years and customer counts.

Releases describe *what gets built*. Stages describe *who is paying for it and
how the market widens*. They run along the same line but are not the same axis,
and the white-paper figures behind the stages are ambition, not confirmed
claims.

There is also a possible **Phase 0 sales wedge** before the releases: a
transparency-only dashboard over public warrants or AP exports. That is not a
separate release and not a new product thesis; it is an optional adoption path
for proving value before payment movement, card issuing, or stablecoin
settlement.

The authoritative near-term boundary is product.md's "What v1.0 actually ships."
Everything past that is roadmap intent (**Target**) or unproven economics
(**Modeled** / **Needs proof**).

---

## The v1.0 boundary (authoritative)

From product.md. This is the current public claim boundary; treat it as the
floor, not the white paper's Release ambition.

**Confirmed core story (v1.0):** Public ledger, Smart Agreement Records on XRPL,
Work Completion Records, payment authorization flow, burn-rate alerts, and
exportable reporting. v1.0 ships in **USD bridge mode**. — **Actual** (described
in current product materials and demo).

**Unresolved v1.0 boundary — virtual cards:** MCC-locked vendor cards are central
to the current demo and product narrative, but the white paper's Release 1 says
*no virtual cards until Release 2*. Do not present cards as confirmed v1.0
shipping scope until the product owner resolves this. — **Needs proof**
(cross-source conflict, see Conflicts below).

**Explicitly not in v1.0:**

| Capability | Tier | Status |
|------------|------|--------|
| Geolocation / mobile voting | Tier 2 (jurisdiction-aware civic input) | **Target** |
| RLUSD settlements | Tier 2 (optional, after first audit cycle) | **Target** |
| AI solicitation drafting | Tier 3 | **Target** |
| Multi-municipality white-label | Tier 4 | **Target** |

Geolocation voting is a selective public-input layer, not a universal
requirement and not a binding vendor-selection mechanism without
jurisdiction-specific legal and procurement review. RLUSD is optional Tier 2 /
later-layer settlement; v1.0 ships USD bridge mode.

---

## Phase 0 — transparency-only pilot wedge

This is **Target / Needs proof** go-to-market sequencing inferred from the Maine
constraints, not a white-paper release. The point is to prove the public-record
and audit-evidence value before asking the town to change payment rails.
Its measurement goal is the current all-in cost per reconciled, audit-ready
transaction, not a crypto-vs-bank fee comparison.

| Phase 0 input | What CivicChain proves | What it deliberately avoids |
| --- | --- | --- |
| Publicly posted warrants / agenda packets | Spending can be parsed, summarized, hashed, and shown publicly. | Town data-sharing agreement, custody, card issuing, bank feed. |
| Manual warrant CSV upload | One finance upload can create an immutable warrant batch and public dashboard. | Full ERP integration. |
| Scheduled SFTP AP export | Near-live AP transparency with low IT burden. | Plaid/bank-feed politics and payment movement. |

This wedge should lead into Release 1 only when the town wants operational
workflow, not just transparency. The ladder is: public spending evidence ->
WCR/payment authorization -> controlled spend -> RLUSD/card rail where justified.

---

## Product releases (white paper §10)

Source: whitepaper.md §10 (761-809). This is raw v9 ambition with month-scoped
goals — **not** the current claim boundary. Each release goal below is **Target**
unless product.md already confirms it for v1.0.

### Release 1 — Foundation (Months 1-4)

Goal: a deployable MVP for one pilot municipality through one complete contract
cycle, **operating in USD on Rail, with no virtual cards yet**. The Ripple/Rail
commercial relationship must be established in parallel with development — the
first action before writing application code is confirming Rail commercial terms.

Key deliverables:

- Rail affiliate agreement; USD-RLUSD exchange API availability and terms
  confirmed. — **Needs proof** (Ripple/Rail commercial relationship not confirmed).
- Rail KYB onboarding workflow for the pilot municipality.
- Municipality USD deposit account (MTA) in Rail; vendor counterparty
  registration with AML screening.
- Email-based proposal intake with CRN routing; proposal viewer and side-by-side
  comparison in the admin console.
- Board-only voting (web-based); geolocation boundary configured but the GPS gate
  not yet enforced.
- SAR creation with contract sub-account allocation (USD in Release 1,
  RLUSD-ready in Release 2).
- WCR submission; ACH residual payment via Rail withdrawal API.
- Rail webhook event processor; basic public contract ledger driven by Rail
  webhook events and XRPL memos.

Note the direct conflict with the product story: Release 1 proves proposal,
voting, contract management, and payment workflow **without cards**. The demo
treats MCC-locked cards as core. See Conflicts.

### Release 2 — RLUSD Rail and Phone Tap (Months 4-9)

Goal: the product becomes "architecturally complete" — full payment rail,
stablecoin infrastructure, and geolocation-gated voting ship together. — **Target**.

Key deliverables:

- USD-RLUSD conversion live (programmatic exchange API if confirmed, otherwise
  OTC batch with pre-converted float reserve). Contract sub-accounts converted to
  RLUSD denomination.
- Virtual card issuing-partner integration (Marqeta or Lithic); Company,
  Individual, and Equipment card tiers provisioned to Apple Pay and Google Pay.
- MCC lock enforcement via real-time authorization webhook; hard-decline on pool
  exhaustion; admin-controlled refill workflow.
- SHA-256 cross-system audit linking (card settlement, Rail ledger, XRPL memo,
  PostgreSQL). EDD integration for disputed contracts.
- React Native mobile app: GPS geolocation voting with three-layer verification
  and confidence scoring. Real-time phone-tap spend dashboard (admin + public).

### Release 3 — Automation and Scale (Months 9-15)

Goal: reduce manual overhead, enable municipality self-administration, introduce
advanced card controls across multi-municipality deployments. — **Target**.

Key deliverables:

- Geographic phone-tap lock (spend restricted to merchants within a defined
  radius); active-hours lock; per-vehicle fuel-efficiency tracking via Equipment
  card data.
- Automated residual payment triggers (calendar and event-based).
- Municipality Administrator role with full capability-transfer workflow.
- NLP-powered proposal extraction from unstructured email.
- Multi-municipality dashboard for county-level administrators.
- Programmatic USD-RLUSD exchange (replaces OTC batch if not live in Release 2).

### Release 4 — Ecosystem and Network Effects (Months 15-24)

Goal: platform network effects, regional rollout, advanced features. — **Target**.

Key deliverables:

- Vendor marketplace: single Rail counterparty onboarding per vendor across all
  municipalities ("register once, appear everywhere").
- Rail Payment Products multi-payor collections (taxpayer direct-contribution
  module).
- Vendor performance scoring and citizen ratings.
- Contract burn-rate analytics and predictive budget alerts.
- Multi-year contract support with annual re-vote.
- White-label for county governments and regional councils; third-party API for
  civic-tech integrations.

---

## Releases mapped to the Tier boundary

The product.md Tier language and the white-paper Release sequence describe the
same capabilities under different names. The mapping:

| Capability | Product Tier (product.md) | White-paper Release | In v1.0? |
|------------|---------------------------|---------------------|----------|
| Public ledger, SARs, WCRs, payment auth, burn-rate alerts, reporting | v1.0 core | Release 1 | Yes — **Actual** |
| MCC-locked virtual cards | (unresolved — demo treats as core) | Release 2 | **Disputed — Needs proof** |
| RLUSD settlement | Tier 2 | Release 2 | No — **Target** |
| Geolocation / mobile voting | Tier 2 | Release 2 | No — **Target** |
| Advanced card controls, self-administration | (implied later) | Release 3 | No — **Target** |
| AI solicitation drafting | Tier 3 | Release 3 (NLP extraction) | No — **Target** |
| Multi-municipality white-label | Tier 4 | Release 4 | No — **Target** |

The single load-bearing disagreement is the virtual card: product Tier framing
places it inside the core story, white-paper Release 1 defers it to Release 2.
Until resolved, do not state a v1.0 card ship date.

The 2026 Product Guide tier table is commercial packaging over this roadmap, not
an override. Professional/Enterprise feature rows that include cards, RLUSD,
geolocation, NLP, marketplace, API/SLA, or white-label stay **Target** /
**Needs proof** unless already inside the v1.0 boundary.

---

## Company stages (white paper §13.4)

Source: whitepaper.md §13.4 (1080-1123). This four-phase go-to-market maps each
phase to a funding stage. The GTM motion is owned by
[[09-go-to-market|09 — Go-to-market]]; the ARR model is owned by
[[08-financial-projections|08 — Financial projections]]. This table is only the
roadmap/stage view. **All customer counts and ARR figures here are white-paper
scenario economics — Modeled or Needs proof — and are not the current public
claim boundary.** Do not use any number below externally without a dated source
check. Year ranges are roadmap intent (**Target**).

| Phase | Funding stage | Years | Geography / segment | Customer target | ARR at phase end |
|-------|---------------|-------|---------------------|-----------------|------------------|
| Phase 1 — New England Beachhead | **Seed** | 2026-2027 | New England (6 states); municipalities under 25K pop. | 40 by end of Y1; 117 by end of Y2 | $8.67M accelerated / $1.62M base |
| Phase 2 — National Small-Town Rollout + Path B Migration | **Series A** | 2028-2029 | All 50 states; under-25K + first 50 counties | 248 by 2028; 428 by 2029 | $44M (2029, accelerated) |
| Phase 3 — County and Mid-City Layer | **Series B** | 2029-2031 | US counties + mid-sized cities (25K-500K) | 500 munis + 200 counties + 50 cities by 2031 | ~$133M (accelerated) |
| Phase 4 — State Contracts | **Series C** | 2031+ | State governments | 5-10 state contracts by 2033 | ~$27M ARR per state; 5 states ≈ +$135M |

All figures above: **Modeled** (scenario economics) for ARR and customer counts;
**Needs proof** before any external use. The funding-stage labels and year ranges
are **Target** roadmap intent.

The ARR and customer counts in this stage table are the white paper's §13.4
phase-summary figures (2029: 428 / $44M; Phase 3 end 2031: ~$133M). They differ
from the §13.5 year-by-year trajectory, which the ARR owner
[[08-financial-projections]] treats as canonical (2029: 478 incl. counties /
$58.3M; $133M at 2032). Cite ARR from 08, not from this stage view.

### What the stages mean strategically

- **Seed (Phase 1):** Launch on **BaaS Path A** (Column or Unit, USD-denominated,
  ACH settlement) for speed and capital efficiency. New England density and state
  municipal-association channels drive reference customers. — **Target** approach;
  BaaS-provider selection is **Needs proof**.
- **Series A (Phase 2):** Migrate to **Path B** (Ripple Rail, RLUSD, full
  interchange and float). The BaaS-drag and migration-payback model lives in
  [[08-financial-projections|08 — Financial projections]]; here it is only a
  stage gate. — **Modeled** economics; the $15M Series A raise figure and the
  Ripple Rail relationship are **Needs proof**.
- **Series B (Phase 3):** Counties (higher payment volume, ~$85M annual vs ~$18M
  for small towns) and mid-sized cities; white-label county module. — **Target**;
  volume figures **Needs proof**.
- **Series C (Phase 4):** State contracts — highest value, longest cycle, built on
  the credibility of "200-plus municipal deployments" and a multi-year public
  ledger. — **Target**; the deployment count and per-state ~$27M ARR are
  **Modeled** / **Needs proof**.

State and county contracts are explicitly **upside scenarios** in the white paper,
treated as additive, not as base-case assumptions. The patent posture supporting
the state-contract narrative is **provisional applications filed April 4, 2026** —
never "issued patents" or "patented technology."

---

## How releases and stages line up

The two decompositions are coarse-aligned but not locked:

- Release 1-2 (engineering "architecturally complete") fall inside the **Seed →
  Series A** window.
- Release 3-4 (automation, multi-municipality, white-label, ecosystem) support
  the **Series B → Series C** widening into counties, cities, and states.

This alignment is **Target** inference from reading the two sections together; the
white paper does not publish an explicit release-to-stage table, and the month
counts (Release timeline) and year ranges (Phase timeline) do not reconcile
precisely. Do not present a fused single timeline as fact.

**Unresolved infrastructure path (do not smooth over).** The two sections also
disagree on *which compliance stack the seed build uses*. The Release 1 roadmap
(§10) is **Rail-first**: "operating in USD on Rail," with confirming Ripple/Rail
commercial terms as the first action before any code. The §13 go-to-market is
**BaaS-first**: launch on Path A (Column or Unit) at seed, migrate to Ripple Rail
only at Series A. These are two different seed-stage infrastructure paths, not one
plan. The current claim boundary fixes only the *denomination* — v1.0 ships in
**USD bridge mode** — and does not resolve Rail-first vs BaaS-first. Treat the
seed compliance stack as **unresolved / Needs proof**; do not present Release 1
and the BaaS seed plan as a single compatible build.

---

## Conflicts to surface (do not hide)

Roadmap-specific open conflict not in the shared list:

- **Seed infrastructure path:** Release 1 (§10) is Rail-first ("USD on Rail,"
  Ripple terms first); the §13 seed GTM is BaaS-first (Path A, migrate to Rail at
  Series A). Unresolved — the current boundary fixes only USD bridge mode, not
  the seed compliance stack. — **Needs proof**.

Shared conflicts that also bear on stage narratives — card v1.0 scope,
municipality counts, patent status, team figures, Harpswell-as-customer — are in
[[_docs/business/index#Open source conflicts]] · [[_docs/business/index#Standing boundaries]].

---

## Sources

- [[_docs/facts/product]] — "What v1.0 actually ships (and what it doesn't)"
  (the authoritative v1.0/Tier boundary), "Technology (brief)", "Market context",
  and "Proof and source discipline" / conflict list.
- [[_docs/facts/whitepaper]] §10 Product Roadmap (761-809) — Releases 1-4 and
  deliverables.
- [[_docs/facts/whitepaper]] §13.4 Four-Phase National Go-to-Market (1080-1123),
  plus seed/Series stage references (902, 983, 1079) — phase-to-funding-stage
  mapping and scenario ARR.
- [[_docs/facts/evidence/payment-cost-savings]] — all-in payment-cost benchmark
  used by the Phase 0 measurement wedge.
- [[09-go-to-market|09 — Go-to-market]] — GTM motion and phase logic owner.
- [[08-financial-projections|08 — Financial projections]] — ARR and BaaS-drag
  model owner.

## Related

- [[03-the-product|03 — The product]]
- [[09-go-to-market|09 — Go-to-market]]
- [[13-risks-and-mitigations|13 — Risks and mitigations]]
- [[_docs/business/index|Index — business knowledge base]]
