import { BellIcon } from "lucide-react"

import { Badge } from "@/registry/anibt/ui/badge"
import { Button } from "@/registry/anibt/ui/button"

export default function BadgeCounts() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Badge variant="count">3</Badge>
      <Badge variant="count">99+</Badge>
      <Badge variant="count-quiet">128</Badge>
      <span className="relative inline-flex">
        <Button size="icon" variant="ghost" aria-label="通知，3 条未读">
          <BellIcon />
        </Button>
        <Badge variant="count" aria-hidden="true" className="absolute -top-1.5 -right-1.5">
          3
        </Badge>
      </span>
    </div>
  )
}
