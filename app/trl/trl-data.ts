// Target Responsibility Ledger (TRL) — demo seed data.
//
// A faithful, client-only slice of the design doc's §17 demo: the theoretical
// Binlan District, Linjiang Municipality. Fictional throughout — safe to demo.
// No payments, no money movement, no value transfer (§3). Where a target has a
// budget, we track budget-execution as a KPI and reference an EXTERNAL treasury
// disbursement by id — the TRL still moves no money and holds no instrument.
// This module is pure data + types; anchoring lives in trl-anchor.ts, scoring
// in trl-scoring.ts.

export type VerificationClass =
  | "machine" // authenticated system of record (12345, approval sys, sensor)
  | "multi-attested" // M-of-N accountable signers
  | "single-attested" // one accountable signer
  | "self-reported" // unverified claim by the responsible party
  | "citizen-rated"; // aggregate geo-verified satisfaction

export type TargetStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "MET"
  | "MISSED"
  | "VERIFIED"
  | "DISPUTED";

// A signer in the demo allowlist (config/signers.json in a real deployment).
export type SignerId =
  | "eval_office"
  | "grid_worker_a"
  | "housing_bureau"
  | "river_inspector"
  | "discipline_node";

export const SIGNERS: Record<SignerId, { label: string; role: string }> = {
  eval_office: { label: "Evaluation Office", role: "考核办" },
  grid_worker_a: { label: "Grid Worker (A1-07)", role: "网格员" },
  housing_bureau: { label: "Housing Bureau", role: "住建局" },
  river_inspector: { label: "River Inspector", role: "河道督察" },
  discipline_node: { label: "Discipline Inspection", role: "纪检监察" },
};

export type Attestation = {
  signer: SignerId;
  claim: string;
  signedAt: string | null; // null = required but not yet signed
};

// An accountable, signed checkpoint. Attested targets complete milestone by
// milestone, not via a single machine number.
export type Milestone = { label: string; done: boolean };

// Budget-execution KPI + reference to an EXTERNAL treasury disbursement.
// Honest framing (§3): the TRL verifies the KPI and points at the treasury
// record; it never moves, holds, or settles money. `releaseAt` is the
// achievement threshold the external system uses to release the funds.
export type BudgetLink = {
  amount: string;
  purpose: string;
  releaseAt: number; // % achievement at which the external disbursement releases
  treasuryRef: string; // external system's record id — a pointer, not a rail
};

// A cascade child: one administrative level down, independently anchored.
export type CascadeNode = {
  id: string;
  level: string; // "District" | "Sub-district" | "Grid"
  unit: string;
  official: string;
  metric: string;
  target: string;
  actual: string;
  achievement: number; // 0..100, rolls up to parent
};

export type SatisfactionResult = {
  pollId: string;
  gridId: string;
  dimensions: string[];
  window: string;
  eligibility: string;
  nValid: number;
  meanScores: Record<string, number>;
  // confidence buckets → count of valid ballots
  confidenceDistribution: Record<string, number>;
};

export type RevisionEntry = {
  field: string;
  from: string;
  to: string;
  by: SignerId;
  at: string;
};

export type Target = {
  id: string;
  family: string; // the TRS program family, e.g. 接诉即办
  familyEn: string;
  title: string;
  plain: string; // plain-language summary (public-citizen view)
  measures: string; // precise: what number is counted and from where
  why: string; // the governance rationale — why this target exists
  responsibleUnit: string;
  responsibleOfficial: string;
  metric: string;
  targetValue: string;
  actualValue: string;
  achievement: number; // 0..100 — the score input (see trl-scoring)
  hard: boolean;
  veto: boolean;
  weight: number;
  verificationClass: VerificationClass;
  status: TargetStatus;
  source: string; // human label of the source system
  sourceRef: string; // the oracle: the specific feed/sensor/attestation origin
  attestations?: Attestation[];
  milestones?: Milestone[];
  cascade?: CascadeNode[];
  satisfaction?: SatisfactionResult;
  revisions?: RevisionEntry[];
  budget?: BudgetLink;
};

export const JURISDICTION = {
  name: "Binlan District",
  nameZh: "滨兰区",
  municipality: "Linjiang Municipality",
  period: "2026 — Annual",
  residents: "≈1.2M residents",
};

