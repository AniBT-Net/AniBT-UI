"use client"

import { CalendarDaysIcon, FilmIcon, MoonStarIcon, SearchIcon, SunIcon, UploadIcon, UsersIcon } from "lucide-react"
import { useEffect, useState } from "react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/registry/anibt/ui/command"

export default function CommandDialogDemo() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  const run = () => setOpen(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="anibt-field w-full max-w-xs cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <SearchIcon className="size-4 shrink-0" aria-hidden="true" />
        <span className="flex-1">搜索番剧、字幕组、资源</span>
        <kbd className="anibt-kbd">⌘K</kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="搜索番剧、字幕组、资源…">
          <kbd className="anibt-kbd">esc</kbd>
        </CommandInput>
        <CommandList>
          <CommandEmpty>没有找到相关结果</CommandEmpty>
          <CommandGroup heading="番剧">
            <CommandItem onSelect={run}>
              <FilmIcon />
              药屋少女的呢喃 第三季
              <CommandShortcut>Kusuriya no Hitorigoto</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={run}>
              <FilmIcon />
              葬送的芙莉莲 第二季
              <CommandShortcut>Sousou no Frieren</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={run}>
              <FilmIcon />
              间谍过家家 第三季
              <CommandShortcut>SPY×FAMILY</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="去往">
            <CommandItem onSelect={run}>
              <CalendarDaysIcon />
              今日放送
            </CommandItem>
            <CommandItem onSelect={run}>
              <UsersIcon />
              字幕组列表
            </CommandItem>
            <CommandItem onSelect={run}>
              <UploadIcon />
              发布资源
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="外观">
            <CommandItem onSelect={run}>
              <SunIcon />
              切换到白樱
            </CommandItem>
            <CommandItem onSelect={run}>
              <MoonStarIcon />
              切换到夜樱
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
