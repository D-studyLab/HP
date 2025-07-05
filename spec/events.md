### **Events 機能 実装仕様書 (更新版)**

#### **1. 目的**
- D-study Lab HPのLPに「News」セクションを追加し、イベント情報をHP上で効果的に告知する。
- イベント情報を**カード式カルーセル**で表示し、ユーザーが直感的に情報を探せるようにする。
- 各イベントカードから詳細ページへシームレスに遷移できるようにし、詳細情報へのアクセスを容易にする。

#### **2. 全体的なアーキテクチャ**
この機能は、以下の要素を連携させて実現します。

1.  **イベントデータストア (`src/data/events.js`)**: 全イベントのメタデータ（ID, タイトル, 日付, サムネイル画像パス, サムネイル表示位置、詳細ページのコンポーネント情報）を一元管理するファイル。
2.  **LP (`src/views/LP.vue`)**: データストアからイベント情報を読み込み、カルーセル形式でイベントカードを一覧表示する。
3.  **イベントカード (`src/components/EventCard.vue`)**: 個々のイベント概要を表示する再利用可能なコンポーネント。サムネイル画像の表示位置調整機能を持つ。
4.  **ルーター (`src/router/index.js`)**: `/events/:id` のような動的ルートを定義し、URLに応じて適切なイベント詳細ページを表示する。
5.  **アプリケーションのメインコンポーネント (`src/App.vue`)**: ナビゲーションに「News」セクションへのリンクを追加し、Vue Routerの`<router-view>`を介してLPまたはイベント詳細ページをレンダリングする。
6.  **イベント詳細ページテンプレート (`src/views/events/EventsTemplate.vue`)**: ルーターから受け取ったIDに基づき、対応するイベントの詳細内容を動的に描画するコンポーネント。
7.  **各イベントの詳細内容 (`src/views/events/details/Event-YYYYMMDD.vue`, etc.)**: 各イベント固有の詳しい情報が記述されたコンポーネント。

#### **3. ファイル構成**
以下のファイルを作成・修正しました。

```
C:/D-studyLab-HP/
├── public/                        # (変更) イベントのサムネイル画像保存先
│   └── event-20250715-tovlab.png  # (AIが移動・リネーム)
├── src/
│   ├── App.vue                    # (修正) ナビゲーションにNews追加、<router-view>設置
│   ├── components/
│   │   └── EventCard.vue          # (修正) イベントカードコンポーネント、サムネイル位置調整機能追加、カード高さ固定、タイトル省略表示
│   ├── data/
│   │   └── events.js              # (AIが更新) イベント情報の一元管理ファイル、thumbnailPosition追加
│   ├── router/
│   │   └── index.js               # (修正) イベント詳細ページへのルートを追加
│   └── views/
│       ├── LP.vue                 # (修正) カルーセルを設置、NewsセクションにID追加、カスタムページネーション実装
│       └── events/
│           ├── EventsTemplate.vue # (新規作成/修正) 詳細ページのテンプレート
│           └── details/
│               └── Event-20250715.vue # (AIが生成/修正) イベント詳細コンポーネント、画像パス修正
├── vite.config.js                 # (修正) パスエイリアス `@` を追加
└── package.json                   # (修正の可能性) カルーセル用ライブラリを追加
```

#### **4. データ構造 (`src/data/events.js`)**
イベント情報を管理するJavaScriptファイル。**このファイルは主にAIが更新します。**

```javascript:src/data/events.js
// イベントのメタデータを定義
export const events = [
  {
    id: 'event-20250715-tovlab', // URLやキーとして使用する一意のID
    title: 'スマホだけで？！知識ゼロでアプリ開発 × AIでテスト対策 体験セミナー',
    date: '2025-07-15',
    thumbnail: '/event-20250715-tovlab.png', // publicディレクトリからのルート相対パス
    thumbnailPosition: 'center 30%', // サムネイル画像の表示位置 (CSS object-positionと同じ形式)
    // 詳細ページコンポーネントを動的インポートで指定
    component: () => import('@/views/events/details/Event-20250715.vue')
  },
  // ... 新しいイベントはAIによってここに追加される
];
```
**`thumbnailPosition` プロパティについて:**
`EventCard.vue` でサムネイル画像の表示位置を調整するために使用します。CSSの `object-position` プロパティと同じ値を指定できます。
例: `'top'`, `'center'`, `'bottom'`, `'left'`, `'right'`, `'20% 30%'` など。

#### **5. コンポーネント詳細**

**a. `EventCard.vue`**
- **役割**: イベントの概要を表示するカード。すべてのカードが均一な高さで表示されるように調整されています。
- **Props**: `event` (Object) を受け取ります。`event` オブジェクトは `id`, `title`, `date`, `thumbnail`, `thumbnailPosition` (Optional) プロパティを持ちます。
- **実装**:
    - `event.thumbnail` を `<img>` タグの `src` にバインドし、`event.thumbnailPosition` を `object-position` スタイルに適用します。
    - カード全体に固定の高さを設定し、タイトルが長すぎる場合は `line-clamp` を使用して複数行で省略表示します。
