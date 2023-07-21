<template>
  <yk-space direction="vertical">
    <yk-radio-group v-model="radio" type="button" size="xl">
      <yk-radio label="you">你</yk-radio>
      <yk-radio label="and">和</yk-radio>
      <yk-radio label="me">我</yk-radio>
    </yk-radio-group>
    <yk-radio-group v-model="radio" type="button" size="l">
      <yk-radio label="you">你</yk-radio>
      <yk-radio label="and">和</yk-radio>
      <yk-radio label="me">我</yk-radio>
    </yk-radio-group>
    <yk-radio-group v-model="radio" type="button" size="m">
      <yk-radio label="you">你</yk-radio>
      <yk-radio label="and">和</yk-radio>
      <yk-radio label="me">我</yk-radio>
    </yk-radio-group>
    <yk-radio-group v-model="radio" type="button" size="s">
      <yk-radio label="you">你</yk-radio>
      <yk-radio label="and">和</yk-radio>
      <yk-radio label="me">我</yk-radio>
    </yk-radio-group>
  </yk-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const radio = ref('you')
</script>
