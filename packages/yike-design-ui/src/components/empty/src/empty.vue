<template>
  <div class="yk-empty">
    <img class="yk-empty-img" :src="image" :style="imageStyle" />
    <span class="yk-empty-tips">{{ description }}</span>
  </div>
</template>
<script setup lang="ts">
import { EmptyProps } from './empty'
import DEFAULT_EMPTY from '../../../assets/img/yk-empty-default.svg'
import '../style'
defineOptions({
  name: 'YkEmpty',
})
const props = withDefaults(defineProps<EmptyProps>(), {
  image: DEFAULT_EMPTY,
  imageStyle: undefined,
  description: '暂无数据',
})
</script>
