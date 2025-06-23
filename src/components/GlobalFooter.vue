<!-- src/components/GlobalFooter.vue -->
<template>
  <footer class="site-footer">
    <small>© 2025 D-StudyLab. All rights reserved.</small>
    <div><router-link to="/privacy">プライバシーポリシー</router-link></div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid #444;
  padding: 1rem 2rem;
  text-align: center;
  background-color: #121212;
  color: #888;
  margin: 0;
}
.site-footer a {
  color: #888;
  text-decoration: none;
}
.site-footer a:hover {
  text-decoration: underline;
}
</style>