// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import BlogLayout from '../layouts/BlogLayout.vue'
import LP from '../views/LP.vue'
import ActivityTemplate from '../views/activities/ActivityTemplate.vue'
import BlogIndex from '../views/blog/BlogIndex.vue'
import BlogPost from '../views/blog/BlogPost.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'LP',
        component: LP,
      },
      {
        path: 'activities/:id',
        name: 'ActivityDetail',
        component: ActivityTemplate,
      },
    ]
  },
  {
    path: '/blog',
    component: BlogLayout,
    children: [
      {
        path: '',
        name: 'BlogIndex',
        component: BlogIndex,
      },
      {
        path: ':slug',
        name: 'BlogPost',
        component: BlogPost,
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
