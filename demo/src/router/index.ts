import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    } as any,
    {
      path: '/module',
      redirect: '/module/button',
      name: 'module',
      component: () => import('@/views/Modules.vue'),
      children: [
        {
          path: 'button',
          // @ts-ignore
          component: () => import('@/examples/button/doc.md'),
        },
        {
          path: 'message',
          component: () => import('@/examples/message/doc.md')
        }
      ],
    },
    {
      path: '/develop',
      redirect: '/develop/yikedev',
      name: 'develop',
      component: () => import('@/views/Develops.vue'),
      children: [
        {
          path: 'grasp',
          component: () => import('@/components/develops/grasp.vue'),
        },
        {
          path: 'yikedev',
          component: () => import('@/components/develops/yikedev.vue'),
        },
        {
          path: 'dark',
          component: () => import('@/components/develops/dark.vue'),
        },
        {
          path: 'theme',
          component: () => import('@/components/develops/theme.vue'),
        },
      ],
    },
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
  ],
})

export default router
