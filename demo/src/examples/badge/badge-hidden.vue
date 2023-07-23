<template>
  <yk-space>
    <yk-badge is-dot :hidden="hiddenFlag">
      <template #default>
        <yk-avatar size="l" shape="square"></yk-avatar>
      </template>
    </yk-badge>
    <yk-badge :count="2" :hidden="hiddenFlag">
      <template #default>
        <yk-avatar size="l" shape="square"></yk-avatar>
      </template>
    </yk-badge>
    <yk-badge :count="100" :hidden="hiddenFlag">
      <template #default>
        <yk-avatar size="l" shape="square"></yk-avatar>
      </template>
    </yk-badge>
    <yk-button style="margin-left: 20px" type="outline" @click="handleClick">
      hidden
    </yk-button>
  </yk-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const hiddenFlag = ref<boolean>(false)
const handleClick = () => {
  hiddenFlag.value = !hiddenFlag.value
}
</script>
