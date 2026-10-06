import { Separator } from "@/registry/anibt/ui/separator"

export default function SeparatorDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div>
        <div className="text-[16px] font-extrabold">喵萌奶茶屋</div>
        <p className="text-[12px] text-muted-foreground">简繁内封 · 1080p · 每周四更新</p>
      </div>
      <Separator />
      <div className="flex h-5 items-center gap-3 text-[13px] text-anibt-ink2">
        <span>资源 1,284</span>
        <Separator orientation="vertical" />
        <span>作品 96</span>
        <Separator orientation="vertical" />
        <span>成员 12</span>
      </div>
      <Separator variant="line" />
      <p className="text-[12px] text-muted-foreground">
        上面两条：缝线（默认）和实线（<code className="font-mono">variant=&quot;line&quot;</code>）。
      </p>
    </div>
  )
}
