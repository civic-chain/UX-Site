import * as React from "react";

import { cn } from "@/lib/utils";

function InputGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "shadow-md rounded-2xl flex min-h-11 w-full items-stretch overflow-hidden border border-blue-900/10 bg-cream-50",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupAddon({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 border-r border-blue-900/10 px-3 text-slate-500 last:border-r-0 first:border-r",
        className,
      )}
      {...props}
    />
  );
}

const sharedFieldClassName =
  "min-h-11 w-full border-0 bg-transparent px-3 py-2 body-sm text-foreground shadow-none outline-none placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50";

const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input">
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(sharedFieldClassName, className)}
    {...props}
  />
));
InputGroupInput.displayName = "InputGroupInput";

const InputGroupTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentPropsWithoutRef<"textarea">
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      sharedFieldClassName,
      "min-h-28 resize-none py-3 align-top",
      className,
    )}
    {...props}
  />
));
InputGroupTextarea.displayName = "InputGroupTextarea";

export { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea };
