<template>
  <!-- ============== PC レイアウト ============== -->
  <div v-if="!isMobile" class="pc">
    <!-- SNS レール -->
    <aside class="rail">
      <a href="https://x.com/info_prog_study" target="_blank"><i class="fab fa-x-twitter"></i></a>
      <a href="https://www.instagram.com/info_prog_study/" target="_blank"
        ><i class="fab fa-instagram"></i
      ></a>
      <a href="https://www.tiktok.com/@info_prog" target="_blank"><i class="fab fa-tiktok"></i></a>
      <a href="https://www.youtube.com/@info-prog-study" target="_blank"
        ><i class="fab fa-youtube"></i
      ></a>
      <a href="https://lin.ee/tI30Hlk" target="_blank"><i class="fab fa-line"></i></a>
    </aside>

    <!-- サイドナビ -->
    <nav class="sidenav">
      <div class="logo-container" @click="goto('/')">
        <img :src="logo" class="logo-img" alt="logo" />
        <h2 class="logo-title">D-StudyLab</h2>
      </div>

      <ul class="nav-list">
        <li><button @click="goto('/#top')">Top</button></li>
        <li><button @click="goto('/#about')">About</button></li>
        <li><button @click="goto('/#services')">Services</button></li>
        <li><button @click="goto('/#events')">News</button></li>
        <li><button @click="goto('/#contact')">Contact</button></li>
      </ul>
    </nav>

    <!-- LP 本体 (スクロール領域) -->
    <main class="content">
      <router-view :mobile="false" />
    </main>
  </div>

  <!-- ============== モバイル レイアウト ============== -->
  <div v-else class="sp">
    <!-- ヘッダー（文書フロー内。スクロールしたら一緒に流れる） -->
    <header class="sp-header">
      <div class="logo-container" @click="goto('/')">
        <img :src="logo" class="sp-logo" alt="logo" />
        <h2 class="logo-title">D-StudyLab</h2>
      </div>
      <button class="hamburger" @click="drawer = true"><i class="fas fa-bars"></i></button>
    </header>

    <!-- ドロワー -->
    <transition name="slide">
      <aside v-if="drawer" class="drawer" @click.self="drawer = false">
        <div class="drawer-panel">
          <button class="close" @click="drawer = false"><i class="fas fa-times"></i></button>

          <div class="drawer-sns">
            <a href="https://x.com/info_prog_study"><i class="fab fa-x-twitter"></i></a>
            <a href="https://www.instagram.com/info_prog_study/"
              ><i class="fab fa-instagram"></i
            ></a>
            <a href="https://www.tiktok.com/@info_prog"><i class="fab fa-tiktok"></i></a>
            <a href="https://www.youtube.com/@info-prog-study"><i class="fab fa-youtube"></i></a>
            <a href="https://lin.ee/tI30Hlk"><i class="fab fa-line"></i></a>
          </div>

          <nav class="drawer-nav">
            <ul>
              <li><button @click="goto('/#top')">Top</button></li>
              <li><button @click="goto('/#about')">About</button></li>
              <li><button @click="goto('/#services')">Services</button></li>
              <li><button @click="goto('/#events')">News</button></li>
              <li><button @click="goto('/#contact')">Contact</button></li>
            </ul>
          </nav>
        </div>
      </aside>
    </transition>

    <!-- LP 本体 (スクロール領域) -->
    <main class="content">
      <router-view :mobile="true" />
    </main>
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import logo from './assets/D-studyLab_logo.png'

  const isMobile = ref(window.innerWidth < 768)
  const drawer = ref(false)
  const router = useRouter()
  const route = useRoute()

  function onResize() {
    isMobile.value = window.innerWidth < 768
    if (!isMobile.value) drawer.value = false
  }
  onMounted(() => window.addEventListener('resize', onResize))
  onBeforeUnmount(() => window.removeEventListener('resize', onResize))

  async function goto(path) {
    drawer.value = false
    await router.push(path)

    if (path.includes('#')) {
      const hash = path.substring(path.indexOf('#'))
      await new Promise(resolve => setTimeout(resolve, 50));
      const target = document.querySelector(hash)
      const container = document.querySelector('.content')
      if (container && target) {
        container.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth'
        })
      }
    }
  }
</script>

