import { ChevronRightIcon } from "lucide-react"
import Link from "next/link"

import { CodeBlock } from "@/components/site/code-block"
import { CommandLine } from "@/components/site/command-line"
import { addCommand } from "@/lib/site"
import { defaultTarget, getRegistryItem, readItemSource } from "@/lib/registry"

/**
 * How to install one item: the CLI line, and a manual fallback built from the
 * item's own registry entry (npm dependencies, the other @anibt items it
 * needs, and every file with its source as the CLI would write it).
 */
export function InstallBlock({ name }: { name: string }) {
  const item = getRegistryItem(name)
  const npmDeps = item.dependencies ?? []
  const anibtDeps = (item.registryDependencies ?? []).filter((dep) => dep !== "@anibt/theme")

  return (
    <div className="not-prose my-6 flex flex-col gap-3">
      <CommandLine command={addCommand(name)} />
      <p className="text-[12px] text-muted-foreground">
        第一次用之前：在 <code className="font-mono">components.json</code> 里登记{" "}
        <code className="font-mono">@anibt</code>，再单独运行一次{" "}
        <code className="font-mono">{addCommand("theme")}</code>（见
        <Link href="/docs" className="text-accent-foreground hover:underline">
          快速开始
        </Link>
        ）。只有单独安装主题时，CLI 才会把 shadcn 的标准颜色换成白樱 / 夜樱；随组件带进来的主题只补上 AniBT 自己的变量和配方。
        {anibtDeps.length ? (
          <>
            {" "}CLI 会一并装好{" "}
            {anibtDeps.map((dep, index) => (
              <span key={dep}>
                {index > 0 ? "、" : null}
                <code className="font-mono">{dep}</code>
              </span>
            ))}
            。
          </>
        ) : null}
      </p>

      <details className="group anibt-well bg-card">
        <summary className="flex h-10 cursor-pointer list-none items-center gap-2 rounded-[10px] px-3 text-[13px] font-semibold text-anibt-ink2 hover:text-accent-foreground [&::-webkit-details-marker]:hidden">
          <ChevronRightIcon className="size-4 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden="true" />
          手动安装
        </summary>
        <ol className="anibt-stitch-over flex list-none flex-col gap-4 px-4 pt-4 pb-4 text-[13px]">
          <li className="flex flex-col gap-2">
            <span className="font-semibold">1. 先装主题</span>
            <span className="text-muted-foreground">
              组件只读 <code className="font-mono">@anibt/theme</code> 的 token 和配方，没有主题就没有样子。
            </span>
            <CommandLine command={addCommand("theme")} />
          </li>
          {npmDeps.length ? (
            <li className="flex flex-col gap-2">
              <span className="font-semibold">2. 安装依赖</span>
              <CommandLine command={`npm install ${npmDeps.join(" ")}`} />
            </li>
          ) : null}
          {anibtDeps.length ? (
            <li className="flex flex-col gap-2">
              <span className="font-semibold">{npmDeps.length ? "3" : "2"}. 它还用到</span>
              <CommandLine command={addCommand(...anibtDeps.map((dep) => dep.replace("@anibt/", "")))} />
            </li>
          ) : null}
          <li className="flex flex-col gap-2">
            <span className="font-semibold">
              {1 + (npmDeps.length ? 1 : 0) + (anibtDeps.length ? 1 : 0) + 1}. 把下面的文件放进项目
            </span>
            {(item.files ?? []).map((file) => (
              <CodeBlock key={file.path} code={readItemSource(file)} title={defaultTarget(file)} maxHeight={420} />
            ))}
          </li>
        </ol>
      </details>
    </div>
  )
}
