<template>
  <div class="blog-post-layout">
    <main class="post-content">
      <div v-if="post">
        <h1>{{ post.title }}</h1>
        <p class="post-date">{{ post.date }}</p>
        <div v-html="post.html" class="post-body"></div>
      </div>
      <div v-else>
        <p>記事を読み込んでいます...</p>
      </div>
    </main>
    <aside class="sidebar">
      <h3>サイドバー</h3>
      <p>ここにプロフィールや新着記事が入ります。</p>
    </aside>
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
.blog-post-layout {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2rem;
  /* max-width, margin, and padding are handled by BlogLayout.vue */
}

.post-content {
  color: #333;
  min-width: 0; /* Prevents overflow in grid items */
}

.post-date {
  color: #777;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.post-body {
  line-height: 1.7;
  overflow-wrap: break-word; /* Prevents long words from overflowing */
}

/* Basic styling for rendered markdown */
:deep(.post-body h1),
:deep(.post-body h2),
:deep(.post-body h3) {
  color: #d9534f;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

:deep(.post-body p) {
  margin-bottom: 1rem;
}

:deep(.post-body ul),
:deep(.post-body ol) {
  padding-left: 1.5rem;
}

:deep(.post-body pre) {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}

:deep(.post-body code) {
  font-family: 'Courier New', Courier, monospace;
}

h1 {
  font-size: 2.5rem;
}

.sidebar {
  padding: 1rem;
  border-left: 1px solid #ddd;
}

/* Responsive: stack columns on smaller screens */
@media (max-width: 768px) {
  .blog-post-layout {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 1.8rem;
  }

  .sidebar {
    border-left: none;
    border-top: 1px solid #ddd;
    margin-top: 2rem;
    padding-top: 2rem;
  }

  :deep(.post-body img) {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
}
</style>
