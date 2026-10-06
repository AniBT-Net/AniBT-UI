"use client"

import { DownloadIcon, FlagIcon, LinkIcon, MagnetIcon, MoreHorizontalIcon, RssIcon } from "lucide-react"

import { Button } from "@/registry/anibt/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/registry/anibt/ui/dropdown-menu"

export default function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" aria-label="更多操作">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>药屋少女的呢喃 第三季 · 12</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <MagnetIcon />
            复制磁力链接
            <DropdownMenuShortcut>M</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DownloadIcon />
            下载种子
            <DropdownMenuShortcut>D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LinkIcon />
            复制资源页链接
          </DropdownMenuItem>
          <DropdownMenuItem>
            <RssIcon />
            订阅这个字幕组
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <FlagIcon />
          举报资源
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
