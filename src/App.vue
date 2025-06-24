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
      <img :src="logo" class="logo-img" alt="logo" />
      <h2 class="logo-title">D-StudyLab</h2>

      <ul class="nav-list">
        <li><button @click="goto('#top')">Top</button></li>
        <li><button @click="goto('#about')">About</button></li>
        <li><button @click="goto('#services')">Services</button></li>
        <li><button @click="goto('#contact')">Contact</button></li>
      </ul>
    </nav>

    <!-- LP 本体 -->
    <Lp :mobile="false" />
  </div>

  <!-- ============== モバイル レイアウト ============== -->
  <div v-else class="sp">
    <!-- ヘッダー（文書フロー内。スクロールしたら一緒に流れる） -->
    <header class="sp-header">
      <img :src="logo" class="sp-logo" alt="logo" />
      <h2 class="logo-title">D-StudyLab</h2>
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
              <li><button @click="goto('#top')">Top</button></li>
              <li><button @click="goto('#about')">About</button></li>
              <li><button @click="goto('#services')">Services</button></li>
              <li><button @click="goto('#contact')">Contact</button></li>
            </ul>
          </nav>
        </div>
      </aside>
    </transition>

    <!-- LP 本体 -->
    <Lp :mobile="true" />
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import Lp from './views/LP.vue'
  import logo from './assets/D-studyLab_logo.png'

  const isMobile = ref(window.innerWidth < 768)
  const drawer = ref(false)

  function onResize() {
    isMobile.value = window.innerWidth < 768
    if (!isMobile.value) drawer.value = false
  }
  onMounted(() => window.addEventListener('resize', onResize))
  onBeforeUnmount(() => window.removeEventListener('resize', onResize))

  function goto(hash) {
    drawer.value = false
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
  }
</script>

<style>
  html,
  body {
    height: 100vh;
    margin: 0;
    overflow: hidden;
    background: #f9f9f9;
    font-family: 'Noto Sans JP', sans-serif;
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

  :root {
    --sp-header-h: 64px;
  } /* モバイルヘッダー高さ */
</style>

<style scoped>
  /* ---------- PC ---------- */
  .pc {
    display: grid;
    grid-template-columns: 70px 220px 1fr;
    height: 100%;
  }
  .pc .rail {
    position: sticky;
    top: 0;
    height: 100vh;
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
    position: sticky;
    top: 0;
    height: 100vh;
    background: #111;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.6rem;
  }
  .logo-img {
    width: 80px;
    height: 80px;
  }
  .logo-title {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 700;
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
    height: 100vh;
    overflow: hidden;
  }
  .sp-header {
    height: var(--sp-header-h);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    background: #ffffffee;
    backdrop-filter: blur(6px);
  }
  .sp-logo {
    height: calc(var(--sp-header-h) - 22px);
  }
  .hamburger {
    width: 44px;
    height: 44px;
    border-radius: 6px;
    background: #000;
    color: #fff;
    font-size: 1.25rem;
  }

  /* ドロワ周りはそのまま */
  .slide-enter-from {
    transform: translateX(100%);
    opacity: 0;
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.25s ease;
  }
  .slide-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }

  .drawer {
    position: fixed;
    inset: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    justify-content: flex-end;
  }
  .drawer-panel {
    width: 80%;
    max-width: 300px;
    height: 100%;
    background: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem;
    gap: 1.5rem;
  }
  .close {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 1.25rem;
  }
  .drawer-sns {
    display: flex;
    gap: 1.2rem;
  }
  .drawer-sns i {
    font-size: 1.4rem;
  }
  .drawer-nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    align-items: center;
  }
  .drawer-nav button {
    font-size: 1.1rem;
    text-align: left;
  }
</style>
