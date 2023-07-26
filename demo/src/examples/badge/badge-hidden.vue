<template>
  <yk-space direction="vertical">
    <yk-space>
      <yk-badge is-dot :hidden="hiddenFlag">
        <yk-avatar size="l" shape="square"></yk-avatar>
      </yk-badge>
      <yk-badge :count="2" :hidden="hiddenFlag">
        <yk-avatar size="l" shape="square"></yk-avatar>
      </yk-badge>
      <yk-badge :count="100" :hidden="hiddenFlag">
        <yk-avatar size="l" shape="square"></yk-avatar>
      </yk-badge>
      <yk-button style="margin-left: 20px" type="outline" @click="handleClick">
        hidden
      </yk-button>
    </yk-space>
    <yk-space>
      <yk-badge :count="2" offset="left" :hidden="hiddenFlag">
        <div
          style="
            width: 100px;
            height: 40px;
            border-radius: 8px;
            background: #f6f6f8;
          "
        ></div>
      </yk-badge>
    </yk-space>
    <yk-space>
      <yk-badge :count="100" offset="right" :hidden="hiddenFlag">
        <div
          style="
            width: 100px;
            height: 40px;
            border-radius: 8px;
            background: #f6f6f8;
          "
        ></div>
      </yk-badge>
    </yk-space>
  </yk-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const hiddenFlag = ref<boolean>(false)
const handleClick = () => {
  hiddenFlag.value = !hiddenFlag.value
}
</script>
