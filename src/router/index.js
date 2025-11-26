// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'

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

// Helper function to check auth state
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};


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
        path: 'activities/:slug',
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
    beforeEnter: async (to, from, next) => {
      const user = await getCurrentUser();
      if (user) {
        // User is logged in
        next();
      } else {
        // No user is logged in
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
