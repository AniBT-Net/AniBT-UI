import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/registry/anibt/ui/avatar"

const GROUPS = [
  { name: "喵萌奶茶屋", logo: "/demo/logos/paw.svg" },
  { name: "绿茶字幕组", logo: "/demo/logos/leaf.svg" },
  { name: "星空字幕组", logo: "/demo/logos/star.svg" },
  { name: "北宇治字幕组", logo: "/demo/logos/moon.svg" },
]

export default function AvatarGroupDemo() {
  return (
    <div className="flex flex-col items-start gap-5">
      <div className="flex items-center gap-3">
        <AvatarGroup>
          {GROUPS.map((group) => (
            <Avatar key={group.name} shape="rounded" title={group.name}>
              <AvatarImage src={group.logo} alt={group.name} />
              <AvatarFallback>{group.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
          ))}
          <AvatarGroupCount>+3</AvatarGroupCount>
        </AvatarGroup>
        <span className="text-[13px] text-anibt-ink2">7 个字幕组在做</span>
      </div>
      <div className="flex items-center gap-3">
        <AvatarGroup>
          <Avatar size="sm">
            <AvatarFallback>艾</AvatarFallback>
          </Avatar>
          <Avatar size="sm">
            <AvatarFallback>Yu</AvatarFallback>
          </Avatar>
          <Avatar size="sm">
            <AvatarFallback>栞</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+12</AvatarGroupCount>
        </AvatarGroup>
        <span className="text-[13px] text-anibt-ink2">15 人订阅</span>
      </div>
    </div>
  )
}
