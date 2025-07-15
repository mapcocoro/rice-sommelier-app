# デプロイガイド

## Vercelへのデプロイ（推奨）

### 1. Vercelアカウントの準備
1. [Vercel](https://vercel.com)でアカウントを作成
2. GitHubアカウントと連携

### 2. プロジェクトのデプロイ
1. Vercelダッシュボードで「New Project」をクリック
2. GitHubリポジトリを選択
3. プロジェクト設定：
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
   - Install Command: `npm install`

### 3. 環境変数の設定
現在このアプリケーションは外部APIを使用していないため、環境変数の設定は不要です。

### 4. デプロイ実行
「Deploy」ボタンをクリックしてデプロイを開始

## Netlifyへのデプロイ

### 1. build設定
プロジェクトルートに`netlify.toml`を作成：
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### 2. デプロイ
1. [Netlify](https://netlify.com)でサイトを作成
2. GitHubリポジトリを連携
3. 環境変数 `GEMINI_API_KEY` を設定
4. デプロイ実行

## Railwayへのデプロイ

### 1. プロジェクト作成
1. [Railway](https://railway.app)でプロジェクト作成
2. GitHubリポジトリを連携

### 2. 設定
1. 環境変数 `GEMINI_API_KEY` を設定
2. Start Command: `npm run start`
3. Build Command: `npm run build`

## 自己ホスティング

### Docker使用の場合

1. Dockerfileを作成：
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

2. イメージをビルド：
```bash
docker build -t rice-sommelier-app .
```

3. コンテナを実行：
```bash
docker run -p 3000:3000 -e GEMINI_API_KEY=your_key rice-sommelier-app
```

### PM2使用の場合

1. PM2をインストール：
```bash
npm install -g pm2
```

2. ecosystem.config.jsを作成：
```javascript
module.exports = {
  apps: [{
    name: 'rice-sommelier-app',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      GEMINI_API_KEY: 'your_key_here'
    }
  }]
}
```

3. アプリケーションを起動：
```bash
pm2 start ecosystem.config.js
```

## 環境変数

すべてのデプロイ環境で以下の環境変数が必要です：

| 変数名 | 必須 | 説明 |
|--------|------|------|
| `GEMINI_API_KEY` | Yes | Gemini APIキー |

## トラブルシューティング

### ビルドエラー
- Node.js 18以上を使用しているか確認
- 依存関係が正しくインストールされているか確認

### API エラー
- `GEMINI_API_KEY`が正しく設定されているか確認
- APIキーに適切な権限があるか確認

### パフォーマンス最適化
- Next.js Image Optimizationを活用
- 静的ファイルのCDN配信を設定
- データベースキャッシュの実装（将来的な拡張時）

## モニタリング

本番環境では以下の監視を推奨：
- アプリケーションのレスポンス時間
- API使用量とレート制限
- エラーログの監視
- ユーザーアクセス解析