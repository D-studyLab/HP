<!-- src/App.vue -->
<template>
  <div id="app">
    <GlobalHeader />
    <main class="site-main">
      <router-view />
    </main>
    <GlobalFooter />
  </div>
</template>

<script setup>
import GlobalHeader from './components/GlobalHeader.vue'
import GlobalFooter from './components/GlobalFooter.vue'
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  font-family: 'Noto Sans JP', sans-serif;
  color: #333;
  background-color: #f9f9f9;
  
  display: flex;
  flex-direction: column;
  min-height: 100vh
}
.site-main {
  flex: 1;
}
</style>