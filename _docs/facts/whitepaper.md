---
description: "Raw CivicChain white paper v9 source. Source-only product-development reference, not the current public claim boundary."
depends-on: []
---

Civic-Chain
Decentralized Municipal Services Procurement,
Citizen Voting, Contract Management,
and RLUSD-Native Payment Platform


WHITE PAPER  v9.0
March 2026
CONFIDENTIAL, FOR PRODUCT DEVELOPMENT USE
Built on Patented Blockchain Payment Architecture
Powered by Ripple Payments and RLUSD Stablecoin Infrastructure

Executive Summary
American towns have a procurement problem nobody talks about. They contract for snow plowing, road maintenance, fire protection, and public safety through processes that are paper-heavy, financially opaque, and nearly impossible to audit after the fact. Vendors submit proposals in whatever format they prefer. Citizen input ranges from nonexistent to performative. Payments reach contractors slowly, manually, and with no mechanism for anyone outside the finance department to verify where the money actually went. Civic-Chain exists to fix that.
Five modules, one integrated platform. Civic-Chain combines structured digital proposal submission, geolocation-verified citizen voting, smart contract management, RLUSD-funded phone tap payments, and a blockchain-native payment rail built for full public transparency. It runs natively on the XRP Ledger via Ripple Payments and RLUSD, Ripple's dollar-pegged stablecoin, which eliminates traditional banking intermediaries from the core payment flow entirely.
The phone tap system is what makes this product genuinely different. When a municipality awards a plowing contract, the vendor's drivers receive virtual cards provisioned directly to their Apple Pay or Google Pay wallets, funded by RLUSD drawn from the contract pool and locked to fuel and automotive merchant categories by MCC code. When a driver taps their phone at a pump at 3am, the RLUSD debit is authorized in real time, written immutably to the XRPL, and visible to municipal administrators and citizens within seconds. No invoice. No 30-day payment cycle. No mystery about where the money went.
Citizen participation is not just a feature; it's the accountability mechanism. A layered geolocation verification system governs eligibility: device GPS as the primary signal, IP address as a corroborating audit trail, and municipal address registration verified against official records at enrollment. Only eligible residents can vote. The confidence level of every ballot is logged for any result that gets challenged.
The payment infrastructure draws from a patented architecture originally developed for state government excise tax collection on the XRPL. That patent covers the pre-blockchain compliance layer, cryptographic cross-system audit linking, reserve fund guarantee mechanics, and tri-tier asynchronous settlement. All of it remains applicable here as the compliance and accountability layer running on top of the Ripple Payments rails.

1. Platform Overview: Five Integrated Modules

#
Module
Function
1
Proposal Engine
Structured digital proposal submission via email, routed by Contract Reference Number (CRN).
2
Geolocation Voting
Layered GPS and IP verification for citizen eligibility; mobile app voting with confidence scoring per ballot.
3
Contract Management
Smart Agreement Records (SARs) anchored on XRPL; public contract ledger; budget allocation across card pool, residual payment, and reserve hold.
4
RLUSD Phone Tap Payments
Virtual cards provisioned to Apple Pay and Google Pay, funded by RLUSD from the contract pool, MCC-locked per contract type, authorized in real time via webhook.
5
Payment Rail
End-to-end RLUSD flow: municipal USD converts to RLUSD on receipt, held in named virtual accounts via Ripple Payments, disbursed to vendors in minutes with no traditional banking intermediary in the core flow.


Five distinct groups interact with the platform. Municipality and town government officials define needs and authorize payments. Service vendors and contractors submit proposals and receive virtual cards. Individual workers and drivers tap their phones at point of sale. Citizens and residents vote on vendor selection and track contract spend on the public portal. Civic-Chain Platform Administrators onboard municipalities and serve as payment mediators during early adoption. Every module is built around these actors and their specific workflows.


2. Module 1: Structured Proposal Submission
2.1 Service Categories
The platform supports configurable service categories. Initial launch categories include:
Snow and Ice Removal (Plowing): Seasonal contracts by route or zone.
Road Maintenance: Paving, patching, crack-sealing, line painting.
Fire Protection Services: Volunteer department support, equipment maintenance.
Public Safety / Security: Patrol coverage, dispatch services, emergency response.
General Public Works: Tree removal, drainage, facility maintenance (extensible).

2.2 Proposal Data Model
Every solicitation generates a unique Contract Reference Number, for example, CRN-2026-PLW-0042. Vendors email proposals to proposals@civicchain.io with the CRN in the subject line. The full pipeline workflow including comparison view, scoring, and completeness flagging is specified in Section 7.1. Each proposal captures a standardized set of fields: vendor name, service scope, coverage zone, pricing structure, proposed amount, estimated card spend, performance bond status, insurance certificate, and prior municipal references.
Field
Description
Vendor Name
Legal business name of submitting entity
CRN
Contract Reference Number linking to solicitation
Service Scope
Specific services offered (structured checklist)
Coverage Zone
Geographic area vendor can service (polygon or named zone)
Pricing Structure
Per-event, per-mile, lump sum, or time-and-materials
Proposed Amount
Total contract value in USD
Expense Categories
MCC categories vendor will need phone tap access for (fuel, hardware, etc.)
Estimated Card Spend
Vendor projection of tap-to-pay expenses vs. labor and service fees
Performance Bond
Yes/No plus amount if applicable
Insurance Certificate
Attached document or link
References
Prior municipal contracts listed



3. Module 2: Geolocation-Verified Citizen Voting
3.1 The Case for Citizen Voting
Including residents in vendor selection is not a civic gesture. It's a quality signal. Citizens have direct experience with service delivery. They know which plowing contractor left their road impassable last winter. Their input produces selections that are harder to contest and more likely to receive community support. Making this practical requires solving two problems at once: verifying that only eligible residents participate, and keeping the process simple enough for any smartphone user.

3.2 Why Neither GPS Nor IP Alone Is Sufficient
No single location signal is tamper-proof. Device GPS reaches accuracies of a few meters and requires physical hardware spoofing to fake, making it the strongest available signal. It can also be blocked indoors or in rural areas with poor satellite visibility, which is common in the small-town markets Civic-Chain targets. IP geolocation is easy to implement and works everywhere, yet it's trivially defeated by any VPN. A voter outside the municipality can appear to be inside it in under 60 seconds with a consumer app. IP address alone cannot serve as a voting gate.
The defensible approach combines multiple signals into a single confidence score, with GPS as the primary gate and IP as a logged audit signal. No single factor controls the outcome. Multiple factors together define it.

3.3 The Three-Layer Verification Model

Layer
Signal
Method
Role in System
1 (Primary Gate)
Device GPS
OS location API captures live coordinates at vote time. Compared against municipality boundary polygon. Must be within boundary OR within acceptable radius of registered address.
Hard gate. Vote rejected if GPS places user outside boundary. No override.
2 (Corroboration)
IP Address
IP resolved to geographic region via MaxMind or similar database. Compared against municipality region.
Audit signal only. Logged per ballot. Mismatch flagged for review, not used to block vote. Protects legitimate VPN users.
3 (Enrollment Gate)
Registered Address
At account creation, user submits municipal address. Verified against official municipal voter roll, utility billing records, or state driver license address. Geocoded and stored as coordinate pair.
Upstream identity gate. Strongest defense against fake account registration. Verified once at enrollment, not at vote time.


Why Registration Verification Is the Strongest Defense
Real-time location signals can be spoofed by a determined bad actor with a rooted device and mock location app. The harder problem is fake account registration: someone registers with a fraudulent municipal address and then spoofs GPS to match. The enrollment address verification against official municipal or state records is what closes this gap. A person who cannot prove they have an address in the municipality cannot create a valid voter account, regardless of what location signals they can generate at vote time.


3.4 Confidence Scoring Per Ballot
Every ballot gets a confidence score at the moment of submission, determined by the combination of signals present. That score is stored with the ballot record and available to administrators if a result is ever challenged. High confidence means GPS confirmed, IP consistent, enrollment verified. Lower tiers are logged and flagged rather than automatically rejected, which protects legitimate voters using VPNs or casting ballots from unusual locations.

Confidence Level
Signals Present
Administrator Action
High
GPS confirmed in boundary, IP consistent with municipality, address enrollment verified
No action required
Medium
GPS confirmed in boundary, IP mismatch (VPN suspected), address enrollment verified
Logged for audit; no action required unless result is challenged
Low
GPS confirmed in boundary, IP mismatch, address enrollment not fully verified
Flagged for review; administrator may quarantine ballot pending verification
Rejected
GPS places user outside municipality boundary
Ballot not accepted; user notified with reason


3.5 Privacy Architecture
Location data is handled under strict privacy constraints throughout. The raw GPS coordinate is used exclusively for boundary comparison and discarded immediately after. The stored record contains only a boolean result, the municipality zone identifier, and the confidence tier. No coordinate data, device identifier, or IP address is ever written to the public XRPL ledger. Votes themselves are anonymous by default; only the confidence tier is associated with each ballot in administrative records.

3.6 Voting Configuration
Parameter
Options
Vote Type
Citizen advisory, citizen binding, board-only, hybrid weighted
Minimum Confidence Required
Configurable: High only, Medium and above, all GPS-confirmed
Voting Window
Configurable start and end datetime
Scoring Method
Simple majority, ranked choice, weighted score
Quorum Requirement
Minimum voter count for result to be valid
Result Display
Live (visible during voting) or revealed at close
GPS-Only Mode
Enforced for high-stakes votes; no WiFi/cell fallback accepted


3.7 What Citizens See After Voting
After the vote closes, citizens don't have to wonder what happened to the contract. They track the winning vendor's spend on the public portal in real time: every RLUSD disbursement, every phone tap by category and amount, and the full contract timeline. The full citizen dashboard specification appears in Sections 7.2 and 7.3.

3.8 Geolocation Implementation Specification
This section specifies the geolocation system at full engineering depth. It serves as the primary technical reference for mobile and backend developers building the voting module.

3.8.1 How Device Location Actually Works
A smartphone doesn't rely on GPS alone. The device OS blends three positioning systems simultaneously and presents a single unified location result to any requesting application. Understanding all three is essential for building the fallback and confidence logic correctly. GPS provides accuracy to 3-5 meters under open sky but degrades significantly indoors. WiFi positioning reaches 15-40 meters and works well indoors using proprietary databases of mapped access points. Cell tower triangulation offers the widest coverage at the cost of accuracy, reaching only 100-300 meters in rural areas.

