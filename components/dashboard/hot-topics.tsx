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
    <div className="relative">
      <button
        type="button"
        aria-label="前へ"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow p-1"
        onClick={() => scrollBySlide("prev")}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <div
        ref={trackRef}
        className="overflow-x-auto scrollbar-hidden"
      >
        <div ref={listRef} className="flex gap-4 pb-2">
          {hotTopics.map((topic) => (
            <div
              key={topic.id}
              className="relative h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 rounded-lg overflow-hidden bg-amber-100 shrink-0"
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
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow p-1"
        onClick={() => scrollBySlide("next")}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
