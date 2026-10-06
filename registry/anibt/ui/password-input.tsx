"use client"

import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/registry/anibt/ui/input"

/**
 * PasswordInput — an AniBT 「贴纸手账」 `Input` with the one visibility key.
 *
 * The key at the right end is a quiet 24px square (the pink wash under the
 * pointer) that is always named — `showLabel` / `hideLabel` — and reports
 * its state with `aria-pressed`, so a keyboard and a screen reader can tell
 * show from hide. Whether the characters are on screen is this component's
 * own state: nothing outside a password field needs to know.
 *
 * `toggleWhenEmpty={false}` hides the key until something is typed (a
 * controlled field only). `className` sizes the wrapper (the key sits at its
 * end); `inputClassName` reaches the `<input>`, and so does every other
 * prop, `ref` included — pass `autoComplete="current-password"` or
 * `"new-password"`.
 */
type PasswordInputProps = Omit<React.ComponentProps<"input">, "type"> & {
  /** Show the key on an empty field too (default). */
  toggleWhenEmpty?: boolean
  /** Classes for the `<input>`; `className` sizes the wrapper. */
  inputClassName?: string
  showLabel?: string
  hideLabel?: string
}

function PasswordInput({
  className,
  inputClassName,
  toggleWhenEmpty = true,
  showLabel = "显示密码",
  hideLabel = "隐藏密码",
  value,
  disabled,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = React.useState(false)
  const hasValue = typeof value === "string" ? value.length > 0 : value !== undefined
  const showToggle = toggleWhenEmpty || hasValue
  const label = visible ? hideLabel : showLabel

  return (
    <div data-slot="password-input" className={cn("relative w-full min-w-0", className)}>
      <Input
        type={visible ? "text" : "password"}
        value={value}
        disabled={disabled}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        className={cn(showToggle && "pr-9", inputClassName)}
        {...props}
      />
      {showToggle ? (
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          disabled={disabled}
          aria-label={label}
          aria-pressed={visible}
          title={label}
          className="absolute top-1/2 right-1.5 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[6px] text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-solid disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
        >
          {visible ? <EyeOffIcon className="size-4" aria-hidden="true" /> : <EyeIcon className="size-4" aria-hidden="true" />}
        </button>
      ) : null}
    </div>
  )
}

export { PasswordInput }
export type { PasswordInputProps }
