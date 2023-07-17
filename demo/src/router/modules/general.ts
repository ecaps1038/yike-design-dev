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
    path: 'message',
    component: () => import('@/examples/message/doc.md'),
  },
  {
    path: 'space',
    component: () => import('@/examples/space/doc.md'),
  },
  {
    path: 'typography',
    component: () => import('@/examples/typography/doc.md'),
  },
  {
    path: 'back-top',
    component: () => import('@/examples/back-top/doc.md'),
  },
  {
    path: 'avatar',
    component: () => import('@/examples/avatar/doc.md'),
  },
];

export default generalRoutes;
