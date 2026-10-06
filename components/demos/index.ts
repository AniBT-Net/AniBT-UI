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
// U3 overlays
import AlertDialogDemo from "./alert-dialog-demo"
import AlertDialogSmall from "./alert-dialog-small"
import ConfirmDialogDemo from "./confirm-dialog-demo"
import ConfirmDialogPlain from "./confirm-dialog-plain"
import DialogDemo from "./dialog-demo"
import DialogScroll from "./dialog-scroll"

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
  // U3 overlays
  "dialog-demo": DialogDemo,
  "dialog-scroll": DialogScroll,
  "alert-dialog-demo": AlertDialogDemo,
  "alert-dialog-small": AlertDialogSmall,
  "confirm-dialog-demo": ConfirmDialogDemo,
  "confirm-dialog-plain": ConfirmDialogPlain,
} satisfies Record<string, ComponentType>

export type DemoName = keyof typeof demos
