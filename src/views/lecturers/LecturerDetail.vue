<template>
  <div v-if="lecturer" class="lecturer-detail-view">
    <div class="main-profile">
      <img :src="lecturer.photo" :alt="lecturer.name" class="lecturer-photo-large" />
      <div class="main-info">
        <h1 class="lecturer-name">{{ lecturer.name }}</h1>
        <p class="lecturer-title">{{ lecturer.title }}</p>
        <p class="lecturer-catchphrase">{{ lecturer.catchphrase }}</p>
      </div>
    </div>

    <div class="detail-section">
      <h2><i class="fas fa-user-tie"></i>プロフィール</h2>
      <p><strong>出身:</strong> {{ lecturer.profile.origin }}</p>
      <p><strong>これまでの歩み:</strong> {{ lecturer.profile.history }}</p>
      <p><strong>D-studyLabへの思い:</strong> {{ lecturer.profile.passion }}</p>
    </div>

    <div class="detail-section">
      <h2><i class="fas fa-trophy"></i>実績</h2>
      <ul>
        <li v-for="(achievement, index) in lecturer.achievements" :key="index">{{ achievement }}</li>
      </ul>
    </div>

    <div class="detail-section">
      <h2><i class="fas fa-mug-hot"></i>パーソナル</h2>
      <h3>{{ lecturer.personal.title }}</h3>
      <p>{{ lecturer.personal.description }}</p>
    </div>

    <div class="detail-section message-section">
      <h2><i class="fas fa-envelope"></i>メッセージ</h2>
      <p>{{ lecturer.message }}</p>
    </div>

    <router-link to="/lecturers" class="back-link">講師一覧へ戻る</router-link>
  </div>
  <div v-else>
    <p>講師が見つかりません。</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { lecturers } from '@/data/lecturers.js';

const route = useRoute();
const lecturerId = parseInt(route.params.id, 10);

const lecturer = computed(() => 
  lecturers.find(l => l.id === lecturerId)
);
</script>

<style scoped>
.lecturer-detail-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 2rem;
  color: var(--text-color);
}

.main-profile {
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  background: var(--glass-bg);
  padding: 2rem;
  border-radius: 16px;
}

.lecturer-photo-large {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 2rem;
  border: 4px solid var(--primary-color);
}

.lecturer-name {
  font-size: 2.5rem;
  color: var(--title-color);
  margin: 0;
}

.lecturer-title {
  font-size: 1.2rem;
  color: var(--primary-color);
  margin: 0.5rem 0;
}

.lecturer-catchphrase {
  font-size: 1.1rem;
  font-style: italic;
}

.detail-section {
  margin-bottom: 2.5rem;
}

.detail-section h2 {
  font-size: 1.8rem;
  color: var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.detail-section h2 i {
  margin-right: 0.8rem;
}

.detail-section p,
.detail-section li {
  font-size: 1.1rem;
  line-height: 1.8;
}

.detail-section ul {
  list-style-type: none;
  padding-left: 0;
}

.detail-section li {
  background: rgba(255, 255, 255, 0.05);
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.message-section p {
  background: var(--glass-bg);
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 5px solid var(--primary-color);
}

.back-link {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.8rem 1.5rem;
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.back-link:hover {
  background-color: #0056b3;
}
</style>
