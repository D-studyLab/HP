<!-- src/views/works/ChillSta.vue -->
<template>
  <div class="project chillsta">
    <h2>ChillSta ― ポモドーロタイマー</h2>
    <p>
      「25分集中＋5分休憩」の定番サイクルを手軽に使える、
      シンプルかつ見やすいポモドーロタイマーアプリです。
    </p>
    <ul>
      <li>サイクル時間は自由にカスタマイズ可能</li>
      <li>タスク名を登録して管理できるタスク機能</li>
      <li>サウンド通知＆デスクトップ通知対応</li>
      <li>
        <a href="https://github.com/yourname/chillsta" target="_blank" rel="noopener">
          GitHub リポジトリ
        </a>
      </li>
      <li>
        <a href="https://your-demo-url.com/chillsta" target="_blank" rel="noopener">
          デモサイトを見る
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
  // （特にスクリプトは不要な場合、省略可）
</script>

<style scoped>
  .project {
    max-width: 800px;
    margin: auto;
    padding: 2rem;
    line-height: 1.6;
  }
  .chillsta h2 {
    margin-bottom: 1rem;
  }
  .chillsta ul {
    list-style: disc inside;
    margin-top: 1rem;
  }
  .chillsta a {
    color: #646cff;
    text-decoration: none;
  }
  .chillsta a:hover {
    text-decoration: underline;
  }
</style>
