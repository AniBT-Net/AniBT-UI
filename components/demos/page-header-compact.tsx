import { PlusIcon, SearchIcon } from "lucide-react"

import { Button } from "@/registry/anibt/ui/button"
import { PageHeader } from "@/registry/anibt/ui/page-header"

export default function PageHeaderCompact() {
  return (
    <PageHeader
      compact
      headingLevel="h2"
      title="资源"
      meta="306 条 · 21 部番剧"
      className="w-full"
      toolbar={
        <>
          <label className="anibt-field w-56">
            <SearchIcon className="size-4 shrink-0" aria-hidden="true" />
            <input
              placeholder="搜索标题或集数"
              aria-label="搜索资源"
              className="min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
            />
          </label>
          <div role="group" aria-label="状态" className="anibt-seg">
            <button type="button" aria-pressed="true">
              全部
            </button>
            <button type="button" aria-pressed="false">
              同步失败
            </button>
          </div>
        </>
      }
      actions={
        <Button>
          <PlusIcon />
          发布资源
        </Button>
      }
    />
  )
}
