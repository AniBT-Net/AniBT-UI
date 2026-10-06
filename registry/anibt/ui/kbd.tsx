import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Kbd — an AniBT 「贴纸手账」 key cap: ⌘K in a search field, esc and ↑ ↓ ↵
 * along a palette's legend.
 *
 * A sunk 20px cap on radius 6: the `--muted` well inside a 1px `--border`
 * ring with a 1px `--input` floor, the figure in the round face (Fredoka
 * 600/12). It is the `anibt-kbd` recipe spelled out in classes, so a caller's
 * `hidden sm:inline-flex` merges. Inside a tooltip (`data-slot=
 * "tooltip-content"`) it turns into a faint cap on the dark bubble.
 *
 * `KbdGroup` sets a few caps side by side (Ctrl + K).
 */
function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 shrink-0 items-center justify-center gap-0.5 rounded-[6px] bg-muted px-1 font-anibt-display text-[12px] leading-none font-semibold text-muted-foreground shadow-[inset_0_-1px_0_var(--input),inset_0_0_0_1px_var(--border)] select-none",
        "in-data-[slot=tooltip-content]:bg-anibt-tip-ink/15 in-data-[slot=tooltip-content]:text-anibt-tip-ink in-data-[slot=tooltip-content]:shadow-none",
        "[&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"kbd">) {
  return <kbd data-slot="kbd-group" className={cn("inline-flex items-center gap-1", className)} {...props} />
}

export { Kbd, KbdGroup }
