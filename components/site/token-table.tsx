import type { CSSProperties, ReactNode } from "react"

import { getThemeVars } from "@/lib/registry"
import { cn } from "@/lib/utils"

/**
 * The 白樱 / 夜樱 token tables. Values come from the generated theme item
 * (so the table can never drift from what `shadcn add` writes), and each
 * swatch is painted inside a `.site-light` or `.dark` scope with `var()`, so
 * it shows that mode whatever the page is in.
 */

type Group = { title: string; note?: string; tokens: Array<[name: string, role: ReactNode]> }

export const STANDARD_GROUPS: Group[] = [
  {
    title: "面与字",
    tokens: [
      ["background", "页面底（canvas）。点点底纹 anibt-ground 铺在它上面"],
      ["foreground", "正文墨色（ink）"],
      ["card", "面板、卡片、控件的纸面（paper）"],
      ["card-foreground", "纸面上的字"],
      ["popover", "浮层的纸面：对话框、菜单、弹层"],
      ["popover-foreground", "浮层上的字"],
      ["secondary", "下沉面（deep）：分段轨道、标签底"],
      ["secondary-foreground", "次要字（ink2）"],
      ["muted", "下沉面（deep）：骨架、占位、禁用"],
      ["muted-foreground", "弱字（ink3）：说明、元信息"],
      ["border", "面板的 1px 外边（line）"],
      ["input", "控件边与缝线（line2）"],
    ],
  },
  {
    title: "粉与红",
    note: "粉只负责操作、选中和「你在这里」；红只负责危险与失败。",
    tokens: [
      ["primary", "实色粉填充（stock shadcn 组件的主色）。AniBT 的主按钮用糖果渐变"],
      ["primary-foreground", "实色粉上的字"],
      ["accent", "选中、悬停的粉色淡底（wash）"],
      ["accent-foreground", "粉色字：链接、选中项、悬停的标签"],
      ["ring", "焦点：2px 轮廓、外偏 2px（mark）"],
      ["destructive", "危险、失败的红字"],
    ],
  },
  {
    title: "图表与侧栏",
    tokens: [
      ["chart-1", "粉"],
      ["chart-2", "蓝"],
      ["chart-3", "薄荷"],
      ["chart-4", "琥珀"],
      ["chart-5", "红"],
      ["sidebar", "侧栏：下沉井"],
      ["sidebar-foreground", "侧栏字"],
      ["sidebar-primary", "侧栏里的实色粉"],
      ["sidebar-primary-foreground", "其上的字"],
      ["sidebar-accent", "侧栏当前行 / 悬停：纸面"],
      ["sidebar-accent-foreground", "当前行的字"],
      ["sidebar-border", "侧栏边"],
      ["sidebar-ring", "侧栏焦点"],
    ],
  },
]

