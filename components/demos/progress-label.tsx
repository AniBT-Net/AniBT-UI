import { Progress, ProgressLabel, ProgressValue } from "@/registry/anibt/ui/progress"

export default function ProgressLabelDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Progress value={3} max={5}>
        <ProgressLabel>同步到外站</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={72} tone="candy">
        <ProgressLabel>本季追番进度</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={null}>
        <ProgressLabel>正在解析种子</ProgressLabel>
        <ProgressValue>请稍候</ProgressValue>
      </Progress>
    </div>
  )
}
