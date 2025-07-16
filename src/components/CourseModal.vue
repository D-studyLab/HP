<template>
  <transition name="modal-fade">
    <div v-if="show" class="modal-overlay" @click.self="close">
      <div class="modal-content" role="dialog" aria-modal="true">
        <div class="modal-header">
          <h3 class="modal-title">{{ course.title }}</h3>
          <button class="close-button" @click="close" aria-label="閉じる">&times;</button>
        </div>
        <p class="modal-target">{{ course.target }}</p>
        <div class="modal-body">
          <h4>コース概要</h4>
          <p>{{ course.details.summary }}</p>

          <h4>このコースの特徴</h4>
          <ul>
            <li v-for="(feature, index) in course.details.features" :key="index">{{ feature }}</li>
          </ul>

          <h4>こんな方におすすめ</h4>
          <ul>
            <li v-for="(item, index) in course.details.recommendedFor" :key="index">{{ item }}</li>
          </ul>
        </div>
        <p class="modal-price">{{ course.price }}</p>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  course: Object
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: #1a1a2e;
  color: #e0e0e0;
  padding: 2rem 3rem;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid var(--primary-color);
  box-shadow: 0 0 30px rgba(0, 170, 255, 0.5);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 2.5rem;
  color: #e0e0e0;
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 0;
  line-height: 1;
}

.close-button:hover {
  color: var(--primary-color);
}

.modal-title {
  font-size: 1.8rem;
  color: var(--primary-color);
}

.modal-target {
  font-weight: bold;
  color: #ff9f61;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.modal-body h4 {
  font-size: 1.4rem;
  color: var(--title-color);
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--primary-color);
}

.modal-body ul {
  list-style-position: inside;
  padding-left: 0;
}

.modal-body li {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.modal-price {
  font-size: 1.6rem;
  font-weight: bold;
  text-align: right;
  color: var(--title-color);
  margin-top: 2rem;
}

/* --- Mobile First Bottom Sheet --- */
@media (max-width: 768px) {
  .modal-overlay {
    align-items: flex-end; /* 画面下に配置 */
  }

  .modal-content {
    width: 100%;
    max-width: 100%;
    max-height: 85vh;
    border-radius: 24px 24px 0 0; /* 上部の角を丸く */
    padding: 1.5rem;
    border: none;
    border-top: 1px solid var(--primary-color);
    box-shadow: 0 -10px 30px rgba(0, 170, 255, 0.3);
  }

  .modal-title { font-size: 1.5rem; }
  .modal-target { font-size: 1rem; margin-bottom: 1.5rem; }
  .modal-body h4 { font-size: 1.2rem; }
  .modal-price { font-size: 1.4rem; }
}

/* --- Animation --- */
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-content,
.modal-fade-leave-active .modal-content {
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.modal-fade-enter-from .modal-content,
.modal-fade-leave-to .modal-content {
  transform: translateY(100%);
}

@media (min-width: 769px) {
  .modal-fade-enter-from .modal-content,
  .modal-fade-leave-to .modal-content {
    transform: translateY(20px) scale(0.95);
  }
}
</style>