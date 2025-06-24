<!-- src/views/works/InfoProg.vue -->
 <template>
  <div class="project infoprog">
    <h2>情報＆プログラミング専門塾</h2>
    <p>
      中高生向け「情報Ⅰ」とプログラミングの基礎から応用までを
      オンラインで丁寧に指導する塾事業です。
    </p>
    <ul>
      <li>個別オンライン指導：90分 ¥3,000／回</li>
      <li>集団オンライン講義：90分 ¥3,000～、120分 ¥5,000～</li>
      <li>動画講座（14本×15分）：¥9,800 一括</li>
      <li>PCレンタル＆Zoom／LINEサポート付き</li>
    </ul>
    <router-link to="/contact">
      <button>お問い合わせはこちら</button>
    </router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
.project {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  line-height: 1.6;
}
.infoprog h2 {
  margin-bottom: 1rem;
}
.infoprog ul {
  list-style: disc inside;
  margin-top: 1rem;
}
.infoprog button {
  margin-top: 1.5rem;
  padding: 0.7em 1.4em;
  background-color: #1a1a1a;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.infoprog button:hover {
  background-color: #333;
}
</style>
