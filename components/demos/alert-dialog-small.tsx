"use client"

import { LogOutIcon } from "lucide-react"

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

export default function AlertDialogSmall() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <LogOutIcon />
          退出登录
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia tone="accent">
            <LogOutIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>退出登录？</AlertDialogTitle>
          <AlertDialogDescription>订阅和 RSS 密钥都会保留。</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>留下</AlertDialogCancel>
          <AlertDialogAction>退出</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
