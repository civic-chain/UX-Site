---
description: "The individual worker/driver journey — named worker card in mobile wallets, biometric tap-to-pay, MCC-lock approval/decline, and the real-time per-tap record."
depends-on:
  - "[[_docs/facts/product]]"
  - "[[_docs/facts/whitepaper]]"
---

# 17 — Journey: the worker

## Claim Boundary

- Claim status: mixed — see inline labels
- Source note: [[_docs/facts/product]] (How the product works; For the Vendor/Contractor; Card spending detail; Technology); [[_docs/facts/whitepaper]] §5.1 Why Phone Tap (381-387), §5.2 Card tiers (388-410), §5.4 Transaction Lifecycle (430-441)

The worker (a driver or crew member on a contracted job) is the person who
actually spends contract money in the field. This document follows that person:
how a named card reaches their phone, how a tap is approved or declined, and
what record each tap leaves.

> **Scope caveat before anything else.** The whole card mechanism described here
> is **not confirmed v1.0 shipping scope**. product.md and the marketing source
> treat MCC-locked cards as part of the core product story; the raw white paper's
> Release 1 says no virtual cards until Release 2. Until the product owner
> resolves that boundary, treat everything below as **Target** / product-story
> scope, not as a confirmed live feature. Individual section labels below sharpen
> this per claim.

## The named worker card

In the controlled-spend story, a worker does not carry a generic vendor card.
Each driver or crew member can be issued an **individual Named Worker Card**,
provisioned to that person's Apple Pay or Google Pay wallet. **Target.** This is
the white paper's "Individual" card tier; product.md describes the vendor card
provisioned to mobile wallets but does not separately confirm a per-worker card
in v1.0.

The card tier hierarchy (white paper §5.2, **Target** — raw v9 ambition beyond
product.md's confirmed boundary):

| Tier | Card type | Issued to | Typical use |
|------|-----------|-----------|-------------|
| Company | Contract Master Card | Vendor company (one per contract) | Large purchases: bulk fuel delivery, equipment rental, materials orders |
| Individual | Named Worker Card | Each driver or crew member | Per-shift fuel, tolls, small consumables; biometric-authenticated via phone |
| Equipment | Vehicle/Asset Card | Each truck or piece of equipment | Fuel tied to a specific vehicle; per-asset expense tracking |

How the tiers relate (white paper §5.2, **Target**): Individual and Equipment
cards are children of the Company card. All tiers draw from the same contract
pool. Sub-tier cards carry lower per-transaction and daily limits than the
Company card, but no tier can spend beyond the available pool balance. The vendor
sets the sub-limits on worker and equipment cards, within bounds the municipality
configured on the Company card.

Note on the pool's unit of account: the white paper funds the pool in **RLUSD**.
Per product.md, **RLUSD is optional Tier 2 / later-layer settlement; v1.0 ships
in USD bridge mode.** **Target.** So the worker-card-from-an-RLUSD-pool framing
is later-layer ambition, not the v1.0 path.

## Why a phone tap, not a plastic card

The white paper's argument for putting the card in a phone wallet rather than
issuing plastic (white paper §5.1, **Target**):

- **Spend control by identity.** A physical card can be handed off, lost, or
  stolen. A phone tap requires biometric authentication — Face ID, Touch ID, or
  device PIN — before the payment authorizes, tying the card to a specific
  person's device rather than to a piece of plastic.
- **No added cost.** Biometric authentication is built into the device operating
  system, so it costs nothing extra to require it.
- **Provisioning speed.** When a contract is activated, virtual cards may reach
  workers' wallets faster than plastic cards — no card to print, ship, or
  activate. For a seasonal plowing contract starting in 48 hours, this matters
  to the buyer/vendor workflow. The "within minutes" provisioning speed is
  **Needs proof** (founder/demo confirmation of actual issuance time).

## What gets approved or declined: the MCC lock

The card is **MCC-locked**: it is meant to spend only at approved merchant
categories and decline elsewhere. **Target** for v1.0 scope. Be precise about
what the demo actually demonstrates: the Harpswell demo shows three transactions
**approved** automatically against the MCC lock with no manual review — that is
**Actual** (approvals observed). It does **not** show a **decline** of an
out-of-scope purchase. The decline behavior — the part that actually delivers the
control — is **product-story / patent-supported Target**, not an observed demo
outcome.

product.md states the lock plainly: the card "can only be spent at approved
merchant categories (fuel, equipment rental, construction supply). It physically
declines at a restaurant or retail store." It frames unauthorized spending as
"structurally impossible" — fraud made impossible to conceal by design. Hold that
as the product's **positioning claim / Target**: the demo evidences approvals,
not a blocked out-of-scope attempt.

The white paper details lock profiles per contract type (white paper §5.3,
**Target** — specific MCC codes are raw v9 detail, not confirmed in product.md):

| Contract type | Allowed MCC categories | Always blocked |
|---------------|------------------------|----------------|
| Snow and ice removal | Fuel (5541, 5542), Auto Parts (5533), Fleet Services (7521), Equipment Repair (7538) | Restaurants, Entertainment, General Retail, Cash Advances |
| Road maintenance | Fuel, Construction Materials (5211, 5031), Hardware (5251), Equipment Rental (7359) | Restaurants, Entertainment, Clothing, Cash Advances |
| Fire protection | Fuel, Safety Equipment (5047), Industrial Supplies (5085), Vehicle Repair | Restaurants, Entertainment, General Retail, Cash Advances |
| Public safety | Fuel, Communications Equipment (5065), Safety Supplies | Restaurants, Entertainment, General Retail, Cash Advances |

## The tap, step by step

The white paper's transaction lifecycle (white paper §5.4, **Target** — the
checks are described as design intent; latency figures are unverified):

