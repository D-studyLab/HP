// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LP from '../views/LP.vue'
import EventsTemplate from '../views/events/EventsTemplate.vue';

const routes = [
  {
    path: '/',
    name: 'LP',
    component: LP,
  },
  {
    path: '/events/:id',
    name: 'EventDetail',
    component: EventsTemplate,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router