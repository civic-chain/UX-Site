import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

function Sidebar({
  className,
  ...props
}: React.ComponentProps<"aside">) {
  return (
    <aside
      className={cn(
        "shadow-workspace-panel radius-workspace-shell sticky top-4 hidden h-[calc(100dvh-2rem)] w-[var(--workspace-sidebar-width)] shrink-0 overflow-hidden border border-[color:var(--workspace-border)] bg-[color:var(--workspace-sidebar-bg)] text-[color:var(--workspace-sidebar-foreground)] lg:flex",
        className,
      )}
      {...props}
    />
  );
}

function SidebarContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-4", className)}
      {...props}
    />
  );
}

function SidebarHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("grid gap-1.5", className)} {...props} />;
}

function SidebarSection({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return <section className={cn("grid gap-2", className)} {...props} />;
}

function SidebarLabel({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("type-label text-[color:var(--workspace-sidebar-muted)]", className)}
      {...props}
    />
  );
}

function SidebarNav({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return <nav className={cn("grid gap-1", className)} {...props} />;
}

type SidebarNavItemProps = {
  active?: boolean;
  icon?: React.ReactNode;
  endSlot?: React.ReactNode;
  href: string;
  className?: string;
  children: React.ReactNode;
};

function SidebarNavItem({
  active,
  className,
  href,
  icon,
  endSlot,
  children,
}: SidebarNavItemProps) {
  return (
    <Link
      className={cn(
        "group flex min-h-11 w-full items-center justify-between gap-3 radius-workspace-control px-3 py-2 text-left type-body-sm font-medium transition-colors",
        active
          ? "bg-[color:var(--workspace-sidebar-active-bg)] text-[color:var(--workspace-sidebar-active-foreground)] shadow-workspace-subtle"
          : "text-[color:var(--workspace-sidebar-foreground)] hover:bg-[color:var(--workspace-sidebar-hover-bg)]",
        className,
      )}
      href={href}
    >
      <span className="flex min-w-0 items-center gap-3">
        {icon}
        <span className="truncate">{children}</span>
      </span>
      {endSlot ? <span className="shrink-0">{endSlot}</span> : null}
    </Link>
  );
}

function SidebarFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mt-auto grid gap-3 border-t border-[color:var(--workspace-sidebar-border)] pt-4",
        className,
      )}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarLabel,
  SidebarNav,
  SidebarNavItem,
  SidebarSection,
};
