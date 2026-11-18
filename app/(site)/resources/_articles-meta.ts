import { meta as municipalPaymentDelaysMeta } from "./municipal-payment-delays/content";

export type ArticleMeta = {
  slug: string;
  category: string;
  date: string;
  title: string;
  lede: string;
};

export const articles: ArticleMeta[] = [
  { slug: "municipal-payment-delays", ...municipalPaymentDelaysMeta },
];
