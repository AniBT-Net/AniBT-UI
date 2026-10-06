import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"

import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { ThemeProvider } from "@/components/site/theme-provider"
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site"

import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · 贴纸手账组件库`,
    template: `%s`,
  },
  description: SITE_DESCRIPTION,
  icons: { icon: "/brand/mascot.webp" },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "zh_CN",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5fa" },
    { media: "(prefers-color-scheme: dark)", color: "#13111a" },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="anibt-ground flex min-h-dvh flex-col">
        <ThemeProvider>
          <SiteHeader />
          <main id="main" className="flex flex-1 flex-col">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
