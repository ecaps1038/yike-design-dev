<template>
  <yk-space dir="vertical">
    <yk-radio-group v-model="size" type="button">
      <yk-radio value="s">s</yk-radio>
      <yk-radio value="m">m</yk-radio>
      <yk-radio value="l">l</yk-radio>
      <yk-radio value="xl">xl</yk-radio>
    </yk-radio-group>

    <yk-pagination
      :total="2345"
      :size="size"
      :layouts="['total', 'prev', 'pager', 'next', 'pageSize', 'jumper']"
    />
    <yk-pagination :total="2345" :size="size" simple />
  </yk-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const size = ref<'s' | 'm' | 'l' | 'xl'>('l')
</script>
