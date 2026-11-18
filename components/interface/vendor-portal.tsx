"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from "@/components/ui/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import {
  interfaceRouteMeta,
  vendorContract,
  vendorContractMeta,
  vendorCredentials,
  vendorMccLocks,
  vendorNav,
  vendorPaymentHistoryColumns,
  vendorPaymentHistoryRows,
  vendorPendingWcrBadges,
  vendorSchedule,
  vendorTransactions,
  vendorCards,
} from "@/lib/interface-fixtures";

import { BannerFlag } from "@/components/ui/banner-flag";
import { ContractSummaryCard } from "./contract-summary-card";
import { DataTable } from "./data-table";
import { DetailCard, DetailGrid } from "./detail-card";
import { DemoAuthShell } from "./demo-auth-shell";
import { interfaceAnchorClass } from "./interface-anchors";
import { InterfaceIcon } from "./interface-icons";
import {
  WorkspacePanel,
  PanelBody,
  PanelDescription,
  PanelHeader,
  PanelTitle,
} from "./panel";
import { StatusBadge } from "./status-badge";
import { ToastStack, useToasts } from "./toast-stack";

type SubmitState = "idle" | "submitting" | "done";

export function VendorPortalPage() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [formKey, setFormKey] = useState(0);
  const { toasts, addToast, dismiss } = useToasts();

  function handleSubmit() {
    setSubmitState("submitting");
    setTimeout(() => {
      setSubmitState("done");
      addToast(
        "WCR-2026-PLW-0042-011 submitted — awaiting Town of Any Town admin review",
        "success",
      );
    }, 1500);
  }

  function handleClear() {
    setFormKey((k) => k + 1);
  }

  function handleSubmitAnother() {
    setSubmitState("idle");
    setFormKey((k) => k + 1);
  }

  return (
    <>
      <DemoAuthShell
        activeNavId="contracts"
        authTitle={interfaceRouteMeta.vendor.eyebrow}
        authSubtitle={interfaceRouteMeta.vendor.title}
        credentials={vendorCredentials}
        navItems={vendorNav}
        signInLabel={interfaceRouteMeta.vendor.signInLabel}
        signedInTitle={interfaceRouteMeta.vendor.signedInLabel}
        signedInSubtitle="CRN-2026-PLW-0042 · Service Agreement Record (SAR) | Ledger Anchored"
      >
        <ContractSummaryCard contract={vendorContract} />

        <BannerFlag
          variant="success"
          icon={<InterfaceIcon name="shield" size={14} />}
          title="SAR Anchored · Public Ledger"
          description="CRN-2026-PLW-0042 Service Agreement Record is immutably anchored on a public blockchain. All card transactions and WCRs are hash-chained."
        />

        <section className="grid items-start gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <WorkspacePanel id="contracts" className={interfaceAnchorClass}>
            <PanelHeader>
              <div className="grid gap-2">
                <PanelTitle>Contract Details</PanelTitle>
                <PanelDescription>
                  Residual payments are approved by town admin upon WCR submission. Reserve hold is released at final sign-off.
                </PanelDescription>
              </div>
            </PanelHeader>
            <PanelBody className="grid gap-4">
              <DetailGrid
                items={vendorContractMeta.map((item) => ({
                  id: item.label,
                  label: item.label,
                  value: item.value,
                }))}
              />

              <div className="grid gap-3">
                {vendorSchedule.map((item) => (
                  <div
                    key={item.label}
                    className="radius-workspace-control flex flex-wrap items-center justify-between gap-3 border border-[color:var(--workspace-border)] bg-[color:var(--workspace-panel)] p-4"
                  >
                    <div className="grid gap-1">
                      <p className="type-body-sm font-medium text-[color:var(--foreground)]">{item.label}</p>
                      <p className="type-caption text-[color:var(--muted-foreground)]">{item.value}</p>
                    </div>
                    <StatusBadge tone={item.tone}>{item.tone === "success" ? "Paid" : item.tone === "warning" ? "Pending" : "Scheduled"}</StatusBadge>
                  </div>
                ))}
              </div>
            </PanelBody>
          </WorkspacePanel>

          <WorkspacePanel id="cards" className={interfaceAnchorClass}>
            <PanelHeader>
              <div className="grid gap-2">
                <PanelTitle>Authorized Merchant Categories (MCC Locks)</PanelTitle>
                <PanelDescription>
                  Contract-linked cards for CRN-2026-PLW-0042: 7 cards across 3 tiers. Physical backup cards are available where Apple Pay / Google Pay tap is not supported.
                </PanelDescription>
              </div>
            </PanelHeader>
            <PanelBody className="grid gap-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {vendorMccLocks.map((lock) => (
                  <div
                    key={lock}
                    className="radius-workspace-control flex items-center gap-3 bg-[color:var(--workspace-surface)] p-4"
                  >
                    <div className="radius-workspace-control flex size-10 items-center justify-center bg-[color:var(--workspace-info-bg)] text-[color:var(--foreground)]">
                      <InterfaceIcon name="cards" size={18} />
                    </div>
                    <p className="type-body-sm text-[color:var(--foreground)]">{lock}</p>
                  </div>
                ))}
              </div>
              <div className="grid gap-3">
                {vendorCards.map((card) => (
                  <DetailCard key={card.id}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="grid gap-1">
                        <p className="type-caption text-[color:var(--muted-foreground)]">{card.tier}</p>
                        <p className="type-title-sm text-[color:var(--foreground)]">
                          {card.name} · •••• {card.suffix}
                        </p>
                      </div>
                      <StatusBadge tone="success">Available {card.available}</StatusBadge>
                    </div>
                    <DetailGrid
                      className="gap-2"
                      items={[
                        { id: `${card.id}-limit`, label: "Daily Limit", value: card.dailyLimit, valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
                        { id: `${card.id}-txn`, label: "Last Transaction", value: card.lastTransaction, valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
                        { id: `${card.id}-merchant`, label: "Merchant", value: card.merchant, className: "sm:col-span-2", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
                      ]}
                      itemClassName="gap-0.5 bg-transparent p-0"
                    />
                    <div className="flex flex-wrap gap-2">
                      {card.locks.map((lock) => (
                        <StatusBadge key={`${card.id}-${lock}`} tone="info">
                          {lock}
                        </StatusBadge>
                      ))}
                    </div>
                  </DetailCard>
                ))}
              </div>
            </PanelBody>
          </WorkspacePanel>
        </section>

        <section className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <WorkspacePanel id="submit-wcr" className={interfaceAnchorClass}>
            <PanelHeader>
              <div className="grid gap-2">
                <PanelTitle>Submit Work Completion Record</PanelTitle>
                <PanelDescription>
                  WCRs trigger residual payment authorization from the Town of Any Town.
                </PanelDescription>
              </div>
              {submitState === "done" && (
                <StatusBadge tone="success">Submitted</StatusBadge>
              )}
            </PanelHeader>
            <PanelBody className="grid gap-5">
              {submitState === "done" ? (
                <div className="grid gap-4">
                  <div className="radius-workspace-card grid gap-3 border border-[color:var(--workspace-success-edge)] bg-[color:var(--workspace-success-bg)] p-5">
                    <div className="flex items-center gap-3">
                      <InterfaceIcon name="check" size={18} className="shrink-0 text-[color:var(--workspace-success)]" />
                      <p className="type-title-sm text-[color:var(--workspace-success)]">
                        WCR Submitted Successfully
                      </p>
                    </div>
                    <p className="type-body-sm text-[color:var(--muted-foreground)]">
                      WCR-2026-PLW-0042-011 has been transmitted to the Town of Any Town admin console. You will be notified by email when your WCR is reviewed and payment is authorized.
                    </p>
                    <DetailGrid
                      className="gap-2"
                      items={[
                        { id: "wcr-id", label: "WCR ID", value: "WCR-2026-PLW-0042-011", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
                        { id: "contract", label: "Contract", value: "CRN-2026-PLW-0042", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
                        { id: "claimed", label: "Claimed Amount", value: "$4,600.00", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
                        { id: "status", label: "Status", value: "Awaiting Admin Review", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
                      ]}
                      itemClassName="gap-0.5 bg-transparent p-0"
                    />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={handleSubmitAnother}>
                      Submit Another WCR
                    </Button>
                    <Button variant="outline">View Payment History</Button>
                  </div>
                </div>
              ) : (
                <>
                  <FieldGroup key={formKey} className="grid gap-4 md:grid-cols-2">
                    <Field>
                      <FieldLabel>Contract</FieldLabel>
                      <Select defaultValue="plw-0042">
                        <SelectTrigger>
                          <SelectValue placeholder="Select contract" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="plw-0042">CRN-2026-PLW-0042</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field>
                      <FieldLabel>Reporting Period</FieldLabel>
                      <Select defaultValue="week-10">
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week-10">Week 10</SelectItem>
                          <SelectItem value="week-9">Week 9</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field>
                      <FieldLabel>Period Start Date</FieldLabel>
                      <InputGroup>
                        <InputGroupAddon>
                          <InterfaceIcon name="calendar" size={18} />
                        </InputGroupAddon>
                        <InputGroupInput defaultValue="2026-02-24" />
                      </InputGroup>
                    </Field>
                    <Field>
                      <FieldLabel>Period End Date</FieldLabel>
                      <InputGroup>
                        <InputGroupAddon>
                          <InterfaceIcon name="calendar" size={18} />
                        </InputGroupAddon>
                        <InputGroupInput defaultValue="2026-03-01" />
                      </InputGroup>
                    </Field>
                    <Field>
                      <FieldLabel>Routes Completed</FieldLabel>
                      <InputGroup>
                        <InputGroupInput defaultValue="47" />
                      </InputGroup>
                    </Field>
                    <Field>
                      <FieldLabel>Residual Amount Claimed ($)</FieldLabel>
                      <InputGroup>
                        <InputGroupAddon>$</InputGroupAddon>
                        <InputGroupInput defaultValue="4600" />
                      </InputGroup>
                    </Field>
                    <Field className="md:col-span-2">
                      <FieldLabel>Work Description / Notes</FieldLabel>
                      <InputGroup className="min-h-[8.5rem]">
                        <InputGroupTextarea defaultValue="Week 10 Plowing: 47 route completions across Northern Route A. Roads were pre-treated overnight due to refreeze conditions; all card expenditures remained within authorized MCC categories." />
                      </InputGroup>
                    </Field>
                    <Field className="md:col-span-2">
                      <FieldLabel>Supporting Documentation</FieldLabel>
                      <div className="radius-workspace-control grid gap-3 border border-dashed border-[color:var(--workspace-border)] bg-[color:var(--workspace-surface)] p-4">
                        <div className="flex items-center gap-3">
                          <div className="radius-workspace-control flex size-10 items-center justify-center bg-[color:var(--workspace-info-bg)] text-[color:var(--foreground)]">
                            <InterfaceIcon name="upload" size={18} />
                          </div>
                          <div className="grid gap-1">
                            <p className="type-body-sm font-medium text-[color:var(--foreground)]">
                              Click to attach files or drag and drop
                            </p>
                            <p className="type-caption text-[color:var(--muted-foreground)]">
                              Route logs, GPS exports, photos, and equipment service records. PDF, JPG, and PNG formats accepted.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Field>
                    <Field className="md:col-span-2">
                      <div className="radius-workspace-control flex items-start gap-3 bg-[color:var(--workspace-surface)] p-4">
                        <Checkbox checked />
                        <div className="grid gap-1">
                          <FieldLabel>Supervisor Attestation</FieldLabel>
                          <FieldDescription>
                            I, Jamie Morrison, certify that the work described above was completed as stated and that all card expenditures were for authorized contract-related purposes under CRN-2026-PLW-0042.
                          </FieldDescription>
                        </div>
                      </div>
                    </Field>
                  </FieldGroup>

                  <div className="flex flex-wrap gap-3">
                    <Button disabled={submitState === "submitting"} onClick={handleSubmit}>
                      {submitState === "submitting" ? (
                        <>
                          <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          <InterfaceIcon name="upload" data-icon="inline-start" size={18} />
                          Submit WCR for Admin Review
                        </>
                      )}
                    </Button>
                    <Button variant="outline" disabled={submitState === "submitting"} onClick={handleClear}>
                      Clear Form
                    </Button>
                  </div>
                </>
              )}
            </PanelBody>
          </WorkspacePanel>

          <div className="grid gap-4">
            <WorkspacePanel>
              <PanelHeader>
                <div className="grid gap-2">
                  <PanelTitle>Recent Card Activity: All Cards</PanelTitle>
                  <PanelDescription>
                    Card activity syncs in real time. Declines remain visible to town admin.
                  </PanelDescription>
                </div>
              </PanelHeader>
              <PanelBody className="grid gap-3">
                {vendorTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="radius-workspace-control flex flex-wrap items-center justify-between gap-3 border border-[color:var(--workspace-border)] bg-[color:var(--workspace-panel)] p-4"
                  >
                    <div className="grid gap-1">
                      <p className="type-body-sm font-medium text-[color:var(--foreground)]">{transaction.merchant}</p>
                      <p className="type-caption text-[color:var(--muted-foreground)]">{transaction.context}</p>
                    </div>
                    <div className="grid justify-items-end gap-2">
                      <p className="type-body-sm text-[color:var(--foreground)]">{transaction.amount}</p>
                      <StatusBadge tone={transaction.statusTone}>{transaction.status}</StatusBadge>
                    </div>
                  </div>
                ))}
              </PanelBody>
            </WorkspacePanel>

            <WorkspacePanel elevated>
              <PanelHeader>
                <div className="grid gap-2">
                  <PanelTitle>Pending WCR: Submitted</PanelTitle>
                  <PanelDescription>
                    WCR-2026-PLW-0042-010 · Submitted March 13, 2026
                  </PanelDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  {vendorPendingWcrBadges.map((badge) => (
                    <StatusBadge key={badge.label} tone={badge.tone}>{badge.label}</StatusBadge>
                  ))}
                </div>
              </PanelHeader>
              <PanelBody className="grid gap-3">
                <div className="grid gap-1">
                  <p className="type-title-sm text-[color:var(--foreground)]">
                    Week 10 Plowing: 47 Route Completions (Feb 24 to Mar 1, 2026)
                  </p>
                  <p className="type-caption text-[color:var(--muted-foreground)]">
                    Claimed Amount: $4,600.00 · Reserve Held: $230.00 · Net If Approved: $4,370.00
                  </p>
                </div>
                <div className="grid gap-4 border-t border-[color:var(--workspace-border)] pt-4">
                  <p className="type-body-sm text-[color:var(--muted-foreground)]">
                    Your Work Completion Record has been transmitted to the Town of Any Town admin console. You will be notified by email when your WCR is reviewed and payment is authorized.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" onClick={handleSubmitAnother}>Submit Another WCR</Button>
                    <Button>View Payment History</Button>
                  </div>
                </div>
              </PanelBody>
            </WorkspacePanel>

            <WorkspacePanel id="request-refill" className={interfaceAnchorClass}>
              <PanelHeader>
                <div className="grid gap-2">
                  <PanelTitle>Request Refill</PanelTitle>
                  <PanelDescription>
                    Flag a contract when card pool usage is outrunning the approved balance and the town team needs a structured refill request.
                  </PanelDescription>
                </div>
                <StatusBadge tone="warning">Use when burn rate spikes</StatusBadge>
              </PanelHeader>
              <PanelBody className="grid gap-4">
                <DetailCard>
                  <p className="type-title-sm text-[color:var(--foreground)]">
                    CRN-2026-PLW-0042 · Additional salt and fuel reserve
                  </p>
                  <DetailGrid
                    className="gap-2"
                    items={[
                      { id: "balance", label: "Current card pool balance", value: "$8,431.00", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
                      { id: "runway", label: "Projected runway", value: "9 operating days", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
                      { id: "suggested", label: "Suggested refill amount", value: "$3,500.00", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
                      { id: "reason", label: "Reason", value: "late-season weather volatility", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
                    ]}
                    itemClassName="gap-0.5 bg-transparent p-0"
                  />
                </DetailCard>
                <div className="flex flex-wrap gap-3">
                  <Button>
                    <InterfaceIcon name="wallet" data-icon="inline-start" size={18} />
                    Start refill request
                  </Button>
                  <Button variant="outline">Review refill rules</Button>
                </div>
              </PanelBody>
            </WorkspacePanel>
          </div>
        </section>

        <div id="payment-history" className={interfaceAnchorClass}>
          <DataTable
            title="All residual payments and card pool loads for your active contracts"
            description="Payment History"
            columns={vendorPaymentHistoryColumns}
            rows={vendorPaymentHistoryRows}
          />
        </div>
      </DemoAuthShell>

      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </>
  );
}
