import { Switch } from "@/registry/anibt/ui/switch"

export default function SwitchStates() {
  return (
    <div className="grid grid-cols-3 items-center gap-x-8 gap-y-4 text-[12px] text-muted-foreground">
      <span className="flex flex-col items-center gap-2">
        <Switch aria-label="关" />关
      </span>
      <span className="flex flex-col items-center gap-2">
        <Switch aria-label="开" defaultChecked />开
      </span>
      <span className="flex flex-col items-center gap-2">
        <Switch aria-label="小号" size="sm" defaultChecked />小号
      </span>
      <span className="flex flex-col items-center gap-2">
        <Switch aria-label="禁用（关）" disabled />禁用 · 关
      </span>
      <span className="flex flex-col items-center gap-2">
        <Switch aria-label="禁用（开）" disabled defaultChecked />禁用 · 开
      </span>
      <span className="flex flex-col items-center gap-2">
        <Switch aria-label="出错" aria-invalid />出错
      </span>
    </div>
  )
}
