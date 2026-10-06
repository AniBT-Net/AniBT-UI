import { Badge } from "@/registry/anibt/ui/badge"
import { Button } from "@/registry/anibt/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/anibt/ui/card"

export default function CardWell() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader stitched>
        <CardTitle>订阅设置</CardTitle>
        <CardDescription>面板里的分组用 well：只留 1px 边，不再抬起。</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        <Card variant="well" density="compact">
          <CardHeader>
            <CardTitle className="text-[14px]">字幕</CardTitle>
            <CardAction>
              <Button size="xs" variant="ghost">
                编辑
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-1.5">
            <Badge variant="lang" face="text">
              简中
            </Badge>
            <Badge variant="lang" face="text">
              繁中
            </Badge>
          </CardContent>
        </Card>
        <Card variant="well" density="compact">
          <CardHeader>
            <CardTitle className="text-[14px]">画质与格式</CardTitle>
            <CardAction>
              <Button size="xs" variant="ghost">
                编辑
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-1.5">
            <Badge variant="res">1080p</Badge>
            <Badge>MKV</Badge>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
