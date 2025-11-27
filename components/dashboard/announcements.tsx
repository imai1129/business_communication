"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowUpDown, ChevronDown, FileText } from "lucide-react"
import { announcements } from "@/data/announcements"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

type AnnouncementsSectionProps = {
  showListLink?: boolean
}

export function AnnouncementsSection({ showListLink = true }: AnnouncementsSectionProps) {
  const filters = ["ALL", "お知らせ", "メンテナンス"] as const
  const [selectedFilter, setSelectedFilter] = useState<(typeof filters)[number]>("ALL")

  const filteredAnnouncements = useMemo(
    () =>
      selectedFilter === "ALL"
        ? announcements
        : announcements.filter((item) => item.category === selectedFilter),
    [selectedFilter]
  )

  return (
    <section className="space-y-4 pt-4">
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-700">
          <FileText className="h-5 w-5" />
          <h2>お知らせ・メンテナンス</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs h-8 gap-1 bg-transparent">
            <ArrowUpDown className="h-3 w-3" />
            新着順
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => {
          const active = selectedFilter === filter
          return (
          <Button
            key={filter}
            variant={active ? "default" : "outline"}
            size="sm"
            className={`h-7 text-xs ${
              active
                ? "bg-[color:var(--brand-green)] hover:bg-[color:var(--brand-green)] text-white"
                : "text-slate-600 border-slate-300 hover:bg-slate-50 bg-transparent"
            }`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </Button>
          )
        })}
      </div>

      <ul className="divide-y divide-slate-200">
        {filteredAnnouncements.map((item) => (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
              <li className="p-3 cursor-pointer hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-medium text-slate-800 leading-snug truncate flex-1">
                    {item.title}
                  </h3>
                  <span className="text-xs text-slate-500 shrink-0 tabular-nums">{item.date}</span>
                </div>
              </li>
            </DialogTrigger>
            <DialogContent className="md:max-w-[800px]">
              <DialogHeader>
                <DialogTitle className="text-lg leading-snug text-slate-900">{item.title}</DialogTitle>
                <p className="text-sm text-slate-500 tabular-nums">{item.date}</p>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                {item.image && (
                  <div className="relative w-full h-48 overflow-hidden rounded-md bg-slate-100">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                )}
                <p className="text-sm leading-relaxed text-slate-800 whitespace-pre-line">{item.content}</p>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </ul>
      {showListLink && (
        <div className="flex justify-center pt-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/announcements">一覧ページへ</Link>
          </Button>
        </div>
      )}
    </section>
  )
}
