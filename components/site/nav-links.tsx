"use client"

import { ArrowUpRightIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { MAIN_NAV } from "@/lib/site"
import { cn } from "@/lib/utils"

/**
 * The top navigation. The current section wears A's washi tape under its
 * label — the only "you are here" mark. On a phone the same links become a
 * horizontally scrolling row under the bar.
 */
export function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname() ?? "/"

  return (
    <nav aria-label="主导航" className={cn("flex items-center gap-1", className)}>
      {MAIN_NAV.map((link) => {
        const current = link.match(pathname)
        const classes =
          "relative inline-flex h-8 flex-none items-center gap-1 rounded-[10px] px-3 text-[14px] font-semibold whitespace-nowrap text-anibt-ink2 transition-colors duration-150 hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-[current=page]:text-foreground"
        const tape = current ? (
          <span aria-hidden="true" className="anibt-tape absolute inset-x-3 -bottom-[3px] -rotate-[1.5deg]" />
        ) : null

        if (link.external) {
          return (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className={classes}>
              {link.label}
              <ArrowUpRightIcon className="size-3.5 text-muted-foreground" aria-hidden="true" />
            </a>
          )
        }

        return (
          <Link key={link.href} href={link.href} aria-current={current ? "page" : undefined} className={classes}>
            {link.label}
            {tape}
          </Link>
        )
      })}
    </nav>
  )
}
