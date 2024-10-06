import { STYLES } from "@/components/ui/_shared";
import { clx } from "@/lib/utils/clx/clx-merge";
import type { ComponentProps, VariantProps } from "@/lib/utils/clx/types";

export const Badge = clx.div(
  STYLES.RING_FOCUS,
  STYLES.FLEX_CENTER,
  "rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors w-fit",
  "leading-none",
  "rounded-md",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        isNew: "bg-neutral-500  px-1.5 text-[#000000]",
        unpaid: "bg-yellow-400 text-black", // New variant for unpaid
        paid: "bg-green-500 text-white", // New variant for paid
        canceled: "bg-red-500 text-white", // New variant for canceled
        estimate: "bg-gray-400 text-white",
        certified: "bg-[#D7FF64] text-black border-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeVariants = VariantProps<typeof Badge>;
export type BadgeProps = ComponentProps<typeof Badge>;
