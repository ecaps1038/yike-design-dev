<template>
  <yk-tabs v-model="acitve">
    <yk-tab-pane name="1" label="tab1">
      <template #title>
        <span class="custom">
          <IconTimeOutline />
          <span class="custom-label">tab1</span>
        </span>
      </template>
      Content of Tab Panel 1
    </yk-tab-pane>
    <yk-tab-pane name="2" label="tab2">
      <template #title>
        <span class="custom">
          <IconDateOutline />
          <span class="custom-label">tab2</span>
        </span>
      </template>
      Content of Tab Panel 2
    </yk-tab-pane>
    <yk-tab-pane name="3" label="tab3">Content of Tab Panel 3</yk-tab-pane>
  </yk-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const acitve = ref('1')
</script>
<style>
.custom-label {
  margin-left: 8px;
}
</style>
