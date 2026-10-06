import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/anibt/ui/select"

export default function SelectDemo() {
  return (
    <Select defaultValue="nekomoe">
      <SelectTrigger className="w-56" aria-label="字幕组">
        <SelectValue placeholder="选择字幕组" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="nekomoe">喵萌奶茶屋</SelectItem>
        <SelectItem value="sakurato">桜都字幕组</SelectItem>
        <SelectItem value="lolihouse">LoliHouse</SelectItem>
        <SelectItem value="kitauji">北宇治字幕组</SelectItem>
        <SelectItem value="ani">ANi</SelectItem>
        <SelectItem value="vcb" disabled>
          VCB-Studio（暂停发布）
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
