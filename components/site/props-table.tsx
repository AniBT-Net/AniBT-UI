import type { ReactNode } from "react"

export type PropRow = {
  name: string
  type: string
  default?: string
  description: ReactNode
}

/**
 * A props table on A's grid rows: a stitched head, stitched rows, no cell
 * borders. On a phone each row stacks.
 */
export function PropsTable({ rows, title }: { rows: PropRow[]; title?: string }) {
  return (
    <div className="not-prose anibt-sheet my-6 overflow-hidden">
      {title ? (
        <div className="anibt-stitch-under flex h-10 items-center px-4 font-mono text-[13px] font-semibold">{title}</div>
      ) : null}
      <div role="table" aria-label={title ? `${title} 属性` : "属性"}>
        <div role="row" className="anibt-th hidden grid-cols-[160px_minmax(0,1.3fr)_110px_minmax(0,2fr)] md:grid">
          <span role="columnheader">属性</span>
          <span role="columnheader">类型</span>
          <span role="columnheader">默认值</span>
          <span role="columnheader">说明</span>
        </div>
        {rows.map((row) => (
          <div
            role="row"
            key={row.name}
            className="anibt-tr grid-cols-1 gap-1 py-3 hover:bg-transparent md:grid-cols-[160px_minmax(0,1.3fr)_110px_minmax(0,2fr)] md:gap-3"
          >
            <span role="cell" className="font-mono text-[13px] font-semibold text-accent-foreground">
              {row.name}
            </span>
            <span role="cell" className="font-mono text-[12px] break-words text-anibt-ink2">
              {row.type}
            </span>
            <span role="cell" className="font-mono text-[12px] text-muted-foreground">
              <span className="md:hidden">默认 </span>
              {row.default ?? "—"}
            </span>
            <span role="cell" className="text-[13px] text-anibt-ink2">
              {row.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
