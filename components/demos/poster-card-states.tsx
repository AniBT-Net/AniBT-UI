import { PencilIcon } from "lucide-react"

import {
  PosterCard,
  PosterCardBadge,
  PosterCardSkeleton,
  PosterCardStatus,
  PosterGrid,
} from "@/registry/anibt/blocks/poster-card/poster-card"
import { Badge } from "@/registry/anibt/ui/badge"
import { Button } from "@/registry/anibt/ui/button"

export default function PosterCardStates() {
  return (
    <PosterGrid>
      <PosterCard
        src="/demo/covers/mecha-dawn.svg"
        title="机甲黎明 07"
        subtitle="Mecha Dawn: Unit 07"
        selected
        badges={
          <>
            <PosterCardBadge>TV</PosterCardBadge>
            <PosterCardBadge corner="end">32 部</PosterCardBadge>
          </>
        }
        meta={<span className="anibt-num">2026 秋 · 12 集</span>}
        status={<PosterCardStatus tone="ok">已选中</PosterCardStatus>}
      />
      <PosterCard
        title="还没有封面的新番：轻小说改编的超长标题会在第二行省略"
        subtitle="封面缺失时露出底下的点点占位"
        sticker={
          <Badge variant="candy" className="anibt-num">
            NEW
          </Badge>
        }
        meta={<span className="anibt-num">第 1 集</span>}
        status={<PosterCardStatus tone="none">暂无种子</PosterCardStatus>}
      />
      <PosterCard
        src="/demo/covers/candy-magic.svg"
        title="糖果魔法少女 第二季"
        meta={<span className="anibt-num">剧场版 · 2026</span>}
        status={<PosterCardStatus tone="wait">待播出</PosterCardStatus>}
      >
        <div className="anibt-stitch-over mt-1.5 flex items-center gap-1 px-1 pt-1.5">
          <Button size="xs" variant="ghost" className="flex-1">
            <PencilIcon />
            编辑
          </Button>
        </div>
      </PosterCard>
      <PosterCardSkeleton />
    </PosterGrid>
  )
}
