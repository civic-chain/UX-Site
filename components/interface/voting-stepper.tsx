"use client";

import { useEffect, useState } from "react";

import type { VoteProposal } from "@/lib/interface-types";
import { BannerFlag } from "@/components/ui/banner-flag";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { InterfaceIcon } from "./interface-icons";
import { WorkspacePanel, PanelBody, PanelDescription, PanelHeader, PanelTitle } from "./panel";
import { StatusBadge } from "./status-badge";

function Tip({ children, tip }: { children: React.ReactNode; tip: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="cursor-help underline decoration-dotted decoration-[color:var(--muted-foreground)] underline-offset-2">
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p className="type-caption text-[color:var(--foreground)]">{tip}</p>
      </TooltipContent>
    </Tooltip>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

type VotingStepperProps = {
  proposalOptions: readonly VoteProposal[];
  solicitationLabel: string;
};

// ── Geo scan data (simulated, matches patent scoring model) ───────────────────

const GEO_SIGNALS = [
  {
    id: "gps",
    label: "GPS Signal",
    tip: "Your device's location, accurate to within a few meters. Confirms you're physically inside the voting boundary.",
    icon: "location" as const,
    value: "43.9060° N, 70.1129° W",
    detail: "Accuracy: 12 m · Satellite lock",
    result: "Inside boundary",
    tone: "success" as const,
    points: "+5 pts",
    pointsBreakdown: "GPS boundary INSIDE (+3) · accuracy ≤ 50 m (+2)",
  },
  {
    id: "ip",
    label: "IP Geolocation",
    tip: "Your internet connection's approximate location. Cross-checked against GPS to confirm consistency.",
    icon: "map" as const,
    value: "Scarborough, ME · Residential ISP",
    detail: "0.3 km from GPS signal",
    result: "Inside boundary",
    tone: "success" as const,
    points: "+3 pts",
    pointsBreakdown: "IP boundary INSIDE, residential (+2) · GPS/IP consistent (+1)",
  },
  {
    id: "enrollment",
    label: "Enrollment Address",
    tip: "The address on file when you registered to vote. Verified against your device's current location.",
    icon: "ledger" as const,
    value: "14 Mountain Road, Any Town, ME",
    detail: "0.8 km from device · In jurisdiction",
    result: "Proximate",
    tone: "success" as const,
    points: "+3 pts",
    pointsBreakdown: "Enrollment proximity ≤ 5 km (+2) · Address in jurisdiction (+1)",
  },
];

const CHAIN_HASH = "a7f3d0c2b8e1940f";
const LEDGER_TX = "C4E9B2F1A3D07856";
const BALLOT_TOKEN = "BLT-2026-04-0039";

// ── Geo scan step ─────────────────────────────────────────────────────────────

function GeoScanStep({ onComplete }: { onComplete: () => void }) {
  const [scanned, setScanned] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(tick);
          setScanned(true);
          onComplete();
          return 100;
        }
        return p + 5;
      });
    }, 60);
    return () => clearInterval(tick);
  }, [onComplete]);

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <h3 className="type-title text-[color:var(--foreground)]">Step 2 of 5: Geolocation Verification</h3>
        <p className="type-body-sm text-[color:var(--muted-foreground)]">
          Three independent signals are checked simultaneously against the Any Town boundary polygon. Each signal contributes to a confidence score that gates ballot access.
        </p>
      </div>

      {!scanned && (
        <div className="radius-workspace-card border border-[color:var(--workspace-border)] bg-[color:var(--workspace-surface)] p-4 grid gap-3">
          <div className="flex items-center justify-between gap-3">
            <p className="type-body-sm font-medium text-[color:var(--foreground)]">Acquiring signals…</p>
            <p className="type-caption text-[color:var(--muted-foreground)] tabular-nums">{progress}%</p>
          </div>
          <Progress value={progress} className="h-1.5 bg-[color:var(--workspace-muted)]" indicatorClassName="bg-[color:var(--workspace-info)] transition-all duration-75" />
          <div className="grid gap-2">
            {GEO_SIGNALS.map((sig) => (
              <div key={sig.id} className="flex items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full bg-[color:var(--workspace-border)] animate-pulse" />
                <p className="type-caption text-[color:var(--muted-foreground)]">{sig.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {scanned && (
        <div className="grid gap-3">
          {/* Confidence result */}
          <div className="radius-workspace-card overflow-hidden border border-[color:var(--workspace-success)] bg-[color:var(--workspace-success-bg)]">
            <div className="h-1 bg-[color:var(--workspace-success)]" />
            <div className="p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <InterfaceIcon name="shield" size={16} className="text-[color:var(--workspace-success)]" />
                  <p className="type-body-sm font-semibold text-[color:var(--foreground)]">Confidence: <Tip tip="All three location checks passed. HIGH is the top tier — your eligibility is fully confirmed.">HIGH</Tip></p>
                </div>
                <p className="type-caption text-[color:var(--muted-foreground)]">11 of 11 possible points · All signals inside boundary · Ballot access granted</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="type-caption rounded-full border border-[color:var(--workspace-success)] bg-[color:var(--workspace-success-bg)] text-[color:var(--workspace-success)] px-2.5 py-0.5 font-semibold">HIGH</span>
                <p className="type-caption text-[color:var(--muted-foreground)]">Token: {BALLOT_TOKEN}</p>
              </div>
            </div>
          </div>

          {/* Signal rows */}
          <div className="radius-workspace-card border border-[color:var(--workspace-border)] bg-[color:var(--workspace-panel)] divide-y divide-[color:var(--workspace-border)]">
            {GEO_SIGNALS.map((sig) => (
              <div key={sig.id} className="p-4 grid gap-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <InterfaceIcon name={sig.icon} size={14} className="shrink-0 mt-px text-[color:var(--workspace-success)]" />
                    <div>
                      <p className="type-caption font-semibold text-[color:var(--foreground)]"><Tip tip={sig.tip}>{sig.label}</Tip></p>
                      <p className="type-caption text-[color:var(--muted-foreground)]">{sig.value}</p>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="type-caption rounded-full border border-[color:var(--workspace-success)] text-[color:var(--workspace-success)] bg-[color:var(--workspace-success-bg)] px-2 py-0.5 font-semibold">{sig.points}</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 pl-5">
                  <p className="type-caption text-[color:var(--muted-foreground)]">{sig.detail}</p>
                  <p className="type-caption font-medium text-[color:var(--workspace-success)]">● {sig.result}</p>
                </div>
                <p className="type-caption text-[color:var(--muted-foreground)] pl-5 opacity-70">{sig.pointsBreakdown}</p>
              </div>
            ))}
          </div>

          {/* Ledger commitment note */}
          <div className="radius-workspace-control border border-[color:var(--workspace-border)] bg-[color:var(--workspace-surface)] px-3 py-2.5 flex items-start gap-2">
            <InterfaceIcon name="shield" size={12} className="mt-px shrink-0 text-[color:var(--muted-foreground)]" />
            <p className="type-caption text-[color:var(--muted-foreground)]">
              This eligibility determination will be SHA-256 hashed and committed to the Public Ledger alongside your ballot submission. The record is immutable and publicly verifiable.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Chain confirmation step ───────────────────────────────────────────────────

function ChainConfirmationStep({ selected }: { selected: VoteProposal | undefined }) {
  const [copied, setCopied] = useState(false);

  function copyHash() {
    void navigator.clipboard.writeText(CHAIN_HASH);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const AUDIT_STEPS = [
    { label: "Submitted",    detail: "Advisory vote received · March 21, 2026"           },
    { label: "Hashed",       detail: `SHA-256: ${CHAIN_HASH}… · Eligibility + ballot`   },
    { label: "Anchored",     detail: `Ledger · tx ${LEDGER_TX}… · 4 s finality`           },
    { label: "Confirmed",    detail: "Immutable record · Publicly verifiable"            },
  ];

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <h3 className="type-title text-[color:var(--foreground)]">Step 5 of 5: Vote Anchored</h3>
      </div>

      <BannerFlag
        variant="success"
        icon={<InterfaceIcon name="check" size={14} />}
        title="Vote Recorded & Anchored to the Public Ledger"
        description={`Your advisory vote for ${selected?.label ?? "the selected proposal"} has been committed. The voting window closes March 27, 2026. Results will be published on the Civic-Chain Public Ledger.`}
      />

      {/* Summary */}
      <div className="radius-workspace-card border border-[color:var(--workspace-border)] bg-[color:var(--workspace-surface)] divide-y divide-[color:var(--workspace-border)]">
        {([
          { label: "Your vote",       val: selected?.label ?? "—"         },
          { label: "Ballot token",    val: BALLOT_TOKEN                   },
          { label: "Confidence tier", val: "HIGH (11 / 11 pts)"          },
          { label: "Jurisdiction",    val: "Any Town, ME · GPS verified"  },
        ] as { label: string; val: string }[]).map(({ label, val }) => (
          <div key={label} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
            <p className="type-caption text-[color:var(--muted-foreground)] shrink-0">{label}</p>
            <p className="type-caption font-medium text-[color:var(--foreground)] text-right">{val}</p>
          </div>
        ))}
      </div>

      {/* Chain proof */}
      <div className="radius-workspace-card border border-[color:var(--workspace-border)] bg-[color:var(--workspace-panel)]">
        <div className="border-b border-[color:var(--workspace-border)] px-4 py-3">
          <p className="type-caption font-semibold text-[color:var(--foreground)]"><Tip tip="Cryptographic evidence that your vote was recorded exactly as submitted and cannot be changed.">Chain proof</Tip></p>
        </div>
        <div className="divide-y divide-[color:var(--workspace-border)]">
          <div className="flex items-start justify-between gap-4 px-4 py-2.5">
            <p className="type-caption text-[color:var(--muted-foreground)] shrink-0"><Tip tip="A unique digital fingerprint of your vote. If anything changed — even one character — this code would be completely different.">SHA-256</Tip></p>
            <p className="type-caption font-mono font-medium text-[color:var(--workspace-success)] text-right break-all">{CHAIN_HASH}…</p>
          </div>
          <div className="flex items-start justify-between gap-4 px-4 py-2.5">
            <p className="type-caption text-[color:var(--muted-foreground)] shrink-0"><Tip tip="The permanent record ID on the Public Ledger. Anyone can look it up independently — no need to contact the Town.">Ledger tx</Tip></p>
            <p className="type-caption font-mono font-medium text-[color:var(--workspace-info)] text-right break-all">{LEDGER_TX}…</p>
          </div>
          <div className="flex items-baseline justify-between gap-4 px-4 py-2.5">
            <p className="type-caption text-[color:var(--muted-foreground)] shrink-0">Network</p>
            <p className="type-caption font-medium text-[color:var(--foreground)]">Public Ledger · 4 s finality</p>
          </div>
        </div>
        <div className="border-t border-[color:var(--workspace-border)] px-4 py-3 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={copyHash}>
            {copied ? "Copied" : "Copy hash"}
          </Button>
          <p className="type-caption text-[color:var(--muted-foreground)] ml-auto self-center">Verify at Ledger Explorer</p>
        </div>
      </div>

      {/* Audit timeline */}
      <div className="radius-workspace-card border border-[color:var(--workspace-border)] bg-[color:var(--workspace-panel)] p-4">
        <p className="type-caption font-semibold text-[color:var(--foreground)] mb-4">Audit timeline</p>
        <div>
          {AUDIT_STEPS.map(({ label, detail }, i) => (
            <div key={label} className="flex items-start gap-3">
              <div className="flex flex-col items-center shrink-0">
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-[color:var(--workspace-success-bg)] border border-[color:var(--workspace-success)] text-[color:var(--workspace-success)]">
                  <InterfaceIcon name="check" size={10} />
                </span>
                {i < AUDIT_STEPS.length - 1 && <span className="w-px h-5 bg-[color:var(--workspace-border)]" />}
              </div>
              <div className="pb-3">
                <p className="type-caption font-semibold text-[color:var(--foreground)]">{label}</p>
                <p className="type-caption text-[color:var(--muted-foreground)]">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main stepper ──────────────────────────────────────────────────────────────

const STEP_LABELS = [
  "Verify Address",
  "Geolocation",
  "Select Proposal",
  "Review",
  "Anchored",
];

export function VotingStepper({ proposalOptions, solicitationLabel }: VotingStepperProps) {
  const [step, setStep] = useState(1);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("Any Town");
  const [stateZip, setStateZip] = useState("ME 04079");
  const [selectedProposal, setSelectedProposal] = useState(proposalOptions[0]?.id ?? "");
  const [submitted, setSubmitted] = useState(false);
  const [geoComplete, setGeoComplete] = useState(false);

  const selected = proposalOptions.find((p) => p.id === selectedProposal);
  const TOTAL = 5;

  function goNext() {
    if (step === 1 && !street.trim()) return;
    if (step === 3 && !selectedProposal) return;
    if (step === 4) setSubmitted(true);
    if (step < TOTAL) setStep((s) => s + 1);
  }

  function goBack() {
    setSubmitted(false);
    setStep((s) => Math.max(1, s - 1));
  }

  // Step chrome — pills for all 5 steps
  const stepChrome = (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: TOTAL }, (_, i) => i + 1).map((n) => {
        const done = n < step;
        const active = n === step;
        return (
          <div
            key={n}
            className={`type-body-sm flex min-h-9 items-center gap-1.5 rounded-full border px-3 py-1 transition-colors ${
              active
                ? "border-[color:var(--accent)] bg-[color:var(--accent-surface)] text-[color:var(--foreground)]"
                : done
                  ? "border-[color:var(--workspace-success)] bg-[color:var(--workspace-success-bg)] text-[color:var(--workspace-success)]"
                  : "border-[color:var(--workspace-border)] bg-[color:var(--workspace-surface)] text-[color:var(--muted-foreground)]"
            }`}
          >
            {done
              ? <InterfaceIcon name="check" size={12} />
              : <span className="type-caption">{n}</span>
            }
            <span className="type-caption hidden sm:inline">{STEP_LABELS[n - 1]}</span>
          </div>
        );
      })}
    </div>
  );

  // Footer nav
  const footerActions = (
    <div className="flex flex-wrap justify-between gap-3">
      <Button type="button" variant="outline" onClick={goBack} disabled={step === 1 || step === 5}>
        <InterfaceIcon name="back" data-icon="inline-start" size={18} />
        Back
      </Button>
      {step < TOTAL && (
        <Button type="button" onClick={goNext} disabled={step === 2 && !geoComplete}>
          {step === 1 ? "Verify Location" : step === 2 ? "Continue" : step === 4 ? "Submit Vote" : "Next"}
          <InterfaceIcon name={step === 4 ? "vote" : "next"} data-icon="inline-end" size={18} />
        </Button>
      )}
    </div>
  );

  // Step 1: Address
  const step1 = (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <h3 className="type-title text-[color:var(--foreground)]">Step 1 of 5: Resident Verification</h3>
        <p className="type-body-sm text-[color:var(--muted-foreground)]">
          Enter your address. In production, GPS coordinates are acquired from your device and checked against the Any Town boundary polygon alongside this address.
        </p>
      </div>
      <FieldGroup className="grid gap-4 md:grid-cols-2">
        <Field className="md:col-span-2">
          <FieldLabel htmlFor="street-address">Street Address</FieldLabel>
          <Input
            id="street-address"
            placeholder="14 Mountain Road"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <FieldDescription>
            Used for enrollment address cross-validation only. Not stored or shared.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="city">City</FieldLabel>
          <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} />
        </Field>
        <Field>
          <FieldLabel htmlFor="state-zip">State / ZIP</FieldLabel>
          <Input id="state-zip" value={stateZip} onChange={(e) => setStateZip(e.target.value)} />
        </Field>
      </FieldGroup>
    </div>
  );

  // Step 3: Proposal selection
  const step3 = (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <h3 className="type-title text-[color:var(--foreground)]">Step 3 of 5: Select Your Preferred Proposal</h3>
        <p className="type-body-sm text-[color:var(--muted-foreground)]">{solicitationLabel}</p>
      </div>
      <div className="grid gap-3">
        {proposalOptions.map((proposal) => {
          const active = proposal.id === selectedProposal;
          return (
            <Button
              key={proposal.id}
              type="button"
              variant="ghost"
              onClick={() => setSelectedProposal(proposal.id)}
              className={`radius-workspace-card h-auto w-full border p-4 text-left transition-colors ${
                active
                  ? "border-[color:var(--accent)] bg-[color:var(--workspace-step-selected-bg)]"
                  : "border-[color:var(--workspace-border)] bg-[color:var(--workspace-panel)] hover:bg-[color:var(--workspace-surface)]"
              }`}
            >
              <span className="grid w-full gap-3 text-left">
                <span className="flex flex-wrap items-center justify-between gap-3">
                  <span className="grid gap-1">
                    <span className="type-title-sm text-[color:var(--foreground)]">{proposal.label}</span>
                    <span className="type-body-sm text-[color:var(--muted-foreground)]">{proposal.bid}</span>
                  </span>
                  {active && <StatusBadge tone="success">Selected</StatusBadge>}
                </span>
                <span className="grid gap-1">
                  <span className="type-caption text-[color:var(--muted-foreground)]">Timeline</span>
                  <span className="type-body-sm text-[color:var(--foreground)]">{proposal.timeline}</span>
                </span>
                <span className="grid gap-1 sm:grid-cols-2">
                  <span>
                    <span className="type-caption text-[color:var(--muted-foreground)]">Personnel</span>
                    <span className="type-body-sm text-[color:var(--foreground)]"> {proposal.personnel}</span>
                  </span>
                  <span>
                    <span className="type-caption text-[color:var(--muted-foreground)]">Equipment</span>
                    <span className="type-body-sm text-[color:var(--foreground)]"> {proposal.equipment}</span>
                  </span>
                </span>
                <span className="type-body-sm text-[color:var(--muted-foreground)]">Notes: {proposal.notes}</span>
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );

  // Step 4: Review
  const step4 = (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <h3 className="type-title text-[color:var(--foreground)]">Step 4 of 5: Review & Confirm</h3>
        <p className="type-body-sm text-[color:var(--muted-foreground)]">Review your selection and geolocation result before submitting.</p>
      </div>

      {/* Proposal summary */}
      <div className="radius-workspace-card border border-[color:var(--workspace-border)] bg-[color:var(--workspace-surface)] divide-y divide-[color:var(--workspace-border)]">
        {([
          { label: "Solicitation",  val: solicitationLabel         },
          { label: "Your vote",     val: selected?.label ?? "—"    },
          { label: "Bid amount",    val: selected?.bid ?? "—"       },
          { label: "Address",       val: `${street}, ${city}, ${stateZip}` },
        ] as { label: string; val: string }[]).map(({ label, val }) => (
          <div key={label} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
            <p className="type-caption text-[color:var(--muted-foreground)] shrink-0">{label}</p>
            <p className="type-body-sm font-medium text-[color:var(--foreground)] text-right">{val}</p>
          </div>
        ))}
      </div>

      {/* Geolocation result */}
      <div className="radius-workspace-control grid gap-2 bg-[color:var(--workspace-surface-strong)] p-4">
        <div className="flex items-center gap-2">
          <InterfaceIcon name="location" size={16} className="text-[color:var(--workspace-success)]" />
          <p className="type-body-sm font-semibold text-[color:var(--foreground)]">Geolocation Confidence: HIGH</p>
          <span className="ml-auto type-caption rounded-full border border-[color:var(--workspace-success)] bg-[color:var(--workspace-success-bg)] text-[color:var(--workspace-success)] px-2.5 py-0.5 font-semibold">11 / 11 pts</span>
        </div>
        <p className="type-caption text-[color:var(--muted-foreground)]">
          GPS confirmed inside Any Town boundary · IP geolocation consistent · Enrollment address proximate (0.8 km) · Token: {BALLOT_TOKEN}
        </p>
      </div>

      <BannerFlag
        variant="info"
        icon={<InterfaceIcon name="shield" size={14} />}
        title="Your vote will be cryptographically anchored"
        description="Submitting commits a SHA-256 hash of your ballot and eligibility record to the Public Ledger. The record is immutable and verifiable by any citizen."
      />
    </div>
  );

  const stepContent = (
    <>
      {step === 1 && step1}
      {step === 2 && <GeoScanStep key="geo" onComplete={() => setGeoComplete(true)} />}
      {step === 3 && step3}
      {step === 4 && step4}
      {step === 5 && <ChainConfirmationStep selected={selected} />}
      {footerActions}
    </>
  );

  return (
    <TooltipProvider delayDuration={200}>
    <WorkspacePanel elevated>
      <PanelHeader>
        <div className="grid gap-2">
          <PanelTitle>Cast Your Advisory Vote</PanelTitle>
          <PanelDescription>
            Voting closes March 27, 2026 · Any Town residents only · GPS + IP + Enrollment verified
          </PanelDescription>
        </div>
        <StatusBadge tone={step === 5 ? "success" : "info"}>
          {step === 5 ? "Vote Anchored" : `Step ${step} of ${TOTAL}`}
        </StatusBadge>
      </PanelHeader>
      <PanelBody className="grid gap-6">
        {stepChrome}
        {stepContent}
      </PanelBody>
    </WorkspacePanel>
    </TooltipProvider>
  );
}
