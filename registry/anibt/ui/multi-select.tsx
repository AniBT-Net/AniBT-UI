"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/anibt/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/registry/anibt/ui/command"
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "@/registry/anibt/ui/popover"

/**
 * MultiSelect — AniBT 「贴纸手账」 many-choice combobox for an open-ended list
 * (the subscription picker: 字幕组, 标签).
 *
 * The chosen values sit inside a 32px field as removable tags; the rest of
 * the field is the button that opens a searchable checklist. Nothing chosen
 * means "all", and the field says so in the muted ink (`placeholder`, e.g.
 * 「全部字幕组」). The list leads with that 「全部」 row, then one row per
 * option with A's 18px candy tick box. It stays open while you tick, so three
 * groups are three clicks, not three openings; the foot shows the count and a
 * 完成 key.
 *
 * In a checklist pink means chosen, so the keyboard cursor here is the
 * neutral sunk press, not the menu's pink wash. A click on a row ticks it
 * without taking focus from the search, so the next keystroke still filters.
 *
 * Built on `@anibt/popover` + `@anibt/command` (Radix + cmdk). The popover is
 * modal, so it scrolls and takes clicks inside a Dialog or a Drawer.
 */

type MultiSelectOption = {
  value: string
  label: string
  /** Extra words the search matches (romaji, an alias). */
  keywords?: string
  /** Drawn before the label in the list: an avatar, an icon. */
  icon?: React.ReactNode
  disabled?: boolean
}

type MultiSelectProps = {
  /** The chosen values; empty means "all". */
  value: readonly string[]
  onValueChange: (value: string[]) => void
  options: readonly MultiSelectOption[]
  /** What an empty choice means: 「全部字幕组」. Also the list's first row. */
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  /** Shown instead of the list when there are no options at all. */
  noOptionsText?: string
  /** The 「全部」 row at the top of the list. */
  showAll?: boolean
  /** The icon at the start of the field. */
  icon?: React.ReactNode
  doneLabel?: React.ReactNode
  /** The count in the foot: `已选 3 项`. */
  countLabel?: (count: number) => string
  /** The accessible name of a tag's remove button. */
  removeLabel?: (label: string) => string
  disabled?: boolean
  id?: string
  className?: string
  contentClassName?: string
  "aria-label"?: string
  "aria-labelledby"?: string
}

const ROW =
  "min-h-9 gap-2.5 data-[selected=true]:bg-muted data-[selected=true]:text-foreground"

const FOCUS_RING = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid"

/** The 18px candy tick box a row leads with: drawn, not a control. */
function RowCheck({ checked }: { checked: boolean }) {
  return (
    <span aria-hidden="true" className={cn("anibt-check", checked && "anibt-check-on")}>
      {checked ? <CheckIcon className="size-3 animate-anibt-pop text-anibt-candy-ink" strokeWidth={3} /> : null}
    </span>
  )
}

/** Ticks a row without moving focus out of the search. */
function keepSearchFocus(event: React.MouseEvent<HTMLDivElement>) {
  event.preventDefault()
}

function isCoarsePointer() {
  return typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches
}

