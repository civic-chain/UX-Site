import { CountUp } from "@/components/motion";
import { AccentUnderline } from "@/components/ui/accent-underline";
import type { IconName } from "@/components/ui/icon";
import { IconChip } from "@/components/ui/icon-chip";
import { SurfaceCard } from "@/components/ui/surface-card";
import type { SurfaceTone } from "@/lib/design-system-types";
import { cn } from "@/lib/utils";

type MobileStat = {
  numericValue: number;
  prefix: string;
  suffix: string;
  icon: IconName;
  tone: "gold" | "sage";
  chipTone: SurfaceTone;
  label: string;
};

const mobileStats: readonly MobileStat[] = [
  {
    numericValue: 208,
    prefix: "$",
    suffix: "B",
    icon: "payment",
    tone: "gold",
    chipTone: "gold",
    label: "lost to late payments in U.S. construction in a single year",
  },
  {
    numericValue: 4,
    prefix: "",
    suffix: " sec",
    icon: "flash",
    tone: "sage",
    chipTone: "sage",
    label: "to settle a vendor payment through Civic-Chain vs. 1–3 days on ACH",
  },
];

export function MobileBridgeSection({ className }: { className?: string }) {
  return (
    <section id="mobile-bridge" className={cn("section-shell", className)}>
      <div className="mx-auto max-page">
        <div className="grid gap-5">
          <div className="grid grid-cols-2 gap-3">
            {mobileStats.map((stat) => (
              <SurfaceCard key={stat.suffix} tone={stat.tone}>
                <div className="flex flex-col gap-3 p-5">
                  <IconChip
                    name={stat.icon}
                    tone={stat.chipTone}
                    variant="tile"
                    size="md"
                  />
                  <div className="h3 tracking-metric">
                    <CountUp
                      value={stat.numericValue}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </div>
                  <p className="body-sm text-current/80">{stat.label}</p>
                </div>
              </SurfaceCard>
            ))}
          </div>

          <AccentUnderline />

          <p className="body text-slate-500">
            Contracts managed in one place. Payments settled in seconds.
            Records visible without a request.
          </p>
        </div>
      </div>
    </section>
  );
}
