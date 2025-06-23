<!-- src/veiws/WorkView.vue -->
 <template>
  <div class="work">
    <h2>事業内容</h2>
    <section>
      <h3>① 情報Ⅰ 対策</h3>
      <table>
        <tr><th>形式</th><th>時間</th><th>価格</th></tr>
        <tr><td>個別オンライン</td><td>90分</td><td>¥3,000/回</td></tr>
        <tr><td>集団オンライン</td><td>90分・120分</td><td>¥3,000/コマ・¥5,000/コマ</td></tr>
        <tr><td>動画講座</td><td>15分×14本</td><td>¥9,800 一括</td></tr>
      </table>
    </section>
    <section>
      <h3>② プログラミング実践</h3>
      <table>
        <tr><th>形式</th><th>内容</th><th>価格</th></tr>
        <tr><td>個別オンライン</td><td>Python・AI・機械学習</td><td>¥10,000～／コース</td></tr>
        <tr><td>グループラボ</td><td>Discordで開発＆公開</td><td>¥12,000／回</td></tr>
      </table>
    </section>
    <section>
      <h3>③ セミナー・作品発表</h3>
      <p>生徒や講師の制作物を紹介する発表会を開催します。</p>
    </section>
    <section>
      <h3>④ PCレンタル</h3>
      <p>中古ThinkPadを手軽にレンタル可能。実機問題を解決します。</p>
    </section>
  </div>
</template>

<style scoped>
.work {
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
  padding: 2rem;
}
.work h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}
.work h3 {
  font-size: 1.4rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
.work table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}
.work th, .work td {
  border: 1px solid #ccc;
  padding: 0.5rem;
}
.work th {
  background: #f9f9f9;
}
</style>