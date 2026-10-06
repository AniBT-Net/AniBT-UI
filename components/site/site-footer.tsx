import Link from "next/link"

import { ANIBT_URL, GITHUB_URL, SITE_URL } from "@/lib/site"

/**
 * The footer: one line under a stitch, no paper. Small logo sticker and the
 * licence on the left, quiet links on the right; it folds to two lines on a
 * phone.
 */
export function SiteFooter() {
  const links = [
    { href: "/docs", label: "快速开始" },
    { href: "/docs/components", label: "组件" },
    { href: "/docs/theming", label: "主题" },
    { href: `${SITE_URL}/r/registry.json`, label: "registry.json", external: true },
    { href: GITHUB_URL, label: "GitHub", external: true },
    { href: ANIBT_URL, label: "anibt.net", external: true },
  ]

  return (
    <footer className="anibt-stitch-over mt-16">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-[clamp(16px,3vw,32px)] py-5 md:h-14 md:flex-row md:items-center md:py-0">
        <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
          <img src="/brand/anibt-logo@2x.webp" alt="AniBT" width={960} height={488} className="anibt-rim-cut h-6 w-auto" />
          <span>
            AniBT UI · 代码 MIT · 品牌素材（logo、吉祥物）不在开源许可内
          </span>
        </div>
        <nav aria-label="页脚" className="flex flex-wrap items-center gap-x-1 gap-y-1 md:ml-auto">
          {links.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="anibt-btn anibt-btn-ghost anibt-btn-sm"
              >
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className="anibt-btn anibt-btn-ghost anibt-btn-sm">
                {link.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </footer>
  )
}
