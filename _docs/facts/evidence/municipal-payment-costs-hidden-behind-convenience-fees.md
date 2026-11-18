---
description: "External evidence packet on municipal payment cost stack behind convenience fees: resident fees, ACH/treasury costs, reconciliation burden, AP delay, FedNow/RTP/crypto baselines, and pilot cost model."
depends-on: []
---

# Municipal Payment Costs Hidden Behind Convenience Fees

## Executive Summary

- **Convenience Fees Are Only The Front Door**: Official fee schedules show resident card payment fees from **2.4%** in Palm Beach County to **2.99%** in West Hartford and **3% plus $2** in Ballston, while e-check fees range from **$0** to **$2.95** -> model resident cost and municipal back-office cost separately, because the visible fee often only pays the processor or portal, not the town's reconciliation, banking, and audit work. [executive_summary[0]] [19], [executive_summary[1]] [12], [executive_summary[2]] [96]
- **ACH Is Cheap At The Rail, Not Always Cheap In Practice**: The official 2026 FedACH fee schedule lists a **$0.0035** standard item fee and a **$55** minimum monthly forward origination fee, but bank-facing schedules show ACH at **$0.26 per item**, same-day ACH surcharges, and reporting or reconciliation fees -> do not benchmark a municipal workflow against raw FedACH rail cost alone. [executive_summary[3]] [39], [executive_summary[4]] [40]
- **Cards Shift Costs, They Do Not Remove Them**: Card programs can legally pass service fees to government payers in eligible merchant categories, but local choices vary by state, portal, and policy; Ballston says it cannot absorb its **$2 municipal payment fee plus 3% credit card processing fee** -> a crypto or real-time payment alternative must beat the resident-facing card surcharge and the government's internal handling cost. [executive_summary[5]] [97], [executive_summary[2]] [96]
- **Treasury Fees Create Fixed-Cost Diseconomies**: Bank schedules show lockbox at **$200 per month plus $1 per item**, Positive Pay at **$25 per month plus $0.07 per check**, daily BAI reporting at **$70 per month**, and full reconciliation at **$100 per month** -> for small towns, fixed treasury services can matter more than per-transaction payment rails. [executive_summary[4]] [40]
- **Reconciliation Is The Real Control Bottleneck**: Washington's State Auditor says bank reconciliation is a documented monthly control to compare bank activity with government accounting records, while Missouri auditors found Stotts City did not prepare monthly reconciliations for **nine bank accounts** -> any new payment workflow should be judged by whether it reduces exceptions and produces audit-ready records, not only by settlement speed. [executive_summary[6]] [25], [executive_summary[7]] [49]
- **Vendor Payments Cost More In Cycle Time Than Rail Fees**: Industry estimates put paper checks around **$2.01 to $4.00** each and manual AP processing around **$12 to $40 per invoice**, while Florida prompt-payment rules impose deadlines and **1% per month** interest on untimely local-government construction payments -> prioritize invoice approval, procurement, and AP automation before optimizing the final payment rail. [executive_summary[8]] [36], [executive_summary[9]] [35], [executive_summary[10]] [30]
- **Small Towns Are The Stress Test**: Stotts City, Missouri had a **2020 Census population of 167**, **three part-time employees**, about **$103,700** in receipts, and about **$87,400** in disbursements in fiscal 2024, yet still faced segregation-of-duties, receipt, deposit, reconciliation, and reporting findings -> lightweight shared services or managed payment workflows may matter more than full ERP deployments. [executive_summary[7]] [49]
- **Crypto Must Beat FedNow, RTP, And Audit Automation**: Colorado's state tax crypto option uses PayPal, charges **$1 plus 1.83%**, converts to dollars, and says the transfer typically takes **3 to 5 business days**, while FedNow's 2026 customer credit transfer origination fee is **$0.045 per item** and RTP reports 24x7 final settlement -> a crypto-enabled civic workflow is only compelling if it removes portal fees, exceptions, and reconciliation labor that modern bank rails cannot. [executive_summary[11]] [59], [executive_summary[12]] [54], [executive_summary[13]] [52]
- **Speculative Crypto Is Not Public-Finance Ready**: GFOA advises governments to abstain from accepting cryptocurrency for receivables, using it for payables, or investing in it because of volatility, lack of legal-tender status, and standard banking limitations -> if tested at all, the viable design is a regulated dollar-denominated workflow layer with automatic conversion, public-records controls, and no government balance-sheet exposure to volatile tokens. [executive_summary[14]] [73]

## Evidence Map: What Is Confirmed, Estimated, Or Anecdotal

| Evidence type | What is confirmed or estimated | How reliable it is | How it should be used |
|---|---:|---|---|
| Official municipal fee schedules | West Hartford charges **$0.90** for ACH/e-check and **2.99%**, minimum **$3.95**, for card, PayPal, or Venmo payments; Hillsborough, NJ offers **$0** e-check and **2.5%** card payments; Palm Beach County charges **2.4%**, minimum **$2**, for cards and offers free e-checks. | Confirmed for those jurisdictions, not a national average. | Use as real examples showing the range of resident-facing fees. [evidence_map_what_is_confirmed_estimated_or_anecdotal[0]] [12], [evidence_map_what_is_confirmed_estimated_or_anecdotal[1]] [15], [evidence_map_what_is_confirmed_estimated_or_anecdotal[2]] [19] |
| Official bank and public RFP documents | Bank and treasury line items include ACH, wires, lockbox, Positive Pay, BAI reporting, full reconciliation, research, training, imaging, and daily reporting. | Confirmed for specific banks and RFPs, not universal pricing. | Use to expose the cost categories missing from convenience-fee comparisons. [evidence_map_what_is_confirmed_estimated_or_anecdotal[3]] [40], [evidence_map_what_is_confirmed_estimated_or_anecdotal[4]] [41] |
| Official audit reports and auditor guidance | Stotts City did not prepare monthly bank reconciliations for **nine accounts**; Ohio placed Corning on an unauditable list because of incomplete records and unsupported bank reconciliations. | Strong evidence of control burden and small-entity failure modes. | Use as case studies for reconciliation and reporting risk. [evidence_map_what_is_confirmed_estimated_or_anecdotal[5]] [49], [evidence_map_what_is_confirmed_estimated_or_anecdotal[6]] [23] |
| Industry cost estimates | Paper checks are estimated around **$2.01 to $4.00** each; manual AP invoice processing is estimated at **$12 to $40** per invoice and automated AP at **$1 to $5**. | Useful estimates, but not municipal-specific and may vary by process maturity. | Use for directional modeling, not as audited municipal cost. [evidence_map_what_is_confirmed_estimated_or_anecdotal[7]] [36], [evidence_map_what_is_confirmed_estimated_or_anecdotal[8]] [35] |
| Vendor articles and unverified claims | Some vendor material claims slow payments reduce vendor participation or raise bids. A searched claim that **73%** of vendors cited payment timing as their top concern was not verified in a primary source. | Anecdotal or vendor-claimed unless supported by official survey data. | Do not treat as confirmed. Use only as a hypothesis to test with procurement data. |