- **動作**: クリックで対応するイベント詳細ページへ遷移します。

**b. `LP.vue`**
- **役割**: イベントカルーセルを「5. 受講の流れ」と「6. クロージング」の間に表示します。
- **実装**:
    1. `@/data/events.js` から `events` 配列をインポートします。
    2. カルーセルライブラリ(Swiper.js)を導入し、ページネーション（インジケーター）をカスタム要素として実装しました。
    3. `events` 配列をループし、`EventCard.vue` を描画します。
    4. Newsセクションに `id="events"` を追加し、ナビゲーションからの直接リンクを可能にしました。

**c. `EventsTemplate.vue`**
- **役割**: イベント詳細ページの共通レイアウト・テンプレート。
- **実装**:
    1. Vue Routerから動的パラメータ `:id` を受け取ります。
    2. `id` を基に `@/data/events.js` から該当イベントを検索します。
    3. 該当イベントの `component` を動的に読み込み、表示します。

**d. `details/Event-YYYYMMDD.vue` など**
- **役割**: **ユーザー提供のテキストに基づき、AIが生成するコンポーネント。** イベント固有の詳細な内容（タイトル、本文、画像など）を含みます。
- **実装**: 内部で画像を参照する場合、`public`ディレクトリからのルート相対パスを使用します。

**e. `App.vue`**
- **役割**: アプリケーション全体のレイアウトとナビゲーションを管理します。
- **実装**:
    1. PC版とモバイル版のサイドナビゲーション/ドロワーに「News」へのリンクを追加しました。
    2. ページ遷移にVue Routerの `router.push` を使用するように `goto` 関数を修正しました。
    3. LPコンポーネントを直接レンダリングする代わりに、`<router-view>` を使用して、ルーティングによって適切なコンポーネント（LPまたはイベント詳細）がレンダリングされるようにしました。

#### **6. ルーティング (`src/router/index.js`)**
イベント詳細ページを表示するための動的ルートを追加します。

```javascript:src/router/index.js
// ... 既存のimport
import EventsTemplate from '@/views/events/EventsTemplate.vue';

const routes = [
  {
    path: '/',
    name: 'LP',
    component: LP, // LPはルートパスで表示される
  },
  {
    path: '/events/:id', // :id部分が動的に変わる
    name: 'EventDetail',
    component: EventsTemplate
  }
];

// ... 既存のルーター設定
```

#### **7. Vite 設定 (`vite.config.js`)**
パスエイリアス `@` を `src` ディレクトリに解決するように設定しました。これにより、`src` 以下のモジュールを `@/` で簡潔にインポートできます。

```javascript:vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

---

### **8. イベント追加のワークフロー (最終版)**
新しいイベントを追加する際の、ユーザーとAIの最も効率的な作業分担は以下の通りです。

#### **Step 1: ユーザーの作業**

1.  **イベント情報の準備**:
    *   イベント詳細を記述した**テキストファイル**（例: `event_detail.txt`）を作成します。
    *   イベントのサムネイルとなる**画像ファイル**（例: `event_flyer.png`）を用意します。
    *   これらのファイルは、**PC上のどこに置いても構いません。**

2.  **AIへの指示**:
    *   以下のように、作成した2つのファイルの絶対パスを私に伝えてください。
        ```
        イベントページを作成してください。
        テキスト: C:\Users\YourName\Desktop\event_detail.txt
        画像: C:\Users\YourName\Desktop\event_flyer.png
        ```

#### **Step 2: AIの作業**

1.  **ファイルの取得と整理**:
    *   指示されたパスからテキストファイルと画像ファイルを読み込みます。
    *   画像ファイルをプロジェクト内の `public/` ディレクトリに適切な名前（例: `event-YYYYMMDD-イベント名.png`）で移動・リネームします。
2.  **情報抽出とコンポーネント生成**:
    *   テキストファイルの内容を解析し、タイトル、日付、詳細本文などの情報を抽出します。
    *   抽出した情報と画像のパスを元に、`src/views/events/details/` ディレクトリ内に新しいVueコンポーネント（例: `Event-YYYYMMDD.vue`）を自動生成します。
3.  **データストアの更新**:
    *   `src/data/events.js` を読み込み、新しいイベントのメタデータ（ID, タイトル, 日付, 画像パス, `thumbnailPosition` (必要に応じて), 生成したコンポーネントへの参照）を配列に追記します。
4.  **完了報告**:
    *   全ての作業が完了したことを報告します。ユーザーはブラウザでLPをリロードし、カルーセルに新しいイベントが追加され、詳細ページが正しく表示されることを確認します。