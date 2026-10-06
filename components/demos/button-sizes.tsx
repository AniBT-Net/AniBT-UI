import { DownloadIcon, HeartIcon, MoreHorizontalIcon } from "lucide-react"

import { Button } from "@/registry/anibt/ui/button"

export default function ButtonSizes() {
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm">小号 28</Button>
        <Button>默认 32</Button>
        <Button size="lg">大号 36</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="icon-sm" variant="ghost" aria-label="更多">
          <MoreHorizontalIcon />
        </Button>
        <Button size="icon" variant="secondary" aria-label="下载种子">
          <DownloadIcon />
        </Button>
        <Button size="icon-lg" aria-label="收藏">
          <HeartIcon />
        </Button>
      </div>
    </div>
  )
}
