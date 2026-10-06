"use client"

import * as React from "react"
import { HoverCard as HoverCardPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * HoverCard — AniBT 「贴纸手账」: a preview card for a sighted pointer, opened
 * by resting on a link (a fansub group's name, a show's title).
 *
 * The floating tier (`anibt-pop`), 256 wide with 16px of padding. It is a
 * preview, never the only way to reach what it shows: the trigger is a real
 * link, and touch and keyboard readers follow it instead.
 *
 * Export names and props are shadcn's, so this file can replace
 * `components/ui/hover-card.tsx`.
 */

type RenderCompat = {
  /** Base UI's `asChild`: render this element instead, with the part's props. */
  render?: React.ReactElement
}

/** Maps Base UI's `render` onto Radix's `asChild`. */
function renderAsChild<P extends { asChild?: boolean; children?: React.ReactNode }>({
  render,
  ...props
}: P & RenderCompat): P {
  if (!render) return props as P
  const children = props.children === undefined ? render : React.cloneElement(render, undefined, props.children)
  return { ...props, asChild: true, children } as P
}

function HoverCard({ openDelay = 300, closeDelay = 150, ...props }: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" openDelay={openDelay} closeDelay={closeDelay} {...props} />
}

function HoverCardTrigger(props: React.ComponentProps<typeof HoverCardPrimitive.Trigger> & RenderCompat) {
  return <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...renderAsChild(props)} />
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "anibt-pop z-50 w-64 max-w-[calc(100vw-1rem)] origin-(--radix-hover-card-content-transform-origin) p-4 text-[13px] duration-150 outline-hidden",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
          className
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
