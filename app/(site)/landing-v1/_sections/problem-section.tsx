import { AccentUnderline } from "@/components/ui/accent-underline";
import { BrandRasterImage } from "@/components/ui/brand-raster-image";
import { Badge } from "@/components/ui/badge";
import { HeadlineDot } from "@/components/ui/headline-dot";
import { StepBadge } from "@/components/ui/step-badge";
import { SurfaceCard } from "@/components/ui/surface-card";
import { cn } from "@/lib/utils";

const problemContent = {
  eyebrow: "The Problem",
  title: "Contract work is scattered. Slow. Unclear",
  body:
    "Most municipalities manage real contractor spend through inboxes, PDFs, calls, and memory. The result is weaker clarity, weaker accountability, and slower answers for everyone involved. In most towns, one person is managing all of it.",
  cards: [
    {
      step: "01",
      title: "Fragmented workflow",
      body:
        "Procurement, approvals, work confirmation, and payment follow-up often live in different places and depend on individual staff memory.",
      artworkSrc: "/landing/fragmented-desk.webp",
      artworkAlt: "Cluttered desk with scattered papers — fragmented workflow illustration.",
      tone: "cream",
    },
    {
      step: "02",
      title: "Payment friction",
      body:
        "Contractors face uncertainty around timing, status, and approval steps, which creates avoidable friction and can raise the price of risk.",
      artworkSrc: "/landing/worried-contractor-binders.webp",
      artworkAlt: "Worried contractor next to binders — payment friction illustration.",
      tone: "sky",
    },
    {
      step: "03",
      title: "Late visibility",
      body:
        "Most public records requests are just asking who got paid what. A live ledger answers that before anyone asks.",
      artworkSrc: "/landing/late-visibility-table.webp",
      artworkAlt: "Late-visibility table scene — public ledger illustration.",
      tone: "sage",
    },
  ],
} as const;

export function ProblemSection({ className }: { className?: string }) {
  return (
    <section
      id="problem"
      data-disable-motion="true"
      className={cn("section-shell", className)}
    >
      <div className="mx-auto max-page">
        <div className="grid gap-6 lg:gap-7">
          <div data-testid="section-heading" className="grid gap-6 lg:gap-7">
            <div>
              <Badge tone="gold">{problemContent.eyebrow}</Badge>
            </div>
            <div data-testid="section-heading-copy-stack" className="grid gap-3">
              <h2 className="max-w-4xl h3">
                {problemContent.title}
                <HeadlineDot />
              </h2>
              <p className="max-w-2xl body-lg text-slate-500">
                {problemContent.body}
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:gap-4 lg:grid-cols-3 lg:items-stretch">
            {problemContent.cards.map((card, index) => (
              <SurfaceCard
                key={card.title}
                tone={card.tone}
                data-testid={`problem-card-${index}`}
                className="h-full"
              >
                <div className="flex h-full flex-col p-7 lg:p-10">
                  <BrandRasterImage
                    src={card.artworkSrc}
                    alt={card.artworkAlt}
                    width={1024}
                    height={1024}
                    className="problem-card-art mb-6 w-full object-contain"
                  />

                  <div className="grid gap-3">
                    <div className="flex items-center gap-3">
                      <StepBadge>{card.step}</StepBadge>
                      <h3 className="h4">{card.title}</h3>
                    </div>
                    <AccentUnderline width="sm" />
                    <p className="max-w-lg body text-current/80">{card.body}</p>
                  </div>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
