import Link from "next/link";

import type { InterfaceNavItem } from "@/lib/interface-types";
import { buttonVariants } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import {
  SidebarLabel,
  SidebarNav,
  SidebarNavItem,
  SidebarSection,
} from "./sidebar";
import { cn } from "@/lib/utils";

import { InterfaceIcon } from "./interface-icons";

function WorkspaceNavBadge({ badge }: { badge?: string }) {
  if (!badge) {
    return null;
  }

  return (
    <span className="type-workspace-badge rounded-full bg-[color:var(--accent-chip)] px-2 py-0.5 text-[color:var(--foreground)]">
      {badge}
    </span>
  );
}

export function WorkspaceSidebarNav({
  activeNavId,
  items,
}: {
  activeNavId?: string;
  items: readonly InterfaceNavItem[];
}) {
  return (
    <SidebarSection>
      <SidebarLabel>Workspace</SidebarLabel>
      <SidebarNav>
        {items.map((item) => (
          <SidebarNavItem
            key={item.id}
            active={item.id === activeNavId}
            href={item.href}
            icon={<InterfaceIcon name={item.icon} size={18} />}
            endSlot={<WorkspaceNavBadge badge={item.badge} />}
          >
            {item.label}
          </SidebarNavItem>
        ))}
      </SidebarNav>
    </SidebarSection>
  );
}

export function WorkspaceSheetNav({
  activeNavId,
  items,
}: {
  activeNavId?: string;
  items: readonly InterfaceNavItem[];
}) {
  return (
    <div className="grid gap-2 py-4">
      {items.map((item) => (
        <SheetClose key={item.id} asChild>
          <Link
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "radius-workspace-control type-body-sm min-h-11 justify-start px-3 text-left font-medium",
              item.id === activeNavId
                ? "bg-[color:var(--workspace-muted)] text-[color:var(--foreground)]"
                : "text-[color:var(--foreground)] hover:bg-[color:var(--workspace-muted)]",
            )}
          >
            <InterfaceIcon name={item.icon} size={18} />
            {item.label}
            <WorkspaceNavBadge badge={item.badge} />
          </Link>
        </SheetClose>
      ))}
    </div>
  );
}
