export interface Rice {
  id: string
  name: string
  nameReading: string
  prefecture: string
  specificArea?: string
  
  // 食感の特徴
  texture: {
    stickiness: 'very-low' | 'low' | 'medium' | 'high' | 'very-high' // 粘り
    firmness: 'soft' | 'medium' | 'firm' // 硬さ
    grainSize: 'small' | 'medium' | 'large' // 粒の大きさ
    description: string // 食感の説明
  }
  
  // 味わいの特徴
  flavor: {
    sweetness: 'mild' | 'moderate' | 'strong' | 'very-strong' // 甘み
    umami: 'light' | 'balanced' | 'rich' // 旨み
    aroma: 'subtle' | 'moderate' | 'rich' // 香り
    description: string // 味わいの説明
  }
  
  // 品質・評価
  quality: {
    hasSpecialA: boolean
    specialAYears?: number
    rank: 'premium' | 'high' | 'standard' // ランク
    notes: string
  }
  
  // 料理との相性
  bestUses: {
    whitRice: boolean // 白米で美味しい
    onigiri: boolean // おにぎり向き
    bento: boolean // 弁当向き
    sushi: boolean // 寿司向き
    curry: boolean // カレー向き
    donburi: boolean // 丼物向き
    takikomi: boolean // 炊き込みご飯向き
    side: boolean // おかずと一緒に
  }
  
  // おすすめ料理
  recommendedDishes: string[]
  
  // 特徴・説明
  characteristics: string[]
  simpleDescription: string // 一言で表現
  detailedDescription: string // 詳しい説明
  
  // タグ
  tags: RiceTag[]
  
  // 価格帯
  priceRange: 'budget' | 'standard' | 'premium' | 'luxury'
  
  // 入手しやすさ
  availability: 'common' | 'regional' | 'limited' | 'rare'
  
  // アフィリエイトリンク
  affiliateLink?: string
}

export type RiceTag = 
  | 'もっちり' | 'あっさり' | 'しっかり' | 'ふっくら' | 'なめらか'
  | '大粒' | '小粒' | '中粒'
  | '冷めても美味しい' | '白米で美味しい' | '炊きたて最高'
  | '特A常連' | '新品種' | '伝統品種' | '地域限定'
  | '寿司向き' | 'カレー向き' | '弁当向き' | 'おにぎり向き' | '丼物向き'
  | 'プレミアム' | '万能型' | '初心者向き' | 'プロ仕様'
  | '甘み強い' | '旨み豊か' | 'さっぱり' | '香り良い'
  | '毎日食べたい' | '特別な日に' | 'コスパ良い' | '希少品種'