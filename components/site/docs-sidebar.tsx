"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export type SidebarGroup = { label: string; items: Array<{ name: string; url: string }> }

const trim = (pathname: string) => pathname.replace(/\/+$/, "") || "/"

/**
 * The docs rail. ≥1024: a column of 32px rows; the current one is paper with
 * a 1px edge and a vertical washi tape on its left edge (A's side-nav).
 * Below 1024: the same pages as a scrolling tab row, the current one taped
 * underneath. The tape is the only "you are here" mark in both.
 */
export function DocsSidebar({ groups }: { groups: SidebarGroup[] }) {
  const pathname = trim(usePathname() ?? "/")

  return (
    <>
      <nav aria-label="文档目录" className="sticky top-[72px] hidden max-h-[calc(100dvh-88px)] overflow-y-auto pr-2 pb-8 lg:block">
        {groups.map((group) => (
          <div key={group.label} className="mb-5">
            <div className="px-3 pb-1.5 text-[12px] font-semibold text-muted-foreground">{group.label}</div>
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const current = trim(item.url) === pathname
                return (
                  <li key={item.url}>
                    <Link
                      href={item.url}
                      aria-current={current ? "page" : undefined}
                      className={cn(
                        "relative flex h-8 items-center rounded-[10px] px-3 text-[13px] text-anibt-ink2 transition-colors duration-150 hover:bg-card hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                        current && "bg-card font-bold text-foreground shadow-[inset_0_0_0_1px_var(--border)]"
                      )}
                    >
                      {current ? (
                        <span aria-hidden="true" className="anibt-tape-y absolute top-1.5 -left-[3px] h-5 rotate-[4deg]" />
                      ) : null}
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      <nav aria-label="文档目录" className="site-scroll-x -mx-1 px-1 lg:hidden">
        <div className="anibt-tabs w-max min-w-full">
          {groups.flatMap((group) => group.items).map((item) => {
            const current = trim(item.url) === pathname
            return (
              <Link
                key={item.url}
                href={item.url}
                aria-current={current ? "page" : undefined}
                className={cn("anibt-tab", current && "anibt-tab-on")}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
