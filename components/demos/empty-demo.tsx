import { HeartIcon } from "lucide-react"

import { Button } from "@/registry/anibt/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/registry/anibt/ui/empty"

export default function EmptyDemo() {
  return (
    <Empty variant="note">
      <EmptyHeader>
        <EmptyMedia variant="peek">
          {/* eslint-disable-next-line @next/next/no-img-element -- your own picture goes here */}
          <img src="/brand/mascot.webp" alt="" width={112} height={112} />
        </EmptyMedia>
        <EmptyTitle>还没有追的番，去今日放送里挑一部吧</EmptyTitle>
        <EmptyDescription>订阅之后，新的一集会出现在这里。</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <HeartIcon />
          去挑番
        </Button>
      </EmptyContent>
    </Empty>
  )
}
