// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ServiceView from '../views/ServiceView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'
import Chillsta from '../views/works/ChillSta.vue'
import GandaiFoody from '../views/works/GandaiFoody.vue'
import InfoProg from '../views/works/InfoProg.vue'

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
    path: '/Service',
    name: 'ServiceView',
    component: ServiceView,
  },
  {
    path: '/privacy',
    name: 'PrivacyPolicyView',
    component: PrivacyPolicyView,
  },

  {
    path: '/service/info-prog',
    name: 'info-prog',
    component: InfoProg,
  },
  {
    path: '/service/gandai-foody',
    name: 'gandai-foody',
    component: GandaiFoody,
  },
  {
    path: '/service/chillsta',
    name: 'chillsta',
    component: Chillsta,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router