import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { HeartIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Empty — the AniBT 「贴纸手账」 empty state.
 *
 * Three frames:
 * - `well` (default): a group inside a panel — the 1px edge, radius 10,
 *   centred copy. The everyday "nothing here yet".
 * - `note`: A's empty state — a paper note tilted −1°, on the pop shadow, with
 *   a picture peeking over its top edge (`EmptyMedia variant="peek"`) between
 *   two twinkling ✦. For the one big empty on a page.
 * - `plain`: no frame, for a place that already has one.
 *
 * The media slot takes an icon (`variant="icon"`: a small white sticker,
 * tilted, the glyph in pink), a picture (`variant="image"`), or the peeking
 * picture of a note (`variant="peek"`). Bring your own picture — a mascot, an
 * illustration; the component draws the frame, never the art.
 *
 * The parts are shadcn's (`Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`,
 * `EmptyDescription`, `EmptyContent`).
 */
const emptyVariants = cva("flex min-w-0 flex-col items-center text-center text-balance", {
  variants: {
    variant: {
      well: "anibt-well w-full flex-1 justify-center gap-4 px-6",
      note: "w-full flex-1 justify-center px-4",
      plain: "w-full flex-1 justify-center gap-4 px-6",
    },
    size: {
      default: "",
      sm: "",
    },
  },
  compoundVariants: [
    { variant: "well", size: "default", class: "py-10" },
    { variant: "well", size: "sm", class: "py-6" },
    { variant: "plain", size: "default", class: "py-10" },
    { variant: "plain", size: "sm", class: "py-6" },
    { variant: "note", size: "default", class: "pt-28 pb-10" },
    { variant: "note", size: "sm", class: "pt-24 pb-6" },
  ],
  defaultVariants: {
    variant: "well",
    size: "default",
  },
})

function Empty({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyVariants>) {
  const frame = variant ?? "well"
  return (
    <div
      data-slot="empty"
      data-variant={frame}
      data-size={size ?? "default"}
      className={cn(emptyVariants({ variant, size }), className)}
      {...props}
    >
      {frame === "note" ? (
        <div
          data-slot="empty-note"
          className="anibt-pop relative flex w-full max-w-[340px] -rotate-1 flex-col items-center gap-3 px-4 pt-5 pb-4 transition-transform duration-500 ease-anibt-spring motion-safe:hover:rotate-0"
        >
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex max-w-sm flex-col items-center gap-1.5 text-center", className)}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  "relative flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "mb-1 bg-transparent text-muted-foreground",
        // A's section mark: a small white sticker, tilted, the glyph in pink.
        icon: "anibt-rim mb-2 size-10 -rotate-3 rounded-[10px] bg-card text-anibt-mark [&_svg:not([class*='size-'])]:size-5",
        image: "mb-2 [&_img]:h-auto [&_img]:max-w-full",
        // Peeks over the top edge of an `Empty variant="note"`: the picture
        // stands on the note's edge and its lower 28px are hidden behind it.
        peek: "pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 translate-y-7 [clip-path:inset(-64px_-64px_28px_-64px)] [&_img]:block [&_img]:max-w-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function EmptyMedia({
  className,
  variant = "default",
  sparkles,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof emptyMediaVariants> & {
    /** The ✦ ✦ ♥ around a peeking picture. Default on for `peek`, off otherwise. */
    sparkles?: boolean
  }) {
  const decorate = sparkles ?? variant === "peek"
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      aria-hidden={variant === "peek" ? true : undefined}
      className={cn(emptyMediaVariants({ variant }), className)}
      {...props}
    >
      {variant === "peek" ? <div className="animate-anibt-peek">{children}</div> : children}
      {decorate ? <EmptySparkles /> : null}
    </div>
  )
}

/** Two ✦ and a small heart round the media. Decorative. */
function EmptySparkles() {
  const sparkle =
    "pointer-events-none absolute inline-block animate-anibt-twinkle [-webkit-mask:var(--anibt-sparkle)_center/contain_no-repeat] [mask:var(--anibt-sparkle)_center/contain_no-repeat]"
  return (
    <>
      <span aria-hidden="true" className={cn(sparkle, "top-5 -left-7 size-4 bg-anibt-mark")} />
      <span
        aria-hidden="true"
        className={cn(sparkle, "top-1 -right-6 size-3 bg-anibt-time [animation-delay:0.8s]")}
      />
      <HeartIcon
        aria-hidden="true"
        className="pointer-events-none absolute top-12 -right-9 size-3 animate-anibt-bob fill-current text-anibt-mark"
      />
    </>
  )
}

/** 15/700 ink. */
function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn("text-[15px] leading-[1.45] font-bold text-foreground", className)}
      {...props}
    />
  )
}

/** 13, muted; links underline and turn pink. */
function EmptyDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-[13px] leading-relaxed text-muted-foreground [&>a]:text-accent-foreground [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

/** The actions: one candy button at most, a quiet one beside it. */
function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-wrap items-center justify-center gap-2 text-[13px] text-balance",
        className
      )}
      {...props}
    />
  )
}

export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia, emptyVariants }
