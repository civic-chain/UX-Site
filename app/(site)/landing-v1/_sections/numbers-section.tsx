import { CountUp } from "@/components/motion";
import { AccentUnderline } from "@/components/ui/accent-underline";
import { BrandRasterImage } from "@/components/ui/brand-raster-image";
import { Badge } from "@/components/ui/badge";
import { HeadlineDot } from "@/components/ui/headline-dot";
import type { IconName } from "@/components/ui/icon";
import { IconChip } from "@/components/ui/icon-chip";
import { SurfaceCard } from "@/components/ui/surface-card";
import type { SurfaceTone } from "@/lib/design-system-types";
import { cn } from "@/lib/utils";

type MetricTone = "gold" | "cream" | "sky" | "sage";
type MetricItem = {
  value: string;
  icon: IconName;
  label: string;
  source: { label: string; href: string };
  tone: MetricTone;
  chipTone: SurfaceTone;
};

const numbersContent = {
  eyebrow: "Why It Matters",
  title: "Friction costs money",
  body:
    "When every contract is managed manually, cost grows on both sides. Staff chase status, contractors price around uncertainty, and weak visibility makes every follow-up slower.",
  metrics: [
    {
      value: "$208B",
      icon: "payment",
      label:
        "cost to the U.S. construction industry in a single year from late payments, up 53% from the prior year",
      source: {
        label: "Rabbet, 2022 Construction Payments Report",
        href: "https://www.constructiondive.com/news/late-payments-cost-construction-industry-208b-in-2022-report/636224/",
      },
      tone: "gold",
      chipTone: "gold",
    },
    {
      value: "~25%",
      icon: "globe",
      label:
        "of global government procurement spending lost to inefficient or shortsighted procurement practices, roughly $1 trillion per year",
      source: {
        label: "World Bank, 2022",
        href: "https://blogs.worldbank.org/en/voices/hidden-1-trillion-halting-waste-public-procurement",
      },
      tone: "sky",
      chipTone: "sky",
    },
    {
      value: "82% faster",
      icon: "paymentTiming",
      label:
        "invoice processing time achieved by organizations using modern digital payment workflows versus manual ones",
      source: {
        label: "Ardent Partners, AP Metrics That Matter 2024",
        href: "https://payablesplace.ardentpartners.com/2025/01/best-of-2024-ap-performance-advantages-of-best-in-class/",
      },
      tone: "sage",
      chipTone: "sage",
    },
  ],
  feature: {
    value: "< 5 seconds",
    icon: "flash",
    label:
      "to finalize a vendor payment on modern public blockchain networks, versus 1 to 3 business days on ACH. Civic-Chain funds vendors the same day a contract is awarded, at fractions of a cent per transaction instead of $25 to $50 per wire.",
    source: {
      label: "Stellar Development Foundation, Network Performance",
      href: "https://developers.stellar.org/docs/learn/fundamentals/stellar-consensus-protocol",
    },
    tone: "cream",
    chipTone: "gold",
    illustration: {
      src: "/landing/courthouse-tree-line-art.webp",
      alt: "Courthouse and tree line-art decoration.",
    },
  },
} as const satisfies {
  eyebrow: string;
  title: string;
  body: string;
  metrics: readonly MetricItem[];
  feature: MetricItem & {
    illustration: { src: string; alt: string };
  };
};

type Metric = (typeof numbersContent.metrics)[number];

/**
 * Renders a metric figure as an in-view count-up parsed from its display
 * string (e.g. "$208B" counts $0 -> $208 with the "B" suffix). Falls back to
 * static text when the string carries no number, so claims stay intact.
 */
function MetricValue({ value }: { value: string }) {
  const match = value.match(/[\d,]+/);
  if (!match) return <>{value}</>;
  const start = match.index ?? 0;
  const digits = match[0];
  return (
    <CountUp
      value={Number(digits.replace(/,/g, ""))}
      prefix={value.slice(0, start)}
      suffix={value.slice(start + digits.length)}
    />
  );
}

function MetricCard({
  metric,
  index,
  className,
  art,
}: {
  metric: Metric | typeof numbersContent.feature;
  index: number;
  className?: string;
  art?: { src: string; alt: string };
}) {
  return (
    <SurfaceCard
      data-testid={`metric-card-${index}`}
      tone={metric.tone}
      className={cn("relative", className)}
    >
      <div className="flex h-full flex-col gap-5 p-7 lg:p-10 lg:flex-row lg:gap-7">
        <div className="flex shrink-0 items-start lg:items-center">
          <IconChip
            name={metric.icon}
            tone={metric.chipTone}
            variant="tile"
            size="lg"
            weight="bold"
          />
        </div>
        <div
          aria-hidden="true"
          className="hidden w-px self-stretch lg:block bg-current/30"
        />
        <div className="flex h-full flex-1 flex-col justify-between gap-6">
          <div className="grid gap-2">
            <div className="h2 tracking-metric lg:h2">
              <MetricValue value={metric.value} />
            </div>
            <p className="max-w-xl body-lg text-current/80">
              {metric.label}
            </p>
          </div>
          <div>
            <div className="h-px w-full bg-current/30" />
            <a
              href={metric.source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="captions mt-4 block text-current/80 hover:text-current/85"
            >
              {metric.source.label}
            </a>
          </div>
        </div>
        {art ? (
          <div
            aria-hidden="true"
            className="pointer-events-none relative hidden self-stretch lg:block lg:w-2/5"
          >
            <BrandRasterImage
              src={art.src}
              alt={art.alt}
              fill
              sizes="40vw"
              className="object-contain object-right-bottom opacity-90"
            />
          </div>
        ) : null}
      </div>
    </SurfaceCard>
  );
}

export function NumbersSection({ className }: { className?: string }) {
  return (
    <section id="numbers" className={cn("section-shell", className)}>
      <div className="mx-auto max-page">
        <div className="grid gap-6 lg:gap-4 grid-cols-1 lg:grid-cols-2">
          <div
            data-testid="section-heading"
            className="grid gap-6 lg:gap-7 p-5 lg:p-6"
          >
            <div>
              <Badge tone="gold">{numbersContent.eyebrow}</Badge>
            </div>
            <div data-testid="section-heading-copy-stack" className="grid gap-3">
              <h2 className="max-w-md h3">
                {numbersContent.title}
                <HeadlineDot />
              </h2>
              <AccentUnderline className="mt-1" />
              <p className="mt-2 max-w-md body-lg text-slate-500">
                {numbersContent.body}
              </p>
            </div>
          </div>

          {numbersContent.metrics.map((metric, index) => (
            <MetricCard key={metric.value} metric={metric} index={index} />
          ))}

          <MetricCard
            metric={numbersContent.feature}
            index={numbersContent.metrics.length}
            className="overflow-hidden lg:col-span-2"
            art={numbersContent.feature.illustration}
          />
        </div>
      </div>
    </section>
  );
}
