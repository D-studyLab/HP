<template>
  <div class="lp-container">
    <!-- 1. ファーストビュー -->
    <header class="hero-section">
      <div class="hero-content">
        <h1 class="main-catchphrase">
          社会のルールが<span class="highlight">『デジタル』</span>に変わった。<br>
          岩手から、未来を創る挑戦者へ。
        </h1>
        <p class="sub-catchphrase">
          D-study Labは、AI時代を生き抜くための「基礎教養としてのITリテラシー」を、<br>
          学生から社会人まで、すべての世代に届けます。
        </p>
        <a href="https://line.me/ti/p/YOUR_LINE_ID" class="cta-button" target="_blank">
          まずはLINEで無料相談・体験授業を申し込む
        </a>
      </div>
    </header>

    <!-- 2. 課題提起 -->
    <section class="problem-section">
      <h2 class="section-title">こんなお悩み、ありませんか？</h2>
      <div class="problem-cards">
        <div class="problem-card">
          <h3>情報Ⅰ対策をしたい高校生</h3>
          <p>「共通テストに『情報』が追加されたけど、何から手をつければいいか分からない…」</p>
        </div>
        <div class="problem-card">
          <h3>プログラミングに挑戦したい方</h3>
          <p>「アプリを作ってみたいけど、独学では挫折しそう。誰かに相談できる環境がほしい…」</p>
        </div>
        <div class="problem-card">
          <h3>DXを学びたい社会人</h3>
          <p>「仕事でAIやITツールが必須に。でも、今さら誰に聞けばいいのか…」</p>
        </div>
      </div>
    </section>

    <!-- 3. 解決策・提供価値 -->
    <section class="solution-section">
      <h2 class="section-title">
        その悩み、D-study Labが解決します！<br>
        <span class="section-subtitle">私たちが選ばれる3つの理由</span>
      </h2>
      <div class="feature-cards">
        <div class="feature-card">
          <div class="feature-icon">🎯</div>
          <h3>ゴールから逆算する学び</h3>
          <p>「共通テスト合格」「自作アプリ公開」など、明確なゴールを設定。最短ルートで“できた！”を形にします。</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🤝</div>
          <h3>挫折させない伴走サポート</h3>
          <p>少人数・メンター制で、あなたの挑戦と失敗を徹底的に歓迎。安心して学べる“安全な実験場”です。</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🚀</div>
          <h3>最新技術で実践的に学ぶ</h3>
          <p>生成AIやクラウドツールを使いこなし、論理的思考力と創造力を鍛え、本当に“使える”スキルを育てます。</p>
        </div>
      </div>
    </section>

    <!-- 4. コース紹介 -->
    <section class="courses-section">
      <h2 class="section-title">コース一覧</h2>
      <p class="section-description">入会金・施設利用料はいつでも0円。あなたの目的に合わせて選べます。</p>
      
      <div class="course-category">
        <h3>情報Ⅰ 共通テスト対策</h3>
        <div class="course-cards">
          <div class="course-card">
            <h4>個別指導〈単元保証型〉</h4>
            <p class="target">基礎から学びたい高校生</p>
            <p class="description">授業フォローから共テ演習まで。小テスト合格と目標点達成を保証します。</p>
            <p class="price">32,000円 / コース</p>
          </div>
          <div class="course-card">
            <h4>集団講座〈共テ対策・冬季集中〉</h4>
            <p class="target">高3生</p>
            <p class="description">共テ過去問・予想問題に集中して取り組み、得点力を一気に高めます。</p>
            <p class="price">5,000円 / 1回</p>
          </div>
        </div>
      </div>

      <div class="course-category">
        <h3>プログラミング学習</h3>
        <div class="course-cards">
          <div class="course-card">
            <h4>個別ブートキャンプ</h4>
            <p class="target">初心者 (中高生〜社会人)</p>
            <p class="description">Python/JSの基礎からミニアプリ開発まで。自作アプリの公開を目指します。</p>
            <p class="price">36,000円 / コース</p>
          </div>
          <div class="course-card">
            <h4>グループ開発ラボ</h4>
            <p class="target">経験者 (高校生〜社会人)</p>
            <p class="description">チームで企画から開発、公開までを体験。実践的な開発スキルが身につきます。</p>
            <p class="price">49,800円 / コース</p>
          </div>
        </div>
      </div>

       <div class="course-category">
        <h3>短期集中セミナー</h3>
        <div class="course-cards">
          <div class="course-card">
            <h4>生成AI活用ワークショップ</h4>
            <p class="target">高校生〜社会人</p>
            <p class="description">ChatGPT/Geminiなどを実演。明日からすぐに使える活用術を習得します。</p>
            <p class="price">5,000円 / 回</p>
          </div>
          <div class="course-card">
            <h4>研究紹介セミナー</h4>
            <p class="target">高校生〜社会人</p>
            <p class="description">岩手大学の先輩による研究事例を紹介。あなたの探究心に火をつけます。</p>
            <p class="price">無料</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. 受講の流れ -->
    <section class="flow-section">
      <h2 class="section-title">受講までの簡単4ステップ</h2>
      <ol class="flow-steps">
        <li class="flow-step">
          <div class="step-number">1</div>
          <p>LINE公式アカウントを<br>友だち追加</p>
        </li>
        <li class="flow-step">
          <div class="step-number">2</div>
          <p>トーク画面から<br>無料相談・体験を予約</p>
        </li>
        <li class="flow-step">
          <div class="step-number">3</div>
          <p>オンライン面談で<br>目標や課題をヒアリング</p>
        </li>
        <li class="flow-step">
          <div class="step-number">4</div>
          <p>最適なコースで<br>学習スタート！</p>
        </li>
      </ol>
    </section>

    <!-- 6. クロージング -->
    <section class="closing-section">
      <h2 class="closing-message">さあ、挑戦への一歩を踏み出そう。</h2>
      <p>
        D-study Labは、あなたの「やってみたい」を全力で応援します。<br>
        成功も失敗も、すべてがあなたの力になる。私たちは、その挑戦に伴走します。
      </p>
      <a href="https://line.me/ti/p/YOUR_LINE_ID" class="cta-button" target="_blank">
        LINEで無料相談をしてみる
      </a>
    </section>

    <footer class="lp-footer">
      <a href="https://www.notion.so/2250aa0158188050b29ffaffc3849db7?source=copy_link" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>
      <p>&copy; 2024 D-study Lab. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script setup>
