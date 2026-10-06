import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/registry/anibt/ui/button"

export default function ButtonAsChild() {
  return (
    <Button variant="secondary" asChild>
      <a href="https://anibt.net" target="_blank" rel="noreferrer">
        打开 AniBT
        <ArrowUpRightIcon />
      </a>
    </Button>
  )
}
