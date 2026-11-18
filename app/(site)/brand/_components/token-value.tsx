"use client";

import { useEffect, useState } from "react";

type ResolvedTokenValueProps = {
  tokenName: string;
};

// Reads the live computed value of a design token so the docs show the real
// resolved value (hex, rem) the browser uses, not a hand-copied string.
export function ResolvedTokenValue({ tokenName }: ResolvedTokenValueProps) {
  const [value, setValue] = useState(tokenName);

  useEffect(() => {
    let isMounted = true;
    const frame = window.requestAnimationFrame(() => {
      const resolved = getComputedStyle(document.documentElement)
        .getPropertyValue(tokenName)
        .trim();

      if (isMounted) {
        setValue(resolved || tokenName);
      }
    });

    return () => {
      isMounted = false;
      window.cancelAnimationFrame(frame);
    };
  }, [tokenName]);

  // text-current keeps the value readable on light and dark surfaces alike.
  return <code className="body-xs text-current/65">{value}</code>;
}
