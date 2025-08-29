<template>
  <div v-if="post" class="post-page">
    <header class="post-header">
      <div class="post-header-image">
        <img :src="post.thumbnail" :alt="post.title" />
      </div>
      <div class="post-header-content">
        <h1>{{ post.title }}</h1>
        <p class="post-date">{{ post.date }}</p>
      </div>
    </header>
    <div class="blog-post-layout">
      <main class="post-content">
        <div v-html="post.html" class="post-body"></div>
      </main>
      <aside class="sidebar">
        <h3>この記事を書いた人</h3>
        <p>ここにプロフィールや新着記事が入ります。</p>
      </aside>
    </div>
  </div>
  <div v-else class="loading-message">
    <p>記事を読み込んでいます...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import fm from 'front-matter';
import { marked } from 'marked';

const route = useRoute();
const post = ref(null);

const loadPost = async () => {
  try {
    const slug = route.params.slug;
    const rawContent = await import(`@/blog/posts/${slug}.md?raw`);
    const { attributes, body } = fm(rawContent.default);
    const html = await marked.parse(body);
    post.value = { ...attributes, html };
  } catch (e) {
    console.error('Error loading post:', e);
    // Here you could redirect to a 404 page
  }
};

onMounted(loadPost);

// Watch for route changes to load new posts if the user navigates
// between posts without leaving the component.
watch(() => route.params.slug, loadPost);
</script>

<style scoped>
.post-page {
  background-color: #fff;
}

.loading-message {
  text-align: center;
  padding: 4rem;
  font-size: 1.2rem;
  color: #6c757d;
}

.post-header {
  position: relative;
  width: 100%;
  height: 50vh;
  max-height: 500px;
  overflow: hidden;
  margin-bottom: 4rem;
}

.post-header-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.post-header-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.post-header-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-header-content {
  position: relative;
  z-index: 2;
  color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 2rem;
}

.post-header-content h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.2;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

.post-header-content .post-date {
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 5px rgba(0,0,0,0.4);
}

.blog-post-layout {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 4rem;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem; /* Padding handled by parent layout, but some horizontal is good */
}

.post-content {
  color: #333;
  min-width: 0;
}

.post-body {
  line-height: 1.8;
  font-size: 1.1rem;
  overflow-wrap: break-word;
}

:deep(.post-body h2),
:deep(.post-body h3) {
  color: #212529;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #dee2e6;
}

:deep(.post-body p) {
  margin-bottom: 1.5rem;
}

:deep(.post-body ul),
:deep(.post-body ol) {
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}

:deep(.post-body pre) {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 0.95rem;
  border: 1px solid #e9ecef;
}

:deep(.post-body code) {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
}

:deep(.post-body blockquote) {
  border-left: 4px solid #d9534f;
  padding-left: 1.5rem;
  margin: 2rem 0;
  color: #6c757d;
  font-style: italic;
}

:deep(.post-body img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 2rem 0;
}

.sidebar {
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 12px;
  align-self: start;
  position: sticky;
  top: 120px; /* Adjust based on header height */
}

.sidebar h3 {
  margin-top: 0;
  border-bottom: 2px solid #dee2e6;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

/* Responsive */
@media (max-width: 992px) {
  .blog-post-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .sidebar {
    position: static;
    top: auto;
    margin-top: 3rem;
  }
}

@media (max-width: 768px) {
  .post-header {
    height: 40vh;
    margin-bottom: 3rem;
  }
  .blog-post-layout {
    padding: 0 1rem;
  }
}
</style>