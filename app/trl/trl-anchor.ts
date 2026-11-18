// TRL anchoring — the honest trust surface, client-only (§12, §13).
//
// This is a faithful client-side model of the consortium-chain anchor loop:
//   canonical JSON  →  SHA-256  →  write hash to the "ledger"  →  store tx_ref.
// Verification re-hashes the *served* record and compares it to the hash on the
// ledger. NO token, NO value, hashes only. In a real deployment the ledger is a
// permissioned BSN/Fabric chain and the digest may be SM3; here it is an
// in-memory map and WebCrypto SHA-256 — the swap is noted, the loop is real.

import type { Target } from "./trl-data";

// A ledger record: what the consortium chain would hold for one anchor.
export type AnchorRecord = {
  anchorId: string;
  entityType: string;
  entityId: string;
  sha256: string;
  txRef: string;
  blockRef: string;
  anchoredAt: string;
};

export type VerifyOutcome = {
  match: boolean;
  expected: string; // hash currently on the ledger
  recomputed: string; // hash of the served record right now
  record: AnchorRecord | null;
};

// The consortium ledger: append-only in spirit; a re-anchor writes a new entry.
export class ConsortiumLedger {
  private byAnchor = new Map<string, AnchorRecord>();
  private blockHeight = 4820; // arbitrary demo starting height

  get size() {
    return this.byAnchor.size;
  }

  get(anchorId: string): AnchorRecord | null {
    return this.byAnchor.get(anchorId) ?? null;
  }

  async anchor(entityType: string, entityId: string, payload: unknown): Promise<AnchorRecord> {
    const sha256 = await sha256Hex(canonicalize(payload));
    this.blockHeight += 1;
    const record: AnchorRecord = {
      anchorId: `${entityId}@${this.blockHeight}`,
      entityType,
      entityId,
      sha256,
      txRef: `0x${sha256.slice(0, 16)}`,
      blockRef: `block #${this.blockHeight}`,
      anchoredAt: new Date().toISOString(),
    };
    this.byAnchor.set(record.anchorId, record);
    return record;
  }

  // Re-hash the served payload and compare to what the ledger holds. A tamper
  // that mutates the record after anchoring — without re-anchoring — mismatches.
  async verify(anchorId: string, servedPayload: unknown): Promise<VerifyOutcome> {
    const record = this.get(anchorId);
    const recomputed = await sha256Hex(canonicalize(servedPayload));
    return {
      match: Boolean(record) && record!.sha256 === recomputed,
      expected: record?.sha256 ?? "",
      recomputed,
      record,
    };
  }
}

// The subset of a target that constitutes its anchored baseline/result. Editing
// any of these fields after the anchor is written is what the tamper test does.
export function targetAnchorPayload(t: Target) {
  return {
    type: "target_result",
    id: t.id,
    metric: t.metric,
    target_value: t.targetValue,
    actual_value: t.actualValue,
    achievement: t.achievement,
    status: t.status,
    weight: t.weight,
    veto: t.veto,
    verification_class: t.verificationClass,
  };
}

// Stable serialization: keys sorted recursively so the same logical record
// always hashes identically regardless of property order.
export function canonicalize(value: unknown): string {
  return JSON.stringify(sortDeep(value));
}

function sortDeep(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortDeep);
  if (value && typeof value === "object") {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = sortDeep((value as Record<string, unknown>)[key]);
        return acc;
      }, {});
  }
  return value;
}

export async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
