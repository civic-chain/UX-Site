---
description: "Provisional patent filings, what each covers, and the strict provisional-status claim language behind CivicChain's IP position."
depends-on:
  - "[[_docs/facts/product]]"
  - "[[_docs/facts/whitepaper]]"
  - "[[_docs/facts/evidence/patent-filings]]"
---

# 11 — IP and moat

## Claim Boundary

- Claim status: mixed — see inline labels; patent status is provisional applications filed April 4, 2026, never issued
- Source note: [[_docs/facts/product]] (proof discipline, conflicts, technology); [[_docs/facts/evidence/patent-filings]] (filing receipts, status boundary, claim candidates); [[_docs/facts/whitepaper]] §11 (lines 811–826, raw v9 IP ambition)

## Status boundary (read first)

CivicChain's IP position rests on **provisional patent applications filed April
4, 2026** — **Actual**, supported by the USPTO acknowledgement receipts in the
evidence memo. These are not issued patents.

- The USPTO receipts list the application type as "Utility — Provisional
  Application under 35 USC 111(b)" and carry **no patent number**.
- Approved external language: "provisional applications filed" or, only after
  legal review confirms current status, "patent-pending methods."
- Do **not** use "patented technology," "issued patents," or "CivicChain owns
  the patent portfolio" from these records alone — all **Needs proof** (legal
  review).
- Assignment paperwork in the raw packet was a template with placeholders. It is
  **not** evidence of completed ownership transfer or execution — **Needs proof**.

Note a cross-source conflict from product.md's conflict list: the marketing
source still says patent filing status "needs proof," while the local evidence
memo now supports provisional applications filed April 4, 2026. The evidence memo
is the more recent and authoritative record; reconcile the marketing source
before external publication.

## The two patent themes

The business framing groups the filings into two themes: a **payment
architecture** family and a **geolocation voter verification** filing. The
evidence memo records **three** USPTO provisional applications, two of which sit
inside the payment-architecture theme (the cross-ledger audit chain and the
contract-bound MCC card control) and one of which is the geolocation filing.

| Provisional application | Theme | Title (as filed) | Receipt time (ET, April 4, 2026) |
|---|---|---|---|
| 64/029,409 | Payment architecture | Four-System Cross-Ledger Cryptographic Audit Chain for NFC Payment Transactions Using Distributed Ledger Memo Field Anchoring as Immutable Verification Root | 01:38:04 PM |
| 64/029,416 | Payment architecture | Contract-Bound Merchant Category Code Locked Stablecoin Virtual Card System with Hierarchical Spending Controls and Distributed Ledger Audit Anchoring for Government Procurement Payment Authorization | 01:46:53 PM |
| 64/029,412 | Geolocation voter verification | Multi-Layer Geolocation Confidence Scoring System for Cryptographically Anchored Voter Eligibility Verification in Distributed Governance Platforms | 01:43:32 PM |

All three are **Actual** as filings (receipts on record). Coverage scope below is
described from the application text and is **Target / Needs proof** until claims
are examined — provisional applications do not establish granted scope.

## Theme 1 — Payment architecture

How the underlying technology actually works (mechanism, claim-disciplined):
[[20-xrp-ledger-and-records]] for the ledger and the cross-ledger audit chain,
and [[22-cards-and-mcc-lock]] for the contract-bound MCC card control.

Two filings cover the payment side. The whitepaper's raw v9 IP section (§11.1)
frames this as "Patent 1: Government Blockchain Payment Architecture" — that
single-patent, four-component framing is raw v9 ambition (**Target**), not the
current claim boundary; the filed record is two separate provisional
applications.

### Cross-ledger audit chain (64/029,409)

What the application describes (**Target / Needs proof** as granted scope):

- A Primary Audit Hash derived from an NFC payment authorization event.
- The same hash intended to connect records across the card network, the card
  issuer settlement layer, the public ledger memo field, and the procurement
  platform database.
- The public ledger memo as the **immutable verification root** — a third-party
  auditor can compare private records against the public anchor without trusting
  any single private database.
- **Declined** transactions receive audit treatment too: a blocked out-of-scope
  purchase is itself compliance evidence, not an invisible card-network event.
- The ledger write is asynchronous, so it does not block the authorization
  decision.
- The chain can link backward from a payment event to the Service Agreement
  Record, connecting contract approval, card issuance, and spend.

### Contract-bound MCC card control (64/029,416)

What the application describes (**Target / Needs proof** as granted scope):

- Permitted Merchant Category Codes derive from the procurement contract type and
  contract-specific parameters — not from a manual expense-card policy.
- A card hierarchy: a Company Card with Individual Cards and Equipment Cards as
  sub-cards.
- Authorization checks include card status, MCC permission, tier-specific MCC
  restrictions, velocity limits, and available contract pool balance.
- Both approvals and declines can be anchored as audit events; decline events can
  record the attempted merchant category and decline reason.
- Contract closure deactivates cards, returns unspent balances, and compiles the
  transaction audit trail.

> Technology note ([[technology-baseline]]): a real-time MCC allow-list with a
> hard decline at authorization is a **standard issuer-processor feature** (Lithic,
> Stripe Issuing), not novel technology. The claimed novelty here is the
> **contract-bound** framing — MCC permissions deriving from the procurement
> contract itself — not the lock mechanism. Honest language: "standard
> issuer-processor MCC controls," never "proprietary technology."

