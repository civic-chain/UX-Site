// The console served at /civic-chain-demo.
//
// The one console in this directory: a prologue that asks who you are,
// navigation and data gated per role, a guided walkthrough, the AP workbench,
// and "Any Town, USA" rather than a named town.
//
// It serves two routes. /civic-chain-demo runs it standalone, driving itself
// from its own state. /civic-chain-demo/live hands it an initialState and wraps
// it in the director, whose timelines push pages and data into it through the
// overlay (see useDemoOverlay). An earlier presenter-only console lived beside
// this file as demo-console.tsx; it was removed once no route rendered it.
"use client";

import { createContext, useContext, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore, type Dispatch, type SetStateAction } from "react";

import Image from "next/image";

import { BrandRasterImage } from "@/components/ui/brand-raster-image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { HeadlineDot } from "@/components/ui/headline-dot";
import { Icon, type IconName } from "@/components/ui/icon";
import { IconChip } from "@/components/ui/icon-chip";
import { InputGroupTextarea } from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SurfaceCard } from "@/components/ui/surface-card";
import { Table, TableCell, TableHead } from "@/components/ui/table";
import { Tabs as UiTabs, type TabItem } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useDemoOverlay } from "./director/store";
import type { DemoQueryState } from "./demo-types";

type PageKey =
  | "overview"
  | "board"
  | "ledger"
  | "query"
  | "verify"
  | "anomalies"
  | "budget"
  | "vendors"
  | "dept"
  | "contracts"
  | "admin"
  | "public"
  | "report"
  | "audit";
type NavGroupId = "oversight" | "records" | "govern";
type Tone = "spike" | "pending" | "ok" | "anchored" | "info" | "neutral";
type AdminTab = "governance" | "users" | "conn" | "rules";
type Transaction = {
  id: string;
  date: string;
  vendor: string;
  category: string;
  dept: string;
  amount: number;
  anchor: "anchored" | "pending";
  anomaly: null | "SPIKE" | "DUPLICATE" | "OUTLIER" | "SUSPICIOUS_MCC";
  mcc: number;
  sha256: string;
  fingerprint: string;
  ledgerTx: string;
  block: number;
  ts: string;
};
type VendorSummary = {
  vendor: string;
  category: string;
  txns: number;
  total: number;
  lastPaid: string;
  anomalies: number;
  anchor: "anchored" | "pending";
};
type ClosedPeriod = {
  monthKey: string;
  closedAt: string;
  closedBy: string;
  records: number;
  ledgerTx: string;
};

const pages = [
  // Oversight — watch the money
  { key: "overview", icon: "metric", label: "Overview", group: "oversight" },
  { key: "board", icon: "note", label: "Board View", group: "oversight" },
  { key: "budget", icon: "funding", label: "Budget Analytics", group: "oversight" },
  { key: "dept", icon: "citizen", label: "Department Analysis", group: "oversight" },
  { key: "vendors", icon: "vendor", label: "Vendor Intelligence", group: "oversight" },
  { key: "anomalies", icon: "flash", label: "Anomaly Center", group: "oversight" },
  // Records & Proof — prove the record
  { key: "ledger", icon: "payments", label: "Payments", group: "records" },
  { key: "query", icon: "search", label: "Query Terminal", group: "records" },
  { key: "verify", icon: "link", label: "Record Integrity", group: "records" },
  { key: "audit", icon: "trust", label: "Auditor Workspace", group: "records" },
  { key: "contracts", icon: "record", label: "Contracts", group: "records" },
  // Govern & Publish — control and share
  { key: "admin", icon: "admin", label: "Administration", group: "govern" },
  { key: "public", icon: "globe", label: "Public Budget", group: "govern" },
  { key: "report", icon: "note", label: "Select Board Packet", group: "govern" },
] as const satisfies readonly { key: PageKey; icon: IconName; label: string; group: NavGroupId }[];

const navGroups = [
  { id: "oversight", label: "Oversight" },
  { id: "records", label: "Records & Proof" },
  { id: "govern", label: "Govern & Publish" },
] as const satisfies readonly { id: NavGroupId; label: string }[];

// Role-aware views: one product, several front doors. Each role sees only the
// sections relevant to its job; "finance" is the full analyst console (default).
type ViewRole = "finance" | "manager" | "ap" | "auditor" | "it" | "public" | "resident";

const roleViews: Record<ViewRole, { label: string; home: PageKey; pages: "all" | readonly PageKey[] }> = {
  finance: { label: "Finance Director", home: "overview", pages: "all" },
  manager: { label: "Town Manager", home: "board", pages: ["board", "overview", "dept", "query", "report", "public"] },
  ap: { label: "Accounts Payable", home: "ledger", pages: ["ledger", "anomalies", "vendors", "budget"] },
  auditor: { label: "External Auditor", home: "audit", pages: ["audit", "verify", "query", "ledger", "contracts", "anomalies", "admin"] },
  it: { label: "IT / Records", home: "admin", pages: ["admin", "ledger", "query"] },
  public: { label: "Select Board member", home: "board", pages: ["board", "public", "ledger", "query", "report"] },
  // A resident is not a committee member. The public role above sits on an
  // oversight body and reaches the Query Terminal and the board packet; a
  // resident gets the three surfaces the town publishes and nothing else.
  resident: { label: "Resident", home: "public", pages: ["public", "ledger", "verify"] },
};

// What the sidebar says about the seat you are sitting in. It used to read
// "Admin Console / Finance Department" for everyone, a resident included.
const roleSeat: Record<ViewRole, { console: string; blurb: string }> = {
  finance: { console: "Admin Console", blurb: "Every page. You can edit records and close the month." },
  manager: { console: "Town Console", blurb: "Where the town stands, and the monthly packet for the board." },
  ap: { console: "Admin Console", blurb: "Payments, flags and vendors. You can recode, attach invoices and resolve flags." },
  auditor: { console: "Audit Access", blurb: "Read-only. Pull a sample, trace it to its source, test the record." },
  it: { console: "Admin Console", blurb: "Users, data connections and settings, plus the payment record." },
  public: { console: "Board Portal", blurb: "The plain-English summary, the packet, and the payments behind both." },
  resident: { console: "Public Portal", blurb: "What the town publishes: the budget, every payment, and a way to check them." },
};

const viewRoleOrder = ["finance", "manager", "ap", "auditor", "it", "public", "resident"] as const satisfies readonly ViewRole[];

// Who the audit trail credits for an action. Reading this from the active role
// is the whole point: a hardcoded actor recorded the wrong person for every
// edit, which is the worst detail to get wrong in a chain-of-custody product.
const roleActor: Record<ViewRole, string> = {
  finance: "You · Finance Director",
  manager: "You · Town Manager",
  ap: "You · Accounts Payable",
  auditor: "You · External Auditor",
  it: "You · IT / Records",
  public: "You · Select Board member",
  resident: "You · Resident",
};

// Roles allowed to change a record. The auditor is read-only by definition, and
// the manager and the public sit outside the accounting workflow entirely.
const canWriteRoles: readonly ViewRole[] = ["finance", "ap"];

// Only an authorized signer may close a period and anchor it. This is the
// irreversible action in the product, so it is gated separately from ordinary
// write access rather than being left open to whoever reaches the page.
const canClosePeriodRoles: readonly ViewRole[] = ["finance"];

// The prologue. A prospect used to land on 14 pages, 6 personas and a 66-row
// ledger with no statement of what any of it was, so the premise had to be
// reverse-engineered from the UI. The welcome screen asks who they are, then
// walks them through the two or three things that role would actually open.
//
// Five roles are pitched here, not all seven. Accounts Payable and IT / Records
// stay in the "Viewing as" switcher because they are real seats in the product,
// but neither signs a contract, so neither belongs on a welcome screen.
const prologueRoles = [
  { role: "finance", title: "Finance Director", icon: "metric", blurb: "Spot what looks wrong early, and see which departments will overspend by June." },
  { role: "manager", title: "Town Manager", icon: "note", blurb: "Turn the month's numbers into a board report without retyping anything." },
  { role: "public", title: "Select Board member", icon: "citizen", blurb: "Read where the town stands in plain English, then open the payments behind it." },
  { role: "auditor", title: "External Auditor", icon: "trust", blurb: "Pick any payment, follow it back to its source, and prove nobody changed it later." },
  { role: "resident", title: "Resident", icon: "globe", blurb: "See every payment the town made, and check any one of them yourself." },
] as const satisfies readonly { role: ViewRole; title: string; icon: IconName; blurb: string }[];

// A step names a target id. It never names a CSS selector and nothing here ever
// queries the DOM: TourSpot wraps whatever carries the id and Radix measures the
// trigger, so no coordinate is ever computed in this file (which the inline-style
// lint would reject anyway). "click" advances when the viewer clicks the target;
// "look" points at something that has just appeared and advances from the bar.
type TourStep = {
  target: string;
  kind: "click" | "look";
  // Where the target lives. A nav step has none, because the sidebar is on
  // every page. Used to notice that the viewer has wandered off the step, which
  // they are free to do, and to offer them the way back.
  page?: PageKey;
  title: string;
  body: string;
};

// What the viewer is left holding. Named for the specific thing they just did,
// because "you completed the walkthrough" is not something anyone repeats to a
// colleague afterwards.
type TourOutro = {
  title: string;
  body: string;
  artifact?: { label: string; run: () => void };
};

// Data-feed health lives in the Administration > Data Connections panel, the
// one surface whose audience can do something about a broken feed.
type FeedStatus = "Connected" | "Error" | "Syncing";
type Feed = { name: string; role: string; status: FeedStatus; lastSync: string; records: number };

// Feeds are named by the role they play, not by supplier. Naming a real vendor
// in a demo implies a certified production integration the buyer can check.
const feedSeed: Feed[] = [
  { name: "Bank Aggregator", role: "Treasury feed", status: "Connected", lastSync: "2026-03-31 06:02", records: 9 },
  { name: "Card Processor", role: "P-card feed", status: "Connected", lastSync: "2026-03-31 06:05", records: 6 },
  { name: "Traditional ERP System", role: "ERP", status: "Error", lastSync: "2026-03-29 06:00", records: 0 },
];

const data = {
  kpis: {
    approved: 11_485_000,
    actual: 8_549_000,
    encumbered: 529_000,
    remaining: 2_407_000,
    utilized: 74,
    yoy: 6,
  },
  // Municipal fiscal years commonly run July 1 to June 30, so "as of March" is
  // month 9 of 12. Every elapsed-time calculation in this file reads FY_ELAPSED
  // below; these nine points and the budget line are built to agree with it.
  months: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
  trend: {
    actual: [0.9, 1.8, 2.7, 3.6, 4.6, 5.6, 6.6, 7.5, 8.5],
    budget: [1.0, 1.9, 2.9, 3.8, 4.8, 5.7, 6.7, 7.7, 8.6],
  },
  // Exactly three departments project more than 2% over budget (Road
  // Improvement, Health & General Assistance, Public Works). The intro story
  // says "three", so keep any edit here on the same side of that line; Harbor &
  // Waterfront sits at a projected 100% on purpose so it reads as Watch.
  departments: [
    { name: "General Government & Administration", fund: "General Fund", budget: 1_150_000, spent: 812_000, enc: 46_000 },
    { name: "Police Department", fund: "General Fund", budget: 1_850_000, spent: 1_358_000, enc: 72_000 },
    { name: "Fire & Rescue / EMS", fund: "General Fund", budget: 1_250_000, spent: 930_000, enc: 58_000 },
    { name: "Public Works", fund: "General Fund", budget: 2_100_000, spent: 1_616_000, enc: 120_000 },
    { name: "Parks & Recreation", fund: "General Fund", budget: 620_000, spent: 441_000, enc: 18_000 },
    { name: "Public Library", fund: "General Fund", budget: 410_000, spent: 300_000, enc: 9_000 },
    { name: "Code Enforcement & Planning", fund: "General Fund", budget: 340_000, spent: 238_000, enc: 7_000 },
    { name: "Harbor & Waterfront", fund: "General Fund", budget: 280_000, spent: 210_000, enc: 11_000 },
    { name: "Health & General Assistance", fund: "General Fund", budget: 215_000, spent: 171_000, enc: 4_000 },
    { name: "Debt Service", fund: "General Fund", budget: 1_400_000, spent: 1_050_000, enc: 0 },
    { name: "Road Improvement Program", fund: "Special Revenue", budget: 520_000, spent: 521_000, enc: 0 },
    { name: "Waterfront Reconstruction", fund: "Capital Projects", budget: 1_350_000, spent: 902_000, enc: 184_000 },
  ],
  funds: [
    { fund: "General Fund", revenue: 9_800_000, exp: 7_126_000, ending: 5_074_000 },
    { fund: "Special Revenue", revenue: 540_000, exp: 521_000, ending: 329_000 },
    { fund: "Capital Projects", revenue: 1_100_000, exp: 902_000, ending: 2_998_000 },
  ],
  // Categories break down the full YTD actual of 8,549,000 and must sum to it.
  // Personnel is roughly 70% of the General Fund in a town this size, which is
  // why it leads. The non-payroll lines tie to the payment ledger below; the
  // Debt Service line matches its department, which the payment ledger samples.
  categories: [
    { name: "Salaries & Wages", value: 3_190_000 },
    { name: "Capital Outlay", value: 1_196_500 },
    { name: "Employee Benefits & Health Insurance", value: 1_188_000 },
    { name: "Debt Service", value: 1_050_000 },
    { name: "Retirement (State PERS)", value: 763_000 },
    { name: "Professional Services", value: 474_000 },
    { name: "Insurance", value: 215_000 },
    { name: "Services", value: 153_500 },
    { name: "Software & IT", value: 107_000 },
    { name: "Public Safety Supplies", value: 78_000 },
    { name: "Supplies", value: 58_000 },
    { name: "Fuel", value: 34_000 },
    { name: "Equipment", value: 24_000 },
    { name: "Utilities", value: 18_000 },
  ],
  vendorKpis: { flagged: 7 },
  // Authored rule copy only. INVARIANT: exactly one entry per flagged row in
  // `transactionSeeds`, matched on vendor + dept, which `anomalyQueue` below
  // resolves into the real transaction so the id and amount are never
  // hand-copied. Add a flag to a seed row and you must add an entry here.
  anomalies: [
    { kind: "Spend Spike", vendor: "Axon Enterprise", dept: "Police Department", detail: "7.3× the median payment for public-safety supplies", tone: "spike" },
    { kind: "Spend Spike", vendor: "Coastal Road Services LLC", dept: "Road Improvement Program", detail: "2.2× the median payment for Services", tone: "spike" },
    { kind: "Duplicate Payment", vendor: "Bound Tree Medical", dept: "Fire & Rescue / EMS", detail: "Identical amount and memo within 48h", tone: "spike" },
    { kind: "Duplicate Payment", vendor: "Irving Oil, Bath ME", dept: "Public Works", detail: "Identical amount and memo within 48h", tone: "spike" },
    { kind: "Duplicate Payment", vendor: "Bath Equipment Rental", dept: "Public Works", detail: "Identical amount and memo within 48h", tone: "spike" },
    { kind: "Outlier Payment", vendor: "Casco Marine Supply", dept: "Waterfront Reconstruction", detail: "28% above the not-to-exceed on CON-2026-009", tone: "pending" },
    { kind: "Suspicious MCC", vendor: "Route 1 Diner", dept: "Public Library", detail: "MCC 5812 (restaurant) on a library card", tone: "pending" },
    { kind: "Suspicious MCC", vendor: "Route 1 Diner", dept: "Public Works", detail: "MCC 5812 (restaurant) on a public-works card", tone: "pending" },
  ] satisfies readonly {
    kind: string;
    vendor: string;
    dept: string;
    detail: string;
    tone: Tone;
  }[],
  treasury: [
    ["Cash and Investments", 8_401_000, "Treasurer's cash across all funds"],
    ["Committed and assigned", 5_881_000, "70% of balance"],
    ["Unassigned", 2_520_000, "30% available"],
  ] as const,
  recentAnchors: [
    ["Lincoln County Treasurer", 412_000],
    ["Bangor Savings Bank", 352_000],
    ["Reed & Reed Inc.", 184_000],
    ["State Municipal Association", 118_600],
    ["Lane Construction", 78_000],
  ] as const,
  heatmap: {
    rows: [
      "Public Works",
      "Police Department",
      "Fire & Rescue / EMS",
      "Road Improvement Program",
      "Waterfront Reconstruction",
      "Parks & Recreation",
      "Public Library",
      "General Government & Administration",
      "Harbor & Waterfront",
      "Code Enforcement & Planning",
    ],
    // Columns are months, not weeks: the flagged rows span January to March, so
    // a five-week window could not hold them. These cells sum to 8, which is
    // exactly the number of flagged rows in the ledger and entries in the
    // triage queue. Departments with a clean record stay in the grid on purpose.
    cols: ["Nov", "Dec", "Jan", "Feb", "Mar"],
    values: [
      [0, 0, 0, 0, 3],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  },
  // `days` is days remaining from DEMO_TODAY (2026-03-31). Every value below is
  // computed from its own `end` date, so the register cannot imply two
  // different "todays" the way it did when these were hand-entered.
  contracts: [
    { id: "CON-2026-014", title: "Pavement Crack Sealing Program", vendor: "Coastal Road Services LLC", dept: "Road Improvement Program", type: "Construction", value: 18_000, util: 1.05, end: "Sep 30, 2026", days: 183, flag: "Over ceiling", tone: "spike" },
    { id: "CON-2026-009", title: "Marine Materials Supply", vendor: "Casco Marine Supply", dept: "Waterfront Reconstruction", type: "Goods", value: 25_000, util: 1.28, end: "Dec 31, 2026", days: 275, flag: "Over ceiling", tone: "spike" },
    { id: "CON-2025-035", title: "Sealant Materials", vendor: "Local Paving Supply Co.", dept: "Road Improvement Program", type: "Goods", value: 12_000, util: 0.94, end: "Sep 30, 2026", days: 183, flag: "Near ceiling", tone: "pending" },
    { id: "CON-2026-003", title: "Heavy Equipment Rental", vendor: "Bath Equipment Rental", dept: "Public Works", type: "Goods", value: 7_000, util: 0.91, end: "Nov 30, 2026", days: 244, flag: "Near ceiling", tone: "pending" },
    { id: "CON-2025-031", title: "Seasonal Snow Plowing", vendor: "Morrison Landscaping & Plowing LLC", dept: "Public Works", type: "Services", value: 48_000, util: 0.62, end: "May 31, 2026", days: 61, flag: "Expiring", tone: "pending" },
    { id: "CON-2025-012", title: "Auto Parts Supply", vendor: "NAPA Auto Parts", dept: "Public Works", type: "Goods", value: 8_000, util: 0.44, end: "May 15, 2026", days: 45, flag: "Expiring", tone: "pending" },
    { id: "CON-2025-027", title: "Waterfront Reconstruction, Phase 1", vendor: "Reed & Reed Inc.", dept: "Waterfront Reconstruction", type: "Construction", value: 1_150_000, util: 0.65, end: "Dec 31, 2026", days: 275, flag: "On track", tone: "ok" },
    { id: "CON-2025-029", title: "Road Reconstruction Program", vendor: "Lane Construction", dept: "Road Improvement Program", type: "Construction", value: 590_000, util: 0.72, end: "Oct 31, 2026", days: 214, flag: "On track", tone: "ok" },
    { id: "CON-2026-008", title: "North Bulkhead Reconstruction", vendor: "Casco Marine Works", dept: "Waterfront Reconstruction", type: "Construction", value: 135_000, util: 0.41, end: "Dec 31, 2026", days: 275, flag: "On track", tone: "ok" },
    { id: "CON-2026-021", title: "Body-Worn Camera Program", vendor: "Axon Enterprise", dept: "Police Department", type: "Goods", value: 95_000, util: 0.41, end: "Jan 31, 2029", days: 1037, flag: "On track", tone: "ok" },
    { id: "CON-2025-044", title: "EMS Supplies & Apparatus Service", vendor: "Municipal Emergency Services", dept: "Fire & Rescue / EMS", type: "Services", value: 85_000, util: 0.17, end: "Jun 30, 2026", days: 91, flag: "On track", tone: "ok" },
    { id: "CON-2025-022", title: "Grounds & Parks Maintenance", vendor: "GreenWorks Landscaping LLC", dept: "Parks & Recreation", type: "Services", value: 31_000, util: 0.82, end: "Dec 31, 2026", days: 275, flag: "On track", tone: "ok" },
    { id: "CON-2025-040", title: "Fleet Fuel Supply", vendor: "Irving Oil, Bath ME", dept: "Public Works", type: "Goods", value: 15_000, util: 0.34, end: "Jun 30, 2027", days: 456, flag: "On track", tone: "ok" },
    { id: "CON-2026-017", title: "Spring Plantings", vendor: "Mitchell Field Nursery", dept: "Parks & Recreation", type: "Goods", value: 5_000, util: 0.17, end: "Oct 31, 2026", days: 214, flag: "On track", tone: "ok" },
  ] satisfies readonly {
    id: string;
    title: string;
    vendor: string;
    dept: string;
    type: string;
    value: number;
    util: number;
    end: string;
    days: number;
    flag: string;
    tone: Tone;
  }[],
  contractKpis: { active: 14, value: 2_224_000 },
  admin: {
    // One row per role behind the view switcher, so every "front door" has at
    // least one real account. Role labels match the roleViews vocabulary.
    users: [
      ["Dana Whitfield", "dwhitfield@anytown.me.gov", "Administrator", "Active", "Mar 28, 2026"],
      ["Marcus Bell", "mbell@anytown.me.gov", "Finance", "Active", "Mar 27, 2026"],
      ["Priya Sundaram", "psundaram@anytown.me.gov", "Accounts Payable", "Active", "Mar 25, 2026"],
      ["Tom Calderwood", "tcalderwood@anytown.me.gov", "Town Manager", "Active", "Mar 26, 2026"],
      ["R. Okafor", "rokafor@audit-partners.com", "External Auditor", "Invited", "—"],
      ["Jordan Nash", "jnash@anytown.me.gov", "IT / Records", "Active", "Mar 24, 2026"],
      ["Select Board", "selectboard@anytown.me.gov", "Select Board / Committee", "Active", "Mar 19, 2026"],
      ["Chief A. Doucette", "adoucette@anytown.me.gov", "Select Board / Committee", "Active", "Mar 22, 2026"],
    ],
    // Covers every MCC that appears in the payment ledger, so the semantic
    // layer has no silent gaps. 5812 maps to a real category AND carries a
    // review rule, which is why a restaurant charge is categorised normally
    // and still flagged when it lands on a department card.
    ruleset: [
      [780, "Landscaping & Horticultural Services", "Services"],
      [1611, "Highway & Street Construction", "Capital Outlay"],
      [2741, "Miscellaneous Publishing & Printing", "Software & IT"],
      [4812, "Telecommunication Equipment", "Software & IT"],
      [4900, "Utilities (Electric, Gas, Water)", "Utilities"],
      [5039, "Construction Materials", "Supplies"],
      [5047, "Medical & Dental Supplies", "Public Safety Supplies"],
      [5085, "Industrial Supplies", "Equipment"],
      [5111, "Stationery & Office Supplies", "Supplies"],
      [5251, "Hardware Stores", "Supplies"],
      [5261, "Nurseries & Garden Supply", "Supplies"],
      [5533, "Automotive Parts & Accessories", "Equipment"],
      [5541, "Service Stations", "Fuel"],
      [5551, "Boat Dealers & Marine Supply", "Supplies"],
      [5812, "Eating Places & Restaurants", "Services (review on card spend)"],
      [5941, "Sporting Goods Stores", "Supplies"],
      [5942, "Book Stores", "Supplies"],
      [5983, "Fuel Dealers", "Fuel"],
      [5999, "Miscellaneous Retail", "Public Safety Supplies"],
      [6012, "Financial Institutions", "Debt Service"],
      [6300, "Insurance Underwriting", "Insurance"],
      [7359, "Equipment Rental & Leasing", "Equipment"],
      [7372, "Computer Programming & Software", "Software & IT"],
      [8111, "Legal Services", "Professional Services"],
      [8398, "Charitable & Social Service Organizations", "Services"],
      [8911, "Architectural & Engineering Services", "Professional Services"],
      [8931, "Accounting & Audit Services", "Professional Services"],
      [9399, "Government Services", "Professional Services"],
    ],
  },
} as const;

const transactionSeeds = [
  ["2026-03-13", "NAPA Auto Parts", "Equipment", "Public Works", 127.5, "anchored", null, 5533],
  ["2026-03-13", "Irving Oil, Bath ME", "Fuel", "Public Works", 87.2, "anchored", null, 5541],
  ["2026-03-13", "Route 1 Diner", "Services", "Public Works", 43.9, "anchored", "SUSPICIOUS_MCC", 5812],
  ["2026-03-12", "Bath Equipment Rental", "Equipment", "Public Works", 3_200, "anchored", null, 7359],
  ["2026-03-12", "Casco Marine Supply", "Equipment", "Waterfront Reconstruction", 1_430, "anchored", null, 5551],
  ["2026-03-12", "Mitchell Field Nursery", "Supplies", "Parks & Recreation", 850, "pending", null, 5261],
  ["2026-03-11", "Bath Equipment Rental", "Equipment", "Public Works", 3_200, "anchored", "DUPLICATE", 7359],
  ["2026-03-10", "Casco Marine Supply", "Equipment", "Waterfront Reconstruction", 2_118, "anchored", null, 5551],
  ["2026-03-07", "Morrison Landscaping & Plowing LLC", "Services", "Public Works", 4_600, "anchored", null, 780],
  ["2026-03-04", "Irving Oil, Bath ME", "Fuel", "Public Works", 847.2, "anchored", null, 5541],
  ["2026-03-04", "Coastal Road Services LLC", "Services", "Road Improvement Program", 5_167.3, "anchored", null, 1611],
  ["2026-03-04", "Local Paving Supply Co.", "Supplies", "Road Improvement Program", 3_440, "anchored", null, 5251],
  ["2026-03-03", "Irving Oil, Bath ME", "Fuel", "Public Works", 847.2, "anchored", "DUPLICATE", 5541],
  ["2026-03-01", "Coastal Road Services LLC", "Services", "Road Improvement Program", 13_760, "anchored", "SPIKE", 1611],
  ["2026-01-15", "GreenWorks Landscaping LLC", "Services", "Parks & Recreation", 18_000, "anchored", null, 780],
  ["2026-01-09", "Casco Marine Works", "Services", "Waterfront Reconstruction", 22_071, "anchored", null, 1611],
  ["2026-03-10", "Northeast Municipal Software", "Software & IT", "General Government & Administration", 42_500, "anchored", null, 7372],
  ["2026-02-20", "Runyon Kersteen Ouellette", "Professional Services", "General Government & Administration", 28_000, "anchored", null, 8931],
  ["2026-01-15", "State Municipal Association", "Insurance", "General Government & Administration", 96_400, "anchored", null, 6300],
  ["2026-03-05", "W.B. Mason", "Supplies", "General Government & Administration", 1_240, "anchored", null, 5111],
  ["2025-11-12", "Bernstein Shur", "Professional Services", "General Government & Administration", 15_750, "anchored", null, 8111],
  ["2026-02-02", "Regional Power Company", "Utilities", "General Government & Administration", 3_180, "anchored", null, 4900],
  ["2026-03-08", "Galls LLC", "Public Safety Supplies", "Police Department", 6_900, "anchored", null, 5999],
  ["2026-02-14", "Axon Enterprise", "Public Safety Supplies", "Police Department", 38_500, "anchored", "SPIKE", 5999],
  ["2026-01-28", "Motorola Solutions", "Software & IT", "Police Department", 21_300, "anchored", null, 4812],
  ["2026-03-12", "Irving Oil, Bath ME", "Fuel", "Police Department", 4_120, "anchored", null, 5541],
  ["2025-12-09", "O'Reilly Auto Parts", "Equipment", "Police Department", 2_460, "anchored", null, 5533],
  ["2026-02-22", "Bound Tree Medical", "Public Safety Supplies", "Police Department", 3_870, "anchored", null, 5047],
  ["2026-03-06", "Municipal Emergency Services", "Public Safety Supplies", "Fire & Rescue / EMS", 14_600, "anchored", null, 5999],
  ["2026-02-18", "Bound Tree Medical", "Public Safety Supplies", "Fire & Rescue / EMS", 5_240, "anchored", null, 5047],
  ["2026-02-18", "Bound Tree Medical", "Public Safety Supplies", "Fire & Rescue / EMS", 5_240, "anchored", "DUPLICATE", 5047],
  ["2026-01-20", "Industrial Protection Services", "Equipment", "Fire & Rescue / EMS", 9_800, "anchored", null, 5085],
  ["2026-03-11", "Dead River Company", "Fuel", "Fire & Rescue / EMS", 6_350, "anchored", null, 5983],
  ["2025-12-15", "Regional Power Company", "Utilities", "Fire & Rescue / EMS", 2_940, "anchored", null, 4900],
  ["2026-03-09", "Lane Construction", "Services", "Public Works", 78_000, "anchored", null, 1611],
  ["2026-02-11", "F.R. Carroll Inc.", "Supplies", "Public Works", 12_400, "anchored", null, 5039],
  ["2026-01-30", "Dead River Company", "Fuel", "Public Works", 18_900, "anchored", null, 5983],
  ["2026-03-02", "NAPA Auto Parts", "Equipment", "Public Works", 1_870, "anchored", null, 5533],
  ["2025-11-25", "Regional Power Company", "Utilities", "Public Works", 5_620, "anchored", null, 4900],
  ["2026-02-27", "Local Water Company", "Utilities", "Public Works", 1_430, "anchored", null, 4900],
  ["2026-03-07", "BSN Sports", "Supplies", "Parks & Recreation", 4_300, "anchored", null, 5941],
  ["2026-02-05", "SiteOne Landscape Supply", "Supplies", "Parks & Recreation", 3_150, "anchored", null, 5261],
  ["2025-10-18", "GreenWorks Landscaping LLC", "Services", "Parks & Recreation", 7_500, "anchored", null, 780],
  ["2026-03-04", "Baker & Taylor", "Supplies", "Public Library", 8_700, "anchored", null, 5942],
  ["2026-02-09", "EBSCO Information Services", "Software & IT", "Public Library", 5_400, "anchored", null, 2741],
  ["2026-01-22", "Route 1 Diner", "Services", "Public Library", 92.4, "anchored", "SUSPICIOUS_MCC", 5812],
  ["2026-02-28", "Regional Power Company", "Utilities", "Public Library", 1_180, "anchored", null, 4900],
  ["2026-02-16", "VHB Engineering", "Professional Services", "Code Enforcement & Planning", 18_200, "anchored", null, 8911],
  ["2026-01-10", "CAI Technologies", "Software & IT", "Code Enforcement & Planning", 6_800, "anchored", null, 7372],
  ["2026-03-03", "Hamilton Marine", "Supplies", "Harbor & Waterfront", 5_900, "anchored", null, 5551],
  ["2026-02-12", "Dead River Company", "Fuel", "Harbor & Waterfront", 3_400, "anchored", null, 5983],
  ["2025-11-08", "Regional Power Company", "Utilities", "Harbor & Waterfront", 980, "anchored", null, 4900],
  ["2026-03-01", "Regional Power Company", "Utilities", "Health & General Assistance", 2_300, "anchored", null, 4900],
  ["2026-02-08", "Good Shepherd Food Bank", "Services", "Health & General Assistance", 4_100, "anchored", null, 8398],
  ["2026-01-15", "Bangor Savings Bank", "Debt Service", "Debt Service", 352_000, "anchored", null, 6012],
  ["2025-12-01", "State Municipal Bond Bank", "Debt Service", "Debt Service", 198_000, "anchored", null, 6012],
  ["2026-02-25", "Lane Construction", "Capital Outlay", "Road Improvement Program", 64_000, "anchored", null, 1611],
  ["2025-10-22", "Local Paving Supply Co.", "Supplies", "Road Improvement Program", 7_800, "anchored", null, 5039],
  ["2026-02-19", "Reed & Reed Inc.", "Capital Outlay", "Waterfront Reconstruction", 184_000, "anchored", null, 1611],
  ["2026-01-12", "Casco Marine Supply", "Capital Outlay", "Waterfront Reconstruction", 28_500, "anchored", "OUTLIER", 5551],
  ["2025-12-20", "Hamilton Marine", "Supplies", "Waterfront Reconstruction", 9_400, "anchored", null, 5551],
  ["2026-01-05", "Lincoln County Treasurer", "Professional Services", "General Government & Administration", 412_000, "anchored", null, 9399],
  ["2025-11-15", "State Municipal Association", "Insurance", "General Government & Administration", 118_600, "anchored", null, 6300],
  ["2026-03-13", "W.B. Mason", "Supplies", "Police Department", 640, "anchored", null, 5111],
  ["2026-02-03", "Northeast Municipal Software", "Software & IT", "General Government & Administration", 31_000, "anchored", null, 7372],
  ["2026-01-18", "Galls LLC", "Public Safety Supplies", "Fire & Rescue / EMS", 3_900, "anchored", null, 5999],
  // Contractor progress payments on the two capital programs. Without these the
  // whole of each program's spend beyond a few supply invoices fell through to
  // the derived payroll lines below, which made a road program and a seawall
  // rebuild look like they were mostly salaries. Appended, never inserted, so
  // every existing TX id keeps its number.
  ["2025-09-18", "Lane Construction", "Capital Outlay", "Road Improvement Program", 118_000, "anchored", null, 1611],
  ["2025-10-30", "Lane Construction", "Capital Outlay", "Road Improvement Program", 96_000, "anchored", null, 1611],
  ["2025-12-11", "Lane Construction", "Capital Outlay", "Road Improvement Program", 82_000, "anchored", null, 1611],
  ["2026-01-22", "Lane Construction", "Capital Outlay", "Road Improvement Program", 64_000, "anchored", null, 1611],
  ["2025-09-25", "Reed & Reed Inc.", "Capital Outlay", "Waterfront Reconstruction", 148_000, "anchored", null, 1611],
  ["2025-10-23", "Reed & Reed Inc.", "Capital Outlay", "Waterfront Reconstruction", 124_000, "anchored", null, 1611],
  ["2025-11-20", "Reed & Reed Inc.", "Capital Outlay", "Waterfront Reconstruction", 162_000, "anchored", null, 1611],
  ["2026-01-08", "Reed & Reed Inc.", "Capital Outlay", "Waterfront Reconstruction", 126_000, "anchored", null, 1611],
] as const;

const transactions: Transaction[] = transactionSeeds.map(
  ([date, vendor, category, dept, amount, anchor, anomaly, mcc], index) => ({
    id: `TX-${480_100 + index}`,
    date,
    vendor,
    category,
    dept,
    amount,
    anchor,
    anomaly,
    mcc,
    sha256: hashFor(index + 7),
    fingerprint: hashFor(index + 41).slice(0, 24),
    ledgerTx: hashFor(index + 99).slice(0, 18).toUpperCase(),
    block: 1_244_870 + index * 3,
    ts: `${date}T14:${String(10 + (index % 50)).padStart(2, "0")}:08Z`,
  }),
);

// The 66 rows above are vendor payments and add up to about $2M, but the town
// has spent $8.5M. The difference is payroll, benefits, retirement and the rest
// of the scheduled debt payments, which a real open checkbook publishes as
// summary lines because individual pay is not itemised. These rows are derived,
// not typed: the summary lines of a department are whatever its `spent` figure
// leaves after its vendor payments, so the ledger rows of every department sum
// to its budget line and the whole ledger sums to kpis.actual.
//
// They live outside `transactions` on purpose. Vendor rankings, audit samples
// and the query terminal are about vendors and keep reading `transactions`;
// the ledger, the public checkbook and record checks read `allPayments`.
const SUMMARY_PERIOD = "Jul to Mar";
const benefitsTotal = data.categories.find((category) => category.name === "Employee Benefits & Health Insurance")?.value ?? 0;
const retirementTotal = data.categories.find((category) => category.name === "Retirement (State PERS)")?.value ?? 0;

function buildSummaryPayments(): Transaction[] {
  const vendorPaid = (dept: string) =>
    transactions.filter((transaction) => transaction.dept === dept).reduce((sum, transaction) => sum + transaction.amount, 0);
  const staffed = data.departments.filter((department) => department.name !== "Debt Service");
  const staffedGap = staffed.reduce((sum, department) => sum + department.spent - vendorPaid(department.name), 0);
  const drafts: { payee: string; category: string; dept: string; amount: number }[] = [];
  let benefitsLeft: number = benefitsTotal;
  let retirementLeft: number = retirementTotal;

  for (const department of data.departments) {
    const gap = department.spent - vendorPaid(department.name);
    if (gap <= 0) continue;
    if (department.name === "Debt Service") {
      drafts.push({ payee: `Bond payments, principal and interest (summary, ${SUMMARY_PERIOD})`, category: "Debt Service", dept: department.name, amount: gap });
      continue;
    }
    // The last staffed department takes the remainder so the benefit and
    // retirement lines sum to their category totals exactly.
    const last = department.name === staffed[staffed.length - 1].name;
    const benefits = last ? benefitsLeft : Math.round((gap / staffedGap) * benefitsTotal);
    const retirement = last ? retirementLeft : Math.round((gap / staffedGap) * retirementTotal);
    benefitsLeft -= benefits;
    retirementLeft -= retirement;
    drafts.push(
      { payee: `Town payroll (summary, ${SUMMARY_PERIOD})`, category: "Salaries & Wages", dept: department.name, amount: gap - benefits - retirement },
      { payee: `Employee health plan (summary, ${SUMMARY_PERIOD})`, category: "Employee Benefits & Health Insurance", dept: department.name, amount: benefits },
      { payee: `State retirement system (summary, ${SUMMARY_PERIOD})`, category: "Retirement (State PERS)", dept: department.name, amount: retirement },
    );
  }

  return drafts.map((draft, offset) => {
    const index = transactions.length + offset;
    const date = "2026-03-27";
    return {
      id: `TX-${480_100 + index}`,
      date,
      vendor: draft.payee,
      category: draft.category,
      dept: draft.dept,
      amount: draft.amount,
      anchor: "anchored",
      anomaly: null,
      // Not a card purchase, so there is no merchant category code.
      mcc: 0,
      sha256: hashFor(index + 7),
      fingerprint: hashFor(index + 41).slice(0, 24),
      ledgerTx: hashFor(index + 99).slice(0, 18).toUpperCase(),
      block: 1_244_870 + index * 3,
      ts: `${date}T14:${String(10 + (index % 50)).padStart(2, "0")}:08Z`,
    };
  });
}

const allPayments: Transaction[] = [...transactions, ...buildSummaryPayments()];

// The order a payment list opens in: newest first, with the year-to-date
// summary lines after the dated payments, since a summary covers a period
// rather than a day. A column sort still overrides this.
function newestFirst(rows: readonly Transaction[]) {
  return [...rows].sort((left, right) => {
    const leftSummary = left.mcc === 0 ? 1 : 0;
    const rightSummary = right.mcc === 0 ? 1 : 0;
    if (leftSummary !== rightSummary) return leftSummary - rightSummary;
    return right.date.localeCompare(left.date);
  });
}

// Resolves each authored anomaly to the ledger row it describes, matched on
// vendor + dept. Nothing hand-copies a transaction id or an amount, so the
// triage queue and the ledger can never disagree about what is flagged.
type AnomalyQueueEntry = {
  kind: string;
  vendor: string;
  dept: string;
  detail: string;
  tone: Tone;
  txId: string;
  amount: number;
};

const anomalyQueue: AnomalyQueueEntry[] = data.anomalies.map((anomaly) => {
  const tx = transactions.find(
    (transaction) => transaction.anomaly !== null && transaction.vendor === anomaly.vendor && transaction.dept === anomaly.dept,
  );
  return { ...anomaly, txId: tx?.id ?? "", amount: tx?.amount ?? 0 };
});

// The open PO register is the detail behind kpis.encumbered. These amounts sum
// to 529,000 and each department's POs sum to that department's `enc` figure,
// because reconciling the encumbrance control total to the PO detail is a
// standard year-end audit procedure and the first thing an auditor tests.
const openCommitments = [
  { id: "PO-2026-0210", vendor: "Lane Construction", dept: "Public Works", amount: 78_000, issued: "2026-02-09", status: "Open" },
  { id: "PO-2026-0214", vendor: "Dead River Company", dept: "Public Works", amount: 24_000, issued: "2026-02-18", status: "Open" },
  { id: "PO-2026-0221", vendor: "F.R. Carroll Inc.", dept: "Public Works", amount: 18_000, issued: "2026-03-02", status: "Partially Received" },
  { id: "PO-2026-0230", vendor: "Axon Enterprise", dept: "Police Department", amount: 48_000, issued: "2026-02-14", status: "Open" },
  { id: "PO-2026-0233", vendor: "Motorola Solutions", dept: "Police Department", amount: 24_000, issued: "2026-01-28", status: "Partially Received" },
  { id: "PO-2026-0240", vendor: "Municipal Emergency Services", dept: "Fire & Rescue / EMS", amount: 40_000, issued: "2026-02-12", status: "Open" },
  { id: "PO-2026-0244", vendor: "Industrial Protection Services", dept: "Fire & Rescue / EMS", amount: 18_000, issued: "2026-01-20", status: "Open" },
  { id: "PO-2026-0201", vendor: "Northeast Municipal Software", dept: "General Government & Administration", amount: 46_000, issued: "2026-02-03", status: "Open" },
  { id: "PO-2026-0260", vendor: "Reed & Reed Inc.", dept: "Waterfront Reconstruction", amount: 184_000, issued: "2026-02-19", status: "Open" },
  { id: "PO-2026-0248", vendor: "GreenWorks Landscaping LLC", dept: "Parks & Recreation", amount: 18_000, issued: "2026-02-26", status: "Open" },
  { id: "PO-2026-0251", vendor: "Hamilton Marine", dept: "Harbor & Waterfront", amount: 11_000, issued: "2026-03-04", status: "Open" },
  { id: "PO-2026-0254", vendor: "Baker & Taylor", dept: "Public Library", amount: 9_000, issued: "2026-03-06", status: "Open" },
  { id: "PO-2026-0257", vendor: "VHB Engineering", dept: "Code Enforcement & Planning", amount: 7_000, issued: "2026-02-16", status: "Partially Received" },
  { id: "PO-2026-0263", vendor: "Good Shepherd Food Bank", dept: "Health & General Assistance", amount: 4_000, issued: "2026-03-09", status: "Open" },
] as const;

const budgetAmendments = [
  { id: "AMD-2026-04", date: "2026-02-24", dept: "Waterfront Reconstruction", fund: "Capital Projects", type: "Increase", delta: 120_000, reason: "Storm damage to north bulkhead", status: "Approved" },
  { id: "AMD-2026-06", date: "2026-01-08", dept: "Police Department", fund: "General Fund", type: "Increase", delta: 60_000, reason: "Body-worn camera program", status: "Approved" },
  { id: "AMD-2026-03", date: "2026-02-03", dept: "Public Works", fund: "General Fund", type: "Transfer", delta: 45_000, reason: "Transfer from contingency for road salt + overtime", status: "Approved" },
  { id: "AMD-2026-02", date: "2026-01-20", dept: "Parks & Recreation", fund: "General Fund", type: "Decrease", delta: -18_000, reason: "Deferred playground resurfacing", status: "Approved" },
  { id: "AMD-2026-05", date: "2026-03-11", dept: "Road Improvement Program", fund: "Special Revenue", type: "Increase", delta: 25_000, reason: "Grant match for crack-seal program", status: "Pending" },
] as const;

const governance = {
  adminWallets: [
    "GDFIN4XKQV5XJN3RP4M6YD8WZC9FB2HT5LKQ3RX7VN4MJ8PD6SAW2YHC",
    "GCLERK7KQV5XJN3RP4M6YD8WZC9FB2HT5LKQ3RX7VN4MJ8PD6SAW2YH9",
  ],
  // `records` is the count of ledger rows in that month. An auditor verifying a
  // period close compares exactly this number to the transactions in the
  // period, so these are counted from `transactionSeeds`, not invented.
  closedPeriods: [
    { monthKey: "2026-02", closedAt: "2026-03-05", closedBy: "Dana Whitfield", records: 17, ledgerTx: "8F2C9A1D7E4B6058C3A2F1" },
    { monthKey: "2026-01", closedAt: "2026-02-04", closedBy: "Dana Whitfield", records: 14, ledgerTx: "3B7E1F9C2A6D40583E1B7C" },
    { monthKey: "2025-12", closedAt: "2026-01-06", closedBy: "Marcus Bell", records: 5, ledgerTx: "C1A4D8B2F6E390571D4A2B" },
    { monthKey: "2025-11", closedAt: "2025-12-04", closedBy: "Dana Whitfield", records: 5, ledgerTx: "9E3F7A0C5B1D24686F2C3A" },
  ],
  audit: [
    { id: "A-01", vendor: "Route 1 Diner", previousCategory: "Services", newCategory: "Supplies", admin: "Dana Whitfield", justification: "Restaurant charge flagged; a staff working lunch, filed with office supplies.", signedAt: "2026-03-14", tx: "A7F2C19D4E8B6053F1A2C7" },
    { id: "A-02", vendor: "Irving Oil, Bath ME", previousCategory: "Fuel", newCategory: "Utilities", admin: "Marcus Bell", justification: "Bulk diesel for the standby generators, not fleet fuel.", signedAt: "2026-03-11", tx: "2D9E1F7A4C6B30582E1B9C" },
    { id: "A-03", vendor: "NAPA Auto Parts", previousCategory: "Equipment", newCategory: "Supplies", admin: "Priya Sundaram", justification: "Hand tools and batteries, not capital equipment.", signedAt: "2026-03-09", tx: "F1B7C29D5E3A40681D2C4B" },
    { id: "A-04", vendor: "Coastal Road Services LLC", previousCategory: "Services", newCategory: "Capital Outlay", admin: "Dana Whitfield", justification: "Part of the road program, per the public works director.", signedAt: "2026-03-06", tx: "7C3A1F9D2E5B40583F1A2D" },
  ],
} as const;

// The three questions the Query Terminal can actually answer. Each carries its
// own SQL and computes its own rows from the ledger, so the answer always
// matches the question that was asked. A single shared query previously
// returned vendor totals no matter what was typed, including for this page's
// own "flagged payments over $10,000" example.
const cannedQueries: readonly {
  id: string;
  question: string;
  sql: string;
  columns: readonly [string, string];
  rows: () => (readonly [string, string])[];
}[] = [
  {
    id: "top-vendors",
    question: "Top 5 vendors by total spend this fiscal year",
    sql: "SELECT vendor, SUM(amount) AS total_spend\nFROM payments\nWHERE fiscal_year = 'FY2026'\nGROUP BY vendor\nORDER BY total_spend DESC\nLIMIT 5;",
    columns: ["vendor", "total_spend"],
    rows: () => getVendorSummaries().slice(0, 5).map((vendor) => [vendor.vendor, fmtUSD(vendor.total)] as const),
  },
  {
    id: "flagged-large",
    question: "Flagged payments over $10,000",
    sql: "SELECT tx_id, vendor, amount, anomaly\nFROM payments\nWHERE anomaly IS NOT NULL AND amount > 10000\nORDER BY amount DESC;",
    columns: ["tx_id · vendor", "amount"],
    rows: () =>
      transactions
        .filter((transaction) => transaction.anomaly !== null && transaction.amount > 10_000)
        .sort((a, b) => b.amount - a.amount)
        .map((transaction) => [`${transaction.id} · ${transaction.vendor}`, fmtUSD(transaction.amount)] as const),
  },
  {
    id: "utilities-by-dept",
    question: "Utilities spend by department",
    sql: "SELECT department, SUM(amount) AS total\nFROM payments\nWHERE category = 'Utilities'\nGROUP BY department\nORDER BY total DESC;",
    columns: ["department", "total"],
    rows: () => {
      const totals = new Map<string, number>();
      for (const transaction of transactions) {
        if (transaction.category !== "Utilities") continue;
        totals.set(transaction.dept, (totals.get(transaction.dept) ?? 0) + transaction.amount);
      }
      return [...totals.entries()].sort((a, b) => b[1] - a[1]).map(([dept, total]) => [dept, fmtUSD(total)] as const);
    },
  },
];

const badgeToneClasses: Record<Tone, string> = {
  anchored: "bg-green-100 text-green-900",
  info: "bg-blue-100 text-blue-700",
  neutral: "bg-cream-200 text-slate-500",
  ok: "bg-green-100 text-green-900",
  pending: "bg-gold-100 text-gold-800",
  spike: "bg-red-100 text-red-600",
};

const progressToneClasses: Record<Tone, string> = {
  anchored: "bg-green-500",
  info: "bg-blue-500",
  neutral: "bg-slate-400",
  ok: "bg-green-500",
  pending: "bg-gold-500",
  spike: "bg-red-400",
};

const heatmapClasses = [
  "border-cream-300 bg-cream-100 text-slate-500",
  "border-blue-300 bg-blue-100 text-blue-700",
  "border-gold-500 bg-gold-300 text-gold-800",
  "border-red-600 bg-red-100 text-red-600",
] as const;

// Heat level for a cell count. Clamped because a raw index past the end of the
// array yields undefined, which paints an unstyled cell with no error at all.
function heatmapClass(count: number) {
  return heatmapClasses[Math.min(Math.max(count, 0), heatmapClasses.length - 1)];
}

function fmtUSD(value: number) {
  // The sign leads the symbol: -$1,000, not $-1,000.
  const rounded = Math.round(value);
  return `${rounded < 0 ? "-" : ""}$${Math.abs(rounded).toLocaleString("en-US")}`;
}

function fmtC(value: number) {
  const absoluteValue = Math.abs(value);

  if (absoluteValue >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }

  if (absoluteValue >= 1_000) {
    return `$${Math.round(value / 1_000)}K`;
  }

  return `$${Math.round(value)}`;
}

function fmtDate(value: string) {
  const date = new Date(`${value}T00:00:00Z`);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

function pct(value: number) {
  return `${Math.round(value * 100)}%`;
}

function hashFor(seed: number) {
  const hex = "0123456789abcdef";
  let value = seed * 2_654_435_761;
  return Array.from({ length: 64 }, (_, index) => {
    value = (value + index * 97 + seed * 13) >>> 0;
    return hex[value % hex.length];
  }).join("");
}

function getVendorSummaries(): VendorSummary[] {
  const vendors = new Map<string, VendorSummary>();

  for (const transaction of transactions) {
    const current = vendors.get(transaction.vendor);
    if (!current) {
      vendors.set(transaction.vendor, {
        vendor: transaction.vendor,
        category: transaction.category,
        txns: 1,
        total: transaction.amount,
        lastPaid: transaction.date,
        anomalies: transaction.anomaly ? 1 : 0,
        anchor: transaction.anchor,
      });
      continue;
    }

    current.txns += 1;
    current.total += transaction.amount;
    current.anomalies += transaction.anomaly ? 1 : 0;
    if (transaction.date > current.lastPaid) current.lastPaid = transaction.date;
    if (transaction.anchor === "pending") current.anchor = "pending";
  }

  return [...vendors.values()].sort((a, b) => b.total - a.total);
}

function monthLabel(monthKey: string) {
  const [year, month] = monthKey.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

// This is a static March 2026 snapshot, so everything the console stamps with a
// date reads from here instead of new Date(). The real clock put an August date
// on a March council packet, five months out of line with the packets above it.
// Year-over-year change in spend to date, by department. Every card on Top
// Movers used to read +6% because each prior-year figure was derived from the
// town-wide rate. These are weighted so the town as a whole still lands on
// kpis.yoy (6%), and the three departments running over budget are also the
// ones that grew most.
const YOY_CHANGE: Record<string, number> = {
  "General Government & Administration": 0.03,
  "Police Department": 0.05,
  "Fire & Rescue / EMS": 0.04,
  "Public Works": 0.09,
  "Parks & Recreation": -0.02,
  "Public Library": 0.02,
  "Code Enforcement & Planning": 0.01,
  "Harbor & Waterfront": 0.04,
  "Health & General Assistance": 0.14,
  "Debt Service": 0,
  "Road Improvement Program": 0.31,
  "Waterfront Reconstruction": 0.08,
};

const DEMO_TODAY = new Date("2026-03-31T09:15:00Z");

// Municipal fiscal years commonly run July 1 to June 30, so at March 31 nine of
// twelve months have elapsed. Board View, Budget Analytics, the council packet
// and the contract burn-down all read this one number, and the trend chart is
// plotted against it. Change it here and every projection moves together.
const FY_ELAPSED = 0.75;
const FY_MONTHS_ELAPSED = 9;

function projectedYearEnd(spent: number) {
  return spent / FY_ELAPSED;
}

// How far off its appropriation a projected year-end has to land before a
// department is called out, applied either side. One number, so Board View, the
// Overview and the council packet cannot each publish a different list.
const OVER_BUDGET_TOLERANCE = 0.02;

// Severity order for the Year-End Projection pace column, least worrying first,
// so sorting that column groups the badges the way a reader reads them rather
// than alphabetically.
const PACE_ORDER = ["Healthy", "Watch", "At risk"] as const;

// Utilisation bands as percentages. statusOf below and the tunable thresholds
// on Budget Analytics both read these, so the fixed displays and the editable
// ones start from the same place.
// One status language for the whole console: Healthy, Watch, At risk, graded on
// where a department is projected to finish the year as a percentage of its
// budget. These defaults are the same tolerance departmentPace() applies.
const DEFAULT_BANDS = { watch: Math.round((1 - OVER_BUDGET_TOLERANCE) * 100), over: Math.round((1 + OVER_BUDGET_TOLERANCE) * 100) };


// How a department is tracking, off the projected year-end and nothing else.
// Every surface that asks the question reads this one function.
//
// It used to mix two scales: "Over" and "Watch" came from statusOf, which grades
// utilisation to date against year-end bands (85 / 100), while "at risk" came
// from the projection. Three quarters of the way through a year a department
// exactly on plan sits at 75% utilised, so the Watch band at 85% corresponds to
// a projected 113%, well past the 102% at-risk line. Every Watch candidate was
// therefore already At risk and the band could never fire: the console printed
// "0 watch" for all twelve departments no matter what the numbers did.
//
// Both edges now come off the projection, one tolerance either side, so Watch
// means what a reader assumes it means: on course to finish level with the
// appropriation, with no headroom left. statusOf is untouched and still grades
// utilisation where utilisation is the actual question.
type DepartmentPace = "At risk" | "Watch" | "Healthy";

// Where Watch and At risk begin, as a percentage of budget at projected
// year-end. The defaults are the tolerance above; Budget Analytics can move
// them, per fund or per department, and every page that grades a department
// reads the same settings, so moving a line there moves it everywhere.
type Bands = { watch: number; over: number };
type BandSettings = { defaults: Bands; overrides: Record<string, Bands> };

const DEFAULT_BAND_SETTINGS: BandSettings = { defaults: DEFAULT_BANDS, overrides: {} };

const BandContext = createContext<{ settings: BandSettings; setSettings: Dispatch<SetStateAction<BandSettings>> }>({
  settings: DEFAULT_BAND_SETTINGS,
  setSettings: () => {},
});

function useBandSettings() {
  return useContext(BandContext);
}

function departmentPace(
  department: { name?: string; fund?: string; spent: number; budget: number },
  settings: BandSettings = DEFAULT_BAND_SETTINGS,
): DepartmentPace {
  // A department override wins over its fund, which wins over the default.
  const bands =
    settings.overrides[`dept:${department.name}`] ?? settings.overrides[`fund:${department.fund}`] ?? settings.defaults;
  const projectedPct = (projectedYearEnd(department.spent) / department.budget) * 100;
  if (projectedPct > bands.over) return "At risk";
  if (projectedPct >= bands.watch) return "Watch";
  return "Healthy";
}

const PACE_TONE: Record<DepartmentPace, Tone> = {
  "At risk": "spike",
  Watch: "pending",
  Healthy: "anchored",
};

// Counted from the department budgets, not typed in. The Overview tile and the
// council packet both read this, so a headline of "2 at risk" cannot contradict
// the department table printed underneath it.
function fiscalHealth(settings: BandSettings = DEFAULT_BAND_SETTINGS) {
  return data.departments.reduce(
    (tally, department) => {
      const pace = departmentPace(department, settings);
      if (pace === "At risk") return { ...tally, atRisk: tally.atRisk + 1 };
      if (pace === "Watch") return { ...tally, watch: tally.watch + 1 };
      return { ...tally, healthy: tally.healthy + 1 };
    },
    { atRisk: 0, watch: 0, healthy: 0 },
  );
}

// The town and its departments are two different questions. Three departments
// can be projected over while the town as a whole closes inside its
// appropriation, and a single "At Risk" badge on the whole town said the
// opposite of the sentence printed next to it.
function townHealth(settings: BandSettings = DEFAULT_BAND_SETTINGS) {
  const over = projectedYearEnd(data.kpis.actual) > data.kpis.approved;
  const { atRisk } = fiscalHealth(settings);
  return {
    label: over ? "Town over budget" : "Town within budget",
    tone: (over ? "spike" : atRisk > 0 ? "pending" : "anchored") as Tone,
  };
}

function toneClass(tone: Tone) {
  if (tone === "ok") return "anchored";
  return tone;
}

// Anything this console emits leaves the screen and travels on its own, so it
// has to say what it is. The banner explaining that this is a demo scrolls away
// and never reaches a downloaded CSV or a printed packet. Without this, the
// public-records response prints as a genuine-looking municipal record.
const SAMPLE_DATA_NOTICE = "Sample data · Civic-Chain demonstration · not a municipal record";

// Clickable rows, cards and heatmap cells need to work for keyboard and
// screen-reader users, not just the mouse. Spread these onto whatever element
// opens a detail view. There is deliberately NO role on a <tr>: overriding a
// row's role removes it from the table, which breaks screen-reader row and
// column navigation across the ledger. Non-row elements pass role: "button".
function interactiveRowProps(
  onActivate: () => void,
  options?: { label?: string; className?: string; role?: "button" },
) {
  return {
    role: options?.role,
    tabIndex: 0,
    "aria-label": options?.label,
    className: cn(
      "cursor-pointer transition-colors focus-visible:relative focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      options?.className ?? "hover:bg-blue-100/45",
    ),
    onClick: onActivate,
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onActivate();
      }
    },
  };
}

// Producing artifacts for council, auditors, and public-records requests is the
// clerk's core job, so any table can export its rows as CSV.
function downloadCsv(
  filename: string,
  headers: readonly string[],
  rows: readonly (readonly (string | number)[])[],
) {
  const escape = (cell: string | number) => {
    const text = String(cell);
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  // A provenance row leads every export. Once a file is downloaded it travels
  // without the page around it, and a spreadsheet of plausible municipal
  // payments with no marking is indistinguishable from the real thing.
  const provenance = [`${SAMPLE_DATA_NOTICE} · exported ${DEMO_TODAY.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}`];
  const csv = [provenance, headers, ...rows].map((row) => row.map(escape).join(",")).join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  // Appended before the click and revoked on a later tick: a detached anchor
  // does not reliably trigger a download in every browser, and revoking the
  // object URL synchronously can cancel the write that the click just started.
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  window.setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 0);
}

function ExportButton({ onClick }: { onClick: () => void }) {
  return (
    <Button type="button" variant="ghost" size="sm" icon="note" iconPosition="leading" onClick={onClick}>
      Export CSV
    </Button>
  );
}

function BadgeDot({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full shrink-0 items-center gap-1 whitespace-nowrap rounded-2xl px-2 py-1 body-xs font-semibold",
        badgeToneClasses[toneClass(tone)],
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-2xl bg-current" />
      {children}
    </span>
  );
}

function Card({
  children,
  className,
  padded = true,
}: {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <SurfaceCard
      tone="cream"
      density="none"
      className={cn(
        "min-w-0",
        padded ? "p-4" : "",
        className,
      )}
    >
      {children}
    </SurfaceCard>
  );
}

function CardHead({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    // flex-wrap so a two-button action slot drops to its own line instead of
    // pushing the card past the viewport at 375px.
    <div className="flex flex-wrap items-start justify-between gap-3 px-4 pb-2 pt-4">
      <div className="min-w-0">
        <p className="captions text-slate-500">{eyebrow}</p>
        <h3 className="body font-semibold text-blue-900">{title}</h3>
      </div>
      {/* No shrink-0: with flex-wrap above, the action drops to its own line
          when space runs out, and shrink-0 would pin it to its max-content
          width and push the card past the viewport instead. */}
      {action ? <div className="min-w-0 max-w-full">{action}</div> : null}
    </div>
  );
}

function PageHead({
  eyebrow,
  title,
  icon,
  action,
}: {
  eyebrow: string;
  title: string;
  icon?: IconName;
  action?: React.ReactNode;
}) {
  return (
    <header className="mb-5 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
      <div className="flex items-start gap-3">
        {icon ? (
          <IconChip name={icon} tone="gold-soft" variant="tile" size="md" className="mt-1 shrink-0" />
        ) : null}
        <div>
          <p className="captions text-slate-500">{eyebrow}</p>
          <h2 className="h4 text-blue-900">
            {title}
            <HeadlineDot />
          </h2>
        </div>
      </div>
      {action}
    </header>
  );
}

// deltaTone defaults to "caution": a year-over-year *increase* shown on a spend
// metric is a budget-control signal, not a win, so it must not read as green.
const deltaToneClasses = {
  positive: "text-green-900",
  caution: "text-gold-800",
  neutral: "text-slate-500",
} as const;

function StatTile({
  label,
  value,
  sub,
  delta,
  deltaTone = "caution",
  hint,
}: {
  label: string;
  value: string | number;
  sub: string;
  delta?: string;
  deltaTone?: keyof typeof deltaToneClasses;
  hint?: string;
}) {
  return (
    <Card>
      <p className="captions text-slate-500">
        {hint ? (
          <TooltipProvider delayDuration={150}>
            <Tooltip>
              <TooltipTrigger asChild>
                {/* The definition is carried on the element itself, so a screen
                    reader reads it on focus rather than landing on a tab stop
                    that announces only the label and appears to do nothing. */}
                <span
                  tabIndex={0}
                  aria-label={`${label}. ${hint}`}
                  className="cursor-help underline decoration-dotted underline-offset-2 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {label}
                </span>
              </TooltipTrigger>
              <TooltipContent className="rounded-lg border-blue-900/15 bg-cream-50">
                <p className="body-xs text-blue-900">{hint}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          label
        )}
      </p>
      <div className="mt-2 h4 tabular-nums text-blue-900">{value}</div>
      {delta ? <div className={cn("mt-1 body-xs font-medium", deltaToneClasses[deltaTone])}>{delta}</div> : null}
      <div className="mt-1 body-xs text-slate-500">{sub}</div>
    </Card>
  );
}

function StatGrid({
  items,
}: {
  items: readonly {
    label: string;
    value: string | number;
    sub: string;
    delta?: string;
    deltaTone?: keyof typeof deltaToneClasses;
    hint?: string;
  }[];
}) {
  return (
    <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <StatTile key={item.label} {...item} />
      ))}
    </div>
  );
}

