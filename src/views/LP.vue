<template>
  <main :class="mobile ? 'sp-main' : 'main-scroll'">
    <!-- ─── Hero ─────────────────────────────── -->
    <section id="top" class="hero">
      <h1>D-Study Lab</h1>
      <p>
        私たち D-Study Lab は、あなたが〈学びたい〉を形にするための会社です。<br />
        中高生向けの<strong>情報＆プログラミング専門塾</strong>を基盤に、<br />
        地域の教育格差解消や、社会人のリスキリング支援など、<br />
        幅広い「学びの場」を提供します。
      </p>
    </section>

    <!-- ─── Mission ─────────────────────────── -->
    <section id="mission">
      <h2>社会貢献ビジョン</h2>
      <ul>
        <li>岩手県内の学生に最新の IT 教育を届ける</li>
        <li>地域の DX 人材を育成し、中小企業の IT 化を後押し</li>
        <li>誰もが自分のペースで学べるオンラインコンテンツの充実</li>
      </ul>
    </section>

    <!-- ─── Services ────────────────────────── -->
    <section id="services">
      <h2>サービス</h2>
      <ul>
        <li><a href="/service/info-prog">情報＆プログラミング専門塾</a></li>
        <li><a href="/service/chillsta">ちるスタ</a></li>
        <li><a href="/service/gandai-foody">岩大 FOODY</a></li>
      </ul>
    </section>

    <!-- ─── Contact ─────────────────────────── -->
    <section id="contact">
      <h2>Contact</h2>
      <p>
        ご質問・ご相談は
        <strong>SNS の DM</strong> または
        <a href="https://forms.gle/wntBVeFxG1rVouGY6" target="_blank" rel="noopener"
          >お問い合わせフォーム</a
        >
        からお気軽にどうぞ。
      </p>
    </section>
  </main>
</template>

<script setup>
  defineProps({ mobile: { type: Boolean, default: false } })
</script>

<style scoped>
  /* ========= スクロール領域 ========= */
  .main-scroll {
    height: 100vh;
    overflow-y: auto;
    padding: 2rem 2rem 4rem;
    background: #fff;
  }
  .sp-main {
    flex: 1 1 auto;
    overflow-y: auto;
    padding: 1rem 1rem 3rem;
    background: #fff;
  }

  /* ========= コンテンツ ========= */
  section + section {
    margin-top: 2.5rem;
  }
  .hero h1 {
    font-size: clamp(2rem, 5vw, 2.6rem);
    margin: 0 0 1rem;
  }
  ul {
    padding-left: 1.35rem;
    line-height: 1.7;
  }
  a {
    color: var(--link, #0066cc);
  }

  /* リンク強調（任意） */
  a:hover {
    text-decoration: underline;
  }
</style>
