import type { ReactNode } from "react"

import { DocsSidebar } from "@/components/site/docs-sidebar"
import { getDocsNav } from "@/lib/docs-nav"

/** Nav + one content column (no third column, no docked panel). */
export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto grid w-full max-w-[1440px] flex-1 gap-6 px-[clamp(16px,3vw,32px)] pt-6 lg:grid-cols-[208px_minmax(0,1fr)] lg:gap-12 lg:pt-8">
      <DocsSidebar groups={getDocsNav()} />
      <div className="min-w-0">{children}</div>
    </div>
  )
}
