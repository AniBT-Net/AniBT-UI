import { LinkIcon } from "lucide-react"
import type { MDXComponents } from "mdx/types"
import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"

import { CodeFrame } from "@/components/site/code-frame"
import { CommandLine } from "@/components/site/command-line"
import { ComponentPreview } from "@/components/site/component-preview"
import {
  AddCommand,
  Callout,
  ComponentGrid,
  ItemUrl,
  RegistriesSnippet,
  RegistryAddCommand,
  Step,
  Steps,
} from "@/components/site/docs-ui"
import { InstallBlock } from "@/components/site/install-block"
import { PropsTable } from "@/components/site/props-table"
import { ThemeKeysTable, TokenTable } from "@/components/site/token-table"
import { cn } from "@/lib/utils"

function Heading({ as: Tag, id, className, children }: { as: "h2" | "h3"; id?: string; className: string; children: ReactNode }) {
  return (
    <Tag id={id} className={cn("group/h scroll-mt-24", className)}>
      {children}
      {id ? (
        <a
          href={`#${id}`}
          aria-label="链接到本节"
          className="ml-2 inline-flex align-middle text-muted-foreground opacity-0 transition-opacity group-hover/h:opacity-100 focus-visible:opacity-100"
        >
          <LinkIcon className="size-3.5" aria-hidden="true" />
        </a>
      ) : null}
    </Tag>
  )
}

function Anchor({ href = "", children, ...props }: ComponentProps<"a">) {
  const className = "font-semibold text-accent-foreground underline-offset-4 hover:underline"
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={className} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})} {...props}>
      {children}
    </a>
  )
}

function Pre(props: ComponentProps<"pre"> & { title?: string; icon?: string }) {
  // `icon` is fumadocs' language glyph (an SVG string); the frame draws its own.
  const { title, icon: _icon, ...rest } = props
  void _icon
  return (
    <CodeFrame title={title ?? "代码"} className="my-5">
      <pre {...rest} />
    </CodeFrame>
  )
}

export function getMDXComponents(extra?: MDXComponents): MDXComponents {
  return {
    h2: ({ id, children }) => (
      <Heading as="h2" id={id} className="mt-12 mb-3 text-[20px] leading-[1.4] font-extrabold first:mt-0">
        {children}
      </Heading>
    ),
    h3: ({ id, children }) => (
      <Heading as="h3" id={id} className="mt-8 mb-2 text-[16px] leading-[1.4] font-extrabold">
        {children}
      </Heading>
    ),
    p: (props) => <p className="my-3 text-[14px] leading-[1.7] text-anibt-ink2" {...props} />,
    ul: (props) => <ul className="my-3 list-disc space-y-1.5 pl-5 text-[14px] text-anibt-ink2 marker:text-anibt-mark" {...props} />,
    ol: (props) => <ol className="my-3 list-decimal space-y-1.5 pl-5 text-[14px] text-anibt-ink2 marker:font-semibold marker:text-anibt-mark" {...props} />,
    li: (props) => <li className="pl-1 leading-[1.7]" {...props} />,
    strong: (props) => <strong className="font-bold text-foreground" {...props} />,
    a: Anchor,
    hr: () => <hr className="anibt-stitch my-10 border-0" />,
    code: (props) => (
      <code
        className="rounded-[6px] bg-muted px-1.5 py-0.5 font-mono text-[12.5px] text-foreground shadow-[inset_0_0_0_1px_var(--border)] [pre_&]:rounded-none [pre_&]:bg-transparent [pre_&]:p-0 [pre_&]:text-[13px] [pre_&]:shadow-none"
        {...props}
      />
    ),
    pre: Pre,
    blockquote: ({ children }) => <Callout>{children}</Callout>,
    table: (props) => (
      <div className="not-prose anibt-sheet my-6 overflow-x-auto">
        <table className="w-full border-collapse text-left text-[13px]" {...props} />
      </div>
    ),
    th: (props) => <th className="anibt-stitch-under h-9 px-4 text-[12px] font-semibold whitespace-nowrap text-muted-foreground" {...props} />,
    td: (props) => <td className="anibt-stitch-under px-4 py-2.5 align-top text-anibt-ink2 [tr:last-child_&]:bg-none" {...props} />,
    ComponentPreview,
    InstallBlock,
    PropsTable,
    CommandLine,
    TokenTable,
    ThemeKeysTable,
    Callout,
    Steps,
    Step,
    ComponentGrid,
    AddCommand,
    RegistriesSnippet,
    RegistryAddCommand,
    ItemUrl,
    ...extra,
  }
}
