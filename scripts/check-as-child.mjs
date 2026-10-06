#!/usr/bin/env node
/**
 * Guards the registry sources against the shadcn CLI's Base UI transform.
 *
 *   node scripts/check-as-child.mjs        fail on a literal `asChild` attribute
 *   node scripts/check-as-child.mjs --fix  rewrite each one as a spread
 *
 * When a consumer's `components.json` style starts with `base-` (the default
 * for `shadcn init` since 4.x), `shadcn add` runs every installed file through
 * a transform that removes the `asChild` attribute from each non-self-closing
 * JSX element and turns its child into a `render` prop (shadcn 4.21.2,
 * `@shadcn/registry`). Our components are built on Radix, so that strips
 * `asChild` from Radix primitives: `<TooltipPrimitive.Trigger asChild>` then
 * renders its own <button> around ours. The transform only reads a literal
 * attribute, so a spread (`{...{ asChild: true }}`) passes through untouched.
 */
import { readdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import ts from "typescript"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const SOURCE_DIR = path.join(ROOT, "registry")
const fix = process.argv.includes("--fix")

async function listSources(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) return listSources(full)
      return entry.name.endsWith(".tsx") ? [full] : []
    })
  )
  return files.flat()
}

/** Every literal `asChild` attribute on a JSX element that has a closing tag. */
function findAttributes(sourceFile) {
  const found = []
  const visit = (node) => {
    if (ts.isJsxElement(node)) {
      for (const attribute of node.openingElement.attributes.properties) {
        if (ts.isJsxAttribute(attribute) && attribute.name.getText(sourceFile) === "asChild") {
          found.push(attribute)
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFile)
  return found
}

const problems = []
for (const file of await listSources(SOURCE_DIR)) {
  let text = await readFile(file, "utf8")
  const sourceFile = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const attributes = findAttributes(sourceFile)
  if (attributes.length === 0) continue

  if (!fix) {
    for (const attribute of attributes) {
      const { line } = sourceFile.getLineAndCharacterOfPosition(attribute.getStart(sourceFile))
      problems.push(`${path.relative(ROOT, file)}:${line + 1}: ${attribute.getText(sourceFile)}`)
    }
    continue
  }

  // Rewrite from the end so earlier offsets stay valid.
  for (const attribute of [...attributes].sort((a, b) => b.getStart(sourceFile) - a.getStart(sourceFile))) {
    const initializer = attribute.initializer
    const value = initializer
      ? ts.isJsxExpression(initializer)
        ? initializer.expression.getText(sourceFile)
        : initializer.getText(sourceFile)
      : "true"
    const replacement = `{...{ asChild: ${value} }}`
    text = text.slice(0, attribute.getStart(sourceFile)) + replacement + text.slice(attribute.getEnd())
  }
  await writeFile(file, text)
  console.log(`fixed ${attributes.length} in ${path.relative(ROOT, file)}`)
}

if (problems.length) {
  console.error(
    "check-as-child: a literal `asChild` attribute is removed by `shadcn add` in base-* projects.\n" +
      "Write it as a spread, `{...{ asChild: true }}`, or run `node scripts/check-as-child.mjs --fix`:\n  " +
      problems.join("\n  ")
  )
  process.exit(1)
}
if (!fix) console.log("check-as-child: ok")
