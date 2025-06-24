<!-- src/views/works/GandaiFoody.vue -->
<template>
  <div class="project gandaifoody">
    <h2>岩大FOODY ― 学食栄養管理アプリ</h2>
    <p>
      岩手大学の学食メニューをカレンダー形式で表示し、
      それぞれの栄養素（エネルギー、たんぱく質、脂質など）を 簡単にチェックできるアプリです。
    </p>
    <ul>
      <li>今日のメニューをひと目で確認</li>
      <li>過去メニューの栄養データをグラフ化</li>
      <li>お気に入りメニュー機能搭載</li>
      <li>
        <a href="https://github.com/yourname/gandaifoody" target="_blank" rel="noopener">
          GitHub リポジトリ
        </a>
      </li>
      <li>
        <a href="https://your-demo-url.com/gandaifoody" target="_blank" rel="noopener">
          デモサイトを見る
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup></script>

<style scoped>
  .project {
    max-width: 800px;
    margin: auto;
    padding: 2rem;
    line-height: 1.6;
  }
  .gandaifoody h2 {
    margin-bottom: 1rem;
  }
  .gandaifoody ul {
    list-style: disc inside;
    margin-top: 1rem;
  }
  .gandaifoody a {
    color: #646cff;
    text-decoration: none;
  }
  .gandaifoody a:hover {
    text-decoration: underline;
  }
</style>
