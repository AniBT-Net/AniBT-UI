"use client"

import { useState } from "react"

import { MarkdownEditor } from "@/registry/anibt/ui/markdown-editor"

export default function MarkdownEditorNarrow() {
  const [notes, setNotes] = useState("**默认说明**：本组作品仅供学习交流，请勿用于商业用途。\n\n- 求片请到 [讨论区](https://anibt.net)\n")

  return (
    <div className="w-full max-w-md">
      <label id="default-notes-label" htmlFor="default-notes" className="anibt-label">
        字幕组默认说明
      </label>
      <MarkdownEditor
        id="default-notes"
        aria-labelledby="default-notes-label"
        size="sm"
        value={notes}
        onChange={setNotes}
        maxLength={160}
        hint="每条新发布都会带上这段说明"
      />
    </div>
  )
}
