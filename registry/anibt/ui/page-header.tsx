import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * PageHeader — the AniBT 「贴纸手账」 section head: one compact row.
 *
 * An optional section mark (a small white sticker tilted −4°, the glyph in
 * pink; it tips the other way under the pointer) → the title at 20/800 → a
 * figure in the round face (`2,184 部`) → a 12px muted description that
 * ellipsises beside the title and hides below `lg` → then, pushed right, the
 * tool group: the page's own tabs, its controls and its one candy action.
 *
 * Nothing in the title cluster wraps. Below `md` the tool group takes its own
 * full-width line and scrolls sideways (with a fade at the right edge) rather
 * than folding — so a header never grows a tall empty band.
 *
 * `compact` is the denser workbench head (18px title, 24px mark).
 * `headingLevel` keeps the outline honest when a shell already prints an h1.
 */
type PageHeaderProps = Omit<React.ComponentProps<"header">, "title"> & {
  /** The section mark: a lucide icon component, or any node (an emoji, an svg). */
  icon?: React.ComponentType<{ className?: string }> | React.ReactNode
  /** `time` paints the mark blue — for a schedule, a timetable, "now". */
  iconTone?: "mark" | "time"
  title: React.ReactNode
  /** The figure beside the title: `2,184 部`, `12 条`. */
  meta?: React.ReactNode
  description?: React.ReactNode
  /** The page's own tabs, at the left of the tool group. */
  tabs?: React.ReactNode
  /** Search, filters, sort. */
  toolbar?: React.ReactNode
  /** The page's buttons, at the right end. */
  actions?: React.ReactNode
  compact?: boolean
  headingLevel?: "h1" | "h2" | "h3"
}

function PageHeader({
  icon,
  iconTone = "mark",
  title,
  meta,
  description,
  tabs,
  toolbar,
  actions,
  compact = false,
  headingLevel: Heading = "h1",
  className,
  children,
  ...props
}: PageHeaderProps) {
  const hasTools = Boolean(tabs || toolbar || actions)

  return (
    <header
      data-slot="page-header"
      data-compact={compact ? "true" : undefined}
      className={cn("flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2", compact ? "pb-2" : "pb-3", className)}
      {...props}
    >
      <div data-slot="page-header-title" className="group/page-header flex min-w-0 flex-1 items-center gap-3">
        {icon ? <PageHeaderMark icon={icon} tone={iconTone} size={compact ? "sm" : "default"} /> : null}
        <Heading
          className={cn(
            "shrink-0 font-extrabold tracking-[0.02em] whitespace-nowrap text-foreground",
            compact ? "text-[18px] leading-7" : "text-[20px] leading-7"
          )}
        >
          {title}
        </Heading>
        {meta ? <span className="anibt-num shrink-0 text-[12px] whitespace-nowrap text-muted-foreground">{meta}</span> : null}
        {description ? (
          <p className="anibt-ell hidden text-[12px] text-muted-foreground lg:block">{description}</p>
        ) : null}
      </div>

      {hasTools ? (
        <div
          data-slot="page-header-tools"
          className={cn(
            "-my-1 flex w-full min-w-0 items-center gap-2 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            toolbar && "[mask-image:linear-gradient(to_right,black_0%,black_92%,transparent_100%)]",
            "md:ml-auto md:w-auto md:shrink-0 md:overflow-x-visible md:[mask-image:none]"
          )}
        >
          {tabs}
          {toolbar ? <div className="flex shrink-0 items-center gap-2">{toolbar}</div> : null}
          {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
        </div>
      ) : null}

      {children ? <div className="w-full min-w-0">{children}</div> : null}
    </header>
  )
}

/**
 * The section mark on its own: a 28px white sticker (24 in `sm`), tilted, the
 * glyph in pink (or blue with `tone="time"`). It tips the other way when the
 * pointer is on its header. Decorative.
 */
function PageHeaderMark({
  icon,
  tone = "mark",
  size = "default",
  className,
}: {
  icon: React.ComponentType<{ className?: string }> | React.ReactNode
  tone?: "mark" | "time"
  size?: "sm" | "default"
  className?: string
}) {
  const content = isComponent(icon) ? React.createElement(icon, { className: "size-4" }) : icon
  return (
    <span
      data-slot="page-header-mark"
      aria-hidden="true"
      className={cn(
        "anibt-rim flex shrink-0 -rotate-[4deg] items-center justify-center rounded-[6px] bg-card transition-transform duration-[400ms] ease-anibt-spring group-hover/page-header:scale-105 group-hover/page-header:rotate-[4deg] [&_svg]:size-4",
        tone === "time" ? "text-anibt-time" : "text-anibt-mark",
        size === "sm" ? "size-6" : "size-7",
        className
      )}
    >
      {content}
    </span>
  )
}

function isComponent(value: unknown): value is React.ComponentType<{ className?: string }> {
  return (
    typeof value === "function" ||
    (typeof value === "object" && value !== null && "$$typeof" in value && !React.isValidElement(value))
  )
}

export { PageHeader, PageHeaderMark }
export type { PageHeaderProps }
