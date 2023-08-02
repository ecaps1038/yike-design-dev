<script setup lang="ts">
function handleSelected(value: string) {
  console.log('selected=>', value)
}
function handleVisibleChange(value: boolean) {
  console.log('visibleChange=>', value)
}
</script>
<template>
  <yk-space wrap>
    <yk-dropdown
      title="hover"
      @selected="handleSelected"
      @visible-change="handleVisibleChange"
    >
      <yk-dropdown-item value="1">Action 1</yk-dropdown-item>
      <yk-dropdown-item value="2">Action 2</yk-dropdown-item>
      <yk-dropdown-item value="3">Action 3</yk-dropdown-item>
      <yk-dropdown-item value="4">Action 4</yk-dropdown-item>
    </yk-dropdown>
  </yk-space>
</template>
