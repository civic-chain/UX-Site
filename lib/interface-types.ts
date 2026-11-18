export type InterfaceIconName =
  | "admin"
  | "vendor"
  | "citizen"
  | "overview"
  | "solicitations"
  | "contracts"
  | "cards"
  | "payment"
  | "reports"
  | "settings"
  | "wallet"
  | "calendar"
  | "ledger"
  | "upload"
  | "search"
  | "shield"
  | "map"
  | "task"
  | "clock"
  | "mail"
  | "lock"
  | "data"
  | "vote"
  | "trend"
  | "back"
  | "next"
  | "alert"
  | "check"
  | "location";

type StatusTone = "neutral" | "info" | "success" | "warning" | "danger";

export type StatusBadgeItem = {
  label: string;
  tone?: StatusTone;
};

export type InterfaceNavItem = {
  id: string;
  label: string;
  icon: InterfaceIconName;
  href: string;
  badge?: string;
};

export type DemoCredential = {
  label: string;
  identifierLabel: string;
  identifier: string;
  password: string;
};

export type InterfaceMetric = {
  label: string;
  value: string;
  detail?: string;
  tone?: StatusTone;
};

export type ContractSnapshot = {
  crn: string;
  title: string;
  vendor?: string;
  total: number;
  cardPoolAllocated: number;
  cardPoolBalance: number;
  residual?: number;
  reserve?: number;
  status: string;
  statusTone?: StatusTone;
  sarHash?: string;
  lastTransaction?: string;
  burnRate?: string;
};

export type TableColumn = {
  key: string;
  label: string;
  align?: "left" | "right";
};

export type TableRow = {
  id: string;
  [key: string]: string | number | undefined;
};

export type CardTransaction = {
  id: string;
  merchant: string;
  context: string;
  amount: string;
  status: string;
  statusTone?: StatusTone;
};

export type LedgerTransaction = {
  id: string;
  hash: string;
  crn: string;
  type: string;
  amount: string;
  timestamp: string;
};

export type VoteProposal = {
  id: string;
  label: string;
  bid: string;
  timeline: string;
  personnel: string;
  equipment: string;
  notes: string;
};

export type PaymentCard = {
  id: string;
  tier: string;
  name: string;
  suffix: string;
  available: string;
  dailyLimit: string;
  lastTransaction: string;
  merchant: string;
  locks: string[];
};
