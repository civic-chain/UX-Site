import type { ComponentProps } from "react";

import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  BookOpen02Icon,
  Building06Icon,
  ChartAnalysisIcon,
  Chatting01Icon,
  CheckmarkCircle02Icon,
  CheckmarkSquare02Icon,
  Clock01Icon,
  CreditCardValidationIcon,
  DollarSquareIcon,
  FileDollarIcon,
  LibraryIcon,
  LocationStar01Icon,
  Mail01Icon,
  Road02Icon,
  Shield01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";

const landingIcons = {
  admin: Building06Icon,
  vendor: CreditCardValidationIcon,
  citizen: LibraryIcon,
  payment: DollarSquareIcon,
  vote: UserGroupIcon,
  metric: ChartAnalysisIcon,
  trust: Shield01Icon,
  email: Mail01Icon,
  maine: LocationStar01Icon,
  record: BookOpen02Icon,
  project: FileDollarIcon,
  pilot: Road02Icon,
  conversation: Chatting01Icon,
  bids: FileDollarIcon,
  approvals: CheckmarkCircle02Icon,
  payments: DollarSquareIcon,
  workStatus: ChartAnalysisIcon,
  paymentTiming: Clock01Icon,
  allowedSpend: Shield01Icon,
  completed: CheckmarkSquare02Icon,
} as const;

type LandingIconName = keyof typeof landingIcons;

type BrandIconProps = Omit<ComponentProps<typeof HugeiconsIcon>, "icon"> &
  (
    | {
        icon: IconSvgElement;
        name?: never;
      }
    | {
        name: LandingIconName;
        icon?: never;
      }
  );

export function BrandIcon({
  name,
  icon,
  className,
  size = 24,
  strokeWidth = 1.0,
  ...props
}: BrandIconProps) {
  const resolvedIcon = icon ?? landingIcons[name];

  return (
    <HugeiconsIcon
      icon={resolvedIcon}
      size={size}
      strokeWidth={strokeWidth}
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}
