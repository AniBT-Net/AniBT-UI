"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircleIcon, LockIcon } from "lucide-react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { Label } from "@/registry/anibt/ui/label"

/**
 * Field — AniBT's form grammar (A 「贴纸手账」), on shadcn's field names.
 *
 * The rules, the same in every form:
 * - The label sits above its control: 13/600 `--anibt-ink2`, 6px over it.
 *   Required is a pink `*` (read as 「必填」). Beside the label only small
 *   facts (`FieldTag`: a source, 已锁定, 只读); the label row's far end holds
 *   meta (a count, a time) and wraps under the label on a narrow field.
 * - Under the control: a 12px hint in `--muted-foreground`, or a 12px error
 *   in `--destructive` behind its glyph (`aria-live`) — never both.
 * - 16px between fields. A group of fields is one card (`FieldGroup` with a
 *   `title`: paper, a stitched 14/700 head, 16px padding); 20px between cards.
 * - Two or three fields side by side only for short values, and only when
 *   the row itself is wide enough (`FieldRow`, a container query).
 * - Option text beside a checkbox or a switch is body copy, 13/400 ink
 *   (`orientation="horizontal"`).
 *
 * Two ways to write it:
 * - the one-call form: `<Field label="标题" hint="…" error={…}>` with the
 *   control inside `FieldControl`, which gives it the field's id, its
 *   `aria-describedby` and `aria-invalid`;
 * - shadcn's composition (`FieldSet`, `FieldLegend`, `FieldLabel`,
 *   `FieldContent`, `FieldTitle`, `FieldDescription`, `FieldError`,
 *   `FieldSeparator`), with the same exports and props as shadcn's field so
 *   code written for it keeps compiling.
 */

type FieldContextValue = {
  controlId: string
  labelId: string
  hintId: string
  errorId: string
  hasHint: boolean
  hasError: boolean
  labelFor: "control" | "group"
}

const FieldContext = React.createContext<FieldContextValue | null>(null)

/** Groups of fields: a plain stack, or — with a `title` — one A card. */
function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex min-w-0 flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      {...props}
    />
  )
}

/** A fieldset's caption: `legend` is the 14/700 head, `label` the 13/600 label tier. */
function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-1.5 data-[variant=label]:text-[13px] data-[variant=label]:leading-5 data-[variant=label]:font-semibold data-[variant=label]:text-anibt-ink2 data-[variant=legend]:text-[14px] data-[variant=legend]:leading-[1.4] data-[variant=legend]:font-bold data-[variant=legend]:text-foreground",
        className
      )}
      {...props}
    />
  )
}

type FieldGroupProps = Omit<React.ComponentProps<"div">, "title"> & {
  /** Turns the group into an A card with this stitched 14/700 head. */
  title?: React.ReactNode
  /** A 12px note beside the title (the card form only). */
  note?: React.ReactNode
  /** Tools at the head's far end (the card form only). */
  actions?: React.ReactNode
  /** Classes for the card's body, where the fields stack. */
  bodyClassName?: string
}

function FieldGroup({ title, note, actions, bodyClassName, className, children, ...props }: FieldGroupProps) {
  const headingId = React.useId()
  const stack =
    "group/field-group @container/field-group flex w-full min-w-0 flex-col gap-4 has-[>[data-slot=field-group]]:gap-5 data-[slot=checkbox-group]:gap-3"

  if (title === undefined || title === null) {
    return (
      <div data-slot="field-group" className={cn(stack, className)} {...props}>
        {children}
      </div>
    )
  }

  return (
    <section
      data-slot="field-group"
      data-variant="card"
      aria-labelledby={headingId}
      className={cn("anibt-sheet min-w-0 scroll-mt-3 overflow-clip", className)}
      {...(props as React.ComponentProps<"section">)}
    >
      <div className="anibt-stitch-under flex min-h-11 min-w-0 items-center gap-2 px-4 py-2">
        <h3 id={headingId} className="anibt-ell text-[14px] leading-[1.4] font-bold text-foreground">
          {title}
        </h3>
        {note ? <span className="anibt-ell text-[12px] text-muted-foreground">{note}</span> : null}
        {actions ? <div className="ml-auto flex shrink-0 items-center gap-2">{actions}</div> : null}
      </div>
      <div className={cn(stack, "p-4", bodyClassName)}>{children}</div>
    </section>
  )
}

