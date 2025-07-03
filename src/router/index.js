// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LP from '../views/LP.vue'

const routes = [
  {
    path: '/',
    name: 'LP',
    component: LP,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router