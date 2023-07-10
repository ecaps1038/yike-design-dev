import { RouteRecordRaw } from 'vue-router';
const feedbackRoutes: Array<RouteRecordRaw> = [
  {
    path: 'modal',
    component: () => import('@/example/button/doc.md'),
  },
]

export default feedbackRoutes;