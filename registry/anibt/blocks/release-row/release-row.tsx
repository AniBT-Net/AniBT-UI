"use client"

import * as React from "react"
import { ArrowDownIcon, ArrowUpIcon, CheckIcon, DownloadIcon, MagnetIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/registry/anibt/ui/badge"
import { Button } from "@/registry/anibt/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/anibt/ui/tooltip"

/**
 * ReleaseRow — one release as one row (AniBT 「贴纸手账」, after anibt.net's
 * 最新资源 list).
 *
 * **Wide form** — when its `ReleaseRowList` is at least 760px wide (a
 * container query, so a row in a narrow column keeps the phone form): a 40×56
 * cover with the die-cut rim that tips under the pointer, the title over the
 * facts, then size, swarm and age as three columns a reader scans down, then
 * the 32px icon squares. The title wraps in full and is never cut — the
 * release name is what a reader picks a version by.
 *
 * **The facts line** opens with the publisher in pink, then 第 N 集 and at most
 * three coloured tags — resolution (blue), the languages folded into one pink
 * tag, the subtitle type (neutral) — then the remaining specs as plain muted
 * text from 768px up.
 *
 * **Phone form** (narrower lists, and `form="stacked"` at every width): the
 * cover beside the title and facts, then one line of figures with 40px squares
 * (44px targets) at its end. **Compact** (`form="compact"`): no cover, no
 * publisher, the title on one line from 1024, size over age in a 92px column.
 *
 * The title link (`href`, or `link={<Link href="…" />}`) is stretched over the
 * row, so the whole row opens the release; the publisher link and the action
 * squares sit above it. Everything is a prop — the row fetches and formats
 * nothing: pass `fileSize="1.21 GB"`, `time="今天 18:08"` with its ISO
 * `dateTime`, and the swarm figures (`null` is "not measured" and prints a
 * dash, never a zero).
 */

type ReleaseRowLinkElement = React.ReactElement<{ className?: string; children?: React.ReactNode }>

type ReleaseRowPublisher = {
  name: string
  href?: string
  link?: ReleaseRowLinkElement
}

type ReleaseRowCover = {
  src: string
  srcSet?: string
  alt?: string
}

type ReleaseRowProps = Omit<React.ComponentProps<"div">, "title"> & {
  title: React.ReactNode
  /** The full title for the browser tooltip; defaults to `title` when it is a string. */
  titleTooltip?: string
  /** `lang` of the title (`ja` for a Japanese release name). */
  titleLang?: string
  /** Opens the release; stretched over the whole row. */
  href?: string
  /** A router link element instead of `href`. */
  link?: ReleaseRowLinkElement
  /** The anime's cover (shown at 40×56; give a ≥120w source for 3× screens). */
  cover?: string | ReleaseRowCover | null
  /** Above the fold: load the cover eagerly. */
  priority?: boolean
  publisher?: string | ReleaseRowPublisher | null
  /** A category tag in front of the episode (合集, 剧场版…). */
  category?: React.ReactNode
  /** 第 12 集, in the round face. */
  episode?: React.ReactNode
  /** The blue tag: 1080p, 2160p. */
  resolution?: string
  /** Folded into one pink tag: 简中·繁中. */
  languages?: string[]
  /** The neutral tag: 内封字幕, 内嵌字幕. */
  subtitleType?: string
  /** Everything else, printed as plain muted text from 768px: AVC · WEB-DL · AAC · MKV. */
  specs?: string[]
  /** Pre-formatted size: 1.21 GB. */
  fileSize?: string
  /** Seeders; `null` / leaving it out prints a dash. */
  seeders?: number | null
  leechers?: number | null
  /** Pre-formatted age: 今天 18:08, 3 小时前. */
  time?: React.ReactNode
  /** ISO date of `time`, for `<time dateTime>`. */
  dateTime?: string
  /** The magnet address: draws the copy square. `null` keeps a disabled square (the slot exists, this release has none). */
  magnet?: string | null
  /** The .torrent URL: draws the download square. `null` keeps a disabled square. */
  torrentHref?: string | null
  /** Called after the magnet is copied (show a toast here). */
  onMagnetCopied?: () => void
  /** Your own squares (`ReleaseRowAction`s); replaces the magnet / torrent pair. */
  actions?: React.ReactNode
  /** `wide` follows the list's width; `stacked` holds the phone form; `compact` is the dense panel row. */
  form?: "wide" | "stacked" | "compact"
}

/** The list: a panel with the rows stitched together. `plain` drops the panel. */
function ReleaseRowList({
  className,
  plain = false,
  children,
  ...props
}: React.ComponentProps<"div"> & { plain?: boolean }) {
  return (
    <TooltipProvider>
      <div
        data-slot="release-row-list"
        className={cn("@container/rr-list w-full min-w-0", plain ? null : "anibt-sheet px-1", className)}
        {...props}
      >
        {children}
      </div>
    </TooltipProvider>
  )
}

/** A date inside a list: a small blue date sticker on a stitched rule, with an optional sticker at the end. */
function ReleaseRowDateRule({
  label,
  trailing,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & { label: React.ReactNode; trailing?: React.ReactNode }) {
  return (
    <div
      data-slot="release-row-date"
      className={cn("flex items-center gap-3 px-3.5 pt-4 pb-1 md:px-3", className)}
      {...props}
    >
      <Badge variant="sticker" className="shrink-0 text-anibt-time-ink" tilt={-2}>
        {label}
      </Badge>
      <span aria-hidden="true" className="anibt-stitch min-w-0 flex-1" />
      {trailing}
    </div>
  )
}

const STRETCHED =
  "outline-hidden after:absolute after:inset-0 after:content-[''] focus-visible:after:rounded-[10px] focus-visible:after:outline-2 focus-visible:after:outline-ring focus-visible:after:outline-solid"

function ReleaseRow({
  title,
  titleTooltip,
  titleLang,
  href,
  link,
  cover,
  priority = false,
  publisher,
  category,
  episode,
  resolution,
  languages,
  subtitleType,
  specs,
  fileSize,
  seeders,
  leechers,
  time,
  dateTime,
  magnet,
  torrentHref,
  onMagnetCopied,
  actions,
  form = "wide",
  className,
  ...props
}: ReleaseRowProps) {
  const coverInfo = typeof cover === "string" ? { src: cover } : cover
  const showCover = Boolean(coverInfo) && form !== "compact"
  const pub = typeof publisher === "string" ? { name: publisher } : publisher
  const tooltip = titleTooltip ?? (typeof title === "string" ? title : undefined)

  const titleNode = link
    ? React.cloneElement(link, { className: cn(STRETCHED, link.props.className), children: title })
    : href
      ? (
          <a href={href} className={STRETCHED}>
            {title}
          </a>
        )
      : title

  const squares =
    actions ??
    (magnet !== undefined || torrentHref !== undefined ? (
      <>
        {magnet !== undefined ? <ReleaseRowCopyAction value={magnet} onCopied={onMagnetCopied} /> : null}
        {torrentHref !== undefined ? (
          <ReleaseRowAction label="下载种子" href={torrentHref ?? undefined} disabled={torrentHref === null} download>
            <DownloadIcon />
          </ReleaseRowAction>
        ) : null}
      </>
    ) : null)

  return (
    <div
      data-slot="release-row"
      data-form={form}
      data-cover={showCover ? "" : undefined}
      className={cn(
        "group/rr relative grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 px-3.5 py-3 [grid-template-areas:'m_m'_'s_a'] md:px-3",
        "data-[cover]:grid-cols-[40px_minmax(0,1fr)_auto] data-[cover]:[grid-template-areas:'t_m_m'_'s_s_a']",
        // Rows of one list are stitched together, inset by the row's padding.
        "[[data-slot=release-row]+&]:before:pointer-events-none [[data-slot=release-row]+&]:before:absolute [[data-slot=release-row]+&]:before:inset-x-3.5 [[data-slot=release-row]+&]:before:top-0 [[data-slot=release-row]+&]:before:h-px [[data-slot=release-row]+&]:before:bg-(image:--anibt-stitch) [[data-slot=release-row]+&]:before:bg-size-[8px_1px] [[data-slot=release-row]+&]:before:bg-repeat-x [[data-slot=release-row]+&]:before:content-[''] md:[[data-slot=release-row]+&]:before:inset-x-3",
        // Wide: six tracks once the list is 760px wide.
        "@min-[760px]/rr-list:data-[form=wide]:grid-cols-[minmax(0,1fr)_80px_96px_76px_auto] @min-[760px]/rr-list:data-[form=wide]:gap-x-4 @min-[760px]/rr-list:data-[form=wide]:[grid-template-areas:none] @min-[760px]/rr-list:data-[form=wide]:data-[cover]:grid-cols-[40px_minmax(0,1fr)_80px_96px_76px_auto]",
        // Compact: one flex line.
        "data-[form=compact]:flex data-[form=compact]:min-h-[50px] data-[form=compact]:gap-3 data-[form=compact]:py-1.5 lg:data-[form=compact]:h-[50px]",
        className
      )}
      {...props}
    >
      {showCover && coverInfo ? (
        <div
          data-slot="release-row-thumb"
          className="anibt-rim relative h-14 w-10 self-start overflow-hidden rounded-[6px] bg-muted transition-transform duration-300 ease-anibt-spring [grid-area:t] motion-safe:group-hover/rr:scale-[1.04] motion-safe:group-hover/rr:-rotate-[4deg] @min-[760px]/rr-list:group-data-[form=wide]/rr:self-center @min-[760px]/rr-list:group-data-[form=wide]/rr:[grid-area:auto]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- a registry component: no framework image */}
          <img
            src={coverInfo.src}
            srcSet={coverInfo.srcSet}
            sizes={coverInfo.srcSet ? "40px" : undefined}
            alt={coverInfo.alt ?? ""}
            width={40}
            height={56}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      ) : null}

      <div
        data-slot="release-row-main"
        className="grid min-w-0 gap-1.5 self-start [grid-area:m] group-data-[form=compact]/rr:flex-1 group-data-[form=compact]/rr:gap-0.5 group-data-[form=compact]/rr:self-center @min-[760px]/rr-list:group-data-[form=wide]/rr:self-center @min-[760px]/rr-list:group-data-[form=wide]/rr:[grid-area:auto]"
      >
        <h3
          data-slot="release-row-title"
          title={tooltip}
          lang={titleLang}
          className="m-0 min-w-0 text-[14px] leading-5 font-semibold [overflow-wrap:anywhere] text-foreground transition-colors duration-150 group-hover/rr:text-accent-foreground group-data-[form=compact]/rr:text-[13px] group-data-[form=compact]/rr:leading-[18px] lg:group-data-[form=compact]/rr:anibt-ell"
        >
          {titleNode}
        </h3>
        <ReleaseRowFacts
          publisher={form === "compact" ? null : pub}
          category={category}
          episode={episode}
          resolution={resolution}
          languages={languages}
          subtitleType={subtitleType}
          specs={specs}
        />
      </div>

      <div
        data-slot="release-row-stats"
        className="flex min-w-0 items-center gap-3 whitespace-nowrap [grid-area:s] [&>:empty]:hidden group-data-[form=compact]/rr:w-[92px] group-data-[form=compact]/rr:flex-none group-data-[form=compact]/rr:flex-col group-data-[form=compact]/rr:items-end group-data-[form=compact]/rr:gap-0.5 @min-[760px]/rr-list:group-data-[form=wide]/rr:contents @min-[760px]/rr-list:group-data-[form=wide]/rr:[&>:empty]:block"
      >
        <span className="anibt-num text-[13px] text-foreground">{fileSize ?? ""}</span>
        {form === "compact" ? (
          <span />
        ) : (
          <span>{seeders !== undefined || leechers !== undefined ? <ReleaseRowPeers seeders={seeders} leechers={leechers} /> : null}</span>
        )}
        {time ? (
          <time dateTime={dateTime} suppressHydrationWarning className="text-[12px] text-muted-foreground">
            {time}
          </time>
        ) : (
          <span />
        )}
      </div>

      <div
        data-slot="release-row-actions"
        className="relative z-10 flex shrink-0 items-center justify-end gap-2 justify-self-end [grid-area:a] @min-[760px]/rr-list:group-data-[form=wide]/rr:[grid-area:auto]"
      >
        {squares}
      </div>
    </div>
  )
}

function ReleaseRowFacts({
  publisher,
  category,
  episode,
  resolution,
  languages,
  subtitleType,
  specs,
}: {
  publisher: ReleaseRowPublisher | null | undefined
  category?: React.ReactNode
  episode?: React.ReactNode
  resolution?: string
  languages?: string[]
  subtitleType?: string
  specs?: string[]
}) {
  const langs = (languages ?? []).filter((value) => value.trim())
  const rest = (specs ?? []).filter((value) => value.trim())
  const hasFacts = Boolean(category || episode || resolution || langs.length || subtitleType || rest.length)
  if (!publisher && !hasFacts) return null

  const publisherClass =
    "anibt-ell max-w-64 font-semibold text-accent-foreground group-data-[form=compact]/rr:hidden"
  const publisherNode = publisher ? (
    publisher.link ? (
      React.cloneElement(publisher.link, {
        className: cn(publisherClass, "relative z-10 hover:underline hover:underline-offset-2", publisher.link.props.className),
        children: publisher.name,
      })
    ) : publisher.href ? (
      <a href={publisher.href} title={publisher.name} className={cn(publisherClass, "relative z-10 hover:underline hover:underline-offset-2")}>
        {publisher.name}
      </a>
    ) : (
      <span title={publisher.name} className={publisherClass}>
        {publisher.name}
      </span>
    )
  ) : null

  return (
    <div
      data-slot="release-row-facts"
      className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[12px] leading-5 text-anibt-ink2 lg:group-data-[form=compact]/rr:flex-nowrap lg:group-data-[form=compact]/rr:overflow-hidden"
    >
      {publisherNode}
      {publisher && hasFacts ? <i aria-hidden="true" className="size-[3px] flex-none rounded-full bg-muted-foreground" /> : null}
      {category ? <Badge face="text">{category}</Badge> : null}
      {episode ? <span className="anibt-num whitespace-nowrap">{episode}</span> : null}
      {resolution ? <Badge variant="res">{resolution}</Badge> : null}
      {langs.length ? (
        <Badge variant="lang" face="text" title={langs.join(" / ")}>
          {langs.join("·")}
        </Badge>
      ) : null}
      {subtitleType ? <Badge face="text">{subtitleType}</Badge> : null}
      {rest.length ? (
        <span data-slot="release-row-specs" className="hidden min-w-0 text-muted-foreground md:inline">
          {rest.map((value, index) => (
            <React.Fragment key={`${value}-${index}`}>
              {index > 0 ? <span aria-hidden="true"> · </span> : null}
              <span className="anibt-num">{value}</span>
            </React.Fragment>
          ))}
        </span>
      ) : null}
    </div>
  )
}

/**
 * The swarm: ↑ seeders (mint once a live swarm is measured), ↓ leechers. An
 * unmeasured figure is a dash, never a zero the page has not read. Each figure
 * carries its word as its accessible name.
 */
function ReleaseRowPeers({
  seeders,
  leechers,
  seedersLabel = "做种",
  leechersLabel = "下载中",
  className,
}: {
  seeders?: number | null
  leechers?: number | null
  seedersLabel?: string
  leechersLabel?: string
  className?: string
}) {
  const show = (value: number | null | undefined) =>
    value === null || value === undefined || !Number.isFinite(value) ? "–" : String(Math.max(0, Math.trunc(value)))
  const live = typeof seeders === "number" && seeders > 0
  return (
    <span
      data-slot="release-row-peers"
      className={cn("inline-flex items-center gap-2 font-anibt-display text-[13px] font-medium text-muted-foreground", className)}
    >
      <span
        title={`${seedersLabel} ${show(seeders)}`}
        aria-label={`${seedersLabel} ${show(seeders)}`}
        className={cn("inline-flex items-center gap-0.5 tabular-nums", live && "text-anibt-ok")}
      >
        <ArrowUpIcon className="size-3.5" aria-hidden="true" />
        {show(seeders)}
      </span>
      <span
        title={`${leechersLabel} ${show(leechers)}`}
        aria-label={`${leechersLabel} ${show(leechers)}`}
        className="inline-flex items-center gap-0.5 tabular-nums"
      >
        <ArrowDownIcon className="size-3.5" aria-hidden="true" />
        {show(leechers)}
      </span>
    </span>
  )
}

const SQUARE =
  "size-10 rounded-[12px] md:size-8 md:rounded-[10px] group-data-[form=stacked]/rr:md:size-10 group-data-[form=stacked]/rr:md:rounded-[12px] group-data-[form=compact]/rr:size-8 group-data-[form=compact]/rr:rounded-[10px]"

/**
 * One icon square on a row, with its name as a tooltip and as its accessible
 * name. `href` makes it a link (`download` for a file); otherwise a button.
 * Always visible — a row never hides its actions until hover.
 */
function ReleaseRowAction({
  label,
  href,
  download,
  disabled = false,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"button">, "children"> & {
  label: string
  href?: string
  download?: boolean | string
  children: React.ReactNode
}) {
  const square = cn(SQUARE, className)
  const control =
    href && !disabled ? (
      <Button variant="secondary" size="icon" className={square} asChild>
        <a href={href} download={download === true ? "" : download || undefined} aria-label={label}>
          {children}
        </a>
      </Button>
    ) : (
      <Button variant="secondary" size="icon" className={square} aria-label={label} disabled={disabled} {...props}>
        {children}
      </Button>
    )

  if (disabled) return control
  return (
    <Tooltip>
      <TooltipTrigger asChild>{control}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

/**
 * The magnet square: copies the address and answers with a mint tick and
 * 「已复制」 for a moment. `value={null}` is the disabled square of a release
 * without a magnet.
 */
function ReleaseRowCopyAction({
  value,
  label = "复制磁力链接",
  copiedLabel = "已复制",
  onCopied,
  className,
}: {
  value: string | null
  label?: string
  copiedLabel?: string
  onCopied?: () => void
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  React.useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    if (!value) return
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      return
    }
    setCopied(true)
    onCopied?.()
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1600)
  }

  if (value === null) {
    return (
      <ReleaseRowAction label={label} disabled className={className}>
        <MagnetIcon />
      </ReleaseRowAction>
    )
  }

  return (
    // While 「已复制」 shows, the tip stays open even though the press closed it.
    <Tooltip open={open || copied} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          aria-label={label}
          onClick={copy}
          className={cn(SQUARE, copied && "text-anibt-ok", className)}
        >
          {copied ? <CheckIcon /> : <MagnetIcon />}
          <span role="status" className="sr-only">
            {copied ? copiedLabel : ""}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{copied ? copiedLabel : label}</TooltipContent>
    </Tooltip>
  )
}

/** A row-shaped placeholder for a loading list. */
function ReleaseRowSkeleton({ cover = true, className }: { cover?: boolean; className?: string }) {
  const block = "animate-pulse rounded-[6px] bg-anibt-deep2 motion-reduce:animate-none"
  return (
    <div
      data-slot="release-row"
      data-form="wide"
      aria-hidden="true"
      className={cn(
        "relative grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 px-3.5 py-3 md:px-3",
        cover && "grid-cols-[40px_minmax(0,1fr)_auto]",
        "[[data-slot=release-row]+&]:before:pointer-events-none [[data-slot=release-row]+&]:before:absolute [[data-slot=release-row]+&]:before:inset-x-3.5 [[data-slot=release-row]+&]:before:top-0 [[data-slot=release-row]+&]:before:h-px [[data-slot=release-row]+&]:before:bg-(image:--anibt-stitch) [[data-slot=release-row]+&]:before:bg-size-[8px_1px] [[data-slot=release-row]+&]:before:bg-repeat-x [[data-slot=release-row]+&]:before:content-[''] md:[[data-slot=release-row]+&]:before:inset-x-3",
        className
      )}
    >
      {cover ? <div className={cn(block, "h-14 w-10")} /> : null}
      <div className="grid gap-2">
        <div className={cn(block, "h-3.5 w-11/12")} />
        <div className={cn(block, "h-3 w-1/2")} />
      </div>
      <div className="flex gap-2">
        <div className={cn(block, "size-8 rounded-[10px]")} />
        <div className={cn(block, "size-8 rounded-[10px]")} />
      </div>
    </div>
  )
}

export {
  ReleaseRow,
  ReleaseRowAction,
  ReleaseRowCopyAction,
  ReleaseRowDateRule,
  ReleaseRowList,
  ReleaseRowPeers,
  ReleaseRowSkeleton,
}
export type { ReleaseRowProps, ReleaseRowPublisher, ReleaseRowCover }
