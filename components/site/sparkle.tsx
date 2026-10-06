import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

const TONE = {
  pink: "bg-anibt-mark",
  blue: "bg-anibt-time",
} as const

/**
 * A twinkling ✦ — A's tiny accent. Decorative, absolutely placed by the
 * caller; a page uses two or three, around the mascot or a hero, never as a
 * pattern.
 */
export function Sparkle({
  className,
  tone = "pink",
  delay,
}: {
  className?: string
  tone?: keyof typeof TONE
  delay?: string
}) {
  const style: CSSProperties | undefined = delay ? { animationDelay: delay } : undefined
  return (
    <span
      aria-hidden="true"
      style={style}
      className={cn(
        "pointer-events-none absolute inline-block animate-anibt-twinkle [-webkit-mask:var(--anibt-sparkle)_center/contain_no-repeat] [mask:var(--anibt-sparkle)_center/contain_no-repeat]",
        TONE[tone],
        className
      )}
    />
  )
}
