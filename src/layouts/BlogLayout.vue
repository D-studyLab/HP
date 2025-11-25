<template>
  <div class="blog-layout">
    <header class="blog-header">
      <router-link to="/" class="home-link">
        <strong>D-study Lab</strong>
      </router-link>
      <nav class="blog-nav">
        <router-link to="/blog">ブログトップ</router-link>
      </nav>
    </header>
    <div class="blog-container">
      <main class="blog-main-content">
        <router-view />
      </main>
      <aside class="blog-sidebar">
        <div class="sidebar-widget profile-widget">
          <img :src="author.photo" :alt="author.name" class="profile-img" />
          <h3 class="profile-name">
            {{ author.name }}
            <span class="profile-furigana">({{ author.furigana }})</span>
          </h3>
          <p class="profile-title">{{ author.title }}</p>
          <p class="profile-bio">{{ author.profile.passion }}</p>
        </div>
        <div class="sidebar-widget sns-widget">
          <h3 class="widget-title">Follow Me</h3>
          <div class="sns-links">
            <a href="https://x.com/info_prog_study" target="_blank" class="sns-link"><i class="fab fa-x-twitter"></i> X</a>
            <a href="https://www.instagram.com/info_prog_study/" target="_blank" class="sns-link"><i class="fab fa-instagram"></i> Instagram</a>
            <a href="https://www.youtube.com/@info-prog-study" target="_blank" class="sns-link"><i class="fab fa-youtube"></i> YouTube</a>
            <a href="https://github.com/D-studyLab" target="_blank" class="sns-link"><i class="fab fa-github"></i> GitHub</a>
          </div>
        </div>
        <div class="sidebar-widget ad-widget" ref="adWidgetRef">
          <h3 class="widget-title">Advertisement</h3>
          <div class="ad-placeholder">
            <!-- blog_sidebar -->
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-9384193584221337"
                 data-ad-slot="4310079707"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div>
        </div>
      </aside>
    </div>
    <footer class="blog-footer">
      <p>&copy; 2025 D-study Lab. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, nextTick, ref } from 'vue';
import { lecturers } from '@/data/lecturers.js';
// 講師が複数いる場合も想定し、最初の講師を著者とする
const author = lecturers[0];
const adWidgetRef = ref(null);

onMounted(() => {
  nextTick(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense push error: ', e);
    }
  });

  // 3秒後に広告が表示されているかチェック
  setTimeout(() => {
    if (adWidgetRef.value) {
      const adElement = adWidgetRef.value.querySelector('.adsbygoogle');
      if (adElement && adElement.clientHeight < 1) {
        adWidgetRef.value.style.display = 'none';
      }
    }
  }, 3000);
});
</script>

<style>
/* Remove App.vue's global styles on blog pages */
html.blog-active,
body.blog-active {
  height: auto;
  overflow: auto;
}

body.blog-active {
  background: #fff;
  color: #333;
}
</style>

<style scoped>
.blog-layout {
  background-color: #f8f9fa;
  color: #212529;
  font-family: 'Noto Sans JP', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  min-height: 100vh;
}

.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #dee2e6;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
}

.home-link {
  text-decoration: none;
  color: #212529;
  font-size: 1.2rem;
  font-weight: 700;
}

.blog-nav a {
  text-decoration: none;
  color: #495057;
  margin-left: 1.5rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.blog-nav a:hover {
  color: #d9534f;
}

.blog-container {
  display: flex;
  max-width: 1280px;
  margin: 2rem auto;
  padding: 0 2rem;
  gap: 2rem;
}

.blog-main-content {
  flex: 1;
  min-width: 0;
}

.blog-sidebar {
  width: 300px;
  flex-shrink: 0;
}

.sidebar-widget {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.widget-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

/* Profile Widget */
.profile-widget {
  text-align: center;
}
.profile-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 4px solid #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
.profile-name {
  font-size: 1.3rem;
  margin: 0;
  line-height: 1.4;
}
.profile-furigana {
  display: block;
  font-size: 0.9rem;
  font-weight: normal;
  color: #6c757d;
  margin-top: 0.25rem;
}
.profile-title {
  font-size: 0.9rem;
  color: #6c757d;
  margin-top: 0.25rem;
}
.profile-bio {
  font-size: 0.95rem;
  color: #495057;
  margin-top: 1rem;
  line-height: 1.6;
}

/* SNS Widget */
.sns-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.sns-link {
  color: #495057;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
}
.sns-link:hover {
  color: #d9534f;
}
.sns-link i {
  margin-right: 0.75rem;
  width: 20px;
  text-align: center;
}

/* Ad Widget */
.ad-placeholder {
  background: #f0f0f0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  color: #aaa;
}

.blog-footer {
  text-align: center;
  padding: 3rem 2rem;
  background-color: #e9ecef;
  border-top: 1px solid #dee2e6;
  color: #6c757d;
  font-size: 0.9rem;
}

@media (max-width: 992px) {
  .blog-container {
    flex-direction: column;
  }
  .blog-sidebar {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .blog-header {
    padding: 1rem;
  }
  .blog-container {
    margin: 1rem auto;
    padding: 0 1rem;
  }
}
</style>
