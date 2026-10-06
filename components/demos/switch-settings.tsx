import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldTitle } from "@/registry/anibt/ui/field"
import { Switch } from "@/registry/anibt/ui/switch"

const SETTINGS = [
  { id: "episodes", title: "订阅的番剧更新", description: "有新剧集时在站内提醒你。", on: true },
  { id: "groups", title: "关注的字幕组发布", description: "包括合集和修正版。", on: true },
  { id: "weekly", title: "每周番组表", description: "每周一早上 8 点推送本周放送。" },
]

export default function SwitchSettings() {
  return (
    <FieldGroup className="w-full max-w-md gap-2">
      {SETTINGS.map((setting) => (
        <FieldLabel key={setting.id} htmlFor={`switch-settings-${setting.id}`}>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>{setting.title}</FieldTitle>
              <FieldDescription>{setting.description}</FieldDescription>
            </FieldContent>
            <Switch id={`switch-settings-${setting.id}`} defaultChecked={setting.on} />
          </Field>
        </FieldLabel>
      ))}
    </FieldGroup>
  )
}
