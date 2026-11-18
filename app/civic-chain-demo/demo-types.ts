import type { IconName } from "@/components/ui/icon";

export type DemoRoute =
  | "overview"
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
  | "report";

export type PageKey = DemoRoute;
export type NavGroupId = "analytics" | "budget-child" | "records" | "admin" | "hidden";
export type Tone = "spike" | "pending" | "ok" | "anchored" | "info" | "neutral";
export type AdminTab = "governance" | "users" | "conn" | "rules";

export type Transaction = {
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

export type VendorSummary = {
  vendor: string;
  category: string;
  txns: number;
  total: number;
  lastPaid: string;
  anomalies: number;
  anchor: "anchored" | "pending";
};

export type ClosedPeriod = {
  monthKey: string;
  closedAt: string;
  closedBy: string;
  records: number;
  stellarTx: string;
};

export type DemoQueryState = {
  screen: DemoRoute;
  dept?: string;
  flagged?: boolean;
  vendor?: string;
  contract?: string;
  adminTab?: AdminTab;
  budgetYear?: string;
  fromMonth?: number;
  toMonth?: number;
};

export type NavigateDemo = (next: Partial<DemoQueryState>) => void;

export type DemoPageDefinition = {
  key: DemoRoute;
  icon: IconName;
  label: string;
  group: NavGroupId;
};
