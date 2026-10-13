import { REGISTRY_URL_TEMPLATE, SITE_URL } from "@/lib/site-url.mjs"

export { REGISTRY_URL_TEMPLATE, SITE_URL }

export const SITE_NAME = "AniBT UI"
export const SITE_DESCRIPTION =
  "AniBT 「贴纸手账」组件库：模切白边贴纸、糖果光泽按钮、和纸胶带标记当前位置。以 shadcn registry 分发，一条命令装进你的项目。"

export const GITHUB_URL = "https://github.com/OpenAniBT/ui"
export const ANIBT_URL = "https://anibt.net"

/** The CLI line a page shows for one item. */
export function addCommand(...names: string[]) {
  return `npx shadcn@latest add ${names.map((name) => `@anibt/${name}`).join(" ")}`
}

/** The `registries` entry a consumer adds to `components.json`. */
export const REGISTRIES_SNIPPET = JSON.stringify({ registries: { "@anibt": REGISTRY_URL_TEMPLATE } }, null, 2)

export type NavLink = {
  href: string
  label: string
  /** Paths that count as "here" for the tape. */
  match: (pathname: string) => boolean
  external?: boolean
}

const trim = (pathname: string) => pathname.replace(/\/+$/, "") || "/"

export const MAIN_NAV: NavLink[] = [
  {
    href: "/docs/components",
    label: "组件",
    match: (p) => trim(p).startsWith("/docs/components"),
  },
  {
    href: "/docs",
    label: "文档",
    match: (p) => trim(p) === "/docs",
  },
  {
    href: "/docs/theming",
    label: "主题",
    match: (p) => trim(p).startsWith("/docs/theming"),
  },
  {
    href: GITHUB_URL,
    label: "GitHub",
    match: () => false,
    external: true,
  },
]
