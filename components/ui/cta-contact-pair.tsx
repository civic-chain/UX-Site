import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SystemIcon } from "@/components/ui/system-icon";
import { cn } from "@/lib/utils";

type CtaContactPairProps = {
  primaryLabel: string;
  emailHref: string;
  emailLabel: string;
  className?: string;
};

export function CtaContactPair({
  primaryLabel,
  emailHref,
  emailLabel,
  className,
}: CtaContactPairProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-4",
        className,
      )}
    >
      <Button
        asChild
        size="lg"
        fullWidth
        className="min-h-14 max-w-full shrink whitespace-normal text-center sm:min-h-12 sm:w-auto sm:whitespace-nowrap"
      >
        <Link href={emailHref} aria-label={`${primaryLabel}: ${emailLabel}`}>
          <span className="inline-flex min-w-0 flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span>{primaryLabel}</span>
            <span aria-hidden="true" className="hidden size-1 rounded-2xl bg-current opacity-60 sm:inline-flex" />
            <span className="max-w-full break-all font-semibold opacity-90 sm:break-normal">
              {emailLabel}
            </span>
          </span>
          <SystemIcon name="arrow-right" size="xs" />
        </Link>
      </Button>
    </div>
  );
}
