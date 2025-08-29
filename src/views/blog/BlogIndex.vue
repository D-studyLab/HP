<template>
  <div class="blog-index">
    <header class="blog-header">
      <h1>D-study Lab Blog</h1>
      <p>ようこそ！岩手から、ITと教育の未来について発信するブログです。</p>
    </header>
    <div class="post-list">
      <router-link v-for="post in posts" :key="post.slug" :to="`/blog/${post.slug}`" class="post-card-link">
        <div class="post-card">
          <div class="card-image">
            <img :src="post.thumbnail" :alt="post.title" />
          </div>
          <div class="card-content">
            <h2>{{ post.title }}</h2>
            <p class="post-date">{{ post.date }}</p>
            <p class="excerpt">{{ post.excerpt }}</p>
            <span class="read-more">続きを読む →</span>
          </div>
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
.blog-index {
  max-width: 1200px; /* Widen the layout for a richer feel */
  margin: 0 auto;
}

.blog-header {
  text-align: center;
  padding: 4rem 2rem;
  background-color: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 4rem;
}

.blog-header h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #212529;
}

.blog-header p {
  font-size: 1.2rem;
  color: #6c757d;
  margin-top: 0.5rem;
}

.post-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
  margin: 2rem;
}

.post-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.post-card {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.card-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.post-card:hover .card-image img {
  transform: scale(1.05);
}

.card-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-content h2 {
  margin-top: 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: #212529;
  line-height: 1.4;
}

.post-date {
  color: #6c757d;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
}

.excerpt {
  flex-grow: 1;
  color: #495057;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.read-more {
  color: #d9534f;
  font-weight: 600;
  align-self: flex-end;
  margin-top: auto;
}
</style>