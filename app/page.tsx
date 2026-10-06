import {
  ArrowRightIcon,
  BellIcon,
  DownloadIcon,
  HeartIcon,
  PaletteIcon,
  RssIcon,
  SparklesIcon,
  Trash2Icon,
  UploadIcon,
  WandSparklesIcon,
} from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

import { CommandLine } from "@/components/site/command-line"
import { MascotPeek } from "@/components/site/mascot-peek"
import { SectionHead } from "@/components/site/section-head"
import { Sparkle } from "@/components/site/sparkle"
import { addCommand, GITHUB_URL, REGISTRY_URL_TEMPLATE } from "@/lib/site"
import { Badge, StatusBadge, StatusDot } from "@/registry/anibt/ui/badge"
import { Button } from "@/registry/anibt/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/anibt/ui/card"

const LEGEND = [
  { dot: "bg-anibt-mark", label: "操作 · 选中" },
  { dot: "bg-anibt-time", label: "时间 · 进行中" },
  { dot: "bg-anibt-ok-fill", label: "完成 · 做种" },
  { dot: "bg-anibt-danger-fill", label: "危险 · 失败" },
]

const TONIGHT = [
  { title: "药屋少女的呢喃 第三季", time: "23:30", tag: "1080p", status: <StatusBadge tone="ok">已更新</StatusBadge> },
  { title: "葬送的芙莉莲 第二季", time: "23:45", tag: "2160p", status: <StatusBadge tone="run">搬运中</StatusBadge> },
  { title: "间谍过家家 第三季", time: "24:15", tag: "1080p", status: <StatusBadge tone="warn">延期</StatusBadge> },
]

