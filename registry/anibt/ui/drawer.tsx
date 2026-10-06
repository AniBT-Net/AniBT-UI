"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

/**
 * Drawer — AniBT 「贴纸手账」: the phone's container for "one record", dragged
 * up from the bottom edge (vaul).
 *
 * The same floating paper and scrim as Dialog, rounded only on the corners
 * away from its edge. A bottom drawer carries a grab handle and clears the
 * home-indicator inset, so its footer stays tappable. `DrawerHeader` is
 * parted from the content by the dashed stitch, `DrawerBody` is the one
 * region that scrolls, and `DrawerFooter` stacks full-width buttons.
 *
 * Export names and props are shadcn's, so this file can replace
 * `components/ui/drawer.tsx`.
 */

type RenderCompat = {
  /** Base UI's `asChild`: render this element instead, with the part's props. */
  render?: React.ReactElement
  /** Base UI compatibility; ignored (Radix decides from the rendered element). */
  nativeButton?: boolean
}

/** Maps Base UI's `render` onto Radix's `asChild`. */
function renderAsChild<P extends { asChild?: boolean; children?: React.ReactNode }>({
  render,
  nativeButton: _nativeButton,
  ...props
}: P & RenderCompat): P {
  void _nativeButton
  if (!render) return props as P
  const children = props.children === undefined ? render : React.cloneElement(render, undefined, props.children)
  return { ...props, asChild: true, children } as P
}

function Drawer({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger(props: React.ComponentProps<typeof DrawerPrimitive.Trigger> & RenderCompat) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...renderAsChild(props)} />
}

function DrawerPortal({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose(props: React.ComponentProps<typeof DrawerPrimitive.Close> & RenderCompat) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...renderAsChild(props)} />
}

function DrawerOverlay({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-anibt-scrim data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

/** The grab handle on a bottom drawer: a 36×4 pill in the control-edge ink. */
function DrawerSwipeHandle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-swipe-handle"
      aria-hidden="true"
      className={cn("mx-auto mt-2.5 mb-0.5 h-1 w-9 shrink-0 rounded-full bg-input", className)}
      {...props}
    />
  )
}

function DrawerContent({ className, children, ...props }: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content anibt-pop fixed z-50 flex h-auto flex-col overscroll-contain text-[14px] outline-none",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[82dvh] data-[vaul-drawer-direction=top]:rounded-t-none",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[82dvh] data-[vaul-drawer-direction=bottom]:rounded-b-none data-[vaul-drawer-direction=bottom]:pb-[env(safe-area-inset-bottom,0px)]",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:rounded-r-none data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:rounded-l-none data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        <DrawerSwipeHandle className="hidden group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

/** Title and description over the stitch; centred on a bottom or top drawer. */
function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "anibt-stitch-under flex shrink-0 flex-col gap-1 px-4 pt-3 pb-3 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:text-left md:group-data-[vaul-drawer-direction=bottom]/drawer-content:text-left",
        className
      )}
      {...props}
    />
  )
}

/** The one scrolling region of a drawer; the footer stays reachable. */
function DrawerBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-body"
      className={cn("min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3", className)}
      {...props}
    />
  )
}

/** Full-width buttons, stacked, the action first. */
function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex shrink-0 flex-col gap-2 p-4 pt-2", className)}
      {...props}
    />
  )
}

/** 16/800 ink. */
function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-[16px] leading-snug font-extrabold text-foreground", className)}
      {...props}
    />
  )
}

/** 12, muted. */
function DrawerDescription({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-[12px] leading-normal text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerSwipeHandle,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
