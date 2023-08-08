<template>
  <yk-radio-group v-model="radio" direction="vertical" size="xl">
    {{ radio }}
    <yk-radio value="love">Love</yk-radio>
    <yk-radio value="and">And</yk-radio>
    <yk-radio value="peace" disabled>Peace</yk-radio>
  </yk-radio-group>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const radio = ref('love')
</script>
