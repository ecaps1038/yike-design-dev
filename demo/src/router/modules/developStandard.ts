import { RouteRecordRaw } from 'vue-router';

const developStandardRoutes: Array<RouteRecordRaw> = [
  {
    path: '/developStandard',
    name: 'developStandard',
    component: () => import('@/views/DevelopStandard.vue'),
  },
];

export default developStandardRoutes;
