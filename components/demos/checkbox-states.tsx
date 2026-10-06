import { Checkbox } from "@/registry/anibt/ui/checkbox"

export default function CheckboxStates() {
  return (
    <div className="grid grid-cols-3 items-center gap-x-8 gap-y-4 text-[12px] text-muted-foreground sm:grid-cols-6">
      <span className="flex flex-col items-center gap-2">
        <Checkbox aria-label="未选" />
        未选
      </span>
      <span className="flex flex-col items-center gap-2">
        <Checkbox aria-label="已选" defaultChecked />
        已选
      </span>
      <span className="flex flex-col items-center gap-2">
        <Checkbox aria-label="部分" checked="indeterminate" />
        部分
      </span>
      <span className="flex flex-col items-center gap-2">
        <Checkbox aria-label="出错" aria-invalid />
        出错
      </span>
      <span className="flex flex-col items-center gap-2">
        <Checkbox aria-label="禁用" disabled />
        禁用
      </span>
      <span className="flex flex-col items-center gap-2">
        <Checkbox aria-label="禁用且已选" disabled defaultChecked />
        禁用已选
      </span>
    </div>
  )
}
