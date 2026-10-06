"use client"

import { UsersIcon } from "lucide-react"
import { useState } from "react"

import { MultiSelect, type MultiSelectOption } from "@/registry/anibt/ui/multi-select"

const GROUPS = ["喵萌奶茶屋", "LoliHouse", "北宇治字幕组", "桜都字幕组", "千夏字幕组", "ANi", "Sakurato", "黒ネズミたち"]

/** A group's tile: its first character on the pink wash. */
const OPTIONS: MultiSelectOption[] = GROUPS.map((name) => ({
  value: name,
  label: name,
  icon: (
    <span className="anibt-avatar size-5 text-[12px]" aria-hidden="true">
      {name.slice(0, 1)}
    </span>
  ),
}))

export default function MultiSelectDemo() {
  const [groups, setGroups] = useState<string[]>(["喵萌奶茶屋", "LoliHouse"])

  return (
    <div className="w-full max-w-sm">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span id="groups-label" className="text-[13px] font-semibold text-anibt-ink2">
          字幕组
        </span>
        {groups.length ? <span className="anibt-num text-[12px] text-muted-foreground">已选 {groups.length} 项</span> : null}
      </div>
      <MultiSelect
        aria-labelledby="groups-label"
        icon={<UsersIcon />}
        value={groups}
        onValueChange={setGroups}
        options={OPTIONS}
        placeholder="全部字幕组"
        searchPlaceholder="搜索字幕组…"
      />
      <p className="mt-1.5 text-[12px] text-muted-foreground">不选就是全部字幕组。</p>
    </div>
  )
}
