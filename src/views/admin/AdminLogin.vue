<template>
  <div class="login-overlay">
    <div class="login-card">
      <div class="lock-icon">🔑</div>
      <h2>管理者ログイン</h2>
      <p class="info-text">メールアドレスとパスワードを入力してください。</p>

      <form @submit.prevent="login" class="login-form">
        <input
          v-model="email"
          type="email"
          placeholder="メールアドレス"
          class="email-input"
          required
          autofocus
        />
        <input
          v-model="password"
          type="password"
          placeholder="パスワード"
          class="password-input"
          required
        />
        <button type="submit" class="login-button" :disabled="loading">
          {{ loading ? 'ログイン中...' : 'ログイン' }}
        </button>
      </form>

      <p v-if="error" class="error-message">❌ {{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);

const login = async () => {
  if (!email.value || !password.value) {
    error.value = 'メールアドレスとパスワードを入力してください。';
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push('/admin/dashboard');
  } catch (err) {
    switch (err.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        error.value = 'メールアドレスまたはパスワードが間違っています。';
        break;
      case 'auth/invalid-email':
        error.value = '無効なメールアドレス形式です。';
        break;
      default:
        error.value = 'ログインに失敗しました。時間をおいて再試行してください。';
        break;
    }
    console.error('Login error:', err);
  } finally {
    loading.value = false;
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

.lock-icon {
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

.info-text {
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

.email-input,
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

.email-input:focus,
.password-input:focus {
  outline: none;
  border-color: #00aaff;
  box-shadow: 0 0 15px rgba(0, 170, 255, 0.3);
}

.email-input::placeholder,
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

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 170, 255, 0.4);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: #ff6b6b;
  font-weight: bold;
  margin-top: 1rem;
  animation: shake 0.5s;
  min-height: 1.2em; /* Prevent layout shift */
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}
</style>
