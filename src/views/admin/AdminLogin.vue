<template>
  <div class="login-overlay">
    <div class="login-card">
      <div class="warning-icon">⚠️</div>
      <h2>管理者専用ページ</h2>
      <p class="warning-text">このページは管理者専用です。<br>パスワードを入力してください。</p>

      <div class="login-form">
        <input
          v-model="password"
          type="password"
          placeholder="パスワード"
          @keyup.enter="login"
          class="password-input"
          autofocus
        />
        <button @click="login" class="login-button">ログイン</button>
      </div>

      <p v-if="error" class="error-message">❌ パスワードが間違っています</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const password = ref('');
const error = ref(false);

const login = () => {
  if (password.value === import.meta.env.VITE_ADMIN_PASSWORD) {
    localStorage.setItem('admin-auth', 'true');
    router.push('/admin/dashboard');
  } else {
    error.value = true;
    setTimeout(() => {
      error.value = false;
    }, 3000);
  }
};
</script>

<style scoped>
.login-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem 2.5rem;
  max-width: 450px;
  width: 90%;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.warning-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.login-card h2 {
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 0.5rem;
}

.warning-text {
  color: #c0c0d0;
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.password-input {
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.password-input:focus {
  outline: none;
  border-color: #00aaff;
  box-shadow: 0 0 15px rgba(0, 170, 255, 0.3);
}

.password-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.login-button {
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(135deg, #00aaff 0%, #0088cc 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 170, 255, 0.4);
}

.login-button:active {
  transform: translateY(0);
}

.error-message {
  color: #ff6b6b;
  font-weight: bold;
  margin-top: 1rem;
  animation: shake 0.5s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}
</style>
