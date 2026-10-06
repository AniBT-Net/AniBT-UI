import { Kbd, KbdGroup } from "@/registry/anibt/ui/kbd"

export default function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-4 text-[13px] text-anibt-ink2">
      <p className="flex items-center gap-1.5">
        按 <Kbd>⌘K</Kbd> 搜索番剧，<Kbd>esc</Kbd> 关闭
      </p>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span className="text-muted-foreground">+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
    </div>
  )
}
