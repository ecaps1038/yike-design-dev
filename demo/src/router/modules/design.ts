import { RouteRecordRaw } from 'vue-router'
const designRoutes: Array<RouteRecordRaw> = [
  {
    path: '/design',
    redirect: '/design/yikedesign',
    name: 'design',
    component: () => import('@/views/Designs.vue'),
    children: [
      {
        path: 'yikedesign',
        component: () => import('@/components/design/yikedesign.vue'),
      },
      {
        path: 'principle',
        component: () => import('@/components/design/principle.vue'),
      },
    ],
  },
]

export default designRoutes
