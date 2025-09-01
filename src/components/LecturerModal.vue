<template>
  <transition name="modal-fade">
    <div v-if="show" class="modal-overlay" @click.self="close">
      <div class="modal-content" role="dialog" aria-modal="true">
        <div class="modal-header">
          <h2 class="modal-title"></h2>
          <button class="close-button" @click="close" aria-label="閉じる">&times;</button>
        </div>
        <div class="modal-body">
          <div class="main-profile">
            <img :src="lecturer.photo" :alt="lecturer.name" class="lecturer-photo-large" />
            <div class="main-info">
              <h3 class="lecturer-name-large">{{ lecturer.name }}</h3>
              <p class="lecturer-furigana-modal">({{ lecturer.furigana }})</p>
              <p class="lecturer-title">{{ lecturer.title }}</p>
              <p class="lecturer-catchphrase">{{ lecturer.catchphrase }}</p>
            </div>
          </div>

          <div class="detail-section">
            <h3><i class="fas fa-user-tie"></i>プロフィール</h3>
            <p><strong>出身:</strong> {{ lecturer.profile.origin }}</p>
            <p><strong>これまでの歩み:</strong> {{ lecturer.profile.history }}</p>
            <p><strong>D-studyLabへの思い:</strong> {{ lecturer.profile.passion }}</p>
          </div>

          <div class="detail-section">
            <h3><i class="fas fa-trophy"></i>実績</h3>
            <ul>
              <li v-for="(achievement, index) in lecturer.achievements" :key="index">{{ achievement }}</li>
            </ul>
          </div>

          <div class="detail-section">
            <h3><i class="fas fa-mug-hot"></i>パーソナル</h3>
            <h4>{{ lecturer.personal.title }}</h4>
            <p>{{ lecturer.personal.description }}</p>
          </div>

          <div class="detail-section message-section">
            <h3><i class="fas fa-envelope"></i>メッセージ</h3>
            <p>{{ lecturer.message }}</p>
          </div>

          <div class="to-blog-section">
            <router-link to="/blog" class="to-blog-link">もっと詳しく知る（個人ブログへ）</router-link>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: Boolean,
  lecturer: Object
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>

<style scoped>
/* Custom Scrollbar */
.modal-content::-webkit-scrollbar {
  width: 8px;
}
.modal-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}
.modal-content::-webkit-scrollbar-thumb {
  background-color: var(--primary-color);
  border-radius: 4px;
}
.modal-content {
  scrollbar-width: thin;
  scrollbar-color: var(--primary-color) rgba(255, 255, 255, 0.1);
}

/* Using styles from CourseModal.vue and LecturerDetail.vue */
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
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--glass-border);
  padding-bottom: 1rem;
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
  font-size: 1.2rem;
  color: var(--text-color);
  font-weight: 600;
}

.modal-body {
  /* Styles from LecturerDetail.vue */
  color: var(--text-color);
}

.main-profile {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  background: var(--glass-bg);
  padding: 1.5rem;
  border-radius: 16px;
}

.lecturer-photo-large {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 2rem;
  border: 4px solid var(--primary-color);
  flex-shrink: 0;
}

.main-info {
  flex: 1;
}

.lecturer-name-large {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1.3;
  margin: 0;
}

.lecturer-furigana-modal {
  font-size: 1rem;
  font-weight: normal;
  color: #c0c0d0;
  margin-top: 0;
  margin-bottom: 1rem;
}

.lecturer-title {
  font-size: 1.2rem;
  color: var(--primary-color);
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.lecturer-catchphrase {
  font-size: 1.1rem;
  font-style: italic;
  color: var(--text-color);
}

.detail-section {
  margin-bottom: 2rem;
}

.detail-section h3 {
  font-size: 1.6rem;
  color: var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.detail-section h3 i {
  margin-right: 0.8rem;
}

.detail-section h4 {
  font-size: 1.2rem;
  color: var(--title-color);
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.detail-section p,
.detail-section li {
  font-size: 1rem;
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

.to-blog-section {
  text-align: center;
  margin-top: 2rem;
}

.to-blog-link {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.to-blog-link:hover {
  background-color: #0056b3;
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
  .modal-title {
    font-size: 1.2rem;
  }
  .lecturer-name-large {
    font-size: 1.5rem;
  }
  .lecturer-photo-large {
    width: 80px;
    height: 80px;
    margin-right: 1rem;
  }
  .lecturer-title {
    font-size: 1rem;
  }
  .lecturer-catchphrase {
    font-size: 0.9rem;
  }
  .detail-section h3 {
    font-size: 1.3rem;
  }
  .detail-section p,
  .detail-section li {
    font-size: 0.9rem;
  }
}

/* --- Animation --- */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
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
