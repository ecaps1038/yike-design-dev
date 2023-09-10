<template>
  <yk-space wrap>
    <yk-dropdown
      v-for="placement in placements"
      :key="placement"
      :title="placement"
      :placement="placement"
    >
      <yk-dropdown-item>Action 1</yk-dropdown-item>
      <yk-dropdown-item>Action 2</yk-dropdown-item>
      <yk-dropdown-item>Action 3</yk-dropdown-item>
      <yk-dropdown-item>Action 4</yk-dropdown-item>
    </yk-dropdown>
  </yk-space>
</template>

<script setup>
const placements = [
  'top',
  'topLeft',
  'topRight',

  'bottom',
  'bottomLeft',
  'bottomRight',

  'left',
  'leftTop',
  'leftBottom',

  'right',
  'rightTop',
  'rightBottom',
]
</script>
