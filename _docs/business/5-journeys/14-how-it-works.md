---
description: "End-to-end product cycle, from posting a project to the public ledger record, illustrated by the Harpswell demo scenario."
depends-on:
  - "[[_docs/facts/product]]"
  - "[[_docs/facts/whitepaper]]"
---

# 14 — How it works (end to end)

## Claim Boundary

- Claim status: mixed — see inline labels
- Source note: [[_docs/facts/product]] (How the product works; The Harpswell scenario; Three perspectives; Technology; What v1.0 actually ships); [[_docs/facts/whitepaper]] §1 (50-73), 'What the municipality sees at 3am' (440-441)

How CivicChain runs a contract from posting to permanent public record. The
steps below describe the full product cycle as shown in the demo and the
end-state story. Where a step reaches beyond what v1.0 confirms, the claim label
says so. For the current shipping boundary, see the "v1.0 boundary" section at
the end.

## The shape of the system

CivicChain has three interfaces over one shared system: a console for the town
administrator, a workflow for the vendor/contractor, and a public portal for
residents and press. Contract events are recorded on a public blockchain (the XRP
Ledger) so they can be verified by anyone without reconstructing the record after
the fact. **Actual** that the demo anchors records on XRPL — but coverage is
**not** literally "every payment": the demo anchored 4 records and did not anchor
the individual card spends (see step 6).

The raw white paper frames this as five integrated modules (Proposal Engine,
Geolocation Voting, Contract Management, RLUSD Phone Tap Payments, Payment
Rail). That five-module, RLUSD-native picture is **Target** — it is v9 ambition,
not the current shipping claim. v1.0 ships in USD bridge mode; RLUSD,
geolocation voting, and the full phone-tap rail arrive later (see boundary
below).

## The product cycle, step by step

