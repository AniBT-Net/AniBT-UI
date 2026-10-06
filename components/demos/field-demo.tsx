"use client"

import { LockIcon } from "lucide-react"

import { StatusBadge } from "@/registry/anibt/ui/badge"
import { Field, FieldControl, FieldGroup, FieldRow, FieldTag } from "@/registry/anibt/ui/field"
import { Input } from "@/registry/anibt/ui/input"

export default function FieldDemo() {
  return (
    <FieldGroup title="基本信息" note="短字段两两成行" className="w-full max-w-2xl">
      <Field
        label="中文标题"
        required
        tags={<StatusBadge tone="on">手动</StatusBadge>}
        meta="Demo Admin 接管 · 2 天前"
      >
        <FieldControl>
          <Input defaultValue="药屋少女的呢喃 第二季" />
        </FieldControl>
      </Field>
      <FieldRow>
        <Field label="集数" tags={<FieldTag icon={LockIcon}>已锁定</FieldTag>}>
          <FieldControl>
            <Input type="number" className="anibt-num" defaultValue={24} />
          </FieldControl>
        </Field>
        <Field label="年份" hint="四位数年份。">
          <FieldControl>
            <Input inputMode="numeric" className="anibt-num" defaultValue="2026" />
          </FieldControl>
        </Field>
      </FieldRow>
      <FieldRow>
        <Field label="Slug" readOnly>
          <FieldControl>
            <Input readOnly className="anibt-num" defaultValue="sakura-subs" />
          </FieldControl>
        </Field>
        <Field label="官网" error="请输入以 https:// 开头的网址">
          <FieldControl>
            <Input type="url" defaultValue="kusuriya-anime" />
          </FieldControl>
        </Field>
      </FieldRow>
    </FieldGroup>
  )
}
