import { Field, FieldLabel, FieldLegend, FieldSet } from "@/registry/anibt/ui/field"
import { RadioGroup, RadioGroupItem } from "@/registry/anibt/ui/radio-group"

const QUALITIES = [
  { value: "2160p", label: "2160p · 4K" },
  { value: "1080p", label: "1080p" },
  { value: "720p", label: "720p · 省流量" },
]

export default function RadioGroupDemo() {
  return (
    <FieldSet className="w-fit">
      <FieldLegend variant="label">默认画质</FieldLegend>
      <RadioGroup defaultValue="1080p">
        {QUALITIES.map((quality) => (
          <Field key={quality.value} orientation="horizontal">
            <RadioGroupItem value={quality.value} id={`radio-group-demo-${quality.value}`} />
            <FieldLabel htmlFor={`radio-group-demo-${quality.value}`}>{quality.label}</FieldLabel>
          </Field>
        ))}
      </RadioGroup>
    </FieldSet>
  )
}
