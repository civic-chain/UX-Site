"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  citizenContracts,
  citizenLedgerOverflowRows,
  citizenLedgerRows,
  citizenOverviewMetrics,
  citizenProposalOptions,
  citizenSolicitation,
  interfaceRouteMeta,
} from "@/lib/interface-fixtures";

import { BannerFlag } from "@/components/ui/banner-flag";
import { ContractSummaryCard } from "./contract-summary-card";
import { DetailCard, DetailGrid } from "./detail-card";
import { InterfaceIcon } from "./interface-icons";
import { LiveCardFeed } from "./live-card-feed";
import { WorkspaceShell } from "./workspace-shell";
import { LedgerTable } from "./ledger-table";
import {
  WorkspacePanel,
  PanelBody,
  PanelDescription,
  PanelHeader,
  PanelTitle,
} from "./panel";
import { StatCard } from "./stat-card";
import { StatusBadge } from "./status-badge";
import { VotingStepper } from "./voting-stepper";

// ── Tab types ─────────────────────────────────────────────────────────────────

type CitizenTab = "overview" | "vote" | "ledger";

const TABS: { id: CitizenTab; label: string; icon: "overview" | "vote" | "ledger" }[] = [
  { id: "overview", label: "Overview",  icon: "overview" },
  { id: "vote",     label: "Vote",      icon: "vote"     },
  { id: "ledger",   label: "Ledger",    icon: "ledger"   },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export function CitizenLedgerPage() {
  const [tab, setTab] = useState<CitizenTab>("overview");

  return (
    <div data-workspace-root>
      <WorkspaceShell
        title={interfaceRouteMeta.citizen.title}
        subtitle={interfaceRouteMeta.citizen.subtitle}
        backLabel="Public Ledger"
        actions={
          <Button variant="outline" onClick={() => setTab("ledger")}>
            <InterfaceIcon name="ledger" data-icon="inline-start" size={18} />
            View Ledger
          </Button>
        }
      >
        <BannerFlag
          variant="info"
          icon={<InterfaceIcon name="shield" size={14} />}
          title="Public Record · Verification Available"
          description="All disbursements on this page are public records anchored on a public blockchain. Any citizen can verify any transaction at the Ledger Explorer without contacting the Town."
        />

        {/* Tab bar */}
        <nav className="flex gap-1 rounded-lg bg-[color:var(--workspace-muted)] p-1 self-start">
          {TABS.map(({ id, label, icon }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`inline-flex items-center gap-2 rounded-md px-5 py-2 type-body-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] ${
                  active
                    ? "bg-[color:var(--workspace-panel)] text-[color:var(--foreground)] shadow-sm border border-[color:var(--workspace-border)]"
                    : "text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)] hover:bg-[color:var(--workspace-surface)]"
                }`}
              >
                <InterfaceIcon
                  name={icon}
                  size={15}
                  className={active ? "text-[color:var(--accent)]" : ""}
                />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Overview tab */}
        {tab === "overview" && (
          <>
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {citizenOverviewMetrics.map((metric) => (
                <StatCard key={metric.label} metric={metric} />
              ))}
            </section>

            <WorkspacePanel elevated>
              <PanelHeader>
                <div className="grid gap-2">
                  <PanelTitle>Active Municipal Contracts</PanelTitle>
                  <PanelDescription>
                    4 active contracts · Total municipal spending: $230,500
                  </PanelDescription>
                </div>
                <StatusBadge tone="info">Public view · No login required</StatusBadge>
              </PanelHeader>
              <PanelBody className="grid gap-4 xl:grid-cols-2">
                {citizenContracts.map((contract) => (
                  <ContractSummaryCard key={contract.crn} contract={contract} variant="public-ledger" />
                ))}
              </PanelBody>
            </WorkspacePanel>

            <LiveCardFeed variant="public" limit={5} intervalMs={3500} />
          </>
        )}

        {/* Vote tab */}
        {tab === "vote" && (
          <section className="grid items-start gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <WorkspacePanel>
              <PanelHeader>
                <div className="grid gap-2">
                  <PanelTitle>Open Solicitation</PanelTitle>
                  <PanelDescription>
                    Any Town residents may cast advisory votes. Your address is used for geolocation verification only.
                  </PanelDescription>
                </div>
              </PanelHeader>
              <PanelBody className="grid gap-4">
                <div className="radius-workspace-card grid gap-4 border border-[color:var(--workspace-border)] bg-[color:var(--workspace-surface)] p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="grid gap-1.5">
                      <p className="type-label text-[color:var(--muted-foreground)]">
                        {citizenSolicitation.crn}
                      </p>
                      <h2 className="type-title text-[color:var(--foreground)]">
                        {citizenSolicitation.title}
                      </h2>
                    </div>
                    <StatusBadge tone="warning">{citizenSolicitation.status}</StatusBadge>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <StatusBadge tone="info">Budget: {citizenSolicitation.budget}</StatusBadge>
                    <StatusBadge tone="info">Voting: {citizenSolicitation.votingWindow}</StatusBadge>
                    <StatusBadge tone="neutral">{citizenSolicitation.proposals}</StatusBadge>
                  </div>

                  <p className="type-body text-[color:var(--muted-foreground)]">
                    {citizenSolicitation.body}
                  </p>
                </div>

                <div className="radius-workspace-control border border-[color:var(--workspace-border)] bg-[color:var(--workspace-surface)] px-4 py-3 flex items-start gap-2">
                  <InterfaceIcon name="shield" size={14} className="mt-px shrink-0 text-[color:var(--muted-foreground)]" />
                  <p className="type-caption text-[color:var(--muted-foreground)]">
                    Proposals are reviewed anonymously. Vendor identities are not disclosed to voters until after the advisory period closes.
                  </p>
                </div>
              </PanelBody>
            </WorkspacePanel>

            <VotingStepper
              solicitationLabel={`${citizenSolicitation.crn}: ${citizenSolicitation.title}`}
              proposalOptions={citizenProposalOptions}
            />
          </section>
        )}

        {/* Ledger tab */}
        {tab === "ledger" && (
          <LedgerTable
            description="Every payment is anchored immutably on a public blockchain. Hashes are cryptographically verifiable."
            rows={citizenLedgerRows}
            overflowRows={citizenLedgerOverflowRows}
          />
        )}
      </WorkspaceShell>
    </div>
  );
}
