import { ToggleGroup, ToggleGroupItem } from "@/registry/anibt/ui/toggle-group"

const DAYS = ["一", "二", "三", "四", "五", "六", "日"]

export default function ToggleGroupSizes() {
  return (
    <div className="flex flex-col items-start gap-4">
      {(["sm", "default", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-wrap items-center gap-4">
          <ToggleGroup type="single" size={size} defaultValue="三" aria-label={`星期（${size}）`}>
            {DAYS.map((day) => (
              <ToggleGroupItem key={day} value={day}>
                {day}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <ToggleGroup type="single" variant="outline" size={size} defaultValue="tv" aria-label={`类型（${size}）`}>
            <ToggleGroupItem value="tv">TV</ToggleGroupItem>
            <ToggleGroupItem value="movie">剧场版</ToggleGroupItem>
            <ToggleGroupItem value="ova">OVA</ToggleGroupItem>
          </ToggleGroup>
        </div>
      ))}
    </div>
  )
}
