"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Client-side access gate for pre-launch / private routes.
//
// Honest scope: this is a SOFT lock. On a static export there is no server to
// check against, so the passphrase lives in the client bundle and a determined
// visitor could bypass it by reading source. It keeps a page out of casual
// view and out of search indexes; for hard protection use the host's
// server-side password protection (e.g. Netlify → Access control). Mirrors the
// existing demo-auth-shell pattern already used in this repo.

export function PasswordGate({
  passphrase,
  title = "This page is private",
  subtitle = "Enter the access passphrase to continue.",
  children,
}: {
  passphrase: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const storageKey = `cc-gate:${passphrase.length}`; // never store the phrase itself
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(storageKey) === "1") setUnlocked(true);
    } catch {
      /* sessionStorage unavailable — stay locked */
    }
    setReady(true);
  }, [storageKey]);

  if (unlocked) return <>{children}</>;

  // Avoid a locked/unlocked flash before we've read sessionStorage.
  if (!ready) return <div className="min-h-screen bg-background" />;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() === passphrase) {
      try {
        sessionStorage.setItem(storageKey, "1");
      } catch {
        /* ignore */
      }
      setUnlocked(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="grid min-h-screen place-content-center bg-background px-6">
      <form onSubmit={submit} className="grid w-full max-w-sm gap-4 rounded-2xl border border-border bg-cream-50 p-8">
        <Image src="/brand/civic-logo-w-text-horizontal.svg" alt="Civic-Chain" width={310} height={64} priority className="h-8 w-auto" />
        <div>
          <h1 className="type-title-sm">{title}</h1>
          <p className="type-caption text-slate-500">{subtitle}</p>
        </div>
        <Input
          type="password"
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="Passphrase"
          aria-label="Access passphrase"
          className={cn(error && "border-red-400")}
        />
        {error && <p className="type-caption text-red-600">That passphrase didn’t match. Try again.</p>}
        <Button type="submit" variant="filled" size="md" fullWidth>Unlock</Button>
      </form>
    </div>
  );
}
