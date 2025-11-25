import { Dashboard } from "@/components/dashboard"
import { SharePointShell } from "@/components/sharepoint-shell"

export default function Page() {
  return (
    <SharePointShell>
      <Dashboard />
    </SharePointShell>
  )
}