// ── Grid A1-07 boundary (0..100 demo coordinate space) ──
// Used by the geo-satisfaction module: a vote is eligible only if its pin
// falls inside this polygon (point-in-polygon), mirroring the boundary-polygon
// eligibility rule (§11).
export const GRID_A107_POLYGON: Array<[number, number]> = [
  [22, 20],
  [62, 14],
  [78, 34],
  [70, 66],
  [40, 78],
  [18, 54],
];

export const SATISFACTION_DIMENSIONS = ["timeliness", "quality", "courtesy"] as const;

export function seedTargets(): Target[] {
  return [
    {
      id: "binlan-12345-2026",
      family: "接诉即办",
      familyEn: "Swift Response to Complaints",
      title: "Resolve 95% of 12345 hotline complaints within 7 days",
      plain: "When residents call the 12345 city hotline, their problem should be fixed within a week — for 95 out of every 100 calls.",
      measures: "The share of 12345 hotline complaints closed within 7 calendar days, read hourly from the hotline platform. 12345 is China's unified non-emergency government hotline.",
      why: "Under the 接诉即办 (\"swift response\") reform, hotline responsiveness is the headline test of whether a district actually serves residents — and a top driver of citizen trust.",
      responsibleUnit: "District Government Service Center",
      responsibleOfficial: "Director Wen Jiahao",
      metric: "Complaints resolved ≤ 7 days",
      targetValue: "≥ 95%",
      actualValue: "92%",
      achievement: 97,
      hard: true,
      veto: false,
      weight: 0.25,
      verificationClass: "machine",
      status: "IN_PROGRESS",
      source: "12345 hotline platform (simulator) + satisfaction poll",
      sourceRef: "City Telecom hotline API · feed #8821 (12345 platform, hourly)",
      budget: {
        amount: "¥3.2M",
        purpose: "Service-quality performance grant",
        releaseAt: 95,
        treasuryRef: "Treasury ref MT-2026-118 (external — TRL moves no money)",
      },
      cascade: [
        {
          id: "A1-07",
          level: "Grid",
          unit: "Grid A1-07 (Beihu Sub-district)",
          official: "Grid Worker Lin Yao",
          metric: "Complaints resolved ≤ 7 days",
          target: "≥ 95%",
          actual: "94%",
          achievement: 99,
        },
        {
          id: "A2-03",
          level: "Grid",
          unit: "Grid A2-03 (Beihu Sub-district)",
          official: "Grid Worker Zhao Min",
          metric: "Complaints resolved ≤ 7 days",
          target: "≥ 95%",
          actual: "90%",
          achievement: 95,
        },
        {
          id: "B1-05",
          level: "Grid",
          unit: "Grid B1-05 (Nanshan Sub-district)",
          official: "Grid Worker Guo Feng",
          metric: "Complaints resolved ≤ 7 days",
          target: "≥ 95%",
          actual: "91%",
          achievement: 96,
        },
      ],
      satisfaction: {
        pollId: "binlan-12345-2026-gridA107",
        gridId: "A1-07",
        dimensions: [...SATISFACTION_DIMENSIONS],
        window: "2026-07-01 / 2026-07-31",
        eligibility: "geo_in_polygon + conf ≥ 0.6",
        nValid: 412,
        meanScores: { timeliness: 4.3, quality: 4.1, courtesy: 4.6 },
        confidenceDistribution: { "0.60–0.70": 61, "0.70–0.85": 190, "0.85–1.00": 161 },
      },
    },
    {
      id: "binlan-approval-2026",
      family: "最多跑一次",
      familyEn: "At Most One Trip",
      title: "Enterprise-establishment approval within 3 working days",
      plain: "Starting a business should take one trip to the office and be approved in three working days or less.",
      measures: "Average calendar time to approve a new-enterprise registration, plus the share of applicants who finished in a single visit — from the administrative approval system.",
      why: "\"最多跑一次\" (\"at most one trip\") is a national efficiency benchmark; faster, one-trip approvals directly lower the cost and friction of starting a business.",
      responsibleUnit: "District Administrative Approval Bureau",
      responsibleOfficial: "Director Fang Qiu",
      metric: "Avg. approval time / one-trip rate",
      targetValue: "≤ 3 days · ≥ 90% one-trip",
      actualValue: "3.4 days · 88%",
      achievement: 88,
      hard: true,
      veto: false,
      weight: 0.15,
      verificationClass: "machine",
      status: "IN_PROGRESS",
      source: "Approval / permit system (fixture)",
      sourceRef: "Administrative Approval System · permit DB export #A-2207 (nightly)",
    },
    {
      id: "binlan-heating-2026",
      family: "民生",
      familyEn: "Livelihood",
      title: "Heating-system preventive repairs in old compounds before Nov 15",
      plain: "Every older housing compound gets its heating serviced before winter, so nobody loses heat for more than a day.",
      measures: "Whether preventive boiler/heating repairs were completed in every older compound before Nov 15, with no heat outage lasting more than 24 hours.",
      why: "In northern-China winters, heating is a life-safety livelihood (民生) obligation; one multi-day outage in a cold snap is a serious, visible failure.",
      responsibleUnit: "District Housing Bureau",
      responsibleOfficial: "Deputy Director Sun Lei",
      metric: "Compounds with preventive repairs complete",
      targetValue: "100% · zero outages > 24h",
      actualValue: "Contractor reports complete",
      achievement: 80,
      hard: true,
      veto: false,
      weight: 0.2,
      verificationClass: "self-reported",
      status: "IN_PROGRESS",
      source: "Grid management + housing bureau (multi-attest)",
      sourceRef: "No automated feed — human attestation chain (grid worker → bureau)",
      budget: {
        amount: "¥5.0M",
        purpose: "Winter heating capital release",
        releaseAt: 100,
        treasuryRef: "Treasury ref MT-2026-204 (external — releases on bureau sign-off)",
      },
      milestones: [
        { label: "Contractor completes preventive repairs", done: true },
        { label: "Grid worker on-site verification", done: true },
        { label: "Housing Bureau inspection sign-off", done: false },
      ],
      attestations: [
        {
          signer: "grid_worker_a",
          claim: "Site walk confirms boiler service tags on all compounds in grid",
          signedAt: "2026-08-04T09:12:00Z",
        },
        {
          signer: "housing_bureau",
          claim: "Bureau inspection sign-off on preventive-repair completion",
          signedAt: null,
        },
      ],
    },
    {
      id: "binlan-eldercare-2026",
      family: "养老",
      familyEn: "Elder & Community Care",
      title: "Elder-care stations covering 90% of grids by Q4",
      plain: "Nine of every ten neighborhoods should have a nearby elder-care station, answering placement requests within five days.",
      measures: "The share of neighborhood grids with an operating elder-care station, and how quickly placement requests are answered — from the civil-affairs registry.",
      why: "With a rapidly ageing population, local elder-care coverage is a growing evaluation priority and a highly visible quality-of-life measure.",
      responsibleUnit: "District Civil Affairs Bureau",
      responsibleOfficial: "Director Mei Ling",
      metric: "Grid coverage / placement response",
      targetValue: "90% coverage · ≤ 5 days",
      actualValue: "78% coverage",
      achievement: 87,
      hard: false,
      veto: false,
      weight: 0.15,
      verificationClass: "single-attested",
      status: "IN_PROGRESS",
      source: "Registry + attestation + satisfaction poll",
      sourceRef: "Civil Affairs registry sync #EC-0934 + station attestation",
      budget: {
        amount: "¥2.4M",
        purpose: "Elder-care station build-out fund",
        releaseAt: 90,
        treasuryRef: "Treasury ref MT-2026-176 (external)",
      },
    },
    {
      id: "binlan-eco-2026",
      family: "生态文明",
      familyEn: "Ecological Civilization",
      title: "District bus fleet 100% electric; PM2.5 exceedance days −20%",
      plain: "Every district bus goes electric and the number of high-pollution days drops by a fifth.",
      measures: "Percent of the district bus fleet that is electric (fleet telematics) and the year-over-year change in days exceeding PM2.5 limits (air sensors).",
      why: "\"生态文明\" (ecological civilization) ties officials' evaluations to concrete environmental outcomes like clean air and fleet electrification.",
      responsibleUnit: "District Transport & Ecology Bureau",
      responsibleOfficial: "Director He Yun",
      metric: "Fleet electrification / PM2.5 exceedance days",
      targetValue: "100% fleet · −20% PM2.5",
      actualValue: "84% fleet · −12% PM2.5",
      achievement: 82,
      hard: true,
      veto: false,
      weight: 0.15,
      verificationClass: "machine",
      status: "IN_PROGRESS",
      source: "IoT air sensors + fleet registry (fixture)",
      sourceRef: "IoT air-quality sensor grid #410-C + fleet telematics registry (live)",
    },
    {
      id: "binlan-river-2026",
      family: "河长制",
      familyEn: "River Chief System",
      title: "Binlan Creek: maintain Class III water; 3 remediation milestones",
      plain: "A named official is personally responsible for keeping Binlan Creek clean (Class III) and finishing three cleanup projects.",
      measures: "Whether Binlan Creek holds national Class III water quality (IoT buoy sampling) and how many of three riverbank remediation projects are finished and signed off.",
      why: "The 河长制 (\"River Chief\") system assigns a named official personal accountability for a specific water body — the clearest example of who-promised-what.",
      responsibleUnit: "District Water Authority",
      responsibleOfficial: "River Chief Cao Zhen (named accountability)",
      metric: "Water class / remediation milestones",
      targetValue: "Class III · 3 milestones",
      actualValue: "Class III · 2 of 3 milestones",
      achievement: 83,
      hard: true,
      veto: false,
      weight: 0.1,
      verificationClass: "multi-attested",
      status: "IN_PROGRESS",
      source: "Water-quality IoT + inspector attestation",
      sourceRef: "Water-quality IoT buoy #RC-17 (15-min) + inspector field log",
      milestones: [
        { label: "Reach 1 — bank stabilization", done: true },
        { label: "Reach 2 — stormwater outfall remediation", done: true },
        { label: "Reach 3 — wetland buffer restoration", done: false },
      ],
      attestations: [
        {
          signer: "river_inspector",
          claim: "Milestones 1–2 verified on site; water sampling holds Class III",
          signedAt: "2026-07-20T14:00:00Z",
        },
      ],
    },
    {
      id: "binlan-business-2026",
      family: "营商环境",
      familyEn: "Business Environment Optimization",
      title: "Cross-border business permit turnaround < 48h; ESG milestone compliance",
      plain: "Foreign and cross-border companies get their permits in under two days, and district projects hit their carbon-reduction checkpoints.",
      measures: "Turnaround time for cross-border / foreign-enterprise permits (single-window customs system) and how many of four ESG / carbon-reduction checkpoints have been met.",
      why: "营商环境 (\"business environment\") optimization is a top-priority metric for attracting foreign investment and meeting cross-border trade and sustainability goals.",
      responsibleUnit: "District Commerce & Investment Bureau",
      responsibleOfficial: "Director Xu Wanqing",
      metric: "Cross-border permit turnaround / ESG checkpoints met",
      targetValue: "< 48h · 4 of 4 ESG checkpoints",
      actualValue: "51h · 3 of 4 checkpoints",
      achievement: 86,
      hard: true,
      veto: false,
      weight: 0.15,
      verificationClass: "machine",
      status: "IN_PROGRESS",
      source: "Cross-border permit system + customs API + ESG registry",
      sourceRef: "Cross-border permit system #BE-118 + customs single-window API",
      budget: {
        amount: "¥4.5M",
        purpose: "Foreign-investment facilitation incentive",
        releaseAt: 90,
        treasuryRef: "Treasury ref MT-2026-241 (external)",
      },
      milestones: [
        { label: "Single-window customs integration live", done: true },
        { label: "Bilingual permit portal launched", done: true },
        { label: "Carbon-reduction reporting baseline set", done: true },
        { label: "ESG audit — Scope 1–2 verification", done: false },
      ],
    },
    {
      id: "binlan-safety-2026",
      family: "安全",
      familyEn: "Safety / Stability (veto)",
      title: "Zero major workplace-safety incidents in scope",
      plain: "No serious workplace-safety accidents all year — a red line that overrides everything else if broken.",
      measures: "The count of major workplace-safety incidents in scope for the year, from the emergency incident system with bureau attestation.",
      why: "Safety is a 一票否决 (\"single-veto\") red line: one major incident can override an otherwise strong scorecard, reflecting how heavily stability is weighted.",
      responsibleUnit: "District Emergency Management Bureau",
      responsibleOfficial: "Director Tao Bing",
      metric: "Major workplace-safety incidents",
      targetValue: "0 incidents",
      actualValue: "0 incidents",
      achievement: 100,
      hard: true,
      veto: true, // 一票否决
      weight: 0,
      verificationClass: "single-attested",
      status: "MET",
      source: "Incident system + attestation",
      sourceRef: "Emergency incident system #EM-551 + bureau attestation",
    },
  ];
}
