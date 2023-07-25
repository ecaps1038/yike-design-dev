import { createRouter, createWebHistory } from 'vue-router';
// 首页
import HomeView from '@/views/HomeView.vue';
// 通用组件路由
import generalRoutes from './modules/general';
// 反馈
import feedbackRoutes from './modules/feedback';
// 开发
import developRoutes from './modules/develop';
// 设计
import designRoutes from './modules/design';
// 开发规范
import developStandardRoutes from './modules/developStandard';

// 组件文档路由
const componentModelRouter = {
  path: '/module',
  redirect: '/module/button',
  name: 'module',
  component: () => import('@/views/Modules.vue'),
  children: [...generalRoutes, ...feedbackRoutes],
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/hh',
      name: 'home',
      component: () => import('@/views/yikeTt.vue'),
    },
    componentModelRouter,
    ...developRoutes,
    ...designRoutes,
    ...developStandardRoutes,
  ],
});

export default router;
