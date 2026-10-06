"use client"

import { useState } from "react"

import { Checkbox } from "@/registry/anibt/ui/checkbox"
import { Field, FieldLabel } from "@/registry/anibt/ui/field"

const EPISODES = ["第 09 集", "第 10 集", "第 11 集", "第 12 集"]

export default function CheckboxSelectAll() {
  const [picked, setPicked] = useState<string[]>(["第 11 集", "第 12 集"])
  const all = picked.length === EPISODES.length
  const some = picked.length > 0 && !all

  return (
    <div className="anibt-well flex w-full max-w-xs flex-col">
      <Field orientation="horizontal" className="anibt-stitch-under px-3 py-2.5">
        <Checkbox
          id="checkbox-select-all"
          checked={all ? true : some ? "indeterminate" : false}
          onCheckedChange={(checked) => setPicked(checked === true ? EPISODES : [])}
        />
        <FieldLabel htmlFor="checkbox-select-all">全部剧集</FieldLabel>
        <span className="anibt-num ml-auto text-[12px] text-muted-foreground">
          {picked.length} / {EPISODES.length}
        </span>
      </Field>
      <div className="flex flex-col gap-2.5 px-3 py-3">
        {EPISODES.map((episode, index) => (
          <Field key={episode} orientation="horizontal">
            <Checkbox
              id={`checkbox-select-all-${index}`}
              checked={picked.includes(episode)}
              onCheckedChange={(checked) =>
                setPicked((current) =>
                  checked === true ? [...current, episode] : current.filter((item) => item !== episode)
                )
              }
            />
            <FieldLabel htmlFor={`checkbox-select-all-${index}`} className="anibt-num">
              {episode}
            </FieldLabel>
          </Field>
        ))}
      </div>
    </div>
  )
}
