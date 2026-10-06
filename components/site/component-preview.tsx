import { readFileSync } from "node:fs"
import path from "node:path"

import { demos, type DemoName } from "@/components/demos"
import { CodeBlock } from "@/components/site/code-block"
import { PreviewTabs } from "@/components/site/preview-tabs"
import { toConsumerImports } from "@/lib/registry"

/**
 * A live example and its source. The code tab shows the demo file with its
 * imports as a consumer writes them (`@/components/ui/…`).
 */
export function ComponentPreview({ name, align = "center" }: { name: DemoName; align?: "center" | "start" }) {
  const Demo = demos[name]
  if (!Demo) throw new Error(`Unknown demo "${name}"`)

  const file = path.join(process.cwd(), "components/demos", `${name}.tsx`)
  const source = toConsumerImports(readFileSync(file, "utf8"))

  return (
    <PreviewTabs
      align={align}
      preview={<Demo />}
      code={<CodeBlock code={source} title={`${name}.tsx`} maxHeight={480} />}
    />
  )
}
