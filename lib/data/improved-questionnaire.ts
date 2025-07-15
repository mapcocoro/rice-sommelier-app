export interface DiagnosisQuestion {
  id: string
  text: string
  description?: string
  yesLabel: string
  noLabel: string
  yesNext?: string
  noNext?: string
  yesRecommendations?: string[]
  noRecommendations?: string[]
  category: 'texture' | 'dishes' | 'sweetness' | 'usage' | 'preference' | 'special'
}

export interface UserPreferences {
  texture: {
    firmness?: 'firm' | 'soft' // 硬め vs 柔らかめ
    stickiness?: 'sticky' | 'light' // 粘り強め vs あっさり
  }
  dishes: {
    type?: 'japanese' | 'western-heavy' | 'mixed' // 和食 vs 洋食・濃い味 vs 混合
  }
  sweetness: {
    level?: 'strong' | 'mild' // 甘み強め vs 控えめ
  }
  usage: {
    scene?: 'home' | 'bento' | 'special' // 家庭用 vs お弁当 vs 特別な時
  }
  preference: {
    type?: 'premium' | 'daily' | 'unique' // プレミアム vs 日常 vs 個性的
  }
}

export const improvedQuestions: Record<string, DiagnosisQuestion> = {
  // === 食感から開始 ===
  texture_start: {
    id: 'texture_start',
    text: 'ご飯の食感はどちらがお好みですか？',
    description: 'お米選びで最も重要なのは食感です',
    yesLabel: '硬めでしっかりした食感',
    noLabel: '柔らかくてもちもちした食感',
    yesNext: 'texture_firm_stickiness',
    noNext: 'texture_soft_stickiness',
    category: 'texture'
  },

  // === 硬め選択後の粘り質問 ===
  texture_firm_stickiness: {
    id: 'texture_firm_stickiness',
    text: '硬めのご飯の中でも、どちらがお好みですか？',
    description: 'しっかりとした食感の中での好みを教えてください',
    yesLabel: '粘りもしっかりある方が好き',
    noLabel: 'あっさりしてサラッとした方が好き',
    yesNext: 'dishes_firm_sticky',
    noNext: 'dishes_firm_light',
    category: 'texture'
  },

  // === 柔らかめ選択後の粘り質問 ===
  texture_soft_stickiness: {
    id: 'texture_soft_stickiness',
    text: '柔らかいご飯の中でも、どちらがお好みですか？',
    description: 'もちもち感の程度について教えてください',
    yesLabel: 'とろけるようなもちもち感が好き',
    noLabel: 'ふんわり柔らかい程度が好き',
    yesNext: 'dishes_soft_very_sticky',
    noNext: 'dishes_soft_moderate',
    category: 'texture'
  },

  // === 料理の質問群 ===
  dishes_firm_sticky: {
    id: 'dishes_firm_sticky',
    text: 'どのような料理と一緒に食べることが多いですか？',
    description: 'しっかり粘りのあるお米に合わせる料理',
    yesLabel: 'カレーや丼物、味の濃いおかず',
    noLabel: '和食や魚料理、あっさりしたおかず',
    yesNext: 'sweetness_firm_sticky_heavy',
    noNext: 'sweetness_firm_sticky_light',
    category: 'dishes'
  },

  dishes_firm_light: {
    id: 'dishes_firm_light',
    text: 'お寿司やお茶漬けはお好きですか？',
    description: 'あっさりしたお米の特性を活かした料理',
    yesLabel: 'よく食べる・大好き',
    noLabel: 'あまり食べない',
    yesNext: 'usage_sushi_specialist',
    noNext: 'dishes_firm_light_alt',
    category: 'dishes'
  },

  dishes_firm_light_alt: {
    id: 'dishes_firm_light_alt',
    text: 'どちらの料理をよく食べますか？',
    yesLabel: 'チャーハンや炊き込みご飯',
    noLabel: '普通の白いご飯が中心',
    yesNext: 'usage_cooking_rice',
    noNext: 'sweetness_balanced_daily',
    category: 'dishes'
  },

  dishes_soft_very_sticky: {
    id: 'dishes_soft_very_sticky',
    text: 'ご飯そのものの味をじっくり楽しみたいですか？',
    description: 'もちもち食感を最大限楽しむスタイル',
    yesLabel: 'ご飯が主役の食事が好き',
    noLabel: 'おかずと一緒にバランスよく',
    yesNext: 'sweetness_rice_focused',
    noNext: 'dishes_soft_sticky_with_dishes',
    category: 'dishes'
  },

  dishes_soft_sticky_with_dishes: {
    id: 'dishes_soft_sticky_with_dishes',
    text: 'どのようなおかずと合わせることが多いですか？',
    yesLabel: '肉料理や濃い味のおかず',
    noLabel: '野菜料理や魚料理',
    yesNext: 'usage_heavy_dishes',
    noNext: 'usage_balanced_dishes',
    category: 'dishes'
  },

  dishes_soft_moderate: {
    id: 'dishes_soft_moderate',
    text: 'どのような食事スタイルが多いですか？',
    description: 'ふんわり柔らかなお米の使い方',
    yesLabel: '家族での食事、定食スタイル',
    noLabel: 'お弁当や一人での食事',
    yesNext: 'sweetness_family_style',
    noNext: 'usage_bento_focus',
    category: 'dishes'
  },

  // === 甘みの質問群 ===
  sweetness_firm_sticky_heavy: {
    id: 'sweetness_firm_sticky_heavy',
    text: 'お米自体の甘みはどの程度がお好みですか？',
    yesLabel: '甘みをしっかり感じたい',
    noLabel: 'ほどほどでおかずを邪魔しない程度',
    yesNext: 'usage_sweet_heavy',
    noNext: 'usage_balanced_heavy',
    category: 'sweetness'
  },

  sweetness_firm_sticky_light: {
    id: 'sweetness_firm_sticky_light',
    text: 'お米の味わいで重視することは？',
    yesLabel: 'お米の甘みや旨み',
    noLabel: 'おかずとの調和',
    yesNext: 'usage_rice_flavor',
    noNext: 'usage_harmony',
    category: 'sweetness'
  },

  sweetness_rice_focused: {
    id: 'sweetness_rice_focused',
    text: 'お米の個性はどの程度求めますか？',
    yesLabel: '印象的で特別な美味しさ',
    noLabel: '上品で洗練された美味しさ',
    yesNext: 'preference_impact',
    noNext: 'preference_elegant',
    category: 'sweetness'
  },

  sweetness_family_style: {
    id: 'sweetness_family_style',
    text: '毎日食べても飽きない味わいを重視しますか？',
    yesLabel: 'はい、毎日食べたい',
    noLabel: '時々特別感も欲しい',
    yesNext: 'preference_daily',
    noNext: 'preference_occasional_special',
    category: 'sweetness'
  },

  sweetness_balanced_daily: {
    id: 'sweetness_balanced_daily',
    text: 'お米に求めるのは？',
    yesLabel: '安定した美味しさ',
    noLabel: '少し個性的な味わい',
    yesNext: 'preference_stable',
    noNext: 'preference_unique',
    category: 'sweetness'
  },

  // === 使用シーンの質問群 ===
  usage_sushi_specialist: {
    id: 'usage_sushi_specialist',
    text: '本格的な寿司米をお求めですか？',
    yesLabel: '寿司に最適な専門的なお米',
    noLabel: '寿司にも使えるけど万能なお米',
    yesRecommendations: ['sasanishiki', 'hatsushimo', 'aki-no-uta'],
    noRecommendations: ['nanatsuboshi', 'aichi-no-kaori'],
    category: 'usage'
  },

  usage_cooking_rice: {
    id: 'usage_cooking_rice',
    text: '調理用のお米として使うことが多いですか？',
    yesLabel: 'はい、チャーハンや炊き込みご飯中心',
    noLabel: 'いいえ、白いご飯も楽しみたい',
    yesRecommendations: ['nanatsuboshi', 'hyakumangoku', 'ten-no-tsubu'],
    noRecommendations: ['yukiwakamaru', 'tochigi-no-hoshi'],
    category: 'usage'
  },

  usage_bento_focus: {
    id: 'usage_bento_focus',
    text: 'お弁当での美味しさを特に重視しますか？',
    yesLabel: '冷めても美味しいことが最重要',
    noLabel: '温かい時の美味しさも大切',
    yesNext: 'preference_bento_specialist',
    noNext: 'preference_all_round',
    category: 'usage'
  },

  // === 最終的な好み質問群 ===
  preference_impact: {
    id: 'preference_impact',
    text: '印象的なお米をお求めですか？',
    yesLabel: '最高級の特別なお米',
    noLabel: '美味しくて話題性もあるお米',
    yesRecommendations: ['yumepirika', 'datemasayume', 'kumasan-no-kagayaki'],
    noRecommendations: ['yudai21', 'niji-no-kirameki'],
    category: 'preference'
  },

  preference_elegant: {
    id: 'preference_elegant',
    text: '上品な味わいの中でも特にお求めなのは？',
    yesLabel: '特A評価の実績あるお米',
    noLabel: '新しくて注目のお米',
    yesRecommendations: ['tsuyahime', 'ichihomare', 'sagabiyori'],
    noRecommendations: ['sakihokore', 'konjiki-no-kaze'],
    category: 'preference'
  },

  preference_daily: {
    id: 'preference_daily',
    text: '毎日の食事での使いやすさを重視しますか？',
    yesLabel: 'はい、何にでも合う万能性',
    noLabel: 'たまには特別感も欲しい',
    yesRecommendations: ['hitomebore', 'mori-no-kumasan', 'oidemai'],
    noRecommendations: ['kinumusume', 'akisakari'],
    category: 'preference'
  },

  preference_bento_specialist: {
    id: 'preference_bento_specialist',
    text: 'お弁当用として特化したお米をお求めですか？',
    yesLabel: 'お弁当専用として最適なもの',
    noLabel: 'お弁当にも使える美味しいお米',
    yesRecommendations: ['haenuki', 'akitakomachi', 'milky-queen'],
    noRecommendations: ['tsuyahime', 'mizukagami', 'sagabiyori'],
    category: 'preference'
  },

  // 不足している質問定義を追加
  usage_heavy_dishes: {
    id: 'usage_heavy_dishes',
    text: 'より重視したいのはどちらですか？',
    yesLabel: 'お米の個性と味わい',
    noLabel: 'おかずとのバランス',
    yesRecommendations: ['yumepirika', 'datemasayume', 'sagabiyori'],
    noRecommendations: ['koshihikari', 'shinnosuke', 'nikomaru'],
    category: 'usage'
  },

  usage_balanced_dishes: {
    id: 'usage_balanced_dishes',
    text: 'どちらを重視しますか？',
    yesLabel: '特A評価などの品質',
    noLabel: '日常の使いやすさ',
    yesRecommendations: ['kinumusume', 'akisakari', 'tsuyahime'],
    noRecommendations: ['hitomebore', 'mori-no-kumasan', 'yume-shizuku'],
    category: 'usage'
  },

  preference_all_round: {
    id: 'preference_all_round',
    text: '万能なお米の中でも、どちらを重視しますか？',
    yesLabel: '有名ブランドの安心感',
    noLabel: '新しい品種の魅力',
    yesRecommendations: ['hitomebore', 'akitakomachi', 'hinohikari'],
    noRecommendations: ['ginga-no-shizuku', 'konjiki-no-kaze', 'oidemai'],
    category: 'preference'
  },

  usage_rice_flavor: {
    id: 'usage_rice_flavor',
    text: 'お米の味わいで特に求めるのは？',
    yesLabel: '特別感のある美味しさ',
    noLabel: '上品で洗練された味',
    yesRecommendations: ['tsuyahime', 'ichihomare', 'sakihokore'],
    noRecommendations: ['tajima-koshihikari', 'mizukagami', 'yume-shizuku'],
    category: 'usage'
  },

  usage_harmony: {
    id: 'usage_harmony',
    text: 'おかずとの調和で重視するのは？',
    yesLabel: '和食との相性',
    noLabel: '洋食との相性',
    yesRecommendations: ['hitomebore', 'akitakomachi', 'mori-no-kumasan'],
    noRecommendations: ['yukiwakamaru', 'hyakumangoku', 'ten-no-tsubu'],
    category: 'usage'
  },

  usage_sweet_heavy: {
    id: 'usage_sweet_heavy',
    text: '甘みの強いお米の中でも特に求めるのは？',
    yesLabel: 'インパクトのある甘さ',
    noLabel: 'バランスの取れた甘さ',
    yesRecommendations: ['yumepirika', 'datemasayume', 'kumasan-no-kagayaki'],
    noRecommendations: ['koshihikari', 'shinnosuke', 'sagabiyori'],
    category: 'usage'
  },

  usage_balanced_heavy: {
    id: 'usage_balanced_heavy',
    text: 'バランス重視の中でも特に重要なのは？',
    yesLabel: '食べ応えのある大粒',
    noLabel: '安定した美味しさ',
    yesRecommendations: ['tochigi-no-hoshi', 'yukiwakamaru', 'hyakumangoku'],
    noRecommendations: ['koshihikari', 'hitomebore', 'hinohikari'],
    category: 'usage'
  },

  preference_occasional_special: {
    id: 'preference_occasional_special',
    text: '特別感のあるお米として求めるのは？',
    yesLabel: '話題性のある新品種',
    noLabel: '実績のあるプレミアム米',
    yesRecommendations: ['sakihokore', 'yudai21', 'niji-no-kirameki'],
    noRecommendations: ['tsuyahime', 'ichihomare', 'sagabiyori'],
    category: 'preference'
  },

  preference_stable: {
    id: 'preference_stable',
    text: '安定した美味しさで特に重視するのは？',
    yesLabel: '冷めても美味しさが続く',
    noLabel: '炊きたての美味しさ',
    yesRecommendations: ['haenuki', 'akitakomachi', 'milky-queen'],
    noRecommendations: ['koshihikari', 'hitomebore', 'tsuyahime'],
    category: 'preference'
  },

  preference_unique: {
    id: 'preference_unique',
    text: '個性的な味わいで求めるのは？',
    yesLabel: '地域限定の特別なお米',
    noLabel: '新技術で作られた最新品種',
    yesRecommendations: ['natsu-no-emi', 'churahikari', 'asahi'],
    noRecommendations: ['niji-no-kirameki', 'yudai21', 'sakihokore'],
    category: 'preference'
  }
}

// 最初の質問を取得
export function getStartQuestion(): DiagnosisQuestion {
  return improvedQuestions.texture_start
}