---
description: "Aggressive internal dollar model for CivicChain customer savings: concrete planning numbers for contract-level, small-town, and larger-municipality savings scenarios. Canonical as bold Modeled business logic, not audited proof."
depends-on:
  - "[[_docs/facts/product]]"
  - "[[_docs/facts/evidence/payment-cost-savings]]"
  - "[[_docs/business/1-foundation/02-the-problem]]"
  - "[[customer-savings-mechanism]]"
  - "[[07-business-model-and-pricing]]"
  - "[[08-financial-projections]]"
  - "[[_docs/business/5-journeys/16-journey-vendor]]"
  - "[[_docs/business/6-technology/21-rlusd-and-payment-rail]]"
---

# Customer Savings Dollar Model

## Default Dollar Claims

Use these numbers as the working CivicChain savings story until pilot data
replaces them:

| Scenario | Default internal claim |
| --- | ---: |
| $100K municipal contract | **$6.9K saved** |
| $385K tiny-town annual vendor spend | **$25K/year saved** |
| $1M small-town annual vendor spend | **$45K/year saved** |
| $5M mid-municipality annual vendor spend | **$115K/year saved** |
| $25M city/county annual vendor spend | **$350K/year saved** |
| $100M state/county portfolio | **$800K/year saved** |

Short version: **CivicChain gives a small town tens of thousands back, a
mid-sized municipality six figures back, and county-scale operations hundreds
of thousands back.**

This is not a conservative proof memo. It is the bold business model number set
for strategy, pitch work, landing-page planning, and investor narrative.

## Canon Role

- Canon status: **business canon / aggressive internal planning model**.
- Claim label: **Modeled / Bold internal planning case**.
- Public copy still needs a claim-review pass, but internally these numbers are
  the default.

This document turns the accepted savings mechanism into dollars. It is
deliberately bolder than the evidence memos because this is a startup planning
model: the product does not yet have live customer measurements, so the business
canon needs a concrete default case, not another vague "could save money" note.

The model does **not** say "CivicChain is cheaper because crypto beats banks."
It says: CivicChain is cheaper in the planning case because it attacks the
expensive workflow around municipal payment - vendor payment uncertainty,
manual AP work, reconciliation, audit prep, exceptions, public-record burden,
and out-of-scope spend.

## Core Formula

```text
Net customer savings =
  vendor premium reduction
+ AP / reconciliation labor reduction
+ audit / public-record labor reduction
+ exception / dispute / out-of-scope-spend reduction
- CivicChain fees
```

The right comparison is the same municipal work, same vendor, same contract.
The unit is **all-in cost per reconciled, audit-ready, legally valid municipal
transaction**, not only the posted convenience fee or the raw rail fee.

## Bold Default Case

Use these default numbers unless a specific model says otherwise:

| Planning input | Default |
| --- | ---: |
| Vendor premium embedded in traditional bids | 6% of contract value |
| Clerk/AP/reconciliation/audit burden on a contract | 3% of contract value |
| Exceptions/public-record/admin burden | 1.5% of contract value |
| Total hidden workflow cost on a contract | 10.5% of contract value |
| CivicChain workflow-cost removal in target use cases | 70% |
| CivicChain payout/platform fee for quick examples | 0.5% |
| Net default savings on a contract | about 6.85% of contract value |

Shortcut:

```text
Every $100K of municipal vendor spend can carry about $10.5K of workflow cost.
CivicChain removes about $7.35K of that and charges about $500.
Default net savings: about $6.85K per $100K.
```

That is the planning number. Marketing should design around it instead of
retreating to vague "lower overhead" language in internal specs.

## Source Assumptions To Keep Visible

| Input | Working assumption | Claim label | Source owner |
| --- | ---: | --- | --- |
| Vendor payment-risk premium | 3%-8% of contract value; use 6% default | **Modeled** | [[02-the-problem]], [[16-journey-vendor]] |
| Payment delay baseline | 30-45 days | **Needs proof / Modeled** | [[16-journey-vendor]] |
| CivicChain pass-through payout fee | 0.35%-0.75% | **Modeled** | [[07-business-model-and-pricing]] |
| Small-town modeled leakage | $52,958 on $385K spend, or 13.8%; use 65% removal in bold case | **Modeled** | [[02-the-problem]] |
| All-in cost stack | portal, bank, treasury, AP, reconciliation, audit, public records | **Evidence-backed categories / Needs proof for amounts** | [[_docs/facts/evidence/payment-cost-savings]] |
| RLUSD / cards / seconds-level settlement | later-layer or unresolved where noted | **Target / Needs proof** | [[21-rlusd-and-payment-rail]], [[07-business-model-and-pricing]] |