Positioning System
Accuracy
Works Indoors?
Notes
GPS Satellite
3 to 5 meters under open sky
No, degrades significantly
Cold fix takes 30 to 60 seconds. Warm fix (recent use) is near-instant. Primary source when outdoors.
WiFi Positioning
15 to 40 meters
Yes, works well indoors
Uses Apple and Google proprietary databases of mapped WiFi access points. WiFi does not need to be connected, only visible.
Cell Tower Triangulation
100 to 300 meters in rural areas
Yes, works anywhere with signal
Least accurate but most universal. Last-resort fallback in areas with no GPS and no WiFi access points.


The OS blends all three signals automatically via a Kalman filter and returns a single location object to the application. The app never sees which source contributed or in what proportion. It receives a coordinate pair and an accuracy radius representing the OS's confidence in that coordinate. A 5-meter accuracy radius indicates high certainty. A 250-meter accuracy radius signals the OS is relying primarily on cell towers and the position should be treated with appropriate skepticism.

3.8.2 Platform-Specific API Calls
The voting screen triggers a one-shot location request on both platforms. The app does not track the user continuously. Location permission is requested once at install or on first use of the voting feature. Both iOS and Android expose the same three values to the Civic-Chain backend: latitude, longitude, and accuracy in meters. A fix timestamp is also transmitted. The backend rejects any fix with a timestamp more than 60 seconds old, which closes the replay attack vector.

iOS Implementation (Core Location)
Permission request: call requestWhenInUseAuthorization() on CLLocationManager. This prompts the system permission dialog if not already granted. If the user denies, present an in-app message explaining that location is required to verify voting eligibility and direct them to Settings. Location request: call requestLocation() on CLLocationManager with desiredAccuracy set to kCLLocationAccuracyBest. This triggers a one-shot fix using the best available combination of GPS, WiFi, and cell. The delegate callback locationManager(_:didUpdateLocations:) returns a CLLocation object. Extract: location.coordinate.latitude (Double), location.coordinate.longitude (Double), location.horizontalAccuracy (CLLocationAccuracy in meters). If horizontalAccuracy is negative, the fix is invalid and the request should be retried once before presenting an error to the user.


Android Implementation (Fused Location Provider)
Permission request: request ACCESS_FINE_LOCATION at runtime using ActivityCompat.requestPermissions(). ACCESS_FINE_LOCATION enables GPS and WiFi positioning. ACCESS_COARSE_LOCATION (cell only) is insufficient for voting eligibility and must not be used as a fallback. Location request: call fusedLocationClient.getCurrentLocation() with Priority.PRIORITY_HIGH_ACCURACY and a CancellationTokenSource. This triggers the OS to acquire the best available fix. The Task callback returns a Location object. Extract: location.latitude (Double), location.longitude (Double), location.accuracy (Float in meters). If the returned Location is null, the fix failed. Retry once with a 5-second timeout before presenting an error.


Both platforms return identical values to the Civic-Chain backend: latitude, longitude, and accuracy in meters, along with the fix timestamp. The backend rejects any fix older than 60 seconds to prevent a user from obtaining a valid fix while inside the boundary, traveling outside, and submitting the stale result.

3.8.3 Backend Boundary Check
The Civic-Chain API runs five sequential checks on every incoming location fix. All checks must pass for the GPS gate to clear. Timestamp freshness is verified first. Accuracy threshold is assessed second. Point-in-polygon is checked third. Boundary buffer ambiguity is evaluated fourth. Enrollment proximity feeds the confidence score fifth. Each check either gates the vote, assigns a confidence tier, or feeds the administrative audit record.

Timestamp freshness check: reject if fix timestamp is more than 60 seconds before the API request timestamp. This prevents a user from obtaining a valid fix while inside the boundary, traveling outside, and then submitting the old fix.
Accuracy threshold check: if the accuracy radius exceeds a configurable maximum (recommended default: 500 meters), the fix is flagged as Low confidence regardless of whether the coordinate is inside the boundary. The fix is not rejected outright, but the low accuracy is recorded in the ballot confidence record and the ballot is tagged Low confidence.
Point-in-polygon check: determine whether the reported coordinate falls within the municipality's GeoJSON boundary polygon. The boundary is stored as a GeoJSON MultiPolygon and the check uses the standard ray-casting algorithm. If the coordinate is inside the polygon, proceed. If outside, proceed to the boundary buffer check.
Boundary buffer check: if the coordinate falls outside the polygon but within a configurable buffer distance (recommended default: 100 meters), and the accuracy radius overlaps the polygon boundary, the system treats the fix as ambiguous rather than a hard rejection. Ambiguous fixes are flagged for administrator review and assigned Low confidence. The municipality configures whether ambiguous fixes are accepted or rejected at setup.
Enrollment proximity check: compare the live coordinate against the stored enrollment address coordinate. Calculate the distance in meters between the two points using the Haversine formula. The result feeds the confidence score: under 500 meters is High proximity, 500 meters to 5 kilometers is Medium proximity, over 5 kilometers is Low proximity. This check does not gate the vote. It only affects the confidence score.

Haversine Formula Note
The Haversine formula calculates great-circle distance between two coordinate pairs accounting for the curvature of the Earth. For distances under 10 kilometers, which covers all enrollment proximity checks, a simple Euclidean approximation using the equirectangular projection is accurate to within 0.1% and is computationally cheaper. Either implementation is acceptable. Use the PostGIS ST_Distance function if PostgreSQL with PostGIS is available, as it handles both the distance calculation and the point-in-polygon check natively and is well-tested against edge cases at boundary lines.


3.8.4 Confidence Score Calculation
The final confidence tier for a ballot emerges from the intersection of three factors: accuracy radius, boundary check result, and enrollment proximity. An accuracy radius under 100 meters with GPS confirmed inside the polygon and enrollment proximity under 500 meters earns a High tier. Degraded accuracy or enrollment distance moves the ballot to Medium. Fixes over 500 meters in accuracy are flagged Low regardless of boundary position. Any fix placing the user outside the polygon is rejected outright.

Accuracy Radius
Boundary Result
Enrollment Proximity
Assigned Confidence Tier
Under 100m
Inside polygon
Under 500m
High
Under 100m
Inside polygon
500m to 5km
Medium
100m to 500m
Inside polygon
Any
Medium
Over 500m
Inside polygon
Any
Low
Any
Ambiguous (buffer zone)
Any
Low, flagged for review
Any
Outside polygon
Any
Rejected, vote not accepted


3.8.5 What Is and Is Not Stored
What the geolocation system stores is as important as what it checks. This is a critical privacy and legal compliance specification. The table below defines precisely what gets written to each storage layer, and what gets discarded. Nothing that could identify a specific voter's location is written to the public XRPL ledger.

Data Element
Storage Layer
Stored or Discarded
Raw GPS coordinate (lat/lon)
Application database
Discarded after boundary check completes. Never written to database or XRPL.
Accuracy radius
Application database
Discarded after confidence score is calculated.
IP address
Application database
Stored in encrypted audit log for 90 days, then purged. Never written to XRPL.
Fix timestamp
Application database
Stored with ballot record for replay prevention audit.
Boundary check result (boolean)
Application database and XRPL
Stored permanently: true (inside) or false (outside, rejected).
Confidence tier
Application database
Stored permanently with ballot record: High, Medium, Low, or Rejected.
Enrollment proximity tier
Application database
Stored permanently as High, Medium, or Low. Not the distance in meters.
Municipality zone identifier
Application database and XRPL
Stored permanently. Identifies which boundary polygon version was used.
Ballot content (vote choice)
Application database and XRPL
Stored permanently, anonymized. No link between ballot and voter identity on XRPL.


3.8.6 Spoofing Attack Surface and Mitigations
Spoofing attempts are predictable, and the mitigations are designed with that in mind. The table below catalogs known attack vectors, the skill level required to execute them, and the specific countermeasure that addresses each. The residual risk after mitigation is low across every scenario except coordinated bot voting, which requires monitoring rather than a technical block.

Attack Vector
Attacker Skill Required
Mitigation
Residual Risk
VPN to spoof IP address
Low, consumer tools available
IP is audit signal only, not a gate. VPN mismatch logged but does not block vote.
None. By design.
Mock location app on rooted/jailbroken device
High, requires device modification
Enrollment address verification against official records. Mock GPS to match registered address still requires valid enrollment.
Low. Attacker needs both a rooted device and a fraudulent enrollment record.
Android developer mode mock location
Medium, requires enabling developer options
Mock location flag detectable on Android via Location.isFromMockProvider(). Civic-Chain should check this flag and assign Low confidence automatically if true.
Low after mock provider detection is implemented.
Fake enrollment address registration
Medium, requires falsified documents or API manipulation
Address verified against municipal voter roll, utility billing database, or state DMV records at enrollment. Civic-Chain does not self-validate addresses.
Low, dependent on quality of official data source.
GPS replay attack (submit old valid fix)
Low if fix is intercepted
Fix timestamp validated against API request time. Fixes older than 60 seconds rejected.
Negligible.
Coordinated bot voting
High, requires many valid enrolled accounts
Each registered voter account is one vote. Enrollment verification creates friction that limits account farming at scale.
Low to medium. Monitor for unusual enrollment spikes before high-stakes votes.


Android Mock Provider Detection
Android exposes Location.isFromMockProvider() on API level 18 and below, and Location.isMock() on API level 31 and above. Both return true if the location was generated by a mock location provider rather than real hardware. Civic-Chain must check whichever is appropriate for the target API level and transmit the result to the backend as a fourth field alongside the coordinate pair and accuracy radius. The backend should assign Low confidence automatically to any fix where isMock is true, regardless of whether the coordinate falls inside the boundary. iOS does not expose an equivalent flag; the mock location risk on iOS is limited to jailbroken devices where the OS has been modified to suppress this detection.



4. Module 3: Smart Contract Management
4.1 Service Agreement Record (SAR)
When a solicitation closes and a winner emerges, Civic-Chain generates a Service Agreement Record: the canonical, immutable record of the contract, anchored on the XRPL blockchain. The SAR captures everything. Winning vendor identity and contact information. Service scope, coverage zone, and performance standards. Contract dates and payment schedule. Total contract value in USD, converted to RLUSD at funding time. Budget allocation across card pool, residual payment reserve, and hold-back reserve. Phone tap program configuration with MCC locks and per-card limits. The geolocation voting record, including final tally and confidence score distribution. And the XRPL transaction hash as cryptographic proof of award.
Winning vendor identity and contact information
Service scope, coverage zone, and performance standards
Contract start and end dates and payment schedule
Total contract value in USD, converted to RLUSD at funding time
Budget allocation: RLUSD card pool, residual payment reserve, hold-back reserve
Phone tap program configuration: virtual card tiers, MCC locks, per-card limits, refill policy
Geolocation voting record: final tally, confidence score distribution, boundary polygon used
XRPL transaction hash as immutable proof of award
SHA-256 cryptographic hash of vendor proposal document

