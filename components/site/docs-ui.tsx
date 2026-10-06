import { InfoIcon, TriangleAlertIcon } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

import { CodeBlock } from "@/components/site/code-block"
import { CommandLine } from "@/components/site/command-line"
import { getDocsNav } from "@/lib/docs-nav"
import { addCommand, REGISTRIES_SNIPPET, REGISTRY_URL_TEMPLATE, SITE_URL } from "@/lib/site"
import { source } from "@/lib/source"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/anibt/ui/badge"

/** `npx shadcn@latest add @anibt/<names…>` with a copy key. */
export function AddCommand({ names }: { names: string[] }) {
  return <CommandLine command={addCommand(...names)} className="not-prose my-4" />
}

/** The `registries` entry for components.json, on the configured site URL. */
export function RegistriesSnippet() {
  return <CodeBlock code={REGISTRIES_SNIPPET} lang="json" title="components.json" className="not-prose my-4" />
}

/** The same entry, added by the CLI. */
export function RegistryAddCommand() {
  return <CommandLine command={`npx shadcn@latest registry add @anibt=${REGISTRY_URL_TEMPLATE}`} className="not-prose my-4" />
}

/** A direct item URL on the configured site, e.g. for `shadcn view`. */
export function ItemUrl({ name }: { name: string }) {
  return <code className="font-mono text-[12.5px]">{`${SITE_URL}/r/${name}.json`}</code>
}

/** A note on a well: info (pink mark) or warn (amber). */
export function Callout({ type = "info", title, children }: { type?: "info" | "warn"; title?: ReactNode; children: ReactNode }) {
  const Icon = type === "warn" ? TriangleAlertIcon : InfoIcon
  return (
    <div
      className={cn(
        "not-prose my-5 flex gap-3 rounded-[10px] px-4 py-3 text-[13px] leading-relaxed",
        type === "warn"
          ? "bg-anibt-warn-wash text-foreground shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--anibt-warn-fill)_35%,transparent)]"
          : "bg-accent/60 text-foreground shadow-[inset_0_0_0_1px_var(--anibt-wash-line)]"
      )}
    >
      <Icon
        className={cn("mt-0.5 size-4 flex-none", type === "warn" ? "text-anibt-warn" : "text-anibt-mark")}
        aria-hidden="true"
      />
      <div className="min-w-0 [&_a]:text-accent-foreground [&_a]:underline [&_code]:font-mono [&_code]:text-[12px] [&_p]:m-0 [&_p+p]:mt-2">
        {title ? <p className="font-bold">{title}</p> : null}
        {children}
      </div>
    </div>
  )
}

/** Numbered steps: a candy count per step, parted by stitches. */
export function Steps({ children }: { children: ReactNode }) {
  return <ol className="not-prose my-6 flex list-none flex-col [counter-reset:step]">{children}</ol>
}

export function Step({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <li className="anibt-stitch-over relative grid grid-cols-[28px_minmax(0,1fr)] gap-x-3 py-5 [counter-increment:step] first:bg-none first:pt-1">
      <span
        aria-hidden="true"
        className="anibt-count mt-0.5 before:content-[counter(step)]"
      />
      <div className="min-w-0">
        <h3 className="text-[16px] leading-[1.4] font-extrabold">{title}</h3>
        <div className="mt-2 text-[14px] text-anibt-ink2 [&_p]:my-2">{children}</div>
      </div>
    </li>
  )
}

/** The component overview: the docs rail's groups (`meta.json` separators),
    one sticker card per documented component, with the page's own Chinese
    description. A helper item such as `spinner` has no page and is installed
    as a dependency of the component that uses it. */
export function ComponentGrid() {
  const groups = getDocsNav()
    .map((group) => ({
      label: group.label,
      pages: group.items
        .map((item) => item.url.match(/^\/docs\/components\/([^/]+)$/)?.[1])
        .flatMap((slug) => {
          const page = slug ? source.getPage(["components", slug]) : undefined
          return slug && page ? [{ slug, title: page.data.title, description: page.data.description }] : []
        }),
    }))
    .filter((group) => group.pages.length > 0)

  return (
    <div className="not-prose my-6 flex flex-col gap-8">
      {groups.map((group) => (
        <section key={group.label} aria-label={group.label} className="flex flex-col gap-3">
          <h2 className="flex items-baseline gap-2 text-[16px] font-extrabold">
            {group.label}
            <span className="anibt-num text-[12px] font-semibold text-muted-foreground">{group.pages.length}</span>
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {group.pages.map((page) => (
              <Link
                key={page.slug}
                href={`/docs/components/${page.slug}`}
                className="anibt-sheet group/card flex flex-col gap-2 p-4 transition-[transform,box-shadow] duration-200 ease-anibt-spring hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_var(--border),var(--anibt-shadow-lift)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-extrabold group-hover/card:text-accent-foreground">{page.title}</span>
                  <Badge variant="sticker" className="ml-auto" tilt={-3}>
                    @anibt/{page.slug}
                  </Badge>
                </div>
                <p className="anibt-clamp2 text-[12px] text-muted-foreground">{page.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
