import { ChevronsUpDownIcon } from "lucide-react"

import { Button } from "@/registry/anibt/ui/button"

export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>default</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="outline">outline</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="destructive">destructive</Button>
      <Button variant="link">link</Button>
      <Button variant="field" className="w-36 justify-between">
        简体中文
        <ChevronsUpDownIcon className="text-muted-foreground" />
      </Button>
    </div>
  )
}
