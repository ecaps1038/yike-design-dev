<template>
  <yk-tabs v-model="active">
    <yk-tab-pane name="tab1" label="tab1">tab1</yk-tab-pane>
    <yk-tab-pane name="tab2" label="tab2">tab2</yk-tab-pane>
  </yk-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const active = ref('tab1')
</script>