The important split is not "card versus crypto." It is **confirmed transaction fees**, **estimated labor and exception costs**, and **hard-to-measure risk premiums**. The latter two categories are where the current stack is most expensive and where a new workflow could create value.

## 1. The Resident Payment Stack: Visible Fees Are Real, Variable, And Incomplete

Residents see the most obvious cost as a convenience fee, but official schedules show that the amount depends on the bill type, payment channel, state rules, and vendor model. West Hartford charges **$0.90** for electronic check/ACH and **2.99%**, minimum **$3.95**, for credit, debit, PayPal, or Venmo payments; it also says cash or money orders provide immediate DMV clearance, while other payment forms are subject to a **10-day hold**. [1_the_resident_payment_stack_visible_fees_are_real_variable_and_incomplete[0]] [12]

Other municipalities make different policy choices. Hillsborough, NJ offers zero-fee e-checks and a free ACH Direct Debit plan, but card payments incur a **2.5%** convenience fee. [1_the_resident_payment_stack_visible_fees_are_real_variable_and_incomplete[1]] [15] Palm Beach County's tax collector offers free e-checks, applies a **2.4%** card fee with a **$2** minimum, caps credit-card transactions at **$99,999.99**, and requires a cashier's check or money order if an electronic payment is rejected. [1_the_resident_payment_stack_visible_fees_are_real_variable_and_incomplete[2]] [19] Belleville, NJ charges **$2.95** for ACH/e-check and says debit and credit card payments carry a fee of approximately **3%**. [1_the_resident_payment_stack_visible_fees_are_real_variable_and_incomplete[3]] [18]

| Jurisdiction or portal | Resident payment method | Visible fee | Timing or exception | Evidence class |
|---|---:|---:|---|---|
| West Hartford, CT | ACH/e-check | **$0.90** | Non-cash or non-money-order payments can face a **10-day hold** for DMV clearance. | Confirmed official schedule. [1_the_resident_payment_stack_visible_fees_are_real_variable_and_incomplete[0]] [12] |
| West Hartford, CT | Card, PayPal, Venmo | **2.99%**, minimum **$3.95** | Fee is resident-facing. | Confirmed official schedule. [1_the_resident_payment_stack_visible_fees_are_real_variable_and_incomplete[0]] [12] |
| Hillsborough, NJ | E-check | **$0** | Free ACH Direct Debit plan if enrolled by deadline. | Confirmed official schedule. [1_the_resident_payment_stack_visible_fees_are_real_variable_and_incomplete[1]] [15] |
| Hillsborough, NJ | Card | **2.5%** | Postmarks are not accepted as proof of timely payment. | Confirmed official schedule. [1_the_resident_payment_stack_visible_fees_are_real_variable_and_incomplete[1]] [15] |
| Palm Beach County, FL | Card | **2.4%**, minimum **$2** | Credit-card payment limit is **$99,999.99**. | Confirmed official schedule. [1_the_resident_payment_stack_visible_fees_are_real_variable_and_incomplete[2]] [19] |
| Ballston, NY portal | Online utility card payment | **$2 municipal payment fee plus 3% credit card processing fee** | Portal states the town cannot absorb the fees. | Confirmed portal example. [1_the_resident_payment_stack_visible_fees_are_real_variable_and_incomplete[4]] [96] |
| Havelock, NC | Card after July 1, 2026 | **3.75%**, minimum **$2.50** | Announced to begin after the current date of this report. | Confirmed future-dated official announcement. [1_the_resident_payment_stack_visible_fees_are_real_variable_and_incomplete[5]] [20] |

The fee table shows why a resident who pays a **$1,000** bill by card may see a charge around **$24 to $37.50** in the examples above, while the same bill by e-check may cost **$0 to $2.95** before returned-payment risk. That calculation is illustrative, not a municipal national average, but it shows the economic spread that a competing workflow must beat.

The hidden point is that these fees do not necessarily cover the full government cost. A no-fee e-check is often a policy decision to absorb bank, vendor, or reconciliation costs elsewhere; a percentage card fee usually covers card acceptance and processor economics, not necessarily the municipality's staff time to post, reconcile, refund, research, and audit the transaction.

## 2. The Municipality Acceptance Stack: Portals, Banks, Treasury Services, And Controls

A resident payment touches more than a payment rail. The municipal acceptance stack usually includes a customer portal, merchant or gateway processing, bank deposits, lockbox or remote deposit services, accounting integration, exception queues, reporting, and reconciliation. The Town of Round Hill staff report is a useful case study because it describes a move from Paymentus to InvoiceCloud, with Paymentus described as a **$2.50** per-transaction model and InvoiceCloud described as **2% of total monthly electronic payments**; it also references integration with the town's finance software and identifies finance staff roles tied to utility billing and bank reconciliation. [2_the_municipality_acceptance_stack_portals_banks_treasury_services_and_controls[0]] [29]

Banking and treasury prices show why all-in costs continue after the portal fee. A bank business fee schedule effective **6/1/26** lists ACH debits or credits received at **$0.26** per item, ACH originated items at **$0.26**, same-day settlement entries at an additional **$1.70**, incoming wires at **$15**, outgoing domestic wires at **$30**, outgoing international wires at **$45**, stop payments through customer service at **$35**, and NSF or overdraft fees at **$39.50**. [2_the_municipality_acceptance_stack_portals_banks_treasury_services_and_controls[1]] [40]

