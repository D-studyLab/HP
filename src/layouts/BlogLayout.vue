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
html.blog-active,
body.blog-active {
  height: auto;
  overflow: auto;
}

body.blog-active {
  background: #fff;
  color: #333;
}
</style>

<style scoped>
.blog-layout {
  background-color: #f8f9fa; /* Light grey background */
  color: #212529;
  font-family: 'Noto Sans JP', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #dee2e6;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
}

.home-link {
  text-decoration: none;
  color: #212529;
  font-size: 1.2rem;
  font-weight: 700;
}

.blog-nav a {
  text-decoration: none;
  color: #495057;
  margin-left: 1.5rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.blog-nav a:hover {
  color: #d9534f;
}

.blog-main-content {
  flex-grow: 1;
  width: 100%;
}

.blog-footer {
  text-align: center;
  padding: 3rem 2rem;
  background-color: #e9ecef;
  border-top: 1px solid #dee2e6;
  color: #6c757d;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .blog-header {
    padding: 1rem;
  }
}
</style>
