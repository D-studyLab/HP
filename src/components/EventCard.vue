<template>
  <router-link :to="`/events/${event.id}`" class="event-card">
    <img :src="event.thumbnail" :alt="event.title" class="event-thumbnail" :style="{ objectPosition: event.thumbnailPosition || 'center' }" />
    <div class="event-info">
      <h3 class="event-title">{{ event.title }}</h3>
      <p class="event-date">{{ formatDate(event.date) }}</p>
    </div>
    <div class="overlay">
      <span class="overlay-text">詳細を見る</span>
    </div>
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  event: {
    type: Object,
    required: true
  }
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('ja-JP', options);
};
</script>

<style scoped>
.event-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.3s ease;
  height: 380px; /* カードの高さを固定 */
  cursor: pointer;
}

.event-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.event-thumbnail {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.event-info {
  padding: 30px;
  flex-grow: 1; /* 残りのスペースを埋める */
  display: flex;
  flex-direction: column;
}

.event-title {
  margin: 0 0 8px 0;
  font-size: 1.2em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 2行に制限 */
  line-clamp: 2; /* 標準プロパティを追加 */
  -webkit-box-orient: vertical;
}

.event-date {
  margin-top: auto; /* 日付を常に下部に配置 */  
  color: var(--text-color); /* LPのテキストカラーに合わせる */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 8px;
}

.overlay-text {
  font-size: 1.2rem;
  font-weight: bold;
}

.event-card:hover .overlay {
  opacity: 1;
}
</style>