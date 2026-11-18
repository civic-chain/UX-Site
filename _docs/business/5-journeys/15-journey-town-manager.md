---
description: "The town manager's journey through CivicChain — daily reality today, what changes, the admin console and spend dashboard view, and the political protection of public-by-default spending."
depends-on:
  - "[[_docs/facts/product]]"
  - "[[_docs/facts/whitepaper]]"
  - "[[_docs/facts/evidence/payment-cost-savings]]"
---

# 15 — Journey: the town manager

## Claim Boundary

- Claim status: mixed — see inline labels
- Source note: [[_docs/facts/product]] (full); [[_docs/facts/whitepaper]] §7.1 Proposal Pipeline Dashboard, §7.3 Contract Spend Dashboard, §8 Admin Console; [[_docs/facts/evidence/payment-cost-savings]] (all-in payment-cost and reconciliation proof standard)

The town manager is the single buyer for the pilot and the primary daily
operator. In small Maine towns one person can approve a sub-$5K pilot without a
Town Meeting or board vote (Maine Title 30-A §2636), so the *sale* is a
one-person decision and the daily console centers on this role. One caveat the
sale-side simplicity must not erase: **vendor payments are not a one-person
act.** Under Maine statute (30-A M.R.S. §5603) the treasurer may disburse vendor
money only on a warrant voted and signed by a majority of the part-time select
board — a structural two-to-four-week cycle — so the product operates **inside**
the warrant workflow, not as a replacement for board authority. This page traces
the manager's day before and after CivicChain, the console they work in, and why
public-by-default spending protects them politically.

## Daily reality today

The town manager's current workflow, as described in the product story:

- Scattered email threads about contracts.
- Spreadsheets tracking payments.
- Paper checks to process.
- Phone calls from residents asking where the road money went.
- Annual audit prep that takes weeks.

This is **Actual** as a description of the legacy problem the product targets,
drawn directly from the product narrative. It is the "systems from the 1970s–80s"
the platform replaces: paper checks, Excel, emailed RFPs, manual reconciliation.

The cost of that workflow is modeled, not measured:

| Claim | Figure | Label | Note |
|-------|--------|-------|------|
| Modeled budget leakage in a sample municipality | 13.8% | **Modeled** | On a modeled $385K procurement budget, the scenario loses $52,958/year to fees, premiums, labor overhead, and audit costs. Not an average without proof. |
| Staff labor overhead inside that leakage | $25,320 (18–25% of procurement staff time on manual work) | **Modeled** | Part of the $385K scenario, not a measured figure. |
| All-in cost per reconciled, audit-ready transaction | Not yet measured | **Needs proof** | The manager-side pilot should measure bank fees, exceptions, AP/reconciliation time, audit prep, close-calendar time, and public-record response burden. |
| Vendor payments still on paper check in small municipalities | 50–70% | **Needs proof** | Industry estimate in legacy materials; needs a source or primary research. |

The core framing the product uses: "The problem is not corruption. The problem
is infrastructure." Towns lose money because the payment system is slow and
opaque, not because anyone is stealing.

## What changes with CivicChain

CivicChain replaces the scattered workflow with a single console. Active
contracts, card activity, pending approvals, and budget status all live in one
place. Two structural shifts matter for the town manager:

1. **Residents self-serve.** The public ledger means residents check spending
   themselves. The buyer-facing value is a defensible record and fewer FOIA,
   FOAA, audit, and status questions routed through town hall.
2. **Unauthorized spending becomes structurally impossible.** In the
   controlled-spend story, MCC-locked vendor cards mean the manager does not
   audit vendor spending after the fact — a card is designed to decline at a
   restaurant or retail store (an authorization-level decline; the demo showed
   approvals, not a decline — see [[17-journey-worker]]).

Both of these depend on card scope that is **not yet confirmed for v1.0**. The
MCC-locked card is central to the demo and product narrative, but the raw white
paper's Release 1 says no virtual cards until Release 2. Treat the card-based
"unauthorized spending is impossible" benefit as **Target** / product-story
scope until the product owner resolves the v1.0 card boundary, not as confirmed
shipping behavior. (See [[_docs/facts/product]], "What v1.0 actually ships.")