4.2 RLUSD Budget Allocation
Budget Component
Description
RLUSD Card Pool
Funds loaded into virtual card wallets for direct expenses: fuel, materials, parts. Debited in real time at point of tap.
Residual Payment Reserve
Labor, overhead, and profit component. Disbursed to vendor via Ripple Payments in RLUSD converted to USD at settlement.
Hold-Back Reserve
Configurable buffer (e.g., 5%) held until final work verification sign-off. Released as final RLUSD disbursement.


Example: Seasonal Plowing Contract, $48,000 Total
RLUSD Card Pool: $18,000 equivalent in RLUSD (fuel and equipment maintenance, MCC-locked). Residual Payment: $27,600 equivalent in RLUSD (bi-weekly labor disbursements over 6-month season, converted to USD at settlement in minutes). Hold-Back Reserve: $2,400 equivalent in RLUSD (released at season-end sign-off). All three components and their real-time status are visible on the public citizen portal via the XRPL ledger.



5. Module 4: RLUSD-Funded Phone Tap Payments
This is the module that separates Civic-Chain from every other govtech product on the market. Rather than releasing a lump sum payment to a vendor and hoping they spend it appropriately, the platform issues virtual cards funded directly by the contract's RLUSD pool, delivered to workers' phones via Apple Pay and Google Pay, locked to approved merchant categories, and authorized in real time on every tap. Every phone tap is a contract event on the XRPL blockchain. Full stop.

5.1 Why Phone Tap Instead of Physical Card
Physical cards have a fundamental problem: they can be handed to someone else, lost, or stolen. A phone tap requires biometric authentication before the payment authorizes. Face ID, Touch ID, or PIN on iOS and Android ties the individual worker card to a specific person's device and identity rather than a piece of plastic. That's meaningfully stronger spend control, and it costs nothing extra because it's built into the device operating system itself.
Provisioning speed matters too. When a municipality activates a SAR, virtual cards can reach workers' Apple Pay and Google Pay wallets within minutes. For a seasonal plowing contract that starts in 48 hours, this is not a minor feature. There's no physical card to print, ship, or activate.

Why RLUSD Instead of XRP for the Card Pool
RLUSD is a dollar-pegged stablecoin. One RLUSD is always one US dollar. That elegantly removes the exchange rate volatility problem the original patented architecture addressed with the MAD price oracle. Within the platform, RLUSD is the unit of account for all contract pools, card balances, and residual payment reserves. Every internal balance is exact to the cent, with no conversion risk.


5.2 Virtual Card Tier Hierarchy
Tier
Card Type
Issued To
Typical Use
Company
Contract Master Card
Vendor company (one per SAR)
Large purchases: bulk fuel delivery, equipment rental, materials orders
Individual
Named Worker Card
Each driver or crew member
Per-shift fuel, tolls, small consumables. Biometric-authenticated via phone.
Equipment
Vehicle/Asset Card
Each truck or piece of equipment
Fuel tied to specific vehicle. Enables per-asset expense tracking across the contract.


Card Hierarchy Enforcement
Individual and Equipment cards are children of the Company card. All tiers draw from the same SAR RLUSD contract pool. Sub-tier cards carry lower per-transaction and daily limits than the Company card, but no tier can spend beyond the available RLUSD pool balance. The Company card is the administrative parent: the vendor sets sub-limits on worker and equipment cards within the bounds the municipality has configured on the Company card.


5.3 MCC Lock Profiles by Contract Type

Contract Type
Allowed MCC Categories
Always Blocked
Snow and Ice Removal
Fuel (5541, 5542), Auto Parts (5533), Fleet Services (7521), Equipment Repair (7538)
Restaurants, Entertainment, General Retail, Cash Advances
Road Maintenance
Fuel, Construction Materials (5211, 5031), Hardware (5251), Equipment Rental (7359)
Restaurants, Entertainment, Clothing, Cash Advances
Fire Protection
Fuel, Safety Equipment (5047), Industrial Supplies (5085), Vehicle Repair
Restaurants, Entertainment, General Retail, Cash Advances
Public Safety
Fuel, Communications Equipment (5065), Safety Supplies
Restaurants, Entertainment, General Retail, Cash Advances


5.4 Phone Tap Transaction Lifecycle
Driver holds phone near NFC-enabled terminal. Device prompts Face ID, Touch ID, or PIN authentication.
Apple Pay or Google Pay transmits tokenized card credential to the merchant terminal.
Card network (Visa or Mastercard, via the issuing partner) sends authorization request to Civic-Chain's webhook endpoint.
Civic-Chain authorization service checks in under 500ms: RLUSD pool balance is sufficient, merchant MCC is on the SAR allowed list, transaction is within per-card and per-transaction limits.
If all checks pass: authorization approved. RLUSD pool balance decrements in real time. If any check fails: transaction declined. Driver receives SMS and app notification with decline reason.
Approved transaction is written asynchronously to XRPL as a memo on the contract's SAR ledger entry, including merchant name, MCC, RLUSD amount, card tier, and timestamp.
Admin dashboard updates within seconds. Citizen public portal updates within minutes.

What the Municipality Sees at 3am
A push notification: Contract CRN-2026-PLW-0042. Phone tap authorized: $94.18 RLUSD at Cumberland Farms (Fuel, MCC 5541). Driver: J. Morrison. Vehicle: Truck 7. RLUSD Pool Balance: $11,847.32 remaining. No invoice needed. No surprise. Full accountability in real time, written immutably to the blockchain.


5.5 Rural Fallback: NFC Gaps at Older Terminals
Rural gas stations still have plenty of older terminals that don't support NFC contactless payments. Civic-Chain addresses this directly: the virtual card in Apple Pay and Google Pay is the primary mechanism, with a physical backup card available on request for locations where NFC doesn't work. Both cards draw from the same RLUSD contract pool, apply the same MCC locks, and trigger the same authorization webhook. The delivery mechanism changes. The control architecture doesn't.

5.6 Balance Management and Admin-Controlled Refill
The RLUSD card pool runs on a strict budget model with no automatic refills. When the pool is depleted, all cards under that SAR are hard-declined. The system generates a Refill Request to both the municipality administrator and the Civic-Chain Platform Administrator, including current balance, total spend to date, burn rate versus projected remaining contract duration, and the vendor's stated reason. The administrator approves or denies, specifying a refill amount capped at the remaining unallocated contract value. Upon approval, RLUSD transfers from the Municipal Treasury Account to the contract pool and cards re-enable immediately. Every refill authorization is logged immutably on the XRPL.

Why Admin Approval, Not Auto-Refill
A contractor who burns through their fuel budget in week 3 of a 12-week season needs to explain that to the municipality before receiving more money. Auto-refill removes that accountability checkpoint entirely. Admin-controlled refill creates a natural early warning system for contracts running over budget and keeps the municipality in full control of the spend envelope at all times.


5.7 Issuing Partner
Civic-Chain integrates with a commercial card issuance API for virtual card program management. The authorization webhook model is architecturally required for real-time RLUSD pool balance checking: the card network calls Civic-Chain's API before approving each transaction, giving the platform sub-500ms control over every spend event. Three providers are recommended for evaluation: Marqeta, purpose-built for just-in-time funding models and used by DoorDash, Uber, and Square; Lithic, developer-first with simpler compliance overhead well suited for early-stage deployment; and Stripe Issuing, which offers the strongest API documentation and broadest ecosystem support.
Marqeta: Purpose-built for just-in-time funding models. Native authorization webhook support. Used by DoorDash, Uber, and Square. Best fit for RLUSD-backed just-in-time card funding model.
Lithic: Developer-first card issuing. Strong per-transaction authorization webhook. Simpler compliance overhead for early stage. Good fit for rapid Release 2 deployment.
Stripe Issuing: Best-in-class API and documentation. Spending controls configuration. Authorization webhooks available. Broadest ecosystem support.


6. Module 5: The RLUSD Payment Rail
6.1 Ripple Payments, Rail, and RLUSD Infrastructure
Civic-Chain's payment infrastructure runs on Rail, Ripple's API platform for stablecoin-native money movement. The scale of this infrastructure is worth stating plainly: as of March 2026, Ripple Payments has processed over $100 billion in total volume, supports payouts across 60-plus markets on 51 real-time payment rails, holds 75-plus licenses across major financial jurisdictions, and RLUSD has surpassed $1 billion in market cap. The underlying XRPL settles in 3-5 seconds and produces a publicly verifiable transaction record that no administrator can alter.
RLUSD is a dollar-pegged stablecoin. One RLUSD is always one US dollar. This eliminates the exchange rate volatility problem that the original patented architecture addressed with the MAD price oracle. Within the platform, RLUSD is the unit of account for all contract pools, card balances, and residual payment reserves. Every internal balance is exact to the cent, with no conversion risk.

6.2 The Affiliate Model: Municipalities as Rail Customers
A pivotal architectural constraint sits inside Rail's developer documentation: the nesting prohibition. Rail's Platform Agreement explicitly prohibits moving money on behalf of a party who is not onboarded to Rail. A payment processor cannot pool funds belonging to different entities into its own accounts or make payments from its own accounts on behalf of customers. This shapes everything about how Civic-Chain is built.
In practice, this means Civic-Chain cannot hold municipality funds in Civic-Chain-owned Rail accounts and pay vendors from them. Each municipality must be onboarded as its own Rail corporate customer, completing Rail's KYB process. Rail provides an affiliate model specifically for this scenario: Civic-Chain manages municipality accounts programmatically via API, but the accounts legally belong to each municipality and payments flow from the municipality's own Rail account to vendor counterparties. This is the compliant and correct architecture.

Why the Affiliate Model Is an Advantage
The nesting prohibition initially appears to be a constraint. It is actually a stronger architecture. Because each municipality's funds sit in Rail accounts that legally belong to that municipality, Civic-Chain cannot commingle funds across clients, cannot access municipal treasury balances for its own purposes, and cannot be the source of a payment that should come from the municipality. This is exactly the financial segregation that government clients will require. Rail's AML and OFAC screening on every counterparty means vendor compliance screening is handled natively by Rail's infrastructure, not by Civic-Chain building its own sanctions database.


6.3 USD to RLUSD: The On-Ramp Reality
Rail's current API supports multiple fiat and digital assets, including RLUSD on both Ethereum and the XRP Ledger. The documented exchange pairs for market trades currently include BTC-USD. USD-to-RLUSD conversion is referenced in Ripple's March 2026 press release as available via OTC desk and deep liquidity pools rather than as a self-service API endpoint. Civic-Chain must confirm the programmatic exchange path directly with Ripple's implementation team before committing to the Phase 2 architecture. Three implementation paths are available as specified in the table below.

