---
description: "Financial projections — ARR trajectory (base vs accelerated), the BaaS revenue-impact model, and base-case vs state/county upside."
depends-on:
  - "[[_docs/facts/product]]"
  - "[[_docs/facts/CivicChain_Product_Guide_2026]]"
  - "[[_docs/facts/whitepaper]]"
  - "[[_docs/facts/evidence/payment-cost-savings]]"
  - "[[_docs/facts/evidence/funds-flow-and-licensing]]"
  - "[[07-business-model-and-pricing]]"
  - "[[customer-savings-mechanism]]"
  - "[[_docs/business/2-market/04-market-and-tam]]"
  - "[[_docs/business/4-execution/legal-and-compliance]]"
---

# 08 — Financial projections

## Claim Boundary

- Claim status: mixed — see inline labels. All ARR, ARPU, customer-count, and float/interchange figures are Modeled forecasts; any number used externally is also Needs proof (dated source check).
- Source note: [[_docs/facts/product]] (Pricing, Market context); [[_docs/facts/CivicChain_Product_Guide_2026]] (source-only ROI and price-comparison cases); [[_docs/facts/whitepaper]] §13.3 BaaS Revenue Impact Model (1047–1079), §13.5 ARR Trajectory (1124–1195); [[_docs/facts/evidence/payment-cost-savings]] (all-in customer-savings proof standard); [[_docs/facts/evidence/funds-flow-and-licensing]] and [[legal-and-compliance]] (float-yield legality); [[07-business-model-and-pricing]] (pricing/revenue owner); [[customer-savings-mechanism]] (customer-savings value mechanism); [[04-market-and-tam]] (market-count/TAM owner)

All numbers on this page are forecasts, not booked revenue. The product.md
boundary is explicit: ARR, CAC, TAM, and ROI numbers require dated source checks
before they become external claims. Treat every figure below as **Modeled** for
internal scenario work and **Needs proof** before any external or investor use.

The full trajectory comes from the raw white paper (v9 ambition), which
product.md flags as raw source material, not the current public claim boundary.
Where the white paper projects beyond what product.md confirms, the figure is
labeled **Target** or **Needs proof** accordingly.

The 2026 Product Guide's Millbrook/Miami ROI examples are modeled sales cases,
not documented outcomes. They can inform scenario ranges only after reconciliation
with the pricing owner and same-contract workflow proof.

## How to read these projections

Three things are kept separate on purpose:

1. **Base vs accelerated** — two adoption speeds for the same small-municipality
   business.
2. **Base case vs upside** — the small-municipality book (Phases 1–2) is the
   base case; state and county contracts (Phases 3–4) are additive upside, not
   baked into the base ARR.
3. **Path A vs Path B** — the BaaS revenue model. Path A (BaaS at seed) carries
   a margin drag; Path B (own payment infrastructure at Series A+) recovers it.
   See the BaaS section below.

## Revenue components

Each track in the pricing model generates up to three revenue lines. **Modeled**
business logic, not validated revenue. The pricing owner is
[[07-business-model-and-pricing|07 — Business model and pricing]]; this page uses
that model only to build forecast scenarios.

| Component | What it is |
|-----------|-----------|
| SaaS ACV | Annual platform fee per municipality. Blended ~$35K in the white-paper model. |
| Transaction fees | A percentage on payouts (product.md pricing: 0.35–0.75% on Track B; white-paper model uses 0.35% full / 0.9% net blended). |
| Float yield | Annualized yield on contract-pool balances (~4% annualized in product.md). |
| Card interchange | ~1.5% interchange on card spend (product.md). |

These are **revenue components**, not proof of customer savings. A transaction
fee can be revenue for CivicChain and still be worth paying if the town saves
more through lower vendor risk premiums, fewer manual AP/reconciliation hours,
and easier audit/FOAA evidence. Do not infer customer ROI from "XRPL is cheaper
than ACH" or from stablecoin settlement alone; the ROI model needs the full
workflow cost and a same-contract comparison.

