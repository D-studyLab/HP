<template>
  <div class="lecturers-view">
    <h1 class="page-title">講師紹介</h1>
    <div class="lecturers-grid">
      <LecturerCard
        v-for="lecturer in lecturers"
        :key="lecturer.id"
        :lecturer="lecturer"
      />
    </div>
  </div>
</template>

<script setup>
import LecturerCard from '@/components/LecturerCard.vue';
import { lecturers } from '@/data/lecturers.js';
</script>

<style scoped>
.lecturers-view {
  padding: 4rem 2rem;
  text-align: center;
}

.page-title {
  font-size: 2.5rem;
  color: var(--title-color);
  margin-bottom: 3rem;
}

.lecturers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
