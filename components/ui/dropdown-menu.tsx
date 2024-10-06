"use client";
import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import * as React from "react";

import { clx } from "@/lib/utils/clx/clx-merge";
import { cn } from "@/lib/utils/core/cn";
import Check from "@/components/icons/check";
import ChevronRight from "@/components/icons/chevron-right";
import Circle from "@/components/icons/circle";
// Primitives are CLI-installed by default, but @radix-ui can also be used
import * as DropdownMenuPrimitive from "@/components/primitives/dropdown-menu";
import { MOTION, STYLES } from "@/components/ui/_shared";

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                        FUNCTIONS                           */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuShortcut = clx.span("ml-auto text-xs tracking-widest opacity-60");

const DropdownMenuSubContent = clx(
  DropdownMenuPrimitive.SubContent,
  STYLES.CONTENT_OVERFLOW_POPOVER,
  MOTION.ANIMATE_IN,
  MOTION.ANIMATE_OUT,
  MOTION.FADE_IN_OUT,
  MOTION.ZOOM_IN_OUT,
  MOTION.SLIDE_IN,
  "shadow-lg min-w-[8rem] p-1",
);

const DropdownMenuContentRoot = clx(
  DropdownMenuPrimitive.Content,
  STYLES.CONTENT_OVERFLOW_POPOVER,
  MOTION.ANIMATE_IN,
  MOTION.ANIMATE_OUT,
  MOTION.FADE_IN_OUT,
  MOTION.ZOOM_IN_OUT,
  MOTION.SLIDE_IN,
  "shadow-md min-w-[8rem] p-1",
);

const DropdownMenuLabelRoot = clx(
  DropdownMenuPrimitive.Label,
  "px-2 py-1.5 text-sm font-semibold",
);

const DropdownMenuSeparator = clx(
  DropdownMenuPrimitive.Separator,
  "-mx-1 my-1 h-px bg-mut",
);

const DropdownMenuSubTriggerRoot = clx(
  DropdownMenuPrimitive.SubTrigger,
  STYLES.CURSOR_DEFAULT,
  STYLES.FLEX_CENTER,
  STYLES.ACCENT_STATE_OPEN,
  "select-none rounded-sm text-sm outline-none",
  "px-2 py-1.5",
);

const DropdownMenuCheckboxItemRoot = clx(
  DropdownMenuPrimitive.CheckboxItem,
  STYLES.CURSOR_DEFAULT,
  STYLES.FLEX_CENTER,
  STYLES.DISABLED_EVENTS_NONE_DATA,
  STYLES.ACCENT_FOCUS,
  "select-none rounded-sm text-sm outline-none",
  "relative py-1.5 pl-8 pr-2 transition-colors",
);

const DropdownMenuRadioItemRoot = clx(
  DropdownMenuPrimitive.RadioItem,
  STYLES.CURSOR_DEFAULT,
  STYLES.FLEX_CENTER,
  STYLES.DISABLED_EVENTS_NONE_DATA,
  STYLES.ACCENT_FOCUS,
  "select-none rounded-sm text-sm outline-none",
  "relative py-1.5 pl-8 pr-2",
);

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                        FUNCTIONS                           */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

type ChildrenInsetProps = PropsWithChildren<{
  inset?: boolean;
}>;

function DropdownMenuSubTrigger({ inset, children }: ChildrenInsetProps) {
  return (
    <DropdownMenuSubTriggerRoot className={cn(inset && "pl-8")}>
      {children}
      <ChevronRight className="ml-auto size-4" />
    </DropdownMenuSubTriggerRoot>
  );
}

function DropdownMenuLabel({ inset, children }: ChildrenInsetProps) {
  return (
    <DropdownMenuLabelRoot className={cn(inset && "pl-8")}>
      {children}
    </DropdownMenuLabelRoot>
  );
}

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/

type DropdownMenuContentProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.DropdownMenuContent
> & {
  sideOffset?: number;
};

function DropdownMenuContent({ sideOffset = 4, ...props }: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuContentRoot sideOffset={sideOffset} {...props} />
    </DropdownMenuPrimitive.Portal>
  );
}

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/

const ItemWrapper = clx.span(STYLES.FLEX_CENTER_JUSTIFIED, "absolute left-2 h-3.5 w-3.5");

function DropdownMenuCheckboxItem({
  children,
  checked,
  ...props
}: React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.DropdownMenuCheckboxItem
>) {
  return (
    <DropdownMenuCheckboxItemRoot checked={checked} {...props}>
      <ItemWrapper>
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </ItemWrapper>
      {children}
    </DropdownMenuCheckboxItemRoot>
  );
}

function DropdownMenuRadioItem({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.DropdownMenuRadioItem>) {
  return (
    <DropdownMenuRadioItemRoot {...props}>
      <ItemWrapper>
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="fill-current size-2" />
        </DropdownMenuPrimitive.ItemIndicator>
      </ItemWrapper>
      {children}
    </DropdownMenuRadioItemRoot>
  );
}

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
