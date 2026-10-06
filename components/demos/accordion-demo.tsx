import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/anibt/ui/accordion"

export default function AccordionDemo() {
  return (
    <Accordion defaultValue="rss" className="max-w-lg">
      <AccordionItem value="rss">
        <AccordionTrigger>怎么用 RSS 订阅一部番？</AccordionTrigger>
        <AccordionContent>
          <p>在番剧页点「订阅 RSS」，挑好字幕组、语言和画质，把生成的地址填进 qBittorrent 的 RSS 下载器即可。</p>
          <p>新的一集发布后，下载器会自己开始下载。</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="magnet">
        <AccordionTrigger>磁力链接和种子文件有什么区别？</AccordionTrigger>
        <AccordionContent>
          磁力链接只是一段地址，需要先从别的用户那里拿到种子信息；种子文件已经带着这些信息，开始得更快。
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="claim">
        <AccordionTrigger>字幕组怎么认领开坑计划？</AccordionTrigger>
        <AccordionContent>
          进入工作台的「开坑计划」，搜索番剧并选择要做的集数范围。认领后会显示在番剧页的字幕组列表里。
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
