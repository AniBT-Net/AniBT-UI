import { Input } from "@/registry/anibt/ui/input"
import { Label } from "@/registry/anibt/ui/label"

export default function InputStates() {
  return (
    <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
      <div className="grid gap-1.5">
        <Label htmlFor="input-states-empty">关键词</Label>
        <Input id="input-states-empty" placeholder="例如：简繁内封 1080p" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="input-states-num">集数</Label>
        {/* Figures take the round face: add anibt-num. */}
        <Input id="input-states-num" type="number" className="anibt-num" defaultValue={24} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="input-states-invalid">官网</Label>
        <Input id="input-states-invalid" aria-invalid defaultValue="kusuriya-anime" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="input-states-readonly">Slug</Label>
        <Input id="input-states-readonly" readOnly className="anibt-num" defaultValue="sakura-subs" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="input-states-disabled">种子哈希</Label>
        <Input id="input-states-disabled" disabled defaultValue="3f9a…c21e" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="input-states-file">种子文件</Label>
        <Input id="input-states-file" type="file" accept=".torrent" />
      </div>
    </div>
  )
}
