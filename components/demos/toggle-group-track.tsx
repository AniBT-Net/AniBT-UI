import { BoldIcon, CodeIcon, ItalicIcon, LayoutGridIcon, ListIcon, StrikethroughIcon } from "lucide-react"

import { ToggleGroup, ToggleGroupItem } from "@/registry/anibt/ui/toggle-group"

export default function ToggleGroupTrack() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <ToggleGroup type="single" defaultValue="grid" aria-label="视图">
        <ToggleGroupItem value="list">
          <ListIcon />
          列表
        </ToggleGroupItem>
        <ToggleGroupItem value="grid">
          <LayoutGridIcon />
          海报墙
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="multiple" defaultValue={["bold"]} aria-label="文字格式">
        <ToggleGroupItem value="bold" aria-label="加粗">
          <BoldIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="斜体">
          <ItalicIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="strike" aria-label="删除线">
          <StrikethroughIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="code" aria-label="代码" disabled>
          <CodeIcon />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
