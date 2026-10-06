// The site's `cn`, exactly what a stock `shadcn init` writes today. The
// registry items import `cn` from "@/lib/utils" and the CLI rewrites that to
// the consumer's own utils alias, so their helper is never replaced.
export { cn } from "cn"
