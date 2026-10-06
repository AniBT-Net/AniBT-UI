import { CalendarDaysIcon, LayoutGridIcon, ListIcon, RssIcon, SparklesIcon } from "lucide-react"

import { Button } from "@/registry/anibt/ui/button"
import { PageHeader } from "@/registry/anibt/ui/page-header"

export default function PageHeaderDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <PageHeader
        icon={SparklesIcon}
        title="番剧"
        meta="2,184 部"
        description="按季度浏览全部番剧，或切到时间表看今天放送什么。"
        tabs={
          <div role="group" aria-label="视图" className="anibt-seg">
            <button type="button" aria-pressed="true">
              <ListIcon className="size-3.5" aria-hidden="true" />
              时间表
            </button>
            <button type="button" aria-pressed="false">
              <LayoutGridIcon className="size-3.5" aria-hidden="true" />
              海报墙
            </button>
          </div>
        }
        actions={
          <Button variant="secondary">
            <RssIcon />
            订阅 RSS
          </Button>
        }
        headingLevel="h2"
      />
      <PageHeader
        icon={CalendarDaysIcon}
        iconTone="time"
        title="今日放送"
        meta="2026 年 10 月 6 日 周二 · 9 部"
        headingLevel="h2"
      />
    </div>
  )
}
