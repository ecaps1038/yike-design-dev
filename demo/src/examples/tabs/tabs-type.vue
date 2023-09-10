<template>
  <yk-tabs v-model="acitve" type="card">
    <yk-tab-pane name="1" label="tab1">Content of Tab Panel 1</yk-tab-pane>
    <yk-tab-pane name="2" label="tab2">Content of Tab Panel 2</yk-tab-pane>
    <yk-tab-pane name="3" label="tab3">Content of Tab Panel 3</yk-tab-pane>
  </yk-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const acitve = ref('1')
</script>
