---
description: "Market size and TAM/SAM/SOM model for CivicChain — five-segment universe, three-stream TAM, investor working ranges, and the dated sources each number needs."
depends-on:
  - "[[_docs/facts/product]]"
  - "[[_docs/facts/whitepaper]]"
---

# 04 — Market and TAM

## Claim Boundary

- Claim status: mixed — see inline labels; all TAM/segment/ARPU/ROI figures are Needs proof pending dated sources
- Source notes:
  - [[_docs/facts/product]] (Market context; Size table; Why Maine; competitors; pricing)
  - [[_docs/facts/whitepaper]] §12 Market Opportunity and Revenue Model (lines 828-978)

This document collects the market-size figures used in investor materials. Two
source layers feed it, and they do not carry equal weight.

- **product.md is the current claim boundary.** It frames the market narrowly:
  small US towns, a New England SOM, and an explicit rule that every TAM, market,
  and revenue number needs a dated source check before external use.
- **whitepaper.md §12 is raw v9 ambition.** It contains the full five-segment
  universe and the $3.3B–$7.3B TAM model. The whitepaper file states it is *not*
  the current public claim boundary. Treat its numbers as **Target** /
  **Needs proof** source material, never as confirmed fact.

Per product.md's source discipline, every Ripple/RLUSD, market-cap, rail-volume,
license-count, TAM, CAC, ARR, and ROI number on this page is **Needs proof**
until a dated source is attached. The labels below reflect that.

---

## Market context from the current claim boundary

These are the figures product.md actually carries today, with its own status
notes preserved.

| Metric | Number | Claim status |
|--------|--------|--------------|
| Annual U.S. municipal spending | $2T+ | **Needs proof** — needs source and definition |
| Municipalities under 25K population (addressable) | ~19,500 US municipal governments | **Reconciled** ([[market-sizing]]) — the "16,500 vs 19,500" was a category confusion, not a conflict: 19,491 *municipal* governments vs a separate 16,214 *township* governments (2022 Census of Governments). Use ~19,500; ~76% are under 5K. Open primary Census cells in-browser before external use. |
| New England municipalities (initial SOM) | 1,400 | **Needs proof** — needs source before external use |
| Maine municipalities | 482 (2023) | **Reconciled** ([[market-sizing]]) — 23 cities + 430 towns + 29 plantations; 484/488 are stale pre-deorganization vintages (491 in 2016 → 482 in 2023). |
| Priority target towns | 8 (all in Maine) | **Target** — internal target list |

> **Conflict resolved (2026-06-03, [[market-sizing]]):** the "16,500+ vs 19,500"
> was never a real conflict — they are two different US Census of Governments
> categories: **19,491 municipal governments** (incorporated cities/villages/
> boroughs) versus **16,214 town/township governments** (minor civil divisions).
> The whitepaper TAM math below uses the correct ~19,500 *municipal* figure; the
> "16,500+" that appeared elsewhere was the township count mislabeled as "small
> municipalities." Use **~19,500 municipal governments** (~76% under 5K). Primary
> Census cells should still be opened in-browser before external publication.

---

## The five-segment universe (whitepaper §12.1 — Target / Needs proof)

The whitepaper positions CivicChain as a payment-infrastructure layer beneath all
US government procurement across five segments. This is the **Target** ceiling,
not an operational assumption, and every cell is **Needs proof** pending dated
sources.

| Segment | Count | Avg annual payment volume | SaaS ACV | TAM (3 streams) |
|---------|-------|---------------------------|----------|-----------------|
| Small municipalities (<25K pop.) | 19,500 | $18M | $35K | $1.97B |
| Mid/large cities (25K–500K pop.) | 1,150 | $280M | $150K | $1.35B |
| Major cities (500K+ pop.) | 35 | $3.5B | $500K | $0.47B |
| US counties | 3,069 | $85M | $75K | $1.19B |
| State governments | 50 | $12B | $2M | $2.30B |
| **Total universe** | **23,804** | — | — | **$7.27B** |

TAM is calculated as SaaS fees plus transaction fees at 0.35% (0.20% for states
and major cities, reflecting harder negotiating positions) plus float yield at a
1.5-day hold and 4.0% annualized. Full-universe capture is the ceiling against
which penetration targets are measured, not a forecast.

