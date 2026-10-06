"use client"

import { CopyIcon, MagnetIcon, Settings2Icon, TextIcon, TicketIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/registry/anibt/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/anibt/ui/dropdown-menu"

export default function DropdownMenuOptions() {
  const [columns, setColumns] = useState({ group: true, size: true, date: false })
  const [sort, setSort] = useState("latest")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          <Settings2Icon />
          列表设置
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="start">
        <DropdownMenuLabel>显示的列</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={columns.group}
          onCheckedChange={(checked) => setColumns((current) => ({ ...current, group: checked }))}
          onSelect={(event) => event.preventDefault()}
        >
          字幕组
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={columns.size}
          onCheckedChange={(checked) => setColumns((current) => ({ ...current, size: checked }))}
          onSelect={(event) => event.preventDefault()}
        >
          文件大小
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={columns.date}
          onCheckedChange={(checked) => setColumns((current) => ({ ...current, date: checked }))}
          onSelect={(event) => event.preventDefault()}
        >
          发布时间
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>排序</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
          <DropdownMenuRadioItem value="latest">最新发布</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="seeders">做种最多</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="size">文件最大</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <CopyIcon />
            复制为…
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-44">
            <DropdownMenuItem>
              <MagnetIcon />
              磁力链接
            </DropdownMenuItem>
            <DropdownMenuItem>
              <TicketIcon />
              种子链接
            </DropdownMenuItem>
            <DropdownMenuItem>
              <TextIcon />
              资源标题
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem disabled>
          <Settings2Icon />
          高级设置（即将推出）
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