The newest payment-cost evidence makes the gate sharper: customer ROI must be
measured as all-in cost per reconciled, audit-ready, legally valid municipal
transaction. Public convenience fees, processor rates, ACH fees, FedNow/RTP fees,
and XRPL costs are inputs, not the model's proof.

product.md pricing tracks for reference (**Modeled**):

| Track | Population | Annual fee | Transaction fee |
|-------|-----------|-----------|----------------|
| A (licensed) | 10K+ | $25K–$75K SaaS | — |
| C (hybrid) | 2.5K–10K | $6K–$15K SaaS | + partial portal fee |
| B (pass-through) | Under 2.5K | $0 SaaS | 0.35–0.75% on payouts |

## Cost side: CAC, cost-to-serve, contracted revenue today

The revenue components above are only half of unit economics. The cost half is
**not modeled**, and the audit flagged the model as reading one-sided.

- **Contracted revenue today:** **$0** — no live customer (see [[business-status]]).
- **CAC (customer acquisition cost):** **Needs proof** — no acquisition-cost data
  exists; the only "payback" in this doc is BaaS-migration payback, not CAC.
- **Cost-to-serve a sub-2,500 town:** **unmodeled** — implementation, KYB
  hand-holding, and support for a no-IT-staff town that pays ~$0 SaaS are not
  costed. The smallest segment is the easiest to win and the hardest to monetize.
- **Float-yield retention:** the ~4% float line assumes CivicChain may keep
  interest on towns' public money — but Maine law points the other way (interest
  on public funds follows the public principal: 30-A §5802(1)(A), §5706), so this
  legal right is **Needs proof / likely contested** ([[funds-flow-and-licensing]],
  [[legal-and-compliance]]). Model the economics with float removed — possibly as
  a base case, not just a downside.

Until these are filled, treat every ARPU / ROI figure here as a revenue-only
view, not a margin.

## ARR trajectory — base vs accelerated

The white paper gives two adoption speeds for Phase 1 (New England beachhead,
2026–2027). Both are **Modeled** scenarios; **Needs proof** before external use.

| Year | Path | Customer target | ARR — accelerated | ARR — base |
|------|------|-----------------|-------------------|-----------|
| 2026 | A (BaaS) | 40 | $2.96M | (base not separately tabled) |
| 2027 (Phase 1 end) | A (BaaS) | 117 | $8.67M | $1.62M |

Source: white paper §13.5 (full year-by-year accelerated table below) and the
Phase 1 summary, which states "ARR at phase end: $8.67M (accelerated) / $1.62M
(base)." The white paper tabulates the accelerated path year by year; the base
path is given only as the Phase 1 endpoint, so the per-year base trajectory is
not in the source. Do not invent the missing base-case years.

### Accelerated small-municipality trajectory (full national scope)

White paper §13.5. **Modeled**; **Needs proof** for external use. State and
county contracts are excluded from this table (see upside section).

| Year | Total customers | Path | SaaS ARR | Txn fee ARR | Float ARR | Total ARR |
|------|-----------------|------|----------|-------------|-----------|-----------|
| 2026 | 40 | A (BaaS) | $1.40M | $1.51M | $52K | $2.96M |
| 2027 | 117 | A (BaaS) | $4.09M | $4.42M | $152K | $8.67M |
| 2028 | 248 | B (Own) | $8.68M | $15.62M | $1.24M | $25.5M |
| 2029 | 478 incl. 50 counties | B (Own) | $20.2M | $36.4M | $1.71M | $58.3M |
| 2030 | 774 incl. 100 counties | B (Own) | $32.0M | $57.6M | $2.70M | $92.3M |
| 2031 | 1,130 small muni (+5 state contracts, upside) | B (Own) | $34.3M | $61.74M | $2.90M | $98.94M |
| 2032 | 1,572 small muni (+8 states, upside) | B (Own) | $46.27M | $83.29M | $3.91M | $133M |
| 2033 | 1,696 small muni (+10 states, upside) | B (Own) | $59.36M | $106.85M | $5.02M | $171M |

