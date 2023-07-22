<template>
  <yk-space direction="vertical" size="large">
    <yk-checkbox-group :default-value="['1']">
      <yk-checkbox v-for="item in data" :key="item.id" :value="item.id">
        option1
      </yk-checkbox>
    </yk-checkbox-group>
    <yk-checkbox-group :default-value="['1']" direction="vertical">
      <yk-checkbox v-for="item in data" :key="item.id" :value="item.id">
        option1
      </yk-checkbox>
    </yk-checkbox-group>
  </yk-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const data = ref([
  { id: '1', label: 'option1' },
  { id: '2', label: 'option2' },
  { id: '3', label: 'option3' },
])
</script>
<style scoped></style>
