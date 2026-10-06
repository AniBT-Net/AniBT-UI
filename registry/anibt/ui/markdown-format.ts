/**
 * `@anibt/markdown-editor`'s formatting commands as pure text edits.
 *
 * A command reads the value and the selection and answers with one edit — the
 * range to replace, the text to put there, and where the selection lands
 * afterwards. The editor applies it through the browser's own text insertion
 * so Ctrl/Cmd+Z still undoes it; nothing here touches the DOM.
 *
 * - Inline marks (加粗 `**`, 斜体 `*`, 代码 `` ` ``) wrap the selection, or
 *   unwrap it when it is already wrapped. Spaces at the selection's edges stay
 *   outside the marks (`** x**` is not bold). With nothing selected the marks
 *   go in as a pair with the caret between them.
 * - Line marks (标题 `## `, 列表 `- `, 引用 `> `) apply to every line the
 *   selection touches, and come off again when every non-empty line has them.
 * - 链接 / 图片 put the selection in the text slot and select `url`; a
 *   selected URL goes in the target slot and the caret waits in the text slot.
 * - 分割线 and a multi-line code block sit on their own lines with a blank line
 *   either side, adding only the newlines that are missing.
 */
export type MarkdownAction = "bold" | "italic" | "heading" | "list" | "quote" | "link" | "image" | "code" | "divider"

export type MarkdownEdit = {
  /** Start of the replaced range in the old value. */
  from: number
  /** End of the replaced range in the old value. */
  to: number
  /** Text that replaces `value.slice(from, to)`. */
  insert: string
  /** Selection in the new value. */
  selectionStart: number
  selectionEnd: number
}

export function applyMarkdownEdit(value: string, edit: MarkdownEdit): string {
  return value.slice(0, edit.from) + edit.insert + value.slice(edit.to)
}

