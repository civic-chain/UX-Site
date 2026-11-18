// Money-flow diagram, rebuilt from scratch for the press page (no reused deck
// graphic). Three lanes: two solid money lanes and one dashed record lane; the
// final "public blockchain" node is the gold accent. No chain is named, and no
// money or personal data is shown moving on-chain. Colors ride currentColor /
// Tailwind fill-* and the gold ramp, so it recolors with its card.

type Node = { l1: string; l2: string };

const ROW1: Node[] = [
  { l1: "Town treasury", l2: "funds in US dollars" },
  { l1: "Sponsor bank account", l2: "FDIC-insured · Modern Treasury" },
  { l1: "Vendors", l2: "paid in US dollars" },
];
const ROW2: Node[] = [
  { l1: "Contract budget", l2: "set per solicitation" },
  { l1: "Spending cards", l2: "approved categories only" },
  { l1: "Approved merchants", l2: "everything else declines" },
];
const ROW3: Node[] = [
  { l1: "Settled payments", l2: "& card purchases" },
  { l1: "Civic-Chain record", l2: "category · amount · date" },
  { l1: "Public blockchain", l2: "fingerprint only" },
];

// Geometry
const NODE_W = 236;
const NODE_H = 86;
const XS = [120, 432, 744]; // left edges of the three columns
const RY = { r1: 64, r2: 214, r3: 364 }; // row top y
const CENTER_X = XS[1] + NODE_W / 2;

function NodeBox({
  x,
  y,
  node,
  dashed = false,
  accent = false,
}: {
  x: number;
  y: number;
  node: Node;
  dashed?: boolean;
  accent?: boolean;
}) {
  return (
    <g className={accent ? "text-gold-700" : "text-blue-900"}>
      <rect
        x={x}
        y={y}
        width={NODE_W}
        height={NODE_H}
        rx={18}
        className={accent ? "fill-current" : "fill-cream-50"}
        fillOpacity={accent ? 0.1 : 1}
        stroke="currentColor"
        strokeWidth={accent ? 2 : 1.5}
        strokeDasharray={dashed ? "5 5" : undefined}
      />
      <text
        x={x + NODE_W / 2}
        y={y + 36}
        textAnchor="middle"
        fontSize={16}
        className="fill-current font-medium"
      >
        {node.l1}
      </text>
      <text
        x={x + NODE_W / 2}
        y={y + 58}
        textAnchor="middle"
        fontSize={12}
        fillOpacity={0.7}
        className="fill-current"
      >
        {node.l2}
      </text>
    </g>
  );
}

// Horizontal arrow from one column's right edge to the next column's left edge.
function HArrow({ from, y, dashed = false }: { from: 0 | 1; y: number; dashed?: boolean }) {
  const x1 = XS[from] + NODE_W;
  const x2 = XS[from + 1];
  const my = y + NODE_H / 2;
  return (
    <g className="text-blue-900/70">
      <line
        x1={x1 + 2}
        y1={my}
        x2={x2 - 10}
        y2={my}
        stroke="currentColor"
        strokeWidth={1.75}
        strokeDasharray={dashed ? "5 5" : undefined}
      />
      <path d={`M ${x2 - 10} ${my - 5} L ${x2 - 1} ${my} L ${x2 - 10} ${my + 5} Z`} className="fill-current" />
    </g>
  );
}

// Vertical connector between lanes, centered, with a short caption.
function VArrow({
  y1,
  y2,
  label,
  dashed = false,
  accent = false,
}: {
  y1: number;
  y2: number;
  label: string;
  dashed?: boolean;
  accent?: boolean;
}) {
  return (
    <g className={accent ? "text-gold-700" : "text-blue-900/70"}>
      <line
        x1={CENTER_X}
        y1={y1 + 2}
        x2={CENTER_X}
        y2={y2 - 10}
        stroke="currentColor"
        strokeWidth={1.75}
        strokeDasharray={dashed ? "5 5" : undefined}
      />
      <path
        d={`M ${CENTER_X - 5} ${y2 - 10} L ${CENTER_X} ${y2 - 1} L ${CENTER_X + 5} ${y2 - 10} Z`}
        className="fill-current"
      />
      <text
        x={CENTER_X + 14}
        y={(y1 + y2) / 2 + 4}
        fontSize={11}
        letterSpacing="0.04em"
        fillOpacity={0.85}
        className="fill-current"
      >
        {label}
      </text>
    </g>
  );
}

function LaneTag({ y, children, dashed = false }: { y: number; children: string; dashed?: boolean }) {
  return (
    <text
      x={XS[0]}
      y={y - 12}
      fontSize={11}
      letterSpacing="0.12em"
      className={dashed ? "fill-gold-700" : "fill-blue-900/55"}
    >
      {children.toUpperCase()}
    </text>
  );
}

export function MoneyFlowDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1100 470"
      role="img"
      aria-label="Town money stays in dollars; only fingerprints go public"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Lane 1 — money */}
      <LaneTag y={RY.r1}>Money moves</LaneTag>
      {ROW1.map((n, i) => (
        <NodeBox key={n.l1} x={XS[i]} y={RY.r1} node={n} />
      ))}
      <HArrow from={0} y={RY.r1} />
      <HArrow from={1} y={RY.r1} />

      {/* Lane 2 — spending control */}
      <LaneTag y={RY.r2}>Spending control</LaneTag>
      {ROW2.map((n, i) => (
        <NodeBox key={n.l1} x={XS[i]} y={RY.r2} node={n} />
      ))}
      <HArrow from={0} y={RY.r2} />
      <HArrow from={1} y={RY.r2} />

      {/* Lane 3 — public record (dashed) */}
      <LaneTag y={RY.r3} dashed>
        Public record
      </LaneTag>
      {ROW3.map((n, i) => (
        <NodeBox
          key={n.l1}
          x={XS[i]}
          y={RY.r3}
          node={n}
          dashed
          accent={i === 2}
        />
      ))}
      <HArrow from={0} y={RY.r3} dashed />
      <HArrow from={1} y={RY.r3} dashed />

      {/* Lane connectors */}
      <VArrow y1={RY.r1 + NODE_H} y2={RY.r2} label="funds the budget" />
      <VArrow y1={RY.r2 + NODE_H} y2={RY.r3} label="becomes a record" dashed />
    </svg>
  );
}
