"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

// Small client affordance: copy a block of boilerplate to the clipboard and
// flash a confirmation. Look rides the surrounding SurfaceCard tone (soft
// variant reads --ctl-*), so no per-call color.
export function CopyButton({
  value,
  label = "Copy",
}: {
  value: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard denied (insecure context / permissions). Leave the label as-is.
    }
  }

  return (
    <Button
      type="button"
      variant="soft"
      size="sm"
      icon={copied ? "check" : "note"}
      iconPosition="leading"
      onClick={handleCopy}
      aria-live="polite"
    >
      {copied ? "Copied" : label}
    </Button>
  );
}