| Treasury or banking component | Confirmed cost or requirement | Why it matters for municipal all-in cost |
|---|---:|---|
| FedACH standard item | **$0.0035** per forward or return item | This is wholesale rail pricing, not the delivered municipal workflow cost. [2_the_municipality_acceptance_stack_portals_banks_treasury_services_and_controls[2]] [39] |
| FedACH minimum monthly forward origination | **$55** | Even low per-item rails can have fixed costs. [2_the_municipality_acceptance_stack_portals_banks_treasury_services_and_controls[2]] [39] |
| Bank ACH originated or received item | **$0.26** | Customer-facing bank pricing can be far above raw ACH rail cost. [2_the_municipality_acceptance_stack_portals_banks_treasury_services_and_controls[1]] [40] |
| Lockbox | **$200 per month plus $1 per item** | Lockbox converts mail and checks into data, but creates fixed and variable cost. [2_the_municipality_acceptance_stack_portals_banks_treasury_services_and_controls[1]] [40] |
| Positive Pay with Payee Match | **$25 per month plus $0.07 per check issued** | Fraud controls add cost but reduce check risk. [2_the_municipality_acceptance_stack_portals_banks_treasury_services_and_controls[1]] [40] |
| Daily BAI reporting | **$70 per month** | Reporting files support automated posting and reconciliation. [2_the_municipality_acceptance_stack_portals_banks_treasury_services_and_controls[1]] [40] |
| Full reconciliation service | **$100 per month** | Outsourced reconciliation has a direct monthly price. [2_the_municipality_acceptance_stack_portals_banks_treasury_services_and_controls[1]] [40] |
| Research | **$125 per hour**, **$62.50** minimum | Exceptions and historical research turn small payment problems into staff or bank charges. [2_the_municipality_acceptance_stack_portals_banks_treasury_services_and_controls[1]] [40] |

Public depository RFPs add a second kind of cost: required capabilities. HESAA's depository banking RFP requires lockbox imaging, storage, web-based retrieval of deposited checks and remittance documents, scanning and image conversion, batch-file support for recurring debit processes, remote deposit capture, and implementation planning. [2_the_municipality_acceptance_stack_portals_banks_treasury_services_and_controls[3]] [41] MCPASD's depository services RFP requires multiple investment-type accounts and full ACH and wire capabilities, showing that public entities buy an integrated treasury operating model, not only a bank account. [2_the_municipality_acceptance_stack_portals_banks_treasury_services_and_controls[4]] [77]

The decision-ready implication is that a crypto-enabled civic workflow cannot be evaluated against only the card fee or ACH fee. It must replace, reduce, or simplify the portal, bank reporting, exception handling, and audit evidence that governments currently buy from multiple vendors.

## 3. Vendor And Contractor Payments: The Cost Is In AP, Procurement, And Delay

On the payables side, governments pay vendors through checks, ACH, wires, purchasing cards, and virtual cards. GFOA recommends that governments establish policies, procedures, and internal controls for each payment method and use electronic means as often as possible; it identifies ACH as suitable for high-volume, low-dollar tasks such as payroll and routine vendor payments. [3_vendor_and_contractor_payments_the_cost_is_in_ap_procurement_and_delay[0]] [2]

The direct rail cost is only one layer. AFP cites the 2022 AFP Payments Cost Benchmarking Survey for a median paper-check transaction cost of **$2.01 to $4.00**. [3_vendor_and_contractor_payments_the_cost_is_in_ap_procurement_and_delay[1]] [36] Industry AP benchmarks estimate manual invoice processing at **$12 to $40** per invoice and automated invoice processing at **$1 to $5** per invoice. [3_vendor_and_contractor_payments_the_cost_is_in_ap_procurement_and_delay[2]] [35] Those are not municipal audit figures, but they are useful estimates because municipalities still have the same procure-to-pay steps: vendor onboarding, purchase order or contract matching, invoice receipt, approval routing, budget coding, payment authorization, posting, and audit retention.

| Payables component | Confirmed evidence or estimate | Classification | Municipal implication |
|---|---:|---|---|
| Paper check | **$2.01 to $4.00** median cost per check transaction | Industry estimate. [3_vendor_and_contractor_payments_the_cost_is_in_ap_procurement_and_delay[1]] [36] | Replacing checks can save printing, postage, fraud-control, and reconciliation cost. |
| Manual AP invoice processing | **$12 to $40** per invoice | Industry estimate. [3_vendor_and_contractor_payments_the_cost_is_in_ap_procurement_and_delay[2]] [35] | Payment rail savings are small if invoice approval remains manual. |
| Automated AP invoice processing | **$1 to $5** per invoice | Industry estimate. [3_vendor_and_contractor_payments_the_cost_is_in_ap_procurement_and_delay[2]] [35] | Workflow automation is likely more valuable than rail substitution alone. |
| ACH | Recommended by GFOA for high-volume, low-dollar uses | Professional guidance. [3_vendor_and_contractor_payments_the_cost_is_in_ap_procurement_and_delay[0]] [2] | ACH is already the baseline competitor for low-cost vendor payments. |
| Purchasing card or virtual card | GFOA says purchasing cards can reduce small-dollar purchase orders and petty cash; vendors that accept some card payments pay a processing fee and governments may receive rebates | Professional guidance. [3_vendor_and_contractor_payments_the_cost_is_in_ap_procurement_and_delay[0]] [2] | Some savings are cost-shifts to vendors, not systemwide cost elimination. |
| Late local-government construction payment in Florida | Untimely payments accrue **1% per month** interest under local-government prompt-payment rules | Confirmed legal source. [3_vendor_and_contractor_payments_the_cost_is_in_ap_procurement_and_delay[3]] [30] | Payment delays have legal and working-capital consequences. |

Vendor risk premiums are the hardest part to quantify. The confirmed evidence is that states create prompt-payment regimes because timing matters: Florida local-government construction payments to general contractors are due within **25 business days** of receiving a payment request, disputed requests must be rejected within **20 days**, and untimely payments accrue **1% per month** interest. [3_vendor_and_contractor_payments_the_cost_is_in_ap_procurement_and_delay[3]] [30]

The anecdotal claim is that slow payment reduces bids or raises prices. That is economically plausible because small vendors finance payroll and materials while waiting for public checks, but the specific searched claim that **73%** of vendors cited payment timing as their top bid concern was not verified in a primary source during this research. It should not be treated as confirmed. The proper recommendation is to measure it locally: compare bid counts, prompt-payment performance, change-order disputes, and vendor survey responses before and after payment-workflow modernization.

## 4. Reconciliation, Audit, Returns, And Settlement: The Hidden Control Layer

