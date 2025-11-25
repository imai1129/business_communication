"use client"

import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger, SidebarFooter, SidebarSeparator, SidebarRail } from "@/components/ui/sidebar"
import Link from "next/link"
import { Home, FileText, Bell, Link2, Grid2X2, Star, HelpCircle, Settings, User, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

type SharePointShellProps = {
  children: React.ReactNode
  containerMode?: 'fixed' | 'full'
}

export function SharePointShell({ children, containerMode = 'fixed' }: SharePointShellProps) {
  return (
    <SidebarProvider
      defaultOpen={false}
      style={{ ['--sidebar-width-icon' as any]: '3rem' }}
    >
      <div className="min-h-screen flex bg-white text-slate-800">
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="ホーム">
                      <Link href="/" aria-label="ホーム">
                        <Home className="h-4 w-4" />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="業務連絡">
                      <Link href="/business-communications" aria-label="業務連絡">
                        <FileText className="h-4 w-4" />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="お知らせ・メンテナンス">
                      <Link href="#announcements" aria-label="お知らせ・メンテナンス">
                        <Bell className="h-4 w-4" />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="リンク集">
                      <Link href="#links" aria-label="リンク集">
                        <Link2 className="h-4 w-4" />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarSeparator />
          <SidebarRail />
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col min-w-0">
          <div className="sticky top-0 z-40">
            {/* Top Azure bar */}
            <div className="h-14 bg-[#0078D4] text-white flex items-center gap-3 px-3">
              <button className="p-1 rounded hover:bg-white/10" aria-label="アプリ">
                <Grid2X2 className="h-6 w-6" />
              </button>
              <div className="flex-1 max-w-3xl mx-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-600" />
                  <input
                    type="text"
                    placeholder="このサイトを検索"
                    className="w-full h-10 pl-10 pr-3 rounded bg-white text-slate-800 text-sm placeholder:text-slate-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <button className="p-1.5 rounded hover:bg-white/10" aria-label="お気に入り"><Star className="h-6 w-6" /></button>
                <button className="p-1.5 rounded hover:bg-white/10" aria-label="ヘルプ"><HelpCircle className="h-6 w-6" /></button>
                <button className="p-1.5 rounded hover:bg-white/10" aria-label="設定"><Settings className="h-6 w-6" /></button>
                <button className="p-1.5 rounded hover:bg-white/10" aria-label="アカウント"><User className="h-6 w-6" /></button>
              </div>
            </div>
            {/* Secondary gray nav bar */}
            <div className="h-14 bg-slate-500 text-white flex items-center px-3 gap-6 border-b">
              <SidebarTrigger className="text-white hover:bg-white/10" />
              <div className="font-medium">SBJ 店舗ポータル</div>
              <nav className="flex items-center gap-6 text-sm">
                <Link href="/" className="border-b-2 border-white pb-1">ホーム</Link>
                <a href="#about" className="hover:underline">私達について</a>
                <a href="#status" className="hover:underline">最新の状況</a>
                <a href="#resources" className="hover:underline">リソース</a>
              </nav>
              <div className="ml-auto flex items-center gap-3 text-xs">
                <span className="opacity-80">下書きの保存日時 2025/11/21</span>
                <button className="px-2 py-1 bg-white/10 rounded">共有</button>
                <button className="px-2 py-1 bg-white/10 rounded">編集</button>
                <button className="px-2 py-1 bg-white/10 rounded">再公開</button>
              </div>
            </div>
          </div>
          <main className="flex-1 min-w-0">
            {containerMode === 'fixed' ? (
              <div
                className="w-full"
                style={{ ['--container-max' as any]: '1648px' }}
              >
                <div
                  className="max-w-[1648px]"
                  style={{
                    marginLeft:
                      'max(0px, calc((100vw - var(--container-max)) / 2 - var(--sidebar-width-icon)))',
                    marginRight: 'max(0px, calc((100vw - var(--container-max)) / 2))',
                  }}
                >
                  {children}
                </div>
              </div>
            ) : (
              <div className="w-full">{children}</div>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
