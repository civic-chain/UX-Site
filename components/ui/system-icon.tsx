import { Icon, type IconName, type IconSize, type IconWeight } from "./icon";

// Utility/control icons (arrows, chevrons, check, close, globe). A thin named
// facade over Icon so controls reach for a small, stable vocabulary; defaults
// to the 16px control size.
type SystemIconProps = {
  name: IconName;
  size?: IconSize;
  weight?: IconWeight;
  label?: string;
  className?: string;
};

export function SystemIcon({
  name,
  size = "xs",
  weight,
  label,
  className,
}: SystemIconProps) {
  return (
    <Icon name={name} size={size} weight={weight} label={label} className={className} />
  );
}
