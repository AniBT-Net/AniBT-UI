"use client"

import { CodeIcon, EyeIcon, MoonStarIcon, SunIcon } from "lucide-react"
import { useId, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

type Stage = "page" | "light" | "dark"

/**
 * Preview / Code tabs over one example. The current tab wears the washi tape
 * (`anibt-tab-on`). The stage has its own 白樱 / 夜樱 switch so both modes
 * can be compared without flipping the whole site: `.site-light` and `.dark`
 * re-declare the theme on the stage alone.
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
  const [stage, setStage] = useState<Stage>("page")
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
              aria-pressed={stage === "light"}
              onClick={() => setStage(stage === "light" ? "page" : "light")}
              title="在白樱下看"
            >
              <SunIcon className="size-3.5" aria-hidden="true" />
              白樱
            </button>
            <button
              type="button"
              aria-pressed={stage === "dark"}
              onClick={() => setStage(stage === "dark" ? "page" : "dark")}
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
          align === "center" ? "items-center justify-center" : "items-start justify-start",
          stage === "light" && "site-light",
          stage === "dark" && "dark"
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
