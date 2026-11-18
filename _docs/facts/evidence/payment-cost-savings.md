---
description: "Evidence memo on where CivicChain customer savings can defensibly come from: public payment fees, low-cost ACH/wire baselines, vendor risk premium, staff burden, controlled spend, and audit evidence."
depends-on:
  - "[[_docs/facts/CivicChain_Product_Guide_2026]]"
  - "[[_docs/facts/whitepaper]]"
  - "[[_docs/facts/evidence/municipal-payment-costs-hidden-behind-convenience-fees]]"
  - "[[_docs/facts/evidence/maine-municipal-constraints]]"
  - "[[_docs/facts/evidence/funds-flow-and-licensing]]"
  - "[[_docs/facts/evidence/technology-baseline]]"
---

# Payment Cost and Customer-Savings Evidence

Internet and white-paper research from 2026-06-04, expanded with the
2026-06-05 all-in municipal payment-cost packet
([[_docs/facts/evidence/municipal-payment-costs-hidden-behind-convenience-fees]]).
This is an evidence input, not approved public copy. It answers a narrow
question: how can CivicChain credibly say it saves money for people, vendors,
and municipalities?

## Bottom line

Do **not** say "Americans pay huge commissions everywhere, and CivicChain saves
money by replacing banks with crypto." That is too broad and, for many
government/vendor payments, the wrong baseline.

The defensible claim is more precise:

- Card and online public-payment portals often expose residents to visible
  convenience fees in the roughly 2-3% range, while ACH/e-check/check paths are
  often cheaper or fee-free.
- ACH, check, and wire rails can be cheap at the direct rail layer, so the
  strongest CivicChain savings case is not simple bank-fee arbitrage.
- The right cost unit is **cost per reconciled, audit-ready, legally valid
  municipal transaction**, not the posted convenience fee or the raw rail fee.
- CivicChain's customer savings should be argued at the workflow level:
  reduced vendor payment-risk premium, less clerk/AP/reconciliation work,
  controlled contract spend, faster audit/FOAA evidence, and less need to
  reconstruct records after the fact.
- XRPL/RLUSD/Rail/card technology matters because it can make those workflow
  controls enforceable and visible while money moves. It does not, by itself,
  prove whole-product ROI.

The 2026 Product Guide's 0.35% vs 2.25-2.75% comparison is a modeled sales
comparison, not proof of product savings. It can be used only as a hypothetical
processor-rate contrast after same-contract workflow proof and provider terms;
it must not replace workflow-level savings framing.

The 2026-06-05 all-in cost packet strengthens the same boundary. It does **not**
prove that official sources are false or that crypto is automatically cheaper.
It proves that official fee schedules are incomplete for strategy because they
usually expose only the payment front door, while the municipal operating cost
also includes portals, bank analysis statements, treasury services, returned
items, exception handling, AP work, reconciliation, audit prep, and public-record
response.

## Founder-reported fee-stack hypothesis

Founder/user debrief from the team conversation: the perceived pain is not only
one visible convenience fee. It is a stack of hidden or poorly explained costs:
payment processing, banking/treasury services, card acceptance, contactless
payment acceptance, settlement delay, office/back-office labor, and the staff
time needed to reconcile and prove where money went.

Treat this as a **Needs proof** hypothesis until confirmed by provider term
sheets, municipal fee schedules, bank statements, or town interviews. It is
directionally plausible, but the claim needs sharper categories:

| Fee / cost layer | What it usually means | What CivicChain can plausibly change |
| --- | --- | --- |
| Card network / interchange | A card transaction carries interchange and network economics. Mastercard describes interchange as one component of the merchant discount rate paid for card acceptance; Visa publishes U.S. interchange reimbursement tables. | CivicChain does not make card economics disappear when it uses cards. It can route less of the workflow through resident-facing card portals and use card controls only where they create spend-control value. |
| Acquirer / processor / payment portal | The merchant or government portal pays, absorbs, or passes through provider fees. Public examples show these as visible card/convenience fees. | CivicChain can replace some portal/reconciliation work, but its own Rail/BaaS/card providers will have fees that must be priced honestly. |
| Banking / treasury services | Wires, account services, lockbox, ACH setup, deposits, reconciliation, and bank-service fees can be real even when the rail fee is low. | Municipality-owned Rail/accounts and automated event records can reduce operational handling and reconciliation, not necessarily every bank fee. |
| Contactless / wallet acceptance | "Tap" usually rides the existing card-acceptance stack. The cost is not a separate magic contactless tax by default; the relevant fees sit in issuer/acquirer/processor/network/card-program terms. | CivicChain's target phone-tap value is control and evidence: MCC locks, per-card limits, and real-time authorization. The savings is not "Apple Pay is free"; it is "approved field spend is controlled before settlement." |
| Compliance and disputes | KYB/AML, counterparty screening, RFIs, chargebacks/disputes, and proof-of-payment work create provider and staff cost. | Rail/BaaS compliance and WCR upload can consolidate evidence, but compliance cost remains. |
| Manual office labor | Staff time spent entering, matching, approving, filing, exporting, and answering public-record requests. | This is one of the strongest savings pools: automate the record while the payment happens. |

