import { RouteRecordRaw } from 'vue-router';
const feedbackRoutes: Array<RouteRecordRaw> = [
  {
    path: 'message',
    component: () => import('@/examples/message/doc.md'),
  },
]

export default feedbackRoutes;