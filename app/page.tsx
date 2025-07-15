'use client'

import SimpleRiceQuiz from '@/components/SimpleRiceQuiz'
import { Wheat, Search, Heart, ChefHat, Info, Star, Bookmark } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <header className="text-center mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Wheat className="w-8 sm:w-10 h-8 sm:h-10 text-amber-600" />
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
              <span className="text-lg sm:text-xl md:text-2xl font-medium text-gray-600 font-serif">日本の美味しい</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 font-serif tracking-wide">お米ソムリエ</h1>
            </div>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 font-sans">
            かんたん質問に答えて、あなたの好みにぴったりのお米を見つけましょう！
          </p>
        </header>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* メイン診断エリア */}
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <div className="text-center mb-4 sm:mb-6">
                  <Heart className="w-12 sm:w-16 h-12 sm:h-16 text-red-500 mx-auto mb-3 sm:mb-4" />
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">お米診断スタート</h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    食感の好みや普段の使い方について、かんたんな質問に答えるだけ！
                  </p>
                </div>
                <SimpleRiceQuiz />
              </div>
            </div>

            <div className="space-y-6">
              {/* ナビゲーションカード */}
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 text-center">その他の機能</h3>
                <div className="space-y-3">
                  <Link
                    href="/encyclopedia"
                    className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors border border-green-200 hover:border-green-300"
                  >
                    <Search className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-medium text-green-800">お米図鑑</h4>
                      <p className="text-xs text-green-600">全国のお米を検索・閲覧</p>
                    </div>
                  </Link>
                  
                  <Link
                    href="/favorites"
                    className="flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-200 hover:border-purple-300"
                  >
                    <Bookmark className="w-5 h-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium text-purple-800">お気に入り</h4>
                      <p className="text-xs text-purple-600">保存したお米を管理</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* 診断について */}
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <div className="text-center mb-3 sm:mb-4">
                  <Info className="w-10 sm:w-12 h-10 sm:h-12 text-blue-500 mx-auto mb-2 sm:mb-3" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">診断について</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5 flex-shrink-0">1</span>
                    <div>
                      <h4 className="font-medium text-gray-800 text-xs sm:text-sm">食感の好み</h4>
                      <p className="text-xs text-gray-600">もちもち・あっさりなど基本の食感</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5 flex-shrink-0">2</span>
                    <div>
                      <h4 className="font-medium text-gray-800 text-xs sm:text-sm">普段の使い方</h4>
                      <p className="text-xs text-gray-600">白米・おにぎり・お弁当での使用頻度</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5 flex-shrink-0">3</span>
                    <div>
                      <h4 className="font-medium text-gray-800 text-xs sm:text-sm">合わせる料理</h4>
                      <p className="text-xs text-gray-600">カレー・和食・肉料理との相性</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5 flex-shrink-0">4</span>
                    <div>
                      <h4 className="font-medium text-gray-800 text-xs sm:text-sm">価格・品質</h4>
                      <p className="text-xs text-gray-600">コスパ重視か品質重視かの判定</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* お米の種類 */}
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <div className="text-center mb-3 sm:mb-4">
                  <Star className="w-10 sm:w-12 h-10 sm:h-12 text-amber-500 mx-auto mb-2 sm:mb-3" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">こんなお米が見つかります</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="border-l-4 border-blue-500 pl-2 sm:pl-3 py-1 sm:py-2">
                    <h4 className="font-medium text-gray-800 flex items-center gap-2 text-xs sm:text-sm">
                      <ChefHat className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
                      もちもち系
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5">白米やおにぎりで美味しい、粘りと甘みが自慢のお米</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-2 sm:pl-3 py-1 sm:py-2">
                    <h4 className="font-medium text-gray-800 flex items-center gap-2 text-xs sm:text-sm">
                      <ChefHat className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
                      あっさり系
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5">どんな料理にも合う、さっぱりと上品な味わいのお米</p>
                  </div>
                  <div className="border-l-4 border-amber-500 pl-2 sm:pl-3 py-1 sm:py-2">
                    <h4 className="font-medium text-gray-800 flex items-center gap-2 text-xs sm:text-sm">
                      <ChefHat className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
                      万能系
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5">毎日食べても飽きない、バランスの良いお米</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-2 sm:pl-3 py-1 sm:py-2">
                    <h4 className="font-medium text-gray-800 flex items-center gap-2 text-xs sm:text-sm">
                      <ChefHat className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
                      プレミアム系
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5">特別な日や贈り物にも最適な最高級ブランド米</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}