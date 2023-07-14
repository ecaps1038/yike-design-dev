<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="'#' + name"></use>
  </svg>
</template>
<script setup lang="ts">
import '../../../assets/font/line/iconfont.js'
import '../../../assets/font/surface/iconfont.js'
import '../style'
import { IconProps } from './icon'

defineOptions({
  name: 'YkIcon',
})

const props = withDefaults(defineProps<IconProps>(), {
  name: '',
})
</script>
