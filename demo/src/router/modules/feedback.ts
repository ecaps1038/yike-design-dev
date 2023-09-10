import { RouteRecordRaw } from 'vue-router';

const feedbackRoutes: Array<RouteRecordRaw> = [
  {
    path: 'alert',
    component: () => import('@/examples/alert/doc.md'),
  },
  {
    path: 'message',
    component: () => import('@/examples/message/doc.md'),
  },
  {
    path: 'tooltip',
    component: () => import('@/examples/tooltip/doc.md'),
  },
  {
    path: 'notification',
    component: () => import('@/examples/notification/doc.md'),
  },
  {
    path: 'popover',
    component: () => import('@/examples/popover/doc.md'),
  },
  {
    path: 'modal',
    component: () => import('@/examples/modal/doc.md'),
  },
];

export default feedbackRoutes;
