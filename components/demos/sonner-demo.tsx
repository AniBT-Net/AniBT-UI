"use client"

import { toast } from "sonner"

import { Button } from "@/registry/anibt/ui/button"
import { Toaster } from "@/registry/anibt/ui/sonner"

function publish() {
  return new Promise<{ title: string }>((resolve) =>
    setTimeout(() => resolve({ title: "葬送的芙莉莲 第二季 - 09" }), 1600)
  )
}

export default function SonnerDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {/* Mount one Toaster near the root of your app; it is here so the demo is self-contained. */}
      <Toaster position="bottom-right" />
      <Button
        variant="secondary"
        onClick={() => toast.success("已复制磁力链接", { description: "粘贴到下载工具即可开始" })}
      >
        成功
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.info("今晚 23:30 更新", { description: "间谍过家家 第三季 · 第 4 集" })}
      >
        信息
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.warning("RSS 密钥即将过期", { description: "还剩 3 天，可在设置里续期" })}
      >
        警告
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.error("发布失败", { description: "种子文件的 info hash 已经存在" })}
      >
        失败
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast("已删除 1 条资源", {
            description: "药屋少女的呢喃 第三季 - 12",
            action: { label: "撤销", onClick: () => toast.success("已恢复") },
          })
        }
      >
        带操作
      </Button>
      <Button
        onClick={() =>
          toast.promise(publish(), {
            loading: "正在发布…",
            success: (release) => ({ message: "发布成功", description: release.title }),
            error: "发布失败",
          })
        }
      >
        发布（进行中）
      </Button>
    </div>
  )
}
