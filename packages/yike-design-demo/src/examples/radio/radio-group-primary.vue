<template>
  <yk-radio-group v-model="radio" direction="horizontal">
    <yk-radio value="love">Love</yk-radio>
    <yk-radio value="and">And</yk-radio>
    <yk-radio value="peace">Peace</yk-radio>
  </yk-radio-group>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const radio = ref('')
</script>
