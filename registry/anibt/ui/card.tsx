import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Card — an AniBT 「贴纸手账」 panel.
 *
 * `variant="panel"` (default) is paper on the ground under a 1px border edge
 * and the panel shadow, radius 14 — the `anibt-sheet` recipe. `variant="well"`
 * is a group inside a panel: the edge only, radius 10, no lift.
 *
 * The box is A's: 16px of padding and 12px between header, body and footer;
 * `density="compact"` tightens it to 12 / 8. Vertical padding and the gap are
 * the `--card-py` / `--card-gap` variables, so a caller's `py-0` / `gap-0`
 * still wins through `cn`.
 *
 * `CardHeader stitched` / `CardFooter stitched` part the head or the foot
 * from the body with A's dashed stitch, edge to edge.
 */
function Card({
  className,
  variant = "panel",
  density = "default",
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "panel" | "well"
  density?: "default" | "compact"
}) {
  return (
    <div
      data-slot="card"
      data-variant={variant}
      data-density={density}
      className={cn(
        "group/card flex flex-col gap-(--card-gap) py-(--card-py) [--card-gap:0.75rem] [--card-py:1rem] data-[density=compact]:[--card-gap:0.5rem] data-[density=compact]:[--card-py:0.75rem]",
        variant === "well" ? "anibt-well" : "anibt-sheet",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({
  className,
  stitched = false,
  ...props
}: React.ComponentProps<"div"> & { stitched?: boolean }) {
  return (
    <div
      data-slot="card-header"
      data-stitched={stitched || undefined}
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1 px-4 group-data-[density=compact]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        stitched && "anibt-stitch-under pb-3 group-data-[density=compact]/card:pb-2",
        className
      )}
      {...props}
    />
  )
}

/** A panel title: 16/800. */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-[16px] leading-[1.4] font-extrabold text-card-foreground", className)}
      {...props}
    />
  )
}

/** The line under a title: 12, muted. */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-[12px] leading-normal text-muted-foreground", className)}
      {...props}
    />
  )
}

/** The tools at the right end of a header row. */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 flex items-center gap-2 self-start justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 text-[14px] group-data-[density=compact]/card:px-3", className)}
      {...props}
    />
  )
}

function CardFooter({
  className,
  stitched = false,
  ...props
}: React.ComponentProps<"div"> & { stitched?: boolean }) {
  return (
    <div
      data-slot="card-footer"
      data-stitched={stitched || undefined}
      className={cn(
        "flex items-center gap-2 px-4 group-data-[density=compact]/card:px-3",
        stitched && "anibt-stitch-over pt-3 group-data-[density=compact]/card:pt-2",
        className
      )}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
