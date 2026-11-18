"use client";

import { useEffect, useRef, useState } from "react";

import { InterfaceIcon } from "./interface-icons";
import {
  WorkspacePanel,
  PanelBody,
  PanelDescription,
  PanelHeader,
  PanelTitle,
} from "./panel";
import { StatusBadge } from "./status-badge";

type FeedTx = {
  id: string;
  merchant: string;
  amount: number;
  mcc: string;
  mccLabel: string;
  crn: string;
  cardLast4: string;
  cardType: string;
  driver: string | null;
  status: "APPROVED" | "DECLINED";
};

const FEED_POOL: FeedTx[] = [
  { id: "f01", merchant: "Cumberland Farms, Brunswick ME",  amount: 94.18,  mcc: "5541", mccLabel: "Fuel",                  crn: "CRN-2026-PLW-0042", cardLast4: "1142", cardType: "Equipment", driver: "J. Morrison", status: "APPROVED" },
  { id: "f02", merchant: "NAPA Auto Parts, Brunswick ME",   amount: 127.50, mcc: "5533", mccLabel: "Auto Parts",             crn: "CRN-2026-PLW-0042", cardLast4: "4821", cardType: "Company",   driver: null,          status: "APPROVED" },
  { id: "f03", merchant: "Irving Oil, Bath ME",             amount: 86.44,  mcc: "5541", mccLabel: "Fuel",                  crn: "CRN-2026-PLW-0042", cardLast4: "8839", cardType: "Equipment", driver: "T. Kelsey",   status: "APPROVED" },
  { id: "f04", merchant: "McDonald's, Brunswick ME",        amount: 45.00,  mcc: "5812", mccLabel: "Restaurant",            crn: "CRN-2026-PLW-0042", cardLast4: "9034", cardType: "Individual",driver: "J. Morrison", status: "DECLINED" },
  { id: "f05", merchant: "Cumberland Farms, Brunswick ME",  amount: 112.30, mcc: "5541", mccLabel: "Fuel",                  crn: "CRN-2026-PLW-0042", cardLast4: "5507", cardType: "Equipment", driver: "R. Poulin",   status: "APPROVED" },
  { id: "f06", merchant: "Maine Pavement Supply Co.",       amount: 340.00, mcc: "5031", mccLabel: "Construction Supplies", crn: "CRN-2026-RDM-0018", cardLast4: "2803", cardType: "Company",   driver: null,          status: "APPROVED" },
  { id: "f07", merchant: "Any Town Equipment Rental",       amount: 640.00, mcc: "7359", mccLabel: "Equipment Rental",      crn: "CRN-2026-RDM-0018", cardLast4: "7053", cardType: "Equipment", driver: null,          status: "APPROVED" },
  { id: "f08", merchant: "Dunkin, Topsham ME",              amount: 18.75,  mcc: "5812", mccLabel: "Restaurant",            crn: "CRN-2026-RDM-0018", cardLast4: "2803", cardType: "Company",   driver: null,          status: "DECLINED" },
  { id: "f09", merchant: "Hannaford, Brunswick ME",         amount: 63.40,  mcc: "5411", mccLabel: "Grocery",               crn: "CRN-2026-PLW-0042", cardLast4: "9034", cardType: "Individual",driver: "T. Kelsey",   status: "DECLINED" },
  { id: "f10", merchant: "Milton CAT, South Portland ME",   amount: 218.75, mcc: "7538", mccLabel: "Auto Service",          crn: "CRN-2026-FPS-0007", cardLast4: "3310", cardType: "Equipment", driver: null,          status: "APPROVED" },
  { id: "f11", merchant: "GreenWorks Supply, Bath ME",      amount: 425.00, mcc: "5251", mccLabel: "Hardware Stores",       crn: "CRN-2026-PWK-0033", cardLast4: "6614", cardType: "Company",   driver: null,          status: "APPROVED" },
  { id: "f12", merchant: "Route 1 Diner, Brunswick ME",     amount: 43.90,  mcc: "5812", mccLabel: "Restaurant",            crn: "CRN-2026-PLW-0042", cardLast4: "9034", cardType: "Individual",driver: "R. Poulin",   status: "DECLINED" },
  { id: "f13", merchant: "Irving Oil, Topsham ME",          amount: 109.40, mcc: "5541", mccLabel: "Fuel",                  crn: "CRN-2026-FPS-0007", cardLast4: "3310", cardType: "Equipment", driver: null,          status: "APPROVED" },
  { id: "f14", merchant: "Home Depot, Brunswick ME",        amount: 157.25, mcc: "5211", mccLabel: "Lumber / Building",     crn: "CRN-2026-RDM-0018", cardLast4: "2803", cardType: "Company",   driver: null,          status: "APPROVED" },
  { id: "f15", merchant: "Amazon.com",                      amount: 89.99,  mcc: "5999", mccLabel: "Misc. Retail",          crn: "CRN-2026-PWK-0033", cardLast4: "6614", cardType: "Company",   driver: null,          status: "DECLINED" },
];

function formatAmount(n: number) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

type LiveCardFeedProps = {
  id?: string;
  variant?: "admin" | "public";
  limit?: number;
  intervalMs?: number;
  initialBalance?: number;
  className?: string;
};

