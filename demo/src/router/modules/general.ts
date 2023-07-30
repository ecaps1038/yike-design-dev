import { RouteRecordRaw } from 'vue-router';

const generalRoutes: Array<RouteRecordRaw> = [
  {
    path: 'color',
    component: () => import('@/examples/color/doc.md'),
  },
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
  {
    path: 'upload',
    component: () => import('@/examples/upload/doc.md'),
  },
  {
    path: 'radio',
    component: () => import('@/examples/radio/doc.md'),
  },
  {
    path: 'checkbox',
    component: () => import('@/examples/checkbox/doc.md'),
  },
  {
    path: 'drawer',
    component: () => import('@/examples/drawer/doc.md'),
  },
  {
    path: 'badge',
    component: () => import('@/examples/badge/doc.md'),
  },
  {
    path: 'switch',
    component: () => import('@/examples/switch/doc.md'),
  },
  {
    path: 'anchor',
    component: () => import('@/examples/anchor/doc.md'),
  },
  {
    path: 'empty',
    component: () => import('@/examples/empty/doc.md'),
  },
  {
    path: 'color',
    component: () => import('@/examples/color/doc.md'),
  },
  {
    path: 'rate',
    component: () => import('@/examples/rate/doc.md'),
  },
  {
    path: 'input',
    component: () => import('@/examples/input/doc.md'),
  },
  {
    path: 'scrollbar',
    component: () => import('@/examples/scrollbar/doc.md'),
  },
  {
    path: 'alert',
    component: () => import('@/examples/alert/doc.md'),
  },
  {
    path: 'tree',
    component: () => import('@/examples/tree/doc.md'),
  },
];

export default generalRoutes;
