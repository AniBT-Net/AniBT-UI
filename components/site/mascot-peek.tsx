import { HeartIcon } from "lucide-react"

import { Sparkle } from "@/components/site/sparkle"
import { cn } from "@/lib/utils"

/**
 * The AniBT mascot peeking over the top edge of a card, as on anibt.net's
 * sign-in note and error sticker. The caller pulls the card up over the lower
 * part of the picture (negative margin here, `relative z-10` on the card).
 * Decorative: `aria-hidden`, no pointer events; reduced motion holds it still.
 *
 * The picture is an AniBT brand asset (not MIT): it ships with the site, never
 * through the registry.
 */
export function MascotPeek({ className, size = 112 }: { className?: string; size?: number }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none relative z-0 w-fit", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, a 14 KB asset */}
      <img
        src="/brand/mascot.webp"
        alt=""
        width={size}
        height={size}
        decoding="async"
        className="animate-anibt-peek object-contain"
        style={{ width: size, height: size }}
      />
      <Sparkle className="top-5 -left-7 size-4" />
      <Sparkle tone="blue" delay="0.8s" className="top-1 -right-6 size-3" />
      <HeartIcon className="absolute top-12 -right-9 size-3 animate-anibt-bob fill-current text-anibt-mark" aria-hidden="true" />
    </div>
  )
}
