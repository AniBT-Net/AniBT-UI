"use client"

import * as React from "react"
import { TriangleAlertIcon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/anibt/ui/alert-dialog"
import { Spinner } from "@/registry/anibt/ui/spinner"

/**
 * ConfirmDialog — AniBT 「贴纸手账」: the one way to ask before a destructive
 * or irreversible action, built on `@anibt/alert-dialog`.
 *
 * The footer is one order everywhere: the quiet 取消 on the left, the confirm
 * on the right — candy, or for `destructive` the red danger key, with A's red
 * mark in the bar.
 *
 * Closing:
 * - `onConfirm` returning nothing closes the dialog at once.
 * - `onConfirm` returning a promise keeps it open and busy until it settles:
 *   it closes on resolve and stays open on reject, so a failed delete leaves
 *   the reader where they can read the error and retry.
 * - A caller that owns the pending flag can pass `loading`; the confirm then
 *   shows the spinner and refuses further clicks.
 */
type ConfirmDialogProps = {
  /** Controlled open state. Omit when using `trigger`. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** The element that opens the dialog (uncontrolled use). */
  trigger?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  /** Extra content between the bar and the buttons. */
  children?: React.ReactNode
  confirmLabel: React.ReactNode
  cancelLabel?: React.ReactNode
  /** The red confirm and the red mark. Deletes and revokes are destructive. */
  destructive?: boolean
  /** The icon in the bar's mark; a destructive dialog defaults to a warning sign. */
  icon?: React.ReactNode
  /** External pending state, merged with the promise `onConfirm` returns. */
  loading?: boolean
  confirmDisabled?: boolean
  onConfirm: () => void | Promise<unknown>
}

function ConfirmDialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  confirmLabel,
  cancelLabel = "取消",
  destructive = false,
  icon,
  loading = false,
  confirmDisabled = false,
  onConfirm,
}: ConfirmDialogProps) {
  const [pending, setPending] = React.useState(false)
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const busy = loading || pending
  const isOpen = open ?? uncontrolledOpen
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (open === undefined) setUncontrolledOpen(next)
      onOpenChange?.(next)
    },
    [open, onOpenChange]
  )

  const handleConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (busy) {
      event.preventDefault()
      return
    }
    const result = onConfirm()
    if (!isPromiseLike(result)) return

    // Radix closes an alert dialog from its action unless the click's default
    // is prevented: keep it open while the work runs.
    event.preventDefault()
    setPending(true)
    void Promise.resolve(result).then(
      () => {
        setPending(false)
        setOpen(false)
      },
      () => {
        setPending(false)
      }
    )
  }

  const mark = icon ?? (destructive ? <TriangleAlertIcon /> : null)

  return (
    <AlertDialog open={isOpen} onOpenChange={setOpen}>
      {trigger ? <AlertDialogTrigger {...{ asChild: true }}>{trigger}</AlertDialogTrigger> : null}
      <AlertDialogContent>
        <AlertDialogHeader>
          {mark ? <AlertDialogMedia tone={destructive ? "destructive" : "accent"}>{mark}</AlertDialogMedia> : null}
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description ? <AlertDialogDescription>{description}</AlertDialogDescription> : null}
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={busy}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            variant={destructive ? "destructive" : "default"}
            disabled={busy || confirmDisabled}
            aria-busy={busy || undefined}
            onClick={handleConfirm}
          >
            {busy ? <Spinner className="size-4" /> : null}
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  return typeof value === "object" && value !== null && typeof (value as PromiseLike<unknown>).then === "function"
}

export { ConfirmDialog }
export type { ConfirmDialogProps }
