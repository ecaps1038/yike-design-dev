<template>
  <yk-rate
    v-model="value"
    count="10"
    allow-clear
    allow-half
    color="#f56c6c"
    icon="yk-biaoqing"
    @hover-change="handleHoverChange"
    @change="change"
  >
    <template #character>
      <div>哈</div>
    </template>
  </yk-rate>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
const value = ref(2)
watch(
  () => value.value,
  (val) => {
    console.log('value-change', val)
  },
)
const handleHoverChange = (n) => {
  console.log('handleHoverChange', n)
}
const change = (n) => {
  console.log('change', n)
}
</script>
