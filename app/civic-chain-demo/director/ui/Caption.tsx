"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Caption({ text }: { text: string | null }) {
  const [visible, setVisible] = useState(false);
  const [displayed, setDisplayed] = useState(text);

  useEffect(() => {
    if (text) {
      setDisplayed(text);
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 5_000);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [text]);

  if (!displayed) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "pointer-events-none fixed bottom-10 left-1/2 z-[9998] -translate-x-1/2 transition-all duration-500",
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
    >
      <div className="max-w-2xl rounded-lg border border-blue-900/20 bg-blue-950/90 px-5 py-3 text-center shadow-xl backdrop-blur-sm">
        <p className="body-sm font-medium tracking-wide text-cream-50">{displayed}</p>
      </div>
    </div>
  );
}
