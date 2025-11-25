<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>📊 ダッシュボード</h1>
      <p>ブログ記事と活動実績を管理</p>
    </header>

    <!-- ブログ記事セクション -->
    <section class="section">
      <div class="section-header">
        <h2>📝 ブログ記事</h2>
        <router-link to="/admin/blog/new" class="add-button">
          <i class="fas fa-plus"></i> 新規作成
        </router-link>
      </div>

      <div v-if="loading" class="loading">読み込み中...</div>

      <div v-else-if="posts.length === 0" class="empty-state">
        <p>まだブログ記事がありません</p>
        <router-link to="/admin/blog/new" class="cta-button">
          最初の記事を作成
        </router-link>
      </div>

      <div v-else class="item-grid">
        <div v-for="post in posts" :key="post.id" class="item-card">
          <div class="item-thumbnail" :style="{ backgroundImage: `url(${post.thumbnail})` }"></div>
          <div class="item-content">
            <h3>{{ post.title }}</h3>
            <p class="item-meta">
              <span class="category-badge">{{ post.category }}</span>
              <span class="date">{{ formatDate(post.date) }}</span>
            </p>
            <p class="excerpt">{{ post.excerpt }}</p>
            <div class="item-actions">
              <router-link :to="`/admin/blog/edit/${post.id}`" class="btn btn-edit">
                <i class="fas fa-edit"></i> 編集
              </router-link>
              <button @click="deletePost(post.id)" class="btn btn-delete">
                <i class="fas fa-trash"></i> 削除
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 活動実績セクション -->
    <section class="section">
      <div class="section-header">
        <h2>🎯 活動実績</h2>
        <router-link to="/admin/activity/new" class="add-button">
          <i class="fas fa-plus"></i> 新規作成
        </router-link>
      </div>

      <div v-if="loading" class="loading">読み込み中...</div>

      <div v-else-if="activities.length === 0" class="empty-state">
        <p>まだ活動実績がありません</p>
        <router-link to="/admin/activity/new" class="cta-button">
          最初の活動を作成
        </router-link>
      </div>

      <div v-else class="item-grid">
        <div v-for="activity in activities" :key="activity.id" class="item-card">
          <div class="item-thumbnail" :style="{ backgroundImage: `url(${activity.thumbnail})` }"></div>
          <div class="item-content">
            <h3>{{ activity.title }}</h3>
            <p class="item-meta">
              <span class="category-badge">{{ activity.category }}</span>
              <span class="date">{{ activity.date }}</span>
            </p>
            <p class="excerpt">{{ activity.description }}</p>
            <div class="item-actions">
              <router-link :to="`/admin/activity/edit/${activity.id}`" class="btn btn-edit">
                <i class="fas fa-edit"></i> 編集
              </router-link>
              <button @click="deleteActivity(activity.id)" class="btn btn-delete">
                <i class="fas fa-trash"></i> 削除
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';

const posts = ref([]);
const activities = ref([]);
const loading = ref(true);

onMounted(async () => {
  await loadData();
});

const loadData = async () => {
  loading.value = true;
  try {
    // ブログ記事取得
    const postsQuery = query(collection(db, 'blogPosts'), orderBy('date', 'desc'));
    const postsSnapshot = await getDocs(postsQuery);
    posts.value = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // 活動実績取得
    const activitiesQuery = query(collection(db, 'activities'), orderBy('date', 'desc'));
    const activitiesSnapshot = await getDocs(activitiesQuery);
    activities.value = activitiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('データ取得エラー:', error);
    alert('データの取得に失敗しました');
  } finally {
    loading.value = false;
  }
};

const formatDate = (date) => {
  if (!date) return '';
  if (date.toDate) {
    // Firestore Timestamp
    return date.toDate().toLocaleDateString('ja-JP');
  }
  return new Date(date).toLocaleDateString('ja-JP');
};

const deletePost = async (id) => {
  if (!confirm('本当に削除しますか？この操作は取り消せません。')) return;

  try {
    await deleteDoc(doc(db, 'blogPosts', id));
    posts.value = posts.value.filter(p => p.id !== id);
    alert('削除しました');
  } catch (error) {
    console.error('削除エラー:', error);
    alert('削除に失敗しました');
  }
};

const deleteActivity = async (id) => {
  if (!confirm('本当に削除しますか？この操作は取り消せません。')) return;

  try {
    await deleteDoc(doc(db, 'activities', id));
    activities.value = activities.value.filter(a => a.id !== id);
    alert('削除しました');
  } catch (error) {
    console.error('削除エラー:', error);
    alert('削除に失敗しました');
  }
};
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 3rem;
}

.dashboard-header h1 {
  font-size: 2.5rem;
  color: #1a1a2e;
  margin: 0 0 0.5rem 0;
}

.dashboard-header p {
  color: #6c757d;
  font-size: 1.1rem;
  margin: 0;
}

.section {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.section-header h2 {
  font-size: 1.8rem;
  color: #1a1a2e;
  margin: 0;
}

.add-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #00aaff 0%, #0088cc 100%);
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 170, 255, 0.3);
}

.loading {
  text-align: center;
  padding: 3rem;
  color: #6c757d;
  font-size: 1.1rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #6c757d;
}

.empty-state p {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  background: #00aaff;
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: #0088cc;
  transform: translateY(-2px);
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.item-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: #fff;
}

.item-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.item-thumbnail {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-color: #f0f0f0;
}

.item-content {
  padding: 1.5rem;
}

.item-content h3 {
  font-size: 1.3rem;
  margin: 0 0 0.75rem 0;
  color: #1a1a2e;
  line-height: 1.4;
}

.item-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 0.75rem;
}

.category-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: bold;
}

.date {
  color: #6c757d;
  font-size: 0.9rem;
}

.excerpt {
  color: #495057;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-actions {
  display: flex;
  gap: 0.75rem;
}

.btn {
  flex: 1;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
}

.btn-edit {
  background: #28a745;
  color: #fff;
}

.btn-edit:hover {
  background: #218838;
}

.btn-delete {
  background: #dc3545;
  color: #fff;
}

.btn-delete:hover {
  background: #c82333;
}

@media (max-width: 768px) {
  .item-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .add-button {
    justify-content: center;
  }
}
</style>
