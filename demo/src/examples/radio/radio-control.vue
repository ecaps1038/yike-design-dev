<template>
  <yk-space direction="vertical">
    <yk-radio v-model="radioValue" :value="active">选框</yk-radio>
    <yk-button @click="handleChange">切换状态</yk-button>
  </yk-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const active = ref(true)
const radioValue = ref(false)
const handleChange = () => {
  radioValue.value = !radioValue.value
}
</script>
