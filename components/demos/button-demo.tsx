import { RssIcon, Trash2Icon, UploadIcon } from "lucide-react"

import { Button } from "@/registry/anibt/ui/button"

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>
        <UploadIcon />
        发布资源
      </Button>
      <Button variant="secondary">
        <RssIcon />
        订阅 RSS
      </Button>
      <Button variant="ghost">取消</Button>
      <Button variant="destructive">
        <Trash2Icon />
        删除
      </Button>
    </div>
  )
}
