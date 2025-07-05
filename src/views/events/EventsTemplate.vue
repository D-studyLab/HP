<template>
  <div class="event-detail-container">
    <router-link to="/" class="back-link">&lt; ホームに戻る</router-link>
    <div v-if="eventComponent">
      <component :is="eventComponent" />
    </div>
    <div v-else>
      <p>イベントが見つかりません。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, shallowRef } from 'vue';
import { useRoute } from 'vue-router';
import { events } from '@/data/events.js';

const route = useRoute();
const eventComponent = shallowRef(null);

onMounted(async () => {
  const eventId = route.params.id;
  const event = events.find(e => e.id === eventId);
  if (event && typeof event.component === 'function') {
    const componentModule = await event.component();
    eventComponent.value = componentModule.default;
  } 
});
</script>

<style scoped>
.event-detail-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  font-family: sans-serif;
}

.back-link {
  display: inline-block;
  margin-bottom: 20px;
  color: #007bff;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}
</style>
