import type { AudienceContent } from "@/app/(site)/_audience/audience-page";

// Copy for /vendors. Claim boundary: contract status on a shared record, the
// completion report, and town-approved payment ship today. The contract card
// is not confirmed for launch, so it is always "can" (Nick's call, matching
// the hero line). Payments still wait on the town board's sign-off: never
// promise instant payment or a way around the board.
export const vendorsContent = {
  slug: "vendors",
  badge: { label: "For vendors", icon: "vendor" },
  title: "Get paid without the chase",
  lede: "Card-funded work can begin the same day the contract is awarded, not a month later. And you can see where your contract and payment stand at every step.",
  art: {
    src: "/design-assets/scenes-colored/colored-random-hardhat-tablet-blueprints.webp",
    alt: "A hard hat, a tablet, and rolled-up job plans.",
  },
  benefits: {
    title: "What changes for you",
    items: [
      {
        icon: "card",
        tone: "cream",
        chipTone: "gold",
        title: "Money to start the job",
        body: "Approved costs like fuel, equipment rental, and supplies can go on a contract card instead of coming out of your pocket.",
      },
      {
        icon: "workStatus",
        tone: "sky",
        chipTone: "sky",
        title: "Always know where you stand",
        body: "Your contract, approvals, and payment status sit on one shared record. No more calling town hall to ask.",
      },
      {
        icon: "paid",
        tone: "sage",
        chipTone: "sage",
        title: "Paid once the work is approved",
        body: "No chasing paperwork or calling around. When the town approves the finished work, your final payment is released.",
      },
    ],
  },
  steps: {
    title: "How it works for you",
    items: [
      {
        title: "Win the contract",
        body: "The town posts the job, picks a company, and puts the award on the public record.",
      },
      {
        title: "Start the work",
        body: "Money for approved costs can be loaded onto a contract card, so you don't have to front it.",
      },
      {
        title: "Report it finished",
        body: "When the job is done, report it in Civic-Chain. The town sees it right away.",
      },
      {
        title: "Get paid",
        body: "After the town signs off, your final payment goes out and is added to the record.",
      },
    ],
  },
  comingNext: {
    body: "These aren't available yet. We'll add them to this page when they are.",
    items: [
      {
        icon: "card",
        title: "Cards for your crew and trucks",
        body: "A card for each worker or vehicle, each with its own limit, all drawing from the same contract.",
      },
      {
        icon: "note",
        title: "One simple bid form",
        body: "Every bid uses the same form, so towns can compare proposals side by side.",
      },
    ],
  },
  faq: [
    {
      question: "Does this go around the town board?",
      answer: "No. Your town's normal approvals still apply, including the board's sign-off on payments. Civic-Chain makes each step quicker to finish and easy to see.",
    },
    {
      question: "What can I buy with the contract card?",
      answer: "Only costs that fit the job, like fuel, equipment rental, and building supplies. The town sets what's allowed for each contract, and the card is designed to decline anything else.",
    },
    {
      question: "Will my business details be public?",
      answer: "Your company name, the contract amount, and the payments on it are public, the same as public contracts already are.",
    },
    {
      question: "How do I get started?",
      answer: "The town you work for needs to use Civic-Chain first. If it doesn't yet, let them know, or send us a note and we'll follow up.",
    },
  ],
  faqStartOpen: false,
  cta: {
    title: "Talk to us about getting paid",
    body: "Tell us about your business and the towns you work for. We'll follow up.",
    href: "/contact?from=vendors",
  },
} as const satisfies AudienceContent;