function TableCard({
  eyebrow,
  title,
  action,
  children,
}: {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card padded={false}>
      <CardHead eyebrow={eyebrow} title={title} action={action} />
      <div className="overflow-x-auto">
        <Table className="min-w-max border-collapse">{children}</Table>
      </div>
    </Card>
  );
}

function Th({ children, right = false, className }: { children: React.ReactNode; right?: boolean; className?: string }) {
  return (
    <TableHead
      className={cn(
        "border-b border-blue-900/10 px-4 py-3",
        right && "text-right",
        className,
      )}
    >
      {children}
    </TableHead>
  );
}

// ── Sortable record tables ────────────────────────────────────────────────
// One sort engine for every record table in the console, so adding sorting to
// a table is a list of accessors rather than another copy of this logic.
//
// Three states per column, not two: ascending, descending, then back to the
// table's authored order. The authored order is nearly always the meaningful
// one here (largest spend first, newest anchor first, flagged rows at the top),
// so a two-state toggle would let a presenter wreck the default mid-demo with
// no way back short of navigating away and losing their place.
//
// Deliberately not applied where the order is the meaning rather than a
// presentation choice: Revenue vs. Expenditure builds Revenue, then
// Expenditure, then Net; the Query Terminal prints the ORDER BY it ran
// directly above its grid; the auditor's sample order is the sampling method
// it states on screen; and the printed packet and records-response letter are
// documents, not screens. Sorting those does not reorder records, it makes the
// page contradict itself.
//
// A table that merely ends in a total is fine, as long as that total is
// rendered outside the mapped list and computed from the unsorted source.
// Year-End Projection does exactly that, which is why it sorts while its
// Projected row stays put.
type SortValue = string | number;
type SortDirection = "asc" | "desc";
type SortState = { key: string; direction: SortDirection } | null;
type SortColumns<Row> = Record<string, (row: Row) => SortValue>;

function compareSortValues(left: SortValue, right: SortValue) {
  if (typeof left === "number" && typeof right === "number") return left - right;
  // Numeric collation, so PO-2026-049 files before PO-2026-0210 rather than
  // after it, and "10 flags" sorts past "9 flags" in any column that mixes
  // digits into text.
  return String(left).localeCompare(String(right), "en-US", { numeric: true, sensitivity: "base" });
}

// No useMemo on the sorted copy. These tables top out in the tens of rows, so
// the compare is far cheaper than the dependency bookkeeping, and an inline
// accessor object as a dependency would defeat the memo on every render anyway.
function useTableSort<Row>(rows: readonly Row[], columns: SortColumns<Row>) {
  const [sort, setSort] = useState<SortState>(null);
  const read = sort ? columns[sort.key] : undefined;
  // Copy before sorting: Array.prototype.sort mutates in place, and these row
  // arrays are memoised upstream and counted by KPI tiles elsewhere on the page.
  const sorted =
    sort && read
      ? [...rows].sort((left, right) => (sort.direction === "asc" ? 1 : -1) * compareSortValues(read(left), read(right)))
      : rows;

  function toggle(key: string) {
    setSort((current) => {
      if (!current || current.key !== key) return { key, direction: "asc" };
      if (current.direction === "asc") return { key, direction: "desc" };
      return null;
    });
  }

  // `th` exists so a header reads `<SortTh {...table.th("vendor")}>Vendor</SortTh>`
  // instead of repeating the state and the handler on all eight columns of all
  // sixteen tables, which is where a copy-paste slip would silently wire one
  // header to the wrong column's key.
  const th = (key: string) => ({ sortKey: key, sort, onToggle: toggle });

  return { rows: sorted, sort, toggle, th };
}

// A sortable column header. The th keeps its columnheader role and carries
// aria-sort; the control lives in a span inside it, because moving role="button"
// onto the th itself would strip the header semantics a screen reader needs to
// announce the column at all.
function SortTh({
  children,
  sortKey,
  sort,
  onToggle,
  right = false,
  className,
}: {
  children: string;
  sortKey: string;
  sort: SortState;
  onToggle: (key: string) => void;
  right?: boolean;
  className?: string;
}) {
  const direction = sort?.key === sortKey ? sort.direction : null;

  return (
    <TableHead
      aria-sort={direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none"}
      className={cn("border-b border-blue-900/10 px-4 py-3", right && "text-right", className)}
    >
      <span
        {...interactiveRowProps(() => onToggle(sortKey), {
          role: "button",
          label: `${children}, ${direction === "asc" ? "sorted A to Z" : direction === "desc" ? "sorted Z to A" : "not sorted"}. Activate to change the sort.`,
          className: "inline-flex items-center gap-1 rounded-sm hover:text-blue-900",
        })}
      >
        {children}
        {/* The caret is always present, muted until the column is the sorted
            one. Rendering it only when active made the header jump sideways on
            every click, and left no hint that a column could be sorted at all. */}
        <Icon
          name={direction === "asc" ? "chevron-up" : "chevron-down"}
          size="xs"
          className={direction ? "text-blue-900" : "text-slate-300"}
        />
      </span>
    </TableHead>
  );
}

function Td({
  children,
  right = false,
  strong = false,
  className,
  ...props
}: {
  children: React.ReactNode;
  right?: boolean;
  strong?: boolean;
  className?: string;
} & React.ComponentProps<typeof TableCell>) {
  return (
    <TableCell
      className={cn(
        "border-b border-blue-900/10 px-4 py-3 align-top body-sm text-blue-700",
        right && "text-right tabular-nums",
        strong && "font-semibold text-blue-900",
        className,
      )}
      {...props}
    >
      {children}
    </TableCell>
  );
}

// A finance or records term kept as-is, with its plain-language meaning one
// hover or focus away. Same dotted-underline pattern the KPI tiles use.
function Term({ children, hint }: { children: string; hint: string }) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            tabIndex={0}
            aria-label={`${children}. ${hint}`}
            className="cursor-help underline decoration-dotted underline-offset-2 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs rounded-lg border-blue-900/15 bg-cream-50">
          <p className="body-xs normal-case tracking-normal text-blue-900">{hint}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

const TERM_HINTS = {
  anchored: "A fingerprint of this record was published to the public ledger when its month was closed. If the record is changed afterwards, the fingerprint no longer matches.",
  pending: "Recorded, but its month has not been closed yet, so its fingerprint is not published.",
  mcc: "Merchant category code: the four-digit code a card network gives each kind of business. It is how a card payment gets its category automatically.",
  encumbrance: "Money set aside for an order that has been placed but not yet paid. It is released (liquidated) when the payment goes out.",
  anomaly: "A payment a rule picked out for a person to look at. A flag is a question, not a finding.",
} as const;

// The words a flag is shown with. The ledger stores a code (SUSPICIOUS_MCC);
// every screen shows the name and the rule that fired, read from the same
// authored entry the triage queue uses.
const PLAIN_FLAG_KIND: Record<string, string> = {
  "Spend Spike": "Unusually large payment",
  "Duplicate Payment": "Possible duplicate payment",
  "Outlier Payment": "Over the contract limit",
  "Suspicious MCC": "Unusual kind of purchase",
};

// `plain` is for residents and board members: the same flag, without the
// card-network shorthand ("MCC 5812 (restaurant)" becomes "A restaurant charge").
function flagInfoFor(transaction: Pick<Transaction, "id" | "anomaly">, plain = false) {
  if (!transaction.anomaly) return null;
  const entry = anomalyQueue.find((item) => item.txId === transaction.id);
  const kind = entry?.kind ?? transaction.anomaly;
  const detail = entry?.detail ?? "";
  if (!plain) return { kind, detail };
  return { kind: PLAIN_FLAG_KIND[kind] ?? kind, detail: detail.replace(/^MCC \d+ \((\w+)\)/, "A $1 charge") };
}

function HashChip({
  value,
  label,
  tone = "neutral",
}: {
  value: string;
  label?: string;
  tone?: Tone;
}) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1 rounded-lg border px-2 py-1 captions tabular-nums",
        tone === "anchored" && "border-green-900/15 bg-green-100 text-green-900",
        tone === "info" && "border-blue-900/15 bg-blue-100 text-blue-700",
        tone === "spike" && "border-red-600/20 bg-red-100 text-red-600",
        tone === "pending" && "border-gold-800/20 bg-gold-100 text-gold-800",
        tone === "neutral" && "border-blue-900/10 bg-cream-200 text-slate-500",
      )}
      title={value}
    >
      {label ? <span className="text-current/70">{label}</span> : null}
      <span className="truncate">{value.slice(0, 8)}</span>
    </span>
  );
}

