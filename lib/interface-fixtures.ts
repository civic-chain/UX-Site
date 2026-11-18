import type {
  CardTransaction,
  ContractSnapshot,
  DemoCredential,
  InterfaceMetric,
  InterfaceNavItem,
  LedgerTransaction,
  PaymentCard,
  StatusBadgeItem,
  TableColumn,
  TableRow,
  VoteProposal,
} from "@/lib/interface-types";

export const interfaceRouteMeta = {
  admin: {
    eyebrow: "Admin Console",
    title: "Municipality Administrative Portal",
    subtitle: "Town of Any Town, Maine",
    signInLabel: "Sign In to Admin Console",
    signedInLabel: "Town of Any Town, Maine | Municipal Treasury Account",
  },
  vendor: {
    eyebrow: "Vendor Portal",
    title: "Contractor Access | Town of Any Town, Maine",
    subtitle: "Morrison Landscaping & Plowing LLC",
    signInLabel: "Sign In to Vendor Portal",
    signedInLabel: "Morrison Landscaping and Plowing LLC | Active engagements with Town of Any Town",
  },
  citizen: {
    eyebrow: "Public Ledger",
    title: "Town of Any Town, Maine | Open Government Transparency Platform",
    subtitle: "Open Government Transparency Platform",
    signInLabel: "",
    signedInLabel: "Transparent Municipal Services",
  },
} as const;

export const adminCredentials = [
  {
    label: "Town Manager",
    identifierLabel: "Email Address",
    identifier: "admin@anytown.gov",
    password: "admin123",
  },
  {
    label: "Finance Director",
    identifierLabel: "Email Address",
    identifier: "finance@anytown.gov",
    password: "finance123",
  },
] as const satisfies readonly DemoCredential[];

export const vendorCredentials = [
  {
    label: "Company EIN",
    identifierLabel: "Federal EIN",
    identifier: "04-1234567",
    password: "demo123",
  },
] as const satisfies readonly DemoCredential[];

export const adminNav = [
  { id: "wizard", label: "Onboarding", icon: "task", href: "/wizard" },
  { id: "overview", label: "Overview", icon: "overview", href: "#overview" },
  { id: "solicitations", label: "Solicitations", icon: "solicitations", href: "#solicitations" },
  { id: "contracts", label: "Contracts", icon: "contracts", href: "#contracts" },
  { id: "cards", label: "Card Monitor", icon: "cards", href: "#cards" },
  { id: "refill", label: "Refill Queue", icon: "payment", href: "#refill", badge: "1" },
  { id: "payment-auth", label: "Payment Auth", icon: "shield", href: "#payment-auth" },
  { id: "reports", label: "Reports", icon: "reports", href: "#reports" },
  { id: "settings", label: "Settings", icon: "settings", href: "#settings" },
] as const satisfies readonly InterfaceNavItem[];

export const vendorNav = [
  { id: "contracts", label: "My Contracts", icon: "contracts", href: "#contracts" },
  { id: "cards", label: "My Cards", icon: "cards", href: "#cards" },
  { id: "submit-wcr", label: "Submit WCR", icon: "upload", href: "#submit-wcr" },
  { id: "payment-history", label: "Payment History", icon: "payment", href: "#payment-history" },
  { id: "request-refill", label: "Request Refill", icon: "wallet", href: "#request-refill" },
] as const satisfies readonly InterfaceNavItem[];

export const citizenOverviewMetrics = [
  { label: "Last updated", value: "March 13, 2026 · 4:37 PM ET" },
  { label: "Active Vote", value: "1 open solicitation", tone: "info" },
  { label: "Active Contracts", value: "4 live municipal records" },
  { label: "Blockchain Ledger", value: "20 recent anchors" },
] as const satisfies readonly InterfaceMetric[];

