import { Badge, StatusBadge } from "@/registry/anibt/ui/badge"
import { Button } from "@/registry/anibt/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/anibt/ui/card"

const SHOWS = [
  { title: "药屋少女的呢喃 第三季", episode: "第 12 集", status: <StatusBadge tone="ok">已更新</StatusBadge> },
  { title: "葬送的芙莉莲 第二季", episode: "第 9 集", status: <StatusBadge tone="run">搬运中</StatusBadge> },
  { title: "间谍过家家 第三季", episode: "第 4 集", status: <StatusBadge tone="warn">延期</StatusBadge> },
]

export default function CardDemo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader stitched>
        <CardTitle>我的订阅</CardTitle>
        <CardDescription>喵萌奶茶屋 · 简繁内封 · 1080p</CardDescription>
        <CardAction>
          <Badge variant="count">3</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col">
        {SHOWS.map((show) => (
          <div key={show.title} className="anibt-stitch-under flex items-center gap-3 py-2.5 last:bg-none">
            <div className="min-w-0 flex-1">
              <div className="anibt-ell text-[14px] font-bold">{show.title}</div>
              <div className="mt-1 flex items-center gap-1.5">
                <Badge variant="res">1080p</Badge>
                <span className="anibt-num text-[12px] text-muted-foreground">{show.episode}</span>
              </div>
            </div>
            {show.status}
          </div>
        ))}
      </CardContent>
      <CardFooter stitched className="justify-end">
        <Button variant="ghost">管理</Button>
        <Button>添加订阅</Button>
      </CardFooter>
    </Card>
  )
}
