"use client"

import { CheckIcon, SlidersHorizontalIcon } from "lucide-react"
import { useState } from "react"

import { Badge } from "@/registry/anibt/ui/badge"
import { Button } from "@/registry/anibt/ui/button"
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/anibt/ui/sheet"

const FACETS = [
  { name: "分辨率", options: ["2160p", "1080p", "720p"] },
  { name: "字幕语言", options: ["简中", "繁中", "简繁", "日语"] },
  { name: "字幕类型", options: ["内封", "内嵌", "外挂"] },
  { name: "文件格式", options: ["MKV", "MP4"] },
]

export default function SheetDemo() {
  const [chosen, setChosen] = useState<Record<string, string[]>>({ 分辨率: ["1080p"], 字幕语言: ["简中", "简繁"] })
  const count = Object.values(chosen).reduce((sum, list) => sum + list.length, 0)

  const toggle = (facet: string, option: string) =>
    setChosen((current) => {
      const list = current[facet] ?? []
      return { ...current, [facet]: list.includes(option) ? list.filter((item) => item !== option) : [...list, option] }
    })

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">
          <SlidersHorizontalIcon />
          筛选
          {count ? <Badge variant="count">{count}</Badge> : null}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>筛选资源</SheetTitle>
          <SheetDescription>只看符合条件的发布，条件会记在这台设备上。</SheetDescription>
        </SheetHeader>
        <SheetBody className="flex flex-col gap-5">
          {FACETS.map((facet) => (
            <fieldset key={facet.name} className="flex flex-col gap-2">
              <legend className="anibt-label">{facet.name}</legend>
              <div className="flex flex-wrap gap-1.5">
                {facet.options.map((option) => {
                  const on = chosen[facet.name]?.includes(option) ?? false
                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(facet.name, option)}
                      className={`anibt-chip focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${on ? "anibt-chip-on pl-2" : ""}`}
                    >
                      {on ? <CheckIcon className="size-3" strokeWidth={3} aria-hidden="true" /> : null}
                      {option}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ))}
        </SheetBody>
        <SheetFooter>
          <Button variant="ghost" onClick={() => setChosen({})}>
            重置
          </Button>
          <SheetClose asChild>
            <Button>{count ? "看筛选后的资源" : "看全部资源"}</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
