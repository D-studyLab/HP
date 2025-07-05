# Events 機能 追加仕様書
## 目的
- D-study Lab HP のLP部分に，「News」部分を追加し，チラシやリール動画で集めた流入を HP からもイベント内容や詳細を確認できるようにする
- 過去／今後のイベント情報を **カード式カルーセル** で一覧表示し、各イベントの詳細ページへ遷移できるようにする

---

- 「5. 受講の流れ」と「6. クロージング」の間にニュース・イベント部を追加する(カード式カルーセル)
  - コンポーネントでカードを作る(src/components/EvenCard.vue)
  - イベント詳細ページのテンプレートは別で書く(src/views/events/EventsTemplate.vue)
  - カードや詳細ページの内容は別で書く(src/views/events/event1.vueやevent2.vue...)
  - LP.vueでカード式カルーセルを表示するときに，event1.vueやevent2.vueを読み，サムネ画像と大事な部分(タイトルや日付)を取得し，EventCard.vueに渡して表示する
  - 詳細ページは，EventTemplate.vueが各イベントの内容(event1.vueやevent2.vue)を読み込んで表示する
