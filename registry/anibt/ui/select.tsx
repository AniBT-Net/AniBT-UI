"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon, ChevronsUpDownIcon, ChevronUpIcon } from "lucide-react"
import { Select as SelectPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Select — the AniBT 「贴纸手账」 picker for a short list (Radix Select).
 *
 * The trigger is the same field as `Input`: 32 high (28 for `size="sm"`) on
 * radius 10, paper under the 1px `--input` ring, pink on hover, the 1.5px
 * `--ring` edge with the halo on focus and while open, red when
 * `aria-invalid`, the sunk well when disabled. The placeholder is muted.
 *
 * The list floats on the `anibt-pop` panel. A row is 32 high on radius 10;
 * the highlighted row is the pink wash under pink ink, and the chosen row is
 * the heavier pink label plus a pink tick at its end — one surface for
 * "here", one mark for "chosen". Groups take a 12px muted head, and a
 * stitched rule parts them.
 */

function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup(props: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue(props: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "bg-card text-foreground inset-ring-1 inset-ring-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground hover:inset-ring-anibt-wash-line focus-visible:inset-ring-[1.5px] focus-visible:inset-ring-ring focus-visible:ring-4 focus-visible:ring-ring/20 data-[state=open]:inset-ring-[1.5px] data-[state=open]:inset-ring-ring aria-invalid:inset-ring-[1.5px] aria-invalid:inset-ring-anibt-danger-fill aria-invalid:ring-4 aria-invalid:ring-anibt-danger-fill/15 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:inset-ring-border",
        "flex w-fit min-w-0 items-center justify-between gap-2 rounded-[10px] border-0 px-3 py-0 text-[13px] whitespace-nowrap transition-[color,background-color,box-shadow] duration-150 outline-none select-none data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:px-2.5 data-[size=sm]:text-[12px]",
        "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:min-w-0 *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      {/* No JSX `asChild` in a registry file: shadcn's base-* styles rewrite
          it to `render` on install. */}
      <SelectPrimitive.Icon className="flex shrink-0 text-muted-foreground">
        <ChevronsUpDownIcon className="size-4" aria-hidden="true" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position,
  alignItemWithTrigger = false,
  align = "start",
  side = "bottom",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content> & {
  /**
   * Base UI's name for Radix's `position="item-aligned"`: open with the
   * chosen row over the trigger. A uses the popper (`false`, the default).
   */
  alignItemWithTrigger?: boolean
}) {
  const placement = position ?? (alignItemWithTrigger ? "item-aligned" : "popper")
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "anibt-pop relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
          className
        )}
        position={placement}
        {...(placement === "popper" ? { align, side, sideOffset } : {})}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn("p-1", placement === "popper" && "w-full min-w-(--radix-select-trigger-width) scroll-my-1")}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-2 pt-2 pb-1 text-[12px] font-semibold text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex h-8 w-full cursor-default items-center gap-2 rounded-[10px] py-0 pr-8 pl-2 text-[13px] text-foreground outline-hidden select-none",
        "focus:bg-accent focus:text-accent-foreground data-[state=checked]:font-semibold data-[state=checked]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:text-muted-foreground",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground focus:[&_svg:not([class*='text-'])]:text-anibt-mark",
        className
      )}
      {...props}
    >
      <span data-slot="select-item-indicator" className="absolute right-2 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4 text-anibt-mark" strokeWidth={2.5} aria-hidden="true" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>
        <span className="flex min-w-0 items-center gap-2">{children}</span>
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

/** A stitched rule between groups. */
function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("anibt-stitch pointer-events-none mx-2 my-1", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn("flex cursor-default items-center justify-center py-1 text-muted-foreground", className)}
      {...props}
    >
      <ChevronUpIcon className="size-4" aria-hidden="true" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn("flex cursor-default items-center justify-center py-1 text-muted-foreground", className)}
      {...props}
    >
      <ChevronDownIcon className="size-4" aria-hidden="true" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
