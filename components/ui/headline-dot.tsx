import { cn } from "@/lib/utils";

export function HeadlineDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("text-gold-300", className)}
    >
      .
    </span>
  );
}
