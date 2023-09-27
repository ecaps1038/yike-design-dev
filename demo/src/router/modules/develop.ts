import { RouteRecordRaw } from 'vue-router';
import navs from '@/router/config/develops.json';

const developRoutes: RouteRecordRaw = {
  path: '/develop',
  name: 'develop',
  redirect: '/develop/yike-dev',
  component: () => import('@/views/Modules.vue'),
  children: [
    {
      path: 'yike-dev',
      component: () => import('@/views/develop/yike-dev.md'),
    },
    {
      path: 'grasp',
      component: () => import('@/../../CONTRIBUTING.md'),
    },
    {
      path: 'dark',
      component: () => import('@/views/develop/dark-model.md'),
    },
    {
      path: 'theme',
      component: () => import('@/views/develop/theme.md'),
    },
    {
      path: 'getting-started',
      component: () => import('@/views/develop/getting-started.md'),
    },
  ],
  meta: {
    navs,
  },
};

export default developRoutes;