Note on the table as published: the white paper's own footnote says the table
"reflects the accelerated small-municipality scenario only" and that state and
county contracts are not included in these ARR figures — yet the customer-count
column from 2029 onward already folds in counties, and the 2031–2033 rows annotate
state contracts. This is an internal inconsistency in the source. Treat the ARR
totals as small-municipality-only per the footnote, and treat the county/state
annotations in the customer column as **Target** scope markers, not as revenue
already counted. Surface this when reusing the table.

> **Second source-internal inconsistency — phase summaries vs the year table.**
> The white paper's §13.4 phase summaries round differently from this §13.5 year
> table, and [[09-go-to-market]] and [[12-roadmap-and-stages]] reproduce the
> phase-summary figures. The two sets disagree: §13.4 puts 2029 at **428
> customers / $44M** and the Phase 3 end (2031) at **~$133M**, while this §13.5
> table puts 2029 at **478 (incl. 50 counties) / $58.3M**, 2031 at **$98.94M**,
> and **$133M at 2032**. 08 is the ARR owner; treat this §13.5 year table as the
> canonical trajectory and the §13.4 phase-end numbers as coarser scenario
> roundings. Both are **Modeled / Needs proof**; do not present either set
> externally without a dated source check.

## BaaS revenue-impact model (Path A vs Path B)

The platform launches on third-party Banking-as-a-Service infrastructure (Path A,
seed stage) to reach market fast, then migrates to its own payment infrastructure
(Path B) at Series A. Path A carries a finite margin drag; Path B recovers it.
All figures **Modeled** (white paper §13.3); **Needs proof** for external use.

### Per-customer revenue: Path A vs Path B

| Revenue component | Path A (BaaS, Seed) | Path B (Own, Series A+) | Delta |
|-------------------|---------------------|-------------------------|-------|
| SaaS ACV (blended) | $35,000 | $35,000 | $0 |
| Transaction fees / customer / yr | $37,800 (0.9% net) | $63,000 (full 0.35%) | +$25,200 |
| Float yield / customer / yr | $1,300 (shared) | $2,960–$6,600 (full) | +$3,700–$5,700 |
| **Total ARPU / customer / yr** | **$74,100** | **$100,960–$104,600** | **+$28,900–$30,900** |

### Portfolio-level impact

| Milestone | Path A ARR | Path B ARR | Delta |
|-----------|-----------|-----------|-------|
| 117 customers (2027, accelerated) | $8.67M | $12.06M | +$3.39M |
| 248 customers (2028, post-migration) | $25.5M (Path B) | $25.5M | $0 (migrated) |

### The drag and its recovery (**Modeled**)

- Cumulative BaaS drag over the two-year seed period (40 customers in Year 1,
  117 in Year 2): **~$4.5M** in deferred revenue.
- Migration investment at Series A: **~$750K**.
- Payback period: **under 30 days at 25 customers**.

Investor framing from the source: launch on proven BaaS to reach market fast;
full margin capture is a Series A milestone funded by the ARR that exists by
then. The drag is presented honestly because sophisticated investors model it
anyway.

## Base case vs state/county upside

This is the most important separation on the page. Do not blend the two.

**Base case (Phases 1–2, small municipalities):** the year-by-year ARR table
above. This is the small-municipality book under 25K population. **Modeled.**

**Upside (Phases 3–4, counties and states):** additive scenarios, explicitly
**not** included in the base ARR projections. **Target** scope (Series B/C
milestones), **Needs proof** for any external figure.

| Upside lever | Modeled contribution | Status |
|--------------|----------------------|--------|
| County / mid-city layer (Phase 3, Series B) | Higher payment volumes (~$85M/yr per county vs ~$18M/yr per small town) | **Target** — Series B milestone |
| Each state contract (Phase 4, Series C) | ~$2M SaaS ACV + ~$24M txn fees + ~$1.1M float ≈ **~$27M ARR per state** | **Target** / **Needs proof** |
| 5 state contracts by 2031 | **~$135M additional ARR**, treated as additive | **Target** — upside scenario |
| Full national model at modest penetration (10% small muni, 7% county, 4% mid-city, 10 states) | **$400M+ ARR by 2033** | **Target** — upside scenario only |

