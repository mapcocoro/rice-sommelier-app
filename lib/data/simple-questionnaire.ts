export interface SimpleQuestion {
  id: string
  text: string
  description?: string
  yesLabel: string
  noLabel: string
  yesNext?: string
  noNext?: string
  yesRecommendations?: string[]
  noRecommendations?: string[]
  category: 'texture' | 'usage' | 'dishes' | 'taste' | 'final'
}

export const simpleQuestions: Record<string, SimpleQuestion> = {
  // === 開始：食感の好み ===
  texture_start: {
    id: 'texture_start',
    text: 'ご飯の食感はどちらがお好みですか？',
    description: 'まずは基本的な食感の好みを教えてください',
    yesLabel: 'もちもち・ねっとりした食感',
    noLabel: 'さらっと・あっさりした食感',
    yesNext: 'price_preference',
    noNext: 'usage_light_type',
    category: 'texture'
  },

  // === 価格帯の好み ===
  price_preference: {
    id: 'price_preference',
    text: 'お米選びで価格はどの程度重視しますか？',
    description: '品質と価格のバランス',
    yesLabel: '品質重視で、価格は気にしない',
    noLabel: 'コスパ重視で、毎日食べやすい価格',
    yesNext: 'usage_mochi_premium',
    noNext: 'usage_mochi_standard',
    category: 'usage'
  },

  // === もちもち派（プレミアム）の用途質問 ===
  usage_mochi_premium: {
    id: 'usage_mochi_premium',
    text: 'プレミアムなもちもち米で、どんな食べ方をしますか？',
    description: '高級米の楽しみ方',
    yesLabel: '白米で、お米本来の味を堪能したい',
    noLabel: '特別な日の料理や来客時に使いたい',
    yesNext: 'taste_premium_rice',
    noNext: 'occasion_special',
    category: 'usage'
  },

  // === もちもち派（スタンダード）の用途質問 ===
  usage_mochi_standard: {
    id: 'usage_mochi_standard',
    text: 'コスパの良いもちもち米で、主な食べ方は？',
    description: '毎日のもちもち米の使い方',
    yesLabel: '白米やおにぎりで、お米の味を楽しみたい',
    noLabel: 'おかずと一緒に、バランス良く食べたい',
    yesNext: 'taste_mochi_rice_main',
    noNext: 'dishes_mochi_with_side',
    category: 'usage'
  },

  // === あっさり派の用途質問 ===
  usage_light_type: {
    id: 'usage_light_type',
    text: 'あっさりしたお米で、どちらを重視しますか？',
    description: 'さらっとした食感の活かし方',
    yesLabel: '寿司やお茶漬けなど、特別な用途',
    noLabel: '毎日の食事で、どんな料理にも合わせたい',
    yesNext: 'final_sushi_specialist',
    noNext: 'dishes_light_daily',
    category: 'usage'
  },

  // === プレミアム白米の味わい質問 ===
  taste_premium_rice: {
    id: 'taste_premium_rice',
    text: '最高級米の味わいで特に求めるのは？',
    description: 'プレミアム米の選び方',
    yesLabel: '圧倒的な甘みと濃厚さ',
    noLabel: '上品で繊細な味わい',
    yesRecommendations: ['yumepirika', 'koshihikari-uonuma', 'kumasan-no-kagayaki', 'milky-queen'],
    noRecommendations: ['tsuyahime', 'ichihomare', 'shinnosuke', 'sakihokore'],
    category: 'taste'
  },

  // === 特別な機会での使用 ===
  occasion_special: {
    id: 'occasion_special',
    text: '特別な日にはどのような料理を作りますか？',
    description: '特別な機会での料理',
    yesLabel: '和食中心で、お米の味を活かしたい',
    noLabel: '洋食や多国籍料理も含めて幅広く',
    yesRecommendations: ['koshihikari-uonuma', 'tsuyahime', 'kumasan-no-kagayaki', 'shinnosuke'],
    noRecommendations: ['yukiwakamaru', 'nanatsuboshi', 'ginga-no-shizuku', 'hitomebore'],
    category: 'dishes'
  },

  // === もちもち×白米派の味わい質問 ===
  taste_mochi_rice_main: {
    id: 'taste_mochi_rice_main',
    text: 'お米の味わいで特に重視するのは？',
    description: '白米で食べる時の味の好み',
    yesLabel: 'とにかく甘くて濃厚な味わい',
    noLabel: '上品でバランスの良い味わい',
    yesNext: 'cooking_frequency',
    noNext: 'regional_preference',
    category: 'taste'
  },

  // === 炊飯頻度 ===
  cooking_frequency: {
    id: 'cooking_frequency',
    text: 'ご飯を炊く頻度はどのくらいですか？',
    description: '甘い味わいのお米での炊飯習慣',
    yesLabel: '毎日炊いて、常に美味しいものを',
    noLabel: '週に数回程度',
    yesRecommendations: ['datemasayume', 'fukkurinko', 'yudai21', 'kumasan-no-kagayaki'],
    noRecommendations: ['yumepirika', 'koshihikari-uonuma', 'milky-queen', 'oboroduki'],
    category: 'final'
  },

  // === 地域の好み ===
  regional_preference: {
    id: 'regional_preference',
    text: '特定の地域のお米に興味はありますか？',
    description: '上品な味わいの地域別選択',
    yesLabel: '北海道・東北の新しいブランド米',
    noLabel: '全国から幅広く選びたい',
    yesRecommendations: ['tsuyahime', 'niji-no-kirameki', 'sakihokore', 'ginga-no-shizuku'],
    noRecommendations: ['shinnosuke', 'ichihomare', 'koshihikari-tanba', 'sagabiyori'],
    category: 'final'
  },

  // === もちもち×おかず派の料理質問 ===
  dishes_mochi_with_side: {
    id: 'dishes_mochi_with_side',
    text: 'どのような料理と合わせることが多いですか？',
    description: 'もちもちご飯に合わせる料理',
    yesLabel: '肉料理や味の濃いおかず',
    noLabel: '魚料理や野菜料理、あっさりしたおかず',
    yesNext: 'grain_size_preference',
    noNext: 'cooking_method',
    category: 'dishes'
  },

  // === 粒の大きさの好み ===
  grain_size_preference: {
    id: 'grain_size_preference',
    text: '濃い味の料理に合わせる時、粒の大きさは？',
    description: '濃厚な料理とのバランス',
    yesLabel: '大粒でしっかりした食べ応え',
    noLabel: '標準的な粒で食べやすさ重視',
    yesRecommendations: ['koshihikari-ibaraki', 'ten-no-tsubu', 'yukiwakamaru', 'kumasan-no-kagayaki'],
    noRecommendations: ['shinnosuke', 'koshihikari-tanba', 'sagabiyori', 'mori-no-kumasan'],
    category: 'final'
  },

  // === 調理方法の好み ===
  cooking_method: {
    id: 'cooking_method',
    text: 'あっさりした料理では、どんな調理法が多いですか？',
    description: '軽い料理での調理スタイル',
    yesLabel: '煮物や蒸し物など、和食中心',
    noLabel: '炒め物やサラダなど、多様な調理',
    yesRecommendations: ['hitomebore', 'akitakomachi', 'tsuyahime', 'haenuki'],
    noRecommendations: ['mori-no-kumasan', 'ginga-no-shizuku', 'mizukagami', 'nanatsuboshi'],
    category: 'final'
  },

  // === あっさり×毎日派の料理質問 ===
  dishes_light_daily: {
    id: 'dishes_light_daily',
    text: '普段よく食べる料理は？',
    description: 'あっさりご飯と合わせる日常料理',
    yesLabel: 'カレーや丼物、チャーハンなど',
    noLabel: '和食中心で、弁当やおにぎりも',
    yesNext: 'final_curry_bowl',
    noNext: 'bento_frequency',
    category: 'dishes'
  },

  // === 弁当の頻度 ===
  bento_frequency: {
    id: 'bento_frequency',
    text: 'お弁当を作る頻度はどのくらいですか？',
    description: '弁当・おにぎりでの使用頻度',
    yesLabel: '毎日または週に数回作る',
    noLabel: 'たまに作る程度',
    yesNext: 'final_japanese_bento',
    noNext: 'home_cooking_style',
    category: 'usage'
  },

  // === 家庭料理スタイル ===
  home_cooking_style: {
    id: 'home_cooking_style',
    text: '家庭料理で重視することは？',
    description: '日常の食事での優先事項',
    yesLabel: '栄養バランスと健康を重視',
    noLabel: '美味しさと満足感を重視',
    yesRecommendations: ['hitomebore', 'mizukagami', 'ginga-no-shizuku', 'nanatsuboshi'],
    noRecommendations: ['hinohikari', 'tsuyahime', 'fukusmile', 'akitakomachi'],
    category: 'final'
  },

  // === 最終推薦：カレー・丼物派 ===
  final_curry_bowl: {
    id: 'final_curry_bowl',
    text: 'しっかりした粒感と食べ応えは重要ですか？',
    description: 'カレーや丼物に合うお米の特徴',
    yesLabel: 'はい、粒がしっかりして食べ応えが欲しい',
    noLabel: 'ほどほどで、バランス重視',
    yesRecommendations: ['yukiwakamaru', 'nanatsuboshi', 'seiten-no-hekireki', 'konjiki-no-kaze', 'ten-no-tsubu'],
    noRecommendations: ['ginga-no-shizuku', 'hinohikari', 'hitomebore', 'tobibikko', 'haenuki'],
    category: 'final'
  },

  // === 最終推薦：和食・弁当派 ===
  final_japanese_bento: {
    id: 'final_japanese_bento',
    text: '冷めても美味しいことは重要ですか？',
    description: '弁当やおにぎりでの美味しさ',
    yesLabel: 'とても重要、お弁当をよく作る',
    noLabel: 'そこそこで、温かい時の美味しさも大切',
    yesRecommendations: ['akitakomachi', 'ginga-no-shizuku', 'nanatsuboshi', 'mizukagami', 'haenuki', 'oboroduki'],
    noRecommendations: ['hitomebore', 'hinohikari', 'tsuyahime', 'fukusmile', 'fukkurinko'],
    category: 'final'
  },

  // === 最終推薦：寿司専門派 ===
  final_sushi_specialist: {
    id: 'final_sushi_specialist',
    text: '本格的な寿司米をお求めですか？',
    description: '寿司に特化したお米選び',
    yesLabel: 'はい、寿司専用として最適なもの',
    noLabel: '寿司にも使えるけど、普通の食事でも',
    yesRecommendations: ['sasanishiki', 'mizukagami', 'oboroduki'],
    noRecommendations: ['nanatsuboshi', 'seiten-no-hekireki', 'ginga-no-shizuku'],
    category: 'final'
  }
}

// 最初の質問を取得
export function getSimpleStartQuestion(): SimpleQuestion {
  return simpleQuestions.texture_start
}