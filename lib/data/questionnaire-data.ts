import { Question } from './questionnaire-types'

export const questions: Record<string, Question> = {
  start: {
    id: 'start',
    text: '硬めのしっかりとしたご飯と、柔らかくもちもちしたご飯、どちらがお好みですか？',
    yesNext: 'dishes-firm',
    noNext: 'dishes-soft'
  },

  'dishes-firm': {
    id: 'dishes-firm',
    text: 'カレーや丼物、味の濃いおかずをよく食べますか？',
    yesNext: 'usage-firm-heavy',
    noNext: 'usage-firm-light'
  },

  'dishes-soft': {
    id: 'dishes-soft',
    text: '和食や魚料理などあっさりしたおかずを好みますか？',
    yesNext: 'sweetness-soft-japanese',
    noNext: 'sweetness-soft-rich'
  },

  'usage-firm-heavy': {
    id: 'usage-firm-heavy',
    text: 'お弁当に入れて食べることが多いですか？',
    yesNext: 'grain-firm-heavy-bento',
    noNext: 'grain-firm-heavy-fresh'
  },

  'usage-firm-light': {
    id: 'usage-firm-light',
    text: 'お寿司や手巻き寿司をよく作りますか？',
    yesNext: 'sushi-specialist',
    noNext: 'light-dishes'
  },

  'sweetness-soft-japanese': {
    id: 'sweetness-soft-japanese',
    text: 'お米自体の甘みをしっかり感じたいですか？',
    yesNext: 'premium-sweet-japanese',
    noNext: 'balanced-japanese'
  },

  'sweetness-soft-rich': {
    id: 'sweetness-soft-rich',
    text: 'ガツンと来る濃厚な味わいが好きですか？',
    yesNext: 'premium-rich',
    noNext: 'balanced-rich'
  },

  'grain-firm-heavy-bento': {
    id: 'grain-firm-heavy-bento',
    text: '大粒でしっかりした食べ応えを求めますか？',
    yesNext: 'large-grain-bento',
    noNext: 'medium-grain-bento'
  },

  'grain-firm-heavy-fresh': {
    id: 'grain-firm-heavy-fresh',
    text: '新品種や話題のお米に興味がありますか？',
    yesNext: 'new-varieties-heavy',
    noNext: 'classic-heavy'
  },

  'sushi-specialist': {
    id: 'sushi-specialist',
    text: '特にこだわりの寿司米をお探しですか？',
    yesRecommendations: ['sasanishiki', 'hatsushimo', 'aki-no-uta'],
    noRecommendations: ['nanatsuboshi', 'aichi-no-kaori', 'hyakumangoku']
  },

  'light-dishes': {
    id: 'light-dishes',
    text: 'あっさりした味わいを重視しますか？',
    yesRecommendations: ['ginga-no-shizuku', 'nanatsuboshi', 'akiroman'],
    noRecommendations: ['tochigi-no-hoshi', 'yukiwakamaru', 'ten-no-tsubu']
  },

  'premium-sweet-japanese': {
    id: 'premium-sweet-japanese',
    text: '特A評価などプレミアムなお米をお求めですか？',
    yesRecommendations: ['tsuyahime', 'ichihomare', 'tajima-koshihikari'],
    noRecommendations: ['hitomebore', 'akitakomachi', 'mizukagami']
  },

  'balanced-japanese': {
    id: 'balanced-japanese',
    text: '毎日食べても飽きない万能なお米がお好みですか？',
    yesRecommendations: ['hitomebore', 'mori-no-kumasan', 'oidemai'],
    noRecommendations: ['kinumusume', 'akisakari', 'yume-shizuku']
  },

  'premium-rich': {
    id: 'premium-rich',
    text: 'インパクトのある最高級品種をお探しですか？',
    yesRecommendations: ['yumepirika', 'datemasayume', 'kumasan-no-kagayaki'],
    noRecommendations: ['milky-queen', 'nikomaru', 'sagabiyori']
  },

  'balanced-rich': {
    id: 'balanced-rich',
    text: '粘りが強く、でも使いやすいお米がお好みですか？',
    yesRecommendations: ['koshihikari', 'shinnosuke', 'fufufu'],
    noRecommendations: ['genkitsukushi', 'yume-tsukushi', 'element-rich-alt']
  },

  'large-grain-bento': {
    id: 'large-grain-bento',
    text: '特A評価の高級米をお求めですか？',
    yesRecommendations: ['sagabiyori', 'akihonami', 'koi-no-yokan'],
    noRecommendations: ['hyakumangoku', 'tsubusuke', 'yukiwakamaru']
  },

  'medium-grain-bento': {
    id: 'medium-grain-bento',
    text: 'コストパフォーマンスを重視しますか？',
    yesRecommendations: ['haenuki', 'akitakomachi', 'hinohikari'],
    noRecommendations: ['tsuyahime', 'yume-tsukushi', 'fukkurinko']
  },

  'new-varieties-heavy': {
    id: 'new-varieties-heavy',
    text: '今話題の最新品種に興味がありますか？',
    yesRecommendations: ['sakihokore', 'yudai21', 'niji-no-kirameki'],
    noRecommendations: ['yukiwakamaru', 'ten-no-tsubu', 'tochigi-no-hoshi']
  },

  'classic-heavy': {
    id: 'classic-heavy',
    text: '定番で安心できるブランドをお好みですか？',
    yesRecommendations: ['koshihikari', 'shinnosuke', 'seiten-no-hekireki'],
    noRecommendations: ['himeno-rin', 'haruru', 'yosakoi-bijin']
  }
}

export const getFirstQuestion = (): Question => questions.start