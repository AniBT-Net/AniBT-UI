"use client"

import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage, type AvatarProps } from "@/registry/anibt/ui/avatar"

/**
 * EntityAvatar — the one picture of a thing (a subtitle group's logo, a
 * user's portrait) with the one fallback rule.
 *
 * Show the real image when there is one; otherwise the initials, in the round
 * face on the pink wash, inside the same die-cut sticker. Never a hashed
 * gradient, never initials painted over a logo that exists.
 *
 * Initials follow the script: two Latin letters fit any size, but a Han, kana
 * or hangul glyph is as wide as it is tall, so the small sizes (`xs`, `sm`,
 * `default`) take one and the large ones take two —「喵萌」reads better than
 * 「喵」on a profile head, and「喵萌」clipped on both sides in a 24px circle
 * reads as nothing.
 */
type EntityAvatarSize = NonNullable<AvatarProps["size"]>

type EntityAvatarProps = Omit<AvatarProps, "children"> & {
  /** Display name: the alt text and the source of the initials. */
  name: string
  /** Image URL. Empty means "no image" and the initials take over. */
  src?: string | null
  /** `srcSet` for the image; give a 3× source for sharp edges on phones. */
  srcSet?: string
  /** Overrides the derived initials (a single letter, an emoji). */
  initials?: string
  /** Loads the image eagerly: a header above the fold. */
  priority?: boolean
  fallbackClassName?: string
}

const SIZE_PX: Record<EntityAvatarSize, number> = { xs: 20, sm: 24, default: 32, lg: 40, xl: 64 }

/** How many wide (CJK) glyphs each size has room for. */
const WIDE_GLYPHS: Record<EntityAvatarSize, number> = { xs: 1, sm: 1, default: 1, lg: 2, xl: 2 }

const WIDE_SCRIPT = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u

/** Initials for a name, by the rule above. `?` for an empty name. */
function getEntityInitials(name: string, wideGlyphs = 1): string {
  const glyphs = [...name.trim()]
  if (glyphs.length === 0) return "?"
  const limit = WIDE_SCRIPT.test(glyphs[0] ?? "") ? wideGlyphs : 2
  return glyphs.slice(0, limit).join("").toUpperCase()
}

function EntityAvatar({
  name,
  src,
  srcSet,
  initials,
  priority = false,
  size,
  shape = "circle",
  className,
  fallbackClassName,
  ...props
}: EntityAvatarProps) {
  const resolved = size ?? "default"
  const text = initials ?? getEntityInitials(name, WIDE_GLYPHS[resolved])

  return (
    <Avatar
      data-entity="true"
      size={resolved}
      shape={shape}
      title={name}
      className={className}
      {...props}
    >
      {src ? (
        <AvatarImage
          src={src}
          srcSet={srcSet}
          // Width descriptors need the rendered width, or the browser assumes
          // 100vw and fetches the largest file for a 32px circle.
          sizes={srcSet ? `${SIZE_PX[resolved]}px` : undefined}
          alt={name}
          width={SIZE_PX[resolved]}
          height={SIZE_PX[resolved]}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
        />
      ) : null}
      {/* Shown with no image, before it loads and when it fails: the name
          goes to assistive technology, the letters only to the eye. */}
      <AvatarFallback role="img" aria-label={name} className={fallbackClassName}>
        <span aria-hidden="true">{text}</span>
      </AvatarFallback>
    </Avatar>
  )
}

export { EntityAvatar, getEntityInitials }
export type { EntityAvatarProps }