export const EXTRA_GROUPS: Group[] = [
  {
    title: "文字、面与粉",
    tokens: [
      ["anibt-ink2", "次要字（ink2）：导航、标签、安静按钮"],
      ["anibt-deep2", "更深一档的下沉：封面占位"],
      ["anibt-mark", "粉色笔画：状态点、图标强调"],
      ["anibt-wash2", "按下时的粉底"],
      ["anibt-wash-line", "粉色边：悬停的控件边"],
    ],
  },
  {
    title: "蓝 · 时间",
    note: "蓝只负责时间、今天、现在、下一个、进行中。",
    tokens: [
      ["anibt-time", "蓝色笔画与点"],
      ["anibt-time-ink", "蓝字：分辨率、时间标签"],
      ["anibt-time-wash", "蓝色淡底"],
      ["anibt-time-wash2", "更深的蓝底"],
      ["anibt-time-line", "蓝色边"],
    ],
  },
  {
    title: "状态",
    tokens: [
      ["anibt-ok", "完成、做种：薄荷字"],
      ["anibt-ok-fill", "薄荷点"],
      ["anibt-ok-wash", "薄荷淡底"],
      ["anibt-warn", "需要注意：琥珀字"],
      ["anibt-warn-fill", "琥珀点"],
      ["anibt-warn-wash", "琥珀淡底"],
      ["anibt-danger-fill", "红点、错误轮廓"],
      ["anibt-danger-wash", "红色淡底：危险按钮、失败标签"],
      ["anibt-danger-line", "红色边"],
      ["anibt-tip", "提示气泡（夜樱反转为浅色）"],
      ["anibt-tip-ink", "提示气泡上的字"],
      ["anibt-scrim", "遮罩"],
    ],
  },
  {
    title: "贴纸与糖果",
    tokens: [
      ["anibt-sticker-edge", "贴纸的模切白边"],
      ["anibt-candy", "糖果渐变：主按钮、计数、勾选、开关"],
      ["anibt-candy-edge", "糖果的底边"],
      ["anibt-candy-glow", "糖果的光晕"],
      ["anibt-candy-ink", "糖果上的白字"],
      ["anibt-candy-text-shadow", "糖果字的投影"],
      ["anibt-water", "蓝色同款渐变"],
      ["anibt-water-edge", "蓝色底边"],
      ["anibt-water-text-shadow", "蓝色字投影"],
      ["anibt-gloss", "主按钮上半的高光"],
      ["anibt-sheen", "卡片悬停的扫光"],
      ["anibt-sleeve", "卡套反光"],
      ["anibt-sparkle", "✦ 遮罩"],
    ],
  },
  {
    title: "胶带、缝线与底纹",
    tokens: [
      ["anibt-tape", "和纸胶带的颜色"],
      ["anibt-tape-stripe", "胶带上的斜纹"],
      ["anibt-tape-fill", "胶带：唯一的「你在这里」"],
      ["anibt-stitch", "横向虚线缝线"],
      ["anibt-stitch-y", "纵向虚线缝线"],
      ["anibt-dot-a", "底纹粉点"],
      ["anibt-dot-b", "底纹蓝点"],
      ["anibt-dots", "点点底纹（夜樱是星空）"],
    ],
  },
  {
    title: "阴影与光晕",
    tokens: [
      ["anibt-shadow-sticker", "贴纸、拇指、提示"],
      ["anibt-shadow-panel", "面板"],
      ["anibt-shadow-lift", "指针下抬起的卡"],
      ["anibt-shadow-pop", "浮层"],
      ["anibt-ring-pink", "聚焦的粉色光晕"],
      ["anibt-ring-danger", "出错的红色光晕"],
    ],
  },
]

function swatchStyle(name: string, value: string): { kind: string; style: CSSProperties } {
  const ref = `var(--${name})`
  if (name.includes("shadow") && !name.includes("text-shadow")) return { kind: "shadow", style: { boxShadow: ref } }
  if (name.startsWith("anibt-ring")) return { kind: "shadow", style: { boxShadow: ref } }
  if (name.includes("text-shadow")) return { kind: "text", style: { textShadow: ref } }
  if (name === "anibt-sparkle")
    return {
      kind: "mask",
      style: { WebkitMask: `${ref} center / contain no-repeat`, mask: `${ref} center / contain no-repeat` },
    }
  if (name === "anibt-dots") return { kind: "image", style: { backgroundImage: ref, backgroundSize: "12px 12px", backgroundPosition: "0 0, 6px 6px" } }
  if (name === "anibt-stitch") return { kind: "image", style: { backgroundImage: ref, backgroundSize: "8px 1px", backgroundRepeat: "repeat-x", backgroundPosition: "0 50%" } }
  if (name === "anibt-stitch-y") return { kind: "image", style: { backgroundImage: ref, backgroundSize: "1px 8px", backgroundRepeat: "repeat-y", backgroundPosition: "50% 0" } }
  if (value.includes("gradient(")) return { kind: "image", style: { backgroundImage: ref } }
  return { kind: "color", style: { backgroundColor: ref } }
}

