"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpDown, ChevronDown, FileText, List } from "lucide-react"
import { announcements } from "@/data/announcements"

export function AnnouncementsSection() {
  return (
    <section className="space-y-4 pt-4">
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-700">
          <FileText className="h-5 w-5" />
          <h2>お知らせ・メンテナンス</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs h-8 gap-1 bg-transparent">
            <List className="h-3 w-3" />
            リスト表示
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-8 gap-1 bg-transparent">
            <ArrowUpDown className="h-3 w-3" />
            新着順
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button variant="default" size="sm" className="bg-black hover:bg-slate-800 text-white h-7 text-xs">
          ALL
        </Button>
        {["新作情報", "対象:SV向け", "業務連絡（プロモ）"].map((filter) => (
          <Button
            key={filter}
            variant="outline"
            size="sm"
            className="h-7 text-xs text-slate-600 border-slate-300 hover:bg-slate-50 bg-transparent"
          >
            {filter}
          </Button>
        ))}
      </div>

      <ul className="divide-y divide-slate-200">
        {announcements.map((item) => (
          <li key={item.id} className="p-3">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-medium text-slate-800 leading-snug truncate flex-1">{item.title}</h3>
              <span className="text-xs text-slate-500 shrink-0 tabular-nums">{item.date}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
