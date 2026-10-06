import { Badge, StatusBadge } from "@/registry/anibt/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/anibt/ui/tabs"

const EPISODES = [
  { episode: "第 12 集", status: <StatusBadge tone="ok">已发布</StatusBadge> },
  { episode: "第 13 集", status: <StatusBadge tone="run">压制中</StatusBadge> },
  { episode: "第 14 集", status: <StatusBadge tone="mute">未放送</StatusBadge> },
]

export default function TabsDemo() {
  return (
    <Tabs defaultValue="progress" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="progress">发布进度</TabsTrigger>
        <TabsTrigger value="releases">资源</TabsTrigger>
        <TabsTrigger value="groups">字幕组</TabsTrigger>
      </TabsList>
      <TabsContent value="progress" className="flex flex-col">
        {EPISODES.map((row) => (
          <div key={row.episode} className="anibt-stitch-under flex items-center gap-3 py-2.5 last:bg-none">
            <span className="anibt-num text-[14px] font-semibold">{row.episode}</span>
            <Badge variant="res" className="ml-auto">
              1080p
            </Badge>
            {row.status}
          </div>
        ))}
      </TabsContent>
      <TabsContent value="releases" className="py-2.5 text-[13px] text-anibt-ink2">
        共 <span className="anibt-num font-semibold text-foreground">38</span> 条资源，最近一条来自喵萌奶茶屋。
      </TabsContent>
      <TabsContent value="groups" className="py-2.5 text-[13px] text-anibt-ink2">
        喵萌奶茶屋、桜都字幕组、LoliHouse 正在跟这部番。
      </TabsContent>
    </Tabs>
  )
}
