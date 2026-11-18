---
description: "How CivicChain makes money — SaaS-first model with interchange and float as upside, three pricing tracks, per-segment unit economics, and separation from customer savings."
depends-on:
  - "[[_docs/facts/product]]"
  - "[[_docs/facts/CivicChain_Product_Guide_2026]]"
  - "[[_docs/facts/whitepaper]]"
  - "[[_docs/facts/evidence/payment-cost-savings]]"
---

# 07 — Business model and pricing

## Claim Boundary

- Claim status: mixed — pricing logic is Modeled; interchange/float/ARPU/ROI figures are Needs proof; see inline labels
- Source note: [[_docs/facts/product]] (Pricing, Technology, What v1.0 ships); [[_docs/facts/CivicChain_Product_Guide_2026]] (source-only flat-tier pricing and ROI claims); [[_docs/facts/whitepaper]] §6.5 (513-528), §12.3 (905-945); [[_docs/facts/evidence/payment-cost-savings]]

How CivicChain earns revenue, the three pricing tracks, and the modeled unit
economics per customer segment. The pricing table in [[_docs/facts/product]] is
the current claim boundary; the white paper supplies richer revenue-stream
descriptions and per-segment economics that go beyond that boundary and are
labeled accordingly here.

## The model in one line

CivicChain is SaaS-first. **Modeled.** The company sells a procurement
platform, the public transparency layer, the contract-card program, and (later)
the voting system — and prices the annual SaaS contract against the value
delivered in procurement efficiency, labor savings, and lower all-in cost per
reconciled/audit-ready transaction, not against transaction volume. Card
interchange and float yield are upside layered on top of that recurring base.

This positioning is deliberate: CivicChain is not pitched as a payment
processor. The payment rail enables the accountability story; it does not define
the product or the price.

> Note on card scope: interchange revenue depends on the MCC-locked vendor
> cards, whose v1.0 shipping scope is **unresolved**. The current product story
> treats cards as core; the raw white paper's Release 1 says no virtual cards
> until Release 2. Treat all interchange revenue below as **Target** /
> **Needs proof** until the card boundary is confirmed.

## What the economics are not

Do not model CivicChain as pure bank-fee arbitrage. On many government/vendor
payments, the direct ACH/check/wire rail cost can be low. The customer savings
case must be proven at the workflow level: less vendor-financed float, fewer
manual AP/reconciliation steps, better spend control, and easier audit/FOAA
evidence. The detailed customer-savings mechanism lives in
[[customer-savings-mechanism|Customer savings mechanism]].

The founder-reported "hidden commissions" story is useful only after it is
unpacked: card/contactless acceptance, acquirer/processor, bank-service fees,
treasury operations, compliance, and office labor are different cost layers.
CivicChain revenue lines below are not automatically customer savings; provider
fees must be netted against any claimed reduction.

The all-in payment-cost evidence strengthens pricing discipline: official fee
schedules are incomplete for ROI modeling, but that does not make raw crypto
rails a savings proof. Price against the workflow bundle CivicChain can remove
or compress, then subtract Rail/BaaS/card/provider costs.

For the Harpswell-size demo contract, the disciplined read is:

| Item on a $17,200 vendor contract | Claim boundary |
| --- | --- |
| Vendor risk premium at 3–8% | $516–$1,376 embedded in the bid. **Modeled**, but the clearest customer-savings lever. |
| Track B payout fee at 0.35–0.75% | $60.20–$129.00 if the pass-through fee applies. **Modeled** CivicChain revenue / town cost, not a savings line. |
| Card interchange at ~1.5% on $13,214.50 card spend | About $198.22. **Target / Needs proof** and card-scope dependent; not necessarily charged directly to the town. |
| Float yield on $17,200 held 1.5 days at 4% | About $2.83. **Needs proof / legally contested** and not material as a one-contract savings story. |
| XRPL record cost | Near-zero per anchor, but this proves cheap record anchoring, not whole-product ROI. |

So the safe economic claim is not "crypto removes huge banking commissions." It
is: CivicChain may reduce the risk premium and staff burden that sit around
municipal payment, while earning revenue from SaaS and, later, payment flow.
The proof unit is all-in cost per reconciled, audit-ready transaction.

## Three revenue streams

| Stream | Role | What it is | Per-municipality estimate (Millbrook-scale) | Claim status |
|--------|------|-----------|---------------------------------------------|--------------|
| Annual SaaS contract | Primary | Flat annual fee per municipality, sized to procurement-efficiency and labor savings. Predictable, recurring, independent of transaction volume. | $6,000–$15,000 SaaS band | **Modeled** |
| Card interchange | Upside | CivicChain as card program manager captures a share of interchange on each phone tap — about 1.5% average. Scales with card usage. | ~$1,400 / yr | **Needs proof** (dated rail/interchange check; card scope unresolved) |
| Float yield on rail balances | Operational | USD or RLUSD held in rail accounts earns ~4% annualized on average balance, via custody partners. Managed at platform level. | ~$2,960 / yr (conservative 1.5-day hold; up to ~$6,600 under full custody) | **Needs proof** (dated yield check) |
| Rail payment products | Future (Release 4) | Multi-payor collections — citizens fund specific contracts directly. Enables a taxpayer direct-contribution module. | Revenue model to be defined | **Target** |

The "Millbrook" figures come from the white paper as an illustrative
case-study scale; Millbrook is not a confirmed live customer, and the
interchange and float numbers require dated source checks before external use.

## Three pricing tracks

The pricing table in [[_docs/facts/product]] is the current claim boundary.
All of it is **Modeled** business logic, not validated revenue.

