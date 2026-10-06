import { CalendarDaysIcon, ListVideoIcon, MessageSquareIcon, UsersIcon } from "lucide-react"

import { Badge } from "@/registry/anibt/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/anibt/ui/tabs"

export default function TabsIcons() {
  return (
    <Tabs defaultValue="releases" className="w-full max-w-lg">
      <TabsList>
        <TabsTrigger value="schedule">
          <CalendarDaysIcon />
          放送
        </TabsTrigger>
        <TabsTrigger value="releases">
          <ListVideoIcon />
          资源
          <Badge variant="count-quiet">38</Badge>
        </TabsTrigger>
        <TabsTrigger value="groups">
          <UsersIcon />
          字幕组
        </TabsTrigger>
        <TabsTrigger value="comments" disabled>
          <MessageSquareIcon />
          讨论
        </TabsTrigger>
      </TabsList>
      <TabsContent value="schedule" className="py-2 text-[13px] text-anibt-ink2">
        每周六 23:30 放送。
      </TabsContent>
      <TabsContent value="releases" className="py-2 text-[13px] text-anibt-ink2">
        当前页签是墨色字，下面贴一条倾斜的和纸胶带；图标变粉。
      </TabsContent>
      <TabsContent value="groups" className="py-2 text-[13px] text-anibt-ink2">
        3 个字幕组在跟。
      </TabsContent>
    </Tabs>
  )
}
