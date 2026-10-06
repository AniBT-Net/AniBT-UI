"use client"

import { CheckCheckIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/registry/anibt/ui/button"
import { ConfirmDialog } from "@/registry/anibt/ui/confirm-dialog"

export default function ConfirmDialogPlain() {
  const [open, setOpen] = useState(false)
  const [finished, setFinished] = useState(false)

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <CheckCheckIcon />
        {finished ? "已标记完结" : "标记为完结"}
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        icon={<CheckCheckIcon />}
        title="把这部番标记为完结？"
        description="间谍过家家 第三季 不会再出现在「今日放送」里。"
        confirmLabel="标记完结"
        onConfirm={() => setFinished(true)}
      />
    </>
  )
}