What *is* confirmed core story for v1.0: public ledger, Smart Agreement Records
on XRPL, Work Completion Records, payment authorization flow, burn-rate alerts,
and exportable reporting — all **Target** as shipping milestones, since they
describe roadmap intent rather than an observed live deployment.

### The manager's path through a contract

The lifecycle the manager drives, from the product story:

1. **Post a project.** The manager creates a solicitation (e.g. "Route 123 crack
   sealing, $18,500 budget"). It goes live on the public ledger immediately. The
   split is locked upfront: 80% loaded onto a vendor card, 20% held as residual
   until work is complete.
2. **Open public input where appropriate.** Towns can tie input to the contract
   process when they choose. This is not the default mechanism for every
   contract. (Geolocation/citizen voting is a Tier 2, jurisdiction-aware
   civic-input layer — **Target**, not a universal default and not a binding
   vendor-selection mechanism without legal and procurement review.)
3. **Award and fund.** In the controlled-spend story the winner gets a virtual
   card for the approved 80% pool after award and required authorization.
   **Target** scope, per the card boundary above. The speed claim is faster
   board-gated payment and provisioning inside the §5603 warrant cycle, not a
   same-day bypass of the authority that gates moving public money (see the
   intro).
4. **Monitor spend.** Every card transaction is logged automatically — merchant,
   amount, category, timestamp — and the manager sees activity in real time.
5. **Approve completion, release residual.** The vendor submits a Work
   Completion Record; the manager approves it; the remaining 20% is released.
   Seconds-level settlement is a **Target** / rail-path claim, not proof of live
   v1.0 operation (XRPL closes ledgers in ~3–5s — [[technology-baseline]] — but
   CivicChain's own USD-bridge latency is unmeasured). v1.0 ships in USD bridge
   mode; RLUSD is optional Tier 2.
6. **Everything is on the public ledger.** Every event is anchored on the XRP
   Ledger with a unique hash, verifiable by anyone.

## The admin console the manager works in

The white paper specifies the operator surface in detail. Everything below is
**Target** — it describes the designed console and dashboards (UI/UX input for
build), not an observed live system, and the white paper is explicitly the v9
ambition document, not the current claim boundary.

### Capability transfer: the manager grows into the console

CivicChain is designed to hand administrative responsibility to the municipality
progressively, on the town's own timeline. The town manager does not start fully
self-service.

| Phase | Who administers | CivicChain role |
|-------|-----------------|-----------------|
| Onboarding (Mo. 1–3) | CivicChain admin | Full administration. Municipality observes and learns. |
| Supervised (Mo. 3–9) | Municipality (primary) | CivicChain co-approves payments and refills. |
| Independent (Mo. 9+) | Municipality (full) | Platform support only. |
| Advanced (optional) | Municipality plus automated rules | Automated triggers with exception alerts. |

*(Source: white paper §8.1 — **Target**.)*

### Proposal Pipeline Dashboard

A Kanban-style pipeline showing every solicitation across its full lifecycle,
with drill-down at each stage. This is where the manager lives during an active
solicitation.

| Stage | What it shows | Actions available |
|-------|---------------|-------------------|
| Draft | Solicitations being configured, not yet published. CRN assigned, fields incomplete. | Edit, publish, delete |
| Published | Live solicitations accepting proposals. Submission count updates in real time. | View proposals as they arrive, close early, extend deadline |
| Under Review | Submission window closed. Proposals evaluated side by side. | Score proposals, flag incomplete submissions, open voting |
| Voting Open | Citizen or board voting in progress. Participation and confidence data live. | Monitor live dashboard, close voting early if quorum reached |
| Awarded | Winner determined and notified. SAR not yet activated. | Activate SAR, configure RLUSD pools and card program |
| Active Contract | SAR live. Card program running. Payments in flight. | Monitor spend, authorize WCRs, manage refill requests |
| Completed | Contract term ended. Final payment disbursed. Hold-back released. | View full contract report, export to accounting system |
| Disputed | Contract paused due to active payment or performance dispute. | Access dispute workflow, communicate with vendor |

The **Proposal Comparison View** (opened from Under Review) shows up to four
proposals side by side in a normalized format. Rows map to standardized fields
(service scope, coverage zone, pricing, proposed amount, estimated card spend
percentage, bond and insurance status, reference count). Color coding flags
completeness (green/amber/red). The manager scores each proposal 1–10 per
criterion, adds private audit notes, and can flag any proposal Incomplete — which
auto-emails the vendor and logs the request with a timestamp. Vendor identities
are visible to administrators at all stages but anonymized on the citizen voting
view until voting closes.

*(Source: white paper §7.1 — **Target**.)*

### Contract Spend Dashboard

Once a contract is active, this becomes the manager's central accountability
interface. Every panel is real-time; every entry links to an XRPL transaction.

| Panel | Content |
|-------|---------|
| Contract Header | Name, CRN, vendor, start/end dates, total value. Status badge: Active, Refill Pending, Disputed, Completed. |
| Budget Gauge | Three-part gauge: card pool (spent vs. remaining), residual reserve, hold-back reserve. Green above 40% remaining, amber 15–40%, red below 15%. |
| Burn Rate Indicator | Spent per day vs. projected daily budget. Amber alert if burn rate exceeds projection by >15%; red alert and notification if >30%. |
| Projected Depletion Date | Estimated date the card pool exhausts at current burn rate. Updated daily. |
| Live Transaction Feed | Every phone tap in real time: timestamp, merchant, MCC category, amount, card tier, card alias (e.g. "Truck 7"). |
| Spend by Category | Card pool spend broken down by MCC category (fuel vs. parts vs. equipment repair). |
| Spend by Card | Per-card total spend, last transaction, remaining daily limit. Sortable. |
| WCR Queue | Pending Work Completion Records awaiting authorization. One-click review and authorize or dispute. |
| Refill Request Panel | Pending refill: current balance, burn-rate context, vendor's stated reason, approve/deny. Approving triggers a controlled transfer to the card pool. |
| Payment History | Chronological log of all fund movements, each with an XRPL transaction link. |

*(Source: white paper §7.3 — **Target**. Note: the white paper denominates pools
in RLUSD; per product.md, v1.0 ships USD bridge mode and RLUSD is optional Tier
2. Treat RLUSD-denominated pools as later-layer, not v1.0.)*

### Multi-contract home view

For managers running several service agreements at once, the municipality home
dashboard pulls all active contracts into one view — one card per contract
showing service type, vendor, total value, card pool percentage remaining, next
residual payment due, and any alerts (burn-rate warning, refill request, disputed
WCR). The Municipal Treasury Account balance sits at the top with allocated and
unallocated totals. One-click export of all active-contract financials to CSV or
PDF for the finance department or state reporting. *(Source: white paper §7.3 —
**Target**.)*

> **Export, not integration (honest constraint).** These are CSV/PDF exports —
> CivicChain does **not** sync with Harris TRIO (the ERP ~475 of Maine's ~482
> municipalities run — 2023 reconciled count, [[market-sizing]]; the older "488"
> is a stale pre-deorganization vintage) or InforME PayPort. For a one-person finance office that means a second
> system and a second reconciliation, not a replacement — a real adoption cost
> carried as Risk #10 ([[13-risks-and-mitigations#TRIO lock-in and the auditor shortage]]).
> That the compensating-controls value outweighs the duplicate entry past the
> pilot is **Needs proof**.

### Transparency-only pilot path

Before the manager trusts CivicChain to touch payment movement, the first useful
pilot can be evidence-only:

| Pilot step | Manager action | Public / audit output |
| --- | --- | --- |
| Public warrant scrape | None if the packet is already posted | Parsed warrant batch, summary dashboard, ledger hash. |
| Manual warrant CSV upload | One upload per select-board meeting | Immutable warrant batch and public spending view. |
| Scheduled AP export | One IT/SFTP setup | Nightly AP dashboard with less manual FOAA assembly. |

This is the low-friction version of "public by default." It does not replace the
core vendor-payment workflow; it gives the manager proof that CivicChain reduces
records pressure before asking for Rail, cards, Plaid, or ERP API access.
**Target / Needs proof** — a GTM sequence, not confirmed product scope.
It should also produce the baseline needed for ROI: current time and dollars per
reconciled, audit-ready transaction.

### What the console replaces at audit time

For every completed contract the console generates a compliance report package
(PDF) containing the XRPL transaction log, the geolocation confidence audit trail
for the vote, the counterparty AML screening record, the WCR document log, and
the SAR anchor hash — designed to satisfy municipal audit and FOIA requirements
without manual compilation. This is the structural replacement for the "audit
prep that takes weeks." **Target** (white paper §8.3); the AML/KYB and
geolocation-vote elements depend on Tier 2 / Release 2 infrastructure.

## The political protection of public-by-default spending

This is the manager-facing value the product leads with, beyond efficiency: when
spending is public by default, the manager is protected. If anyone asks "where
did the money go?", the answer is already online — no defensive scramble, no FOIA
turnaround, no appearance of withholding.

The structural framing the product uses: the platform "does not make fraud
harder to commit by policy. It makes fraud impossible to conceal by design." For
the manager, that inverts the political risk. Transparency stops being a request
they must service and becomes the default state of the record. This is **Actual**
as the product's positioning claim; it is not a tested legal or audit outcome,
so the strength of the protection in a contested case is **Needs proof** (legal
and audit confirmation).

A linked political mechanism: faster board-gated payment can give vendors more
confidence to bid, chase fewer payment-status updates, and lower the modeled
payment-risk premium they fold into bids. The once-cited statutory driver does
**not** hold as stated — §124 is *county* purchasing and the Maine *state*
standard is best-value, not "lowest responsible bid"; the sub-5K *town* standard
is local-ordinance and **Needs proof** ([[records-and-civic-law]]). So the
manager may get visible savings through buyer choice, but "the statute does it
automatically" is not assured. The bid-drop magnitude (a neighboring-town "5%"
example) is **Modeled** / illustrative, not a measured result.

## Demo snapshot (Harpswell)

The Harpswell scenario is a **demo scenario showing the full cycle, not a
confirmed live customer.** From the manager's seat the demo shows: a $18,500
budget ceiling, a winning bid of $17,200, zero invoices submitted, zero FOIA
requests needed to audit, and four blockchain records anchored. Total town
savings vs. budget in the demo: $1,845.50. All figures are **Actual** *within the
demo materials* — they are demo outputs, not evidence of a live Harpswell
deployment.

## Cross-source conflicts to surface

Nothing in this journey should be treated as settled where it rests on an open
conflict (card scope, team figures, municipality counts, patent status). Full
list and boundaries: [[_docs/business/index#Open source conflicts]] · [[_docs/business/index#Standing boundaries]].

## Sources

- [[_docs/facts/product]] (full) — claim boundary; "Three perspectives → For the
  Town Manager," "How the product works," "What v1.0 actually ships," market and
  conflict sections.
- [[_docs/facts/whitepaper]] §7.1 Proposal Pipeline Dashboard (Administrator
  View), §7.3 Contract Spend Dashboard, §8 Admin Console — admin console,
  capability transfer, dashboards (raw v9 ambition; used as **Target** material,
  not the current claim boundary).
- [[_docs/facts/evidence/payment-cost-savings]] — all-in payment-cost and
  reconciliation proof standard for manager-side pilot measurement.

## Related

- [[14-how-it-works|14 — How it works (end to end)]]
- [[16-journey-vendor|16 — Journey: the vendor]]
- [[17-journey-worker|17 — Journey: the worker]]
- [[18-journey-resident|18 — Journey: the resident]]
- [[_docs/business/index|Index — business knowledge base]]
