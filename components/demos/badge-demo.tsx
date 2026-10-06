import { Badge, StatusBadge } from "@/registry/anibt/ui/badge"

export default function BadgeDemo() {
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="res">1080p</Badge>
        <Badge variant="lang" face="text">
          简中
        </Badge>
        <Badge face="text">内封字幕</Badge>
        <Badge>MKV</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="candy" tilt={-3}>
          ✦ NEW
        </Badge>
        <Badge variant="water" tilt={2}>
          23:30
        </Badge>
        <Badge variant="count">12</Badge>
        <StatusBadge tone="run">同步中</StatusBadge>
      </div>
    </div>
  )
}
