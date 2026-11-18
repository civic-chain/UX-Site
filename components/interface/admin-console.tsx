"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  adminActionMetrics,
  adminContractsColumns,
  adminContractsRows,
  adminNav,
  adminOverviewMetrics,
  adminPaymentBadges,
  adminPipelineFocus,
  adminPipelineStages,
  adminRefillBadges,
  adminRefillRequest,
  adminVotingMonitor,
  interfaceRouteMeta,
} from "@/lib/interface-fixtures";

import { BannerFlag } from "@/components/ui/banner-flag";
import { DataTable } from "./data-table";
import { DetailCard, DetailGrid } from "./detail-card";
import { interfaceAnchorClass } from "./interface-anchors";
import { InterfaceIcon } from "./interface-icons";
import { LiveCardFeed } from "./live-card-feed";
import {
  WorkspacePanel,
  PanelBody,
  PanelDescription,
  PanelHeader,
  PanelTitle,
} from "./panel";
import { StatCard } from "./stat-card";
import { StatusBadge } from "./status-badge";
import { ToastStack, useToasts } from "./toast-stack";
import { WorkspaceShell } from "./workspace-shell";

type RefillState = "pending" | "approved" | "denied";
type WcrState = "pending" | "authorized" | "clarification";

export function AdminConsolePage() {
  const [refillState, setRefillState] = useState<RefillState>("pending");
  const [wcrState, setWcrState] = useState<WcrState>("pending");
  const { toasts, addToast, dismiss } = useToasts();

  return (
    <>
      <div data-workspace-root>
      <WorkspaceShell
        activeNavId="overview"
        navItems={adminNav}
        title={interfaceRouteMeta.admin.signedInLabel}
        subtitle="Dashboard Overview"
      >
        <BannerFlag
          variant="success"
          icon={<InterfaceIcon name="shield" size={14} />}
          title="Chain Healthy · All records anchored"
          description="Municipal Account: Active · 2,331 SAR records on the Public Ledger · Last batch anchor 3 hours ago"
        />

        <section id="overview" className={`grid gap-4 xl:grid-cols-4 ${interfaceAnchorClass}`}>
          {adminOverviewMetrics.map((metric) => (
            <StatCard key={metric.label} metric={metric} />
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {adminActionMetrics.map((metric) => (
            <StatCard key={metric.label} metric={metric} />
          ))}
        </section>

        <section id="solicitations" className={`grid items-start gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] ${interfaceAnchorClass}`}>
          <WorkspacePanel>
            <PanelHeader>
              <div className="grid gap-2">
                <PanelTitle>Proposal pipeline from draft through award and active contract</PanelTitle>
                <PanelDescription>
                  Proposal Comparison: Vendor-Unmasked (Admin View)
                </PanelDescription>
              </div>
            </PanelHeader>
            <PanelBody className="grid gap-5">
              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                {adminPipelineStages.map((stage, index) => (
                  <div
                    key={stage}
                    className={`type-workspace-pill flex min-h-12 items-center justify-center rounded-full border px-3 py-2 text-center ${
                      index === 2
                        ? "border-[color:var(--accent)] bg-[color:var(--accent-surface)] text-[color:var(--foreground)]"
                        : "border-[color:var(--workspace-border)] bg-[color:var(--workspace-surface)] text-[color:var(--muted-foreground)]"
                    }`}
                  >
                    {stage}
                  </div>
                ))}
              </div>

              <div className="radius-workspace-card grid gap-4 border border-[color:var(--workspace-border)] bg-[color:var(--workspace-panel)] p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="grid gap-1.5">
                    <p className="type-label text-[color:var(--muted-foreground)]">{adminPipelineFocus.crn}</p>
                    <h3 className="type-title text-[color:var(--foreground)]">{adminPipelineFocus.title}</h3>
                  </div>
                  <StatusBadge tone="warning">Stage: Under Review</StatusBadge>
                </div>
                <DetailGrid
                  items={[
                    { id: "budget", label: "Budget", value: adminPipelineFocus.budget },
                    { id: "proposals", label: "Proposals", value: adminPipelineFocus.proposals },
                    { id: "opens", label: "Voting Opens", value: adminPipelineFocus.votingOpens },
                    { id: "closes", label: "Voting Closes", value: adminPipelineFocus.votingCloses },
                  ]}
                />
                <p className="type-caption text-[color:var(--muted-foreground)]">
                  Quorum: {adminPipelineFocus.quorum}
                </p>
              </div>
            </PanelBody>
          </WorkspacePanel>

          <WorkspacePanel>
            <PanelHeader>
              <div className="grid gap-2">
                <PanelTitle>Voting Monitor</PanelTitle>
                <PanelDescription>
                  Confidence distribution becomes available when the voting window opens.
                </PanelDescription>
              </div>
            </PanelHeader>
            <PanelBody className="grid gap-3">
              <DetailGrid
                columnsClassName="grid-cols-1"
                items={[
                  { id: "opens", label: "Window Opens", value: adminVotingMonitor.opens },
                  { id: "ballots", label: "Ballots Cast", value: adminVotingMonitor.ballotsCast },
                  { id: "confidence", label: "Confidence Distribution", value: adminVotingMonitor.confidence },
                  { id: "remaining", label: "Time Remaining", value: adminVotingMonitor.timeRemaining },
                  { id: "close", label: "Close", value: adminVotingMonitor.closes },
                ]}
              />
            </PanelBody>
          </WorkspacePanel>
        </section>

        <div id="contracts" className={interfaceAnchorClass}>
          <DataTable
            title="Contract Management"
            description="All active Service Agreement Records (SARs) anchored on the Public Ledger"
            columns={adminContractsColumns}
            rows={adminContractsRows}
          />
        </div>

        <section className="grid items-start gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <LiveCardFeed
            id="cards"
            variant="admin"
            limit={5}
            initialBalance={8431}
            className={interfaceAnchorClass}
          />

          <div className="grid gap-4">
            <WorkspacePanel id="refill" elevated className={interfaceAnchorClass}>
              <PanelHeader>
                <div className="grid gap-2">
                  <PanelTitle>Refill Queue</PanelTitle>
                  <PanelDescription>
                    RFR-2026-001 · Submitted March 12, 2026 · GreenWorks Maine LLC
                  </PanelDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  {refillState === "pending" &&
                    adminRefillBadges.map((badge) => (
                      <StatusBadge key={badge.label} tone={badge.tone}>
                        {badge.label}
                      </StatusBadge>
                    ))}
                  {refillState === "approved" && (
                    <StatusBadge tone="success">Approved · Released</StatusBadge>
                  )}
                  {refillState === "denied" && (
                    <StatusBadge tone="danger">Request Denied</StatusBadge>
                  )}
                </div>
              </PanelHeader>
              <PanelBody className="grid gap-4">
                <DetailCard className="bg-[color:var(--workspace-surface)]">
                  <p className="type-body-sm font-medium text-[color:var(--foreground)]">
                    {adminRefillRequest.contractTitle}
                  </p>
                  <DetailGrid items={adminRefillRequest.details} />
                  <p className="type-body-sm text-[color:var(--muted-foreground)]">
                    {adminRefillRequest.reason}
                  </p>
                </DetailCard>
                <div className="flex flex-wrap gap-3">
                  <Button
                    disabled={refillState !== "pending"}
                    onClick={() => {
                      setRefillState("approved");
                      addToast(
                        "Refill approved — $3,500.00 released to CRN-2026-PLW-0042 card pool",
                        "success",
                      );
                    }}
                  >
                    <InterfaceIcon name="check" data-icon="inline-start" size={18} />
                    Approve $3,500.00
                  </Button>
                  <Button
                    variant="outline"
                    disabled={refillState !== "pending"}
                    onClick={() => {
                      setRefillState("denied");
                      addToast(
                        "Refill request denied — GreenWorks Maine LLC has been notified",
                        "danger",
                      );
                    }}
                  >
                    Deny Request
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View Contract SAR</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{adminRefillRequest.dialogTitle}</DialogTitle>
                        <DialogDescription>
                          {adminRefillRequest.dialogDescription}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
                {refillState === "pending" && (
                  <StatusBadge tone={adminRefillRequest.statusTone}>
                    {adminRefillRequest.statusLabel}
                  </StatusBadge>
                )}
                {refillState === "approved" && (
                  <StatusBadge tone="success">
                    $3,500.00 released to CRN-2026-PLW-0042 card pool
                  </StatusBadge>
                )}
                {refillState === "denied" && (
                  <StatusBadge tone="danger">
                    Request denied — vendor notified March 14, 2026
                  </StatusBadge>
                )}
              </PanelBody>
            </WorkspacePanel>

            <WorkspacePanel id="payment-auth" className={interfaceAnchorClass}>
              <PanelHeader>
                <div className="grid gap-2">
                  <PanelTitle>Payment Authorization</PanelTitle>
                  <PanelDescription>
                    Approve residual payments and Work Completion Records from vendors.
                  </PanelDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  {wcrState === "pending" &&
                    adminPaymentBadges.map((badge) => (
                      <StatusBadge key={badge.label} tone={badge.tone}>
                        {badge.label}
                      </StatusBadge>
                    ))}
                  {wcrState === "authorized" && (
                    <StatusBadge tone="success">Payment Authorized</StatusBadge>
                  )}
                  {wcrState === "clarification" && (
                    <StatusBadge tone="warning">Clarification Requested</StatusBadge>
                  )}
                </div>
              </PanelHeader>
              <PanelBody className="grid gap-4">
                <DetailCard className="gap-2">
                  <p className="type-title-sm text-[color:var(--foreground)]">
                    WCR-2026-PLW-0042-010 · Submitted March 13, 2026
                  </p>
                  <p className="type-body-sm text-[color:var(--muted-foreground)]">
                    Week 10 Plowing: 47 Route Completions · Morrison Landscaping & Plowing LLC · Feb 24 – Mar 1, 2026
                  </p>
                  <DetailGrid
                    className="gap-2"
                    items={[
                      { id: "contract", label: "Contract", value: "CRN-2026-PLW-0042", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
                      { id: "routes", label: "Routes Completed", value: "47", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
                      { id: "claimed", label: "Claimed Amount", value: "$4,600.00", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
                      { id: "review", label: "Status", value: "Awaiting Admin Review", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
                    ]}
                    itemClassName="gap-0.5 bg-transparent p-0"
                  />
                </DetailCard>
                <div className="flex flex-wrap gap-3">
                  <Button
                    disabled={wcrState !== "pending"}
                    onClick={() => {
                      setWcrState("authorized");
                      addToast(
                        "Payment authorized — $4,600.00 queued for GreenWorks Maine LLC",
                        "success",
                      );
                    }}
                  >
                    Authorize Residual Payment
                  </Button>
                  <Button
                    variant="outline"
                    disabled={wcrState !== "pending"}
                    onClick={() => {
                      setWcrState("clarification");
                      addToast(
                        "Clarification request sent — GreenWorks Maine LLC notified",
                        "info",
                      );
                    }}
                  >
                    Request Clarification
                  </Button>
                </div>
                {wcrState === "authorized" && (
                  <StatusBadge tone="success">
                    $4,600.00 payment authorized — queued for release
                  </StatusBadge>
                )}
                {wcrState === "clarification" && (
                  <StatusBadge tone="warning">
                    Clarification requested — awaiting vendor response
                  </StatusBadge>
                )}
              </PanelBody>
            </WorkspacePanel>
          </div>
        </section>

        <section className="grid items-start gap-4 lg:grid-cols-2">
          <WorkspacePanel id="reports" className={interfaceAnchorClass}>
            <PanelHeader>
              <div className="grid gap-2">
                <PanelTitle>Reports Snapshot</PanelTitle>
                <PanelDescription>
                  Quick readouts for council packets, audit prep, and weekly treasury review.
                </PanelDescription>
              </div>
              <StatusBadge tone="info">Updated daily in demo mode</StatusBadge>
            </PanelHeader>
            <PanelBody className="grid gap-3">
              <DetailGrid
                items={[
                  {
                    id: "weekly-digest",
                    label: "Weekly spend digest",
                    value: "4 active contracts · 11 approved card events",
                  },
                  {
                    id: "audit-readiness",
                    label: "Audit packet readiness",
                    value: "All current SAR records complete for March review",
                  },
                ]}
              />
              <div className="flex flex-wrap gap-3">
                <Button variant="outline">Open council summary</Button>
                <Button>Export treasury digest</Button>
              </div>
            </PanelBody>
          </WorkspacePanel>

          <WorkspacePanel id="settings" className={interfaceAnchorClass}>
            <PanelHeader>
              <div className="grid gap-2">
                <PanelTitle>Workspace Settings</PanelTitle>
                <PanelDescription>
                  Control who gets notified, how approvals route, and which guardrails apply before funds move.
                </PanelDescription>
              </div>
            </PanelHeader>
            <PanelBody className="grid gap-3">
              <DetailGrid
                items={[
                  {
                    id: "approval-routing",
                    label: "Approval routing",
                    value: "Town Manager + Finance Director required above $5,000",
                  },
                  {
                    id: "resident-updates",
                    label: "Resident updates",
                    value: "Weekly digest enabled for published public-record changes",
                  },
                ]}
              />
              <div className="flex flex-wrap gap-3">
                <Button variant="outline">Review approval rules</Button>
                <Button>Manage notifications</Button>
              </div>
            </PanelBody>
          </WorkspacePanel>
        </section>
      </WorkspaceShell>
      </div>

      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </>
  );
}
