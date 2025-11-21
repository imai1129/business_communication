# HOT TOPICS 仕様

## 役割
- トップページ左カラム先頭で注目トピックを視覚的に配置する静的バナー群。

## 構成
- ソース: `components/dashboard/hot-topics.tsx`（`Dashboard` から使用）。
- レイアウト: `grid grid-cols-3 gap-4`、各カードは `aspect-square` の `div`。
- 画像: `/generic-placeholder-300px.png?height=300&width=300&text=PUMPKIN+LATTE` を `next/image` の `fill` で3枚表示（`data/hot-topics.ts` の配列をmap）。
- スタイル: 角丸・overflow hidden。`hover:scale-105` のトランジションで軽いズーム。

## データ/挙動
- `data/hot-topics.ts` の `hotTopics` 配列を使用。id/image/alt(/href) を持つ。
- 完全静的。リンクやクリックアクションは未実装。
- 画像は現状全カード共通のプレースホルダー。

## 今後の検討メモ
- 実バナーを取得するAPI/ストレージ差し替え時は props 化し、リンク先（LP/社内ページ/動画）を付与する設計に拡張。
- アクセシビリティ: altを内容に合わせて差し替える。
