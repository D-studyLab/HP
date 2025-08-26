<template>
  <div class="card-container" @click="handleClick">
    <div class="card">
      <div class="card-image" :style="imageStyle"></div>
      <div class="card-content">
        <span class="card-category">{{ activity.category }}</span>
        <h3 class="card-title">{{ activity.title }}</h3>
        <p class="card-date">{{ activity.date }}</p>
        <p class="card-description">{{ activity.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  activity: {
    type: Object,
    required: true
  }
});

const router = useRouter();

const imageStyle = computed(() => ({
  backgroundImage: `url(${props.activity.thumbnail})`,
  backgroundPosition: props.activity.thumbnailPosition || 'center center',
}));

const handleClick = () => {
  if (!props.activity.link) return;

  if (props.activity.target === '_blank') {
    window.open(props.activity.link, '_blank', 'noopener,noreferrer');
  } else {
    router.push(props.activity.link);
  }
};
</script>

<style scoped>
.card-container {
  cursor: pointer;
  perspective: 1000px;
  width: 360px;
  height: 420px;
}

.card {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.card-container:hover .card {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 0 30px rgba(0, 170, 255, 0.6);
  border-color: var(--primary-color);
}

.card-image {
  height: 180px;
  background-size: cover;
  transition: transform 0.4s ease;
}

.card-container:hover .card-image {
  transform: scale(1.1);
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  color: var(--text-color);
}

.card-category {
  display: inline-block;
  background-color: var(--primary-color);
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  align-self: flex-start;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--title-color);
  line-height: 1.4;
  min-height: 3.5rem; /* 2行分の高さを確保 */
}

.card-date {
  font-size: 0.9rem;
  color: #a0a0b0;
  margin-bottom: 1rem;
}

.card-description {
  font-size: 0.95rem;
  line-height: 1.6;
  flex-grow: 1;
  color: #c0c0d0;
}
</style>
