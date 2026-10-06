import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Textarea — the multi-line AniBT 「贴纸手账」 field.
 *
 * The same material and state ladder as `Input` (paper, the 1px `--input`
 * ring, pink on hover, the 1.5px `--ring` edge and halo on focus, red when
 * `aria-invalid`, the sunk well when read-only or disabled). It differs only
 * in height: `field-sizing-content` grows the box with the copy from a
 * two-line minimum, and the user can still drag it taller.
 */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "bg-card text-foreground inset-ring-1 inset-ring-input placeholder:text-muted-foreground selection:bg-anibt-wash2 selection:text-foreground hover:inset-ring-anibt-wash-line focus-visible:inset-ring-[1.5px] focus-visible:inset-ring-ring focus-visible:ring-4 focus-visible:ring-ring/20 aria-invalid:inset-ring-[1.5px] aria-invalid:inset-ring-anibt-danger-fill aria-invalid:ring-4 aria-invalid:ring-anibt-danger-fill/15 [&[readonly]]:bg-muted [&[readonly]]:text-anibt-ink2 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:inset-ring-border",
        "flex field-sizing-content min-h-16 w-full rounded-[10px] border-0 px-3 py-2 text-base leading-normal transition-[background-color,box-shadow] duration-150 outline-none md:text-[13px]",
        "data-[slot=input-group-control]:bg-transparent data-[slot=input-group-control]:inset-ring-0 data-[slot=input-group-control]:ring-0",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
