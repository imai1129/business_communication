"use client"

import Image from "next/image"
import { Home, User, Search, ImageIcon, Settings, LogOut, MessageSquare, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AnnouncementsSection } from "@/components/dashboard/announcements"
import { BusinessCommunicationsSection } from "@/components/dashboard/business-communications"
import { HotTopicsSection } from "@/components/dashboard/hot-topics"
import { LinkCollectionSection } from "@/components/dashboard/link-collection"
import { MissionAndValuesSection } from "@/components/dashboard/mission-and-values"

export function Dashboard() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 h-16 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-slate-700">
            <Button variant="ghost" size="icon" className="hover:bg-slate-100">
              <Home className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-slate-100">
              <User className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-slate-100">
              <Search className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-slate-100">
              <ImageIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-12 w-12 rounded-full bg-[#00704A] flex items-center justify-center text-white font-bold text-xs overflow-hidden">
            <Image
              src="/placeholder.svg?height=48&width=48&text=LOGO"
              alt="Logo"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-700">
            <Settings className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-slate-900">
            <LogOut className="h-4 w-4 text-[#00B8D4]" />
            <span>ログアウト</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-8 space-y-8">
          {/* HOT TOPICS */}
          <HotTopicsSection />

          {/* Business Communications */}
          <BusinessCommunicationsSection />

          {/* Announcements */}
          <AnnouncementsSection />
        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Mission Banner */}
          <MissionAndValuesSection />

          {/* Management Message */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <MessageSquare className="h-4 w-4" />
              <h3>Management Message</h3>
            </div>
            <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden group cursor-pointer">
              <Image
                src="/placeholder.svg?height=200&width=350&text=Video+Thumbnail"
                alt="Video"
                fill
                className="object-cover opacity-80 group-hover:opacity-90 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 bg-red-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                </div>
              </div>
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm overflow-hidden p-1">
                  <Image
                    src="/placeholder.svg?height=32&width=32&text=Logo"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>
                <span className="text-white text-sm font-medium drop-shadow-md">Growing up in STARBUCKS</span>
              </div>
            </div>
            <div className="text-right">
              <a href="#" className="text-xs text-slate-500 hover:text-[#00704A] flex items-center justify-end gap-1">
                もっと見る <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Link Collection */}
          <LinkCollectionSection />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-600 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-end gap-6 text-xs font-medium">
          <a href="#" className="hover:underline">
            お問い合わせ
          </a>
          <a href="#" className="hover:underline">
            使用条件
          </a>
          <a href="#" className="hover:underline">
            プライバシー ポリシー
          </a>
          <a href="#" className="hover:underline">
            法的事項
          </a>
        </div>
      </footer>
    </div>
  )
}
