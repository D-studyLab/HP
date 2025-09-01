<template>
  <div class="blog-index">
    <header class="page-header">
      <h1>dendenのブログ</h1>
      <p>D-study Lab のHPから来てくれた方、ようこそ。ここは私の素の部分や日々のメモを置いていく場所です。肩の力を抜いて読んでもらえたら嬉しいです。</p>
    </header>

    <div class="controls-container">
      <div class="search-bar">
        <i class="fas fa-search search-icon"></i>
        <input type="text" v-model="searchQuery" placeholder="記事を検索..." />
      </div>
      <div class="category-filters">
        <button @click="selectedCategory = null" :class="{ active: selectedCategory === null }">
          すべて
        </button>
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="{ active: selectedCategory === category }"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <div class="post-grid">
      <router-link v-for="post in filteredPosts" :key="post.slug" :to="`/blog/${post.slug}`" class="post-card-link">
        <div class="post-card">
          <div class="card-thumbnail">
            <img :src="post.thumbnail" :alt="post.title" />
          </div>
          <div class="card-content">
            <h3 class="card-title">{{ post.title }}</h3>
            <div class="card-meta">
              <span class="card-date">{{ post.date }}</span>
              <span class="card-category">{{ post.category }}</span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <div v-if="filteredPosts.length === 0" class="no-results">
      <p>該当する記事が見つかりませんでした。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import fm from 'front-matter';

const posts = ref([]);
const searchQuery = ref('');
const selectedCategory = ref(null);

onMounted(async () => {
  document.title = 'dendenのブログ';

  // Add JSON-LD structured data for the Blog
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'dendenのブログ',
    'url': 'https://d-studylab.jp/blog',
    'description': 'D-study Lab代表の個人ブログ。ゲーム・アニメ、音楽、ITツール、勉強法、日常の疑問などを綴ります。',
    'publisher': {
      '@type': 'Organization',
      'name': 'D-study Lab',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://d-studylab.jp/D-studyLab_logo.png'
      }
    }
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'blog-json-ld'; // Add an ID for easy removal
  script.text = JSON.stringify(jsonLd);
  document.head.appendChild(script);

  const modules = import.meta.glob('@/blog/posts/*.md', { query: '?raw', import: 'default' });
  const postPromises = Object.entries(modules).map(async ([path, loader]) => {
    const slug = path.split('/').pop().replace('.md', '');
    const content = await loader();
    const { attributes } = fm(content);
    return { ...attributes, slug };
  });

  const resolvedPosts = await Promise.all(postPromises);
  resolvedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  posts.value = resolvedPosts;
});

onUnmounted(() => {
  // Clean up structured data script when component is destroyed
  const script = document.getElementById('blog-json-ld');
  if (script) {
    document.head.removeChild(script);
  }
});

const categories = computed(() => {
  const allCategories = posts.value.map(post => post.category).filter(Boolean);
  return [...new Set(allCategories)];
});

const filteredPosts = computed(() => {
  let filtered = posts.value;

  if (selectedCategory.value) {
    filtered = filtered.filter(post => post.category === selectedCategory.value);
  }

  if (searchQuery.value) {
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    filtered = filtered.filter(post =>
      post.title.toLowerCase().includes(lowerCaseQuery) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(lowerCaseQuery))
    );
  }

  return filtered;
});
</script>

<style scoped>
.blog-index {
  width: 100%;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #212529;
}

.page-header p {
  font-size: 1.1rem;
  color: #6c757d;
  margin-top: 0.5rem;
}

.controls-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.search-bar {
  position: relative;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  color: #adb5bd;
}

.search-bar input {
  width: 90%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #dee2e6;
  border-radius: 2rem;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-bar input:focus {
  outline: none;
  border-color: #d9534f;
  box-shadow: 0 0 0 3px rgba(217, 83, 79, 0.2);
}

.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.category-filters button {
  background: #fff;
  border: 1px solid #dee2e6;
  color: #495057;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}

.category-filters button.active {
  background-color: #d9534f;
  color: #fff;
  border-color: #d9534f;
}

.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.post-card-link {
  text-decoration: none;
  color: inherit;
}

.post-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
}

.card-thumbnail {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.card-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.post-card:hover .card-thumbnail img {
  transform: scale(1.05);
}

.card-content {
  padding: 1rem;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 0 0 0.5rem 0;
  /* Clamp to 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 3.08em; /* 1.1rem * 1.4 * 2 */
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #6c757d;
}

.card-category {
  background-color: #f8f9fa;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
  background: #fff;
  border-radius: 12px;
}

@media (max-width: 768px) {
  .search-bar input {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
