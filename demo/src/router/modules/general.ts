import { RouteRecordRaw } from 'vue-router'

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
    path: 'message',
    component: () => import('@/examples/message/doc.md'),
  },
  {
    path: 'space',
    component: () => import('@/examples/space/doc.md'),
  },
]

export default generalRoutes