Path
Mechanism
Timing and Trade-offs
Programmatic API Exchange
Rail exchange API with USD-RLUSD pair enabled under commercial agreement
Ideal target. Subject to confirmation with Ripple. May require custom commercial terms. Primary target for Release 2.
OTC Desk with Daily Batch
Daily batch conversion via Ripple OTC desk. Civic-Chain pre-converts RLUSD and holds a float reserve. Vendor payments draw from pre-converted reserve.
Available today. Introduces same-business-day settlement on the conversion step. Operationally manageable for municipal contract timelines.
USD-Native Phase 1
Skip RLUSD entirely in Phase 1. Operate in USD. Use Rail for USD account management, transfers, and ACH withdrawals only.
Simplest path to market. Full RLUSD upgrade in Release 2 when exchange path confirmed. Loses stablecoin narrative early but preserves all other platform value.


6.4 Complete Payment Flow: Seven Stages

Stage 1: Municipality KYB Onboarding
Before any funds move, the municipality completes onboarding as a Rail corporate customer. Civic-Chain triggers Rail's KYB application via the admin console, collecting business registration documents, authorized signatories, and beneficial ownership information. Rail handles all compliance screening. Once approved, the municipality holds its own Rail USD deposit account and, when RLUSD is enabled, an RLUSD account for contract sub-pools. Onboarding happens once per municipality. Civic-Chain manages all accounts programmatically under the Rail affiliate model.

Stage 2: Municipal Treasury Funding (USD In)
The municipality initiates an ACH or Fedwire transfer from its bank account into its Rail USD deposit account. Rail supports both push deposits initiated by the municipality and ACH pull initiated by Civic-Chain with prior authorization. Rail's AML processing runs on receipt. When RLUSD is live, USD converts via the confirmed path. Until then, the MTA operates in USD and all sub-pool allocations are USD-denominated. A Rail webhook event notifies Civic-Chain when the deposit is credited and the balance is available.

Stage 3: Contract Pool Allocation (Internal Rail Transfers)
When a SAR activates, Civic-Chain initiates internal Rail transfers from the MTA to three sub-accounts: the Card Pool, the Residual Payment Reserve, and the Hold-Back Reserve. Rail transfers between accounts belonging to the same customer are immediate. Each sub-account balance is tracked via Rail's transactions API and mirrored in Redis via webhook events, enabling sub-500ms card authorization decisions without polling Rail.

Stage 4: Vendor Counterparty Registration and AML Screening
At contract activation, the winning vendor registers as a Rail counterparty under the municipality's customer record. Civic-Chain provides vendor bank details via the counterparty API. Rail initiates AML screening on the vendor. The COUNTERPARTY_STATUS webhook notifies Civic-Chain when screening completes. A vendor in PENDING or FROZEN status cannot receive payment. This step runs in parallel with contract setup, not at payment time, which eliminates last-minute delays.

Stage 5: Real-Time Phone Tap Spend
When a worker taps their phone at a merchant, the authorization webhook fires to Civic-Chain's API in real time. Civic-Chain checks the Card Pool balance from Redis in under 10 milliseconds, validates the MCC lock, and approves or declines within 500 milliseconds. The card network settles through standard interchange, with interchange revenue flowing to Civic-Chain as card program manager. The Card Pool account is debited via the card issuing partner's settlement process, reconciled against Civic-Chain's internal ledger, and the transaction is written to the XRPL as an immutable memo on the SAR record.

Stage 6: Work Verification and Residual Payment
When a vendor submits a Work Completion Record, the Civic-Chain administrator authorizes the payment. The WCR document is simultaneously uploaded to the Rail withdrawal object as proof of payment, satisfying Rail's RFI requirement in a single step. That's the elegance of this workflow: Civic-Chain's internal governance and Rail's compliance requirement resolve together. The authorized withdrawal moves from the Residual Payment Reserve to the vendor's registered bank account via ACH or Fedwire. The WITHDRAWAL_EXECUTED webhook confirms completion and triggers the XRPL memo write and citizen portal update.

Stage 7: Dispute Handling via EDD
Rail's EDD status keeps accounts transactional while elevated compliance review is underway. When a contract dispute opens in Civic-Chain, the corresponding sub-accounts can be placed in EDD, holding additional disbursements while allowing existing authorized transactions to complete. Active service delivery doesn't stop. The dispute is logged on the XRPL and visible to both the administrator and the citizen portal.

6.5 The Business Model: SaaS-First, Interchange as Upside
Civic-Chain is not a payment processor. The rail enables the accountability story; it doesn't define the product. What Civic-Chain sells is the procurement platform, the voting system, the contract card program, and the public transparency infrastructure. The SaaS contract is priced against that value, not against transaction volume. This is a critical distinction, and it shapes every pricing and positioning decision the company makes.

Revenue Stream
Description
Annual SaaS Contract (Primary)
Flat annual fee per municipality, sized to value delivered in procurement efficiency and labor savings. Millbrook case study benchmarks $6,000 to $15,000 as well within the municipality's ROI envelope. Predictable, recurring, not dependent on transaction volume.
Card Interchange Revenue (Upside)
Civic-Chain as card program manager captures a share of interchange on every phone tap: approximately 1.5% average. Scales with card usage, not with payment volume. Approximately $1,400 per municipality per year at Millbrook-scale card spend.
Float Yield on Rail Balances (Operational)
USD or RLUSD held in Rail accounts earns yield via Rail’s qualified custody partners. Approximately 4% annualized on average MTA balance. Approximately $2,960 per municipality per year (conservative 1.5-day hold model; up to $6,600 under full Path B custody). Managed at platform level.
Rail Payment Products (Release 4)
Rail's Payment Products account type supports multi-payor collections: citizens fund specific contracts directly. Revenue model to be defined. Enables the Release 4 taxpayer direct contribution module without custom payment infrastructure.



7. Dashboards and Reporting Interfaces
Three dashboard experiences surface across the platform, each built for a specific audience at a specific moment in the contract lifecycle. The specifications in this section serve as direct input to UI/UX design and frontend development.

7.1 Proposal Pipeline Dashboard (Administrator View)
The Proposal Pipeline Dashboard is where municipality staff and Civic-Chain administrators live during an active solicitation. It's a Kanban-style pipeline showing every solicitation for a given municipality across its full lifecycle, with drill-down capability at each stage. From Draft through Completed and Disputed, every status is visible, actionable, and auditable.

Pipeline Stages
Stage
What It Shows
Actions Available
Draft
Solicitations being configured but not yet published. CRN assigned, fields incomplete.
Edit, publish, delete
Published
Live solicitations accepting proposals. Submission count updates in real time.
View proposals as they arrive, close early, extend deadline
Under Review
Submission window closed. Proposals being evaluated side by side.
Score proposals, flag incomplete submissions, open voting
Voting Open
Citizen or board voting in progress. Participation and confidence data live.
Monitor live dashboard, close voting early if quorum reached
Awarded
Winner determined and notified. SAR not yet activated.
Activate SAR, configure RLUSD pools and card program
Active Contract
SAR live. Card program running. Payments in flight.
Monitor spend, authorize WCRs, manage refill requests
Completed
Contract term ended. Final payment disbursed. Hold-back released.
View full contract report, export to accounting system
Disputed
Contract paused due to active payment or performance dispute.
Access dispute workflow, communicate with vendor


Proposal Comparison View
Selecting any solicitation in the Under Review stage opens the Proposal Comparison View, the core evaluation tool for administrators. It displays all received proposals in a normalized side-by-side format regardless of how they were originally submitted. Up to four proposals appear simultaneously. Each row maps to a standardized field. Color coding flags completeness. Administrators score proposals, add private notes, and flag incomplete submissions with a single action that automatically emails the vendor and logs the request with a timestamp.
Each proposal occupies a column. Up to four proposals visible simultaneously, scroll or filter for more.
Rows map to standardized fields: service scope, coverage zone, pricing structure, proposed amount, estimated card spend percentage, performance bond status, insurance certificate status, and reference count.
Color coding flags completeness: green for all required fields present, amber for optional fields missing, red for required fields absent.
Administrators can add a numeric score (1 to 10) per proposal per evaluation criterion. Scores aggregate into a weighted total if scoring weights have been configured for the solicitation.
Annotate button on each proposal opens a private notes field visible only to administrators. Notes are preserved in the solicitation record for audit purposes.
Any proposal can be flagged as Incomplete, triggering an automated email to the vendor requesting the missing information and logging the request with timestamp.
Vendor identities are visible to administrators at all stages. They are anonymized on the citizen-facing voting view until the voting window closes.

Proposal Pipeline Data Fields
Data Point
Source and Update Frequency
Solicitation count by stage
Real time from database
Proposals received per solicitation
Real time as emails are parsed and routed
Completeness score per proposal
Calculated on ingest, updated if vendor resubmits
Days remaining in submission window
Calculated from solicitation close datetime
Administrator score per proposal
Written by administrator, stored in application database
Submission timestamp
System-recorded on email receipt, immutable


7.2 Live Voting Dashboard (Administrator and Public Views)
The Voting Dashboard has two distinct faces. Administrators see full detail including confidence score breakdown, live participation data, geographic heat maps, anomaly alerts, and the current tally. Citizens see participation count, quorum status, time remaining, and anonymized proposal summaries. Both update in near real time as ballots are cast. The division is deliberate: transparency for oversight, privacy for voters.

Administrator Voting Dashboard
Visible only to Civic-Chain and municipality administrators while voting is open:

Panel
Content
Participation Meter
Total ballots cast vs. quorum threshold, displayed as a progress bar. Percentage of registered voters who have voted. Projected time to quorum based on current rate.
Confidence Score Distribution
Live breakdown of ballots by confidence tier: High, Medium, Low. Pie chart and raw counts. Flags if Low-confidence ballots exceed a configurable threshold, e.g., more than 5% of total.
Geographic Participation Map
Heat map of voter participation across the municipality boundary polygon. Darker shading indicates higher participation density by neighborhood or precinct zone. Identifies areas with low turnout for targeted outreach.
Current Vote Tally
Live counts per proposal, visible to administrators regardless of whether live display is configured for citizens. Vendor names shown.
Anomaly Alerts
Real-time flags for: unusual spike in votes from a single device or location, high concentration of Low-confidence ballots from a specific zone, GPS and IP mismatch rate exceeding baseline.
Time Remaining
Countdown to voting close. One-click extension if quorum has not been reached.


Public Citizen Voting Dashboard
Visible to any citizen on the public portal while voting is open:
Participation count: number of votes cast so far. No tally shown unless the solicitation is configured for live result display.
Quorum status: reached or not yet reached, with no raw number if the municipality prefers not to display it.
Time remaining in voting window.
Proposal summaries: anonymized vendor descriptions covering service scope, coverage zone, and pricing tier for comparison without revealing vendor identity before close.
My vote: citizen sees confirmation of their own vote if already cast. Cannot vote twice.

