import { createMDX } from "fumadocs-mdx/next"

/**
 * Static export: `next build` writes the whole site to `out/`, including the
 * registry JSON that `shadcn build` put in `public/r/`. Cloudflare Pages
 * serves `out/` as-is.
 *
 * @type {import("next").NextConfig}
 */
const config = {
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
}

const withMDX = createMDX()

export default withMDX(config)
