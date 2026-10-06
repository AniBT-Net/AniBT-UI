"use client"

import { CalendarDaysIcon } from "lucide-react"

import { StatusBadge } from "@/registry/anibt/ui/badge"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/anibt/ui/hover-card"

export default function HoverCardDemo() {
  return (
    <p className="text-[14px] text-anibt-ink2">
      本集由{" "}
      <HoverCard>
        <HoverCardTrigger asChild>
          <a href="#mmnc" className="font-semibold text-accent-foreground underline-offset-4 hover:underline">
            @喵萌奶茶屋
          </a>
        </HoverCardTrigger>
        <HoverCardContent className="w-72" align="start">
          <div className="flex gap-3">
            <span className="anibt-avatar anibt-rim size-11 text-[18px]" aria-hidden="true">
              喵
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="anibt-ell text-[14px] font-bold text-foreground">喵萌奶茶屋</span>
                <StatusBadge tone="on">已认证</StatusBadge>
              </div>
              <p className="text-[12px] leading-normal text-muted-foreground">
                简繁内封、1080p 为主的老牌字幕组，长期搬运季番。
              </p>
            </div>
          </div>
          <div className="anibt-stitch-over mt-3 flex items-center gap-4 pt-3 text-[12px] text-muted-foreground">
            <span>
              发布 <b className="anibt-num font-semibold text-foreground">2,431</b>
            </span>
            <span>
              成员 <b className="anibt-num font-semibold text-foreground">18</b>
            </span>
            <span className="ml-auto inline-flex items-center gap-1">
              <CalendarDaysIcon className="size-3.5" aria-hidden="true" />
              <span className="anibt-num">2014</span> 年加入
            </span>
          </div>
        </HoverCardContent>
      </HoverCard>{" "}
      翻译、校对、压制。
    </p>
  )
}
