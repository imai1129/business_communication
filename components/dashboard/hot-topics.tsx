"use client"

import Image from "next/image"
import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { hotTopics } from "@/data/hot-topics"

export function HotTopicsSection() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)

  const scrollBySlide = (dir: "prev" | "next") => {
    const viewport = trackRef.current
    const list = listRef.current
    if (!viewport || !list) return

    const firstChild = list.children[0] as HTMLElement | undefined
    if (!firstChild) return

    const childWidth = firstChild.getBoundingClientRect().width
    const gapStr = getComputedStyle(list).columnGap || getComputedStyle(list).gap
    const gap = parseFloat(gapStr || "0") || 0
    const amount = childWidth + gap

    viewport.scrollBy({
      left: dir === "next" ? amount : -amount,
      behavior: "smooth",
    })
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="前へ"
        className="shrink-0 bg-white border border-slate-200 hover:bg-slate-50 rounded-full shadow-sm p-2"
        onClick={() => scrollBySlide("prev")}
      >
        <ChevronLeft className="h-5 w-5 text-slate-700" />
      </button>
      <div
        ref={trackRef}
        className="overflow-x-auto scrollbar-hidden flex-1"
      >
        <div ref={listRef} className="flex gap-4 pb-2">
          {hotTopics.map((topic) => (
            <div
              key={topic.id}
              className="relative aspect-square flex-[0_0_calc((100%-3rem)/4)] rounded-lg overflow-hidden bg-amber-100 shrink-0 border border-slate-200"
            >
              <Image
                src={topic.image}
                alt={topic.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        aria-label="次へ"
        className="shrink-0 bg-white border border-slate-200 hover:bg-slate-50 rounded-full shadow-sm p-2"
        onClick={() => scrollBySlide("next")}
      >
        <ChevronRight className="h-5 w-5 text-slate-700" />
      </button>
    </div>
  )
}
