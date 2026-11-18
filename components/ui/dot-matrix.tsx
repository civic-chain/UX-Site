import { cn } from "@/lib/utils";

type DotMatrixProps = {
  rows?: number;
  cols?: number;
  className?: string;
};

export function DotMatrix({
  rows = 4,
  cols = 4,
  className,
}: DotMatrixProps) {
  const dots: Array<{ key: string; cx: number; cy: number }> = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({ key: `${r}-${c}`, cx: c, cy: r });
    }
  }

  const width = cols - 1;
  const height = rows - 1;

  return (
    <svg
      aria-hidden="true"
      viewBox={`-0.5 -0.5 ${width + 1} ${height + 1}`}
      preserveAspectRatio="xMidYMid meet"
      className={cn(
        "block text-foreground/25",
        className,
      )}
    >
      {dots.map(({ key, cx, cy }) => (
        <circle key={key} cx={cx} cy={cy} r={0.18} fill="currentColor" />
      ))}
    </svg>
  );
}
