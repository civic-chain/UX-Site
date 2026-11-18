---
description: "Who the CivicChain customer is and the New England small-town beachhead strategy: why Maine, the eight target towns, and the three adoption pressure loops."
depends-on:
  - "[[_docs/facts/product]]"
  - "[[_docs/facts/whitepaper]]"
  - "[[_docs/facts/evidence/payment-cost-savings]]"
---

# 05 — Customers and beachhead

## Claim Boundary

- Claim status: mixed — see inline labels
- Source note: [[_docs/facts/product]] (Market context > Size / Why Maine / eight target towns / how it spreads; Three perspectives); [[_docs/facts/whitepaper]] (§12.4 Beachhead Market lines 946-971, §12.5 Competitive Position lines 972-979); [[_docs/facts/evidence/payment-cost-savings]] (all-in payment-cost and small-town fixed-cost context).

## Who the customer is

The customer is a small US town that contracts out services and pays vendors
on systems from the 1970s–80s. The buyer inside that town is the **Town
Manager**: in small municipalities a single administrator can approve a pilot
without a Town Meeting, board vote, or competitive bid (Maine Title 30-A
§2636). **Actual** (stated in product materials as the governance basis) — the
practical effect is a one-person, one-decision sales cycle *for the pilot
purchase*, which the pilot price is built to fit (pilot entry under $5K,
deliberately below the Town Manager's unilateral authority threshold).

Do not extend that one-person authority to the operational payments the product
runs. Under Maine statute (30-A M.R.S. §5603) a treasurer may disburse vendor
money only on a warrant affirmatively voted and signed by a majority of the
part-time select board, which typically meets twice monthly — a structural
two-to-four-week approval cycle. The product must sit **inside** that warrant
workflow, not replace it: the single-buyer simplicity is the pilot sale, not
vendor-payment authority. **Actual** constraint (Maine evidence memo). See
[[13-risks-and-mitigations|13 — Risks and mitigations]].

Three users sit inside each customer town, all on the same system:

- **Town Manager** — runs contracts, card activity, approvals, and budget from
  one console; protected politically because spending is public by default.
- **Vendor / contractor** — wins the contract, gets paid faster, and stops
  pricing payment risk into bids.
- **Resident / press** — reads the public ledger with no login to see where
  money went.

The voting/civic-input layer is **Tier 2**, jurisdiction-aware, and selective —
not a universal requirement and not a binding vendor-selection mechanism
without jurisdiction-specific legal review (**Target**).

## Why Maine, why small towns

Two structural reasons, both from product.md:

- **Simple governance.** Small towns have a short decision path — one
  administrator can approve a small pilot (Maine Title 30-A §2636). The sales
  cycle is one person, one decision *for the pilot purchase* (**Actual** as the
  stated rationale). Operational vendor payments are not one-person: they run
  through the select-board warrant workflow (30-A §5603), which the product must
  work inside rather than around.
- **A clean first use case.** The beachhead is **seasonal service contracts** —
  snow plowing, road maintenance, landscaping. These are high-frequency,
  high-accountability-gap contracts that recur every year in every town, which
  makes them the simplest way to prove the product (**Actual** as the stated
  strategy).

Maine specifically is the launch geography because the eight priority target
towns are all in Maine and the pilot authority under Title 30-A §2636 is concrete
there. (The "lowest-responsible-bid duty under §124" once cited here is **not** a
town rule — §124 governs *county* purchasing, and the Maine *state* standard is
best-value, not lowest-bid; the sub-5K town standard is local-ordinance —
**Needs proof** at the town level, see [[records-and-civic-law]].)

The payment-cost evidence adds a second beachhead reason: small towns are most
exposed to fixed-cost diseconomies. A modest monthly treasury, lockbox,
reporting, Positive Pay, reconciliation, exception, or audit burden can be
material when one clerk handles finance, records, and resident questions.
CivicChain should therefore be framed as low-fixed-overhead workflow capacity,
not only as a cheaper payment rail.

### Market sizing for the beachhead

| Metric | Number | Claim status |
|--------|--------|--------------|
| Annual U.S. municipal spending | $2T+ | **Needs proof** (source and definition) |
| Municipalities under 25K population (addressable) | ~19,500 US municipal governments | **Reconciled** ([[market-sizing]]) — "16,500 vs 19,500" was municipal-vs-township category confusion, not a conflict; use ~19,500 |
| New England municipalities (initial SOM) | ~1,400 | **Needs proof** (source before external use) |
| Maine municipalities | 482 (2023) | **Reconciled** ([[market-sizing]]) — 484/488 are stale pre-deorganization vintages |
| Priority target towns | 8 (all in Maine) | **Target** (internal target list) |

The former municipality-count "conflict" is **reconciled** in [[market-sizing]]:
16,500 and 19,500 are two different Census of Governments categories (township vs
municipal), not the same number counted twice. Use ~19,500 municipal governments;
open primary Census cells in-browser before external publication.

### Per-municipality economics (white paper, illustrative)

These figures come from the white paper §12.4 and are raw v9 ambition, not the
current public claim boundary. They are **Modeled** scenario economics — use as
internal context only.

| Metric | Estimate | Claim status |
|--------|----------|--------------|
| New England municipalities (SOM) | ~1,400 | **Needs proof** |
| Average annual services procurement budget per town | $150K–$500K (snow/road categories; total outbound contract payment volume modeled at ~$18M per municipality across all service types) | **Modeled** |
| Annual SaaS contract per municipality | $6,000–$35,000 | **Modeled** |
| Transaction fee revenue per municipality (at scale) | $63,000/yr | **Modeled** |
| Float yield per municipality (Path B) | $2,960–$6,600/yr | **Modeled** |
| Total revenue per municipality (blended) | $72,000–$105,000/yr | **Modeled** |
| Beachhead TAM (New England SAM, three streams) | $100M–$147M annually | **Needs proof** (TAM figure needs dated source check) |
| Year 1 pilot target | 5–10 municipalities | **Target** |
| Year 3 target (base case) | 150–300 municipalities | **Target** |
| Year 3 target (accelerated) | 300–500 municipalities | **Target** |

## The eight target towns

All eight are in Maine and form the internal priority list (**Target**). The
notes are the stated rationale for each.

| # | Town | Population | Why it is a target |
|---|------|-----------|--------------------|
| 1 | **Gray** | 8,429 | Already contracts 30+ miles of snow plowing on 3-year terms — exact use-case match. |
| 2 | **Rumford** | 5,942 | Featured on GovTech.com for 5G streetlight adoption — tech-forward. |
| 3 | **Ellsworth** | 8,657 | Attended Maine Municipal Innovation Day 2026. |
| 4 | **Falmouth** | 12,755 | Affluent Portland suburb with fast budget decisions. |
| 5 | **Kennebunk** | 11,820 | Heavy seasonal road and snow contracts. |
| 6 | **Camden** | 5,242 | First Maine town to adopt Town Manager form (1925); 3-year contract limits. |
| 7 | **Bar Harbor** | 5,244 | Acadia tourism creates seasonal service needs. |
| 8 | **South Portland** | 26,930 | AAA bond rating, $61.4M budget — flagship reference target. |

Note: Harpswell, used throughout the product story, is a **demo scenario**, not
a confirmed live customer and not one of the eight priority towns. Treat it as
illustrative until [[business-status|a separate business-status document]]
confirms a live customer, signed pilot, LOI, or design partner.

## How adoption spreads — the three pressure loops

Growth is not modeled on traditional marketing. It runs through three
reinforcing pressure loops (**Modeled** — this is the stated growth thesis, not
observed adoption data).

- **Vendor pressure.** A contractor gets a cleaner, faster approved-payment
  workflow in one town and waits through a slower manual cycle in the next,
  then tells other contractors and asks the slow-paying town to adopt
  CivicChain. Word moves fast in small contractor networks.
- **Competitive pressure.** When one town's bids drop ~5% because vendors stop
  pricing payment risk, the neighboring town notices the gap. (The earlier "by
  law must take the lowest responsible bid (§124)" framing is **not** reliable:
  §124 is *county* purchasing and the state standard is best-value — the
  town-level duty is **Needs proof**, see [[records-and-civic-law]]. The loop runs
  on visible savings pressure, not an assured statutory mandate.)
- **Public-record pressure.** A body of towns with public procurement records
  showing lower bids creates evidence that is hard to ignore. The platform
  markets itself through its own transparency.

The ~5% bid-drop and faster-approved-payment contrast are **Modeled** scenario
mechanics, not measured outcomes. The "lowest-responsible-bid duty" once treated
as the **Actual** statutory hook is downgraded to **Needs proof** — §124 is
county purchasing, the Maine state standard is best-value, and the sub-5K town
standard is local-ordinance ([[records-and-civic-law]]) — so vendor savings reach
the town through buyer choice and visible pressure, not a guaranteed statute.

### Expansion path

Maine pilot towns → Maine Municipal Association → national channels (ICMA,
NLC). This is the stated path (**Target**); see [[09-go-to-market|09 — Go-to-market]]
for the staged rollout.

## Why the beachhead works (competitive note)

The beachhead choice rests on a category claim: no incumbent in municipal
procurement software offers real-time vendor payment, MCC-locked contract spend
control, or a public ledger of every transaction (**Needs proof** as a
categorical claim — cite current product docs before external use). The white
paper §12.5 frames Tyler Technologies' citizen-payment portals as ACH-based
with 3–5 day settlement against CivicChain's same-business-day vendor payment;
Tyler revenue and transaction-count figures there are **Needs proof** (dated
source check). MCC-locked vendor cards are treated as core to the product story
but their **v1.0 shipping scope is unresolved** — the raw white paper's Release 1
says no virtual cards until Release 2 — so do not present cards as confirmed
v1.0 scope. See [[06-competition|06 — Competition]] for the full positioning.

## Sources

- [[_docs/facts/product]] — "Market context > Size / Why Maine, why small
  towns / The eight target towns / How it spreads"; "Three perspectives";
  "The Harpswell scenario" (demo-status note); pricing pilot-entry threshold.
- [[_docs/facts/whitepaper]] — §12.4 Beachhead Market: New England Small Towns
  (lines 946–971, per-municipality economics and Year 1/Year 3 targets); §12.5
  Competitive Position (lines 972–979).
- [[_docs/facts/evidence/payment-cost-savings]] — all-in payment-cost evidence,
  small-town fixed-cost diseconomies, and customer-savings proof standard.

## Related

- [[04-market-and-tam|04 — Market and TAM]]
- [[09-go-to-market|09 — Go-to-market]]
- [[06-competition|06 — Competition]]
- [[_docs/business/index|Index — business knowledge base]]
