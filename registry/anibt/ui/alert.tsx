import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Alert — an AniBT 「贴纸手账」 notice.
 *
 * A note on the state's wash: radius 10, a 1px edge in the state's line, 13px
 * copy, and the icon (an `svg` as the first child, as in shadcn) in the
 * state's ink. One job per colour: `info` is blue (time, in progress),
 * `success` mint, `warning` amber, `destructive` red; `default` is neutral.
 * Pink never marks a notice — it is for actions.
 *
 * `inline` draws the site's row form instead: no fill, a 1px rule above and
 * below, and a 6px dot in the state's colour leading the line — for a notice
 * that is a line of a form or a list rather than a box on the page. The words
 * must say the state on their own; colour never speaks alone.
 *
 * `role="alert"` is the default; pass `role="status"` for a notice that is
 * not urgent. `AlertAction` holds a button at the top-right.
 */
const alertVariants = cva(
  "group/alert relative grid w-full grid-cols-[minmax(0,1fr)] items-start gap-x-2.5 gap-y-0.5 text-left text-[13px] leading-[1.6] has-data-[slot=alert-action]:pr-24 [&>svg]:pointer-events-none [&>svg]:row-span-2 [&>svg]:mt-[3px] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "",
        info: "",
        success: "",
        warning: "",
        destructive: "",
      },
      inline: {
        false:
          "rounded-[10px] px-3.5 py-2.5 has-[>svg]:grid-cols-[16px_minmax(0,1fr)]",
        true:
          "border-y border-border px-0 py-2 text-anibt-ink2 grid-cols-[6px_minmax(0,1fr)] before:row-span-2 before:mt-[8px] before:size-1.5 before:rounded-full before:content-[''] [&>svg]:hidden",
      },
    },
    compoundVariants: [
      { inline: false, variant: "default", class: "bg-muted text-foreground shadow-[inset_0_0_0_1px_var(--border)] [&>svg]:text-muted-foreground" },
      { inline: false, variant: "info", class: "bg-anibt-time-wash text-foreground shadow-[inset_0_0_0_1px_var(--anibt-time-line)] [&>svg]:text-anibt-time-ink *:data-[slot=alert-title]:text-anibt-time-ink" },
      { inline: false, variant: "success", class: "bg-anibt-ok-wash text-foreground shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--anibt-ok-fill)_40%,transparent)] [&>svg]:text-anibt-ok *:data-[slot=alert-title]:text-anibt-ok" },
      { inline: false, variant: "warning", class: "bg-anibt-warn-wash text-foreground shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--anibt-warn-fill)_45%,transparent)] [&>svg]:text-anibt-warn *:data-[slot=alert-title]:text-anibt-warn" },
      { inline: false, variant: "destructive", class: "bg-anibt-danger-wash text-foreground shadow-[inset_0_0_0_1px_var(--anibt-danger-line)] [&>svg]:text-destructive *:data-[slot=alert-title]:text-destructive" },
      { inline: true, variant: "default", class: "before:bg-muted-foreground" },
      { inline: true, variant: "info", class: "before:bg-anibt-time" },
      { inline: true, variant: "success", class: "before:bg-anibt-ok-fill" },
      { inline: true, variant: "warning", class: "before:bg-anibt-warn-fill" },
      { inline: true, variant: "destructive", class: "before:bg-anibt-danger-fill" },
    ],
    defaultVariants: {
      variant: "default",
      inline: false,
    },
  }
)

type AlertProps = React.ComponentProps<"div"> & VariantProps<typeof alertVariants>

function Alert({ className, variant, inline, ...props }: AlertProps) {
  return (
    <div
      data-slot="alert"
      data-variant={variant ?? "default"}
      data-inline={inline ? "true" : undefined}
      role="alert"
      className={cn(alertVariants({ variant, inline }), className)}
      {...props}
    />
  )
}

/** 13/700; takes the state's ink on a tinted alert. */
function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-auto font-bold text-foreground group-has-[>svg]/alert:col-start-2 group-data-[inline=true]/alert:col-start-2",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "grid justify-items-start gap-1 text-anibt-ink2 group-has-[>svg]/alert:col-start-2 group-data-[inline=true]/alert:col-start-2 [&_a]:font-semibold [&_a]:text-accent-foreground [&_a]:underline-offset-4 [&_a:hover]:underline [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

/** A button at the top-right of the notice (retry, dismiss). */
function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn(
        "absolute top-2 right-2 flex items-center gap-1 group-data-[inline=true]/alert:top-1.5 group-data-[inline=true]/alert:right-0",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction, alertVariants }
export type { AlertProps }