Post-Close Results View
When the voting window closes, the dashboard transitions to results for both audiences. Final tally, winner prominently displayed, vendor name unmasked, winning margin, and confidence distribution all appear. A downloadable PDF confidence certificate is generated automatically, signed with a Civic-Chain platform key and anchored to the XRPL. Any auditor can verify the ballot data using the SHA-256 hash included in the certificate.
Final tally per proposal with vote counts and percentages.
Winner prominently displayed with vendor name now unmasked, winning margin, and final confidence score distribution for the winning proposal's votes.
Confidence certification: a downloadable PDF certificate showing the total ballot count, confidence tier breakdown, quorum status, boundary polygon version used, and a SHA-256 hash of the complete ballot record for independent verification.
XRPL transaction link: the contract award SAR anchor transaction, providing immutable proof that the result shown is the result recorded on the blockchain.
Developer Note: Confidence Certificate
The confidence certification PDF is an important deliverable for any municipality that anticipates a challenged result. It should be generated automatically at vote close, signed with a Civic-Chain platform key, and anchored to the XRPL. The SHA-256 hash of the ballot record included in the certificate allows any auditor to verify that the ballot data has not been altered since the certificate was issued. Build this in Release 2 alongside the geolocation voting infrastructure.


7.3 Contract Spend Dashboard (Administrator and Public Views)
Once a SAR activates and the RLUSD card program goes live, the Contract Spend Dashboard becomes the central accountability interface. Administrators see budget gauges, burn rate indicators, projected depletion dates, live transaction feeds, spend by category, spend by card, the WCR queue, and refill request controls. Every panel is real-time. Every entry links to an XRPL transaction.

Administrator Spend Dashboard
Panel
Content
Contract Header
Contract name, CRN, vendor, start and end dates, total value in RLUSD. Status badge: Active, Refill Pending, Disputed, or Completed.
Budget Gauge
Three-part gauge showing RLUSD Card Pool (spent vs. remaining), Residual Payment Reserve (disbursed vs. scheduled vs. remaining), and Hold-Back Reserve (locked vs. pending release). Color coded: green above 40% remaining, amber at 15 to 40%, red below 15%.
Burn Rate Indicator
RLUSD spent per day on card pool vs. projected daily budget based on contract duration. Amber alert if burn rate exceeds projection by more than 15%. Red alert and administrator notification if burn rate exceeds projection by more than 30%.
Projected Depletion Date
Estimated date the card pool will be exhausted based on current burn rate. Updated daily. Shown as a date and as days remaining.
Live Transaction Feed
Scrolling feed of every phone tap in real time: timestamp, merchant name, MCC category label, RLUSD amount, card tier (Company, Individual, or Equipment), and card alias such as Truck 7 or Driver J.M. Most recent transaction at top.
Spend by Category
Pie or bar chart breaking card pool spend by MCC category: fuel vs. auto parts vs. equipment repair. Updates in real time.
Spend by Card
Table showing each issued card with total spend to date, last transaction date and merchant, and remaining daily limit. Sortable by spend amount.
WCR Queue
Pending Work Completion Records awaiting authorization for residual payment. Oldest WCR at top. One-click review and authorize or dispute.
Refill Request Panel
If a refill request is pending, this panel shows current pool balance, burn rate context, vendor stated reason, and approve or deny controls. Approving triggers immediate RLUSD transfer from MTA to card pool.
Payment History
Complete chronological log of all RLUSD movements on this contract: card pool funding, tap debits, residual disbursements, refills, hold-back release. Each entry includes an XRPL transaction link.


Public Citizen Spend Dashboard
Any citizen can access the public portal without logging in. They see the same contract data as the administrator view, with two differences: individual cardholder identities are omitted (only card tier and vehicle alias are shown), and RLUSD amounts are displayed in USD equivalents for accessibility. The live transaction feed, budget gauge, burn rate indicator, and complete payment history with XRPL links are all visible. The accountability is real.
This is what government transparency actually looks like in practice. A citizen opens the portal on their phone and sees that the plowing contractor spent $94.18 on fuel at 3:14am on Route 7. They tap the XRPL link and verify the transaction on a public block explorer. They can confirm $11,847 remains in the contract pool. No freedom of information request. No waiting for a board meeting. No trust required.

Multi-Contract Overview (Municipality Home Dashboard)
The municipality home dashboard pulls all active contracts into a single view for administrators managing multiple simultaneous service agreements. One card per active contract shows service type, vendor name, total contract value, card pool percentage remaining, next residual payment due date, and any pending alerts. The Municipal Treasury Account balance sits prominently at the top alongside total RLUSD allocated to active contracts and total unallocated balance available. Sortable by contract value, pool remaining, next payment, or alert severity.
One card per active contract showing: service type, vendor name, total contract value, card pool percentage remaining, next residual payment due date, and any pending alerts covering burn rate warning, refill request, or disputed WCR.
Municipal Treasury Account balance displayed prominently at top with total RLUSD allocated to active contracts and total unallocated RLUSD available.
Solicitations in pipeline shown below active contracts: stage, days remaining to next milestone, and proposal count.
Sortable by: contract value, card pool remaining percentage, next payment due, or alert severity.
One-click export of all active contract financials to CSV or PDF for submission to municipal finance department or state reporting.


8. The Admin Console
The Admin Console is the operational backbone for Civic-Chain Platform Administrators and, over time, for trained Municipal Administrators taking on full self-service capability. Its functions map directly to every module already specified: solicitation and proposal management, vote administration, contract spend authorization, Rail KYB onboarding, counterparty AML monitoring, and RLUSD refill request approval. Two additional functions are detailed here: the Rail KYB workflow and the compliance report package.

8.1 Capability Transfer Model
Civic-Chain is designed to hand off administrative responsibility progressively, on the municipality's own timeline. The onboarding phase puts Civic-Chain administrators fully in control while the municipality watches and learns. The supervised phase shifts primary responsibility to the municipality while Civic-Chain co-approves payments and refills. The independent phase is full municipal self-administration. An optional advanced phase adds automated rules with exception alerts.
Phase
Who Administers
Civic-Chain Role
Onboarding (Mo. 1-3)
Civic-Chain Admin
Full administration. Municipality observes and learns.
Supervised (Mo. 3-9)
Municipality (primary)
Civic-Chain co-approves payments and RLUSD refills.
Independent (Mo. 9+)
Municipality (full)
Platform support only.
Advanced (Optional)
Municipality plus automated rules
Automated triggers with exception alerts.


8.2 Rail KYB Onboarding Workflow
The admin console walks Civic-Chain staff through the Rail KYB process for each new municipality. Business registration documents, authorized signatories, and beneficial ownership information are collected and submitted to Rail via the Applications API. Status is monitored via the CUSTOMER_STATUS webhook. A municipality cannot fund its MTA or activate contracts until KYB clears. Expected approval time is one to three business days. The console flags any Changes Requested status prominently and alerts administrators when additional documents are needed.

8.3 Compliance Report Package
The admin console generates a compliance report package for every completed contract, exportable as a PDF. The package includes the XRPL transaction log with SHA-256 linked entries for every payment event, the geolocation confidence audit trail for the vote, the Rail counterparty AML screening record for the vendor, the WCR document log with Rail withdrawal IDs, and the XRPL SAR anchor transaction hash. This package is designed to satisfy municipal audit requirements and FOIA requests without manual compilation.


9. Technical Architecture
9.1 System Components
Web Application (React/Next.js): Citizen portal, vendor portal, municipality portal, public XRPL contract ledger.
Mobile Application (React Native): iOS and Android. Voting with geolocation verification, contract spend tracking, push notifications.
Admin Console (React/Next.js): Internal operations, card program management, geolocation boundary editor, vote administration, Rail KYB onboarding workflow, counterparty AML status monitoring.
API Layer (Node.js/Express): Unified REST/GraphQL API serving all clients.
Card Authorization Webhook Service: Real-time handler for card network authorization requests. Enforces card pool balance from Redis, MCC locks, and per-card limits. Must respond in under 500ms.
Virtual Card Issuance Service: Integration with Marqeta, Lithic, or Stripe Issuing. Virtual card provisioning to Apple Pay and Google Pay. Card lifecycle management and interchange capture.
Geolocation Service: Address geocoding and enrollment verification. Boundary polygon management and versioning. Real-time GPS comparison at vote time. IP geolocation audit signal. Confidence score calculation.
Rail Integration Service: Municipality KYB application management. Rail affiliate model account management (MTA and contract sub-accounts). Internal transfer execution between sub-accounts. Withdrawal creation and WCR document upload (combined step). Counterparty creation and AML status monitoring. USD-RLUSD conversion coordination (OTC batch or programmatic exchange). Float yield monitoring.
Rail Webhook Event Processor: Receives all Rail webhook events (DEPOSIT_EXECUTED, WITHDRAWAL_EXECUTED, WITHDRAWAL_CHANGES_REQUESTED, COUNTERPARTY_STATUS, ACCOUNT_STATUS, PAYMENT_EXECUTED). Updates Redis balance cache and PostgreSQL records. Triggers citizen portal updates and admin notifications. Drives real-time dashboards without polling.
XRPL Ledger Service: Contract SAR anchoring. Payment event memo recording. SHA-256 cryptographic linking across card network settlement, Rail account ledger, and PostgreSQL application database.
Database (PostgreSQL): Application state, contract records, card transaction ledger, geolocation audit log, voting records, Rail account ID mapping, counterparty registry and AML status history.
Redis Cache: Card pool and sub-account balance mirrors updated by Rail webhook events. Enables sub-500ms card authorization without real-time Rail API calls.
Notification Service: Email, SMS, and push notifications for card declines, low balance alerts, refill requests, vote results, payment confirmations, Rail RFI triggers, KYB status updates, and counterparty AML status changes.

9.2 Rail Compliance Architecture
Rail's native compliance infrastructure removes a significant build burden. Municipality KYB, vendor OFAC and AML screening, inbound deposit AML, withdrawal RFI handling, EDD dispute state management, and consumer protection all run through Rail's infrastructure. Civic-Chain monitors, surfaces, and acts on these signals rather than building and maintaining each system independently. That's a meaningful operational advantage, and it's worth stating plainly.