export const adminOverviewMetrics = [
  {
    label: "MTA Balance",
    value: "$487,250",
    detail: "MTA-2026-HPW-001 · Ledger Rail Account",
  },
  {
    label: "Allocated",
    value: "$230,900",
    detail: "Card pools, residuals, and reserve holds",
  },
  {
    label: "Unallocated",
    value: "$256,350",
    detail: "Immediately available municipal treasury balance",
  },
  {
    label: "Card Pool Total",
    value: "$59,031",
    detail: "Across 4 contracts · Apple Pay & Google Pay",
  },
] as const satisfies readonly InterfaceMetric[];

export const adminActionMetrics = [
  {
    label: "Active Contracts",
    value: "4 live records",
    detail: "1 needs refill · 1 solicitation under review",
  },
  {
    label: "Pending Actions",
    value: "2 items",
    detail: "1 refill request · 1 WCR awaiting review",
    tone: "warning",
  },
] as const satisfies readonly InterfaceMetric[];

export const adminPipelineStages = [
  "Draft",
  "Published",
  "Under Review",
  "Voting Open",
  "Awarded",
  "Active",
  "Completed",
  "Disputed",
] as const;

export const adminPipelineFocus = {
  crn: "CRN-2026-SPS-0055",
  title: "Summer Public Safety / Security Patrol Coverage",
  budget: "$18,000 – $28,000",
  proposals: "3 received",
  votingOpens: "Mar 20, 2026",
  votingCloses: "Mar 27, 2026",
  quorum: "150 votes required",
};

export const adminVotingMonitor = {
  opens: "Opens Mar 20, 2026",
  ballotsCast: "0 of 150 quorum",
  confidence: "High / Medium / Low breakdown available when voting opens",
  timeRemaining: "7 days",
  closes: "Closes Mar 27, 2026",
};

export const adminContractsColumns = [
  { key: "crn", label: "CRN" },
  { key: "title", label: "Contract Title" },
  { key: "vendor", label: "Vendor" },
  { key: "total", label: "Total Value", align: "right" },
  { key: "cardPool", label: "Card Pool", align: "right" },
  { key: "residual", label: "Residual", align: "right" },
  { key: "reserve", label: "Reserve", align: "right" },
  { key: "status", label: "Status" },
] as const satisfies readonly TableColumn[];

export const adminContractsRows = [
  {
    id: "PLW-0042",
    crn: "CRN-2026-PLW-0042",
    title: "Snow and Ice Removal (Northern Route A)",
    vendor: "Morrison Landscaping & Plowing LLC",
    total: "$48,000",
    cardPool: "$18,000",
    residual: "$27,600",
    reserve: "$2,400",
    status: "Active",
  },
  {
    id: "PWK-0033",
    crn: "CRN-2026-PWK-0033",
    title: "General Public Works, Parks and Grounds",
    vendor: "GreenWorks Maine LLC",
    total: "$31,000",
    cardPool: "$5,200",
    residual: "$24,250",
    reserve: "$1,550",
    status: "Needs Refill",
  },
  {
    id: "RDS-0041",
    crn: "CRN-2026-RDS-0041",
    title: "Route 123 Pavement Crack Sealing",
    vendor: "Coastal Road Services LLC",
    total: "$17,200",
    cardPool: "$13,760",
    residual: "$3,440",
    reserve: "$0",
    status: "Completed",
  },
  {
    id: "HBR-0028",
    crn: "CRN-2026-HBR-0028",
    title: "Any Town Dock Bulkhead Repairs",
    vendor: "Casco Marine Works",
    total: "$134,700",
    cardPool: "$22,071",
    residual: "$106,894",
    reserve: "$5,735",
    status: "Active",
  },
] as const satisfies readonly TableRow[];

export const adminCardActivity = [
  {
    id: "TX-001",
    merchant: "Any Town Equipment Rental",
    context: "Driver Card · Mar 12, 8:34 AM",
    amount: "$3,200.00",
    status: "Approved",
    statusTone: "success",
  },
  {
    id: "TX-002",
    merchant: "Irving Oil, Bath ME",
    context: "Fuel Card · Mar 12, 11:52 AM",
    amount: "$847.20",
    status: "Approved",
    statusTone: "success",
  },
  {
    id: "TX-003",
    merchant: "Maine Pavement Supply Co.",
    context: "Company Card · Mar 12, 3:15 PM",
    amount: "$5,167.30",
    status: "Approved",
    statusTone: "success",
  },
  {
    id: "TX-004",
    merchant: "Route 1 Diner",
    context: "Driver Card · Mar 13, 12:08 PM",
    amount: "$43.90",
    status: "Declined · MCC lock",
    statusTone: "danger",
  },
] as const satisfies readonly CardTransaction[];

