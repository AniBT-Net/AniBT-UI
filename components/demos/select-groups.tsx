import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/anibt/ui/select"

export default function SelectGroups() {
  return (
    <Select>
      <SelectTrigger className="w-56" aria-label="字幕语言">
        <SelectValue placeholder="字幕语言" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>简体</SelectLabel>
          <SelectItem value="chs">简中</SelectItem>
          <SelectItem value="chs-jpn">简日双语</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>繁體</SelectLabel>
          <SelectItem value="cht">繁中</SelectItem>
          <SelectItem value="cht-jpn">繁日雙語</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectItem value="raw">无字幕（生肉）</SelectItem>
      </SelectContent>
    </Select>
  )
}