Compliance Function
How Rail Handles It
Municipality KYB
Rail's KYB application process screens the municipality as a corporate customer at onboarding. Civic-Chain triggers the application via API and monitors status via webhook. Rail manages all document review and approval.
Vendor OFAC and AML screening
Every vendor registered as a counterparty undergoes Rail AML screening before becoming active. Civic-Chain monitors counterparty status via COUNTERPARTY_STATUS webhook. A vendor in PENDING or FROZEN status cannot receive payment.
Inbound deposit AML
Rail and its banking partners perform exhaustive screening on all inbound deposits before crediting. Civic-Chain does not run a separate inbound AML layer.
Withdrawal RFI
Rail may request proof of payment for withdrawals above threshold. Civic-Chain uploads the WCR document to the Rail withdrawal object at authorization time, satisfying both systems in one step. WITHDRAWAL_CHANGES_REQUESTED webhook triggers admin alert if additional documents are needed.
EDD dispute state
Rail's EDD account status holds disbursements while keeping accounts transactional. Civic-Chain uses this for disputed contracts: payments held pending resolution without disrupting active service.
Consumer protection
Rail's consumer protection framework covers unauthorized transaction claims, integrating with the dispute workflow for contested card transactions.


9.3 Payment Flow Diagram

Municipality (Rail Corporate Customer, KYB Approved)
Bank ACH or Fedwire  >>  Municipality Rail USD Account (MTA)
USD-RLUSD: OTC Batch (today) or Programmatic Exchange (when confirmed)
Rail Internal Transfers  >>  Sub-Accounts: Card Pool  |  Residual Reserve  |  Hold-Back
Phone Tap  >>  Card Network Interchange to Civic-Chain  >>  Pool Debited  >>  XRPL Memo Written
WCR Authorized + WCR Doc Uploaded to Rail Withdrawal  >>  Vendor Counterparty (AML Screened by Rail)
Rail ACH or Fedwire to Vendor Bank  >>  WITHDRAWAL_EXECUTED Webhook  >>  XRPL Memo Written
Rail Webhooks drive all dashboard updates in real time. XRPL provides immutable public audit trail.


9.4 Card Authorization Latency Requirements
The authorization webhook has approximately two seconds to respond before the card network auto-declines the transaction. Civic-Chain targets under 500 milliseconds. The decision path runs in six steps: incoming authorization request, Redis balance lookup in under 10 milliseconds, MCC check in under 5 milliseconds, limit check, balance sufficiency check, and response. All downstream writes, PostgreSQL, XRPL, Redis balance update, push notifications, are asynchronous and never block the authorization path.
Card network sends authorization request to Civic-Chain webhook endpoint (HTTPS POST).
Authorization service looks up card record and SAR contract pool balance from Redis cache (under 10ms).
MCC check: validate merchant MCC against SAR allowed list in memory (under 5ms).
Limit check: validate transaction amount against per-card daily and per-transaction limits.
Balance check: confirm RLUSD pool balance is sufficient for the transaction amount.
Return approval (200 OK) or decline (with decline code) to card network.
Asynchronously: write transaction to PostgreSQL, queue XRPL memo write, update Redis balance, trigger push notifications.
Redis is the live source of truth for RLUSD pool balance during authorization. PostgreSQL and XRPL are the persistent record of truth. All downstream writes are asynchronous and never block the authorization response. This separation is what makes sub-500ms card decisions possible at scale.


10. Product Roadmap
Release 1: Foundation, Months 1–4
Goal: a deployable MVP for one pilot municipality through one complete contract cycle, operating in USD on Rail. No virtual cards yet. The Ripple commercial relationship must be established in parallel with development. The first action before writing any application code is confirming Rail commercial terms and beginning the affiliate model implementation. Phone tap infrastructure follows in Release 2; Release 1 proves the proposal, voting, contract management, and payment workflow on actual municipal contracts.
Rail commercial relationship: establish affiliate agreement, confirm USD-RLUSD exchange API availability and terms
Rail KYB onboarding workflow for pilot municipality: guided admin console application, document collection, status monitoring via webhook
Municipality USD deposit account (MTA) in Rail. Vendor counterparty registration with AML screening.
Email-based proposal intake with CRN routing
Proposal viewer and side-by-side comparison in admin console
Board-only voting (web-based), geolocation boundary configured but GPS gate not yet enforced
SAR creation with contract sub-account allocation (USD in Release 1, RLUSD-ready in Release 2)
WCR submission: WCR document uploaded to Rail withdrawal object at authorization time (satisfies Rail RFI requirement simultaneously)
ACH residual payment via Rail withdrawal API to vendor counterparty
Rail webhook event processor: real-time balance updates, withdrawal confirmations, RFI alerts
Basic public contract ledger driven by Rail webhook events and XRPL memos

Release 2: RLUSD Rail and Phone Tap, Months 4–9
Goal: RLUSD conversion live via confirmed path, programmatic or OTC batch. Virtual cards live in Apple Pay and Google Pay. Mobile voting app with GPS geolocation enforcement active. This release is where the product becomes architecturally complete: the full payment rail, the stablecoin infrastructure, and the geolocation-gated citizen voting module all ship together. The Release 2 deliverables transform a capable MVP into the category-defining platform described in the executive summary.
USD-RLUSD conversion: programmatic exchange API if confirmed, otherwise OTC batch with pre-converted float reserve
Contract sub-accounts converted to RLUSD denomination. Internal Rail transfers in RLUSD.
Virtual card issuing partner integration (Marqeta or Lithic)
Company, Individual, and Equipment virtual card tiers provisioned to Apple Pay and Google Pay
MCC lock enforcement via real-time authorization webhook. Card pool balance from Redis (updated by Rail webhooks).
Hard-decline on pool exhaustion. Admin-controlled refill request workflow.
SHA-256 cross-system audit linking: card network settlement, Rail account ledger, XRPL memo, PostgreSQL
EDD integration for disputed contracts: disbursements held, service continues
React Native mobile app: GPS geolocation voting with three-layer verification and confidence scoring
Real-time phone tap spend dashboard: admin console and public citizen portal

Release 3: Automation and Scale, Months 9–15
Goal: reduce manual overhead, enable municipality self-administration, and introduce advanced card controls across multi-municipality deployments. Geographic phone tap locks, active hours restrictions, per-vehicle fuel efficiency tracking, automated residual payment triggers, and NLP-powered proposal extraction all ship in Release 3. This is the release where the product scales operationally without scaling the headcount proportionally.
Geographic phone tap lock: restrict spend to merchants within defined radius
Active hours lock: restrict card use to defined time windows
Per-vehicle fuel efficiency tracking via Equipment card data
Automated residual payment triggers (calendar and event-based)
Municipality Administrator role with full capability transfer workflow
NLP-powered proposal extraction from unstructured email
Multi-municipality dashboard for county-level administrators
Programmatic USD-RLUSD exchange: replace OTC batch with API call if not live in Release 2

Release 4: Ecosystem and Network Effects, Months 15–24
Goal: Platform network effects, regional rollout, advanced features.
Vendor marketplace: single Rail counterparty onboarding per vendor across all municipalities. Register once, appear everywhere.
Rail Payment Products account type: multi-payor collections enabling taxpayer direct contribution module
Vendor performance scoring and citizen ratings
Contract burn rate analytics and predictive budget alerts
Multi-year contract support with annual re-vote
White-label for county governments and regional councils
Third-party API for civic tech integrations


11. Intellectual Property Strategy
11.1 Patent 1: Government Blockchain Payment Architecture (Filed)
The provisional patent on file covers the core payment architecture. RLUSD eliminates the need for the MAD price oracle in the stablecoin payment context, but four components remain directly applicable to Civic-Chain: pre-blockchain compliance validation, cryptographic cross-system audit linking, reserve fund guarantee mechanics, and tri-tier asynchronous settlement. Each maps cleanly onto the platform architecture described in this document.
Pre-blockchain compliance validation: Vendor OFAC screening and identity verification completed before any XRPL transaction is committed, per the patented architecture.
Cryptographic cross-system audit linking: SHA-256 hash links every phone tap transaction across the card network settlement record, RLUSD ledger entry, XRPL memo, and PostgreSQL application record into a single unbroken audit chain.
Reserve fund guarantee mechanics: The RLUSD contract pool structure and hold-back reserve operate on the same guarantee principles as the patented reserve fund model.
Tri-tier asynchronous settlement: Card spend, residual payment, and hold-back release operate as independent tiers with compensation transaction paths, consistent with the patented architecture.

11.2 Patent 2: Geolocation Voter Eligibility Verification (Recommended, Separate Filing)
The layered geolocation verification system for civic voting eligibility is a distinct and novel invention warranting its own patent application. Three elements define the novelty: the three-layer corroboration model operating GPS, IP, and enrollment address verification in combination; per-ballot confidence scoring with defined tiers and associated administrative workflows; and the specific privacy architecture that discards raw GPS coordinates after comparison and writes only boolean results and zone identifiers to storage. The integration between the geolocation eligibility system and the XRPL-anchored contract record adds a fourth layer of novelty: a cryptographically linked chain from voter eligibility verification through contract award to payment execution.
The three-layer corroboration model: GPS as primary gate, IP as audit signal, enrollment address verification as upstream identity gate, operating in combination for civic voting eligibility determination.
Per-ballot confidence scoring with defined tiers (High, Medium, Low, Rejected) and associated administrative review workflows.
The specific privacy architecture: ephemeral GPS coordinates compared and discarded, boolean result and zone identifier stored, no coordinate data written to public blockchain.
Integration between the geolocation eligibility system and the XRPL-anchored contract record, creating a cryptographically linked chain from voter eligibility verification through contract award to payment execution.
Filing this as a separate provisional application rather than a continuation of the payment patent keeps the claims narrow, avoids diluting either application, and enables both patents to reference each other as related art. Together they describe the full Civic-Chain platform architecture.


12. Market Opportunity and Revenue Model
Civic-Chain's addressable market is far larger than any single-segment view reveals. Positioned as a payment infrastructure layer beneath every dollar of US government procurement, the platform operates across five distinct government segments with meaningfully different contract values, payment volumes, and acquisition strategies. The national TAM across all segments runs from $3.3B to $7.3B annually. That's not a stretch target. It's what the math produces when you count all five segments correctly.
12.1 The Five-Segment Universe
US government spending flows through five addressable segments. Civic-Chain's architecture is compatible with all five. The go-to-market strategy sequences entry carefully by acquisition complexity and sales cycle length, starting where proof-of-concept is fastest and scaling where the unit economics are most compelling.
Segment
Count
Avg Annual Payment Volume
SaaS ACV
TAM (3 streams)
Small Municipalities (<25K pop.)
19,500
$18M
$35K
$1.97B
Mid/Large Cities (25K-500K pop.)
1,150
$280M
$150K
$1.35B
Major Cities (500K+ pop.)
35
$3.5B
$500K
$0.47B
US Counties
3,069
$85M
$75K
$1.19B
State Governments
50
$12B
$2M
$2.30B
TOTAL UNIVERSE
23,804
—
—
$7.27B


