---
description: "The vendor/contractor journey through CivicChain: proposal, award, contract card pool, the changed bidding dynamic, and faster board-approved payment."
depends-on:
  - "[[_docs/facts/product]]"
  - "[[_docs/facts/whitepaper]]"
  - "[[_docs/facts/evidence/payment-cost-savings]]"
---

# 16 — Journey: the vendor

## Claim Boundary

- Claim status: mixed — see inline labels
- Source note: [[_docs/facts/product]] (How the product works steps 3-5; For the Vendor/Contractor; Harpswell scenario; Pricing); [[_docs/facts/whitepaper]] (§2 Proposal Submission L75-111; §5 Phone Tap Payments and card tiers L377-458); [[_docs/facts/evidence/payment-cost-savings]] (all-in payment-cost and workflow-savings proof standard)

How a small-town contractor experiences CivicChain, from submitting a proposal
to getting paid. The status quo this replaces is a 30–45 day wait that vendors
quietly price into every bid. The buyer cares because vendor confidence can
widen the bidder pool, reduce status-chasing, and lower the modeled
payment-risk premium. Read the claim labels: the card mechanics that carry most
of this story are not confirmed v1.0 shipping scope.

## Who the vendor is

A typical CivicChain vendor is a small contractor bidding on seasonal service
work — snow plowing, road maintenance, landscaping — in a town under 25K
population. **Actual** that these are the launch categories (product.md launch
focus; whitepaper §2.1 lists Snow and Ice Removal, Road Maintenance, Fire
Protection, Public Safety, General Public Works as initial categories).

The defining fact about this vendor today: they wait **30–45 days** for payment
after finishing work, sometimes longer, and they add a risk premium to every bid
to finance that wait. **Needs proof** — the 30–45 day figure is a narrative claim
in product.md, not a sourced or dated measurement.

## Step 1 — Submit a proposal

The town posts a solicitation to the public ledger, each carrying a unique
Contract Reference Number (for example `CRN-2026-PLW-0042`). The vendor submits a
proposal against that CRN. **Actual** that the demo uses CRN-style references
(product.md Harpswell uses `CRN-2026-HRP-0041`).

Submission mechanics in the white paper: vendors email proposals to a platform
inbox with the CRN in the subject line. **Target** — this is white paper v9
specification, not confirmed current product behavior.

**Vendor adoption gap.** The repo does not yet prove that this structured
proposal path is easier than the vendor's current phone, email, and paper flow,
or who trains small contractors to use it. Vendor onboarding effort and
one-read legibility are founder-owned evidence gaps; do not claim vendors will
understand or prefer the flow without proof. See [[open-external-blockers]].

Each proposal captures a standardized field set:

| Field | Description |
|-------|-------------|
| Vendor Name | Legal business name of the submitting entity |
| CRN | Contract Reference Number linking to the solicitation |
| Service Scope | Specific services offered (structured checklist) |
| Coverage Zone | Geographic area the vendor can service (polygon or named zone) |
| Pricing Structure | Per-event, per-mile, lump sum, or time-and-materials |
| Proposed Amount | Total contract value in USD |
| Expense Categories | MCC categories the vendor will need tap access for (fuel, hardware, etc.) |
| Estimated Card Spend | Vendor projection of tap-to-pay expenses vs. labor and service fees |
| Performance Bond | Yes/No plus amount if applicable |
| Insurance Certificate | Attached document or link |
| References | Prior municipal contracts listed |

Source: whitepaper §2.2. **Target** — proposal data model, not yet confirmed
shipped scope.

## Step 2 — Win the award

The town selects the winning bid. In the demo, Coastal Road Services LLC wins the
Harpswell Route 123 crack-sealing contract at **$17,200** against an **$18,500**
budget ceiling — $1,300 under budget. **Actual** within the demo scenario only;
Harpswell is a demo scenario, not a confirmed live customer.

A structural point once sat behind the award — but the citation does **not** hold:
§124 governs *county* purchasing, not town, and the Maine *state* standard is
best-value, not "lowest responsible bid" (5 M.R.S. §1825-B). The sub-5K *town*
award standard is local-ordinance and **Needs proof** ([[records-and-civic-law]]).

## Step 3 — Receive the contract card pool

> Claim boundary: this entire step is the controlled-spend product story. It is
> **not** confirmed v1.0 shipping scope. product.md flags an unresolved conflict
> — the demo and product narrative treat MCC-locked cards as core, while the
> white paper's Release 1 says no virtual cards until Release 2. Treat everything
> below as **Target**.

On award, the payment split is locked upfront: **80%** of the contract value is
loaded onto a vendor card pool, **20%** is held as residual until the work is
complete. **Target** (product.md step 1 and step 3).

The winning vendor receives a virtual payment card for the approved 80% pool
after award and required municipal authorization. The card is **MCC-locked**: it
can only be spent in approved merchant categories (fuel, equipment rental,
construction supply) and is designed to decline at a restaurant or retail store
(an authorization-level decline; the demo showed approvals, not a decline — see
[[17-journey-worker]]). The vendor adds it to Apple Pay or Google Pay and starts
work. **Target** — controlled-spend story / target scope until the v1.0 card
boundary is confirmed.

