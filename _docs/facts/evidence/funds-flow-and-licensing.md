---
description: "Internet-sourced evidence on funds-flow regulation — money-transmitter licensing (federal MSB + Maine), BaaS/sponsor-bank liability, and float-yield legality on public funds. Addresses audit gaps legal Q4/Q6 and investor Q8. Evidence input, not a legal opinion; verify primary URLs before external use."
depends-on: []
---

# Funds-Flow and Licensing Evidence

Internet research (2026-06-03) on the most dangerous gap in the expert audit:
who is the regulated money-mover and may CivicChain keep the float. This is an
**evidence input, not approved public copy and not a legal opinion.** It lowers
the unknown from "we don't know if this is even legal" to "here is the framework
and the path"; the final compliance call stays with licensed counsel.

Architecture assumed: funds stay **municipality-owned**; CivicChain orchestrates
workflow and payment operations and does **not** hold pooled municipal funds in
CivicChain-owned accounts ([[marketing-content-claim-audit]]).

## 1. Federal money transmission (FinCEN / MSB)

- **Finding:** Under the Bank Secrecy Act (31 CFR 1010.100(ff)), accepting and
  transmitting funds triggers money-transmitter status **unless an exemption
  applies**. The **payment-processor exemption** requires *all four* of:
  (a) the entity facilitates purchase of goods/services or bill payment;
  (b) it operates through clearance/settlement systems that admit **only
  BSA-regulated financial institutions**; (c) it acts under a **formal
  agreement**; and (d) that agreement is **at minimum with the seller/creditor
  who provides the goods and receives the funds** (FIN-2014-R009). The separate
  **agent-of-the-payee** path treats receipt by the agent as receipt by the
  payee. "Municipality-owned funds" is **not** itself the controlling test —
  what controls is whether settlement rides BSA-regulated rails and whether
  agreements sit on the payee side.
- **Status:** **[Confirmed]** for the four-condition test. **[GAP: not
  confirmed]** that municipality-owned funds alone removes the obligation — no
  source supports that.
- **Sources:**
  - FIN-2014-R009, *Application of MSB Regulations to a Company Acting as an ISO
    and Payment Processor* (FinCEN, 2014-08-27) — https://www.fincen.gov/resources/statutes-regulations/administrative-rulings/application-money-services-business
    *(canonical FinCEN page returned 403 to automated fetch; four conditions
    confirmed via the Orrick alert below, which quotes it verbatim)*
  - *FinCEN Rules MSB Regulations Do Not Apply to ISOs and Exempt Payment
    Processors* (Orrick InfoBytes, 2014-09-05) — https://infobytes.orrick.com/2014-09-05/fincen-rules-regulations-money-services-businesses-do-not-apply-isos-and-exempt-payment-processors/
  - FIN-2014-R002 (FinCEN, 2014-01-30) — https://www.fincen.gov/resources/statutes-regulations/administrative-rulings/request-administrative-ruling-application
- **Residual question for counsel:** Does CivicChain's actual flow keep
  settlement entirely inside BSA-regulated rails and rest on agreements with the
  *vendor-payee* (fitting payment-processor / agent-of-payee) — or does any step
  (pooling, stablecoin layer, card-load) constitute transmission outside those
  rails?

## 2. Maine money transmitter license (MTL)

- **Finding:** Maine replaced its old money-transmitter statute with the **Maine
  Money Transmission Modernization Act, Title 32, Chapter 79-A** (the multistate
  model act, administered via NMLS by the Bureau of Consumer Credit Protection).
  Critically, **32 M.R.S. §6074 carries both exemptions CivicChain would rely
  on**: §6074(1) exempts **operators of a payment system** providing
  processing/clearing/settlement among licensees/exempt persons; §6074(2)
  exempts a **person appointed as agent of a payee**, *provided* (A) a written
  agreement appoints the agent, (B) the payee holds the agent out as accepting
  payment on its behalf, and (C) **payment is treated as received by the payee
  on receipt by the agent, with no risk of loss to the payer if the agent fails
  to remit**. Where a license *is* required, NMLS terms run ~$100k minimum net
  worth, $100k surety bond, $500 application fee. *(Older sources citing
  "Chapter 80, Subchapter 1" are superseded — use Chapter 79-A.)*
- **Status:** **[Confirmed]** — primary statute text retrieved and read.
- **Sources:**
  - *Maine Money Transmission Modernization Act*, 32 M.R.S. Ch. 79-A incl. §6074
    (Maine Legislature, gen. 2025-10-20) — https://legislature.maine.gov/statutes/32/title32ch79-A.pdf
  - *Money Transmitters* licensing page (Maine Bureau of Consumer Credit
    Protection) — https://www.maine.gov/pfr/consumercredit//industry/licensing/money_transmitter.htm
- **Residual question for counsel:** Confirm CivicChain meets §6074(2)'s "no risk
  of loss to the payer" condition (the town's payment obligation must be
  extinguished the instant funds are received), and that adjacent expansion
  states adopting the Modernization Act carry the same exemption language.

