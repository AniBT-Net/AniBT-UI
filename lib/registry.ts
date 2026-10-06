import { readFileSync } from "node:fs"
import path from "node:path"

import rootRegistry from "@/registry.json"
import themeRegistry from "@/registry/anibt/theme/registry.json"

/**
 * Build-time reads of the registry source, so the docs never restate what an
 * item installs: dependencies, registry dependencies, files and the theme's
 * tokens all come from `registry.json` (and its generated theme include).
 */

type RegistryFile = { path: string; type: string; target?: string }

export type RegistryItem = {
  name: string
  type: string
  title?: string
  description?: string
  dependencies?: string[]
  registryDependencies?: string[]
  files?: RegistryFile[]
}

const items: RegistryItem[] = [...(themeRegistry.items as RegistryItem[]), ...(rootRegistry.items as RegistryItem[])]

export function getRegistryItem(name: string): RegistryItem {
  const item = items.find((candidate) => candidate.name === name)
  if (!item) throw new Error(`Unknown registry item "${name}"`)
  return item
}

export function listComponentItems() {
  return items.filter((item) => item.type === "registry:ui")
}

/** Where `shadcn add` writes a `registry:ui` file in a default project. */
export function defaultTarget(file: RegistryFile) {
  return file.target ?? `components/ui/${path.basename(file.path)}`
}

/** A registry file's source as a consumer receives it (imports rewritten to
    the default `@/components/ui` alias, as the CLI does). */
export function readItemSource(file: RegistryFile) {
  return toConsumerImports(readFileSync(path.join(process.cwd(), file.path), "utf8"))
}

export function toConsumerImports(code: string) {
  return code.replaceAll("@/registry/anibt/ui/", "@/components/ui/")
}

type CssVars = { theme: Record<string, string>; light: Record<string, string>; dark: Record<string, string> }

export function getThemeVars(): CssVars {
  return (themeRegistry.items[0] as unknown as { cssVars: CssVars }).cssVars
}
