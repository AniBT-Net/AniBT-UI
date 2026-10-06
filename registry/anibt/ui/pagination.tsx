import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Pagination — the AniBT 「贴纸手账」 pager.
 *
 * Quiet 32px cells in the round face (`anibt-pager-item`); the pointer brings
 * the pink wash, and the current page is washed with a pink ring. On touch
 * widths each cell is a 44px target, from `sm` A's 32.
 *
 * The parts are shadcn's (`Pagination`, `PaginationContent`, `PaginationItem`,
 * `PaginationLink`, `PaginationPrevious`, `PaginationNext`,
 * `PaginationEllipsis`), with Chinese defaults for the words. Which pages
 * exist and where a link points stay with the page that owns the data —
 * or hand both to `Pager`, which draws the whole row from `page` and
 * `pageCount`.
 *
 * A link with an `href` is an `<a>`; without one it is a `<button>` (a pager
 * driven by state or a cursor still has to be reachable by Tab). `asChild`
 * hands the cell to a router link.
 */
function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="分页"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul data-slot="pagination-content" className={cn("flex flex-row items-center gap-1", className)} {...props} />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

const CELL =
  "anibt-pager-item h-11 min-w-11 outline-hidden select-none sm:h-8 sm:min-w-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid disabled:pointer-events-none disabled:text-muted-foreground/60 aria-disabled:pointer-events-none aria-disabled:text-muted-foreground/60 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"

type PaginationLinkProps = {
  /** The current page: the pink ring and `aria-current="page"`. */
  isActive?: boolean
  /** shadcn's button size names; `icon` is the square cell, the rest pad. */
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | "xs" | "icon-xs"
  /** Hand the cell to the single child (a router `Link`). */
  asChild?: boolean
  disabled?: boolean
} & Omit<React.ComponentProps<"a">, "ref"> &
  Omit<React.ComponentProps<"button">, keyof React.ComponentProps<"a"> | "ref">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  asChild = false,
  disabled,
  href,
  ...props
}: PaginationLinkProps) {
  const classes = cn(CELL, size.startsWith("icon") ? "px-2" : "gap-1 px-2.5", isActive && "anibt-pager-item-on", className)
  const shared = {
    "data-slot": "pagination-link",
    "data-active": isActive ? "true" : undefined,
    "aria-current": isActive ? ("page" as const) : undefined,
    className: classes,
  }

  if (asChild) {
    return <Slot.Root {...shared} aria-disabled={disabled || undefined} {...props} />
  }

  if (href !== undefined) {
    return (
      <a
        {...shared}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        {...(props as React.ComponentProps<"a">)}
      />
    )
  }

  return (
    <button type="button" {...shared} disabled={disabled} {...(props as React.ComponentProps<"button">)} />
  )
}

type PaginationStepProps = React.ComponentProps<typeof PaginationLink> & {
  /** The word beside the arrow (hidden below `sm`). */
  text?: string
  /** Arrow only, at every width. */
  iconOnly?: boolean
}

function PaginationPrevious({ className, text = "上一页", iconOnly = false, ...props }: PaginationStepProps) {
  return (
    <PaginationLink
      aria-label={text}
      size={iconOnly ? "icon" : "default"}
      className={cn(!iconOnly && "sm:pl-2", className)}
      {...props}
    >
      <ChevronLeftIcon aria-hidden="true" />
      {iconOnly ? null : <span className="hidden sm:block">{text}</span>}
    </PaginationLink>
  )
}

function PaginationNext({ className, text = "下一页", iconOnly = false, ...props }: PaginationStepProps) {
  return (
    <PaginationLink
      aria-label={text}
      size={iconOnly ? "icon" : "default"}
      className={cn(!iconOnly && "sm:pr-2", className)}
      {...props}
    >
      {iconOnly ? null : <span className="hidden sm:block">{text}</span>}
      <ChevronRightIcon aria-hidden="true" />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, label = "更多页", ...props }: React.ComponentProps<"span"> & { label?: string }) {
  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn("flex h-11 w-8 items-center justify-center text-muted-foreground sm:h-8 sm:w-6", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  )
}

/**
 * The pages to draw for `page` of `pageCount`: the first and last
 * `boundaries` pages, `siblings` on each side of the current one, and
 * `"ellipsis"` for every gap of two or more. A gap of one page draws the page.
 */
function getPageWindow(page: number, pageCount: number, siblings = 1, boundaries = 1): Array<number | "ellipsis"> {
  const count = Math.max(1, Math.floor(pageCount))
  const current = Math.min(Math.max(1, Math.floor(page)), count)
  const keep = new Set<number>()
  for (let i = 1; i <= Math.min(boundaries, count); i++) keep.add(i)
  for (let i = Math.max(1, count - boundaries + 1); i <= count; i++) keep.add(i)
  for (let i = Math.max(1, current - siblings); i <= Math.min(count, current + siblings); i++) keep.add(i)

  const sorted = [...keep].sort((a, b) => a - b)
  const out: Array<number | "ellipsis"> = []
  for (const value of sorted) {
    const last = out[out.length - 1]
    if (typeof last === "number" && value - last === 2) out.push(last + 1)
    else if (typeof last === "number" && value - last > 2) out.push("ellipsis")
    out.push(value)
  }
  return out
}

type PagerProps = Omit<React.ComponentProps<"nav">, "onChange"> & {
  /** The current page, from 1. */
  page: number
  pageCount: number
  /** Links: the URL of a page. Leave it out to get buttons. */
  getHref?: (page: number) => string
  /** Called with the page a reader picked (with or without `getHref`). */
  onPageChange?: (page: number) => void
  /** Pages kept on each side of the current one. Default 1. */
  siblings?: number
  /** Pages kept at each end. Default 1. */
  boundaries?: number
  /** Show 上一页 / 下一页 beside the arrows from `sm`. Default arrows only. */
  showText?: boolean
  previousText?: string
  nextText?: string
  /** The accessible name of a page cell. Default `第 N 页`. */
  pageLabel?: (page: number) => string
}

/**
 * A whole pager row from `page` and `pageCount`: ‹ 1 2 [3] 4 … 12 ›.
 * One page draws nothing — a short list is not paginated.
 */
function Pager({
  page,
  pageCount,
  getHref,
  onPageChange,
  siblings = 1,
  boundaries = 1,
  showText = false,
  previousText = "上一页",
  nextText = "下一页",
  pageLabel = (value) => `第 ${value} 页`,
  ...props
}: PagerProps) {
  if (pageCount <= 1) return null
  const current = Math.min(Math.max(1, page), pageCount)

  const target = (value: number) => ({
    href: getHref?.(value),
    onClick: onPageChange ? () => onPageChange(value) : undefined,
  })

  return (
    <Pagination {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            text={previousText}
            iconOnly={!showText}
            disabled={current <= 1}
            {...target(current - 1)}
          />
        </PaginationItem>
        {getPageWindow(current, pageCount, siblings, boundaries).map((value, index) =>
          value === "ellipsis" ? (
            <PaginationItem key={`gap-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={value}>
              <PaginationLink isActive={value === current} aria-label={pageLabel(value)} {...target(value)}>
                {value}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            text={nextText}
            iconOnly={!showText}
            disabled={current >= pageCount}
            {...target(current + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pager,
  getPageWindow,
}
export type { PaginationLinkProps, PagerProps }