export const adminRefillBadges = [
  { label: "Pending Review", tone: "warning" },
  { label: "Card Pool Usage: 64%", tone: "info" },
] as const satisfies readonly StatusBadgeItem[];

export const adminRefillRequest = {
  contractTitle: "CRN-2026-PWK-0033: General Public Works, Parks and Grounds",
  details: [
    { id: "balance", label: "Current Balance", value: "$1,850.00" },
    { id: "burn-rate", label: "Burn Rate", value: "$850 / week" },
    { id: "runway", label: "Weeks Remaining", value: "~2.2 weeks" },
    { id: "requested", label: "Requested Amount", value: "$3,500.00" },
  ],
  reason:
    "Unexpected additional mulch material required for 3 park locations following storm damage. Original material allocation did not account for post-storm debris removal at Mitchell Field, Any Town Community School grounds, and Stover's Point Preserve.",
  statusLabel: "Pending review · static demo state",
  statusTone: "warning",
  dialogTitle: "CRN-2026-PWK-0033 · Service Agreement Record",
  dialogDescription:
    "Preserved demo snapshot: parks and grounds contract with active refill request, MCC authorization list, and municipal reserve rules.",
} as const;

export const adminPaymentBadges = [
  { label: "1 Pending", tone: "warning" },
  { label: "Awaiting Admin Review", tone: "info" },
] as const satisfies readonly StatusBadgeItem[];

export const vendorContract = {
  crn: "CRN-2026-PLW-0042",
  title: "Snow and Ice Removal (Northern Route A)",
  total: 48000,
  cardPoolAllocated: 18000,
  cardPoolBalance: 11847.32,
  residual: 27600,
  reserve: 2400,
  status: "Active",
  statusTone: "success",
  sarHash: "B7F4A2E1…9B2A6E5C",
} as const satisfies ContractSnapshot;

export const vendorContractMeta = [
  { label: "Contract Start", value: "Jan 15, 2026" },
  { label: "Contract End", value: "Apr 30, 2026" },
  { label: "Progress", value: "Week 10 of 16" },
  { label: "Municipality", value: "Town of Any Town" },
] as const;

export const vendorSchedule = [
  { label: "Week 9 Residual", value: "$4,600.00 · Paid Mar 7", tone: "success" },
  { label: "Week 10 Residual (WCR Pending)", value: "$4,600.00 · Awaiting Review", tone: "warning" },
  { label: "Reserve Hold", value: "$2,400.00 · Released at Completion", tone: "info" },
] as const;

export const vendorMccLocks = [
  "MCC 5541 · Service Stations / Fuel",
  "MCC 5542 · Automated Fuel Dispensers",
  "MCC 5533 · Automotive Parts Stores",
  "MCC 7538 · Auto Service / Repair",
] as const;

export const vendorCards = [
  {
    id: "tier1-company",
    tier: "Tier 1: Company Card",
    name: "Company Card (Tier 1)",
    suffix: "4821",
    available: "$3,200",
    dailyLimit: "$2,000.00",
    lastTransaction: "$127.50 on Mar 13",
    merchant: "NAPA Auto Parts",
    locks: ["5541", "5542", "5533", "7538"],
  },
  {
    id: "tier2-driver-a",
    tier: "Tier 2: Individual / Driver Cards",
    name: "Driver Card A",
    suffix: "2196",
    available: "$2,180",
    dailyLimit: "$850.00",
    lastTransaction: "$87.20 on Mar 13",
    merchant: "Irving Oil, Bath ME",
    locks: ["5541", "5542"],
  },
  {
    id: "tier3-equipment",
    tier: "Tier 3: Equipment Cards",
    name: "Equipment Card",
    suffix: "7053",
    available: "$4,930",
    dailyLimit: "$1,500.00",
    lastTransaction: "$640.00 on Mar 12",
    merchant: "Any Town Equipment Rental",
    locks: ["5533", "7538"],
  },
] as const satisfies readonly PaymentCard[];

