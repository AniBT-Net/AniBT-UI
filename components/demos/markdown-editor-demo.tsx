"use client"

import { useState } from "react"

import { MarkdownEditor } from "@/registry/anibt/ui/markdown-editor"

const NOTES = `## 药屋少女的呢喃 第三季 · 第 12 集

**简繁内封** · 1080p · HEVC 10bit

> 本集由喵萌奶茶屋翻译、校对、时轴、压制，字体已内封。

- 修正了第 11 集的两处错字
- 片尾曲歌词加上了罗马音
- [ ] BD 版发售后会出合集

---

下载前请读一遍 [发布说明](https://anibt.net)，播放器推荐 \`mpv\`。
`

export default function MarkdownEditorDemo() {
  const [notes, setNotes] = useState(NOTES)

  return (
    <div className="w-full">
      <label id="notes-label" htmlFor="release-notes" className="anibt-label">
        发布说明
      </label>
      <MarkdownEditor
        id="release-notes"
        aria-labelledby="notes-label"
        value={notes}
        onChange={setNotes}
        maxLength={2000}
        placeholder="写点什么：压制参数、字体、已知问题…"
      />
    </div>
  )
}