The newer outside-view research upgrades some pieces of this hypothesis from
"founder-reported" to **evidence-backed categories**, while keeping national
averages and CivicChain outcomes unproven:

- Resident-facing card/convenience fees are real and visible, with checked
  examples in the 2.4%-3%+ range, while e-check/ACH examples range from free to a
  few dollars. These are jurisdiction-specific examples, not a national average.
- ACH and instant-payment rails are cheap at the wholesale layer, but delivered
  municipal service can still carry bank, portal, reporting, lockbox, Positive
  Pay, reconciliation, research, return, and staff costs.
- Reconciliation is a control requirement, not clerical overhead. A workflow that
  reduces exceptions and produces audit-ready records can matter more than a
  lower rail fee.
- AP and procurement delay are larger payables cost pools than the final payment
  rail. Paper-check and AP-processing estimates are directional benchmarks, not
  CivicChain proof.
- Crypto, stablecoins, FedNow, RTP, cards, ACH, and AP automation must be
  compared as bundles. A crypto rail alone does not beat modern bank rails unless
  it also lowers exceptions, reconciliation labor, reporting burden, and legal
  risk.

This framing preserves the meeting insight while avoiding the unsafe shortcut:
"all banking/card/contactless fees vanish." The better claim is that CivicChain
compresses the fee-and-labor stack around the municipal vendor payment and makes
the remaining costs visible.

## What the two white papers support

### V6

V6 is strong on the operational story:

- Small towns use paper-heavy, opaque procurement and slow manual contractor
  payment.
- The contract-linked phone-tap card flow removes invoices from approved field
  expenses and makes every spend visible to the administrator and public record.
- Smart Agreement Records split the contract into card pool, residual payment,
  and hold-back reserve.
- MCC locks, per-card limits, no automatic refills, and refill approvals create
  hard spend control instead of after-the-fact review.
- A compliance report package is designed to satisfy audit and FOIA requests
  without manual compilation.
- The business model is described as SaaS priced against procurement efficiency
  and labor savings. The Millbrook savings figure is useful as modeled source
  material, not as public proof.

V6's strongest safe reading: CivicChain saves money by making vendor payment,
spend control, and audit evidence part of one contract workflow.

### V9

V9 keeps the same mechanism but adds diligence and architecture:

- It says the payment flow removes traditional banking intermediaries from the
  core RLUSD path, but later sections also show Release 1 operating in USD on
  Rail with no virtual cards yet. Use the later release boundary when speaking
  about shipping scope.
- It clarifies the affiliate model: each municipality owns its Rail accounts;
  CivicChain manages them programmatically and does not commingle town funds.
- It makes vendor AML/KYB, withdrawal RFI, WCR upload, Rail webhooks, and XRPL
  memos part of the operational evidence chain.
- It explicitly says Phase 1 can deliver full platform value without RLUSD.
- It frames SaaS as the primary defensible revenue stream, priced against
  procurement efficiency and labor savings, with card interchange and float as
  incremental revenue lines.

V9's strongest safe reading: the technology is not only a faster rail; it is a
controls-and-evidence architecture around municipal money movement.

## Current payment-fee evidence

These are examples, not national averages. Use dated citations if they become
external copy.

| Source checked | What it shows | Claim use |
| --- | --- | --- |
| Boston real estate tax payment page | Electronic check/ACH has no service fee; debit/credit card has a 2.75% service fee with $1 minimum. | Public card-payment friction is real; cheaper bank-account paths often exist. |
| Harris County property tax payment pages | Card payments show a 2.40% non-refundable convenience fee; e-check is much cheaper and one Harris FAQ describes no transaction fee. | Use only as "card fee vs cheaper e-check path" unless the exact e-check page conflict is reconciled. |
| City of Portland utility payment page | Credit/debit card payments carry a 2.95% processing fee; ACH, cash, check, and money order avoid the fee. | Visible public-payment fees can be high enough for residents to notice. |
| Maine InforME PayPort page | PayPort advertises no cost to municipalities and daily ACH transfer to the municipal bank account. | In Maine, card convenience fees are often resident-facing, while the municipality may see daily ACH settlement. |
| Visa and Mastercard public interchange pages | Card acceptance has interchange/network economics; interchange is one component inside the merchant discount rate. | Card/contactless flows still carry card economics. Use cards when they add spend-control value, not as proof of fee elimination. |
| Stripe Issuing public pricing | Issuing virtual/physical cards and managing card infrastructure can have program costs; Stripe also describes interchange-share economics. | CivicChain's card program must be modeled as a paid control layer, not free infrastructure. |
| Federal Reserve FedACH 2026 fee schedule | FedACH per-item fee is fractions of a cent at the Reserve Bank layer. | ACH rail cost is not the right "huge commission" baseline. |
| Federal Reserve Fedwire 2026 fee schedule | Fedwire transfer fees start below $1 at the Reserve Bank layer before customer bank markups. | Wire rails may be expensive to end users, but the bank rail itself is not the core CivicChain savings proof. |
| Municipal payment all-in cost packet | West Hartford / Hillsborough / Palm Beach / Ballston-style resident fees; bank fee schedules; FedACH/FedNow baselines; AP/reconciliation estimates; Colorado crypto tax payment and GFOA crypto advisory. | Use as outside-view evidence for cost-stack categories and proof gates, not as a national average or CivicChain ROI proof. |
| XRP Ledger technology baseline | Standard XRPL transaction cost is 10 drops = 0.00001 XRP; typical close time is about 3-5 seconds. | Cheap record anchoring is real; it proves low-cost verification, not whole-product savings. |

