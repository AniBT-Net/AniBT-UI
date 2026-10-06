"use client"

import { Field, FieldControl, FieldGroup } from "@/registry/anibt/ui/field"
import { PasswordInput } from "@/registry/anibt/ui/password-input"

export default function PasswordInputDemo() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Field label="新密码" required hint="至少 10 位，字母和数字都要有。">
        <FieldControl>
          <PasswordInput autoComplete="new-password" defaultValue="sakura2026" />
        </FieldControl>
      </Field>
      <Field label="再输入一次" required error="两次输入的密码不一样。">
        <FieldControl>
          <PasswordInput autoComplete="new-password" defaultValue="sakura2025" />
        </FieldControl>
      </Field>
    </FieldGroup>
  )
}
