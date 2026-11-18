"use client";

import Link from "next/link";
import { type FormEvent, type ReactNode, useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SurfaceCard } from "@/components/ui/surface-card";

type PasswordGateProps = {
  children: ReactNode;
  password: string;
};

export function PasswordGate({
  children,
  password,
}: PasswordGateProps) {
  const [value, setValue] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (value.trim() === password) {
      setError("");
      setIsUnlocked(true);

      return;
    }

    setError("That access code did not match. Please try again.");
  }

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <main className="mx-auto grid max-w-xl px-6 py-16 sm:py-24">
      <SurfaceCard
        tone="cream"
        className="border-2 border-b-8 border-gold-200 border-b-gold-600 p-6 sm:p-8"
      >
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Link
              href="/resources"
              className="captions text-gold-600 transition-opacity hover:opacity-75"
            >
              Back to Resources
            </Link>
            <div className="grid gap-2">
              <h2 className="body-xl text-foreground">
                Protected article
              </h2>
              <p className="body-sm text-slate-500">
                Enter the access code shared with you to view this resource.
              </p>
            </div>
          </div>

          <form className="grid gap-4" onSubmit={handleSubmit}>
            <Field data-invalid={error ? "true" : undefined}>
              <FieldLabel htmlFor="article-access-code">
                Access code
              </FieldLabel>
              <Input
                id="article-access-code"
                autoComplete="current-password"
                inputMode="numeric"
                pattern="[0-9]*"
                type="password"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                  setError("");
                }}
              />
              {error ? <FieldError>{error}</FieldError> : null}
            </Field>

            <Button type="submit" className="justify-self-start">
              Unlock article
            </Button>
          </form>
        </div>
      </SurfaceCard>
    </main>
  );
}
