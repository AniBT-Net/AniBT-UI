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
// U2: display + blocks
import AccordionCards from "./accordion-cards"
import AccordionDemo from "./accordion-demo"
import AlertDemo from "./alert-demo"
import AlertInline from "./alert-inline"
import AvatarDemo from "./avatar-demo"
import AvatarGroupDemo from "./avatar-group"
import BreadcrumbDemo from "./breadcrumb-demo"
import EmptyDemo from "./empty-demo"
import EmptyWell from "./empty-well"
import EntityAvatarDemo from "./entity-avatar-demo"
import PageHeaderCompact from "./page-header-compact"
import PageHeaderDemo from "./page-header-demo"
import PaginationDemo from "./pagination-demo"
import PaginationParts from "./pagination-parts"
import ProgressDemo from "./progress-demo"
import ProgressLabelDemo from "./progress-label"
import SeparatorDemo from "./separator-demo"
import SkeletonDemo from "./skeleton-demo"
import TableDemo from "./table-demo"
import TableSticky from "./table-sticky"
import TooltipDemo from "./tooltip-demo"
import TooltipSides from "./tooltip-sides"

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
  // U2: display + blocks
  "avatar-demo": AvatarDemo,
  "avatar-group": AvatarGroupDemo,
  "entity-avatar-demo": EntityAvatarDemo,
  "skeleton-demo": SkeletonDemo,
  "progress-demo": ProgressDemo,
  "progress-label": ProgressLabelDemo,
  "pagination-demo": PaginationDemo,
  "pagination-parts": PaginationParts,
  "empty-demo": EmptyDemo,
  "empty-well": EmptyWell,
  "tooltip-demo": TooltipDemo,
  "tooltip-sides": TooltipSides,
  "separator-demo": SeparatorDemo,
  "alert-demo": AlertDemo,
  "alert-inline": AlertInline,
  "accordion-demo": AccordionDemo,
  "accordion-cards": AccordionCards,
  "breadcrumb-demo": BreadcrumbDemo,
  "table-demo": TableDemo,
  "table-sticky": TableSticky,
  "page-header-demo": PageHeaderDemo,
  "page-header-compact": PageHeaderCompact,
} satisfies Record<string, ComponentType>

export type DemoName = keyof typeof demos
