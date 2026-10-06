import { PosterCard, POSTER_SIZES, posterSrcSet } from "@/registry/anibt/blocks/poster-card/poster-card"

// A real image service: one URL per width. The browser picks from `sizes` ×
// the screen's pixel ratio, so a 180px card on a 3× phone loads the 600w file.
const coverUrl = (width: number) => `/demo/covers/snow-country.svg?w=${width}`

export default function PosterCardSrcSet() {
  return (
    <div className="w-44">
      <PosterCard
        src={coverUrl(400)}
        srcSet={posterSrcSet(coverUrl)}
        sizes={POSTER_SIZES}
        title="雪国来信"
        subtitle="Snow Country: A Letter for Spring"
        meta={<span className="anibt-num">第 4 集</span>}
      />
    </div>
  )
}
