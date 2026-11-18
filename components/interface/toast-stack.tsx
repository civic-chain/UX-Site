"use client";

import { useCallback, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import { InterfaceIcon } from "./interface-icons";

type ToastTone = "success" | "danger" | "info";

export type Toast = { id: string; message: string; tone: ToastTone };

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, tone: ToastTone = "info") => {
      const id = String(++counter.current);
      setToasts((prev) => [...prev, { id, message, tone }]);
      setTimeout(() => dismiss(id), 4000);
    },
    [dismiss],
  );

  return { toasts, addToast, dismiss };
}

const toneClasses: Record<ToastTone, string> = {
  success:
    "border-[color:var(--workspace-success-edge)] bg-[color:var(--workspace-success-bg)] text-[color:var(--workspace-success)]",
  danger:
    "border-[color:var(--workspace-danger-edge)] bg-[color:var(--workspace-danger-bg)] text-[color:var(--workspace-danger)]",
  info:
    "border-[color:var(--workspace-info-edge)] bg-[color:var(--workspace-info-bg)] text-[color:var(--workspace-info)]",
};

export function ToastStack({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;
  return (
    <div
      className="fixed bottom-5 right-5 z-50 grid gap-2"
      role="status"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={[
            "flex min-w-72 max-w-sm items-start gap-3 rounded-lg border px-4 py-3 shadow-lg",
            toneClasses[toast.tone],
          ].join(" ")}
        >
          <InterfaceIcon
            name={toast.tone === "success" ? "check" : "alert"}
            size={15}
            className="mt-0.5 shrink-0"
          />
          <p className="type-body-sm flex-1 font-medium leading-snug">
            {toast.message}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDismiss(toast.id)}
            className="h-auto w-auto shrink-0 p-0 opacity-50 transition-opacity hover:bg-transparent hover:opacity-100"
            aria-label="Dismiss"
          >
            ✕
          </Button>
        </div>
      ))}
    </div>
  );
}
