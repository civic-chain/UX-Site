import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "shadow-md rounded-2xl grid w-full grid-cols-[auto_1fr] items-start gap-3 border px-4 py-3 body-sm [&>.material-symbols-rounded]:mt-1 [&>.material-symbols-rounded]:shrink-0 [&>.material-symbols-rounded~*]:col-start-2",
  {
    variants: {
      variant: {
        default:
          "border-blue-900/10 bg-cream-50 text-foreground [&>.material-symbols-rounded]:text-foreground",
        destructive:
          "border-red-400 bg-red-100 text-red-600 [&>.material-symbols-rounded]:text-red-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 body-bold", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("body-sm", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
