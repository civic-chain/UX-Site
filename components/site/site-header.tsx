"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type NavLink = {
  label: string;
  href: string;
  children?: readonly { label: string; href: string }[];
};

const mainNavLinks: readonly NavLink[] = [
  {
    label: "About us",
    href: "/about",
    children: [
      { label: "Team", href: "/about" },
      { label: "News & Media", href: "/news" },
      { label: "Press Kit", href: "/press" },
      { label: "Trust", href: "/trust" },
    ],
  },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Demo", href: "/civic-chain-demo" },
];

export function SiteHeader({ id = "site-header" }: { id?: string } = {}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Desktop nav. Items with children get a hover/focus dropdown (pure CSS, no
  // extra client state): the panel shows on group-hover and group-focus-within,
  // and a pt-2 bridge keeps the hover alive while the cursor crosses the gap.
  const barNav = mainNavLinks.map((link) =>
    link.children ? (
      <div key={link.href} className="group relative">
        <Button asChild variant="ghost" size="lg">
          <Link href={link.href} className="gap-1">
            {link.label}
            <Icon
              name="chevron-down"
              size="sm"
              aria-hidden="true"
              className="transition-transform duration-[var(--dur-fast)] group-hover:rotate-180 group-focus-within:rotate-180"
            />
          </Link>
        </Button>
        <div className="absolute right-0 top-full hidden min-w-56 pt-2 group-hover:block group-focus-within:block">
          <div className="grid gap-1 rounded-2xl border border-border bg-background p-2 shadow-lg">
            {link.children.map((child) => (
              <Button
                key={child.href}
                asChild
                variant="ghost"
                size="md"
                className="w-full justify-start"
              >
                <Link href={child.href}>{child.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <Button key={link.href} asChild variant="ghost" size="lg">
        <Link href={link.href}>{link.label}</Link>
      </Button>
    ),
  );

  // Mobile panel. Children render indented under their parent link.
  const panelNav = mainNavLinks.map((link) => (
    <div key={link.href} className="grid gap-1">
      <Button asChild variant="ghost" size="lg" className="w-full justify-start">
        <Link href={link.href} onClick={close}>
          {link.label}
        </Link>
      </Button>
      {link.children?.map((child) => (
        <Button
          key={child.href}
          asChild
          variant="ghost"
          size="md"
          className="w-full justify-start pl-8 text-slate-500"
        >
          <Link href={child.href} onClick={close}>
            {child.label}
          </Link>
        </Button>
      ))}
    </div>
  ));

  return (
    <header id={id} className="sticky top-0 z-50 border-b border-border bg-background px-6 py-4">
      <div className="mx-auto flex max-w-[var(--page-max)] items-center justify-between gap-4">
        <Link href="/" aria-label="Civic-Chain home" className="shrink-0" onClick={close}>
          <Image
            src="/brand/civic-logo-w-text-horizontal.svg"
            alt="Civic-Chain"
            width={310}
            height={64}
            priority
            className="h-auto w-32 sm:w-44"
          />
        </Link>

        {/* Desktop nav (sm and up) */}
        <div className="hidden items-center gap-3 sm:flex sm:flex-1 sm:justify-end">
          <nav aria-label="Main" className="flex items-center gap-1">
            {barNav}
          </nav>
        </div>

        {/* Mobile hamburger */}
        <Button
          type="button"
          variant="ghost"
          size="md"
          icon={open ? "close" : "menu"}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-nav-panel"
          onClick={() => setOpen((value) => !value)}
          className="sm:hidden"
        />
      </div>

      {/* Mobile menu panel */}
      <div
        id="site-nav-panel"
        className={cn("mx-auto max-w-[var(--page-max)] sm:hidden", open ? "block" : "hidden")}
      >
        <nav aria-label="Main" className="mt-4 grid gap-1 border-t border-border pt-4">
          {panelNav}
        </nav>
      </div>
    </header>
  );
}
