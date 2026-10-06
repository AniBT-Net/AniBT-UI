"use client"

import * as React from "react"
import {
  BoldIcon,
  CodeIcon,
  Columns2Icon,
  EyeIcon,
  Heading2Icon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  MinusIcon,
  PencilLineIcon,
  QuoteIcon,
} from "lucide-react"
import { ToggleGroup as ToggleGroupPrimitive, Tooltip as TooltipPrimitive } from "radix-ui"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { cn } from "@/lib/utils"
import {
  applyMarkdownEdit,
  formatMarkdown,
  type MarkdownAction,
  type MarkdownEdit,
} from "@/registry/anibt/ui/markdown-format"

/**
 * MarkdownEditor — AniBT 「贴纸手账」: the one editing surface for a field that
 * takes Markdown (release notes, a group's default notes).
 *
 * - **One field**: paper under the control edge; while the text area has
 *   focus the whole surface wears A's focus (a 1.5px pink edge and the pink
 *   halo). A head row holds the view switch and the toolbar, a foot row the
 *   「支持 Markdown」 note and the character count.
 * - **View**: 编写 / 预览 as a segmented control. A container 720px or wider
 *   adds 分栏 and starts there: text and preview side by side, the preview
 *   scrolling inside the text area's height. The width is measured after
 *   mount, so the server and the first client render draw the narrow layout.
 * - **Toolbar**: 加粗 · 斜体 · 标题 · 列表 · 引用 · 链接 · 图片 · 代码 · 分割线,
 *   28px quiet icon squares with tooltips. Ctrl/Cmd+B, I and K are bold,
 *   italic and link. Each command is a pure text edit (`markdown-format.ts`)
 *   applied through the browser's own insertion, so Ctrl/Cmd+Z undoes it.
 *   Nothing fires while an IME is composing.
 * - **Preview**: `react-markdown` + GFM in A's prose (`markdownProseClassName`)
 *   — headings, pink links, a pink-washed quote, a stitched rule, sunk code.
 *   Raw HTML is not rendered. Pass `renderPreview` to use your own renderer.
 * - **Height**: the text area grows with its text from the size's floor to
 *   its ceiling, then scrolls; it can still be dragged taller.
 * - **Count**: `n 字`, or `n / max` with `maxLength` — amber near the limit,
 *   red over it.
 *
 * Every string has a Chinese default and can be replaced through `labels`.
 */

type View = "write" | "split" | "preview"

type MarkdownEditorLabels = {
  write: string
  split: string
  preview: string
  view: string
  toolbar: string
  bold: string
  italic: string
  heading: string
  list: string
  quote: string
  link: string
  image: string
  code: string
  divider: string
  /** The foot row's note. */
  hint: string
  /** The preview of an empty value. */
  empty: string
  count: (count: number) => string
  countMax: (count: number, max: number) => string
}

const DEFAULT_LABELS: MarkdownEditorLabels = {
  write: "编写",
  split: "分栏",
  preview: "预览",
  view: "视图",
  toolbar: "格式",
  bold: "加粗",
  italic: "斜体",
  heading: "标题",
  list: "列表",
  quote: "引用",
  link: "链接",
  image: "图片",
  code: "代码",
  divider: "分割线",
  hint: "支持 Markdown",
  empty: "还没有可预览的内容",
  count: (count) => `${count} 字`,
  countMax: (count, max) => `${count} / ${max}`,
}

type MarkdownEditorProps = {
  id?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  /** Rendered in the preview instead of `value` (an effective template). */
  previewValue?: string
  /** The text area's floor and ceiling: sm 120–320, md 180–440, lg 240–560. */
  size?: "sm" | "md" | "lg"
  /** The longest value the field accepts; the count shows `n / max`. */
  maxLength?: number
  showCount?: boolean
  /** Replaces the 「支持 Markdown」 note in the foot row. */
  hint?: React.ReactNode
  /** The view to start in. Without it a wide editor starts in 分栏, a narrow one in 编写. */
  defaultView?: View
  /** Your own preview renderer; the default is react-markdown + GFM in A's prose. */
  renderPreview?: (value: string) => React.ReactNode
  labels?: Partial<MarkdownEditorLabels>
  className?: string
  "aria-describedby"?: string
  "aria-invalid"?: React.AriaAttributes["aria-invalid"]
  "aria-labelledby"?: string
  "aria-label"?: string
}

