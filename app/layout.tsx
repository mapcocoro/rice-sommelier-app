import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '日本の美味しい-お米ソムリエ- あなたの理想のお米を見つけましょう',
  description: '診断を通じてあなたの好みに合う最適なお米を見つけ、全国のお米に関する知識を深められるウェブアプリケーション',
  icons: {
    icon: [
      { url: '/icon.png', sizes: '1024x1024', type: 'image/png' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' }
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '1024x1024', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
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