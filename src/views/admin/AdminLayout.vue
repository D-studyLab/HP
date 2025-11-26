<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <h1>📝 Admin</h1>
        <p>D-study Lab</p>
      </div>

      <nav class="sidebar-nav">
        <router-link to="/admin/dashboard" class="nav-item">
          <i class="fas fa-home"></i>
          ダッシュボード
        </router-link>
        <router-link to="/admin/blog/new" class="nav-item">
          <i class="fas fa-plus-circle"></i>
          新規ブログ記事
        </router-link>
        <router-link to="/admin/activity/new" class="nav-item">
          <i class="fas fa-calendar-plus"></i>
          新規活動実績
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <button @click="logout" class="logout-button">
          <i class="fas fa-sign-out-alt"></i>
          ログアウト
        </button>
      </div>
    </aside>

    <main class="admin-content">
      <div :class="contentWrapperClass">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';

const route = useRoute();
const router = useRouter();

const logout = async () => {
  if (confirm('ログアウトしますか？')) {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('ログアウトに失敗しました。');
    }
  }
};

const contentWrapperClass = computed(() => {
  const editorRoutes = ['BlogNew', 'BlogEdit', 'ActivityNew', 'ActivityEdit'];
  if (editorRoutes.includes(route.name)) {
    return 'content-wrapper is-editor';
  }
  return 'content-wrapper';
});
</script>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
  background: #f5f6fa;
}

.admin-sidebar {
  width: 280px;
  background: linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.sidebar-header {
  padding: 2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header h1 {
  font-size: 1.8rem;
  margin: 0 0 0.5rem 0;
}

.sidebar-header p {
  font-size: 0.9rem;
  color: #a0a0b0;
  margin: 0;
}

.sidebar-nav {
  flex: 1;
  padding: 1.5rem 0;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  color: #c0c0d0;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.nav-item i {
  font-size: 1.2rem;
  width: 20px;
}

.nav-item:hover {
  background: rgba(0, 170, 255, 0.1);
  color: #00aaff;
}

.nav-item.router-link-active {
  background: rgba(0, 170, 255, 0.15);
  color: #00aaff;
  border-left: 4px solid #00aaff;
  padding-left: calc(1.5rem - 4px);
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.logout-button {
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 8px;
  color: #ff6b6b;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.logout-button:hover {
  background: rgba(255, 107, 107, 0.2);
  border-color: #ff6b6b;
}

.admin-content {
  flex: 1;
  overflow-y: auto;
  height: 100vh;
}

.content-wrapper {
  padding: 2rem;
}

.content-wrapper.is-editor {
  padding: 0;
  height: 100%;
}

@media (max-width: 768px) {
  .admin-sidebar {
    width: 100%;
    max-width: 250px;
    position: fixed;
    left: 0;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .admin-content {
    width: 100%;
  }
}
</style>