/** A container this wide or wider gets 分栏: two panes of 360px or more. */
const SPLIT_MIN_WIDTH_PX = 720

const SIZE_CLASS: Record<NonNullable<MarkdownEditorProps["size"]>, string> = {
  sm: "min-h-[120px] max-h-[min(40svh,320px)]",
  md: "min-h-[180px] max-h-[min(55svh,440px)]",
  lg: "min-h-[240px] max-h-[min(60svh,560px)]",
}

type ToolName = Exclude<keyof MarkdownEditorLabels, "write" | "split" | "preview" | "view" | "toolbar" | "hint" | "empty" | "count" | "countMax">

type Tool = {
  action: MarkdownAction
  label: ToolName
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" }>
  /** The letter of its Ctrl/Cmd shortcut. */
  key?: string
}

const TOOLS: readonly Tool[] = [
  { action: "bold", label: "bold", icon: BoldIcon, key: "b" },
  { action: "italic", label: "italic", icon: ItalicIcon, key: "i" },
  { action: "heading", label: "heading", icon: Heading2Icon },
  { action: "list", label: "list", icon: ListIcon },
  { action: "quote", label: "quote", icon: QuoteIcon },
  { action: "link", label: "link", icon: LinkIcon, key: "k" },
  { action: "image", label: "image", icon: ImageIcon },
  { action: "code", label: "code", icon: CodeIcon },
  { action: "divider", label: "divider", icon: MinusIcon },
]

const SHORTCUTS = new Map(TOOLS.flatMap((tool) => (tool.key ? [[tool.key, tool.action] as const] : [])))

/**
 * A's prose for rendered Markdown: headings step down but never under 12px,
 * body copy in the secondary ink, pink links, a quote on the pink wash with
 * a pink stroke, a stitched rule, code on the sunk well, stitched tables.
 */
const markdownProseClassName = cn(
  "text-[13px] leading-6 text-anibt-ink2 [&>:first-child]:mt-0 [&>:last-child]:mb-0",
  "[&_h1]:mt-6 [&_h1]:mb-3 [&_h1]:text-[20px] [&_h1]:leading-snug [&_h1]:font-extrabold [&_h1]:text-foreground",
  "[&_h2]:mt-5 [&_h2]:mb-2 [&_h2]:text-[16px] [&_h2]:leading-snug [&_h2]:font-extrabold [&_h2]:text-foreground",
  "[&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-[14px] [&_h3]:font-bold [&_h3]:text-foreground",
  "[&_h4]:mt-4 [&_h4]:mb-1.5 [&_h4]:text-[13px] [&_h4]:font-bold [&_h4]:text-foreground",
  "[&_h5]:mt-3 [&_h5]:mb-1 [&_h5]:text-[13px] [&_h5]:font-semibold",
  "[&_h6]:mt-3 [&_h6]:mb-1 [&_h6]:text-[12px] [&_h6]:font-semibold [&_h6]:text-muted-foreground",
  "[&_p]:my-2.5 [&_p]:leading-7",
  "[&_strong]:font-bold [&_strong]:text-foreground",
  "[&_a]:font-medium [&_a]:text-accent-foreground [&_a]:underline-offset-4 hover:[&_a]:underline",
  "[&_blockquote]:my-4 [&_blockquote]:rounded-r-[10px] [&_blockquote]:border-l-[3px] [&_blockquote]:border-anibt-mark [&_blockquote]:bg-accent [&_blockquote]:px-4 [&_blockquote]:py-2 [&_blockquote_p]:my-0 [&_blockquote_p]:text-foreground",
  "[&_ul]:my-2.5 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ol]:my-2.5 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5",
  "[&_ul>li::marker]:text-anibt-mark [&_ol>li::marker]:text-muted-foreground [&_li>p]:my-0",
  "[&_input[type=checkbox]]:mr-1.5 [&_input[type=checkbox]]:accent-anibt-mark [&_li:has(>input[type=checkbox])]:list-none",
  "[&_code]:rounded-[6px] [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[12px] [&_code]:text-foreground",
  "[&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre]:rounded-[10px] [&_pre]:bg-muted [&_pre]:p-3 [&_pre]:text-[12px] [&_pre]:shadow-[inset_0_0_0_1px_var(--border)] [&_pre_code]:bg-transparent [&_pre_code]:p-0",
  "[&_hr]:anibt-stitch [&_hr]:my-5 [&_hr]:border-0",
  "[&_img]:my-3 [&_img]:max-w-full [&_img]:rounded-[10px]",
  "[&_table]:my-3 [&_table]:w-full [&_table]:border-collapse [&_table]:text-[12px] [&_th]:anibt-stitch-under [&_th]:px-2 [&_th]:py-1.5 [&_th]:text-left [&_th]:font-semibold [&_th]:text-muted-foreground [&_td]:anibt-stitch-under [&_td]:px-2 [&_td]:py-1.5"
)

