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
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ArrowUpDown, CheckCircle2, ChevronDown, FileText, Paperclip, Check, Filter, Megaphone, Printer } from "lucide-react"
import { businessComms } from "@/data/business-communications"
import { cn } from "@/lib/utils"

type BusinessCommunicationsSectionProps = {
  forceExpanded?: boolean
  forceFiltersOpen?: boolean
}

const markdownComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-2xl font-semibold text-slate-900 print:text-black mt-4 mb-2" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-xl font-semibold text-slate-900 print:text-black mt-4 mb-2" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-lg font-semibold text-slate-900 print:text-black mt-3 mb-2" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-3 leading-relaxed text-base text-slate-800 print:text-black" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-3 list-disc pl-5 space-y-1 text-base text-slate-800 print:text-black" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-3 list-decimal pl-5 space-y-1 text-base text-slate-800 print:text-black" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="pl-1 text-base" {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-[#00704A] underline font-medium text-base" target="_blank" rel="noreferrer" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => <strong className="font-semibold text-base" {...props} />,
  em: (props: React.HTMLAttributes<HTMLElement>) => <em className="italic text-base" {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="px-1 py-0.5 rounded bg-slate-100 text-base text-slate-800" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote className="border-l-4 border-slate-200 pl-3 text-base text-slate-700 italic mb-3" {...props} />
  ),
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
    "対象:全PTR",
    "対象:SSV以上",
    "対象:SM",
    "対象:社員",
    "プロモ",
    "コーヒー",
    "ビバレッジ",
    "フード",
    "MD",
    "在庫管理",
    "人事",
    "DT",
    "MOP",
    "デリバリー",
    "デジタル",
    "オペレーション",
    "マネジメント",
    "イベント",
    "Reserve",
    "LS",
    "災害",
    "学習",
    "必須アンケート",
    "任意アンケート",
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
                "text-sm h-9 gap-1",
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
          <Button variant="outline" size="sm" className="text-sm h-9 gap-1 bg-transparent">
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
                "h-9 text-sm",
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
                  "h-9 text-sm",
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
                    "py-2.5 px-3 hover:bg-slate-50 transition-colors cursor-pointer group flex items-center gap-2 relative",
                    item.status === "緊急" ? "bg-red-50" : "",
                    isPartial ? "max-h-24 overflow-hidden" : ""
                  )}
                >
                  {isPartial && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />}
                  <div className="shrink-0 flex items-center gap-2">
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
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h3 className="text-base font-semibold text-slate-800 group-hover:text-[#00704A] transition-colors truncate">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-slate-600 min-w-0 overflow-hidden">
                      <p className="text-sm text-slate-600 shrink-0">対象：{item.audience}</p>
                      <div
                        ref={(el) => {
                          categoryRefs.current[item.id] = el
                        }}
                        className="relative flex items-center gap-3 flex-nowrap overflow-hidden min-w-0 pr-5 px-1 py-0.5"
                      >
                        {item.categories.map((cat) => (
                          <Badge
                            key={cat}
                            className="bg-[#B7D9CB] text-slate-800 border-none h-6 px-2.5 text-sm rounded-sm flex items-center gap-1 shrink-0"
                          >
                            <span className="text-slate-400 text-sm">#</span>
                            {cat}
                          </Badge>
                        ))}
                        {categoryOverflow[item.id] && (
                          <div
                            className="pointer-events-none absolute right-0 inset-y-0 flex items-center pl-1"
                            style={{ backgroundColor: "transparent" }}
                          >
                            <span
                              className="text-slate-600 text-sm font-medium px-1"
                              style={{ backgroundColor: "transparent" }}
                            >
                              ...
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="relative flex items-stretch self-stretch text-sm text-slate-500 whitespace-nowrap ml-auto min-w-[140px] text-right py-0.5">
                    <div className="flex flex-col items-end justify-end gap-1 leading-tight text-sm text-slate-600 w-full pr-8">
                      <span>{item.date}</span>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center justify-center w-6">
                      {item.hasAttachment && <Paperclip className="h-5 w-5 text-slate-900" aria-label="添付あり" />}
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="business-comm-dialog w-[90vw] md:w-[60vw] md:max-w-[1280px] max-h-[80vh] overflow-y-auto">
                <div role="document" className="business-comm-print-area">
                  <DialogHeader>
                    <div className="flex items-center justify-between mb-3 print:hidden">
                      <Button
                        variant="default"
                        size="sm"
                        className="h-10 px-4 rounded-md bg-[color:var(--brand-green)] text-white hover:bg-[color:var(--brand-green)]/90 shadow-md shadow-[color:var(--brand-green)]/25"
                        onClick={() => window.print()}
                        aria-label="この業務連絡を印刷"
                      >
                        <span className="flex items-center gap-1 font-medium">
                          <Printer className="h-4 w-4" />
                          印刷
                        </span>
                      </Button>
                      <div className="w-10 h-10" aria-hidden />
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <Badge
                            className={cn(
                              item.status === "緊急"
                                ? "bg-red-500"
                                : "bg-blue-500",
                              "text-white border-none rounded-sm px-2 text-[14px] font-semibold min-w-[60px] h-8 items-center justify-center status-badge",
                              item.status === "緊急" ? "status-badge-urgent" : "status-badge-default"
                            )}
                            aria-label={`業務連絡種別: ${item.status}`}
                          >
                            {item.status}
                          </Badge>
                          <DialogTitle className="text-xl leading-snug text-slate-900">
                            {item.title}
                          </DialogTitle>
                        </div>
                        <div className="hidden print:grid print:grid-cols-2 gap-2 text-sm text-slate-600 print:text-black">
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-slate-800 print:text-black">公開日</span>
                            <span>{item.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-slate-800 print:text-black">送信部署</span>
                            <span>{item.dept}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-slate-800 print:text-black">対象職位</span>
                            <span>{item.audience}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        className="hidden"
                      />
                    </div>
                    <div className="space-y-1 text-[14px] mt-2 print:hidden">
                      <p>送信部署: {item.dept}</p>
                      <p>対象職位: {item.audience}</p>
                      <p>公開日付: {item.date}</p>
                      <p>タグ:{item.categories.map((cat) => (<span key={cat}> #{cat}</span>))}</p>
                    </div>
                    {item.images?.length ? (
                      <div className="mt-4 space-y-4">
                        {item.images.map((img) => (
                          <figure key={img.src} className="flex flex-col items-start gap-2">
                            <img
                              src={img.src}
                              alt={img.alt}
                              className="w-auto max-w-full h-auto border border-slate-200 bg-white"
                              loading={item.id === 1 ? "eager" : "lazy"}
                            />
                            <figcaption className="text-sm text-slate-500 print:text-black">{img.alt}</figcaption>
                          </figure>
                        ))}
                      </div>
                    ) : null}
                  </DialogHeader>
                  <div className="py-4">
                    <div className="p-1">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={markdownComponents}
                      >
                        {item.content}
                      </ReactMarkdown>
                    </div>
                    <div className="mt-6 flex items-center justify-center gap-4 print-hidden">
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
