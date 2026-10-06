"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckIcon } from "lucide-react"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * ToggleGroup — buttons that stay pressed (AniBT 「贴纸手账」, Radix
 * ToggleGroup): a view switch, a formatting bar, a row of filters.
 *
 * - `variant="default"`: A's segmented track — the sunk `--muted` well on
 *   radius 10 with 4px of padding; items are 24px, 12/600 `--anibt-ink2`;
 *   a pressed item is a white sticker thumb in ink with its glyph in pink.
 * - `variant="outline"`: A's filter chips — 28px paper keys under a 1px
 *   `--input` ring that hop 1px under the pointer; a pressed chip is the
 *   pink wash with a pink ring and pink ink. In a `type="multiple"` group
 *   each pressed chip also shows a tick, so a multi-select never rides on
 *   colour alone.
 *
 * `type="single"` can be pressed off again; when one choice must always
 * hold (a form value), use `SegmentedControl`. `size` is `sm` / `default` /
 * `lg`; `spacing` is the gap in Tailwind steps (2px track, 8px chips by
 * default). Sizes and variant names follow shadcn's toggle.
 */

const toggleGroupItemVariants = cva(
  "group/toggle-item inline-flex min-w-0 shrink-0 cursor-pointer items-center justify-center gap-1 text-[12px] leading-none font-semibold whitespace-nowrap outline-hidden focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring focus-visible:outline-solid disabled:pointer-events-none disabled:text-muted-foreground aria-invalid:outline-2 aria-invalid:outline-anibt-danger-fill aria-invalid:outline-solid [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "rounded-[6px] bg-transparent text-anibt-ink2 transition-[color,background-color,box-shadow] duration-200 ease-anibt-out hover:text-foreground [&_svg]:text-muted-foreground data-[state=on]:bg-card data-[state=on]:text-foreground data-[state=on]:shadow-(--anibt-shadow-sticker) data-[state=on]:[&_svg]:text-anibt-mark",
        outline:
          "rounded-[10px] bg-card text-anibt-ink2 shadow-[inset_0_0_0_1px_var(--input)] transition-[transform,color,background-color,box-shadow] duration-200 ease-anibt-spring hover:-translate-y-px hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:shadow-[inset_0_0_0_1px_var(--anibt-wash-line)] disabled:bg-muted disabled:shadow-[inset_0_0_0_1px_var(--border)]",
      },
      size: {
        sm: "",
        default: "",
        lg: "",
      },
    },
    compoundVariants: [
      { variant: "default", size: "sm", class: "h-6 min-w-6 px-1.5" },
      { variant: "default", size: "default", class: "h-6 min-w-6 px-2" },
      { variant: "default", size: "lg", class: "h-8 min-w-8 px-2.5 text-[13px]" },
      { variant: "outline", size: "sm", class: "h-6 min-w-6 px-2.5" },
      { variant: "outline", size: "default", class: "h-7 min-w-7 px-3" },
      { variant: "outline", size: "lg", class: "h-8 min-w-8 px-3.5 text-[13px]" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ToggleGroupContextValue = VariantProps<typeof toggleGroupItemVariants> & {
  type: "single" | "multiple"
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  variant: "default",
  size: "default",
  type: "single",
})

function ToggleGroup({
  className,
  variant = "default",
  size = "default",
  spacing,
  orientation = "horizontal",
  style,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleGroupItemVariants> & {
    /** The gap between items, in Tailwind spacing steps. */
    spacing?: number
  }) {
  const gap = spacing ?? (variant === "outline" ? 2 : 0.5)
  const context = React.useMemo(() => ({ variant, size, type: props.type }), [variant, size, props.type])

  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={gap}
      data-orientation={orientation}
      orientation={orientation}
      style={{ "--gap": gap, ...style } as React.CSSProperties}
      className={cn(
        "group/toggle-group flex w-fit max-w-full items-center gap-[--spacing(var(--gap))] data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
        variant === "outline"
          ? "flex-wrap"
          : "rounded-[10px] bg-muted p-1 shadow-[inset_0_0_0_1px_var(--border)]",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={context}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleGroupItemVariants>) {
  const context = React.useContext(ToggleGroupContext)
  const itemVariant = context.variant ?? variant
  const itemSize = context.size ?? size
  const ticks = itemVariant === "outline" && context.type === "multiple"

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={itemVariant}
      data-size={itemSize}
      className={cn(toggleGroupItemVariants({ variant: itemVariant, size: itemSize }), className)}
      {...props}
    >
      {ticks ? (
        <CheckIcon
          aria-hidden="true"
          strokeWidth={3}
          className="-ml-0.5 hidden size-3.5 animate-anibt-pop group-data-[state=on]/toggle-item:block"
        />
      ) : null}
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem, toggleGroupItemVariants }
