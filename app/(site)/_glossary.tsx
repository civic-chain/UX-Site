import type { ReactNode } from "react";

import { Term } from "@/components/ui/term";

// Plain-language definitions for words an average visitor may not know.
// One source for every glossary term on the site: change a definition here
// and it changes everywhere. Keep each to a sentence or two, readable by a
// child, and say what it means for a town or a resident, not how the
// technology works.
const glossary = {
  "genius-act": {
    label: "GENIUS Act",
    definition:
      "A 2025 federal law that sets the rules for digital dollars. Every one must be backed one-for-one by real dollars held in reserve, with regular public reports.",
  },
  stablecoin: {
    label: "Stablecoin",
    definition:
      "A digital dollar. It is always worth exactly one U.S. dollar, so its value never goes up or down.",
  },
  ach: {
    label: "ACH",
    definition:
      "The standard bank-to-bank transfer most towns use today. A payment usually takes one to three business days to arrive.",
  },
  ledger: {
    label: "Ledger",
    definition:
      "The permanent record of every payment. Once a payment is written down, it cannot be changed or deleted.",
  },
  procurement: {
    label: "Procurement",
    definition: "How a town picks, hires, and pays the companies that do public work.",
  },
} as const;

export type GlossaryId = keyof typeof glossary;

/** A glossary word in JSX: <GlossaryTerm id="ach" /> or with custom shown text. */
export function GlossaryTerm({ id, children }: { id: GlossaryId; children?: ReactNode }) {
  return <Term {...glossary[id]}>{children}</Term>;
}

// Copy kept in plain strings (FAQ answers also feed JSON-LD) marks a word as
// [[glossary-id|shown text]]. withTerms renders the marks; plainTerms strips
// them where plain text is needed.
const TERM_MARK = /\[\[([a-z-]+)\|([^\]]+)\]\]/g;

export function withTerms(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(TERM_MARK)) {
    const [whole, id, label] = match;
    const index = match.index ?? 0;
    parts.push(text.slice(last, index));
    parts.push(
      id in glossary ? (
        <GlossaryTerm key={index} id={id as GlossaryId}>
          {label}
        </GlossaryTerm>
      ) : (
        label
      ),
    );
    last = index + whole.length;
  }
  parts.push(text.slice(last));
  return parts;
}

export function plainTerms(text: string): string {
  return text.replace(TERM_MARK, "$2");
}
