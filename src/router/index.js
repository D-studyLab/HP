// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LP from '../views/LP.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'
import Chillsta from '../views/servicesview/ChillSta.vue'
import GandaiFoody from '../views/servicesview/GandaiFoody.vue'
import InfoProg from '../views/servicesview/InfoProg.vue'

const routes = [
  {
    path: '/',
    name: 'LP',
    component: LP,
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