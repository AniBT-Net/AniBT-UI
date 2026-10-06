"use client"

import { CodeIcon, EyeIcon, MoonStarIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useId, useState, useSyncExternalStore, type ReactNode } from "react"

import { cn } from "@/lib/utils"

const subscribe = () => () => {}

/**
 * Preview / Code tabs over one example. The current tab wears the washi tape
 * (`anibt-tab-on`). The 白樱 / 夜樱 switch beside the tabs flips the whole
 * site, not just the stage: dialogs, menus, tooltips and toasts render in a
 * portal on <body>, so a stage-only theme would leave them in the other mode.
 */
export function PreviewTabs({
  preview,
  code,
  align = "center",
  className,
}: {
  preview: ReactNode
  code: ReactNode
  align?: "center" | "start"
  className?: string
}) {
  const [tab, setTab] = useState<"preview" | "code">("preview")
  const { resolvedTheme, setTheme } = useTheme()
  // The theme is only known after hydration (localStorage or the OS).
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
  const mode = mounted ? resolvedTheme : undefined
  const id = useId()

  const tabs = [
    { value: "preview" as const, label: "预览", Icon: EyeIcon },
    { value: "code" as const, label: "代码", Icon: CodeIcon },
  ]

  return (
    <div className={cn("not-prose my-6 flex flex-col gap-3", className)}>
      <div className="flex items-end gap-3">
        <div role="tablist" aria-label="示例" className="anibt-tabs flex-1">
          {tabs.map(({ value, label, Icon }) => (
            <button
              key={value}
              type="button"
              role="tab"
              id={`${id}-${value}-tab`}
              aria-selected={tab === value}
              aria-controls={`${id}-${value}`}
              onClick={() => setTab(value)}
              className={cn(
                "anibt-tab focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                tab === value && "anibt-tab-on"
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
        {tab === "preview" ? (
          <div role="group" aria-label="示例的颜色模式" className="anibt-seg mb-1.5">
            <button
              type="button"
              aria-pressed={mode === "light"}
              onClick={() => setTheme("light")}
              title="在白樱下看"
            >
              <SunIcon className="size-3.5" aria-hidden="true" />
              白樱
            </button>
            <button
              type="button"
              aria-pressed={mode === "dark"}
              onClick={() => setTheme("dark")}
              title="在夜樱下看"
            >
              <MoonStarIcon className="size-3.5" aria-hidden="true" />
              夜樱
            </button>
          </div>
        ) : null}
      </div>

      <div
        role="tabpanel"
        id={`${id}-preview`}
        aria-labelledby={`${id}-preview-tab`}
        hidden={tab !== "preview"}
        className={cn(
          "anibt-sheet relative flex min-h-56 w-full p-6 sm:p-10",
          align === "center" ? "items-center justify-center" : "items-start justify-start"
        )}
      >
        {preview}
      </div>

      <div role="tabpanel" id={`${id}-code`} aria-labelledby={`${id}-code-tab`} hidden={tab !== "code"}>
        {code}
      </div>
    </div>
  )
}
