import { Badge, StatusBadge } from "@/registry/anibt/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/anibt/ui/card"
import { EntityAvatar } from "@/registry/anibt/ui/entity-avatar"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableIdentity,
  TableRow,
} from "@/registry/anibt/ui/table"

const GROUPS = [
  { name: "喵萌奶茶屋", slug: "nekomoe", logo: "/demo/logos/paw.svg", langs: "简中·繁中", releases: 1284, month: 42, state: "ok" as const },
  { name: "绿茶字幕组", slug: "greentea", logo: "/demo/logos/leaf.svg", langs: "简中", releases: 612, month: 18, state: "run" as const },
  { name: "星空字幕组", slug: "xksub", logo: "/demo/logos/star.svg", langs: "简中·繁中", releases: 2093, month: 57, state: "ok" as const, selected: true },
  { name: "北宇治字幕组", slug: "kitauji", logo: null, langs: "简中·日", releases: 88, month: 0, state: "warn" as const },
]

const STATE = {
  ok: { tone: "ok" as const, word: "已同步" },
  run: { tone: "run" as const, word: "同步中" },
  warn: { tone: "warn" as const, word: "30 天未更新" },
}

export default function TableDemo() {
  return (
    <Card className="w-full max-w-2xl overflow-hidden pb-0">
      <CardHeader stitched>
        <CardTitle>字幕组</CardTitle>
        <CardDescription>本月发布最多的四个组</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>字幕组</TableHead>
              <TableHead>语言</TableHead>
              <TableHead numeric>资源</TableHead>
              <TableHead numeric>本月</TableHead>
              <TableHead>状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {GROUPS.map((group) => (
              <TableRow key={group.slug} data-state={group.selected ? "selected" : undefined}>
                <TableCell>
                  <TableIdentity
                    media={<EntityAvatar name={group.name} src={group.logo} shape="rounded" />}
                    title={group.name}
                    meta={`@${group.slug}`}
                  />
                </TableCell>
                <TableCell>
                  <Badge variant="lang" face="text">
                    {group.langs}
                  </Badge>
                </TableCell>
                <TableCell numeric>{group.releases.toLocaleString("en-US")}</TableCell>
                <TableCell numeric>{group.month}</TableCell>
                <TableCell>
                  <StatusBadge tone={STATE[group.state].tone}>{STATE[group.state].word}</StatusBadge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption className="mb-3">数字为 2026 年 10 月的统计</TableCaption>
        </Table>
      </CardContent>
    </Card>
  )
}
