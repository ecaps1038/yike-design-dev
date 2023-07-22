<template>
  <yk-anchor :options="options" :show-marker="false"></yk-anchor>
</template>
<script lang="ts" setup>
const options = [
  {
    title: '一级锚点',
    href: '#一级锚点',
    children: [
      {
        title: '二级锚点',
        href: '#二级锚点',
        children: [
          {
            title: '三级锚点',
            href: '#三级锚点',
            children: [],
          },
        ],
      },
    ],
  },
  {
    title: '一级锚点1',
    href: '#一级锚点1',
    children: [],
  },
  {
    title: '一级锚点2',
    href: '#一级锚点2',
    children: [],
  },
]
</script>
