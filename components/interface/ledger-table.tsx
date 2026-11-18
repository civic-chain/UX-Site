"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import type { LedgerTransaction } from "@/lib/interface-types";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { InterfaceIcon } from "./interface-icons";
import { WorkspacePanel, PanelBody, PanelDescription, PanelHeader, PanelTitle } from "./panel";

export function LedgerTable({
  callout,
  description,
  overflowRows,
  rows,
}: {
  callout?: ReactNode;
  description: string;
  overflowRows?: readonly LedgerTransaction[];
  rows: readonly LedgerTransaction[];
}) {
  const [showAll, setShowAll] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const visibleRows = showAll ? [...rows, ...(overflowRows ?? [])] : [...rows];

  function copyHash(id: string, hash: string) {
    navigator.clipboard.writeText(hash).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }

  return (
    <WorkspacePanel>
      <PanelHeader>
        <div className="grid gap-2">
          <PanelTitle>Blockchain Transaction Ledger</PanelTitle>
          <PanelDescription>{description}</PanelDescription>
        </div>
      </PanelHeader>
      <PanelBody className="grid gap-4 px-0 pb-0">
        {callout ? <div className="px-5 sm:px-6">{callout}</div> : null}
        <div className="grid gap-3 px-5 sm:hidden">
          {visibleRows.map((row, index) => (
            <article
              key={row.id}
              className="radius-workspace-control grid gap-3 border border-[color:var(--workspace-border)] bg-[color:var(--workspace-surface)] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="grid gap-1">
                  <p className="type-caption text-[color:var(--muted-foreground)]">
                    Entry {visibleRows.length - index}
                  </p>
                  <p className="type-body-sm font-medium text-[color:var(--foreground)]">
                    {row.type}
                  </p>
                </div>
                <a
                  href="#ledger"
                  className="type-body-sm inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[color:var(--workspace-border)] px-4 text-[color:var(--accent)] transition-colors hover:text-[color:var(--workspace-link-hover)]"
                >
                  View
                  <InterfaceIcon name="next" size={16} />
                </a>
              </div>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="type-caption text-[color:var(--muted-foreground)]">Ledger Hash</p>
                    <Button
                      variant="ghost"
                      onClick={() => copyHash(row.id, row.hash)}
                      className="type-caption h-auto shrink-0 p-0 text-[color:var(--accent)] transition-colors hover:bg-transparent hover:text-[color:var(--workspace-link-hover)]"
                    >
                      {copiedId === row.id ? "Copied" : "Copy"}
                    </Button>
                  </div>
                  <p className="type-code break-all text-[color:var(--foreground)]">{row.hash}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-1">
                    <p className="type-caption text-[color:var(--muted-foreground)]">Contract</p>
                    <p className="type-body-sm text-[color:var(--foreground)]">{row.crn}</p>
                  </div>
                  <div className="grid gap-1">
                    <p className="type-caption text-[color:var(--muted-foreground)]">Amount</p>
                    <p className="type-body-sm text-[color:var(--foreground)]">{row.amount}</p>
                  </div>
                </div>
                <p className="type-caption text-[color:var(--muted-foreground)]">{row.timestamp}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="hidden sm:block">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[color:var(--workspace-border)] bg-[color:var(--workspace-table-row-bg)] hover:bg-[color:var(--workspace-table-row-bg)]">
                {["#", "Ledger Hash", "Contract CRN", "Type", "Amount", "Timestamp", "Verify"].map((label) => (
                  <TableHead
                    key={label}
                    className="type-caption px-5 py-3 text-left text-[color:var(--muted-foreground)] first:pl-6 last:pr-6"
                  >
                    {label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleRows.map((row, index) => (
                <TableRow
                  key={row.id}
                  className="border-b border-[color:var(--workspace-border)] hover:bg-[color:var(--workspace-table-row-hover-bg)]"
                >
                  <TableCell className="type-body-sm px-5 py-4 first:pl-6">{visibleRows.length - index}</TableCell>
                  <TableCell className="type-code px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="truncate max-w-[14ch]">{row.hash}</span>
                      <Button
                        variant="ghost"
                        onClick={() => copyHash(row.id, row.hash)}
                        className="type-caption h-auto shrink-0 p-0 text-[color:var(--accent)] transition-colors hover:bg-transparent hover:text-[color:var(--workspace-link-hover)]"
                      >
                        {copiedId === row.id ? "Copied" : "Copy"}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="type-body-sm px-5 py-4">{row.crn}</TableCell>
                  <TableCell className="type-body-sm px-5 py-4">{row.type}</TableCell>
                  <TableCell className="type-body-sm px-5 py-4">{row.amount}</TableCell>
                  <TableCell className="type-body-sm px-5 py-4">{row.timestamp}</TableCell>
                  <TableCell className="px-5 py-4 last:pr-6">
                    <a
                      href="#ledger"
                      className="type-body-sm inline-flex items-center gap-2 text-[color:var(--accent)] transition-colors hover:text-[color:var(--workspace-link-hover)]"
                    >
                      View on Ledger
                      <InterfaceIcon name="next" size={16} />
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {overflowRows && overflowRows.length > 0 ? (
          <div className="flex justify-center px-6 py-5">
            <Button variant="outline" onClick={() => setShowAll((current) => !current)}>
              {showAll ? "Show Fewer" : "Load More"}
            </Button>
          </div>
        ) : null}
      </PanelBody>
    </WorkspacePanel>
  );
}
