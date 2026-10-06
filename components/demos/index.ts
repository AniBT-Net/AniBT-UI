import type { ComponentType } from "react"

import BadgeCounts from "./badge-counts"
import BadgeDemo from "./badge-demo"
import BadgeStatus from "./badge-status"
import BadgeStickers from "./badge-stickers"
import BadgeTags from "./badge-tags"
import ButtonAsChild from "./button-as-child"
import ButtonDemo from "./button-demo"
import ButtonLoading from "./button-loading"
import ButtonSizes from "./button-sizes"
import ButtonVariants from "./button-variants"
import CardDemo from "./card-demo"
import CardDensity from "./card-density"
import CardWell from "./card-well"

/**
 * Every live example the docs can show. The key is the file name in this
 * folder: `<ComponentPreview name="button-demo" />` renders the component and
 * shows `components/demos/button-demo.tsx` as its code.
 */
export const demos = {
  "button-demo": ButtonDemo,
  "button-variants": ButtonVariants,
  "button-sizes": ButtonSizes,
  "button-loading": ButtonLoading,
  "button-as-child": ButtonAsChild,
  "badge-demo": BadgeDemo,
  "badge-tags": BadgeTags,
  "badge-stickers": BadgeStickers,
  "badge-counts": BadgeCounts,
  "badge-status": BadgeStatus,
  "card-demo": CardDemo,
  "card-well": CardWell,
  "card-density": CardDensity,
} satisfies Record<string, ComponentType>

export type DemoName = keyof typeof demos
