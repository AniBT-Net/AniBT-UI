"use client"

import { DownloadIcon, MagnetIcon, SmartphoneIcon } from "lucide-react"

import { Badge, StatusBadge } from "@/registry/anibt/ui/badge"
import { Button } from "@/registry/anibt/ui/button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/anibt/ui/drawer"

const FACTS = [
  ["字幕组", "喵萌奶茶屋"],
  ["大小", "1.2 GiB"],
  ["发布时间", "2026-10-06 21:30"],
  ["做种 / 下载", "128 / 9"],
]

export default function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">
          <SmartphoneIcon />
          打开资源抽屉
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto flex w-full max-w-md min-h-0 flex-1 flex-col">
          <DrawerHeader>
            <DrawerTitle>药屋少女的呢喃 第三季 · 第 12 集</DrawerTitle>
            <DrawerDescription>[喵萌奶茶屋] Kusuriya no Hitorigoto S3 - 12 [1080p][简繁内封]</DrawerDescription>
          </DrawerHeader>
          <DrawerBody className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-center gap-1.5 md:justify-start">
              <Badge variant="res">1080p</Badge>
              <Badge variant="res">HEVC</Badge>
              <Badge variant="lang" face="text">
                简繁内封
              </Badge>
              <StatusBadge tone="ok">做种健康</StatusBadge>
            </div>
            <dl className="anibt-well grid grid-cols-[auto_1fr] gap-x-4 px-3 py-1 text-[13px]">
              {FACTS.map(([term, detail]) => (
                <div key={term} className="anibt-stitch-under col-span-2 grid grid-cols-subgrid py-2 last:bg-none">
                  <dt className="text-muted-foreground">{term}</dt>
                  <dd className="anibt-num text-right text-foreground">{detail}</dd>
                </div>
              ))}
            </dl>
          </DrawerBody>
          <DrawerFooter>
            <Button size="lg">
              <MagnetIcon />
              复制磁力链接
            </Button>
            <Button size="lg" variant="secondary">
              <DownloadIcon />
              下载种子
            </Button>
            <DrawerClose asChild>
              <Button variant="ghost">关闭</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