TAM is calculated as SaaS fees plus transaction fees at 0.35% (0.20% for states and major cities, reflecting harder negotiating positions) plus float yield at 1.5-day hold and 4.0% annualized. Full universe capture is not an operational assumption. It establishes the ceiling against which actual penetration targets are measured.
12.2 Revised TAM: Three Revenue Streams, Five Segments
The original $585M TAM reflected SaaS fees only, across small municipalities only. Version 3 of the revenue model rebuilds the TAM from the outside in, anchored to cited market data: Tyler Technologies’ Platform Technologies segment generated $635–645M in FY2024 revenue (SEC 10-K), nearly half a billion government transactions annually at an implied ~$1.15 average fee; the Rabbet 2023 Construction Payments Report documented $273B added to US construction bids due to payment delays; and the US Census Bureau records $71.25B in state license tax revenue and $213B in total excise tax collections annually. Importantly, the figures below reflect Phase 1 (outbound vendor and contractor payments) only. Permitting and licensing portal revenue (Phase 2) and excise tax processing revenue (Phase 3) are deferred market opportunities shown separately in Section 12 of Revenue Model v3 — they are not included in the near-term projections.
Revenue Stream
Conservative
Base Case
Optimistic
SaaS Platform Fees
$600M
$989M
$989M
Transaction Processing Fees
$900M
$1.60B
$2.20B
Float Yield on RLUSD/USD Balances
$35M
$66M
$108M
TOTAL TAM (small muni SAM only)
$1.54B
$2.65B
$3.30B
TOTAL TAM (full national universe)
$1.86B
$5.50B
$7.27B


WORKING RANGE FOR INVESTOR MATERIALS
Conservative (small muni focus, 30% addressable): $1.54B
Base Case (national rollout, full three streams): $2.65B - $5.5B
Optimistic (full universe, state contracts included): $7.27B
The appropriate headline depends on stage: seed materials use the conservative figure; Series A and beyond can defend the national number with reference customers in hand.


12.3 Per-Segment Economics
Revenue per customer varies dramatically across segments. A small town generates a very different economic profile than a county or a state. The table below shows blended annual revenue per customer across all three streams at steady-state, under Path B independent operation.
Segment
SaaS ACV
Txn Fee / yr
Float / yr
Total ARPU
Customer ROI
Small Town (~4K pop.)
$10,000
$63,000
$2,960
$75,960
385%+
Mid-Sized City (~50K pop.)
$75,000
$980,000
$46,000
$1,101,000
500%+
Large City (~200K pop.)
$150,000
$3,150,000
$148,000
$3,448,000
600%+
County (~85M vol.)
$75,000
$297,500
$13,973
$386,473
450%+
State Government
$2,000,000
$24,000,000
$1,127,000
$27,127,000
700%+


The state government row deserves a second look. A single state contract at $12B in annual payment volume generates more transaction fee potential than all 19,500 small municipalities combined in a base-case scenario. Five state contracts equal the entire small municipality ARR target at Year 10. That is not a coincidence of the model. It's the strategic rationale for pursuing state contracts at Series C.
12.4 Beachhead Market: New England Small Towns
The seed-stage go-to-market stays focused on New England municipalities under 25,000 population. Not because the market is limited to that segment, but because sequencing matters. This is where proof of concept is fastest, sales cycles are shortest, and reference customers compound most effectively. The beachhead builds the foundation. Everything above it follows from there.
Metric
Estimate
New England municipalities (SOM)
~1,400
Average annual services procurement budget per town
$150,000 to $500,000 (specific snow/road service categories; total outbound contract payment volume modeled at ~$18M per municipality across all service types)
Annual SaaS contract per municipality
$6,000 to $35,000
Transaction fee revenue per municipality (at scale)
$63,000 per year
Float yield per municipality (Path B)
$2,960 to $6,600 per year
Total revenue per municipality (blended)
$72,000 to $105,000 per year
Beachhead TAM (New England SAM, three streams)
$100M to $147M annually
Year 1 pilot target
5 to 10 municipalities
Year 3 target (base case)
150 to 300 municipalities
Year 3 target (accelerated)
300 to 500 municipalities


12.5 Competitive Position
CATEGORY DIFFERENTIATION
No incumbent in municipal procurement software operates on Ripple Rail and RLUSD infrastructure.
No competitor offers MCC-locked phone tap contract spend control with real-time blockchain audit.
No existing platform provides geolocation-verified citizen voting with immutable XRPL anchoring.
Tyler Technologies’ NIC division (Platform Technologies segment) generated $635–645M in FY2024 revenue processing ~400–500 million government transactions annually — almost entirely focused on citizen-to-government portal payments using ACH infrastructure with 3–5 day settlement (Tyler Technologies 10-K, SEC, FY2024). Civic-Chain offers same-business-day vendor payment.
These are not incremental improvements. They are a different product category built on infrastructure that did not exist two years ago.

13. Go-to-Market Strategy and BaaS Partnership Model
Civic-Chain's go-to-market is a staged geographic and segment expansion, opening with a defensible New England beachhead and scaling through four phases over ten years. Each phase is gated by the previous phase's proof points, funded by the ARR it generates, and enabled by the infrastructure it builds. The BaaS partnership is central to Phase 1 speed. The migration away from it is central to Phase 2 margin. Both decisions are correct given their timing.
13.1 The Core Strategic Tension: Speed vs. Margin
Getting municipalities paid in real time requires a fundamental choice: rent the compliance infrastructure and reach the market in months, or build it and own the margin for decades. The right answer changes with stage. At seed, speed and capital efficiency win. At Series A, with proof points in hand and customers justifying the overhead, the calculus shifts entirely. Understanding both paths precisely, and knowing when to migrate between them, is the strategic core of this section.