### Card tiers within the pool

The white paper specifies a three-tier card hierarchy under one contract. All
tiers draw from the same contract pool; sub-tier cards carry lower per-transaction
and daily limits and no tier can spend beyond the available pool balance.

| Tier | Card type | Issued to | Typical use |
|------|-----------|-----------|-------------|
| Company | Contract Master Card | Vendor company (one per contract) | Large purchases: bulk fuel delivery, equipment rental, materials orders |
| Individual | Named Worker Card | Each driver or crew member | Per-shift fuel, tolls, small consumables; biometric-authenticated via phone |
| Equipment | Vehicle/Asset Card | Each truck or piece of equipment | Fuel tied to a specific vehicle; per-asset expense tracking across the contract |

The Company card is the administrative parent: the vendor sets sub-limits on
worker and equipment cards within the bounds the municipality configured on the
Company card. Source: whitepaper §5.2. **Target**.

Two further white-paper details on the pool, both **Target**:

- The white paper funds the pool in **RLUSD** (a dollar-pegged stablecoin). In
  product.md's current boundary, RLUSD is optional Tier 2 / later-layer
  settlement; **v1.0 ships in USD bridge mode**. Do not present an RLUSD-funded
  pool as v1.0.
- The pool runs on a strict budget with **no automatic refills**. When depleted,
  all cards under the contract hard-decline and a Refill Request goes to the
  municipality admin, who approves a capped amount. The vendor must explain
  overspend before getting more money. **Target** (whitepaper §5.6).

## Step 4 — Spend while the work happens

The vendor taps their phone at the gas station, the equipment rental yard, the
materials supplier. Every transaction is logged automatically — merchant, amount,
category, timestamp — and the town manager sees activity in real time. No
invoices, no end-of-month statements. **Target** (product.md step 4).

Demo card spending on the Harpswell contract — three transactions over three work
days, all auto-approved against the MCC lock:

| Merchant | Amount | MCC category |
|----------|--------|--------------|
| Harpswell Equipment Rental | $3,200.00 | Equipment Rental |
| Irving Oil, Bath ME | $847.20 | Fuel & Gas |
| Maine Pavement Supply Co. | $5,167.30 | Construction Supply |

**Actual** within the demo scenario only (product.md card spending detail).

> **Figure discrepancy (flag).** These three transactions sum to **$9,214.50**,
> while the financial-flow table below states **$13,214.50** of card spending — a
> **$4,000** gap. The flow balances on $13,214.50, so the itemization is
> incomplete or there are unshown spends. Traces to read-only
> [[_docs/facts/product]]; the product owner must reconcile it before external
> use.

## Step 5 — Get paid

The vendor submits a Work Completion Record; the town manager approves it; the
remaining 20% residual is released through the payment rail. **Target** for the
card-pool path; the Work Completion Record and payment-authorization flow are
listed by product.md as confirmed core story.

> **Warrant-cycle caveat — read before promising "same day."** Production vendor
> payments are not a one-person, instant act. Under Maine 30-A §5603 the treasurer
> disburses vendor money only on a warrant voted and signed by the select board —
> a structural 2–4 week cycle. CivicChain works **inside** that workflow (digital
> warrant packets, e-signature, threshold approvals) and may compress the cycle
> only where that board-gated workflow is actually adopted; it does **not**
> bypass board authority. So "same day" / "within minutes" / "seconds" throughout
> this journey describes the rail mechanics once a disbursement is authorized,
> not a bypass of the warrant gate. Faster board-gated payment is the value;
> instant payment on day one is not a deliverable ([[15-journey-town-manager]]).

Settlement speed: product.md cites a demo residual settlement of **~4 seconds**
via the Ripple Payments Rail. **Target / Modeled** — this is a target rail-path
claim and demo figure, not proof of live v1.0 operations. Rail geography,
license, and volume claims separately need dated external checks. **Needs proof**.
The ~3–5s band matches XRPL's real ledger-close time ([[technology-baseline]]),
but that is the rail baseline, not a measurement of CivicChain's USD-bridge path.

### Full financial flow (Harpswell demo)

| Step | Amount |
|------|--------|
| Card pool funded (80% of $17,200) | $13,760.00 |
| Card spending during work (fuel, equipment, materials) | $13,214.50 |
| Unspent card balance returned to town | $545.50 |
| Residual payment on completion (20%) | $3,440.00 |
| **Total paid to vendor** | **$16,654.50** |
| **Total town savings vs. budget** | **$1,845.50** |

**Actual** within the demo scenario only. Invoices submitted: 0. Blockchain
records anchored: 4 (contract, funding, residual, balance return).

## Apples-to-apples economic comparison

The correct comparison is the same municipal work, same vendor, same $17,200
contract. Do not compare this journey to a resident paying a property-tax or DMV
fee; that is a different payment object and a different buyer.

The pass/fail metric is whether the whole workflow lowers the cost per
reconciled, audit-ready vendor transaction: payment-cycle time, bid premium,
AP/reconciliation labor, exception handling, audit evidence, and public-record
response. Direct rail fee is only one row in that comparison.

