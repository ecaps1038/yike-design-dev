<template>
  <yk-space direction="vertical" size="l">
    <yk-checkbox-group :default-value="['1']">
      <yk-checkbox v-for="item in data" :key="item.id" :value="item.id">
        {{ item.label }}
      </yk-checkbox>
    </yk-checkbox-group>
    <div class="empty" />
    <yk-checkbox-group v-model="value" direction="vertical">
      <yk-checkbox v-for="item in data" :key="item.id" :value="item.id">
        {{ item.label }}
      </yk-checkbox>
    </yk-checkbox-group>
    <span>value: {{ value }}</span>
  </yk-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const data = ref([
  { id: '1', label: 'option1' },
  { id: '2', label: 'option2' },
  { id: '3', label: 'option3' },
])
const value = ref(['1'])
</script>
<style scoped></style>
