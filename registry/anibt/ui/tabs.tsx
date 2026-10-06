"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Tabs — the AniBT 「贴纸手账」 tab strip (Radix Tabs).
 *
 * 32px tabs (13/600 `--anibt-ink2`, the pink wash under the pointer) over a
 * stitched line; the current tab turns to ink and wears a strip of washi tape
 * under its label, tilted 1.5° — the site's one "you are here" mark. The
 * recipes are `anibt-tabs`, `anibt-tab` and `anibt-tab-on` from
 * `@anibt/theme`. A disabled tab keeps a readable muted ink.
 *
 * The strip scrolls sideways instead of wrapping: a tab is one line, and
 * eight of them on a 390px phone have to go somewhere.
 *
 * For a sunk track with a sticker thumb (a view switch, a filter) use
 * `SegmentedControl` or `ToggleGroup`: that is a choice, not navigation.
 * `TabsList`'s `variant` (`default` / `line`) exists only so code written for
 * shadcn's tabs keeps compiling; both draw the taped strip.
 */

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex min-w-0 flex-col gap-3", className)} {...props} />
}

const tabsListVariants = cva(
  "anibt-tabs w-full justify-start overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
  {
    variants: {
      variant: {
        default: "",
        line: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "anibt-tab cursor-pointer justify-center outline-hidden data-[state=active]:anibt-tab-on",
        "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
        "disabled:pointer-events-none disabled:text-muted-foreground",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[state=active]:[&_svg:not([class*='text-'])]:text-anibt-mark",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "min-w-0 flex-1 rounded-[10px] outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