function MultiSelect({
  value,
  onValueChange,
  options,
  placeholder = "全部",
  searchPlaceholder = "搜索…",
  emptyText = "没有匹配的结果",
  noOptionsText = "暂无选项",
  showAll = true,
  icon,
  doneLabel = "完成",
  countLabel = (count) => `已选 ${count} 项`,
  removeLabel = (label) => `移除 ${label}`,
  disabled = false,
  id,
  className,
  contentClassName,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const summaryId = React.useId()
  const isAll = value.length === 0
  const labelOf = (item: string) => options.find((option) => option.value === item)?.label ?? item

  const toggle = (item: string) => {
    const next = value.includes(item) ? value.filter((entry) => entry !== item) : [...value, item]
    onValueChange(next)
  }

  const summary = isAll ? placeholder : countLabel(value.length)

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverAnchor {...{ asChild: true }}>
        <div
          role="group"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          data-slot="multi-select"
          data-state={open ? "open" : "closed"}
          data-disabled={disabled || undefined}
          className={cn(
            "anibt-field h-auto min-h-8 flex-wrap gap-1 py-1 pr-1 pl-2.5",
            open && "anibt-field-on",
            disabled && "pointer-events-none bg-muted",
            className
          )}
        >
          {icon ? <span className="flex shrink-0 items-center text-muted-foreground [&>svg]:size-4">{icon}</span> : null}
          {value.map((item) => {
            const name = labelOf(item)
            return (
              <span key={item} className="anibt-tag max-w-full gap-0.5 pr-0.5" title={name}>
                <span className="anibt-ell">{name}</span>
                <button
                  type="button"
                  aria-label={removeLabel(name)}
                  disabled={disabled}
                  onClick={() => toggle(item)}
                  className={cn(
                    "relative grid size-4 shrink-0 place-items-center rounded-[4px] text-muted-foreground transition-colors after:absolute after:-inset-1 hover:bg-accent hover:text-accent-foreground",
                    FOCUS_RING
                  )}
                >
                  <XIcon className="size-3" strokeWidth={2.5} aria-hidden="true" />
                </button>
              </span>
            )
          })}
          <PopoverTrigger {...{ asChild: true }}>
            <button
              type="button"
              id={id}
              disabled={disabled}
              aria-haspopup="listbox"
              // Named by the field's label plus what is chosen: 「字幕组 已选 2 项」.
              aria-label={ariaLabelledBy ? undefined : ariaLabel ? `${ariaLabel} · ${summary}` : summary}
              aria-labelledby={ariaLabelledBy ? `${ariaLabelledBy} ${summaryId}` : undefined}
              className="flex h-6 min-w-12 flex-1 items-center justify-between gap-2 rounded-[6px] pl-0.5 text-left text-[13px] text-muted-foreground outline-none"
            >
              <span className="anibt-ell">{isAll ? placeholder : null}</span>
              <span id={summaryId} className="sr-only">
                {summary}
              </span>
              <ChevronsUpDownIcon className="size-4 shrink-0" aria-hidden="true" />
            </button>
          </PopoverTrigger>
        </div>
      </PopoverAnchor>
      <PopoverContent
        align="start"
        onOpenAutoFocus={(event) => {
          if (isCoarsePointer()) event.preventDefault()
        }}
        data-vaul-no-drag=""
        className={cn(
          "w-(--radix-popover-trigger-width) max-w-[calc(100vw-2rem)] min-w-64 gap-0 overflow-hidden p-0",
          contentClassName
        )}
      >
        <Command loop data-slot="multi-select-content">
          <CommandInput aria-label={searchPlaceholder} placeholder={searchPlaceholder} />
          <CommandList className="max-h-[min(45dvh,18rem)] px-1">
            <CommandEmpty>{emptyText}</CommandEmpty>
            {showAll ? (
              <CommandGroup className="p-0">
                <CommandItem
                  value={`* ${placeholder}`}
                  aria-checked={isAll}
                  onMouseDown={keepSearchFocus}
                  onSelect={() => onValueChange([])}
                  className={ROW}
                >
                  <RowCheck checked={isAll} />
                  <span className="anibt-ell min-w-0 flex-1 font-semibold">{placeholder}</span>
                </CommandItem>
              </CommandGroup>
            ) : null}
            {showAll ? <CommandSeparator /> : null}
            {options.length === 0 ? (
              <p className="px-2.5 py-2 text-[12px] text-muted-foreground">{noOptionsText}</p>
            ) : (
              <CommandGroup className="p-0">
                {options.map((option) => {
                  const checked = value.includes(option.value)
                  return (
                    <CommandItem
                      key={option.value}
                      value={[option.label, option.keywords, option.value].filter(Boolean).join(" ")}
                      disabled={option.disabled}
                      aria-checked={checked}
                      onMouseDown={keepSearchFocus}
                      onSelect={() => toggle(option.value)}
                      className={ROW}
                    >
                      <RowCheck checked={checked} />
                      {option.icon ? <span className="flex shrink-0 items-center">{option.icon}</span> : null}
                      <span className="anibt-ell min-w-0 flex-1" title={option.label}>
                        {option.label}
                      </span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )}
          </CommandList>
          <div className="anibt-stitch-over flex h-11 shrink-0 items-center justify-between gap-2 px-3">
            <span className="anibt-num text-[12px] text-muted-foreground">{summary}</span>
            <Button type="button" size="sm" variant="secondary" onClick={() => setOpen(false)}>
              {doneLabel}
            </Button>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { MultiSelect }
export type { MultiSelectOption, MultiSelectProps }
