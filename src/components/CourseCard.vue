<template>
  <div class="course-card" @click="emitClick">
    <h4>{{ course.title }}</h4>
    <p class="target">{{ course.target }}</p>
    <p class="description">{{ course.description }}</p>
    <p class="price">{{ course.price }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  course: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['course-click']);

const emitClick = () => {
  emit('course-click', props.course);
};
</script>

<style scoped>
.course-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
  width: 380px;
  text-align: left;
  display: flex;
  flex-direction: column;
  cursor: pointer; /* クリック可能を示すカーソル */
}

.course-card:hover {
  transform: translateY(-10px);
  border-color: var(--primary-color);
  box-shadow: 0 0 20px rgba(0, 170, 255, 0.5);
}

.course-card h4 {
  font-size: clamp(1.3rem, 2vw, 1.5rem);
  margin-bottom: 0.5rem;
  color: var(--primary-color);
  line-height: 1.3;
}

.course-card .target {
  font-weight: bold;
  color: #ff9f61;
  margin-bottom: 1rem;
  line-height: 1.4;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
}

.course-card .description {
  font-size: clamp(0.85rem, 1.3vw, 1rem);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  color: #c0c0d0;
  word-break: break-word;
}

.course-card .price {
  font-size: clamp(1.4rem, 2.5vw, 1.6rem);
  font-weight: bold;
  text-align: right;
  color: var(--title-color);
  line-height: 1.2;
}

@media (max-width: 1020px) {
  .course-card {
    width: 100%;
  }
}
</style>
