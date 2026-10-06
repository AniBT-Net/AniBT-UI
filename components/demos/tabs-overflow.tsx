import { Tabs, TabsList, TabsTrigger } from "@/registry/anibt/ui/tabs"

const DAYS = ["全部", "周一", "周二", "周三", "周四", "周五", "周六", "周日"]

export default function TabsOverflow() {
  return (
    <Tabs defaultValue="周三" className="w-full max-w-[18rem]">
      <TabsList aria-label="番组表">
        {DAYS.map((day) => (
          <TabsTrigger key={day} value={day}>
            {day}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
