"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Tooltip — the AniBT 「贴纸手账」 hint bubble.
 *
 * A's tip is the one dark thing on a light page (and the one light thing in
 * 夜樱): `--anibt-tip` under `--anibt-tip-ink`, 12/16, radius 6, the sticker
 * shadow, and a tail in its own colour pointing at the control. It names an
 * icon-only control or says one short fact; anything longer belongs in a
 * popover.
 *
 * Radix underneath, so hover, keyboard focus, Escape and the grace area all
 * behave. Compatibility with shadcn:
 * - `Tooltip` works without a `TooltipProvider` (it brings its own); put one
 *   provider around a list so its tooltips share one delay.
 * - `TooltipTrigger` takes Base UI's `render={<button …/>}` as well as
 *   `asChild`, and `TooltipProvider` / `Tooltip` take Base UI's `delay` as well
 *   as Radix's `delayDuration`, so the `base-*` sidebar keeps working.
 */

const TooltipScope = React.createContext(false)

type DelayProps = {
  /** Radix: ms before the tip opens. Default 0. */
  delayDuration?: number
  /** Base UI's name for `delayDuration`. */
  delay?: number
}

function TooltipProvider({
  delayDuration,
  delay,
  children,
  ...props
}: Omit<React.ComponentProps<typeof TooltipPrimitive.Provider>, "delayDuration"> & DelayProps) {
  return (
    <TooltipScope.Provider value={true}>
      <TooltipPrimitive.Provider
        data-slot="tooltip-provider"
        delayDuration={delayDuration ?? delay ?? 0}
        {...props}
      >
        {children}
      </TooltipPrimitive.Provider>
    </TooltipScope.Provider>
  )
}

function Tooltip({
  delayDuration,
  delay,
  ...props
}: Omit<React.ComponentProps<typeof TooltipPrimitive.Root>, "delayDuration"> & DelayProps) {
  const shared = React.useContext(TooltipScope)
  const root = (
    <TooltipPrimitive.Root data-slot="tooltip" delayDuration={delayDuration ?? delay} {...props} />
  )
  // A tooltip inside a provider shares its delay; a lone one brings its own.
  return shared ? root : <TooltipProvider>{root}</TooltipProvider>
}

type TooltipTriggerProps = React.ComponentProps<typeof TooltipPrimitive.Trigger> & {
  /**
   * Base UI's form of `asChild`: the element to render as the trigger. It
   * takes the trigger's props; `children` go inside it.
   */
  render?: React.ReactElement
}

function TooltipTrigger({ render, asChild, children, ...props }: TooltipTriggerProps) {
  if (render) {
    const child = children !== undefined ? React.cloneElement(render, undefined, children) : render
    return (
      <TooltipPrimitive.Trigger data-slot="tooltip-trigger" asChild {...props}>
        {child}
      </TooltipPrimitive.Trigger>
    )
  }
  return (
    <TooltipPrimitive.Trigger data-slot="tooltip-trigger" asChild={asChild} {...props}>
      {children}
    </TooltipPrimitive.Trigger>
  )
}

function TooltipContent({
  className,
  sideOffset = 6,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "anibt-tip z-50 inline-flex w-fit max-w-[min(20rem,calc(100vw-2rem))] origin-(--radix-tooltip-content-transform-origin) items-center gap-1.5 text-balance",
          "animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          // A key cap inside the tip (`⌘K`) takes the tip's ink, not a field's.
          "**:data-[slot=kbd]:h-4 **:data-[slot=kbd]:min-w-4 **:data-[slot=kbd]:bg-current/15 **:data-[slot=kbd]:text-current **:data-[slot=kbd]:shadow-none",
          className
        )}
        {...props}
      >
        {children}
        {/* A's tail: the tip's own colour, pointing at the control. */}
        <TooltipPrimitive.Arrow className="fill-anibt-tip" width={10} height={5} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
export type { TooltipTriggerProps }
