#!/usr/bin/env node
/**
 * Builds the `@anibt/theme` registry item from `registry/anibt/theme/theme.css`
 * and keeps the root `registry.json` homepage on the site URL.
 *
 *   node scripts/registry-theme.mjs          write the generated files
 *   node scripts/registry-theme.mjs --check  fail if they are out of date
 *
 * Mapping (see the header of theme.css):
 *   @theme inline { --x: v }   → cssVars.theme.x
 *   :root { --x: v }           → cssVars.light.x
 *   .dark { --x: v }           → cssVars.dark.x
 *   :root / .dark plain decls  → css["@layer base"][":root" | ".dark"]
 *   @import / @keyframes / @utility / @layer base → css
 *
 * The shadcn CLI (4.21.x) writes `css` back with its own walker, which only
 * understands one level of rules inside an `@utility` and no at-rule with a
 * body inside one, and a JSON object cannot hold a property twice. Those
 * shapes are rejected here instead of being silently mangled on install.
 */
import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import postcss from "postcss"

import { SITE_URL } from "../lib/site-url.mjs"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const SOURCE = path.join(ROOT, "registry/anibt/theme/theme.css")
const ITEM_FILE = path.join(ROOT, "registry/anibt/theme/registry.json")
const ROOT_REGISTRY = path.join(ROOT, "registry.json")
// Site-only: the 白樱 values on a class, so a block of the docs can show
// 白樱 inside a 夜樱 page (`.dark` already does the reverse).
const LIGHT_SCOPE = path.join(ROOT, "app/theme-scope.generated.css")

const check = process.argv.includes("--check")
const errors = []

const squash = (text) => text.replace(/\s+/g, " ").trim()

function declValue(decl) {
  const value = squash(decl.value)
  return decl.important ? `${value} !important` : value
}

function put(target, key, value, where) {
  if (Object.hasOwn(target, key)) {
    errors.push(`${where}: "${key}" appears twice in one block`)
    return
  }
  target[key] = value
}

/** A block of declarations only (a keyframe step, a nested utility rule). */
function flatDecls(node, where) {
  const out = {}
  node.each((child) => {
    if (child.type === "comment") return
    if (child.type === "decl") {
      put(out, child.prop, declValue(child), where)
      return
    }
    errors.push(`${where}: nested ${child.type} "${child.selector ?? child.name}" is not supported here`)
  })
  return out
}

function utilityBody(node) {
  const where = `@utility ${node.params}`
  const out = {}
  node.each((child) => {
    if (child.type === "comment") return
    if (child.type === "decl") {
      put(out, child.prop, declValue(child), where)
    } else if (child.type === "rule") {
      put(out, squash(child.selector), flatDecls(child, `${where} ${squash(child.selector)}`), where)
    } else {
      errors.push(`${where}: at-rule "@${child.name}" inside a utility is not supported by the shadcn CLI`)
    }
  })
  return out
}

function keyframesBody(node) {
  const where = `@keyframes ${node.params}`
  const out = {}
  node.each((child) => {
    if (child.type === "comment") return
    if (child.type === "rule") {
      put(out, squash(child.selector), flatDecls(child, where), where)
      return
    }
    errors.push(`${where}: unexpected ${child.type}`)
  })
  return out
}

/** `@layer base` and the at-rules inside it (`@media …`). */
function layerBody(node, where, out = {}) {
  node.each((child) => {
    if (child.type === "comment") return
    if (child.type === "rule") {
      const selector = squash(child.selector)
      out[selector] = { ...(out[selector] ?? {}), ...flatDecls(child, `${where} ${selector}`) }
    } else if (child.type === "atrule" && child.nodes) {
      const key = `@${child.name} ${squash(child.params)}`
      out[key] = layerBody(child, `${where} ${key}`, out[key] ?? {})
    } else {
      errors.push(`${where}: unexpected ${child.type}`)
    }
  })
  return out
}

const source = await readFile(SOURCE, "utf8")
const root = postcss.parse(source, { from: SOURCE })

const cssVars = { theme: {}, light: {}, dark: {} }
const css = {}
const base = {}

