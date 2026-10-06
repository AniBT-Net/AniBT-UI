"use client"

import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * RadioGroup — A's candy radio (AniBT 「贴纸手账」).
 *
 * An 18px paper disc inside a 1.5px `--input` ring (pink under the pointer);
 * the chosen one is candy with a white dot that pops in, the same fill as a
 * ticked checkbox, so a column of options reads at a glance. Focus is the
 * 2px `--ring` outline outside the disc; disabled is the sunk well with a
 * grey dot. Arrow keys move the choice (Radix roving focus).
 */
function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn("grid w-full gap-3", className)} {...props} />
}

function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "group/radio peer relative inline-flex aspect-square size-[18px] shrink-0 items-center justify-center rounded-full bg-card shadow-[inset_0_0_0_1.5px_var(--input)] outline-hidden transition-[background-color,box-shadow] duration-150 after:absolute after:-inset-2",
        "enabled:hover:shadow-[inset_0_0_0_1.5px_var(--anibt-wash-line)]",
        "data-[state=checked]:bg-anibt-candy-edge data-[state=checked]:bg-(image:--anibt-candy) data-[state=checked]:shadow-[0_1px_0_var(--anibt-candy-edge)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
        "aria-invalid:outline-2 aria-invalid:outline-offset-2 aria-invalid:outline-anibt-danger-fill aria-invalid:outline-solid",
        "disabled:cursor-not-allowed disabled:bg-muted disabled:shadow-[inset_0_0_0_1.5px_var(--border)] disabled:data-[state=checked]:bg-anibt-deep2 disabled:data-[state=checked]:bg-none disabled:data-[state=checked]:shadow-[inset_0_0_0_1.5px_var(--border)]",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator" className="flex items-center justify-center">
        <span className="block size-2 animate-anibt-pop rounded-full bg-white group-disabled/radio:bg-muted-foreground" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
