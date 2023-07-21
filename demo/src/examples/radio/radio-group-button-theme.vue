<template>
  <yk-space direction="vertical">
    <yk-radio-group v-model="radio" type="button" theme="primary">
      <yk-radio label="love">这个世界最需要的就是爱与和平</yk-radio>
      <yk-radio label="and">这个世界最需要的就是爱与和平</yk-radio>
      <yk-radio label="peace">这个世界最需要的就是爱与和平</yk-radio>
    </yk-radio-group>
    <yk-radio-group v-model="radio" type="button" theme="secondary">
      <yk-radio label="love">这个世界最需要的就是爱与和平</yk-radio>
      <yk-radio label="and">这个世界最需要的就是爱与和平</yk-radio>
      <yk-radio label="peace">这个世界最需要的就是爱与和平</yk-radio>
    </yk-radio-group>
  </yk-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const radio = ref('')
</script>