Reconciliation is not clerical trivia. Washington's State Auditor defines bank reconciliation as a comparison of cash and investment balances and activity according to the bank with the government's accounting records, and says documented global bank reconciliation should occur at least monthly. [4_reconciliation_audit_returns_and_settlement_the_hidden_control_layer[0]] [25] That control is why raw payment speed does not automatically reduce municipal cost: every receipt still has to match a bill, account, period, taxpayer or vendor, bank deposit, refund rule, and audit trail.

ACH timing illustrates the operational issue. Nacha says ACH payments can be processed on the same business day, scheduled for the following day, or, for ACH credits, up to two business days later. [4_reconciliation_audit_returns_and_settlement_the_hidden_control_layer[1]] [94] FedACH's same-day schedule has submission deadlines at **10:30 a.m. ET**, **2:45 p.m. ET**, and **4:45 p.m. ET**, with settlement at **1:00 p.m. ET**, **5:00 p.m. ET**, and **6:00 p.m. ET**; non-same-day items settle at **8:30 a.m. ET** on the later of the next banking day or settlement date. [4_reconciliation_audit_returns_and_settlement_the_hidden_control_layer[2]] [88] ACH also creates return and NSF exception work; FDIC guidance warns that multiple NSF fees can arise when the same unpaid check or ACH transaction is re-presented. [4_reconciliation_audit_returns_and_settlement_the_hidden_control_layer[3]] [91]

Returned payment fees show the exception-cost layer. Santa Rosa County Tax Collector says Florida Statute 68.065 authorizes service charges for returned e-checks: **$25** if the payment is under **$50**, **$30** for **$50 to $299.99**, **$40** for **$300 to $799.99**, and **5%** for **$800 or more**. It also uses Envision Payment Solutions to recover dishonored checks, and payers authorize electronic debit of service charges and processing fees. [4_reconciliation_audit_returns_and_settlement_the_hidden_control_layer[4]] [103]

| Delay or exception source | Confirmed fact | Cost mechanism | Workflow implication |
|---|---|---|---|
| ACH banking-day settlement | ACH can be same-day or future-dated; FedACH same-day settlement windows are scheduled. | Payments may not post when the resident thinks the bill is paid. | Automate pending, settled, and returned states. [4_reconciliation_audit_returns_and_settlement_the_hidden_control_layer[2]] [88] |
| Returned e-check | Santa Rosa County returned e-check fees reach **5%** for checks of **$800 or more**. | Resident fee plus staff/vendor recovery process. | Up-front bank validation and better exception workflows may save more than rail substitution. [4_reconciliation_audit_returns_and_settlement_the_hidden_control_layer[4]] [103] |
| Card/service fee compliance | Eligible government and higher-education merchant categories can charge service fees, but state limits may apply. | Policy, disclosure, and dispute risk. | Fee design must be legally and card-network compliant. [4_reconciliation_audit_returns_and_settlement_the_hidden_control_layer[5]] [97] |
| Bank reconciliation | Monthly documented reconciliation is an auditor control. | Staff time, exception research, audit evidence. | New systems must output reconciled accounting records, not just payment confirmations. [4_reconciliation_audit_returns_and_settlement_the_hidden_control_layer[0]] [25] |

The case study is Stotts City, Missouri. The city did not prepare monthly bank reconciliations for **nine bank accounts**, had inadequate segregation of duties, and incurred **$70** in water-account overdraft fees in late 2024. [4_reconciliation_audit_returns_and_settlement_the_hidden_control_layer[6]] [49] That finding shows that the high-cost problem is often not the payment fee. It is the failure to maintain a complete, timely, independent record of cash activity.

## 5. Small-Town Economics: Fixed Costs, Thin Staffing, And Partial Systems

Small governments face a different cost curve from large counties. Stotts City had a **2020 Census population of 167**, employed **three part-time individuals**, and processed about **$103,700** in receipts and **$87,400** in disbursements in fiscal 2024. [5_small_town_economics_fixed_costs_thin_staffing_and_partial_systems[0]] [49] The same audit found inadequate segregation of duties, inadequate receipting and depositing procedures, no monthly reconciliations for nine bank accounts, missing capital asset records, and failure to publish semiannual financial statements for multiple periods. [5_small_town_economics_fixed_costs_thin_staffing_and_partial_systems[0]] [49]

The structural problem is not simply poor management. Auditor training materials recognize that in small entities, one fiscal officer may receive payments, prepare deposits, record transactions, and reconcile bank statements. [5_small_town_economics_fixed_costs_thin_staffing_and_partial_systems[1]] [48] Tennessee municipal guidance states that officials should separate duties so no one person controls a complete transaction from beginning to end, and where segregation is impossible, management should use compensating detective controls. [5_small_town_economics_fixed_costs_thin_staffing_and_partial_systems[2]] [68]

This is where fixed costs become decisive. A **$200 per month** lockbox service is **$2,400 per year** before per-item charges; compared with Stotts City's **$103,700** in fiscal 2024 receipts, that would equal about **2.3%** of annual receipts if a similarly sized town bought that service at that price. That is an illustrative estimate combining an audited receipt figure and a bank fee schedule, not evidence that Stotts City bought that service. [5_small_town_economics_fixed_costs_thin_staffing_and_partial_systems[0]] [49], [5_small_town_economics_fixed_costs_thin_staffing_and_partial_systems[3]] [40]

The Ohio Auditor's Corning case shows the downside of failing to maintain records. Incomplete financial records and unsupported bank reconciliations led the Ohio Auditor to place the Village of Corning on the "unauditable" list, with a **90-day** period to revise records before potential legal action. [5_small_town_economics_fixed_costs_thin_staffing_and_partial_systems[4]] [23]

The decision implication is that small towns need payment modernization that behaves like a managed public-finance control system, not a stand-alone checkout button. The highest-value design is a low-fixed-cost workflow that combines bill presentment, payer identity, receipt posting, bank validation, settlement status, chart-of-accounts coding, document retention, audit exports, and elected-official review. A full municipal ERP can help, but the evidence here supports a narrower conclusion: the affordability problem is fixed overhead plus scarce staff, so modular shared services may be more realistic than enterprise replacement.

## 6. Crypto-Enabled Civic Payments Versus Cards, ACH, FedNow, RTP, And AP Automation

