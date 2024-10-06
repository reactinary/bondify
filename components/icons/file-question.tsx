import { type IconProps, SvgIcon } from "@/components/icons/_iconShared";

export default function FileQuestion({ className, ...props }: IconProps) {
  return (
    <SvgIcon className={className} {...props}>
      <path d="M12 17h.01" />
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
      <path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" />
    </SvgIcon>
  );
}
