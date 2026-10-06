import { PosterCard, posterSrcSet } from "@/registry/anibt/blocks/poster-card/poster-card"

// A real image service: one URL per width. The browser picks from `sizes` ×
// the screen's pixel ratio. This card is 176px wide wherever it is, so its
// `sizes` says 176px: a 3× phone then loads the 600w file (528 needed), a
// 2× laptop the 400w one (352 needed). Inside `PosterGrid`, leave `sizes`
// out and the card uses `POSTER_SIZES`.
const coverUrl = (width: number) => `/demo/covers/snow-country.svg?w=${width}`

export default function PosterCardSrcSet() {
  return (
    <div className="w-44">
      <PosterCard
        src={coverUrl(400)}
        srcSet={posterSrcSet(coverUrl)}
        sizes="176px"
        title="雪国来信"
        subtitle="Snow Country: A Letter for Spring"
        meta={<span className="anibt-num">第 4 集</span>}
      />
    </div>
  )
}
