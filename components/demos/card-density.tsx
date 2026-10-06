import { Badge } from "@/registry/anibt/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/anibt/ui/card"

export default function CardDensity() {
  return (
    <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>默认 16 / 12</CardTitle>
          <CardDescription>页面里的面板</CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant="count-quiet">24</Badge>
        </CardContent>
      </Card>
      <Card density="compact">
        <CardHeader>
          <CardTitle>紧凑 12 / 8</CardTitle>
          <CardDescription>后台、工作台的密集卡</CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant="count-quiet">24</Badge>
        </CardContent>
      </Card>
    </div>
  )
}
