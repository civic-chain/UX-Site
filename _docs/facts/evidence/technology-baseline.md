---
description: "Internet-sourced technology baselines — XRP Ledger close-time/cost/memo, RLUSD stablecoin status, and MCC-locked card feasibility. Replaces vague '~4s'/'<500ms' performance claims and tests whether the MCC-lock control is novel. Evidence input for the underlying technology, not measurements of CivicChain's own product."
depends-on:
  - "[[_docs/facts/evidence/patent-filings]]"
---

# Technology Baseline Evidence

Internet research (2026-06-03) on the underlying technology, to replace
taste-based performance numbers and to test which controls are actually novel.
**These are baselines for the public technology (XRPL, card rails), NOT
measurements of CivicChain's own product** — end-to-end latency and load on
CivicChain's live path still require its own testing. Evidence input, not public
copy.

## 1. XRP Ledger (XRPL) baseline

- **Finding:** Ledger versions "usually close about every **3 to 5 seconds**"
  (no single fixed average; treat as a band). A transaction is **final only when
  it appears in a validated ledger** — XRPL uses consensus validation, not
  probabilistic block confirmations, so the defensible finality figure is the
  ~3–5s ledger-close window. Minimum transaction cost for a standard transaction
  is **10 drops = 0.00001 XRP** (1 XRP = 1,000,000 drops); at recent prices that
  is well under $0.0001/tx, scaling up under load. The **`Memos` field** is a
  real optional common field, limited to **≤1 KB serialized**; a 256-bit hash is
  ~32 bytes, so anchoring a hash is comfortably within the limit — directly
  suitable for the "verification root." Throughput is the one soft number: XRPL
  sources state both "~1,000 tx/s" and "1,500 tx/s," so cite a range.
- **Status:** Close time, cost, drop conversion, finality model, memo
  size/structure = **[Confirmed]** (primary, xrpl.org). Throughput =
  **[Conflicting sources]** (~1,000–1,500 tx/s).
- **Sources:**
  - *Ledger Close Times* (XRP Ledger Docs) — https://xrpl.org/docs/concepts/ledgers/ledger-close-times
  - *Transaction Cost* (XRP Ledger Docs) — https://xrpl.org/docs/concepts/transactions/transaction-cost
  - *Transaction Common Fields* (memo structure/size) (XRP Ledger Docs) — https://xrpl.org/docs/references/protocol/transactions/common-fields
  - *Finality of Results* (XRP Ledger Docs) — https://xrpl.org/docs/concepts/transactions/finality-of-results
  - *Ripple Consensus Ledger Can Sustain 1000 Transactions per Second* (XRPL
    Blog, 2017) — https://xrpl.org/blog/2017/ripple-consensus-ledger-can-sustain-1000-transactions-per-second
- **Feasibility note:** Standard. Anchoring a 32-byte hash in a ≤1 KB memo at ~10
  drops/tx with ~3–5s finality is a well-documented, low-cost pattern.

## 2. RLUSD

- **Finding:** Issued through a **limited-purpose trust company chartered by
  NYDFS** (Ripple's regulated entity; reserve custody at BNY Mellon as of July
  2025). Pegged 1:1 to USD, "supported one-to-one by cash deposits, U.S.
  Treasuries, and cash equivalents," redeemable 1:1, with **monthly third-party
  reserve attestations**. **NYDFS final approval 2024-12-10; launch
  2024-12-17.** Market presence (CoinMarketCap, retrieved 2026-06): ~$0.9999,
  **market cap ≈ $1.81B**, ranked ~#40.
- **Status:** **[Confirmed]** — issuer, charter, backing, attestation, peg, and
  launch dates from Ripple + dated coverage; market cap from a live tracker with
  retrieval date.
- **Sources:**
  - *Ripple USD (RLUSD) Stablecoin* (Ripple; retrieved 2026-06) — https://ripple.com/solutions/stablecoin/
  - *Ripple launches RLUSD stablecoin with NYDFS Trust Charter approval* (The
    Paypers, 2024-12) — https://thepaypers.com/fintech/news/ripple-launches-rlusd-stablecoin-with-nydfs-trust-charter-approval
  - *Ripple USD (RLUSD) price & market cap* (CoinMarketCap, retrieved 2026-06) — https://coinmarketcap.com/currencies/ripple-usd/
- **Feasibility note:** Feasible/standard for an optional later layer — a real,
  NYDFS-regulated, fiat-backed stablecoin in active circulation. **Caveat:**
  market-cap figures are point-in-time; cite with the retrieval date.

## 3. MCC-locked card feasibility

- **Finding:** MCC (ISO 18245 four-digit code) restrictions are a **core,
  network-standard** card control: at authorization time the issuer/processor
  evaluates the transaction's MCC against an allow/block list and approves or
  **declines in real time, before settlement**. Explicitly supported by modern
  issuer-processors — **Lithic** ("Authorization Rules" can `decline` on the
  `AUTHORIZATION` event by MCC, with a shadow-mode test path); **Stripe Issuing**
  (MCC exposed as `merchant_data.category`, usable in
  `allowed_categories`/`blocked_categories`). **Marqeta** and **Galileo** are
  also widely documented for MCC/spend controls.
- **Status:** **[Confirmed]** that MCC-based hard decline at authorization is
  standard and offered by named platforms (Lithic, Stripe primary docs).
  Marqeta/Galileo directionally confirmed, not deep-fetched.
- **Sources:**
  - *Authorization Rules* (Lithic Docs) — https://docs.lithic.com/docs/authorization-rules-v2
  - *Merchant Category Codes (MCCs)* (Lithic Docs) — https://docs.lithic.com/docs/merchant-category-codes-mccs
  - *Issuing merchant categories* (Stripe Documentation) — https://docs.stripe.com/issuing/categories
- **Feasibility note:** **Standard, not novel.** Real-time MCC allow-list with
  hard decline before money moves is a commodity issuer-processor feature. What
  is differentiated for CivicChain is the **framing** — "contract-bound" MCC lock
  tied to a specific procurement contract; the policy/business layer is the novel
  part, the underlying control is off-the-shelf. Honest investor language: *"uses
  standard issuer-processor MCC controls,"* not *"proprietary technology."*

## Numbers to use (replace "~4s" / "<500ms")

- **XRPL finality / close time: ~3–5 seconds** (typical ledger close;
  transactions final on validation), at **10 drops = 0.00001 XRP** per standard
  transaction.
- **XRPL throughput: cite a range, ~1,000–1,500 tx/s** (XRPL-attributed; sources
  conflict, so no single hard figure).
- Do **not** attach "<500ms" to XRPL — sub-second finality is not what XRPL's own
  docs claim; the defensible figure is the ~3–5s ledger-close window. The two
  figures most likely to be challenged (XRPL TPS, RLUSD market cap) should be
  cited as a range and with a retrieval date respectively.
