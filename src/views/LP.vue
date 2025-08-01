<template>
  <div class="lp-container">
    <!-- 1. ファーストビュー -->
    <header id="top" ref="heroSection" class="hero-section fade-in-section">
      <div class="aurora-background"></div>
      <div class="hero-content">
        <h1 class="main-catchphrase">
          社会のルールが<span class="highlight">『デジタル』</span>に変わった。<br />
          岩手から、未来を創る挑戦者へ。
        </h1>
        <p class="sub-catchphrase">
          D-study Labは、AI時代を生き抜くための「基礎教養としてのITリテラシー」を、<br />
          学生から社会人まで、すべての世代に届けます。
        </p>
        <a href="https://lin.ee/tI30Hlk" class="cta-button" target="_blank">
          <span>まずはLINEで無料相談・体験授業を申し込む</span>
        </a>
      </div>
    </header>

    <!-- 2. 課題提起 -->
    <section id="about" ref="problemSection" class="problem-section fade-in-section">
      <h2 class="section-title">こんなお悩み、ありませんか？</h2>
      <div class="problem-cards">
        <div class="problem-card">
          <h3>情報Ⅰ対策をしたい高校生</h3>
          <p>「共通テストに『情報』が追加されたけど、何から手をつければいいか分からない…」</p>
        </div>
        <div class="problem-card">
          <h3>プログラミングに挑戦したい方</h3>
          <p>「アプリを作ってみたいけど、独学では挫折しそう。誰かに相談できる環境がほしい…」</p>
        </div>
        <div class="problem-card">
          <h3>DXを学びたい社会人</h3>
          <p>「仕事でAIやITツールが必須に。でも、今さら誰に聞けばいいのか…」</p>
        </div>
      </div>
    </section>

    <!-- 3. 解決策・提供価値 -->
    <section ref="solutionSection" class="solution-section fade-in-section">
      <h2 class="section-title">
        その悩み、D-study Labが解決します！<br />
        <span class="section-subtitle">私たちが選ばれる3つの理由</span>
      </h2>
      <div class="feature-cards">
        <div class="feature-card">
          <div class="feature-icon"><i class="fas fa-bullseye"></i></div>
          <h3>ゴールから逆算する学び</h3>
          <p>「共通テスト合格」「自作アプリ公開」など、明確なゴールを設定。最短ルートで“できた！”を形にします。</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon"><i class="fas fa-hands-helping"></i></div>
          <h3>挫折させない伴走サポート</h3>
          <p>少人数・メンター制で、あなたの挑戦と失敗を徹底的に歓迎。安心して学べる“安全な実験場”です。</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon"><i class="fas fa-rocket"></i></div>
          <h3>最新技術で実践的に学ぶ</h3>
          <p>生成AIやクラウドツールを使いこなし、論理的思考力と創造力を鍛え、本当に“使える”スキルを育てます。</p>
        </div>
      </div>
    </section>

    <!-- 講師紹介 -->
    <section id="lecturers" ref="lecturersSection" class="lecturers-section fade-in-section">
      <h2 class="section-title">講師紹介</h2>
      <div class="lecturer-cards">
        <LecturerCard
          v-for="lecturer in lecturers"
          :key="lecturer.id"
          :lecturer="lecturer"
        />
      </div>
    </section>

    <!-- 4. コース紹介 -->
    <section id="services" ref="coursesSection" class="courses-section fade-in-section">
      <h2 class="section-title">コース一覧</h2>
      <p class="section-description">入会金・施設利用料はいつでも0円。あなたの目的に合わせて選べます。</p>

      <div v-for="category in courseCategories" :key="category.name" class="course-category">
        <h3>{{ category.name }}</h3>
        <div class="course-cards">
          <CourseCard
            v-for="course in category.courses"
            :key="course.id"
            :course="course"
            @course-click="openModal"
          />
        </div>
      </div>
    </section>

    <CourseModal :show="isModalVisible" :course="selectedCourse" @close="closeModal" />

    <!-- 5. 受講の流れ -->
    <section id="flow" ref="flowSection" class="flow-section fade-in-section">
      <h2 class="section-title">受講までの簡単4ステップ</h2>
      <ol class="flow-steps">
        <li class="flow-step">
          <div class="step-number"><span class="step-icon"><i class="fab fa-line"></i></span><span class="step-digit">1</span></div>
          <p>LINE公式アカウントを<br />友だち追加</p>
        </li>
        <li class="flow-step">
          <div class="step-number"><span class="step-icon"><i class="fas fa-calendar-check"></i></span><span class="step-digit">2</span></div>
          <p>トーク画面から<br />無料相談・体験を予約</p>
        </li>
        <li class="flow-step">
          <div class="step-number"><span class="step-icon"><i class="fas fa-video"></i></span><span class="step-digit">3</span></div>
          <p>オンライン面談で<br />目標や課題をヒアリング</p>
        </li>
        <li class="flow-step">
          <div class="step-number"><span class="step-icon"><i class="fas fa-graduation-cap"></i></span><span class="step-digit">4</span></div>
          <p>最適なコースで<br />学習スタート！</p>
        </li>
      </ol>
    </section>

    <!-- News & Events Section -->
    <section id="events" ref="eventsSection" class="events-section fade-in-section">
      <h2 class="section-title">News & Events</h2>
      <div v-if="events.length > 0" class="swiper-container">
        <swiper
          :slides-per-view="'auto'"
          :space-between="30"
          :centered-slides="true"
          :loop="events.length > 1"
          :modules="[Pagination]"
          :pagination="{ el: '.swiper-pagination-custom', clickable: true }"
        >
          <swiper-slide v-for="event in events" :key="event.id">
            <EventCard :event="event" />
          </swiper-slide>
        </swiper>
        <div class="swiper-pagination-custom"></div> <!-- カスタムページネーション要素 -->
      </div>
      <div v-else class="no-events">
        <p>現在、新しいイベントはありません。しばらくお待ちください。</p>
      </div>
    </section>

    <!-- 6. クロージング -->
    <section id="contact" ref="closingSection" class="closing-section fade-in-section">
      <h2 class="closing-message">さあ、挑戦への一歩を踏み出そう。</h2>
      <p>
        D-study Labは、あなたの「やってみたい」を全力で応援します。<br />
        成功も失敗も、すべてがあなたの力になる。私たちは、その挑戦に伴走します。
      </p>
      <a href="https://lin.ee/tI30Hlk" class="cta-button" target="_blank">
        <span>LINEで無料相談をしてみる</span>
      </a>
    </section>

    <footer class="lp-footer">
      <a href="https://www.notion.so/2250aa0158188050b29ffaffc3849db7?source=copy_link" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>
      <p>&copy; 2025 D-study Lab. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { events } from '@/data/events.js';
