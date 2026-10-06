"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Switch — A's candy switch (AniBT 「贴纸手账」).
 *
 * A 36×20 track, sunk and ringed off, candy on, with a 16px white knob that
 * springs across. The track carries the state; focus is a 2px `--ring`
 * outline outside it. `size="sm"` is a 28×16 track with a 12px knob for a
 * dense row. Disabled keeps the position readable: the sunk track in both
 * positions and a grey knob — never an opacity wash.
 *
 * The paint is the `anibt-switch` / `anibt-switch-on` recipe spelled out in
 * classes, so the disabled compounds win by order.
 */
function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "group/switch peer relative inline-flex shrink-0 items-center rounded-full bg-muted p-0.5 shadow-[inset_0_0_0_1.5px_var(--input)] outline-hidden transition-[background-color,box-shadow] duration-200 after:absolute after:-inset-x-2 after:-inset-y-2",
        "data-[size=default]:h-5 data-[size=default]:w-9 data-[size=sm]:h-4 data-[size=sm]:w-7",
        "enabled:hover:data-[state=unchecked]:shadow-[inset_0_0_0_1.5px_var(--anibt-wash-line)]",
        "data-[state=checked]:bg-anibt-candy-edge data-[state=checked]:bg-(image:--anibt-candy) data-[state=checked]:shadow-[0_1px_0_var(--anibt-candy-edge)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
        "aria-invalid:outline-2 aria-invalid:outline-offset-2 aria-invalid:outline-anibt-danger-fill aria-invalid:outline-solid",
        "disabled:cursor-not-allowed disabled:shadow-[inset_0_0_0_1.5px_var(--border)] disabled:data-[state=checked]:bg-anibt-deep2 disabled:data-[state=checked]:bg-none disabled:data-[state=checked]:shadow-[inset_0_0_0_1.5px_var(--border)]",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-white shadow-(--anibt-shadow-sticker) transition-transform duration-[350ms] ease-anibt-spring",
          "group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3",
          "data-[state=unchecked]:translate-x-0 group-data-[size=default]/switch:data-[state=checked]:translate-x-4 group-data-[size=sm]/switch:data-[state=checked]:translate-x-3",
          "group-disabled/switch:bg-input group-disabled/switch:shadow-none"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
