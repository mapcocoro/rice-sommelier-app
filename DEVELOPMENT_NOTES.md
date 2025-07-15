# 開発メモ・注意事項

## 完了した機能

### ✅ 基本機能
- お米診断システム（15の質問による詳細診断）
- お米図鑑（検索・フィルタリング機能）
- お気に入り機能（ローカルストレージ）
- アフィリエイトリンク統合（60+種類のお米）
- レスポンシブデザイン（モバイル対応）

### ✅ セキュリティ対応
- 露出したGoogle API keyを完全削除
- .env.local を .gitignore に追加
- Git履歴から機密情報を完全削除
- 現在APIキーは不要（ローカルロジックのみ）

### ✅ UI/UX改善
- iOS風タブデザイン → 個別ページ設計に変更
- フォント改善（Google Fonts: Noto Serif/Sans JP）
- カスタムファビコン実装
- 文字サイズ調整（モバイル対応）

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **データ**: 静的データ（rice-database.ts）
- **状態管理**: React hooks + localStorage
- **デプロイ**: Vercel/Netlify対応

## 重要なファイル

### データベース
- `lib/data/rice-database.ts` - 全60+種類のお米データ
- `lib/data/rice-types.ts` - 型定義
- `lib/data/simple-questionnaire.ts` - 診断ロジック

### コンポーネント
- `components/SimpleRiceQuiz.tsx` - メイン診断
- `components/FavoriteButton.tsx` - お気に入り機能
- `components/FavoritesList.tsx` - お気に入り一覧

### ページ
- `app/page.tsx` - ホームページ
- `app/encyclopedia/page.tsx` - お米図鑑
- `app/favorites/page.tsx` - お気に入り一覧

## 今後の改善案

### 🔄 将来的な機能拡張
- [ ] データベース連携（現在は静的データ）
- [ ] ユーザー登録・ログイン機能
- [ ] レビュー・評価システム
- [ ] AI機能（現在は使用していない）
- [ ] 地域別お米マップ
- [ ] 季節別おすすめ機能

### 🔧 技術的改善
- [ ] PWA対応（オフライン機能）
- [ ] 画像最適化
- [ ] SEO最適化
- [ ] パフォーマンス最適化
- [ ] アクセシビリティ改善

## 運用上の注意

### デプロイ
- 環境変数は現在不要
- `npm run build` でビルド
- 静的サイトとして配信可能

### データ更新
- お米の追加: `rice-database.ts` を編集
- 診断ロジック更新: `simple-questionnaire.ts` を編集
- アフィリエイトリンクはHTMLをそのまま格納

### セキュリティ
- .env.local は .gitignore に含まれている
- 機密情報は含まれていない
- 外部API未使用

## トラブルシューティング

### ファビコン更新されない
1. 開発サーバー再起動
2. `.next` フォルダ削除
3. ブラウザキャッシュクリア（Cmd+Shift+R）
4. シークレットモードで確認

### ビルドエラー
- Node.js 18以上が必要
- `npm install` で依存関係更新
- TypeScript エラーは型定義を確認

### データ更新
- rice-database.ts の重複エントリに注意
- アフィリエイトリンクのHTMLエスケープ確認

## 連絡先・参考資料

- Next.js ドキュメント: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs

---
最終更新: 2025年7月15日