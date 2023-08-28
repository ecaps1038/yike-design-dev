<template>
  <yk-space size="l">
    <yk-checkbox v-model="checked1">v-model</yk-checkbox>
    <yk-checkbox :model-value="true">binding value</yk-checkbox>
    <yk-checkbox :model-value="checked2">binding value</yk-checkbox>
    <yk-checkbox :default-checked="true">uncontrolled state</yk-checkbox>
  </yk-space>
  <div class="yk-mt">
    <yk-button @click="change">change {{ checked2 }}</yk-button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const checked1 = ref(false)
const checked2 = ref(false)
const change = () => {
  checked2.value = !checked2.value
}
</script>
<style>
.yk-mt {
  margin-top: 20px;
}
</style>
