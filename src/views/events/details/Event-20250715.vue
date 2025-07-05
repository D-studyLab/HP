<template>
  <div class="event-detail">
    <img src="/event-20250715-tovlab.png" alt="イベントチラシ" class="event-flyer" />
    <div class="event-content">
      <h1>スマホだけで？！知識ゼロでアプリ開発 × AIでテスト対策 体験セミナー</h1>
      <p class="event-date-time"><strong>開催日時:</strong> 2025年7月15日（火）13:30 ～ 14:30</p>

      <section>
        <h2>このセミナーで得られること</h2>
        <div class="points-table">
          <div class="point-item">
            <div class="point-title">テスト勉強を時短したい</div>
            <div class="point-desc">AIで要点まとめ、問題生成、問題解説を体験</div>
          </div>
          <div class="point-item">
            <div class="point-title">コードを書かずにアプリを作ってみたい</div>
            <div class="point-desc">Claude Artifactsでゲームやアプリを開発し、自分専用の作品を共有</div>
          </div>
        </div>
      </section>

      <section>
        <h2>こんな岩大生におすすめ</h2>
        <ul>
          <li>AIで勉強効率を上げたい、クイズ・予想問題・要点まとめを作成したい方</li>
          <li>プログラミング未経験だけど、作る楽しさを味わってみたい方</li>
          <li>AIを利用してレポート作成を時短したい（でもバレたくない）方</li>
        </ul>
      </section>

      <section>
        <h2>当日の流れ（60分）</h2>
        <ol class="timeline">
          <li><span> 5分</span> オープニング</li>
          <li><span>10分</span>ライブ生成：タップゲーム → 全員でプレイ</li>
          <li><span>10分</span>ハンズオン①：ゲームを“暗記クイズアプリ”に改造</li>
          <li><span>10分</span>ハンズオン②：AIで教材まとめ・暗記カード自動作成</li>
          <li><span>15分</span>作品シェア & “AI学習ルーティン” まとめ</li>
          <li><span>10分</span>質問タイム／アンケート</li>
        </ol>
        <p class="note">※途中入退室・飲食OK！</p>
      </section>

      <section>
        <h2>基本情報</h2>
        <ul class="info-list">
          <li><strong>対象:</strong> 岩大生</li>
          <li><strong>参加費:</strong> 無料</li>
          <li><strong>持ち物:</strong> スマホ or タブレット必携　※ノートPCがあればさらに自由度アップ</li>
        </ul>
      </section>

      <section class="apply-section">
        <h2>申込み方法</h2>
        <p>Googleフォームで事前登録をお願いします（所要30秒）。</p>
        <a href="https://forms.gle/EdGKQgLF5wao1NKE8" target="_blank" class="apply-button">今すぐ申し込む</a>
        <p class="note">登録完了メールにTOVLAB利用案内URLを再掲しますので、未登録の方はそちらからお手続きください。</p>
      </section>

      <section>
        <h2>お問い合わせ</h2>
        <p>
          D-study Lab 田頭 郁也（でんどう ふみや）<br>
          岩手大学院 理工学専攻 デザイン・メディア工学コース M2<br>
          Mail：<a href="mailto:info-prog@d-studylab.jp">info-prog@d-studylab.jp</a><br>
          Instagram：<a href="https://www.instagram.com/info_prog_study" target="_blank">@info_prog_study</a>
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
// import eventFlyer from '@/assets/event_images/event-20250715-tovlab.png'; // publicに移動したので不要
</script>

<style scoped>
.event-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  color: #e0e0e0; /* LP全体のテキストカラーに合わせる */
  line-height: 1.8;
  background-color: rgba(15, 15, 30, 0.8); /* LPの背景色に近い色 */
  border-radius: 16px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.event-flyer {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

h1 {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  line-height: 1.4;
  color: #ffffff;
}

.event-date-time {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 2rem;
}

section {
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.8rem;
  font-weight: bold;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
  color: #ffffff; /* 見出しの色を白に */
}

ul, ol {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

li {
  margin-bottom: 0.5rem;
}

.points-table {
  display: grid;
  gap: 1rem;
}

.point-item {
  background-color: rgba(255, 255, 255, 0.05); /* 少し透明な背景 */
  border-left: 4px solid var(--primary-color);
  padding: 1rem 1.5rem;
  border-radius: 8px;
}

.point-title {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.point-desc {
  font-size: 0.95rem;
  color: #c0c0d0;
}

.timeline li {
  list-style: none;
  position: relative;
  padding-left: 2rem;
}

.timeline li span {
  font-weight: bold;
  color: var(--primary-color);
  margin-right: 0.5rem; /* 時間と本文の間に余白を追加 */
}

.note {
  font-style: italic;
  color: #a0a0b0;
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
}

.info-list li {
  list-style: none;
  margin-bottom: 0.5rem;
}

.apply-section {
  text-align: center;
  background-color: rgba(0, 170, 255, 0.1); /* LPのCTAボタン背景色に近い色 */
  padding: 2rem;
  border-radius: 12px;
}

.apply-button {
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 0.8rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
  transition: background-color 0.3s, transform 0.3s;
  margin: 1rem 0;
}

.apply-button:hover {
  background-color: #0056b3; /* ホバー時の色 */
  transform: translateY(-3px);
}

a {
  color: var(--primary-color);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>