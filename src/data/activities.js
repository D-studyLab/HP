// src/data/activities.js

export const activities = [
  // --- イベント ---
  {
    id: 'event-20250715-tovlab',
    category: 'イベント',
    date: '2025-07-15',
    title: 'スマホだけで？！知識ゼロでアプリ開発 × AIでテスト対策 体験セミナー',
    description: '知識ゼロからでも参加できるアプリ開発とAI活用の体験セミナーです。',
    thumbnail: '/event-20250715-tovlab.png',
    thumbnailPosition: 'center 0%',
    link: '/activities/event-20250715-tovlab', // 内部リンクを修正
    target: '_self',
    // 動的インポートで詳細コンポーネントを指定
    component: () => import('@/views/activities/details/Activity-20250715.vue')
  },

  // --- 開発実績 ---
  {
    id: 'dev-gandaifoody',
    category: '開発実績',
    date: '2024-11-20',
    title: 'GandaiFoody - 岩大生のための学食レビューアプリ',
    description: 'Vue.jsとFirebaseを用いて開発。岩手大学の学生向けに、学食のメニューやレビューを共有するプラットフォームを提供しました。',
    thumbnail: '/D-studyLab_logo.png', // 仮のサムネイル
    thumbnailPosition: 'center center',
    link: 'https://github.com/your-repo/gandaifoody', // GitHubなどへの外部リンク
    target: '_blank'
  },
  {
    id: 'dev-portfolio',
    category: '開発実績',
    date: '2025-01-15',
    title: '自身のポートフォリオサイト',
    description: '本サイト（D-study Lab HP）もVue.js(Vite)を用いて開発しています。デザインから実装まで一貫して担当しました。',
    thumbnail: '/D-studyLab_logo.png', // 仮のサムネイル
    thumbnailPosition: 'center center',
    link: 'https://d-studylab.jp',
    target: '_blank'
  },

  // --- 活動レポート ---
  {
    id: 'report-20250801',
    category: '活動レポート',
    date: '2025-08-01',
    title: '夏期講習「情報Ⅰ対策講座」を開催しました',
    description: '高校生を対象にした夏期集中講座のレポートです。当日の様子や参加者の声などをまとめています。',
    thumbnail: '/D-studyLab_logo.png', // 仮のサムネイル
    thumbnailPosition: 'center center',
    link: '#', // ブログ記事への内部リンク（仮）
    target: '_self'
  },
  {
    id: 'report-20250720',
    category: '活動レポート',
    date: '2025-07-20',
    title: '外部カンファレンスでの登壇報告',
    description: '都内で開催された技術カンファレンスにて、Vue.jsの最新動向について発表した際の資料とレポートです。',
    thumbnail: '/D-studyLab_logo.png', // 仮のサムネイル
    thumbnailPosition: 'center center',
    link: '#', // ブログ記事への内部リンク（仮）
    target: '_self'
  }
];
