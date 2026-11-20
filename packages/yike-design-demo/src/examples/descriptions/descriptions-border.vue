<template>
  <yk-descriptions
    title="订单详情"
    :items="items"
    :column="2"
    border
    direction="vertical"
  />
</template>

<script setup lang="ts">
import type { DescriptionItem } from '@yike-design/ui/components/descriptions'

const items: DescriptionItem[] = [
  { label: '订单号', value: 'YK202601150001' },
  { label: '下单时间', value: '2026-01-15 10:24:00' },
  { label: '收货人', value: '张三' },
  { label: '联系电话', value: '138****8888' },
  { label: '收货地址', value: '浙江省杭州市西湖区文三路 100 号', span: 2 },
  { label: '订单备注', value: '工作日送货，感谢', span: 2 },
]
</script>
