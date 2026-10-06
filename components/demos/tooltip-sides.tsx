import { Button } from "@/registry/anibt/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/anibt/ui/tooltip"

const SIDES = [
  { side: "top" as const, label: "上" },
  { side: "right" as const, label: "右" },
  { side: "bottom" as const, label: "下" },
  { side: "left" as const, label: "左" },
]

export default function TooltipSides() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {SIDES.map(({ side, label }) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="secondary" size="sm">
              {label}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side}>
            搜索番剧 <kbd data-slot="kbd" className="anibt-kbd">⌘K</kbd>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
