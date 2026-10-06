"use client"

import { KeyRoundIcon } from "lucide-react"
import { useState } from "react"

import { StatusBadge } from "@/registry/anibt/ui/badge"
import { Button } from "@/registry/anibt/ui/button"
import { ConfirmDialog } from "@/registry/anibt/ui/confirm-dialog"

function revokeKey() {
  return new Promise<void>((resolve) => setTimeout(resolve, 1200))
}

export default function ConfirmDialogDemo() {
  const [revoked, setRevoked] = useState(false)

  return (
    <div className="flex items-center gap-3">
      <ConfirmDialog
        destructive
        trigger={
          <Button variant="destructive" disabled={revoked}>
            <KeyRoundIcon />
            撤销 API 密钥
          </Button>
        }
        title="撤销这个 API 密钥？"
        description="用它发布的脚本会立刻失效，撤销后不能恢复。"
        confirmLabel="撤销"
        // A promise keeps the dialog open and busy until it settles.
        onConfirm={() => revokeKey().then(() => setRevoked(true))}
      />
      {revoked ? <StatusBadge tone="mute">已撤销</StatusBadge> : <StatusBadge tone="ok">使用中</StatusBadge>}
    </div>
  )
}
