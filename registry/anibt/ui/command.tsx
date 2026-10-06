"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/registry/anibt/ui/dialog"

/**
 * Command — AniBT 「贴纸手账」 command list and ⌘K palette (cmdk).
 *
 * The list is *content*, not a tier of its own: it fills a `DialogContent`
 * (`CommandDialog`) or a `PopoverContent`, which own the floating edge and
 * shadow, so it paints the popover paper and no second border. The search row
 * is 44px over the dashed stitch with a muted glass; anything passed as
 * `CommandInput`'s children sits at its right end (an `esc` key cap). Rows are
 * 32px on radius 10; the row under the cursor takes the pink wash, pink ink
 * and a pink icon. Group heads are 12/600 muted, groups part on the stitch.
 *
 * Export names and props are shadcn's, so this file can replace
 * `components/ui/command.tsx`.
 */

function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex h-full w-full min-h-0 flex-col overflow-hidden rounded-[14px] bg-popover text-[13px] text-popover-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "命令面板",
  description = "搜索要执行的命令或要去的页面",
  children,
  className,
  showCloseButton = false,
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  title?: string
  description?: string
  className?: string
  /** The dialog's ✕ square. Off by default: Esc closes a palette. */
  showCloseButton?: boolean
  children?: React.ReactNode
}) {
  return (
    <Dialog {...props}>
      <DialogContent
        className={cn("top-[12vh] translate-y-0 gap-0 overflow-hidden p-0 sm:top-[18vh] sm:max-w-xl", className)}
        showCloseButton={showCloseButton}
      >
        {/* Radix reads the accessible name from inside the content. */}
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Command className="rounded-none **:data-[slot=command-input-wrapper]:h-12 **:data-[slot=command-list]:max-h-[min(360px,60dvh)] **:data-[slot=command-item]:min-h-10 [&_[cmdk-group]]:px-1.5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({ className, children, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="anibt-stitch-under flex h-11 shrink-0 items-center gap-2 px-3 text-muted-foreground focus-within:text-accent-foreground"
    >
      <SearchIcon className="size-4 shrink-0" aria-hidden="true" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "flex h-full w-full min-w-0 bg-transparent text-[16px] text-foreground outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:text-muted-foreground sm:text-[13px]",
          className
        )}
        {...props}
      />
      {children}
    </div>
  )
}

function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[300px] min-h-0 flex-1 scroll-py-1 overflow-x-hidden overflow-y-auto overscroll-contain py-1",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("py-8 text-center text-[13px] text-muted-foreground", className)}
      {...props}
    />
  )
}

function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden px-1 py-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pt-1.5 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:text-[12px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("anibt-stitch mx-3 my-1", className)}
      {...props}
    />
  )
}

function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "relative flex min-h-8 cursor-default items-center gap-2 rounded-[10px] px-2 py-1 text-[13px] outline-hidden transition-colors duration-150 select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:text-muted-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[selected=true]:[&_svg:not([class*='text-'])]:text-anibt-mark",
        className
      )}
      {...props}
    />
  )
}

/** A key or a hint at the row's right end, in the round face. */
function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn("anibt-num ml-auto pl-3 text-[12px] font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
