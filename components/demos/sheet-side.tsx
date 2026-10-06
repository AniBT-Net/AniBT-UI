"use client"

import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react"

import { Button } from "@/registry/anibt/ui/button"
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/anibt/ui/sheet"

const SIDES = [
  { side: "top", label: "上", Icon: ArrowDownIcon },
  { side: "right", label: "右", Icon: ArrowLeftIcon },
  { side: "bottom", label: "下", Icon: ArrowUpIcon },
  { side: "left", label: "左", Icon: ArrowRightIcon },
] as const

export default function SheetSide() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:flex">
      {SIDES.map(({ side, label, Icon }) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="secondary">
              <Icon />
              从{label}边滑入
            </Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>今日放送</SheetTitle>
              <SheetDescription>side=&quot;{side}&quot;</SheetDescription>
            </SheetHeader>
            <SheetBody className="text-anibt-ink2">
              2026 年 10 月 6 日 周二 · 9 部番剧更新。贴在{label}边的面板只把远离边缘的两个角做圆。
            </SheetBody>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