Path A: BaaS Partner (Seed)
Path B: Independent (Series A+)
Time to first live payment
3-5 months
12-24 months
Upfront cost
$175K-$295K
$750K-$1.5M
Ongoing compliance cost
Low (partner's burden)
High ($200K+/year)
Settlement speed
Same-day ACH or RTP
Minutes via Ripple Rail
RLUSD / stablecoin
No: USD only
Yes: full stack
Net interchange margin
~0.9% net
~1.5% gross
Float yield per customer/yr
~$1,300 (shared)
~$2,960–$6,600 (full)
Float at 1,990 customers
~$2.6M ARR
~$5.9M–$13.1M ARR
Regulatory risk
Low (partner absorbs)
High (yours to manage)
Investor narrative
Pragmatic, capital-efficient
Ambitious, higher moat


RECOMMENDED APPROACH
Start on Path A (BaaS). Migrate to Path B at Series A.
The $750K Ripple Rail line item in the seed budget becomes $250K under Path A, with the $500K delta redeployed to engineering and customer acquisition.
Migration payback at Series A: under 30 days at 25+ customers. Every year of delay after Series A is a compounding cost, not a deferral.

13.2 BaaS Partner Evaluation
Five providers are the primary candidates for the Path A BaaS integration. Evaluation criteria are: native card issuing capability, real-time authorization webhook support, government-adjacent fintech experience, and commercial terms that do not create revenue-sharing obligations that survive the Series A migration. The table below summarizes the fit assessment.
Provider
Strengths
Fit for Civic-Chain
Column Bank
Real bank charter, developer API, ACH + wire + card issuing
Strong: native card issuing, real bank not middleware
Unit
Card issuing + ledger + compliance built in
Very strong: widely used by gov-adjacent fintechs
Increase.com
Modern bank API, ACH + RTP + cards
Strong developer experience, honest pricing
Synctera
Fintech-designed, bank-sponsor model
Flexible on custom use cases
Stripe Treasury
Easiest integration, fastest to market
Good for MVP: thin margins, platform owns relationship


13.3 BaaS Revenue Impact Model
The BaaS drag is real. Presenting it honestly to investors is the right move, because sophisticated investors will model it anyway. The table below shows per-customer revenue under Path A versus Path B, and the cumulative revenue impact over the transition period. The drag is finite, well-understood, and fully recoverable at Series A within under 30 days.
Revenue Component
Path A (BaaS, Seed)
Path B (Own, Series A+)
Delta
SaaS ACV (blended)
$35,000
$35,000
$0
Transaction fees / customer / yr
$37,800 (0.9% net)
$63,000 (full 0.35%)
+$25,200
Float yield / customer / yr
$1,300 (shared)
$2,960–$6,600 (full)
+$3,700-$5,700
Total ARPU / customer / yr
$74,100
$100,960–$104,600
+$28,900-$30,900
At 117 customers (2027 accel.)
$8.67M ARR
$12.06M ARR
+$3.39M
At 248 customers (2028, post-migration)
$25.5M ARR (Path B)
$25.5M ARR
$0 (migrated)


Cumulative BaaS drag over the two-year seed period, with 40 customers in Year 1 and 117 in Year 2, totals approximately $4.5M in deferred revenue. Migration investment at Series A runs approximately $750K. Payback period: under 30 days at 25 customers. The investor framing is direct: Civic-Chain launches on proven BaaS infrastructure to reach the market fast. Full margin capture is a Series A milestone, funded by the ARR that will exist by then. That is a more credible story than attempting to build full payment infrastructure from scratch at seed stage.
13.4 Four-Phase National Go-to-Market
The national expansion is deliberate. Each phase proves the model, generates the reference customers required for the next phase, and builds the compliance infrastructure needed to move upmarket. Skipping phases doesn't accelerate the business; it removes the evidence base that makes each subsequent sale credible.
Phase 1: New England Beachhead (2026-2027, Seed)
PHASE 1 TARGETS
Geography: New England — Maine, New Hampshire, Vermont, Massachusetts, Rhode Island, Connecticut
Segment: Municipalities under 25,000 population
Customer target: 40 municipalities by end of Year 1 (accelerated), 117 by end of Year 2
Infrastructure: BaaS Path A (Column or Unit), USD-denominated, ACH settlement
ARR at phase end: $8.67M (accelerated) / $1.62M (base)


New England is chosen for density, not nostalgia. 1,400 municipalities in six states, networked through state municipal associations where a reference customer in one Maine town directly influences procurement decisions in three neighboring towns. The Tyler Technologies regional playbook ran exactly this way. A single state-level contract with a New England municipal league unlocks 40-80 customers simultaneously without requiring individual RFPs.
Phase 1 GTM levers are specific and sequenced. State municipal association partnerships create group procurement vehicles. A 90-day free pilot tier for towns under 2,500 population removes budget approval friction entirely, since most states' micro-procurement thresholds sit above that dollar level. Tax collection season timing maximizes early transaction fee and float revenue by onboarding municipalities before their highest-volume payment cycles. A referral program with municipal accountants and consultants reaches the people who actually advise on every software purchase.
Phase 2: National Small Town Rollout + Path B Migration (2028-2029, Series A)
PHASE 2 TARGETS
Geography: All 50 states, focus on Midwest and Southeast after New England saturation
Segment: Municipalities under 25,000 population (national), first 50 counties
Customer target: 248 municipalities by end of 2028, 428 by end of 2029
Infrastructure: Migrate to Path B (Ripple Rail, RLUSD, full interchange and float)
ARR at phase end: $44M (2029, accelerated)


Phase 2 is funded by Phase 1 ARR and the $15M Series A. The BaaS-to-Ripple Rail migration happens at the Series A close. The licensing work begins in parallel with Phase 1 deployment, so it's ready to activate the moment the Series A is in. The full float yield and interchange margin unlock immediately on migration, adding approximately $3,700 per existing customer per year with zero new sales required.
National expansion builds on the association channel established in Phase 1. A New England association partnership becomes the template for every state. The vendor marketplace adds a powerful network effect: a vendor registered in Maine appears in New Hampshire procurement without resubmitting documents. Every new municipality that joins makes the platform more valuable to every vendor already on it.
Phase 3: County and Mid-City Layer (2029-2031, Series B)
PHASE 3 TARGETS
Segments: US counties (3,069 total, target 200 by end of Phase 3), mid-sized cities 25K-500K pop. (target 50)
Customer target: 500 municipalities + 200 counties + 50 cities by 2031
Infrastructure: Full Path B, national MTL coverage (all 50 states), white-label for county governments
ARR at phase end: ~$133M (accelerated scenario, Series B stage)


Counties are an adjacent opportunity with substantially higher payment volumes, averaging $85M annually versus $18M for small towns, and the same procurement dysfunction. Many counties administer contracts on behalf of their constituent municipalities, which means a county contract can be a force multiplier for sub-county adoption. The white-label county module enables a single county administrator to manage procurement across all municipalities within their jurisdiction.
Mid-sized cities demand a different sales motion: longer cycles, more stakeholders, bigger contracts. The product architecture already handles them. The phone tap system scales to city fleet sizes. The voting module scales to larger resident populations. The public ledger is arguably more valuable to a city of 50,000 residents than a town of 2,000. The first mid-city customer is a reference sale that opens the entire tier.
Phase 4: State Contracts (2031+, Series C)
PHASE 4 TARGETS
Segment: State governments (50 total, target 5-10 contracts by 2033)
Each state contract: ~$2M SaaS ACV + $24M transaction fees + $1.1M float = ~$27M ARR per state
Five state contracts adds ~$135M ARR — equivalent to the entire small municipality book at Year 10
State contracts often obligate or strongly incentivize municipal adoption within that state


State contracts are the highest-value and longest-cycle sales in the model. A single state treasurer relationship, built on the credibility of 200-plus municipal deployments and a multi-year public ledger record, is worth more than any other sales action available at Series C. The XRPL audit trail, every transaction across every Civic-Chain municipality publicly verifiable, is a sales asset that no competitor can replicate.
The state contract narrative reframes the patent portfolio. A state government procurement officer evaluating Civic-Chain sees a platform with provisional patents on blockchain payment architecture and geolocation voter verification, 200-plus live municipal deployments, and a public ledger any state auditor can examine in real time. That is categorically different from a startup pitch. By Series C, Civic-Chain is a demonstrated infrastructure platform pursuing expansion, not an early-stage product seeking validation.
13.5 ARR Trajectory: Base vs. Accelerated, Full National Scope
Year
Total Customers
Path
SaaS ARR
Txn Fee ARR
Float ARR
Total ARR
2026
40
A (BaaS)
$1.40M
$1.51M
$52K
$2.96M
2027
117
A (BaaS)
$4.09M
$4.42M
$152K
$8.67M
2028
248
B (Own)
$8.68M
$15.62M
$1.24M
$25.5M
2029
478 incl. 50 counties
B (Own)
$20.2M
$36.4M
$1.71M
$58.3M
2030
774 incl. 100 counties
B (Own)
$32.0M
$57.6M
$2.70M
$92.3M
2031
1,130 small muni (+ 5 state contracts, upside scenario*)
B (Own)
$34.3M
$61.74M
$2.90M
$98.94M
2032
1,572 small muni (+ 8 states, upside scenario*)
B (Own)
$46.27M
$83.29M
$3.91M
$133M
2033
1,696 small muni (+ 10 states, upside scenario*)
B (Own)
$59.36M
$106.85M
$5.02M
$171M


* State and county contracts are Series B/C upside scenarios (GTM Phases 3–4) and are not included in the ARR projections above. The table above reflects the accelerated small-municipality scenario only. Adding 5 state contracts at ~$27M ARR each would contribute ~$135M additional ARR — treated as additive, not as a base-case assumption.
THE STATE CONTRACT MULTIPLIER
Each state contract (avg $27M ARR) equals 771 small municipality contracts at $35K ACV.
Five state contracts by 2031 adds $135M ARR as an upside scenario — state contracts are a Series C target (Phase 4 GTM) and are not included in the small-municipality ARR projections above.
State contracts often mandate or incentivize sub-state adoption, compressing municipal acquisition costs.
The full national model at modest penetration (10% small muni, 7% county, 4% mid-city, 10 state contracts) reaches $400M+ ARR by 2033 — but state and county contracts are Series B/C milestones. The projections table above shows small-municipality Phase 1 only; state contract upside is additive.

14. Risk Considerations and Mitigations
Risk
Description
Mitigation
Rail nesting violation
Civic-Chain inadvertently holds or moves funds through its own accounts on behalf of municipalities
Affiliate model enforced by architecture: all funds flow through municipality-owned Rail accounts. Civic-Chain never holds client funds in Civic-Chain-owned accounts. Code review and Rail compliance audit before launch.
KYB onboarding friction
Municipality KYB process takes 3 to 10 business days and requires document collection
Guided onboarding wizard in admin console. Civic-Chain manages the process on the municipality's behalf. Set expectation clearly in sales materials. Begin KYB before contract signing.
Vendor counterparty AML delay
New vendor placed in PENDING by Rail screening, delaying first payment
Onboard vendors as counterparties at contract activation, not at first payment. Build 2 to 5 business day buffer into contract setup workflow. Monitor COUNTERPARTY_STATUS webhook. Alert administrator if counterparty not cleared before payment is due.
Rail RFI on withdrawals
Rail requests additional documentation on vendor payments above threshold
WCR document uploaded to Rail withdrawal object at authorization time satisfies Rail RFI automatically. Monitor WITHDRAWAL_CHANGES_REQUESTED webhook. Design WCR workflow to always include document upload.
USD-RLUSD exchange not yet programmatic
Programmatic USD-RLUSD exchange API not confirmed available via self-service
Phase 1 operates in USD only. OTC batch conversion as Phase 2 fallback. Establish Ripple commercial terms before Phase 2 begins. Architecture requires no structural changes to switch from OTC to programmatic when available.
GPS spoofing at vote time
Rooted device with mock location app used to fake in-boundary GPS
Requires jailbroken device; blocks average voter. Android mock provider flag detected via Location.isMock(). Enrollment address verification closes residual gap. Confidence scoring flags anomalies.
NFC gaps at rural merchants
Older pump terminals do not support Apple Pay or Google Pay tap
Physical backup card with same pool and MCC locks available on request. Tap remains primary; physical is exception fallback.
RLUSD regulatory risk
Stablecoin regulatory environment continues to evolve
Ripple holds 75+ licenses. Architecture supports substituting USD or alternative stablecoins without structural rebuild.
Card pool exhausted mid-contract
Vendor underestimates fuel or materials costs
Hard-decline protects municipality. Admin-controlled refill creates mandatory accountability checkpoint.
Municipal adoption resistance
Town officials resist change from familiar processes
Civic-Chain admin handles all complexity. Officials see the dashboard, not the blockchain or Rail mechanics.
Vehicle excise / portal displacement blocked near-term by InforME state contract
NIC Maine’s Rapid Renewal vehicle registration service requires BMV database access held under InforME’s state master contract. Civic-Chain cannot displace this near-term. Permitting/licensing portal displacement (Phase 2) and liquor excise (Phase 3a) are independent of this constraint.
Explicitly deferred to Phase 3b (Series C+). Go-to-market sequencing avoids this constraint entirely in Phases 1 and 2. Use Rapid Renewal fee data as a sales conversation anchor (Town Manager intuition transfer) without claiming replacement capability.
Low citizen voter turnout
Low participation undermines vote legitimacy
Configurable quorum requirements. Advisory-only mode. Push notifications and communication integrations.



15. Conclusion
Civic-Chain is a category-defining platform for a market that enterprise govtech has underserved for decades. The combination of citizen voting with layered geolocation verification, MCC-locked phone tap spend control, blockchain-immutable public accountability, and Rail-powered municipal money movement creates something that genuinely hasn't existed before: a procurement platform where every dollar can be traced from the municipal bank account to the merchant terminal in real time, where that trace is publicly verifiable by any citizen or auditor on a blockchain no one can alter, and where the people who actually experience the service have a direct voice in choosing who provides it.
The development work on this white paper produced a more honest and defensible architecture than the starting point. Rail's nesting prohibition, surfaced in the developer documentation, forced a structural correction that turned out to be an improvement. Municipalities hold their own funds in their own Rail accounts. Civic-Chain manages those accounts via the affiliate model API. Rail's compliance infrastructure handles AML and OFAC screening on every municipality and vendor automatically. The WCR document workflow satisfies Rail's withdrawal RFI requirement in the same step that satisfies Civic-Chain's internal governance. Webhook events drive real-time dashboards without polling. EDD handles contract disputes without disrupting service. These aren't workarounds. They're the platform working as designed.
The business model is equally clarified by this process. Civic-Chain is a SaaS platform that includes payment infrastructure as a feature enabling the accountability story. The annual SaaS contract, priced against the value delivered in procurement efficiency and labor savings, is the primary and most defensible revenue stream. Card interchange and float yield compound with scale as incremental revenue. The Millbrook case study shows $32,293 in net annual savings against an $8,400 platform fee. That's the conversation to have with a town manager, not one about basis points on ACH transfers.
For the engineering team: the first action before writing any application code is establishing the Rail commercial relationship and confirming the USD-RLUSD exchange path and terms. Phase 1 operates in USD on Rail and delivers full platform value without RLUSD. The Rail KYB onboarding workflow, the webhook event processor, and the card authorization webhook service are the three highest-priority new components and should be designed from day one. The goal throughout is a product that a town manager in rural Maine can use on Day 1 without understanding any of the underlying infrastructure, and that lets a citizen in that same town see on their phone exactly how much diesel went into the truck that cleared their road this morning.



Civic-Chain, Proprietary and Confidential
This document contains information protected by provisional patent filings and trade secret law. Distribution requires written authorization.
