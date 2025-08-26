<template>
  <div class="blog-layout">
    <header class="blog-header">
      <router-link to="/" class="home-link">
        <strong>D-study Lab</strong>
      </router-link>
      <nav class="blog-nav">
        <router-link to="/blog">ブログトップ</router-link>
      </nav>
    </header>
    <div class="blog-main-content">
      <router-view />
    </div>
    <footer class="blog-footer">
      <p>&copy; 2025 D-study Lab. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<style>
/* Remove App.vue's global styles on blog pages */
body.blog-active {
  height: auto;
  overflow: auto;
  background: #fff;
  color: #333;
}
</style>

<style scoped>
.blog-layout {
  background-color: #fff;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
}

.home-link {
  text-decoration: none;
  color: #333;
  font-size: 1.2rem;
}

.blog-nav a {
  text-decoration: none;
  color: #555;
  margin-left: 1.5rem;
  font-weight: 500;
}

.blog-nav a:hover {
  color: #d9534f;
}

.blog-main-content {
  flex-grow: 1;
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 4rem; /* Increased horizontal padding */
}

.blog-footer {
  text-align: center;
  padding: 2rem;
  background-color: #f8f8f8;
  border-top: 1px solid #eee;
  color: #777;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .blog-main-content {
    padding: 2rem;
  }
  .blog-header {
    padding: 1rem;
  }
}
</style>
