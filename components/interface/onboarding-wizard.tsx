"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { InterfaceIcon } from "./interface-icons";
import {
  WorkspacePanel,
  PanelBody,
  PanelDescription,
  PanelHeader,
  PanelTitle,
} from "./panel";

export const WIZARD_STEPS = [
  {
    id: "kyb",
    title: "KYB & Account Creation",
    phase: "Phase 2",
    sectionId: "overview",
    body: "Your municipality is registered as an independent Unit corporate customer. CivicChain submits your EIN, legal entity name, and authorized signatory for KYB verification. Upon approval, a Municipal Treasury Account (MTA) is provisioned — funds are legally held in your name, not CivicChain's.",
    action: "Confirm account status and user roles in the Overview.",
  },
  {
    id: "treasury",
    title: "Approval Thresholds & Treasury Config",
    phase: "Phase 3",
    sectionId: "settings",
    body: "Authorize an ACH pull to fund the MTA. Set your single-approval limit (default $5,000) and dual-approval threshold requiring Town Administrator and Finance Director sign-off. No auto-refill is ever enabled — every fund movement requires an explicit approval checkpoint.",
    action: "Configure approval routing and notification rules in Settings.",
  },
  {
    id: "solicitation",
    title: "First Solicitation",
    phase: "Phase 4",
    sectionId: "solicitations",
    body: "Create your first solicitation to generate a Contract Reference Number (CRN). Select the service category — Snow/Ice Removal, Road Maintenance, etc. The platform auto-populates MCC lock defaults for that contract type and routes vendor invites via email.",
    action: "Review the active solicitation in the Proposal Pipeline.",
  },
  {
    id: "sar",
    title: "Vendor AML & SAR Creation",
    phase: "Phase 5",
    sectionId: "contracts",
    body: "The winning vendor is screened by Unit's OFAC/AML system before any payment can proceed. Once cleared, activating the contract creates a Service Agreement Record (SAR) anchored immutably on the Public Ledger with a SHA-256 audit hash linking the contract document to the ledger entry.",
    action: "Review active Service Agreement Records in the Contracts table.",
  },
  {
    id: "cards",
    title: "Card Provisioning",
    phase: "Phase 5",
    sectionId: "cards",
    body: "Three card tiers are issued per contract: Company (master), Individual (named worker), and Equipment (vehicle). Cards provision directly into Apple Pay / Google Pay on each worker's phone. Every tap hits CivicChain's auth webhook — MCC locks, pool balance, and velocity limits are checked in under 500ms.",
    action: "Monitor live card activity in the Card Activity feed.",
  },
  {
    id: "refill",
    title: "Balance Management",
    phase: "Phase 6",
    sectionId: "refill",
    body: "When a card pool runs low, a Refill Request is generated automatically and routed to the admin console. The administrator approves a specific amount capped at the remaining unallocated contract value. There is no automatic transfer — this approval checkpoint is the core accountability mechanism.",
    action: "Review the pending refill request in the Refill Queue.",
  },
  {
    id: "wcr",
    title: "Payment Authorization (WCR)",
    phase: "Phase 6",
    sectionId: "payment-auth",
    body: "Vendors submit Work Completion Records (WCRs) to trigger residual payment. Review the claimed amount, supporting documentation, and work narrative. Approving releases an ACH payment to the vendor and writes a blockchain memo with a SHA-256 audit hash linking the WCR to the payment record.",
    action: "Review the pending WCR in the Payment Authorization panel.",
  },
  {
    id: "golive",
    title: "Reports & Go-Live",
    phase: "Phases 8–9",
    sectionId: "reports",
    body: "Before go-live, confirm: MTA funded, vendor AML cleared, SAR anchored on blockchain, cards provisioned and enrolled in Apple/Google Pay, and approval routing configured. Once all items are checked, the first live card tap triggers the full 7-stage payment flow. Weekly spend digests and audit packets generate automatically.",
    action: "Export your first council summary or treasury digest from Reports.",
  },
] as const;