export const vendorTransactions = [
  {
    id: "vendor-tx-1",
    merchant: "NAPA Auto Parts",
    context: "Mar 13 · Tier 1 Company Card",
    amount: "$127.50",
    status: "Approved",
    statusTone: "success",
  },
  {
    id: "vendor-tx-2",
    merchant: "Irving Oil, Bath ME",
    context: "Mar 13 · Driver Card A",
    amount: "$87.20",
    status: "Approved",
    statusTone: "success",
  },
  {
    id: "vendor-tx-3",
    merchant: "Route 1 Diner",
    context: "Mar 13 · Driver Card B",
    amount: "$43.90",
    status: "Declined · MCC lock",
    statusTone: "danger",
  },
  {
    id: "vendor-tx-4",
    merchant: "Any Town Equipment Rental",
    context: "Mar 12 · Equipment Card",
    amount: "$640.00",
    status: "Approved",
    statusTone: "success",
  },
] as const satisfies readonly CardTransaction[];

export const vendorPendingWcrBadges = [
  { label: "Pending", tone: "warning" },
  { label: "Ledger Settlement", tone: "info" },
] as const satisfies readonly StatusBadgeItem[];

export const vendorPaymentHistoryColumns = [
  { key: "label", label: "Payment" },
  { key: "date", label: "Date" },
  { key: "amount", label: "Amount", align: "right" },
  { key: "status", label: "Status" },
] as const satisfies readonly TableColumn[];

export const vendorPaymentHistoryRows = [
  {
    id: "pay-1",
    label: "Week 9 Residual",
    date: "Mar 7, 2026",
    amount: "$4,600.00",
    status: "Paid",
  },
  {
    id: "pay-2",
    label: "Card Pool Load",
    date: "Jan 15, 2026",
    amount: "$18,000.00",
    status: "Completed",
  },
  {
    id: "pay-3",
    label: "Week 8 Residual",
    date: "Feb 28, 2026",
    amount: "$4,600.00",
    status: "Paid",
  },
  {
    id: "pay-4",
    label: "Week 10 Residual",
    date: "Pending Review",
    amount: "$4,600.00",
    status: "Awaiting Review",
  },
] as const satisfies readonly TableRow[];

export const citizenContracts = [
  {
    crn: "CRN-2026-PLW-0042",
    title: "Snow and Ice Removal (Northern Route A)",
    vendor: "Morrison Landscaping & Plowing LLC",
    total: 48000,
    cardPoolAllocated: 18000,
    cardPoolBalance: 11847.32,
    reserve: 2400,
    status: "Active",
    statusTone: "success",
    sarHash: "B7F4A2E1…9B2A6E5C",
    lastTransaction: "Mar 13, 12:09 PM · $127.50 at NAPA Auto Parts",
    burnRate: "$184/day burn rate",
  },
  {
    crn: "CRN-2026-RDS-0041",
    title: "Route 123 Pavement Crack Sealing",
    vendor: "Coastal Road Services LLC",
    total: 17200,
    cardPoolAllocated: 13760,
    cardPoolBalance: 545.5,
    reserve: 0,
    status: "Completed",
    statusTone: "info",
    sarHash: "CC8D20AB…43FA2190",
    lastTransaction: "Mar 4, 4:18 PM · $5,167.30 at Maine Pavement Supply Co.",
    burnRate: "Pool settled and returned to treasury",
  },
  {
    crn: "CRN-2026-HBR-0028",
    title: "Any Town Dock Bulkhead Repairs",
    vendor: "Casco Marine Works",
    total: 134700,
    cardPoolAllocated: 22071,
    cardPoolBalance: 14482.61,
    reserve: 5735,
    status: "Active",
    statusTone: "success",
    sarHash: "AF20E0C4…3D7A5A19",
    lastTransaction: "Mar 12, 9:42 AM · $1,430.00 at Casco Marine Supply",
    burnRate: "$241/day burn rate",
  },
  {
    crn: "CRN-2026-PWK-0033",
    title: "General Public Works, Parks and Grounds",
    vendor: "GreenWorks Maine LLC",
    total: 31000,
    cardPoolAllocated: 5200,
    cardPoolBalance: 1850,
    reserve: 1550,
    status: "Needs Refill",
    statusTone: "warning",
    sarHash: "F3029D11…50ABCC12",
    lastTransaction: "Mar 12, 2:11 PM · $850.00 at Mitchell Field Nursery",
    burnRate: "$850/week burn rate",
  },
] as const satisfies readonly ContractSnapshot[];

