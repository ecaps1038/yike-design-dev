<template>
  <yk-space>
    <yk-button @click="active = true">打开抽屉</yk-button>
  </yk-space>
  <yk-drawer
    placement="right"
    size="500px"
    title="你好，世界。"
    :show="active"
    @close="active = false"
  >
    你看到了什么？
    <yk-button @click="activeInner = true">打开第二个抽屉</yk-button>
    <yk-drawer
      placement="right"
      size="300px"
      title="你好，第二个世界。"
      :show="activeInner"
      @close="activeInner = false"
    >
      但这里什么都没有
    </yk-drawer>
  </yk-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const active = ref(false)
const activeInner = ref(false)
</script>
