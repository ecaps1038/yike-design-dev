import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import navs from '@/router/config/components.json';

import generalRoutes from './modules/general';
import feedbackRoutes from './modules/feedback';
import developRoutes from './modules/develop';
import designRoutes from './modules/design';

const compModelRoute: RouteRecordRaw = {
  path: '/module',
  name: 'module',
  redirect: '/module/button',
  component: () => import('@/views/Modules.vue'),
  children: [...generalRoutes, ...feedbackRoutes],
  meta: {
    navs,
  },
};

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    compModelRoute,
    developRoutes,
    designRoutes,
  ],
});

router.afterEach(() => {
  window.scrollTo({ top: 0, behavior: 'instant' });
});

export default router;
