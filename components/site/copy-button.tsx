"use client"

import { CheckIcon, CopyIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

/**
 * A 28px quiet icon square that copies `value`. The tick and the live region
 * are the visible and the spoken result.
 */
export function CopyButton({
  value,
  label = "复制",
  className,
}: {
  /** The text, or a reader called at click time (client callers only). */
  value: string | (() => string)
  label?: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(typeof value === "function" ? value() : value)
      setCopied(true)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "已复制" : label}
      title={copied ? "已复制" : label}
      className={cn(
        "anibt-icobtn anibt-icobtn-sm anibt-icobtn-ghost focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        copied && "text-anibt-ok hover:text-anibt-ok",
        className
      )}
    >
      {copied ? <CheckIcon className="size-4" aria-hidden="true" /> : <CopyIcon className="size-4" aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {copied ? "已复制" : ""}
      </span>
    </button>
  )
}
