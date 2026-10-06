import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/registry/anibt/ui/alert"
import { Button } from "@/registry/anibt/ui/button"

export default function AlertInline() {
  return (
    <div className="flex w-full max-w-lg flex-col">
      <Alert inline variant="warning">
        <AlertDescription>这条资源的磁力链接已失效 3 天，换一个版本可能更快。</AlertDescription>
      </Alert>
      <Alert inline variant="destructive" className="border-t-0">
        <AlertTitle>同步失败：Nyaa</AlertTitle>
        <AlertDescription>上游返回 403，检查站点设置里的 API 密钥。</AlertDescription>
        <AlertAction>
          <Button size="xs" variant="secondary">
            去设置
          </Button>
        </AlertAction>
      </Alert>
      <Alert inline variant="info" role="status" className="border-t-0">
        <AlertDescription>下一集预计今晚 23:30 播出。</AlertDescription>
      </Alert>
    </div>
  )
}
