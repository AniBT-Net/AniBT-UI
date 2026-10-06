import { Card } from "@/registry/anibt/ui/card"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/registry/anibt/ui/table"

const EPISODES = Array.from({ length: 12 }, (_, index) => ({
  episode: index + 1,
  title: ["出发", "末班车之后", "樱花的约定", "看不见的站台", "夜色的乘客", "终点站", "回程", "雨中", "第二次相遇", "沉默的车厢", "黎明", "夜樱"][index],
  size: 380 + ((index * 37) % 120),
  seeders: Math.max(3, 140 - index * 11),
}))

export default function TableSticky() {
  return (
    <Card className="w-full max-w-xl overflow-hidden py-0">
      <Table containerClassName="max-h-72">
        <TableHeader sticky>
          <TableRow>
            <TableHead numeric className="w-14">
              集
            </TableHead>
            <TableHead>标题</TableHead>
            <TableHead numeric>大小</TableHead>
            <TableHead numeric>做种</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {EPISODES.map((row) => (
            <TableRow key={row.episode}>
              <TableCell numeric>{String(row.episode).padStart(2, "0")}</TableCell>
              <TableCell className="text-foreground">{row.title}</TableCell>
              <TableCell numeric>{row.size} MB</TableCell>
              <TableCell numeric className="text-anibt-ok">
                {row.seeders}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>合计 12 集</TableCell>
            <TableCell numeric>5.4 GB</TableCell>
            <TableCell numeric>—</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Card>
  )
}
