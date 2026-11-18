import type { IconName } from "@/components/ui/icon";
import type { SurfaceMaterial, SurfaceTone } from "@/lib/design-system-types";

export const intro =
  "Civic-Chain handles public money, so towns ask hard questions about security, data handling, and who is allowed to spend. This is where we answer them in one place, in plain language, with the documents a procurement review needs. Where a claim is still in progress, we say so.";

export const contactEmail = "info@civic-chain.com";

type RailCard = {
  id: string;
  eyebrow: string;
  title: string;
  tone: SurfaceTone;
  material: SurfaceMaterial;
  icon: IconName;
  iconTone: "gold" | "sky";
  paragraphs: readonly string[];
};

export const railIntro = {
  eyebrow: "How it is built",
  title: "Two rails, kept separate",
  lede: "Public money moves on one rail. The public record moves on another. They meet only at a single public ledger relay, and they meet only as records.",
};

export const rails: readonly RailCard[] = [
  {
    id: "money-rail",
    eyebrow: "Rail one",
    title: "The money rail",
    tone: "gold",
    material: "banknote",
    icon: "bank",
    iconTone: "gold",
    paragraphs: [
      "Dollars move through our licensed payment partners and settle into a vendor's bank account. Civic-Chain is software that orchestrates those movements. It is not a bank, and it does not take custody of a town's funds.",
      "Float that waits between funding and spending earns yield. That yield is disclosed, with a per-municipality pass-through being enabled, so the return can accrue to the town whose money it is.",
    ],
  },
  {
    id: "record-rail",
    eyebrow: "Rail two",
    title: "The record rail",
    tone: "sky",
    material: "blueprint",
    icon: "record",
    iconTone: "sky",
    paragraphs: [
      "Approvals, notices, and filings move as records, and no money moves with them. The two rails meet only at a single public ledger relay, and they meet only as records.",
      "Not one cent of a town's money moves on-chain. The relay anchors proof that a decision happened, nothing more.",
    ],
  },
];

export const ledger = {
  eyebrow: "On the ledger",
  title: "What goes on the public ledger, and what stays sealed",
  lede: "A confirmed write carries just enough to prove a record, and nothing that could expose a person or an account. The ledger is chain-agnostic, we say public ledger, we do not tie a town to one network.",
  anchored: {
    label: "Anchored on-chain",
    status: "anchored" as const,
    items: [
      "A cryptographic hash of the record",
      "A budget or warrant code",
      "The amount",
      "The hash of the record before it",
    ],
  },
  sealed: {
    label: "Sealed off-chain",
    status: "redacted" as const,
    items: [
      "Payee names",
      "Bank account numbers",
      "Transaction memos",
      "Any personal detail of a resident or vendor",
    ],
  },
};

type PostureCard = {
  id: string;
  icon: IconName;
  title: string;
  badge: string;
  body: string;
};

export const postureIntro = {
  eyebrow: "Where we stand",
  title: "Our posture, stated honestly",
  lede: "Four questions every review asks. Here is the current answer, including what is still in progress.",
};

export const posture: readonly PostureCard[] = [
  {
    id: "soc2",
    icon: "trust",
    title: "SOC 2",
    badge: "Readiness, not certified",
    body: "We run a SOC 2 readiness program against the Trust Services Criteria. We have no SOC 2 report yet, and we will not imply one exists. When a report is issued, it will be available to reviewers under NDA.",
  },
  {
    id: "regulatory",
    icon: "bank",
    title: "Regulatory status",
    badge: "Software, not a bank",
    body: "Civic-Chain is procurement and payment-orchestration software. Money settles through licensed partners. We make no money-transmitter-license claims. Counsel's regulatory memo is available to reviewers on request.",
  },
  {
    id: "data-handling",
    icon: "layers",
    title: "Data handling",
    badge: "Current list published",
    body: "Our subprocessor list names every vendor that can touch covered data, and it is kept current. Covered data is processed under our Data Processing Addendum.",
  },
  {
    id: "availability",
    icon: "flash",
    title: "Availability",
    badge: "Targets and credits defined",
    body: "We define uptime targets and service credits in our Service Level Agreement, and summarize them here. The full agreement is available to reviewers on request.",
  },
];

type LibraryItem = {
  id: string;
  title: string;
  description: string;
  availability: "On request" | "Under NDA";
};

export const libraryIntro = {
  eyebrow: "Document library",
  title: "The review packet",
  lede: "Everything a town's legal and procurement teams need, in one send. Items marked under NDA are released after a short click-through.",
};

export const library: readonly LibraryItem[] = [
  {
    id: "security",
    title: "Security overview",
    description: "Our information-security program: access control, encryption, logging, and incident response, written to be shared.",
    availability: "On request",
  },
  {
    id: "subprocessors",
    title: "Subprocessor list",
    description: "Every vendor that can touch covered data, what they do, and where. Kept current.",
    availability: "On request",
  },
  {
    id: "sla",
    title: "Service Level Agreement",
    description: "Uptime targets, maintenance windows, and the service credits that apply when we miss them.",
    availability: "On request",
  },
  {
    id: "regulatory-memo",
    title: "Regulatory status memo",
    description: "Counsel's analysis of the software-not-a-bank posture and the flow of funds through licensed partners.",
    availability: "Under NDA",
  },
  {
    id: "procurement",
    title: "Procurement and cooperative purchasing",
    description: "Cooperative purchasing vehicles and the contract paths a town can use to buy without a fresh solicitation.",
    availability: "On request",
  },
  {
    id: "legal",
    title: "Privacy Policy and Terms of Service",
    description: "How we handle data and the terms that govern the service. Reconciled to the current architecture.",
    availability: "On request",
  },
];

export const requestCta = {
  title: "Request the review packet",
  body: "Tell us the town and the review you are running, and we will send the security, legal, and procurement documents you need, under NDA where required.",
};
