<template>
  <yk-tag class="tag" :title="tag">{{ tag }}</yk-tag>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const tag = ref('设置最大宽度超出部分将省略掉')
</script>
<style lang="less">
.tag {
  max-width: 100px;
}
</style>
