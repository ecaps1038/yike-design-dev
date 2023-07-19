<template>
  <yk-radio-group v-model="radio" direction="vertical">
    <yk-radio label="love">这个世界最需要的就是爱与和平</yk-radio>
    <yk-radio label="and">这个世界最需要的就是爱与和平</yk-radio>
    <yk-radio label="peace">这个世界最需要的就是爱与和平</yk-radio>
  </yk-radio-group>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const radio = ref('')
</script>
