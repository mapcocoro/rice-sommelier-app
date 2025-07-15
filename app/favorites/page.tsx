'use client'

import { ArrowLeft, Wheat } from 'lucide-react'
import Link from 'next/link'
import FavoritesList from '@/components/FavoritesList'

export default function FavoritesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-3 sm:mb-4 text-sm sm:text-base">
            <ArrowLeft className="w-3 sm:w-4 h-3 sm:h-4" />
            ホームに戻る
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <Wheat className="w-6 sm:w-8 h-6 sm:h-8 text-amber-600" />
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 font-serif">お気に入り</h1>
            </div>
            <p className="text-sm sm:text-base text-gray-600">
              あなたがお気に入りに追加したお米の一覧です
            </p>
          </div>
        </header>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <FavoritesList />
          </div>
        </div>
      </div>
    </main>
  )
}
// キャッシュクリアのための再デプロイ