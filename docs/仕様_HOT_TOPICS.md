# HOT TOPICS 仕様

## 役割
- トップページ左カラム先頭で注目トピックを視覚的に配置する静的バナー群。

## 構成
- ソース: `components/dashboard/hot-topics.tsx`（`Dashboard` から使用）。
- レイアウト: 横スクロールのスライダー。`flex` + `gap-4` で並べ、1ビューに4枚表示されるよう各スライドの幅を `calc((100%-3rem)/4)` で固定（`aspect-square`）。左右のナビゲーションボタンは隣接配置で画像と重ならない。
- 操作: 左右の矢印ボタン（`lucide-react`の`ChevronLeft/Right`）で1枚ずつスムーススクロール。ホイール/ドラッグでもスクロール可能。
- スタイル: 角丸・overflow hidden。`hover:scale-105` のトランジションで軽いズーム。背景は`bg-amber-100`を下地に使用し、各スライドに薄い枠線（`border-slate-200`）を付与。

## データ/挙動
- `data/hot-topics.ts` の `hotTopics` 配列を使用。`id/image/alt(/href)` を持つ。
- 画像は `/public/slider` 配下のファイルを参照。並び順: `20251002_ManagementLetter.jpg` を先頭、その後にプロモーション業連3枚、残りのバナーを続けて配置。
- 完全静的。リンクやクリックアクションは未実装。

## 今後の検討メモ
- 実バナーを取得するAPI/ストレージ差し替え時は props 化し、リンク先（LP/社内ページ/動画）を付与する設計に拡張。
- アクセシビリティ: altを内容に合わせて差し替える。
