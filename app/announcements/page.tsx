import { AnnouncementsSection } from "@/components/dashboard/announcements"
import { SharePointShell } from "@/components/sharepoint-shell"

export default function AnnouncementsPage() {
  return (
    <SharePointShell containerMode="fixed">
      <div className="p-4 md:p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-slate-800">お知らせ・メンテナンス一覧</h1>
        <p className="text-sm text-slate-600">すべてのお知らせ・メンテナンスを表示しています。カテゴリフィルタで絞り込めます。</p>
        <AnnouncementsSection showListLink={false} />
      </div>
    </SharePointShell>
  )
}
