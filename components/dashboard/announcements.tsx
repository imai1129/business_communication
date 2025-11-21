"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpDown, ChevronDown, FileText, List } from "lucide-react"
import { announcements } from "@/data/announcements"

export function AnnouncementsSection() {
  return (
    <section className="space-y-4 pt-4">
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-700">
          <FileText className="h-5 w-5" />
          <h2>アナウンス</h2>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {announcements.map((item) => (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-slate-200">
                <CardContent className="p-3 flex gap-3 items-start">
                  <div className="relative h-16 w-16 shrink-0 rounded border border-slate-100 overflow-hidden">
                    <Image src={item.image || "/placeholder.svg"} alt="" fill className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-between h-16 py-0.5">
                    <h3 className="text-sm font-medium text-slate-800 line-clamp-2 leading-snug">{item.title}</h3>
                    <p className="text-xs text-slate-500">{item.date}</p>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-slate-200 text-slate-700 border-none">{item.date}</Badge>
                </div>
                <DialogTitle className="text-xl">{item.title}</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 min-h-[200px]">
                  <div className="flex gap-4 mb-4">
                    <div className="relative h-24 w-24 shrink-0 rounded border border-slate-200 overflow-hidden bg-white">
                      <Image src={item.image || "/placeholder.svg"} alt="" fill className="object-cover" />
                    </div>
                    <p className="text-slate-700 leading-relaxed text-sm">{item.content}</p>
                  </div>
                  <div className="h-40 bg-slate-200 rounded flex items-center justify-center text-slate-400">
                    詳細コンテンツエリア
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  )
}
