/**
 * The one public URL of the site and the registry.
 *
 * It feeds the `homepage` of `registry.json`, every install snippet on the
 * site and the `components.json` example. It must match the domain the site
 * is served from on Cloudflare: set `NEXT_PUBLIC_SITE_URL` in the Pages build
 * environment if that is not `https://ui.anibt.net`.
 *
 * Plain ESM so `scripts/registry-theme.mjs` (Node, no bundler) and the Next.js
 * app read the same constant.
 */
const DEFAULT_SITE_URL = "https://ui.anibt.net"

/** @type {string} */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "")

/** The namespace URL template a consumer puts in `components.json`. */
export const REGISTRY_URL_TEMPLATE = `${SITE_URL}/r/{name}.json`
