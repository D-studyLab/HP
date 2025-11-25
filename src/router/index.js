// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import BlogLayout from '../layouts/BlogLayout.vue'
import LP from '../views/LP.vue'
import ActivityTemplate from '../views/activities/ActivityTemplate.vue'
import BlogIndex from '../views/blog/BlogIndex.vue'
import BlogPost from '../views/blog/BlogPost.vue'

// Admin pages
import AdminLogin from '../views/admin/AdminLogin.vue'
import AdminLayout from '../views/admin/AdminLayout.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import BlogEditor from '../views/admin/BlogEditor.vue'
import ActivityEditor from '../views/admin/ActivityEditor.vue'

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
  },
  // Admin routes
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
  },
  {
    path: '/admin',
    component: AdminLayout,
    beforeEnter: (to, from, next) => {
      // Check if user is authenticated
      if (localStorage.getItem('admin-auth') === 'true') {
        next();
      } else {
        next('/admin/login');
      }
    },
    children: [
      {
        path: '',
        redirect: '/admin/dashboard'
      },
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard,
      },
      {
        path: 'blog/new',
        name: 'BlogNew',
        component: BlogEditor,
      },
      {
        path: 'blog/edit/:id',
        name: 'BlogEdit',
        component: BlogEditor,
      },
      {
        path: 'activity/new',
        name: 'ActivityNew',
        component: ActivityEditor,
      },
      {
        path: 'activity/edit/:id',
        name: 'ActivityEdit',
        component: ActivityEditor,
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
