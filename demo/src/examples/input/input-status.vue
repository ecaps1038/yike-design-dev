<template>
  <yk-space direction="vertical">
    <yk-input v-model="disabled" disabled placeholder="不可用" />
    <yk-input v-model="readonly" readonly placeholder="只读" />
    <yk-input status="danger" placeholder="危险色" />
    <yk-input status="success" placeholder="成功色" />
    <yk-input status="warning" placeholder="警告色" />
  </yk-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const disabled = ref<string>('禁用输入框')
const readonly = ref<string>('只读输入框')
</script>
