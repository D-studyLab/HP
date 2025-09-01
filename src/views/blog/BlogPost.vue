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
  max-width: 800px; /* Adjust for single column readability */
  margin: 0 auto;
  padding: 0rem 2rem 2rem 2rem;
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

.post-body :deep(h1) {
  font-size: 2.2rem;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 0.5rem;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
}

.post-body :deep(h2) {
  font-size: 1.8rem;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 0.5rem;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
}

.post-body :deep(h3) {
  font-size: 1.5rem;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
}

.post-body :deep(p) {
  line-height: 1.9;
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.post-body :deep(a) {
  color: #1a73e8;
  text-decoration: none;
  border-bottom: 1px solid #1a73e8;
}

.post-body :deep(a:hover) {
  text-decoration: underline;
}

.post-body :deep(pre) {
  background-color: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
}

.post-body :deep(code) {
  font-family: 'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace;
  background-color: #f5f5f5;
  padding: 0.2em 0.4em;
  border-radius: 4px;
}

.post-body :deep(pre > code) {
  padding: 0;
  background-color: transparent;
}

.post-body :deep(blockquote) {
  border-left: 4px solid #e0e0e0;
  padding-left: 1.5rem;
  margin: 0 0 1.5rem;
  color: #666;
}
</style>