---
description: "Internet-sourced evidence on records law vs. blockchain immutability, civic-input/voting legality, and vendor confidentiality / trade-secret risk under Maine law. Addresses audit gaps legal records-law, voting-legality, and vendor-confidentiality. Evidence input, not a legal opinion; verify primary URLs before external use."
depends-on:
  - "[[_docs/facts/evidence/maine-municipal-constraints]]"
---

# Records and Civic Law Evidence

Internet research (2026-06-03) on the legal questions raised by publishing an
**immutable, public** record of municipal procurement and spend, plus the
legality of a resident civic-input layer touching vendor selection. **Evidence
input, not approved public copy and not a legal opinion.**

## 1. Records law vs. immutability

- **Finding:** Maine local-government records run on a **retain-and-control**
  regime, not a delete regime. Under **5 M.R.S. §95-B**, records "may not be
  destroyed or otherwise disposed of by any local government official, except as
  provided by the Archives Advisory Board," with a duty to "protect and
  preserve"; destruction after a retention period is **permissive, not
  mandatory** (29-255 C.M.R. ch. 1 §13). So immutability does **not** violate a
  "duty to delete" — Maine has no general duty to delete municipal records. The
  real conflict is two-sided: (a) Maine has **no general right to
  correct/expunge** an arbitrary municipal record, but **sector-specific**
  correction/sealing rights exist (criminal-history; insurance info, 24-A M.R.S.
  §2211; consumer data) that an immutable ledger would collide with; and (b)
  permanently **publishing** records and any PII on a public chain is the sharper
  exposure, because on-chain data cannot later be sealed, corrected, or redacted.
  The well-documented mitigation (US and GDPR literature alike) is **off-chain
  storage with only a hash anchored on-chain** — architecturally close to
  CivicChain's "XRPL memo-field anchor" model, which materially reduces the
  conflict *if no raw PII or raw record content is written on-chain*.
- **Status:** **[Confirmed]** for the Maine retention/destruction framework and
  the immutability-vs-erasure/sealing conflict. **[GAP: not confirmed]** that any
  Maine statute *compels deletion* of procurement records — the duty runs the
  other way (preservation).
- **Sources:**
  - *Title 5 §95-B: Local government records* (Maine Legislature) — https://legislature.maine.gov/statutes/5/title5sec95-B.html
  - *29-255 C.M.R. ch. 1 §13 — Destruction of Records* (Cornell LII) — https://www.law.cornell.edu/regulations/maine/29-255-C-M-R-ch-1-SS-13
  - *Local Government Record Retention Schedules* (Maine SOS / State Archives,
    2024-05) — https://www.maine.gov/sos/sites/maine.gov.sos/files/content/assets/LGintroduction.may2024v1.pdf
  - *Title 24-A §2211: Correction, amendment or deletion of recorded personal
    information* (Maine Legislature) — https://legislature.maine.gov/legis/statutes/24-A/title24-Asec2211.html
  - Peter Leasure, *A Comment on the Potential Utilization of Blockchain for
    Criminal Record Databases* (Richmond JOLT, 2022-10-27) — https://jolt.richmond.edu/2022/10/27/a-comment-on-the-potential-utilization-of-blockchain-technology-for-criminal-record-databases/
  - *Reconciling blockchain technology and data protection laws* (Journal of
    Cybersecurity, Oxford Academic, 2025) — https://academic.oup.com/cybersecurity/article/11/1/tyaf002/8024082
- **Residual question for counsel:** Confirm the XRPL memo anchor carries only a
  hash/reference (no raw PII or record text), and map which procurement-record
  categories may contain confidential/PII content a subject could correct, seal,
  or withhold.

## 2. Civic-input / voting legality

