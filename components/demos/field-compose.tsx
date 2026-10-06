"use client"

import { Button } from "@/registry/anibt/ui/button"
import { Checkbox } from "@/registry/anibt/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/registry/anibt/ui/field"
import { Input } from "@/registry/anibt/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/anibt/ui/select"

export default function FieldCompose() {
  return (
    <form className="w-full max-w-md" onSubmit={(event) => event.preventDefault()}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>订阅 RSS</FieldLegend>
          <FieldDescription>新资源发布后，你的阅读器会自动收到。</FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="field-compose-anime">番剧</FieldLabel>
              <Input id="field-compose-anime" defaultValue="药屋少女的呢喃 第二季" />
            </Field>
            <Field>
              <FieldLabel htmlFor="field-compose-group">字幕组</FieldLabel>
              <Select defaultValue="nekomoe">
                <SelectTrigger id="field-compose-group">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nekomoe">喵萌奶茶屋</SelectItem>
                  <SelectItem value="sakurato">桜都字幕组</SelectItem>
                  <SelectItem value="lolihouse">LoliHouse</SelectItem>
                </SelectContent>
              </Select>
              <FieldDescription>只收这个字幕组的发布。</FieldDescription>
            </Field>
            <Field data-invalid>
              <FieldLabel htmlFor="field-compose-keyword">关键词</FieldLabel>
              <Input id="field-compose-keyword" aria-invalid defaultValue="简" />
              <FieldError errors={[{ message: "关键词至少两个字，例如「简中」或「1080」。" }]} />
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator>推送</FieldSeparator>
        <Field orientation="horizontal">
          <Checkbox id="field-compose-push" defaultChecked />
          <FieldLabel htmlFor="field-compose-push">同时推送到 qBittorrent</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Button type="submit">生成订阅链接</Button>
          <Button type="button" variant="ghost">
            取消
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
