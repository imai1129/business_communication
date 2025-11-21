"use client"

import Image from "next/image"
import { hotTopics } from "@/data/hot-topics"

export function HotTopicsSection() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {hotTopics.map((topic) => (
        <div key={topic.id} className="aspect-square relative rounded-lg overflow-hidden bg-amber-100">
          <Image
            src={topic.image}
            alt={topic.alt}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  )
}
