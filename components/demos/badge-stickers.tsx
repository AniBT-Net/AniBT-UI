import { Badge } from "@/registry/anibt/ui/badge"

export default function BadgeStickers() {
  return (
    <div className="flex flex-wrap items-center gap-4 py-1">
      <Badge variant="sticker" tilt={-4}>
        ANIME
      </Badge>
      <Badge variant="candy" tilt={3}>
        ✦ 推荐
      </Badge>
      <Badge variant="water" tilt={-2}>
        周六 23:30
      </Badge>
      <Badge variant="sticker">TV · 2026 秋</Badge>
    </div>
  )
}
