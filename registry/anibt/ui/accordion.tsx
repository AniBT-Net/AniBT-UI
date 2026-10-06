"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Accordion — AniBT 「贴纸手账」 folding sections.
 *
 * `variant="default"`: rows parted by the dashed stitch, straight on the
 * surface they sit on. `variant="cards"`: every section is its own well
 * (1px edge, radius 10) with 8px between them; the open one takes the pink
 * edge. Triggers are 14/700 and turn pink under the pointer; the chevron
 * turns pink and flips when its section is open.
 *
 * Radix underneath (keyboard, `aria-expanded`, the height animation from
 * `tw-animate-css`). It is one section at a time and collapsible unless you
 * say otherwise: `type="multiple"` (or Base UI's `multiple`) keeps several
 * open, `collapsible={false}` keeps one always open.
 */
type AccordionVariant = "default" | "cards"

type AccordionProps = (
  | Omit<AccordionPrimitive.AccordionSingleProps, "type">
  | Omit<AccordionPrimitive.AccordionMultipleProps, "type">
) & {
  type?: "single" | "multiple"
  /** Base UI's spelling of `type="multiple"`. */
  multiple?: boolean
  variant?: AccordionVariant
}

function Accordion({ className, type, multiple, variant = "default", ...props }: AccordionProps) {
  const shared = {
    "data-slot": "accordion",
    "data-variant": variant,
    className: cn("group/accordion flex w-full flex-col", variant === "cards" && "gap-2", className),
  }
  if (type === "multiple" || multiple) {
    return <AccordionPrimitive.Root type="multiple" {...shared} {...(props as Omit<AccordionPrimitive.AccordionMultipleProps, "type">)} />
  }
  const single = props as Omit<AccordionPrimitive.AccordionSingleProps, "type">
  return <AccordionPrimitive.Root type="single" {...shared} {...single} collapsible={single.collapsible ?? true} />
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "group-data-[variant=default]/accordion:anibt-stitch-under group-data-[variant=default]/accordion:last:bg-none",
        "group-data-[variant=cards]/accordion:anibt-well group-data-[variant=cards]/accordion:px-4 group-data-[variant=cards]/accordion:transition-shadow group-data-[variant=cards]/accordion:data-[state=open]:shadow-[0_0_0_1px_var(--anibt-wash-line)]",
        className
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex min-h-11 flex-1 items-center gap-2.5 rounded-[10px] py-2.5 text-left text-[14px] leading-[1.45] font-bold text-foreground outline-hidden transition-colors duration-150 hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid disabled:pointer-events-none disabled:text-muted-foreground [&>svg:not([data-slot=accordion-chevron])]:size-4 [&>svg:not([data-slot=accordion-chevron])]:shrink-0 [&>svg:not([data-slot=accordion-chevron])]:text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-chevron"
          aria-hidden="true"
          className="pointer-events-none ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-anibt-spring group-hover/accordion-trigger:text-accent-foreground group-data-[state=open]/accordion-trigger:rotate-180 group-data-[state=open]/accordion-trigger:text-anibt-mark"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-[13px] text-anibt-ink2 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:animate-none"
      {...props}
    >
      <div
        className={cn(
          "pb-3.5 leading-relaxed [&_a]:font-semibold [&_a]:text-accent-foreground [&_a]:underline-offset-4 [&_a:hover]:underline [&_p:not(:last-child)]:mb-3",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
export type { AccordionProps }