import { courses } from '@/data/courses.js'; // インポート
import { lecturers } from '@/data/lecturers.js'; // 追加
import EventCard from '@/components/EventCard.vue';
import CourseCard from '@/components/CourseCard.vue'; // インポート
import CourseModal from '@/components/CourseModal.vue'; // インポート
import LecturerCard from '@/components/LecturerCard.vue'; // 追加

// Modal State
const isModalVisible = ref(false);
const selectedCourse = ref(null);

const openModal = (course) => {
  selectedCourse.value = course;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
  selectedCourse.value = null;
};

// Course Categories
const courseCategories = computed(() => {
  const categories = {};
  courses.forEach(course => {
    if (!categories[course.category]) {
      categories[course.category] = [];
    }
    categories[course.category].push(course);
  });
  return Object.keys(categories).map(name => ({
    name,
    courses: categories[name]
  }));
});

// Scroll Animation
const heroSection = ref(null);
const problemSection = ref(null);
const solutionSection = ref(null);
const lecturersSection = ref(null); // 追加
const coursesSection = ref(null);
const flowSection = ref(null);
const eventsSection = ref(null);
const closingSection = ref(null);

const sections = [
  heroSection,
  problemSection,
  solutionSection,
  lecturersSection, // 追加
  coursesSection,
  flowSection,
  eventsSection,
  closingSection,
];

let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach(section => {
    if (section.value) {
      observer.observe(section.value);
    }
  });
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
:root {
  --bg-color: #0a0a1a;
  --primary-color: #00aaff;
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.2);
  --text-color: #e0e0e0;
  --title-color: #ffffff;
}

