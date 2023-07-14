import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
// 通用组件路由
import generalRoutes from './modules/general'
// 反馈
import feedbackRoutes from './modules/feedback'

import developRoutes from './modules/develop'
import desingRoutes from './modules/design'

// 组件文档路由
const componentModelRouter = {
  path: '/module',
  redirect: '/module/button',
  name: 'module',
  component: () => import('@/views/Modules.vue'),
  children: [...generalRoutes, ...feedbackRoutes],
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    componentModelRouter,

    ...developRoutes,
    ...desingRoutes,
  ],
})

export default router;
