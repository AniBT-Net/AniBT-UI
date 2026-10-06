import { Progress } from "@/registry/anibt/ui/progress"

export default function ProgressDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Progress value={62} aria-label="上传进度" />
      <Progress value={38} tone="candy" aria-label="本月发布目标" />
      <Progress value={100} tone="ok" aria-label="同步完成" />
      <Progress value={45} size="compact" aria-label="下载进度" />
    </div>
  )
}
