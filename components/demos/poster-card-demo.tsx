"use client"

import { RssIcon } from "lucide-react"
import { useState } from "react"

import {
  PosterCard,
  PosterCardAction,
  PosterCardRating,
  PosterCardSep,
  PosterCardStatus,
  PosterGrid,
} from "@/registry/anibt/blocks/poster-card/poster-card"
import { Badge } from "@/registry/anibt/ui/badge"

const SHOWS = [
  { id: "yozakura", title: "夜樱终电", subtitle: "Yozakura: After the Last Train", time: "23:30", episode: "第 6 集", rating: 8.4, status: { tone: "ok" as const, word: "喵萌奶茶屋 已更新" } },
  { id: "stardust-line", title: "星屑列车", subtitle: "Stardust Line", time: "00:00", episode: "第 12 集", rating: 7.6, status: { tone: "next" as const, word: "下一集 · 20 分钟后" }, tone: "next" as const },
  { id: "summer-coast", title: "在那个夏天结束之前，我们一起去看海吧 第二季", subtitle: "Summer Coast: Seven Days of August", time: "01:05", episode: "第 12 集", rating: 7.9, status: { tone: "ok" as const, word: "绿茶字幕组 已更新" } },
  { id: "candy-magic", title: "糖果魔法少女 第二季", subtitle: "Candy Magic: Sugar Rush", time: "17:55", episode: "第 1 集", rating: null, status: { tone: "wait" as const, word: "待播出" } },
  { id: "forest-song", title: "森之歌：神社边缘的守护者", subtitle: "Forest Song", time: "22:00", episode: "第 3 集", rating: 6.9, status: { tone: "none" as const, word: "暂无种子" } },
  { id: "mecha-dawn", title: "机甲黎明 07", subtitle: "Mecha Dawn: Unit 07", time: "21:00", episode: "第 9 集", rating: 8.1, status: { tone: "ok" as const, word: "星空字幕组 已更新" } },
  { id: "snow-country", title: "雪国来信", subtitle: "Snow Country: A Letter for Spring", time: "00:30", episode: "第 4 集", rating: 8.8, status: { tone: "ok" as const, word: "北宇治字幕组 已更新" } },
  { id: "afterschool-band", title: "放课后屋顶乐队", subtitle: "Afterschool Band", time: "23:00", episode: "第 7 集", rating: 7.2, status: { tone: "run" as const, word: "放送中" }, tone: "airing" as const },
]

export default function PosterCardDemo() {
  const [subscribed, setSubscribed] = useState<Set<string>>(() => new Set(["yozakura", "snow-country"]))
  const toggle = (id: string) =>
    setSubscribed((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <PosterGrid>
      {SHOWS.map((show, index) => (
        <PosterCard
          key={show.id}
          href={`#${show.id}`}
          src={`/demo/covers/${show.id}.svg`}
          priority={index < 4}
          title={show.title}
          subtitle={show.subtitle}
          tone={show.tone}
          sticker={
            <Badge variant={show.tone ? "water" : "sticker"} className="anibt-num">
              {show.time}
            </Badge>
          }
          coverAction={
            <PosterCardAction
              aria-label={subscribed.has(show.id) ? `取消订阅 ${show.title}` : `订阅 ${show.title}`}
              pressed={subscribed.has(show.id)}
              onClick={() => toggle(show.id)}
            >
              <RssIcon />
            </PosterCardAction>
          }
          meta={
            <>
              <span className="anibt-num">{show.episode}</span>
              <PosterCardSep />
              <PosterCardRating value={show.rating} />
            </>
          }
          status={<PosterCardStatus tone={show.status.tone}>{show.status.word}</PosterCardStatus>}
        />
      ))}
    </PosterGrid>
  )
}