1. **Tap.** The driver holds the phone near an NFC terminal. The device prompts
   Face ID, Touch ID, or PIN.
2. **Transmit.** Apple Pay or Google Pay sends a tokenized card credential to the
   merchant terminal.
3. **Route.** The card network (Visa or Mastercard, via the issuing partner)
   sends an authorization request to CivicChain's endpoint.
4. **Check.** CivicChain checks, per the white paper, in under 500ms: pool
   balance is sufficient, the merchant MCC is on the contract's allowed list, and
   the transaction is within per-card and per-transaction limits. The **under
   500ms** figure is a **Needs proof** design target for the *authorization
   check* — not a settlement or XRPL figure. Real-time MCC allow-list decline at
   authorization is a standard issuer-processor capability ([[technology-baseline]]),
   but CivicChain's own measured latency is unconfirmed.
5. **Approve or decline.** If all checks pass, the authorization is approved and
   the pool balance decrements in real time. If any check fails, the transaction
   is declined and the driver gets an SMS and app notification with the decline
   reason.
6. **Record.** An approved transaction is written to the XRP Ledger as a memo on
   the contract's ledger entry — merchant name, MCC, amount, card tier, and
   timestamp. **Target** (the white paper frames every tap as a contract event on
   the XRPL; product.md confirms transactions are anchored on the XRP Ledger but
   does not confirm the per-worker memo schema for v1.0).
7. **Visibility.** The admin dashboard updates within seconds; the public citizen
   portal within minutes. The exact propagation timing is **Needs proof**.

## What the town sees in real time

product.md (**Actual**, observed in the demo): every card transaction is logged
automatically — merchant, amount, category, timestamp — and the town manager sees
activity in real time. No invoices, no end-of-month statements.

The white paper gives a concrete illustration of a single tap's notification
(white paper §5.4, **Modeled** — illustrative example, not an observed live
event):

> Contract CRN-2026-PLW-0042. Phone tap authorized: $94.18 at Cumberland Farms
> (Fuel, MCC 5541). Driver: J. Morrison. Vehicle: Truck 7. Pool balance:
> $11,847.32 remaining.

## The worker's view of the same flow

