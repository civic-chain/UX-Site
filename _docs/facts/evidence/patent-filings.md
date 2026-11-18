---
description: Evidence memo for Civic-Chain provisional patent filings and landing claim boundaries.
depends-on: []
---

# Civic-Chain Provisional Patent Filing Evidence

This file consolidates landing-relevant facts extracted from the raw USPTO
receipt and provisional application documents that were previously held outside
the facts layer. It is an evidence note, not landing copy.

## Status Boundary

- The extracted records support a careful claim that provisional patent
  applications were filed on April 4, 2026.
- The extracted records do not support a claim that these are issued patents.
  The USPTO acknowledgement receipts list the application type as
  "Utility - Provisional Application under 35 USC 111(b)" and show no patent
  number.
- Use "provisional applications filed" or, after legal review confirms the
  current status, "patent-pending methods." Do not use "patented technology"
  from these records alone.
- Assignment paperwork in the raw packet was a template with placeholders. It
  should not be used as evidence of completed ownership transfer or execution.
- Contact and address details from the raw documents were intentionally not
  carried forward because they are not useful for the landing page.

## Filing Receipts

### Application 64/029,409

Receipt time: April 4, 2026, 01:38:04 PM ET.

Title: Four-System Cross-Ledger Cryptographic Audit Chain for NFC Payment
Transactions Using Distributed Ledger Memo Field Anchoring as Immutable
Verification Root.

Landing-relevant signal: supports the cross-ledger audit-chain story. An NFC
payment event can be linked through private payment records and a public ledger
anchor.

### Application 64/029,412

Receipt time: April 4, 2026, 01:43:32 PM ET.

Title: Multi-Layer Geolocation Confidence Scoring System for Cryptographically
Anchored Voter Eligibility Verification in Distributed Governance Platforms.

Landing-relevant signal: supports the future geolocation voting story. GPS, IP,
and enrollment address signals produce a confidence tier rather than a flat
pass/fail.

### Application 64/029,416

Receipt time: April 4, 2026, 01:46:53 PM ET.

Title: Contract-Bound Merchant Category Code Locked Stablecoin Virtual Card
System with Hierarchical Spending Controls and Distributed Ledger Audit
Anchoring for Government Procurement Payment Authorization.

Landing-relevant signal: supports the contract-bound card story. Card
permissions derive from the procurement contract, not from manual expense-card
policy.

## Extracted Product Facts

### Cross-Ledger Audit Chain

- A Primary Audit Hash can be derived from an NFC payment authorization event.
- The same audit hash is intended to connect records across the card network,
  card issuer settlement layer, public ledger memo field, and procurement
  platform database.
- The public ledger memo acts as the immutable verification root. This matters
  because a third-party auditor can compare private records against the public
  anchor without trusting one private database as the sole source of truth.
- Declined transactions receive audit treatment too. This is important for
  Civic-Chain because a blocked out-of-scope purchase is itself compliance
  evidence, not just an invisible card-network event.
- The ledger write is described as asynchronous so it does not block the card
  authorization decision.
- The audit chain can link backward from a payment event to the Service
  Agreement Record, connecting contract approval, card issuance, and spend.

### Contract-Bound MCC Card Control

- The card control model derives permitted Merchant Category Codes from the
  procurement contract type and contract-specific parameters.
- The system distinguishes a Company Card, Individual Cards, and Equipment
  Cards. Individual and Equipment cards are sub-cards under the Company Card.
- Authorization checks include card status, MCC permission, tier-specific MCC
  restrictions, velocity limits, and available contract pool balance.
- Both approvals and declines can be anchored as audit events.
- Decline events can include the attempted merchant category and decline reason,
  creating evidence that the contract-bound restrictions were enforced at the
  time of attempted spend.
- Contract closure deactivates cards, returns unspent balances, and compiles the
  transaction audit trail.

### Geolocation Voting

- The geolocation model combines device GPS, IP geolocation, and the voter's
  enrollment address.
- The system produces a confidence tier such as HIGH, MEDIUM, LOW, or REJECTED
  instead of a simple binary eligibility result.
- Signal quality matters: GPS accuracy, IP/GPS consistency, VPN or datacenter
  IP classification, and distance from the enrollment address all affect the
  score.
- The eligibility determination can be cryptographically committed to a public
  ledger as a ballot authorization record.
- This should remain a Tier 2 or future-product fact unless the product scope is
  updated. It should not be implied as part of v1.0 landing functionality.

## Recommended Claim Boundaries

Safe claim candidates:

- "Contract-bound cards prevent out-of-scope spend before money moves."
- "Approvals and declines can both become audit evidence."
- "Civic-Chain's audit model links the payment event, contract record, private
  settlement data, and public ledger anchor."
- "Provisional applications filed April 4, 2026 cover cross-ledger payment
  audit, contract-bound MCC card controls, and geolocation voting eligibility."

Avoid without further legal review:

- "Patented technology."
- "Issued patents."
- "Civic-Chain owns the patent portfolio."
- "Geolocation voting ships in v1.0."
- "RLUSD settlement ships in v1.0."