/** The hero's showcase: a real @anibt card with the mascot peeking over it. */
function TonightCard() {
  return (
    <div className="relative mx-auto w-full max-w-[460px] pt-2 lg:mr-0">
      <MascotPeek className="relative z-0 mx-auto -mb-[26px] lg:mr-14" size={128} />
      <Card className="relative z-10">
        <CardHeader stitched>
          <CardTitle>今晚更新</CardTitle>
          <CardDescription>周六 · 2026 秋 · 你订阅的 3 部</CardDescription>
          <CardAction>
            <Badge variant="water" tilt={3}>
              NOW
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col">
          {TONIGHT.map((show) => (
            <div key={show.title} className="anibt-stitch-under flex items-center gap-3 py-2.5 last:bg-none">
              <span className="anibt-num w-11 flex-none text-[13px] font-semibold text-anibt-time-ink">{show.time}</span>
              <div className="min-w-0 flex-1">
                <div className="anibt-ell text-[14px] font-bold">{show.title}</div>
                <div className="mt-1 flex items-center gap-1.5">
                  <Badge variant="res">{show.tag}</Badge>
                  <Badge variant="lang" face="text">
                    简中
                  </Badge>
                </div>
              </div>
              {show.status}
            </div>
          ))}
        </CardContent>
        <CardFooter stitched className="justify-end">
          <Button variant="ghost" size="sm">
            全部时间表
          </Button>
          <Button size="sm">
            <RssIcon />
            订阅
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function KitCell({ caption, href, children, className }: { caption: string; href?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`min-w-0 ${className ?? ""}`}>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[12px] font-semibold tracking-[0.04em] text-muted-foreground">{caption}</span>
        {href ? (
          <Link
            href={href}
            className="ml-auto inline-flex items-center gap-1 rounded-[6px] px-1.5 text-[12px] font-semibold text-anibt-ink2 hover:bg-accent hover:text-accent-foreground"
          >
            文档
            <ArrowRightIcon className="size-3" aria-hidden="true" />
          </Link>
        ) : null}
      </div>
      {children}
    </div>
  )
}

function Hint({ children }: { children: ReactNode }) {
  return <span className="w-9 flex-none text-[12px] text-muted-foreground">{children}</span>
}

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-[clamp(16px,3vw,32px)]">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="grid items-center gap-10 pt-8 pb-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16 lg:pt-10">
        <div className="relative">
          <Badge variant="candy" tilt={-3} face="text" className="mb-4">
            <SparklesIcon aria-hidden="true" />
            SHADCN REGISTRY · @anibt
          </Badge>
          <h1 className="text-[34px] leading-[1.2] font-extrabold tracking-[0.01em] sm:text-[40px]">
            <span className="relative inline-block">
              AniBT UI
              <Sparkle className="-top-1 -right-5 size-4" />
              <Sparkle tone="blue" delay="1.1s" className="top-5 -right-9 size-2.5" />
            </span>
            <span className="block text-[22px] leading-[1.4] font-extrabold text-anibt-ink2 sm:text-[26px]">
              贴纸手账，装进你的 shadcn 项目
            </span>
          </h1>
          <p className="mt-4 max-w-[560px] text-[15px] leading-[1.75] text-anibt-ink2">
            AniBT 站点的界面语言做成组件库：模切白边贴纸、糖果光泽按钮、和纸胶带标记当前位置、缝线分隔的面板。白樱与夜樱两套颜色，token
            落在 shadcn 的标准名字上，一条命令装进任何 shadcn 项目。
          </p>
          <ul aria-label="颜色分工" className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-muted-foreground">
            {LEGEND.map((item) => (
              <li key={item.label} className="inline-flex items-center gap-1.5">
                <i aria-hidden="true" className={`inline-block size-2 rounded-[2px] ${item.dot}`} />
                {item.label}
              </li>
            ))}
          </ul>
          <CommandLine command={addCommand("button")} className="mt-6 max-w-[520px]" />
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button size="lg" asChild>
              <Link href="/docs">
                <WandSparklesIcon />
                快速开始
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/docs/components">浏览组件</Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </Button>
          </div>
        </div>
        <TonightCard />
      </section>

      {/* ── Components ───────────────────────────────────────────────────── */}
      <section aria-labelledby="kit" className="pb-14">
        <SectionHead
          id="kit"
          icon={SparklesIcon}
          title="组件"
          meta="同一只手画的：控件 28 / 32 · 圆角 6 / 10 / 14 · 图标 16"
          action={
            <Button variant="ghost" size="sm" asChild>
              <Link href="/docs/components">
                全部组件
                <ArrowRightIcon />
              </Link>
            </Button>
          }
        />
        <div className="anibt-sheet px-4">
          <div className="grid gap-8 py-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <KitCell caption="按钮" href="/docs/components/button">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Button>
                    <UploadIcon />
                    发布资源
                  </Button>
                  <Button variant="secondary">
                    <RssIcon />
                    订阅 RSS
                  </Button>
                  <Button variant="ghost">取消</Button>
                  <Button variant="destructive">
                    <Trash2Icon />
                    删除
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Hint>小号</Hint>
                  <Button size="sm">小号</Button>
                  <Button size="sm" variant="secondary">
                    小号
                  </Button>
                  <Button size="icon" variant="secondary" aria-label="下载">
                    <DownloadIcon />
                  </Button>
                  <Button size="icon" variant="ghost" aria-label="收藏">
                    <HeartIcon className="fill-current text-anibt-mark" />
                  </Button>
                  <Button loading>保存</Button>
                </div>
              </div>
            </KitCell>
            <KitCell caption="计数 · 提醒">
              <div className="flex flex-wrap items-center gap-3">
                <span className="relative inline-flex">
                  <Button size="icon" variant="ghost" aria-label="通知，3 条未读">
                    <BellIcon />
                  </Button>
                  <Badge variant="count" aria-hidden="true" className="absolute -top-1.5 -right-1.5">
                    3
                  </Badge>
                </span>
                <Badge variant="count">12</Badge>
                <Badge variant="count">99+</Badge>
                <Badge variant="count-quiet">128</Badge>
              </div>
            </KitCell>
          </div>
          <div className="anibt-stitch-over grid gap-8 py-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <KitCell caption="标签 · 贴纸" href="/docs/components/badge">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="res">1080p</Badge>
                  <Badge variant="lang" face="text">
                    简中
                  </Badge>
                  <Badge face="text">内封字幕</Badge>
                  <Badge>MKV</Badge>
                  <Badge variant="success" face="text">
                    完结
                  </Badge>
                  <Badge variant="destructive" face="text">
                    失效
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="sticker" tilt={-4}>
                    ANIME
                  </Badge>
                  <Badge variant="candy" tilt={3}>
                    ✦ 推荐
                  </Badge>
                  <Badge variant="water" tilt={-2}>
                    周六 23:30
                  </Badge>
                </div>
              </div>
            </KitCell>
            <KitCell caption="状态">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone="ok">已同步</StatusBadge>
                  <StatusBadge tone="run">同步中</StatusBadge>
                  <StatusBadge tone="fail">同步失败</StatusBadge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-[12px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <StatusDot variant="ok" />
                    做种 12
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <StatusDot variant="time" />
                    今晚更新
                  </span>
                </div>
              </div>
            </KitCell>
          </div>
          <div className="anibt-stitch-over grid gap-8 py-5 md:grid-cols-2 lg:grid-cols-3">
            <KitCell caption="卡片 · 面板" href="/docs/components/card" className="lg:col-span-2">
              <div className="grid gap-3 sm:grid-cols-2">
                <Card variant="well" density="compact">
                  <CardHeader>
                    <CardTitle className="text-[14px]">字幕</CardTitle>
                    <CardDescription>简繁内封优先</CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-1.5">
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
                    <CardTitle className="text-[14px]">画质</CardTitle>
                    <CardDescription>不低于 1080p</CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-1.5">
                    <Badge variant="res">1080p</Badge>
                    <Badge variant="res">2160p</Badge>
                  </CardContent>
                </Card>
              </div>
            </KitCell>
            <KitCell caption="即将推出">
              <p className="text-[13px] leading-[1.7] text-anibt-ink2">
                输入、选择、勾选、开关、页签、分段、对话框、菜单、提示、轻提示、命令面板……按 AniBT 站内的同一套配方陆续加入。
              </p>
            </KitCell>
          </div>
        </div>
      </section>

      {/* ── Get started ──────────────────────────────────────────────────── */}
      <section aria-labelledby="start" className="pb-6">
        <SectionHead
          id="start"
          icon={PaletteIcon}
          tone="blue"
          title="三步装进项目"
          meta="任何已经 shadcn init 的 React 项目"
          action={
            <Button variant="ghost" size="sm" asChild>
              <Link href="/docs">
                完整说明
                <ArrowRightIcon />
              </Link>
            </Button>
          }
        />
        <ol className="grid gap-4 lg:grid-cols-3">
          <li className="anibt-sheet flex min-w-0 flex-col gap-3 p-4">
            <StepTitle n={1}>登记 @anibt 命名空间</StepTitle>
            <p className="text-[13px] text-anibt-ink2">
              在 <code className="font-mono text-[12px]">components.json</code> 的{" "}
              <code className="font-mono text-[12px]">registries</code> 里登记 @anibt，CLI 就知道去哪找组件。也可以让 CLI 替你写：
            </p>
            <CommandLine command={`npx shadcn@latest registry add @anibt=${REGISTRY_URL_TEMPLATE}`} />
          </li>
          <li className="anibt-sheet flex min-w-0 flex-col gap-3 p-4">
            <StepTitle n={2}>装上主题</StepTitle>
            <p className="text-[13px] text-anibt-ink2">
              白樱写进 <code className="font-mono text-[12px]">:root</code>、夜樱写进{" "}
              <code className="font-mono text-[12px]">.dark</code>，再加上贴纸、胶带、缝线这些配方。
            </p>
            <CommandLine command={addCommand("theme")} />
          </li>
          <li className="anibt-sheet flex min-w-0 flex-col gap-3 p-4">
            <StepTitle n={3}>按需添加组件</StepTitle>
            <p className="text-[13px] text-anibt-ink2">代码落在你的项目里，随便改。组件会自动带上它依赖的主题。</p>
            <CommandLine command={addCommand("button", "badge", "card")} />
          </li>
        </ol>
      </section>
    </div>
  )
}

function StepTitle({ n, children }: { n: number; children: ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 text-[16px] leading-[1.4] font-extrabold">
      <span aria-hidden="true" className="anibt-count">
        {n}
      </span>
      {children}
    </h3>
  )
}
