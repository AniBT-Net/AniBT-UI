import * as React from "react"
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Breadcrumb — the AniBT 「贴纸手账」 trail.
 *
 * 13px, muted; a link is `--anibt-ink2` and turns pink under the pointer; the
 * current page is ink at 600 and not a link. Separators are a small muted
 * chevron. The trail wraps rather than scrolls; keep it to three or four
 * steps and fold the middle into `BreadcrumbEllipsis`.
 *
 * No washi tape here: the tape is the single "you are here" mark of the main
 * navigation, and a second one on the same page would compete with it.
 *
 * The parts are shadcn's. `BreadcrumbLink` takes `asChild` (Radix) or
 * `render={<Link … />}` (Base UI) to hand the link to a router.
 */
function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="面包屑" data-slot="breadcrumb" {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-[13px] leading-5 break-words text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li data-slot="breadcrumb-item" className={cn("inline-flex min-w-0 items-center gap-1.5", className)} {...props} />
  )
}

function BreadcrumbLink({
  asChild = false,
  render,
  className,
  children,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
  /** Base UI's form of `asChild`: `render={<Link href="…" />}`. */
  render?: React.ReactElement
}) {
  const classes = cn(
    "inline-flex items-center gap-1 rounded-[6px] font-medium text-anibt-ink2 underline-offset-4 outline-hidden transition-colors duration-150 hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid [&>svg]:size-3.5 [&>svg]:shrink-0",
    className
  )
  if (asChild || render) {
    const child = render ? (children !== undefined ? React.cloneElement(render, undefined, children) : render) : children
    return (
      <Slot.Root data-slot="breadcrumb-link" className={classes} {...props}>
        {child}
      </Slot.Root>
    )
  }
  return (
    <a data-slot="breadcrumb-link" className={classes} {...props}>
      {children}
    </a>
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("anibt-ell font-semibold text-foreground", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("text-muted-foreground/80 [&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  )
}

function BreadcrumbEllipsis({ className, label = "更多", ...props }: React.ComponentProps<"span"> & { label?: string }) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-5 items-center justify-center [&>svg]:size-4", className)}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">{label}</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