export function LiveCardFeed({
  id,
  variant = "admin",
  limit = 5,
  intervalMs = 4000,
  initialBalance,
  className,
}: LiveCardFeedProps) {
  const [items, setItems] = useState<FeedTx[]>(() => FEED_POOL.slice(0, limit));
  const [freshId, setFreshId] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(initialBalance ?? null);
  const [expandedDeclinedKey, setExpandedDeclinedKey] = useState<string | null>(null);
  const pointer = useRef(limit % FEED_POOL.length);

  useEffect(() => {
    const timer = setInterval(() => {
      const tx = FEED_POOL[pointer.current];
      pointer.current = (pointer.current + 1) % FEED_POOL.length;
      setFreshId(tx.id);
      setItems((prev) => [tx, ...prev.slice(0, limit - 1)]);
      if (tx.status === "APPROVED" && initialBalance !== undefined) {
        setBalance((prev) => (prev !== null ? Math.max(0, prev - tx.amount) : null));
      }
    }, intervalMs);
    return () => clearInterval(timer);
  }, [limit, intervalMs, initialBalance]);

  return (
    <WorkspacePanel id={id} className={className}>
      <PanelHeader>
        <div className="grid gap-2">
          <PanelTitle>
            {variant === "admin" ? "Live Card Activity" : "Live Spend Activity"}
          </PanelTitle>
          <PanelDescription>
            {variant === "admin"
              ? "Real-time card transactions across all active contracts"
              : "Public view of card spend activity — refreshes automatically"}
          </PanelDescription>
        </div>
        <div className="flex items-center gap-4">
          {balance !== null && (
            <div className="grid gap-0.5 text-right">
              <p className="type-caption text-[color:var(--muted-foreground)]">Card Pool Balance</p>
              <p className="type-body-sm font-medium tabular-nums text-[color:var(--foreground)]">
                {formatAmount(balance)}
              </p>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="size-2 animate-pulse rounded-full bg-[color:var(--workspace-success)]" />
            <span className="type-caption text-[color:var(--muted-foreground)]">Live</span>
          </div>
        </div>
      </PanelHeader>

      <PanelBody className="grid gap-2">
        {items.map((tx, i) => {
          const approved = tx.status === "APPROVED";
          const rowKey = `${tx.id}-${i}`;
          const isFresh = tx.id === freshId && i === 0;
          const isExpanded = !approved && expandedDeclinedKey === rowKey;

          return (
            <div
              key={rowKey}
              className={[
                "radius-workspace-control overflow-hidden border transition-colors duration-500",
                isFresh
                  ? approved
                    ? "border-[color:var(--workspace-success-edge)] bg-[color:var(--workspace-success-bg)]"
                    : "border-[color:var(--workspace-danger-edge)] bg-[color:var(--workspace-danger-bg)]"
                  : "border-[color:var(--workspace-border)] bg-[color:var(--workspace-panel)]",
                !approved ? "cursor-pointer select-none" : "",
              ].join(" ")}
              onClick={
                !approved
                  ? () =>
                      setExpandedDeclinedKey(isExpanded ? null : rowKey)
                  : undefined
              }
            >
              <div className="flex flex-wrap items-start justify-between gap-3 p-3">
                <div className="flex min-w-0 items-start gap-2.5">
                  <span
                    className={[
                      "mt-1 size-2 shrink-0 rounded-full",
                      approved
                        ? "bg-[color:var(--workspace-success)]"
                        : "bg-[color:var(--workspace-danger)]",
                    ].join(" ")}
                  />
                  <div className="grid min-w-0 gap-0.5">
                    <p className="type-body-sm truncate font-medium text-[color:var(--foreground)]">
                      {tx.merchant}
                    </p>
                    <p className="type-caption text-[color:var(--muted-foreground)]">
                      {tx.crn} · MCC {tx.mcc} {tx.mccLabel}
                      {variant === "admin" && tx.driver ? ` · ${tx.driver}` : ""}
                      {variant === "admin"
                        ? ` · ${tx.cardType} Card ····${tx.cardLast4}`
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <div className="grid justify-items-end gap-1">
                    <p
                      className={[
                        "type-body-sm font-medium",
                        approved
                          ? "text-[color:var(--foreground)]"
                          : "text-[color:var(--workspace-danger)]",
                      ].join(" ")}
                    >
                      {approved
                        ? formatAmount(tx.amount)
                        : `(${formatAmount(tx.amount)})`}
                    </p>
                    <StatusBadge tone={approved ? "success" : "danger"}>
                      {approved ? "Approved" : "MCC Blocked"}
                    </StatusBadge>
                  </div>
                  {!approved && (
                    <InterfaceIcon
                      name={isExpanded ? "back" : "next"}
                      size={14}
                      className="shrink-0 text-[color:var(--workspace-danger)] opacity-60"
                    />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="flex items-start gap-2.5 border-t border-[color:var(--workspace-danger-edge)] bg-[color:var(--workspace-danger-bg)] px-3 pb-3 pt-2.5">
                  <InterfaceIcon
                    name="lock"
                    size={13}
                    className="mt-0.5 shrink-0 text-[color:var(--workspace-danger)]"
                  />
                  <p className="type-caption text-[color:var(--workspace-danger)]">
                    <span className="font-semibold">MCC {tx.mcc} ({tx.mccLabel})</span> is not
                    on the approved category list for {tx.crn}. This card is restricted to
                    authorized merchant categories only. The charge was automatically declined
                    and logged.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </PanelBody>
    </WorkspacePanel>
  );
}
