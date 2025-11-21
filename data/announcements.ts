export type Announcement = {
  id: number
  title: string
  date: string
  image?: string
  content: string
}

export const announcements: Announcement[] = [
  {
    id: 1,
    title: "WinterPh1プロモーション情報掲載開始",
    date: "2025/11/18 18:52",
    image: "/placeholder.svg?height=80&width=80&text=Winter",
    content: "Winter Ph1プロモーションの詳細情報が掲載されました。新しいドリンクやフードのラインナップをご確認ください。",
  },
  {
    id: 2,
    title: "要件定義MTGは有意義だ",
    date: "2025/11/18 15:17",
    image: "/placeholder.svg?height=80&width=80&text=MTG",
    content: "本日の要件定義ミーティングの議事録です。決定事項とネクストアクションを確認してください。",
  },
  {
    id: 3,
    title: "10月1日より秋限定“キャラメルパンプキンラテ”を販売開始します",
    date: "2025/11/14 20:32",
    image: "/placeholder.svg?height=80&width=80&text=Latte",
    content: "秋の味覚を楽しめるキャラメルパンプキンラテが登場します。販売期間と販促ツールについて。",
  },
  {
    id: 4,
    title: "SBJ健康保険組合からのお知らせ",
    date: "2025/11/14 20:30",
    image: "/placeholder.svg?height=80&width=80&text=Health",
    content: "健康診断の申し込み受付を開始しました。対象者は期間内に申し込みを行ってください。",
  },
  {
    id: 5,
    title: "playwright test 20251106",
    date: "2025/11/06 15:37",
    image: "/placeholder.svg?height=80&width=80&text=Test",
    content: "自動テストの実行結果レポートです。",
  },
  {
    id: 6,
    title: "これはテスト",
    date: "2025/10/08 17:50",
    image: "/placeholder.svg?height=80&width=80&text=Test",
    content: "システム通知のテスト配信です。",
  },
]
