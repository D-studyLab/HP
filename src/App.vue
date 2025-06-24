<template>
  <!-- ========================= PC レイアウト ========================= -->
  <div v-if="!isMobile" class="pc">
    <!-- 左レール（SNS） -->
    <aside class="rail">
      <a href="https://x.com/info_prog_study"        target="_blank"><i class="fab fa-x-twitter"></i></a>
      <a href="https://www.instagram.com/info_prog_study/"target="_blank"><i class="fab fa-instagram"></i></a>
      <a href="https://www.tiktok.com/@info_prog"   target="_blank"><i class="fab fa-tiktok"></i></a>
      <a href="https://www.youtube.com/@info-prog-study"  target="_blank"><i class="fab fa-youtube"></i></a>
      <a href="https://lin.ee/tI30Hlk"      target="_blank"><i class="fab fa-line"></i></a>
    </aside>

    <!-- サイドナビ -->
    <nav class="sidenav">
      <img :src="logo" class="logo-img" alt="D-StudyLab ロゴ">
      <h2 class="logo-title">D-StudyLab</h2>

      <ul class="nav-list">
        <li><button @click="goto('#top')">Top</button></li>
        <li><button @click="goto('#about')">About</button></li>
        <li><button @click="goto('#services')">Services</button></li>
        <li><button @click="goto('#contact')">Contact</button></li>
      </ul>
    </nav>

    <!-- LP 本体（中央のみスクロール） -->
    <main class="main-scroll">
      <!-- ※以下はダミー／省略しても OK。必要なセクションを追加してください -->
      <section id="top" class="hero">
        <h1>D-Study Lab</h1>
        <p>
          私たち D-Study Lab は、あなたが「学びたい」を形にするための会社です。<br>
          中高生向けの<strong>情報＆プログラミング専門塾</strong>を基盤に、<br>
          地域の教育格差解消や、社会人のリスキリング支援など、<br>幅広い「学びの場」を提供します。
        </p>
      </section>

      <section id="mission">
        <h2>社会貢献ビジョン</h2>
        <ul>
          <li>岩手県内の学生に最新の IT 教育を届ける</li>
          <li>地域の DX 人材を育成し、中小企業の IT 化を後押し</li>
          <li>誰もが自分のペースで学べるオンラインコンテンツの充実</li>
        </ul>
      </section>

      <section id="services">
        <h2>サービス</h2>
        <ul>
          <li><a href="/service/info-prog">情報＆プログラミング専門塾</a></li>
          <li><a href="/service/chillsta">ちるスタ</a></li>
          <li><a href="/service/gandai-foody">岩大 FOODY</a></li>
        </ul>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>お問い合わせは LINE 公式またはフォームからお願いします。</p>
      </section>
    </main>
  </div>

  <!-- ========================= モバイル レイアウト ========================= -->
  <div v-else class="sp">
    <button class="hamburger" @click="drawer = true"><i class="fas fa-bars"></i></button>

    <transition name="fade">
      <div v-if="drawer" class="drawer" @click.self="drawer = false">
        <button class="close" @click="drawer = false"><i class="fas fa-times"></i></button>

        <div class="drawer-inner">
          <!-- SNS -->
          <div class="rail">
            <a href="https://x.com"><i class="fab fa-x-twitter"></i></a>
            <a href="https://www.instagram.com/info_prog_study/"><i class="fab fa-instagram"></i></a>
            <a href="https://line.me"><i class="fab fa-line"></i></a>
          </div>
          <!-- ナビ -->
          <nav class="drawer-nav">
            <ul>
              <li><button @click="goto('#top')">Top</button></li>
              <li><button @click="goto('#about')">About</button></li>
              <li><button @click="goto('#services')">Services</button></li>
              <li><button @click="goto('#contact')">Contact</button></li>
            </ul>
          </nav>
        </div>
      </div>
    </transition>

    <main class="main-scroll">
      <!-- ※モバイル LP をここに配置（省略） -->
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import logo from './assets/D-studyLab_logo.png'   // ロゴのパスを調整

/* 画面幅 768px 未満をモバイル扱い */
const isMobile = ref(window.innerWidth < 768)
const drawer   = ref(false)

function handleResize(){
  isMobile.value = window.innerWidth < 768
  if(!isMobile.value) drawer.value = false
}
onMounted(()   => window.addEventListener('resize', handleResize))
onBeforeUnmount(() => window.removeEventListener('resize', handleResize))

function goto(anchor){
  drawer.value = false
  document.querySelector(anchor)?.scrollIntoView({behavior:'smooth'})
}
</script>

<style>
/* ===== 共通リセット ===== */
html,body{height:100vh;margin:0;overflow:hidden;background:#f9f9f9;font-family:"Noto Sans JP",sans-serif;}
button{cursor:pointer;border:none;background:none}
</style>

<style scoped>
/* =========================================================
   PC レイアウト
   ========================================================= */
.pc{
  display:grid;
  grid-template-columns:70px 220px 1fr;
  height:100%;
}

/* 左 SNS レール */
.pc .rail{
  position:sticky;top:0;height:100vh;
  background:#000;color:#fff;
  display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1.2rem;
}
.pc .rail i{font-size:1.4rem;color:#fff}

/* サイドナビ */
.pc .sidenav{
  position:sticky;top:0;height:100vh;
  background:#111;color:#fff;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.6rem;
}
.logo-img{width:80px;height:80px;object-fit:contain}
.logo-title{margin:0;font-size:1.4rem;font-weight:700}
.nav-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:1.2rem}
.nav-list button{
  color:#fff;font-size:1.05rem;text-align:left;
  transition:color .25s,transform .25s
}
.nav-list button:hover{color:#00b79d;transform:translateX(6px)}

/* 中央 LP 域：この要素だけ縦スクロール */
.pc .main-scroll{
  height:100vh;overflow-y:auto;min-width:0;
  padding:2rem 2rem 4rem;background:#fff;
}

/* =========================================================
   モバイル
   ========================================================= */
.sp .hamburger{
  position:fixed;top:8px;right:8px;z-index:1000;
  width:44px;height:44px;border-radius:6px;background:#000;color:#fff;font-size:1.25rem;
}
.fade-enter-active,.fade-leave-active{transition:opacity .2s}
.fade-enter-from,.fade-leave-to{opacity:0}

.drawer{
  position:fixed;inset:0;z-index:999;background:rgba(0,0,0,.6);
  display:flex;justify-content:center;align-items:flex-start;padding-top:4rem;
}
.drawer-inner{
  background:#fff;border-radius:12px;width:90%;max-width:320px;
  padding:1.5rem 1rem;display:flex;flex-direction:column;align-items:center;gap:1.5rem;
}
.close{position:absolute;top:12px;right:12px;font-size:1.25rem}
.drawer-inner .rail{display:flex;gap:1rem}
.drawer-inner .rail i{font-size:1.4rem}
.drawer-nav ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:1rem}
.drawer-nav button{font-size:1rem;text-align:left}
.sp .main-scroll{min-height:100vh;overflow-y:auto;padding:2rem 1rem 4rem;background:#fff}

/* ===== セクション間隔例（LP） ===== */
section+section{margin-top:3rem}
.hero h1{font-size:2.4rem;margin:0 0 1rem}
</style scoped>
