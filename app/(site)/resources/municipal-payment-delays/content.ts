export const meta = {
  category: "Municipal Finance",
  date: "April 2026",
  title: "Why municipal vendor payments take weeks, and what it costs everyone.",
  lede: "Most municipal payments aren't slow because of negligence. They're slow because the law requires it. Here's what that costs, and what changes when the money moves in seconds instead.",
};

export type Section =
  | { kind: "prose"; heading: string; paragraphs: string[] }
  | { kind: "paper-callout"; tone: "gold"; title: string; body: string }
  | {
      kind: "metrics-callout";
      tone: "sky";
      title: string;
      rows: { label: string; value: string }[];
      footnote: string;
    };

export const sections: Section[] = [
  {
    kind: "prose",
    heading: "One person is managing all of it",
    paragraphs: [
      "In most small municipalities, the finance function belongs to one person. Not a lean team. One person who is the treasurer, the tax collector, the clerk, the procurement officer, and often the person who fixes the printer. It's not a management failure. In many states, statute explicitly allows a single person to hold the combined treasurer-tax collector role because there's no other realistic option. Small towns can't afford to staff these functions separately.",
      "The Maine Municipal Association documented in 2023 that the profession hasn't drawn younger workers and is aging out fast. One county treasurer covers finances for four municipalities while helping a fifth after its administrator died. In April 2026, a 24-year-old was appointed interim town manager in one community after months of missed financial reconciliations under her predecessor. There is no credible hiring fix. Any software built for these communities needs to work for one non-expert carrying the whole load.",
      "That constraint shapes everything: why payments fail, how fraud stays hidden, why audits run years behind.",
    ],
  },
  {
    kind: "prose",
    heading: "The warrant problem nobody talks about",
    paragraphs: [
      "In most small municipalities, the treasurer can't cut a check on their own authority. Payment requires a warrant, a signed authorization from a majority of the select board. Select boards are part-time, elected, and meet twice a month. Some manage once.",
      "A contractor who wraps a job on Tuesday might wait through two full board meetings before a check gets cut. Two to four weeks, at minimum. When boards cancel for weather or fall short of quorum, it runs longer. This isn't a process failure. In many states, it's statutory. A treasurer who pays without a signed warrant is acting improperly regardless of intent.",
      "Any faster-payment solution has to work inside that structure, not sidestep it. Digital warrant packets, e-signature approval, configurable thresholds for routine payments: these can cut the cycle from weeks to hours without touching the underlying legal requirement. It's a workflow problem as much as a technology one.",
      "Contractors know about the wait. They price for it.",
    ],
  },
  {
    kind: "prose",
    heading: "What payment risk adds to every bid",
    paragraphs: [
      "When a contractor bids on a municipal job, they're not just pricing labor and materials. They're pricing the cost of waiting 30 to 45 days to get paid: the financing, the uncertainty about whether it shows up at all, the time spent on follow-up calls. All of that ends up in the number they submit.",
      "The Rabbet 2023 Construction Payments Report found that payment delays added $273 billion to U.S. construction bids in a single year. Not money that went to workers or materials, the financial industry's toll on slow payment, collected from taxpayers and passed silently through every public works contract in the country.",
      "For a town managing a $48,000 seasonal plowing contract, that's not theoretical. A 5% risk premium on payment uncertainty adds $2,400 to the bid before a truck ever leaves the yard.",
      "In states that require municipalities to award contracts to the lowest responsible bidder, the effect compounds. Remove the payment risk and the rational bid goes lower, the municipality is legally required to accept it. Towns that pay in minutes start getting structurally better bids than neighboring towns that don't. The pressure to modernize stops being a sales argument and becomes a competitive fact.",
    ],
  },
  {
    kind: "paper-callout",
    tone: "gold",
    title: "A $48,000 plowing contract, broken down",
    body: "Under a Civic-Chain contract: $18,000 loads onto MCC-locked virtual cards the day the contract activates, fuel, parts, and equipment only, authorized in real time at point of tap. $27,600 in residual payments move via blockchain settlement in minutes after each verified work period. $2,400 holds until final sign-off, then releases. No invoice cycle. No warrant queue for day-to-day operating expenses. The board still authorizes residual payments. The oversight runs alongside the work, not after it.",
  },
  {
    kind: "prose",
    heading: "What no audit trail looks like",
    paragraphs: [
      "In 2015, a Maine town's tax collector was convicted of embezzling $500,948 over five years. She'd held the combined treasurer-tax collector role for 42 years. Nobody caught it, until the town installed computerized payment tracking software in 2014. The software flagged deposit discrepancies. That mechanism, automated and timestamped, is what a modern contract platform produces by default.",
      "The pattern holds across documented cases: one employee carrying combined duties, cash-heavy collections, long tenure that shields detection, no record of what moved when. The Maine Center for Public Interest Reporting tallied at least $800,000 in municipal theft over five years from towns averaging under 3,000 residents. The common thread isn't malice. It's the absence of any system that makes irregularities visible.",
      "MCC-locked virtual cards address a different, more common problem: contract spend that drifts. In 2023, a Maine town found that firefighters had been fueling personal vehicles on town credit cards. The clerk who caught it demanded documentation and was fired for the trouble. A card locked to fuel and automotive merchant categories at the hardware level can't be used at a diner or a retail store. The decline happens at point of sale, before any money moves, with a reason code logged on every transaction. The control isn't a policy. It's physics.",
    ],
  },
  {
    kind: "prose",
    heading: "The audit backlog is the other crisis",
    paragraphs: [
      "Seven of sixteen Maine counties were behind on their annual audits as of late 2025. The pool of governmental CPAs has collapsed. Firms that specialize in municipal work are turning jobs away. One county auditor resigned in March 2026, saying he couldn't meet a bank's deadline. Another county just finished its 2020 audit and is working on 2021 through 2024 simultaneously.",
      "Maine statute requires every municipality to file a GAGAS (Yellow Book) post-audit within 30 days of completion. When the auditor shortage pushes audits years behind, that requirement quietly fails, and each missed year is a year of financial records that no one has independently verified.",
      "A platform that generates an immutable, timestamped record of every card tap, residual payment, and refill authorization doesn't replace the auditor. It eliminates the hours spent reconstructing what happened from memory, inbox searches, and paper receipts. The evidence trail exists before the auditor arrives. That cuts billable hours, and with them, the audit invoice.",
    ],
  },
  {
    kind: "prose",
    heading: "The transparency argument is really a workload argument",
    paragraphs: [
      "The Maine Municipal Association's 2022 survey found the average municipality handles more than 36 records requests per year that go beyond normal staff effort. About 38% of those take more than five hours to resolve. One county manager estimated 50 a month, 99% of them not what most people picture when they hear \"public records request.\" Just questions about who got paid, for what, and how much.",
      "Every transaction on a Civic-Chain contract, the card tap at 3am, the refill request, the residual payment, the hold-back release, is recorded on a public blockchain. Any resident can look it up without filing a request, creating a login, or calling town hall. That's not a transparency feature built on top of the payment system. It's what the payment system produces. Most of those 36 annual requests stop arriving.",
    ],
  },
  {
    kind: "prose",
    heading: "What fast settlement changes for the vendor",
    paragraphs: [
      "ACH takes one to three business days. Wires run $25 to $50 per transaction. Blockchain settlement completes in seconds, at a cost under a cent. When a Work Completion Record is approved, the residual payment moves immediately, the vendor's account reflects it the same day. No float period. No follow-up calls. No invoice aging on a spreadsheet.",
      "For a contractor running seasonal crews who need to know whether next week's payroll is covered, that's not a marginal improvement. It changes the cash flow picture, and removes the financing risk that was priced into the bid from the beginning.",
    ],
  },
  {
    kind: "metrics-callout",
    tone: "sky",
    title: "The math for a small town",
    rows: [
      {
        label: "Bid premium reduction (5% on $200K annual contract spend)",
        value: "~$10,000 / year",
      },
      {
        label: "Staff time recovered from payment follow-up and records requests",
        value: "~40 hrs / year",
      },
      {
        label: "Auditor hours saved from pre-built GAGAS-ready evidence trail",
        value: "Est. 10–20 hrs / audit",
      },
      {
        label: "Interchange yield returned to town as card program revenue",
        value: "~$1,400 / year",
      },
    ],
    footnote:
      "Illustrative figures based on a municipality managing approximately $200K in annual contractor spend. Actual results depend on contract volume, vendor mix, and audit complexity.",
  },
  {
    kind: "prose",
    heading: "Why this hasn't been solved already",
    paragraphs: [
      "The dominant back-office platform in small municipal government is good at what it was built for, fund accounting, payroll, tax billing, check reconciliation. Putting virtual cards into a contractor's Apple Pay, enforcing MCC locks at point of sale, publishing a live spending record to a public ledger: it was never designed for any of that. Those aren't extensions of the existing system. They're a different architecture, built around a one-person office rather than assuming a finance department.",
      "The warrant workflow is the piece nobody has addressed. It can't be bypassed, faster payment has to run through the existing authorization structure, not around it. Most govtech products that touch payment speed either ignore the warrant requirement or expect municipalities to reshape their statutory workflows to accommodate the software. The right direction is reversed: the software wraps around the law.",
      "The same gap exists on the inbound side. The dominant citizen payment portal takes 2.5% on property taxes, utility bills, and permits, $75 on a $3,000 tax bill, charged to the resident as a convenience fee. The same payment rail handling outbound contractor payments can process inbound citizen payments through the same municipal account, at a fraction of that cost. The one-person finance office manages both directions today through separate, disconnected systems. There's no reason that arrangement has to continue.",
    ],
  },
];

export const footer = {
  body: "Civic-Chain is a municipal procurement and payment platform. If you manage contractor spend for a town, county, school district, or other public entity, we'd like to talk.",
  email: { label: "Contact us", href: "/contact" },
};
