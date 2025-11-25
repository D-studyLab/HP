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

    <!-- メタデータ入力 -->
    <div class="metadata">
      <div class="meta-row">
        <div class="meta-field">
          <label>タイトル *</label>
          <input v-model="post.title" placeholder="記事タイトル" required />
        </div>
        <div class="meta-field meta-field-small">
          <label>日付</label>
          <input v-model="post.date" type="date" />
        </div>
      </div>

      <div class="meta-row">
        <div class="meta-field">
          <label>カテゴリ</label>
          <input v-model="post.category" placeholder="AI, その他など" list="categories" />
          <datalist id="categories">
            <option value="AI"></option>
            <option value="その他"></option>
            <option value="技術"></option>
            <option value="日常"></option>
          </datalist>
        </div>
        <div class="meta-field">
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
      </div>

      <div class="meta-field">
        <label>抜粋（200文字程度）</label>
        <textarea v-model="post.excerpt" placeholder="記事の要約を入力..." rows="2"></textarea>
      </div>
    </div>

    <!-- エディタ部分（可変幅） -->
    <div class="editor-split" ref="splitContainer">
      <div class="editor-pane" ref="editorPane" :style="{ width: editorWidth + '%' }">
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
          placeholder="Markdownで記事を書く...

# 見出し1
## 見出し2
### 見出し3

**太字** *斜体* `コード`

- リスト1
- リスト2

```javascript
// コードブロック
console.log('Hello');
```

[リンク](https://example.com)

![画像](/image.png)"
          @input="onContentChange"
          @keydown.tab.prevent="insertTab"
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

const post = ref({
  title: '',
  date: new Date().toISOString().split('T')[0],
  category: '',
  excerpt: '',
  thumbnail: '',
  content: ''
});

const editorWidth = ref(50); // エディタの幅（%）

// プレビュー
const htmlPreview = computed(() => {
  if (!post.value.content) return '<p style="color: #999; text-align: center; margin-top: 3rem;">プレビューがここに表示されます</p>';

  try {
    return marked.parse(post.value.content);
  } catch (error) {
    return '<p style="color: red;">Markdownの解析エラー</p>';
  }
});

// 既存記事の読み込み
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

// 保存
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
    const slug = post.value.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 100);

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
      // 更新
      await setDoc(doc(db, 'blogPosts', route.params.id), postData);
      alert('✅ 保存しました！');
    } else {
      // 新規作成
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

// 画像アップロード（サムネイル）
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
    const fileName = `blog/thumbnails/${timestamp}-${file.name}`;
    const imageRef = storageRef(storage, fileName);

    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);

    post.value.thumbnail = url;
    alert('サムネイル画像をアップロードしました！');
  } catch (error) {
    console.error('Upload error:', error);
    alert('アップロードに失敗しました: ' + error.message);
  } finally {
    uploadingThumbnail.value = false;
    e.target.value = '';
  }
};

// 画像アップロード（記事内）
const uploadContentImage = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // ファイルサイズチェック（5MB以下）
  if (file.size > 5 * 1024 * 1024) {
    alert('ファイルサイズは5MB以下にしてください');
    return;
  }

  uploadingContent.value = true;

  try {
    const timestamp = Date.now();
    const fileName = `blog/content/${timestamp}-${file.name}`;
    const imageRef = storageRef(storage, fileName);

    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);

    // Markdown形式で画像を挿入
    const imageMarkdown = `\n![${file.name}](${url})\n`;
    post.value.content += imageMarkdown;

    alert('画像をアップロードしました！Markdownに挿入されました。');
  } catch (error) {
    console.error('Upload error:', error);
    alert('アップロードに失敗しました: ' + error.message);
  } finally {
    uploadingContent.value = false;
    e.target.value = '';
  }
};

// タブ挿入
const insertTab = (e) => {
  const textarea = e.target;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  post.value.content = post.value.content.substring(0, start) + '  ' + post.value.content.substring(end);

  // カーソル位置を調整
  setTimeout(() => {
    textarea.selectionStart = textarea.selectionEnd = start + 2;
  }, 0);
};

// リサイズ機能
const splitContainer = ref(null);
const editorPane = ref(null);
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

  if (newWidth > 20 && newWidth < 80) {
    editorWidth.value = newWidth;
  }
};

