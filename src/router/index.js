// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LP from '../views/LP.vue'
import EventsTemplate from '../views/events/EventsTemplate.vue';
import LecturersView from '../views/LecturersView.vue';
import LecturerDetail from '../views/lecturers/LecturerDetail.vue';

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
  {
    path: '/lecturers',
    name: 'Lecturers',
    component: LecturersView,
  },
  {
    path: '/lecturers/:id',
    name: 'LecturerDetail',
    component: LecturerDetail,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router