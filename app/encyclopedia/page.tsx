'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, ArrowLeft, Star } from 'lucide-react'
import Link from 'next/link'
import { riceDatabase } from '@/lib/data/rice-database'
import { searchRice, getAllTags, getAllRegions } from '@/lib/utils/rice-utils'
import { Rice, RiceTag } from '@/lib/data/rice-types'
import FavoriteButton from '@/components/FavoriteButton'

export default function Encyclopedia() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<RiceTag[]>([])
  const [selectedRegion, setSelectedRegion] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const allTags = useMemo(() => getAllTags(), [])
  const allRegions = useMemo(() => getAllRegions(), [])

  const filteredRice = useMemo(() => {
    let results = riceDatabase

    if (searchQuery) {
      results = searchRice(searchQuery)
    }

    if (selectedTags.length > 0) {
      results = results.filter(rice =>
        selectedTags.every(tag => rice.tags.includes(tag))
      )
    }

    if (selectedRegion) {
      results = results.filter(rice =>
        rice.prefecture.includes(selectedRegion) ||
        (rice.specificArea && rice.specificArea.includes(selectedRegion))
      )
    }

    return results
  }, [searchQuery, selectedTags, selectedRegion])

  const toggleTag = (tag: RiceTag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSelectedTags([])
    setSelectedRegion('')
    setSearchQuery('')
  }

  const getStickinessLabel = (stickiness: Rice['texture']['stickiness']) => {
    const labels = {
      'very-low': 'あっさり',
      'low': 'やや控えめ',
      'medium': '普通',
      'high': '強い',
      'very-high': '非常に強い'
    }
    return labels[stickiness]
  }

  const getSweetnessLabel = (sweetness: Rice['flavor']['sweetness']) => {
    const labels = {
      'mild': 'ほのかな甘み',
      'moderate': '程よい甘み',
      'strong': '豊かな甘み',
      'very-strong': '濃厚な甘み'
    }
    return labels[sweetness]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-3 sm:mb-4 text-sm sm:text-base">
            <ArrowLeft className="w-3 sm:w-4 h-3 sm:h-4" />
            ホームに戻る
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">全国お米図鑑</h1>
          <p className="text-sm sm:text-base text-gray-600">日本の美味しい-お米ソムリエ- 全国のお米を探索しましょう</p>
        </header>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
              <input
                type="text"
                placeholder="お米の名前、産地、特徴で検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="self-start flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm sm:text-base"
            >
              <Filter className="w-3 sm:w-4 h-3 sm:h-4" />
              フィルター
            </button>
          </div>

          {showFilters && (
            <div className="border-t pt-3 sm:pt-4 space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">地域で絞り込み</label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full md:w-64 px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">すべての地域</option>
                  {allRegions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">タグで絞り込み</label>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={clearFilters}
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-800"
              >
                フィルターをクリア
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-3 sm:mb-4">
          <p className="text-sm sm:text-base text-gray-600">
            {filteredRice.length}件のお米が見つかりました
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredRice.map(rice => (
            <div key={rice.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{rice.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">{rice.nameReading}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    {rice.quality.hasSpecialA && (
                      <div className="flex items-center gap-0.5 sm:gap-1 bg-yellow-100 text-yellow-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs flex-shrink-0">
                        <Star className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                        特A
                      </div>
                    )}
                    <FavoriteButton 
                      riceId={rice.id} 
                      className="flex-shrink-0"
                    />
                  </div>
                </div>

                <div className="mb-3 sm:mb-4 space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs bg-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex-shrink-0">産地</span>
                    <span className="text-xs sm:text-sm text-gray-700">{rice.prefecture} {rice.specificArea}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs bg-blue-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex-shrink-0">食感</span>
                    <span className="text-xs sm:text-sm text-gray-700">{getStickinessLabel(rice.texture.stickiness)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs bg-amber-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex-shrink-0">甘み</span>
                    <span className="text-xs sm:text-sm text-gray-700">{getSweetnessLabel(rice.flavor.sweetness)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs bg-green-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex-shrink-0">粒感</span>
                    <span className="text-xs sm:text-sm text-gray-700">
                      {rice.texture.grainSize === 'large' ? '大粒' : 
                       rice.texture.grainSize === 'small' ? '小粒' : '中粒'}
                    </span>
                  </div>
                </div>

                <div className="mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm text-gray-700 line-clamp-2 sm:line-clamp-3">
                    {rice.characteristics.join('、')}
                  </p>
                </div>

                <div className="mb-3 sm:mb-4">
                  <p className="text-xs text-gray-500 mb-0.5 sm:mb-1">相性の良い料理</p>
                  <p className="text-xs sm:text-sm text-gray-700 line-clamp-2">
                    {rice.recommendedDishes.join('、')}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                  {rice.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                  {rice.tags.length > 3 && (
                    <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-gray-400 text-xs">
                      +{rice.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* アフィリエイトリンク */}
                {rice.affiliateLink && (
                  <div className="border-t pt-3 sm:pt-4 text-center">
                    <p className="text-xs text-gray-500 mb-1.5 sm:mb-2">購入はこちら</p>
                    <div className="affiliate-link-container scale-90 sm:scale-100" dangerouslySetInnerHTML={{ __html: rice.affiliateLink }} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredRice.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-500 text-base sm:text-lg mb-3 sm:mb-4">お米が見つかりませんでした</p>
            <button
              onClick={clearFilters}
              className="text-sm sm:text-base text-blue-600 hover:text-blue-800"
            >
              フィルターをクリアして再検索
            </button>
          </div>
        )}
      </div>
    </div>
  )
}