.lp-container {
  font-family: 'Poppins', 'Helvetica Neue', 'Arial', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Meiryo', sans-serif;
  color: var(--text-color);
  background-color: var(--bg-color);
  overflow-x: hidden;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 700;
  color: var(--title-color);
  line-height: 1.2; /* 行間調整 */
}

.section-subtitle {
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  font-weight: 400;
  color: var(--primary-color);
  line-height: 1.4; /* 行間調整 */
}

.section-description {
  text-align: center;
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  color: #a0a0b0;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6; /* 行間調整 */
  word-break: break-word; /* 長い単語の改行 */
}

/* Scroll Animation */
.fade-in-section {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.fade-in-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* 1. Hero Section */
.hero-section {
  position: relative;
  color: white;
  text-align: center;
  min-height: 100vh;
  padding: 6rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.aurora-background {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%;
  height: 150%;
  background: radial-gradient(circle at 30% 30%, rgba(0, 170, 255, 0.35) 0%, rgba(0, 170, 255, 0) 30%),
              radial-gradient(circle at 70% 70%, rgba(100, 0, 255, 0.35) 0%, rgba(100, 0, 255, 0) 30%);
  transform: translate(-50%, -50%);
  animation: aurora-flow 20s linear infinite;
  z-index: 0;
}

@keyframes aurora-flow {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 1080px;
}

.main-catchphrase {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.3;
  text-shadow: 0 0 20px rgba(0,0,0,0.5);
}

.main-catchphrase .highlight {
  color: var(--primary-color);
  text-shadow: 0 0 15px var(--primary-color);
}

.sub-catchphrase {
  font-size: clamp(1rem, 2vw, 1.25rem);
  margin-bottom: 3rem;
  line-height: 1.7;
  color: #c0c0d0;
  word-break: break-word; /* 長い単語の改行 */
}

.cta-button {
  display: inline-block;
  background: var(--primary-color);
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 2px;
  border-radius: 50px;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  z-index: 1;
}

.cta-button span {
  display: block;
  background: var(--bg-color);
  padding: 1rem 2.5rem;
  border-radius: 48px;
  transition: background 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 0 25px var(--primary-color);
}

.cta-button:hover span {
  background: transparent;
}

/* Base Section Styling */
.problem-section, .solution-section, .courses-section, .flow-section, .closing-section, .events-section {
  padding: 6rem 2rem 12rem 2rem; /* 下部パディングをさらに増やす */
  position: relative;
}

/* Glassmorphism Cards */
.problem-card, .feature-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
}

.problem-card:hover, .feature-card:hover {
  transform: translateY(-10px);
  border-color: var(--primary-color);
  box-shadow: 0 0 20px rgba(0, 170, 255, 0.5);
}

/* 2. Problem Section */
.problem-cards {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 4rem;
  flex-wrap: wrap;
}

.problem-card {
  width: 400px;
}

.problem-card h3 {
  font-size: clamp(1.2rem, 2vw, 1.4rem);
  margin-bottom: 1rem;
  color: var(--title-color);
  text-align: center;
  line-height: 1.4; /* 行間調整 */
}

/* 3. Solution Section */
.solution-section {
  background-color: rgba(0,0,0,0.1);
}

.feature-cards {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 4rem;
  flex-wrap: wrap;
}

.feature-card {
  width: 400px;
  text-align: center;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
}

.feature-card h3 {
  font-size: clamp(1.4rem, 2.5vw, 1.6rem);
  margin-bottom: 1rem;
  color: var(--title-color);
  line-height: 1.4; /* 行間調整 */
}

/* 講師紹介セクション */
.lecturers-section {
  padding: 6rem 2rem;
}

.lecturer-cards {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 4rem;
}

/* 4. Courses Section */
.course-category {
  margin-bottom: 4rem;
  text-align: center;
}

.course-category h3 {
  font-size: clamp(1.8rem, 3vw, 2.2rem);
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--primary-color);
  display: inline-block;
  color: var(--title-color);
  line-height: 1.2; /* 行間調整 */
}

