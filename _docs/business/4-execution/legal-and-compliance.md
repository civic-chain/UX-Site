---
description: "CivicChain's regulatory and compliance posture in one place — money transmission, KYC/AML, immutable-ledger records law, procurement, patents, and voting. Consolidates open legal questions the audit found scattered; most are Needs-counsel."
depends-on:
  - "[[_docs/business/4-execution/11-ip-and-moat]]"
  - "[[_docs/business/4-execution/13-risks-and-mitigations]]"
  - "[[_docs/facts/product]]"
  - "[[_docs/facts/CivicChain_Product_Guide_2026]]"
  - "[[_docs/facts/evidence/patent-filings]]"
  - "[[_docs/facts/evidence/maine-municipal-constraints]]"
  - "[[_docs/facts/evidence/funds-flow-and-licensing]]"
  - "[[_docs/facts/evidence/payment-cost-savings]]"
  - "[[_docs/facts/evidence/records-and-civic-law]]"
---

# Legal and Compliance Posture

## Claim Boundary

- Claim status: mixed — almost every item is Needs proof / Needs counsel. This doc exists to give the compliance posture one owner instead of scattering it across risk rows.
- Source note: [[_docs/business/4-execution/11-ip-and-moat]]; [[_docs/business/4-execution/13-risks-and-mitigations]]; [[_docs/facts/evidence/patent-filings]]; [[_docs/facts/evidence/maine-municipal-constraints]]; [[_docs/facts/evidence/payment-cost-savings]]; [[_docs/facts/product]]; [[_docs/facts/CivicChain_Product_Guide_2026]]. The legal analyses themselves are not yet done — this doc owns the questions, not the answers.

A single home for CivicChain's regulatory surfaces. The audit found these
scattered across risk-table rows, pricing notes, and the Maine evidence memo,
with no owner — a counsel reader had nowhere to start. Each item states the
current boundary and what is still **Needs counsel / Needs founder input**.

## Money transmission and funds custody

