import { CircleCheckIcon, InfoIcon, RefreshCwIcon, TriangleAlertIcon, XCircleIcon } from "lucide-react"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/registry/anibt/ui/alert"
import { Button } from "@/registry/anibt/ui/button"

export default function AlertDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <Alert variant="info" role="status">
        <InfoIcon />
        <AlertTitle>正在同步到 4 个外站</AlertTitle>
        <AlertDescription>完成后会在资源页显示每个站点的链接，大约需要两分钟。</AlertDescription>
      </Alert>
      <Alert variant="success" role="status">
        <CircleCheckIcon />
        <AlertTitle>发布成功</AlertTitle>
        <AlertDescription>夜樱终电 第 6 集已经出现在最新资源和 RSS 里。</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <TriangleAlertIcon />
        <AlertTitle>种子里有 2 个文件名不规范</AlertTitle>
        <AlertDescription>不影响发布，但外站可能识别不出集数。</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <XCircleIcon />
        <AlertTitle>动漫花园同步失败</AlertTitle>
        <AlertDescription>HTTP 502：上游连续 3 次没有响应。</AlertDescription>
        <AlertAction>
          <Button size="sm" variant="ghost" className="text-destructive">
            <RefreshCwIcon />
            重试
          </Button>
        </AlertAction>
      </Alert>
      <Alert>
        <AlertTitle>草稿会保存在这台设备上</AlertTitle>
        <AlertDescription>换一台设备就看不到了。</AlertDescription>
      </Alert>
    </div>
  )
}
