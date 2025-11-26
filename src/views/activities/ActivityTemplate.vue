<template>
  <div v-if="activity" class="activity-page">
    <header class="activity-header">
      <div class="activity-header-image">
        <img :src="activity.thumbnail" :alt="activity.title" />
      </div>
      <div class="activity-header-content">
        <h1>{{ activity.title }}</h1>
        <p class="activity-date">{{ activity.date }}</p>
      </div>
    </header>
    <div class="activity-layout">
      <main class="activity-content">
        <div v-html="activity.html" class="post-body"></div>
      </main>
    </div>
  </div>
  <div v-else class="loading-message">
    <p>活動実績を読み込んでいます...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import { marked } from 'marked';

const route = useRoute();
const activity = ref(null);

const loadActivity = async (slug) => {
  if (!slug) return; // Guard clause to prevent running with undefined slug

  activity.value = null; // Reset on load
  try {
    const activitiesQuery = query(collection(db, 'activities'), where('slug', '==', slug));
    const querySnapshot = await getDocs(activitiesQuery);

    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0].data();
      const html = await marked.parse(docData.content || '');

      activity.value = {
        title: docData.title,
        date: docData.date,
        thumbnail: docData.thumbnail,
        html: html,
        slug: slug,
      };

      document.title = `${docData.title} - 活動実績`;
    } else {
      console.error('活動実績が見つかりません');
      // You could set a specific "not found" state here
      activity.value = { notFound: true, title: '見つかりません' }; 
    }
  } catch (e) {
    console.error('Error loading activity:', e);
  }
};

// Watch for route changes to load new activity details
watch(() => route.params.slug, (newSlug) => {
  loadActivity(newSlug);
}, { immediate: true });
</script>

<style scoped>
/* Styles adapted from BlogPost.vue for consistency */
.activity-page {
  background-color: #fff;
}

.loading-message {
  text-align: center;
  padding: 4rem;
  font-size: 1.2rem;
  color: #6c757d;
}

.activity-header {
  position: relative;
  width: 100%;
  height: 50vh;
  max-height: 500px;
  overflow: hidden;
  margin-bottom: 4rem;
}

.activity-header-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.activity-header-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}

.activity-header-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.activity-header-content {
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

.activity-header-content h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.2;
  text-shadow: 0 4px 15px rgba(0,0,0,0.7);
}

.activity-header-content .activity-date {
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 5px rgba(0,0,0,0.4);
}

.activity-layout {
  max-width: 800px;
  margin: 0 auto;
  padding: 0rem 2rem 2rem 2rem;
}

.post-body :deep(h1) { font-size: 2rem; border-bottom: 2px solid #e0e0e0; padding-bottom: 0.5rem; margin-top: 1.5rem; margin-bottom: 1rem; color: #2c3e50; }
.post-body :deep(h2) { font-size: 1.6rem; border-bottom: 1px solid #e0e0e0; padding-bottom: 0.5rem; margin-top: 1.5rem; margin-bottom: 1rem; color: #2c3e50; }
.post-body :deep(p) { line-height: 1.8; font-size: 1rem; margin-bottom: 1rem; color: #2c3e50; }
.post-body :deep(a) { color: #007bff; text-decoration: none; border-bottom: 1px solid #007bff; }
.post-body :deep(a:hover) { text-decoration: underline; background: rgba(0, 123, 255, 0.1); }
.post-body :deep(ul), .post-body :deep(ol) { margin: 1rem 0; padding-left: 2rem; color: #2c3e50; }
.post-body :deep(li) { margin-bottom: 0.5rem; line-height: 1.8; color: #2c3e50; }
.post-body :deep(img) { max-width: 100%; height: auto; border-radius: 8px; margin: 1rem 0; }
.post-body :deep(code) { font-family: 'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace; background-color: #f5f5f5; padding: 0.2em 0.4em; border-radius: 4px; color: #e83e8c; }
.post-body :deep(pre) { background-color: #2d2d2d; color: #f8f8f2; padding: 1.5rem; border-radius: 8px; overflow-x: auto; margin: 1.5rem 0; }
.post-body :deep(pre > code) { padding: 0; background-color: transparent; }
.post-body :deep(blockquote) { border-left: 4px solid #007bff; padding-left: 1.5rem; margin: 0 0 1.5rem; color: #6c757d; font-style: italic; }
.post-body :deep(table) { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
.post-body :deep(th), .post-body :deep(td) { border: 1px solid #dee2e6; padding: 0.75rem; text-align: left; }
.post-body :deep(th) { background: #f8f9fa; font-weight: 600; color: #495057; }

</style>