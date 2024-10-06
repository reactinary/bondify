import { type IconProps, SvgIcon } from "@/components/icons/_iconShared";

export default function SearchIcon({ className, ...props }: IconProps) {
  return (
    <SvgIcon className={className} {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </SvgIcon>
  );
}