- **Boundary (Target):** CivicChain orchestrates workflow and payment operations;
  municipality-owned funds, no CivicChain-held pooled accounts, no commingling
  (product.md; [[13-risks-and-mitigations]] risk #1).
- **Open:** the **licensed money-transmitter of record on day one is undefined** —
  Rail, a BaaS sponsor, the municipality, or CivicChain — and no state MTLs are
  named. The Rail-first vs BaaS-first seed decision ([[12-roadmap-and-stages]]) is
  unresolved, which keeps the regulated party open. **Needs founder + fintech/MTL
  counsel.**
- **Framework (external research, [[funds-flow-and-licensing]]):** "municipality-
  owned funds" does not by itself avoid licensing — what controls is fitting the
  FinCEN **payment-processor** or **agent-of-payee** exemptions (settlement on
  BSA-regulated rails, payee-side agreements, payer bears no remittance risk) and
  Maine's parallel exemptions in **32 M.R.S. §6074(1)–(2)**. Plausibly achievable,
  but an exemption-design question for counsel — not a settled fact.
- **Guide conflict:** the 2026 Product Guide's "money transmitter licensing
  maintained in all states" claim is not adopted. It is **Needs founder proof +
  counsel** until the license/exemption owner is identified.
- **Payment-cost evidence:** crypto/stablecoin use cannot be justified legally
  as "cheaper than banks" in the abstract. Public-finance posture has to be a
  regulated, dollar-denominated workflow with no municipal balance-sheet
  exposure to volatile tokens, counsel-reviewed conversion/custody, and a clear
  comparison against ACH/e-check, FedNow, RTP, AP automation, and audit controls.

## Float yield on public funds

- **Boundary (Modeled):** the financial model books ~4% annualized yield on
  contract-pool balances as operational revenue ([[08-financial-projections]],
  [[07-business-model-and-pricing]]).
- **Framework (external research, [[funds-flow-and-licensing]]):** Maine law points
  one way — interest follows the public principal. Interest on municipal **reserve
  funds** accrues to the fund (30-A §5802(1)(A)); the municipal treasurer invests
  **all** municipal funds (§5706); spending is bound by a constitutional
  public-purpose rule. No statute squarely lets a private operator keep float
  interest on in-transit municipal money.
- **Open:** whether CivicChain may book the ~4% float as **its own** revenue, or
  must credit it to the municipality (which would invalidate the float line in the
  model). **The sharpest legal exposure in the business case. Needs counsel.**

## Card program — KYC / AML / BSA

- **Boundary (Modeled):** spend control via MCC locks, per-card limits, hard
  decline ([[07-business-model-and-pricing]]).
- **Open:** no named **BaaS sponsor**, no **program manager of record**, no
  **BSA-liability owner**, and no fallback if no sponsor underwrites a pre-revenue
  startup. v1.0 card scope itself is unresolved. **Needs founder + BaaS counsel.**
- **Framework (external research, [[funds-flow-and-licensing]]):** in a sponsor-bank
  program **BSA/AML liability sits with the sponsor bank and cannot be delegated**;
  post-Synapse (2024–25) the bar rose sharply (~45% of BaaS programs were under a
  formal enforcement action by May 2025) and yield/interchange-only models are weak
  sponsor candidates — so "will a sponsor underwrite a pre-revenue startup" is a
  real, material risk. The MCC-lock control itself is a **standard** issuer-processor
  feature ([[technology-baseline]]), not proprietary technology.

## Records law on an immutable ledger

- **Boundary (Actual story):** transparency-by-default; XRPL anchoring is
  permanent ([[14-how-it-works]], product.md).
- **Open:** **no lawful correction / sealing / PII-deletion model** for an
  immutable record, and it is unconfirmed whether on-chain publication of these
  records is lawful at all. Voter-PII minimization exists ([[11-ip-and-moat]]) but
  does not cover the general case. **Needs counsel + records-law analysis.**
- **Framework (external research, [[records-and-civic-law]]):** Maine law mandates
  record **preservation**, not deletion (5 M.R.S. §95-B) — so immutability does not
  violate a duty to delete; the real exposure is irreversibility colliding with
  *sector-specific* correction/sealing rights and with PII or trade-secret content
  published on-chain. Defensible pattern: anchor only a **hash/reference** on-chain
  (close to the XRPL memo model) and keep raw records and PII off-chain.

## Procurement law

- **Boundary:** the product sits **inside** the select-board warrant workflow
  (Maine 30-A §5603), not replacing board authority — the strongest compliance
  answer ([[13-risks-and-mitigations#Maine-specific constraints]]).
- **Open (two):** (1) the sub-$5K pilot wedge resembles the **"contract stacking"**
  pattern Maine's 2024 Single Audit flagged as its most common finding — needs an
  auditor-facing response. (2) **No affirmative analysis** that civic input or
  voting touching vendor selection avoids bid-protest, open-meeting, or
  equal-access problems. **Needs procurement counsel.**
- **Framework correction (external research, [[records-and-civic-law]]):** the canon
  repeatedly cited "Maine 30-A §124 requires the lowest responsible bid" as a
  savings driver — that citation is wrong. §124 governs *county* purchasing; the
  Maine *state* standard is **best-value** (5 M.R.S. §1825-B), not lowest-bid; the
  award standard for sub-5K *towns* is **local charter/ordinance**, not a statewide
  statute. So "the law forces the cheaper bid to win" is **Needs proof** at the town
  level. Separately, award amounts are already public under §1825-B(6) (publishing
  them is low-risk); only vendor-marked trade-secret material is exempt.
- **Guide conflict:** "no procurement process in most New England states" is not
  adopted; current boundary is jurisdiction-specific and counsel/auditor-reviewed.

## Patents and IP

- **Boundary:** provisional applications filed 2026-04-04; priority date and
  intent only, **never "patented"** ([[11-ip-and-moat]]).
- **Open:** no non-provisional conversion plan, no freedom-to-operate analysis,
  and **ownership is unproven** — the assignment paperwork was a template with
  unfilled placeholders. **Needs founder + patent counsel.**

## Voting / civic input

- **Boundary:** Tier 2, advisory civic-input layer; **not binding** without
  jurisdiction-specific legal review ([[18-journey-resident]]).
- **Open:** not cleared against election / voting-rights statutes; liability for a
  wrong include / exclude is unallocated. **Needs election-law counsel.**
- **Framework (external research, [[records-and-civic-law]]):** Maine FOAA reaches
  **advisory bodies** (1 M.R.S. §402), so an official civic-input process likely
  triggers open-meeting/record duties; advisory input is most defensible kept
  strictly non-binding, with the award resting on lawful best-value criteria, not
  popularity.

## What removes these gaps

Counsel work plus founder decisions, item by item. Until then this doc's job is to
keep the posture honest and in one place.

The 2026 Product Guide's security, SLA, procurement, licensing, and compliance
claims remain **Needs founder proof / Needs counsel** until backed by contracts,
policies, audits, or legal memos.

## Sources

- [[_docs/facts/product]]
- [[_docs/facts/CivicChain_Product_Guide_2026]]
- [[_docs/facts/evidence/patent-filings]], `maine-municipal-constraints.md`
- [[_docs/facts/evidence/funds-flow-and-licensing]] — money-transmission, BaaS/BSA, float-yield (2026-06-03 research)
- [[_docs/facts/evidence/payment-cost-savings]] — all-in payment-cost packet,
  crypto/FedNow/RTP/card/ACH baselines, and public-finance caution
- [[_docs/facts/evidence/records-and-civic-law]] — records vs immutability, voting, vendor confidentiality (2026-06-03 research)
- [[_docs/business/4-execution/11-ip-and-moat]], [[_docs/business/4-execution/12-roadmap-and-stages]], [[_docs/business/4-execution/13-risks-and-mitigations]]
