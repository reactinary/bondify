"use client";

import { clx } from "@/lib/utils/clx/clx-merge";
// Primitives are CLI-installed by default, but @radix-ui can also be used
import * as TooltipPrimitive from "@/components/primitives/tooltip";
import { MOTION, STYLES } from "@/components/ui/_shared";
import type React from "react";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContentRoot = clx(
  TooltipPrimitive.Content,
  MOTION.ANIMATE_OUT,
  MOTION.SLIDE_IN,
  STYLES.CONTENT_OVERFLOW_POPOVER,
  MOTION.TODO_STATE_TOOLTIP,
  "px-3 py-1.5 text-sm shadow-md",
);

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                     ✨ FUNCTIONS ✨                        */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

// Wrapped in Portal (cf. https://github.com/shadcn-ui/ui/issues/129)
export function TooltipContent({
  children,
  sideOffset = 4,
}: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipContentRoot sideOffset={sideOffset}>{children}</TooltipContentRoot>
    </TooltipPrimitive.Portal>
  );
}