const fieldVariants = cva("group/field w-full min-w-0", {
  variants: {
    orientation: {
      // Label row, control, hint: 6px apart. A select trigger takes the width.
      vertical: "grid content-start gap-1.5 *:data-[slot=select-trigger]:w-full",
      // A choice row: the control, then its option text (13/400 ink).
      horizontal:
        "flex flex-row items-center gap-2 has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto *:data-[slot=field-label]:font-normal *:data-[slot=field-label]:text-foreground has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px has-[>:disabled]:*:data-[slot=field-label]:text-muted-foreground data-[disabled=true]:*:data-[slot=field-label]:text-muted-foreground",
      // Stacked in a narrow group, label beside the control from 28rem.
      responsive:
        "flex flex-col gap-1.5 *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:gap-3 @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

type FieldProps = Omit<React.ComponentProps<"div">, "children"> &
  VariantProps<typeof fieldVariants> & {
    /** The one-call form: the field's label, drawn above the control. */
    label?: React.ReactNode
    /** The control's id; generated when absent. The label points at it. */
    id?: string
    /** A pink `*` after the label, read as `requiredLabel`. */
    required?: boolean
    /** Shown but not editable here: a 只读 tag beside the label. */
    readOnly?: boolean
    /** Small tags beside the label: a source, a lock (`FieldTag`). */
    tags?: React.ReactNode
    /** The label row's far end: a count, a time, a disclosure. */
    meta?: React.ReactNode
    /** 12px help under the control. Hidden while there is an error. */
    hint?: React.ReactNode
    /** The error under the control; also marks the control invalid. */
    error?: React.ReactNode
    /**
     * `group` for a set of controls (a segmented control, a chip row) that
     * is named with `aria-labelledby` instead of `for`.
     */
    labelFor?: "control" | "group"
    /** What a screen reader says for the `*`. */
    requiredLabel?: string
    /** The read-only tag's word. */
    readOnlyLabel?: string
    children?: React.ReactNode
  }

function Field({
  className,
  orientation = "vertical",
  label,
  id,
  required,
  readOnly,
  tags,
  meta,
  hint,
  error,
  labelFor = "control",
  requiredLabel = "必填",
  readOnlyLabel = "只读",
  children,
  ...props
}: FieldProps) {
  const reactId = React.useId()
  const controlId = id ?? `${reactId}-control`
  const hasHint = Boolean(hint)
  const hasError = Boolean(error)
  const context = React.useMemo<FieldContextValue>(
    () => ({
      controlId,
      labelId: `${controlId}-label`,
      hintId: `${controlId}-hint`,
      errorId: `${controlId}-error`,
      hasHint,
      hasError,
      labelFor,
    }),
    [controlId, hasHint, hasError, labelFor]
  )

  // The one-call form puts the label above the control (or, horizontal,
  // beside a choice); "responsive" is for shadcn's composition only.
  const layout = label !== undefined && label !== null && orientation === "responsive" ? "vertical" : orientation

  const shell = (body: React.ReactNode) => (
    <FieldContext.Provider value={context}>
      <div
        role="group"
        data-slot="field"
        data-orientation={layout}
        data-invalid={hasError || undefined}
        className={cn(fieldVariants({ orientation: layout }), className)}
        {...props}
      >
        {body}
      </div>
    </FieldContext.Provider>
  )

  if (label === undefined || label === null) return shell(children)

  const labelText = (
    <>
      {label}
      {required ? (
        <>
          <span className="text-accent-foreground" aria-hidden="true">
            *
          </span>
          <span className="sr-only">{requiredLabel}</span>
        </>
      ) : null}
    </>
  )
  const under = hasError ? (
    <FieldError id={context.errorId}>{error}</FieldError>
  ) : hasHint ? (
    <FieldDescription id={context.hintId}>{hint}</FieldDescription>
  ) : null

  if (orientation === "horizontal") {
    return shell(
      <>
        {children}
        <FieldContent>
          <FieldLabel
            id={context.labelId}
            htmlFor={labelFor === "control" ? controlId : undefined}
            className="font-normal text-foreground"
          >
            {labelText}
          </FieldLabel>
          {under}
        </FieldContent>
      </>
    )
  }

  return shell(
    <>
      {/* The label row wraps: on a narrow field the meta drops under the
          label instead of squeezing it. */}
      <div className="flex min-h-6 min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1">
        <FieldLabel id={context.labelId} htmlFor={labelFor === "control" ? controlId : undefined} className="min-w-0 shrink">
          {labelText}
        </FieldLabel>
        {readOnly ? <FieldTag icon={LockIcon}>{readOnlyLabel}</FieldTag> : null}
        {tags}
        {meta ? (
          <div className="ml-auto flex max-w-full min-w-0 items-center gap-1.5 text-[12px] text-muted-foreground">{meta}</div>
        ) : null}
      </div>
      {children}
      {under}
    </>
  )
}

/**
 * Gives the single child the field's id (or, for `labelFor="group"`, its
 * `aria-labelledby`), the hint or error as its description and its invalid
 * state. Outside a `Field` it passes the child through.
 */
function FieldControl(props: React.ComponentProps<typeof Slot.Root>) {
  const field = React.useContext(FieldContext)
  if (!field) return <Slot.Root {...props} />
  const describedBy = field.hasError ? field.errorId : field.hasHint ? field.hintId : undefined
  return (
    <Slot.Root
      id={field.controlId}
      aria-labelledby={field.labelFor === "group" ? field.labelId : undefined}
      aria-describedby={describedBy}
      aria-invalid={field.hasError || undefined}
      {...props}
    />
  )
}

/** Title and description stacked beside a control in a horizontal field. */
function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn("group/field-content flex min-w-0 flex-1 flex-col gap-0.5 leading-snug", className)}
      {...props}
    />
  )
}

/**
 * The field's label (a `Label`). Wrapping a whole `Field` in it makes a
 * choice card: an A well that turns pink when its control is checked.
 */
function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-1.5 leading-5 group-data-[disabled=true]/field:text-muted-foreground",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:items-stretch has-[>[data-slot=field]]:rounded-[10px] has-[>[data-slot=field]]:bg-card has-[>[data-slot=field]]:font-normal has-[>[data-slot=field]]:text-foreground has-[>[data-slot=field]]:inset-ring-1 has-[>[data-slot=field]]:inset-ring-border has-[>[data-slot=field]]:transition-[background-color,box-shadow] has-[>[data-slot=field]]:duration-150 *:data-[slot=field]:px-3 *:data-[slot=field]:py-2.5",
        "has-[>[data-slot=field]]:not-has-[:disabled]:hover:inset-ring-anibt-wash-line",
        // Picked (a radio or a checkbox inside): the pink wash. A switch is a
        // setting, not a pick, so an "on" settings card stays paper.
        "has-[>[data-slot=field]]:has-[[role=radio][data-state=checked]]:bg-accent has-[>[data-slot=field]]:has-[[role=radio][data-state=checked]]:inset-ring-anibt-wash-line has-[>[data-slot=field]]:has-[[role=checkbox][data-state=checked]]:bg-accent has-[>[data-slot=field]]:has-[[role=checkbox][data-state=checked]]:inset-ring-anibt-wash-line",
        className
      )}
      {...props}
    />
  )
}

