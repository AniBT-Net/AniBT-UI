"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Separator as SeparatorPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Separator — the AniBT 「贴纸手账」 rule.
 *
 * A's rule between rows and sections is the dashed stitch: 4px of the control
 * edge colour, 4px of nothing, 1px thick (`variant="stitch"`, the default).
 * `variant="line"` is the solid 1px panel edge, for the rare place a stitch
 * would read as a seam in the paper rather than a division.
 *
 * Vertical rules stretch to their row (`self-stretch`) and stitch downwards.
 * Decorative by default, as in shadcn: a screen reader skips it. Pass
 * `decorative={false}` when the rule separates two groups a reader should
 * hear as separate.
 *
 * The element carries Radix's `data-orientation` and Base UI's
 * `data-horizontal` / `data-vertical`, so a shadcn `base-*` component that
 * styles either keeps working.
 */
const separatorVariants = cva("shrink-0", {
  variants: {
    variant: {
      stitch:
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=horizontal]:bg-(image:--anibt-stitch) data-[orientation=horizontal]:bg-size-[8px_1px] data-[orientation=horizontal]:bg-repeat-x data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch data-[orientation=vertical]:bg-(image:--anibt-stitch-y) data-[orientation=vertical]:bg-size-[1px_8px] data-[orientation=vertical]:bg-repeat-y",
      line: "bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
    },
  },
  defaultVariants: {
    variant: "stitch",
  },
})

type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root> &
  VariantProps<typeof separatorVariants>

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      data-variant={variant ?? "stitch"}
      data-horizontal={orientation === "horizontal" ? "" : undefined}
      data-vertical={orientation === "vertical" ? "" : undefined}
      decorative={decorative}
      orientation={orientation}
      className={cn(separatorVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Separator, separatorVariants }
export type { SeparatorProps }
