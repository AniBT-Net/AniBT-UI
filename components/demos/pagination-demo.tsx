"use client"

import { useState } from "react"

import { Pager } from "@/registry/anibt/ui/pagination"

export default function PaginationDemo() {
  const [page, setPage] = useState(3)

  return (
    <div className="flex flex-col items-center gap-3">
      <Pager page={page} pageCount={12} onPageChange={setPage} />
      <p className="anibt-num text-[12px] text-muted-foreground">第 {page} / 12 页</p>
    </div>
  )
}
