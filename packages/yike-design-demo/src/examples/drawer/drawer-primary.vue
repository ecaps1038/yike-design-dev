<template>
  <yk-space>
    <yk-button @click="activate('top')">从上往下</yk-button>
    <yk-button @click="activate('bottom')">从下往上</yk-button>
    <yk-button @click="activate('left')">从左往右</yk-button>
    <yk-button @click="activate('right')">从右往左</yk-button>
  </yk-space>
  <yk-drawer
    :placement="placement"
    title="你好，世界。"
    :show="active"
    @close="active = false"
  >
    你看到了什么？
  </yk-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const active = ref(false)
let placement = ref<any>('right')
const activate = (placement_to: string) => {
  placement.value = placement_to
  active.value = true
}
</script>