<style>
  :root {
    --bg-color: #0a0a1a;
    --primary-color: #00aaff;
    --glass-bg: rgba(255, 255, 255, 0.05);
    --glass-border: rgba(255, 255, 255, 0.2);
    --text-color: #e0e0e0;
    --title-color: #ffffff;
    --sp-header-h: 64px;
  }

  html,
  body {
    height: 100vh;
    margin: 0;
    overflow: hidden; /* ページ全体のスクロールを禁止 */
    background: var(--bg-color);
    font-family: 'Noto Sans JP', sans-serif;
    color: var(--text-color);
  }
  button {
    border: none;
    background: none;
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
</style>

<style scoped>
  /* ---------- PC ---------- */
  .pc {
    display: grid;
    grid-template-columns: 70px 220px 1fr;
    height: 100vh; /* 高さを100vhに固定 */
  }
  .pc .rail, .pc .sidenav {
    position: sticky;
    top: 0;
    height: 100vh;
  }
  .pc .rail {
    background: #000;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.2rem;
  }
  .pc .rail i {
    font-size: 1.4rem;
  }
  .pc .sidenav {
    background: #111;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.6rem;
  }
  .logo-container {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
  .pc .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  .logo-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }
  .logo-title {
    margin: 0; /* Reset margin as gap handles spacing */
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--title-color); /* PC版のタイトル色 */
  }
  .pc .logo-title {
    margin-top: 0; /* PC版ではgapで調整するためmargin-topをリセット */
  }
  .sp-header .logo-title {
    color: var(--bg-color); /* スマホ版のタイトル色 */
  }
  .nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  .nav-list button {
    color: #fff;
    font-size: 1.05rem;
    text-align: left;
    transition:
      color 0.25s,
      transform 0.25s;
  }
  .nav-list button:hover {
    color: #00b79d;
    transform: translateX(6px);
  }

  /* ---------- SP：ヘッダー + LP を縦 flex で並べる ---------- */
  .sp {
    display: flex;
    flex-direction: column;
    height: 100vh; /* 高さを100vhに固定 */
  }
  .sp-header {
    height: var(--sp-header-h);
    flex-shrink: 0; /* ヘッダーが縮まないようにする */
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    background: #ffffffee;
    backdrop-filter: blur(6px);
    z-index: 10;
  }
  .sp-logo {
    height: calc(var(--sp-header-h) - 22px);
    border-radius: 50%; /* スマホ版ロゴを円形に */
    object-fit: cover; /* スマホ版ロゴを円形に */
  }
  .hamburger {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: transparent;
    color: var(--primary-color);
    font-size: 1.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 0 10px rgba(0, 170, 255, 0.5);
  }
  .hamburger:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px var(--primary-color);
  }

  /* ---------- スクロール領域 ---------- */
  .content {
    overflow-y: auto; /* この領域だけ縦スクロールを許可 */
    height: 100%;
  }

  /* ---------- ドロワー ---------- */
  .slide-enter-from, .slide-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  .drawer {
    position: fixed;
    inset: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.8); /* より深い背景色 */
    display: flex;
    justify-content: flex-end;
    backdrop-filter: blur(5px);
  }
  .drawer-panel {
    width: 80%;
    max-width: 320px;
    height: 100%;
    background: rgba(255, 255, 255, 0.08); /* グラスモーフィズム */
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px 0 0 16px; /* 角を丸く */
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem 1rem 2rem 1rem; /* Increased top padding */
    gap: 2rem;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: -8px 0 30px rgba(0, 0, 0, 0.4), inset 2px 0 15px rgba(0, 170, 255, 0.2);
  }
  .close {
    position: absolute;
    top: 20px; /* Adjusted top */
    right: 15px;
    font-size: 1.8rem;
    color: var(--primary-color);
    transition: all 0.3s ease;
  }
  .close:hover {
    transform: rotate(90deg) scale(1.1);
    text-shadow: 0 0 15px var(--primary-color);
  }
  .drawer-sns {
    display: flex;
    gap: 1.8rem;
    margin-bottom: 2.5rem; /* Increased margin-bottom */
  }
  .drawer-sns i {
    font-size: 2rem;
    color: var(--text-color);
    transition: all 0.3s ease;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
  }
  .drawer-sns i:hover {
    color: var(--primary-color);
    transform: translateY(-5px) scale(1.1);
    text-shadow: 0 0 20px var(--primary-color);
  }
  .drawer-nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    width: 100%;
  }
  .drawer-nav button {
    font-size: 1.3rem;
    text-align: center;
    color: var(--text-color);
    padding: 0.8rem 1.5rem; /* Added horizontal padding */
    width: 100%; /* Set to 100% */
    box-sizing: border-box; /* Added box-sizing */
    border-radius: 8px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .drawer-nav button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 170, 255, 0.1), transparent);
    transition: all 0.4s ease;
  }
  .drawer-nav button:hover {
    color: var(--primary-color);
    text-shadow: 0 0 10px var(--primary-color);
    transform: translateX(5px);
  }
  .drawer-nav button:hover::before {
    left: 100%;
  }
</style>