root.each((node) => {
  if (node.type === "comment") return

  if (node.type === "atrule" && node.name === "import") {
    put(css, `@import ${squash(node.params)}`, {}, "top level")
    return
  }

  if (node.type === "atrule" && node.name === "theme") {
    node.each((decl) => {
      if (decl.type === "comment") return
      if (decl.type !== "decl" || !decl.prop.startsWith("--")) {
        errors.push(`@theme: only custom properties are allowed (${decl.prop ?? decl.type})`)
        return
      }
      put(cssVars.theme, decl.prop.slice(2), declValue(decl), "@theme")
    })
    return
  }

  if (node.type === "rule" && (node.selector === ":root" || node.selector === ".dark")) {
    const mode = node.selector === ":root" ? "light" : "dark"
    node.each((decl) => {
      if (decl.type === "comment") return
      if (decl.type !== "decl") {
        errors.push(`${node.selector}: nested ${decl.type} is not supported`)
        return
      }
      if (decl.prop.startsWith("--")) {
        put(cssVars[mode], decl.prop.slice(2), declValue(decl), node.selector)
      } else {
        base[node.selector] ??= {}
        put(base[node.selector], decl.prop, declValue(decl), node.selector)
      }
    })
    return
  }

  if (node.type === "atrule" && node.name === "keyframes") {
    put(css, `@keyframes ${node.params}`, keyframesBody(node), "top level")
    return
  }

  if (node.type === "atrule" && node.name === "utility") {
    put(css, `@utility ${node.params}`, utilityBody(node), "top level")
    return
  }

  if (node.type === "atrule" && node.name === "layer" && node.params === "base") {
    layerBody(node, "@layer base", base)
    return
  }

  errors.push(`top level: unsupported ${node.type} ${node.selector ?? `@${node.name} ${node.params}`}`)
})

// Every light token needs a dark twin and the other way round, or one mode
// silently inherits the other's value.
for (const key of Object.keys(cssVars.light)) {
  if (key !== "radius" && !Object.hasOwn(cssVars.dark, key)) errors.push(`--${key} is set for 白樱 but not for 夜樱`)
}
for (const key of Object.keys(cssVars.dark)) {
  if (!Object.hasOwn(cssVars.light, key)) errors.push(`--${key} is set for 夜樱 but not for 白樱`)
}

if (Object.keys(base).length) css["@layer base"] = base

if (errors.length) {
  console.error(`registry-theme: ${SOURCE} cannot be expressed as a registry item:`)
  for (const error of errors) console.error(`  - ${error}`)
  process.exit(1)
}

const item = {
  name: "theme",
  type: "registry:theme",
  title: "AniBT Theme (白樱 / 夜樱)",
  description:
    "AniBT 「贴纸手账」 design tokens on the standard shadcn names — 白樱 (light) on :root, 夜樱 (dark) on .dark — plus the anibt-* extras, recipes (@utility) and keyframes every @anibt component paints with.",
  author: "AniBT <https://anibt.net>",
  dependencies: ["@fontsource/fredoka"],
  cssVars,
  css,
  docs: "AniBT 主题已写入你的全局 CSS。可在 <body> 上加 anibt-ground 铺点点底纹（夜樱为星空）。Fredoka 来自 @fontsource/fredoka，汉字使用系统字体。",
  categories: ["theme"],
}

const itemRegistry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  items: [item],
}

const nextItemText = `${JSON.stringify(itemRegistry, null, 2)}\n`
const rootRegistry = JSON.parse(await readFile(ROOT_REGISTRY, "utf8"))
const nextRootText = `${JSON.stringify({ ...rootRegistry, homepage: SITE_URL }, null, 2)}\n`

const lightScopeLines = Object.entries(cssVars.light).map(([name, value]) => `  --${name}: ${value};`)
const nextScopeText = [
  "/* Generated by scripts/registry-theme.mjs from registry/anibt/theme/theme.css — do not edit. */",
  "/* Site-only: 白樱 on a class, for a block that must stay light inside a 夜樱 page. */",
  ".site-light {",
  "  color-scheme: light;",
  ...lightScopeLines,
  "}",
  "",
].join("\n")

const stale = []
const currentItemText = await readFile(ITEM_FILE, "utf8").catch(() => "")
if (currentItemText !== nextItemText) stale.push(path.relative(ROOT, ITEM_FILE))
const currentRootText = await readFile(ROOT_REGISTRY, "utf8")
if (currentRootText !== nextRootText) stale.push(path.relative(ROOT, ROOT_REGISTRY))
const currentScopeText = await readFile(LIGHT_SCOPE, "utf8").catch(() => "")
if (currentScopeText !== nextScopeText) stale.push(path.relative(ROOT, LIGHT_SCOPE))

if (check) {
  if (stale.length) {
    console.error(`registry-theme: out of date: ${stale.join(", ")} — run \`pnpm registry:theme\`.`)
    process.exit(1)
  }
  console.log("registry-theme: up to date.")
} else {
  if (currentItemText !== nextItemText) await writeFile(ITEM_FILE, nextItemText)
  if (currentRootText !== nextRootText) await writeFile(ROOT_REGISTRY, nextRootText)
  if (currentScopeText !== nextScopeText) await writeFile(LIGHT_SCOPE, nextScopeText)
  const counts = Object.entries(cssVars)
    .map(([mode, vars]) => `${mode} ${Object.keys(vars).length}`)
    .join(", ")
  console.log(
    `registry-theme: ${stale.length ? `wrote ${stale.join(", ")}` : "no changes"} (cssVars: ${counts}; css blocks: ${Object.keys(css).length}; homepage: ${SITE_URL}).`,
  )
}
