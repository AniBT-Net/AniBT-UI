"use client"

import { PencilIcon } from "lucide-react"

import { Button } from "@/registry/anibt/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/anibt/ui/dialog"

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <PencilIcon />
          编辑资源
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>编辑资源</DialogTitle>
          <DialogDescription>改动会同步到资源页和 RSS。</DialogDescription>
        </DialogHeader>
        <form id="edit-release" className="flex flex-col gap-4" onSubmit={(event) => event.preventDefault()}>
          <div>
            <label htmlFor="release-title" className="anibt-label">
              标题
            </label>
            <input
              id="release-title"
              className="anibt-input"
              defaultValue="[喵萌奶茶屋] 药屋少女的呢喃 第三季 - 12 [1080p][简繁内封]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="release-episode" className="anibt-label">
                集数
              </label>
              <input id="release-episode" className="anibt-input anibt-num" defaultValue="12" />
            </div>
            <div>
              <label htmlFor="release-version" className="anibt-label">
                版本
              </label>
              <input id="release-version" className="anibt-input anibt-num" defaultValue="v2" />
            </div>
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">取消</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" form="edit-release">
              保存
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