export const citizenSolicitation = {
  crn: "CRN-2026-SPS-0055",
  title: "Summer Public Safety / Security Patrol Coverage",
  budget: "$18,000 – $28,000",
  votingWindow: "Mar 20–27, 2026",
  proposals: "3 submitted",
  status: "Open for Review",
  body:
    "Provides security patrol coverage across town parks, beaches, and public facilities for the summer season. Includes foot and vehicle patrol, event coverage at Any Town Dock, and coordination with Cumberland County Sheriff's Department.",
};

export const citizenProposalOptions = [
  {
    id: "proposal-a",
    label: "Proposal A",
    bid: "$19,800",
    timeline: "Memorial Day through Labor Day · 7 days/week coverage",
    personnel: "6 patrol officers + 2 event supervisors",
    equipment: "2 marked SUVs, 1 all-terrain response cart",
    notes: "Strong event-response plan and dock coverage schedule.",
  },
  {
    id: "proposal-b",
    label: "Proposal B",
    bid: "$21,400",
    timeline: "Memorial Day through Labor Day · Expanded holiday staffing",
    personnel: "7 patrol officers + 1 dispatch coordinator",
    equipment: "3 patrol vehicles, beach foot patrol kit, radios",
    notes: "Highest staffing level; strongest late-night coverage plan.",
  },
  {
    id: "proposal-c",
    label: "Proposal C",
    bid: "$18,950",
    timeline: "Memorial Day through Labor Day · Core seasonal coverage",
    personnel: "5 patrol officers + rotating event detail",
    equipment: "2 patrol vehicles, 1 drone-ready observation unit",
    notes: "Lowest bid with lighter event staffing assumptions.",
  },
] as const satisfies readonly VoteProposal[];

export const citizenLedgerRows = [
  {
    id: "ledger-20",
    hash: "6FA9B3C8…2390B1E0",
    crn: "CRN-2026-PLW-0042",
    type: "Card Pool Spend",
    amount: "$127.50",
    timestamp: "2026-03-13 12:09 PM",
  },
  {
    id: "ledger-19",
    hash: "4E21A99B…D7710220",
    crn: "CRN-2026-PWK-0033",
    type: "Refill Request",
    amount: "$3,500.00",
    timestamp: "2026-03-12 02:26 PM",
  },
  {
    id: "ledger-18",
    hash: "A2F0C01D…30A2CC92",
    crn: "CRN-2026-HBR-0028",
    type: "Card Pool Spend",
    amount: "$1,430.00",
    timestamp: "2026-03-12 09:42 AM",
  },
  {
    id: "ledger-17",
    hash: "C8FD20AA…72BC2208",
    crn: "CRN-2026-PLW-0042",
    type: "Card Pool Spend",
    amount: "$87.20",
    timestamp: "2026-03-12 08:55 AM",
  },
  {
    id: "ledger-16",
    hash: "39AC6721…8AF39017",
    crn: "CRN-2026-SPS-0055",
    type: "Proposal Anchor",
    amount: "$0.00",
    timestamp: "2026-03-11 04:11 PM",
  },
  {
    id: "ledger-15",
    hash: "11EF3802…F2198AA0",
    crn: "CRN-2026-HBR-0028",
    type: "Card Pool Spend",
    amount: "$2,118.00",
    timestamp: "2026-03-10 11:06 AM",
  },
  {
    id: "ledger-14",
    hash: "17BC0021…9910FC20",
    crn: "CRN-2026-PLW-0042",
    type: "Residual Payment",
    amount: "$4,600.00",
    timestamp: "2026-03-07 03:18 PM",
  },
  {
    id: "ledger-13",
    hash: "720A18C2…6000DA11",
    crn: "CRN-2026-RDS-0041",
    type: "Residual Payment",
    amount: "$3,440.00",
    timestamp: "2026-03-04 04:22 PM",
  },
  {
    id: "ledger-12",
    hash: "99EB2102…C11FFAA0",
    crn: "CRN-2026-RDS-0041",
    type: "Card Pool Return",
    amount: "$545.50",
    timestamp: "2026-03-04 04:25 PM",
  },
  {
    id: "ledger-11",
    hash: "8A0021FD…BBEE9100",
    crn: "CRN-2026-RDS-0041",
    type: "Card Pool Spend",
    amount: "$5,167.30",
    timestamp: "2026-03-04 02:18 PM",
  },
] as const satisfies readonly LedgerTransaction[];

