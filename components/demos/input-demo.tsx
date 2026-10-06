import { Input } from "@/registry/anibt/ui/input"
import { Label } from "@/registry/anibt/ui/label"

export default function InputDemo() {
  return (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="input-demo-title">中文标题</Label>
      <Input id="input-demo-title" defaultValue="药屋少女的呢喃 第二季" />
    </div>
  )
}
