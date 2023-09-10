<template>
  <yk-space direction="vertical">
    <yk-radio-group v-model="radio" type="button" size="xl">
      <yk-radio value="before-yesterday">前天</yk-radio>
      <yk-radio value="yesterday">昨天</yk-radio>
      <yk-radio value="today">今天</yk-radio>
      <yk-radio value="tomorrow">明天</yk-radio>
      <yk-radio value="after-tomorrow" :disabled="true">后天</yk-radio>
    </yk-radio-group>
    <yk-radio-group v-model="radio" type="button" size="l">
      <yk-radio value="before-yesterday">前天</yk-radio>
      <yk-radio value="yesterday">昨天</yk-radio>
      <yk-radio value="today">今天</yk-radio>
      <yk-radio value="tomorrow">明天</yk-radio>
      <yk-radio value="after-tomorrow" :disabled="true">后天</yk-radio>
    </yk-radio-group>
    <yk-radio-group v-model="radio" type="button" size="m">
      <yk-radio value="before-yesterday">前天</yk-radio>
      <yk-radio value="yesterday">昨天</yk-radio>
      <yk-radio value="today">今天</yk-radio>
      <yk-radio value="tomorrow">明天</yk-radio>
      <yk-radio value="after-tomorrow" :disabled="true">后天</yk-radio>
    </yk-radio-group>
    <yk-radio-group v-model="radio" type="button" size="s">
      <yk-radio value="before-yesterday">前天</yk-radio>
      <yk-radio value="yesterday">昨天</yk-radio>
      <yk-radio value="today">今天</yk-radio>
      <yk-radio value="tomorrow">明天</yk-radio>
      <yk-radio value="after-tomorrow" :disabled="true">后天</yk-radio>
    </yk-radio-group>
  </yk-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const radio = ref('you')
</script>
