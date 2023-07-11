import { RouteRecordRaw } from 'vue-router';

const generalRoutes: Array<RouteRecordRaw> = [
  {
    path: 'button',
    component: () => import('@/examples/button/doc.md'),
  },
  {
    path: 'icon',
    component: () => import('@/examples/icon/doc.md'),
  },
  {
    path: 'space',
    component: () => import('@/components/units/Spaces.vue'),
  },
  {
    path: 'avatar',
    component: () => import('@/components/units/Avatars.vue'),
  },
]

export default generalRoutes;