| Dimension | Traditional small-town flow | CivicChain v1.0 conservative | CivicChain target card/RLUSD flow |
| --- | --- | --- | --- |
| Payment object | Vendor invoice / warrant / check or ACH | SAR + WCR + USD payment authorization | SAR + contract pools + card spend + residual |
| Board/warrant gate | Still required; often a 2–4 week structural cycle in Maine | Preserved; product works inside it | Preserved before authority to move public money |
| Vendor working-capital burden | Vendor fronts costs or waits for invoice cycle | Unknown measured latency; intended to compress workflow | Card pool can fund approved work expenses early |
| Direct rail fee | Often low if ACH; check handling and staff time still exist | Unknown commercial terms | XRPL record cost near zero, but processor/Rail/card costs still exist |
| Main economic lever | Low rail fee but slow/opaque workflow | Less reconciliation/audit burden | Lower risk premium + controlled spend + faster evidence |

The defensible claim is therefore not "crypto avoids huge bank commissions." It
is that CivicChain changes the workflow around the payment: the vendor no longer
has to finance as much uncertainty, the town sees spend evidence earlier, and
the public record is assembled as the work happens. That is a buyer cost lever:
more confident bidders, fewer payment-status loops, and a lower modeled
payment-risk premium.

## The changed bidding dynamic

This is the core economic argument of the vendor journey. The logic chain:

1. Today the vendor finances the town's slow payment, so they fold a risk
   premium into every bid. product.md models this premium at **3–8%** of a
   contract, contributing $14,370 of modeled leakage on a $385K procurement
   budget. **Modeled** — illustrative scenario economics, not an observed
   average.
2. A vendor who expects faster board-gated payment and clearer spend evidence
   has less reason to pad the bid for payment uncertainty. Lower payment-risk
   premium is **Modeled** — forecast behavioral economics, not a measured
   outcome.
3. The savings still reach the town through buyer choice, but the once-cited
   "Maine law requires accepting the lowest responsible bid" does **not** hold —
   §124 is *county* purchasing and the state standard is best-value; the sub-5K
   town standard is local-ordinance and **Needs proof** ([[records-and-civic-law]]).

The platform's own framing once read: "CivicChain doesn't ask municipalities to
choose lower bids. Maine law requires it." That framing is **not safe to use** —
the statutory "requirement" is unconfirmed at the town level. Use instead: the
platform may reduce the risk that justified the premium, making bids easier for
the buyer to compare and defend. Treat the no-risk-premium claim as **Modeled**
until lower bids are observed in real contract data.

## What the vendor pays

Vendor-side economics come from the pricing model, which is **Modeled** business
logic, not validated revenue. The vendor does not pay a SaaS fee — that falls on
the town. The platform earns on the payment flow:

- ~1.5% card interchange across all tracks. **Modeled** / **Needs proof** before
  external use.
- ~4% annualized float yield on contract pool balances. **Modeled** / **Needs
  proof**.

In the pass-through track (towns under 2.5K population), the town pays a
0.35–0.75% transaction fee on payouts and $0 SaaS. **Modeled**.

## Cross-source conflicts to surface

Vendor-journey items that need their own proof before public use:

- **Settlement time and rail claims** — the ~4 second figure and Ripple Rail
  geography/license/volume need dated source checks.
- **30–45 day baseline, risk-premium percentages, and statute citation** — all
  require external or legal confirmation.
- **Resident payment-fee analogies** — useful background pain, but not the
  apples-to-apples unit for this journey.
- **All-in payment-cost proof** — bank statements, AP time, exception logs,
  audit prep, and public-record hours are required before converting workflow
  logic into external ROI claims.

Shared conflicts behind the card-pool journey — **card v1.0 scope** and **pool
funding currency (RLUSD vs USD bridge)** — are in
[[_docs/business/index#Open source conflicts]] · [[_docs/business/index#Standing boundaries]].

## Sources

- [[_docs/facts/product]] — How the product works (steps 1, 3, 4, 5); Three
  perspectives → For the Vendor / Contractor; The Harpswell scenario (financial
  flow, card spending detail); Pricing; What v1.0 actually ships.
- [[_docs/facts/whitepaper]] — §2 Module 1 Structured Proposal Submission
  (service categories, proposal data model; L75-111); §5 Module 4 Phone Tap
  Payments (card tier hierarchy, MCC lock profiles, balance management; L377-458).
  Used as raw v9 source material, not as the current claim boundary.
- [[_docs/facts/evidence/payment-cost-savings]] — payment-fee examples,
  hidden fee-stack hypothesis, and customer-savings mechanism.

## Related

- [[customer-savings-mechanism|Customer savings mechanism]]
- [[14-how-it-works|14 — How it works (end to end)]]
- [[15-journey-town-manager|15 — Journey: the town manager]]
- [[17-journey-worker|17 — Journey: the worker]]
- [[18-journey-resident|18 — Journey: the resident]]
- [[_docs/business/index|Index — business knowledge base]]