/** A label-tier title that labels nothing (a choice card's head). */
function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-1.5 text-[13px] leading-5 font-semibold text-foreground group-data-[disabled=true]/field:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

/** The hint under a control (or under a title): 12px, muted. */
function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-[12px] leading-normal font-normal text-muted-foreground [[data-variant=legend]+&]:-mt-1",
        "[&>a]:text-accent-foreground [&>a]:underline-offset-4 [&>a:hover]:underline",
        className
      )}
      {...props}
    />
  )
}

/** A stitched rule between fields, with an optional word in the middle. */
function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn("relative -my-1 h-5 text-[12px]", className)}
      {...props}
    >
      <div aria-hidden="true" className="anibt-stitch absolute inset-x-0 top-1/2" />
      {children ? (
        <span
          data-slot="field-separator-content"
          className="relative mx-auto block w-fit bg-card px-2 leading-5 text-muted-foreground"
        >
          {children}
        </span>
      ) : null}
    </div>
  )
}

/**
 * The error under a control: 12px `--destructive` behind its glyph,
 * announced politely. Takes `children`, or shadcn's `errors` list (a
 * validator's `{ message }` objects; duplicates are dropped).
 */
function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = React.useMemo(() => {
    if (children) return children
    if (!errors?.length) return null

    const unique = [...new Map(errors.map((error) => [error?.message, error])).values()]
    if (unique.length === 1) return unique[0]?.message

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {unique.map((error, index) => (error?.message ? <li key={index}>{error.message}</li> : null))}
      </ul>
    )
  }, [children, errors])

  if (!content) return null

  return (
    <div
      data-slot="field-error"
      aria-live="polite"
      className={cn("flex items-start gap-1 text-[12px] leading-normal font-normal text-destructive", className)}
      {...props}
    >
      <AlertCircleIcon className="mt-px size-3.5 shrink-0" aria-hidden="true" />
      <div className="min-w-0">{content}</div>
    </div>
  )
}