> This 19,500 small-municipality count is the correct *municipal-government*
> figure (2022 Census of Governments); the "16,500+" seen elsewhere was the
> separate *township* category, not a conflicting count ([[market-sizing]]).
> The go-to-market sequences entry by acquisition complexity and sales-cycle
> length, starting where proof-of-concept is fastest (small towns) and scaling
> where unit economics are strongest (states).

---

## Three-revenue-stream TAM model (whitepaper §12.2 — Modeled / Needs proof)

Version 3 of the whitepaper revenue model rebuilds TAM "from the outside in" off
three cited anchors (each itself **Needs proof** via the dated source):

- Tyler Technologies' Platform Technologies segment: **$635–645M** FY2024 revenue
  (SEC 10-K), with ~half a billion government transactions annually at an implied
  ~$1.15 average fee.
- Rabbet 2023 Construction Payments Report: **$273B** added to US construction
  bids due to payment delays.
- US Census Bureau: **$71.25B** state license-tax revenue and **$213B** total
  excise-tax collections annually.

The figures below reflect **Phase 1 (outbound vendor/contractor payments) only**.
Permitting/licensing portal revenue (Phase 2) and excise-tax processing (Phase 3)
are deferred and shown separately in the source — not included here.

| Revenue stream | Conservative | Base case | Optimistic |
|----------------|--------------|-----------|------------|
| SaaS platform fees | $600M | $989M | $989M |
| Transaction processing fees | $900M | $1.60B | $2.20B |
| Float yield on RLUSD/USD balances | $35M | $66M | $108M |
| **Total TAM (small-muni SAM only)** | **$1.54B** | **$2.65B** | **$3.30B** |
| **Total TAM (full national universe)** | **$1.86B** | **$5.50B** | **$7.27B** |

Status: **Modeled** as a scenario; every line is **Needs proof** before external
use, and the float-yield row depends on RLUSD/USD balances — RLUSD is optional
Tier 2 / later-layer settlement, not v1.0 scope (v1.0 ships USD bridge mode).

---

## Working range for investor materials (whitepaper §12.2)

The whitepaper recommends headline TAM by funding stage. All three are
**Needs proof** before external use.

| Scenario | Headline TAM | Basis |
|----------|--------------|-------|
| Conservative (small-muni focus, 30% addressable) | $1.54B | Seed materials |
| Base case (national rollout, full three streams) | $2.65B – $5.5B | Series A+ |
| Optimistic (full universe, state contracts included) | $7.27B | Later stage |

Guidance from the source: seed materials use the conservative figure; Series A and
beyond can defend the national number with reference customers in hand.

---

## Per-segment economics (whitepaper §12.3 — Modeled / Needs proof)

Blended annual revenue per customer across all three streams at steady state,
under Path B (independent operation). All ARPU and ROI figures are **Needs proof**
per product.md's explicit ROI/ARR rule.

| Segment | SaaS ACV | Txn fee / yr | Float / yr | Total ARPU | Customer ROI |
|---------|----------|--------------|------------|------------|--------------|
| Small town (~4K pop.) | $10,000 | $63,000 | $2,960 | $75,960 | 385%+ |
| Mid-sized city (~50K pop.) | $75,000 | $980,000 | $46,000 | $1,101,000 | 500%+ |
| Large city (~200K pop.) | $150,000 | $3,150,000 | $148,000 | $3,448,000 | 600%+ |
| County (~85M vol.) | $75,000 | $297,500 | $13,973 | $386,473 | 450%+ |
| State government | $2,000,000 | $24,000,000 | $1,127,000 | $27,127,000 | 700%+ |

The strategic note in the source: state contracts are pursued at Series C for
per-contract revenue leverage — a single state models at ~$27M blended ARR
(~$24M of it transaction fees), worth on the order of **~771 small-municipality
contracts at $35K SaaS ACV**, so five state contracts roughly equal CivicChain's
entire *projected* small-municipality ARR book at Year 10. This is **Target**
sequencing, not a committed plan.

