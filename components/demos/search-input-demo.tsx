"use client"

import { useState } from "react"

import { SearchInput } from "@/registry/anibt/ui/search-input"

const TITLES = ["药屋少女的呢喃 第二季", "葬送的芙莉莲 第二季", "间谍过家家 第三季", "迷宫饭", "孤独摇滚！"]

export default function SearchInputDemo() {
  const [query, setQuery] = useState("")
  const hits = TITLES.filter((title) => title.includes(query.trim()))

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <SearchInput
        value={query}
        onValueChange={setQuery}
        placeholder="搜索番剧、字幕组…"
        shortcut="⌘K"
        aria-label="搜索番剧"
      />
      <p className="text-[12px] text-muted-foreground">
        {query ? (
          <>
            找到 <span className="anibt-num">{hits.length}</span> 部：{hits.join("、") || "没有匹配的番剧"}
          </>
        ) : (
          "输入后右端出现清除键；清除后光标留在框里。"
        )}
      </p>
    </div>
  )
}
