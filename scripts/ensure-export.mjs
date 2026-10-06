#!/usr/bin/env node
/**
 * Produce `out/` during `pnpm install` on Workers Builds.
 *
 * The connected Worker runs `pnpm install` and then `npx wrangler deploy`,
 * with no separate build command. `out/` is gitignored, and Workers Builds
 * does not run a `build.command` from `wrangler.jsonc`, so the deploy fails
 * looking for `out/` unless something earlier creates it.
 *
 * Workers Builds sets `WORKERS_CI=1` for the whole job, including install.
 * Local installs leave `out/` alone.
 */
import { existsSync } from "node:fs"
import { spawnSync } from "node:child_process"

const hasExport = existsSync("out/index.html") && existsSync("out/r/registry.json")

if (hasExport) {
  console.log("ensure-export: out/ already present")
  process.exit(0)
}

if (process.env.WORKERS_CI !== "1") {
  console.log("ensure-export: skip (out/ missing, not a Workers build)")
  process.exit(0)
}

console.log("ensure-export: WORKERS_CI=1 and out/ is missing, running pnpm build")
const result = spawnSync("pnpm", ["build"], { stdio: "inherit" })
process.exit(result.status === null ? 1 : result.status)
