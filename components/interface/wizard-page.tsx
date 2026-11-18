"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { DetailCard, DetailGrid } from "./detail-card";
import { PasswordGate } from "./demo-auth-shell";
import { InterfaceIcon, InterfaceMark } from "./interface-icons";
import {
  WorkspacePanel,
  PanelBody,
  PanelDescription,
  PanelHeader,
  PanelTitle,
} from "./panel";
import { StatusBadge } from "./status-badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LunaCompanion } from "./luna-companion";

const TERMS: Record<string, { expansion: string; note: string }> = {
  KYB:  { expansion: "Know Your Business", note: "Identity verification for the municipal entity, EIN, and authorized signatory. Required before any account is activated." },
  BaaS: { expansion: "Banking as a Service", note: "The card issuing and account infrastructure layer. Each municipality's funds are held under their own named account, not Civic-Chain's." },
  MTA:  { expansion: "Municipal Treasury Account", note: "The municipality's own dedicated fund account held in its name, separate from Civic-Chain's." },
  MFA:  { expansion: "Multi-Factor Authentication", note: "A second verification step required before any payment action, regardless of session state." },
  ACH:  { expansion: "Automated Clearing House", note: "The US bank network used for electronic fund transfers between bank accounts." },
  SAR:  { expansion: "Service Agreement Record", note: "The immutable contract record anchored on the Public Ledger when a vendor is activated." },
  CRN:  { expansion: "Contract Reference Number", note: "Unique ID threaded through every downstream record: proposals, SAR, card transactions, WCRs, and blockchain memos." },
  MCC:  { expansion: "Merchant Category Code", note: "4-digit code classifying the type of purchase. Civic-Chain enforces a per-contract allowed list at authorization time." },
  AML:  { expansion: "Anti-Money Laundering", note: "Compliance screening required before a vendor can receive any payment on the platform." },
  OFAC: { expansion: "Office of Foreign Assets Control", note: "US Treasury sanctions watchlist. All vendors are screened against it before activation." },
  WCR:  { expansion: "Work Completion Record", note: "Vendor's claim documenting completed work and requesting residual payment for that period." },
  NFC:  { expansion: "Near Field Communication", note: "Tap-to-pay technology used by Apple Pay and Google Pay. Cards provision over NFC directly to a worker's phone." },
};

function Term({ children }: { children: string }) {
  const def = TERMS[children];
  if (!def) return <>{children}</>;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="cursor-help underline decoration-dotted underline-offset-2">{children}</span>
      </TooltipTrigger>
      <TooltipContent>
        <p className="type-caption font-semibold text-[color:var(--foreground)]">{def.expansion}</p>
        <p className="type-caption text-[color:var(--muted-foreground)]">{def.note}</p>
      </TooltipContent>
    </Tooltip>
  );
}

const STEPS = [
  { id: "kyb",         title: "KYB & Account Creation",              phase: "Step 1",  action: "Provide your EIN, legal entity name, and authorized signatory to Civic-Chain to begin KYB review." },
  { id: "roles",       title: "User Accounts & Roles",               phase: "Step 2",  action: "Create all user accounts and assign roles before any contract or payment action proceeds." },
  { id: "treasury",    title: "Treasury Account Setup",               phase: "Step 3",  action: "Authorize an ACH pull and configure your approval thresholds in Workspace Settings." },
  { id: "solicitation",title: "First Solicitation",                   phase: "Step 4",  action: "Create your first solicitation to generate a CRN, then share it with vendor candidates." },
  { id: "vendors",     title: "Vendor Portal & Enrollment",           phase: "Step 5",  action: "Send vendor invite links from the admin console and upload your boundary polygon for the citizen portal." },
  { id: "sar",         title: "Vendor AML & SAR Creation",            phase: "Step 6",  action: "Select the winning vendor to trigger AML screening, then activate the contract to anchor the SAR on-chain." },
  { id: "cards",       title: "Card Provisioning",                    phase: "Step 7",  action: "Issue all three card tiers and confirm each worker enrolls their card in Apple Pay or Google Pay." },
  { id: "refill",      title: "Balance Management",                   phase: "Step 8",  action: "Review and approve any pending Refill Requests before cards can resume normal operation." },
  { id: "wcr",         title: "Payment Authorization (WCR)",          phase: "Step 9",  action: "Review the vendor's WCR documentation and authorize the residual ACH disbursement." },
  { id: "golive",      title: "Reports & Go-Live",                    phase: "Step 10", action: "Confirm all checklist items are complete and map GL account codes before the first live card tap." },
] as const;

