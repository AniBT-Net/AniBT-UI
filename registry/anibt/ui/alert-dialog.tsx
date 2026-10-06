"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertDialog as AlertDialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/anibt/ui/button"

/**
 * AlertDialog — AniBT 「贴纸手账」: a question that must be answered.
 *
 * The same floating panel and 48px stitched bar as Dialog, without a close
 * button: the reader leaves through 取消 or the action. `AlertDialogMedia` is
 * A's dialog mark, a 24px tinted tile in the bar before the title — red for a
 * destructive question. The footer is one order everywhere: the quiet cancel
 * on the left, the action on the right (`variant="destructive"` for the red
 * one).
 *
 * Export names and props are shadcn's (including `size` on the content and
 * `variant` / `size` on the action and the cancel), so this file can replace
 * `components/ui/alert-dialog.tsx`.
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

function AlertDialog({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger(props: React.ComponentProps<typeof AlertDialogPrimitive.Trigger> & RenderCompat) {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...renderAsChild(props)} />
}

function AlertDialogPortal({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
}

function AlertDialogOverlay({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-anibt-scrim duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content> & {
  /** `default` is 420 wide; `sm` is 320 with the two buttons side by side. */
  size?: "default" | "sm"
}) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        data-size={size}
        className={cn(
          "group/alert-dialog-content anibt-pop fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100dvh-2rem)] w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-3 overflow-y-auto overscroll-contain p-4 text-[14px] duration-200 outline-none data-[size=default]:sm:max-w-[420px] data-[size=sm]:max-w-xs",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

/** The 48px stitched bar. With a media tile the tile sits left of the title. */
function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "anibt-stitch-under -mx-4 -mt-4 grid min-h-12 shrink-0 content-center items-center gap-x-2 gap-y-1 px-4 py-3 text-left has-data-[slot=alert-dialog-media]:grid-cols-[auto_minmax(0,1fr)] *:data-[slot=alert-dialog-description]:col-start-1 has-data-[slot=alert-dialog-media]:*:data-[slot=alert-dialog-description]:col-start-2",
        className
      )}
      {...props}
    />
  )
}

/** Right-aligned buttons; `size="sm"` puts them side by side at equal width. */
function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex shrink-0 flex-col-reverse gap-2 pt-1 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("text-[14px] leading-snug font-bold text-foreground", className)}
      {...props}
    />
  )
}

function AlertDialogDescription({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-[13px] leading-normal text-anibt-ink2", className)}
      {...props}
    />
  )
}

const alertDialogMediaVariants = cva(
  "grid size-6 shrink-0 place-items-center rounded-[6px] [&>svg]:pointer-events-none [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      tone: {
        default: "bg-muted text-anibt-ink2",
        destructive: "bg-anibt-danger-wash text-destructive",
        warning: "bg-anibt-warn-wash text-anibt-warn",
        accent: "bg-accent text-accent-foreground",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  }
)

/** A's dialog mark: a 24px tinted tile holding one icon, left of the title. */
function AlertDialogMedia({
  className,
  tone,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertDialogMediaVariants>) {
  return (
    <div
      data-slot="alert-dialog-media"
      aria-hidden="true"
      className={cn(alertDialogMediaVariants({ tone }), className)}
      {...props}
    />
  )
}

/** The answer: candy by default, `variant="destructive"` for the red one. */
function AlertDialogAction({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Action data-slot="alert-dialog-action" className={cn(className)} {...props} />
    </Button>
  )
}

/** The way out: the quiet tier, left of the action. */
function AlertDialogCancel({
  className,
  variant = "ghost",
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Cancel data-slot="alert-dialog-cancel" className={cn(className)} {...props} />
    </Button>
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  alertDialogMediaVariants,
}
