"use client"

import { RefreshCwIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/registry/anibt/ui/button"

export default function ButtonLoading() {
  const [saving, setSaving] = useState(false)
  const [syncing, setSyncing] = useState(false)

  function run(set: (busy: boolean) => void) {
    set(true)
    setTimeout(() => set(false), 1800)
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* No loadingText: the label keeps its box, the spinner sits on top. */}
      <Button loading={saving} onClick={() => run(setSaving)}>
        保存设置
      </Button>
      {/* With loadingText: the copy changes and the spinner sits beside it. */}
      <Button variant="secondary" loading={syncing} loadingText="同步中…" onClick={() => run(setSyncing)}>
        <RefreshCwIcon />
        立即同步
      </Button>
      <Button disabled>不可用</Button>
      <Button variant="secondary" disabled>
        不可用
      </Button>
    </div>
  )
}
