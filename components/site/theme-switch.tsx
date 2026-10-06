"use client"

import { MoonStarIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"

import { cn } from "@/lib/utils"

const MODES = [
  { value: "light", label: "白樱", Icon: SunIcon },
  { value: "dark", label: "夜樱", Icon: MoonStarIcon },
] as const

const subscribe = () => () => {}

/**
 * The 白樱 / 夜樱 switch: A's segmented control (`anibt-seg`). The pressed
 * state is only known after hydration (the theme lives in localStorage or the
 * OS), so the server renders neither as pressed and the client fills it in.
 */
export function ThemeSwitch({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )

  return (
    <div role="group" aria-label="颜色模式" className={cn("anibt-seg", className)}>
      {MODES.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          aria-pressed={mounted ? resolvedTheme === value : undefined}
          onClick={() => setTheme(value)}
          className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Icon className="size-3.5" aria-hidden="true" />
          {label}
        </button>
      ))}
    </div>
  )
}
