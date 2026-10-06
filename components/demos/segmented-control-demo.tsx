"use client"

import { Columns2Icon, EyeIcon, PencilLineIcon } from "lucide-react"
import { useState } from "react"

import { SegmentedControl } from "@/registry/anibt/ui/segmented-control"

const VIEWS = [
  { value: "write", label: "编写", icon: PencilLineIcon },
  { value: "split", label: "分栏", icon: Columns2Icon },
  { value: "preview", label: "预览", icon: EyeIcon },
] as const

type View = (typeof VIEWS)[number]["value"]

export default function SegmentedControlDemo() {
  const [view, setView] = useState<View>("split")

  return <SegmentedControl aria-label="编辑器视图" options={VIEWS} value={view} onValueChange={setView} />
}
