import { Kbd, KbdGroup } from "@/registry/anibt/ui/kbd"

export default function KbdLegend() {
  return (
    <div className="anibt-stitch-over flex w-full max-w-md flex-wrap items-center gap-x-4 gap-y-2 pt-3 text-[12px] text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <KbdGroup>
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
        </KbdGroup>
        选择
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Kbd>↵</Kbd>
        打开
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Kbd>esc</Kbd>
        关闭
      </span>
    </div>
  )
}
