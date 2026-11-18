"use client";

import { useState } from "react";
import type { ComponentProps, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Interactive prop explorer for the brand docs. Pick props from the controls,
// watch the live component update, and read the exact JSX — the prop names as
// they appear in code. Locked styling means there is nothing to change here
// except the props the component actually exposes.

type PlaygroundValue = string | boolean | undefined;
export type PlaygroundProps = Record<string, PlaygroundValue>;

export type PlaygroundOption<TValue extends PlaygroundValue = PlaygroundValue> = {
  label: string;
  // The real prop value. `undefined` means "prop omitted".
  value: TValue;
  chipTone?: ComponentProps<typeof Button>["tone"];
};

export type PlaygroundControl<TProps extends PlaygroundProps> = {
  [Prop in keyof TProps & string]: {
    prop: Prop;
    options: readonly PlaygroundOption<TProps[Prop]>[];
    // "chips" (default) renders option buttons; "select" renders a dropdown for
    // long lists like the full icon registry.
    kind?: "chips" | "select";
  };
}[keyof TProps & string];

type PropPlaygroundProps<TProps extends PlaygroundProps> = {
  controls: readonly PlaygroundControl<TProps>[];
  initial: TProps;
  preview: (props: TProps) => ReactNode;
  code: (props: TProps) => string;
};

// Radix Select forbids an empty value, so "prop omitted" rides this sentinel.
const NONE_VALUE = "__none__";

export function PropPlayground<TProps extends PlaygroundProps>({
  controls,
  initial,
  preview,
  code,
}: PropPlaygroundProps<TProps>) {
  const [props, setProps] = useState(initial);

  function setProp<Prop extends keyof TProps & string>(
    prop: Prop,
    value: TProps[Prop],
  ) {
    setProps((current) => {
      const next = { ...current };
      next[prop] = value;
      return next;
    });
  }

  function valueFromSelect<Prop extends keyof TProps & string>(
    control: PlaygroundControl<TProps> & { prop: Prop },
    value: string,
  ): TProps[Prop] {
    return (value === NONE_VALUE
      ? undefined
      : control.options.find((option) => String(option.value) === value)?.value) as TProps[Prop];
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 rounded-2xl border border-border bg-cream-50 p-5 lg:p-6">
        {controls.map((control) => (
          <div
            key={control.prop}
            className="grid gap-2 sm:grid-cols-[8rem_1fr] sm:items-baseline"
          >
            <code className="body-sm font-semibold text-foreground">{control.prop}</code>
            {control.kind === "select" ? (
              <Select
                value={
                  props[control.prop] === undefined
                    ? NONE_VALUE
                    : String(props[control.prop])
                }
                onValueChange={(value) => {
                  setProp(control.prop, valueFromSelect(control, value));
                }}
              >
                <SelectTrigger aria-label={control.prop} className="w-full max-w-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {control.options.map((option) => (
                    <SelectItem
                      key={option.label}
                      value={option.value === undefined ? NONE_VALUE : String(option.value)}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div
                aria-label={control.prop}
                className="inline-flex flex-wrap items-center gap-1 rounded-2xl border border-border bg-cream-50 ctl-tone-cream p-1"
              >
                {control.options.map((option) => {
                  const selected = props[control.prop] === option.value;
                  return (
                    <Button
                      key={option.label}
                      variant={selected ? "filled" : "ghost"}
                      size="sm"
                      tone={selected ? option.chipTone : undefined}
                      aria-pressed={selected}
                      onClick={() => setProp(control.prop, option.value)}
                    >
                      {option.label}
                    </Button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex min-h-32 flex-wrap items-center justify-center gap-5 rounded-2xl border border-dashed border-blue-900/20 bg-cream-50 p-8">
        {preview(props)}
      </div>

      <pre className="overflow-x-auto rounded-2xl bg-foreground p-4">
        <code className={cn("body-sm text-cream-100")}>{code(props)}</code>
      </pre>
    </div>
  );
}
