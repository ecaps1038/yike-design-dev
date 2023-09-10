import { RouteRecordRaw } from 'vue-router';
import navs from '@/router/config/designs.json';

const designRoutes: RouteRecordRaw = {
  path: '/design',
  name: 'design',
  redirect: '/design/yike-design',
  component: () => import('@/views/Modules.vue'),
  children: [
    {
      path: 'yike-design',
      component: () => import('@/views/design/yike-design.md'),
    },
    {
      path: 'principle',
      component: () => import('@/views/design/principle.md'),
    },
  ],
  meta: {
    navs,
  },
};

export default designRoutes;
