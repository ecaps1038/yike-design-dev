<template>
  <div>
    <yk-radio-group v-model="size" type="button">
      <yk-radio value="s">s</yk-radio>
      <yk-radio value="m">m</yk-radio>
      <yk-radio value="l">l</yk-radio>
      <yk-radio value="xl">xl</yk-radio>
    </yk-radio-group>
  </div>
  <div style="margin: 20px 0">
    <yk-pagination
      :total="2345"
      :size="size"
      show-jumper
      show-page-size
      show-total
    ></yk-pagination>
  </div>
  <div>
    <yk-pagination :total="2345" :size="size" simple></yk-pagination>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const size = ref<'s' | 'm' | 'l' | 'xl'>('l')
</script>
