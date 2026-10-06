import { RssIcon, SearchXIcon } from "lucide-react"

import { Button } from "@/registry/anibt/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/registry/anibt/ui/empty"

export default function EmptyWell() {
  return (
    <div className="grid w-full gap-4 md:grid-cols-2">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchXIcon />
          </EmptyMedia>
          <EmptyTitle>没有找到「夜樱终电 第 13 集」</EmptyTitle>
          <EmptyDescription>换个关键词，或者去掉「只看有种子」再试试。</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="secondary">清除筛选</Button>
        </EmptyContent>
      </Empty>
      <Empty size="sm">
        <EmptyHeader>
          <EmptyMedia variant="icon" className="rotate-3">
            <RssIcon />
          </EmptyMedia>
          <EmptyTitle>这个字幕组还没有 RSS 订阅</EmptyTitle>
          <EmptyDescription>
            订阅后新资源会推到你的阅读器，<a href="#rss">怎么用 RSS</a>
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="sm">订阅 RSS</Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