Colorado is the most concrete public-sector crypto case found in this research. The Colorado Department of Revenue accepts cryptocurrency for all state tax payments through the PayPal Cryptocurrencies Hub. The taxpayer must have the entire invoice value in a single cryptocurrency, PayPal converts the payment to dollars, the service charges **$1 plus 1.83%**, the transfer typically takes **3 to 5 business days**, the option is limited to PayPal Personal accounts, and the state does not issue refunds in cryptocurrency. [6_crypto_enabled_civic_payments_versus_cards_ach_fednow_rtp_and_ap_automation[0]] [59]

That case is not a strong cost-reduction proof. A **$1 plus 1.83%** crypto service charge is below some resident card examples but above free or low-cost e-check examples, and the **3 to 5 business day** transfer is not faster than modern bank rails. Colorado's design also leaves the government receiving dollars, which avoids holding volatile crypto but means the user is mostly buying an additional payment channel rather than a new municipal treasury architecture. [6_crypto_enabled_civic_payments_versus_cards_ach_fednow_rtp_and_ap_automation[0]] [59]

GFOA's public-finance position is more skeptical. Its advisory says governments should abstain from accepting cryptocurrency for receivables, using cryptocurrency for payables, or investing in cryptocurrency products. It cites volatility, lack of legal-tender status, inability to process through standard banking operations, and risk during conversion to dollars. [6_crypto_enabled_civic_payments_versus_cards_ach_fednow_rtp_and_ap_automation[1]] [73]

| Alternative | Confirmed cost or performance evidence | Main advantage | Main limitation for municipalities |
|---|---:|---|---|
| Card service-fee model | Resident-facing card examples run from **2.4%** to **3% plus $2** in sources reviewed. | Familiar, widely available, chargeback and cardholder protections. | Interchange and service fees are high for large tax bills. [6_crypto_enabled_civic_payments_versus_cards_ach_fednow_rtp_and_ap_automation[2]] [19], [6_crypto_enabled_civic_payments_versus_cards_ach_fednow_rtp_and_ap_automation[3]] [96] |
| ACH/e-check | Examples range from **$0** to **$2.95**; ACH settlement can be same-day or later. | Low cost for resident and government if integrated well. | Returns, NSF, banking-day timing, and reconciliation exceptions remain. [6_crypto_enabled_civic_payments_versus_cards_ach_fednow_rtp_and_ap_automation[4]] [15], [6_crypto_enabled_civic_payments_versus_cards_ach_fednow_rtp_and_ap_automation[5]] [18], [6_crypto_enabled_civic_payments_versus_cards_ach_fednow_rtp_and_ap_automation[6]] [88] |
| FedNow | 2026 customer credit transfer origination is **$0.045** per item; liquidity management transfers are **$1**. | Low published rail fee for instant-payment infrastructure. | Municipal adoption still depends on bank, portal, ERP, and reconciliation integration. [6_crypto_enabled_civic_payments_versus_cards_ach_fednow_rtp_and_ap_automation[7]] [54] |
| RTP network | The Clearing House reports 24x7 final settlement, **128M** transactions in Q1 2026, and a **$10M** transfer limit. | High-value, always-on final settlement. | Access is through financial institutions and still requires municipal accounting integration. [6_crypto_enabled_civic_payments_versus_cards_ach_fednow_rtp_and_ap_automation[8]] [52] |
| Colorado-style crypto via PayPal | **$1 plus 1.83%**, conversion to dollars, typically **3 to 5 business days**. | Adds a crypto payment option without the state holding crypto. | Not clearly cheaper than ACH and not clearly faster than real-time bank rails. [6_crypto_enabled_civic_payments_versus_cards_ach_fednow_rtp_and_ap_automation[0]] [59] |
| AP automation | Manual AP estimated at **$12 to $40** per invoice; automated AP estimated at **$1 to $5**. | Attacks the largest payables cost pool. | Requires process redesign, controls, and system integration. [6_crypto_enabled_civic_payments_versus_cards_ach_fednow_rtp_and_ap_automation[9]] [35] |

A crypto-enabled workflow could materially reduce cost only under a narrower design than "let residents pay in crypto." It would need to be dollar-denominated or instantly converted, avoid government exposure to volatile tokens, validate payer identity and bill data before payment, embed invoice or tax-account metadata, generate immutable but privacy-compliant audit trails, integrate with the general ledger, produce bank-grade settlement reports, and support refunds, reversals, and public-records retention.

The better benchmark is not the credit-card fee. It is the combined cost of ACH plus AP automation plus FedNow or RTP plus audit-ready reconciliation. If crypto does not beat that bundle on total cost, exception rate, reporting, and legal acceptability, it will add another rail rather than remove a layer.

## Synthesis: Where Crypto Can Cut Costs, And Where It Cannot

| Strategy or workflow | Mechanism | Scope | Evidence base | Trade-off | Decision implication |
|---|---|---|---|---|---|
| Card convenience or service fee | Passes card acceptance cost to the resident or payer. | Resident taxes, utilities, courts, permits, fees. | Strong official fee schedules, but jurisdiction-specific. | High percentage cost on large bills; familiar user experience. | Keep for accessibility, but do not treat it as cost efficient for large tax payments. |
| ACH/e-check | Pulls from bank accounts through low-cost bank rails. | Resident bills and recurring vendor payments. | Strong official and municipal evidence. | Low fee but return, NSF, and settlement-state work remains. | Default low-cost resident channel if bank validation and reconciliation are automated. |
| Paper checks | Physical payment instrument plus deposit, fraud controls, and reconciliation. | Residents without digital access and some vendor payments. | Strong industry estimates and bank fee evidence. | Accessible but costly and fraud-prone. | Maintain as an inclusion channel, but reduce volume through no-fee digital alternatives. |
| Bank treasury services | Lockbox, remote deposit, Positive Pay, BAI reporting, full reconciliation. | Cross-cutting municipal cash management. | Strong fee schedules and public RFP requirements. | Adds fixed cost but provides controls and audit evidence. | Replace only if the new workflow provides equivalent controls and reports. |
| Portal/vendor stack | Online checkout, bill lookup, payment routing, account posting. | Resident receivables and some utility systems. | Moderate evidence from Round Hill and municipal portals. | Convenience fees may hide vendor economics and integration work. | Negotiate on total cost per reconciled transaction, not checkout fee alone. |
| AP and procurement automation | Automates invoice capture, approvals, coding, vendor enrollment, and payment files. | Vendor and contractor payments. | Strong general industry estimates, less municipal-specific cost data. | Requires process change and controls. | Highest probable savings area for payables. |
| FedNow/RTP | Instant bank-account settlement through financial institutions. | Receipts, disbursements, refunds, vendor payments. | Strong rail-cost and network-performance evidence, but adoption economics depend on banks. | Does not solve bill matching or audit records by itself. | Treat as the main non-crypto competitor for faster settlement. |
| Crypto or stablecoin workflow | Tokenized or blockchain-assisted payment, possibly with instant conversion to dollars. | Potential receipts, vendor payments, grants, intergovernmental transfers. | Colorado evidence shows added channel; GFOA warns against crypto use. | Volatility, legal authority, custody, conversion, accounting, privacy, and refund issues. | Consider only as a regulated workflow layer that beats ACH/FedNow/RTP on total operating cost. |

