<template>
  <yk-slider v-model="value" :marks="marks"></yk-slider>
</template>
<script setup lang="ts">
import { ref, createVNode } from 'vue'
import { SliderMark } from '@yike-design/ui/components/slider/src/slider-marks'
const value = ref([10, 40])
const marks = ref<SliderMark[]>([
  {
    key: 0,
    label: '0°C',
  },
  {
    key: 8,
    label: '8°C',
  },
  {
    key: 40,
    label: '40°C',
    style: {
      color: 'red',
    },
  },
  {
    key: 60,
    labelNode: createVNode('em', null, '60%'),
  },
])
</script>
