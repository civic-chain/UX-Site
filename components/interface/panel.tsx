import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function WorkspacePanel({
  className,
  elevated = false,
  ...props
}: ComponentProps<"section"> & {
  elevated?: boolean;
}) {
  return (
    <section
      className={cn(elevated ? "workspace-panel-strong" : "workspace-panel", className)}
      {...props}
    />
  );
}

function PanelHeader({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-wrap items-start justify-between gap-4 px-5 py-5 sm:px-6", className)}
      {...props}
    />
  );
}

function PanelTitle({
  className,
  ...props
}: ComponentProps<"h2">) {
  return <h2 className={cn("type-workspace-section text-[color:var(--foreground)]", className)} {...props} />;
}

function PanelDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return <p className={cn("type-body-sm max-w-[72ch] text-[color:var(--muted-foreground)]", className)} {...props} />;
}

function PanelBody({
  className,
  ...props
}: ComponentProps<"div">) {
  return <div className={cn("px-5 pb-5 sm:px-6 sm:pb-6", className)} {...props} />;
}

export {
  WorkspacePanel,
  PanelBody,
  PanelDescription,
  PanelHeader,
  PanelTitle,
};
