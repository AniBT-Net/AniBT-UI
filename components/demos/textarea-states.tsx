import { Label } from "@/registry/anibt/ui/label"
import { Textarea } from "@/registry/anibt/ui/textarea"

export default function TextareaStates() {
  return (
    <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
      <div className="grid gap-1.5">
        <Label htmlFor="textarea-states-invalid">驳回理由</Label>
        <Textarea id="textarea-states-invalid" aria-invalid defaultValue="太短" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="textarea-states-disabled">字幕组简介</Label>
        <Textarea id="textarea-states-disabled" disabled defaultValue="由站长维护，暂不可编辑。" />
      </div>
    </div>
  )
}