The central finding is that municipal payment cost is a **stack**, not a fee. For resident payments, the visible fee is often a card or portal charge. Behind it sit bank fees, settlement timing, returned-payment risk, staff posting, refund handling, statement reconciliation, PCI or data-security duties, public-records retention, and audit evidence. For vendor payments, the rail fee is often smaller than procurement, invoice approval, check handling, vendor enrollment, and payment-timing risk.

The strongest case for modernization is not speculative crypto. It is workflow compression: fewer manual exceptions, fewer paper checks, cleaner bill-to-payment matching, real-time status, automatic general-ledger posting, and audit-ready records. Crypto can participate in that only if it behaves less like an asset and more like infrastructure: dollar-denominated, legally authorized, automatically converted, bank-integrated, privacy-aware, and designed around government accounting controls.

The strongest case against crypto is that existing rails already solve part of the problem. ACH is cheap, FedNow publishes a **$0.045** customer credit transfer fee, and RTP already offers 24x7 final settlement through financial institutions. [synthesis_where_crypto_can_cut_costs_and_where_it_cannot[0]] [54], [synthesis_where_crypto_can_cut_costs_and_where_it_cannot[1]] [52] Therefore, the question for a civic crypto product is not "Can it settle?" It is "Can it lower the total cost per reconciled, audit-ready, legally valid municipal transaction?"

The answer from the evidence is conditional. A crypto-enabled civic workflow could materially reduce cost, delay, and reporting burden **only** if it bundles payment, identity, invoice or bill metadata, approval status, automated reconciliation, audit exports, and dollar settlement into one low-fixed-cost service. A crypto payment rail alone would not remove convenience fees, procurement rules, bank off-ramps, returned-payment handling, chargeback or consumer-protection questions, audit duties, public-records duties, or small-town staffing constraints.

## Practical Cost Model For Evaluating A Pilot

A city or county should evaluate each payment type using an all-in cost per **reconciled transaction**, not posted fee per payment:

| Cost layer | Resident receivable example | Vendor payable example | Measurement method |
|---|---|---|---|
| Visible fee | Card fee, e-check fee, portal fee, returned-payment fee. | Wire fee, card fee, check cost. | Fee schedule and payment processor invoice. |
| Rail and bank cost | ACH item, same-day surcharge, deposits, lockbox, reporting. | ACH, wire, Positive Pay, check issue, stop payment. | Bank analysis statement and treasury fee schedule. |
| Portal or software cost | Bill lookup, account posting, payment confirmation, integration. | Vendor portal, AP automation, payment-file generation. | Contract, invoice, and implementation budget. |
| Labor cost | Cashiering, exceptions, refunds, taxpayer calls, reconciliation. | Invoice capture, approvals, coding, vendor setup, payment runs. | Time study by transaction type. |
| Delay and exception cost | Holds, NSF returns, rejected e-checks, refund rework. | Late-payment interest, vendor inquiries, emergency checks. | Aging reports, exception logs, prompt-payment metrics. |
| Audit and reporting cost | Monthly reconciliation, records retention, public reports. | Procurement file, contract file, invoice audit trail. | Audit adjustments, findings, close calendar, staff hours. |
| Risk premium | Equity impact of fees; payer abandonment; collection delay. | Fewer bids, higher bids, small vendor financing burden. | Local vendor survey and bid-count analysis. |

For a crypto-enabled pilot, the pass/fail metric should be: **Does the workflow reduce total cost per reconciled transaction after including off-ramp fees, compliance, implementation, staff time, exceptions, refunds, and audit exports?** If the answer is only that residents can pay with a token, the evidence suggests limited benefit. If the answer is fewer unreconciled deposits, faster vendor settlement, lower fixed cost for small towns, and clean audit trails, the opportunity is real.

## References

