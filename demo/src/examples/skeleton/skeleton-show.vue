<template>
  <yk-switch v-model="isChecked"></yk-switch>
  <yk-skeleton
    style="margin-top: 20px"
    width="100%"
    height="15px"
    animated
    title
    :row="3"
    :loading="!isChecked"
  >
    <h3>这是一段标题</h3>
    <p>
      内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
    </p>
    <p>
      内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
    </p>
    <p>
      内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
    </p>
  </yk-skeleton>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const isChecked = ref(false)
</script>