## 3. BaaS / sponsor-bank / program-manager model

- **Finding:** In a sponsor-bank card program the bank is the regulated issuer
  and the startup is program manager. **BSA/AML liability sits with the sponsor
  bank and cannot be delegated** — "the use of third parties does not diminish
  or remove banking organizations' responsibilities" (Interagency Guidance on
  Third-Party Relationships, June 2023). Post-Synapse scrutiny tightened sharply
  through 2024–25 (OCC RFI on bank-fintech arrangements; enforcement against
  Evolve Bank and Blue Ridge Bank). Market reality for a pre-revenue startup is
  adverse: as of **May 2025 nearly 45% of BaaS programs were supported by banks
  under formal enforcement action**, shrinking onboarding capacity; banks now
  demand daily ledger access, SOC 2, a compliance officer, and operational
  maturity; and **yield/interchange-only revenue models are flagged as weak
  partners** because they collapse when rates fall.
- **Status:** **[Confirmed]** that BSA/AML liability is non-delegable and the bar
  rose post-Synapse. **[Conflicting sources]** on whether a pre-revenue startup
  can realistically land a sponsor in 2025–26 — feasible *with* a compliance
  build-out, but materially harder; no hard minimum-revenue threshold stated.
- **Sources:**
  - *Fintech-Bank Partnerships Under Scrutiny: BSA/AML Expectations* (Fenwick &
    West) — https://www.fenwick.com/insights/publications/fintech-bank-partnerships-under-scrutiny-what-fintechs-need-to-know-about-bsa-aml-expectations
  - *6 ways bank-fintech tie-ups have changed since Synapse collapse* (American
    Banker) — https://www.americanbanker.com/news/6-ways-bank-fintech-tie-ups-have-changed-since-synapse-collapse
  - *What Fintechs Actually Need from a Sponsor Bank* (FinWise Bank, ~2025;
    ~45%-under-enforcement stat) — https://www.finwise.bank/news/fintech/what-fintechs-actually-need-from-a-sponsor-bank-and-why-so-few-deliver-it/
- **Residual question for counsel/advisor:** Which entity is the BSA-obligated
  party in CivicChain's structure, and does a credible sponsor bank exist that
  will onboard a pre-revenue municipal-payments program — or is a licensed-MTL
  or BIN-sponsor-via-established-processor route more realistic before launch?

## 4. Float yield on public funds

- **Finding:** Maine law points consistently in **one direction — interest
  follows the public principal — but no single statute squarely bars a private
  operator from keeping float interest.** For **reserve funds**, "any interest
  earned or capital gains realized shall accrue to and become part of the fund"
  (30-A M.R.S. §5802(1)(A)), and municipal officers are trustees of that fund.
  For municipal funds **generally**, "the treasurer shall invest **all municipal
  funds**, including reserve funds and trust funds" (30-A M.R.S. §5706) — i.e.
  the money is invested by the *municipal* treasurer — but §5706 is **silent on
  who owns the interest** (verified directly). All municipal spending is also
  bound by a constitutional **public-purpose** requirement (Maine Supreme
  Judicial Court doctrine). Nothing found authorizes a private vendor to retain
  yield on town money.
- **Status:** **[Confirmed]** that interest on Maine *reserve* funds accrues to
  the fund (§5802(1)(A)) and that the *municipal* treasurer invests all municipal
  funds (§5706, read verbatim). **[GAP: not confirmed]** that any statute
  *directly* prohibits a private operator from retaining float interest on
  in-transit municipal money — this is an open legal question, but every
  adjacent rule points toward interest belonging to the town.
- **Sources:**
  - 30-A M.R.S. Ch. 223 *Municipal Finances* — §5802(1)(A); trustee provision
    (Maine Legislature, gen. 2025-10-23) — https://legislature.maine.gov/statutes/30-A/title30-Ach223.pdf
  - 30-A M.R.S. §5706 *Deposit or investment of funds* (Maine Legislature) — https://www.mainelegislature.org/legis/statutes/30-A/title30-Asec5706.html
    *(verified verbatim: "the treasurer shall invest all municipal funds,
    including reserve funds and trust funds"; statute is silent on interest
    ownership)*
- **Residual question for counsel:** Can CivicChain lawfully book the ~4% float
  yield as **its own revenue** when the underlying principal is municipal public
  money — or must that yield be credited to the municipality, which would
  invalidate the float line in the financial model? **This is the sharpest legal
  exposure in the business case.**

## Bottom line

The **municipality-owned-funds framing does not by itself avoid
money-transmitter licensing**; what matters is fitting the payment-processor or
agent-of-payee exemptions (FinCEN four-condition test; Maine §6074), which
require settlement on BSA-regulated rails, payee-side agreements, and the payer
bearing no remittance risk — plausibly achievable, but an exemption-design
question for counsel, not a settled fact. The **~4% float-yield revenue line is
the highest-risk assumption**: Maine law directs interest on public funds back
to the public fund, so a private operator retaining that yield is legally
doubtful and should not appear in any investor document without counsel sign-off.