- **Finding:** Maine open-meeting law (FOAA, 1 M.R.S. §§401–414) expressly
  reaches **advisory bodies** — "public proceeding" includes "any advisory
  organization established, authorized or organized by law" (§402) — so a
  resident civic-input layer that becomes an official municipal advisory process
  likely triggers FOAA open-meeting/record obligations. Advisory input is most
  defensible when it stays **strictly non-binding** and the award stays with the
  lawful procuring authority on lawful criteria. **Correction to a common
  premise:** Maine's *state* procurement standard is **"best-value bidder"**
  (5 M.R.S. §1825-B(7) — quality, conformity, delivery, best interest of the
  State), **not** "lowest responsible bidder." Either way, award must rest on
  responsible-/responsive-/best-value criteria — **not popularity** — so resident
  *voting* that binds or effectively drives vendor selection would conflict with
  procurement law and could raise election-law concerns if structured like a
  binding ballot. **Open gap:** Maine has **no single statewide municipal
  competitive-bidding statute** for towns; §1825-B governs *state* purchasing and
  §124 governs *county* purchasing — small-town procurement is generally set by
  **local charter/ordinance**, not located in this sweep.
- **Status:** **[Confirmed]** that FOAA reaches advisory bodies and that
  procurement turns on responsible/best-value criteria. **[GAP: not confirmed]**
  on the controlling award standard for sub-5,000 Maine *towns* (likely
  local-ordinance-governed).
- **Sources:**
  - *Maine FOAA FAQ* (incl. §402/§403 public-proceedings) (Maine SOS / FOAA) — https://www.maine.gov/foaa/faq/index.shtml
  - *Title 5 §1825-B: Bids, awards, contracts and grants* (Maine Legislature,
    gen. 2025-10-23) — https://www.mainelegislature.org/legis/statutes/5/title5sec1825-B.html
  - *Title 30-A §124: Bids, awards and contracts* (Maine Legislature) — https://legislature.maine.gov/statutes/30-A/title30-Asec124.html
- **Residual question for counsel:** Obtain the beachhead town's procurement
  charter/ordinance and confirm an advisory civic-input layer cannot, by design,
  bind or legally taint a best-value/responsible-bidder award (and is not
  structured to look like a binding election).

## 3. Vendor confidentiality / trade secret

- **Finding:** Under Maine law, contract **award amounts and the winning bid are
  public records once the contract is let** — "Each record, with the successful
  bid indicated, must be open to public inspection after the letting of the
  contract" (5 M.R.S. §1825-B(6)). So publishing **award amounts / contract
  pricing is low risk** — that information is already public. The residual risk
  is narrower: a vendor's genuine **trade-secret** material (proprietary cost
  build-ups, methods) can be exempt via the FOAA discovery-privilege exemption
  (1 M.R.S. §402(3)(B)) read with the Maine trade-secret privilege (M.R. Evid.
  507) and the Maine Uniform Trade Secrets Act (10 M.R.S. §1542) — **but only if
  the vendor clearly marked it confidential.** Exposure is therefore bounded:
  publishing already-public award/price data is safe; the danger is publishing
  **whole proposals / line-item breakdowns** that may contain properly designated
  trade-secret content an immutable chain could never later redact.
- **Status:** **[Confirmed]** that award amounts/pricing are public and that a
  marked trade-secret exemption exists.
- **Sources:**
  - *Title 5 §1825-B(6)* (Maine Legislature) — https://www.mainelegislature.org/legis/statutes/5/title5sec1825-B.html
  - *Open Government Guide — Maine* (Reporters Committee for Freedom of the
    Press; cites §402(3)(B), 10 M.R.S. §1542(4)(B), M.R. Evid. 507) — https://www.rcfp.org/open-government-guide/maine/
  - *Maine Freedom of Access Act* (Maine SOS / FOAA) — https://www.maine.gov/foaa/
- **Residual question for counsel:** Define an on-chain publication scope limited
  to award-level/price data (already public) and excluding any vendor-marked
  trade-secret material, given on-chain data is irreversible.

## Bottom line

**Immutable on-chain *publication* is the single biggest legal exposure here** —
not because Maine forces deletion (it does the opposite, mandating
preservation), but because irreversibility means a public ledger cannot later
seal, correct, redact, or honor a sector-specific deletion right if any
published record contains PII or marked trade-secret content. The defensible
architecture anchors **only hashes and already-public award data** on-chain and
keeps raw records and PII off-chain.
