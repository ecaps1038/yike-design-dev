<template>
  <yk-space direction="vertical" size="l">
    <yk-checkbox-group v-model="value1" :max="2" :options="plainOptions" />
    <yk-checkbox-group :max="2" :default-value="['1']">
      <yk-checkbox value="1" disabled>Option 1</yk-checkbox>
      <yk-checkbox value="2">Option 2</yk-checkbox>
      <yk-checkbox value="3">Option 3</yk-checkbox>
      <yk-checkbox value="4">Option 4</yk-checkbox>
    </yk-checkbox-group>
  </yk-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref(['Plain 1'])
const plainOptions = ['Plain 1', 'Plain 2', 'Plain 3', 'Plain 4']
</script>
<style scoped></style>
