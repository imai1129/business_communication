import { BusinessCommunicationsSection } from "@/components/dashboard/business-communications"

export default function BusinessCommunicationsPage() {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-4">
      <h1 className="text-2xl font-semibold text-slate-800">業務連絡一覧</h1>
      <p className="text-sm text-slate-600">すべての業務連絡を展開表示しています。フィルタで絞り込み可能です。</p>
      <BusinessCommunicationsSection forceExpanded />
    </div>
  )
}
