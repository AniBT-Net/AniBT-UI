import { DownloadIcon, HeartIcon, MagnetIcon, RssIcon } from "lucide-react"

import { Button } from "@/registry/anibt/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/anibt/ui/tooltip"

const ACTIONS = [
  { label: "复制磁力链接", Icon: MagnetIcon },
  { label: "下载种子", Icon: DownloadIcon },
  { label: "订阅这个字幕组", Icon: RssIcon },
  { label: "加入追番", Icon: HeartIcon },
]

export default function TooltipDemo() {
  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex items-center gap-2">
        {ACTIONS.map(({ label, Icon }) => (
          <Tooltip key={label}>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="icon" aria-label={label}>
                <Icon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}
