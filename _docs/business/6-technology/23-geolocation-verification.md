---
description: "Civic-input verification — the three-layer GPS / IP / enrolled-address model that produces a per-ballot confidence score, and the privacy architecture that discards raw coordinates. Tier 2, jurisdiction-aware; not in v1.0."
depends-on:
  - "[[_docs/facts/evidence/records-and-civic-law]]"
  - "[[_docs/facts/CivicChain_Product_Guide_2026]]"
  - "[[_docs/facts/whitepaper]]"
  - "[[_docs/facts/product]]"
  - "[[_docs/facts/evidence/patent-filings]]"
---

# 23 — Geolocation verification

## Claim Boundary

- Claim status: Target — Tier 2, jurisdiction-aware; not v1.0; not a binding vendor-selection mechanism without legal review
- Source note: [[_docs/facts/CivicChain_Product_Guide_2026]] (source-only geolocation module/tier claims); [[_docs/facts/whitepaper]] §3 Module 2 Geolocation-Verified Citizen Voting (113-347); [[_docs/facts/product]] (Not in v1.0 — geolocation voting); [[_docs/facts/evidence/patent-filings]] (64/029,412); [[_docs/facts/evidence/records-and-civic-law]]

This is the citizen-voting verification layer. Hold the scope discipline up
front: geolocation voting is **Tier 2**, jurisdiction-aware civic input. It is
**not** part of v1.0, **not** a universal default for every municipality and
contract, and **not** a binding vendor-selection mechanism without
jurisdiction-specific legal and procurement review. Everything below is
**Target**.

The 2026 Product Guide lists geolocation voting as a module and Professional-tier
feature. Do not read that as v1/current scope; this doc keeps it Tier 2,
jurisdiction-aware, and non-binding until counsel review.

## Why a single signal is not enough

Resident input on vendor selection is treated as a quality signal — residents
know which plowing contractor left the road impassable. The problem is verifying
that only eligible residents vote, on any smartphone, without a tamper-proof
single signal:

- **Device GPS** is the strongest live signal (meters-accurate, needs hardware
  spoofing to fake) but can be blocked indoors or in rural areas — common in the
  small towns CivicChain targets.
- **IP geolocation** works everywhere but is **trivially defeated by a VPN** in
  under a minute. It cannot be a voting gate on its own.

So the defensible approach combines signals into one **confidence score**, with
GPS as the primary gate and IP as a logged audit signal — no single factor
decides the outcome.

## The three-layer model

| Layer | Signal | Role |
|-------|--------|------|
| 1 — Primary gate | **Device GPS** at vote time, compared to the municipality boundary polygon (or within radius of the registered address) | **Hard gate.** Outside boundary → rejected, no override. |
| 2 — Corroboration | **IP address** resolved to a region (MaxMind or similar) | **Audit signal only.** Logged per ballot; a mismatch is flagged, not blocking — protects legitimate VPN users. |
| 3 — Enrollment gate | **Registered address** verified once at sign-up against the voter roll, utility records, or state ID; geocoded | **Identity gate.** The strongest defense against fake-account registration. |

The enrollment gate is the key: live signals can be spoofed by a determined
actor, but someone who cannot prove a municipal address cannot create a valid
voter account in the first place.

## Confidence scoring per ballot

Every ballot is scored at submission and the tier is stored with the record.
Lower tiers are **logged and flagged, not auto-rejected**, which protects
legitimate voters in unusual locations.

| Tier | Signals | Administrator action |
|------|---------|----------------------|
| High | GPS in boundary, IP consistent, enrollment verified | None |
| Medium | GPS in boundary, IP mismatch (VPN suspected), enrollment verified | Logged; act only if the result is challenged |
| Low | GPS in boundary, IP mismatch, enrollment not fully verified | Flagged; admin may quarantine pending verification |
| Rejected | GPS places the user outside the boundary | Ballot not accepted; user notified |

## Privacy architecture

This is what makes on-chain anchoring defensible. The **raw GPS coordinate is
used only for the boundary comparison and discarded immediately**. The stored
record holds **only** a boolean result, the municipality zone identifier, and the
confidence tier. **No coordinate, device identifier, or IP address is ever
written to the public XRPL ledger** ([[20-xrp-ledger-and-records]]); votes are
anonymous by default. An eligibility determination *can* be committed on-chain as
a ballot-authorization record (linking eligibility → award → payment) without
any location data leaving the device boundary check.

## Engineering depth and configuration

The white paper specifies the system at full engineering depth — OS-fused GPS/
WiFi/cell positioning, point-in-polygon and enrollment-proximity checks (PostGIS
/ Haversine), and a spoofing attack-surface analysis. That depth is a developer
reference, not business copy; the business-level shape is the three-layer model
and the confidence tiers above. Voting itself is configurable: vote type
(advisory / binding / board-only / hybrid), minimum confidence required, voting
window, scoring method, quorum, result display, and a GPS-only mode for
high-stakes votes.

## Patent and legal posture

The model is covered by a **separate** provisional filing — 64/029,412,
multi-layer geolocation confidence scoring for voter eligibility — kept distinct
from the payment patents. **Target / Needs proof** as granted scope; framing and
safe-claim language in [[11-ip-and-moat]]. Binding civic voting also carries
records-law and procurement-law exposure; see [[records-and-civic-law]].
**Needs counsel** before any binding use.

## Sources

- [[_docs/facts/whitepaper]] — §3 Module 2 Geolocation-Verified Citizen Voting
  (113-347): three-layer model, confidence scoring, privacy architecture,
  configuration, implementation spec. Raw v9 ambition.
- [[_docs/facts/CivicChain_Product_Guide_2026]] — geolocation module/tier
  packaging. Source-only; unresolved.
- [[_docs/facts/product]] — "Not in v1.0": geolocation voting as Tier 2,
  jurisdiction-aware, not a binding default.
- [[_docs/facts/evidence/patent-filings]] — filing 64/029,412.
- [[_docs/facts/evidence/records-and-civic-law]] — voting and records-law posture.

## Related

- [[19-technology-overview|19 — Technology overview]]
- [[20-xrp-ledger-and-records|20 — XRP Ledger and records]]
- [[11-ip-and-moat|11 — IP and moat]]
- [[03-the-product|03 — The product]]
- [[_docs/business/index|Index — business knowledge base]]
