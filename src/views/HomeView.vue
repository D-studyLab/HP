<!-- src/views/HomeView.vue -->
<template>
  <div class="home">

    <!-- ─── Hero ─────────────────────────── -->
    <section id="top" class="hero">
      <h1>D-Study Lab</h1>
      <p>
        私たち D-Study Lab は、あなたが「学びたい」を形にするための会社です。<br>
        中高生向けの<strong>情報＆プログラミング専門塾</strong>を基盤に、<br>
        地域の教育格差解消や、社会人のリスキリング支援など、<br>
        幅広い「学びの場」を提供します。
      </p>
    </section>

    <!-- ─── Mission ──────────────────────── -->
    <section id="mission" class="mission">
      <h2>社会貢献ビジョン</h2>
      <ul>
        <li>岩手県内の学生に最新の IT 教育を届ける</li>
        <li>地域の DX 人材を育成し、中小企業の IT 化を後押し</li>
        <li>誰もが自分のペースで学べるオンラインコンテンツの充実</li>
      </ul>
    </section>

    <!-- ─── Audience ─────────────────────── -->
    <section id="audience" class="audience">
      <h2>対象</h2>
      <p>
        ・中高生の「情報Ⅰ」「プログラミング」学習<br>
        ・社会人のリスキリング・DX／AI 学習
      </p>
    </section>

    <!-- ─── About ────────────────────────── -->
    <section id="about" class="about">
      <h2>会社について</h2>
      <p>
        D-Study Lab は、テクノロジーと教育を融合し、<br>
        <strong>「自分で考え、手を動かし、成果を出す力」</strong> を育むことをミッションとしています。
      </p>

      <h3>ミッション</h3>
      <ul>
        <li>主体的な学びの場を作る</li>
        <li>実践的なプロジェクト体験を通じて自信を育む</li>
        <li>地域社会の IT 化を担う人材を輩出する</li>
      </ul>

      <h3>会社概要</h3>
      <table>
        <tbody>
          <tr><th>社名</th><td>D-Study Lab</td></tr>
          <tr><th>所在地</th><td>岩手県盛岡市〇丁目〇番地</td></tr>
          <tr><th>設立</th><td>2025 年 5 月</td></tr>
          <tr><th>代表</th><td>山田 太郎</td></tr>
          <tr><th>事業内容</th><td>情報＆プログラミング専門塾、オンライン講座運営、教育コンテンツ開発</td></tr>
        </tbody>
      </table>
    </section>

    <!-- ─── Services ─────────────────────── -->
    <section id="services" class="services">
      <h2>サービス</h2>
      <ul class="service-list">
        <li>
          <router-link to="/service/info-prog">
            <h3>情報＆プログラミング専門塾</h3>
            <p>中高生向け「情報Ⅰ」とプログラミングの基礎から実践まで</p>
          </router-link>
        </li>
        <li>
          <router-link to="/service/chillsta">
            <h3>ちるスタ</h3>
            <p>これまでに開発しデプロイした Web アプリ・ツール群</p>
          </router-link>
        </li>
        <li>
          <router-link to="/service/gandai-foody">
            <h3>岩大 FOODY</h3>
            <p>これまでに開発しデプロイした Web アプリ・ツール群</p>
          </router-link>
        </li>
      </ul>
    </section>

  </div>
</template>

<style scoped>
/* === 共通レイアウト ==================================== */
.home {
  max-width: 820px;
  margin: auto;
  padding: 2rem 1rem 4rem;
  line-height: 1.7;
}

/* === セクション間隔 & 見出し ============================ */
section + section { margin-top: 3rem; }

.hero h1        { font-size: 2.6rem; margin: 0 0 1rem; }
section h2      { font-size: 1.9rem; margin: 0 0 1rem; }
section h3      { font-size: 1.3rem; margin: 2rem 0 0.8rem; }

ul { padding-left: 1.2em; }

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
th, td {
  border: 1px solid #ddd;
  padding: 0.55rem 0.75rem;
  text-align: left;
}

/* === サービスカード ===================================== */
.service-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 1.5rem;
}

.service-list li {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow .2s;
}
.service-list li:hover { box-shadow: 0 4px 12px rgba(0,0,0,.08); }

.service-list a {
  display: block;
  padding: 1.2rem;
  text-decoration: none;
  color: inherit;
}
.service-list h3 { margin: 0 0 0.5rem; }
</style>
