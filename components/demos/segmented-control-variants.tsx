"use client"

import { LayoutGridIcon, ListIcon, RowsIcon } from "lucide-react"

import { SegmentedControl } from "@/registry/anibt/ui/segmented-control"

export default function SegmentedControlVariants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      <SegmentedControl
        label="排序"
        name="sort"
        defaultValue="latest"
        options={[
          { value: "latest", label: "最新" },
          { value: "seeders", label: "做种最多" },
          { value: "size", label: "体积" },
        ]}
      />
      <div className="flex flex-wrap items-center gap-3">
        <SegmentedControl
          aria-label="列表样式"
          size="compact"
          iconOnly
          defaultValue="grid"
          options={[
            { value: "list", label: "列表", icon: ListIcon },
            { value: "rows", label: "紧凑", icon: RowsIcon },
            { value: "grid", label: "海报墙", icon: LayoutGridIcon },
          ]}
        />
        <SegmentedControl
          aria-label="语言"
          size="compact"
          defaultValue="all"
          options={[
            { value: "all", label: "全部" },
            { value: "chs", label: "简中" },
            { value: "cht", label: "繁中" },
            { value: "raw", label: "生肉", disabled: true },
          ]}
        />
      </div>
      <SegmentedControl
        aria-label="时间范围"
        block
        defaultValue="week"
        options={[
          { value: "day", label: "今天" },
          { value: "week", label: "本周" },
          { value: "season", label: "本季" },
        ]}
      />
    </div>
  )
}