export type WizardStepData = (typeof WIZARD_STEPS)[number];

type OnboardingWizardProps = {
  activeStep: number | null;
  completedSteps: readonly number[];
  onBegin: () => void;
  onStepClick: (index: number) => void;
  onComplete: (index: number) => void;
  onReset: () => void;
};

export function OnboardingWizard({
  activeStep,
  completedSteps,
  onBegin,
  onStepClick,
  onComplete,
  onReset,
}: OnboardingWizardProps) {
  const total = WIZARD_STEPS.length;
  const done = completedSteps.length;
  const allDone = done === total;
  const started = activeStep !== null || done > 0;

  return (
    <WorkspacePanel elevated>
      <PanelHeader>
        <div className="grid gap-1.5">
          <div className="flex items-center gap-2">
            <InterfaceIcon name="task" size={16} className="text-[color:var(--accent)]" />
            <PanelTitle>Onboarding Wizard</PanelTitle>
          </div>
          <PanelDescription>
            {allDone
              ? "All steps complete — ready to go live."
              : started
              ? `${done} of ${total} steps complete`
              : "8 steps from KYB verification to your first live card tap."}
          </PanelDescription>
        </div>
        {started && !allDone && (
          <Button
            variant="ghost"
            onClick={onReset}
            className="type-caption h-auto shrink-0 px-2 py-1 text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
          >
            Reset
          </Button>
        )}
      </PanelHeader>

      <PanelBody className="grid gap-4">
        {started && (
          <Progress
            value={(done / total) * 100}
            className="h-1 bg-[color:var(--workspace-surface)]"
            indicatorClassName="bg-[color:var(--workspace-success)] transition-all duration-500"
          />
        )}

        {/* Welcome / pre-start state */}
        {!started && (
          <div className="grid gap-4">
            <p className="type-body-sm text-[color:var(--muted-foreground)]">
              Walk through each step to bring your municipality live — from identity verification through your first card tap and go-live reporting.
            </p>

            {/* Connected step roadmap */}
            <div className="relative grid">
              <div
                className="pointer-events-none absolute w-px bg-[color:var(--workspace-border)]"
                style={{ left: '9px', top: '18px', bottom: '18px' }}
              />
              {WIZARD_STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center gap-3 py-[5px]">
                  <span className="relative flex size-[18px] shrink-0 items-center justify-center rounded-full border border-[color:var(--workspace-border)] bg-[color:var(--workspace-panel)]">
                    <span className="type-caption leading-none text-[color:var(--muted-foreground)]" style={{ fontSize: '10px' }}>{index + 1}</span>
                  </span>
                  <span className="type-body-sm flex-1 text-[color:var(--muted-foreground)]">{step.title}</span>
                  <span className="type-caption shrink-0 text-[color:var(--muted-foreground)] opacity-40">{step.phase}</span>
                </div>
              ))}
            </div>

            <Button onClick={onBegin} className="w-fit">
              <InterfaceIcon name="task" data-icon="inline-start" size={15} />
              Begin Onboarding
            </Button>
          </div>
        )}

        {/* Active step list */}
        {started && (
          <div className="grid gap-1">
            {WIZARD_STEPS.map((step, index) => {
              const isComplete = completedSteps.includes(index);
              const isActive = activeStep === index;
              return (
                <div
                  key={step.id}
                  className={[
                    "radius-workspace-control flex items-center gap-3 border border-l-2 px-3 py-2.5 transition-colors duration-200",
                    isActive
                      ? "border-[color:var(--workspace-border)] border-l-[color:var(--workspace-info)] bg-[color:var(--workspace-info-bg)]"
                      : isComplete
                      ? "border-[color:var(--workspace-border)] border-l-[color:var(--workspace-success)] bg-[color:var(--workspace-success-bg)]"
                      : "border-[color:var(--workspace-border)] border-l-transparent bg-[color:var(--workspace-surface)]",
                  ].join(" ")}
                >
                  {/* Step indicator */}
                  <div
                    className={[
                      "flex size-6 shrink-0 items-center justify-center rounded-full",
                      isActive
                        ? "bg-[color:var(--workspace-info)] text-white"
                        : isComplete
                        ? "bg-[color:var(--workspace-success)] text-white"
                        : "border border-[color:var(--workspace-border)] bg-[color:var(--workspace-panel)] text-[color:var(--muted-foreground)]",
                    ].join(" ")}
                  >
                    {isComplete ? (
                      <InterfaceIcon name="check" size={12} />
                    ) : (
                      <span className="type-caption font-semibold leading-none">{index + 1}</span>
                    )}
                  </div>

                  {/* Title */}
                  <p
                    className={[
                      "type-body-sm flex-1 font-medium truncate",
                      isComplete
                        ? "text-[color:var(--workspace-success)]"
                        : isActive
                        ? "text-[color:var(--workspace-info)]"
                        : "text-[color:var(--foreground)]",
                    ].join(" ")}
                  >
                    {step.title}
                  </p>

                  {/* Right action */}
                  {isComplete ? (
                    <InterfaceIcon name="check" size={13} className="shrink-0 text-[color:var(--workspace-success)]" />
                  ) : isActive ? (
                    <span className="type-caption shrink-0 text-[color:var(--workspace-info)] opacity-80">Active</span>
                  ) : (
                    <Button
                      variant="ghost"
                      className="type-caption h-auto shrink-0 p-0 text-[color:var(--accent)] hover:bg-transparent hover:opacity-70"
                      onClick={() => onStepClick(index)}
                    >
                      Go
                      <InterfaceIcon name="next" size={11} className="ml-0.5" />
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Completion banner */}
        {allDone && (
          <div className="flex items-center gap-3 rounded-lg border border-[color:var(--workspace-success-edge)] bg-[color:var(--workspace-success-bg)] px-3 py-2.5">
            <InterfaceIcon name="check" size={16} className="shrink-0 text-[color:var(--workspace-success)]" />
            <p className="type-body-sm font-medium text-[color:var(--workspace-success)]">
              All 8 steps complete — ready to go live on Civic-Chain.
            </p>
          </div>
        )}
      </PanelBody>
    </WorkspacePanel>
  );
}

type WizardCalloutProps = {
  stepIndex: number;
  activeStep: number | null;
  completedSteps: readonly number[];
  onComplete: (index: number) => void;
  className?: string;
};

export function WizardCallout({
  stepIndex,
  activeStep,
  completedSteps,
  onComplete,
  className,
}: WizardCalloutProps) {
  if (activeStep !== stepIndex || completedSteps.includes(stepIndex)) return null;

  const step = WIZARD_STEPS[stepIndex];

  return (
    <div
      className={[
        "grid gap-3 rounded-lg border border-[color:var(--workspace-info-edge)] bg-[color:var(--workspace-info-bg)] p-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--workspace-info)]">
            <span className="type-caption font-semibold leading-none text-white">{stepIndex + 1}</span>
          </div>
          <div className="grid gap-0.5">
            <p className="type-body-sm font-semibold text-[color:var(--workspace-info)]">
              {step.title}
            </p>
            <p className="type-caption text-[color:var(--workspace-info)] opacity-70">{step.phase}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={() => onComplete(stepIndex)}
          className="h-auto shrink-0 gap-1.5 rounded-full border border-[color:var(--workspace-info-edge)] px-3 py-1.5 transition-opacity hover:bg-transparent hover:opacity-70"
        >
          <span className="type-caption font-medium text-[color:var(--workspace-info)]">Mark complete</span>
          <InterfaceIcon name="check" size={13} className="text-[color:var(--workspace-info)]" />
        </Button>
      </div>
      <p className="type-body-sm text-[color:var(--workspace-info)] opacity-80">{step.body}</p>
      <div className="border-l-2 border-[color:var(--workspace-info)] pl-3">
        <p className="type-caption font-semibold text-[color:var(--workspace-info)]">{step.action}</p>
      </div>
    </div>
  );
}
