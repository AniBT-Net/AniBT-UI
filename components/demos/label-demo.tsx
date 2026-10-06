import { Checkbox } from "@/registry/anibt/ui/checkbox"
import { Input } from "@/registry/anibt/ui/input"
import { Label } from "@/registry/anibt/ui/label"

export default function LabelDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="label-demo-group">字幕组名称</Label>
        <Input id="label-demo-group" defaultValue="喵萌奶茶屋" />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="label-demo-only" defaultChecked />
        {/* Option text beside a checkbox is body copy, not a field label. */}
        <Label htmlFor="label-demo-only" className="font-normal text-foreground">
          只看简体中文
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="label-demo-locked" disabled />
        <Label htmlFor="label-demo-locked" className="font-normal">
          同步时覆盖封面（已锁定）
        </Label>
      </div>
    </div>
  )
}
