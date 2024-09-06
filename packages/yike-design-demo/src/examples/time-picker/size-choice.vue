<template>
  <yk-space dir="vertical">
    <yk-radio-group v-model="size" type="button">
      <yk-radio value="s">mini</yk-radio>
      <yk-radio value="m">small</yk-radio>
      <yk-radio value="l">medium</yk-radio>
      <yk-radio value="xl">large</yk-radio>
    </yk-radio-group>
    <yk-time-picker :size="size" style="width: 200px"></yk-time-picker>
  </yk-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const size = ref<'s' | 'l' | 'm' | 'xl'>('l')
</script>