const stopResize = () => {
  isResizing = false;
  document.removeEventListener('mousemove', resize);
  document.removeEventListener('mouseup', stopResize);
  document.body.style.cursor = '';
  document.body.style.userSelect = '';
};

const onContentChange = () => {
  // 自動保存などの機能をここに追加できます
};
</script>

<style scoped>
.editor-container {
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #2a2a3e 100%);
  color: #fff;
  border-bottom: 3px solid #00aaff;
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

.metadata {
  padding: 1.5rem 2rem;
  background: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}

.meta-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.meta-row:last-child {
  margin-bottom: 0;
}

.meta-field {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.meta-field-small {
  flex: 0 0 200px;
}

.meta-field label {
  font-weight: 600;
  color: #495057;
  font-size: 0.9rem;
}

.meta-field input,
.meta-field textarea {
  padding: 0.75rem;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

.meta-field input:focus,
.meta-field textarea:focus {
  outline: none;
  border-color: #00aaff;
  box-shadow: 0 0 0 3px rgba(0, 170, 255, 0.1);
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

.editor-split {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
}

.editor-pane {
  display: flex;
  flex-direction: column;
  border-right: 1px solid #dee2e6;
  background: #fff;
  min-width: 20%;
}

.preview-pane {
  display: flex;
  flex-direction: column;
  background: #fff;
  min-width: 20%;
}

.pane-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.pane-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #495057;
}

.header-actions-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.insert-image-btn {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #28a745 0%, #20894a 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.insert-image-btn:hover:not(.uploading) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
}

.insert-image-btn.uploading {
  opacity: 0.6;
  cursor: not-allowed;
}

.char-count {
  font-size: 0.85rem;
  color: #6c757d;
}

.editor-pane textarea {
  flex: 1;
  padding: 1.5rem;
  border: none;
  resize: none;
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: 15px;
  line-height: 1.8;
  color: #2c3e50;
  background: #fff;
}

.editor-pane textarea:focus {
  outline: none;
}

.editor-pane textarea::placeholder {
  color: #adb5bd;
}

.resizer {
  width: 8px;
  background: #dee2e6;
  cursor: col-resize;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.resizer:hover {
  background: #00aaff;
}

.resizer-handle {
  width: 3px;
  height: 40px;
  background: #fff;
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.resizer:hover .resizer-handle {
  opacity: 1;
}

.preview-content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  background: #fff;
}

/* Markdown Preview Styles */
.preview-content :deep(h1) {
  font-size: 2.2rem;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 0.5rem;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  color: #1a1a2e;
}

.preview-content :deep(h2) {
  font-size: 1.8rem;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.5rem;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.preview-content :deep(h3) {
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #34495e;
}

.preview-content :deep(p) {
  line-height: 1.9;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.preview-content :deep(a) {
  color: #00aaff;
  text-decoration: none;
  border-bottom: 1px solid #00aaff;
}

.preview-content :deep(a:hover) {
  background: rgba(0, 170, 255, 0.1);
}

.preview-content :deep(code) {
  font-family: 'Courier New', 'Consolas', monospace;
  background-color: #f5f5f5;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-size: 0.9em;
  color: #e83e8c;
}

.preview-content :deep(pre) {
  background-color: #2d2d2d;
  color: #f8f8f2;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.preview-content :deep(pre code) {
  background: none;
  color: inherit;
  padding: 0;
}

.preview-content :deep(blockquote) {
  border-left: 4px solid #00aaff;
  padding-left: 1.5rem;
  margin: 1.5rem 0;
  color: #6c757d;
  font-style: italic;
}

.preview-content :deep(ul), .preview-content :deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

.preview-content :deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.8;
}

.preview-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.preview-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.preview-content :deep(th),
.preview-content :deep(td) {
  border: 1px solid #dee2e6;
  padding: 0.75rem;
  text-align: left;
}

.preview-content :deep(th) {
  background: #f8f9fa;
  font-weight: 600;
}

@media (max-width: 768px) {
  .editor-split {
    flex-direction: column;
  }

  .editor-pane,
  .preview-pane {
    width: 100% !important;
  }

  .resizer {
    display: none;
  }

  .meta-row {
    flex-direction: column;
  }

  .meta-field-small {
    flex: 1;
  }
}
</style>
