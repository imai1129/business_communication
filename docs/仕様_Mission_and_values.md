# Mission and values 仕様

## 役割
- 右カラム上部でブランドメッセージ画像を表示する静的バナー領域。

## 構成
- ソース: `components/dashboard/mission-and-values.tsx`。
- レイアウト: 矩形カードに背景画像を全面表示するのみ（テキストオーバーレイなし）。
- 装飾: 角丸・ボックスシャドウ。アスペクト比は 400/187 に固定。

## データ/挙動
- `data/mission-and-values.ts` の単一オブジェクトを使用（title/subtitle/image）。
- 背景画像は `/public/ourmission.png`（400x187）。テキストは描き込まれた画像をそのまま表示。
- 完全静的。クリック挙動やリンクは未実装（`cursor-pointer` 付与のみ）。

## 今後の検討メモ
- 公式のMission/Values URLやPDFへの導線を追加する場合、リンク化またはCTAボタンを追加する。
- 運用で内容変更がある場合はCMS/API化し、文言と背景画像を差し替え可能にする。
