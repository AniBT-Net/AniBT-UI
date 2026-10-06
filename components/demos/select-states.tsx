import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/anibt/ui/select"

const RESOLUTIONS = ["2160p", "1080p", "720p"]

function Options() {
  return (
    <SelectContent>
      {RESOLUTIONS.map((resolution) => (
        <SelectItem key={resolution} value={resolution} className="anibt-num">
          {resolution}
        </SelectItem>
      ))}
    </SelectContent>
  )
}

export default function SelectStates() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select defaultValue="1080p">
        <SelectTrigger size="sm" className="anibt-num w-28" aria-label="画质（小号）">
          <SelectValue />
        </SelectTrigger>
        <Options />
      </Select>
      <Select>
        <SelectTrigger className="w-32" aria-label="画质（未填）" aria-invalid>
          <SelectValue placeholder="必须选择" />
        </SelectTrigger>
        <Options />
      </Select>
      <Select defaultValue="720p" disabled>
        <SelectTrigger className="anibt-num w-32" aria-label="画质（不可用）">
          <SelectValue />
        </SelectTrigger>
        <Options />
      </Select>
    </div>
  )
}