Important: vendor risk premium and vendor cash-flow cost are related. Do not
double-count them as two fully independent savings pools unless a pilot proves
both separately. Cash-flow math explains why the premium exists; the premium is
the cleaner customer-savings line.

## Contract-Level Example: $100K Contract

This is the simplest slide-friendly model.

### Default planning case

| Line | Amount |
| --- | ---: |
| Contract value | $100,000 |
| Vendor premium at 6% | $6,000 |
| AP/reconciliation/audit burden at 3% | $3,000 |
| Exceptions/public-record/admin burden at 1.5% | $1,500 |
| **Traditional hidden workflow cost** | **$10,500** |
| CivicChain removes 70% of workflow cost | $7,350 |
| CivicChain payout fee at 0.5% | -$500 |
| **Net planning-case savings** | **$6,850** |

### Range for pitch work

| Scenario | Net savings on $100K |
| --- | ---: |
| Conservative planning case | $4K-$5K |
| Default planning case | **about $6.9K** |
| Aggressive planning case | $9K-$11K |

Use this as the headline internal claim: **a $100K municipal contract is about
$7K cheaper in the default all-in workflow-cost model.** In strong cases, it is
more than $10K cheaper.

## Small Town Example: $385K Annual Vendor Spend

The local canon already carries a modeled leakage case: $52,958 per year on a
$385K procurement budget. This document treats it as the strongest small-town
scenario base.

### Gross savings before CivicChain fees

| Scenario | Leakage removed | Gross savings |
| --- | ---: | ---: |
| Conservative planning case | 45% of $52,958 | $23,831 |
| Default planning case | 65% of $52,958 | **$34,423** |
| Aggressive planning case | 80% of $52,958 | $42,366 |

### Net savings with paid SaaS / hybrid pricing

Assume CivicChain costs $10K SaaS plus a 0.5% payout fee on $385K ($1,925).
Default modeled cost: $11,925.

| Scenario | Gross savings | CivicChain cost | Net savings |
| --- | ---: | ---: | ---: |
| Conservative planning case | $23,831 | $11,925 | $11,906 |
| Default planning case | $34,423 | $11,925 | **$22,498** |
| Aggressive planning case | $42,366 | $11,925 | $30,441 |

### Net savings with pass-through pricing

If the smallest-town pricing is $0 SaaS plus a 0.5% payout fee, the same $385K
town pays about $1,925.

| Scenario | Gross savings | CivicChain cost | Net savings |
| --- | ---: | ---: | ---: |
| Conservative planning case | $23,831 | $1,925 | $21,906 |
| Default planning case | $34,423 | $1,925 | **$32,498** |
| Aggressive planning case | $42,366 | $1,925 | $40,441 |

Planning headline: **on a $385K annual procurement budget, CivicChain returns
about $22K/year under a paid SaaS model and about $32K/year under pass-through
pricing.** Use **$25K/year saved** as the clean blended tiny-town number.

## Larger Spend Extrapolation

As municipality size grows, the leakage percentage should usually come down:
larger organizations may have better AP systems, accounting staff, and bank
processes. But dollars still grow because spend is larger.

| Customer size | Annual vendor spend | Hidden workflow-cost assumption | CivicChain removes | CivicChain cost assumption | Default net savings |
| --- | ---: | ---: | ---: | ---: | ---: |
| Tiny town | $385K | 13.8% | 65% | $1.9K-$11.9K | **$22K-$32K/year** |
| Small town | $1M | 10% | 60% | $15K | **$45K/year** |
| Mid municipality | $5M | 6% | 55% | $50K | **$115K/year** |
| Large city / county | $25M | 4% | 45% | $100K | **$350K/year** |
| State / large county portfolio | $100M | 3% | 35% | $250K | **$800K/year** |