function MarkdownEditor({
  id,
  value,
  onChange,
  placeholder,
  disabled,
  previewValue,
  size = "md",
  maxLength,
  showCount = true,
  hint,
  defaultView,
  renderPreview,
  labels: labelOverrides,
  className,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  "aria-labelledby": labelledBy,
  "aria-label": ariaLabel,
}: MarkdownEditorProps) {
  const labels = { ...DEFAULT_LABELS, ...labelOverrides }
  const reactId = React.useId()
  const textareaId = id ?? `${reactId}-text`
  const rootRef = React.useRef<HTMLDivElement>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const pendingSelection = React.useRef<[number, number] | null>(null)
  const wide = useContainerAtLeast(rootRef, SPLIT_MIN_WIDTH_PX)
  const [chosenView, setChosenView] = React.useState<View>(defaultView ?? "split")
  const view: View = !wide && chosenView === "split" ? "write" : chosenView
  const showWrite = view !== "preview"
  const showPreview = view !== "write"
  const preview = React.useDeferredValue(previewValue ?? value)

  // A fallback edit (no `insertText`) re-renders the value; the selection it
  // asked for is put back once the new value is on the text area.
  React.useLayoutEffect(() => {
    const selection = pendingSelection.current
    const textarea = textareaRef.current
    if (!selection || !textarea) return
    pendingSelection.current = null
    textarea.setSelectionRange(selection[0], selection[1])
  }, [value])

  const applyEdit = (textarea: HTMLTextAreaElement, edit: MarkdownEdit) => {
    const expected = applyMarkdownEdit(textarea.value, edit)
    if (maxLength !== undefined && expected.length > maxLength && expected.length > textarea.value.length) return
    textarea.focus()
    textarea.setSelectionRange(edit.from, edit.to)
    // The browser's own insertion keeps Ctrl/Cmd+Z working and fires the
    // input event the controlled value listens to.
    const inserted =
      typeof document.execCommand === "function" && document.execCommand("insertText", false, edit.insert)
    if (inserted && textarea.value === expected) {
      textarea.setSelectionRange(edit.selectionStart, edit.selectionEnd)
      return
    }
    pendingSelection.current = [edit.selectionStart, edit.selectionEnd]
    onChange(expected)
  }

  const runCommand = (action: MarkdownAction) => {
    const textarea = textareaRef.current
    if (!textarea || disabled) return
    applyEdit(textarea, formatMarkdown(textarea.value, textarea.selectionStart, textarea.selectionEnd, action))
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.nativeEvent.isComposing || event.keyCode === 229 || event.altKey || event.shiftKey) return
    if (!(event.metaKey || event.ctrlKey)) return
    const action = SHORTCUTS.get(event.key.toLowerCase())
    if (!action) return
    event.preventDefault()
    event.stopPropagation()
    runCommand(action)
  }

  const viewOptions = [
    { value: "write" as const, label: labels.write, icon: PencilLineIcon },
    ...(wide ? [{ value: "split" as const, label: labels.split, icon: Columns2Icon }] : []),
    { value: "preview" as const, label: labels.preview, icon: EyeIcon },
  ]

  const count = value.length
  const countTone =
    maxLength === undefined
      ? "text-muted-foreground"
      : count > maxLength
        ? "text-destructive"
        : count >= maxLength * 0.9
          ? "text-anibt-warn"
          : "text-muted-foreground"

  return (
    <div
      ref={rootRef}
      data-slot="markdown-editor"
      data-view={view}
      className={cn(
        "@container/md min-w-0 overflow-hidden rounded-[10px] bg-card inset-ring-1 inset-ring-input transition-[box-shadow] duration-150",
        "hover:inset-ring-anibt-wash-line has-[textarea:focus-visible]:inset-ring-[1.5px] has-[textarea:focus-visible]:inset-ring-ring has-[textarea:focus-visible]:ring-4 has-[textarea:focus-visible]:ring-ring/20",
        "has-[textarea[aria-invalid=true]]:inset-ring-[1.5px] has-[textarea[aria-invalid=true]]:inset-ring-anibt-danger-fill",
        disabled && "bg-muted hover:inset-ring-input",
        className
      )}
    >
      <div className="anibt-stitch-under flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 p-1.5">
        <ToggleGroupPrimitive.Root
          type="single"
          value={view}
          onValueChange={(next) => {
            if (next) setChosenView(next as View)
          }}
          aria-label={labels.view}
          className="anibt-seg shrink-0"
        >
          {viewOptions.map((option) => (
            <ToggleGroupPrimitive.Item
              key={option.value}
              value={option.value}
              className="focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring focus-visible:outline-solid"
            >
              <option.icon className="size-3.5" aria-hidden="true" />
              {option.label}
            </ToggleGroupPrimitive.Item>
          ))}
        </ToggleGroupPrimitive.Root>
        <TooltipPrimitive.Provider delayDuration={400}>
          <div
            role="toolbar"
            aria-label={labels.toolbar}
            aria-controls={textareaId}
            className={cn("flex min-w-0 flex-wrap items-center gap-0.5", !showWrite && "invisible")}
          >
            <span className="mx-1 h-4 w-px shrink-0 bg-input @max-[28rem]/md:hidden" aria-hidden="true" />
            {TOOLS.map((tool) => (
              <ToolButton
                key={tool.action}
                tool={tool}
                label={labels[tool.label]}
                disabled={disabled || !showWrite}
                onRun={runCommand}
              />
            ))}
          </div>
        </TooltipPrimitive.Provider>
      </div>

      <div className={cn("grid min-w-0", view === "split" && "grid-cols-2")}>
        <textarea
          ref={textareaRef}
          id={textareaId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          aria-describedby={describedBy}
          aria-invalid={invalid}
          aria-labelledby={labelledBy}
          aria-label={ariaLabel}
          className={cn(
            showWrite ? "block" : "hidden",
            "w-full min-w-0 resize-y overflow-y-auto border-0 bg-transparent px-3 py-2.5 text-[16px] leading-6 text-foreground outline-none [field-sizing:content] placeholder:text-muted-foreground selection:bg-anibt-wash2 selection:text-foreground disabled:cursor-not-allowed disabled:text-muted-foreground md:text-[13px]",
            SIZE_CLASS[size]
          )}
        />
        {showPreview ? (
          <MarkdownPreview
            value={preview}
            split={view === "split"}
            empty={labels.empty}
            renderPreview={renderPreview}
            className={view === "split" ? undefined : SIZE_CLASS[size]}
          />
        ) : null}
      </div>

      <div className="anibt-stitch-over flex h-7 min-w-0 items-center gap-3 px-3 text-[12px]">
        <span className="anibt-ell min-w-0 flex-1 text-muted-foreground">{hint ?? labels.hint}</span>
        {showCount ? (
          <span className={cn("anibt-num shrink-0", countTone)}>
            {maxLength === undefined ? labels.count(count) : labels.countMax(count, maxLength)}
          </span>
        ) : null}
      </div>
    </div>
  )
}

