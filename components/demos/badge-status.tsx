import { StatusBadge, StatusDot } from "@/registry/anibt/ui/badge"

export default function BadgeStatus() {
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge tone="ok">已同步</StatusBadge>
        <StatusBadge tone="run">同步中</StatusBadge>
        <StatusBadge tone="fail">同步失败</StatusBadge>
        <StatusBadge tone="warn">排队中</StatusBadge>
        <StatusBadge tone="mute">已关闭</StatusBadge>
        <StatusBadge tone="on">订阅中</StatusBadge>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-[12px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <StatusDot variant="ok" />
          做种 12
        </span>
        <span className="inline-flex items-center gap-1.5">
          <StatusDot variant="time" />
          今晚更新
        </span>
        <span className="inline-flex items-center gap-1.5">
          <StatusDot />
          你的订阅
        </span>
        <span className="inline-flex items-center gap-1.5">
          <StatusDot variant="hollow" />
          未开始
        </span>
      </div>
    </div>
  )
}
