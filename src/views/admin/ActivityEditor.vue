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

    <!-- Tab Navigation -->
    <div class="tab-nav">
      <button @click="activeTab = 'info'" :class="{ active: activeTab === 'info' }">
        <i class="fas fa-info-circle"></i> 基本情報
      </button>
      <button @click="activeTab = 'content'" :class="{ active: activeTab === 'content' }">
        <i class="fas fa-file-alt"></i> 詳細コンテンツ
      </button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <!-- Basic Info Panel -->
      <div v-show="activeTab === 'info'" class="form-scroll-container">
        <div class="form-container">
          <div class="form-section">
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

          <!-- Card Preview Section -->
          <div class="form-section">
            <h3>カードプレビュー</h3>
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

      <!-- Content Editor Panel -->
      <div v-show="activeTab === 'content'" class="editor-split-container">
        <div class="editor-split" ref="splitContainer">
          <div class="editor-pane" :style="{ width: editorWidth + '%' }">
            <div class="pane-header">
              <h3>📄 Markdown</h3>
              <div class="header-actions-right">
                <label class="insert-image-btn" :class="{ uploading: uploadingContent }">
                  <i class="fas fa-image"></i>
                  {{ uploadingContent ? 'アップロード中...' : '画像挿入' }}
                  <input type="file" accept="image/*" @change="uploadContentImage" hidden />
                </label>
                <span class="char-count">{{ activity.content.length }} 文字</span>
              </div>
            </div>
            <textarea
              v-model="activity.content"
              placeholder="Markdownで詳細な活動内容を記述..."
            />
          </div>
          <div class="resizer" @mousedown="startResize">
            <div class="resizer-handle"></div>
          </div>
          <div class="preview-pane" :style="{ width: (100 - editorWidth) + '%' }">
            <div class="pane-header">
              <h3>👁️ プレビュー</h3>
            </div>
            <div class="preview-content" v-html="htmlPreview"></div>
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
import { marked } from 'marked';

const route = useRoute();
const router = useRouter();
const isEdit = computed(() => !!route.params.id);
const saving = ref(false);
const uploadingThumbnail = ref(false);
const uploadingContent = ref(false);
const editorWidth = ref(50);
const activeTab = ref('info'); // 'info' or 'content'

const activity = ref({
  title: '',
  category: '',
  date: new Date().toISOString().split('T')[0],
  description: '',
  thumbnail: '',
  thumbnailPosition: 'center center',
  content: '',
});

const htmlPreview = computed(() => {
  if (!activity.value.content) return '<p style="color: #999; text-align: center; margin-top: 3rem;">プレビューがここに表示されます</p>';
  try {
    return marked.parse(activity.value.content);
  } catch (error) {
    return '<p style="color: red;">Markdownの解析エラー</p>';
  }
});

