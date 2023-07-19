<script setup lang="ts">
const bar = [
  {
    title: '设计指南',
    list: [
      {
        name: 'Yike Design',
        src: 'yikedesign',
      },
      {
        name: '设计原则',
        src: 'principle',
      },
    ],
  },
]
</script>

<template>
  <PageContent :bar="bar"></PageContent>
</template>
