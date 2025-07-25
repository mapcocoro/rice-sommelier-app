# 日本の美味しい-お米ソムリエ- Rice Sommelier App

チャート式の質問に答えて、あなたの好みにぴったりのお米を見つけるWebアプリケーションです。

## 機能

### 🌾 お米診断機能
- Yes/No形式の簡単な質問に答えるチャート式診断
- 食感、料理、用途などの好みを段階的にヒアリング
- 楽しみながら最適なお米を発見

### 📚 全国お米図鑑機能
- 日本全国のお米品種を検索・閲覧
- 銘柄名、産地、タグでのフィルタリング
- 詳細な特徴と料理との相性情報

## セットアップ

### 必要な環境
- Node.js 18以上

### インストール手順

1. リポジトリをクローン
```bash
git clone <repository-url>
cd rice-sommelier-app
```

2. 依存関係をインストール
```bash
npm install
```

3. 開発サーバーを起動
```bash
npm run dev
```

4. ブラウザで `http://localhost:3000` を開く

## デプロイ

### Vercelへのデプロイ

1. Vercelアカウントにログイン
2. リポジトリを接続してデプロイ

### 他のプラットフォーム

Next.jsアプリケーションとして、以下のプラットフォームにもデプロイ可能：
- Netlify
- Railway
- AWS Amplify
- Google Cloud Run

## 技術スタック

- **フロントエンド**: Next.js 14, React, TypeScript
- **スタイリング**: Tailwind CSS
- **ロジック**: チャート式質問ツリー
- **アイコン**: Lucide React
- **データベース**: 静的データ（将来的に外部DBに移行可能）

## プロジェクト構造

```
rice-sommelier-app/
├── app/                    # Next.js App Router
│   ├── encyclopedia/      # お米図鑑ページ
│   └── page.tsx          # ホームページ（診断機能）
├── components/            # Reactコンポーネント
│   └── quiz/             # 診断関連コンポーネント
├── lib/                   # ユーティリティとデータ
│   ├── data/             # お米データベース
│   └── utils/            # ヘルパー関数
└── public/               # 静的ファイル
```

## お米データベース

このアプリケーションには、以下の情報を含む包括的な日本のお米データベースが含まれています：

- **基本情報**: 品種名、産地、読み方
- **食感**: 粘り、硬さ、粒の大きさ
- **味わい**: 甘み、旨み、後味
- **評価**: 特A評価、連続受賞年数
- **用途**: 相性の良い料理、推奨用途
- **タグ**: 検索・フィルタリング用

### 収録品種（一部）

- **著名銘柄**: コシヒカリ、ひとめぼれ、あきたこまち、ササニシキ
- **プレミアム品種**: つや姫、ゆめぴりか、新之助、サキホコレ
- **地域ブランド**: 青天の霹靂、いちほまれ、さがびより、森のくまさん
- **新興品種**: ゆうだい21、虹のきらめき、くまさんの輝き

## ライセンス

MIT License

## 貢献

プルリクエストやイシューの報告を歓迎します。新しいお米品種の追加や機能改善の提案もお待ちしています。