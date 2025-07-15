import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '日本の美味しい-お米ソムリエ- あなたの理想のお米を見つけましょう',
  description: '診断を通じてあなたの好みに合う最適なお米を見つけ、全国のお米に関する知識を深められるウェブアプリケーション',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}