function StepContent({ index }: { index: number }) {
  switch (index) {

    /* ── Step 0: KYB ─────────────────────────────────────────── */
    case 0: return (
      <div className="grid gap-5">
        <p className="type-body text-[color:var(--muted-foreground)]">
          Before any funds can move, the municipality must be onboarded as its own independent corporate customer through our card issuer and <Term>BaaS</Term> provider. This is a regulatory requirement: under the issuer&apos;s affiliate model, each municipality holds its own funds in its own named accounts. Civic-Chain manages these accounts via the affiliate API but cannot co-mingle funds.
        </p>
        <p className="type-body text-[color:var(--muted-foreground)]">
          Civic-Chain submits the <Term>KYB</Term> package on behalf of the municipality. The card issuer runs standard Know Your Business verification against the legal entity, EIN, and authorized signatory. Upon approval, the Municipal Treasury Account (<Term>MTA</Term>) is provisioned and the admin console workspace is activated.
        </p>
        <DetailCard>
          <p className="type-title-sm text-[color:var(--foreground)]">Required KYB Inputs</p>
          <DetailGrid
            className="gap-2"
            items={[
              { id: "entity",    label: "Legal entity name",      value: "Must match government registration exactly", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "ein",       label: "Federal EIN",            value: "Tax ID issued by the IRS",                   valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "signatory", label: "Authorized signatory",   value: "The official who can bind the municipality to financial agreements", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "address",   label: "Registered address",     value: "Verified municipal address on file",         valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "bank",      label: "Bank account details",   value: "For ACH pull from existing operating account", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
            ]}
            itemClassName="gap-0.5 bg-transparent p-0"
          />
        </DetailCard>
        <DetailCard>
          <p className="type-title-sm text-[color:var(--foreground)]">What Gets Created on Approval</p>
          <DetailGrid
            className="gap-2"
            items={[
              { id: "mta",       label: "Municipal Treasury Account (MTA)", value: "Top-level fund account. All contract activity flows from here.", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "workspace", label: "Admin console workspace",           value: "Town Administrator, Finance Director, and read-only council accounts provisioned", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "mfa",       label: "MFA enrollment",                   value: "All payment-authorization actions require a second factor, regardless of session state", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
            ]}
            itemClassName="gap-0.5 bg-transparent p-0"
          />
        </DetailCard>
        <div className="flex items-center gap-3 rounded-lg border border-[color:var(--workspace-info-edge)] bg-[color:var(--workspace-info-bg)] px-4 py-3">
          <InterfaceIcon name="clock" size={16} className="shrink-0 text-[color:var(--workspace-info)]" />
          <p className="type-body-sm text-[color:var(--workspace-info)]">
            KYB review typically completes in <span className="font-semibold">1–3 business days</span>. Civic-Chain holds a provisional workspace open during review so configuration can proceed in parallel.
          </p>
        </div>
      </div>
    );

    /* ── Step 1: User Accounts & Roles ──────────────────────────── */
    case 1: return (
      <div className="grid gap-5">
        <p className="type-body text-[color:var(--muted-foreground)]">
          Once KYB is approved and the workspace is active, configure all user accounts before any contract or payment action proceeds. Role assignments determine who can initiate, who must approve, and who can only view. Getting this right before go-live prevents approval bottlenecks and ensures dual-approval routing works correctly.
        </p>
        <DetailCard>
          <p className="type-title-sm text-[color:var(--foreground)]">Role Reference</p>
          <div className="grid gap-2">
            {[
              {
                role: "Town Administrator",
                access: "Full access",
                can: "Create solicitations, approve refill requests up to the single-approval limit, authorize WCR payments, manage workspace settings.",
                cannot: "Approve payments above the dual-approval threshold without Finance Director co-sign.",
              },
              {
                role: "Finance Director",
                access: "Full access",
                can: "Authorize ACH pulls to fund the MTA, co-approve above the dual-approval threshold, export treasury digests and audit packets.",
                cannot: "Create solicitations or manage card provisioning directly.",
              },
              {
                role: "Council Member",
                access: "Read-only",
                can: "View contract status, card activity, spend reports, and SAR records on the Public Ledger.",
                cannot: "Approve, deny, or initiate any payment or contract action.",
              },
              {
                role: "Department Head",
                access: "View + notifications",
                can: "Receive spend alerts for contracts in their department, view card activity for assigned SARs.",
                cannot: "Approve payments or access treasury settings.",
              },
            ].map((r) => (
              <div key={r.role} className="radius-workspace-control grid gap-1.5 bg-[color:var(--workspace-surface)] px-3 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="type-body-sm font-medium text-[color:var(--foreground)]">{r.role}</p>
                  <StatusBadge tone="neutral">{r.access}</StatusBadge>
                </div>
                <p className="type-caption text-[color:var(--muted-foreground)]">
                  <span className="font-medium text-[color:var(--foreground)]">Can: </span>{r.can}
                </p>
                <p className="type-caption text-[color:var(--muted-foreground)]">
                  <span className="font-medium text-[color:var(--foreground)]">Cannot: </span>{r.cannot}
                </p>
              </div>
            ))}
          </div>
        </DetailCard>
        <DetailCard>
          <p className="type-title-sm text-[color:var(--foreground)]">Account Setup Checklist</p>
          <DetailGrid
            className="gap-2"
            items={[
              { id: "ta",      label: "Town Administrator", value: "Create account, set email, enroll MFA, confirm single-approval limit in Settings", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "fd",      label: "Finance Director",   value: "Create account, set email, enroll MFA, confirm dual-approval co-sign routing", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "council", label: "Council members",    value: "Create read-only accounts, set notification preferences for weekly digest", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "dept",    label: "Department heads",   value: "Optional: add view-and-notify accounts for any department receiving contract spend alerts", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
            ]}
            itemClassName="gap-0.5 bg-transparent p-0"
          />
        </DetailCard>
        <div className="flex items-center gap-3 rounded-lg border border-[color:var(--workspace-info-edge)] bg-[color:var(--workspace-info-bg)] px-4 py-3">
          <InterfaceIcon name="shield" size={16} className="shrink-0 text-[color:var(--workspace-info)]" />
          <p className="type-body-sm text-[color:var(--workspace-info)]">
            <Term>MFA</Term> enrollment is required for every account with payment-authorization access. The system will not route a payment approval to an account that has not completed MFA setup, regardless of role assignment.
          </p>
        </div>
      </div>
    );

    /* ── Step 2: Treasury ─────────────────────────────────────── */
    case 2: return (
      <div className="grid gap-5">
        <p className="type-body text-[color:var(--muted-foreground)]">
          Once KYB clears, the Finance Director authorizes a one-time <Term>ACH</Term> pull linking the municipality&apos;s existing operating account to the MTA. This is how the municipality loads funds into the platform. Every transfer is deliberate and authorized. There are no automatic debits.
        </p>
        <p className="type-body text-[color:var(--muted-foreground)]">
          Approval thresholds are configured in Workspace Settings before any contract is activated. These thresholds determine when a single admin can act alone versus when two officials must both sign off. The defaults are set conservatively and can be tightened but not loosened without a change-control review.
        </p>
        <DetailCard>
          <p className="type-title-sm text-[color:var(--foreground)]">Approval Routing Defaults</p>
          <DetailGrid
            className="gap-2"
            items={[
              { id: "single",  label: "Single-approval limit",  value: "Up to $5,000: Town Administrator or Finance Director", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "dual",    label: "Dual-approval threshold", value: "Above $5,000: both Town Administrator and Finance Director required", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "notify",  label: "Notification routing",   value: "Both officials notified by email and in-console alert for every pending action", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
            ]}
            itemClassName="gap-0.5 bg-transparent p-0"
          />
        </DetailCard>
        <DetailCard>
          <p className="type-title-sm text-[color:var(--foreground)]">Contract Sub-Account Structure</p>
          <p className="type-body-sm text-[color:var(--muted-foreground)]">
            Sub-accounts are created automatically when a Service Agreement Record (<Term>SAR</Term>) is activated, not at this stage. Each SAR gets three named sub-accounts drawn from the MTA:
          </p>
          <DetailGrid
            className="gap-2"
            items={[
              { id: "pool",     label: "Card Pool",              value: "Direct vendor expenses: fuel, materials. Debited in real time at each card tap.", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "residual", label: "Residual Reserve",       value: "Labor, overhead, and profit. Released to vendor via ACH after WCR approval.", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "holdback", label: "Hold-Back Reserve",      value: "~5% buffer held until final work sign-off. Released at contract close.", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
            ]}
            itemClassName="gap-0.5 bg-transparent p-0"
          />
        </DetailCard>
        <div className="flex items-center gap-3 rounded-lg border border-[color:var(--workspace-danger-edge)] bg-[color:var(--workspace-danger-bg)] px-4 py-3">
          <InterfaceIcon name="shield" size={16} className="shrink-0 text-[color:var(--workspace-danger)]" />
          <p className="type-body-sm text-[color:var(--workspace-danger)]">
            <span className="font-semibold">No auto-refill is ever enabled.</span> Every fund movement into a card pool requires an explicit admin approval. This checkpoint is the core accountability mechanism. It cannot be bypassed.
          </p>
        </div>
      </div>
    );

    /* ── Step 3: First Solicitation ───────────────────────────── */
    case 3: return (
      <div className="grid gap-5">
        <p className="type-body text-[color:var(--muted-foreground)]">
          A solicitation is the starting point for every contract. When the admin creates one, the platform assigns a unique Contract Reference Number (<Term>CRN</Term>), for example <span className="type-code text-[color:var(--foreground)]">CRN-2026-PLW-0042</span>. This CRN threads through every downstream record: proposals, the SAR, card transactions, WCRs, and blockchain memos.
        </p>
        <p className="type-body text-[color:var(--muted-foreground)]">
          Selecting a service category auto-populates the <Term>MCC</Term> lock profile for that contract type. Vendors submit proposals by emailing <span className="type-code text-[color:var(--foreground)]">proposals@civicchain.com</span> with the CRN in the subject line. The platform routes them automatically into the admin console for review.
        </p>
        <DetailCard>
          <p className="type-title-sm text-[color:var(--foreground)]">Service Categories & Default MCC Locks</p>
          <div className="grid gap-2">
            {[
              { category: "Snow / Ice Removal",  mccs: "Fuel (5541, 5542), Auto Parts (5533), Fleet (7521), Equipment Repair (7538)" },
              { category: "Road Maintenance",    mccs: "Fuel, Construction Materials (5211, 5031), Hardware (5251), Equipment Rental (7359)" },
              { category: "Fire Protection",     mccs: "Fuel, Safety Equipment (5047), Industrial Supplies (5085), Vehicle Repair" },
              { category: "Public Safety",       mccs: "Fuel, Communications Equipment (5065), Safety Supplies" },
              { category: "General Public Works",mccs: "Fuel, Hardware, Equipment Rental, Construction Materials" },
            ].map((row) => (
              <div key={row.category} className="radius-workspace-control grid gap-0.5 bg-[color:var(--workspace-surface)] px-3 py-2.5">
                <p className="type-body-sm font-medium text-[color:var(--foreground)]">{row.category}</p>
                <p className="type-caption text-[color:var(--muted-foreground)]">{row.mccs}</p>
              </div>
            ))}
          </div>
          <p className="type-caption text-[color:var(--muted-foreground)]">
            Restaurants, entertainment, general retail, and cash advances are blocked on all contract types. MCC locks can be restricted further but not expanded beyond the category defaults.
          </p>
        </DetailCard>
        <DetailCard>
          <p className="type-title-sm text-[color:var(--foreground)]">What Vendors Submit</p>
          <DetailGrid
            className="gap-2"
            items={[
              { id: "scope",   label: "Service scope",          value: "Coverage zone, performance standards, and timeline", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "pricing", label: "Pricing structure",      value: "Proposed total amount with breakdown by card spend vs. residual payment", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "mcc",     label: "Expense categories",     value: "Vendor's own MCC list, compared against contract-type defaults during review", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "bond",    label: "Performance bond",       value: "Certificate of insurance and references required", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
            ]}
            itemClassName="gap-0.5 bg-transparent p-0"
          />
        </DetailCard>
      </div>
    );

    /* ── Step 4: Vendor Portal & Enrollment ─────────────────────── */
    case 4: return (
      <div className="grid gap-5">
        <p className="type-body text-[color:var(--muted-foreground)]">
          Before a vendor can be selected as a winning bidder and enter AML screening, they need an active vendor portal account. The portal is where vendors submit proposals, upload Work Completion Records, monitor card balances and transaction history, and receive payment notifications. Setting up vendor accounts before the first solicitation closes prevents delays at the award stage.
        </p>
        <p className="type-body text-[color:var(--muted-foreground)]">
          Vendors self-register using an invite link sent from the admin console. Each vendor designates one supervisor account — the account responsible for WCR submissions and card management. Additional view-only team members can be added after the supervisor account is active.
        </p>
        <DetailCard>
          <p className="type-title-sm text-[color:var(--foreground)]">Vendor Enrollment Paths</p>
          <div className="grid gap-2">
            {[
              {
                type: "New vendor",
                flow: "Admin sends invite from console → vendor self-registers → supervisor account created → eligible for AML screening at contract award.",
              },
              {
                type: "Existing vendor migrating from a legacy contract",
                flow: "Admin imports vendor record with EIN and bank account → vendor receives portal activation email → legacy contract runs out under existing terms while the new SAR covers new work.",
              },
              {
                type: "Vendor already registered in another municipality",
                flow: "Vendor logs in with existing credentials and links to the new municipality's solicitation. No re-registration required. AML status carries over if still active.",
              },
            ].map((v) => (
              <div key={v.type} className="radius-workspace-control grid gap-1 bg-[color:var(--workspace-surface)] px-3 py-3">
                <p className="type-body-sm font-medium text-[color:var(--foreground)]">{v.type}</p>
                <p className="type-caption text-[color:var(--muted-foreground)]">{v.flow}</p>
              </div>
            ))}
          </div>
        </DetailCard>
        <DetailCard>
          <p className="type-title-sm text-[color:var(--foreground)]">Citizen Portal: Boundary Polygon Setup</p>
          <p className="type-body-sm text-[color:var(--muted-foreground)]">
            The citizen portal lets residents view active contracts, card spend activity, and vote on solicitations within their service area. Before any voting window can open, a boundary polygon must be uploaded defining which addresses are eligible. This polygon is the geographic boundary used for residency verification.
          </p>
          <DetailGrid
            className="gap-2"
            items={[
              { id: "format", label: "Accepted formats", value: "GeoJSON polygon or KML file. Most municipal GIS departments export either format directly.", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "source", label: "Where to get it",  value: "Town GIS department, county assessor's office, or state MGIS portal.", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "effect", label: "What it controls", value: "Address enrollment verification, IP geolocation audit signals, and confidence score calculation at vote time.", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "update", label: "When to update",   value: "If district boundaries change. Version history is retained: old solicitations always reference the polygon active at their voting window open date.", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
            ]}
            itemClassName="gap-0.5 bg-transparent p-0"
          />
        </DetailCard>
        <div className="flex items-center gap-3 rounded-lg border border-[color:var(--workspace-info-edge)] bg-[color:var(--workspace-info-bg)] px-4 py-3">
          <InterfaceIcon name="clock" size={16} className="shrink-0 text-[color:var(--workspace-info)]" />
          <p className="type-body-sm text-[color:var(--workspace-info)]">
            Vendor portal invites can be sent before KYB is fully approved. Vendors can complete registration and upload documents during the provisional period, running enrollment in parallel with account setup and shortening the time to first solicitation.
          </p>
        </div>
      </div>
    );

    /* ── Step 5: Vendor AML & SAR ─────────────────────────────── */
    case 5: return (
      <div className="grid gap-5">
        <p className="type-body text-[color:var(--muted-foreground)]">
          When the admin selects a winning vendor, Civic-Chain registers the vendor with our card issuer and submits them for <Term>OFAC</Term>/<Term>AML</Term> screening. This must complete before any payment can proceed. It is a patent-claim requirement that compliance validation runs before any blockchain transaction is committed.
        </p>
        <p className="type-body text-[color:var(--muted-foreground)]">
          Once the vendor&apos;s AML status is <span className="font-medium text-[color:var(--workspace-success)]">ACTIVE</span>, activating the contract creates a Service Agreement Record (SAR). The SAR is anchored immutably on the Public Ledger as a transaction memo, with a SHA-256 audit hash linking the contract document, the blockchain entry, and the PostgreSQL record. This hash is the patent-protected audit link. It is written to every downstream event.
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "ACTIVE: payments enabled",       tone: "success" as const },
            { label: "PENDING: screening in progress", tone: "warning" as const },
            { label: "FROZEN: payments blocked",       tone: "danger" as const },
          ].map((s) => (
            <StatusBadge key={s.label} tone={s.tone}>{s.label}</StatusBadge>
          ))}
        </div>
        <DetailCard>
          <p className="type-title-sm text-[color:var(--foreground)]">What a SAR Contains</p>
          <DetailGrid
            className="gap-2"
            items={[
              { id: "vendor",   label: "Vendor identity",            value: "Legal name, EIN, authorized signatory, bank account on file with the card issuer", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "scope",    label: "Service scope",              value: "Coverage zone, performance standards, contract dates", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "budget",   label: "Budget allocation",          value: "Card pool / residual reserve / hold-back split in USD and USDC", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "card",     label: "Card configuration",         value: "Tiers issued, MCC locks applied, per-card and per-day limits", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "vote",     label: "Voting record",              value: "Final tally, confidence distribution, boundary polygon used", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "hash",     label: "SHA-256 audit hash",         value: "Cross-links blockchain memo + PostgreSQL record + contract document", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
            ]}
            itemClassName="gap-0.5 bg-transparent p-0"
          />
        </DetailCard>
        <DetailCard>
          <p className="type-title-sm text-[color:var(--foreground)]">Budget Allocation Example: $48K Plowing Contract</p>
          <DetailGrid
            className="gap-2"
            items={[
              { id: "pool",     label: "Card Pool (37.5%)",           value: "$18,000: fuel, salt, equipment repair", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "residual", label: "Residual Reserve (57.5%)",    value: "$27,600: labor, overhead, profit margin", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "holdback", label: "Hold-Back Reserve (5%)",      value: "$2,400: released at final sign-off", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
            ]}
            itemClassName="gap-0.5 bg-transparent p-0"
          />
        </DetailCard>
      </div>
    );

    /* ── Step 6: Card Provisioning ────────────────────────────── */
    case 6: return (
      <div className="grid gap-5">
        <p className="type-body text-[color:var(--muted-foreground)]">
          Virtual cards are issued in three tiers per SAR. All tiers draw from the same contract card pool. There is no separate balance per card. Cards are provisioned directly into Apple Pay or Google Pay on the worker&apos;s phone. Physical backup cards are mailed for terminals that don&apos;t support <Term>NFC</Term> tap.
        </p>
        <p className="type-body text-[color:var(--muted-foreground)]">
          Every card tap triggers Civic-Chain&apos;s authorization webhook before the card network approves the transaction. The webhook must respond in under 500ms; the card network auto-declines at approximately 2 seconds. The checks happen against Redis (the live pool balance mirror), never against the database or blockchain, which are the persistent record only.
        </p>
        <DetailCard>
          <p className="type-title-sm text-[color:var(--foreground)]">Card Tier Hierarchy</p>
          <div className="grid gap-2">
            {[
              { tier: "Company (Master)", issued: "One per vendor entity", use: "Large purchases: bulk fuel, equipment rental, vendor supply runs", limit: "High daily limit" },
              { tier: "Individual (Named Worker)", issued: "One per driver or crew member", use: "Per-shift fuel, tolls, consumables. Requires biometric auth.", limit: "Moderate daily limit" },
              { tier: "Equipment (Vehicle/Asset)", issued: "One per truck or piece of equipment", use: "Fuel and maintenance tied to a specific vehicle, tracked by asset", limit: "Low daily limit" },
            ].map((card) => (
              <div key={card.tier} className="radius-workspace-control grid gap-1 bg-[color:var(--workspace-surface)] px-3 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="type-body-sm font-medium text-[color:var(--foreground)]">{card.tier}</p>
                  <StatusBadge tone="neutral">{card.limit}</StatusBadge>
                </div>
                <p className="type-caption text-[color:var(--muted-foreground)]">Issued to: {card.issued}</p>
                <p className="type-caption text-[color:var(--muted-foreground)]">{card.use}</p>
              </div>
            ))}
          </div>
        </DetailCard>
        <DetailCard>
          <p className="type-title-sm text-[color:var(--foreground)]">Authorization Webhook: Critical Path</p>
          <div className="grid gap-1.5">
            {[
              "Driver taps phone → biometric auth → NFC → card network",
              "Card network sends auth request to Civic-Chain webhook",
              "Redis balance lookup: < 10ms",
              "MCC validation against SAR allowed list: < 5ms",
              "Per-card velocity and limit check",
              "Approve → pool balance decrements in Redis",
              "Approved transaction written asynchronously to Public Ledger (not in auth path)",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="type-caption mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-surface)] text-[color:var(--accent)]">{i + 1}</span>
                <p className="type-caption text-[color:var(--muted-foreground)]">{step}</p>
              </div>
            ))}
          </div>
          <p className="type-caption font-medium text-[color:var(--workspace-danger)]">
            Target response: under 500ms. PostgreSQL and blockchain writes are always asynchronous and never block the auth response.
          </p>
        </DetailCard>
      </div>
    );

    /* ── Step 7: Balance Management ───────────────────────────── */
    case 7: return (
      <div className="grid gap-5">
        <p className="type-body text-[color:var(--muted-foreground)]">
          The card pool balance is mirrored in Redis and updated in real time by card issuer webhooks. When a pool runs low or reaches zero, the system generates a Refill Request automatically and routes it to both the Town Administrator and Finance Director via email and in-console alert. Cards continue to decline until the refill is approved and the pool is funded.
        </p>
        <p className="type-body text-[color:var(--muted-foreground)]">
          The administrator reviews the requested amount, the reason provided by the vendor, and the remaining unallocated contract value (which caps the maximum refill). Approving releases the specified amount from the MTA into the card pool sub-account immediately. Denying triggers a notification to the vendor with the decision.
        </p>
        <DetailCard>
          <p className="type-title-sm text-[color:var(--foreground)]">Refill Request Flow</p>
          <div className="grid gap-1.5">
            {[
              { label: "Pool runs low or hits zero",           note: "Hard-decline on all SAR cards begins immediately" },
              { label: "System generates Refill Request (RFR)", note: "Routed to Town Administrator and Finance Director" },
              { label: "Vendor submits supporting justification",note: "Reason, projected runway, suggested amount" },
              { label: "Admin reviews and approves or denies", note: "Amount capped at remaining unallocated contract value" },
              { label: "If approved: MTA → Card Pool transfer", note: "Immediate: cards resume normal operation" },
              { label: "Event written to blockchain memo",     note: "SHA-256 hash links refill to contract SAR" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="type-caption mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-surface)] text-[color:var(--accent)]">{i + 1}</span>
                <div className="grid gap-0.5">
                  <p className="type-body-sm font-medium text-[color:var(--foreground)]">{item.label}</p>
                  <p className="type-caption text-[color:var(--muted-foreground)]">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </DetailCard>
        <div className="flex items-start gap-3 rounded-lg border border-[color:var(--workspace-border)] bg-[color:var(--workspace-surface)] px-4 py-3">
          <InterfaceIcon name="alert" size={16} className="mt-0.5 shrink-0 text-[color:var(--muted-foreground)]" />
          <p className="type-body-sm text-[color:var(--muted-foreground)]">
            The refill approval step exists precisely because it is a checkpoint. A vendor burning through a card pool faster than expected is a signal worth reviewing. The no-auto-refill policy converts that signal into a required conversation before more public funds are released.
          </p>
        </div>
      </div>
    );

    /* ── Step 8: WCR / Payment Auth ───────────────────────────── */
    case 8: return (
      <div className="grid gap-5">
        <p className="type-body text-[color:var(--muted-foreground)]">
          At the end of each work period, the vendor submits a Work Completion Record (<Term>WCR</Term>) through the vendor portal. The WCR documents what was done, attaches supporting evidence, and claims the residual payment amount for that period. The admin console surfaces the WCR for review. The administrator then authorizes payment or requests clarification.
        </p>
        <p className="type-body text-[color:var(--muted-foreground)]">
          Authorizing a WCR triggers an ACH disbursement from the Residual Reserve sub-account to the vendor&apos;s registered bank account. The disbursement event is simultaneously written to the Public Ledger as a memo with a SHA-256 audit hash linking the WCR document, the payment record, and the contract SAR. This is the patent-protected cross-system audit link.
        </p>
        <DetailCard>
          <p className="type-title-sm text-[color:var(--foreground)]">WCR Required Fields</p>
          <DetailGrid
            className="gap-2"
            items={[
              { id: "crn",      label: "Contract CRN",          value: "e.g. CRN-2026-PLW-0042", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "period",   label: "Reporting period",      value: "Start and end date for the work period being claimed", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "routes",   label: "Units completed",       value: "Routes, deliveries, or service events depending on contract type", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "amount",   label: "Claimed residual amount", value: "Dollar figure claimed for this period (must not exceed available reserve)", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "notes",    label: "Work description",      value: "Narrative of what was done, any conditions encountered", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "docs",     label: "Supporting documentation", value: "Route logs, GPS exports, photos, equipment service records", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "attest",   label: "Supervisor attestation", value: "Signed certification that work was completed as described", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
            ]}
            itemClassName="gap-0.5 bg-transparent p-0"
          />
        </DetailCard>
        <DetailCard>
          <p className="type-title-sm text-[color:var(--foreground)]">After Authorization</p>
          <DetailGrid
            className="gap-2"
            items={[
              { id: "ach",      label: "ACH disbursement",      value: "Initiated within one business day to vendor's registered bank account", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "blockchain", label: "Blockchain memo",     value: "Public Ledger transaction written with WCR reference + SHA-256 audit hash", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "holdback", label: "Hold-back release",     value: "Hold-back reserve released only at final WCR, which is the contract close event", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
            ]}
            itemClassName="gap-0.5 bg-transparent p-0"
          />
        </DetailCard>
      </div>
    );

    /* ── Step 9: Reports & Go-Live ────────────────────────────── */
    default: return (
      <div className="grid gap-5">
        <p className="type-body text-[color:var(--muted-foreground)]">
          Before the first live card tap, run through the go-live checklist below. All items must be confirmed. The checklist represents the minimum required state for the 7-stage payment flow to operate correctly. Once live, Civic-Chain generates reports automatically: weekly spend digests, audit packets, and council summaries are available from the Reports section of the admin console.
        </p>
        <DetailCard>
          <p className="type-title-sm text-[color:var(--foreground)]">Go-Live Checklist</p>
          <div className="grid gap-2">
            {[
              { label: "Municipal KYB approved by card issuer",                       done: true  },
              { label: "MTA funded: at least the card pool allocation for first SAR", done: true  },
              { label: "Vendor AML status: ACTIVE",                                  done: true  },
              { label: "SAR created and Public Ledger anchor confirmed",          done: true  },
              { label: "Company, Individual, and Equipment tier cards provisioned",   done: true  },
              { label: "At least one Individual card enrolled in Apple / Google Pay", done: true  },
              { label: "MCC lock profile confirmed for contract type",                done: true  },
              { label: "Dual-approval threshold configured in Settings",              done: false },
              { label: "GL account codes mapped to active SARs in Settings",          done: false },
              { label: "Town Administrator and Finance Director accounts with MFA",   done: false },
              { label: "Vendor portal: supervisor account created",                   done: false },
              { label: "Citizen portal: boundary polygon uploaded",                   done: false },
              { label: "Day 7 check-in scheduled with implementation lead",           done: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className={[
                  "flex size-5 shrink-0 items-center justify-center rounded-full",
                  item.done ? "bg-[color:var(--workspace-success)]" : "border border-[color:var(--workspace-border)] bg-[color:var(--workspace-surface)]",
                ].join(" ")}>
                  {item.done && <InterfaceIcon name="check" size={11} className="text-white" />}
                </div>
                <p className={[
                  "type-body-sm",
                  item.done ? "text-[color:var(--foreground)]" : "text-[color:var(--muted-foreground)]",
                ].join(" ")}>{item.label}</p>
              </div>
            ))}
          </div>
        </DetailCard>
        <DetailCard>
          <p className="type-title-sm text-[color:var(--foreground)]">Accounting & General Ledger Integration</p>
          <p className="type-body-sm text-[color:var(--muted-foreground)]">
            Civic-Chain does not write directly to any external accounting system. The integration point is the treasury digest export, which Finance Directors map to their existing general ledger. Confirm the following before go-live so reconciliation is clean from the first week.
          </p>
          <DetailGrid
            className="gap-2"
            items={[
              { id: "format", label: "Export format",        value: "CSV (default) or JSON. Each row is one card event or ACH disbursement with CRN, SAR ID, vendor name, amount, date, and ledger memo.", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "coding", label: "Account code mapping", value: "Assign a GL account code to each active SAR in Settings before go-live. That code appears on every exported transaction for that contract.", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "timing", label: "Export timing",        value: "Weekly digest generated every Monday for the prior week. Ad-hoc exports available at any time from Reports for any date range.", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "recon",  label: "Reconciliation",       value: "The MTA balance in the console should match the dedicated fund line in your accounting system at the start of each week. A variance means an ACH is in transit — typically 1 business day.", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "compat", label: "Compatible systems",   value: "Works alongside Munis, GEMS, BS&A, QuickBooks, and any system that accepts a CSV import. No direct API connector required.", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
            ]}
            itemClassName="gap-0.5 bg-transparent p-0"
          />
        </DetailCard>

        <DetailCard>
          <p className="type-title-sm text-[color:var(--foreground)]">Post-Go-Live Check-In Schedule</p>
          <DetailGrid
            className="gap-2"
            items={[
              { id: "d7",  label: "Day 7",  value: "Review live card activity, confirm MCC locks functioning, address vendor questions", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "d30", label: "Day 30", value: "Review first WCR submission and residual payment, confirm report exports, audit declined transactions", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
              { id: "d90", label: "Day 90", value: "Full contract cycle review: spend vs. budget, SAR compliance, citizen portal engagement, introduce multi-contract management", valueClassName: "type-caption text-[color:var(--muted-foreground)]" },
            ]}
            itemClassName="gap-0.5 bg-transparent p-0"
          />
        </DetailCard>
        <div className="flex items-center gap-3 rounded-lg border border-[color:var(--workspace-success-edge)] bg-[color:var(--workspace-success-bg)] px-4 py-3">
          <InterfaceIcon name="check" size={16} className="shrink-0 text-[color:var(--workspace-success)]" />
          <p className="type-body-sm text-[color:var(--workspace-success)]">
            <span className="font-semibold">Parallel operation:</span> the municipality does not need to terminate existing payment methods at go-live. Civic-Chain handles only the contracts that have been migrated to SARs. Legacy contracts run out under their existing terms.
          </p>
        </div>
      </div>
    );
  }
}

export function WizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const total = STEPS.length;
  const done = completedSteps.length;
  const isFirst = currentStep === 0;
  const isLast = currentStep === total - 1;
  const currentDone = completedSteps.includes(currentStep);
  const allDone = done === total;

  function markAndAdvance() {
    if (!currentDone) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }
    if (!isLast) setCurrentStep((s) => s + 1);
  }

  function handleReset() {
    setCurrentStep(0);
    setCompletedSteps([]);
  }

  const step = STEPS[currentStep];

  return (
    <PasswordGate password="wizard2026">
      {({ onSignOut }) => (
    <TooltipProvider delayDuration={300}>
    <div data-workspace-root>
      <div className="workspace-shell">
        <div className="mx-auto grid w-full max-w-[1440px] gap-4 px-4 py-4 lg:px-6">

          {/* Header */}
          <header className="workspace-panel-strong workspace-header flex min-h-[var(--workspace-header-height)] flex-wrap items-center justify-between gap-4 bg-[color:var(--workspace-nav-bg-strong)] px-5 py-4 sm:px-6">
            <div className="grid gap-3">
              <div className="flex items-center gap-3">
                <InterfaceMark />
                <div className="grid gap-1">
                  <p className="type-title-sm text-[color:var(--foreground)]">Civic-Chain</p>
                  <p className="type-caption text-[color:var(--muted-foreground)]">Municipality Onboarding Wizard</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {done > 0 && (
                <Button variant="outline" onClick={handleReset}>
                  Reset Wizard
                </Button>
              )}
              <Button variant="outline" asChild>
                <Link href="/admin">
                  <InterfaceIcon name="back" data-icon="inline-start" size={18} />
                  Admin Console
                </Link>
              </Button>
              <Button variant="outline" onClick={onSignOut}>
                <InterfaceIcon name="lock" data-icon="inline-start" size={18} />
                Sign Out
              </Button>
            </div>
          </header>

          {/* Progress bar */}
          <div className="grid gap-1.5">
            <div className="flex items-center justify-between gap-3">
              <p className="type-caption font-medium text-[color:var(--foreground)]">
                {allDone ? "Onboarding complete" : step.title}
              </p>
              <p className="type-caption text-[color:var(--muted-foreground)]">
                {done} of {total} {done === 1 ? "step" : "steps"} complete
              </p>
            </div>
            <Progress
              value={(done / total) * 100}
              className="h-1.5 bg-[color:var(--workspace-surface)]"
              indicatorClassName="bg-[color:var(--workspace-success)] transition-all duration-500"
            />
          </div>

          {/* Body: step nav + content */}
          <div className="grid items-start gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">

            {/* Step nav — desktop sidebar only; mobile uses progress bar + prev/next */}
            <div className="hidden lg:block lg:sticky lg:top-4">
              <div className="relative grid gap-1">
                {/* Vertical connector — turns the step list into a visual roadmap */}
                <div
                  className="pointer-events-none absolute w-px bg-[color:var(--workspace-border)]"
                  style={{ left: '24px', top: '22px', bottom: '22px' }}
                />
                {STEPS.map((s, i) => {
                  const isComplete = completedSteps.includes(i);
                  const isActive = currentStep === i;
                  return (
                    <Button
                      key={s.id}
                      variant="ghost"
                      onClick={() => setCurrentStep(i)}
                      className={[
                        "radius-workspace-control h-auto w-full justify-start gap-3 rounded-none px-3 py-2.5 text-left transition-colors",
                        isActive
                          ? "bg-[color:var(--workspace-muted)] hover:bg-[color:var(--workspace-muted)]"
                          : "hover:bg-[color:var(--workspace-surface)]",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "flex size-6 shrink-0 items-center justify-center rounded-full text-white",
                          isComplete
                            ? "bg-[color:var(--workspace-success)]"
                            : isActive
                            ? "bg-[color:var(--accent)]"
                            : "border border-[color:var(--workspace-border)] bg-[color:var(--workspace-surface)] text-[color:var(--muted-foreground)]",
                        ].join(" ")}
                      >
                        {isComplete ? (
                          <InterfaceIcon name="check" size={12} />
                        ) : (
                          <span className="type-caption font-semibold leading-none">{i + 1}</span>
                        )}
                      </div>
                      <div className="grid min-w-0 gap-0.5">
                        <p className={[
                          "type-body-sm font-medium truncate",
                          isComplete
                            ? "text-[color:var(--workspace-success)]"
                            : isActive
                            ? "text-[color:var(--foreground)]"
                            : "text-[color:var(--muted-foreground)]",
                        ].join(" ")}>
                          {s.title}
                        </p>
                        <p className="type-caption text-[color:var(--muted-foreground)] opacity-60">{s.phase}</p>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Step content */}
            <div className="grid gap-4">
              <WorkspacePanel elevated>
                <PanelHeader>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <StatusBadge tone="info">{step.phase}</StatusBadge>
                      {currentDone && <StatusBadge tone="success">Complete</StatusBadge>}
                    </div>
                    <PanelTitle>{step.title}</PanelTitle>
                    <PanelDescription>
                      Step {currentStep + 1} of {total}
                    </PanelDescription>
                  </div>
                </PanelHeader>
                <PanelBody className="grid gap-5">
                  {/* Single focal point: one clear action per step */}
                  <div className="flex items-start gap-3 rounded-lg border border-[color:var(--workspace-border)] bg-[color:var(--workspace-surface)] px-4 py-3">
                    <InterfaceIcon name="task" size={15} className="mt-0.5 shrink-0 text-[color:var(--accent)]" />
                    <p className="type-body-sm text-[color:var(--foreground)]">
                      <span className="font-semibold text-[color:var(--accent)]">Your task: </span>
                      {step.action}
                    </p>
                  </div>
                  <StepContent index={currentStep} />
                </PanelBody>
              </WorkspacePanel>

              {/* Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Button
                  variant="outline"
                  disabled={isFirst}
                  onClick={() => setCurrentStep((s) => s - 1)}
                >
                  <InterfaceIcon name="back" data-icon="inline-start" size={18} />
                  Previous
                </Button>

                {allDone ? (
                  <div className="flex items-center gap-3">
                    <StatusBadge tone="success">All steps complete</StatusBadge>
                    <Button variant="outline" onClick={handleReset}>Start over</Button>
                    <Button asChild>
                      <Link href="/admin">Go to Admin Console</Link>
                    </Button>
                  </div>
                ) : (
                  <Button onClick={markAndAdvance}>
                    {isLast
                      ? currentDone ? "Complete" : "Mark Complete"
                      : currentDone ? "Next Step" : "Mark Complete & Continue"}
                    {!isLast && <InterfaceIcon name="next" data-icon="inline-end" size={18} />}
                  </Button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <LunaCompanion />
    </TooltipProvider>
      )}
    </PasswordGate>
  );
}
