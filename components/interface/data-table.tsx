import type { TableColumn, TableRow } from "@/lib/interface-types";
import { cn } from "@/lib/utils";

import { WorkspacePanel, PanelBody, PanelDescription, PanelHeader, PanelTitle } from "./panel";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow as UiTableRow } from "@/components/ui/table";

type DataTableProps = {
  title?: string;
  description?: string;
  columns: readonly TableColumn[];
  rows: readonly TableRow[];
  className?: string;
  emptyState?: string;
};

export function DataTable({
  className,
  columns,
  description,
  emptyState = "No rows available.",
  rows,
  title,
}: DataTableProps) {
  return (
    <WorkspacePanel className={className}>
      {title || description ? (
        <PanelHeader>
          <div className="grid gap-2">
            {title ? <PanelTitle>{title}</PanelTitle> : null}
            {description ? <PanelDescription>{description}</PanelDescription> : null}
          </div>
        </PanelHeader>
      ) : null}
      <PanelBody className="px-0 pb-0">
        <Table>
          <TableHeader>
            <UiTableRow className="border-b border-[color:var(--workspace-border)] bg-[color:var(--workspace-table-row-bg)] hover:bg-[color:var(--workspace-table-row-bg)]">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(
                    "type-caption px-5 py-3 text-[color:var(--muted-foreground)] first:pl-6 last:pr-6",
                    column.align === "right" ? "text-right" : "text-left",
                  )}
                >
                  {column.label}
                </TableHead>
              ))}
            </UiTableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <UiTableRow className="border-0 hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="type-body-sm px-6 py-8 text-[color:var(--muted-foreground)]"
                >
                  {emptyState}
                </TableCell>
              </UiTableRow>
            ) : (
              rows.map((row) => (
                <UiTableRow
                  key={row.id}
                  className="border-b border-[color:var(--workspace-border)] bg-transparent hover:bg-[color:var(--workspace-table-row-hover-bg)]"
                >
                  {columns.map((column) => (
                    <TableCell
                      key={`${row.id}-${column.key}`}
                      className={cn(
                        "type-body-sm px-5 py-4 text-[color:var(--foreground)] first:pl-6 last:pr-6",
                        column.align === "right" ? "text-right" : "text-left",
                      )}
                    >
                      {row[column.key] ?? "—"}
                    </TableCell>
                  ))}
                </UiTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </PanelBody>
    </WorkspacePanel>
  );
}
