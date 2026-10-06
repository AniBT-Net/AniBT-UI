"use client"

import { FileCodeIcon } from "lucide-react"
import { useRef, type ReactNode } from "react"

import { CopyButton } from "@/components/site/copy-button"
import { cn } from "@/lib/utils"

/**
 * A code panel: a well with a stitched head (file name or language, copy key)
 * over the highlighted block. The copy text is read from the rendered code,
 * so MDX fences and highlighted files share one frame.
 */
export function CodeFrame({
  title,
  children,
  className,
  maxHeight,
}: {
  title?: ReactNode
  children: ReactNode
  className?: string
  /** Cap the body (px); it scrolls inside. */
  maxHeight?: number
}) {
  const body = useRef<HTMLDivElement>(null)

  return (
    <div className={cn("anibt-well overflow-hidden bg-muted/60", className)}>
      <div className="anibt-stitch-under flex h-10 items-center gap-2 pr-1.5 pl-3">
        <FileCodeIcon className="size-4 flex-none text-muted-foreground" aria-hidden="true" />
        <span className="anibt-ell min-w-0 flex-1 font-mono text-[12px] text-muted-foreground">{title ?? "code"}</span>
        <CopyButton value={() => body.current?.innerText.replace(/\n$/, "") ?? ""} label="复制代码" />
      </div>
      <div
        ref={body}
        className="overflow-auto px-4 py-3 font-mono text-[13px] leading-[1.65] [&_pre]:m-0 [&_pre]:bg-transparent [&_pre]:outline-none"
        style={maxHeight ? { maxHeight } : undefined}
      >
        {children}
      </div>
    </div>
  )
}
