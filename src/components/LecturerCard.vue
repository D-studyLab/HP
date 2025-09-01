<template>
  <div @click="showDetails" class="lecturer-card">
    <div class="lecturer-header">
      <img :src="lecturer.photo" :alt="lecturer.name" class="lecturer-photo" />
      <div class="lecturer-name-group">
        <h3 class="lecturer-name">{{ lecturer.name }}</h3>
        <p class="lecturer-furigana">({{ lecturer.furigana }})</p>
      </div>
    </div>
    <div class="lecturer-body">
      <p class="lecturer-title">{{ lecturer.title }}</p>
      <p class="lecturer-catchphrase">{{ lecturer.catchphrase }}</p>
    </div>
    <div class="overlay">
      <span class="overlay-text">詳細を見る</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  lecturer: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['show-details']);

const showDetails = () => {
  emit('show-details');
};
</script>

<style scoped>
.lecturer-card {
  position: relative; /* Added for overlay positioning */
  display: flex;
  flex-direction: column;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 2rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  max-width: 500px;
}

.lecturer-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 170, 255, 0.3);
}

.lecturer-card:hover .overlay {
  opacity: 1;
}

.lecturer-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.lecturer-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary-color);
  margin-right: 1.5rem;
  flex-shrink: 0;
}

.lecturer-name-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1.2rem;
}

.lecturer-name {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--title-color);
  margin: 0;
  line-height: 1.3;
}

.lecturer-furigana {
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--text-color);
  margin-top: 0.25rem;
}

.lecturer-body {
  text-align: left;
}

.lecturer-title {
  font-size: 1.1rem;
  color: var(--primary-color);
  margin: 0 0 0.75rem 0;
  font-weight: 600;
}

.lecturer-catchphrase {
  font-size: 1rem;
  color: var(--text-color);
  line-height: 1.6;
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
  border-radius: 16px;
}

.overlay-text {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