export const citizenLedgerOverflowRows = [
  {
    id: "ledger-10",
    hash: "90DA100E…009ABC12",
    crn: "CRN-2026-RDS-0041",
    type: "Card Pool Spend",
    amount: "$847.20",
    timestamp: "2026-03-03 11:52 AM",
  },
  {
    id: "ledger-09",
    hash: "19BBA02E…8D220AC1",
    crn: "CRN-2026-RDS-0041",
    type: "Card Pool Spend",
    amount: "$3,200.00",
    timestamp: "2026-03-03 08:34 AM",
  },
  {
    id: "ledger-08",
    hash: "2C0029A0…123ABFD0",
    crn: "CRN-2026-RDS-0041",
    type: "Card Pool Funding",
    amount: "$13,760.00",
    timestamp: "2026-03-01 09:12 AM",
  },
  {
    id: "ledger-07",
    hash: "1200AA38…1D90E552",
    crn: "CRN-2026-RDS-0041",
    type: "Contract Anchor",
    amount: "$17,200.00",
    timestamp: "2026-03-01 08:58 AM",
  },
  {
    id: "ledger-06",
    hash: "E192A03C…0EEA4900",
    crn: "CRN-2026-HBR-0028",
    type: "Card Pool Funding",
    amount: "$22,071.00",
    timestamp: "2026-02-28 02:09 PM",
  },
  {
    id: "ledger-05",
    hash: "A91C0020…72FF10A2",
    crn: "CRN-2026-PLW-0042",
    type: "Card Pool Funding",
    amount: "$18,000.00",
    timestamp: "2026-01-15 09:33 AM",
  },
  {
    id: "ledger-04",
    hash: "B00322A0…710DC114",
    crn: "CRN-2026-PLW-0042",
    type: "Contract Anchor",
    amount: "$48,000.00",
    timestamp: "2026-01-15 09:11 AM",
  },
  {
    id: "ledger-03",
    hash: "C11FD002…81ACE290",
    crn: "CRN-2026-HBR-0028",
    type: "Contract Anchor",
    amount: "$134,700.00",
    timestamp: "2026-01-09 04:14 PM",
  },
  {
    id: "ledger-02",
    hash: "FAD32009…AB1100D2",
    crn: "CRN-2026-PWK-0033",
    type: "Contract Anchor",
    amount: "$31,000.00",
    timestamp: "2026-01-08 12:06 PM",
  },
  {
    id: "ledger-01",
    hash: "2EFA9001…001A8C77",
    crn: "CRN-2026-SPS-0055",
    type: "Solicitation Anchor",
    amount: "$0.00",
    timestamp: "2026-01-04 03:39 PM",
  },
] as const satisfies readonly LedgerTransaction[];
