import { Label } from "@/registry/anibt/ui/label"
import { Textarea } from "@/registry/anibt/ui/textarea"

export default function TextareaDemo() {
  return (
    <div className="grid w-full max-w-md gap-1.5">
      <Label htmlFor="textarea-demo-notes">发布说明</Label>
      <Textarea
        id="textarea-demo-notes"
        placeholder="写给下载的人：片源、字幕、修正了什么"
        defaultValue={"片源：Baha WEB-DL\n字幕：简繁内封，修正了第 3 集的时间轴。"}
      />
    </div>
  )
}
