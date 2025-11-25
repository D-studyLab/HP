<template>
  <div class="editor-container">
    <div class="editor-header">
      <h2>{{ isEdit ? '✏️ 活動実績編集' : '🎯 新規活動実績作成' }}</h2>
      <div class="header-actions">
        <button @click="save" class="save-btn" :disabled="saving">
          <i class="fas fa-save"></i>
          {{ saving ? '保存中...' : '💾 保存' }}
        </button>
        <router-link to="/admin/dashboard" class="back-btn">
          <i class="fas fa-arrow-left"></i> 戻る
        </router-link>
      </div>
    </div>

    <div class="form-container">
      <div class="form-section">
        <h3>基本情報</h3>

        <div class="form-field">
          <label>タイトル *</label>
          <input v-model="activity.title" placeholder="活動のタイトル" required />
        </div>

        <div class="form-row">
          <div class="form-field">
            <label>カテゴリ *</label>
            <select v-model="activity.category" required>
              <option value="">選択してください</option>
              <option value="イベント">イベント</option>
              <option value="開発実績">開発実績</option>
              <option value="活動レポート">活動レポート</option>
            </select>
          </div>

          <div class="form-field">
            <label>日付</label>
            <input v-model="activity.date" type="date" />
          </div>
        </div>

        <div class="form-field">
          <label>説明（短い説明文）</label>
          <textarea v-model="activity.description" placeholder="活動の簡単な説明..." rows="3"></textarea>
        </div>

        <div class="form-field">
          <label>サムネイル画像 *</label>
          <div class="image-upload-group">
            <input v-model="activity.thumbnail" placeholder="/event-image.png" required />
            <label class="upload-btn" :class="{ uploading: uploadingThumbnail }">
              <i class="fas fa-upload"></i>
              {{ uploadingThumbnail ? 'アップロード中...' : '画像選択' }}
              <input type="file" accept="image/*" @change="uploadThumbnail" hidden />
            </label>
          </div>
          <small>画像を選択してアップロード、またはURLを直接入力</small>
        </div>

        <div class="form-field">
          <label>サムネイル画像位置</label>
          <input v-model="activity.thumbnailPosition" placeholder="center center" />
          <small>CSS background-position (例: center 20%, center top)</small>
        </div>
      </div>

      <div class="form-section">
        <h3>リンク設定</h3>

        <div class="form-field">
          <label>リンク先URL</label>
          <input v-model="activity.link" placeholder="/activities/event-xxx または https://..." />
          <small>内部リンク（/activities/...）または外部URL</small>
        </div>

        <div class="form-field">
          <label>リンクターゲット</label>
          <select v-model="activity.target">
            <option value="_self">同じタブで開く (_self)</option>
            <option value="_blank">新しいタブで開く (_blank)</option>
          </select>
        </div>
      </div>

      <div class="form-section">
        <h3>プレビュー</h3>
        <div class="preview-card">
          <div class="preview-thumbnail" :style="{
            backgroundImage: `url(${activity.thumbnail || '/D-studyLab_logo.png'})`,
            backgroundPosition: activity.thumbnailPosition || 'center center'
          }"></div>
          <div class="preview-content">
            <span class="preview-category">{{ activity.category || 'カテゴリ' }}</span>
            <h4>{{ activity.title || 'タイトル' }}</h4>
            <p class="preview-date">{{ activity.date || '日付' }}</p>
            <p class="preview-description">{{ activity.description || '説明文' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc, getDoc, setDoc, addDoc, collection } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/firebase';

const route = useRoute();
const router = useRouter();
const isEdit = computed(() => !!route.params.id);
const saving = ref(false);
const uploadingThumbnail = ref(false);

const activity = ref({
  title: '',
  category: '',
  date: new Date().toISOString().split('T')[0],
  description: '',
  thumbnail: '',
  thumbnailPosition: 'center center',
  link: '',
  target: '_self'
});

// 既存活動実績の読み込み
onMounted(async () => {
  if (isEdit.value) {
    try {
      const docRef = doc(db, 'activities', route.params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        activity.value = { ...docSnap.data() };
      } else {
        alert('活動実績が見つかりません');
        router.push('/admin/dashboard');
      }
    } catch (error) {
      console.error('活動実績読み込みエラー:', error);
      alert('活動実績の読み込みに失敗しました');
    }
  }
});

// 保存
const save = async () => {
  if (!activity.value.title.trim()) {
    alert('タイトルを入力してください');
    return;
  }

  if (!activity.value.category) {
    alert('カテゴリを選択してください');
    return;
  }

  if (!activity.value.thumbnail) {
    alert('サムネイル画像URLを入力してください');
    return;
  }

  saving.value = true;

  try {
    const activityData = {
      ...activity.value,
      updatedAt: new Date().toISOString()
    };

    if (isEdit.value) {
      // 更新
      await setDoc(doc(db, 'activities', route.params.id), activityData);
      alert('✅ 保存しました！');
    } else {
      // 新規作成
      activityData.createdAt = new Date().toISOString();
      const docRef = await addDoc(collection(db, 'activities'), activityData);
      alert('✅ 保存しました！');
      router.push(`/admin/activity/edit/${docRef.id}`);
    }
  } catch (error) {
    console.error('保存エラー:', error);
    alert('❌ 保存に失敗しました: ' + error.message);
  } finally {
    saving.value = false;
  }
};

// 画像アップロード
const uploadThumbnail = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // ファイルサイズチェック（5MB以下）
  if (file.size > 5 * 1024 * 1024) {
    alert('ファイルサイズは5MB以下にしてください');
    return;
  }

  uploadingThumbnail.value = true;

  try {
    const timestamp = Date.now();
    const fileName = `activities/${timestamp}-${file.name}`;
    const imageRef = storageRef(storage, fileName);

    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);

    activity.value.thumbnail = url;
    alert('画像をアップロードしました！');
  } catch (error) {
    console.error('Upload error:', error);
    alert('アップロードに失敗しました: ' + error.message);
  } finally {
    uploadingThumbnail.value = false;
    e.target.value = '';
  }
};
</script>

