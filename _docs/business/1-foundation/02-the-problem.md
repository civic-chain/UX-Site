---
description: "The market problem CivicChain solves: 1970s-era municipal procurement, the cost of slow payment, modeled budget leakage, hidden payment-fee stack, and the infrastructure-not-corruption insight."
depends-on:
  - "[[_docs/facts/product]]"
  - "[[_docs/facts/whitepaper]]"
  - "[[_docs/facts/evidence/payment-cost-savings]]"
---

# 02 — The problem

## Claim Boundary

- Claim status: mixed — see inline labels; most market numbers are Needs proof pending dated citation
- Source note: [[_docs/facts/product]] (The problem, lines 82-111; Pricing context); [[_docs/facts/whitepaper]] (Executive Summary, lines 44-49); [[_docs/facts/evidence/payment-cost-savings]]

## The starting condition

Small towns manage millions of dollars in contracted services using systems
designed in the 1970s–80s: paper checks, Excel spreadsheets, emailed RFPs, and
manual reconciliation. This is not framed as a technology complaint. The claim
is that the old workflow costs real money. **Actual** — this is the consistent
problem framing across product materials.

The white paper states the same starting condition in stronger language:
procurement processes that are "paper-heavy, financially opaque, and nearly
impossible to audit after the fact," with payments that "reach contractors
slowly, manually, and with no mechanism for anyone outside the finance
department to verify where the money actually went." **Target** — this is raw
v9 ambition framing from the white paper, not the current public claim
boundary; use the calmer product.md version for external copy.

## The mechanism, not the rail fee

The strongest problem statement is **not** "large government payments are
expensive because banks charge huge transfer fees." ACH, checks, and wires can be
cheap at the rail layer. The expensive part is the surrounding municipal
workflow: board/warrant approval cycles, vendor-financed work, paper/check AP,
manual reconciliation, delayed public evidence, and audit/FOAA assembly.

Resident payment-portal fees are real background pain, but they are not the core
CivicChain unit of comparison. CivicChain's main flow is a town paying and
proving a vendor contract. The apples-to-apples comparison is therefore the same
municipal work, same vendor, same contract amount: status quo vendor payment and
evidence workflow versus CivicChain's SAR/WCR/payment-authorization workflow and
target controlled-spend rail.

Do not use Western Union as the baseline without a town-specific example. The
safer language is: **payment operations are slow and costly because approval,
records, vendor setup, reconciliation, and public evidence are manual.**

The founder-reported meeting thesis about "hidden commissions" is directionally
useful but must be decomposed before use. The plausible stack is card
acceptance, payment processor / portal, bank-service and treasury operations,
contactless wallet / issuer / card-program economics, compliance work, and
manual office labor. [[_docs/facts/evidence/payment-cost-savings]] keeps the
evidence boundary: some of these costs can be reduced by CivicChain's workflow,
some remain as Rail/BaaS/card-provider costs, and some require provider term
sheets before they become public claims.

The newer all-in payment-cost packet tightens the comparison unit. Official fee
schedules are not the enemy and should not be described as "lying"; they are
incomplete for strategy because they usually show only the checkout or rail
front door. The problem statement should include the hidden operating layers:
bank analysis statements, treasury services, returned items, exceptions,
reconciliation, audit prep, and public-record response.

## The numbers

Every figure below is the headline number plus its claim status. Most market
statistics are not yet externally publishable: they need a dated citation to
the primary source before public use.

| Claim | Number | Claim status | Source context |
|-------|--------|--------------|----------------|
| Added to U.S. construction bids annually because vendors expect slow payment | **$273B** | **Needs proof** (dated citation) | White paper attributes this to the Rabbet 2023 Construction Payments Report. Cite the report directly before public use. |
| Modeled budget leakage in a sample municipality | **13.8%** | **Modeled** | On a modeled $385K procurement budget, the scenario loses $52,958/year to fees, premiums, labor overhead, and audit costs. Do not call this an average without proof. |
| Public card / convenience fees | Often around **2–3%** in checked official examples | **Actual as background pain** | Useful evidence that payment friction is visible to residents; not the core vendor-contract comparison. |
| All-in cost per reconciled, audit-ready municipal transaction | Not yet measured | **Needs proof** | The newest evidence packet identifies the cost layers to measure: fee schedules, bank statements, AP/reconciliation time, exception logs, audit adjustments, close-calendar time, and public-record hours. |
| Vendor payments still on paper check in small municipalities | **50–70%** | **Needs proof** | Industry estimate in legacy materials; needs source or primary research. |
| Annual procurement fraud losses in local government | **$1.3B+** | **Needs proof** (dated citation) | Use only with a source and a definition of local-government procurement fraud. |
| General contractors who raised bids in 2024 due to payment delay | **97%** | **Needs proof** (dated citation) | Trade-survey claim; cite directly before public use. |
| Portion of construction costs attributable to slow payment | **14%** | **Needs proof** (dated citation) | Industry estimate; cite directly before public use. |

