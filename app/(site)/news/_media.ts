// Flyers and interviews shown on the News & Media page (/news), alongside the
// press releases in _articles-meta.ts. Each group renders only when it has
// entries.

// Flyers: image/PDF one-pagers. `src` = thumbnail shown, `href` = file opened.
export const flyers: {
  title: string;
  src: string;
  href: string;
  alt: string;
  width: number;
  height: number;
}[] = [
  {
    title: "Civic-Chain September flyer",
    src: "/news-media/civic-chain-september-flyer-thumb.png",
    href: "/news-media/civic-chain-september-flyer.pdf",
    alt: "Civic-Chain flyer: every dollar on the record, a town's spending posted on a public record in one place as it happens, no new money.",
    width: 1000,
    height: 1295,
  },
  {
    title: "New revenue for Maine towns",
    src: "/news-media/maine-treasury-flyer-thumb.png",
    href: "/news-media/maine-treasury-flyer.pdf",
    alt: "Maine treasury one-pager: new municipal revenue from Treasury-backed stablecoin reserves, no new taxes.",
    width: 1000,
    height: 1295,
  },
];

// Interviews: external articles, podcasts, or videos. `date` is optional.
export const interviews: {
  title: string;
  outlet: string;
  date?: string;
  href: string;
}[] = [
  {
    title: "Holding Government Accountable – #SolutionsWatch",
    outlet: "The Corbett Report",
    href: "https://youtu.be/6bXCSgw0GDQ?t=1326",
  },
  {
    title: "Exclusive: Civic-Chain",
    outlet: "Long Island Audit",
    href: "https://www.patreon.com/LongIslandAudit/posts/exclusive-civic-172490862",
  },
];
