import { Field, FieldLabel } from "@/registry/anibt/ui/field"
import { Switch } from "@/registry/anibt/ui/switch"

export default function SwitchDemo() {
  return (
    <Field orientation="horizontal" className="w-fit">
      <Switch id="switch-demo-auto" defaultChecked />
      <FieldLabel htmlFor="switch-demo-auto">新剧集自动推送到下载器</FieldLabel>
    </Field>
  )
}
