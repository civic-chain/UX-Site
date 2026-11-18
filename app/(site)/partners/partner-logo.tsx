import Image from "next/image";

import { cn } from "@/lib/utils";

// Renders the partner-supplied logo. Files live in `public/partners/` and are
// used as supplied — do not recolor, distort, or crop them. The two logos have
// very different aspect ratios (Modern Treasury is a compact block, REPAY is a
// wide strip), so display size is bounded by BOTH a max height and a max width
// and fitted with object-contain, which keeps their optical weight comparable
// without stretching either. `boxClassName` lets a call site (e.g. the smaller
// homepage strip) tighten those bounds. If `src` is missing it falls back to a
// text wordmark so the card still reads.
export function PartnerLogo({
  name,
  src,
  width,
  height,
  boxClassName,
}: {
  name: string;
  src: string | null;
  width: number;
  height: number;
  boxClassName?: string;
}) {
  if (!src) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex items-center font-display text-2xl tracking-tight text-gold-800",
          boxClassName,
        )}
      >
        {name}
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      width={width}
      height={height}
      className={cn(
        "h-auto w-auto max-h-11 max-w-[190px] object-contain object-left",
        boxClassName,
      )}
    />
  );
}
