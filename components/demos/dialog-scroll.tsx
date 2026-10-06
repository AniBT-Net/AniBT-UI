"use client"

import { FileVideoIcon, FolderOpenIcon } from "lucide-react"

import { Button } from "@/registry/anibt/ui/button"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/anibt/ui/dialog"

const FILES = Array.from({ length: 24 }, (_, index) => {
  const episode = String(index + 1).padStart(2, "0")
  return {
    name: `[LoliHouse] Sousou no Frieren S2 - ${episode} [WebRip 1080p HEVC-10bit AAC ASSx2].mkv`,
    size: `${612 + ((index * 37) % 180)} MiB`,
  }
})

export default function DialogScroll() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <FolderOpenIcon />
          查看文件列表
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>文件列表</DialogTitle>
          <DialogDescription>葬送的芙莉莲 第二季 · 合集 · 24 个文件</DialogDescription>
        </DialogHeader>
        <DialogBody className="max-h-80">
          <ul className="flex flex-col">
            {FILES.map((file) => (
              <li key={file.name} className="anibt-stitch-under flex items-center gap-2 py-2 last:bg-none">
                <FileVideoIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span className="anibt-ell min-w-0 flex-1 font-mono text-[12px] text-foreground">{file.name}</span>
                <span className="anibt-num shrink-0 text-[12px] text-muted-foreground">{file.size}</span>
              </li>
            ))}
          </ul>
        </DialogBody>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  )
}
