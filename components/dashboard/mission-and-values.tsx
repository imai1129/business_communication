"use client"

import { missionValues } from "@/data/mission-and-values"

export function MissionAndValuesSection() {
  return (
    <div
      className="text-white p-8 rounded-lg text-center shadow-sm relative overflow-hidden group cursor-pointer"
      style={{ backgroundColor: missionValues.backgroundColor }}
    >
      <div className="relative z-10">
        <h3 className="text-lg font-serif tracking-wider">{missionValues.title}</h3>
        <h3 className="text-lg font-serif tracking-wider mt-1">{missionValues.subtitle}</h3>
      </div>
      <div
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{ backgroundImage: `url('${missionValues.textureImage}')` }}
      />
    </div>
  )
}
