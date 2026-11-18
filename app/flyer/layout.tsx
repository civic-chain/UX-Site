import type { ReactNode } from "react";

export default function FlyerLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        @media print {
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .no-print { display: none !important; }
          body { margin: 0; background: white; }
          @page { margin: 0; size: letter portrait; }
        }
      `}</style>
      {children}
    </>
  );
}
