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
// U1: inputs and forms.
import CheckboxDemo from "./checkbox-demo"
import CheckboxSelectAll from "./checkbox-select-all"
import CheckboxStates from "./checkbox-states"
import FieldChoices from "./field-choices"
import FieldCompose from "./field-compose"
import FieldDemo from "./field-demo"
import InputDemo from "./input-demo"
import InputStates from "./input-states"
import KbdDemo from "./kbd-demo"
import KbdLegend from "./kbd-legend"
import LabelDemo from "./label-demo"
import PasswordInputDemo from "./password-input-demo"
import RadioGroupCards from "./radio-group-cards"
import RadioGroupDemo from "./radio-group-demo"
import SearchInputDemo from "./search-input-demo"
import SearchInputStates from "./search-input-states"
import SegmentedControlDemo from "./segmented-control-demo"
import SegmentedControlVariants from "./segmented-control-variants"
import SelectDemo from "./select-demo"
import SelectGroups from "./select-groups"
import SelectStates from "./select-states"
import SwitchDemo from "./switch-demo"
import SwitchSettings from "./switch-settings"
import SwitchStates from "./switch-states"
import TabsDemo from "./tabs-demo"
import TabsIcons from "./tabs-icons"
import TabsOverflow from "./tabs-overflow"
import TextareaDemo from "./textarea-demo"
import TextareaStates from "./textarea-states"
import ToggleGroupDemo from "./toggle-group-demo"
import ToggleGroupSizes from "./toggle-group-sizes"
import ToggleGroupTrack from "./toggle-group-track"
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
import PosterCardDemo from "./poster-card-demo"
import PosterCardSrcSet from "./poster-card-srcset"
import PosterCardStates from "./poster-card-states"
import ProgressDemo from "./progress-demo"
import ProgressLabelDemo from "./progress-label"
import ReleaseRowDemo from "./release-row-demo"
import ReleaseRowForms from "./release-row-forms"
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
  // U1: inputs and forms.
  "input-demo": InputDemo,
  "input-states": InputStates,
  "textarea-demo": TextareaDemo,
  "textarea-states": TextareaStates,
  "label-demo": LabelDemo,
  "field-demo": FieldDemo,
  "field-choices": FieldChoices,
  "field-compose": FieldCompose,
  "select-demo": SelectDemo,
  "select-groups": SelectGroups,
  "select-states": SelectStates,
  "checkbox-demo": CheckboxDemo,
  "checkbox-select-all": CheckboxSelectAll,
  "checkbox-states": CheckboxStates,
  "switch-demo": SwitchDemo,
  "switch-settings": SwitchSettings,
  "switch-states": SwitchStates,
  "radio-group-demo": RadioGroupDemo,
  "radio-group-cards": RadioGroupCards,
  "segmented-control-demo": SegmentedControlDemo,
  "segmented-control-variants": SegmentedControlVariants,
  "toggle-group-demo": ToggleGroupDemo,
  "toggle-group-sizes": ToggleGroupSizes,
  "toggle-group-track": ToggleGroupTrack,
  "tabs-demo": TabsDemo,
  "tabs-icons": TabsIcons,
  "tabs-overflow": TabsOverflow,
  "search-input-demo": SearchInputDemo,
  "search-input-states": SearchInputStates,
  "password-input-demo": PasswordInputDemo,
  "kbd-demo": KbdDemo,
  "kbd-legend": KbdLegend,
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
  "poster-card-demo": PosterCardDemo,
  "poster-card-states": PosterCardStates,
  "poster-card-srcset": PosterCardSrcSet,
  "release-row-demo": ReleaseRowDemo,
  "release-row-forms": ReleaseRowForms,
} satisfies Record<string, ComponentType>

export type DemoName = keyof typeof demos