> v1.0 card-scope caveat: the MCC-locked virtual card is central to the demo and
> product story, but the raw white paper's Release 1 says no virtual cards until
> Release 2. The card patent filing exists regardless; do **not** present cards
> as confirmed v1.0 shipping scope. This boundary is **unresolved** pending the
> product owner.

## Theme 2 — Geolocation voter verification (64/029,412)

How the three-layer model, the confidence tiers, and the privacy architecture
work (claim-disciplined): [[23-geolocation-verification]].

The whitepaper (§11.2) frames this as a deliberately **separate** provisional
filing rather than a continuation of the payment patent — keeping claims narrow,
avoiding dilution, and letting the two themes reference each other as related
art. That separate-filing intent is **Target** (raw v9); the filing itself is
**Actual**.

What the application describes (**Target / Needs proof** as granted scope):

- A model combining device GPS, IP geolocation, and the voter's enrollment
  address.
- A **confidence tier** output (e.g. HIGH, MEDIUM, LOW, REJECTED) rather than a
  binary eligibility result.
- Score inputs: GPS accuracy, IP/GPS consistency, VPN or datacenter-IP
  classification, and distance from the enrollment address.
- A privacy architecture that compares and discards raw GPS coordinates, storing
  only a boolean result and a zone identifier — no coordinate data written to the
  public blockchain.
- An eligibility determination that can be cryptographically committed to the
  public ledger as a ballot authorization record, linking voter eligibility →
  contract award → payment execution.

Scope discipline: geolocation voting is **Tier 2**, jurisdiction-aware civic
input. It is not part of v1.0 functionality, not a universal default for every
municipality or contract, and not a binding vendor-selection mechanism without
jurisdiction-specific legal and procurement review. Do **not** imply it ships in
v1.0 (**Needs proof**). RLUSD, referenced in the payment filings' stablecoin
framing, is likewise optional Tier 2 / later-layer settlement; v1.0 ships in USD
bridge mode.

## The moat argument

The defensible position combines structural design with the filings:

- **Structural differentiator** (**Actual**, from product materials): "It does
  not make fraud harder to commit by policy. It makes fraud impossible to conceal
  by design." Transparency is the default state, anchored on the XRP Ledger.
- **Competitor gap** (**Target / Needs proof** — directional positioning, not a
  sourced benchmark): incumbents named in product.md — Tyler Technologies,
  OpenGov, CivicPlus — are described as lacking a real-time payment rail, public
  ledger records, and contract-bound vendor cards. Cite current product docs and
  contract data before using these categorical claims externally.
- **IP layer** (mixed): provisional filings covering the cross-ledger audit
  chain, contract-bound MCC card control, and geolocation voter eligibility. As
  provisional applications, these signal a priority date and intent — not granted
  exclusivity.

### Defensibility vs. fast followers

The honest answer to "what stops Tyler/OpenGov/CivicPlus copying this in 12
months?" is **not** "the patent filings block them." They do not yet. The current
defensibility thesis is thinner and operational: combine the public audit spine,
contract-bound spend controls, early municipal workflow evidence, and founder
insider context before an incumbent treats the wedge as urgent. This is
**Target / Needs proof** until a real reference town, measured workflow savings,
and counsel-reviewed IP position exist. If those do not arrive, the moat remains
directional positioning, not an investor-grade barrier. See
[[open-external-blockers]].

Founder context relevant to the moat is in [[10-team|10 — Team]]: note that
several team figures and names conflict across sources (Justin's processing
figure $50M vs $500M; company name; Michael's tenure 10+ vs 30+ years; Daniel's
surname). Do not use numeric or named team claims externally until founder bios
are confirmed.

## Safe vs. unsafe claim language

| Use (with provisional framing) | Avoid without legal review |
|---|---|
| "Provisional applications filed April 4, 2026 cover cross-ledger payment audit, contract-bound MCC card controls, and geolocation voting eligibility." | "Patented technology." |
| "Contract-bound cards prevent out-of-scope spend before money moves." | "Issued patents." |
| "Approvals and declines can both become audit evidence." | "CivicChain owns the patent portfolio." |
| "CivicChain's audit model links the payment event, contract record, private settlement data, and public ledger anchor." | "Geolocation voting ships in v1.0." |
| "Patent-pending methods" (only after legal review confirms status) | "RLUSD settlement ships in v1.0." |

## Sources

- [[_docs/facts/product]] — proof-and-source discipline and four claim labels
  (lines 18–49); known source conflicts including patent status and team figures
  (lines 51–64); technology and v1.0 shipping scope (lines 324–352).
- [[_docs/facts/evidence/patent-filings]] — status boundary, the three filing
  receipts (64/029,409 / 64/029,412 / 64/029,416), extracted product facts, and
  recommended claim boundaries.
- [[_docs/facts/whitepaper]] §11 Intellectual Property Strategy (lines 811–826)
  — raw v9 ambition; used as source material, not the current claim boundary.

## Related

- [[06-competition|06 — Competition]]
- [[03-the-product|03 — The product]]
- [[10-team|10 — Team]]
- [[19-technology-overview|19 — Technology overview]]
- [[_docs/business/index|Index — business knowledge base]]
