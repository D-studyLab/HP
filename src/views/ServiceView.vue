<!-- src/veiws/WorkView.vue -->
<template>
  <div class="services">
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
          <p>これまでに開発しデプロイしたWebアプリ・ツール群</p>
        </router-link>
      </li>
      <li>
        <router-link to="/service/gandai-foody">
          <h3>岩大FOODY</h3>
          <p>これまでに開発しデプロイしたWebアプリ・ツール群</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.services {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
}
.service-list {
  list-style: none;
  padding: 0;
}
.service-list li {
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}
.service-list a {
  display: block;
  padding: 1rem;
  text-decoration: none;
  color: inherit;
}
.service-list a:hover {
  background-color: #f0f0f0;
}
.service-list h3 {
  margin: 0 0 0.5rem;
}
</style>
