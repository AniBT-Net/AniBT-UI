"use client"

import { Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/anibt/ui/alert-dialog"
import { Button } from "@/registry/anibt/ui/button"

export default function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2Icon />
          删除资源
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia tone="destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>删除这个资源？</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          药屋少女的呢喃 第三季 第 12 集会从发布列表和 RSS 中移除，已经下载的人不受影响。
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction variant="destructive">删除</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
