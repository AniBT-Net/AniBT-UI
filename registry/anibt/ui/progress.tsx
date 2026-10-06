"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Progress — the AniBT 「贴纸手账」 bar.
 *
 * A sunk track with a 1px edge and a glossy fill. Blue is A's colour for
 * "in progress", so the fill is `water` by default; `tone="candy"` is for a
 * quota or a goal the reader is filling (pink = the reader's own action) and
 * `tone="ok"` for work that is done. `value={null}` is indeterminate: a short
 * fill slides along the track (it holds still under reduced motion).
 *
 * `<Progress value={40} />` is shadcn's shape. Children turn it into Base UI's
 * shape — a label and a figure above the track:
 *
 *   <Progress value={3} max={5}>
 *     <ProgressLabel>同步目标</ProgressLabel>
 *     <ProgressValue />            → 3 / 5 (or a percentage, see `format`)
 *   </Progress>
 */
const trackVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-muted shadow-[inset_0_0_0_1px_var(--border)]",
  {
    variants: {
      size: {
        default: "h-2.5",
        compact: "h-1.5",
        lg: "h-3.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const indicatorVariants = cva(
  "h-full w-full rounded-full transition-transform duration-500 ease-anibt-out motion-reduce:transition-none",
  {
    variants: {
      tone: {
        water: "anibt-water shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]",
        candy: "anibt-candy shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]",
        ok: "bg-anibt-ok-fill shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]",
      },
    },
    defaultVariants: {
      tone: "water",
    },
  }
)

type ProgressContextValue = { value: number | null; max: number }

const ProgressContext = React.createContext<ProgressContextValue>({ value: null, max: 100 })

type ProgressProps = Omit<React.ComponentProps<typeof ProgressPrimitive.Root>, "value" | "max"> &
  VariantProps<typeof trackVariants> &
  VariantProps<typeof indicatorVariants> & {
    /** `null` (or leaving it out) is indeterminate. */
    value?: number | null
    max?: number
    /** Classes for the track when the progress has children (label row). */
    trackClassName?: string
  }

function Progress({
  className,
  trackClassName,
  value = null,
  max = 100,
  size,
  tone,
  children,
  ...props
}: ProgressProps) {
  const track = (
    <ProgressPrimitive.Root
      data-slot="progress"
      data-tone={tone ?? "water"}
      value={value}
      max={max}
      className={cn(trackVariants({ size }), children ? trackClassName : className)}
      {...props}
    >
      <ProgressIndicator tone={tone} />
    </ProgressPrimitive.Root>
  )

  if (!children) {
    return <ProgressContext.Provider value={{ value, max }}>{track}</ProgressContext.Provider>
  }

  return (
    <ProgressContext.Provider value={{ value, max }}>
      <div data-slot="progress-group" className={cn("flex w-full flex-wrap items-baseline gap-x-3 gap-y-1.5", className)}>
        {children}
        {track}
      </div>
    </ProgressContext.Provider>
  )
}

/** The fill. Rendered by `Progress`; exported for shadcn parity. */
function ProgressIndicator({
  className,
  tone,
  style,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Indicator> & VariantProps<typeof indicatorVariants>) {
  const { value, max } = React.useContext(ProgressContext)
  const indeterminate = value === null
  const percent = indeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(
        indicatorVariants({ tone }),
        indeterminate && "w-2/5 animate-anibt-indeterminate motion-reduce:animate-none",
        className
      )}
      style={indeterminate ? style : { transform: `translateX(-${100 - percent}%)`, ...style }}
      {...props}
    />
  )
}

/** The track on its own, for a hand-built layout (shadcn `base-*` parity). */
function ProgressTrack({ className, size, ...props }: React.ComponentProps<"div"> & VariantProps<typeof trackVariants>) {
  return <div data-slot="progress-track" className={cn(trackVariants({ size }), className)} {...props} />
}

/** What is progressing: 13/600, the field-label voice. */
function ProgressLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="progress-label"
      className={cn("text-[13px] font-semibold text-anibt-ink2", className)}
      {...props}
    />
  )
}

/**
 * The figure at the right end of the label row, in the round face. Without
 * children it prints the value: `3 / 5`, or `60%` when `max` is 100 or
 * `format="percent"`.
 */
function ProgressValue({
  className,
  children,
  format,
  ...props
}: React.ComponentProps<"span"> & { format?: "fraction" | "percent" }) {
  const { value, max } = React.useContext(ProgressContext)
  const asPercent = format ? format === "percent" : max === 100
  const text =
    value === null ? "—" : asPercent ? `${Math.round((value / max) * 100)}%` : `${value} / ${max}`
  return (
    <span
      data-slot="progress-value"
      className={cn("anibt-num ml-auto text-[12px] font-semibold text-muted-foreground", className)}
      {...props}
    >
      {children ?? text}
    </span>
  )
}

export { Progress, ProgressIndicator, ProgressTrack, ProgressLabel, ProgressValue }
export type { ProgressProps }