function SegmentedTabs({
  tabs,
  value,
  onChange,
  label,
}: {
  tabs: readonly { key: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className="inline-flex max-w-full gap-1 overflow-x-auto rounded-xl bg-blue-100 p-1"
    >
      {tabs.map((tab) => (
        <Button
          key={tab.key}
          type="button"
          role="tab"
          aria-selected={value === tab.key}
          variant={value === tab.key ? "filled" : "ghost"}
          size="md"
          className="h-9 shrink-0 px-3"
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}

function MiniLineChart({
  actual,
  budget,
  months,
}: {
  actual: readonly number[];
  budget?: readonly number[];
  months: readonly string[];
}) {
  const maxValue = Math.max(...actual, ...(budget ?? []));
  const width = 600;
  const height = 190;
  const paddingX = 46;
  const paddingY = 24;
  const makePoint = (value: number, index: number) => {
    const x = paddingX + (index * (width - paddingX * 2)) / (actual.length - 1);
    const y = height - paddingY - (value / maxValue) * (height - paddingY * 2);
    return `${x},${y}`;
  };
  const actualPoints = actual.map(makePoint).join(" ");
  const budgetPoints = budget?.map(makePoint).join(" ");
  const axisLabel = (value: number) => `$${value.toFixed(1).replace(/\.0$/, "")}M`;

  return (
    <div className="px-4 pb-4">
      <div className="mb-1 flex flex-wrap items-center gap-x-4 gap-y-1 body-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="h-0.5 w-4 rounded-2xl bg-blue-900" />
          Actual
        </span>
        {budget ? (
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className="h-0.5 w-4 rounded-2xl border-t-2 border-dashed border-gold-600" />
            Budget
          </span>
        ) : null}
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Monthly expenditure chart" className="h-52 w-full">
        {[0, 1, 2, 3].map((line) => {
          const y = paddingY + line * 40;
          const value = maxValue * (1 - (line * 40) / (height - paddingY * 2));
          return (
            <g key={line}>
              <line x1={paddingX} x2={width - paddingX} y1={y} y2={y} className="stroke-blue-900/10" />
              <text x={paddingX - 6} y={y + 4} textAnchor="end" className="fill-slate-500 captions">
                {axisLabel(Math.max(value, 0))}
              </text>
            </g>
          );
        })}
        {budgetPoints ? (
          <polyline
            points={budgetPoints}
            fill="none"
            stroke="currentColor"
            strokeDasharray="8 8"
            strokeWidth="4"
            className="text-gold-600"
          />
        ) : null}
        <polyline
          points={actualPoints}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          className="text-blue-900"
        />
        {actual.map((value, index) => {
          const [x, y] = makePoint(value, index).split(",").map(Number);
          return (
            <g key={months[index]}>
              <circle cx={x} cy={y} r="5" className="fill-blue-900" />
              <text x={x} y={height - 4} textAnchor="middle" className="fill-slate-500 captions">
                {months[index]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Director overlay ───────────────────────────────────────────────────────
// The presenter routes drive this console from a timeline: it pushes numbers,
// rows and statuses into a context, and the console reads them here. Outside a
// presentation the context returns its initial empty state, so every one of
// these falls through to the static snapshot and the public route behaves as
// if the director did not exist.

function useOverlayKpis() {
  const overlay = useDemoOverlay();
  const base = data.kpis;
  return {
    ...base,
    actual: overlay.kpiOverrides.actual ?? base.actual,
    encumbered: overlay.kpiOverrides.encumbered ?? base.encumbered,
    remaining: overlay.kpiOverrides.remaining ?? base.remaining,
    utilized: overlay.kpiOverrides.utilized ?? base.utilized,
  };
}

// A raised anomaly carries no transaction behind it, so it borrows its own id
// as the triage key. That keeps it addressable by the triage state map without
// colliding with a real payment id.
function useAnomalyQueue() {
  const overlay = useDemoOverlay();
  return useMemo(
    () => [
      ...overlay.extraAnomalies.map((anomaly) => ({
        kind: anomaly.kind,
        vendor: anomaly.vendor,
        dept: anomaly.dept,
        detail: anomaly.detail,
        tone: anomaly.tone,
        txId: anomaly.id,
        amount: 0,
      })),
      ...anomalyQueue,
    ],
    [overlay.extraAnomalies],
  );
}

function BudgetBullet() {
  const clipId = useId();
  const k = useOverlayKpis();
  const trackLeft = 20;
  const trackRight = 540;
  const trackSpan = trackRight - trackLeft;
  const trackTop = 6;
  const trackHeight = 30;
  const share = (value: number) => Math.min(Math.max(value / k.approved, 0), 1) * trackSpan;
  const spentWidth = share(k.actual);
  const paceX = trackLeft + trackSpan * FY_ELAPSED;
  const projectedX = trackLeft + share(projectedYearEnd(k.actual));

  const key: readonly (readonly [string, string])[] = [
    ["Spent", "h-2.5 w-2.5 rounded-sm bg-blue-900"],
    ["Encumbered", "h-2.5 w-2.5 rounded-sm bg-blue-500"],
    ["Available", "h-2.5 w-2.5 rounded-sm bg-blue-900/10"],
    [`Plan · ${Math.round(FY_ELAPSED * 100)}% of year`, "h-3.5 w-0.5 bg-gold-600"],
    [`Projected close ${fmtC(projectedYearEnd(k.actual))}`, "h-3.5 w-0.5 bg-blue-900"],
  ];

  return (
    <div className="px-4 pb-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <span className="flex flex-wrap items-baseline gap-x-2">
          <span className="h4 tabular-nums text-blue-900">{fmtC(k.actual)}</span>
          <span className="body-xs text-slate-500">spent · {Math.round((k.actual / k.approved) * 100)}% used</span>
        </span>
        <span className="body-xs text-slate-500">
          Appropriation <span className="tabular-nums text-blue-900">{fmtC(k.approved)}</span>
        </span>
      </div>

      {/* All the type lives in HTML above and below. Text inside the viewBox
          shrank with it, and at 375px the labels rendered near seven pixels. */}
      <svg
        viewBox="0 0 560 58"
        role="img"
        aria-label={`${fmtC(k.actual)} spent and ${fmtC(k.encumbered)} committed of a ${fmtC(k.approved)} appropriation, ${Math.round(FY_ELAPSED * 100)}% of the year elapsed, projected to close at ${fmtC(projectedYearEnd(k.actual))}`}
        className="mt-3 w-full"
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={trackLeft} y={trackTop} width={trackSpan} height={trackHeight} rx="6" />
          </clipPath>
        </defs>
        <rect x={trackLeft} y={trackTop} width={trackSpan} height={trackHeight} rx="6" className="fill-blue-900/10" />
        <g clipPath={`url(#${clipId})`}>
          <rect x={trackLeft} y={trackTop} width={spentWidth} height={trackHeight} className="fill-blue-900" />
          <rect x={trackLeft + spentWidth} y={trackTop} width={share(k.encumbered)} height={trackHeight} className="fill-blue-500" />
        </g>
        <line x1={paceX} y1="0" x2={paceX} y2="42" strokeWidth="2.5" className="stroke-gold-600" />
        <line x1={projectedX} y1="0" x2={projectedX} y2="42" strokeWidth="2.5" className="stroke-blue-900" />
      </svg>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 body-xs text-slate-500">
        {key.map(([label, swatch]) => (
          <span key={label} className="flex items-center gap-1.5">
            <span aria-hidden="true" className={cn("shrink-0", swatch)} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function DataBars({
  items,
  valueLabel,
  max,
  tone = "info",
}: {
  items: readonly { name: string; value: number }[];
  valueLabel?: string;
  max?: number;
  tone?: Tone;
}) {
  const largest = max ?? Math.max(...items.map((item) => item.value));

  return (
    <div className="grid gap-3 p-4 pt-0">
      {items.map((item) => (
        <div key={item.name} className="grid gap-1">
          <div className="flex min-w-0 items-start justify-between gap-3">
            <span className="min-w-0 body-xs font-medium text-blue-900">{item.name}</span>
            <span className="shrink-0 body-xs tabular-nums text-slate-500">
              {valueLabel ? `${valueLabel} ` : ""}
              {fmtUSD(item.value)}
            </span>
          </div>
          <Progress value={Math.round((item.value / largest) * 100)} indicatorClassName={progressToneClasses[tone]} />
        </div>
      ))}
    </div>
  );
}

// Vendor spend as parts of a whole, for the Vendors page. Spend is heavily
// concentrated: six vendors carry three quarters of it and every one of the
// remaining thirty-four sits under two percent, so a slice per vendor would be
// a ring of hairlines nobody can read or click. The six largest are named and
// the tail is pooled into a single neutral slice that states how many vendors
// are inside it, which keeps the chart to seven legible wedges without hiding
// where the money went. The pooled slice is often the biggest one on screen,
// and that is the point: the long tail is a quarter of all vendor spend.
const PIE_NAMED_SLICES = 6;
// Fill and swatch are the same colour written twice because Tailwind cannot see
// through a `fill-${...}` template, and the design policy blocks that pattern
// outright. Hues alternate rather than ramping so no two neighbouring wedges
// read as the same colour, and the pooled tail takes the one grey.
const PIE_SLICE_COLORS = [
  { fill: "fill-blue-900", swatch: "bg-blue-900" },
  { fill: "fill-gold-600", swatch: "bg-gold-600" },
  { fill: "fill-green-600", swatch: "bg-green-600" },
  { fill: "fill-blue-500", swatch: "bg-blue-500" },
  { fill: "fill-slate-500", swatch: "bg-slate-500" },
  { fill: "fill-gold-300", swatch: "bg-gold-300" },
] as const;
const PIE_REMAINDER_COLOR = { fill: "fill-slate-400", swatch: "bg-slate-400" } as const;

function pieSlicePath(cx: number, cy: number, radius: number, startAngle: number, endAngle: number) {
  const round = (value: number) => Math.round(value * 100) / 100;
  const x1 = round(cx + radius * Math.cos(startAngle));
  const y1 = round(cy + radius * Math.sin(startAngle));
  const x2 = round(cx + radius * Math.cos(endAngle));
  const y2 = round(cy + radius * Math.sin(endAngle));
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

function VendorSpendPie({ vendors }: { vendors: readonly VendorSummary[] }) {
  const total = vendors.reduce((sum, vendor) => sum + vendor.total, 0);
  const named = vendors.slice(0, PIE_NAMED_SLICES);
  const tail = vendors.slice(PIE_NAMED_SLICES);
  const tailTotal = tail.reduce((sum, vendor) => sum + vendor.total, 0);

  const slices = [
    ...named.map((vendor, index) => ({
      name: vendor.vendor,
      value: vendor.total,
      ...PIE_SLICE_COLORS[index],
    })),
    ...(tail.length > 0
      ? [{ name: `All other vendors (${tail.length})`, value: tailTotal, ...PIE_REMAINDER_COLOR }]
      : []),
  ];

  // Wedges run clockwise from twelve o'clock, largest first, in exactly the
  // order the legend lists them, so the two can be read together without
  // hunting. Labels stay out of the wedges: at this size a 7% slice cannot
  // hold text, and half-legible numbers on a chart are worse than none.
  let angle = -Math.PI / 2;
  const wedges = slices.map((slice) => {
    const start = angle;
    angle += (slice.value / total) * Math.PI * 2;
    return { ...slice, share: slice.value / total, d: pieSlicePath(100, 100, 94, start, angle) };
  });

  if (total <= 0) return null;

  return (
    <div className="px-4 pb-4">
      <svg
        viewBox="0 0 200 200"
        role="img"
        aria-label={`Vendor spending as a share of ${fmtC(total)} paid to ${vendors.length} vendors. ${wedges
          .map((wedge) => `${wedge.name}, ${fmtC(wedge.value)}, ${pct(wedge.share)}`)
          .join(". ")}.`}
        className="mx-auto h-40 w-40"
      >
        {wedges.map((wedge) => (
          <path key={wedge.name} d={wedge.d} strokeWidth="2" className={cn(wedge.fill, "stroke-cream-50")} />
        ))}
      </svg>
      {/* The legend is the readable half of a pie chart. Every wedge prints its
          dollars and its share as real text, so nobody has to judge an angle. */}
      <ul className="mt-3 grid gap-2">
        {wedges.map((wedge) => (
          <li key={wedge.name} className="flex min-w-0 items-center justify-between gap-2">
            <span className="flex min-w-0 items-center gap-2">
              <span aria-hidden="true" className={cn("h-2 w-2 shrink-0 rounded-sm", wedge.swatch)} />
              <span className="min-w-0 truncate body-xs font-medium text-blue-900">{wedge.name}</span>
            </span>
            <span className="shrink-0 body-xs tabular-nums text-slate-500">
              {fmtC(wedge.value)} · {pct(wedge.share)}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 body-xs text-slate-500">
        Vendor payments only: payroll, benefits and retirement make up most of the rest of the year&apos;s spending. Share of the {fmtC(total)} paid to {vendors.length} vendors so far this fiscal year. Every vendor is listed in the directory below.
      </p>
    </div>
  );
}

// Department pace against the calendar, for the Overview. The bar is the share
// of a department's budget already spent and the notch is the share of the
// fiscal year already gone, so a bar past the notch is a department spending
// faster than the year is passing. Tone and ordering both come from
// departmentPace(), the same function fiscalHealth() counts with, so this chart
// and the health strip above it cannot publish different lists.
function PaceBars({ onDrill }: { onDrill: (next: Partial<LedgerFilter>) => void }) {
  const bandSettings = useBandSettings().settings;
  const [showAll, setShowAll] = useState(false);
  const rows = data.departments
    .map((department) => {
      const pace = departmentPace(department, bandSettings);
      return {
        name: department.name,
        usedPct: (department.spent / department.budget) * 100,
        projectedPct: projectedYearEnd(department.spent) / department.budget,
        label: pace,
        tone: PACE_TONE[pace],
      };
    })
    .sort((a, b) => b.projectedPct - a.projectedPct);
  // Six healthy-padded rows take the card from 882px to 534px on desktop, still
  // taller than the 310px trend chart beside it but no longer a screen of green
  // bars nobody reads. The floor grows rather than truncating: collapsing a
  // flagged department out of sight is the one thing a triage chart must not do.
  const collapsedCount = Math.max(6, rows.filter((row) => row.label !== "Healthy").length);
  // What the collapsed view actually renders. The floor of six is not the same
  // as the row count once there are fewer than six departments, and printing the
  // floor read "showing the 6 furthest along of 4 departments".
  const collapsedShown = Math.min(collapsedCount, rows.length);
  const visible = showAll ? rows : rows.slice(0, collapsedCount);

  return (
    <>
      <div className="grid gap-1 p-4 pt-0">
        {visible.map((row) => (
          <div
            key={row.name}
            {...interactiveRowProps(() => onDrill({ query: row.name }), {
              role: "button",
              label: `${row.name}, ${Math.round(row.usedPct)} percent of budget used, projected ${Math.round(row.projectedPct * 100)} percent at year end, ${row.label}. View its payments.`,
              className: "rounded-lg p-2 hover:bg-blue-100/45",
            })}
          >
            <div className="flex min-w-0 items-center justify-between gap-3">
              <span className="min-w-0 truncate body-xs font-medium text-blue-900">{row.name}</span>
              {/* The status word carries the colour. Without it two departments
                  can both read 102% projected and take different colours,
                  because the 2% tolerance cuts between 102.3 and 101.9 and
                  integer rounding hides the difference. */}
              <span className="flex shrink-0 items-center gap-2">
                <span className="body-xs tabular-nums text-slate-500">
                  {Math.round(row.usedPct)}% used, {Math.round(row.projectedPct * 100)}% projected
                </span>
                <BadgeDot tone={row.tone}>{row.label}</BadgeDot>
              </span>
            </div>
            <div className="relative mt-1.5">
              <Progress value={Math.min(Math.round(row.usedPct), 100)} indicatorClassName={progressToneClasses[row.tone]} />
              {/* The notch is FY_ELAPSED written as a literal: Tailwind arbitrary
                  values cannot read a constant and this file's lint bars inline
                  styles. The caption below derives from FY_ELAPSED, so if that
                  number ever changes the two visibly disagree on screen rather
                  than drifting quietly. */}
              <span aria-hidden="true" className="absolute top-0 left-[75%] h-2 w-0.5 rounded-2xl bg-blue-900/70" />
            </div>
          </div>
        ))}
      </div>
      {rows.length > collapsedCount ? (
        <div className="px-4">
          <Button type="button" variant="ghost" size="sm" onClick={() => setShowAll((value) => !value)}>
            {showAll ? `Show the ${collapsedShown} furthest along` : `Show all ${rows.length} departments`}
          </Button>
        </div>
      ) : null}
      <p className="px-4 pb-4 pt-2 body-xs text-slate-500">
        Bar is the share of each budget already spent. The notch marks the {Math.round(FY_ELAPSED * 100)}% of the fiscal year that has elapsed, so a bar past the notch is running ahead of the calendar. {showAll ? "All" : `Showing the ${collapsedShown} furthest along of`} {rows.length} departments, sorted by projected year-end. Select a department to see the payments behind it.
      </p>
    </>
  );
}

function ChartCard({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card padded={false} className={className}>
      <CardHead eyebrow={eyebrow} title={title} />
      {children}
    </Card>
  );
}

// The busiest cell, resolved from the data rather than named by hand, so the
// walkthrough cannot end up pointing at a cell that is no longer the hot one.
// Column headers abbreviate; sentences do not.
const MONTH_NAMES: Record<string, string> = { Jul: "July", Aug: "August", Sep: "September", Oct: "October", Nov: "November", Dec: "December", Jan: "January", Feb: "February", Mar: "March", Apr: "April", May: "May", Jun: "June" };
const fullMonth = (short: string) => MONTH_NAMES[short] ?? short;

const heatmapPeak = (() => {
  let best: { row: string; month: string; value: number } = { row: data.heatmap.rows[0], month: data.heatmap.cols[0], value: -1 };
  data.heatmap.rows.forEach((row, rowIndex) => {
    data.heatmap.values[rowIndex].forEach((value, colIndex) => {
      if (value > best.value) best = { row, month: data.heatmap.cols[colIndex], value };
    });
  });
  return best;
})();

function HeatmapChart({ onCellClick, tour = null }: { onCellClick?: (dept: string, month: string) => void; tour?: TourState | null }) {
  return (
    <div className="grid gap-2 p-4 pt-0">
      <div className="grid grid-cols-[minmax(6.5rem,1fr)_repeat(5,minmax(1.75rem,2.25rem))] items-center gap-1.5 captions text-slate-500 sm:grid-cols-[minmax(10rem,1fr)_repeat(5,minmax(2.25rem,3rem))] sm:gap-2">
        <span />
        {data.heatmap.cols.map((col) => (
          <span key={col} className="text-center">{col}</span>
        ))}
      </div>
      {data.heatmap.rows.map((row, rowIndex) => (
        <div
          key={row}
          className="grid grid-cols-[minmax(6.5rem,1fr)_repeat(5,minmax(1.75rem,2.25rem))] items-center gap-1.5 sm:grid-cols-[minmax(10rem,1fr)_repeat(5,minmax(2.25rem,3rem))] sm:gap-2"
        >
          <span className="min-w-0 truncate body-xs font-medium text-blue-900">{row}</span>
          {data.heatmap.values[rowIndex].map((value, colIndex) => {
            const clickable = Boolean(onCellClick) && value > 0;
            const month = data.heatmap.cols[colIndex];
            const cellClass = cn(
              "inline-flex h-8 items-center justify-center rounded-lg border captions tabular-nums sm:h-9",
              heatmapClass(value),
              clickable &&
                "cursor-pointer transition-transform hover:scale-110 hover:ring-2 hover:ring-blue-700/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            );
            const cell = (
              <span
                key={`${row}-${month}`}
                role="button"
                tabIndex={0}
                className={cellClass}
                onClick={() => onCellClick?.(row, month)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onCellClick?.(row, month);
                  }
                }}
                aria-label={`${value} flagged ${value === 1 ? "transaction" : "transactions"} in ${row}, ${month}. View them in the ledger.`}
              >
                {value}
              </span>
            );
            // Wrapped whether or not a walkthrough is running, so the cell does
            // not remount when the step arrives. `grid` keeps the wrapper the
            // same size as the cell it replaces in the row.
            const isPeak = row === heatmapPeak.row && month === heatmapPeak.month;
            return clickable ? (
              isPeak ? (
                <TourSpot key={`${row}-${month}`} tour={tour} id="anomalies:hot-cell" className="grid">
                  {cell}
                </TourSpot>
              ) : (
                cell
              )
            ) : (
              <span key={`${row}-${month}`} className={cellClass}>
                {value === 0 ? "" : value}
              </span>
            );
          })}
        </div>
      ))}
      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 captions text-slate-500">
        <span>Flagged transactions / month:</span>
        {["None", "Low", "Medium", "High"].map((label, level) => (
          <span key={label} className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className={cn("inline-block size-3 rounded border", heatmapClass(level))} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// Departments projected to finish over budget, worst first. Lifted to module
// scope because the walkthrough quotes the worst one by name and by percentage,
// and a number written into the copy by hand would drift the first time the
// fixture changes.
function buildWatchList(settings: BandSettings = DEFAULT_BAND_SETTINGS) {
  return data.departments
    .filter((department) => departmentPace(department, settings) === "At risk")
    .map((department) => ({
      name: department.name,
      projectedPct: projectedYearEnd(department.spent) / department.budget,
      overPct: Math.round((projectedYearEnd(department.spent) / department.budget - 1) * 100),
    }))
    .sort((a, b) => b.projectedPct - a.projectedPct);
}

// At the default settings. The intro and the walkthrough copy quote this one,
// because they are written before anyone can have moved a threshold.
const watchList = buildWatchList();

// One record in the demo has been altered after it was anchored. Without it the
// verifier can only ever return green, which makes it a badge rather than a
// proof, and it leaves the obvious question ("show me a tampered record") with
// no answer. Its stored fingerprint differs from the one recomputed from source.
const TAMPERED_TX_ID = "TX-480119";

// The opening. Beats revealed one at a time, before the console is mentioned
// at all. The point is to hand the viewer a situation rather than a product:
// three large beats set the problem, then the smaller lines say what is
// different here (seen early enough to fix, same numbers for everyone, every
// payment open to check).
//
// Written for a reader with no finance background, and for one who holds no
// town role at all. So no "books", no "ledger", and nothing that tells the
// reader who they are.
//
// The count is read from the fixtures for the same reason the walkthrough
// copy is. A screen that opens on "3 departments are spending faster than
// their budgets allow" had better be able to name three.
type StoryBeat = {
  text: string;
  tone: "beat" | "turn";
  // A word set in italic. Split on, so it must appear once in the text.
  emphasis?: string;
  // Overrides the standard gap before this beat arrives.
  pauseBefore?: number;
};

// The department count opens a sentence that sits right under "Three months",
// so it is spelled out to match. The count still comes from the fixtures; past
// twelve (there are twelve departments) it falls back to the digits.
const COUNT_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
const countWord = (count: number) => COUNT_WORDS[count] ?? String(count);

// The one line of the opening that carries a number. It is rebuilt from the
// current thresholds when the story is replayed, so it cannot say "three" over
// a console that has just been told to count differently.
const OVERSPEND_BEAT = 2;
function overspendLine(count: number) {
  if (count === 0) return "No department is spending faster than its budget allows.";
  if (count === 1) return "One department is spending faster than its budget allows.";
  return `${countWord(count)} departments are spending faster than their budgets allow.`;
}

const storyBeats: readonly StoryBeat[] = [
  { text: "It is March.", tone: "beat" },
  { text: "Three months are left in the budget year.", tone: "beat" },
  { text: overspendLine(watchList.length), tone: "beat" },
  { text: "In most places, people find out in June, when the money is gone.", tone: "turn" },
  // The turn lands on its own, after a longer hold than the beats before it.
  { text: "In this town, everyone sees it now, while there is still time to fix it.", tone: "turn", emphasis: "now", pauseBefore: 2600 },
  // "Each from their own view": a resident and a finance director read the
  // same figures, but not through the same screens or with the same access.
  { text: "The finance office, the board, the auditor and the public all see the same numbers, each from their own view.", tone: "turn" },
  { text: "And anyone can check any payment.", tone: "turn" },
];

// The walkthroughs. Defined here, below the fixtures they quote, because every
// number in this copy is read from the data rather than typed in: a step that
// promises three flagged payments and then delivers four is worse than a step
// that promised nothing.
//
// Each script sets up a claim and then pays it off. That is the whole shape:
// the step before the payoff says what is about to happen, so the viewer has
// something to check rather than something to admire.
type WatchList = ReturnType<typeof buildWatchList>;

// How many departments a sentence is about, for any count the thresholds can
// produce, so the copy never reads "each of the 1 departments".
function departmentsNeedingNote(count: number) {
  if (count === 0) return "any department that needs one";
  if (count === 1) return "the one department that needs it";
  return `each of the ${count} departments that need one`;
}

function buildTours(watchList: WatchList): Partial<Record<ViewRole, { steps: readonly TourStep[]; outro: TourOutro }>> {
  return {
  finance: {
    steps: [
      {
        target: "nav:anomalies",
        kind: "click",
        title: "Start where the money looks wrong",
        body: "Every payment is checked against a public list of rules as it lands. Open the ones it flagged.",
      },
      {
        target: "anomalies:hot-cell",
        kind: "click",
        page: "anomalies",
        title: `This cell says ${heatmapPeak.value}`,
        body: `Departments down the side, months across the top. ${heatmapPeak.row} in ${fullMonth(heatmapPeak.month)} is the busiest cell in the year. Click it and count what comes back.`,
      },
      {
        target: "ledger:results",
        kind: "look",
        page: "ledger",
        title: `${heatmapPeak.value}, exactly as promised`,
        body: "The chart did not round or estimate, it filtered. Same department, same month, flagged only, and every row carries its own proof that it has not been changed.",
      },
      {
        target: "nav:anomalies",
        kind: "click",
        title: "Seeing it is half the job",
        body: "Those flags are waiting on a decision. Go back to the Anomaly Center.",
      },
      {
        target: "anomalies:queue",
        kind: "look",
        page: "anomalies",
        title: "Decide, and sign it",
        body: "Resolve a flag with a reason, hand it to a colleague, or leave a note. Each action is recorded with your name and the time, so the next reader sees who decided what.",
      },
    ],
    outro: {
      title: "You followed a flag to the payments underneath it",
      body: `The heatmap promised ${heatmapPeak.value} flagged payments in ${heatmapPeak.row} for ${fullMonth(heatmapPeak.month)}, and the payment list returned exactly ${heatmapPeak.value}. Nothing between the chart and the record is an estimate, which is why the two can never disagree. The queue is where each flag gets its decision, signed by whoever made it.`,
    },
  },
  manager: {
    steps: [
      {
        target: "nav:report",
        kind: "click",
        title: "Your monthly obligation to the board",
        body: "The monthly report the Select Board expects, its packet, is put together here, not in a spreadsheet.",
      },
      {
        target: "report:generate",
        kind: "click",
        page: "report",
        title: "Nothing here gets retyped",
        body: "The packet is built from the same figures Finance is working in. Press this and watch the cover fill itself in.",
      },
      {
        target: "report:packet",
        kind: "look",
        page: "report",
        title: "Dated, sourced, ready for the agenda",
        body: `Cover, reporting period, your memo, and a note explaining the overspend for ${departmentsNeedingNote(watchList.length)}. It can run itself on the 1st of each month without you opening the console at all.`,
      },
    ],
    outro: {
      title: "You built the board packet in one click",
      body: `The March 2026 packet built itself from live figures, with a note explaining the overspend for ${departmentsNeedingNote(watchList.length)}. The version the board reads and the version you work in are the same numbers, so nothing has to be matched up between them.`,
    },
  },
  public: {
    steps: [
      {
        target: "board:summary",
        kind: "look",
        page: "board",
        title: "Written for you, not for accountants",
        body: "One page, plain language, no fund accounting to decode before you can ask a question.",
      },
      {
        target: "board:watch-row",
        kind: "click",
        page: "board",
        title: `${watchList[0]?.name ?? "One department"} is the one to ask about`,
        body: `It is projected about ${watchList[0]?.overPct ?? 0}% over budget by June. That is the claim. Click it and see what makes it true.`,
      },
      {
        target: "ledger:results",
        kind: "look",
        page: "ledger",
        title: `This is what ${watchList[0]?.overPct ?? 0}% looks like`,
        body: "The plain-English number and the payments underneath it are the same record, one click apart. You can ask your question with the evidence already open in front of you.",
      },
    ],
    outro: {
      title: "You went from a headline to the receipts",
      body: `${watchList[0]?.name ?? "A department"} is projected about ${watchList[0]?.overPct ?? 0}% over budget, and you saw the payments behind that number without asking anyone to prepare a report or waiting for the next meeting.`,
    },
  },
  resident: {
    steps: [
      {
        target: "public:records-response",
        kind: "click",
        page: "public",
        title: "A records request usually takes weeks",
        body: "Suppose you asked the town for every payment it made this year. They are already published on this page. Press this and time how long the answer takes.",
      },
      {
        target: "public:letter",
        kind: "look",
        page: "public",
        title: "That took about a second",
        body: "Dated, stamped with where it came from, with the matching payments attached. No login, no form, and nobody to chase for it.",
      },
      {
        target: "nav:verify",
        kind: "click",
        title: "And you do not have to trust any of it",
        body: "The town says these payments are real. Open Record Integrity and test one for yourself.",
      },
      {
        target: "verify:try",
        kind: "click",
        page: "verify",
        title: "Pick a payment and check it",
        body: "Every payment has an id like this one. Press it and the page recalculates that payment's fingerprint in front of you.",
      },
      {
        target: "verify:match",
        kind: "look",
        page: "verify",
        title: "It matches what was published",
        body: "The fingerprint calculated just now is the same one the town published when it closed the month. If anyone had changed the payment since, the two would differ.",
      },
    ],
    outro: {
      title: "You answered your own records request",
      body: "The town published every payment, produced a dated response to a records request in one click, and you checked one of those payments yourself without taking the town's word for it.",
    },
  },
  ap: {
    steps: [
      {
        target: "ledger:results",
        kind: "look",
        page: "ledger",
        title: "Your working list",
        body: "Every payment, newest first. Open any row to recode it, attach the invoice or resolve its flag. Each change is added to that payment's history with your name on it.",
      },
      {
        target: "nav:anomalies",
        kind: "click",
        title: "The ones a rule picked out",
        body: "A few payments were flagged as they arrived. Open the Anomaly Center to see them in one place.",
      },
      {
        target: "anomalies:queue",
        kind: "look",
        page: "anomalies",
        title: "Clear them one at a time",
        body: "Each flag names the rule that fired. Resolve it with a reason, assign it, or leave a note, and select the payment id to open the payment itself.",
      },
    ],
    outro: {
      title: "You found your queue",
      body: "The payment list is where you fix a record, and the Anomaly Center is where you clear what the rules flagged. Both keep a signed history, so nothing you change is anonymous.",
    },
  },
  it: {
    steps: [
      {
        target: "admin:feed",
        kind: "look",
        page: "admin",
        title: "One feed has stopped",
        body: "The numbers in this console arrive from three systems. The ERP feed has not updated in two days, and this is the page that says so.",
      },
      {
        target: "admin:feed-retry",
        kind: "click",
        page: "admin",
        title: "Reconnect it",
        body: "Press this to retry the connection.",
      },
      {
        target: "admin:feed",
        kind: "look",
        page: "admin",
        title: "Back in sync",
        body: "The feed reconnects and stamps the time. Users, roles and the category rules live in the other tabs on this page.",
      },
    ],
    outro: {
      title: "You brought a feed back",
      body: "A stalled feed is reported where someone can act on it, with the time it stopped and a way to reconnect it. The other tabs hold who has access and how payments are categorised.",
    },
  },
  auditor: {
    steps: [
      {
        target: "audit:sample",
        kind: "look",
        page: "audit",
        title: "Your sample is already pulled",
        body: "Every flagged payment in the year, with its fingerprint and where it was published. You can change the sampling method later. First, find out whether the record itself can be trusted.",
      },
      {
        target: "nav:verify",
        kind: "click",
        title: "Open Record Integrity",
        body: "Every other page in this console assumes the record is intact. This is the page where you test that assumption.",
      },
      {
        target: "verify:altered",
        kind: "click",
        page: "verify",
        title: "One record here was altered",
        body: `${TAMPERED_TX_ID} was changed after it was anchored. In the payment list it looks like any other row. Check it.`,
      },
      {
        target: "verify:mismatch",
        kind: "look",
        page: "verify",
        title: "It does not match its anchor",
        body: "The fingerprint recomputed from source shares nothing with the anchored one. The anchor cannot be rewritten, which is the only reason the change is visible at all.",
      },
    ],
    outro: {
      title: "You caught a falsified record",
      body: `${TAMPERED_TX_ID} was altered after it was anchored, and the recomputed fingerprint proved it. Take the flagged sample from your workspace with you: the export carries the hash, the ledger transaction and the block for every row.`,
      artifact: { label: "Export the audit package", run: () => exportAuditPackage(buildAuditSample("flagged")) },
    },
  },
  };
}

// At the default thresholds. The welcome screen reads this for step counts,
// which no threshold changes; the console builds its own from live settings.
const tours = buildTours(watchList);

function BoardViewPage({ onDrill, onNavigate, tour }: { onDrill: (next: Partial<LedgerFilter>) => void; onNavigate: (key: PageKey) => void; tour: TourState | null }) {
  const bandSettings = useBandSettings().settings;
  const boardWatchList = buildWatchList(bandSettings);
  const k = useOverlayKpis();
  const anomalies = useAnomalyQueue();
  // Filter on the ratio, round only to print it. Rounding first and comparing
  // the rounded number against 2 admitted Harbour & Waterfront at 1.905%, which
  // the Overview strip excluded, so the two pages published different lists.
  const topAnomalies = anomalies.slice(0, 3);

  return (
    <article>
      <PageHead
        eyebrow="For the Select Board · FY2026 · as of Mar 2026"
        title="Board View"
        icon="note"
        action={
          <Button type="button" variant="soft" size="sm" icon="note" iconPosition="leading" onClick={() => window.print()}>
            Print / PDF
          </Button>
        }
      />
      <TourSpot tour={tour} id="board:summary" surface="page" className="mb-4 rounded-2xl">
      <Card>
        <p className="body text-slate-500">
          The town set aside <b className="text-blue-900">{fmtUSD(k.approved)}</b> to run services and projects this year. Through March we have spent <b className="text-blue-900">{fmtUSD(k.actual)}</b> ({k.utilized}% of the plan) and committed another <b className="text-blue-900">{fmtUSD(k.encumbered)}</b> to work already ordered, leaving <b className="text-blue-900">{fmtUSD(k.remaining)}</b> still to spend. Overall spending is close to plan{watchList.length ? ", with a few departments to keep an eye on (below)." : "."}
        </p>
      </Card>
      </TourSpot>
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="captions text-slate-500">Budget for the year</p>
          <div className="mt-2 h4 tabular-nums text-blue-900">{fmtC(k.approved)}</div>
          <div className="mt-1 body-xs text-slate-500">Approved at Town Meeting</div>
        </Card>
        <Card>
          <p className="captions text-slate-500">Spent so far</p>
          <div className="mt-2 h4 tabular-nums text-blue-900">{fmtC(k.actual)}</div>
          <div className="mt-1 body-xs text-slate-500">{k.utilized}% of the plan, about three quarters through the year</div>
        </Card>
        <Card>
          <p className="captions text-slate-500">Still available</p>
          <div className="mt-2 h4 tabular-nums text-blue-900">{fmtC(k.remaining)}</div>
          <div className="mt-1 body-xs text-slate-500">After spending and money already committed</div>
        </Card>
      </div>
      <div className="grid items-start gap-4 lg:grid-cols-2">
      <Card>
        <p className="captions text-slate-500">What to watch</p>
        <h3 className="mb-3 body font-semibold text-blue-900">Departments trending over budget</h3>
        {boardWatchList.length ? (
          <div className="grid gap-2">
            {boardWatchList.map((department, index) => (
              // The walkthrough points at the worst department, which is the
              // first row: watchList is already sorted by projected overrun.
              <TourSpot key={department.name} tour={index === 0 ? tour : null} id="board:watch-row">
              <div
                {...interactiveRowProps(() => onDrill({ query: department.name }), {
                  role: "button",
                  label: `${department.name}, projected about ${department.overPct}% over budget. View its payments.`,
                  className: "hover:border-blue-900/30 hover:bg-blue-100/40",
                })}
              >
                <div className="flex items-start justify-between gap-3 rounded-lg border border-blue-900/10 p-3">
                  <p className="min-w-0 body-sm font-semibold text-blue-900">{department.name}</p>
                  <span className="shrink-0 body-xs text-slate-500">Projected about <b className="text-blue-900">{department.overPct}%</b> over budget at the current pace</span>
                </div>
              </div>
              </TourSpot>
            ))}
          </div>
        ) : (
          <p className="body-sm text-slate-500">Every department is projected to finish within its budget at the current pace.</p>
        )}
        <p className="mt-3 body-xs text-slate-500">Select a department to see the payments behind the number.</p>
      </Card>
      <Card>
        <p className="captions text-slate-500">Flagged for review</p>
        <h3 className="mb-3 body font-semibold text-blue-900">Unusual payments the system caught</h3>
        <div className="grid gap-2">
          {topAnomalies.map((anomaly) => (
            <div
              key={anomaly.txId}
              {...interactiveRowProps(() => onDrill({ query: anomaly.vendor }), {
                role: "button",
                label: `${anomaly.kind} for ${anomaly.vendor}, ${fmtUSD(anomaly.amount)}. View the payment.`,
                className: "hover:border-blue-900/30 hover:bg-blue-100/40",
              })}
            >
              <div className="flex items-start justify-between gap-3 rounded-lg border border-blue-900/10 p-3">
                <div className="min-w-0">
                  <p className="body-sm font-semibold text-blue-900">{anomaly.vendor} <span className="tabular-nums text-slate-500">{fmtUSD(anomaly.amount)}</span></p>
                  <p className="body-xs text-slate-500">{anomaly.detail}, in {anomaly.dept}.</p>
                </div>
                <BadgeDot tone={anomaly.tone}>{anomaly.kind}</BadgeDot>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 body-xs text-slate-500">
          Flagged automatically and reviewed by Finance. Select any payment to see it in the ledger, or{" "}
          <Button type="button" variant="ghost" size="sm" className="h-auto px-1 py-0 align-baseline" onClick={() => onNavigate("dept")}>open Department Analysis</Button>{" "}
          for the full picture.
        </p>
      </Card>
      </div>
    </article>
  );
}

// Plain-language definitions for the jargon a non-finance reader meets across
// the console (anomaly types, plus the ledger terms from the transaction
// detail). Shown as the glossary at the bottom of the Overview tab.
const glossary: readonly (readonly [string, string])[] = [
  ["Spend Spike", "A payment far above a department's usual spending for that category, flagged when it runs several times the median payment for that category."],
  ["Suspicious MCC", "The merchant category code (the type of business paid) doesn't fit what the card or department should be buying, such as a restaurant charge on a library card."],
  ["Duplicate Payment", "The same vendor appears to have been paid twice for what looks like the same invoice or amount."],
  ["Outlier Payment", "A payment that statistically stands apart from the normal pattern for that vendor or department."],
  ["MCC (Merchant Category Code)", "A four-digit code for the type of business that was paid. For example, 5812 means a restaurant."],
  ["Encumbrance", "Money set aside for an order or contract that has been committed but not yet paid out."],
  ["Anchored", "A fingerprint of the record has been written to a public ledger, so the record cannot be altered later without it showing."],
  ["Fingerprint (SHA-256)", "A unique digital signature of the record. If even one character changes, the fingerprint changes, which proves nothing was edited."],
  ["Ledger TX", "The transaction's address on the public ledger, where anyone can independently confirm it."],
  ["Variance", "The gap between what was budgeted and what was actually spent."],
];

function OverviewPage({ onNavigate, onDrill, canOpenContracts }: { onNavigate: (key: PageKey) => void; onDrill: (next: Partial<LedgerFilter>) => void; canOpenContracts: boolean }) {
  const bandSettings = useBandSettings().settings;
  const contractsOver = data.contracts.filter((contract) => contract.util > 1).length;
  const contractsExpiring = data.contracts.filter((contract) => contract.days <= 90).length;
  const k = useOverlayKpis();
  const anomalies = useAnomalyQueue();
  const health = fiscalHealth(bandSettings);
  const anchorTable = useTableSort(data.recentAnchors, {
    vendor: (row) => row[0],
    amount: (row) => row[1],
  });

  // The spend trend used to plot nine months of a line that only goes up, which
  // cannot answer either question an executive brings to it: how much should we
  // have spent by now, and how much would be too much. So the axis runs the full
  // July-to-June year and carries three references beside the actual series:
  // the plan (straight-line against the adopted budget, which is what the nine
  // authored budget points already are), the appropriation itself as the ceiling,
  // and a dashed continuation showing where the current pace lands against it.
  // Every number is derived, so none of this can drift from the KPIs above it.
  // How far off the plan line the town is running. Too small a share of any
  // axis to draw, so the caption states it.
  const varianceToDate = k.actual - k.approved * FY_ELAPSED;

  return (
    <>
      <PageHead eyebrow="Municipal Finance · FY2026" title="Overview" icon="metric" />
      <StatGrid
        items={[
          { label: "Adopted Budget", value: fmtC(k.approved), sub: "FY2026 appropriation", hint: "Total spending the town authorized for the fiscal year (the appropriation adopted at Town Meeting)." },
          { label: "YTD Actual Spend", value: fmtC(k.actual), sub: `${k.utilized}% utilized`, delta: `+${k.yoy}% YoY`, hint: "Money actually spent so far this fiscal year, through the current month." },
          { label: "Encumbrances", value: fmtC(k.encumbered), sub: "Open commitments", hint: "Money already committed to open purchase orders and contracts, but not yet paid out." },
          { label: "Unencumbered Balance", value: fmtC(k.remaining), sub: `${Math.round((k.remaining / k.approved) * 100)}% of budget`, hint: "Budget still available to spend: adopted budget minus actual spending and open commitments." },
        ]}
      />
      <Card className="mb-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <BadgeDot tone={townHealth(bandSettings).tone}>{townHealth(bandSettings).label}</BadgeDot>
            <TooltipProvider delayDuration={150}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span tabIndex={0} className="body-xs text-slate-500 cursor-help underline decoration-dotted underline-offset-2 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">{health.atRisk} at risk · {health.watch} watch · {health.healthy} healthy</span>
                </TooltipTrigger>
                <TooltipContent className="rounded-lg border-blue-900/15 bg-cream-50">
                  <p className="body-xs text-blue-900">How each department is tracking against its budget. Healthy: comfortably within budget. Watch: approaching the limit. At risk: over the appropriation or projected to exceed it at the current pace.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <span className="body-xs text-slate-500">Counted from the {data.departments.length} department budgets</span>
        </div>
        {/* Contracts were the one deadline-driven thing with no presence on the
            page a director opens first. */}
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-blue-900/10 pt-3 body-xs text-slate-500">
          <span>Contracts: {contractsOver} over their limit · {contractsExpiring} expiring within 90 days</span>
          {canOpenContracts ? (
            <Button type="button" variant="ghost" size="sm" onClick={() => onNavigate("contracts")}>Open Contracts</Button>
          ) : null}
        </div>
      </Card>
      <div className="mb-4 grid gap-4 xl:grid-cols-3">
        <div className="grid gap-4 xl:col-span-2">
          <ChartCard eyebrow="Budget position" title="Spend Against Appropriation">
            <BudgetBullet />
            <p className="px-4 pb-4 body-xs text-slate-500">
              The bar is the whole appropriation. The town is {fmtC(Math.abs(varianceToDate))} {varianceToDate < 0 ? "behind" : "ahead of"} the plan line and on pace to close at {fmtC(projectedYearEnd(k.actual))}, {fmtC(Math.abs(k.approved - projectedYearEnd(k.actual)))} {projectedYearEnd(k.actual) > k.approved ? "over" : "under"} the appropriation.
            </p>
          </ChartCard>
          <ChartCard eyebrow="Budget pace" title="Department Pace vs Calendar">
            <PaceBars onDrill={onDrill} />
          </ChartCard>
          <TableCard eyebrow="Anchored records" title="Recent Anchors">
            <thead>
              <tr>
                <SortTh {...anchorTable.th("vendor")}>Vendor</SortTh>
                <SortTh {...anchorTable.th("amount")} right>Amount</SortTh>
              </tr>
            </thead>
            <tbody>
              {anchorTable.rows.map(([vendor, amount]) => (
                <tr key={vendor} {...interactiveRowProps(() => onDrill({ query: vendor }), { label: `View ${vendor} payments in the ledger` })}>
                  <Td strong>
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name="trust" size="xs" className="shrink-0 text-green-900" />
                      {vendor}
                    </span>
                  </Td>
                  <Td right>{fmtUSD(amount)}</Td>
                </tr>
              ))}
            </tbody>
          </TableCard>
        </div>
        <Card>
          <p className="captions text-slate-500">Risk signals</p>
          <h3 className="mb-3 body font-semibold text-blue-900">Anomaly Feed</h3>
          <div className="grid gap-2">
            {anomalies.slice(0, 4).map((anomaly) => (
              <div
                key={anomaly.txId}
                {...interactiveRowProps(() => onNavigate("anomalies"), {
                  role: "button",
                  label: `Review ${anomaly.kind} for ${anomaly.vendor}, ${fmtUSD(anomaly.amount)}, in the Anomaly Center`,
                  className: cn(
                    "w-full rounded-lg p-3 text-left transition-shadow hover:ring-2 hover:ring-blue-700/30",
                    anomaly.tone === "spike" ? "bg-red-100" : "bg-gold-100",
                  ),
                })}
              >
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="body-sm font-semibold text-blue-900">{anomaly.vendor} <span className="tabular-nums text-slate-500">{fmtUSD(anomaly.amount)}</span></div>
                    <div className="body-xs text-slate-500">{anomaly.detail}</div>
                    <div className="body-xs tabular-nums text-slate-500/80">{anomaly.dept}</div>
                  </div>
                  <BadgeDot tone={anomaly.tone}>{anomaly.kind}</BadgeDot>
                </div>
              </div>
            ))}
          </div>
          {anomalies.length > 4 ? (
            <Button type="button" variant="ghost" size="sm" className="mt-2" onClick={() => onNavigate("anomalies")}>
              See all {anomalies.length} in the Anomaly Center
            </Button>
          ) : null}
        </Card>
      </div>
      <Card>
        <p className="captions text-slate-500">Treasury</p>
        <h3 className="mb-3 body font-semibold text-blue-900">Account Position</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {data.treasury.map(([label, value, sub]) => (
            <div key={label}>
              <p className="captions text-slate-500">{label}</p>
              <div className="body font-medium tabular-nums text-blue-900">{fmtUSD(value)}</div>
              <div className="body-xs text-slate-500">{sub}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="mt-4">
        <p className="captions text-slate-500">Plain-language glossary</p>
        <h3 className="mb-3 body font-semibold text-blue-900">What these terms mean</h3>
        <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {glossary.map(([term, definition]) => (
            <div key={term}>
              <dt className="body-sm font-semibold text-blue-900">{term}</dt>
              <dd className="body-xs text-slate-500">{definition}</dd>
            </div>
          ))}
        </dl>
      </Card>
    </>
  );
}

const BUDGET_SECTIONS = [
  ["budget-projection", "Year-end projection"],
  ["budget-departments", "Department budgets"],
  ["budget-funds", "Revenue vs. expenditure"],
  ["budget-commitments", "Open commitments"],
  ["budget-amendments", "Amendments"],
  ["budget-thresholds", "Status settings"],
] as const;

function BudgetPage() {
  // The thresholds live with the console, not with this page, so a line moved
  // here is the line every other page grades against.
  const { settings: bandSettings, setSettings: setBandSettings } = useBandSettings();
  const bandDefaults = bandSettings.defaults;
  const bandOverrides = bandSettings.overrides;
  const setBandDefaults = (next: Bands | ((previous: Bands) => Bands)) =>
    setBandSettings((previous) => ({ ...previous, defaults: typeof next === "function" ? next(previous.defaults) : next }));
  const setBandOverrides = (next: Record<string, Bands> | ((previous: Record<string, Bands>) => Record<string, Bands>)) =>
    setBandSettings((previous) => ({ ...previous, overrides: typeof next === "function" ? next(previous.overrides) : next }));
  const [bandScope, setBandScope] = useState("");
  const [bandWatch, setBandWatch] = useState(String(DEFAULT_BANDS.watch));
  const [bandOver, setBandOver] = useState(String(DEFAULT_BANDS.over));
  // Utilized and Remaining are derived in the row body, so the accessors derive
  // them the same way rather than sorting the formatted text: "9%" would
  // otherwise sort above "80%", and "$-4,200" above "$1,000".
  const budgetTable = useTableSort(data.departments, {
    name: (row) => row.name,
    fund: (row) => row.fund,
    budget: (row) => row.budget,
    spent: (row) => row.spent,
    enc: (row) => row.enc,
    remaining: (row) => row.budget - row.spent - row.enc,
    utilized: (row) => row.spent / row.budget,
    status: (row) => statusFor(row).label,
  });
  const commitmentTable = useTableSort(openCommitments, {
    id: (row) => row.id,
    vendor: (row) => row.vendor,
    dept: (row) => row.dept,
    issued: (row) => row.issued,
    amount: (row) => row.amount,
    status: (row) => row.status,
  });
  const amendmentTable = useTableSort(budgetAmendments, {
    date: (row) => row.date,
    id: (row) => row.id,
    dept: (row) => row.dept,
    type: (row) => row.type,
    // Signed, so a decrease sorts below an increase of the same size rather
    // than beside it, which is the comparison this column exists to make.
    delta: (row) => row.delta,
    reason: (row) => row.reason,
    status: (row) => row.status,
  });
  const k = useOverlayKpis();
  const totalRevenue = data.funds.reduce((sum, fund) => sum + fund.revenue, 0);
  const totalExpense = data.funds.reduce((sum, fund) => sum + fund.exp, 0);
  const totalEnding = data.funds.reduce((sum, fund) => sum + fund.ending, 0);
  // "Over pace" uses the same tolerance as Board View and the council packet, so
  // all three publish one list. It also matches the red/green on the variance
  // column beside it, which previously turned red a full 5 points earlier than
  // this label admitted anything was wrong.
  const projections = data.departments.map((department) => {
    const projected = projectedYearEnd(department.spent);
    const projectedPct = projected / department.budget;
    const pace = departmentPace(department, bandSettings);
    return { ...department, projected, projectedPct, pace, tone: PACE_TONE[pace] } as const;
  });
  const projectionTotal = projections.reduce((sum, item) => sum + item.projected, 0);
  // Only the department rows sort. The Projected row underneath is rendered
  // after this list rather than inside it, and both its figures are totted up
  // from the unsorted source, so no ordering the reader picks can move it or
  // change it. That is the whole reason this table can be sorted at all.
  const projectionTable = useTableSort(projections, {
    name: (row) => row.name,
    utilized: (row) => row.spent / row.budget,
    // Ranked by severity rather than by name, so ascending runs Under, On,
    // Over. Sorting the label as text would read On, Over, Under, which puts
    // the healthy departments in the middle of the two that need attention.
    pace: (row) => PACE_ORDER.indexOf(row.pace),
    projected: (row) => row.projected,
    // The cell prints the distance from budget; sorting the ratio it is
    // derived from keeps -11% below -6% below +34% instead of sorting "+" and
    // "-" as characters.
    vsBudget: (row) => row.projectedPct,
  });
  const movers = data.departments
    .map((department) => {
      const prior = Math.round(department.spent / (1 + (YOY_CHANGE[department.name] ?? data.kpis.yoy / 100)));
      return { name: department.name, current: department.spent, prior, change: (department.spent - prior) / prior };
    })
    .sort((a, b) => Math.abs(b.change) - Math.abs(a.change));

  function statusFor(department: { name: string; fund: string; spent: number; budget: number }) {
    const pace = departmentPace(department, bandSettings);
    return { label: pace, tone: PACE_TONE[pace] };
  }
  // Thresholds are percentages and Watch has to come before At risk. The
  // inputs previously accepted anything, so Watch 120 with At risk -5 turned
  // every department in the town red with no error and no way back.
  const clampPct = (value: string) => Math.min(Math.max(Math.round(Number(value)), 0), 200);
  const bandError =
    !Number.isFinite(Number(bandWatch)) || !Number.isFinite(Number(bandOver))
      ? "Enter both thresholds as numbers."
      : clampPct(bandWatch) >= clampPct(bandOver)
        ? "Watch has to be lower than At risk."
        : "";

  function applyBandOverride() {
    if (!bandScope || bandError) return;
    setBandOverrides((previous) => ({ ...previous, [bandScope]: { watch: clampPct(bandWatch), over: clampPct(bandOver) } }));
  }
  function resetBands() {
    setBandDefaults({ ...DEFAULT_BANDS });
    setBandOverrides({});
    setBandScope("");
    setBandWatch(String(DEFAULT_BANDS.watch));
    setBandOver(String(DEFAULT_BANDS.over));
  }
  function removeBandOverride(key: string) {
    setBandOverrides((previous) => {
      const next = { ...previous };
      delete next[key];
      return next;
    });
  }
  const fundOptions = Array.from(new Set(data.departments.map((department) => department.fund)));
  const bandTargets = [
    ...fundOptions.map((fund) => ({ value: `fund:${fund}`, label: `Fund · ${fund}` })),
    ...data.departments.map((department) => ({ value: `dept:${department.name}`, label: department.name })),
  ];

  return (
    <>
      <PageHead
        eyebrow="Municipal Finance · FY2026"
        title="Budget Analytics"
        icon="funding"
        // A FY2025 toggle used to sit here and change nothing but its own
        // highlight. This snapshot carries one year of data, so it says so.
        action={<BadgeDot tone="info">FY2026 · July to June · this snapshot</BadgeDot>}
      />
      <StatGrid
        items={[
          { label: "Adopted Budget", value: fmtC(k.approved), sub: "FY appropriation", hint: "Total spending the town authorized for the fiscal year (the appropriation adopted at Town Meeting)." },
          { label: "YTD Actual Spend", value: fmtC(k.actual), sub: `${k.utilized}% utilized`, delta: `+${k.yoy}% YoY`, hint: "Money actually spent so far this fiscal year, through the current month." },
          { label: "Encumbrances", value: fmtC(k.encumbered), sub: "Open commitments", hint: "Money already committed to open purchase orders and contracts, but not yet paid out." },
          // The label is computed from the value it sits under. It used to read
          // 100 minus utilized, which describes a different number entirely:
          // budget minus spending, ignoring the encumbrances beside it.
          { label: "Unencumbered Balance", value: fmtC(k.remaining), sub: `${Math.round((k.remaining / k.approved) * 100)}% of budget`, hint: "Budget still available to spend: adopted budget minus actual spending and open commitments." },
        ]}
      />
      {/* Ten sections on one page, so the page says what is on it. */}
      <nav aria-label="On this page" className="mb-4 flex items-center gap-1 overflow-x-auto scrollbar-none md:flex-wrap">
        <span className="mr-1 shrink-0 captions text-slate-500">Jump to</span>
        {BUDGET_SECTIONS.map(([id, label]) => (
          <Button key={id} type="button" variant="ghost" size="sm" className="shrink-0" onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })}>
            {label}
          </Button>
        ))}
      </nav>
      <div id="budget-projection" className="scroll-mt-4" />
      <TableCard eyebrow="Forecast · as of March 2026 · 75% of the year elapsed · rounded to $1,000" title="Year-End Projection">
        <thead>
          <tr>
            <SortTh {...projectionTable.th("name")}>Department</SortTh>
            <SortTh {...projectionTable.th("utilized")} right>Utilized</SortTh>
            <SortTh {...projectionTable.th("pace")}>Status</SortTh>
            <SortTh {...projectionTable.th("projected")} right>Projected Year-End</SortTh>
            <SortTh {...projectionTable.th("vsBudget")} right>vs Budget</SortTh>
          </tr>
        </thead>
        <tbody>
          {projectionTable.rows.map((projection) => (
            <tr key={projection.name}>
              <Td strong>{projection.name}</Td>
              <Td right>{Math.round((projection.spent / projection.budget) * 100)}%</Td>
              <Td><BadgeDot tone={projection.tone}>{projection.pace}</BadgeDot></Td>
              <Td right>{fmtUSD(Math.round(projection.projected / 1000) * 1000)}</Td>
              <Td right className={projection.projectedPct > 1 ? "text-red-600" : "text-green-900"}>
                {Math.round((projection.projectedPct - 1) * 100) > 0 ? "+" : Math.round((projection.projectedPct - 1) * 100) < 0 ? "-" : ""}
                {Math.abs(Math.round((projection.projectedPct - 1) * 100))}%
              </Td>
            </tr>
          ))}
          <tr>
            <Td className="border-t-2 border-blue-900/20 captions text-blue-900" colSpan={3}>Projected</Td>
            <Td right className="border-t-2 border-blue-900/20">{fmtUSD(Math.round(projectionTotal / 1000) * 1000)}</Td>
            <Td right className="border-t-2 border-blue-900/20">{fmtUSD(k.approved)}</Td>
          </tr>
        </tbody>
      </TableCard>
      <div className="h-4" />
      <Card className="mb-4">
        <p className="captions text-slate-500">Year over year · YTD through Mar 2026</p>
        <h3 className="mb-3 body font-semibold text-blue-900">Top Movers</h3>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {movers.slice(0, 8).map((mover) => (
            <div key={mover.name} className="rounded-lg border border-blue-900/10 bg-cream-50 p-3">
              <p className="truncate captions text-slate-500">{mover.name}</p>
              <div className={cn("mt-1 body-lg font-medium tabular-nums", mover.change > 0 ? "text-red-600" : "text-green-900")}>{mover.change > 0 ? "+" : ""}{Math.round(mover.change * 100)}%</div>
              <p className="body-xs text-slate-500">{fmtC(mover.current)} vs {fmtC(mover.prior)} prior</p>
            </div>
          ))}
        </div>
      </Card>
      <div className="mb-4 grid gap-4 xl:grid-cols-3">
        <ChartCard eyebrow="Budget vs. Actual" title="Cumulative Spend ($M)" className="xl:col-span-2">
          <MiniLineChart actual={data.trend.actual} budget={data.trend.budget} months={data.months} />
        </ChartCard>
        <ChartCard eyebrow="Category breakdown" title="Spend by Category">
          <DataBars items={data.categories.slice(0, 7)} />
          <p className="px-4 pb-4 body-xs text-slate-500">
            Top 7 of {data.categories.length} categories, {Math.round((data.categories.slice(0, 7).reduce((sum, item) => sum + item.value, 0) / data.kpis.actual) * 100)}% of the {fmtC(data.kpis.actual)} spent to date. Personnel leads because it is roughly 70% of the General Fund.
          </p>
        </ChartCard>
      </div>
      <div id="budget-departments" className="scroll-mt-4" />
      <TableCard
        eyebrow="Appropriation detail"
        title="Department Budgets"
        action={
          <ExportButton
            onClick={() =>
              downloadCsv(
                "department-budgets.csv",
                ["Department", "Fund", "Approved", "YTD Actual", "Encumbered", "Remaining", "Utilized %", "Status"],
                data.departments.map((d) => [
                  d.name,
                  d.fund,
                  d.budget,
                  d.spent,
                  d.enc,
                  d.budget - d.spent - d.enc,
                  Math.round((d.spent / d.budget) * 100),
                  statusFor(d).label,
                ]),
              )
            }
          />
        }
      >
        <thead>
          <tr>
            <SortTh {...budgetTable.th("name")}>Department</SortTh>
            <SortTh {...budgetTable.th("fund")} className="hidden sm:table-cell">Fund</SortTh>
            <SortTh {...budgetTable.th("budget")} right className="hidden sm:table-cell">Approved</SortTh>
            <SortTh {...budgetTable.th("spent")} right className="hidden sm:table-cell">YTD Actual</SortTh>
            <SortTh {...budgetTable.th("enc")} right className="hidden sm:table-cell">Encumbered</SortTh>
            <SortTh {...budgetTable.th("remaining")} right className="hidden sm:table-cell">Remaining</SortTh>
            <SortTh {...budgetTable.th("utilized")} right>Utilized</SortTh>
            <SortTh {...budgetTable.th("status")}>Status</SortTh>
          </tr>
        </thead>
        <tbody>
          {budgetTable.rows.map((department) => {
            const remaining = department.budget - department.spent - department.enc;
            const utilized = Math.round((department.spent / department.budget) * 100);
            const status = statusFor(department);
            return (
              <tr key={department.name}>
                <Td strong>{department.name}</Td>
                <Td className="hidden sm:table-cell">{department.fund}</Td>
                <Td right className="hidden sm:table-cell">{fmtUSD(department.budget)}</Td>
                <Td right className="hidden sm:table-cell">{fmtUSD(department.spent)}</Td>
                <Td right className="hidden sm:table-cell text-slate-500">{fmtUSD(department.enc)}</Td>
                <Td right className={cn("hidden sm:table-cell", remaining < 0 && "text-red-600")}>{fmtUSD(remaining)}</Td>
                <Td right>{utilized}%</Td>
                <Td><BadgeDot tone={status.tone}>{status.label}</BadgeDot></Td>
              </tr>
            );
          })}
        </tbody>
      </TableCard>
      <div className="h-4" />
      <div id="budget-funds" className="scroll-mt-4" />
      <TableCard eyebrow="Fund accounting" title="Revenue vs. Expenditure">
        <thead>
          <tr>
            <Th>Fund</Th>
            <Th right>Revenue</Th>
            <Th right>Expenditure</Th>
            <Th right>Net</Th>
            <Th right>Ending Balance</Th>
          </tr>
        </thead>
        <tbody>
          {data.funds.map((fund) => (
            <tr key={fund.fund}>
              <Td strong>{fund.fund}</Td>
              <Td right>{fmtUSD(fund.revenue)}</Td>
              <Td right>{fmtUSD(fund.exp)}</Td>
              <Td right className="text-green-900">+{fmtUSD(fund.revenue - fund.exp)}</Td>
              <Td right>{fmtUSD(fund.ending)}</Td>
            </tr>
          ))}
          <tr>
            <Td className="border-t-2 border-blue-900/20 captions text-blue-900">Total</Td>
            <Td right className="border-t-2 border-blue-900/20">{fmtUSD(totalRevenue)}</Td>
            <Td right className="border-t-2 border-blue-900/20">{fmtUSD(totalExpense)}</Td>
            <Td right className="border-t-2 border-blue-900/20 text-green-900">+{fmtUSD(totalRevenue - totalExpense)}</Td>
            <Td right className="border-t-2 border-blue-900/20">{fmtUSD(totalEnding)}</Td>
          </tr>
        </tbody>
      </TableCard>
      <div className="h-4" />
      <div id="budget-commitments" className="scroll-mt-4" />
      <TableCard eyebrow="Encumbrance detail" title={`Open Commitments · ${fmtC(openCommitments.reduce((sum, item) => sum + item.amount, 0))}`}>
        <thead>
          <tr>
            <SortTh {...commitmentTable.th("id")}>PO</SortTh>
            <SortTh {...commitmentTable.th("vendor")}>Vendor</SortTh>
            <SortTh {...commitmentTable.th("dept")}>Department</SortTh>
            <SortTh {...commitmentTable.th("issued")}>Issued</SortTh>
            <SortTh {...commitmentTable.th("amount")} right>Amount</SortTh>
            <SortTh {...commitmentTable.th("status")}>Status</SortTh>
          </tr>
        </thead>
        <tbody>
          {commitmentTable.rows.map((commitment) => (
            <tr key={commitment.id}>
              <Td className="tabular-nums">{commitment.id}</Td>
              <Td strong>{commitment.vendor}</Td>
              <Td>{commitment.dept}</Td>
              <Td>{fmtDate(commitment.issued)}</Td>
              <Td right>{fmtUSD(commitment.amount)}</Td>
              <Td><BadgeDot tone={commitment.status === "Open" ? "info" : "pending"}>{commitment.status}</BadgeDot></Td>
            </tr>
          ))}
        </tbody>
      </TableCard>
      <div className="h-4" />
      <div id="budget-amendments" className="scroll-mt-4" />
      <TableCard eyebrow="Appropriation changes" title="Budget Amendments & Transfers">
        <thead>
          <tr>
            <SortTh {...amendmentTable.th("date")}>Date</SortTh>
            <SortTh {...amendmentTable.th("id")}>ID</SortTh>
            <SortTh {...amendmentTable.th("dept")}>Department</SortTh>
            <SortTh {...amendmentTable.th("type")}>Type</SortTh>
            <SortTh {...amendmentTable.th("delta")} right>Change</SortTh>
            <SortTh {...amendmentTable.th("reason")}>Reason</SortTh>
            <SortTh {...amendmentTable.th("status")}>Status</SortTh>
          </tr>
        </thead>
        <tbody>
          {amendmentTable.rows.map((amendment) => (
            <tr key={amendment.id}>
              <Td>{fmtDate(amendment.date)}</Td>
              <Td className="tabular-nums">{amendment.id}</Td>
              <Td strong>{amendment.dept}</Td>
              <Td><BadgeDot tone={amendment.type === "Decrease" ? "spike" : amendment.type === "Transfer" ? "info" : "anchored"}>{amendment.type}</BadgeDot></Td>
              <Td right className={amendment.delta < 0 ? "text-red-600" : "text-green-900"}>{amendment.delta < 0 ? "-" : "+"}{fmtUSD(Math.abs(amendment.delta))}</Td>
              <Td>{amendment.reason}</Td>
              <Td><BadgeDot tone={amendment.status === "Approved" ? "anchored" : "pending"}>{amendment.status}</BadgeDot></Td>
            </tr>
          ))}
        </tbody>
      </TableCard>
      <div id="budget-thresholds" className="scroll-mt-4" />
      {/* A setting, not a reading: it sits below the tables it tunes rather
          than between the charts and the main table. */}
      <Card className="mt-4">
        <p className="captions text-slate-500">Budget status thresholds</p>
        <h3 className="body font-semibold text-blue-900">Set where Watch and At risk begin</h3>
        <p className="mt-1 body-xs text-slate-500">A department&apos;s status comes from where it is projected to finish the year, as a percentage of its budget. Set the percentage where it turns Watch and where it turns At risk. These lines apply everywhere a department is graded: the Overview, Board View, Department Analysis, the Select Board packet and this page. Override per fund or department; a department override wins over its fund, which wins over the default.</p>
        <div className="mt-3 flex flex-wrap items-end gap-3">
          <div className="grid gap-1">
            <span className="captions text-slate-500">Default Watch at %</span>
            <Input aria-label="Default Watch threshold" type="number" inputMode="numeric" className="w-28" value={String(bandDefaults.watch)} onChange={(event) => setBandDefaults((previous) => ({ ...previous, watch: Number(event.target.value) }))} />
          </div>
          <div className="grid gap-1">
            <span className="captions text-slate-500">Default At risk at %</span>
            <Input aria-label="Default At risk threshold" type="number" inputMode="numeric" className="w-28" value={String(bandDefaults.over)} onChange={(event) => setBandDefaults((previous) => ({ ...previous, over: Number(event.target.value) }))} />
          </div>
        </div>
        <div className="mt-3 border-t border-blue-900/10 pt-3">
          <p className="captions text-slate-500">Per-fund or per-department override</p>
          <div className="mt-2 flex flex-wrap items-end gap-2">
            <div className="grid gap-1">
              <span className="body-xs text-slate-500">Scope</span>
              <Select value={bandScope} onValueChange={setBandScope}>
                <SelectTrigger aria-label="Override scope" className="w-64"><SelectValue placeholder="Choose fund or department" /></SelectTrigger>
                <SelectContent>
                  {bandTargets.map((target) => (
                    <SelectItem key={target.value} value={target.value}>{target.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1">
              <span className="body-xs text-slate-500">Watch %</span>
              <Input aria-label="Override Watch threshold" type="number" inputMode="numeric" className="w-24" value={bandWatch} onChange={(event) => setBandWatch(event.target.value)} />
            </div>
            <div className="grid gap-1">
              <span className="body-xs text-slate-500">At risk %</span>
              <Input aria-label="Override At risk threshold" type="number" inputMode="numeric" className="w-24" value={bandOver} onChange={(event) => setBandOver(event.target.value)} />
            </div>
            <Button type="button" variant="soft" size="sm" onClick={applyBandOverride} disabled={!bandScope || Boolean(bandError)}>Set override</Button>
            <Button type="button" variant="ghost" size="sm" onClick={resetBands}>Reset to defaults</Button>
          </div>
          {bandError ? <p className="mt-2 body-xs text-red-600">{bandError}</p> : null}
          {Object.keys(bandOverrides).length > 0 ? (
            <ul className="mt-3 grid gap-1">
              {Object.entries(bandOverrides).map(([key, bands]) => (
                <li key={key} className="flex items-center justify-between gap-3 body-xs text-slate-500">
                  <span><span className="font-semibold text-blue-900">{key.startsWith("dept:") ? key.slice(5) : `Fund · ${key.slice(5)}`}</span>: Watch {bands.watch}%, At risk {bands.over}%</span>
                  <Button type="button" variant="ghost" size="sm" className="h-auto px-1 py-0" onClick={() => removeBandOverride(key)}>Remove</Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 body-xs text-slate-500">No overrides yet. All departments use the default bands above.</p>
          )}
        </div>
      </Card>
    </>
  );
}

function VendorsPage() {
  const [search, setSearch] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<VendorSummary | null>(null);
  const vendorKpis = data.vendorKpis;
  // Counted from the ledger. These three tiles were typed in, and went stale
  // the moment a payment was added.
  const allVendors = getVendorSummaries();
  const vendorDirectory = useMemo(() => getVendorSummaries(), []);
  // Read live from the directory rather than a hand-kept list. The six-vendor
  // literal this replaced had to be re-typed by hand every time a payment moved,
  // and it left the card two thirds empty beside the pie. Ten rows at the 40px
  // row pitch land within a few pixels of the pie card's natural height, so the
  // pair reads as one block, and ten still stops short of the long tail where
  // every remaining vendor is under two percent and the bars stop separating.
  const topVendorBars = useMemo(
    () => vendorDirectory.slice(0, 10).map((vendor) => ({ name: vendor.vendor, value: vendor.total })),
    [vendorDirectory],
  );
  const filteredVendors = useMemo(
    () => vendorDirectory.filter((vendor) => !search || vendor.vendor.toLowerCase().includes(search.toLowerCase())),
    [search, vendorDirectory],
  );
  // Sort sits outside the search filter, so narrowing the list keeps whatever
  // column the reader put it in order by.
  const vendorTable = useTableSort(filteredVendors, {
    vendor: (row) => row.vendor,
    category: (row) => row.category,
    txns: (row) => row.txns,
    total: (row) => row.total,
    // ISO dates sort chronologically as plain strings, which is why every date
    // column in this console sorts the stored value and not the rendered one.
    lastPaid: (row) => row.lastPaid,
    flags: (row) => row.anomalies,
    anchor: (row) => row.anchor,
  });
  const selectedTransactions = selectedVendor
    ? transactions.filter((transaction) => transaction.vendor === selectedVendor.vendor)
    : [];
  const vendorPaymentTable = useTableSort(selectedTransactions, {
    date: (row) => row.date,
    dept: (row) => row.dept,
    category: (row) => row.category,
    amount: (row) => row.amount,
    // Unflagged rows render "None", so they sort as one group under that word
    // rather than scattering through the flagged ones as empty strings.
    flag: (row) => row.anomaly ?? "None",
  });

  return (
    <>
      <PageHead
        eyebrow="Procurement · FY2026"
        title="Vendor Intelligence"
        icon="vendor"
        action={<BadgeDot tone="spike">{vendorKpis.flagged} flagged vendors</BadgeDot>}
      />
      <StatGrid
        items={[
          { label: "Active Vendors", value: allVendors.length, sub: "With payments this year" },
          { label: "Total Vendor Spend", value: fmtC(allVendors.reduce((sum, vendor) => sum + vendor.total, 0)), sub: "Paid so far this year" },
          { label: "Top Vendor", value: fmtC(allVendors[0].total), sub: allVendors[0].vendor },
          { label: "Flagged Vendors", value: vendorKpis.flagged, sub: "Have anomalies" },
        ]}
      />
      <div className="grid gap-4 xl:grid-cols-3">
        <ChartCard eyebrow="Spend ranking" title="Top Vendors by Spend" className="xl:col-span-2">
          <DataBars items={topVendorBars} />
        </ChartCard>
        <ChartCard eyebrow="Share of spend" title="Where the Money Goes">
          <VendorSpendPie vendors={vendorDirectory} />
        </ChartCard>
      </div>
      <div className="h-4" />
      <Card padded={false}>
        <CardHead
          eyebrow="Vendor directory"
          title={`${filteredVendors.length} vendors`}
          action={
            <ExportButton
              onClick={() =>
                downloadCsv(
                  "vendors.csv",
                  ["Vendor", "Category", "Txns", "Total Spend", "Last Paid", "Flags", "Anchor"],
                  // Export the sorted rows, so the CSV opens in the order the
                  // reader arranged on screen rather than a different one.
                  vendorTable.rows.map((v) => [v.vendor, v.category, v.txns, v.total, v.lastPaid, v.anomalies, v.anchor]),
                )
              }
            />
          }
        />
        <div className="px-4 pb-3">
          <Input
            aria-label="Search vendor"
            placeholder="Search vendor..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
        <Table className="min-w-max border-collapse">
        <thead>
          <tr>
            <SortTh {...vendorTable.th("vendor")}>Vendor</SortTh>
            <SortTh {...vendorTable.th("category")}>Category</SortTh>
            <SortTh {...vendorTable.th("txns")} right>Txns</SortTh>
            <SortTh {...vendorTable.th("total")} right>Total Spend</SortTh>
            <SortTh {...vendorTable.th("lastPaid")}>Last Paid</SortTh>
            <SortTh {...vendorTable.th("flags")}>Flags</SortTh>
            <SortTh {...vendorTable.th("anchor")}>Anchor</SortTh>
          </tr>
        </thead>
        <tbody>
          {vendorTable.rows.map((vendor) => (
            <tr key={vendor.vendor} {...interactiveRowProps(() => setSelectedVendor(vendor))}>
              <Td strong>{vendor.vendor}</Td>
              <Td>{vendor.category}</Td>
              <Td right>{vendor.txns}</Td>
              <Td right>{fmtUSD(vendor.total)}</Td>
              <Td>{fmtDate(vendor.lastPaid)}</Td>
              <Td>{vendor.anomalies ? <BadgeDot tone="spike">{vendor.anomalies} {vendor.anomalies === 1 ? "flag" : "flags"}</BadgeDot> : <span className="body-xs text-slate-500">None</span>}</Td>
              <Td><BadgeDot tone={vendor.anchor === "anchored" ? "anchored" : "pending"}>{vendor.anchor === "anchored" ? "Anchored" : "Pending"}</BadgeDot></Td>
            </tr>
          ))}
        </tbody>
        </Table>
        </div>
      </Card>
      <Dialog open={selectedVendor !== null} onOpenChange={(open) => { if (!open) setSelectedVendor(null); }}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
          {selectedVendor ? (
            <>
              <DialogHeader>
                <p className="captions text-slate-500">Vendor</p>
                <DialogTitle className="body font-semibold text-blue-900">{selectedVendor.vendor}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  ["Total Spend", fmtUSD(selectedVendor.total)],
                  ["Transactions", String(selectedVendor.txns)],
                  ["Primary Category", selectedVendor.category],
                  ["Last Paid", fmtDate(selectedVendor.lastPaid)],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="captions text-slate-500">{label}</p>
                    <p className="body-sm font-semibold text-blue-900">{value}</p>
                  </div>
                ))}
              </div>
              <div className="overflow-x-auto">
                <Table className="min-w-max border-collapse">
                  <thead>
                    <tr>
                      <SortTh {...vendorPaymentTable.th("date")}>Date</SortTh>
                      <SortTh {...vendorPaymentTable.th("dept")}>Department</SortTh>
                      <SortTh {...vendorPaymentTable.th("category")}>Category</SortTh>
                      <SortTh {...vendorPaymentTable.th("amount")} right>Amount</SortTh>
                      <SortTh {...vendorPaymentTable.th("flag")}>Flag</SortTh>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorPaymentTable.rows.map((transaction) => (
                      <tr key={transaction.id}>
                        <Td>{fmtDate(transaction.date)}</Td>
                        <Td>{transaction.dept}</Td>
                        <Td>{transaction.category}</Td>
                        <Td right>{fmtUSD(transaction.amount)}</Td>
                        <Td>{transaction.anomaly ? <BadgeDot tone={transaction.anomaly === "SPIKE" || transaction.anomaly === "DUPLICATE" ? "spike" : "pending"}>{flagInfoFor(transaction)?.kind ?? transaction.anomaly}</BadgeDot> : <span className="body-xs text-slate-500">None</span>}</Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

function DepartmentPage({ onDrill, onNavigate }: { onDrill: (next: Partial<LedgerFilter>) => void; onNavigate: (key: PageKey) => void }) {
  const bandSettings = useBandSettings().settings;
  const departmentDetails = data.departments.map((department) => {
    const departmentTransactions = allPayments.filter((transaction) => transaction.dept === department.name);
    const vendorTotals = new Map<string, number>();
    // Top vendor is a vendor question, so payroll summary lines stay out of it.
    for (const transaction of transactions.filter((item) => item.dept === department.name)) {
      vendorTotals.set(transaction.vendor, (vendorTotals.get(transaction.vendor) ?? 0) + transaction.amount);
    }
    const topVendor = [...vendorTotals.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "None";
    return {
      ...department,
      txns: departmentTransactions.length,
      flags: departmentTransactions.filter((transaction) => transaction.anomaly).length,
      topVendor,
    };
  });
  const comparisonTable = useTableSort(departmentDetails, {
    name: (row) => row.name,
    budget: (row) => row.budget,
    spent: (row) => row.spent,
    utilized: (row) => row.spent / row.budget,
    txns: (row) => row.txns,
    flags: (row) => row.flags,
    topVendor: (row) => row.topVendor,
  });
  const topDepartment = [...departmentDetails].sort((a, b) => b.spent - a.spent)[0];
  const overBudget = departmentDetails.filter((department) => departmentPace(department, bandSettings) === "At risk").length;
  const totalFlags = departmentDetails.reduce((sum, department) => sum + department.flags, 0);

  return (
    <>
      <PageHead
        eyebrow="Operations · FY2026"
        title="Department Analysis"
        icon="citizen"
        action={<BadgeDot tone="info">{data.departments.length} departments</BadgeDot>}
      />
      <StatGrid
        items={[
          { label: "Departments", value: departmentDetails.length, sub: "Active cost centers" },
          { label: "Highest Spend", value: fmtC(topDepartment.spent), sub: topDepartment.name },
          { label: "Projected Over Budget", value: overBudget, sub: "At the current pace" },
          { label: "Total Flags", value: totalFlags, sub: "Across departments" },
        ]}
      />
      <div className="mb-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {departmentDetails.map((department) => {
          const utilized = Math.round((department.spent / department.budget) * 100);
          const status = PACE_TONE[departmentPace(department, bandSettings)];
          const drill = () => onDrill({ query: department.name });
          return (
            <div
              key={department.name}
              role="button"
              tabIndex={0}
              aria-label={`View ${department.txns} transactions for ${department.name}`}
              onClick={drill}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  drill();
                }
              }}
              className="group cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Card className="h-full transition-shadow group-hover:ring-2 group-hover:ring-blue-700/30">
                <p className="captions text-slate-500">{department.fund}</p>
                <h3 className="mb-3 body font-semibold text-blue-900">{department.name}</h3>
                <div className="mb-2 flex items-center justify-between gap-3 body-xs text-slate-500">
                  <span>Budget utilization</span>
                  <span className={cn("tabular-nums", utilized >= 100 && "text-red-600")}>{utilized}%</span>
                </div>
                <Progress value={Math.min(utilized, 100)} indicatorClassName={progressToneClasses[status]} />
                <div className="mt-3 body-xs text-slate-500">
                  {fmtUSD(department.spent)} of {fmtUSD(department.budget)}
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3 body-xs text-slate-500">
                  <span><b className="text-blue-900">{department.txns}</b> payments</span>
                  <span><b className="text-blue-900">{department.flags}</b> {department.flags === 1 ? "flag" : "flags"}</span>
                  <span className="truncate" title={department.topVendor}>{department.topVendor}</span>
                </div>
                <div className="mt-3 body-xs font-medium text-blue-700 transition-colors group-hover:text-blue-900">View {department.txns} transactions →</div>
              </Card>
            </div>
          );
        })}
      </div>
      <div className="mb-4 grid gap-4 xl:grid-cols-3">
        <ChartCard eyebrow="Department × month risk" title="Spend Risk Heatmap" className="overflow-x-auto xl:col-span-2">
          <HeatmapChart onCellClick={() => onNavigate("anomalies")} />
          <div className="px-4 pb-4 body-xs text-slate-500">Click a cell to review that department&apos;s flagged transactions in the Anomaly Center →</div>
        </ChartCard>
        <ChartCard eyebrow="Allocation" title="Spend Share">
          <DataBars items={departmentDetails.map((department) => ({ name: department.name, value: department.spent })).slice(0, 8)} />
        </ChartCard>
      </div>
      <TableCard eyebrow="Side by side" title="Department Comparison">
        <thead>
          <tr>
            <SortTh {...comparisonTable.th("name")}>Department</SortTh>
            <SortTh {...comparisonTable.th("budget")} right>Budget</SortTh>
            <SortTh {...comparisonTable.th("spent")} right>Spent</SortTh>
            <SortTh {...comparisonTable.th("utilized")} right>Utilized</SortTh>
            <SortTh {...comparisonTable.th("txns")} right>Txns</SortTh>
            <SortTh {...comparisonTable.th("flags")} right>Flags</SortTh>
            <SortTh {...comparisonTable.th("topVendor")}>Top Vendor</SortTh>
          </tr>
        </thead>
        <tbody>
          {comparisonTable.rows.map((department) => {
            const utilized = Math.round((department.spent / department.budget) * 100);
            return (
              <tr key={department.name} {...interactiveRowProps(() => onDrill({ query: department.name }), { label: `View payments for ${department.name}` })}>
                <Td strong>{department.name}</Td>
                <Td right>{fmtUSD(department.budget)}</Td>
                <Td right>{fmtUSD(department.spent)}</Td>
                <Td right className={utilized >= 100 ? "text-red-600" : undefined}>{utilized}%</Td>
                <Td right>{department.txns}</Td>
                <Td right>{department.flags}</Td>
                <Td>{department.topVendor}</Td>
              </tr>
            );
          })}
        </tbody>
      </TableCard>
    </>
  );
}

// Predictive PO burn-down: spend is assumed even over the 6 elapsed FY months
// (Oct..Mar), so a contract at `util` is projected to reach its not-to-exceed in
// `6 * (1 - util) / util` months. "early" means that lands before the term ends.
const projMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function projectContract(contract: { util: number; days: number }): { state: "over" | "early" | "ok"; daysToExhaust: number; date: string } {
  if (contract.util >= 1) return { state: "over", daysToExhaust: 0, date: "" };
  // Spend to date covers FY_MONTHS_ELAPSED months, so the monthly burn is
  // util / FY_MONTHS_ELAPSED and the remaining headroom lasts this long.
  const monthsToExhaust = (FY_MONTHS_ELAPSED * (1 - contract.util)) / contract.util;
  const daysToExhaust = Math.round(monthsToExhaust * 30);
  const total = 2 + Math.round(monthsToExhaust); // months from Jan 2026 (March = index 2)
  const date = `${projMonths[((total % 12) + 12) % 12]} ${2026 + Math.floor(total / 12)}`;
  // Only warn when genuinely approaching the ceiling (>= 75% used): a linear
  // projection over-predicts for lightly-used or front-loaded multi-year contracts.
  const early = contract.util >= 0.75 && daysToExhaust < contract.days;
  return { state: early ? "early" : "ok", daysToExhaust, date };
}

function ContractsPage() {
  // A CONTRACT_BURN beat pushes a utilisation onto a contract. Recomputing the
  // flag and tone from it keeps the badge honest: a contract driven past its
  // ceiling on stage has to read "Over ceiling", not the tone it shipped with.
  const overlay = useDemoOverlay();
  const contracts = useMemo(
    () => data.contracts.map((contract) => {
      const burn = overlay.contractBurns[contract.id];
      if (burn === undefined) return contract;
      return {
        ...contract,
        util: burn,
        flag: burn > 1 ? "Over ceiling" : burn >= 0.9 ? "Near ceiling" : contract.flag,
        tone: burn > 1 ? ("spike" as const) : burn >= 0.9 ? ("pending" as const) : contract.tone,
      };
    }),
    [overlay.contractBurns],
  );
  const [selectedContractId, setSelectedContractId] = useState<string | null>(null);
  const contractKpis = data.contractKpis;
  const flagged = contracts.filter((contract) => contract.tone !== "ok");
  // The card's three counts (flagged, over or near, expiring) used to be typed
  // in separately and did not add up to each other.
  const countFlag = (flag: string) => flagged.filter((contract) => contract.flag === flag).length;
  const overOrNear = countFlag("Over ceiling") + countFlag("Near ceiling");
  const selectedContract = contracts.find((contract) => contract.id === selectedContractId);
  const selectedPayments = selectedContract
    ? transactions.filter((transaction) => transaction.vendor === selectedContract.vendor && transaction.dept === selectedContract.dept)
    : [];
  const selectedProj = selectedContract ? projectContract(selectedContract) : null;
  const contractTable = useTableSort(contracts, {
    // The cell prints title over id, and the title is what a reader scans.
    contract: (row) => row.title,
    vendor: (row) => row.vendor,
    dept: (row) => row.dept,
    value: (row) => row.value,
    // Sort the utilisation the bar draws, not the bar.
    util: (row) => row.util,
    // Days left, not the printed date text: "Sep 30, 2026" as a string would
    // sort September before December of the previous year.
    term: (row) => row.days,
    flag: (row) => (row.tone === "ok" ? "On track" : row.flag),
  });
  const contractPaymentTable = useTableSort(selectedPayments, {
    date: (row) => row.date,
    payment: (row) => row.id,
    category: (row) => row.category,
    amount: (row) => row.amount,
  });
  const projectedEarly = contracts.filter((contract) => projectContract(contract).state === "early");
  const renewals = contracts
    .filter((contract) => contract.days >= 0 && contract.days <= 120)
    .sort((a, b) => a.days - b.days);

  return (
    <>
      <PageHead eyebrow="Procurement · FY2026" title="Contracts" icon="record" />
      <StatGrid
        items={[
          { label: "Active Contracts", value: contractKpis.active, sub: "Currently in force" },
          { label: "Total Contracted Value", value: fmtC(contractKpis.value), sub: "Sum of not-to-exceed" },
          { label: "Expiring Soon", value: data.contracts.filter((contract) => contract.days <= 90).length, sub: "Within 90 days" },
          { label: "Over / Near Ceiling", value: overOrNear, sub: "Need review" },
        ]}
      />
      <Card className="mb-4">
        <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="captions text-slate-500">{countFlag("Over ceiling")} over the limit · {countFlag("Near ceiling")} near it · {countFlag("Expiring")} expiring</p>
            <h3 className="body font-semibold text-blue-900">Needs Attention</h3>
          </div>
          <BadgeDot tone="spike">{flagged.length} flagged</BadgeDot>
        </div>
        {projectedEarly.length > 0 ? (
          <p className="mb-3 body-xs text-gold-800">
            {projectedEarly.length} {projectedEarly.length === 1 ? "contract is" : "contracts are"} projected to reach the not-to-exceed before the term ends at the current pace. That is a forecast, counted separately from the {flagged.length} above, and marked Projected out in the register below.
          </p>
        ) : null}
        <div className="grid gap-2">
          {flagged.map((contract) => (
            <Button
              key={contract.id}
              type="button"
              variant="ghost"
              className="h-auto w-full whitespace-normal rounded-lg border border-blue-900/10 p-3 text-left shadow-none transition-colors hover:bg-blue-100/45 sm:flex-row sm:items-center sm:justify-between"
              onClick={() => setSelectedContractId(contract.id)}
            >
              <div className="min-w-0">
                <div className="body-sm font-semibold text-blue-900">
                  {contract.title} <span className="body-xs tabular-nums text-slate-500">{contract.id}</span>
                </div>
                <div className="body-xs text-slate-500">{contract.vendor} · {contract.dept}</div>
              </div>
              <BadgeDot tone={contract.tone}>{contract.flag}</BadgeDot>
            </Button>
          ))}
        </div>
      </Card>
      <Card className="mb-4">
        <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="captions text-slate-500">Coming up · next 120 days</p>
            <h3 className="body font-semibold text-blue-900">Renewals &amp; expirations</h3>
          </div>
          <BadgeDot tone={renewals.length ? "pending" : "anchored"}>{renewals.length} due</BadgeDot>
        </div>
        {renewals.length ? (
          <>
            <div className="grid gap-2">
              {renewals.map((contract) => (
                <Button
                  key={contract.id}
                  type="button"
                  variant="ghost"
                  className="h-auto w-full whitespace-normal rounded-lg border border-blue-900/10 p-3 text-left shadow-none transition-colors hover:bg-blue-100/45 sm:flex-row sm:items-center sm:justify-between"
                  onClick={() => setSelectedContractId(contract.id)}
                >
                  <div className="min-w-0">
                    <div className="body-sm font-semibold text-blue-900">{contract.title}</div>
                    <div className="body-xs text-slate-500">{contract.vendor} · {contract.dept}</div>
                  </div>
                  <div className="shrink-0 text-left sm:text-right">
                    <div className={cn("body-sm font-semibold tabular-nums", contract.days <= 60 ? "text-gold-800" : "text-blue-900")}>{contract.days} days left</div>
                    <div className="body-xs text-slate-500">Renew or rebid by {contract.end}</div>
                  </div>
                </Button>
              ))}
            </div>
            <p className="mt-3 body-xs text-slate-500">Before each renewal, confirm the rebid timeline, a current certificate of insurance, and any required Select Board approval.</p>
          </>
        ) : (
          <p className="body-sm text-slate-500">No contracts are up for renewal in the next 120 days.</p>
        )}
      </Card>
      <TableCard
        eyebrow="Contract register"
        title={`${contracts.length} contracts`}
        action={
          <ExportButton
            onClick={() =>
              downloadCsv(
                "contracts.csv",
                ["Contract ID", "Title", "Vendor", "Department", "Type", "Not-to-Exceed", "Utilized %", "Term End", "Days Left", "Flag"],
                contracts.map((c) => [c.id, c.title, c.vendor, c.dept, c.type, c.value, Math.round(c.util * 100), c.end, c.days, c.flag]),
              )
            }
          />
        }
      >
        <thead>
          <tr>
            <SortTh {...contractTable.th("contract")}>Contract</SortTh>
            <SortTh {...contractTable.th("vendor")}>Vendor</SortTh>
            <SortTh {...contractTable.th("dept")}>Department</SortTh>
            <SortTh {...contractTable.th("value")} right>Not-to-Exceed</SortTh>
            <SortTh {...contractTable.th("util")}>Spent</SortTh>
            <SortTh {...contractTable.th("term")}>Term</SortTh>
            <SortTh {...contractTable.th("flag")}>Flag</SortTh>
          </tr>
        </thead>
        <tbody>
          {contractTable.rows.map((contract) => {
            const proj = projectContract(contract);
            return (
              <tr key={contract.id} {...interactiveRowProps(() => setSelectedContractId(contract.id))}>
                <Td strong>
                  {contract.title}
                  <div className="body-xs tabular-nums text-slate-500">{contract.id}</div>
                </Td>
                <Td>{contract.vendor}</Td>
                <Td>{contract.dept}</Td>
                <Td right>{fmtUSD(contract.value)}</Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={Math.min(contract.util, 1) * 100}
                      indicatorClassName={progressToneClasses[contract.tone]}
                      className="w-24"
                    />
                    <span className={cn("body-xs tabular-nums", contract.util > 1 && "text-red-600")}>{pct(contract.util)}</span>
                  </div>
                  {proj.state === "early" ? <div className="mt-1 body-xs text-gold-800">Projected out ~{proj.date}</div> : null}
                </Td>
                <Td>
                  <span>{contract.end}</span>
                  <div className="body-xs text-slate-500">{contract.days < 0 ? "Expired" : `${contract.days} days left`}</div>
                </Td>
                <Td>{contract.tone === "ok" ? <span className="body-xs text-green-900">On track</span> : <BadgeDot tone={contract.tone}>{contract.flag}</BadgeDot>}</Td>
              </tr>
            );
          })}
        </tbody>
      </TableCard>
      <Dialog open={selectedContract != null} onOpenChange={(open) => { if (!open) setSelectedContractId(null); }}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
          {selectedContract ? (
            <>
              <DialogHeader>
                <p className="captions text-slate-500">Contract · {selectedContract.id}</p>
                <DialogTitle className="body font-semibold text-blue-900">{selectedContract.title}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  ["Vendor", selectedContract.vendor],
                  ["Department", selectedContract.dept],
                  ["Not-to-exceed", fmtUSD(selectedContract.value)],
                  ["Term", selectedContract.end],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="captions text-slate-500">{label}</p>
                    <p className="body-sm font-semibold text-blue-900">{value}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="captions text-slate-500">Spending vs. Ceiling</p>
                <div className="mt-2 flex items-center gap-3">
                  <Progress
                    value={Math.min(selectedContract.util, 1) * 100}
                    indicatorClassName={progressToneClasses[selectedContract.tone]}
                    className="max-w-md"
                  />
                  <span className={cn("body-xs tabular-nums", selectedContract.util > 1 && "text-red-600")}>{pct(selectedContract.util)}</span>
                  <BadgeDot tone={selectedContract.tone}>{selectedContract.flag}</BadgeDot>
                </div>
                {selectedProj ? (
                  <p className="mt-2 body-xs text-slate-500">
                    {selectedProj.state === "over"
                      ? "Already over the not-to-exceed. New charges should pause until the contract is amended."
                      : selectedProj.state === "early"
                        ? `At the current pace, projected to reach the not-to-exceed around ${selectedProj.date}, about ${selectedContract.days - selectedProj.daysToExhaust} days before the term ends (${selectedContract.end}).`
                        : `On pace to finish within the not-to-exceed before the term ends (${selectedContract.end}).`}
                  </p>
                ) : null}
              </div>
              <div className="overflow-x-auto">
                <Table className="min-w-max border-collapse">
                  <thead>
                    <tr>
                      <SortTh {...contractPaymentTable.th("date")}>Date</SortTh>
                      <SortTh {...contractPaymentTable.th("payment")}>Payment</SortTh>
                      <SortTh {...contractPaymentTable.th("category")}>Category</SortTh>
                      <SortTh {...contractPaymentTable.th("amount")} right>Amount</SortTh>
                      <Th>Proof</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {contractPaymentTable.rows.length ? contractPaymentTable.rows.map((payment) => (
                      <tr key={payment.id}>
                        <Td>{fmtDate(payment.date)}</Td>
                        <Td strong>{payment.id}</Td>
                        <Td>{payment.category}</Td>
                        <Td right>{fmtUSD(payment.amount)}</Td>
                        <Td><HashChip value={payment.ledgerTx} tone="anchored" /></Td>
                      </tr>
                    )) : (
                      <tr><Td colSpan={5}>No payment trail for this contract in the demo cache.</Td></tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

const roleTone: Record<string, Tone> = {
  Administrator: "info",
  Finance: "anchored",
  "Accounts Payable": "ok",
  "Town Manager": "info",
  "External Auditor": "pending",
  "IT / Records": "neutral",
  "Public / Committee": "neutral",
};

function AdminUsersPanel() {
  const userTable = useTableSort(data.admin.users, {
    name: (row) => row[0],
    email: (row) => row[1],
    role: (row) => row[2],
    status: (row) => row[3],
    // An invited user has never logged in and shows a dash. Sorting that as
    // text would file it between dates; the empty string keeps the whole
    // never-logged-in group together at one end instead.
    lastLogin: (row) => (row[4] === "—" ? "" : row[4]),
  });

  return (
    <TableCard eyebrow="People" title={`${data.admin.users.length} users`}>
      <thead>
        <tr>
          <SortTh {...userTable.th("name")}>Name</SortTh>
          <SortTh {...userTable.th("email")}>Email</SortTh>
          <SortTh {...userTable.th("role")}>Role</SortTh>
          <SortTh {...userTable.th("status")}>Status</SortTh>
          <SortTh {...userTable.th("lastLogin")}>Last login</SortTh>
        </tr>
      </thead>
      <tbody>
        {userTable.rows.map(([name, email, role, status, lastLogin]) => (
          <tr key={email}>
            <Td strong>{name}</Td>
            <Td className="tabular-nums text-slate-500">{email}</Td>
            <Td><BadgeDot tone={roleTone[role] ?? "neutral"}>{role}</BadgeDot></Td>
            <Td><BadgeDot tone={status === "Active" ? "anchored" : "pending"}>{status}</BadgeDot></Td>
            <Td className="text-slate-500">{lastLogin}</Td>
          </tr>
        ))}
      </tbody>
    </TableCard>
  );
}

function AdminConnectionsPanel({ feeds, onRetry, tour }: { feeds: Feed[]; onRetry: (name: string) => void; tour: TourState | null }) {
  // A FEED_STATUS beat can knock a connector offline mid-presentation, which is
  // the setup for the "what happens when the ERP stops answering" story.
  const overlay = useDemoOverlay();
  const shown = feeds.map((feed) => {
    const override = overlay.connectorStatus[feed.name];
    return override ? { ...feed, status: override } : feed;
  });

  return (
    <div className="grid gap-3">
      {shown.map((feed) => {
        const broken = feed.status === "Error";
        const syncing = feed.status === "Syncing";
        // The walkthrough follows the ERP feed through its repair, so the spot
        // is keyed on the feed's role and survives the status changing.
        const spot = feed.role === "ERP" ? tour : null;
        return (
          <TourSpot key={feed.name} tour={spot} id="admin:feed" surface="page" className="rounded-2xl">
          <Card className={broken ? "border border-red-600/30 bg-red-100" : undefined}>
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <p className="captions text-slate-500">{feed.role}</p>
                <h3 className="body font-semibold text-blue-900">{feed.name}</h3>
              </div>
              <BadgeDot tone={feed.status === "Connected" ? "anchored" : feed.status === "Error" ? "spike" : "info"}>{feed.status}</BadgeDot>
            </div>
            <div className="mt-3 flex flex-col justify-between gap-2 body-xs text-slate-500 sm:flex-row sm:items-center">
              <span>Last sync {feed.lastSync} · {feed.records} records today</span>
              {broken || syncing ? (
                <TourSpot tour={spot} id="admin:feed-retry">
                  <Button type="button" variant="soft" size="sm" disabled={syncing} onClick={() => onRetry(feed.name)}>
                    {syncing ? "Syncing..." : "Retry sync"}
                  </Button>
                </TourSpot>
              ) : (
                <span className="text-green-900">Healthy</span>
              )}
            </div>
            {broken ? (
              <p className="mt-2 body-xs text-red-600">Not updating since {feed.lastSync}. Dashboards may show stale figures until this reconnects.</p>
            ) : null}
          </Card>
          </TourSpot>
        );
      })}
    </div>
  );
}

function AdminRulesPanel() {
  const rulesetTable = useTableSort(data.admin.ruleset, {
    mcc: (row) => row[0],
    merchantCategory: (row) => row[1],
    assignedCategory: (row) => row[2],
  });

  return (
    <TableCard eyebrow="Semantic layer" title="Category Ruleset">
      <thead>
        <tr>
          <SortTh {...rulesetTable.th("mcc")}>MCC</SortTh>
          <SortTh {...rulesetTable.th("merchantCategory")}>Merchant category</SortTh>
          <SortTh {...rulesetTable.th("assignedCategory")}>Assigned category</SortTh>
        </tr>
      </thead>
      <tbody>
        {rulesetTable.rows.map(([mcc, merchantCategory, assignedCategory]) => (
          <tr key={mcc}>
            <Td className="tabular-nums">{String(mcc).padStart(4, "0")}</Td>
            <Td className="text-slate-500">{merchantCategory}</Td>
            <Td strong>{assignedCategory}</Td>
          </tr>
        ))}
      </tbody>
    </TableCard>
  );
}

function AdminGovernancePanel({ canClose, actor }: { canClose: boolean; actor: string }) {
  const [closeState, setCloseState] = useState<"idle" | "confirming" | "anchoring" | "done">("idle");
  const [periods, setPeriods] = useState<ClosedPeriod[]>([...governance.closedPeriods]);
  // An ANCHOR_CLOSE beat prepends a freshly closed period. The store carries it
  // in the shared demo-types shape, whose on-chain reference is named
  // `stellarTx`; this console calls the same field `ledgerTx` because it does
  // not name a chain on screen, so the row is mapped rather than spread.
  const overlay = useDemoOverlay();
  const allPeriods = useMemo(
    () => [
      ...overlay.extraAnchorRows.map((row) => ({
        monthKey: row.monthKey,
        closedAt: row.closedAt,
        closedBy: row.closedBy,
        records: row.records,
        ledgerTx: row.stellarTx,
      })),
      ...periods,
    ],
    [overlay.extraAnchorRows, periods],
  );
  // Both of these default to newest-first, and closing a period prepends to
  // that order. Sorting is offered as a lookup ("who closed which month"), and
  // the third click puts the chronology back, which is why the reset state
  // matters more here than anywhere else in the console.
  const periodTable = useTableSort(allPeriods, {
    month: (row) => row.monthKey,
    closed: (row) => row.closedAt,
    closedBy: (row) => row.closedBy,
    records: (row) => row.records,
  });
  const auditTable = useTableSort(governance.audit, {
    date: (row) => row.signedAt,
    vendor: (row) => row.vendor,
    reclassification: (row) => `${row.previousCategory} → ${row.newCategory}`,
    admin: (row) => row.admin,
    justification: (row) => row.justification,
  });
  const [openMonth, setOpenMonth] = useState("2026-03");

  // The close is credited to whoever performed it. It used to be hardcoded, so
  // the anchor history named one administrator no matter who pressed the
  // button, which is exactly the wrong thing for a chain-of-custody record.
  const closePeriod = () => {
    if (!canClose) return;
    setCloseState("anchoring");
    window.setTimeout(() => {
      setPeriods((current) => [
        {
          monthKey: openMonth,
          closedAt: "2026-04-01",
          closedBy: actor.replace(/^You · /, ""),
          records: allPayments.filter((transaction) => transaction.date.startsWith(openMonth)).length,
          ledgerTx: "4F8C2A7D9E1B60583A2F1C",
        },
        ...current,
      ]);
      setOpenMonth("2026-04");
      setCloseState("done");
    }, 500);
  };

  return (
    <div className="grid gap-4">
      <Card>
        <p className="captions text-slate-500">Who can sign</p>
        <h3 className="mb-3 body font-semibold text-blue-900">Authorized Signers</h3>
        <div className="grid gap-2">
          {governance.adminWallets.map((wallet, index) => (
            <div key={wallet} className="flex flex-wrap items-center gap-2">
              <BadgeDot tone="anchored">Admin {index + 1}</BadgeDot>
              <HashChip value={wallet} tone="anchored" />
            </div>
          ))}
        </div>
        <p className="mt-3 body-xs text-slate-500">Only these two people can close a month or approve a change to a payment&apos;s category. Each signs with a registered key, shown here in short form.</p>
      </Card>
      <Card>
        <p className="captions text-slate-500">Month-end close</p>
        <h3 className="mb-3 body font-semibold text-blue-900">Close of Period · {monthLabel(openMonth)} open</h3>
        <p className="body-sm text-slate-500">Closing {monthLabel(openMonth)} publishes the fingerprint of every payment in it to the public ledger. After that, any change to one of those payments will show. This cannot be undone.</p>
        {!canClose ? (
          <p className="mt-4 rounded-lg border border-blue-900/15 bg-cream-100 p-3 body-sm text-slate-500">
            Closing a period is restricted to an authorized signer. Your role can review the anchor history below but cannot close or re-open a period.
          </p>
        ) : null}
        {canClose && closeState === "idle" ? (
          <Button type="button" className="mt-4" size="sm" variant="soft" onClick={() => setCloseState("confirming")}>Close {monthLabel(openMonth)}...</Button>
        ) : null}
        {canClose && closeState === "confirming" ? (
          <div className="mt-4 rounded-lg border border-gold-800/20 bg-gold-100 p-3">
            <p className="body-sm font-semibold text-blue-900">Confirm: anchor all {monthLabel(openMonth)} records to the public ledger?</p>
            <p className="mt-1 body-xs text-slate-500">An authorized signing key signs the close intent. The fingerprint is written to the anchoring contract and cannot be overwritten. This close will be recorded against {actor.replace(/^You · /, "")}.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button type="button" size="sm" onClick={closePeriod}>Confirm and anchor</Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => setCloseState("idle")}>Cancel</Button>
            </div>
          </div>
        ) : null}
        {closeState === "anchoring" ? <p className="mt-4 body-sm text-slate-500">Signing and anchoring...</p> : null}
        {closeState === "done" ? <p className="mt-4 body-sm font-semibold text-green-900">Period anchored. See the anchor history below.</p> : null}
      </Card>
      <TableCard eyebrow="Months already closed" title="Anchor History">
        <thead>
          <tr>
            <SortTh {...periodTable.th("month")}>Month</SortTh>
            <SortTh {...periodTable.th("closed")}>Closed</SortTh>
            <SortTh {...periodTable.th("closedBy")}>Closed by</SortTh>
            <SortTh {...periodTable.th("records")} right>Records</SortTh>
            <Th>Ledger entry</Th>
          </tr>
        </thead>
        <tbody>
          {periodTable.rows.map((period) => (
            <tr key={period.monthKey}>
              <Td strong>{monthLabel(period.monthKey)}</Td>
              <Td>{fmtDate(period.closedAt)}</Td>
              <Td>{period.closedBy}</Td>
              <Td right>{period.records}</Td>
              <Td><HashChip value={period.ledgerTx} tone="anchored" /></Td>
            </tr>
          ))}
        </tbody>
      </TableCard>
      <TableCard eyebrow="Accountability" title={`Override Audit Trail · ${governance.audit.length} entries`}>
        <thead>
          <tr>
            <SortTh {...auditTable.th("date")}>Date</SortTh>
            <SortTh {...auditTable.th("vendor")}>Vendor</SortTh>
            <SortTh {...auditTable.th("reclassification")}>Reclassification</SortTh>
            <SortTh {...auditTable.th("admin")}>Admin</SortTh>
            <SortTh {...auditTable.th("justification")}>Justification</SortTh>
            <Th>Proof</Th>
          </tr>
        </thead>
        <tbody>
          {auditTable.rows.map((entry) => (
            <tr key={entry.id}>
              <Td>{fmtDate(entry.signedAt)}</Td>
              <Td strong>{entry.vendor}</Td>
              <Td>{entry.previousCategory} → {entry.newCategory}</Td>
              <Td>{entry.admin}</Td>
              <Td>{entry.justification}</Td>
              <Td><HashChip value={entry.tx} tone="anchored" /></Td>
            </tr>
          ))}
        </tbody>
      </TableCard>
    </div>
  );
}

function AdminPage({ feeds, onRetry, viewRole, actor, tour }: { feeds: Feed[]; onRetry: (name: string) => void; viewRole: ViewRole; actor: string; tour: TourState | null }) {
  const [tab, setTab] = useState<AdminTab>("governance");
  // A walkthrough step that points at a feed needs the tab that holds the
  // feeds. Adjusted during render, and kept afterwards: snapping back to the
  // first tab when the walkthrough ends would take the feed away mid-read.
  if (tour?.step.target.startsWith("admin:feed") && tab !== "conn") setTab("conn");
  const activeTab = tab;
  const canClose = canClosePeriodRoles.includes(viewRole);
  const adminTabs = useMemo<TabItem[]>(
    () => [
      { id: "governance", label: "Governance & Integrity", content: <AdminGovernancePanel canClose={canClose} actor={actor} /> },
      { id: "users", label: "Users & Roles", content: <AdminUsersPanel /> },
      { id: "conn", label: "Data Connections", content: <AdminConnectionsPanel feeds={feeds} onRetry={onRetry} tour={tour} /> },
      { id: "rules", label: "Settings & Ruleset", content: <AdminRulesPanel /> },
    ],
    [feeds, onRetry, canClose, actor, tour],
  );

  return (
    <>
      <PageHead eyebrow="Any Town, USA · Settings and controls" title="Administration" icon="admin" />
      <UiTabs
        aria-label="Administration"
        items={adminTabs}
        variant="segmented"
        size="md"
        activeId={activeTab}
        onChange={(value) => setTab(value as AdminTab)}
      />
    </>
  );
}

const LEDGER_PAGE_SIZE = 25;

function LedgerPage({ filter, workspace, tour, viewRole, onVerify }: { filter: LedgerFilter; workspace: Workspace; tour: TourState | null; viewRole: ViewRole; onVerify: (txId: string) => void }) {
  const [search, setSearch] = useState(filter.query);
  const [month, setMonth] = useState(filter.month);
  const [flaggedOnly, setFlaggedOnly] = useState(filter.flaggedOnly);
  const [dept, setDept] = useState("");
  // A hundred-odd rows on one page is a long scroll to reach anything below
  // the table. Sorting, the total and the CSV still cover every matching row;
  // only the rows drawn are limited.
  const [shown, setShown] = useState(LEDGER_PAGE_SIZE);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [panel, setPanel] = useState<null | "recode" | "attach" | "resolve">(null);
  const [recodeTo, setRecodeTo] = useState("");
  const [text, setText] = useState("");
  const [showProof, setShowProof] = useState(false);
  // What the last action did, shown in the dialog for a few seconds. Without it
  // the form simply closed, and nothing said the entry had been saved.
  const [saved, setSaved] = useState<string | null>(null);
  useEffect(() => {
    if (!saved) return;
    const timer = window.setTimeout(() => setSaved(null), 6000);
    return () => window.clearTimeout(timer);
  }, [saved]);

  const { rows, flags, attachments, clearedEnc, txLog, canWrite } = workspace;
  const readOnly = !canWrite;
  // Residents and board members get the payment in plain words, with the proof
  // values one click away. Staff and the auditor keep the working view.
  const plainView = viewRole === "resident" || viewRole === "public";
  const resolvedFlagOf = (id: string) => (flags[id]?.status === "resolved" ? true : false);

  const categoryOptions = Array.from(new Set(transactions.map((transaction) => transaction.category))).sort();
  const monthMatches = (date: string) =>
    !month || new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }) === month;
  const filtered = newestFirst(rows).filter((transaction) => {
    const text = search.toLowerCase();
    const matchesText =
      !search ||
      transaction.vendor.toLowerCase().includes(text) ||
      transaction.category.toLowerCase().includes(text) ||
      transaction.dept.toLowerCase().includes(text) ||
      transaction.id.toLowerCase().includes(text);
    const matchesFlag = !flaggedOnly || transaction.anomaly !== null;
    return matchesText && matchesFlag && monthMatches(transaction.date) && (!dept || transaction.dept === dept);
  });
  const ledgerTable = useTableSort(filtered, {
    date: (row) => row.date,
    id: (row) => row.id,
    vendor: (row) => row.vendor,
    category: (row) => row.category,
    dept: (row) => row.dept,
    amount: (row) => row.amount,
    anchor: (row) => row.anchor,
    // Sort what the cell actually says. A resolved flag renders "Resolved"
    // rather than its original SPIKE or DUPLICATE, so sorting the raw anomaly
    // would scatter the resolved rows through the open ones.
    anomaly: (row) => (!row.anomaly ? "None" : resolvedFlagOf(row.id) ? "Resolved" : flagInfoFor(row, plainView)?.kind ?? row.anomaly),
  });
  const filterActive = Boolean(search || month || flaggedOnly || dept);
  const visibleRows = ledgerTable.rows.slice(0, shown);
  const selected = rows.find((transaction) => transaction.id === selectedId) ?? null;
  const selectedLog = selected ? txLog.filter((entry) => entry.id === selected.id) : [];
  const encOpen = selected ? selected.anchor === "pending" && !clearedEnc[selected.id] : false;
  const selectedFlag = selected ? flagInfoFor(selected, plainView) : null;
  const selectedMccName = selected ? data.admin.ruleset.find(([code]) => code === selected.mcc)?.[1] : undefined;
  const workbenchActions = selected
    ? [
        { key: "recode" as const, label: "Recode", title: "Move this payment to a different category", help: "Use this when the payment was filed under the wrong category. The old and new category are both kept in the history." },
        { key: "attach" as const, label: attachments[selected.id] ? "Replace invoice" : "Attach invoice", title: "Attach the invoice for this payment", help: "Enter the invoice number so a reviewer can match the payment to its paperwork." },
        ...(selected.anomaly && !resolvedFlagOf(selected.id)
          ? [{ key: "resolve" as const, label: "Resolve flag", title: "Close the flag on this payment", help: "Say why it is safe to close. Your reason is saved with your name." }]
          : []),
      ]
    : [];
  const activeAction = workbenchActions.find((action) => action.key === panel) ?? null;

  function openTx(id: string) {
    setSelectedId(id);
    setPanel(null);
    setText("");
    setShowProof(false);
    setSaved(null);
  }

  function closeTx() {
    setSelectedId(null);
    setPanel(null);
    setText("");
    setShowProof(false);
    setSaved(null);
  }

  function clearFilters() {
    setSearch("");
    setMonth("");
    setFlaggedOnly(false);
    setDept("");
  }

  function recode(category: string) {
    if (!selected) return;
    if (category && category !== selected.category) {
      workspace.recode(selected.id, category);
      setSaved(`Category changed to ${category}. Logged under your name in the history below.`);
    }
    setPanel(null);
  }

  function attachInvoice(reference: string) {
    if (!selected || !reference.trim()) return;
    workspace.attach(selected.id, reference.trim());
    setSaved(`Invoice ${reference.trim()} attached. Logged under your name in the history below.`);
    setText("");
    setPanel(null);
  }

  function removeInvoice() {
    if (!selected) return;
    workspace.removeAttachment(selected.id);
  }

  function resolveFlag(note: string) {
    if (!selected || !selected.anomaly || !note.trim()) return;
    workspace.resolveFlag(selected.id, note.trim());
    setSaved("Flag resolved. Your reason is saved with your name in the history below.");
    setText("");
    setPanel(null);
  }

  function clearEncumbrance() {
    if (!selected) return;
    workspace.clearEncumbrance(selected.id);
  }

  return (
    <>
      <PageHead eyebrow={`All payments · ${filtered.length.toLocaleString("en-US")} of ${rows.length} records · ${fmtUSD(filtered.reduce((sum, transaction) => sum + transaction.amount, 0))} total`} title="Payments" icon="payments" />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="min-w-48 flex-1">
          <Input
            aria-label="Search ledger"
            placeholder="Search vendor, category, TX id..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        {/* Month and flagged-only used to be reachable only by drilling in from
            a chart, so the filter a reader arrived with could be cleared but
            never set again by hand. */}
        <Select value={dept || "all"} onValueChange={(value) => setDept(value === "all" ? "" : value)}>
          <SelectTrigger aria-label="Filter by department" className="w-56"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All departments</SelectItem>
            {data.departments.map((department) => (
              <SelectItem key={department.name} value={department.name}>{department.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={month || "all"} onValueChange={(value) => setMonth(value === "all" ? "" : value)}>
          <SelectTrigger aria-label="Filter by month" className="w-36"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All months</SelectItem>
            {data.months.map((name) => (
              <SelectItem key={name} value={name}>{name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant={flaggedOnly ? "soft" : "ghost"}
          size="sm"
          icon="flash"
          iconPosition="leading"
          aria-pressed={flaggedOnly}
          onClick={() => setFlaggedOnly((on) => !on)}
        >
          Flagged only
        </Button>
        {filterActive ? (
          <Button type="button" variant="ghost" size="sm" onClick={clearFilters}>Clear filters</Button>
        ) : null}
      </div>
      <TourSpot tour={tour} id="ledger:results" surface="page" className="rounded-2xl">
      <TableCard
        eyebrow="Every payment the town has made"
        title="Payment records"
        action={
          <ExportButton
            onClick={() =>
              downloadCsv(
                "ledger.csv",
                ["Date", "TX ID", "Vendor", "Category", "Department", "Amount", "Anchor", "Anomaly"],
                ledgerTable.rows.map((t) => [t.date, t.id, t.vendor, t.category, t.dept, t.amount, t.anchor, t.anomaly ? (resolvedFlagOf(t.id) ? `${t.anomaly} (resolved)` : t.anomaly) : ""]),
              )
            }
          />
        }
      >
        <thead>
          <tr>
            <SortTh {...ledgerTable.th("date")} className="hidden sm:table-cell">Date</SortTh>
            <SortTh {...ledgerTable.th("id")} className="hidden sm:table-cell">TX ID</SortTh>
            <SortTh {...ledgerTable.th("vendor")}>Vendor</SortTh>
            <SortTh {...ledgerTable.th("category")} className="hidden sm:table-cell">Category</SortTh>
            <SortTh {...ledgerTable.th("dept")} className="hidden sm:table-cell">Department</SortTh>
            <SortTh {...ledgerTable.th("amount")} right>Amount</SortTh>
            <SortTh {...ledgerTable.th("anchor")}>{plainView ? "Status" : "Anchor"}</SortTh>
            <SortTh {...ledgerTable.th("anomaly")} className="hidden sm:table-cell">{plainView ? "Flag" : "Anomaly"}</SortTh>
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((transaction) => (
            <tr key={transaction.id} {...interactiveRowProps(() => openTx(transaction.id), { label: `${transaction.id}, ${transaction.vendor}, ${fmtUSD(transaction.amount)}. Open details.` })}>
              <Td className="hidden sm:table-cell">{fmtDate(transaction.date)}</Td>
              <Td strong className="hidden sm:table-cell">{transaction.id}</Td>
              <Td>{transaction.vendor}</Td>
              <Td className="hidden sm:table-cell">{transaction.category}</Td>
              <Td className="hidden sm:table-cell">{transaction.dept}</Td>
              <Td right>{fmtUSD(transaction.amount)}</Td>
              <Td><BadgeDot tone={transaction.anchor === "anchored" ? "anchored" : "pending"}>{transaction.anchor === "anchored" ? (plainView ? "Verified" : "Anchored") : "Pending"}</BadgeDot></Td>
              <Td className="hidden sm:table-cell">{!transaction.anomaly ? <span className="body-xs text-slate-500">None</span> : resolvedFlagOf(transaction.id) ? <BadgeDot tone="anchored">Resolved</BadgeDot> : <BadgeDot tone={transaction.anomaly === "SPIKE" || transaction.anomaly === "DUPLICATE" ? "spike" : "pending"}>{flagInfoFor(transaction, plainView)?.kind ?? transaction.anomaly}</BadgeDot>}</Td>
            </tr>
          ))}
        </tbody>
      </TableCard>
      </TourSpot>
      {visibleRows.length < ledgerTable.rows.length ? (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
          <span className="body-xs text-slate-500">Showing {visibleRows.length} of {ledgerTable.rows.length}</span>
          <Button type="button" variant="soft" size="sm" onClick={() => setShown((count) => count + LEDGER_PAGE_SIZE)}>
            Show {Math.min(LEDGER_PAGE_SIZE, ledgerTable.rows.length - visibleRows.length)} more
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => setShown(ledgerTable.rows.length)}>Show all</Button>
        </div>
      ) : null}
      <Dialog open={selected !== null} onOpenChange={(open) => { if (!open) closeTx(); }}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
          {selected ? (
            <>
              <DialogHeader>
                <p className="captions text-slate-500">{plainView ? "Payment details" : readOnly ? "Transaction detail · read-only" : "Transaction detail · AP workbench"}</p>
                <DialogTitle className="body-lg font-semibold text-blue-900">{selected.vendor} · {fmtUSD(selected.amount)}</DialogTitle>
                <p className="body-xs text-slate-500">{fmtDate(selected.date)} · {selected.dept} · {selected.id}</p>
              </DialogHeader>

              {saved ? (
                <div role="status" className="flex items-start gap-2 rounded-xl border border-green-900/15 bg-green-100 p-3 text-green-900">
                  <Icon name="trust" size="sm" className="mt-0.5 shrink-0" />
                  <p className="body-sm font-semibold">{saved}</p>
                </div>
              ) : null}

              {selectedFlag ? (
                <div className={cn("rounded-xl border p-3", resolvedFlagOf(selected.id) ? "border-green-900/15 bg-green-100" : "border-gold-800/20 bg-gold-100")}>
                  <p className={cn("captions", resolvedFlagOf(selected.id) ? "text-green-900" : "text-gold-800")}>{resolvedFlagOf(selected.id) ? "Flag resolved" : "Why this was flagged"}</p>
                  <p className="mt-1 body-sm text-blue-900">
                    <span className="font-semibold">{selectedFlag.kind}.</span> {selectedFlag.detail}.
                  </p>
                  <p className="mt-1 body-xs text-slate-500">
                    {resolvedFlagOf(selected.id)
                      ? "A person reviewed this and closed it. The reason is in the history below."
                      : "A flag asks a person to take a look. It does not mean anything was wrong."}
                  </p>
                </div>
              ) : null}

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="captions text-slate-500">{plainView ? "Paid to" : "Vendor"}</p>
                  <p className="body-sm font-semibold text-blue-900">{selected.vendor}</p>
                </div>
                <div>
                  <p className="captions text-slate-500">Department</p>
                  <p className="body-sm font-semibold text-blue-900">{selected.dept}</p>
                </div>
                <div>
                  <p className="captions text-slate-500">{plainView ? "What it was for" : "Category"}</p>
                  <p className="body-sm font-semibold text-blue-900">{selected.category}</p>
                </div>
                <div>
                  <p className="captions text-slate-500">Amount</p>
                  <p className="body-sm font-semibold text-blue-900">{fmtUSD(selected.amount)}</p>
                </div>
                <div>
                  <p className="captions text-slate-500">Date</p>
                  <p className="body-sm font-semibold text-blue-900">{fmtDate(selected.date)}</p>
                </div>
                {plainView ? null : (
                  <div>
                    <p className="captions text-slate-500"><Term hint={TERM_HINTS.mcc}>MCC</Term></p>
                    <p className="body-sm font-semibold text-blue-900">
                      {selected.mcc === 0 ? "Not a card purchase" : `${String(selected.mcc).padStart(4, "0")}${selectedMccName ? ` · ${selectedMccName}` : ""}`}
                    </p>
                  </div>
                )}
                {plainView ? null : (
                  <div>
                    <p className="captions text-slate-500"><Term hint={TERM_HINTS[selected.anchor]}>Status</Term></p>
                    <p className="body-sm font-semibold text-blue-900">{selected.anchor === "anchored" ? "Anchored" : "Pending"}</p>
                  </div>
                )}
              </div>

              {plainView ? null : (
              <div className="border-t border-blue-900/10 pt-4">
                <p className="captions text-slate-500">{readOnly ? "Coding & proof (read-only)" : "Actions"}</p>
                {readOnly ? (
                  <p className="mt-2 body-xs text-slate-500">Read-only view for this role. Trace the coding, flag, and proof below; changes are disabled.</p>
                ) : (
                  <>
                    <p className="mt-1 body-xs text-slate-500">Pick one. Every change is signed with your name and added to this payment&apos;s history.</p>
                    {/* The open action is the filled one. All three used to be
                        drawn the same no matter which form was showing, with
                        Recode permanently tinted, so it read as selected while
                        the invoice form sat underneath it. */}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {workbenchActions.map((action) => (
                        <Button
                          key={action.key}
                          type="button"
                          variant={panel === action.key ? "filled" : "outline"}
                          size="sm"
                          aria-expanded={panel === action.key}
                          onClick={() => {
                            setPanel((current) => (current === action.key ? null : action.key));
                            setRecodeTo(selected.category);
                            setText("");
                          }}
                        >
                          {action.label}
                        </Button>
                      ))}
                      {encOpen ? (
                        <Button type="button" variant="outline" size="sm" onClick={clearEncumbrance}>Clear encumbrance</Button>
                      ) : null}
                    </div>
                  </>
                )}

                {activeAction ? (
                  <div className="mt-3 rounded-xl border border-blue-900/15 bg-cream-100 p-3">
                    <p className="body-sm font-semibold text-blue-900">{activeAction.title}</p>
                    <p className="mt-1 body-xs text-slate-500">{activeAction.help}</p>
                    {panel === "recode" ? (
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <Select value={recodeTo} onValueChange={setRecodeTo}>
                          <SelectTrigger aria-label="New category" className="w-64"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {categoryOptions.map((category) => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button type="button" variant="soft" size="sm" disabled={recodeTo === selected.category} onClick={() => recode(recodeTo)}>Confirm recode</Button>
                        <Button type="button" variant="ghost" size="sm" onClick={() => setPanel(null)}>Cancel</Button>
                      </div>
                    ) : (
                      <div className="mt-3 grid gap-2">
                        <Input
                          aria-label={panel === "attach" ? "Invoice reference" : "Resolution reason"}
                          placeholder={panel === "attach" ? "Invoice number, for example INV-2026-0412" : "Reason (for example: confirmed not a duplicate)"}
                          value={text}
                          onChange={(event) => setText(event.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                          <Button type="button" variant="ghost" size="sm" onClick={() => setPanel(null)}>Cancel</Button>
                          {/* Disabled while empty: an empty reference used to fall back
                              to a generated filename, which wrote an invoice that never
                              existed into the audit trail. */}
                          <Button type="button" variant="soft" size="sm" disabled={!text.trim()} onClick={() => (panel === "attach" ? attachInvoice(text) : resolveFlag(text))}>
                            {panel === "attach" ? "Attach" : "Confirm resolve"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}

                <div className="mt-3 grid gap-1 body-xs text-slate-500">
                  <p>
                    <span className="font-semibold text-blue-900">Invoice:</span>{" "}
                    {attachments[selected.id] ? (
                      <>
                        {attachments[selected.id]}{" "}
                        {readOnly ? null : <Button type="button" variant="ghost" size="sm" className="h-auto px-1 py-0" onClick={removeInvoice}>Remove</Button>}
                      </>
                    ) : (
                      "None attached"
                    )}
                  </p>
                  <p>
                    <span className="font-semibold text-blue-900">Flag:</span>{" "}
                    {!selectedFlag ? "None" : resolvedFlagOf(selected.id) ? `${selectedFlag.kind} (resolved)` : `${selectedFlag.kind} (open)`}
                  </p>
                  <p>
                    <span className="font-semibold text-blue-900"><Term hint={TERM_HINTS.encumbrance}>Encumbrance</Term>:</span>{" "}
                    {selected.anchor === "anchored" ? "Liquidated on payment" : clearedEnc[selected.id] ? "Cleared" : `Open ${fmtUSD(selected.amount)}`}
                  </p>
                </div>
              </div>
              )}

              {selectedLog.length > 0 ? (
                <div className="border-t border-blue-900/10 pt-3">
                  <p className="captions text-slate-500">History</p>
                  <ul className="mt-2 grid gap-1">
                    {selectedLog.map((entry, index) => (
                      <li key={index} className="body-xs text-slate-500">
                        <span className="tabular-nums text-slate-500/80">{entry.at}</span> · {entry.actor}: {entry.action}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="border-t border-blue-900/10 pt-4">
                <p className="captions text-slate-500">Proof</p>
                <p className="mt-1 body-sm text-blue-900">
                  {selected.anchor === "anchored"
                    ? "This record is locked. A fingerprint of it was published when its month was closed, so any later change would show."
                    : "This payment is recorded. Its fingerprint is published when the month is closed."}
                </p>
                <p className="mt-1 body-xs text-slate-500">
                  You do not have to take that on trust.{" "}
                  <Button type="button" variant="soft" size="sm" onClick={() => { const id = selected.id; setSelectedId(null); onVerify(id); }}>Check this record</Button>
                </p>
                {plainView ? (
                  <Button type="button" variant="outline" size="sm" className="mt-3" aria-expanded={showProof} onClick={() => setShowProof((current) => !current)}>
                    {showProof ? "Hide the proof values" : "Show the proof values"}
                  </Button>
                ) : null}
                {!plainView || showProof ? (
                  <ul className="mt-3 grid gap-2">
                    <li className="flex flex-wrap items-center gap-2">
                      <HashChip label="Record hash" value={selected.sha256} tone="info" />
                      <span className="body-xs text-slate-500">The full SHA-256 hash of this payment record.</span>
                    </li>
                    <li className="flex flex-wrap items-center gap-2">
                      <HashChip label="Fingerprint" value={selected.fingerprint} tone="neutral" />
                      <span className="body-xs text-slate-500">The fingerprint that was published when the month closed. Record Integrity compares against this.</span>
                    </li>
                    <li className="flex flex-wrap items-center gap-2">
                      <HashChip label="Ledger entry" value={selected.ledgerTx} tone="anchored" />
                      <span className="body-xs text-slate-500">The public ledger entry that holds it.</span>
                    </li>
                  </ul>
                ) : null}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

function QueryPage({ viewRole }: { viewRole: ViewRole }) {
  // Only the analyst (finance) and auditor roles see raw SQL; every other role
  // that can reach this page gets a plain-language "ask a question" mode.
  const showSql = viewRole === "finance" || viewRole === "auditor";
  const [mode, setMode] = useState("nl");
  const [question, setQuestion] = useState("");
  const [sql, setSql] = useState("");
  const [answerId, setAnswerId] = useState<string | null>(null);
  const [result, setResult] = useState(false);
  const [unmatched, setUnmatched] = useState(false);

  const answer = cannedQueries.find((item) => item.id === answerId) ?? null;

  // Each example resolves to its own SQL and its own rows, computed from the
  // ledger. One shared answer meant the app's own "anomalous payments over
  // $10,000" chip returned a table of vendor totals, which a prospect who
  // reads the result will catch immediately.
  const ask = (text: string) => {
    const match = cannedQueries.find((item) => item.question.toLowerCase() === text.trim().toLowerCase());
    setUnmatched(!match);
    setAnswerId(match?.id ?? null);
    setSql(match?.sql ?? "");
    setResult(Boolean(match) && !showSql);
  };

  const translate = () => ask(question);

  return (
    <>
      <PageHead
        eyebrow={showSql ? "Analytics" : "Plain-language analytics"}
        title={showSql ? "Query Terminal" : "Ask a question"}
        icon="search"
        action={showSql ? <SegmentedTabs label="Query mode" tabs={[{ key: "nl", label: "Natural Language" }, { key: "sql", label: "SQL" }]} value={mode} onChange={setMode} /> : undefined}
      />
      {mode === "nl" || !showSql ? (
        <Card className="mb-4">
          <p className="captions text-slate-500">Ask a question</p>
          <h3 className="mb-3 body font-semibold text-blue-900">{showSql ? "Natural Language Query" : "Ask about the town's payments"}</h3>
          <div className="flex flex-col gap-3 md:flex-row">
            <Input
              aria-label="Natural language query"
              placeholder="e.g. Show me vendor spend over $10K flagged as anomalous"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") translate();
              }}
            />
            <Button type="button" onClick={translate} disabled={!question.trim()}>{showSql ? "Translate" : "Ask"}</Button>
          </div>
          <div className="mt-3 flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <span className="captions text-slate-500">Try:</span>
            {cannedQueries.map((example) => (
              <Button
                key={example.id}
                type="button"
                variant="ghost"
                size="sm"
                className="h-auto min-h-9 w-full shrink justify-start whitespace-normal break-words px-3 py-2 text-left sm:w-auto sm:max-w-full"
                onClick={() => { setQuestion(example.question); ask(example.question); }}
              >
                {example.question}
              </Button>
            ))}
          </div>
          {unmatched ? (
            <p className="mt-3 rounded-lg border border-gold-800/20 bg-gold-100 p-3 body-xs text-blue-900">
              This snapshot answers the three questions above against the sample ledger. Open-ended questions are not wired up here, so rather than return a result that does not match what you asked, it returns nothing.
            </p>
          ) : null}
        </Card>
      ) : (
        <Card className="mb-4">
          <p className="captions text-slate-500">Direct query</p>
          <h3 className="mb-3 body font-semibold text-blue-900">SQL Editor</h3>
          <InputGroupTextarea
            aria-label="SQL Editor"
            className="min-h-40 font-mono text-blue-900"
            value={sql}
            onChange={(event) => setSql(event.target.value)}
            placeholder="SELECT vendor, SUM(amount) FROM payments GROUP BY vendor;"
          />
        </Card>
      )}
      {showSql && sql ? (
        <Card className="mb-4">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div className="min-w-0">
              <p className="captions text-slate-500">Generated SQL, review before running</p>
              <pre className="mt-2 overflow-x-auto rounded-lg bg-cream-200 p-3 font-mono body-xs text-blue-900">{sql}</pre>
            </div>
            <Button type="button" disabled={!answer} onClick={() => setResult(true)}>Run this query</Button>
          </div>
          {answer && sql !== answer.sql ? (
            <p className="mt-3 body-xs text-slate-500">
              This snapshot runs the three example queries as written. Edited SQL is not executed, so the result below still answers &ldquo;{answer.question}&rdquo;.
            </p>
          ) : null}
        </Card>
      ) : null}
      {result && answer ? (
        <TableCard eyebrow="Query results" title={`${answer.rows().length} rows · 42ms`}>
          <thead><tr><Th>{answer.columns[0]}</Th><Th right>{answer.columns[1]}</Th></tr></thead>
          <tbody>
            {answer.rows().map(([left, right]) => (
              <tr key={left}><Td strong>{left}</Td><Td right>{right}</Td></tr>
            ))}
          </tbody>
        </TableCard>
      ) : null}
    </>
  );
}

// The difference has to land in the first six characters: HashChip renders
// value.slice(0, 8), so altering the tail would leave the two chips looking
// identical on screen and the mismatch would be invisible in a live demo.
function tamperedFingerprint(value: string) {
  // A real hash shares nothing with the hash of a changed record, so the
  // altered value is a different fingerprint outright, not a patched prefix.
  return hashFor(value.length + 4_219).slice(0, value.length);
}

function VerifyPage({ initialTx, forceTamper, rows, tour }: { initialTx: string; forceTamper: boolean; rows: readonly Transaction[]; tour: TourState | null }) {
  const [txId, setTxId] = useState(initialTx || "TX-480112");
  const [resultId, setResultId] = useState<string | null>(initialTx ? initialTx : null);
  const searched = resultId?.trim().toUpperCase() ?? null;
  // The workspace rows, not the fixture: a payment a presenter beat has just
  // posted is in the first and not the second, and has to be checkable.
  const result = rows.find((transaction) => transaction.id.toUpperCase() === searched);
  const notFound = searched !== null && !result;
  const tampered = result?.id === TAMPERED_TX_ID || (forceTamper && result?.id === initialTx);
  const anchoredFingerprint = result ? (tampered ? tamperedFingerprint(result.fingerprint) : result.fingerprint) : "";

  return (
    <>
      <PageHead eyebrow="Integrity check" title="Record Integrity" icon="link" />
      <Card className="mb-4">
        <p className="body-sm text-slate-500">Check that a payment record has not been changed. Every record has a fingerprint, a short code calculated from its details (a SHA-256 hash), which was published to a public ledger when its month was closed. This page recalculates the fingerprint and compares the two. If the record was altered afterwards, they no longer match.</p>
        <div className="mt-4 flex flex-col gap-3 md:flex-row">
          <Input aria-label="Transaction ID" value={txId} onChange={(event) => setTxId(event.target.value)} />
          <Button type="button" onClick={() => setResultId(txId.trim())} disabled={!txId.trim()}>Verify</Button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="captions text-slate-500">Try:</span>
          {["TX-480112", "TX-480114"].map((id, index) => (
            <TourSpot key={id} tour={index === 0 ? tour : null} id="verify:try">
              <Button type="button" size="sm" variant="ghost" onClick={() => { setTxId(id); setResultId(id); }}>{id}</Button>
            </TourSpot>
          ))}
          <TourSpot tour={tour} id="verify:altered">
            <Button type="button" size="sm" variant="ghost" onClick={() => { setTxId(TAMPERED_TX_ID); setResultId(TAMPERED_TX_ID); }}>
              {TAMPERED_TX_ID} (altered record)
            </Button>
          </TourSpot>
        </div>
      </Card>
      {notFound ? (
        <Card className="border-gold-800/25 bg-gold-100">
          <div className="body font-semibold text-blue-900">No record found for &ldquo;{resultId}&rdquo;.</div>
          <p className="mt-1 body-sm text-slate-500">Check the transaction id and try again. Ids look like TX-480112 and appear on the Payments page.</p>
        </Card>
      ) : result ? (
        <div className="grid gap-4">
          {tampered ? (
            <TourSpot tour={tour} id="verify:mismatch" surface="page" className="rounded-2xl">
              <Card className="border-red-600/30 bg-red-100">
                <div className="body font-semibold text-red-600">Mismatch. This record does not match its anchor.</div>
                <p className="mt-1 body-sm text-blue-900">The fingerprint recomputed from the source data differs from the one anchored to the public ledger, so this record was altered after it was anchored. The anchored value cannot be rewritten, which is how the change is visible at all. A fingerprint shows that a record changed, not which detail: the next step is the change history in the source system.</p>
              </Card>
            </TourSpot>
          ) : (
            <TourSpot tour={tour} id="verify:match" surface="page" className="rounded-2xl">
              <Card className="border-green-900/15 bg-green-100">
                <div className="body font-semibold text-green-900">Record verified. Fingerprints match.</div>
                <p className="mt-1 body-sm text-green-900/80">The fingerprint recomputed from the source data matches the anchored fingerprint. This record has not been altered since it was anchored.</p>
              </Card>
            </TourSpot>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <p className="captions text-slate-500">Recomputed from source</p>
              <h3 className="mb-3 body font-semibold text-blue-900">Computed fingerprint</h3>
              <HashChip label="SHA-256" value={result.fingerprint} tone="info" />
            </Card>
            <Card className={tampered ? "border-red-600/30" : undefined}>
              <p className="captions text-slate-500">Anchored on the public ledger</p>
              <h3 className="mb-3 body font-semibold text-blue-900">Ledger fingerprint</h3>
              <HashChip label="SHA-256" value={anchoredFingerprint} tone={tampered ? "spike" : "anchored"} />
              {tampered ? <p className="mt-2 body-xs text-red-600">Nothing in common with the computed value. Changing one detail of a record changes its whole fingerprint.</p> : null}
            </Card>
          </div>
          <Card>
            <p className="captions text-slate-500">Ledger record</p>
            <h3 className="mb-3 body font-semibold text-blue-900">Anchor detail</h3>
            <div className="grid gap-4 md:grid-cols-4">
              <div><p className="captions text-slate-500">Transaction</p><HashChip value={result.ledgerTx} tone="anchored" /></div>
              <div><p className="captions text-slate-500">Block / Ledger</p><p className="body-sm font-semibold text-blue-900">{result.block.toLocaleString("en-US")}</p></div>
              <div><p className="captions text-slate-500">Anchored at</p><p className="body-sm font-semibold text-blue-900">{fmtDate(result.date)}</p></div>
              <div><p className="captions text-slate-500">Status</p><BadgeDot tone={tampered ? "spike" : "anchored"}>{tampered ? "Mismatch" : "Verified"}</BadgeDot></div>
            </div>
          </Card>
        </div>
      ) : (
        <Card>
          <p className="captions text-slate-500">How this works</p>
          <h3 className="mb-3 body font-semibold text-blue-900">How a record is checked</h3>
          <div className="grid gap-3 body-sm text-slate-500">
            <p><b className="text-blue-900">Record.</b> When a payment arrives it is checked against the town&apos;s rules and given a fingerprint: a short code calculated from the payment&apos;s details. Change any detail and the code changes.</p>
            <p><b className="text-blue-900">Close of period.</b> An authorized signer closes the month, which publishes that fingerprint to a public ledger. Only the fingerprint is published, never the record itself and never personal data.</p>
            <p><b className="text-blue-900">Check.</b> This tool recalculates the fingerprint from the town&apos;s record and compares it with the published one. If they match, nothing changed. If they differ, the record was altered after the month was closed.</p>
          </div>
        </Card>
      )}
    </>
  );
}

const TRIAGE_ASSIGNEES = [
  "Marc Levesque · Finance Director",
  "Priya Sundaram · Accounts Payable",
  "Linda Ouellette · Treasurer",
] as const;

// What the ledger is filtered to. A heatmap cell promises a department, a month
// and "flagged", so the drill has to carry all three; when it carried only the
// free-text department the ledger showed unflagged rows from other months.
type LedgerFilter = { query: string; month: string; flaggedOnly: boolean };

type TriageStatus = "open" | "assigned" | "resolved";
type TriageLogEntry = { actor: string; action: string; at: string };
type TriageState = { status: TriageStatus; assignee: string | null; log: TriageLogEntry[] };

// Everything a user can change during a session, owned by DemoConsole and
// passed down as one prop. It lives above the pages because pages unmount on
// navigation, and the story this demo exists to tell is that a flag cleared by
// finance is still cleared when the auditor opens the same record. Triage is
// keyed by transaction id, so clearing a flag in the ledger and clearing it in
// the Anomaly Center are the same act rather than two unrelated ones.
type Workspace = {
  rows: Transaction[];
  flags: Record<string, TriageState>;
  attachments: Record<string, string>;
  clearedEnc: Record<string, boolean>;
  txLog: ({ id: string } & TriageLogEntry)[];
  actor: string;
  canWrite: boolean;
  recode: (id: string, category: string) => void;
  attach: (id: string, reference: string) => void;
  removeAttachment: (id: string) => void;
  clearEncumbrance: (id: string) => void;
  resolveFlag: (id: string, reason: string) => void;
  assignFlag: (id: string, assignee: string) => void;
  noteFlag: (id: string, note: string) => void;
  reopenFlag: (id: string) => void;
};

const triageStatusTone: Record<TriageStatus, Tone> = {
  open: "neutral",
  assigned: "info",
  resolved: "anchored",
};

const triageStatusLabel: Record<TriageStatus, string> = {
  open: "Open",
  assigned: "Assigned",
  resolved: "Resolved",
};

function triageStamp() {
  return DEMO_TODAY.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

function TriageCard({
  anomaly,
  state,
  canWrite,
  onOpen,
  onResolve,
  onReopen,
  onAssign,
  onNote,
}: {
  anomaly: AnomalyQueueEntry;
  state: TriageState;
  canWrite: boolean;
  onOpen: () => void;
  onResolve: (note: string) => void;
  onReopen: () => void;
  onAssign: (assignee: string) => void;
  onNote: (note: string) => void;
}) {
  const [panel, setPanel] = useState<null | "resolve" | "note" | "assign">(null);
  const [text, setText] = useState("");
  const resolved = state.status === "resolved";

  // Empty submissions used to close the editor and save nothing at all, which
  // reads as a broken feature. The buttons below are disabled while empty.
  function submit(handler: (value: string) => void) {
    if (!text.trim()) return;
    handler(text.trim());
    setText("");
    setPanel(null);
  }

  function toggle(next: "resolve" | "note" | "assign") {
    setPanel((current) => (current === next ? null : next));
  }

  return (
    <div
      className={cn(
        "rounded-lg border p-3",
        resolved
          ? "border-green-600/20 bg-green-100"
          : anomaly.tone === "spike"
            ? "border-red-600/20 bg-red-100"
            : "border-gold-800/20 bg-gold-100",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="body-sm font-semibold text-blue-900">
            {anomaly.vendor} <span className="tabular-nums text-slate-500">{fmtUSD(anomaly.amount)}</span>
          </p>
          <p className="body-xs text-slate-500"><span className="font-semibold">Rule:</span> {anomaly.detail}</p>
          <p className="mt-1 body-xs text-slate-500">
            {anomaly.dept} ·{" "}
            <Button type="button" variant="ghost" size="sm" className="h-auto px-1 py-0" aria-label={`Open payment ${anomaly.txId} in Payments`} onClick={onOpen}>{anomaly.txId} · view payment</Button>
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <BadgeDot tone={anomaly.tone}>{anomaly.kind}</BadgeDot>
          <BadgeDot tone={triageStatusTone[state.status]}>{triageStatusLabel[state.status]}</BadgeDot>
        </div>
      </div>

      {state.assignee && !resolved ? (
        <p className="mt-2 body-xs text-blue-700">Assigned to {state.assignee}</p>
      ) : null}

      {/* Each button names its own anomaly, so a screen reader hears "Resolve
          the Axon Enterprise flag" rather than "Resolve" eight times over. */}
      {canWrite ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {resolved ? (
            <Button type="button" variant="ghost" size="sm" aria-label={`Reopen the ${anomaly.vendor} flag`} onClick={onReopen}>Reopen</Button>
          ) : (
            <>
              <Button type="button" variant="soft" size="sm" aria-label={`Resolve the ${anomaly.vendor} flag`} onClick={() => toggle("resolve")}>Resolve</Button>
              <Button type="button" variant="ghost" size="sm" aria-label={`Assign the ${anomaly.vendor} flag`} onClick={() => toggle("assign")}>Assign</Button>
              <Button type="button" variant="ghost" size="sm" aria-label={`Add a note to the ${anomaly.vendor} flag`} onClick={() => toggle("note")}>Note</Button>
            </>
          )}
        </div>
      ) : null}

      {panel === "assign" ? (
        <div className="mt-2 grid gap-1">
          {TRIAGE_ASSIGNEES.map((assignee) => (
            <Button key={assignee} type="button" variant="ghost" size="sm" className="justify-start" onClick={() => { onAssign(assignee); setPanel(null); }}>
              {assignee}
            </Button>
          ))}
        </div>
      ) : null}

      {panel === "resolve" || panel === "note" ? (
        <div className="mt-2 grid gap-2">
          <Input
            aria-label={panel === "resolve" ? "Resolution reason" : "Note"}
            placeholder={panel === "resolve" ? "Reason (for example: confirmed not a duplicate)" : "Add a note..."}
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <div className="flex justify-end">
            <Button type="button" variant="soft" size="sm" disabled={!text.trim()} onClick={() => submit(panel === "resolve" ? onResolve : onNote)}>
              {panel === "resolve" ? "Confirm resolve" : "Save note"}
            </Button>
          </div>
        </div>
      ) : null}

      {state.log.length > 0 ? (
        <ul className="mt-2 grid gap-1 border-t border-blue-900/10 pt-2">
          {state.log.map((entry, index) => (
            <li key={index} className="body-xs text-slate-500">
              <span className="tabular-nums text-slate-500/80">{entry.at}</span> · {entry.actor}: {entry.action}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function AnomaliesPage({ onDrill, workspace, tour }: { onDrill: (next: Partial<LedgerFilter>) => void; workspace: Workspace; tour: TourState | null }) {
  const anomalies = useAnomalyQueue();
  const [hideResolved, setHideResolved] = useState(false);
  const [queueSort, setQueueSort] = useState<"default" | "amount" | "dept">("default");
  // The four tiles are also the queue's filter. They read like buttons, and a
  // count of "3 duplicates" with no way to see which three is half an answer.
  const [kindFilter, setKindFilter] = useState<string | null>(null);
  const stateOf = (txId: string): TriageState => workspace.flags[txId] ?? { status: "open", assignee: null, log: [] };

  // Every number on this page counts only what is still open, so resolving a
  // flag moves the KPI tiles and the header badge together. They used to be
  // static, which left "5 open" sitting under a tile still reading "2".
  const openQueue = anomalies.filter((anomaly) => stateOf(anomaly.txId).status !== "resolved");
  const countOpen = (kind: string) => openQueue.filter((item) => item.kind === kind).length;
  const counts = [
    ["Spend Spikes", "Spend Spike", countOpen("Spend Spike"), "A payment far above a department's usual spending for that category, flagged when it runs several times the median for that category."],
    ["Duplicates", "Duplicate Payment", countOpen("Duplicate Payment"), "The same vendor appears to have been paid twice for what looks like the same invoice or amount."],
    ["Outliers", "Outlier Payment", countOpen("Outlier Payment"), "A payment that statistically stands apart from the normal pattern for that vendor or department."],
    ["Suspicious MCC", "Suspicious MCC", countOpen("Suspicious MCC"), "The merchant category code (the type of business paid) doesn't fit what the card or department should be buying. For example, a restaurant charge on a library card."],
  ] as const;

  // What the queue is showing after the tile filter, the resolved toggle and
  // the sort. The bulk assign acts on exactly this list, minus anything closed.
  const shownQueue = anomalies
    .filter((anomaly) => !(hideResolved && stateOf(anomaly.txId).status === "resolved") && !(kindFilter && anomaly.kind !== kindFilter))
    .sort((a, b) => (queueSort === "amount" ? b.amount - a.amount : queueSort === "dept" ? a.dept.localeCompare(b.dept) : 0));
  const openShown = shownQueue.filter((anomaly) => stateOf(anomaly.txId).status === "open");

  const openCount = openQueue.length;
  const assignedCount = anomalies.filter((anomaly) => stateOf(anomaly.txId).status === "assigned").length;
  const resolvedCount = anomalies.length - openCount;

  return (
    <>
      <PageHead eyebrow="Risk monitoring" title="Anomaly Center" icon="flash" action={<BadgeDot tone={openCount ? "spike" : "anchored"}>{openCount} open · {resolvedCount} resolved</BadgeDot>} />
      <div className="mb-4 grid gap-4 md:grid-cols-4">
        {counts.map(([label, kind, value, hint]) => (
          <div
            key={label}
            {...interactiveRowProps(() => setKindFilter((current) => (current === kind ? null : kind)), {
              role: "button",
              label: `${label}: ${value} open. ${kindFilter === kind ? "Show all flags" : "Show only these in the queue"}.`,
              className: cn("rounded-2xl hover:opacity-90", kindFilter === kind && "ring-2 ring-blue-700 ring-offset-2 ring-offset-background"),
            })}
            aria-pressed={kindFilter === kind}
          >
            <StatTile label={label} value={value} sub={value === 0 ? "Cleared" : kindFilter === kind ? "Showing these below" : "Select to filter the queue"} hint={hint} />
          </div>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <ChartCard eyebrow="Department × month risk" title="Spend Risk Heatmap" className="overflow-x-auto xl:col-span-2">
          <HeatmapChart onCellClick={(dept, month) => onDrill({ query: dept, month, flaggedOnly: true })} tour={tour} />
          <div className="px-4 pb-4 body-xs text-slate-500">
            Click a cell to open that department&apos;s flagged payments for that month in the ledger. Cells total {anomalyQueue.length}, the flagged payments in this snapshot.
          </div>
        </ChartCard>
        <TourSpot tour={tour} id="anomalies:queue" surface="page" className="rounded-2xl">
        <Card>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="captions text-slate-500">Requires review</p>
              <h3 className="body font-semibold text-blue-900">Triage Queue</h3>
            </div>
            <Button type="button" variant="ghost" size="sm" aria-pressed={hideResolved} onClick={() => setHideResolved((value) => !value)}>
              {hideResolved ? "Show resolved" : "Hide resolved"}
            </Button>
          </div>
          <div className="mb-3 mt-2 flex flex-wrap items-center gap-2">
            <Select value={queueSort} onValueChange={(value) => setQueueSort(value as typeof queueSort)}>
              <SelectTrigger aria-label="Sort the queue" className="w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Most serious first</SelectItem>
                <SelectItem value="amount">Largest amount first</SelectItem>
                <SelectItem value="dept">By department</SelectItem>
              </SelectContent>
            </Select>
            {/* One decision for the whole list on screen. With a tile selected
                that is "hand every duplicate to Accounts Payable" in one go. */}
            {workspace.canWrite && openShown.length > 1 ? (
              <Select value="" onValueChange={(assignee) => openShown.forEach((anomaly) => workspace.assignFlag(anomaly.txId, assignee))}>
                <SelectTrigger aria-label="Assign every open flag shown" className="w-64"><SelectValue placeholder={`Assign all ${openShown.length} open to...`} /></SelectTrigger>
                <SelectContent>
                  {TRIAGE_ASSIGNEES.map((assignee) => (
                    <SelectItem key={assignee} value={assignee}>{assignee}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : null}
          </div>
          <p className="mb-3 body-xs text-slate-500">
            {openCount} open · {assignedCount} assigned · {resolvedCount} resolved
            {kindFilter ? (
              <>
                {" "}· showing {kindFilter.toLowerCase()} only{" "}
                <Button type="button" variant="ghost" size="sm" onClick={() => setKindFilter(null)}>Show all</Button>
              </>
            ) : null}
          </p>
          {!workspace.canWrite ? (
            <p className="mb-3 body-xs text-slate-500">Read-only view for this role. Triage actions are disabled.</p>
          ) : null}
          <div className="grid gap-2">
            {shownQueue.map((anomaly) => (
              <TriageCard
                key={anomaly.txId}
                anomaly={anomaly}
                state={stateOf(anomaly.txId)}
                canWrite={workspace.canWrite}
                onOpen={() => onDrill({ query: anomaly.txId })}
                onResolve={(note) => workspace.resolveFlag(anomaly.txId, note)}
                onReopen={() => workspace.reopenFlag(anomaly.txId)}
                onAssign={(assignee) => workspace.assignFlag(anomaly.txId, assignee)}
                onNote={(note) => workspace.noteFlag(anomaly.txId, note)}
              />
            ))}
          </div>
        </Card>
        </TourSpot>
      </div>
    </>
  );
}

const PUBLIC_PAGE_SIZE = 24;

function PublicBudgetPage({ tour }: { tour: TourState | null }) {
  const [search, setSearch] = useState("");
  const [shown, setShown] = useState(PUBLIC_PAGE_SIZE);
  const [response, setResponse] = useState<null | { query: string; date: string; count: number; total: number; rows: Transaction[] }>(null);
  const responseRef = useRef<HTMLDivElement>(null);
  const approved = data.kpis.approved;
  const actual = data.kpis.actual;
  const committed = data.kpis.encumbered;
  const remaining = data.kpis.remaining;
  const filtered = newestFirst(allPayments).filter((transaction) =>
    !search ||
    transaction.vendor.toLowerCase().includes(search.toLowerCase()) ||
    transaction.dept.toLowerCase().includes(search.toLowerCase()) ||
    transaction.category.toLowerCase().includes(search.toLowerCase()),
  );
  const total = filtered.reduce((sum, transaction) => sum + transaction.amount, 0);
  // Sort the whole filtered set, then paginate the sorted result. Sorting
  // `visible` instead would only reorder the 24 rows already on screen, so
  // "sort by amount" would show the largest of the first page rather than the
  // largest payment the town made, which is the question being asked.
  const publicTable = useTableSort(filtered, {
    date: (row) => row.date,
    vendor: (row) => row.vendor,
    dept: (row) => row.dept,
    category: (row) => row.category,
    amount: (row) => row.amount,
    status: (row) => row.anchor,
  });
  // The table used to render a fixed 24 rows under a header claiming all 66,
  // with no pagination and no note, so two thirds of the payments were simply
  // missing from a page whose whole promise is "search every payment".
  const visible = publicTable.rows.slice(0, shown);

  function prepareResponse() {
    // The rows are captured with the letter. Leaving the table live meant the
    // response said "listed below" above a table that kept changing under it.
    setResponse({
      query: search.trim(),
      date: DEMO_TODAY.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }),
      count: filtered.length,
      total,
      rows: filtered,
    });
    window.setTimeout(() => responseRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }

  return (
    <>
      <div className={response ? "print:hidden" : undefined}>
      <PageHead eyebrow="Public Budget · Fiscal Year 2026 · figures as of Mar 2026" title="Where our money goes" icon="globe" />
      <Card className="mb-4">
        <p className="body text-slate-500">
          This year the town set aside <b className="text-blue-900">{fmtUSD(approved)}</b> to run services and projects. So far we have spent <b className="text-blue-900">{fmtUSD(actual)}</b> ({data.kpis.utilized}% of the plan) and committed another <b className="text-blue-900">{fmtUSD(committed)}</b> to open orders, leaving <b className="text-blue-900">{fmtUSD(remaining)}</b> still to spend.
        </p>
      </Card>
      <StatGrid
        items={[
          { label: "Budgeted", value: fmtC(approved), sub: "Town appropriation" },
          { label: "Spent so far", value: fmtC(actual), sub: `${data.kpis.utilized}% of plan` },
          { label: "Remaining", value: fmtC(remaining), sub: "Still to spend" },
          { label: "Committed", value: fmtC(committed), sub: "Open orders" },
        ]}
      />
      <ChartCard eyebrow="By department" title="Public Budget Status" className="mb-4">
        <DataBars items={data.departments.map((department) => ({ name: department.name, value: department.spent }))} max={Math.max(...data.departments.map((department) => department.budget))} />
      </ChartCard>
      </div>
      {response ? (
        <div ref={responseRef} className="min-w-0 scroll-mt-4">
          <Card className="mb-4 min-w-0 border border-blue-900/15">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="captions text-slate-500">Public records response</p>
                <h3 className="body font-semibold text-blue-900">{response.query ? `Records matching "${response.query}"` : "All public payments"}</h3>
              </div>
              <div className="flex shrink-0 gap-2 print:hidden">
                <Button type="button" variant="soft" size="sm" icon="note" iconPosition="leading" onClick={() => window.print()}>Print / PDF</Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => setResponse(null)}>Clear</Button>
              </div>
            </div>
            {/* This document leaves the screen and reads as an official record,
                so it says what it is before it says anything else. */}
            <p className="mt-2 captions text-gold-800">{SAMPLE_DATA_NOTICE}</p>
            {/* The walkthrough rings this sentence rather than the whole
                response: the response is thousands of pixels tall once the
                payment list is attached, so a ring around it is invisible and
                the bubble ends up anchored somewhere off the fold. */}
            <TourSpot tour={tour} id="public:letter">
              <p className="mt-3 body-sm text-slate-500">
                In response to a request for public records, Any Town, USA provides {response.count} payment{response.count === 1 ? "" : "s"} totaling <b className="text-blue-900">{fmtUSD(response.total)}</b>, listed below. Generated from the Civic-Chain public ledger on {response.date}.
              </p>
            </TourSpot>
            <p className="mt-2 body-xs text-slate-500">
              {(() => {
                const pending = response.rows.filter((row) => row.anchor !== "anchored").length;
                return pending === 0
                  ? "Every record in this response has its fingerprint published to a tamper-evident public ledger and can be independently verified."
                  : `${response.count - pending} of these ${response.count} records have their fingerprint published to a tamper-evident public ledger and can be independently verified. The other ${pending} ${pending === 1 ? "is a recent payment whose month has" : "are recent payments whose month has"} not been closed yet.`;
              })()}{" "}
              No login or follow-up request is required.
            </p>
            {/* The letter carries its own frozen list. It used to say "listed
                below" above a table that kept responding to the search box.
                min-w-0 on the scroll container: without it the min-w-max table
                sets the container's width and the overflow escapes the page. */}
            <div className="mt-3 min-w-0 overflow-x-auto">
              <Table className="min-w-max border-collapse">
                <thead>
                  <tr><Th>Date</Th><Th>Vendor</Th><Th>Department</Th><Th right>Amount</Th></tr>
                </thead>
                <tbody>
                  {response.rows.map((transaction) => (
                    <tr key={transaction.id}>
                      <Td>{fmtDate(transaction.date)}</Td>
                      <Td strong>{transaction.vendor}</Td>
                      <Td>{transaction.dept}</Td>
                      <Td right>{fmtUSD(transaction.amount)}</Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card>
        </div>
      ) : null}
      {/* A records response is a document of its own. With one on the page,
          printing produces the letter and nothing else. */}
      <div className={response ? "print:hidden" : undefined}>
      <Card padded={false}>
        <CardHead
          eyebrow="Open checkbook"
          title="Search every payment"
          action={
            <div className="flex flex-wrap items-center gap-2">
              <TourSpot tour={tour} id="public:records-response">
                <Button type="button" variant="soft" size="sm" icon="note" iconPosition="leading" onClick={prepareResponse}>Records response</Button>
              </TourSpot>
              <ExportButton
                onClick={() =>
                  downloadCsv(
                    "payments.csv",
                    ["Date", "Vendor", "Department", "Category", "Amount", "Status"],
                    filtered.map((t) => [t.date, t.vendor, t.dept, t.category, t.amount, t.anchor === "anchored" ? "Verified" : "Pending"]),
                  )
                }
              />
            </div>
          }
        />
        <div className="px-4 pb-3">
          <Input aria-label="Search every payment" placeholder="Search vendor, department, or category..." value={search} onChange={(event) => { setSearch(event.target.value); setShown(PUBLIC_PAGE_SIZE); }} />
        </div>
        <div className="flex items-center justify-between px-4 pb-2 body-xs text-slate-500">
          <span>Showing {visible.length} of {filtered.length} payments</span>
          <span>Total <b className="text-blue-900">{fmtUSD(total)}</b></span>
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-max border-collapse">
            <thead>
              <tr>
                <SortTh {...publicTable.th("date")} className="hidden sm:table-cell">Date</SortTh>
                <SortTh {...publicTable.th("vendor")}>Vendor</SortTh>
                <SortTh {...publicTable.th("dept")} className="hidden sm:table-cell">Department</SortTh>
                <SortTh {...publicTable.th("category")} className="hidden sm:table-cell">Category</SortTh>
                <SortTh {...publicTable.th("amount")} right>Amount</SortTh>
                <SortTh {...publicTable.th("status")}>Status</SortTh>
              </tr>
            </thead>
            <tbody>
              {visible.map((transaction) => (
                <tr key={transaction.id}>
                  <Td className="hidden sm:table-cell">{fmtDate(transaction.date)}</Td>
                  <Td strong>{transaction.vendor}</Td>
                  <Td className="hidden sm:table-cell">{transaction.dept}</Td>
                  <Td className="hidden sm:table-cell">{transaction.category}</Td>
                  <Td right>{fmtUSD(transaction.amount)}</Td>
                  <Td><BadgeDot tone={transaction.anchor === "anchored" ? "anchored" : "pending"}>{transaction.anchor === "anchored" ? "Verified" : "Pending"}</BadgeDot></Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {visible.length < filtered.length ? (
          <div className="flex justify-center px-4 pb-4">
            <Button type="button" variant="ghost" size="sm" onClick={() => setShown((count) => count + PUBLIC_PAGE_SIZE)}>
              Show {Math.min(PUBLIC_PAGE_SIZE, filtered.length - visible.length)} more
            </Button>
          </div>
        ) : null}
      </Card>
      </div>
      <Card className={cn("mt-4 bg-green-100", response && "print:hidden")}>
        <h3 className="body font-semibold text-green-900">Every dollar is on the record</h3>
        <p className="mt-1 body-sm text-green-900/80">Each payment the town makes gets a fingerprint, and that fingerprint is published to a tamper-evident public ledger when its month closes, so anyone can confirm the figures on this page have not been changed after the fact.</p>
      </Card>
    </>
  );
}

const scheduleDayOptions = [
  { value: "1", label: "1st" },
  { value: "5", label: "5th" },
  { value: "10", label: "10th" },
  { value: "15", label: "15th" },
] as const;

function ReportPage({ viewRole, tour }: { viewRole: ViewRole; tour: TourState | null }) {
  const bandSettings = useBandSettings().settings;
  // The packet is the town's official explanation of its own variances, so only
  // roles inside the accounting workflow may author it. Everyone else reads it.
  const canAuthor = canWriteRoles.includes(viewRole) || viewRole === "manager";
  const tally = fiscalHealth(bandSettings);
  const health = { ...townHealth(bandSettings), ...tally };
  const overBudget = data.departments
    .map((department) => ({ ...department, projected: projectedYearEnd(department.spent) }))
    .filter((department) => departmentPace(department, bandSettings) === "At risk");

  const period = "March 2026";
  const today = DEMO_TODAY.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  const defaultMemo = `Enclosed is the ${period} financial packet for the Select Board's review. Total spending remains within the overall appropriation for the fiscal year. ${overBudget.length} department${overBudget.length === 1 ? "" : "s"} ${overBudget.length === 1 ? "is" : "are"} projected over allocation at the current pace, with commentary on each included below. No action is requested beyond acceptance of this report.`;

  const [memo, setMemo] = useState(defaultMemo);
  const [notes, setNotes] = useState<Record<string, string>>(() => ({
    "Public Works": "Winter overtime and road salt ran ahead of plan; spending is expected to normalize through spring.",
    "Health & General Assistance": "Seasonal general-assistance caseload is higher than projected; staff is reviewing eligibility weekly.",
    "Road Improvement Program": "Paving came in above the engineer's estimate; a budget amendment will be requested at the April meeting.",
  }));
  const [scheduleDay, setScheduleDay] = useState("1");
  const [scheduled, setScheduled] = useState(true);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const [packets, setPackets] = useState<{ period: string; date: string }[]>(() => [
    { period: "February 2026", date: "March 2, 2026" },
    { period: "January 2026", date: "February 2, 2026" },
  ]);

  const scheduleLabel = scheduleDayOptions.find((option) => option.value === scheduleDay)?.label ?? "1st";
  const nextRun = new Date(Date.UTC(DEMO_TODAY.getUTCFullYear(), DEMO_TODAY.getUTCMonth() + 1, Number(scheduleDay))).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

  // Generating scrolls the finished packet into view. Previously the button
  // promised an assembled packet and only updated a caption, leaving the
  // presenter looking at an unchanged screen.
  const packetRef = useRef<HTMLDivElement>(null);

  function generatePacket() {
    setGeneratedAt(today);
    setPackets((previous) => [{ period, date: today }, ...previous.filter((entry) => entry.period !== period)]);
    window.setTimeout(() => packetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }

  return (
    <article>
      <PageHead
        eyebrow="Any Town, USA"
        title="Select Board Packet"
        icon="note"
        action={
          <div className="flex items-center gap-3">
            <BadgeDot tone={health.tone}>{health.label}</BadgeDot>
            <Button type="button" variant="soft" size="sm" icon="note" iconPosition="leading" onClick={() => window.print()}>
              Print / PDF
            </Button>
          </div>
        }
      />
      {canAuthor ? (
      <Card className="mb-4 print:hidden">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="captions text-slate-500">Monthly board packet</p>
            <h3 className="body font-semibold text-blue-900">Assemble the {period} packet</h3>
          </div>
          <TourSpot tour={tour} id="report:generate">
            <Button type="button" size="sm" icon="note" iconPosition="leading" onClick={generatePacket}>
              Generate packet
            </Button>
          </TourSpot>
        </div>
        <p className="mt-1 body-xs text-slate-500">
          One click assembles a branded, paginated packet (cover memo, department status, fund accounting, and variance notes) ready to drop into the agenda. {generatedAt ? `Last generated ${generatedAt}.` : "Not generated yet this month."}
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <p className="captions text-slate-500">Cover memo</p>
            <InputGroupTextarea
              aria-label="Cover memo"
              className="mt-1 min-h-28 text-blue-900"
              value={memo}
              onChange={(event) => setMemo(event.target.value)}
              placeholder="A short note to the Select Board that opens the packet..."
            />
          </div>
          <div>
            <p className="captions text-slate-500">Monthly schedule</p>
            <div className="mt-1 flex items-center gap-2">
              <Select value={scheduleDay} onValueChange={setScheduleDay}>
                <SelectTrigger aria-label="Day of month" className="w-40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {scheduleDayOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label} of the month</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" variant={scheduled ? "soft" : "ghost"} size="sm" onClick={() => setScheduled((value) => !value)}>
                {scheduled ? "Scheduled" : "Turn on"}
              </Button>
            </div>
            <p className="mt-2 body-xs text-slate-500">
              {scheduled ? `Generates automatically on the ${scheduleLabel} of each month. Next run ${nextRun}.` : "Automatic monthly generation is off."}
            </p>
            <p className="mt-3 captions text-slate-500">Stored packets</p>
            <ul className="mt-1 grid gap-1">
              {packets.map((entry) => (
                <li key={entry.period} className="flex items-center justify-between body-xs text-slate-500">
                  <span className="text-blue-900">{entry.period} packet</span>
                  <span>generated {entry.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {overBudget.length > 0 ? (
          <div className="mt-4">
            <p className="captions text-slate-500">Variance notes</p>
            <div className="mt-1 grid gap-2">
              {overBudget.map((department) => (
                <div key={department.name} className="grid gap-1">
                  <span className="body-xs font-medium text-blue-900">{department.name}</span>
                  <Input
                    aria-label={`Variance note for ${department.name}`}
                    value={notes[department.name] ?? ""}
                    onChange={(event) => setNotes((previous) => ({ ...previous, [department.name]: event.target.value }))}
                    placeholder="Explain the variance for the Select Board..."
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Card>
      ) : (
        <Card className="mb-4 print:hidden">
          <p className="body-sm text-slate-500">
            This is the packet as the Select Board receives it. Authoring the cover memo and the variance notes is restricted to Finance and the Town Manager.
          </p>
        </Card>
      )}
      <TourSpot tour={tour} id="report:packet" surface="page" className="rounded-2xl">
      <div ref={packetRef} className="scroll-mt-4">
        <Card className="mb-4 break-inside-avoid border border-blue-900/15">
          <div className="flex flex-col items-center gap-2 text-center">
            <IconChip name="trust" tone="gold-soft" variant="tile" size="md" />
            <p className="captions text-slate-500">Any Town, USA</p>
            <p className="h4 text-blue-900">Monthly Select Board Financial Packet</p>
            <p className="body-sm text-slate-500">Reporting period: {period} · Fiscal Year 2026</p>
            <p className="body-xs text-slate-500">Prepared for the Select Board{generatedAt ? ` · Generated ${generatedAt}` : ""}</p>
            <p className="captions text-gold-800">{SAMPLE_DATA_NOTICE}</p>
          </div>
          {/* The letterhead is centred; the memo is body copy and runs the full
              width under its own rule and label, so its left edge lines up with
              the cards below instead of floating in a narrower column. */}
          <div className="mt-6 border-t border-blue-900/10 pt-4">
            <p className="captions text-slate-500">Cover memo</p>
            <p className="mt-2 whitespace-pre-line body-sm leading-relaxed text-slate-500">{memo}</p>
          </div>
        </Card>
      </div>
      </TourSpot>
      <Card className="mb-4 break-inside-avoid">
        <p className="captions text-slate-500">Executive summary</p>
        <p className="mt-2 body-sm leading-relaxed text-slate-500">
          For fiscal year 2026, the town appropriated <b className="text-blue-900">{fmtUSD(data.kpis.approved)}</b> across all funds. Through March 2026, <b className="text-blue-900">{fmtUSD(data.kpis.actual)}</b> has been spent ({data.kpis.utilized}% of budget) and a further <b className="text-blue-900">{fmtUSD(data.kpis.encumbered)}</b> is committed to open purchase orders, leaving <b className="text-blue-900">{fmtUSD(data.kpis.remaining)}</b> available. Spending is up <b className="text-blue-900">{data.kpis.yoy}%</b> versus the same period last year. Overall: <b className="text-blue-900">{health.label.toLowerCase()}</b>. By department: {health.atRisk} at risk of overspending, {health.watch} to watch, {health.healthy} healthy.
        </p>
      </Card>
      <TableCard eyebrow="Budget vs. actual by department" title="Department status">
        <thead><tr><Th>Department</Th><Th>Fund</Th><Th right>Approved</Th><Th right>YTD Actual</Th><Th right>Encumbered</Th><Th right>Remaining</Th><Th right>Utilized</Th><Th>Status</Th></tr></thead>
        <tbody>
          {data.departments.map((department) => {
            const remaining = department.budget - department.spent - department.enc;
            // Graded on the projection, like the memo and the summary above it.
            // Grading on spend to date called Public Works "On Track" in the
            // same packet whose memo lists it as projected over.
            const pace = departmentPace(department, bandSettings);
            const status = { label: pace, tone: PACE_TONE[pace] };
            return (
              <tr key={department.name}>
                <Td strong>{department.name}</Td>
                <Td>{department.fund}</Td>
                <Td right>{fmtUSD(department.budget)}</Td>
                <Td right>{fmtUSD(department.spent)}</Td>
                <Td right>{fmtUSD(department.enc)}</Td>
                <Td right>{fmtUSD(remaining)}</Td>
                <Td right>{Math.round((department.spent / department.budget) * 100)}%</Td>
                <Td><BadgeDot tone={status.tone}>{status.label}</BadgeDot></Td>
              </tr>
            );
          })}
        </tbody>
      </TableCard>
      <div className="h-4" />
      <TableCard eyebrow="Revenue vs. expenditure and fund balance" title="Fund accounting">
        <thead><tr><Th>Fund</Th><Th right>Revenue</Th><Th right>Expenditure</Th><Th right>Net</Th><Th right>Ending Balance</Th></tr></thead>
        <tbody>
          {data.funds.map((fund) => (
            <tr key={fund.fund}>
              <Td strong>{fund.fund}</Td>
              <Td right>{fmtUSD(fund.revenue)}</Td>
              <Td right>{fmtUSD(fund.exp)}</Td>
              <Td right className="text-green-900">+{fmtUSD(fund.revenue - fund.exp)}</Td>
              <Td right>{fmtUSD(fund.ending)}</Td>
            </tr>
          ))}
        </tbody>
      </TableCard>
      <Card className="mt-4 break-inside-avoid">
        <p className="captions text-slate-500">Variance highlights</p>
        <h3 className="mb-3 body font-semibold text-blue-900">Departments projected over allocation</h3>
        <div className="grid gap-3">
          {overBudget.map((department) => (
            <div key={department.name}>
              <p className="body-sm text-slate-500">
                <b className="text-blue-900">{department.name}</b> is projected to reach <b className="text-blue-900">{fmtUSD(department.projected)}</b> ({Math.round((department.projected / department.budget) * 100)}% of its {fmtC(department.budget)} budget), roughly <b className="text-blue-900">{fmtC(department.projected - department.budget)}</b> over allocation if spending continues at the current pace.
              </p>
              {notes[department.name]?.trim() ? (
                <p className="mt-1 body-sm text-blue-900"><span className="font-semibold">Note:</span> {notes[department.name]}</p>
              ) : null}
            </div>
          ))}
        </div>
      </Card>
      <Card className="mt-4 break-inside-avoid bg-green-100">
        <h3 className="body font-semibold text-green-900">Verified on a public ledger</h3>
        <p className="mt-1 body-sm text-green-900/80">Every payment behind these figures is written to a tamper-evident public ledger and anchored to a public ledger at each close of period, so the numbers in this report can be independently confirmed and have not been altered after publication.</p>
      </Card>
    </article>
  );
}

const auditSampleMethods = [
  { value: "flagged", label: "All flagged payments" },
  { value: "systematic", label: "Every 5th payment (systematic)" },
  { value: "largest", label: "10 largest payments" },
] as const;

// Module scope so the end of the auditor walkthrough can hand over the same
// file the Auditor Workspace produces, rather than describing one.
function exportAuditPackage(sample: readonly Transaction[]) {
  downloadCsv(
    "civic-chain-audit-package.csv",
    ["Date", "TX ID", "Vendor", "Department", "Amount", "Category", "Anchor", "sha256", "ledger_tx", "Block"],
    sample.map((t) => [t.date, t.id, t.vendor, t.dept, t.amount, t.category, t.anchor, t.sha256, t.ledgerTx, t.block]),
  );
}

function buildAuditSample(method: string): Transaction[] {
  if (method === "largest") return transactions.slice().sort((a, b) => b.amount - a.amount).slice(0, 10);
  if (method === "systematic") return transactions.filter((_, index) => index % 5 === 0);
  return transactions.filter((transaction) => transaction.anomaly);
}

function AuditorPage({ onVerify, tour }: { onVerify: (txId: string) => void; tour: TourState | null }) {
  const today = DEMO_TODAY.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  const [method, setMethod] = useState("flagged");
  const [sample, setSample] = useState<Transaction[]>(() => buildAuditSample("flagged"));
  const [tracedId, setTracedId] = useState<string | null>(null);
  const traced = sample.find((transaction) => transaction.id === tracedId) ?? null;

  const sampledValue = sample.reduce((sum, transaction) => sum + transaction.amount, 0);
  const flaggedInSample = sample.filter((transaction) => transaction.anomaly).length;
  const anchoredCoverage = Math.round((allPayments.filter((transaction) => transaction.anchor === "anchored").length / allPayments.length) * 100);
  const methodLabel = auditSampleMethods.find((option) => option.value === method)?.label ?? "";
  // Only the evidence table below sorts. The sample table above it does not:
  // its row order IS the sampling method the page states on screen, and that
  // same array is what the audit package exports.
  const closeTable = useTableSort(governance.closedPeriods, {
    period: (row) => row.monthKey,
    closed: (row) => row.closedAt,
    closedBy: (row) => row.closedBy,
    records: (row) => row.records,
  });

  function pullSample() {
    setSample(buildAuditSample(method));
    setTracedId(null);
  }


  return (
    <>
      <PageHead
        eyebrow="Independent assurance · read-only"
        title="Auditor Workspace"
        icon="trust"
        action={
          <div className="flex items-center gap-3">
            <BadgeDot tone="info">No write access</BadgeDot>
            <Button type="button" variant="soft" size="sm" icon="note" iconPosition="leading" onClick={() => window.print()}>Print / PDF</Button>
          </div>
        }
      />
      <Card className="mb-4">
        <p className="body-sm leading-relaxed text-slate-500">
          A read-only workspace for fieldwork. Pull a sample, trace any figure back to its source record, and use the history of closed months as evidence. Every payment has a fingerprint (a SHA-256 hash) that was published to a public ledger when its month closed, so each figure can be checked independently and a later change cannot go unnoticed. Audit package generated {today}.
        </p>
      </Card>
      <StatGrid
        items={[
          { label: "Sample size", value: sample.length, sub: methodLabel },
          { label: "Sampled value", value: fmtC(sampledValue), sub: "Total in this sample" },
          { label: "Flagged in sample", value: flaggedInSample, sub: "Anomaly-flagged rows" },
          { label: "Anchored coverage", value: `${anchoredCoverage}%`, sub: "Of all payments", hint: "Share of payments whose fingerprint has been published to the public ledger. The rest belong to a month that is still open." },
        ]}
      />
      <TourSpot tour={tour} id="audit:sample" surface="page" className="mb-4 rounded-2xl">
      <Card padded={false}>
        <CardHead
          eyebrow="Sampling"
          title="Pull an audit sample"
          action={
            <div className="flex flex-wrap items-center gap-2">
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger aria-label="Sample method" className="w-56"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {auditSampleMethods.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" variant="soft" size="sm" onClick={pullSample}>Pull sample</Button>
              <ExportButton onClick={() => exportAuditPackage(sample)} />
            </div>
          }
        />
        <div className="flex items-center justify-between px-4 pb-2 body-xs text-slate-500">
          <span>{sample.length} payments sampled</span>
          <span>Total <b className="text-blue-900">{fmtUSD(sampledValue)}</b></span>
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-max border-collapse">
            <thead>
              <tr><Th>Date</Th><Th>TX ID</Th><Th>Vendor</Th><Th>Department</Th><Th right>Amount</Th><Th>Anchor</Th><Th>Flag</Th></tr>
            </thead>
            <tbody>
              {sample.map((transaction) => (
                <tr key={transaction.id} {...interactiveRowProps(() => setTracedId(transaction.id))}>
                  <Td>{fmtDate(transaction.date)}</Td>
                  <Td strong>{transaction.id}</Td>
                  <Td>{transaction.vendor}</Td>
                  <Td>{transaction.dept}</Td>
                  <Td right>{fmtUSD(transaction.amount)}</Td>
                  <Td><BadgeDot tone={transaction.anchor === "anchored" ? "anchored" : "pending"}>{transaction.anchor === "anchored" ? "Anchored" : "Pending"}</BadgeDot></Td>
                  <Td>{transaction.anomaly ? <BadgeDot tone="spike">{flagInfoFor(transaction)?.kind ?? transaction.anomaly}</BadgeDot> : <span className="body-xs text-slate-500">None</span>}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
      </TourSpot>
      <Dialog open={traced !== null} onOpenChange={(open) => { if (!open) setTracedId(null); }}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
          {traced ? (
            <>
              <DialogHeader>
                <p className="captions text-slate-500">Trace to source and proof</p>
                <DialogTitle className="body font-semibold text-blue-900">{traced.id}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ["Vendor", traced.vendor],
                  ["Department", traced.dept],
                  ["Category", traced.category],
                  ["Amount", fmtUSD(traced.amount)],
                  ["MCC", String(traced.mcc).padStart(4, "0")],
                  ["Posted", fmtDate(traced.date)],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="captions text-slate-500">{label}</p>
                    <p className="body-sm font-semibold text-blue-900">{value}</p>
                  </div>
                ))}
              </div>
              <div className="grid gap-2">
                <HashChip label="Record hash" value={traced.sha256} tone="info" />
                <HashChip label="Fingerprint" value={traced.fingerprint} tone="neutral" />
                <HashChip label="Ledger entry" value={traced.ledgerTx} tone="anchored" />
              </div>
              <p className="body-xs text-slate-500">Block {traced.block.toLocaleString("en-US")}, anchored {traced.ts}. Recompute the fingerprint from the source record and compare it to the anchored value.</p>
              {/* The auditor used to be told to go and compare this on another
                  page, with no link and no copy control, so the id had to be
                  memorised and retyped. */}
              <div className="flex justify-end">
                <Button type="button" variant="soft" size="sm" onClick={() => { const id = traced.id; setTracedId(null); onVerify(id); }}>
                  Verify {traced.id}
                </Button>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
      <Card padded={false}>
        <CardHead
          eyebrow="Evidence"
          title="Anchor history"
          action={
            <ExportButton
              onClick={() =>
                downloadCsv(
                  "anchor-history.csv",
                  ["Period", "Closed", "Closed by", "Records", "Anchor tx"],
                  governance.closedPeriods.map((period) => [period.monthKey, period.closedAt, period.closedBy, period.records, period.ledgerTx]),
                )
              }
            />
          }
        />
        <div className="overflow-x-auto">
          <Table className="min-w-max border-collapse">
            <thead>
              <tr>
                <SortTh {...closeTable.th("period")}>Period</SortTh>
                <SortTh {...closeTable.th("closed")}>Closed</SortTh>
                <SortTh {...closeTable.th("closedBy")}>Closed by</SortTh>
                <SortTh {...closeTable.th("records")} right>Records</SortTh>
                <Th>Anchor tx</Th>
              </tr>
            </thead>
            <tbody>
              {closeTable.rows.map((period) => (
                <tr key={period.monthKey}>
                  <Td strong>{monthLabel(period.monthKey)}</Td>
                  <Td>{fmtDate(period.closedAt)}</Td>
                  <Td>{period.closedBy}</Td>
                  <Td right>{period.records}</Td>
                  <Td><span className="font-mono body-xs text-slate-500">{period.ledgerTx}</span></Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </>
  );
}

type ActivePageProps = {
  page: PageKey;
  feeds: Feed[];
  onRetry: (name: string) => void;
  ledgerFilter: LedgerFilter;
  verifyTx: string;
  verifyTamper: boolean;
  onDrill: (next: Partial<LedgerFilter>) => void;
  onVerify: (txId: string) => void;
  onNavigate: (key: PageKey) => void;
  viewRole: ViewRole;
  workspace: Workspace;
  tour: TourState | null;
};

function ActivePage({ page, feeds, onRetry, ledgerFilter, verifyTx, verifyTamper, onDrill, onVerify, onNavigate, viewRole, workspace, tour }: ActivePageProps) {
  if (page === "audit") return <AuditorPage onVerify={onVerify} tour={tour} />;
  if (page === "board") return <BoardViewPage onDrill={onDrill} onNavigate={onNavigate} tour={tour} />;
  if (page === "ledger") return <LedgerPage filter={ledgerFilter} workspace={workspace} tour={tour} viewRole={viewRole} onVerify={onVerify} />;
  if (page === "query") return <QueryPage viewRole={viewRole} />;
  if (page === "verify") return <VerifyPage key={`${verifyTx}:${verifyTamper}`} initialTx={verifyTx} forceTamper={verifyTamper} rows={workspace.rows} tour={tour} />;
  if (page === "anomalies") return <AnomaliesPage onDrill={onDrill} workspace={workspace} tour={tour} />;
  if (page === "budget") return <BudgetPage />;
  if (page === "vendors") return <VendorsPage />;
  if (page === "dept") return <DepartmentPage onDrill={onDrill} onNavigate={onNavigate} />;
  if (page === "contracts") return <ContractsPage />;
  if (page === "admin") return <AdminPage feeds={feeds} onRetry={onRetry} viewRole={viewRole} actor={workspace.actor} tour={tour} />;
  if (page === "public") return <PublicBudgetPage tour={tour} />;
  if (page === "report") return <ReportPage viewRole={viewRole} tour={tour} />;
  return <OverviewPage onNavigate={onNavigate} onDrill={onDrill} canOpenContracts={viewRole === "finance" || viewRole === "auditor"} />;
}

// What a TourSpot needs to know. The advance callback rides along so a target
// site passes one prop instead of three.
type TourState = {
  step: TourStep;
  index: number;
  total: number;
  advance: () => void;
};

// Wraps a tour target. When this spot is the active step it rings the target and
// opens an anchored bubble; otherwise it is an inert wrapper. Radix measures the
// trigger and writes the transform inside components/ui/tooltip.tsx, the one
// file allowed to emit inline styles, so nothing here computes a position.
//
// The wrapper element is always rendered, active or not. Swapping the tree shape
// between states would remount the target and lose whatever it was holding.
// The bubble keeps clear of the bottom of the screen, where the walkthrough
// control bar is fixed: a bubble laid over Next hides the way forward.
const TOUR_BUBBLE_PADDING = { top: 16, right: 16, bottom: 96, left: 16 };

function TourSpot({
  tour,
  id,
  side = "bottom",
  surface = "panel",
  className,
  children,
}: {
  tour: TourState | null;
  id: string;
  side?: "top" | "right" | "bottom" | "left";
  surface?: "panel" | "page";
  className?: string;
  children: React.ReactNode;
}) {
  const active = tour !== null && tour.step.target === id;
  // Bring the target on screen when its step begins. On a phone most targets
  // sit below the fold, and a step that points at something the viewer cannot
  // see reads as a walkthrough that has stalled. The marker is an empty span so
  // the trigger keeps the ref Radix gives it; the wait lets the page's own
  // scroll-to-top on navigation finish first, or it would undo this.
  const markerRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(() => {
      markerRef.current?.parentElement?.scrollIntoView({
        behavior: "smooth",
        // On a wide screen a sidebar item is already in view inside its own
        // scrolling column, so it moves as little as it can. Everywhere else:
        // a whole card starts near its top, with room left above for the
        // bubble, and anything smaller is centred, clear of the control bar.
        block: id.startsWith("nav:") && window.innerWidth >= 1024 ? "nearest" : surface === "page" ? "start" : "center",
      });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [active, id, surface]);
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={active}>
        <TooltipTrigger asChild>
          {/* A div, not a span: most targets are block content (cards, table
              cards, rows), and a span may not contain them.
              Capture phase, so the step advances before the target's own handler
              navigates away and unmounts this spot. */}
          <div
            onClickCapture={active && tour.step.kind === "click" ? tour.advance : undefined}
            className={cn(
              "block rounded-lg",
              // z-40 lifts the target above the z-30 scrim. This works because
              // neither the root shell nor <main> sets a z-index, so neither
              // opens a stacking context and this element is compared against
              // the scrim directly. The sidebar is the exception: it is z-20
              // and does open one, so nav steps raise the whole aside instead.
              //
              // Raising it is only half the job. A ghost button, a bare row and
              // a paragraph all have no background of their own, so the scrim
              // stays visible straight through them and the highlight still
              // reads as dimmed. The spot paints the surface it sits on: panel
              // for anything inside a card or the sidebar, page for a target
              // that is itself a card sitting on the page background.
              active && "relative z-40 ring-2 ring-gold-800 ring-offset-2 ring-offset-background",
              active && (surface === "page" ? "bg-background" : "bg-cream-50"),
              // How far below the top edge a card stops when it is scrolled to
              // its start: enough for the bubble to sit above it.
              surface === "page" ? "scroll-mt-56" : "scroll-mt-20",
              className,
            )}
          >
            <span ref={markerRef} aria-hidden="true" className="hidden" />
            {children}
          </div>
        </TooltipTrigger>
        {active ? (
          <TooltipContent side={side} align="center" collisionPadding={TOUR_BUBBLE_PADDING} className="max-w-xs rounded-lg border-blue-900/15 bg-cream-50">
            <p className="captions text-slate-500">Step {tour.index + 1} of {tour.total}</p>
            <p className="mt-1 body-sm font-semibold text-blue-900">{tour.step.title}</p>
            <p className="mt-1 body-xs text-slate-500">{tour.step.body}</p>
            {/* A look step points at something that has already happened, so it
                has nothing to click and the viewer can be left wondering what
                ends this. Say where the control is. */}
            <p className="mt-2 body-xs font-medium text-gold-800">
              {tour.step.kind === "click"
                ? "Click the highlighted control to continue."
                : tour.index + 1 === tour.total
                  ? "Last step. Press Finish below to close the walkthrough."
                  : "Press Next below to continue."}
            </p>
          </TooltipContent>
        ) : null}
      </Tooltip>
    </TooltipProvider>
  );
}

// The welcome screen. Covers the console rather than replacing it, so the
// console keeps its state: reopening this from the sidebar mid-session must not
// throw away triage work, cleared flags or an assembled packet.
// The opening sequence. Beats arrive on a timer rather than on staggered CSS
// delays, because the same timer also decides when the Continue button is
// allowed to exist, and one clock is easier to follow than two.
//
// Every beat is rendered from the start and only its opacity changes. That is
// what makes the fade possible at all: this project does not have
// tailwindcss-animate, so `animate-in` and friends are inert here, and a
// transition needs both of its ends to exist. It also means the lines resolve
// in place instead of the block growing under them, which is what a title card
// should do.
// How long "One of them is you." is left alone before Continue arrives. The
// beat fades in over 1000ms, so anything shorter puts a button on screen while
// the line is still resolving and the two motions compete for the same moment.
// This clears the fade and then holds, so the turn lands, sits, and only then
// hands the viewer something to do.
const CONTINUE_DELAY = 1800;

// A timed reveal is motion, and this one cannot be outrun: the viewer does not
// control the clock. Under prefers-reduced-motion the sequence resolves at once,
// which keeps every word of the copy and drops only the choreography.
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// A media query is an external store, so it is read through the hook built for
// one. Doing this with useState + useEffect means a setState in an effect body,
// which cascades a render and which this repo lints against.
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const query = window.matchMedia(REDUCED_MOTION_QUERY);
      query.addEventListener("change", onStoreChange);
      return () => query.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    // This route is statically exported, so it prerenders with no way to know the
    // viewer's preference. Assume motion is fine and let hydration correct it,
    // which happens well before the first beat is due.
    () => false,
  );
}

function PrologueStory({ onDone }: { onDone: () => void }) {
  const overspendCount = buildWatchList(useBandSettings().settings).length;
  const reducedMotion = usePrefersReducedMotion();
  const [revealed, setRevealed] = useState(0);
  const [settled, setSettled] = useState(false);

  // Under reduced motion every beat is already on screen and Continue is already
  // there; neither timer below ever starts.
  const shown = reducedMotion ? storyBeats.length : revealed;
  const ready = reducedMotion || settled;

  useEffect(() => {
    if (reducedMotion || revealed >= storyBeats.length) return;
    const pause = storyBeats[revealed].pauseBefore ?? (revealed === 0 ? 500 : 1600);
    const timer = window.setTimeout(() => setRevealed((count) => count + 1), pause);
    return () => window.clearTimeout(timer);
  }, [revealed, reducedMotion]);

  // Continue waits out the last beat's fade rather than arriving on top of it.
  useEffect(() => {
    if (reducedMotion || revealed < storyBeats.length) return;
    const timer = window.setTimeout(() => setSettled(true), CONTINUE_DELAY);
    return () => window.clearTimeout(timer);
  }, [revealed, reducedMotion]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-cream-50">
      <div className="relative flex min-h-full flex-col overflow-hidden px-6 py-6 sm:py-8 lg:px-12 lg:py-10">
        {/* The town, before anything is said about it. A scene wash, so it
            sits behind the copy at half strength and multiplies into the
            cream, per the asset bank rules. It arrives with the first beat,
            runs smaller in a short window so it stays clear of the copy, and
            is left off below md, where the copy needs the whole screen. */}
        <BrandRasterImage
          src="/design-assets/bg-scenes-wide/scene-wide-main-street-civic-02.webp"
          alt=""
          width={1984}
          height={936}
          aria-hidden
          priority
          className={cn(
            "pointer-events-none absolute bottom-0 right-0 hidden h-auto w-2/5 [@media(min-height:700px)]:w-1/2 transition-opacity duration-1000 ease-out motion-reduce:transition-none md:block",
            shown > 0 ? "opacity-50" : "opacity-0",
          )}
        />

        {/* Says this is a made-up town before the story starts, so "It is
            March." can stay a flat statement. The label shares the Skip row,
            so it costs the beats no height. */}
        <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
          <p className="captions text-slate-500">Any Town, USA · A sample town</p>
          <Button type="button" variant="ghost" onClick={onDone}>Skip</Button>
        </div>

        {/* Wide, and the beats set tight. These are full sentences, not
            four-word lines, so on a desktop they sit at h2 and only the
            three-word opener takes hero scale: at h1 the other two wrap to
            three lines each and push Continue below the fold, which is the
            one thing an opening sequence cannot do. The column is max-w-6xl
            so the second beat holds one line at h2.

            Both steps up are gated on window height as well as width. A
            wide but short laptop window keeps the smaller size rather than
            losing the button. Below 360px both tones drop a rung for the
            same reason. */}
        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-2 py-4 sm:gap-4 sm:py-6">
          {storyBeats.map((beat, index) => (
            <p
              key={index}
              className={cn(
                "transition-opacity duration-1000 ease-out motion-reduce:transition-none",
                index < shown ? "opacity-100" : "opacity-0",
                beat.tone === "turn"
                  ? "body-sm text-slate-500 min-[360px]:body sm:body-lg lg:body-xl"
                  : "body-xl text-blue-900 min-[360px]:h4 md:h3 xl:[@media(min-height:640px)]:h2",
                beat.tone === "beat" && index === 0 ? "xl:[@media(min-height:700px)]:h1" : null,
              )}
            >
              {beat.emphasis ? (
                <>
                  {beat.text.split(beat.emphasis)[0]}
                  <em className="italic">{beat.emphasis}</em>
                  {beat.text.split(beat.emphasis)[1]}
                </>
              ) : index === OVERSPEND_BEAT ? (
                overspendLine(overspendCount)
              ) : (
                beat.text
              )}
            </p>
          ))}

          <div
            aria-hidden={ready ? undefined : true}
            className={cn("mt-4 transition-opacity duration-700 ease-out motion-reduce:transition-none", ready ? "opacity-100" : "pointer-events-none opacity-0")}
          >
            <Button type="button" tabIndex={ready ? undefined : -1} onClick={onDone}>Continue</Button>
          </div>
        </div>

        {/* The screen makes a large claim in large type. It says what it is on
            the same screen, not on the next one. */}
        <p className="relative body-xs text-slate-500">{SAMPLE_DATA_NOTICE}.</p>
      </div>
    </div>
  );
}

const OTHER_SEATS = ["ap", "it"] as const satisfies readonly ViewRole[];

function PrologueScreen({ onEnter }: { onEnter: (role: ViewRole, withWalkthrough: boolean) => void }) {
  const [storyDone, setStoryDone] = useState(false);
  const [selected, setSelected] = useState<ViewRole | null>(null);
  const hasScript = selected !== null && Boolean(tours[selected]);
  const snapshotDate = DEMO_TODAY.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

  if (!storyDone) return <PrologueStory onDone={() => setStoryDone(true)} />;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-cream-50 px-4 py-8 lg:px-8 lg:py-12">
      <div className="mx-auto grid max-w-3xl gap-6">
        <div>
          <p className="captions text-slate-500">Civic-Chain demonstration console</p>
          <h1 className="mt-2 h3 text-blue-900">Welcome to the Civic-Chain demo</h1>
          <p className="mt-3 body-sm text-slate-500">
            These are the finances of a sample town: Any Town, USA. Every payment, vendor,
            contract and flag in it is made up. The year is frozen at {snapshotDate}, nine months
            into a twelve-month budget year, so you can see what is on track and what is not.
          </p>
          {/* The opening already delivered the situation, so this does not
              repeat it. It still has to stand on its own, because Skip lands a
              viewer here having seen none of it. */}
          <p className="mt-2 body-sm text-slate-500">
            Finance, the Select Board, an outside auditor and the public all work from the same numbers,
            and each of them uses those numbers differently. Pick the role closest to yours.
          </p>
        </div>

        <div>
          <p className="body-sm font-semibold text-blue-900">Which of these is closest to you?</p>
          <div className="mt-3 grid gap-2">
            {prologueRoles.map((entry) => {
              const active = selected === entry.role;
              return (
                <Button
                  key={entry.role}
                  type="button"
                  variant={active ? "soft" : "ghost"}
                  size="md"
                  aria-pressed={active}
                  onClick={() => setSelected(entry.role)}
                  className={cn(
                    "h-auto w-full flex-col items-start justify-start gap-1 whitespace-normal rounded-lg border border-blue-900/10 px-4 py-3 text-left",
                    active && "border-gold-800/40",
                  )}
                >
                  <span className="flex items-center gap-2 body-sm font-semibold text-blue-900">
                    <Icon name={entry.icon} size="xs" />
                    {entry.title}
                  </span>
                  <span className="body-xs text-slate-500">{entry.blurb}</span>
                </Button>
              );
            })}
          </div>
          {/* The two seats that work in the console every day but do not buy
              it. They get a line, not a card: reachable from the first screen
              without competing with the five roles the page is pitched at. */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="body-xs text-slate-500">Other seats:</span>
            {OTHER_SEATS.map((role) => (
              <Button
                key={role}
                type="button"
                variant={selected === role ? "soft" : "ghost"}
                size="sm"
                aria-pressed={selected === role}
                onClick={() => setSelected(role)}
              >
                {roleViews[role].label}
              </Button>
            ))}
          </div>
        </div>

        {/* Say what it costs. People commit to a bounded thing, and knowing
            the end is three steps away is most of what defuses the fear of
            being trapped in a product tour.

            The primary keeps its variant for the whole screen and only its
            label changes. It used to flip filled -> ghost on the first
            selection, and because Button transitions background-color and
            box-shadow, that read as a flash: a solid navy surface fading out
            from under a label that had already swapped, while the button
            itself jumped across the row. The secondary is now its own element,
            so it mounts already ghost instead of being morphed out of the
            primary, and the cost line holds a row of its own so neither button
            moves when it appears. */}
        <div className="grid gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              type="button"
              disabled={selected === null}
              onClick={() => { if (selected) onEnter(selected, hasScript); }}
              className="w-full sm:w-auto"
            >
              {hasScript ? "Start the walkthrough" : "Enter as this role"}
            </Button>
            {hasScript ? (
              <Button
                type="button"
                variant="ghost"
                onClick={() => { if (selected) onEnter(selected, false); }}
                className="w-full sm:w-auto"
              >
                Skip, let me explore
              </Button>
            ) : null}
          </div>
          <p className="body-xs text-slate-500" aria-live="polite">
            {selected === null
              ? "Choose a role to continue."
              : hasScript
                ? `${tours[selected]?.steps.length} steps, under a minute. You can leave at any point.`
                : "You will land straight in the console."}
          </p>
        </div>

        <p className="body-xs text-slate-500">{SAMPLE_DATA_NOTICE}.</p>
      </div>
    </div>
  );
}

export function DemoConsole({ initialState }: { initialState?: DemoQueryState } = {}) {
  // Presenter mode is decided by whether a route handed in a starting screen.
  // /civic-chain-demo/live and /present do; the public route does not and the
  // console runs itself exactly as before.
  const presenting = initialState !== undefined;
  const overlay = useDemoOverlay();
  // A cold visitor should land on three plain numbers and a paragraph of
  // English, not on the twelve-tile analyst console. A presenter lands wherever
  // the timeline's first beat says.
  const [page, setPage] = useState<PageKey>(initialState?.screen ?? "board");
  const [navOpen, setNavOpen] = useState(false);
  // A timeline addresses any section it likes, so a presentation runs as the
  // one role that can see all of them. Opening as Town Manager would let a beat
  // navigate to a page the role gate then refuses to render.
  const [viewRole, setViewRole] = useState<ViewRole>(presenting ? "finance" : "manager");
  const [feeds, setFeeds] = useState<Feed[]>(() => feedSeed.map((feed) => ({ ...feed })));
  const [ledgerFilter, setLedgerFilter] = useState<LedgerFilter>({ query: "", month: "", flaggedOnly: false });
  const [bandSettings, setBandSettings] = useState<BandSettings>(DEFAULT_BAND_SETTINGS);
  const bandContext = useMemo(() => ({ settings: bandSettings, setSettings: setBandSettings }), [bandSettings]);
  const [verifyTx, setVerifyTx] = useState("");
  // Set only by a presenter beat that demonstrates tampering on a live row.
  const [verifyTamper, setVerifyTamper] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  // The prologue shows on every load. That is a decision, not an oversight: no
  // storage means no hydration guard, and a fresh tab before a call always
  // opens on the framing rather than on somebody else's dashboard. It is skipped
  // under the director, where a "pick who you are" card would sit on top of the
  // first beat waiting for a click nobody is there to give.
  const [showPrologue, setShowPrologue] = useState(!presenting);
  const [tourRole, setTourRole] = useState<ViewRole | null>(null);
  const [tourIndex, setTourIndex] = useState(0);
  // Which role's walkthrough just ended, not merely that one did: the closing
  // card names what that particular viewer saw.
  const [finishedRole, setFinishedRole] = useState<ViewRole | null>(null);
  const [nudgeFinish, setNudgeFinish] = useState(false);

  // The walkthrough quotes counts and names off the watch list, so it is built
  // from the thresholds in force now rather than the ones the file ships with.
  const liveTours = useMemo(() => buildTours(buildWatchList(bandSettings)), [bandSettings]);
  const tourScript = tourRole ? liveTours[tourRole]?.steps ?? null : null;
  const tourStep = tourScript && tourIndex < tourScript.length ? tourScript[tourIndex] : null;
  const onFinalLookStep =
    tourScript !== null && tourStep !== null && tourStep.kind === "look" && tourIndex + 1 === tourScript.length;
  // The viewer is free to click away mid-step, so the step's target can simply
  // not be on screen. Without this they are left with a step counter, no
  // highlight, and no way back to what it was pointing at.
  const strayedFromStep = tourStep?.page !== undefined && tourStep.page !== page;
  const finishedOutro = finishedRole ? liveTours[finishedRole]?.outro ?? null : null;
  const tour: TourState | null =
    tourScript && tourStep
      ? { step: tourStep, index: tourIndex, total: tourScript.length, advance: advanceTour }
      : null;

  // A nav step highlights a sidebar item, which on a phone sits behind the
  // hamburger. Opening it is a no-op on desktop, where the sidebar renders
  // regardless of this flag. Done on the transition rather than in an effect,
  // because every transition is already an event.
  function revealNavFor(step: TourStep | undefined) {
    if (step?.target.startsWith("nav:")) setNavOpen(true);
  }

  function advanceTour() {
    if (!tourScript) return;
    const nextIndex = tourIndex + 1;
    setNudgeFinish(false);
    if (nextIndex >= tourScript.length) {
      setFinishedRole(tourRole);
      setTourRole(null);
      setTourIndex(0);
      return;
    }
    setTourIndex(nextIndex);
    revealNavFor(tourScript[nextIndex]);
  }

  // One move backwards serves two purposes. It is the plain Back control, and
  // it is also the way out of having strayed off a look step: a look step
  // points at something the step before it produced, and leaving the page
  // destroys that, so the honest return is to the step that made it.
  function stepBack() {
    if (!tourScript) return;
    const previousIndex = Math.max(0, tourIndex - 1);
    const previous = tourScript[previousIndex];
    setTourIndex(previousIndex);
    setNudgeFinish(false);
    revealNavFor(previous);
    if (previous.page) goToPage(previous.page);
  }

  function returnToStep() {
    if (!tourStep) return;
    // A click step's target is just sitting on its page, so go straight there.
    // A look step's target had to be produced, so rewind and produce it again.
    if (tourStep.kind === "click") {
      if (tourStep.page) goToPage(tourStep.page);
      return;
    }
    stepBack();
  }

  function endTour() {
    setTourRole(null);
    setTourIndex(0);
    setNudgeFinish(false);
  }

  function replayTour() {
    const script = liveTours[viewRole]?.steps;
    if (!script) return;
    goToPage(roleViews[viewRole].home);
    setFinishedRole(null);
    setTourIndex(0);
    setNudgeFinish(false);
    setTourRole(viewRole);
    revealNavFor(script[0]);
  }

  function enterFromPrologue(role: ViewRole, withWalkthrough: boolean) {
    setViewRole(role);
    setPage(roleViews[role].home);
    setLedgerFilter({ query: "", month: "", flaggedOnly: false });
    setVerifyTx("");
    setShowPrologue(false);
    setFinishedRole(null);
    setTourIndex(0);
    setNudgeFinish(false);
    const script = withWalkthrough ? liveTours[role]?.steps : undefined;
    setTourRole(script ? role : null);
    revealNavFor(script?.[0]);
  }

  // The shared workspace. See the Workspace type for why this is not per-page.
  const [rows, setRows] = useState<Transaction[]>(() => allPayments.map((transaction) => ({ ...transaction })));
  const [flags, setFlags] = useState<Record<string, TriageState>>({});
  const [attachments, setAttachments] = useState<Record<string, string>>({});
  const [clearedEnc, setClearedEnc] = useState<Record<string, boolean>>({});
  const [txLog, setTxLog] = useState<({ id: string } & TriageLogEntry)[]>([]);

  // Reset the scroll position to the top whenever the active page changes, so a
  // new tab always starts at its header instead of wherever the last page sat.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  // The mobile nav is a plain disclosure, not a Radix dialog, so Escape does
  // not close it for free. Without this a keyboard user has to tab back through
  // every nav item to reach the close button.
  useEffect(() => {
    if (!navOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navOpen]);

  // The Finish button waits five seconds before it starts bouncing. The bubble
  // has just appeared and is being read; a control moving in the corner of the
  // eye at that moment competes with it. The nudge is for the viewer who has
  // finished reading and has not worked out what ends this.
  useEffect(() => {
    if (!onFinalLookStep) return;
    const timer = window.setTimeout(() => setNudgeFinish(true), 5000);
    return () => window.clearTimeout(timer);
  }, [onFinalLookStep]);

  // Escape leaves the walkthrough and Enter takes a look step forward, so it
  // can be driven live without reaching for the mouse. Both stand down while
  // the focus is in a control, where those keys already mean something.
  useEffect(() => {
    if (!tourStep) return;
    const onKeyDown = (event: KeyboardEvent) => {
      // Not every keydown target is an element: a key pressed with nothing
      // focused can arrive with the document as its target, which has no
      // closest() and would throw here.
      const target = event.target;
      if (target instanceof Element && target.closest("input, textarea, select, button, a, [contenteditable='true']")) return;
      if (event.key === "Escape") {
        event.preventDefault();
        endTour();
      }
      if (event.key === "Enter" && tourStep.kind === "look") {
        event.preventDefault();
        advanceTour();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });


  const actor = roleActor[viewRole];

  function record(id: string, action: string) {
    setTxLog((previous) => [...previous, { id, actor, action, at: triageStamp() }]);
    setAnnouncement(action);
  }

  function updateFlag(id: string, change: (previous: TriageState) => TriageState) {
    setFlags((previous) => ({
      ...previous,
      [id]: change(previous[id] ?? { status: "open", assignee: null, log: [] }),
    }));
  }

  // Rows a LEDGER_APPEND beat injected sit on top of the editable copy, so a
  // payment that lands mid-presentation shows in the ledger without the
  // workspace having to know a presentation is running. They are prepended, so
  // the new row is the first thing on screen.
  const workspaceRows = useMemo(() => [...overlay.extraLedgerRows, ...rows], [overlay.extraLedgerRows, rows]);

  const workspace: Workspace = {
    rows: workspaceRows,
    flags,
    attachments,
    clearedEnc,
    txLog,
    actor,
    canWrite: canWriteRoles.includes(viewRole),
    recode(id, category) {
      setRows((previous) => previous.map((row) => (row.id === id ? { ...row, category } : row)));
      record(id, `Recoded to ${category}`);
    },
    attach(id, reference) {
      setAttachments((previous) => ({ ...previous, [id]: reference }));
      record(id, `Attached invoice ${reference}`);
    },
    removeAttachment(id) {
      setAttachments((previous) => {
        const next = { ...previous };
        delete next[id];
        return next;
      });
      record(id, "Removed the attached invoice");
    },
    clearEncumbrance(id) {
      setClearedEnc((previous) => ({ ...previous, [id]: true }));
      record(id, "Cleared the open encumbrance");
    },
    resolveFlag(id, reason) {
      updateFlag(id, (previous) => ({
        ...previous,
        status: "resolved",
        log: [...previous.log, { actor, action: `Resolved: ${reason}`, at: triageStamp() }],
      }));
      record(id, `Resolved the flag: ${reason}`);
    },
    assignFlag(id, assignee) {
      updateFlag(id, (previous) => ({
        ...previous,
        status: "assigned",
        assignee,
        log: [...previous.log, { actor, action: `Assigned to ${assignee}`, at: triageStamp() }],
      }));
      record(id, `Assigned to ${assignee}`);
    },
    noteFlag(id, note) {
      updateFlag(id, (previous) => ({
        ...previous,
        log: [...previous.log, { actor, action: `Note: ${note}`, at: triageStamp() }],
      }));
      record(id, `Added a note: ${note}`);
    },
    reopenFlag(id) {
      updateFlag(id, (previous) => ({
        ...previous,
        status: "open",
        assignee: null,
        log: [...previous.log, { actor, action: "Reopened", at: triageStamp() }],
      }));
      record(id, "Reopened the flag");
    },
  };

  function drillToLedger(next: Partial<LedgerFilter>) {
    setLedgerFilter({ query: "", month: "", flaggedOnly: false, ...next });
    setPage("ledger");
  }

  function verifyRecord(txId: string) {
    setVerifyTamper(false);
    setVerifyTx(txId);
    setPage("verify");
  }

  // Navigating by the sidebar clears every transient filter. A drill-through
  // filter that survived a nav click once left the public view showing 5 of 66
  // records with no indication why.
  function goToPage(key: PageKey) {
    setLedgerFilter({ query: "", month: "", flaggedOnly: false });
    setVerifyTx("");
    setVerifyTamper(false);
    setPage(key);
  }

  // Feed health is an operator's concern, not a reader's. It is reported in
  // Administration > Data Connections, where someone can actually act on it,
  // rather than in a console-wide alert that told every visitor their figures
  // might be wrong without telling them what to do about it.
  function retryFeed(name: string) {
    setFeeds((prev) => prev.map((feed) => (feed.name === name ? { ...feed, status: "Syncing" } : feed)));
    setAnnouncement(`Reconnecting the ${name} feed`);
    window.setTimeout(() => {
      setFeeds((prev) => prev.map((feed) => (feed.name === name ? { ...feed, status: "Connected", lastSync: "2026-03-31 09:15", records: 12 } : feed)));
      setAnnouncement(`${name} feed reconnected`);
    }, 1200);
  }

  // The director drives navigation by pushing a section into the overlay, and
  // the console mirrors it rather than owning it. An off-script click during a
  // presentation still works, because this only fires when the director's own
  // value changes; the next beat simply takes the wheel back.
  //
  // Adjusted during render rather than in an effect. React re-runs the render
  // before committing, so the console never paints the old page for a frame,
  // and it avoids the cascading-render an effect-plus-setState would cost.
  const [directedScreen, setDirectedScreen] = useState<PageKey | null>(null);
  if (overlay.presenterScreen && overlay.presenterScreen !== directedScreen) {
    setDirectedScreen(overlay.presenterScreen);
    setPage(overlay.presenterScreen);
  }

  // A VERIFY_RUN or TAMPER_RUN beat names the payment it wants traced, and the
  // verification screen reads that id the same way a hand-typed one arrives.
  const [directedVerify, setDirectedVerify] = useState<string | null>(null);
  //
  // The beat has to open the verification screen as well. It used to set the
  // id and leave the page alone, so the caption announced "VERIFIED" over the
  // payment list and the check itself was never on screen. The key carries the
  // tamper flag because a TAMPER_RUN re-runs the same id it just verified.
  const directedVerifyKey = overlay.pendingVerify ? `${overlay.pendingVerify.txId}:${overlay.pendingVerify.tamper}` : null;
  if (overlay.pendingVerify && directedVerifyKey !== directedVerify) {
    setDirectedVerify(directedVerifyKey);
    setVerifyTx(overlay.pendingVerify.txId);
    setVerifyTamper(overlay.pendingVerify.tamper);
    setPage("verify");
  }

  const allowedPages = roleViews[viewRole].pages;
  const canSee = (key: PageKey) => allowedPages === "all" || allowedPages.includes(key);
  const visibleGroups = navGroups.filter((groupItem) => pages.some((item) => item.group === groupItem.id && canSee(item.key)));

  function changeRole(next: ViewRole) {
    setViewRole(next);
    const nextPages = roleViews[next].pages;
    if (!(nextPages === "all" || nextPages.includes(page))) setPage(roleViews[next].home);
  }

  return (
    <BandContext.Provider value={bandContext}>
    {/* Hidden, not unmounted. Reopening the prologue from the sidebar must not
        discard triage work, cleared flags or an assembled packet. */}
    <div className={cn("relative min-h-screen text-blue-900", showPrologue ? "hidden" : "lg:flex")}>
      <div
        aria-hidden="true"
        data-site-background="grid"
        className="landing-grid-overlay pointer-events-none absolute inset-0"
      />
      {/* The sidebar is a stacking context of its own (sticky always makes one,
          z-index or not), so the page scrim cannot reach inside it and a raised
          nav item cannot escape it. During a nav step the whole aside comes up
          above the page scrim and gets a scrim of its own instead, so the one
          highlighted item stays lit while the rest of the sidebar dims with the
          page. During any other step the aside sits at z-20 and the page scrim
          covers it whole. */}
      <aside className={cn(
        "sticky top-0 z-20 border-b border-blue-900/10 bg-cream-50 p-3 print:hidden lg:h-screen lg:w-64 lg:shrink-0 lg:overflow-y-auto lg:border-b-0 lg:border-r lg:p-4 scrollbar-none",
        tour?.step.target.startsWith("nav:") && "z-40",
      )}>
        {/* The scrim hangs off this wrapper rather than off the aside, because
            the aside scrolls: an inset-0 child of a scroll container covers
            only the visible box and scrolls away with the content. The wrapper
            is in normal flow so it is exactly as tall as the sidebar content,
            min-h-full covers the case where the content is shorter than the
            screen, and the negative inset reaches back over the aside padding
            the wrapper sits inside. */}
        <div className="relative min-h-full">
        {tour?.step.target.startsWith("nav:") ? (
          <div aria-hidden="true" className="pointer-events-none absolute -inset-3 z-30 bg-blue-900/30 lg:-inset-4" />
        ) : null}
        <div className="relative flex min-w-0 items-center justify-between gap-3 lg:block">
          <Button
            asChild
            variant="filled"
            size="sm"
            tone="cream"
            className="z-10 px-3 lg:-ml-2 lg:mb-4 lg:justify-start"
          >
            <Link href="/" aria-label="Back to site">
              <Icon name="arrow-left" size="xs" />
              <span className="lg:hidden">Back</span>
              <span className="hidden lg:inline">Back to site</span>
            </Link>
          </Button>
          <div className="pointer-events-none absolute left-1/2 top-1/2 grid min-w-0 -translate-x-1/2 -translate-y-1/2 justify-items-center text-center lg:pointer-events-auto lg:static lg:translate-x-0 lg:translate-y-0 lg:justify-items-start lg:text-left">
            <Image
              src="/brand/civic-logo-hero.svg"
              alt="Civic-Chain"
              width={387}
              height={162}
              priority
              className="block h-auto w-24 lg:w-40"
            />
            <p className="mt-3 hidden captions text-slate-500 lg:block">{roleSeat[viewRole].console}</p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="md"
            icon={navOpen ? "close" : "menu"}
            aria-label={navOpen ? "Close menu" : "Open menu"}
            aria-expanded={navOpen}
            aria-controls="nav"
            onClick={() => setNavOpen((open) => !open)}
            className="z-10 shrink-0 lg:hidden"
          />
        </div>
        <div className={cn("tenant mt-4 rounded-lg bg-blue-100 p-3", navOpen ? "block" : "hidden", "lg:block")}>
          <div className="body-xs font-semibold text-blue-700">Any Town, USA</div>
          <div className="body-xs text-slate-500">{roleViews[viewRole].label}</div>
        </div>
        <div className={cn("mt-3", navOpen ? "block" : "hidden", "lg:block")}>
          <label htmlFor="view-role" className="px-2 captions text-slate-500">Viewing as</label>
          <Select value={viewRole} onValueChange={(value) => changeRole(value as ViewRole)}>
            <SelectTrigger id="view-role" className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {viewRoleOrder.map((roleKey) => (
                <SelectItem key={roleKey} value={roleKey}>
                  {roleViews[roleKey].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="mt-2 px-2 body-xs text-slate-500">{roleSeat[viewRole].blurb}</p>
          {/* Two different things, so two controls. Replay runs this seat's own
              walkthrough again, which matters after switching seats here; the
              other reopens the welcome screen. Accounts Payable and IT have no
              script, so they get the one-line description above instead. */}
          {tours[viewRole] ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="mt-1 h-auto w-full justify-start whitespace-normal px-2 py-1 text-left"
              onClick={replayTour}
            >
              Show me around this role
            </Button>
          ) : null}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mt-1 h-auto w-full justify-start whitespace-normal px-2 py-1 text-left"
            onClick={() => { endTour(); setShowPrologue(true); }}
          >
            Back to the welcome screen
          </Button>
        </div>
        <nav id="nav" aria-label="Demo pages" className={cn("mt-4 gap-7", navOpen ? "grid" : "hidden", "lg:grid")}>
          {visibleGroups.map((groupItem) => (
            <div key={groupItem.id}>
              <div className="px-2 captions text-slate-500">{groupItem.label}</div>
              <div className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-3 lg:flex lg:flex-col lg:overflow-visible lg:pb-0">
                {pages
                  .filter((item) => item.group === groupItem.id && canSee(item.key))
                  // The walkthrough bubble sits below a nav item rather than
                  // beside it: at 375px the sidebar is the full width of the
                  // screen, so there is no room to its right to flip into.
                  .map((item) => (
                    <TourSpot key={item.key} tour={tour} id={`nav:${item.key}`} className="w-full">
                      <Button
                        type="button"
                        data-page={item.key}
                        aria-current={page === item.key ? "page" : undefined}
                        variant={page === item.key ? "soft" : "ghost"}
                        size="md"
                        icon={item.icon}
                        iconPosition="leading"
                        className="h-auto min-h-10 w-full justify-start whitespace-normal px-3 py-2 text-left"
                        onClick={() => {
                          goToPage(item.key);
                          setNavOpen(false);
                        }}
                      >
                        {item.label}
                      </Button>
                    </TourSpot>
                  ))}
              </div>
            </div>
          ))}
        </nav>
        </div>
      </aside>

      {/* Extra room at the bottom during a walkthrough, so a target on a short
          page can still be scrolled clear of the fixed control bar. */}
      <main className={cn("relative min-w-0 flex-1 px-4 py-5 lg:px-8 lg:py-7", tour && "pb-48 lg:pb-48")}>
        {/* The console had no h1 at all: every page title was an h2, so the
            document had no top-level heading for a screen reader to land on. */}
        <h1 className="sr-only">Civic-Chain demonstration console, Any Town, USA</h1>
        <div className="mb-5 flex items-center gap-2 rounded-lg border border-blue-900/10 bg-blue-100 px-3 py-2 body-xs text-blue-700">
          <span aria-hidden="true">●</span>
          <span>
            Static demo snapshot, Any Town, USA · FY2026 (July to June) · figures as of Mar 2026. {SAMPLE_DATA_NOTICE}.
          </span>
        </div>
        {/* Screen readers get no signal from a silent state change, so every
            workspace action and feed retry is announced here. */}
        <p aria-live="polite" className="sr-only">{announcement}</p>
        <ActivePage page={page} feeds={feeds} onRetry={retryFeed} ledgerFilter={ledgerFilter} verifyTx={verifyTx} verifyTamper={verifyTamper} onDrill={drillToLedger} onVerify={verifyRecord} onNavigate={goToPage} viewRole={viewRole} workspace={workspace} tour={tour} />
      </main>
    </div>

    {showPrologue ? <PrologueScreen onEnter={enterFromPrologue} /> : null}

    {/* Click-through by design. The walkthrough dims the console to point at
        one thing, but it never takes the console away: an off-script click has
        to keep working, and the step simply waits. */}
    {tour ? <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 bg-blue-900/30 print:hidden" /> : null}

    {/* The walkthrough's controls live down here rather than inside the bubble.
        A Radix tooltip is not meant to hold interactive content, and a fixed bar
        also gives the phone a predictable place to find Exit. */}
    {tour ? (
      <div className="fixed bottom-4 left-1/2 z-50 flex max-w-[calc(100vw-2rem)] flex-wrap print:hidden items-center justify-center gap-3 rounded-lg border border-blue-900/15 bg-cream-50 px-3 py-2 shadow-md">
        <span className="body-xs text-slate-500">Step {tour.index + 1} of {tour.total}</span>
        {strayedFromStep ? (
          <>
            <span className="body-xs text-gold-800">You have wandered off this step.</span>
            <Button type="button" variant="soft" size="sm" onClick={returnToStep}>Take me back</Button>
          </>
        ) : null}
        {!strayedFromStep && tour.index > 0 ? (
          <Button type="button" variant="ghost" size="sm" onClick={stepBack}>Back</Button>
        ) : null}
        {!strayedFromStep && tour.step.kind === "look" ? (
          <Button
            type="button"
            variant="soft"
            size="sm"
            onClick={advanceTour}
            // The last step is the one place the walkthrough asks for an action
            // that is not on the highlighted element, so the button says so
            // itself rather than relying on the viewer reading the bubble. The
            // ring lands immediately; the motion is held back (see nudgeFinish).
            className={cn(
              tour.index + 1 === tour.total && "ring-2 ring-gold-800 ring-offset-2 ring-offset-background",
              nudgeFinish && "motion-safe:animate-bounce",
            )}
          >
            {tour.index + 1 === tour.total ? "Finish" : "Next"}
          </Button>
        ) : null}
        <Button type="button" variant="ghost" size="sm" onClick={endTour}>Exit walkthrough</Button>
      </div>
    ) : null}

    <Dialog open={finishedRole !== null} onOpenChange={(open) => { if (!open) setFinishedRole(null); }}>
      <DialogContent className="max-w-lg">
        {finishedOutro ? (
          <>
            <DialogHeader>
              <p className="captions text-slate-500">Walkthrough complete!</p>
              <DialogTitle className="body font-semibold text-blue-900">{finishedOutro.title}</DialogTitle>
            </DialogHeader>
            <p className="body-sm text-slate-500">{finishedOutro.body}</p>
            <p className="mt-3 body-sm text-slate-500">
              The console is yours from here. Every page this role can see is in the sidebar, and the &ldquo;Viewing as&rdquo; switcher
              there re-opens these same records from any other seat: Finance, the Town Manager, Accounts Payable,
              IT, the Select Board, an external auditor or a resident. Nothing you do is saved, and none of the data is real.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button asChild>
                <Link href="/contact">Book a demo</Link>
              </Button>
              {finishedOutro.artifact ? (
                <Button type="button" variant="soft" onClick={finishedOutro.artifact.run}>
                  {finishedOutro.artifact.label}
                </Button>
              ) : null}
              <Button type="button" variant="ghost" onClick={() => setFinishedRole(null)}>Keep exploring</Button>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
    </BandContext.Provider>
  );
}
