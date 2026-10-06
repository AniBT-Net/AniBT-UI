"use client"

import { BellPlusIcon, TagIcon, UsersIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/registry/anibt/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/anibt/ui/dialog"
import { MultiSelect } from "@/registry/anibt/ui/multi-select"
import { SearchableSelect } from "@/registry/anibt/ui/searchable-select"

const GROUPS = ["喵萌奶茶屋", "LoliHouse", "北宇治字幕组", "桜都字幕组", "千夏字幕组", "ANi"].map((name) => ({
  value: name,
  label: name,
}))

const TAGS = ["合集", "BDRip", "WebRip", "无修", "繁中", "外挂字幕"].map((name) => ({ value: name, label: name }))

const RESOLUTIONS = [
  { value: "any", label: "不限分辨率" },
  { value: "2160p", label: "2160p", description: "4K，文件最大" },
  { value: "1080p", label: "1080p", description: "大多数字幕组的首发" },
  { value: "720p", label: "720p", description: "适合手机" },
]

export default function MultiSelectDialog() {
  const [groups, setGroups] = useState<string[]>(["LoliHouse"])
  const [tags, setTags] = useState<string[]>([])
  const [resolution, setResolution] = useState("1080p")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <BellPlusIcon />
          订阅设置
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>订阅 葬送的芙莉莲 第二季</DialogTitle>
          <DialogDescription>符合条件的新资源会出现在你的 RSS 里。</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <span id="sub-groups" className="anibt-label">
              字幕组
            </span>
            <MultiSelect
              aria-labelledby="sub-groups"
              icon={<UsersIcon />}
              value={groups}
              onValueChange={setGroups}
              options={GROUPS}
              placeholder="全部字幕组"
              searchPlaceholder="搜索字幕组…"
            />
          </div>
          <div>
            <span id="sub-tags" className="anibt-label">
              标签
            </span>
            <MultiSelect
              aria-labelledby="sub-tags"
              icon={<TagIcon />}
              value={tags}
              onValueChange={setTags}
              options={TAGS}
              placeholder="全部标签"
              searchPlaceholder="搜索标签…"
            />
          </div>
          <div>
            <span id="sub-res" className="anibt-label">
              画质
            </span>
            <SearchableSelect
              aria-labelledby="sub-res"
              value={resolution}
              onValueChange={setResolution}
              options={RESOLUTIONS}
              searchPlaceholder="搜索…"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">取消</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>保存订阅</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
