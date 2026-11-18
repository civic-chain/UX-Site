import { AccentUnderline } from "@/components/ui/accent-underline";
import { Badge } from "@/components/ui/badge";
import { HeadlineDot } from "@/components/ui/headline-dot";
import { cn } from "@/lib/utils";

import styles from "./record-flow-section.module.css";

/**
 * The record-flow animation now comes from public/how-diagram.html, the same
 * file /how embeds, so there is one animation with one owner instead of two
 * implementations drifting apart. This section previously carried a parallel
 * React build of the same scene (a ~560 line client component plus a 423 line
 * GSAP hook and ~1300 lines of scene CSS); all of that was removed with the
 * swap. Section copy and the #record-flow anchor are unchanged.
 *
 * Edit the animation in the standalone explainer and regenerate
 * public/how-diagram.html; do not fork it back into React.
 */
export function RecordFlowSection({ className }: { className?: string }) {
  return (
    <section id="record-flow" className={cn("section-shell", className)}>
      <div className="mx-auto max-page">
        <div className={styles.intro}>
          <div className={styles["heading-stack"]}>
            <Badge tone="gold">How the cost disappears</Badge>
            <h2 className="max-w-xl h3">
              Every dollar moves, settles, and files itself
              <HeadlineDot />
            </h2>
            <AccentUnderline />
          </div>
          <p className="max-w-xl body-lg text-slate-500">
            Watch one payment travel the rail. Through Civic-Chain it settles in
            seconds and writes itself to the ledger, so the report drawer is
            already organized with no follow-up work needed.
          </p>
        </div>

        {/* Heights match /how because the layout is identical: this sits in the
            same .section-shell + .max-page container, so the iframe resolves to
            the same width at every viewport. Measured content height of
            how-diagram.html, transitions disabled: 1676px while its own width
            is <= 640px (the rail stacks), peaking at 1335px above that.

            The breakpoint is min-[705px], not sm:, because the animation's
            media query keys off the IFRAME width while a Tailwind breakpoint
            keys off the VIEWPORT, and .section-shell padding leaves the iframe
            at only 640px when the viewport is 704px. Note this section is
            hidden below sm, so the tall value only ever applies between 640px
            and 704px. Re-derive if .section-shell padding changes. */}
        <iframe
          src="/how-diagram.html"
          title="Civic-Chain record flow animation"
          className="h-[1800px] w-full rounded-2xl border-0 min-[705px]:h-[1400px]"
          scrolling="no"
        />
      </div>
    </section>
  );
}
