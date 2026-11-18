"use client"

import { Toaster as SonnerToaster } from "sonner"
import type { ToasterProps } from "sonner"

function Toaster({ ...props }: ToasterProps) {
  return (
    <SonnerToaster
      position="bottom-right"
      style={{
        "--normal-bg":     "var(--control-panel-strong)",
        "--normal-border": "var(--control-border)",
        "--normal-text":   "var(--foreground)",
        "--success-bg":    "var(--workspace-success-bg)",
        "--success-border":"var(--workspace-success-edge)",
        "--success-text":  "var(--workspace-success)",
        "--error-bg":      "var(--workspace-danger-bg)",
        "--error-border":  "var(--workspace-danger-edge)",
        "--error-text":    "var(--workspace-danger)",
        "--warning-bg":    "var(--workspace-warning-bg)",
        "--warning-border":"var(--workspace-warning-edge)",
        "--warning-text":  "var(--workspace-warning)",
        "--info-bg":       "var(--workspace-info-bg)",
        "--info-border":   "var(--workspace-info-edge)",
        "--info-text":     "var(--workspace-info)",
      } as React.CSSProperties}
      {...props}
    />
  )
}

export { Toaster }
export { toast } from "sonner"