The white paper's own multiplier framing: each state contract (~$27M ARR) equals
~771 small-municipality contracts at $35K ACV. State contracts often mandate or
incentivize sub-state adoption, which the model argues compresses municipal
acquisition cost — itself a **Needs proof** assumption.

## Inputs that gate every number here

These feed the projections and are unresolved in product.md. They cap confidence
in the totals above.

- **Addressable municipality count** is now **reconciled** ([[market-sizing]]):
  ~19,500 US municipal governments (the "16,500" was the separate township
  category, not a conflicting count); the 1,400 New England SOM still **Needs
  proof** (source before external use). Penetration-based ARR inherits the SOM
  uncertainty.
- **Transaction-fee and float assumptions** (0.35–0.9%, ~4% float, ~1.5%
  interchange) are **Modeled** pricing logic, not validated revenue.
- **Customer-savings proof** must be separate from platform revenue. The model
  needs same-contract evidence for vendor risk premium, AP/reconciliation labor,
  audit/FOAA hours, controlled-spend loss reduction, bank analysis statements,
  exception logs, close-calendar time, and public-record request hours;
  rail-fee comparison is not enough.
- **Card scope is unresolved.** Interchange revenue assumes MCC-locked virtual
  cards are live. product.md treats cards as core product story / **Target**
  scope, while the white paper's Release 1 says no virtual cards until Release 2.
  Do not present card interchange as confirmed v1.0 revenue.
- **Settlement and rail claims** (Ripple Payments Rail, RLUSD, seconds-level
  settlement) are **Target** rail-path claims; v1.0 ships in USD bridge mode.
  RLUSD float assumptions are later-layer.
- **Harpswell** is a demo scenario, not a confirmed live customer; its flow
  numbers illustrate the model but are not booked revenue.

## Sources

- [[_docs/facts/product]] — Pricing tracks and revenue components; Market
  context (municipality counts, TAM); claim-boundary and conflict list; v1.0
  card and settlement scope.
- [[_docs/facts/CivicChain_Product_Guide_2026]] — ROI examples and payment-rate
  comparison. Source-only; modeled unless separately proven.
- [[_docs/facts/whitepaper]] §13.3 BaaS Revenue Impact Model (lines 1047–1079)
  — Path A vs Path B per-customer and portfolio economics, drag and payback.
- [[_docs/facts/whitepaper]] §13.5 ARR Trajectory (lines 1124–1195) — base vs
  accelerated, full national accelerated table, and state/county upside framing.
- [[_docs/facts/evidence/payment-cost-savings]] — all-in customer-savings proof
  standard; rail-fee comparison is not enough.
- [[_docs/facts/evidence/funds-flow-and-licensing]] — float-yield legality and
  money-mover framework.
- [[07-business-model-and-pricing|07 — Business model and pricing]] — pricing
  tracks and revenue-component owner.
- [[customer-savings-mechanism|Customer savings mechanism]] — workflow-level
  customer-savings value mechanism and all-in transaction-cost model.
- [[04-market-and-tam|04 — Market and TAM]] — market-count/TAM owner.
- [[legal-and-compliance|Legal and compliance posture]] — legal owner for
  float-yield and regulated-payment questions.
- [[business-status|Business status]] — current live-customer / contracted
  revenue status; check-only, not a forecast source.

## Related

- [[07-business-model-and-pricing|07 — Business model and pricing]]
- [[customer-savings-dollar-model|Customer savings dollar model]]
- [[04-market-and-tam|04 — Market and TAM]]
- [[09-go-to-market|09 — Go-to-market]]
- [[_docs/business/index|Index — business knowledge base]]
