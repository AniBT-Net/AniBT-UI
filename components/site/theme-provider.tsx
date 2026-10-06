"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type * as React from "react"

/** 白樱 (light, `:root`) and 夜樱 (dark, `.dark` on <html>). */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  )
}
