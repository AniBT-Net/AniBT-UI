"use client"

import { useState } from "react"

import { SearchableSelect, type SearchableSelectGroup } from "@/registry/anibt/ui/searchable-select"

const SHOWS: SearchableSelectGroup[] = [
  {
    heading: "2026 年 10 月新番",
    options: [
      { value: "kusuriya-3", label: "药屋少女的呢喃 第三季", description: "Kusuriya no Hitorigoto S3", keywords: "药屋" },
      { value: "frieren-2", label: "葬送的芙莉莲 第二季", description: "Sousou no Frieren S2", keywords: "芙莉莲" },
      { value: "spy-3", label: "间谍过家家 第三季", description: "SPY×FAMILY Season 3", keywords: "间谍" },
      { value: "dandadan-3", label: "胆大党 第三季", description: "Dandadan S3" },
    ],
  },
  {
    heading: "继续放送",
    options: [
      { value: "onepiece", label: "海贼王", description: "One Piece · 第 1147 集起" },
      { value: "conan", label: "名侦探柯南", description: "Detective Conan · 第 1180 集起" },
      { value: "precure", label: "光之美少女", description: "Precure · 本季已完结", disabled: true },
    ],
  },
]

export default function SearchableSelectDemo() {
  const [show, setShow] = useState<string>("frieren-2")

  return (
    <div className="w-full max-w-xs">
      <label id="show-label" htmlFor="show-picker" className="anibt-label">
        番剧
      </label>
      <SearchableSelect
        id="show-picker"
        aria-labelledby="show-label"
        value={show}
        onValueChange={setShow}
        groups={SHOWS}
        placeholder="选择番剧"
        searchPlaceholder="搜索番剧名或罗马字…"
      />
    </div>
  )
}
