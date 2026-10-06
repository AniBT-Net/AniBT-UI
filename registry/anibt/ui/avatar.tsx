"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Avatar as AvatarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Avatar — an AniBT 「贴纸手账」 die-cut sticker of a face or a logo.
 *
 * Every avatar wears the sticker rim (`anibt-rim`: a 2px white edge and the
 * small sticker shadow) unless `rim={false}`. People are round; groups and
 * organisations are `shape="rounded"` (a 28% corner), which is how A tells
 * the two apart. The fallback is the round face on the pink wash.
 *
 * Sizes: `xs` 20 (inline beside a name), `sm` 24, `default` 32, `lg` 40,
 * `xl` 64 (a profile head). The names `sm` / `default` / `lg` and the
 * exports `AvatarBadge`, `AvatarGroup`, `AvatarGroupCount` are shadcn's, so
 * this file can replace `components/ui/avatar.tsx`.
 *
 * Radix underneath: the image is shown once it has loaded, the fallback
 * until then and whenever it fails.
 */
const avatarVariants = cva(
  "group/avatar relative inline-flex shrink-0 select-none overflow-visible align-middle data-[shape=circle]:rounded-full data-[shape=rounded]:rounded-[28%]",
  {
    variants: {
      size: {
        xs: "size-5",
        sm: "size-6",
        default: "size-8",
        lg: "size-10",
        xl: "size-16",
      },
      rim: {
        true: "anibt-rim",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      rim: true,
    },
  }
)

type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants> & {
    /** `circle` for people, `rounded` for groups and organisations. */
    shape?: "circle" | "rounded"
  }

function Avatar({ className, size, rim, shape = "circle", ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size ?? "default"}
      data-shape={shape}
      className={cn(avatarVariants({ size, rim }), className)}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full rounded-[inherit] object-cover", className)}
      {...props}
    />
  )
}

function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center overflow-hidden rounded-[inherit] bg-accent font-anibt-display text-[13px] leading-none font-semibold text-accent-foreground",
        "group-data-[size=xs]/avatar:text-[12px] group-data-[size=sm]/avatar:text-[12px] group-data-[size=lg]/avatar:text-[15px] group-data-[size=xl]/avatar:text-[22px]",
        className
      )}
      {...props}
    />
  )
}

const avatarBadgeVariants = cva(
  "absolute -right-0.5 -bottom-0.5 z-10 inline-flex size-2.5 items-center justify-center rounded-full shadow-[0_0_0_2px_var(--anibt-sticker-edge)] select-none group-data-[size=lg]/avatar:size-3 group-data-[size=sm]/avatar:size-2 group-data-[size=xl]/avatar:right-0.5 group-data-[size=xl]/avatar:bottom-0.5 group-data-[size=xl]/avatar:size-4 group-data-[size=xs]/avatar:size-2 [&>svg]:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden group-data-[size=xs]/avatar:[&>svg]:hidden",
  {
    variants: {
      tone: {
        mark: "bg-anibt-mark text-white",
        ok: "bg-anibt-ok-fill text-white",
        time: "bg-anibt-time text-white",
        warn: "bg-anibt-warn-fill text-white",
        mute: "bg-muted-foreground text-white",
      },
    },
    defaultVariants: {
      tone: "mark",
    },
  }
)

/** A dot on the corner: online, live, a new item. Say the state in words nearby. */
function AvatarBadge({
  className,
  tone,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof avatarBadgeVariants>) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(avatarBadgeVariants({ tone }), className)}
      {...props}
    />
  )
}

/** Overlapping avatars; each rim keeps its neighbour apart. */
function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn("group/avatar-group flex items-center -space-x-1.5", className)}
      {...props}
    />
  )
}

/** The `+N` at the end of a group, as a quiet count sticker. */
function AvatarGroupCount({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-muted font-anibt-display text-[12px] font-semibold text-muted-foreground shadow-[0_0_0_2px_var(--anibt-sticker-edge),var(--anibt-shadow-sticker)]",
        "group-has-data-[size=xs]/avatar-group:size-5 group-has-data-[size=sm]/avatar-group:size-6 group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=xl]/avatar-group:size-16 [&>svg]:size-4",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
  avatarVariants,
}
export type { AvatarProps }