## Where the modeled 13.8% leaks

The leakage figure is a scenario, not a measured average. On a **Modeled**
$385K municipal procurement budget, the loss breaks down as:

| Leak | Annual amount | Basis |
|------|---------------|-------|
| Processing fees | $5,468 | 2.5% per transaction |
| Vendor bid premiums | $14,370 | 3–8% risk premium for payment uncertainty |
| Staff labor overhead | $25,320 | 18–25% of procurement staff time spent on manual work |
| Audit / FOIA overhead | $3,050 | — |
| Untracked expenses | $4,750 | — |

These components sum to the $52,958/year (13.8%) figure cited above. The whole
breakdown carries the **Modeled** label — it is illustrative economics on a
sample budget, not a town's audited books.

## The cost of slow payment

The leakage model points to a single mechanism: a typical small-town
contractor waits 30–45 days for payment after finishing work, sometimes longer.
To absorb that delay, the contractor adds a risk premium to every bid — in
effect financing the town's slow payment process. **Modeled** — the vendor bid
premium (3–8%) is the largest line in the leakage scenario and the clearest
lever for the product.

This connects to Maine procurement law — but the once-cited hook does **not**
hold as stated: Title 30-A §124 governs *county* purchasing, not town purchasing,
and the Maine *state* standard is **best-value**, not "lowest responsible bid"
(5 M.R.S. §1825-B). The award standard for sub-5K *towns* is set by local
charter/ordinance and is **Needs proof** at the town level
([[records-and-civic-law]]). So removing the payment-risk premium lowers bids, but
"lower bids flow through automatically by statute" cannot be asserted — it depends
on each town's actual procurement rule.

## The core insight

> "The problem is not corruption. The problem is infrastructure."

Towns are not losing money primarily because people are stealing. They lose
money because the payment system is slow and opaque: vendors charge more, staff
spend time on manual reconciliation, and nobody can easily see where the money
went. **Actual** — this is the central product thesis as stated in materials.

A related framing positions the differentiator structurally: the platform "does
not make fraud harder to commit by policy. It makes fraud impossible to conceal
by design." **Target** — directional positioning; do not present as a proven
security property without review.

## Why now (open gap)

The problem is well framed, but the repo does **not** yet prove the urgency
trigger: why a town must switch this year instead of tolerating the same manual
workflow for another budget cycle. Possible catalysts — audit pressure,
public-record burden, vendor availability, or a reference-town moment — need
founder evidence. Until then, "why now" is an open blocker, not a public claim.
See [[open-external-blockers]].

## Claim-boundary notes

- The white paper's Executive Summary describes five integrated modules
  (structured proposals, geolocation voting, smart contract management, RLUSD
  phone-tap payments, blockchain payment rail) as central and RLUSD-native. The
  current claim boundary treats geolocation voting as Tier 2 jurisdiction-aware
  civic input, RLUSD as optional Tier 2 / later-layer settlement (v1.0 ships USD
  bridge mode), and MCC-locked virtual cards as **unresolved v1.0 scope** —
  product story treats them as core, but the white paper's Release 1 says no
  virtual cards until Release 2. Do not present cards as confirmed v1.0 scope.
- Patents: provisional applications filed April 4, 2026. Never "issued patents"
  or "patented technology." The white paper's "Built on Patented..." and
  "patented architecture" language overstates the locally held evidence.
- Market and rail figures — Ripple / RLUSD / market-cap / rail-volume /
  license-count / TAM / CAC / ARR / ROI — are **Needs proof** pending a dated
  source check before any external use.
- Harpswell is a demo scenario, not a confirmed live customer.

## Sources

- [[_docs/facts/product]] — "The problem" (lines 82–111): the numbers table,
  the 13.8% leakage breakdown, the core insight; vendor payment-delay framing
  in "For the Vendor / Contractor"; pricing and claim-discipline boundaries.
- [[_docs/facts/whitepaper]] — Executive Summary (lines 44–49): raw v9 problem
  framing and the five-module ambition, used as source material and explicitly
  marked as not the current public claim boundary.
- [[_docs/facts/evidence/maine-municipal-constraints]] — warrant-cycle,
  AP/paper/check, audit, FOAA, TRIO/PayPort, and blockchain-positioning
  constraints.
- [[_docs/facts/evidence/payment-cost-savings]] — current payment-fee examples,
  hidden fee-stack hypothesis, ACH/wire/FedNow/RTP baselines, all-in municipal
  payment-cost packet, and customer-savings mechanism.

## Related

- [[01-what-it-is|01 — What CivicChain is]]
- [[03-the-product|03 — The product]]
- [[customer-savings-mechanism|Customer savings mechanism]]
- [[06-competition|06 — Competition]]
- [[_docs/business/index|Index — business knowledge base]]