/** AniBT's name for the hint under a control. */
const FieldHint = FieldDescription

type FieldTagTone = "neutral" | "accent" | "ok" | "warn" | "danger"

const TAG_TONE: Record<FieldTagTone, string> = {
  neutral: "",
  accent: "anibt-tag-lang",
  ok: "anibt-tag-ok",
  warn: "anibt-tag-warn",
  danger: "anibt-tag-danger",
}

/**
 * A small tag beside a label: a fact about the field (a source, 已锁定,
 * 只读), not a control. Never tilted — form rows stay straight.
 */
function FieldTag({
  icon: Icon,
  tone = "neutral",
  className,
  children,
  ...props
}: React.ComponentProps<"span"> & {
  icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" }>
  tone?: FieldTagTone
}) {
  return (
    <span data-slot="field-tag" data-tone={tone} className={cn("anibt-tag shrink-0", TAG_TONE[tone], className)} {...props}>
      {Icon ? <Icon className="size-3 shrink-0" aria-hidden="true" /> : null}
      {children}
    </span>
  )
}

/**
 * Short fields side by side — only once the row itself is wide enough (30rem
 * for two, 34rem for three), stacked otherwise. Titles, URLs and prose take
 * a row of their own.
 */
function FieldRow({ columns = 2, className, ...props }: React.ComponentProps<"div"> & { columns?: 2 | 3 }) {
  return (
    <div className="@container/field-row min-w-0">
      <div
        data-slot="field-row"
        className={cn(
          "grid min-w-0 gap-4",
          columns === 3 ? "@[34rem]/field-row:grid-cols-3" : "@[30rem]/field-row:grid-cols-2",
          className
        )}
        {...props}
      />
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
  FieldControl,
  FieldHint,
  FieldRow,
  FieldTag,
  fieldVariants,
}
export type { FieldProps, FieldGroupProps }
