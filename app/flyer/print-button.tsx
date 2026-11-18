"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 rounded-lg border border-blue-900/20 bg-white px-4 py-2 text-sm font-semibold text-blue-900 shadow-sm transition-colors hover:border-blue-900/40 hover:bg-cream-50"
    >
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4 6V2h8v4M4 12H2V6h12v6h-2M4 9h8M4 12v2h8v-2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Print / Save PDF
    </button>
  );
}
