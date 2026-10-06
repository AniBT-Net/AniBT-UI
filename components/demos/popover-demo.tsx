"use client"

import { CheckIcon, CopyIcon, RssIcon } from "lucide-react"
import { useState } from "react"

import { Badge } from "@/registry/anibt/ui/badge"
import { Button } from "@/registry/anibt/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/anibt/ui/popover"

const FEED = "https://anibt.net/rss/group/mmnc?res=1080p&lang=chs"

export default function PopoverDemo() {
  const [copied, setCopied] = useState(false)

  return (
    <Popover onOpenChange={() => setCopied(false)}>
      <PopoverTrigger asChild>
        <Button variant="secondary">
          <RssIcon />
          RSS 订阅
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <PopoverHeader>
          <PopoverTitle>订阅喵萌奶茶屋</PopoverTitle>
          <PopoverDescription>把链接粘贴到下载工具的 RSS 订阅里，新资源会自动下载。</PopoverDescription>
        </PopoverHeader>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="res">1080p</Badge>
          <Badge variant="lang" face="text">
            简中
          </Badge>
          <Badge face="text">内封</Badge>
        </div>
        <div className="flex items-center gap-2">
          <input
            readOnly
            aria-label="RSS 链接"
            value={FEED}
            className="anibt-input min-w-0 flex-1 font-mono text-[12px]"
            onFocus={(event) => event.currentTarget.select()}
          />
          <Button
            variant="secondary"
            size="icon"
            aria-label={copied ? "已复制" : "复制链接"}
            onClick={() => {
              void navigator.clipboard?.writeText(FEED).catch(() => undefined)
              setCopied(true)
            }}
          >
            {copied ? <CheckIcon className="text-anibt-ok" /> : <CopyIcon />}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
