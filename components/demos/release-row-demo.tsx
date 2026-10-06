import { ReleaseRow, ReleaseRowDateRule, ReleaseRowList } from "@/registry/anibt/blocks/release-row/release-row"
import { Badge } from "@/registry/anibt/ui/badge"

const magnet = (hash: string) => `magnet:?xt=urn:btih:${hash.padEnd(40, "0")}`

export default function ReleaseRowDemo() {
  return (
    <ReleaseRowList>
      <ReleaseRowDateRule
        label="今天"
        trailing={
          <Badge variant="candy" tilt={3} className="anibt-num">
            最新
          </Badge>
        }
      />
      <ReleaseRow
        href="#release-1"
        cover="/demo/covers/yozakura.svg"
        title="[喵萌奶茶屋&LoliHouse] 夜樱终电 / Yozakura: After the Last Train - 06 [WebRip 1080p HEVC-10bit AAC][简繁日内封字幕]"
        publisher={{ name: "喵萌奶茶屋", href: "#group-nekomoe" }}
        episode="第 6 集"
        resolution="1080p"
        languages={["简", "繁", "日"]}
        subtitleType="内封字幕"
        specs={["HEVC", "10bit", "WebRip", "AAC", "MKV"]}
        fileSize="783.6 MB"
        seeders={16}
        leechers={29}
        time="今天 18:08"
        dateTime="2026-10-06T18:08:00+08:00"
        magnet={magnet("5e1f2a")}
        torrentHref="#torrent-1"
      />
      <ReleaseRow
        href="#release-2"
        cover="/demo/covers/stardust-line.svg"
        title="[ANi] 星屑列车 - 12 [1080P][Baha][WEB-DL][AAC AVC][CHT][MP4]"
        publisher={{ name: "ANi", href: "#group-ani" }}
        episode="第 12 集"
        resolution="1080p"
        languages={["繁"]}
        subtitleType="内嵌字幕"
        specs={["AVC", "WEB-DL", "AAC", "MP4"]}
        fileSize="352.4 MB"
        seeders={66}
        leechers={5}
        time="今天 12:00"
        dateTime="2026-10-06T12:00:00+08:00"
        magnet={magnet("a07c33")}
        torrentHref="#torrent-2"
      />
      <ReleaseRow
        href="#release-3"
        cover="/demo/covers/summer-coast.svg"
        title="[绿茶字幕组] 八月的七日海岸 / Summer Coast [12][WebRip][1080p][简日内嵌]"
        publisher={{ name: "绿茶字幕组", href: "#group-greentea" }}
        episode="第 12 集"
        resolution="1080p"
        languages={["简", "日"]}
        subtitleType="内嵌字幕"
        specs={["WebRip", "MKV"]}
        fileSize="410.4 MB"
        seeders={null}
        leechers={null}
        time="今天 11:47"
        dateTime="2026-10-06T11:47:00+08:00"
        magnet={magnet("77d0e1")}
        torrentHref="#torrent-3"
      />
      <ReleaseRowDateRule label="昨天" />
      <ReleaseRow
        href="#release-4"
        cover="/demo/covers/afterschool-band.svg"
        title="[北宇治字幕组] 放课后屋顶乐队 / Afterschool Band [01-12 Fin][BDRip 1080p HEVC-10bit FLAC][简繁内封]"
        publisher={{ name: "北宇治字幕组", href: "#group-kitauji" }}
        category="合集"
        episode="01–12"
        resolution="1080p"
        languages={["简", "繁"]}
        subtitleType="内封字幕"
        specs={["HEVC", "10bit", "BDRip", "FLAC", "MKV"]}
        fileSize="12.1 GB"
        seeders={128}
        leechers={7}
        time="昨天 21:40"
        dateTime="2026-10-05T21:40:00+08:00"
        magnet={magnet("c3b9aa")}
        torrentHref={null}
      />
    </ReleaseRowList>
  )
}
