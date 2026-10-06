import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/registry/anibt/ui/avatar"

export default function AvatarDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-end gap-4">
        <Avatar size="xs">
          <AvatarFallback>喵</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarImage src="/demo/logos/paw.svg" alt="喵萌奶茶屋" />
          <AvatarFallback>喵</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="/demo/logos/leaf.svg" alt="绿茶字幕组" />
          <AvatarFallback>绿</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>AN</AvatarFallback>
          <AvatarBadge tone="ok" />
        </Avatar>
        <Avatar size="xl" shape="rounded">
          <AvatarImage src="/demo/logos/star.svg" alt="星空字幕组" />
          <AvatarFallback>星空</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-4">
        <Avatar shape="rounded">
          <AvatarImage src="/demo/logos/moon.svg" alt="北宇治字幕组" />
          <AvatarFallback>北</AvatarFallback>
        </Avatar>
        <Avatar shape="rounded">
          <AvatarFallback>Lo</AvatarFallback>
        </Avatar>
        <Avatar rim={false}>
          <AvatarFallback>无</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
