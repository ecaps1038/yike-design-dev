<template>
  <yk-slider v-model="value" :marks="marks"></yk-slider>
</template>
<script setup lang="ts">
import { ref, createVNode } from 'vue'
const value = ref([10, 40])
const marks = ref([
  {
    percent: 0,
    label: '0°C',
  },
  {
    percent: 8,
    label: '8°C',
  },
  {
    percent: 40,
    label: '40°C',
    style: {
      color: 'red',
    },
  },
  {
    percent: 60,
    titleNode: createVNode('em', null, '60%'),
  },
])
</script>