1. *Federal Reserve Payments Study (FRPS)*. https://www.federalreserve.gov/paymentsystems/fr-payments-study.htm
2. *Payments Made by Governments - GFOA*. https://www.gfoa.org/materials/payments-made-by-governments
3. *Comptroller - Town of Clarkstown*. http://clarkstown.gov/comptroller
4. *Modernizing Municipal ERP Vendor Payment Workflow Without ...*. https://www.lunchpayments.com/resources/modernizing-municipal-erp-payment-workflow
5. *Understanding the Basics of Business to Business ACH*. https://tipalti.com/resources/learn/business-to-business-ach
6. *Best Local Government Accounting Software (2026)*. https://zipdo.co/best/local-government-accounting-software/
7. *VADAR Systems Reviews and Pricing - Capterra*. http://capterra.com/p/152515/VADAR-Systems
8. *Local Government Audit Report Search*. http://secure.sos.state.or.us/muni/public.do
9. *Municipal ERP Cost Management Strategies - LinkedIn*. https://www.linkedin.com/pulse/municipal-erp-cost-management-strategies-halford-mba-cc-krisp-fse8c
10. *Automated Payment Reconciliation for Municipal Finance*. https://eunasolutions.com/resources/how-automated-payment-reconciliation-streamlines-municipal-finance
11. *Online Payment Service by VPS*. https://paylocalgov.com/Payment/SelectEntity/913
12. *Tax Office - Town of West Hartford*. https://www.westhartfordct.gov/town-departments/tax-office
13. *PayGov - LinkedIn*. http://linkedin.com/company/paygov
14. *How do you pay HOA fees?*. https://www.fsresidential.com/corporate/news-and-articles/articles/faqs-for-making-an-hoa-payment-online
15. *Tax Collector / Finance*. https://hillsboroughnj.gov/departments/tax
16. *Cumberland County, NC Government*. https://www.facebook.com/CCNCGov/posts/cumberland-county-property-owners-did-you-know-you-can-pay-your-taxes-securely-a/1160212206130181
17. *GovPayNet - The Simple Way To Pay*. http://govpaynow.com/gps/user/cyg/plc/a004l0
18. *Tax Collector - The Official Website of The Township of Belleville, NJ*. http://bellevillenj.org/Departments/tax-collector
19. *Pay Online - Constitutional Tax Collector*. https://www.pbctax.gov/pay-online
20. *Convenience Fee (Credit/Debit/e-Check) • Havelock, NC*. http://havelocknc.us/m/newsflash/Home/Detail/226
21. [[PDF] Agenda - Beverly, MA](http://beverlyma.gov/AgendaCenter/ViewFile/Agenda/_07242025-2391)
22. *City finances clarified and approved*. http://eureka.news/city-finances-clarified-and-approved
23. *Press Release • Ohio Auditor of State*. http://ohioauditor.gov/news/pressreleases/Details/3296
24. *Segregation of Duties for Cash Receipts in Nonprofits*. https://www.hawkinsash.cpa/segregation-of-duties-for-cash-receipts-in-nonprofits
25. *Bank Reconciliations | Office of the Washington State Auditor*. https://sao.wa.gov/bars-annual-filing/bars-cash-manual/accounting/accounting-principles-and-internal-control/bank-reconciliations
26. *Pay My Bill | South Carolina - Dominion Energy*. http://dominionenergy.com/en/South-Carolina/Paying-My-Bill/Pay-My-Bill
27. *Online Payments*. http://townofmilony.gov/online-payments
28. *InvoiceCloud | Digital Billing & Payment Platform for Businesses*. https://invoicecloud.net/
29. [[PDF] Staff Report - Town of Round Hill](https://roundhillva.gov/sites/g/files/vyhlif4951/f/uploads/vi-3_approve_invoice_cloud_contract.pdf)
30. *Bidder Beware: Construction Contracting By and With Local ...*. https://www.floridabar.org/the-florida-bar-journal/bidder-beware-construction-contracting-by-and-with-local-governments-in-florida
31. *Procurement*. http://ci.staunton.va.us/departments/finance/procurement
32. *The True Cost of Slow Vendor Payments for Cities | Lunch*. https://www.lunchpayments.com/resources/true-cost-slow-vendor-payments-cities
33. *Accounts Payable: Mastering Procurement & Payments - GrowCFO*. https://www.growcfo.net/2025/04/30/accounts-payable-mastering-procurement-payments
34. *Cost Comparison: Issuing Payments via Check vs. ACH*. https://www.iofm.com/ask-the-expert/cost-comparison-issuing-payments-via-check-vs-ach
35. *How To Calculate Cost Per Invoice in Accounts Payable*. https://www.highradius.com/resources/Blog/ap-cost-per-invoice
36. *Overcoming Check Challenges for AP and AR*. http://financialprofessionals.org/training-resources/resources/articles/Details/overcoming-check-challenges-for-ap-and-ar
37. *Treasury Management Payables*. http://bankriverside.com/commercial/resources/treasury-management/payables.html
38. *Range Bank CRA Public File*. http://rangebank.com/assets/files/ghxtpZdE/r/CRA%2BPublic%2BFile%2B2025%2B%28updated%2B9.15.2025%29.pdf
39. *FedACH Services 2026 Fee Schedule*. http://frbservices.org/resources/fees/ach-2026
40. *Schedule of Fees for Business Accounts*. https://www.firstambank.com/FirstAmericanBank/media/PDFs/ScheduleOfFees-Business.pdf
41. *REQUEST FOR PROPOSALS - hesaa.org*. https://www.hesaa.org/Documents/RFPs/RFPDepositoryBankingServices.pdf
42. *Service Fees | Federal Reserve Financial Services*. https://www.frbservices.org/resources/fees/
43. *Purchasing | Coon Rapids, MN - Official Website*. http://coonrapidsmn.gov/872/Purchasing
44. *Bids & Government Contracts (RFPs)*. http://demandstar.com/browse-bids
45. *32.904 Determining payment due dates. | Acquisition.GOV*. https://www.acquisition.gov/far/32.904
46. *Vendor Payment Explorer*. http://sigmai.michigan.gov/EI360TransparencyApp/jsp/vendorPaymentExplorer
47. *Vendor, Contract and Payment Search - Contract Details*. https://webapps1.chicago.gov/vcsearch/city/contracts/S026747
48. *https://ohioauditor.gov/trainings/docs/2026/LGOC/Common_Audit_Comments.pdf*. https://ohioauditor.gov/trainings/docs/2026/LGOC/Common_Audit_Comments.pdf
49. *City of Stotts City - auditor.mo.gov*. https://auditor.mo.gov/AuditReport/ViewReport?report=2026042
50. *WA auditors flag $1.2B in federal aid over incomplete records*. http://cascadepbs.org/investigations/2023/07/wa-auditors-flag-12b-federal-aid-over-incomplete-records
51. *26-036-Contacts - Missouri State Auditor's Office - MO.gov*. http://auditor.mo.gov/SunshineLaw/ViewPostingFile/311
52. *Real Time Payments | The Clearing House*. https://www.theclearinghouse.org/payment-systems/rtp
53. *FedNow - Wikipedia*. https://en.wikipedia.org/wiki/FedNow
54. *FedNow Service 2026 Fee Schedule*. https://www.frbservices.org/resources/fees/fednow-2026
55. *Real-Time Payments API Guide March 2026*. http://routable.com/resources/real-time-payments-api-guide
56. *AppBrilliance, Inc.*. http://linkedin.com/company/appbrilliance
57. *Colorado accepts cryptocurrency for tax payments. ...*. http://avalara.com/blog/en/north-america/2022/03/colorado-to-accept-cryptocurrency-for-tax-payments.html
58. *Justice Department Secures $30M Settlement with PayPal Over ...*. https://www.justice.gov/opa/pr/justice-department-secures-30m-settlement-paypal-over-unlawful-dei-investment-program
59. *Cryptocurrency | Department of Revenue - Taxation - Colorado tax*. https://tax.colorado.gov/cryptocurrency
60. *Best Practices and Advisories - GFOA*. https://www.gfoa.org/best-practices-advisories
61. *Do I have to pay Taxes on my crypto? | PayPal US*. https://www.paypal.com/us/cshelp/article/do-i-have-to-pay-taxes-on-my-crypto-help680
62. *Treasury Management Services*. http://cnbtc.bank/business/treasury-management-services
63. *ACH Origination for Businesses and Non-Profits Forward Bank https://www.forward.bank › Business › Cash Management*. https://www.forward.bank/business/cash-management/ach-origination
64. *Federal Reserve Board - Policies: Fee Schedules for Federal ...*. https://www.federalreserve.gov/paymentsystems/pfs_feeschedules.htm
65. *Treasury Management*. https://grandriverbank.com/business/treasury-management
66. *Amy C. - Upgrade, Inc. - LinkedIn*. http://linkedin.com/in/amychai
67. *Strengthening Internal Controls for Small Businesses - DHJJ*. http://dhjj.com/strengthening-internal-controls-for-small-businesses
68. *Common Audit Finding | Lack of Segregation of Duties*. https://www.mtas.tennessee.edu/system/files/mrln/mknowledge/main/Audit%20Findings_Part%201_Segregation%20of%20duties.pdf
69. *Missouri Auditor issues findings in Stotts City audit - Yahoo*. http://yahoo.com/news/articles/missouri-auditor-issues-findings-stotts-175631876.html
70. [[PDF] Stotts City, City of - Missouri State Auditor's Office](https://auditor.mo.gov/press/2000-07.pdf)
71. *Bank Reconciliations*. https://msutexas.edu/busoffice/financial-services/bank-reconciliations.php
72. *GFOA Home*. http://gfoa.org/
73. *Abstain from Using and Investing in Cryptocurrency for ...*. https://www.gfoa.org/materials/cryptocurrency-advisory
74. *Government Finance Officers Association (GFOA)*. http://linkedin.com/company/gfoa
75. *http://gfoa.org/future-gfoa-conferences*. http://gfoa.org/future-gfoa-conferences
76. *Automated Clearing House (ACH) Credits*. https://www.vnb.com/products/treasury-management/payables-solutions/automated-clearing-house-ach-credits
77. *REQUEST FOR PROPOSAL FOR DEPOSITORY SERVICES*. https://files-backend.assets.thrillshare.com/documents/asset/uploaded_file/1905/Mcpasd/f865d9a4-f79b-4ec7-a84e-389028786cb1/MCPASD_Depository_Banking_Services_2024.pdf?disposition=inline
78. *Cash Management Services*. http://bankofannarbor.com/business/cash-management
79. *Cash Management - Hebron Savings Bank*. http://hebronsavingsbank.com/business/cash-management
80. *Treasury Services | The Bank of Tampa*. https://www.bankoftampa.com/commercial/treasury-services/
81. [[PDF] DEPARTMENT OF PUBLIC SAFETY PROCUREMENT AND ...](https://www.dps.texas.gov/iod/doingbusiness/docs/procurement_and_contract_guide.pdf)
82. *Home | 4CEE | Office of the CFO Solutions*. http://4cee.com/
83. *Purchase Order Flow*. https://www.avidxchange.com/glossary/purchase-order-process
84. *SURVEY OF STATE PRACTICES FACT SHEET - NASPO*. https://cdn.naspo.org/RI/SurveyofStatePracticesFactSheet_AdministrativeFees.pdf
85. *Periscope Holdings 2026 Company Profile*. http://pitchbook.com/profiles/company/100343-35
86. *Expanding Same Day ACH | Nacha*. http://nacha.org/rules/expanding-same-day-ach
87. *Electronic Payment Services | In Plain English | St. Louis Fed*. http://stlouisfed.org/in-plain-english/electronic-forms-of-payment
88. *FedACH Processing Schedule | Federal Reserve Financial Services*. https://www.frbservices.org/resources/resource-centers/same-day-ach/fedach-processing-schedule.html
89. *FastACH Payment Option*. http://support.ottimate.com/support/solutions/articles/14000150419-fastach-payment-option
90. *FedACH Wikipedia https://en.wikipedia.org › wiki › FedACH*. https://en.wikipedia.org/wiki/FedACH
91. *Supervisory Guidance on Multiple Re-Presentment NSF Fees - FDIC*. https://www.fdic.gov/news/financial-institution-letters/2022/fil22040a.pdf
92. *Payment & Fees Hillsborough County Tax Collector (.gov) https://www.hillstaxfl.gov › Title & Tag*. https://www.hillstaxfl.gov/title-tag/payment-fees
93. *Nacha News*. http://nacha.org/news
94. *ACH Payments Fact Sheet | Nacha*. https://www.nacha.org/content/ach-payments-fact-sheet
95. *State Maximum NSF Fees - Support Portal*. https://support.forte.net/support/solutions/articles/11000123752-state-maximum-nsf-fees
96. *Town of Ballston, NY - Municipal Online Payments*. http://municipalonlinepayments.com/ballstonny
97. *Visa’s Government and Higher Education Payment Program ...*. https://smartpay.gsa.gov/guidance-and-audits/smart-bulletins/018/
98. *Government Payments: Have Fees Assessed or Absorb the Costs*. https://intellipay.com/wp-content/uploads/2025/05/Government-Payments-fee-or-no-fee-d5-4-14-25.pdf
99. *Government Payment Processing Guide (2026)*. https://intellipay.com/government-payment-processing-guide
100. *Online Giving Prices & Plans*. http://vancopayments.com/egiving/pricing
101. *Payments | Internal Revenue Service IRS (.gov) https://www.irs.gov › payments*. https://www.irs.gov/payments
102. *Sheryl Allred - Rockledge Credit Solutions*. http://linkedin.com/in/sheryl-allred-90a94416
103. *Returned Checks – Santa Rosa County Tax Collector*. https://srctc.com/returned-checks/
104. *ACH Returns and ACH Debit Return Charges Explained | Stripe*. https://stripe.com/resources/more/ach-returns-101-what-they-are-and-how-to-manage-them
105. *Authorization for Electronic Transfers*. http://datcu.org/DATCU/media/PDFs/AUTH-ELECTRONIC-TRANSFERS.pdf
106. *VADAR Systems - Municipal Financial Software*. http://vadarsystems.com/
107. *Odoo ERP Implementation Cost Guide 2025*. https://ahex.co/odoo-erp-implementation-cost
108. *Local Government Software | OpenGov*. https://opengov.com/
109. *Search Federal, State, Local Government RFPs, Contracts & ...*. http://findrfp.com/service/search.aspx?PageSize=20&SortOrder=0&pageNo=1&s=SOFTWARE&t=ME