onMounted(async () => {
  if (isEdit.value) {
    try {
      const docRef = doc(db, 'activities', route.params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        activity.value = {
          title: data.title || '',
          category: data.category || '',
          date: data.date || new Date().toISOString().split('T')[0],
          description: data.description || '',
          thumbnail: data.thumbnail || '',
          thumbnailPosition: data.thumbnailPosition || 'center center',
          content: data.content || '',
        };
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

const save = async () => {
  if (!activity.value.title.trim() || !activity.value.category || !activity.value.thumbnail) {
    alert('タイトル、カテゴリ、サムネイルは必須です');
    return;
  }
  saving.value = true;
  try {
    const slug = activity.value.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').substring(0, 100);
    const activityData = {
      ...activity.value,
      slug: slug,
      updatedAt: new Date().toISOString()
    };

    if (isEdit.value) {
      await setDoc(doc(db, 'activities', route.params.id), activityData);
      alert('✅ 保存しました！');
    } else {
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

const uploadImage = async (file, path) => {
  if (file.size > 5 * 1024 * 1024) {
    alert('ファイルサイズは5MB以下にしてください');
    return null;
  }
  const timestamp = Date.now();
  const fileName = `${path}/${timestamp}-${file.name}`;
  const imageRef = storageRef(storage, fileName);
  await uploadBytes(imageRef, file);
  return await getDownloadURL(imageRef);
};

const uploadThumbnail = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  uploadingThumbnail.value = true;
  try {
    const url = await uploadImage(file, 'activities/thumbnails');
    if (url) {
      activity.value.thumbnail = url;
      alert('画像をアップロードしました！');
    }
  } catch (error) {
    console.error('Upload error:', error);
    alert('アップロードに失敗しました: ' + error.message);
  } finally {
    uploadingThumbnail.value = false;
    e.target.value = '';
  }
};

const uploadContentImage = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  uploadingContent.value = true;
  try {
    const url = await uploadImage(file, 'activities/content');
    if (url) {
      const imageMarkdown = `\n![${file.name}](${url})\n`;
      activity.value.content += imageMarkdown;
      alert('画像をアップロードし、Markdownに挿入しました。');
    }
  } catch (error) {
    console.error('Upload error:', error);
    alert('アップロードに失敗しました: ' + error.message);
  } finally {
    uploadingContent.value = false;
    e.target.value = '';
  }
};

// --- Resizer Logic ---
const splitContainer = ref(null);
let isResizing = false;
const startResize = (e) => {
  isResizing = true;
  document.addEventListener('mousemove', resize);
  document.addEventListener('mouseup', stopResize);
  document.body.style.cursor = 'col-resize';
  document.body.style.userSelect = 'none';
};
const resize = (e) => {
  if (!isResizing || !splitContainer.value) return;
  const containerRect = splitContainer.value.getBoundingClientRect();
  const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
  if (newWidth > 20 && newWidth < 80) editorWidth.value = newWidth;
};
const stopResize = () => {
  isResizing = false;
  document.removeEventListener('mousemove', resize);
  document.removeEventListener('mouseup', stopResize);
  document.body.style.cursor = '';
  document.body.style.userSelect = '';
};
</script>

<style scoped>
/* General Layout */
.editor-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
}

.editor-header {
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #2a2a3e 100%);
  color: #fff;
}

.editor-header h2 { margin: 0; font-size: 1.6rem; }
.header-actions { display: flex; gap: 1rem; }
.save-btn, .back-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.save-btn {
  background: linear-gradient(135deg, #00aaff 0%, #0088cc 100%);
  color: #fff;
  border: none;
}
.save-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0, 170, 255, 0.4); }
.save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.back-btn {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-decoration: none;
}
.back-btn:hover { background: rgba(255, 255, 255, 0.2); }

/* Tab Navigation */
.tab-nav {
  display: flex;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  flex-shrink: 0;
}
.tab-nav button {
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #495057;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.tab-nav button:hover {
  background: #f8f9fa;
  color: #007bff;
}
.tab-nav button.active {
  color: #007bff;
  border-bottom-color: #007bff;
}

/* Tab Content */
.tab-content {
  flex: 1;
  overflow: hidden; /* Important for child containers to scroll correctly */
  position: relative;
}
.form-scroll-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.editor-split-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden; /* Editor itself handles scrolling */
}

/* Form Styles */
.form-container { background: #fff; padding: 2rem; }
.form-section { margin-bottom: 2rem; }
.form-section:not(:last-child) {
  padding-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;
}
.form-section h3 { font-size: 1.3rem; color: #1a1a2e; margin: 0 0 1.5rem 0; }
.form-row { display: flex; gap: 1rem; }
.form-field { margin-bottom: 1.5rem; flex: 1; }
.form-field label { display: block; font-weight: 600; color: #495057; font-size: 0.95rem; margin-bottom: 0.5rem; }
.form-field input, .form-field textarea, .form-field select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
  box-sizing: border-box;
}
.form-field input:focus, .form-field textarea:focus, .form-field select:focus {
  outline: none;
  border-color: #00aaff;
  box-shadow: 0 0 0 3px rgba(0, 170, 255, 0.1);
}
.image-upload-group { display: flex; gap: 0.5rem; }
.upload-btn {
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #00aaff 0%, #0088cc 100%);
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
}

/* Editor & Preview Styles */
.editor-split {
  display: flex;
  height: 100%;
}
.editor-pane, .preview-pane {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
.pane-header {
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #495057;
}
.pane-header h3 { margin: 0; font-size: 1.1rem; }
.editor-pane textarea {
  flex: 1;
  padding: 1.5rem;
  border: none;
  resize: none;
  font-family: 'Courier New', monospace;
  font-size: 15px;
  line-height: 1.8;
  color: #2c3e50;
}
.preview-content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  color: #2c3e50;
}
.resizer { width: 8px; background: #dee2e6; cursor: col-resize; flex-shrink: 0; }

/* Card Preview Styles */
.preview-card {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  max-width: 400px;
  margin-top: 1rem;
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
.preview-content h4 { font-size: 1.2rem; margin: 0 0 0.5rem 0; color: #1a1a2e; }
.preview-date { font-size: 0.9rem; color: #6c757d; margin-bottom: 0.75rem; }
.preview-description { font-size: 0.95rem; line-height: 1.6; color: #495057; }
</style>
