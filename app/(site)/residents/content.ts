import type { AudienceContent } from "@/app/(site)/_audience/audience-page";

// Copy for /residents. Claim boundary: the public record (contracts, vendors,
// approved payments, receipt codes anyone can check) ships today. Roadmap-only
// features (the live per-purchase feed, resident feedback) are left off this
// page entirely so nothing reads as available before it ships.
export const residentsContent = {
  slug: "residents",
  badge: { label: "For residents", icon: "citizen" },
  title: "See where your town's money goes",
  lede: "When your town uses Civic-Chain, its contracts and payments go on a public [[ledger|ledger]] that anyone can open. No request to file, no login, no call to town hall.",
  art: {
    src: "/design-assets/scenes-colored/colored-random-public-procurement-record-board.webp",
    alt: "Residents reading a public record board outside town hall.",
  },
  benefits: {
    title: "What you can see",
    items: [
      {
        icon: "bids",
        tone: "cream",
        chipTone: "gold",
        title: "Who was hired",
        body: "The contracts your town signed, the companies doing the work, and what each job costs.",
      },
      {
        icon: "paid",
        tone: "sky",
        chipTone: "sky",
        title: "Where the money went",
        body: "Payments go on the record when the town approves them, not months later in a year-end report.",
      },
      {
        icon: "trust",
        tone: "sage",
        chipTone: "sage",
        title: "Proof you can check",
        body: "Each record has a receipt code you can look up on an independent public site. Once written, it can't be changed.",
      },
    ],
  },
  steps: {
    title: "How it works for you",
    items: [
      {
        title: "The town signs a contract",
        body: "It picks a company for the job, and the contract goes on the public record.",
      },
      {
        title: "Payments are recorded",
        body: "Each approved payment is added with its date and amount.",
      },
      {
        title: "You open the record",
        body: "Use any phone or computer. No account, no form, no waiting.",
      },
      {
        title: "You check any entry",
        body: "Look up a record's receipt code yourself. No need to take anyone's word for it.",
      },
    ],
  },
  faq: [
    {
      question: "Do I need an account?",
      answer: "No. The public record is open to anyone. There's nothing to sign up for and nothing to download.",
    },
    {
      question: "Does it cost anything?",
      answer: "No. Looking at the public record is free.",
    },
    {
      question: "Can a record be changed later?",
      answer: "No. Once a record is written, it can't be edited or deleted. Its receipt code lets you confirm that yourself.",
    },
    {
      question: "Does my town use Civic-Chain?",
      answer: "Civic-Chain is launching town by town. If yours isn't on it yet, tell your town manager or select board you'd like it, or send us a note.",
    },
  ],
  cta: {
    title: "Want this in your town?",
    body: "Tell us where you live and we'll follow up. You can also ask your town manager or select board about Civic-Chain.",
    href: "/contact?from=residents",
  },
} as const satisfies AudienceContent;
