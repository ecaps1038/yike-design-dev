<template>
  <div class="yk-progress">Progress</div>
</template>
<script setup lang="ts">
import { ProgressProps } from './progress'
import '../style'
defineOptions({
  name: 'YkProgress',
})
// props 属性定义
const props = withDefaults(defineProps<ProgressProps>(), {
  type: 'line',
  showInfo: true,
})
</script>