function ToolButton({
  tool,
  label,
  disabled,
  onRun,
}: {
  tool: Tool
  label: string
  disabled?: boolean
  onRun: (action: MarkdownAction) => void
}) {
  const Icon = tool.icon
  const [shortcut, setShortcut] = React.useState<string | null>(null)

  return (
    <TooltipPrimitive.Root
      onOpenChange={(open) => {
        // Read the platform only when a tooltip opens: ⌘B on a Mac, Ctrl+B elsewhere.
        if (open && tool.key) setShortcut(shortcutLabel(tool.key))
      }}
    >
      <TooltipPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label={label}
          aria-keyshortcuts={tool.key ? `Control+${tool.key.toUpperCase()} Meta+${tool.key.toUpperCase()}` : undefined}
          disabled={disabled}
          // The text area keeps the focus and the selection the command reads.
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onRun(tool.action)}
          className="anibt-icobtn anibt-icobtn-sm anibt-icobtn-ghost focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring focus-visible:outline-solid disabled:pointer-events-none disabled:text-muted-foreground"
        >
          <Icon className="size-4" aria-hidden="true" />
        </button>
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side="top"
          sideOffset={6}
          className="anibt-tip z-50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0"
        >
          {shortcut ? `${label} · ${shortcut}` : label}
          <TooltipPrimitive.Arrow className="fill-anibt-tip" width={10} height={5} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}

