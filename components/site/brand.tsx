import Link from "next/link"
import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

/**
 * The 「AniBT UI」 wordmark: the AniBT sticker logo with a tilted candy
 * 「UI」 sticker stuck on its tail. The logo is an AniBT brand asset (not AGPL).
 */
export function Brand({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="AniBT UI 首页"
      className={cn(
        "group/brand relative flex flex-none items-center rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
      <img
        src="/brand/anibt-logo@2x.webp"
        alt="AniBT"
        width={960}
        height={488}
        className={cn(
          "w-auto transition-transform duration-400 ease-anibt-spring group-hover/brand:-rotate-3 group-hover/brand:scale-[1.04]",
          compact ? "h-7" : "h-10"
        )}
      />
      <span
        className={cn(
          "anibt-sticker anibt-sticker-candy -ml-1 self-end",
          compact ? "h-[18px] px-1.5" : "mb-0.5"
        )}
        style={{ "--anibt-tilt": "-8deg" } as CSSProperties}
      >
        UI
      </span>
    </Link>
  )
}
