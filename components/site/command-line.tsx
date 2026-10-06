import { TerminalIcon } from "lucide-react"

import { CopyButton } from "@/components/site/copy-button"
import { cn } from "@/lib/utils"

/**
 * One copy-able shell line on the field material: a terminal glyph, the
 * command in mono (scrolls sideways on a phone, never wraps), a copy key.
 */
export function CommandLine({ command, className }: { command: string; className?: string }) {
  return (
    <div className={cn("anibt-field h-10 gap-2 pr-1.5 pl-3 text-foreground", className)}>
      <TerminalIcon className="size-4 flex-none text-anibt-mark" aria-hidden="true" />
      <code className="site-scroll-x min-w-0 flex-1 font-mono text-[13px] whitespace-nowrap">{command}</code>
      <CopyButton value={command} label="复制命令" className="flex-none" />
    </div>
  )
}
