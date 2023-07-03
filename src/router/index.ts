import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/hh',
      name: 'hh',

      component: () => import('../views/yikeTt.vue'),
    },
    {
      path: '/module',
      redirect: '/module/button',
      name: 'module',
      component: () => import('../views/Modules.vue'),
      children: [
        {
          path: 'button',
          component: () => import('../components/units/Buttons.vue'),
        },
        {
          path: 'icon',
          component: () => import('../components/units/Icons.vue'),
        },
        {
          path: 'typegraphy',
          component: () => import('../components/units/Typeg.vue'),
        },
        {
          path: 'space',
          component: () => import('../components/units/Spaces.vue'),
        },
        {
          path: 'avatar',
          component: () => import('../components/units/avatars.vue'),
        },
        {
          path: 'badge',
          component: () => import('../components/units/badges.vue'),
        },
        {
          path: 'breadcrumb',
          component: () => import('../components/units/breadcrumbs.vue'),
        },
        {
          path: 'dropdown',
          component: () => import('../components/units/dropdown.vue'),
        },
        {
          path: 'pagination',
          component: () => import('../components/units/paginations.vue'),
        },
        {
          path: 'input',
          component: () => import('../components/units/inputs.vue'),
        },
        {
          path: 'textarea',
          component: () => import('../components/units/textareas.vue'),
        },
        {
          path: 'checkbox',
          component: () => import('../components/units/checkboxs.vue'),
        },
        {
          path: 'radio',
          component: () => import('../components/units/radios.vue'),
        },
        {
          path: 'switch',
          component: () => import('../components/units/switchs.vue'),
        },
        {
          path: 'inputnumber',
          component: () => import('../components/units/inputnumber.vue'),
        },
        {
          path: 'stepper',
          component: () => import('../components/units/steppers.vue'),
        },
        {
          path: 'inputtag',
          component: () => import('../components/units/inputtag.vue'),
        },
        {
          path: 'rate',
          component: () => import('../components/units/rates.vue'),
        },
      ],
    },
    {
      path: '/develop',
      redirect: '/develop/yikedev',
      name: 'develop',
      component: () => import('../views/Develops.vue'),
      children: [
        {
          path: 'grasp',
          component: () => import('../components/develops/grasp.vue'),
        },
        {
          path: 'yikedev',
          component: () => import('../components/develops/yikedev.vue'),
        },
        {
          path: 'dark',
          component: () => import('../components/develops/dark.vue'),
        },
        {
          path: 'theme',
          component: () => import('../components/develops/theme.vue'),
        },
      ],
    },
    {
      path: '/design',
      redirect: '/design/yikedesign',
      name: 'design',
      component: () => import('../views/Designs.vue'),
      children: [
        {
          path: 'yikedesign',
          component: () => import('../components/design/yikedesign.vue'),
        },
        {
          path: 'principle',
          component: () => import('../components/design/principle.vue'),
        },
      ],
    },
  ],
})

export default router