Official references:

- Boston property tax payments: https://www.boston.gov/so/node/1851
- Boston online-payment service-charge note: https://www.boston.gov/contacts-online-payments-and-transactions
- Harris County payment options: https://www.hctax.net/Property/Payonline.aspx
- Harris County e-check FAQ: https://www.hctax.net/Property/Echeck.cshtml
- Portland utility card-fee page: https://www.portland.gov/water/customer-service/pay-your-utility-bill/credit-and-debit-card-processing-fees
- Maine PayPort: https://www.maine.gov/informe/municipal/payport/
- Mastercard interchange overview: https://www.mastercard.com/us/en/business/support/merchant-interchange-rates.html
- Visa U.S. interchange overview: https://usa.visa.com/support/small-business/regulations-fees.html
- Visa U.S. interchange table: https://usa.visa.com/content/dam/VCOM/download/merchants/visa-usa-interchange-reimbursement-fees.pdf
- Stripe pricing / Issuing: https://stripe.com/us/pricing
- FedACH 2026 fee schedule: https://www.frbservices.org/resources/fees/ach-2026
- Fedwire 2026 fee schedule: https://www.frbservices.org/resources/fees/wires-2026
- XRPL transaction cost: https://xrpl.org/docs/concepts/transactions/transaction-cost
- All-in municipal payment-cost packet: [[municipal-payment-costs-hidden-behind-convenience-fees]]

## Customer-savings mechanism to carry forward

1. **Vendor risk premium drops.** If vendors trust the payment workflow, they
   need less padding for slow approval, invoice uncertainty, and cash-flow risk.
   The local model uses 3-8% as an illustrative premium. This is **Modeled**
   until measured in real bids.
2. **Staff time drops.** The SAR/WCR/payment record assembles contract, approval,
   spend, and payment evidence as work happens, reducing AP, reconciliation,
   audit prep, and FOAA assembly.
3. **Unauthorized spend drops.** MCC-locked cards, per-card limits, contract pool
   balances, hard declines, and administrator-approved refills stop some bad
   spend before settlement rather than finding it during audit.
4. **Audit and public-record cost drops.** A public ledger/dashboard can answer
   many money questions without a clerk rebuilding check registers, warrants,
   invoices, and exports manually.
5. **Resident payment-fee pain is adjacent, not the core product comparison.**
   Public card fees help people understand payment friction, but CivicChain's
   core unit is a municipal vendor contract.
6. **CivicChain revenue is separate from customer savings.** SaaS, payout fees,
   interchange, and float are company economics. They must not be counted as
   customer savings unless the customer receives a lower total cost.

## Pilot measurement model

For any external ROI claim, measure all-in cost per **reconciled transaction**.
The minimum evidence packet for a pilot is:

- fee schedules and processor invoices for visible fees;
- bank analysis statements for ACH, wire, lockbox, reporting, Positive Pay,
  reconciliation, research, and return costs;
- AP/reconciliation time studies by transaction type;
- exception logs for rejected e-checks, NSF returns, refunds, stop payments,
  vendor inquiries, emergency checks, and disputed payments;
- audit adjustments, finding history, close-calendar time, and public-record
  request hours;
- same-contract bid and payment-cycle comparison before and after the workflow
  change.

Until those measurements exist, use the new evidence as **proof of cost
categories**, not proof of CivicChain savings.

## Language boundary

Use:

- "CivicChain saves money around the payment, not merely on the payment rail."
- "The technology removes vendor-financed uncertainty, manual reconciliation,
  and after-the-fact evidence assembly."
- "Card fees show why residents notice payment friction, but ACH/check/wire
  comparisons show why the stronger claim is workflow savings."
- "Judge the system by the cost per reconciled, audit-ready transaction, not by
  the checkout fee alone."
- "XRPL makes the record cheap and independently verifiable; the workflow makes
  the savings plausible."

Do not use:

- "Crypto avoids huge bank commissions."
- "Stablecoins automatically make municipal payments cheaper."
- "Official sources are lying about fees." The safer claim is that posted fees
  are incomplete for all-in cost.
- "Maine law automatically turns lower bids into town savings."
- "Vendors get paid instantly from award." Production payment still has
  authorization, warrant, KYB/AML, and compliance gates.
