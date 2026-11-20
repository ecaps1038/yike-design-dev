<template>
  <yk-steps
    :items="items"
    :current="1"
    direction="vertical"
    style="max-width: 360px"
  />
</template>

<script setup lang="ts">
const items = [
  { title: '创建订单', description: '2026-01-15 10:00' },
  {
    title: '支付订单',
    description: '等待支付，超时将自动取消',
    status: 'error' as const,
  },
  { title: '发货', description: '支付完成后安排发货' },
  { title: '确认收货', description: '收到商品后确认收货' },
]
</script>
