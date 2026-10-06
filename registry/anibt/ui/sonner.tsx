"use client"

import * as React from "react"
import { CheckIcon, InfoIcon, Loader2Icon, TriangleAlertIcon, XIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

/**
 * Toaster — AniBT 「贴纸手账」 toasts on sonner.
 *
 * Every toast is the floating panel: paper, a 1px edge and the pop shadow on
 * radius 14, 12px of padding. The type is a 32px tinted tile in the icon slot
 * — mint for done, blue for info, amber for a warning, red for a failure, the
 * sunk well with a spinner for work in flight — beside a 13/700 title and a
 * 12px muted line. The words still say the state on their own. The close
 * button is a quiet 24px square at the right end; an action is a small raised
 * key, a cancel is quiet.
 *
 * sonner styles a toast from attribute selectors, which outrank a utility
 * class, so the overrides here are `!important`. Its own 1px border is
 * dropped and the edge drawn in the shadow, so a toast has one line.
 *
 * Mount one `<Toaster />` near the root (shadcn's export name), then call
 * `toast.success("已复制磁力链接", { description: "…" })` from `sonner`.
 */
const TILE = "grid size-8 place-items-center rounded-[10px] [&>svg]:size-4"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      closeButton
      gap={10}
      icons={{
        success: (
          <span className={`${TILE} bg-anibt-ok-wash text-anibt-ok`}>
            <CheckIcon strokeWidth={2.75} />
          </span>
        ),
        info: (
          <span className={`${TILE} bg-anibt-time-wash text-anibt-time-ink`}>
            <InfoIcon />
          </span>
        ),
        warning: (
          <span className={`${TILE} bg-anibt-warn-wash text-anibt-warn`}>
            <TriangleAlertIcon />
          </span>
        ),
        error: (
          <span className={`${TILE} bg-anibt-danger-wash text-destructive`}>
            <XIcon strokeWidth={2.75} />
          </span>
        ),
        loading: (
          <span className={`${TILE} bg-muted text-muted-foreground shadow-[inset_0_0_0_1px_var(--border)]`}>
            <Loader2Icon className="animate-spin" />
          </span>
        ),
      }}
      toastOptions={{
        classNames: {
          toast:
            "anibt-pop! border-0! gap-3! p-3! pr-11! text-[13px]! font-sans! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
          title: "font-bold! text-[13px]! leading-snug! text-popover-foreground!",
          description: "text-[12px]! leading-normal! text-muted-foreground!",
          icon: "size-8! m-0! shrink-0!",
          closeButton:
            "top-1/2! size-6! rounded-[6px]! border-0! bg-transparent! text-muted-foreground! shadow-none! hover:bg-accent! hover:text-accent-foreground! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid [&>svg]:size-3.5!",
          actionButton:
            "anibt-btn-raised! h-7! rounded-[10px]! px-3! text-[12px]! font-semibold!",
          cancelButton: "h-7! rounded-[10px]! bg-transparent! px-3! text-[12px]! font-semibold! text-anibt-ink2! hover:bg-accent! hover:text-accent-foreground!",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "14px",
          // The close button sits at the right end, centred, instead of on the
          // top-left corner.
          "--toast-close-button-start": "auto",
          "--toast-close-button-end": "8px",
          "--toast-close-button-transform": "translateY(-50%)",
          // sonner's internal greys, pointed at the theme.
          "--gray2": "var(--muted)",
          "--gray4": "var(--border)",
          "--gray5": "var(--border)",
          "--gray11": "var(--muted-foreground)",
          "--gray12": "var(--popover-foreground)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
