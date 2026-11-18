import type { ReactNode } from "react";
import Link from "next/link";

import type { InterfaceNavItem } from "@/lib/interface-types";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "./sidebar";
import { cn } from "@/lib/utils";

import { InterfaceIcon, InterfaceMark } from "./interface-icons";
import { WorkspaceSheetNav, WorkspaceSidebarNav } from "./workspace-nav";

type WorkspaceShellProps = {
  actions?: ReactNode;
  activeNavId?: string;
  backLabel?: string;
  children: ReactNode;
  navItems?: readonly InterfaceNavItem[];
  sidebarFooter?: ReactNode;
  subtitle?: string;
  title: string;
};

export function WorkspaceShell({
  actions,
  activeNavId,
  backLabel = "Portal Home",
  children,
  navItems,
  sidebarFooter,
  subtitle,
  title,
}: WorkspaceShellProps) {
  const nav = navItems ?? [];

  return (
    <div className="workspace-shell">
      <div className="mx-auto flex w-full max-w-[1440px] gap-4 px-4 py-4 lg:px-6">
        {nav.length > 0 ? (
          <Sidebar>
            <SidebarContent>
              <SidebarHeader>
                <div className="flex items-center gap-3">
                  <InterfaceMark />
                  <div className="grid gap-1">
                    <p className="type-title-sm">Civic-Chain</p>
                    <p className="type-caption text-[color:var(--workspace-sidebar-muted)]">
                      Transparent Municipal Services
                    </p>
                  </div>
                </div>
              </SidebarHeader>
              <WorkspaceSidebarNav activeNavId={activeNavId} items={nav} />

              <SidebarFooter>
                {sidebarFooter}
                {process.env.NODE_ENV === "development" ? (
                  <Link
                    href="/dev/components"
                    className="type-caption text-[color:var(--workspace-sidebar-muted)] transition-colors hover:text-[color:var(--foreground)]"
                  >
                    Dev reference →
                  </Link>
                ) : null}
              </SidebarFooter>
            </SidebarContent>
          </Sidebar>
        ) : null}

        <div className="grid min-w-0 flex-1 gap-4">
          <header
            className={cn(
              "workspace-panel-strong workspace-header flex min-h-[var(--workspace-header-height)] flex-wrap items-center justify-between gap-4 bg-[color:var(--workspace-nav-bg-strong)] px-5 py-4 sm:px-6",
            )}
          >
            <div className="grid gap-3">
              <div className="flex items-center gap-3">
                {nav.length > 0 ? (
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden">
                        <InterfaceIcon name="data" data-icon="inline-start" size={18} />
                        Menu
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="max-w-[22rem] bg-[color:var(--workspace-nav-bg-strong)]">
                      <SheetHeader>
                        <SheetTitle>{title}</SheetTitle>
                        <SheetDescription>
                          Jump between workspace sections in the current interface snapshot.
                        </SheetDescription>
                      </SheetHeader>
                      <WorkspaceSheetNav activeNavId={activeNavId} items={nav} />
                    </SheetContent>
                  </Sheet>
                ) : null}

                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href="/">Civic-Chain</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{backLabel}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="grid gap-1">
                <h1 className="type-workspace-display text-[color:var(--foreground)]">
                  {title}
                </h1>
                {subtitle ? (
                  <p className="type-body-sm text-[color:var(--muted-foreground)]">
                    {subtitle}
                  </p>
                ) : null}
              </div>
            </div>
            {actions ? (
              <div className="flex flex-wrap items-center gap-3">
                {actions}
              </div>
            ) : null}
          </header>

          <main className="grid gap-[var(--workspace-grid-gap)]">{children}</main>
        </div>
      </div>
    </div>
  );
}
