import { SearchInput } from "@/registry/anibt/ui/search-input"

export default function SearchInputStates() {
  return (
    <div className="grid w-full max-w-xl gap-3 sm:grid-cols-2">
      <SearchInput defaultValue="芙莉莲" aria-label="搜索（有内容）" />
      <SearchInput placeholder="搜索字幕组" aria-label="搜索字幕组" />
      <SearchInput placeholder="同步中，暂不可搜索" disabled aria-label="搜索（不可用）" />
      {/* A phone-sized target: 44 high below md, A's 32 from md. */}
      <SearchInput placeholder="手机上更高" inputClassName="h-11 md:h-8" aria-label="搜索（手机加高）" />
    </div>
  )
}