The 2026 Product Guide introduces flat annual tiers
(Pilot/Community/Professional/Enterprise) and says there are no per-transaction
charges. That conflicts with the current A/C/B modeled tracks. Until the
founder/pricing owner resolves it, keep guide tiers as alternative commercial
packaging, not canon pricing.

| Track | Population | Annual fee | Transaction fee | Target segment |
|-------|-----------|-----------|-----------------|----------------|
| A — licensed | 10K+ | $25K–$75K SaaS | — | Larger towns |
| C — hybrid | 2.5K–10K | $6K–$15K SaaS | + partial portal fee | Mid-size towns |
| B — pass-through | Under 2.5K | $0 SaaS | 0.35–0.75% on payouts | Smallest towns |

Across all three tracks, the model also assumes **~1.5% card interchange** and
**~4% annualized float yield** on contract-pool balances. **Needs proof** — both
depend on the rail/card economics and a dated source check, and interchange
further depends on the unresolved v1.0 card scope. The float line additionally
faces a **legality question**: Maine law directs interest on public funds back to
the public fund ([[funds-flow-and-licensing]], [[legal-and-compliance]]), so
CivicChain keeping it is contested, not given.

### Pilot entry

Pilot entry is priced under $5K — deliberately below the Town Manager's
unilateral authority threshold (Maine Title 30-A §2636), so a single decision-
maker can approve a pilot without a town-meeting or competitive-bid process.
**Modeled** pricing logic; the legal authority threshold is **Actual** per the
cited statute, but confirm jurisdiction before relying on it elsewhere.

## Per-segment unit economics

The white paper models blended annual revenue per customer across all three
streams at steady state, under "Path B" independent operation. This goes well
beyond the current product.md claim boundary. Every figure here is **Modeled**,
and the transaction-fee, float, ARPU, and ROI numbers are additionally
**Needs proof** — they assume rail volume and card interchange that depend on a
dated source check and on the unresolved card scope.

| Segment | SaaS ACV | Txn fee / yr | Float / yr | Total ARPU | Customer ROI |
|---------|----------|-------------|-----------|-----------|--------------|
| Small town (~4K pop.) | $10,000 | $63,000 | $2,960 | $75,960 | 385%+ |
| Mid-sized city (~50K pop.) | $75,000 | $980,000 | $46,000 | $1,101,000 | 500%+ |
| Large city (~200K pop.) | $150,000 | $3,150,000 | $148,000 | $3,448,000 | 600%+ |
| County (~85M vol.) | $75,000 | $297,500 | $13,973 | $386,473 | 450%+ |
| State government | $2,000,000 | $24,000,000 | $1,127,000 | $27,127,000 | 700%+ |

**Modeled / Needs proof.** Two cautions on reading this table:

- The transaction-fee column dominates ARPU at every tier above small-town. That
  column is the least-confirmed part of the model — it rests on card interchange
  and rail payment volume, both of which require dated external checks and a
  resolved card scope. Do not present these ARPU or ROI figures as fact.
- The SaaS ACV in this table ($10,000 for a small town) sits inside the
  product.md Track C band ($6K–$15K), so the two sources are consistent on the
  recurring base. They diverge on everything layered above it.

### The state-contract argument

The white paper's strategic rationale for pursuing state contracts at Series C is
per-contract revenue leverage: a single state — modeled at roughly $12B in annual
payment volume — generates ~$27M blended ARR (~$24M of it transaction fees),
which the source equates to **~771 small-municipality contracts at $35K SaaS
ACV**, so five state contracts roughly equal the entire *projected*
small-municipality ARR book at Year 10. **Modeled** strategic claim resting on
**Needs proof** volume and ARR numbers; treat as roadmap rationale, not validated
economics.

> **Source-internal flag (corrected here).** The white paper also states one
> state contract "generates more transaction-fee potential than all ~19,500 small
> municipalities combined." That clause **overstates its own per-segment table
> above** — one state models at ~$24M in transaction fees, while 19,500 small
> municipalities at $63K each model at ~$1.2B. The full small-municipality
> universe is the larger pool; the honest framing is the per-contract multiplier,
> not "more than the whole small-municipality universe." See
> [[08-financial-projections]] for the same multiplier.

## Source conflicts to surface

Conflicts that touch pricing and revenue: **guide flat-tier pricing vs current
A/C/B tracks**, **guide "no transaction fees" vs pass-through payout model**,
**guide ROI cases vs modeled/needs-proof financial scenarios**, **municipality
counts** (now
**reconciled** in [[market-sizing]] — ~19,500 municipal governments; the "16,500"
was the separate township category), **card scope** (interchange is a named
stream, but v1.0 card shipping is unresolved), and **patents** (provisional
only, never "issued"). Full list and boundaries: [[_docs/business/index#Open source conflicts]]
· [[_docs/business/index#Standing boundaries]].

## Sources

- [[_docs/facts/product]] — "Pricing" (primary pricing claim boundary),
  "Technology (brief)", "What v1.0 actually ships", and the conflict list in
  "Proof and source discipline".
- [[_docs/facts/CivicChain_Product_Guide_2026]] — flat annual tier table,
  "no per-transaction charges", and ROI cases. Source-only; unresolved.
- [[_docs/facts/whitepaper]] — §6.5 "The Business Model: SaaS-First,
  Interchange as Upside" (lines 513–528); §12.3 "Per-Segment Economics"
  (lines 905–945).
- [[_docs/facts/evidence/payment-cost-savings]] — payment-fee examples,
  hidden fee-stack hypothesis, customer-savings mechanism, and ACH/wire
  baseline.

## Related

- [[customer-savings-mechanism|Customer savings mechanism]]
- [[08-financial-projections|08 — Financial projections]]
- [[04-market-and-tam|04 — Market and TAM]]
- [[09-go-to-market|09 — Go-to-market]]
- [[_docs/business/index|Index — business knowledge base]]
