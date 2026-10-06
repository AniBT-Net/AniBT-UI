import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Skeleton — the AniBT 「贴纸手账」 loading placeholder.
 *
 * One step deeper than a field (`--anibt-deep2`), radius 10, and a slow pulse
 * as the only motion — no shimmer gradient. Size it like the thing it stands
 * in for: a 2:3 cover, a 14px title line, a 20px tag. `shape="pill"` is for
 * tags and counts, `shape="circle"` for avatars.
 *
 * Mark the region that is loading with `aria-busy`, not the skeletons: they
 * are `aria-hidden`, because a list of grey boxes says nothing to a screen
 * reader. Under reduced motion the pulse stops.
 */
function Skeleton({
  className,
  shape = "box",
  ...props
}: React.ComponentProps<"div"> & {
  /** `box` (radius 10), `line` (radius 6, for text), `pill`, `circle`. */
  shape?: "box" | "line" | "pill" | "circle"
}) {
  return (
    <div
      data-slot="skeleton"
      data-shape={shape}
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-anibt-deep2 motion-reduce:animate-none",
        shape === "box" && "rounded-[10px]",
        shape === "line" && "h-3.5 rounded-[6px]",
        shape === "pill" && "rounded-full",
        shape === "circle" && "aspect-square rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
