"use client";

import * as React from "react";

import { BrandIcon } from "@/components/ui/brand-icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { IconChip } from "@/components/ui/icon-chip";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";

// Web3Forms delivers submissions by email with no backend and no account.
// The access key is meant to be public (client-side); it only routes mail to
// the verified inbox. Host-agnostic: works on Netlify, Vercel, or drag-drop.
const WEB3FORMS_ACCESS_KEY = "4c525658-ddda-46ff-b53e-d880a941a8d6";

type Status = "idle" | "submitting" | "error";

// /residents and /vendors link here as /contact?from=<page>, so the inbox can
// tell who wrote in and the second field asks the right question.
const senders = {
  town: {
    subject: "New Civic-Chain onboarding inquiry",
    orgLabel: "Town or agency",
    orgHint: "Town, school district, or county office",
  },
  residents: {
    subject: "Civic-Chain question from a resident",
    orgLabel: "Your town",
    orgHint: "The town you live in",
  },
  vendors: {
    subject: "Civic-Chain question from a vendor",
    orgLabel: "Your company",
    orgHint: "Business name",
  },
} as const;

type Sender = keyof typeof senders;

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [sent, setSent] = React.useState(false);
  const [sender, setSender] = React.useState<Sender>("town");
  const copy = senders[sender];

  // Static export: the query string only exists in the browser.
  React.useEffect(() => {
    const from = new URLSearchParams(window.location.search).get("from");
    if (from === "residents" || from === "vendors") setSender(from);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");

    const payload = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        form.reset();
        setStatus("idle");
        setSent(true);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="grid w-full gap-4 text-left">
        <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
        <input type="hidden" name="subject" value={copy.subject} />
        <input type="hidden" name="from_name" value="Civic-Chain contact form" />
        {/* Honeypot: real people never check this; bots do. */}
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <Field>
          <FieldLabel htmlFor="contact-name">Your name</FieldLabel>
          <Input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            placeholder="First and last name"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="contact-org">{copy.orgLabel}</FieldLabel>
          <Input
            id="contact-org"
            name="town_or_agency"
            required
            autoComplete="organization"
            placeholder={copy.orgHint}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="contact-email">Email</FieldLabel>
          <Input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Where we should reply"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="contact-details">Tell us about your request</FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              id="contact-details"
              name="details"
              rows={5}
              required
              placeholder="Share any details that will help us prepare."
            />
          </InputGroup>
          <FieldDescription>
            Population served, current pain points, goals, timelines, or specific
            questions. The more context, the better our first response.
          </FieldDescription>
        </Field>

        <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
          <BrandIcon name="conversation" strokeWidth={1.35} />
          <span>{status === "submitting" ? "Sending…" : "Send to the team"}</span>
        </Button>

        {status === "error" ? (
          <p role="alert" className="type-body-sm text-gold-800">
            Something went wrong sending your message. Please try again in a moment.
          </p>
        ) : null}
      </form>

      <Dialog open={sent} onOpenChange={setSent}>
        <DialogContent className="max-w-md">
          <div className="grid justify-items-center gap-4 pt-2 text-center">
            <IconChip name="check-circle" tone="sage" variant="tile" size="lg" />
            <DialogTitle className="type-heading">Message sent.</DialogTitle>
            <DialogDescription className="max-w-sm type-body text-[color:var(--muted-foreground)]">
              Thanks for reaching out. The Civic-Chain team will follow up at the
              email you gave us. Everything you send stays direct and private.
            </DialogDescription>
            <Button size="lg" className="mt-2 w-full" onClick={() => setSent(false)}>
              <BrandIcon name="trust" size={16} strokeWidth={1.1} />
              <span>Done</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
