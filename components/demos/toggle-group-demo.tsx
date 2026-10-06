"use client"

import { useState } from "react"

import { ToggleGroup, ToggleGroupItem } from "@/registry/anibt/ui/toggle-group"

const TAGS = ["简中", "繁中", "日文", "内封", "外挂", "合集", "HEVC"]

export default function ToggleGroupDemo() {
  const [picked, setPicked] = useState<string[]>(["简中", "内封"])

  return (
    <div className="flex max-w-md flex-col items-start gap-3">
      <ToggleGroup type="multiple" variant="outline" value={picked} onValueChange={setPicked} aria-label="筛选">
        {TAGS.map((tag) => (
          <ToggleGroupItem key={tag} value={tag}>
            {tag}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <p className="text-[12px] text-muted-foreground">
        已选 <span className="anibt-num">{picked.length}</span> 项：{picked.join("、") || "无"}
      </p>
    </div>
  )
}
