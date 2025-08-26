<template>
  <div class="blog-index">
    <h1>ブログ</h1>
    <div class="post-list">
      <router-link v-for="post in posts" :key="post.slug" :to="`/blog/${post.slug}`" class="post-card-link">
        <div class="post-card">
          <h2>{{ post.title }}</h2>
          <p class="post-date">{{ post.date }}</p>
          <p>{{ post.excerpt }}</p>
          <span class="read-more">続きを読む</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import fm from 'front-matter';

const posts = ref([]);

onMounted(async () => {
  const modules = import.meta.glob('@/blog/posts/*.md', { query: '?raw', import: 'default' });
  const postPromises = Object.entries(modules).map(async ([path, loader]) => {
    const slug = path.split('/').pop().replace('.md', '');
    const content = await loader();
    const { attributes } = fm(content);
    return { ...attributes, slug };
  });

  const resolvedPosts = await Promise.all(postPromises);
  // Sort posts by date, newest first
  resolvedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  posts.value = resolvedPosts;
});
</script>

<style scoped>
/* Basic styling for the blog index */
.blog-index {
  max-width: 800px;
  margin: 0 auto;
  /* Padding and other layout styles are handled by BlogLayout.vue */
}

h1 {
  color: #d9534f; /* Red accent */
  text-align: center;
  margin-bottom: 2rem;
}

.post-list {
  display: grid;
  gap: 1.5rem;
}

.post-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.post-card {
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 8px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.post-card h2 {
  margin-top: 0;
  color: #333;
}

.post-date {
  color: #777;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.read-more {
  color: #d9534f;
  text-decoration: none;
  font-weight: bold;
}
</style>
