import { meta as repayPartnershipMeta } from "./repay-civic-chain-strategic-partnership/content";

export type NewsMeta = {
  slug: string;
  category: string;
  date: string;
  title: string;
  lede: string;
};

// Reverse-chronological. Newest first.
export const posts: NewsMeta[] = [
  {
    slug: repayPartnershipMeta.slug,
    category: repayPartnershipMeta.category,
    date: repayPartnershipMeta.date,
    title: repayPartnershipMeta.title,
    lede: repayPartnershipMeta.lede,
  },
];
