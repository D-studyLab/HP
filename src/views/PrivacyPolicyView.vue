<!-- src/views/PrivacyPolicyView.vue -->
<template>
  <div class="privacy">
    <h2>プライバシーポリシー</h2>
    <p>当サイトでは、お客様の個人情報を適切に取り扱うことを宣言し、以下の内容でプライバシーポリシーを定めます。</p>
    <ul>
      <li>個人情報の収集目的と範囲</li>
      <li>第三者への提供</li>
      <li>情報の管理・安全対策</li>
      <li>開示・訂正・利用停止の手続き</li>
      <li>お問い合わせ窓口</li>
    </ul>
    <p>詳細な文言は実運用前に弁護士等とご確認ください。</p>
  </div>
</template>

<style scoped>
.privacy {
  max-width: 700px;
  margin: 0 auto;
  text-align: left;
  padding: 2rem;
}
.privacy h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}
.privacy ul {
  margin-left: 1.2rem;
  list-style-type: disc;
}
.privacy li {
  margin-bottom: 0.5rem;
}
</style>