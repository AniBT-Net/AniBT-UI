import { ArrowLeftIcon, ArrowRightIcon, BracesIcon } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getMDXComponents } from "@/components/mdx"
import { getNeighbours } from "@/lib/docs-nav"
import { source } from "@/lib/source"
import { SITE_NAME } from "@/lib/site"
import { Badge } from "@/registry/anibt/ui/badge"

type Params = { slug?: string[] }

export default async function DocsPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) notFound()

  const MDX = page.data.body
  const isComponent = slug?.[0] === "components" && slug.length === 2
  const kicker = slug?.[0] === "components" ? "组件" : "文档"
  const { previous, next } = getNeighbours(page.url)

  return (
    <article className="w-full max-w-[880px] pb-8">
      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="candy" tilt={-3} face="text">
            ✦ {kicker}
          </Badge>
          {isComponent ? (
            <>
              <Badge variant="sticker" tilt={2}>
                @anibt/{slug[1]}
              </Badge>
              <a
                href={`/r/${slug[1]}.json`}
                className="anibt-btn anibt-btn-ghost anibt-btn-sm ml-auto gap-1.5"
                target="_blank"
                rel="noreferrer"
              >
                <BracesIcon className="size-3.5" aria-hidden="true" />
                registry JSON
              </a>
            </>
          ) : null}
        </div>
        <h1 className="text-[28px] leading-[1.3] font-extrabold tracking-[0.01em]">{page.data.title}</h1>
        {page.data.description ? (
          <p className="mt-2 max-w-[680px] text-[14px] leading-[1.7] text-anibt-ink2">{page.data.description}</p>
        ) : null}
      </header>

      <div className="docs-body">
        <MDX components={getMDXComponents()} />
      </div>

      <nav aria-label="上一页 / 下一页" className="anibt-stitch-over mt-14 grid gap-3 pt-6 sm:grid-cols-2">
        {previous ? (
          <Link href={previous.url} className="anibt-btn anibt-btn-raised h-auto flex-col items-start gap-1 px-4 py-3">
            <span className="flex items-center gap-1 text-[12px] font-normal text-muted-foreground">
              <ArrowLeftIcon className="size-3.5" aria-hidden="true" />
              上一页
            </span>
            <span className="text-[14px]">{previous.name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={next.url} className="anibt-btn anibt-btn-raised h-auto flex-col items-end gap-1 px-4 py-3 text-right">
            <span className="flex items-center gap-1 text-[12px] font-normal text-muted-foreground">
              下一页
              <ArrowRightIcon className="size-3.5" aria-hidden="true" />
            </span>
            <span className="text-[14px]">{next.name}</span>
          </Link>
        ) : null}
      </nav>
    </article>
  )
}

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) notFound()
  return {
    title: `${page.data.title} · ${SITE_NAME}`,
    description: page.data.description,
  }
}