export function formatMarkdown(value: string, start: number, end: number, action: MarkdownAction): MarkdownEdit {
  const from = Math.max(0, Math.min(start, end, value.length))
  const to = Math.min(value.length, Math.max(start, end))
  switch (action) {
    case "bold":
      return toggleInline(value, from, to, "**")
    case "italic":
      return toggleInline(value, from, to, "*")
    case "code":
      return value.slice(from, to).includes("\n") ? codeBlock(value, from, to) : toggleInline(value, from, to, "`")
    case "heading":
      return toggleLinePrefix(value, from, to, "## ", /^#{1,6} /u)
    case "list":
      return toggleLinePrefix(value, from, to, "- ", /^\s*[-*+] /u)
    case "quote":
      return toggleLinePrefix(value, from, to, "> ", /^> ?/u)
    case "link":
      return linkLike(value, from, to, "")
    case "image":
      return linkLike(value, from, to, "!")
    case "divider":
      return block(value, from, to, "---", "")
  }
}

/** How many `*` sit directly before `at`, and directly from `at` on. */
function starsBefore(value: string, at: number): number {
  let count = 0
  while (at - count - 1 >= 0 && value[at - count - 1] === "*") count += 1
  return count
}

function starsAfter(value: string, at: number): number {
  let count = 0
  while (at + count < value.length && value[at + count] === "*") count += 1
  return count
}

/** Whether a run of `*` of this length holds the mark (`*` = odd run, `**` = 2 or 3). */
function runHolds(run: number, mark: string): boolean {
  if (mark === "**") return run >= 2
  if (mark === "*") return run % 2 === 1
  return run >= 1
}

function surroundedBy(value: string, from: number, to: number, mark: string): boolean {
  if (mark.startsWith("*")) {
    return runHolds(starsBefore(value, from), mark) && runHolds(starsAfter(value, to), mark)
  }
  return value.slice(from - mark.length, from) === mark && value.slice(to, to + mark.length) === mark
}

function wrappedInside(selected: string, mark: string): boolean {
  if (selected.length < mark.length * 2) return false
  if (mark.startsWith("*")) {
    let lead = 0
    while (lead < selected.length && selected[lead] === "*") lead += 1
    let trail = 0
    while (trail < selected.length - lead && selected[selected.length - 1 - trail] === "*") trail += 1
    return runHolds(lead, mark) && runHolds(trail, mark)
  }
  return selected.startsWith(mark) && selected.endsWith(mark)
}

function toggleInline(value: string, from: number, to: number, mark: string): MarkdownEdit {
  const selected = value.slice(from, to)

  // The marks sit just outside the selection: take them off.
  if (from >= mark.length && surroundedBy(value, from, to, mark)) {
    const start = from - mark.length
    return {
      from: start,
      to: to + mark.length,
      insert: selected,
      selectionStart: start,
      selectionEnd: start + selected.length,
    }
  }

  // The selection includes its own marks: take them off.
  if (wrappedInside(selected, mark)) {
    const inner = selected.slice(mark.length, selected.length - mark.length)
    return { from, to, insert: inner, selectionStart: from, selectionEnd: from + inner.length }
  }

  if (!selected) {
    return { from, to, insert: mark + mark, selectionStart: from + mark.length, selectionEnd: from + mark.length }
  }

  // Edge spaces stay outside the marks; `** x**` would not render.
  const lead = selected.length - selected.trimStart().length
  const trail = selected.length - selected.trimEnd().length
  const core = selected.slice(lead, selected.length - trail)
  if (!core) {
    return { from, to, insert: selected + mark + mark, selectionStart: to + mark.length, selectionEnd: to + mark.length }
  }
  const insert = selected.slice(0, lead) + mark + core + mark + selected.slice(selected.length - trail)
  const coreStart = from + lead + mark.length
  return { from, to, insert, selectionStart: coreStart, selectionEnd: coreStart + core.length }
}

/** The whole lines a selection touches: a selection ending at a line's
 * first column does not pull that line in. */
function lineRange(value: string, from: number, to: number): { start: number; end: number } {
  const start = value.lastIndexOf("\n", from - 1) + 1
  const last = to > from && value[to - 1] === "\n" ? to - 1 : to
  const newline = value.indexOf("\n", last)
  return { start, end: newline === -1 ? value.length : newline }
}

function toggleLinePrefix(value: string, from: number, to: number, prefix: string, pattern: RegExp): MarkdownEdit {
  const range = lineRange(value, from, Math.max(from, to))
  const lines = value.slice(range.start, range.end).split("\n")
  const filled = lines.filter((line) => line.trim() !== "")
  const remove = filled.length > 0 && filled.every((line) => pattern.test(line))

  const next = lines.map((line) => {
    if (remove) return line.replace(pattern, "")
    if (line.trim() === "" && lines.length > 1) return line
    // A heading replaces another level instead of stacking `## ### `.
    return prefix + (prefix === "## " ? line.replace(/^#{1,6} /u, "") : line)
  })
  const insert = next.join("\n")

  if (from === to && lines.length === 1) {
    const caret = Math.max(range.start, from + (insert.length - (range.end - range.start)))
    return { from: range.start, to: range.end, insert, selectionStart: caret, selectionEnd: caret }
  }
  return {
    from: range.start,
    to: range.end,
    insert,
    selectionStart: range.start,
    selectionEnd: range.start + insert.length,
  }
}

const URL_PATTERN = /^(?:https?:\/\/|\/)\S+$/u
const URL_PLACEHOLDER = "url"

function linkLike(value: string, from: number, to: number, bang: string): MarkdownEdit {
  const selected = value.slice(from, to)
  const trimmed = selected.trim()
  if (trimmed && URL_PATTERN.test(trimmed)) {
    const insert = `${bang}[](${trimmed})`
    const caret = from + bang.length + 1
    return { from, to, insert, selectionStart: caret, selectionEnd: caret }
  }
  const insert = `${bang}[${selected}](${URL_PLACEHOLDER})`
  if (!selected) {
    const caret = from + bang.length + 1
    return { from, to, insert, selectionStart: caret, selectionEnd: caret }
  }
  const urlStart = from + bang.length + selected.length + 3
  return { from, to, insert, selectionStart: urlStart, selectionEnd: urlStart + URL_PLACEHOLDER.length }
}

function codeBlock(value: string, from: number, to: number): MarkdownEdit {
  return block(value, from, to, "```", value.slice(from, to))
}

/**
 * A block on its own lines with a blank line either side: a rule (`---`) or
 * a fence (```` ``` ```` around `body`). Only the newlines that are missing
 * are added.
 */
function block(value: string, from: number, to: number, fence: string, body: string): MarkdownEdit {
  const before = value.slice(0, from)
  const after = value.slice(to)
  const lead = before === "" || before.endsWith("\n\n") ? "" : before.endsWith("\n") ? "\n" : "\n\n"
  const trail = after.startsWith("\n\n") ? "" : after.startsWith("\n") ? "\n" : after === "" ? "\n" : "\n\n"
  const content = fence === "---" ? fence : `${fence}\n${body}\n${fence}`
  const insert = lead + content + trail
  if (fence === "---") {
    const caret = from + insert.length
    return { from, to, insert, selectionStart: caret, selectionEnd: caret }
  }
  const bodyStart = from + lead.length + fence.length + 1
  return { from, to, insert, selectionStart: bodyStart, selectionEnd: bodyStart + body.length }
}
