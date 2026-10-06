import { EntityAvatar } from "@/registry/anibt/ui/entity-avatar"

const ROWS = [
  { name: "喵萌奶茶屋", src: "/demo/logos/paw.svg", shape: "rounded" as const, meta: "字幕组 · 有 logo" },
  { name: "LoliHouse", src: null, shape: "rounded" as const, meta: "字幕组 · 两个拉丁字母" },
  { name: "北宇治字幕组", src: null, shape: "rounded" as const, meta: "字幕组 · 小尺寸只放一个汉字" },
  { name: "栞 Shiori", src: null, shape: "circle" as const, meta: "用户 · 圆形" },
]

export default function EntityAvatarDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      <ul className="flex flex-col">
        {ROWS.map((row) => (
          <li key={row.name} className="anibt-stitch-under flex items-center gap-3 py-2.5 last:bg-none">
            <EntityAvatar name={row.name} src={row.src} shape={row.shape} />
            <div className="min-w-0">
              <div className="anibt-ell text-[14px] font-semibold">{row.name}</div>
              <div className="text-[12px] text-muted-foreground">{row.meta}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-end gap-4">
        <EntityAvatar name="北宇治字幕组" shape="rounded" size="sm" />
        <EntityAvatar name="北宇治字幕组" shape="rounded" />
        <EntityAvatar name="北宇治字幕组" shape="rounded" size="lg" />
        <EntityAvatar name="北宇治字幕组" shape="rounded" size="xl" />
        <EntityAvatar name="喵萌奶茶屋" src="/demo/logos/paw.svg" shape="rounded" size="xl" priority />
      </div>
    </div>
  )
}
