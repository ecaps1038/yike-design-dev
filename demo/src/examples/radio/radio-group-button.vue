<template>
  <yk-radio-group v-model="radio" type="button">
    <yk-radio value="before-yesterday">前天</yk-radio>
    <yk-radio value="yesterday">昨天</yk-radio>
    <yk-radio value="today">今天</yk-radio>
    <yk-radio value="tomorrow">明天</yk-radio>
  </yk-radio-group>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const radio = ref('tomorrow')
</script>