// No script needed for this static LP
</script>

<style scoped>
.lp-container {
  font-family: 'Helvetica Neue', 'Arial', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Meiryo', sans-serif;
  color: #333;
  background-color: #fdfdfd;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: bold;
}

.section-subtitle {
  font-size: 1.5rem;
  font-weight: normal;
  color: #555;
}

.section-description {
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 3rem;
}

/* 1. Hero Section */
.hero-section {
  background: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);
  color: white;
  text-align: center;
  padding: 6rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-content {
  max-width: 800px;
}

.logo {
  max-width: 180px;
  margin-bottom: 2rem;
}

.main-catchphrase {
  font-size: 2.8rem;
  font-weight: 900;
  margin-bottom: 1rem;
  line-height: 1.4;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
}

.main-catchphrase .highlight {
  display: inline-block;
  background-color: #fff;
  color: #38f9d7;
  padding: 0.2rem 0.8rem;
  border-radius: 8px;
  transform: rotate(-2deg);
}

.sub-catchphrase {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.cta-button {
  display: inline-block;
  background-color: #ff6f61;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  transition: transform 0.2s ease, background-color 0.2s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.cta-button:hover {
  transform: translateY(-3px);
  background-color: #ff4b3a;
}

/* 2. Problem Section */
.problem-section {
  padding: 5rem 2rem;
  background-color: #fff;
}

.problem-cards {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.problem-card {
  background: #f0f0f0;
  border-radius: 12px;
  padding: 2rem;
  width: 300px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  box-sizing: border-box;
}

.problem-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
}

/* 3. Solution Section */
.solution-section {
  padding: 5rem 2rem;
  background-color: #f4faff;
}

.feature-cards {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  width: 320px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  box-sizing: border-box;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

/* 4. Courses Section */
.courses-section {
  padding: 5rem 2rem;
}

.course-category {
  margin-bottom: 4rem;
}

.course-category h3 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #43e97b;
  display: inline-block;
}

.course-category {
  text-align: center;
}

.course-cards {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.course-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 2rem;
  width: 350px;
  text-align: left;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.course-card h4 {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: #007bff;
}

.course-card .target {
  font-weight: bold;
  color: #ff6f61;
  margin-bottom: 1rem;
}

.course-card .description {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.course-card .price {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: right;
  color: #333;
}

/* 5. Flow Section */
.flow-section {
  padding: 5rem 2rem;
  background-color: #f4faff;
}

.flow-steps {
  display: flex;
  justify-content: center;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.flow-step {
  text-align: center;
  width: 200px;
  position: relative;
}

.flow-step:not(:last-child)::after {
  content: '→';
  position: absolute;
  right: -35px;
  top: 40px;
  font-size: 2rem;
  color: #43e97b;
}


.step-number {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #43e97b;
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1rem;
}

/* 6. Closing Section */
.closing-section {
  padding: 5rem 2rem;
  text-align: center;
  background-color: #333;
  color: white;
}

.closing-message {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.closing-section p {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

/* Footer */
.lp-footer {
  text-align: center;
  padding: 2rem;
  background-color: #222;
  color: #aaa;
}

.lp-footer a {
  color: #fff;
  text-decoration: none;
  margin-bottom: 0.5rem;
  display: inline-block;
}

.lp-footer a:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  .main-catchphrase {
    font-size: 2.2rem;
  }
  .problem-cards, .feature-cards, .course-cards, .flow-steps {
    flex-direction: column;
    align-items: center;
  }
  .problem-card, .feature-card, .course-card {
    width: 100%;
  }
  .hero-section, .problem-section, .solution-section, .courses-section, .flow-section, .closing-section {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .flow-step:not(:last-child)::after {
    content: '↓';
    right: 50%;
    transform: translateX(50%);
    top: auto;
    bottom: -40px;
  }
  .flow-steps {
    gap: 4rem;
  }
}
</style>