> **Source-internal flag (corrected here).** The white paper's own line that one
> state contract "generates more transaction-fee potential than all 19,500 small
> municipalities combined" **overstates its own per-segment table above**: one
> state models at ~$24M in transaction fees, while 19,500 small municipalities at
> $63K each model at ~$1.2B — so the full small-municipality universe is the
> larger pool, not the smaller. The defensible claim is per-contract leverage
> (one state ≈ a few hundred small towns' worth of revenue from a single sale),
> not "more than every small municipality combined." Use the ~771-contract
> multiplier, consistent with [[08-financial-projections]].

---

## Beachhead market — New England small towns (SOM, whitepaper §12.4)

The seed-stage SOM. These figures align in spirit with product.md's beachhead
framing (Maine, small towns, seasonal service contracts), but the specific dollar
ranges are whitepaper-only and **Needs proof**.

| Metric | Estimate |
|--------|----------|
| New England municipalities (SOM) | ~1,400 |
| Avg annual services procurement budget per town | $150,000–$500,000 (snow/road categories; total outbound contract payment volume modeled at ~$18M per municipality across all service types) |
| Annual SaaS contract per municipality | $6,000–$35,000 |
| Transaction-fee revenue per municipality (at scale) | $63,000 / yr |
| Float yield per municipality (Path B) | $2,960–$6,600 / yr |
| Total revenue per municipality (blended) | $72,000–$105,000 / yr |
| Beachhead TAM (New England SAM, three streams) | $100M–$147M / yr |
| Year 1 pilot target | 5–10 municipalities |
| Year 3 target (base case) | 150–300 municipalities |
| Year 3 target (accelerated) | 300–500 municipalities |

Status: **Modeled** scenario, **Needs proof** before external use. The float-yield
range again depends on RLUSD/USD balances; RLUSD is optional Tier 2.

The beachhead is grounded in product.md's reasoning: Maine small towns have
single-decision-maker procurement (Town Manager can approve a sub-$5K pilot under
Maine Title 30-A §2636), and the entry use case is seasonal service contracts
(snow, roads, landscaping). Harpswell is a **demo scenario**, not a confirmed live
customer.

---

## Why these numbers need a dated source

product.md is explicit: Ripple, RLUSD, market-cap, rail-volume, license-count,
TAM, CAC, ARR, and ROI numbers require dated source checks before they become
external claims. Concretely, before any of the above appears in a deck or on a
page:

- **TAM / SAM / SOM totals** ($1.54B–$7.27B) — attach the dated v3 revenue-model
  workings and the three anchor sources (Tyler 10-K, Rabbet 2023, US Census).
- **Tyler $635–645M FY2024** — cite the SEC 10-K directly with filing date.
- **$273B construction payment delay** — cite the Rabbet 2023 Construction
  Payments Report directly.
- **$2T+ municipal spending** — needs source and definition of scope.
- **Municipality counts** — *reconciled* ([[market-sizing]]): ~19,500 municipal
  governments (the "16,500" was the separate township category); Maine 482. The
  method is settled; only the primary Census cell-level verification remains
  before external use.
- **All ROI / ARPU figures** (385%–700%+) — these are modeled customer outcomes,
  not observed results; mark Modeled and confirm the model inputs.

---

## Sources

- [[_docs/facts/product]] — "Market context" (Size table, Why Maine, eight
  target towns), "Competitors", "Pricing", and the proof/source-discipline and
  known-conflicts sections (current claim boundary; authoritative).
- [[_docs/facts/whitepaper]] §12 "Market Opportunity and Revenue Model"
  (lines 828–978): §12.1 five-segment universe, §12.2 three-stream TAM and
  investor working range, §12.3 per-segment economics, §12.4 New England
  beachhead, §12.5 competitive position. Raw v9 ambition — not the current public
  claim boundary.

## Related

- [[market-sizing|Market sizing evidence]] — reconciled municipality counts (US, Maine)
- [[05-customers-and-beachhead|05 — Customers and beachhead]]
- [[08-financial-projections|08 — Financial projections]]
- [[07-business-model-and-pricing|07 — Business model and pricing]]
- [[_docs/business/index|Index — business knowledge base]]
