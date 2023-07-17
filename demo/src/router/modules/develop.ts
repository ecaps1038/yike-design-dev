import { RouteRecordRaw } from 'vue-router';

const developRoutes: Array<RouteRecordRaw> = [
  {
    path: '/develop',
    redirect: '/develop/yikedev',
    name: 'develop',
    component: () => import('@/views/Develops.vue'),
    children: [
      {
        path: 'grasp',
        component: () => import('../../../../CONTRIBUTING.md'),
      },
      {
        path: 'yikedev',
        component: () => import('@/components/develops/yikedev.vue'),
      },
      {
        path: 'dark',
        component: () => import('@/components/develops/dark.vue'),
      },
      {
        path: 'theme',
        component: () => import('@/components/develops/theme.vue'),
      },
    ],
  },
];

export default developRoutes;
