import { Checkbox } from "@/registry/anibt/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/registry/anibt/ui/field"
import { Switch } from "@/registry/anibt/ui/switch"

const LOCKS = [
  { id: "title", label: "标题", locked: true },
  { id: "format", label: "格式" },
  { id: "status", label: "状态" },
  { id: "season", label: "季度" },
  { id: "year", label: "年份" },
  { id: "premiere", label: "首播" },
  { id: "cover", label: "封面" },
  { id: "site", label: "官方网站", locked: true },
]

export default function FieldChoices() {
  return (
    <FieldGroup title="设置" className="w-full max-w-2xl">
      <FieldSet>
        <FieldLegend>锁字段（同步不会覆盖）</FieldLegend>
        <FieldDescription>保存时会自动锁定所有被修改的字段；被锁定的字段不会被同步覆盖。</FieldDescription>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
          {LOCKS.map((lock) => (
            <Field key={lock.id} orientation="horizontal">
              <Checkbox id={`field-choices-${lock.id}`} defaultChecked={lock.locked} />
              <FieldLabel htmlFor={`field-choices-${lock.id}`}>{lock.label}</FieldLabel>
            </Field>
          ))}
        </div>
      </FieldSet>
      <FieldLabel htmlFor="field-choices-hide">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>对公开页面隐藏</FieldTitle>
            <FieldDescription>隐藏后不会出现在公开列表、搜索和周表中。</FieldDescription>
          </FieldContent>
          <Switch id="field-choices-hide" />
        </Field>
      </FieldLabel>
    </FieldGroup>
  )
}
