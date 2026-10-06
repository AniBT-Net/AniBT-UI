import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * A section head (A's `sec-head`): a tilted paper sticker holding the
 * section's glyph, the title at 20/800, a 12px meta line, tools on the right.
 */
export function SectionHead({
  icon: Icon,
  title,
  meta,
  action,
  tone = "pink",
  id,
}: {
  icon: LucideIcon
  title: ReactNode
  meta?: ReactNode
  action?: ReactNode
  tone?: "pink" | "blue"
  id?: string
}) {
  return (
    <div className="group/sec mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
      <span
        aria-hidden="true"
        className={cn(
          "anibt-rim grid size-8 flex-none -rotate-[5deg] place-items-center rounded-[8px] bg-card transition-transform duration-400 ease-anibt-spring group-hover/sec:scale-[1.06] group-hover/sec:rotate-[5deg]",
          tone === "pink" ? "text-anibt-mark" : "text-anibt-time"
        )}
      >
        <Icon className="size-4" />
      </span>
      <h2 id={id} className="text-[20px] leading-[1.4] font-extrabold tracking-[0.02em]">
        {title}
      </h2>
      {meta ? <p className="text-[12px] text-muted-foreground">{meta}</p> : null}
      {action ? <div className="ml-auto flex items-center gap-2">{action}</div> : null}
    </div>
  )
}
