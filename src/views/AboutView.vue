<!-- src/views/AboutView.vue -->
<template>
  <div class="about">
    <h2>会社について</h2>
    <p>
      D-Study Labは、テクノロジーと教育を融合し、<br>
      「自分で考え、手を動かし、成果を出す力」を育むことをミッションとしています。
    </p>
    <h3>ミッション</h3>
    <ul>
      <li>主体的な学びの場を作る</li>
      <li>実践的なプロジェクト体験を通じて自信を育む</li>
      <li>地域社会のIT化を担う人材を輩出する</li>
    </ul>
    <h3>会社概要</h3>
    <table>
      <tbody>
        <tr><th>社名</th><td>D-Study Lab</td></tr>
        <tr><th>所在地</th><td>岩手県盛岡市〇丁目〇番地</td></tr>
        <tr><th>設立</th><td>2025年5月</td></tr>
        <tr><th>代表</th><td>山田 太郎</td></tr>
        <tr><th>事業内容</th><td>情報＆プログラミング専門塾、オンライン講座運営、<br>教育コンテンツ開発</td></tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.about {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  line-height: 1.6;
}
.about h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.about h3 {
  margin-top: 1.5rem;
}
.about table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
.about th, .about td {
  padding: 0.5rem;
  border: 1px solid #ddd;
  text-align: left;
}
</style>
