import { Skeleton } from "@/registry/anibt/ui/skeleton"

export default function SkeletonDemo() {
  return (
    <div aria-busy="true" aria-label="正在加载订阅" className="anibt-sheet flex w-full max-w-md flex-col px-4 py-2">
      {[0, 1, 2].map((row) => (
        <div key={row} className="anibt-stitch-under flex items-center gap-3 py-3 last:bg-none">
          <Skeleton className="h-14 w-10 rounded-[6px]" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Skeleton shape="line" className="w-11/12" />
            <div className="flex gap-1.5">
              <Skeleton shape="pill" className="h-5 w-12" />
              <Skeleton shape="pill" className="h-5 w-10" />
              <Skeleton shape="line" className="h-3 w-20 self-center" />
            </div>
          </div>
          <Skeleton shape="circle" className="size-8" />
        </div>
      ))}
    </div>
  )
}
