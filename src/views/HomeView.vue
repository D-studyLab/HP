<!-- src/views/HomeView.vue -->
<template>
  <div class="home">
    <section class="hero">
      <h1>D-Study Lab</h1>
      <p>
        私たちD-Study Labは、あなたが「学びたい」を形にするための会社です。<br>
        中高生向けの情報＆プログラミング専門塾を基盤に、<br>
        地域の教育格差解消や、社会人のリスキリング支援など、<br>
        幅広い「学びの場」を提供します。
      </p>
    </section>
    <section class="mission">
      <h2>社会貢献ビジョン</h2>
      <ul>
        <li>岩手県内の学生に最新のIT教育を届ける</li>
        <li>地域のDX人材を育成し、中小企業のIT化を後押し</li>
        <li>誰もが自分のペースで学べるオンラインコンテンツの充実</li>
      </ul>
    </section>
    <section class="audience">
      <h2>対象</h2>
      <p>・中高生の「情報Ⅰ」「プログラミング」学習<br>
         ・社会人のリスキリング・DX／AI学習</p>
    </section>
  </div>
</template>

<style scoped>
.home {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
}
.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
.mission, .audience {
  margin-top: 2rem;
}
.mission ul {
  list-style: disc inside;
  line-height: 1.6;
}
</style>