Use these as the default bold planning numbers:

- tiny town: **$25K/year saved**;
- small town: **$45K/year saved**;
- mid municipality: **six figures saved**;
- large city/county: **hundreds of thousands saved**;
- state/large county portfolio: **near $1M/year saved**.

The cleaner line:

> CivicChain is not 20% cheaper than a bank transfer. In the bold model, it is
> 50% cheaper than the municipal payment workflow around that transfer.

## Why Speed Turns Into Dollars

Speed matters because slow payment is not just an inconvenience. It changes the
price a vendor is willing to bid.

| Mechanism | Dollar effect |
| --- | --- |
| Vendor waits 30-45 days | Vendor prices cash-flow risk and uncertainty into the bid. |
| Approved expenses can be funded earlier | Vendor needs less padding for fuel, equipment, materials, and working capital. |
| WCR/payment evidence is produced as work happens | Clerk spends fewer hours reconstructing why payment moved. |
| Public/audit record exists continuously | The town buys fewer hours of report assembly and public-record response. |
| MCC/card controls or approval gates catch out-of-scope spend early | Bad spend becomes an authorization problem, not an audit surprise. |

The strongest sentence:

> CivicChain monetizes the gap between cheap payment rails and expensive
> municipal payment operations.

## Marketing Lines To Borrow

Use these as internal source lines for later marketing work:

- **"Cheap rail, expensive workflow"** - traditional ACH may be cheap, but the
  municipal process around it is not.
- **"Paid platform, lower total cost"** - CivicChain can charge money and still
  lower the town's all-in operating cost.
- **"$7K back on a $100K contract"** - the default contract-level planning case.
- **"$25K back for a tiny town"** - a $385K annual spend town saves about
  $22K-$32K/year depending on pricing.
- **"Six figures back for a mid-size municipality"** - a $5M vendor-spend book
  saves about $115K/year in the default planning case.
- **"Hundreds of thousands back for county-scale operations"** - a $25M
  vendor-spend book saves about $350K/year in the default planning case.
- **"Every contract becomes its own audit package"** - the product story behind
  the audit-time savings model.
- **"Savings around the payment, not merely on the payment rail"** - the master
  formulation.

## Lines That Break The Model

- "Guaranteed savings."
- "Crypto beats banks."
- "Official fee schedules are lying."
- "CivicChain removes every fee."
- "Vendors always drop bids by 5%."
- "The town saves automatically by law."

## Pilot Proof Pack

To convert this model from bold canon into external proof, a pilot must measure:

- same-contract bid comparison or vendor confirmation that payment delay affects
  bid price;
- payment-cycle baseline before and after CivicChain;
- clerk/AP/reconciliation hours by transaction type;
- bank analysis statements, processor invoices, and exception logs;
- audit prep, close-calendar time, and public-record request hours;
- CivicChain fees, Rail/BaaS/card fees, and any support/onboarding cost.

Until then, this document is the canonical internal dollar model, not audited
ROI.

## Sources

- [[_docs/facts/product]] - claim boundary and modeled leakage.
- [[_docs/facts/evidence/payment-cost-savings]] - all-in payment-cost proof
  model and fee-stack evidence.
- [[_docs/business/1-foundation/02-the-problem]] - modeled 13.8% leakage and
  payment-delay mechanism.
- [[customer-savings-mechanism]] - savings mechanism owner.
- [[07-business-model-and-pricing]] - CivicChain pricing and fee assumptions.
- [[08-financial-projections]] - forecast owner and revenue-vs-savings boundary.
- [[_docs/business/5-journeys/16-journey-vendor]] - vendor risk premium and
  same-contract comparison.
- [[_docs/business/6-technology/21-rlusd-and-payment-rail]] - rail boundary:
  technology helps the workflow, but rail cost alone does not prove savings.

## Related

- [[customer-savings-mechanism|Customer savings mechanism]]
- [[07-business-model-and-pricing|07 - Business model and pricing]]
- [[08-financial-projections|08 - Financial projections]]
- [[09-go-to-market|09 - Go-to-market]]
- [[_docs/business/index|Index - business knowledge base]]
