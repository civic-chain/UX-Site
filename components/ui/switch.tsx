"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type SwitchProps = Omit<
  React.ComponentProps<"button">,
  "onChange" | "value" | "type" | "role" | "aria-checked"
> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

/**
 * On/off toggle. Dependency-free: a `role="switch"` button with controlled or
 * uncontrolled state, keyboard (Space/Enter), and a reduced-motion-safe knob.
 */
function Switch({
  className,
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  ...props
}: SwitchProps) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = isControlled ? checked : internal;
  const state = on ? "checked" : "unchecked";

  function toggle() {
    const next = !on;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      data-state={state}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        "inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-2xl border border-blue-300 bg-cream-50 p-1 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-blue-900 data-[state=checked]:bg-blue-900",
        className,
      )}
      {...props}
    >
      <span
        data-state={state}
        className="size-4 rounded-2xl bg-background shadow-md transition-transform duration-[var(--dur-med)] ease-[var(--ease-soft)] data-[state=checked]:translate-x-5 motion-reduce:transition-none"
      />
    </button>
  );
}

export { Switch };
