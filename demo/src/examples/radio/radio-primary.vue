<template>
  <yk-radio v-model="radio" label="love">这个世界最需要的就是爱与和平</yk-radio>
  <yk-radio v-model="radio" label="peace">
    这个世界最需要的就是爱与和平
  </yk-radio>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const radio = ref('')
</script>