function shortcutLabel(key: string): string {
  const mac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/u.test(navigator.platform || navigator.userAgent)
  return mac ? `⌘${key.toUpperCase()}` : `Ctrl+${key.toUpperCase()}`
}

/**
 * The preview pane. Side by side it is laid over its grid cell (`absolute
 * inset-0`), so the text area alone decides the row's height and the preview
 * scrolls inside it.
 */
function MarkdownPreview({
  value,
  split,
  empty,
  renderPreview,
  className,
}: {
  value: string
  split: boolean
  empty: string
  renderPreview?: (value: string) => React.ReactNode
  className?: string
}) {
  const body = value.trim() ? (
    renderPreview ? (
      renderPreview(value)
    ) : (
      <div className={markdownProseClassName}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
      </div>
    )
  ) : (
    <p className="text-[13px] text-muted-foreground">{empty}</p>
  )

  if (split) {
    return (
      <div data-slot="markdown-preview" className="anibt-stitch-side relative min-w-0 bg-muted/40 [background-position:0_0]">
        <div className="absolute inset-0 overflow-y-auto px-4 py-2.5">{body}</div>
      </div>
    )
  }
  return (
    <div data-slot="markdown-preview" className={cn("min-w-0 overflow-y-auto px-4 py-2.5", className)}>
      {body}
    </div>
  )
}

/**
 * Whether the element is at least `minWidth` wide. False on the server and on
 * the first client render, so both draw the narrow layout; a ResizeObserver
 * answers after mount.
 */
function useContainerAtLeast(ref: React.RefObject<HTMLElement | null>, minWidth: number): boolean {
  const [atLeast, setAtLeast] = React.useState(false)
  React.useEffect(() => {
    const element = ref.current
    if (!element || typeof ResizeObserver === "undefined") return
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? element.clientWidth
      setAtLeast(width >= minWidth)
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, minWidth])
  return atLeast
}

export { MarkdownEditor, markdownProseClassName }
export type { MarkdownEditorLabels, MarkdownEditorProps }
