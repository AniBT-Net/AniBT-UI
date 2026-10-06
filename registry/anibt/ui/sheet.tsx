"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { Dialog as SheetPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Sheet — AniBT 「贴纸手账」: the panel that slides in from an edge (filters,
 * navigation, a phone's sidebar).
 *
 * The same floating paper, scrim and close square as Dialog. Only the corners
 * away from the edge are rounded (14). `SheetHeader` is the stitched bar,
 * `SheetBody` is the one region that scrolls, and `SheetFooter` sits at the
 * bottom over a stitched top edge, so its buttons are always reachable.
 *
 * Export names and props are shadcn's (`side`, `showCloseButton`), so this
 * file can replace `components/ui/sheet.tsx` — shadcn's sidebar opens its
 * phone layout in it.
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

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger(props: React.ComponentProps<typeof SheetPrimitive.Trigger> & RenderCompat) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...renderAsChild(props)} />
}

function SheetClose(props: React.ComponentProps<typeof SheetPrimitive.Close> & RenderCompat) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...renderAsChild(props)} />
}

function SheetPortal({ ...props }: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-anibt-scrim duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  closeLabel = "关闭",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
  /** The close button's accessible name. */
  closeLabel?: string
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "anibt-pop fixed z-50 flex flex-col overflow-y-auto overscroll-contain text-[14px] outline-none data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:animate-in data-[state=open]:duration-300 data-[state=open]:ease-anibt-out",
          side === "right" &&
            "inset-y-0 right-0 h-full w-3/4 rounded-r-none data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
          side === "left" &&
            "inset-y-0 left-0 h-full w-3/4 rounded-l-none data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
          side === "top" &&
            "inset-x-0 top-0 h-auto max-h-[80dvh] rounded-t-none data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
          side === "bottom" &&
            "inset-x-0 bottom-0 h-auto max-h-[80dvh] rounded-b-none pb-[env(safe-area-inset-bottom,0px)] data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            className="anibt-icobtn anibt-icobtn-ghost absolute top-3 right-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid disabled:pointer-events-none"
          >
            <XIcon className="size-4" />
            <span className="sr-only">{closeLabel}</span>
          </SheetPrimitive.Close>
        ) : null}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

/** The 56px stitched bar at the top; its end is kept clear of the close square. */
function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "anibt-stitch-under flex min-h-14 shrink-0 flex-col justify-center gap-1 px-4 py-3 pe-14 text-left",
        className
      )}
      {...props}
    />
  )
}

/** The one scrolling region of a sheet. */
function SheetBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-body"
      className={cn("min-h-0 flex-1 overflow-y-auto overscroll-contain p-4", className)}
      {...props}
    />
  )
}

/** Buttons at the bottom over a stitched top edge. */
function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("anibt-stitch-over mt-auto flex shrink-0 flex-col gap-2 p-4 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  )
}

/** 16/800 ink. */
function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-[16px] leading-snug font-extrabold text-foreground", className)}
      {...props}
    />
  )
}

/** 12, muted. */
function SheetDescription({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-[12px] leading-normal text-muted-foreground", className)}
      {...props}
    />
  )
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetBody, SheetHeader, SheetFooter, SheetTitle, SheetDescription }
