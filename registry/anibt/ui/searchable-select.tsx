"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

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
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/anibt/ui/popover"

/**
 * SearchableSelect — AniBT 「贴纸手账」 single-choice combobox for a long list
 * (a show, a fansub group, a category): type to filter instead of scrolling a
 * select.
 *
 * The closed control reads as a field, not a key: Button's 32px `field`
 * paint with the chosen label (or the placeholder in the muted ink) and an
 * up-down chevron. It opens a popover as wide as the field (at least 256)
 * holding a command list: a 44px search row over the stitch, optional group
 * heads, and rows with a second muted line. The row under the cursor takes
 * the pink wash; the chosen row carries a pink tick. Choosing closes the
 * popover. On a touch screen the search is not focused on open, so the
 * keyboard does not cover the list until the reader asks for it.
 *
 * Built on `@anibt/popover` + `@anibt/command` (Radix + cmdk), so it works
 * inside a Dialog, a Sheet or a Drawer.
 */

type SearchableSelectOption = {
  value: string
  label: string
  /** A second, muted line under the label. */
  description?: string
  /** Extra words the search matches (romaji, an alias). */
  keywords?: string
  /** Drawn before the label: an icon, an avatar. */
  icon?: React.ReactNode
  disabled?: boolean
}

type SearchableSelectGroup = {
  heading?: string
  options: readonly SearchableSelectOption[]
}

type SearchableSelectProps = {
  value: string | undefined
  onValueChange: (value: string) => void
  /** A flat list. Use `groups` instead for headed sections. */
  options?: readonly SearchableSelectOption[]
  groups?: readonly SearchableSelectGroup[]
  /** The closed field's text while nothing is chosen. */
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
  id?: string
  className?: string
  /** Classes for the popover panel. */
  contentClassName?: string
  "aria-label"?: string
  "aria-labelledby"?: string
  "aria-invalid"?: React.AriaAttributes["aria-invalid"]
}

function searchText(option: SearchableSelectOption) {
  return [option.label, option.description, option.keywords, option.value].filter(Boolean).join(" ")
}

function isCoarsePointer() {
  return typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches
}

function SearchableSelect({
  value,
  onValueChange,
  options,
  groups,
  placeholder = "请选择",
  searchPlaceholder = "搜索…",
  emptyText = "没有匹配的结果",
  disabled = false,
  id,
  className,
  contentClassName,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-invalid": ariaInvalid,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false)
  const sections = React.useMemo<readonly SearchableSelectGroup[]>(
    () => groups ?? (options ? [{ options }] : []),
    [groups, options]
  )
  const selected = React.useMemo(
    () => sections.flatMap((section) => section.options).find((option) => option.value === value) ?? null,
    [sections, value]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger {...{ asChild: true }} disabled={disabled}>
        <Button
          id={id}
          type="button"
          variant="field"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-invalid={ariaInvalid}
          disabled={disabled}
          data-slot="searchable-select-trigger"
          className={cn(
            "w-full min-w-0 justify-between gap-2 px-3 text-left text-[13px] has-[>svg]:px-3",
            !selected && "text-muted-foreground",
            className
          )}
        >
          {selected?.icon ? <span className="flex shrink-0 items-center">{selected.icon}</span> : null}
          <span className="anibt-ell min-w-0 flex-1">{selected?.label ?? placeholder}</span>
          <ChevronsUpDownIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        onOpenAutoFocus={(event) => {
          if (isCoarsePointer()) event.preventDefault()
        }}
        className={cn(
          "w-(--radix-popover-trigger-width) max-w-[calc(100vw-2rem)] min-w-64 gap-0 overflow-hidden p-0",
          contentClassName
        )}
      >
        <Command loop data-slot="searchable-select-content">
          <CommandInput aria-label={searchPlaceholder} placeholder={searchPlaceholder} />
          <CommandList className="max-h-[min(50dvh,18rem)]">
            <CommandEmpty>{emptyText}</CommandEmpty>
            {sections.map((section, index) =>
              section.options.length === 0 ? null : (
                <React.Fragment key={section.heading ?? `section-${index}`}>
                  {index > 0 && !section.heading ? <CommandSeparator /> : null}
                  <CommandGroup heading={section.heading}>
                    {section.options.map((option) => {
                      const chosen = option.value === value
                      return (
                        <CommandItem
                          key={option.value}
                          value={searchText(option)}
                          disabled={option.disabled}
                          onSelect={() => {
                            onValueChange(option.value)
                            setOpen(false)
                          }}
                          className="min-h-9 items-start py-2"
                        >
                          {option.icon ? <span className="flex shrink-0 items-center pt-px">{option.icon}</span> : null}
                          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                            <span className={cn("anibt-ell", chosen && "font-semibold")}>{option.label}</span>
                            {option.description ? (
                              <span className="anibt-ell text-[12px] text-muted-foreground">{option.description}</span>
                            ) : null}
                          </span>
                          {chosen ? (
                            <CheckIcon className="mt-0.5 size-4 shrink-0 text-anibt-mark" strokeWidth={2.75} aria-hidden="true" />
                          ) : (
                            <span className="size-4 shrink-0" aria-hidden="true" />
                          )}
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                </React.Fragment>
              )
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { SearchableSelect }
export type { SearchableSelectGroup, SearchableSelectOption, SearchableSelectProps }
