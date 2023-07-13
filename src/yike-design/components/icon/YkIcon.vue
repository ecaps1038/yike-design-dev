<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="'#' + name"></use>
  </svg>
</template>
<script setup lang="ts">
import '../../assets/font/line/iconfont.js'
import '../../assets/font/surface/iconfont.js'
const props = defineProps({
  name: {
    type: String,
    defalut: 'yike-yikedesign',
  },
})
</script>
<style lang="less" scoped>
@import '../../assets/style/yk-index.less';

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  // vertical-align: text-bottom;
}
</style>