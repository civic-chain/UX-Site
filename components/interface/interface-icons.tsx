import type { ComponentProps } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AlertCircleIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  BookOpen02Icon,
  Building06Icon,
  Calendar04Icon,
  CardExchange02Icon,
  ChartAnalysisIcon,
  ChartBarLineIcon,
  CheckmarkBadge01Icon,
  Clock01Icon,
  CreditCardValidationIcon,
  DatabaseSync01Icon,
  FileDollarIcon,
  FileUploadIcon,
  Invoice03Icon,
  LibraryIcon,
  Location01Icon,
  LockPasswordIcon,
  Mail01Icon,
  MapsCircle01Icon,
  Payment01Icon,
  Search01Icon,
  Settings02Icon,
  Shield01Icon,
  TaskDone02Icon,
  UserGroupIcon,
  Wallet02Icon,
} from "@hugeicons/core-free-icons";

import type { InterfaceIconName } from "@/lib/interface-types";
import { cn } from "@/lib/utils";

const interfaceIcons = {
  admin: Building06Icon,
  vendor: CreditCardValidationIcon,
  citizen: LibraryIcon,
  overview: ChartAnalysisIcon,
  solicitations: FileDollarIcon,
  contracts: Invoice03Icon,
  cards: CardExchange02Icon,
  payment: Payment01Icon,
  reports: ChartBarLineIcon,
  settings: Settings02Icon,
  wallet: Wallet02Icon,
  calendar: Calendar04Icon,
  ledger: BookOpen02Icon,
  upload: FileUploadIcon,
  search: Search01Icon,
  shield: Shield01Icon,
  map: MapsCircle01Icon,
  task: TaskDone02Icon,
  clock: Clock01Icon,
  mail: Mail01Icon,
  lock: LockPasswordIcon,
  data: DatabaseSync01Icon,
  vote: UserGroupIcon,
  trend: ChartBarLineIcon,
  back: ArrowLeft01Icon,
  next: ArrowRight01Icon,
  alert: AlertCircleIcon,
  check: CheckmarkBadge01Icon,
  location: Location01Icon,
} as const satisfies Record<InterfaceIconName, unknown>;

type InterfaceIconProps = Omit<ComponentProps<typeof HugeiconsIcon>, "icon"> & {
  name: InterfaceIconName;
};

export function InterfaceIcon({
  className,
  name,
  size = 20,
  strokeWidth = 1.85,
  ...props
}: InterfaceIconProps) {
  return (
    <HugeiconsIcon
      icon={interfaceIcons[name]}
      size={size}
      strokeWidth={strokeWidth}
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}

export function InterfaceMark() {
  return (
    <div className="radius-workspace-control shadow-workspace-subtle flex size-11 items-center justify-center bg-[color:var(--accent-chip)] text-[color:var(--foreground)]">
      <InterfaceIcon name="data" size={22} />
    </div>
  );
}
