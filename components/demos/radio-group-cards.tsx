import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/registry/anibt/ui/field"
import { RadioGroup, RadioGroupItem } from "@/registry/anibt/ui/radio-group"

const METHODS = [
  { value: "magnet", title: "磁力链接", description: "交给本机的下载器打开。" },
  { value: "torrent", title: "种子文件", description: "下载 .torrent，适合离线导入。" },
  { value: "push", title: "推送到 qBittorrent", description: "需要先在设置里连接 WebUI。", disabled: true },
]

export default function RadioGroupCards() {
  return (
    <FieldSet className="w-full max-w-md">
      <FieldLegend variant="label">下载方式</FieldLegend>
      <RadioGroup defaultValue="magnet" className="gap-2">
        {METHODS.map((method) => (
          <FieldLabel key={method.value} htmlFor={`radio-group-cards-${method.value}`}>
            <Field orientation="horizontal" data-disabled={method.disabled || undefined}>
              <RadioGroupItem
                value={method.value}
                id={`radio-group-cards-${method.value}`}
                disabled={method.disabled}
              />
              <FieldContent>
                <FieldTitle>{method.title}</FieldTitle>
                <FieldDescription>{method.description}</FieldDescription>
              </FieldContent>
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
    </FieldSet>
  )
}
