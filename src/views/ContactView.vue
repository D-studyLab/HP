<!-- src/views/ContactView.vue -->
 <template>
  <div class="contact">
    <h2>お問い合わせ</h2>
    <form @submit.prevent="submitForm">
      <label>
        お名前
        <input v-model="form.name" type="text" required />
      </label>
      <label>
        メールアドレス
        <input v-model="form.email" type="email" required />
      </label>
      <label>
        お問い合わせ内容
        <textarea v-model="form.message" rows="5" required />
      </label>
      <button type="submit">送信</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const form = reactive({ name: '', email: '', message: '' })
function submitForm() {
  // 送信処理を実装
  alert('お問い合わせを送信しました。')
}
</script>

<style scoped>
.contact {
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
  padding: 2rem;
}
.contact h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}
.contact label {
  display: block;
  margin-bottom: 1rem;
}
.contact input,
.contact textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.contact button {
  padding: 0.6em 1.2em;
  font-size: 1em;
  border: none;
  border-radius: 4px;
  background-color: #646cff;
  color: white;
  cursor: pointer;
}
.contact button:hover {
  background-color: #535bf2;
}
</style>