<!-- src/components/GlobalHeader.vue -->
<template>
  <header class="site-header">
    <h1 class="logo">D-StudyLab</h1>
    <nav class="nav">
      <router-link to="/">ホーム</router-link>
      <router-link to="/about">会社について</router-link>
      <router-link to="/work">事業内容</router-link>
      <router-link to="/contact">お問い合わせ</router-link>
      <router-link to="/privacy">プライバシーポリシー</router-link>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1a1a1a;
  color: white;
  margin: 0;
}
.logo {
  font-size: 1.5rem;
  margin: 0;
}
.nav a {
  margin-left: 1rem;
  color: white;
  text-decoration: none;
  font-weight: 500;
}
.nav a:hover {
  text-decoration: underline;
}
</style>