function Swatch({ name, value, mode }: { name: string; value: string; mode: "light" | "dark" }) {
  const { kind, style } = swatchStyle(name, value)
  return (
    <span className={cn(mode === "light" ? "site-light" : "dark", "inline-flex flex-none")}>
      <span
        aria-hidden="true"
        className={cn(
          "inline-grid size-7 place-items-center rounded-[6px] bg-card text-[12px] font-bold text-anibt-candy-ink",
          kind === "color" && "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]",
          kind === "image" && "shadow-[inset_0_0_0_1px_var(--border)]",
          kind === "shadow" && "m-1 size-5",
          kind === "mask" && "bg-anibt-mark",
          kind === "text" && "anibt-candy font-anibt-display"
        )}
        style={style}
      >
        {kind === "text" ? "A" : null}
      </span>
    </span>
  )
}

function Value({ value }: { value: string | undefined }) {
  if (value === undefined) return <span className="text-muted-foreground">—</span>
  return (
    <code title={value} className="anibt-ell block font-mono text-[12px] text-anibt-ink2">
      {value.startsWith("url(") ? "url(✦ svg)" : value}
    </code>
  )
}

export function TokenTable({ groups }: { groups: "standard" | "extras" }) {
  const vars = getThemeVars()
  const list = groups === "standard" ? STANDARD_GROUPS : EXTRA_GROUPS

  return (
    <div className="not-prose my-6 flex flex-col gap-5">
      {list.map((group) => (
        <div key={group.title} className="anibt-sheet overflow-hidden">
          <div className="anibt-stitch-under flex flex-wrap items-baseline gap-x-3 gap-y-1 px-4 py-3">
            <h3 className="text-[14px] font-bold">{group.title}</h3>
            {group.note ? <p className="text-[12px] text-muted-foreground">{group.note}</p> : null}
          </div>
          <div role="table" aria-label={group.title}>
            <div role="row" className="anibt-th hidden grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.4fr)] lg:grid">
              <span role="columnheader">Token</span>
              <span role="columnheader">白樱</span>
              <span role="columnheader">夜樱</span>
              <span role="columnheader">职责</span>
            </div>
            {group.tokens.map(([name, role]) => {
              const light = vars.light[name]
              const dark = vars.dark[name]
              return (
                <div
                  role="row"
                  key={name}
                  className="anibt-tr grid-cols-2 gap-x-3 gap-y-2 py-2.5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.4fr)]"
                >
                  <code role="cell" className="col-span-2 font-mono text-[13px] font-semibold lg:col-span-1">
                    --{name}
                  </code>
                  <span role="cell" className="flex min-w-0 items-center gap-2">
                    {light !== undefined ? <Swatch name={name} value={light} mode="light" /> : null}
                    <Value value={light} />
                  </span>
                  <span role="cell" className="flex min-w-0 items-center gap-2">
                    {dark !== undefined ? <Swatch name={name} value={dark} mode="dark" /> : null}
                    <Value value={dark} />
                  </span>
                  <span role="cell" className="col-span-2 text-[13px] text-anibt-ink2 lg:col-span-1">
                    {role}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

/** The `@theme inline` keys the theme adds (fonts, motion, colour aliases). */
export function ThemeKeysTable() {
  const { theme } = getThemeVars()
  const keys = Object.entries(theme).filter(([name]) => !name.startsWith("color-"))
  return (
    <div className="not-prose anibt-sheet my-6 overflow-hidden">
      <div role="table" aria-label="@theme inline">
        <div role="row" className="anibt-th hidden grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:grid">
          <span role="columnheader">Tailwind 主题键</span>
          <span role="columnheader">值</span>
        </div>
        {keys.map(([name, value]) => (
          <div role="row" key={name} className="anibt-tr grid-cols-1 gap-1 py-2.5 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-3">
            <code role="cell" className="font-mono text-[13px] font-semibold">
              --{name}
            </code>
            <span role="cell" className="min-w-0">
              <Value value={value} />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
