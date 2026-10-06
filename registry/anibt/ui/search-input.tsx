"use client"

import * as React from "react"
import { SearchIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/registry/anibt/ui/input"
import { Kbd } from "@/registry/anibt/ui/kbd"

/**
 * SearchInput — the one AniBT 「贴纸手账」 search box.
 *
 * An `Input` with the magnifier inside its left edge and a clear key at its
 * right end. It owns the details every hand-rolled search box gets wrong:
 *
 * - `type="search"` plus `enterKeyHint="search"`, so a phone keyboard shows
 *   its search key; the browser's own cancel button is hidden, so the themed
 *   clear key is the only one.
 * - The clear key (a quiet 24px square, named `clearLabel`) empties the field
 *   and puts the caret back in it, so clearing by keyboard keeps focus.
 * - `shortcut` shows a key cap (⌘K) while the field is empty — a hint only;
 *   binding the key is the page's job.
 *
 * Controlled (`value` + `onValueChange`) or not (`defaultValue`). Every other
 * prop, `ref` included, reaches the `<input>`. 32 high like every A field;
 * give it `inputClassName="h-11 md:h-8"` where a phone needs a bigger target.
 */
type SearchInputProps = Omit<React.ComponentProps<"input">, "type" | "value" | "defaultValue" | "onChange"> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  /** Classes for the `<input>`; `className` sizes the wrapper. */
  inputClassName?: string
  /** A key cap shown while the field is empty, e.g. "⌘K". */
  shortcut?: React.ReactNode
  /** The clear key's accessible name. */
  clearLabel?: string
}

function SearchInput({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  onChange,
  className,
  inputClassName,
  shortcut,
  clearLabel = "清除",
  placeholder = "搜索",
  disabled,
  readOnly,
  ref,
  ...props
}: SearchInputProps) {
  const innerRef = React.useRef<HTMLInputElement>(null)
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const controlled = valueProp !== undefined
  const value = controlled ? valueProp : uncontrolled

  const setRefs = React.useCallback(
    (node: HTMLInputElement | null) => {
      innerRef.current = node
      if (typeof ref === "function") return ref(node)
      if (ref) ref.current = node
    },
    [ref]
  )

  const commit = (next: string) => {
    if (!controlled) setUncontrolled(next)
    onValueChange?.(next)
  }

  const showClear = value.length > 0 && !disabled && !readOnly

  return (
    <div data-slot="search-input" className={cn("relative w-full min-w-0", className)}>
      <SearchIcon
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        ref={setRefs}
        type="search"
        enterKeyHint="search"
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        onChange={(event) => {
          onChange?.(event)
          commit(event.target.value)
        }}
        className={cn(
          "pl-9 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
          showClear || shortcut ? "pr-9" : null,
          inputClassName
        )}
        {...props}
      />
      {showClear ? (
        <button
          type="button"
          aria-label={clearLabel}
          title={clearLabel}
          onClick={() => {
            commit("")
            innerRef.current?.focus()
          }}
          className="absolute top-1/2 right-1.5 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[6px] text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-solid"
        >
          <XIcon className="size-4" aria-hidden="true" />
        </button>
      ) : shortcut ? (
        <Kbd className="absolute top-1/2 right-2 -translate-y-1/2">{shortcut}</Kbd>
      ) : null}
    </div>
  )
}

export { SearchInput }
export type { SearchInputProps }
