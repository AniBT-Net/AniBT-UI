"use client"

import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * SegmentedControl — a few mutually exclusive choices side by side
 * (AniBT 「贴纸手账」): 编写 / 分栏 / 预览, 列表 / 网格, 全部 / 简中 / 繁中.
 *
 * A's segmented track: the sunk `--muted` well on radius 10 with 4px of
 * padding and 24px items in 12/600 `--anibt-ink2`; the chosen one is a white
 * sticker thumb in ink with its glyph in pink. It is a Radix radio group
 * underneath — one tab stop, arrow keys move the choice, a screen reader
 * hears "radio, 2 of 3" — so it carries a form value (`name`) and always has
 * exactly one choice. For buttons that toggle on and off, or several at once,
 * use `ToggleGroup`.
 *
 * `size="default"` keeps a thumb-sized 36px item on a phone and tightens to
 * A's 24px from `sm`; `compact` is 24px everywhere (a toolbar). `iconOnly`
 * hides the words and keeps each as the item's accessible name and title.
 * The paint is the `anibt-seg` recipe spelled out in classes, so a caller's
 * classes merge.
 */

type SegmentedControlOption<TValue extends string> = {
  value: TValue
  label: string
  icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" }>
  disabled?: boolean
}

type SegmentedControlProps<TValue extends string> = Omit<
  React.ComponentProps<typeof RadioGroupPrimitive.Root>,
  "value" | "defaultValue" | "onValueChange" | "children" | "dir" | "orientation"
> & {
  options: ReadonlyArray<SegmentedControlOption<TValue>>
  value?: TValue
  defaultValue?: TValue
  onValueChange?: (value: TValue) => void
  /** A visible label above the track; it names the group. */
  label?: React.ReactNode
  /** Hides the words (each option needs an `icon`). */
  iconOnly?: boolean
  size?: "default" | "compact"
  /** Stretch the track to its container, the items sharing it equally. */
  block?: boolean
}

function SegmentedControl<TValue extends string>({
  options,
  value,
  defaultValue,
  onValueChange,
  label,
  iconOnly = false,
  size = "default",
  block = false,
  className,
  "aria-labelledby": labelledBy,
  ...props
}: SegmentedControlProps<TValue>) {
  const labelId = React.useId()

  const track = (
    <RadioGroupPrimitive.Root
      data-slot="segmented-control"
      data-size={size}
      orientation="horizontal"
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => onValueChange?.(next as TValue)}
      aria-labelledby={label ? labelId : labelledBy}
      className={cn(
        "max-w-full items-center gap-0.5 rounded-[10px] bg-muted p-1 shadow-[inset_0_0_0_1px_var(--border)]",
        block ? "grid w-full auto-cols-fr grid-flow-col" : "inline-flex w-fit",
        !label && className
      )}
      {...props}
    >
      {options.map((option) => {
        const Icon = option.icon
        return (
          <RadioGroupPrimitive.Item
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            title={iconOnly ? option.label : undefined}
            aria-label={iconOnly ? option.label : undefined}
            data-slot="segmented-control-item"
            className={cn(
              "inline-flex min-w-0 cursor-pointer touch-manipulation items-center justify-center gap-1 rounded-[6px] bg-transparent text-[12px] leading-none font-semibold whitespace-nowrap text-anibt-ink2 outline-hidden transition-[color,background-color,box-shadow] duration-200 ease-anibt-out",
              "hover:text-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
              "data-[state=checked]:bg-card data-[state=checked]:text-foreground data-[state=checked]:shadow-(--anibt-shadow-sticker) data-[state=checked]:[&_svg]:text-anibt-mark",
              "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring focus-visible:outline-solid",
              "disabled:cursor-not-allowed disabled:text-muted-foreground",
              size === "compact" ? "h-6" : "h-9 sm:h-6",
              iconOnly ? (size === "compact" ? "w-6" : "w-9 sm:w-6") : "px-2.5 sm:px-2"
            )}
          >
            {Icon ? <Icon aria-hidden="true" /> : null}
            {iconOnly && Icon ? null : <span className="truncate">{option.label}</span>}
          </RadioGroupPrimitive.Item>
        )
      })}
    </RadioGroupPrimitive.Root>
  )

  if (!label) return track

  return (
    <div data-slot="segmented-control-field" className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      {/* The label tier (13/600 ink2) on a span: it names the group through
          `aria-labelledby`; a <label> would point at nothing. */}
      <span id={labelId} data-slot="segmented-control-label" className="text-[13px] leading-5 font-semibold text-anibt-ink2">
        {label}
      </span>
      {track}
    </div>
  )
}

export { SegmentedControl }
export type { SegmentedControlOption, SegmentedControlProps }
