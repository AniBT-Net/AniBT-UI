import { highlight } from "fumadocs-core/highlight"
import type { ReactNode } from "react"

import { CodeFrame } from "@/components/site/code-frame"

/** Highlights `code` at build time (shiki, both themes as CSS variables). */
export async function CodeBlock({
  code,
  lang = "tsx",
  title,
  maxHeight,
  className,
}: {
  code: string
  lang?: string
  title?: ReactNode
  maxHeight?: number
  className?: string
}) {
  const rendered = await highlight(code.replace(/\n+$/, ""), {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  })

  return (
    <CodeFrame title={title ?? lang} maxHeight={maxHeight} className={className}>
      {rendered}
    </CodeFrame>
  )
}
