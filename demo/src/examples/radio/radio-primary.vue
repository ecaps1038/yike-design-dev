<template>
  <yk-space direction="vertical">
    <yk-radio v-model="radio" label="1">单选框</yk-radio>
    <yk-radio v-model="radio" type="button" label="2">单选框</yk-radio>
    <yk-radio v-model="radio" type="button" :solid="true" label="2">
      单选框
    </yk-radio>
  </yk-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const radio = ref('')
</script>