From product.md's vendor/contractor perspective (**Actual** demo framing): after
award and authorization, the contractor gets a loaded payment card, taps their
phone at the gas station, the equipment rental, and the materials supplier
during the job, and the residual is released after the Work Completion Record is
approved. Same-day / seconds language is rail-path **Target** framing, not proof
of live v1.0 payment speed and not a worker-facing benefit.

The demo's actual taps (Harpswell scenario, product.md — **Actual**, demo data):

| Merchant | Amount | MCC category |
|----------|--------|--------------|
| Harpswell Equipment Rental | $3,200.00 | Equipment Rental |
| Irving Oil, Bath ME | $847.20 | Fuel & Gas |
| Maine Pavement Supply Co. | $5,167.30 | Construction Supply |

All three approved automatically against the MCC lock with no manual review.
Note: Harpswell is a **demo scenario, not a confirmed live customer**; these are
demo figures, not live operating data.

## Decline and limits in practice

A decline is not an error to escalate — it is the lock working as designed. A tap
fails when the merchant category is off the allowed list, the per-card or
per-transaction limit is exceeded, or the contract pool is empty. The white paper
adds that a depleted pool hard-declines every card under the contract until an
administrator approves a refill (white paper §5.6, **Target**) — relevant to the
worker because a depleted pool is the one decline reason that is not about *what*
they are buying.

## What's in it for the worker (open gap)

Read honestly, every rationale on this page — spend control by identity, the MCC
lock, per-tap logging, biometric authentication — is a benefit to the **town** and
the **vendor**, not to the worker who carries the card. The canon names **no**
worker-facing benefit. The closest the model implies — not fronting personal cash
at the pump, no expense-report paperwork afterward — is nowhere stated in canon and
is unconfirmed. So the worker's own incentive to carry the card is an open
**founder dependency**: to be supplied with evidence or conceded, not assumed.
(Mirrors the desirability audit, Q16.) Until then the worker is the persona on whom
the system is *imposed*, and the weakest-motivated link sets the adoption ceiling
for anything that depends on field staff actually tapping.

## Claim summary

- The named worker card, the three-tier hierarchy, and the RLUSD-funded pool are
  **Target** — white paper ambition beyond product.md's confirmed v1.0 boundary.
- The MCC-lock mechanism: **approvals** against the lock are **Actual** in the
  demo; a **decline** of an out-of-scope purchase is **not** observed in the demo
  — that control behavior is product-story / patent-supported **Target**. v1.0
  card scope is itself unresolved.
- Biometric tap-to-pay rationale is **Target**; the "minutes to provision" and
  "under 500ms" performance figures are **Needs proof**.
- Real-time logging visible to the town manager is **Actual** (observed in demo);
  the 3am push-notification example is **Modeled**.
- Specific MCC codes, the per-worker XRPL memo schema, and RLUSD as the pool unit
  are raw v9 detail, not the current public claim boundary.

## Sources

- [[_docs/facts/product]] — How the product works (steps 3–4, card funding and
  MCC lock); For the Vendor/Contractor; Harpswell card spending detail;
  Technology (Cards, RLUSD, settlement); What v1.0 actually ships; conflict and
  claim-discipline boundaries. Authoritative current claim boundary.
- [[_docs/facts/whitepaper]] — §5.1 Why Phone Tap (lines 381–387), §5.2 Virtual
  Card Tier Hierarchy (388–410), §5.3 MCC Lock Profiles (411–428), §5.4 Phone Tap
  Transaction Lifecycle (430–441), §5.6 balance management (446–448). Raw v9
  ambition, not the current public claim boundary.

## Related

- [[14-how-it-works|14 — How it works (end to end)]]
- [[15-journey-town-manager|15 — Journey: the town manager]]
- [[16-journey-vendor|16 — Journey: the vendor]]
- [[18-journey-resident|18 — Journey: the resident]]
- [[03-the-product|03 — The product]]
- [[_docs/business/index|Index — business knowledge base]]
