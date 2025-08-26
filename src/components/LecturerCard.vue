<template>
  <div @click="showDetails" class="lecturer-card">
    <img :src="lecturer.photo" :alt="lecturer.name" class="lecturer-photo" />
    <div class="lecturer-info">
      <h3 class="lecturer-name">{{ lecturer.name }}</h3>
      <p class="lecturer-title">{{ lecturer.title }}</p>
      <p class="lecturer-catchphrase">{{ lecturer.catchphrase }}</p>
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
  display: block;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 2rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.lecturer-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 170, 255, 0.3);
}

.lecturer-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.5rem;
  border: 3px solid var(--primary-color);
}

.lecturer-info {
  text-align: center;
}

.lecturer-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--title-color);
  margin: 0 0 0.5rem 0;
}

.lecturer-title {
  font-size: 1rem;
  color: var(--primary-color);
  margin: 0 0 1rem 0;
}

.lecturer-catchphrase {
  font-size: 1.1rem;
  color: var(--text-color);
}
</style>
