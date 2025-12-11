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
import { useMemo, useState, useLayoutEffect, useEffect, useCallback, useRef } from "react"
import { ArrowUpDown, CheckCircle2, ChevronDown, FileText, Paperclip, Check, Filter, Megaphone, Printer } from "lucide-react"
import { businessComms } from "@/data/business-communications"
import { cn } from "@/lib/utils"

type BusinessCommunicationsSectionProps = {
  forceExpanded?: boolean
  forceFiltersOpen?: boolean
}

function StatusIcon({ done, hidden }: { done: boolean; hidden?: boolean }) {
  const base = "h-5 w-5 flex items-center justify-center"
  if (hidden) return <div className={`${base} opacity-0`} aria-hidden />
  if (done)
    return (
      <div className={base}>
        <CheckCircle2 className="h-5 w-5 text-[color:var(--brand-green)]" />
      </div>
    )
  return <div className={`${base} rounded-full border border-slate-300 bg-white`} />
}

function SharedIcon({ done }: { done: boolean }) {
  const base = "h-5 w-5 flex items-center justify-center"
  const tone = done ? "text-[color:var(--brand-green)]" : "text-slate-300"
  return (
    <div className={base} aria-label={done ? "店内共有済み" : "未共有"}>
      <Megaphone className={`h-4 w-4 ${tone}`} />
    </div>
  )
}

