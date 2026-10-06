"use client"

import { CalendarDaysIcon, FilmIcon, KeyRoundIcon, RssIcon, SettingsIcon, UploadIcon, UsersIcon } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/registry/anibt/ui/command"

export default function CommandDemo() {
  return (
    <Command className="anibt-pop w-full max-w-md">
      <CommandInput placeholder="搜索番剧、字幕组、设置…" />
      <CommandList>
        <CommandEmpty>没有找到相关结果</CommandEmpty>
        <CommandGroup heading="番剧">
          <CommandItem>
            <FilmIcon />
            药屋少女的呢喃 第三季
            <CommandShortcut>12 集</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <FilmIcon />
            葬送的芙莉莲 第二季
            <CommandShortcut>9 集</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CalendarDaysIcon />
            今日放送
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="字幕组">
          <CommandItem>
            <UsersIcon />
            喵萌奶茶屋
          </CommandItem>
          <CommandItem>
            <UsersIcon />
            LoliHouse
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="操作">
          <CommandItem>
            <UploadIcon />
            发布资源
            <CommandShortcut>⌘U</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <RssIcon />
            我的 RSS
          </CommandItem>
          <CommandItem>
            <KeyRoundIcon />
            API 密钥
          </CommandItem>
          <CommandItem disabled>
            <SettingsIcon />
            站点设置（仅管理员）
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
