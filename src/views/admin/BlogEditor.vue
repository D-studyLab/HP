<template>
  <div class="editor-container">
    <div class="editor-header">
      <h2>{{ isEdit ? '✏️ ブログ記事編集' : '📝 新規ブログ記事作成' }}</h2>
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
          <div class="form-field">
            <label>タイトル *</label>
            <input v-model="post.title" placeholder="記事タイトル" required />
          </div>
          <div class="form-row">
            <div class="form-field">
              <label>カテゴリ</label>
              <input v-model="post.category" placeholder="AI, その他など" list="categories" />
              <datalist id="categories">
                <option value="AI"></option>
                <option value="その他"></option>
                <option value="技術"></option>
                <option value="日常"></option>
              </datalist>
            </div>
            <div class="form-field">
              <label>日付</label>
              <input v-model="post.date" type="date" />
            </div>
          </div>
          <div class="form-field">
            <label>サムネイル画像</label>
            <div class="image-upload-group">
              <input v-model="post.thumbnail" placeholder="/blog-thumbnail.png" />
              <label class="upload-btn" :class="{ uploading: uploadingThumbnail }">
                <i class="fas fa-upload"></i>
                {{ uploadingThumbnail ? 'アップロード中...' : '画像選択' }}
                <input type="file" accept="image/*" @change="uploadThumbnail" hidden />
              </label>
            </div>
          </div>
          <div class="form-field">
            <label>抜粋（200文字程度）</label>
            <textarea v-model="post.excerpt" placeholder="記事の要約を入力..." rows="4"></textarea>
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
                <span class="char-count">{{ post.content.length }} 文字</span>
              </div>
            </div>
            <textarea
              v-model="post.content"
              placeholder="Markdownで記事を書く..."
            />
          </div>
          <div class="resizer" @mousedown="startResize"></div>
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
import { doc, getDoc, setDoc, addDoc, collection, Timestamp } from 'firebase/firestore';
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

const post = ref({
  title: '',
  date: new Date().toISOString().split('T')[0],
  category: '',
  excerpt: '',
  thumbnail: '',
  content: ''
});

const htmlPreview = computed(() => {
  if (!post.value.content) return '<p style="color: #999; text-align: center; margin-top: 3rem;">プレビューがここに表示されます</p>';
  try {
    return marked.parse(post.value.content);
  } catch (error) {
    return '<p style="color: red;">Markdownの解析エラー</p>';
  }
});

onMounted(async () => {
  if (isEdit.value) {
    try {
      const docRef = doc(db, 'blogPosts', route.params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        post.value = {
          title: data.title || '',
          date: data.date?.toDate ? data.date.toDate().toISOString().split('T')[0] : data.date || '',
          category: data.category || '',
          excerpt: data.excerpt || '',
          thumbnail: data.thumbnail || '',
          content: data.content || ''
        };
      } else {
        alert('記事が見つかりません');
        router.push('/admin/dashboard');
      }
    } catch (error) {
      console.error('記事読み込みエラー:', error);
      alert('記事の読み込みに失敗しました');
    }
  }
});

const save = async () => {
  if (!post.value.title.trim()) {
    alert('タイトルを入力してください');
    return;
  }
  if (!post.value.content.trim()) {
    alert('本文を入力してください');
    return;
  }
  saving.value = true;
  try {
    const slug = post.value.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').substring(0, 100);
    const postData = {
      title: post.value.title,
      slug: slug,
      date: Timestamp.fromDate(new Date(post.value.date)),
      category: post.value.category || 'その他',
      excerpt: post.value.excerpt,
      thumbnail: post.value.thumbnail || '/D-studyLab_logo.png',
      content: post.value.content,
      updatedAt: Timestamp.now()
    };
    if (isEdit.value) {
      await setDoc(doc(db, 'blogPosts', route.params.id), postData);
      alert('✅ 保存しました！');
    } else {
      postData.createdAt = Timestamp.now();
      const docRef = await addDoc(collection(db, 'blogPosts'), postData);
      alert('✅ 保存しました！');
      router.push(`/admin/blog/edit/${docRef.id}`);
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
    const url = await uploadImage(file, 'blog/thumbnails');
    if (url) post.value.thumbnail = url;
  } catch (error) {
    alert('アップロードに失敗しました');
  } finally {
    uploadingThumbnail.value = false;
  }
};

const uploadContentImage = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  uploadingContent.value = true;
  try {
    const url = await uploadImage(file, 'blog/content');
    if (url) {
      const imageMarkdown = `\n![${file.name}](${url})\n`;
      post.value.content += imageMarkdown;
    }
  } catch (error) {
    alert('アップロードに失敗しました');
  } finally {
    uploadingContent.value = false;
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
/* Using same styles as ActivityEditor for consistency */
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
.save-btn { background: linear-gradient(135deg, #00aaff 0%, #0088cc 100%); color: #fff; border: none; }
.save-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0, 170, 255, 0.4); }
.save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.back-btn { background: rgba(255, 255, 255, 0.1); color: #fff; border: 1px solid rgba(255, 255, 255, 0.2); text-decoration: none; }
.back-btn:hover { background: rgba(255, 255, 255, 0.2); }

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
.tab-nav button:hover { background: #f8f9fa; color: #007bff; }
.tab-nav button.active { color: #007bff; border-bottom-color: #007bff; }

.tab-content { flex: 1; overflow: hidden; position: relative; }
.form-scroll-container, .editor-split-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.editor-split-container { overflow: hidden; }

.form-container { background: #fff; padding: 2rem; }
.form-field { margin-bottom: 1.5rem; }
.form-field label { display: block; font-weight: 600; color: #495057; font-size: 0.95rem; margin-bottom: 0.5rem; }
.form-row { display: flex; gap: 1rem; }
.form-row .form-field { flex: 1; }
.form-field input, .form-field textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
  box-sizing: border-box;
}
.form-field input:focus, .form-field textarea:focus { outline: none; border-color: #00aaff; box-shadow: 0 0 0 3px rgba(0, 170, 255, 0.1); }
.image-upload-group { display: flex; gap: 0.5rem; }
.upload-btn {
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #00aaff 0%, #0088cc 100%);
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
}

.editor-split { display: flex; height: 100%; }
.editor-pane, .preview-pane { display: flex; flex-direction: column; height: 100%; overflow: hidden; }
.pane-header { padding: 1rem 1.5rem; background: #f8f9fa; border-bottom: 1px solid #dee2e6; flex-shrink: 0; display: flex; justify-content: space-between; align-items: center; color: #495057; }
.pane-header h3 { margin: 0; font-size: 1.1rem; }
.editor-pane textarea { flex: 1; padding: 1.5rem; border: none; resize: none; font-family: 'Courier New', monospace; font-size: 15px; }
.preview-content { flex: 1; overflow-y: auto; padding: 2rem; color: #2c3e50; }
.resizer { width: 8px; background: #dee2e6; cursor: col-resize; flex-shrink: 0; }
</style>