**1. Town posts a project.**
The town manager creates a solicitation (for example, "Route 123 crack sealing,
$18,500 budget"). It goes live on the public ledger immediately — no mailing
lists or paper packets. The payment split is locked upfront: 80% loaded onto a
vendor card, 20% held as residual until work is complete. **Actual** (demo
behavior). The 80/20 split is the demo's configured rule, not a fixed law of the
product.

**2. Public input can be documented where appropriate.**
Towns can keep civic input tied to the broader contract process when they choose
to open that layer. This is a selective, jurisdiction-aware public-input layer —
**not** the required or default mechanism for every contract, and **not** a
binding vendor-selection mechanism without jurisdiction-specific legal and
procurement review. **Target** (Tier 2 scope).

**3. Vendor wins and gets a card.**
In the controlled-spend story, the winning vendor receives a virtual payment
card for the approved 80% pool after award and required municipal authorization.
The value is faster board-gated payment and controlled spending, not an instant
bypass of the warrant cycle. The card is MCC-locked: it spends only at approved
merchant categories (fuel, equipment rental, construction supply) and declines
at a restaurant or retail store. The vendor adds it to Apple Pay or Google Pay
and starts work. **Target** — the card scope is unresolved. The demo and product
story treat MCC-locked cards as core, but the white paper's Release 1 says no
virtual cards until Release 2. Do not present cards as confirmed v1.0 scope. How
the lock, the card tiers, and the real-time authorization work:
[[22-cards-and-mcc-lock]].

**4. Work happens, spending is tracked.**
Every card transaction is logged automatically — merchant, amount, category,
timestamp. The town manager sees activity in real time. No invoices, no
end-of-month statements. **Actual** in the demo; tied to step 3's card scope.

**5. Work is complete, residual is released.**
The vendor submits a Work Completion Record; the town manager approves it; the
remaining 20% is released through the payment rail. **Actual** that the approval
flow exists. Seconds-level settlement is a **Target** / rail-path claim, not
proof of live v1.0 operation. (XRPL itself closes ledgers in ~3–5s —
[[technology-baseline]] — but CivicChain's own end-to-end USD-bridge latency is
unmeasured.) Disbursing public money to a vendor is also gated by the §5603
select-board warrant cycle: the platform speeds the workflow *inside* that gate,
it does not bypass board authority, so "same day" describes the rail once a
payment is authorized — see [[15-journey-town-manager]].

**6. Everything is on the public ledger.**
The end-state story is that every contract event — contract creation, card
funding, each spend, residual payment, unspent-balance return — is anchored on
the XRP Ledger with a unique hash, permanent and independently verifiable: no
FOIA request, no phone call to town hall. **Actual** that the demo anchors
records on XRPL, but with an unresolved source conflict on *coverage*: the demo
anchored **4 records** (contract, funding, residual, balance return) while
logging **3 card spends** — so the individual card spends were not among the
anchored records in the demo. Treat "every spend is anchored" as **Target**
(end-state intent), not demonstrated demo behavior; per-spend anchoring also
depends on the unresolved v1.0 card boundary. How the ledger, Smart Agreement
Records, and the cross-ledger audit chain work: [[20-xrp-ledger-and-records]].

## What each actor experiences

| Actor | What they do | What changes for them |
|-------|--------------|------------------------|
| Town manager | Posts the project, approves the Work Completion Record, watches card activity | One console instead of email threads, spreadsheets, and paper checks; public-by-default records make "where did the money go?" defensible without manual reconstruction |
| Vendor / contractor | Wins the bid, receives a loaded card, spends at approved merchants, gets the residual on completion | Faster board-gated payment can reduce status-chasing and the modeled payment-risk premium baked into bids |
| Resident | Opens the public portal — no login | Checks the contract record and verifiable hashes without filing a FOIA request; the buyer gets a self-serve records/audit path |

The "3am" picture from the white paper makes the real-time loop concrete: a push
notification shows the contract reference, the tap amount, the merchant and MCC,
the driver, and the remaining pool balance, written immutably to the blockchain.
**Target** — this is the RLUSD phone-tap end state, not confirmed v1.0 behavior.

## The Harpswell demo scenario

A demo scenario showing the full cycle. All numbers are from the working demo;
they are **not** proof that Harpswell is a live customer. Harpswell is a demo
scenario, not a confirmed customer, signed pilot, or LOI.

| Field | Value |
|-------|-------|
| Project | Route 123 Pavement Crack Sealing, 1.4 miles |
| Location | Town of Harpswell, Maine |
| Budget ceiling | $18,500 |
| Winning vendor | Coastal Road Services LLC |
| Winning bid | $17,200 (came in $1,300 under budget) |
| Contract reference | CRN-2026-HRP-0041 |

### Financial flow

All figures **Modeled** — illustrative demo economics.

| Step | Amount |
|------|--------|
| Card pool funded (80% of $17,200) | $13,760.00 |
| Card spending during work (fuel, equipment, materials) | $13,214.50 |
| Unspent card balance returned to town | $545.50 |
| Residual payment on completion (20%) | $3,440.00 |
| **Total paid to vendor** | **$16,654.50** |
| **Total town savings vs. budget** | **$1,845.50** |

### Card spending detail

Three transactions over three work days, all approved automatically against the
MCC lock with no manual review. **Modeled** (demo transactions).

| Merchant | Amount | MCC category |
|----------|--------|--------------|
| Harpswell Equipment Rental | $3,200.00 | Equipment Rental |
| Irving Oil, Bath ME | $847.20 | Fuel & Gas |
| Maine Pavement Supply Co. | $5,167.30 | Construction Supply |

> **Figure discrepancy (flag, unresolved).** These three itemized transactions
> sum to **$9,214.50**, but the financial-flow table above states total card
> spending of **$13,214.50** — a **$4,000** gap. The flow's own math balances on
> $13,214.50 (pool $13,760 = $13,214.50 spent + $545.50 returned), so either there
> are unshown card spends or the itemization is incomplete; the three are
> presented as the full set, not a sample. The figures trace to
> [[_docs/facts/product]] (read-only client source); the product owner must
> reconcile the itemization against the total before any external use.

### Other facts from the scenario

| Fact | Value | Claim status |
|------|-------|--------------|
| Resident votes cast | 312 (87% approval — 271 approve, 41 reject) | **Modeled** (demo) |
| Invoices submitted | 0 | **Modeled** (demo) |
| Blockchain records anchored | 4 (contract, funding, residual, balance return) | **Modeled** (demo) |
| Residual settlement time | ~4 seconds via Ripple Payments Rail | **Target** (demo/rail-path). The ~3–5s band matches XRPL's real ledger-close time ([[technology-baseline]]), but that is the rail baseline, not a measurement of CivicChain's USD-bridge path. |
| FOIA requests needed to audit | 0 | **Modeled** (demo) |

## v1.0 boundary (what actually ships)

- **Confirmed core story (Actual / Target near-term):** public ledger, Smart
  Agreement Records on XRPL, Work Completion Records, payment authorization flow,
  burn-rate alerts, and exportable reporting.
- **Unresolved:** MCC-locked cards are central to the demo and product narrative,
  but the raw white paper's Release 1 says no virtual cards until Release 2.
  Treat cards as product-story / **Target** scope until the product owner
  resolves the boundary. Do not present cards as confirmed v1.0 scope.
- **Settlement:** v1.0 ships in USD bridge mode. RLUSD is optional Tier 2 /
  later-layer settlement, introduced after the first audit cycle. Seconds-level
  settlement is a **Target** rail-path claim; USD-first / ACH paths may be
  same-day or slower.
- **Not in v1.0:** geolocation voting (Tier 2, jurisdiction-aware), RLUSD
  settlements (Tier 2, optional), AI solicitation drafting (Tier 3),
  multi-municipality white-label (Tier 4).

The product launches focused on seasonal service contracts (snow, roads,
landscaping) in towns under 25K population, and expands from there.

> Patent note: the underlying compliance architecture is covered by provisional
> applications filed April 4, 2026. Do not describe it as "issued patents" or
> "patented technology." **Needs proof** for any stronger characterization.

> Records-law note: permanent on-chain publication is the sharpest legal
> exposure, but Maine law mandates record *preservation*, not deletion
> ([[records-and-civic-law]]). The defensible pattern anchors only a hash/
> reference on-chain (close to the XRPL memo model) and keeps raw records and any
> PII off-chain; publishing already-public award amounts is low-risk, while whole
> proposals may carry vendor-marked trade-secret content. **Needs counsel.**

## Sources

- [[_docs/facts/product]] — "How the product works" (steps 1–6), "The Harpswell
  scenario" (financial flow, card detail, other facts), "Three perspectives,"
  "Technology (brief)," and "What v1.0 actually ships." Authoritative claim
  boundary.
- [[_docs/facts/whitepaper]] — §1, "Platform Overview: Five Integrated Modules"
  (lines 50–73) for the five-module / RLUSD-native end state; "What the
  Municipality Sees at 3am" (lines 440–441) for the real-time notification loop.
  Raw v9 ambition, used as **Target** context only.

## Related

- [[03-the-product|03 — The product]]
- [[15-journey-town-manager|15 — Journey: the town manager]]
- [[16-journey-vendor|16 — Journey: the vendor]]
- [[17-journey-worker|17 — Journey: the worker]]
- [[18-journey-resident|18 — Journey: the resident]]
- [[19-technology-overview|19 — Technology overview]]
- [[21-rlusd-and-payment-rail|21 — RLUSD and the payment rail]]
- [[_docs/business/index|Index — business knowledge base]]
