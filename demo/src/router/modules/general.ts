import { RouteRecordRaw } from 'vue-router';

const generalRoutes: Array<RouteRecordRaw> = [
  {
    path: 'button',
    component: () => import('@/example/button/doc.md'),
  },
  {
    path: 'icon',
    component: () => import('@/components/units/Icons.vue'),
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