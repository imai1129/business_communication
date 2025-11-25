"use client"

import Image from "next/image"
import { Home, User, Search, ImageIcon, Settings, LogOut } from "lucide-react"
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

          {/* Management Message removed as requested */}

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
