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
    <div className="bg-white text-slate-800 font-sans">
      <main className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-9 space-y-8">
          {/* HOT TOPICS */}
          <HotTopicsSection />

          {/* Business Communications */}
          <BusinessCommunicationsSection />

          {/* Announcements */}
          <AnnouncementsSection />
        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Mission Banner */}
          <MissionAndValuesSection />

          {/* Management Message removed as requested */}

          {/* Link Collection */}
          <LinkCollectionSection />
        </div>
      </main>
    </div>
  )
}
