"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useMemo, useState } from "react"
import { ArrowUpDown, CheckCircle2, ChevronDown, FileText, Paperclip, Filter } from "lucide-react"
import { businessComms } from "@/data/business-communications"
import { cn } from "@/lib/utils"

type BusinessCommunicationsSectionProps = {
  forceExpanded?: boolean
}

function StatusIcon({ done, hidden }: { done: boolean; hidden?: boolean }) {
  const base = "h-5 w-5 flex items-center justify-center"
  if (hidden) return <div className={`${base} opacity-0`} aria-hidden />
  if (done)
    return (
      <div className={base}>
        <CheckCircle2 className="h-5 w-5 text-green-500" />
      </div>
    )
  return <div className={`${base} rounded-full border border-slate-300 bg-white`} />
}

export function BusinessCommunicationsSection({ forceExpanded = false }: BusinessCommunicationsSectionProps) {
  const filterOptions = [
    "新作情報",
    "サービス",
    "リワード",
    "対象:バリスタ向け",
    "業務連絡（通常）",
    "業務連絡（プロモ）",
    "業務連絡（緊急）",
    "障害情報（システム）",
    "障害情報（物流）",
  ]
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const clearFilters = () => setSelectedFilters([])

  const filteredBusinessComms = useMemo(
    () =>
      selectedFilters.length === 0
        ? businessComms
        : businessComms.filter((item) => item.categories.some((c) => selectedFilters.includes(c))),
    [selectedFilters]
  )

  const previewCount = 4
  const expanded = forceExpanded || isExpanded
  const displayItems = expanded ? filteredBusinessComms : filteredBusinessComms.slice(0, previewCount + 1)

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-700">
          <FileText className="h-5 w-5" />
          <h2>業務連絡</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={selectedFilters.length > 0 ? "default" : "outline"}
            size="sm"
            className={cn(
              "text-xs h-8 gap-1",
              selectedFilters.length > 0 ? "bg-slate-800 text-white hover:bg-slate-700" : ""
            )}
            onClick={() => setShowFilters((prev) => !prev)}
            >
            <Filter className="h-4 w-4" />
            <ChevronDown
              className={cn(
                "h-3 w-3 transition-transform",
                showFilters ? "rotate-180" : ""
              )}
            />
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-8 gap-1 bg-transparent">
            <ArrowUpDown className="h-3 w-3" />
            新着順
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>

      {showFilters && (
        <ScrollArea className="w-full pb-2">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedFilters.length === 0 ? "default" : "outline"}
              size="sm"
              className={cn(
                "h-7 text-xs",
                selectedFilters.length === 0 ? "bg-black hover:bg-slate-800 text-white" : "text-slate-600"
              )}
              onClick={clearFilters}
            >
              ALL
            </Button>
            {filterOptions.map((filter) => {
              const active = selectedFilters.includes(filter)
              return (
                <Button
                  key={filter}
                  variant={active ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "h-7 text-xs",
                    active
                      ? "bg-slate-800 text-white hover:bg-slate-700"
                      : "text-slate-600 border-slate-300 hover:bg-slate-50 bg-transparent"
                  )}
                  onClick={() => toggleFilter(filter)}
                >
                  {filter}
                </Button>
              )
            })}
          </div>
        </ScrollArea>
      )}

      <div className="bg-slate-50/50 rounded-md border border-slate-100 divide-y divide-slate-100 max-h-[600px] overflow-y-auto custom-scrollbar">
        {displayItems.map((item, idx) => {
          const isPartial = !expanded && idx === previewCount
          return (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <div
                  className={cn(
                    "p-3 hover:bg-slate-50 transition-colors cursor-pointer group flex items-start gap-3 relative",
                    item.status === "緊急" ? "bg-red-50" : "",
                    isPartial ? "max-h-24 overflow-hidden" : ""
                  )}
                >
                  {isPartial && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />}
                  <div className="mt-1 shrink-0 flex items-center gap-3 ">
                    <div className="flex items-center gap-2 min-w-[48px]">
                      <StatusIcon done={item.todoDone} hidden={!item.todoRequired} />
                      <StatusIcon done={item.sharedDone} />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${
                          item.status === "緊急"
                            ? "bg-red-400 hover:bg-red-500"
                            : "bg-blue-400 hover:bg-blue-500"
                        } text-white border-none rounded-sm px-3 text-base font-semibold w-24 h-10 items-center justify-center`}
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-slate-800 group-hover:text-[#00704A] transition-colors truncate">
                      {item.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-1 flex-wrap">
                      <p className="text-xs text-slate-500">対象：{item.audience}</p>
                      {item.categories.map((cat) => (
                        <Badge
                          key={cat}
                          className="bg-slate-100 text-slate-700 border-none h-5 px-2 text-[10px]"
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-start text-xs text-slate-400 whitespace-nowrap mt-1 ml-auto min-w-[72px] gap-1 text-right">
                    <div className="h-5 w-full flex items-center justify-end">
                      {item.hasAttachment && (
                        <Paperclip className="h-5 w-5 text-slate-900 shrink-0" aria-label="添付あり" />
                      )}
                    </div>
                    <span>{item.date}</span>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      className={`${
                        item.status === "緊急" ? "bg-red-400" : "bg-blue-400"
                      } text-white border-none w-24 justify-center`}
                    >
                      {item.status}
                    </Badge>
                    <span className="text-sm text-slate-500">{item.date}</span>
                  </div>
                  <DialogTitle className="text-xl">{item.title}</DialogTitle>
                  <DialogDescription className="text-slate-500">発信元: {item.dept}</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 min-h-[200px]">
                    <p className="text-slate-700 leading-relaxed">{item.content}</p>
                    <div className="mt-4 h-40 bg-slate-200 rounded flex items-center justify-center text-slate-400">
                      添付画像イメージ
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )
        })}
      </div>
      {!expanded && !forceExpanded && filteredBusinessComms.length > previewCount + 1 && (
        <div className="flex justify-center mt-3">
          <Button variant="outline" size="sm" onClick={() => setIsExpanded(true)}>
            もっと見る
          </Button>
        </div>
      )}
      {expanded && !forceExpanded && (
        <div className="flex justify-center mt-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/business-communications">一覧ページへ</Link>
          </Button>
        </div>
      )}
    </section>
  )
}
