import { Brand } from "@/components/site/brand"
import { NavLinks } from "@/components/site/nav-links"
import { ThemeSwitch } from "@/components/site/theme-switch"

/**
 * The one top bar: 56px, translucent paper over the dot ground with a
 * stitched bottom edge. Logo + nav on the left, the 白樱 / 夜樱 switch on the
 * right. Below 768 the nav drops to its own scrolling row.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[color-mix(in_srgb,var(--card)_86%,transparent)] backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center gap-6 px-[clamp(16px,3vw,32px)]">
        <Brand />
        <NavLinks className="hidden md:flex" />
        <ThemeSwitch className="ml-auto" />
      </div>
      <div className="mx-auto w-full max-w-[1440px] px-[clamp(16px,3vw,32px)] pb-2 md:hidden">
        <NavLinks className="site-scroll-x -mx-1 px-1 pb-1" />
      </div>
      <div aria-hidden="true" className="anibt-stitch absolute inset-x-0 bottom-0" />
    </header>
  )
}
