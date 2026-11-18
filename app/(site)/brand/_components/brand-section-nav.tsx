"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const brandRoutes = [
  { href: "/brand", label: "Overview" },
  { href: "/brand/color", label: "Color" },
  { href: "/brand/type", label: "Type" },
  { href: "/brand/surface", label: "Surface" },
  { href: "/brand/components", label: "Components" },
  { href: "/brand/examples", label: "Examples" },
  { href: "/brand/big-components", label: "Big components" },
  { href: "/brand/rules", label: "Rules" },
] as const;

export function BrandSectionNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Brand section"
      className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-cream-50 p-1"
    >
      {brandRoutes.map((route) => {
        const isActive = pathname === route.href;

        return (
          <Link
            key={route.href}
            href={route.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex min-h-10 items-center rounded-2xl px-4 py-2 captions text-slate-500 transition-colors hover:bg-cream-200 hover:text-foreground",
              isActive &&
                "bg-foreground text-background hover:bg-foreground hover:text-background",
            )}
          >
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
}
