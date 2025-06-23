// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import WorkView from '../views/WorkView.vue'
import ContactView from '../views/ContactView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/About',
    name: 'AboutView',
    component: AboutView,
  },
  {
    path: '/Work',
    name: 'WorkView',
    component: WorkView,
  },
  {
    path: '/Contact',
    name: 'ContactView',
    component: ContactView,
  },
  {
    path: '/privacy',
    name: 'PrivacyPolicyView',
    component: PrivacyPolicyView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router