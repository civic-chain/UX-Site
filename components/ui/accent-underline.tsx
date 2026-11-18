import { cn } from "@/lib/utils";

type AccentUnderlineWidth = "sm" | "md";

const widthClasses: Record<AccentUnderlineWidth, string> = {
  sm: "w-12",
  md: "w-16",
};

type AccentUnderlineProps = {
  width?: AccentUnderlineWidth;
  className?: string;
};

export function AccentUnderline({
  width = "md",
  className,
}: AccentUnderlineProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block h-px bg-gold-300",
        widthClasses[width],
        className,
      )}
    />
  );
}
