<template>
  <router-view />
</template>

<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

watch(
  () => route.path,
  (newPath) => {
    if (newPath.startsWith('/blog')) {
      document.documentElement.classList.add('blog-active');
      document.body.classList.add('blog-active');
    } else {
      document.documentElement.classList.remove('blog-active');
      document.body.classList.remove('blog-active');
    }
  },
  { immediate: true }
);
</script>

<style>
/* Global styles are now handled by layout components */
</style>