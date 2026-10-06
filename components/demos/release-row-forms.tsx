import { ReleaseRow, ReleaseRowList } from "@/registry/anibt/blocks/release-row/release-row"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/anibt/ui/card"

const magnet = "magnet:?xt=urn:btih:9f0e6c1b2a3d4e5f60718293a4b5c6d7e8f90a1b"

export default function ReleaseRowForms() {
  return (
    <div className="grid w-full items-start gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
      <div className="flex flex-col gap-2">
        <p className="text-[12px] font-semibold text-muted-foreground">stacked：窄栏里的手机版式</p>
        <ReleaseRowList>
          <ReleaseRow
            form="stacked"
            href="#release-s"
            cover="/demo/covers/mecha-dawn.svg"
            title="[星空字幕组] 机甲黎明 07 / Mecha Dawn [09][1080p][简繁内封]"
            publisher="星空字幕组"
            episode="第 9 集"
            resolution="1080p"
            languages={["简", "繁"]}
            subtitleType="内封字幕"
            fileSize="1.21 GB"
            seeders={42}
            leechers={3}
            time="3 小时前"
            magnet={magnet}
            torrentHref="#torrent-s"
          />
        </ReleaseRowList>
      </div>
      <Card density="compact" className="pb-1">
        <CardHeader stitched>
          <CardTitle className="text-[14px]">星空字幕组 · 简繁内封</CardTitle>
        </CardHeader>
        <CardContent className="px-1">
          <ReleaseRowList plain>
            {[9, 8, 7].map((episode) => (
              <ReleaseRow
                key={episode}
                form="compact"
                href={`#release-c${episode}`}
                title={`[星空字幕组] 机甲黎明 07 - 0${episode} [1080p][简繁内封]`}
                episode={`第 ${episode} 集`}
                resolution="1080p"
                fileSize={`${(1.1 + episode / 100).toFixed(2)} GB`}
                time={episode === 9 ? "3 小时前" : `${10 - episode} 周前`}
                magnet={magnet}
                torrentHref={`#torrent-c${episode}`}
              />
            ))}
          </ReleaseRowList>
        </CardContent>
      </Card>
    </div>
  )
}
