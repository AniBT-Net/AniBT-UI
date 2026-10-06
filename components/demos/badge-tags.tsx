import { Badge } from "@/registry/anibt/ui/badge"

export default function BadgeTags() {
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>HEVC-10bit</Badge>
        <Badge variant="res">2160p</Badge>
        <Badge variant="res">1080p</Badge>
        <Badge variant="lang" face="text">
          简繁内封
        </Badge>
        <Badge variant="lang" face="text">
          日语
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="success" face="text">
          完结
        </Badge>
        <Badge variant="warning" face="text">
          过期
        </Badge>
        <Badge variant="destructive" face="text">
          失效
        </Badge>
        <Badge size="lg">S2 · 24</Badge>
      </div>
    </div>
  )
}
