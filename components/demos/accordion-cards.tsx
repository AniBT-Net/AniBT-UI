import { FileVideoIcon, LanguagesIcon, SubtitlesIcon } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/anibt/ui/accordion"
import { Badge } from "@/registry/anibt/ui/badge"

export default function AccordionCards() {
  return (
    <Accordion variant="cards" type="multiple" defaultValue={["video"]} className="max-w-lg">
      <AccordionItem value="video">
        <AccordionTrigger>
          <FileVideoIcon />
          视频
        </AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-1.5">
          <Badge variant="res">1080p</Badge>
          <Badge>HEVC</Badge>
          <Badge>10bit</Badge>
          <Badge>WebRip</Badge>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="audio">
        <AccordionTrigger>
          <LanguagesIcon />
          音轨
        </AccordionTrigger>
        <AccordionContent>日语 · AAC 2.0 · 48 kHz</AccordionContent>
      </AccordionItem>
      <AccordionItem value="subs">
        <AccordionTrigger>
          <SubtitlesIcon />
          字幕
        </AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-1.5">
          <Badge variant="lang" face="text">
            简中
          </Badge>
          <Badge variant="lang" face="text">
            繁中
          </Badge>
          <Badge face="text">内封字幕</Badge>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
