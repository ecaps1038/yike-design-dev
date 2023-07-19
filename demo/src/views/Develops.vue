<script setup lang="ts">
const bar = [
  {
    title: '开发指南',
    list: [
      {
        name: 'Yike Design',
        src: 'yikedev',
      },
      {
        name: '快速上手',
        src: 'grasp',
      },
      {
        name: '暗黑模式',
        src: 'dark',
      },
      {
        name: '定制主题',
        src: 'theme',
      },
    ],
  },
]
</script>

<template>
  <PageContent :bar="bar"></PageContent>
</template>
