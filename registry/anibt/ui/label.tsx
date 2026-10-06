"use client"

import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Label — the head of AniBT's form grammar (A 「贴纸手账」).
 *
 * 13/600 in `--anibt-ink2`: one step quieter than the value under it and one
 * step louder than a hint. It sits above its control, 6px over it (`Field`
 * owns that gap), and never shares the control's row. `items-center gap-1.5`
 * keeps a required mark or a glyph on the label's line.
 *
 * A disabled control greys its label to `--muted-foreground` instead of
 * dimming it with opacity, so the copy stays legible. Option text beside a
 * checkbox or a switch is not a field label: `Field orientation="horizontal"`
 * turns it into 13/400 body ink, or pass `font-normal text-foreground`.
 */
function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-1.5 text-[13px] leading-5 font-semibold text-anibt-ink2 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Label }
