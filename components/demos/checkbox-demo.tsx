import { Checkbox } from "@/registry/anibt/ui/checkbox"
import { Field, FieldLabel } from "@/registry/anibt/ui/field"

const FILTERS = [
  { id: "chs", label: "只看简体中文", checked: true },
  { id: "batch", label: "隐藏合集" },
  { id: "finished", label: "包含已完结的番剧", checked: true },
  { id: "2160p", label: "只看 2160p（暂无片源）", disabled: true },
]

export default function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-3">
      {FILTERS.map((filter) => (
        <Field key={filter.id} orientation="horizontal">
          <Checkbox id={`checkbox-demo-${filter.id}`} defaultChecked={filter.checked} disabled={filter.disabled} />
          <FieldLabel htmlFor={`checkbox-demo-${filter.id}`}>{filter.label}</FieldLabel>
        </Field>
      ))}
    </div>
  )
}
