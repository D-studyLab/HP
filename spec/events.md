### **Events 機能 追加仕様書 (詳細版)**

#### **1. 目的**
- D-study Lab HPのLPに「News」セクションを追加し、イベント情報をHP上で効果的に告知する。
- イベント情報を**カード式カルーセル**で表示し、ユーザーが直感的に情報を探せるようにする。
- 各イベントカードから詳細ページへシームレスに遷移できるようにし、詳細情報へのアクセスを容易にする。

#### **2. 全体的なアーキテクチャ**
この機能は、以下の要素を連携させて実現します。

1.  **イベントデータストア (`src/data/events.js`)**: 全イベントのメタデータ（ID, タイトル, 日付, サムネイル画像パス, 詳細ページのコンポーネント情報）を一元管理するファイル。
2.  **LP (`src/views/LP.vue`)**: データストアからイベント情報を読み込み、カルーセル形式でイベントカードを一覧表示する。
3.  **イベントカード (`src/components/EventCard.vue`)**: 個々のイベント概要を表示する再利用可能なコンポーネント。
4.  **ルーター (`src/router/index.js`)**: `/events/:id` のような動的ルートを定義し、URLに応じて適切なイベント詳細ページを表示する。
5.  **イベント詳細ページテンプレート (`src/views/events/EventsTemplate.vue`)**: ルーターから受け取ったIDに基づき、対応するイベントの詳細内容を動的に描画するコンポーネント。
6.  **各イベントの詳細内容 (`src/views/events/details/Event1.vue`, etc.)**: 各イベント固有の詳しい情報が記述されたコンポーネント。

#### **3. ファイル構成**
以下のファイルを作成・修正します。

```
C:/D-studyLab-HP/
├── src/
│   ├── components/
│   │   └── EventCard.vue              # (新規作成) イベントカードコンポーネント
│   ├── data/
│   │   └── events.js                  # (新規作成) イベント情報の一元管理ファイル
│   ├── router/
│   │   └── index.js                   # (修正) イベント詳細ページへのルートを追加
│   └── views/
│       ├── LP.vue                     # (修正) カルーセルを設置
│       └── events/
│           ├── EventsTemplate.vue     # (新規作成) 詳細ページのテンプレート
│           └── details/               # (新規作成) 詳細コンテンツ用ディレクトリ
│               ├── Event1.vue         # (新規作成) イベント1の詳細
│               └── Event2.vue         # (新規作成) イベント2の詳細
└── package.json                       # (修正の可能性) カルーセル用ライブラリを追加
```

#### **4. データ構造 (`src/data/events.js`)**
イベント情報を管理するJavaScriptファイルを作成します。これにより、イベントの追加や修正が容易になります。

```javascript:src/data/events.js
// イベントのメタデータを定義
export const events = [
  {
    id: 'event-1', // URLやキーとして使用する一意のID
    title: '第一回もくもく会',
    date: '2025-07-20',
    thumbnail: '/src/assets/event_thumbnails/event1_thumb.png', // サムネイル画像のパス
    // 詳細ページコンポーネントを動的インポートで指定
    component: () => import('@/views/events/details/Event1.vue')
  },
  {
    id: 'event-2',
    title: '夏休みハッカソン',
    date: '2025-08-10',
    thumbnail: '/src/assets/event_thumbnails/event2_thumb.png',
    component: () => import('@/views/events/details/Event2.vue')
  },
  // ... 今後のイベントはここに追加
];
```

#### **5. コンポーネント詳細**

**a. `EventCard.vue`**
- **役割**: イベントの概要を表示するカード。
- **Props**: `title` (String), `date` (String), `thumbnail` (String) を受け取ります。
- **動作**: カード全体がクリック可能で、クリックされると対応するイベント詳細ページ（例: `/events/event-1`）に遷移します。

**b. `LP.vue`**
- **役割**: イベントカルーセルを「5. 受講の流れ」と「6. クロージING」の間に表示します。
- **実装**:
    1. `src/data/events.js` から `events` 配列をインポートします。
    2. [Swiper.js](https://swiperjs.com/vue) などのカルーセルライブラリを導入します。（導入は別途確認します）
    3. `events` 配列を `v-for` でループし、各イベントの情報を `EventCard.vue` コンポーネントにPropsとして渡して描画します。

**c. `EventsTemplate.vue`**
- **役割**: イベント詳細ページの共通レイアウト・テンプレート。
- **実装**:
    1. Vue Routerから動的パラメータ `:id` を受け取ります。
    2. 受け取った `id` を使って `src/data/events.js` の `events` 配列から該当するイベントオブジェクトを検索します。
    3. 見つかったイベントオブジェクトの `component` プロパティを使い、Vueの動的コンポーネント `<component :is="..."></component>` を使って、対応するイベント詳細（`Event1.vue`など）を描画します。

**d. `details/Event1.vue` など**
- **役割**: 個別イベントの詳細な内容（目的、日時、場所、対象者、持ち物、申し込みフォームへのリンクなど）を自由に記述します。

#### **6. ルーティング (`src/router/index.js`)**
イベント詳細ページを表示するための動的ルートを追加します。

```javascript:src/router/index.js
// ... 既存のimport
import EventsTemplate from '@/views/events/EventsTemplate.vue';

const routes = [
  // ... 既存のルート
  {
    path: '/events/:id', // :id部分が動的に変わる
    name: 'EventDetail',
    component: EventsTemplate
  }
];

// ... 既存のルーター設定
```
