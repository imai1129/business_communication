"use client"

import { missionValues } from "@/data/mission-and-values"
import Image from "next/image"

export function MissionAndValuesSection() {
  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-sm aspect-[400/187] cursor-pointer"
    >
      <Image
        src={missionValues.image}
        alt={`${missionValues.title} ${missionValues.subtitle}`}
        fill
        className="object-cover"
        priority
      />
    </div>
  )
}
