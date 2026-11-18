"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";

import type { DemoCredential, InterfaceNavItem } from "@/lib/interface-types";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { InterfaceIcon, InterfaceMark } from "./interface-icons";
import { WorkspaceShell } from "./workspace-shell";

type DemoAuthShellProps = {
  activeNavId: string;
  authTitle: string;
  authSubtitle: string;
  children: ReactNode;
  credentials: readonly DemoCredential[];
  navItems: readonly InterfaceNavItem[];
  signInLabel: string;
  signedInTitle: string;
  signedInSubtitle?: string;
};

export function DemoAuthShell({
  activeNavId,
  authSubtitle,
  authTitle,
  children,
  credentials,
  navItems,
  signInLabel,
  signedInSubtitle,
  signedInTitle,
}: DemoAuthShellProps) {
  const [identifier, setIdentifier] = useState(credentials[0]?.identifier ?? "");
  const [password, setPassword] = useState(credentials[0]?.password ?? "");
  const [isAuthed, setIsAuthed] = useState(false);
  const [error, setError] = useState("");

  const validPairs = useMemo(
    () => new Map(credentials.map((item) => [item.identifier, item.password])),
    [credentials],
  );

  function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (validPairs.get(identifier) === password) {
      setIsAuthed(true);
      setError("");
      return;
    }

    setError("Invalid credentials. Please try again.");
  }

  if (!isAuthed) {
    return (
      <div data-workspace-root className="workspace-shell">
        <div className="mx-auto grid min-h-[100dvh] w-full max-w-[1280px] gap-6 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,var(--workspace-auth-max))] lg:px-6">
          <section className="workspace-panel-strong flex min-h-[28rem] flex-col justify-between gap-6 px-6 py-6 sm:px-8 sm:py-8">
            <div className="grid gap-6">
              <div className="flex items-center gap-4">
                <InterfaceMark />
                <div className="grid gap-1">
                  <p className="type-title">Civic-Chain</p>
                  <p className="type-caption text-[color:var(--muted-foreground)]">
                    Transparent Municipal Services
                  </p>
                </div>
              </div>
              <div className="grid gap-3">
                <p className="type-label text-[color:var(--muted-foreground)]">{authTitle}</p>
                <h1 className="type-workspace-display text-[color:var(--foreground)]">{authSubtitle}</h1>
                <p className="type-body max-w-[56ch] text-[color:var(--muted-foreground)]">
                  Frozen demo snapshot ported into Civic-Chain&apos;s local interface layer. The flow stays faithful to the live reference while the visuals shift into our shared token system.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="radius-workspace-card grid gap-3 bg-[color:var(--workspace-surface-strong)] p-5">
                <div className="flex items-center gap-2">
                  <InterfaceIcon name="check" size={18} />
                  <p className="type-body-sm font-medium text-[color:var(--foreground)]">Demo Credentials</p>
                </div>
                <div className="grid gap-3">
                  {credentials.map((item) => (
                    <div
                      key={item.label}
                      className="radius-workspace-control grid gap-1 border border-[color:var(--workspace-border)] bg-[color:var(--workspace-panel)] px-4 py-3"
                    >
                      <p className="type-caption text-[color:var(--muted-foreground)]">{item.label}</p>
                      <p className="type-body-sm text-[color:var(--foreground)]">
                        {item.identifier}
                        {" / "}
                        <span className="type-code">{item.password}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <Link href="/">
                    <InterfaceIcon name="back" data-icon="inline-start" size={18} />
                    Back to Portal Home
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          <section className="workspace-panel grid content-start gap-5 px-6 py-6 sm:px-7 sm:py-7">
            <div className="grid gap-2">
              <p className="type-label text-[color:var(--muted-foreground)]">Secure Demo Sign-In</p>
              <h2 className="type-title text-[color:var(--foreground)]">{signInLabel}</h2>
              <p className="type-body-sm text-[color:var(--muted-foreground)]">
                Public demo credentials stay visible in this first-pass port so the routes remain fully reviewable without backend wiring.
              </p>
            </div>

            <form className="grid gap-4" onSubmit={handleSignIn}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="identifier">{credentials[0]?.identifierLabel ?? "Identifier"}</FieldLabel>
                  <Input
                    id="identifier"
                    placeholder={credentials[0]?.identifier}
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  {error ? <FieldError>{error}</FieldError> : null}
                  <FieldDescription>Use one of the visible demo pairs to enter the preserved app state.</FieldDescription>
                </Field>
              </FieldGroup>

              <Button type="submit" className="w-full">
                {signInLabel}
              </Button>
            </form>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div data-workspace-root>
      <WorkspaceShell
        activeNavId={activeNavId}
        navItems={navItems}
        title={signedInTitle}
        subtitle={signedInSubtitle}
        actions={
          <Button type="button" variant="outline" onClick={() => setIsAuthed(false)}>
            <InterfaceIcon name="lock" data-icon="inline-start" size={18} />
            Sign Out
          </Button>
        }
        sidebarFooter={
          <div className="radius-workspace-card grid gap-2 bg-[color:var(--workspace-surface)] p-4">
            <p className="type-caption text-[color:var(--workspace-sidebar-muted)]">Demo Mode</p>
            <p className="type-body-sm text-[color:var(--workspace-sidebar-foreground)]">
              Local static port with preserved credentials and working UI state transitions.
            </p>
          </div>
        }
      >
        {children}
      </WorkspaceShell>
    </div>
  );
}

// ── DemoAuthGate ──────────────────────────────────────────────────────────────
// Same login screen as DemoAuthShell but renders children directly on auth,
// with no WorkspaceShell wrapper. Used by pages that manage their own layout.
// children receives onSignOut so the page can place the sign-out button itself.

type DemoAuthGateProps = {
  authTitle: string;
  authSubtitle: string;
  credentials: readonly DemoCredential[];
  signInLabel: string;
  children: (props: { onSignOut: () => void }) => ReactNode;
};

export function DemoAuthGate({
  authTitle,
  authSubtitle,
  credentials,
  signInLabel,
  children,
}: DemoAuthGateProps) {
  const [identifier, setIdentifier] = useState(credentials[0]?.identifier ?? "");
  const [password, setPassword] = useState(credentials[0]?.password ?? "");
  const [isAuthed, setIsAuthed] = useState(false);
  const [error, setError] = useState("");

  const validPairs = useMemo(
    () => new Map(credentials.map((c) => [c.identifier, c.password])),
    [credentials],
  );

  function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validPairs.get(identifier) === password) {
      setIsAuthed(true);
      setError("");
      return;
    }
    setError("Invalid credentials. Please try again.");
  }

  if (!isAuthed) {
    return (
      <div data-workspace-root className="workspace-shell">
        <div className="mx-auto grid min-h-[100dvh] w-full max-w-[1280px] gap-6 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,var(--workspace-auth-max))] lg:px-6">
          <section className="workspace-panel-strong flex min-h-[28rem] flex-col justify-between gap-6 px-6 py-6 sm:px-8 sm:py-8">
            <div className="grid gap-6">
              <div className="flex items-center gap-4">
                <InterfaceMark />
                <div className="grid gap-1">
                  <p className="type-title">Civic-Chain</p>
                  <p className="type-caption text-[color:var(--muted-foreground)]">
                    Transparent Municipal Services
                  </p>
                </div>
              </div>
              <div className="grid gap-3">
                <p className="type-label text-[color:var(--muted-foreground)]">{authTitle}</p>
                <h1 className="type-workspace-display text-[color:var(--foreground)]">{authSubtitle}</h1>
                <p className="type-body max-w-[56ch] text-[color:var(--muted-foreground)]">
                  Frozen demo snapshot ported into Civic-Chain&apos;s local interface layer. The flow stays faithful to the live reference while the visuals shift into our shared token system.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="radius-workspace-card grid gap-3 bg-[color:var(--workspace-surface-strong)] p-5">
                <div className="flex items-center gap-2">
                  <InterfaceIcon name="check" size={18} />
                  <p className="type-body-sm font-medium text-[color:var(--foreground)]">Demo Credentials</p>
                </div>
                <div className="grid gap-3">
                  {credentials.map((item) => (
                    <div
                      key={item.label}
                      className="radius-workspace-control grid gap-1 border border-[color:var(--workspace-border)] bg-[color:var(--workspace-panel)] px-4 py-3"
                    >
                      <p className="type-caption text-[color:var(--muted-foreground)]">{item.label}</p>
                      <p className="type-body-sm text-[color:var(--foreground)]">
                        {item.identifier}
                        {" / "}
                        <span className="type-code">{item.password}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <Link href="/">
                    <InterfaceIcon name="back" data-icon="inline-start" size={18} />
                    Back to Portal Home
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          <section className="workspace-panel grid content-start gap-5 px-6 py-6 sm:px-7 sm:py-7">
            <div className="grid gap-2">
              <p className="type-label text-[color:var(--muted-foreground)]">Secure Demo Sign-In</p>
              <h2 className="type-title text-[color:var(--foreground)]">{signInLabel}</h2>
              <p className="type-body-sm text-[color:var(--muted-foreground)]">
                Public demo credentials stay visible in this first-pass port so the routes remain fully reviewable without backend wiring.
              </p>
            </div>

            <form className="grid gap-4" onSubmit={handleSignIn}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="identifier">{credentials[0]?.identifierLabel ?? "Identifier"}</FieldLabel>
                  <Input
                    id="identifier"
                    placeholder={credentials[0]?.identifier}
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  {error ? <FieldError>{error}</FieldError> : null}
                  <FieldDescription>Use one of the visible demo pairs to enter the preserved app state.</FieldDescription>
                </Field>
              </FieldGroup>

              <Button type="submit" className="w-full">
                {signInLabel}
              </Button>
            </form>
          </section>
        </div>
      </div>
    );
  }

  return <>{children({ onSignOut: () => setIsAuthed(false) })}</>;
}

// ── PasswordGate ──────────────────────────────────────────────────────────────
// Simple password-only gate with no credentials shown. Used for pages that
// need a private access code rather than a public demo sign-in.

type PasswordGateProps = {
  password: string;
  label?: string;
  children: (props: { onSignOut: () => void }) => ReactNode;
};

export function PasswordGate({ password, label = "Onboarding Wizard", children }: PasswordGateProps) {
  const [value, setValue] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (value === password) {
      setIsAuthed(true);
      setError("");
      return;
    }
    setError("Incorrect password.");
    setValue("");
  }

  if (!isAuthed) {
    return (
      <div data-workspace-root className="workspace-shell">
        <div className="mx-auto grid min-h-[100dvh] w-full max-w-[480px] content-center px-4 py-12">
          <div className="workspace-panel grid gap-6 px-6 py-8 sm:px-8">
            <div className="flex items-center gap-3">
              <InterfaceMark />
              <div className="grid gap-0.5">
                <p className="type-title-sm text-[color:var(--foreground)]">Civic-Chain</p>
                <p className="type-caption text-[color:var(--muted-foreground)]">{label}</p>
              </div>
            </div>

            <div className="grid gap-1.5">
              <h1 className="type-title text-[color:var(--foreground)]">Access Required</h1>
              <p className="type-body-sm text-[color:var(--muted-foreground)]">
                Enter the access code to continue.
              </p>
            </div>

            <form className="grid gap-4" onSubmit={handleSubmit}>
              <Field>
                <FieldLabel htmlFor="access-code">Access Code</FieldLabel>
                <Input
                  id="access-code"
                  type="password"
                  placeholder="••••••••"
                  value={value}
                  autoComplete="off"
                  onChange={(event) => setValue(event.target.value)}
                />
                {error ? <FieldError>{error}</FieldError> : null}
              </Field>
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </form>

            <div className="flex justify-center">
              <Button asChild variant="outline" className="text-sm">
                <Link href="/admin">
                  <InterfaceIcon name="back" data-icon="inline-start" size={16} />
                  Back to Admin Console
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children({ onSignOut: () => setIsAuthed(false) })}</>;
}