.course-cards {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

/* 5. Flow Section */
.flow-section {
  background-color: rgba(0,0,0,0.1);
}

.flow-steps {
  display: flex;
  justify-content: center;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin-top: 4rem;
  flex-wrap: wrap;
}

.flow-step {
  text-align: center;
  width: 220px;
  position: relative;
}

.flow-step:not(:last-child)::after {
  content: '→';
  position: absolute;
  right: -35px;
  top: 50px;
  font-size: 2.5rem;
  color: var(--primary-color);
  opacity: 0.5;
}

.step-number {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(145deg, rgba(0, 170, 255, 0.1), rgba(0, 170, 255, 0.05));
  border: 2px solid var(--primary-color);
  box-shadow: 0 0 15px rgba(0, 170, 255, 0.3), inset 0 0 10px rgba(0, 170, 255, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem;
  transition: all 0.3s ease;
  overflow: hidden;
}

.flow-step:hover .step-number {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 0 30px var(--primary-color), inset 0 0 20px var(--primary-color);
  background: linear-gradient(145deg, rgba(0, 170, 255, 0.2), rgba(0, 170, 255, 0.1));
}

.step-icon {
  position: relative;
  z-index: 2;
  font-size: 3.5rem;
  color: var(--primary-color);
  transition: color 0.3s ease;
}

.flow-step:hover .step-icon {
  color: white;
}

.step-digit {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 6rem;
  font-weight: bold;
  color: rgba(0, 170, 255, 0.1);
  z-index: 1;
  transition: color 0.3s ease;
}

.flow-step:hover .step-digit {
  color: rgba(255, 255, 255, 0.1);
}

/* Events Section */
.events-section {
  background-color: rgba(0,0,0,0.1);
  padding-bottom: 6rem; /* ページネーションのためのスペースを確保 */
}

.swiper-container {
  width: 100%;
  padding: 2rem 0; /* 上下パディングを調整 */
  position: relative;
  min-height: 450px;
  overflow: visible;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 380px !important;
  max-width: 90%;
}

.no-events {
  text-align: center;
  color: #a0a0b0;
  margin-top: 2rem;
  font-size: 1.1rem;
}

/* Custom Swiper Pagination */
.swiper-pagination-custom {
  position: absolute;
  bottom: 20px; /* events-sectionの下端からの位置 */
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
  z-index: 10; /* 他の要素より手前に表示 */
}

:deep(.swiper-pagination-bullet) {
  background-color: #ffffff;
  opacity: 0.4;
  transition: opacity 0.3s ease, background-color 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: var(--primary-color);
  opacity: 1;
}


/* 6. Closing Section */
.closing-section {
  padding: 6rem 2rem;
  text-align: center;
  background: linear-gradient(rgba(10, 10, 26, 0.8), rgba(10, 10, 26, 0.8)), url('/path-to-your-background-image.jpg');
  background-size: cover;
  background-position: center;
}

.closing-message {
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: var(--title-color);
  line-height: 1.3; /* 行間調整 */
}

.closing-section p {
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  line-height: 1.7; /* 行間調整 */
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  color: #c0c0d0;
  word-break: break-word; /* 長い単語の改行 */
}

/* Footer */
.lp-footer {
  text-align: center;
  padding: 3rem 2rem;
  background-color: #050510;
  color: #888;
}

.lp-footer a {
  color: var(--primary-color);
  text-decoration: none;
  margin-bottom: 0.5rem;
  display: inline-block;
}

.lp-footer a:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 1350px) {
  .problem-section, .solution-section, .courses-section, .flow-section, .closing-section, .events-section {
    padding: 4rem 1rem;
  }

  .problem-card, .feature-card, .course-card {
    width: 100%;
  }

  .flow-steps { flex-direction: column; align-items: center; gap: 4rem; }
  .flow-step:not(:last-child)::after {
    content: '↓';
    font-size: 2.5rem;
    color: var(--primary-color);
    opacity: 0.5;
    right: 50%;
    transform: translateX(50%);
    top: auto;
  }
  .flow-step:not(:last-child):hover::after {
    transform: translateX(50%) translateY(5px);
    opacity: 1;
    text-shadow: 0 0 15px var(--primary-color);
  }
}
</style>