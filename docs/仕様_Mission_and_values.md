# Mission and values 仕様

## 役割
- 右カラム上部でブランドメッセージを示す静的バナー領域。

## 構成
- ソース: `components/dashboard/mission-and-values.tsx`。
- レイアウト: 矩形カードに中央揃えの2行テキスト。
- 装飾: 角丸・ボックスシャドウ・テクスチャ画像を `absolute` で重ね（10%不透明）。
- テキスト: "OUR MISSION" / "PROMISES & VALUES"（フォントは `font-serif` 指定）。

## データ/挙動
- `data/mission-and-values.ts` の単一オブジェクトを使用（title/subtitle/backgroundColor/textureImage）。
- 完全静的。クリック挙動やリンクは未実装（`cursor-pointer` 付与のみ）。

## 今後の検討メモ
- 公式のMission/Values URLやPDFへの導線を追加する場合、リンク化またはCTAボタンを追加する。
- 運用で内容変更がある場合はCMS/API化し、文言と背景画像を差し替え可能にする。
