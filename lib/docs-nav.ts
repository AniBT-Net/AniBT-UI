import type { Node, Root } from "fumadocs-core/page-tree"

import { source } from "@/lib/source"

export type DocsNavGroup = { label: string; items: Array<{ name: string; url: string }> }

/**
 * The docs order, from the fumadocs page tree (`meta.json`): a separator opens
 * a group; a folder contributes its index page, then its pages. The rail and
 * the previous / next links both read this, so they never disagree.
 */
export function getDocsNav(tree: Root = source.pageTree): DocsNavGroup[] {
  const groups: DocsNavGroup[] = []
  let current: DocsNavGroup | undefined

  const ensure = (label: string) => {
    if (!current) {
      current = { label, items: [] }
      groups.push(current)
    }
    return current
  }

  const visit = (node: Node) => {
    if (node.type === "separator") {
      current = { label: String(node.name ?? ""), items: [] }
      groups.push(current)
    } else if (node.type === "page") {
      ensure("文档").items.push({ name: String(node.name), url: node.url })
    } else if (node.type === "folder") {
      if (node.index) ensure(String(node.name)).items.push({ name: String(node.index.name), url: node.index.url })
      node.children.forEach(visit)
    }
  }

  tree.children.forEach(visit)
  return groups.filter((group) => group.items.length > 0)
}

export function getNeighbours(url: string) {
  const flat = getDocsNav().flatMap((group) => group.items)
  const index = flat.findIndex((item) => item.url === url)
  return {
    previous: index > 0 ? flat[index - 1] : undefined,
    next: index >= 0 ? flat[index + 1] : undefined,
  }
}