<style scoped>
.editor-container {
  max-width: 900px;
  margin: 0 auto;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #2a2a3e 100%);
  color: #fff;
  border-radius: 12px 12px 0 0;
  margin-bottom: 2rem;
}

.editor-header h2 {
  margin: 0;
  font-size: 1.6rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.save-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #00aaff 0%, #0088cc 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.save-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 170, 255, 0.4);
}

.save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.back-btn {
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.form-container {
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;
}

.form-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.form-section h3 {
  font-size: 1.3rem;
  color: #1a1a2e;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-field {
  margin-bottom: 1.5rem;
  flex: 1;
}

.form-field label {
  display: block;
  font-weight: 600;
  color: #495057;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.form-field input,
.form-field textarea,
.form-field select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;
  box-sizing: border-box;
}

.form-field input:focus,
.form-field textarea:focus,
.form-field select:focus {
  outline: none;
  border-color: #00aaff;
  box-shadow: 0 0 0 3px rgba(0, 170, 255, 0.1);
}

.form-field small {
  display: block;
  margin-top: 0.5rem;
  color: #6c757d;
  font-size: 0.85rem;
}

.image-upload-group {
  display: flex;
  gap: 0.5rem;
  align-items: stretch;
}

.image-upload-group input {
  flex: 1;
}

.upload-btn {
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #00aaff 0%, #0088cc 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.upload-btn:hover:not(.uploading) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 170, 255, 0.4);
}

.upload-btn.uploading {
  opacity: 0.6;
  cursor: not-allowed;
}

.preview-card {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.preview-thumbnail {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-color: #f0f0f0;
}

.preview-content {
  padding: 1.5rem;
}

.preview-category {
  display: inline-block;
  background: #00aaff;
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
}

.preview-content h4 {
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
  color: #1a1a2e;
}

.preview-date {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 0.75rem;
}

.preview-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #495057;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }

  .editor-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .header-actions {
    flex-direction: column;
  }
}
</style>