export function BusinessCommunicationsSection({ forceExpanded = false, forceFiltersOpen = false }: BusinessCommunicationsSectionProps) {
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
  const [isExpanded, setIsExpanded] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [categoryOverflow, setCategoryOverflow] = useState<Record<number, boolean>>({})
  const categoryRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const [todoState, setTodoState] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(businessComms.map((item) => [item.id, item.todoDone]))
  )
  const [sharedState, setSharedState] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(businessComms.map((item) => [item.id, item.sharedDone]))
  )

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
  const maxExpandedCount = 12
  const expanded = forceExpanded || isExpanded
  const filtersOpen = forceFiltersOpen || showFilters
  const displayItems = expanded
    ? forceExpanded
      ? filteredBusinessComms
      : filteredBusinessComms.slice(0, maxExpandedCount)
    : filteredBusinessComms.slice(0, previewCount + 1)

  const measureCategoryOverflow = useCallback(() => {
    const next: Record<number, boolean> = {}
    displayItems.forEach((item) => {
      const el = categoryRefs.current[item.id]
      if (el) {
        next[item.id] = el.scrollWidth > el.clientWidth + 1
      }
    })

    setCategoryOverflow((prev) => {
      const prevKeys = Object.keys(prev)
      const nextKeys = Object.keys(next)
      if (prevKeys.length !== nextKeys.length) return next
      for (const key of nextKeys) {
        if (prev[key] !== next[key]) return next
      }
      return prev
    })
  }, [displayItems])

  useLayoutEffect(() => {
    measureCategoryOverflow()
  }, [measureCategoryOverflow])

  useEffect(() => {
    window.addEventListener("resize", measureCategoryOverflow)
    return () => window.removeEventListener("resize", measureCategoryOverflow)
  }, [measureCategoryOverflow])

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-700">
          <FileText className="h-5 w-5" />
          <h2>業務連絡</h2>
        </div>
        <div className="flex items-center gap-2">
          {!forceFiltersOpen && (
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
          )}
          <Button variant="outline" size="sm" className="text-xs h-8 gap-1 bg-transparent">
            <ArrowUpDown className="h-3 w-3" />
            新着順
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>
      {(filtersOpen || forceFiltersOpen) && (
        <ScrollArea className="w-full pb-2">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedFilters.length === 0 ? "default" : "outline"}
            size="sm"
            className={cn(
              "h-7 text-xs",
              selectedFilters.length === 0
                ? "bg-[color:var(--brand-green)] hover:bg-[color:var(--brand-green)] text-white"
                : "text-slate-600"
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
                    ? "bg-[color:var(--brand-green)] hover:bg-[color:var(--brand-green)] text-white"
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

      <div
        className={cn(
          "rounded-md border border-slate-100 divide-y divide-slate-100",
          expanded ? "" : "max-h-[600px] overflow-y-auto custom-scrollbar"
        )}
      >
        {displayItems.map((item, idx) => {
          const isPartial = !expanded && idx === previewCount
          const maxCategoryChips = 4
          const displayedCategories = item.categories.slice(0, maxCategoryChips)
          const hasMoreCategories = item.categories.length > maxCategoryChips
          const todoDone = todoState[item.id] ?? item.todoDone
          const sharedDone = sharedState[item.id] ?? item.sharedDone
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
                        <StatusIcon done={todoDone} hidden={!item.todoRequired} />
                        <SharedIcon done={sharedDone} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={cn(
                            item.status === "緊急"
                              ? "bg-red-400 hover:bg-red-500"
                              : "bg-blue-400 hover:bg-blue-500",
                            item.status === "通常" ? "opacity-0" : "",
                            "text-white border-none rounded-sm px-2 text-[14px] font-semibold min-w-[60px] h-8 items-center justify-center"
                          )}
                        >
                          {item.status}
                        </Badge>
                      </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-medium text-slate-800 group-hover:text-[#00704A] transition-colors truncate">
                      {item.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-1 text-xs text-slate-500 min-w-0 overflow-hidden">
                      <p className="text-xs text-slate-500 shrink-0">対象：{item.audience}</p>
                      <div
                        ref={(el) => {
                          categoryRefs.current[item.id] = el
                        }}
                        className="relative flex items-center gap-3 flex-nowrap overflow-hidden min-w-0 pr-5 px-1 py-0.5"
                      >
                        {item.categories.map((cat) => (
                          <Badge
                            key={cat}
                            className="bg-[#B7D9CB] text-slate-800 border-none h-6 px-2 text-[11px] rounded-sm flex items-center gap-1 shrink-0"
                          >
                            <span className="text-slate-400 text-[11px]">#</span>
                            {cat}
                          </Badge>
                        ))}
                        {categoryOverflow[item.id] && (
                          <div
                            className="pointer-events-none absolute right-0 inset-y-0 flex items-center pl-1"
                            style={{ backgroundColor: "transparent" }}
                          >
                            <span
                              className="text-slate-600 text-[12px] font-medium px-1"
                              style={{ backgroundColor: "transparent" }}
                            >
                              ...
                            </span>
                          </div>
                        )}
                      </div>
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
              <DialogContent className="business-comm-dialog w-[90vw] md:w-[60vw] md:max-w-[1280px] max-h-[80vh] overflow-y-auto">
                <div role="document" className="business-comm-print-area">
                  <DialogHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="mb-2">
                          <Badge
                            className={`${
                              item.status === "緊急" ? "bg-red-500" : "bg-blue-500"
                            } text-white border-none rounded-sm px-2 text-[14px] font-semibold min-w-[60px] h-8 items-center justify-center`}
                          >
                            {item.status}
                          </Badge>
                        </div>
                        <DialogTitle className="text-xl leading-snug text-slate-900">
                          {item.title}
                        </DialogTitle>
                      </div>
                      <Button
                        variant="default"
                        size="sm"
                        className="mt-1 print:hidden h-10 px-4 rounded-full bg-[color:var(--brand-green)] text-white hover:bg-[color:var(--brand-green)]/90 shadow-md shadow-[color:var(--brand-green)]/25"
                        onClick={() => window.print()}
                        aria-label="この業務連絡を印刷"
                      >
                        <span className="flex items-center gap-1 font-medium">
                          <Printer className="h-4 w-4" />
                          印刷
                        </span>
                      </Button>
                    </div>
                    <div className="space-y-1 text-[14px] mt-2">
                      <p>送信部署: {item.dept}</p>
                      <p>対象職位: {item.audience}</p>
                      <p>公開日付: {item.date}</p>
                    </div>
                    <div className="mt-3 flex items-center gap-2 flex-wrap text-sm text-slate-600">
                      <span className="font-medium">タグ:</span>
                      <div className="flex items-center gap-2 flex-wrap">
                        {item.categories.map((cat) => (
                          <Badge
                            key={cat}
                            className="bg-transparent text-slate-800 border-none h-7 px-2 text-[12px] rounded-full flex items-center gap-1"
                          >
                            <span className="text-slate-500 text-[12px]">#</span>
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="p-1">
                      <p className="text-slate-800 leading-relaxed whitespace-pre-line">
                        {item.content}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-center gap-4">
                      <Button
                        variant={sharedDone ? "default" : "outline"}
                        className="min-w-40"
                        onClick={() =>
                          setSharedState((prev) => ({ ...prev, [item.id]: !(prev[item.id] ?? item.sharedDone) }))
                        }
                        aria-pressed={sharedDone}
                      >
                        <span className="flex items-center gap-1">
                          <Check className="h-4 w-4" />
                          {sharedDone ? "店内共有済み" : "店内共有済にする"}
                        </span>
                      </Button>
                      {item.todoRequired && (
                        <Button
                          className="min-w-40"
                          variant={todoDone ? "default" : "outline"}
                          onClick={() => {
                            const next = !todoDone
                            setTodoState((prev) => ({ ...prev, [item.id]: next }))
                            if (next) {
                              setSharedState((prev) => ({ ...prev, [item.id]: true }))
                            }
                          }}
                          aria-pressed={todoDone}
                        >
                          <span className="flex items-center gap-1">
                            <Check className="h-4 w-4" />
                            {todoDone ? "対応実施済み" : "対応実施済にする"}
                          </span>
                        </Button>
                      )}
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
          <Button variant="outline" size="sm" asChild>
            <Link href="/business-communications">一覧ページへ</Link>
          </Button>
        </div>
      )}
    </section>
  )
}
